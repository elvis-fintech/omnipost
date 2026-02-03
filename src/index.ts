// Entry point
import { Hono } from 'hono';
import { serve } from '@hono/node-server';
import app from './api/routes.js';
import { config } from './config/index.js';
import logger from './utils/logger.js';

const server = new Hono();

server.route('/', app);

serve({
  fetch: server.fetch,
  port: config.port
}, (info) => {
  logger.info(`CrossReach server running on port ${info.port}`);
});

console.log(`🚀 CrossReach running at http://localhost:${config.port}`);
