// Threads 平台適配器
import axios from 'axios';
import { PlatformAdapter } from '../core/adapter.js';
import type { GeneratedContent, PostResult } from '../platforms/types.js';
import logger from '../utils/logger.js';

export class ThreadsAdapter extends PlatformAdapter {
  platform = 'threads' as const;
  maxLength = 500;

  async post(content: GeneratedContent): Promise<PostResult> {
    const endpoint = `https://graph.facebook.com/v18.0/${this.credentials.userId}/media`;
    
    try {
      // 建立 media container
      const createResponse = await axios.post<{ id: string }>(endpoint, {
        message: content.text,
        access_token: this.credentials.accessToken
      });

      const mediaId = createResponse.data.id;

      // 發布
      const publishResponse = await axios.post<{ id: string }>(`${endpoint.replace('/media', '/media_publish')}`, {
        creation_id: mediaId,
        access_token: this.credentials.accessToken
      });

      const postId = publishResponse.data.id;

      return {
        success: true,
        postId,
        url: `https://threads.net/@${this.credentials.userId}/post/${postId}`
      };
    } catch (error) {
      logger.error('Threads post failed', { error });
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }

  validate(content: string): boolean {
    return content.length <= this.maxLength;
  }
}
