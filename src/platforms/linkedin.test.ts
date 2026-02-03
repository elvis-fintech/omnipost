// LinkedIn Adapter Tests
import { describe, it, expect, beforeEach } from 'vitest';
import { LinkedInAdapter } from '../platforms/linkedin';

describe('LinkedInAdapter', () => {
  let adapter: LinkedInAdapter;

  beforeEach(() => {
    adapter = new LinkedInAdapter({
      accessToken: 'test_token',
      userId: 'test_user'
    });
  });

  describe('platform type', () => {
    it('should have correct platform type', () => {
      expect(adapter.platform).toBe('linkedin');
    });

    it('should have correct max length', () => {
      expect(adapter.maxLength).toBe(3000);
    });
  });

  describe('validate', () => {
    it('should accept content within limit', () => {
      expect(adapter.validate('LinkedIn post content')).toBe(true);
    });

    it('should reject content over limit', () => {
      const longContent = 'a'.repeat(3001);
      expect(adapter.validate(longContent)).toBe(false);
    });

    it('should accept exactly 3000 characters', () => {
      const exactContent = 'a'.repeat(3000);
      expect(adapter.validate(exactContent)).toBe(true);
    });
  });

  describe('post', () => {
    it('should have post method', () => {
      expect(typeof adapter.post).toBe('function');
    });
  });
});
