// Instagram Adapter Tests
import { describe, it, expect, beforeEach } from 'vitest';
import { InstagramAdapter } from '../platforms/instagram';

describe('InstagramAdapter', () => {
  let adapter: InstagramAdapter;

  beforeEach(() => {
    adapter = new InstagramAdapter({
      accessToken: 'test_token',
      userId: 'test_user'
    });
  });

  describe('platform type', () => {
    it('should have correct platform type', () => {
      expect(adapter.platform).toBe('instagram');
    });

    it('should have correct max length', () => {
      expect(adapter.maxLength).toBe(2200);
    });
  });

  describe('validate', () => {
    it('should accept content within limit', () => {
      expect(adapter.validate('Instagram caption')).toBe(true);
    });

    it('should reject content over limit', () => {
      const longContent = 'a'.repeat(2201);
      expect(adapter.validate(longContent)).toBe(false);
    });

    it('should accept exactly 2200 characters', () => {
      const exactContent = 'a'.repeat(2200);
      expect(adapter.validate(exactContent)).toBe(true);
    });
  });

  describe('post', () => {
    it('should have post method', () => {
      expect(typeof adapter.post).toBe('function');
    });
  });
});
