// Instagram 平台適配器
import axios from 'axios';
import { PlatformAdapter } from '../core/adapter.js';
import { GeneratedContent, PostResult } from '../platforms/types.js';
import logger from '../utils/logger.js';

export class InstagramAdapter extends PlatformAdapter {
  platform = 'instagram' as const;
  maxLength = 2200;

  async post(content: GeneratedContent): Promise<PostResult> {
    const endpoint = `https://graph.facebook.com/v18.0/${this.credentials.userId}/media`;

    try {
      // 建立 media container
      const createResponse = await axios.post(endpoint, {
        caption: content.text,
        image_url: content.media?.[0]?.url,
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
        url: `https://www.instagram.com/p/${publishResponse.data.id}`
      };
    } catch (error) {
      logger.error('Instagram post failed', { error });
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
