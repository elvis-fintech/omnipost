// Zod 驗證 schema
import { z } from 'zod';

export const PlatformSchema = z.enum(['threads', 'linkedin', 'instagram']);
export const OutputLanguageSchema = z.enum(['zh-Hant', 'en']);

export const ContentInputSchema = z.object({
  originalContent: z.string().min(1).max(5000),
  targetPlatform: PlatformSchema,
  tone: z.enum(['professional', 'casual', 'engaging']).optional(),
  hashtags: z.boolean().optional().default(true),
  mediaUrls: z.array(z.string().url()).optional(),
  outputLanguage: OutputLanguageSchema.optional().default('zh-Hant')
});

export const BatchGenerateInputSchema = ContentInputSchema.omit({
  targetPlatform: true
});

export const ScheduleRequestSchema = z.object({
  content: ContentInputSchema,
  scheduledAt: z.string().datetime(),
  platforms: z.array(PlatformSchema).min(1)
});

export const ConfigSchema = z.object({
  openaiApiKey: z.string().min(1),
  openaiModel: z.string().optional().default('gpt-4-turbo-preview'),
  port: z.number().optional().default(3000)
});

export type ContentInput = z.infer<typeof ContentInputSchema>;
