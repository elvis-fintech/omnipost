import { describe, expect, it } from 'vitest';
import app from './routes.js';

describe('API auth and validation', () => {
  it('should reject protected endpoint without api key', async () => {
    const response = await app.request('/history');
    expect(response.status).toBe(401);

    const payload = await response.json() as { success: boolean };
    expect(payload.success).toBe(false);
  });

  it('should reject protected endpoint with wrong api key', async () => {
    const response = await app.request('/scheduled', {
      method: 'GET',
      headers: {
        'x-api-key': 'wrong-key'
      }
    });
    expect(response.status).toBe(401);
  });

  it('should validate instagram schedule requires media urls', async () => {
    const response = await app.request('/schedule', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'x-api-key': 'test-api-key'
      },
      body: JSON.stringify({
        content: {
          originalContent: 'post to ig',
          targetPlatform: 'instagram',
          tone: 'engaging',
          hashtags: true
        },
        scheduledAt: new Date(Date.now() + 60_000).toISOString(),
        platforms: ['instagram']
      })
    });

    expect(response.status).toBe(400);
    const payload = await response.json() as { success: boolean; error?: string };
    expect(payload.success).toBe(false);
    expect(payload.error).toContain('mediaUrls');
  });

  it('should report health check metadata', async () => {
    const response = await app.request('/health');
    expect(response.status).toBe(200);

    const payload = await response.json() as {
      checks: {
        apiKeyProtectionEnabled: boolean;
        openaiConfigured: boolean;
      };
    };
    expect(payload.checks.apiKeyProtectionEnabled).toBe(true);
    expect(payload.checks.openaiConfigured).toBe(true);
  });
});
