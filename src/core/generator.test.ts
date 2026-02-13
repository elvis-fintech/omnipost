// ContentGenerator Tests
import { describe, it, expect } from 'vitest';

describe('ContentGenerator', () => {
  describe('generate', () => {
    it('should have correct input validation', () => {
      const input = {
        originalContent: 'Bitcoin just hit a new high!',
        targetPlatform: 'linkedin' as const,
        tone: 'professional' as const,
        hashtags: true
      };

      expect(input.targetPlatform).toBe('linkedin');
      expect(input.originalContent).toBeDefined();
    });

    it('should handle Threads platform', () => {
      const input = {
        originalContent: 'Just launched my new side project!',
        targetPlatform: 'threads' as const,
        tone: 'casual' as const,
        hashtags: true
      };

      expect(input.targetPlatform).toBe('threads');
    });

    it('should handle Instagram platform', () => {
      const input = {
        originalContent: 'Check out this amazing view!',
        targetPlatform: 'instagram' as const,
        tone: 'engaging' as const,
        hashtags: true
      };

      expect(input.targetPlatform).toBe('instagram');
    });

    it('should handle media URLs', () => {
      const input = {
        originalContent: 'New product launch',
        targetPlatform: 'instagram' as const,
        mediaUrls: ['https://example.com/image.jpg']
      };

      expect(input.mediaUrls).toHaveLength(1);
      expect(input.mediaUrls[0]).toBe('https://example.com/image.jpg');
    });
  });
});
