// AI 內容生成器
import OpenAI from 'openai';
import { ContentInput, GeneratedContent } from '../platforms/types.js';
import logger from '../utils/logger.js';
import { config } from '../config/index.js';

const openai = new OpenAI({
  apiKey: config.openaiApiKey
});

const PLATFORM_PROMPTS = {
  linkedin: `你是一個專業的LinkedIn內容策略師。請將以下內容改寫成符合LinkedIn風格的貼文：
- 專業但不死板
- 注重產業洞察和價值輸出
- 適當加入專業術語
- 开头要有吸引眼球的hook
- 结尾可以加1-2个相关hashtag
- 150-300字为宜`,

  threads: `你是一個社交媒體達人。請將以下內容改寫成符合Threads風格的貼文：
- 輕鬆、對話式
- 可以用口語化表達
- 短小精悍，100-200字
- 可以加入一些meme或輕鬆的語氣
- 鼓励互动提问`,

  instagram: `你是一個Instagram內容專家。請將以下內容改寫成符合IG風格的貼文：
- 簡短吸引眼球
- 第一句要够吸引人繼續看
- 簡潔有力
- 3-5个相关hashtag
- 适合配合视觉内容`
};

export class ContentGenerator {
  async generate(input: ContentInput): Promise<GeneratedContent> {
    const platformPrompt = PLATFORM_PROMPTS[input.targetPlatform];
    
    const systemPrompt = `${platformPrompt}

當前風格要求: ${input.tone || 'default'}
Hashtags: ${input.hashtags ? '需要' : '不需要'}`;

    try {
      const response = await openai.chat.completions.create({
        model: config.openaiModel,
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: input.originalContent }
        ],
        temperature: 0.7
      });

      const text = response.choices[0]?.message?.content || '';

      logger.info(`Generated content for ${input.targetPlatform}`, {
        platform: input.targetPlatform,
        length: text.length
      });

      return {
        platform: input.targetPlatform,
        text,
        media: input.mediaUrls?.map(url => ({
          type: 'image' as const,
          url
        }))
      };
    } catch (error) {
      logger.error('Content generation failed', { error, input });
      throw error;
    }
  }
}

export const contentGenerator = new ContentGenerator();
