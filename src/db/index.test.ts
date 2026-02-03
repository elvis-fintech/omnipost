// Database tests
import { describe, it, expect, beforeEach } from 'vitest';
import { saveGeneratedPost, getRecentPosts, savePostHistory, cleanupTestData, db } from './index';

describe('Database', () => {
  beforeEach(() => {
    cleanupTestData();
  });

  describe('saveGeneratedPost', () => {
    it('should save a generated post', () => {
      const post = {
        id: 'test_post_1',
        original_content: 'Test content',
        platform: 'linkedin',
        generated_content: 'Generated LinkedIn post',
        tone: 'professional',
        hashtags: true
      };

      const result = saveGeneratedPost(post);
      expect(result).toBe('test_post_1');
    });

    it('should save post with media URLs', () => {
      const post = {
        id: 'test_post_2',
        original_content: 'Image post',
        platform: 'instagram',
        generated_content: 'IG post',
        media_urls: 'https://example.com/image.jpg'
      };

      const result = saveGeneratedPost(post);
      expect(result).toBe('test_post_2');
    });
  });

  describe('getRecentPosts', () => {
    it('should return recent posts', () => {
      // Save some posts
      saveGeneratedPost({
        id: 'post_1',
        original_content: 'Content 1',
        platform: 'linkedin',
        generated_content: 'LinkedIn 1'
      });
      saveGeneratedPost({
        id: 'post_2',
        original_content: 'Content 2',
        platform: 'threads',
        generated_content: 'Threads 1'
      });

      const posts = getRecentPosts();
      expect(posts).toHaveLength(2);
    });

    it('should filter by platform', () => {
      saveGeneratedPost({
        id: 'post_3',
        original_content: 'Content 3',
        platform: 'linkedin',
        generated_content: 'LinkedIn post'
      });
      saveGeneratedPost({
        id: 'post_4',
        original_content: 'Content 4',
        platform: 'threads',
        generated_content: 'Threads post'
      });

      const linkedinPosts = getRecentPosts('linkedin');
      expect(linkedinPosts).toHaveLength(1);
      expect(linkedinPosts[0].platform).toBe('linkedin');
    });

    it('should limit results', () => {
      for (let i = 0; i < 5; i++) {
        saveGeneratedPost({
          id: `bulk_post_${i}`,
          original_content: `Content ${i}`,
          platform: 'linkedin',
          generated_content: `LinkedIn ${i}`
        });
      }

      const posts = getRecentPosts('linkedin', 3);
      expect(posts).toHaveLength(3);
    });
  });

  describe('savePostHistory', () => {
    it('should save post history', () => {
      // First save a generated post
      saveGeneratedPost({
        id: 'test_post_1',
        original_content: 'Test content',
        platform: 'linkedin',
        generated_content: 'Generated LinkedIn post'
      });

      const history = {
        id: 'history_1',
        generated_post_id: 'test_post_1',
        platform: 'linkedin',
        post_id: 'external_123',
        status: 'published' as const
      };

      const result = savePostHistory(history);
      expect(result).toBe('history_1');
    });
  });
});
