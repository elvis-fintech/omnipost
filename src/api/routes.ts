// API Routes
import { Hono } from 'hono';
import { contentGenerator } from '../core/generator.js';
import { scheduler } from '../core/scheduler.js';
import { ThreadsAdapter } from '../platforms/threads.js';
import { LinkedInAdapter } from '../platforms/linkedin.js';
import { InstagramAdapter } from '../platforms/instagram.js';
import { ContentInputSchema } from '../utils/validator.js';
import { getRecentPosts } from '../db/index.js';
import logger from '../utils/logger.js';

const app = new Hono();

// Generate content for a platform
app.post('/generate', async (c) => {
  try {
    const body = await c.req.json<{ originalContent: string; targetPlatform: string; tone?: string; hashtags?: boolean }>();
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

// Get generated posts history
app.get('/history', async (c) => {
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
app.get('/history/:platform', async (c) => {
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
  const platform = c.req.param('platform') as 'threads' | 'linkedin' | 'instagram';
  const body = await c.req.json<{ content: { text: string } }>();

  try {
    const adapters = {
      threads: new ThreadsAdapter({ accessToken: '', userId: '' }),
      linkedin: new LinkedInAdapter({ accessToken: '', userId: '' }),
      instagram: new InstagramAdapter({ accessToken: '', userId: '' })
    };

    const adapter = adapters[platform];
    const result = await adapter.executePost(body.content);

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
  try {
    const body = await c.req.json<{ content: { originalContent: string; targetPlatform: string; tone?: string; hashtags?: boolean }; scheduledAt: string; platforms: string[] }>();
    const { content, scheduledAt, platforms } = body;

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
app.get('/scheduled', async (c) => {
  const posts = scheduler.getScheduledPosts();
  return c.json({ success: true, data: posts });
});

// Health check
app.get('/health', async (c) => {
  return c.json({ status: 'ok', timestamp: new Date().toISOString() });
});

export default app;
