// 排程系統
import { contentGenerator } from './generator.js';
import { createPlatformAdapter } from './platform-factory.js';
import logger from '../utils/logger.js';
import type { ContentInput, PlatformType } from '../platforms/types.js';
import { ContentInputSchema } from '../utils/validator.js';
import {
  cancelScheduledJob,
  claimScheduledJob,
  getAllScheduledJobs,
  getDueScheduledJobs,
  markScheduledJobFailed,
  markScheduledJobPublished,
  saveScheduledJob,
  type ScheduledJobRecord
} from '../db/index.js';
import { randomUUID } from 'crypto';

interface ScheduledPost {
  id: string;
  input: ContentInput;
  scheduledAt: Date;
  platforms: PlatformType[];
  status: 'pending' | 'processing' | 'published' | 'failed' | 'cancelled';
  error?: string;
  publishedAt?: Date;
  createdAt?: Date;
}

export class Scheduler {
  private readonly runningJobs = new Set<string>();
  private readonly pollTimer: NodeJS.Timeout;

  schedulePost(input: ContentInput, scheduledAt: Date, platforms: PlatformType[]): string {
    const id = `post_${randomUUID()}`;

    saveScheduledJob({
      id,
      inputJson: JSON.stringify(input),
      platformsJson: JSON.stringify(platforms),
      scheduledAt: scheduledAt.toISOString()
    });

    logger.info(`Scheduled post ${id} for ${scheduledAt.toISOString()}`);
    this.processDueJobs();

    return id;
  }

  constructor() {
    // 使用輪詢 + DB 持久化，服務重啟後仍可恢復待發佈任務
    this.pollTimer = setInterval(() => {
      this.processDueJobs();
    }, 5000);
    this.pollTimer.unref?.();

    this.processDueJobs();
  }

  stop(): void {
    clearInterval(this.pollTimer);
  }

  private processDueJobs(): void {
    const dueJobs = getDueScheduledJobs(new Date().toISOString());
    for (const job of dueJobs) {
      if (this.runningJobs.has(job.id)) {
        continue;
      }

      const claimed = claimScheduledJob(job.id);
      if (!claimed) {
        continue;
      }

      void this.executeJob(job);
    }
  }

  private async executeJob(job: ScheduledJobRecord): Promise<void> {
    if (this.runningJobs.has(job.id)) {
      return;
    }
    this.runningJobs.add(job.id);

    try {
      const parsedInput = this.parseInput(job.input_json);
      const parsedPlatforms = this.parsePlatforms(job.platforms_json);

      for (const platform of parsedPlatforms) {
        // 先生成內容，再立即呼叫平台 API 發佈
        const generatedContent = await contentGenerator.generate({
          ...parsedInput,
          targetPlatform: platform
        });

        const adapter = createPlatformAdapter(platform);
        const result = await adapter.executePost(generatedContent);
        if (!result.success) {
          throw new Error(result.error || `Post failed on ${platform}`);
        }

        logger.info(`Executed scheduled post for ${platform}`, { postId: job.id });
      }

      markScheduledJobPublished(job.id);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      markScheduledJobFailed(job.id, errorMessage);
      logger.error(`Scheduled post ${job.id} failed`, { error });
    } finally {
      this.runningJobs.delete(job.id);
    }
  }

  getScheduledPosts(): ScheduledPost[] {
    const jobs = getAllScheduledJobs();
    return jobs.map((job) => ({
      id: job.id,
      input: this.parseInput(job.input_json),
      scheduledAt: new Date(job.scheduled_at),
      platforms: this.parsePlatforms(job.platforms_json),
      status: job.status,
      error: job.error,
      publishedAt: job.published_at ? new Date(job.published_at) : undefined,
      createdAt: job.created_at ? new Date(job.created_at) : undefined
    }));
  }

  cancelPost(id: string): boolean {
    const cancelled = cancelScheduledJob(id);
    if (cancelled) {
      logger.info(`Cancelled scheduled post ${id}`);
    }
    return cancelled;
  }

  private parseInput(raw: string): ContentInput {
    try {
      const parsed: unknown = JSON.parse(raw);
      return ContentInputSchema.parse(parsed);
    } catch {
      throw new Error('Invalid scheduled job input payload');
    }
  }

  private parsePlatforms(raw: string): PlatformType[] {
    const allowedPlatforms: PlatformType[] = ['threads', 'linkedin', 'instagram'];

    try {
      const parsed: unknown = JSON.parse(raw);
      if (!Array.isArray(parsed) || parsed.length === 0) {
        throw new Error('Invalid scheduled platforms');
      }

      for (const platform of parsed as unknown[]) {
        if (!allowedPlatforms.includes(platform as PlatformType)) {
          throw new Error('Unsupported scheduled platform');
        }
      }

      return parsed as PlatformType[];
    } catch {
      throw new Error('Invalid scheduled job platform payload');
    }
  }
}

export const scheduler = new Scheduler();
