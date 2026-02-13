// Entry point
import { Hono } from 'hono';
import { serve } from '@hono/node-server';
import { serveStatic } from '@hono/node-server/serve-static';
import app from './api/routes.js';
import { config } from './config/index.js';
import logger from './utils/logger.js';

const server = new Hono();


server.use('/static/*', serveStatic({ root: './public' }));
server.use('/favicon.svg', serveStatic({ path: './public/favicon.svg' }));
server.use('/logo.svg', serveStatic({ path: './public/logo.svg' }));

server.route('/', app);


serve({
  fetch: server.fetch,
  port: config.port
}, (info) => {
  logger.info(`CrossReach server running on port ${info.port}`);
});

console.log(`🚀 CrossReach running at http://localhost:${config.port}`);
