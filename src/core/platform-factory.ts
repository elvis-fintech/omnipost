import { config } from '../config/index.js';
import { ThreadsAdapter } from '../platforms/threads.js';
import { LinkedInAdapter } from '../platforms/linkedin.js';
import { InstagramAdapter } from '../platforms/instagram.js';
import type { PlatformType } from '../platforms/types.js';

export function createPlatformAdapter(platform: PlatformType) {
  const credentials = config.platformCredentials[platform];

  // 發佈前必須確保該平台憑證完整
  if (!credentials.accessToken || !credentials.userId) {
    throw new Error(`Missing ${platform} credentials in environment variables`);
  }

  switch (platform) {
    case 'threads':
      return new ThreadsAdapter(credentials);
    case 'linkedin':
      return new LinkedInAdapter(credentials);
    case 'instagram':
      return new InstagramAdapter(credentials);
  }
}
