// Scheduler Tests
import { describe, it, expect, beforeEach } from 'vitest';
import { Scheduler } from './scheduler';
import type { ContentInput } from '../platforms/types';

describe('Scheduler', () => {
  let scheduler: Scheduler;
  const createInput = (targetPlatform: ContentInput['targetPlatform']): ContentInput => ({
    originalContent: 'test',
    targetPlatform,
    tone: 'casual',
    hashtags: true
  });

  beforeEach(() => {
    scheduler = new Scheduler();
  });

  describe('schedulePost', () => {
    it('should schedule a post for the future', () => {
      const futureDate = new Date(Date.now() + 60000); // 1 minute from now
      const postId = scheduler.schedulePost(
        createInput('threads'),
        futureDate,
        ['threads']
      );

      expect(postId).toBeDefined();
      expect(postId).toContain('post_');
    });

    it('should add post to scheduled list', () => {
      const futureDate = new Date(Date.now() + 60000);
      const postId = scheduler.schedulePost(
        createInput('linkedin'),
        futureDate,
        ['linkedin']
      );

      const posts = scheduler.getScheduledPosts();
      const found = posts.find(p => p.id === postId);
      
      expect(found).toBeDefined();
      expect(found?.status).toBe('pending');
      expect(found?.platforms).toContain('linkedin');
    });
  });

  describe('getScheduledPosts', () => {
    it('should return all scheduled posts', () => {
      const posts = scheduler.getScheduledPosts();
      expect(Array.isArray(posts)).toBe(true);
    });
  });

  describe('cancelPost', () => {
    it('should cancel a scheduled post', () => {
      const futureDate = new Date(Date.now() + 60000);
      const postId = scheduler.schedulePost(
        createInput('instagram'),
        futureDate,
        ['instagram']
      );

      const result = scheduler.cancelPost(postId);
      expect(result).toBe(true);

      const posts = scheduler.getScheduledPosts();
      const found = posts.find(p => p.id === postId);
      expect(found).toBeUndefined();
    });

    it('should return false for non-existent post', () => {
      const result = scheduler.cancelPost('non_existent_id');
      expect(result).toBe(false);
    });
  });
});
