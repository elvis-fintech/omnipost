// LinkedIn 平台適配器
import axios from 'axios';
import { PlatformAdapter } from '../core/adapter.js';
import type { GeneratedContent, PostResult } from '../platforms/types.js';
import logger from '../utils/logger.js';

export class LinkedInAdapter extends PlatformAdapter {
  platform = 'linkedin' as const;
  maxLength = 3000;

  async post(content: GeneratedContent): Promise<PostResult> {
    const endpoint = 'https://api.linkedin.com/v2/ugcPosts';

    try {
      const response = await axios.post<{ id: string }>(endpoint, {
        author: `urn:li:person:${this.credentials.userId}`,
        lifecycleState: 'PUBLISHED',
        specificContent: {
          'com.linkedin.ugc.ShareContent': {
            shareCommentary: {
              text: content.text
            },
            shareMediaCategory: 'NONE'
          }
        },
        visibility: {
          'com.linkedin.ugc.MemberNetworkVisibility': 'PUBLIC'
        }
      }, {
        headers: {
          'Authorization': `Bearer ${this.credentials.accessToken}`,
          'Content-Type': 'application/json',
          'X-Restli-Protocol-Version': '2.0.0'
        }
      });

      const postId = response.data.id;

      return {
        success: true,
        postId,
        url: `https://www.linkedin.com/feed/update/${postId}`
      };
    } catch (error) {
      logger.error('LinkedIn post failed', { error });
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
