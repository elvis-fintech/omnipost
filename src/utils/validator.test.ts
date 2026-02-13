// Validator Tests
import { describe, it, expect } from 'vitest';
import { ContentInputSchema } from './validator';

describe('ContentInputSchema', () => {
  it('should validate valid input', () => {
    const validInput = {
      originalContent: 'Test content',
      targetPlatform: 'linkedin',
      tone: 'professional',
      hashtags: true
    };

    const result = ContentInputSchema.safeParse(validInput);
    expect(result.success).toBe(true);
  });

  it('should reject empty content', () => {
    const invalidInput = {
      originalContent: '',
      targetPlatform: 'threads'
    };

    const result = ContentInputSchema.safeParse(invalidInput);
    expect(result.success).toBe(false);
  });

  it('should reject invalid platform', () => {
    const invalidInput = {
      originalContent: 'Test',
      targetPlatform: 'invalid'
    };

    const result = ContentInputSchema.safeParse(invalidInput);
    expect(result.success).toBe(false);
  });

  it('should reject missing target platform', () => {
    const minimalInput = {
      originalContent: 'Test'
    };

    const result = ContentInputSchema.safeParse(minimalInput);
    expect(result.success).toBe(false);
  });

  it('should validate media URLs', () => {
    const inputWithMedia = {
      originalContent: 'Test with image',
      targetPlatform: 'instagram',
      mediaUrls: ['https://example.com/image.jpg'],
      outputLanguage: 'en'
    };

    const result = ContentInputSchema.safeParse(inputWithMedia);
    expect(result.success).toBe(true);
  });

  it('should reject invalid output language', () => {
    const invalidInput = {
      originalContent: 'Test',
      targetPlatform: 'linkedin',
      outputLanguage: 'zh-CN'
    };

    const result = ContentInputSchema.safeParse(invalidInput);
    expect(result.success).toBe(false);
  });

  it('should reject invalid URL', () => {
    const inputWithInvalidUrl = {
      originalContent: 'Test',
      targetPlatform: 'instagram',
      mediaUrls: ['not-a-url']
    };

    const result = ContentInputSchema.safeParse(inputWithInvalidUrl);
    expect(result.success).toBe(false);
  });
});
