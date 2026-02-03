// Threads 平台適配器
import axios from 'axios';
import { PlatformAdapter } from '../core/adapter.js';
import { GeneratedContent, PostResult } from '../platforms/types.js';
import logger from '../utils/logger.js';
import { config } from '../config/index.js';

export class ThreadsAdapter extends PlatformAdapter {
  platform = 'threads' as const;
  maxLength = 500;

  async post(content: GeneratedContent): Promise<PostResult> {
    const endpoint = `https://graph.facebook.com/v18.0/${this.credentials.userId}/media`;
    
    try {
      // 建立 media container
      const createResponse = await axios.post(endpoint, {
        message: content.text,
        access_token: this.credentials.accessToken
      });

      const mediaId = createResponse.data.id;

      // 發布
      const publishResponse = await axios.post(`${endpoint.replace('/media', '/media_publish')}`, {
        creation_id: mediaId,
        access_token: this.credentials.accessToken
      });

      return {
        success: true,
        postId: publishResponse.data.id,
        url: `https://threads.net/@${this.credentials.userId}/post/${publishResponse.data.id}`
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
