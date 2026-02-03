// 平台適配器 base class
import { 
  PlatformType, 
  GeneratedContent, 
  PostResult,
  PlatformCredentials 
} from '../platforms/types.js';
import logger from '../utils/logger.js';

export abstract class PlatformAdapter {
  protected credentials: PlatformCredentials;

  constructor(credentials: PlatformCredentials) {
    this.credentials = credentials;
  }

  abstract platform: PlatformType;
  abstract maxLength: number;

  abstract post(content: GeneratedContent): Promise<PostResult>;
  abstract validate(content: string): boolean;

  protected async executePost(content: GeneratedContent): Promise<PostResult> {
    try {
      if (!this.validate(content.text)) {
        return {
          success: false,
          error: `Content exceeds ${this.platform} max length of ${this.maxLength} characters`
        };
      }

      const result = await this.post(content);
      
      logger.info(`Posted to ${this.platform}`, { 
        platform: this.platform,
        success: result.success,
        postId: result.postId 
      });

      return result;
    } catch (error) {
      logger.error(`Failed to post to ${this.platform}`, { error });
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }
}
