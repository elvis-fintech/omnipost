// 設定管理
import dotenv from 'dotenv';
dotenv.config();

export const config = {
  openaiApiKey: process.env.OPENAI_API_KEY || '',
  openaiApiBase: process.env.OPENAI_API_BASE || undefined,
  openaiModel: process.env.OPENAI_MODEL || 'gpt-4-turbo-preview',
  appApiKey: process.env.APP_API_KEY || '',
  port: parseInt(process.env.PORT || '3000', 10),
  logLevel: process.env.LOG_LEVEL || 'info',
  platformCredentials: {
    threads: {
      accessToken: process.env.THREADS_ACCESS_TOKEN || '',
      userId: process.env.THREADS_USER_ID || ''
    },
    linkedin: {
      accessToken: process.env.LINKEDIN_ACCESS_TOKEN || '',
      userId: process.env.LINKEDIN_USER_ID || ''
    },
    instagram: {
      accessToken: process.env.IG_ACCESS_TOKEN || '',
      userId: process.env.IG_USER_ID || ''
    }
  }
};
