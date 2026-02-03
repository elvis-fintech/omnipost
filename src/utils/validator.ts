// Zod 驗證 schema
import { z } from 'zod';

export const ContentInputSchema = z.object({
  originalContent: z.string().min(1).max(5000),
  targetPlatform: z.enum(['threads', 'linkedin', 'instagram']).optional(),
  tone: z.enum(['professional', 'casual', 'engaging']).optional(),
  hashtags: z.boolean().optional().default(true),
  mediaUrls: z.array(z.string().url()).optional()
});

export const ConfigSchema = z.object({
  openaiApiKey: z.string().min(1),
  openaiModel: z.string().optional().default('gpt-4-turbo-preview'),
  port: z.number().optional().default(3000)
});

export type ContentInput = z.infer<typeof ContentInputSchema>;
