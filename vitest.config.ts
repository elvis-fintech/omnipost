import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'node',
    env: {
      DB_PATH: ':memory:',
      APP_API_KEY: 'test-api-key',
      OPENAI_API_KEY: 'test-openai-key'
    }
  }
});
