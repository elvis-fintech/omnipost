// API Routes
import { Hono } from 'hono';
import type { Context } from 'hono';
import { contentGenerator } from '../core/generator.js';
import { scheduler } from '../core/scheduler.js';
import { createPlatformAdapter } from '../core/platform-factory.js';
import type { GeneratedContent } from '../platforms/types.js';
import { BatchGenerateInputSchema, ContentInputSchema, PlatformSchema, ScheduleRequestSchema } from '../utils/validator.js';
import { getRecentPosts } from '../db/index.js';
import logger from '../utils/logger.js';
import { renderDashboardPage } from '../ui/dashboard.js';
import { config } from '../config/index.js';

const app = new Hono();

function requireApiKey(c: Context) {
  const expectedApiKey = config.appApiKey.trim();
  if (!expectedApiKey) {
    return null;
  }

  const xApiKey = c.req.header('x-api-key')?.trim();
  const authHeader = c.req.header('authorization')?.trim();
  const bearerToken = authHeader?.toLowerCase().startsWith('bearer ')
    ? authHeader.slice(7).trim()
    : undefined;
  const providedApiKey = xApiKey || bearerToken;

  if (providedApiKey === expectedApiKey) {
    return null;
  }

  return c.json({
    success: false,
    error: 'Unauthorized'
  }, 401);
}

// UI Dashboard
app.get('/', (c) => c.html(renderDashboardPage()));

// Generate content for a platform
app.post('/generate', async (c) => {
  const unauthorizedResponse = requireApiKey(c);
  if (unauthorizedResponse) {
    return unauthorizedResponse;
  }

  try {
    const body: unknown = await c.req.json();
    const validated = ContentInputSchema.parse(body);

    const content = await contentGenerator.generate(validated);
    
    return c.json({ success: true, data: content });
  } catch (error) {
    logger.error('Generate API error', { error });
    return c.json({ 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error' 
    }, 400);
  }
});

// Generate content for all platforms in one request
app.post('/generate/all', async (c) => {
  const unauthorizedResponse = requireApiKey(c);
  if (unauthorizedResponse) {
    return unauthorizedResponse;
  }

  try {
    const body: unknown = await c.req.json();
    const validated = BatchGenerateInputSchema.parse(body);
    const platforms = ['linkedin', 'threads', 'instagram'] as const;

    const data = await Promise.all(
      platforms.map(async (platform) => {
        const content = await contentGenerator.generate({
          ...validated,
          targetPlatform: platform
        });
        return { platform, content };
      })
    );

    return c.json({ success: true, data });
  } catch (error) {
    logger.error('Generate all API error', { error });
    return c.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    }, 400);
  }
});

// Get generated posts history
app.get('/history', (c) => {
  const unauthorizedResponse = requireApiKey(c);
  if (unauthorizedResponse) {
    return unauthorizedResponse;
  }

  const platform = c.req.query('platform');
  const limit = parseInt(c.req.query('limit') || '10', 10);
  
  try {
    const posts = getRecentPosts(platform, limit);
    return c.json({ success: true, data: posts });
  } catch (error) {
    logger.error('History API error', { error });
    return c.json({ 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error' 
    }, 400);
  }
});

// Get history by platform
app.get('/history/:platform', (c) => {
  const unauthorizedResponse = requireApiKey(c);
  if (unauthorizedResponse) {
    return unauthorizedResponse;
  }

  const platform = c.req.param('platform');
  const limit = parseInt(c.req.query('limit') || '10', 10);
  
  try {
    const posts = getRecentPosts(platform, limit);
    return c.json({ success: true, data: posts });
  } catch (error) {
    logger.error('History API error', { error, platform });
    return c.json({ 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error' 
    }, 400);
  }
});

// Post to a single platform
app.post('/post/:platform', async (c) => {
  const unauthorizedResponse = requireApiKey(c);
  if (unauthorizedResponse) {
    return unauthorizedResponse;
  }

  const platformResult = PlatformSchema.safeParse(c.req.param('platform'));

  if (!platformResult.success) {
    return c.json({
      success: false,
      error: 'Unsupported platform'
    }, 400);
  }

  const platform = platformResult.data;

  try {
    const body = await c.req.json<{ content?: { text?: string; mediaUrls?: string[] } }>();
    const text = body.content?.text?.trim();
    if (!text) {
      return c.json({ success: false, error: 'content.text is required' }, 400);
    }
    if (platform === 'instagram' && (!body.content?.mediaUrls || body.content.mediaUrls.length === 0)) {
      return c.json({ success: false, error: 'content.mediaUrls is required for instagram' }, 400);
    }

    const adapter = createPlatformAdapter(platform);
    const content: GeneratedContent = {
      platform,
      text,
      media: body.content?.mediaUrls?.map((url) => ({ type: 'image', url }))
    };
    const result = await adapter.executePost(content);

    if (!result.success) {
      return c.json({
        success: false,
        error: result.error || 'Post failed'
      }, 400);
    }

    return c.json({ success: true, data: result });
  } catch (error) {
    logger.error('Post API error', { error, platform });
    return c.json({ 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error' 
    }, 400);
  }
});

// Schedule a post
app.post('/schedule', async (c) => {
  const unauthorizedResponse = requireApiKey(c);
  if (unauthorizedResponse) {
    return unauthorizedResponse;
  }

  try {
    const body: unknown = await c.req.json();
    const { content, scheduledAt, platforms } = ScheduleRequestSchema.parse(body);
    if (platforms.includes('instagram') && (!content.mediaUrls || content.mediaUrls.length === 0)) {
      return c.json({ success: false, error: 'content.mediaUrls is required when scheduling instagram' }, 400);
    }

    for (const platform of platforms) {
      // 預先驗證憑證，避免先回成功再在排程時失敗
      createPlatformAdapter(platform);
    }

    const postId = scheduler.schedulePost(
      content,
      new Date(scheduledAt),
      platforms
    );

    return c.json({ success: true, data: { postId } });
  } catch (error) {
    logger.error('Schedule API error', { error });
    return c.json({ 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error' 
    }, 400);
  }
});

// Get scheduled posts
app.get('/scheduled', (c) => {
  const unauthorizedResponse = requireApiKey(c);
  if (unauthorizedResponse) {
    return unauthorizedResponse;
  }

  try {
    const posts = scheduler.getScheduledPosts();
    return c.json({ success: true, data: posts });
  } catch (error) {
    logger.error('Scheduled list API error', { error });
    return c.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    }, 400);
  }
});

// Health check
app.get('/health', (c) => {
  const openaiConfigured = config.openaiApiKey.trim().length > 0;

  return c.json({
    status: openaiConfigured ? 'ok' : 'degraded',
    timestamp: new Date().toISOString(),
    checks: {
      openaiConfigured,
      apiKeyProtectionEnabled: config.appApiKey.trim().length > 0
    }
  });
});

export default app;
