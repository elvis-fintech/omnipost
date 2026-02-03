// Threads Adapter Tests
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { ThreadsAdapter } from '../platforms/threads';

describe('ThreadsAdapter', () => {
  let adapter: ThreadsAdapter;

  beforeEach(() => {
    adapter = new ThreadsAdapter({
      accessToken: 'test_token',
      userId: 'test_user'
    });
  });

  describe('platform type', () => {
    it('should have correct platform type', () => {
      expect(adapter.platform).toBe('threads');
    });

    it('should have correct max length', () => {
      expect(adapter.maxLength).toBe(500);
    });
  });

  describe('validate', () => {
    it('should accept content within limit', () => {
      expect(adapter.validate('short content')).toBe(true);
    });

    it('should reject content over limit', () => {
      const longContent = 'a'.repeat(501);
      expect(adapter.validate(longContent)).toBe(false);
    });

    it('should accept exactly 500 characters', () => {
      const exactContent = 'a'.repeat(500);
      expect(adapter.validate(exactContent)).toBe(true);
    });
  });

  describe('post', () => {
    it('should have post method', () => {
      expect(typeof adapter.post).toBe('function');
    });
  });
});
