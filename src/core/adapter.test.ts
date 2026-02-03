// PlatformAdapter Tests
import { describe, it, expect } from 'vitest';
import { PlatformAdapter } from './adapter';
import { PlatformType } from '../platforms/types';

describe('PlatformAdapter', () => {
  // Mock adapter for testing base class behavior
  class MockAdapter extends PlatformAdapter {
    platform: PlatformType = 'threads';
    maxLength = 500;
    
    post() {
      return Promise.resolve({ success: true, postId: '123' });
    }
    
    validate(content: string): boolean {
      return content.length <= this.maxLength;
    }
  }

  it('should validate content within limit', () => {
    const adapter = new MockAdapter({ accessToken: 'test', userId: '123' });
    expect(adapter.validate('short content')).toBe(true);
  });

  it('should reject content over limit', () => {
    const adapter = new MockAdapter({ accessToken: 'test', userId: '123' });
    const longContent = 'a'.repeat(501);
    expect(adapter.validate(longContent)).toBe(false);
  });

  it('should have correct platform type', () => {
    const adapter = new MockAdapter({ accessToken: 'test', userId: '123' });
    expect(adapter.platform).toBe('threads');
  });

  it('should have correct max length', () => {
    const adapter = new MockAdapter({ accessToken: 'test', userId: '123' });
    expect(adapter.maxLength).toBe(500);
  });
});
