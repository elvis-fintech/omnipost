// 平台通用類型定義

export interface ContentInput {
  originalContent: string;
  targetPlatform: PlatformType;
  tone?: 'professional' | 'casual' | 'engaging';
  hashtags?: boolean;
  mediaUrls?: string[];
  outputLanguage?: OutputLanguage;
}

export interface GeneratedContent {
  platform: PlatformType;
  text: string;
  media?: MediaContent[];
  scheduledAt?: Date;
}

export interface MediaContent {
  type: 'image' | 'video' | 'link';
  url: string;
  caption?: string;
}

export type PlatformType = 'threads' | 'linkedin' | 'instagram';
export type OutputLanguage = 'zh-Hant' | 'en';

export interface PlatformCredentials {
  accessToken: string;
  userId: string;
}

export interface PostResult {
  success: boolean;
  postId?: string;
  url?: string;
  error?: string;
}
