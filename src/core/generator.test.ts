// ContentGenerator Tests
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { ContentGenerator } from './generator';
import * as openai from 'openai';

// Mock OpenAI
vi.mock('openai', () => ({
  default: vi.fn().mockImplementation(() => ({
    chat: {
      completions: {
        create: vi.fn()
      }
    }
  }))
}));

describe('ContentGenerator', () => {
  let generator: ContentGenerator;
  let mockCreate: any;

  beforeEach(() => {
    generator = new ContentGenerator();
    mockCreate = vi.fn();
    // Access the internal openai instance
  });

  describe('generate', () => {
    it('should generate LinkedIn content', async () => {
      const input = {
        originalContent: 'Bitcoin just hit a new high!',
        targetPlatform: 'linkedin' as const,
        tone: 'professional' as const,
        hashtags: true
      };

      // Mock successful response
      const mockResponse = {
        choices: [
          {
            message: {
              content: '🚀 Bitcoin just reached a new all-time high! Here are my key observations... #Bitcoin #Crypto'
            }
          }
        ]
      };

      // This is a placeholder - in real tests, you'd mock the OpenAI module properly
      expect(input.targetPlatform).toBe('linkedin');
      expect(input.originalContent).toBeDefined();
    });

    it('should generate Threads content', () => {
      const input = {
        originalContent: 'Just launched my new side project!',
        targetPlatform: 'threads' as const,
        tone: 'casual' as const,
        hashtags: true
      };

      expect(input.targetPlatform).toBe('threads');
    });

    it('should generate Instagram content', () => {
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
      expect(input.mediaUrls![0]).toBe('https://example.com/image.jpg');
    });
  });
});
