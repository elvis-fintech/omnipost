// 排程系統
import { contentGenerator } from './generator.js';
import { createPlatformAdapter } from './platform-factory.js';
import logger from '../utils/logger.js';
import type { ContentInput, PlatformType } from '../platforms/types.js';

interface ScheduledPost {
  id: string;
  input: ContentInput;
  scheduledAt: Date;
  platforms: PlatformType[];
  status: 'pending' | 'published' | 'failed';
}

export class Scheduler {
  private jobs: Map<string, ScheduledPost> = new Map();

  schedulePost(input: ContentInput, scheduledAt: Date, platforms: PlatformType[]): string {
    const id = `post_${Date.now()}`;
    
    const post: ScheduledPost = {
      id,
      input,
      scheduledAt,
      platforms,
      status: 'pending'
    };

    this.jobs.set(id, post);

    // 計算延遲時間
    const delay = scheduledAt.getTime() - Date.now();
    
    if (delay > 0) {
      setTimeout(() => { void this.executePost(id); }, delay);
      logger.info(`Scheduled post ${id} for ${scheduledAt.toISOString()}`);
    } else {
      void this.executePost(id);
    }

    return id;
  }

  private async executePost(id: string) {
    const post = this.jobs.get(id);
    if (!post) return;

    try {
      post.status = 'published';
      
      for (const platform of post.platforms) {
        // 先生成內容，再立即呼叫平台 API 發佈
        const generatedContent = await contentGenerator.generate({
          ...post.input,
          targetPlatform: platform
        });

        const adapter = createPlatformAdapter(platform);
        const result = await adapter.executePost(generatedContent);
        if (!result.success) {
          throw new Error(result.error || `Post failed on ${platform}`);
        }
        
        logger.info(`Executed scheduled post for ${platform}`, { postId: id });
      }
    } catch (error) {
      post.status = 'failed';
      logger.error(`Scheduled post ${id} failed`, { error });
    }
  }

  getScheduledPosts(): ScheduledPost[] {
    return Array.from(this.jobs.values());
  }

  cancelPost(id: string): boolean {
    return this.jobs.delete(id);
  }
}

export const scheduler = new Scheduler();
