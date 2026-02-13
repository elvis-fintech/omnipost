# Omnipost

Omnipost is a multi-platform content generation and publishing tool.
Write once, then generate platform-optimized drafts for LinkedIn, Threads, and Instagram.

![Node.js](https://img.shields.io/badge/Node.js-20+-green)
![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue)
![License](https://img.shields.io/badge/License-MIT-yellow)

## Features

- One-click AI generation for 3 platforms
- Platform-aware tone and length constraints
- UI language and output language can be configured independently
- Built-in Dashboard for generate, review, copy, and schedule
- REST API for external integrations

## Quick Start (3 Minutes)

### 1) Install dependencies

```bash
npm install
```

### 2) Create your environment file

PowerShell:

```powershell
Copy-Item .env.example .env
```

macOS / Linux:

```bash
cp .env.example .env
```

### 3) Fill minimum OpenAI settings

```env
OPENAI_API_KEY=your_api_key
OPENAI_API_BASE=
OPENAI_MODEL=gpt-4-turbo-preview
```

- Leave `OPENAI_API_BASE` empty to use the official OpenAI endpoint.
- If you use an OpenAI-compatible provider, set `OPENAI_API_BASE` to their base URL (for example `https://example.com/v1`).

### 4) Start the app

```bash
npm run dev
```

Open:

- Dashboard: `http://localhost:3000/`
- Health: `http://localhost:3000/health`

## Dashboard Flow

1. Paste your original content in the left panel.
2. In Advanced Settings, choose tone and output language (Traditional Chinese or English).
3. Click **Generate 3 platforms**.
4. Review all generated drafts in the workspace.
5. Copy current/all outputs, or schedule posting.

## API Quick Examples

### Generate all platforms

```bash
curl -X POST http://localhost:3000/generate/all \
  -H "Content-Type: application/json" \
  -d '{
    "originalContent": "We just shipped a new analytics feature for PM teams.",
    "tone": "professional",
    "hashtags": true,
    "outputLanguage": "en"
  }'
```

### Generate single platform

```bash
curl -X POST http://localhost:3000/generate \
  -H "Content-Type: application/json" \
  -d '{
    "originalContent": "We just shipped a new analytics feature.",
    "targetPlatform": "linkedin",
    "tone": "professional",
    "outputLanguage": "en"
  }'
```

See full API details in `docs/API.md`.

## Environment Variables

| Variable | Required | Purpose |
|---|---|---|
| `OPENAI_API_KEY` | Yes | API key for content generation |
| `OPENAI_API_BASE` | No | OpenAI-compatible base URL |
| `OPENAI_MODEL` | No | Model name |
| `PORT` | No | Server port (default `3000`) |
| `LOG_LEVEL` | No | Log level (default `info`) |
| `THREADS_ACCESS_TOKEN` | Required for posting | Threads posting token |
| `THREADS_USER_ID` | Required for posting | Threads user ID |
| `LINKEDIN_ACCESS_TOKEN` | Required for posting | LinkedIn posting token |
| `LINKEDIN_USER_ID` | Required for posting | LinkedIn member ID |
| `IG_ACCESS_TOKEN` | Required for posting | Instagram posting token |
| `IG_USER_ID` | Required for posting | Instagram user ID |

> If you only generate content (no real posting/scheduling), OpenAI settings are enough.

## Development Commands

```bash
npm run dev       # Start dev server (tsx watch)
npm run build     # Compile TypeScript to dist/
npm run start     # Run compiled app
npm run lint      # Run ESLint
npm test          # Run Vitest (watch mode)
npx vitest run    # Run tests once
npm run test:ui   # Run Vitest UI
```

## Troubleshooting

### `EADDRINUSE: address already in use :::3000`

Port 3000 is already occupied.

- Close the previous `npm run dev` process, or
- Change `PORT` in `.env` (for example `3001`) and restart.

### 4xx / 403 on generation

Check in this order:

1. Restart server after editing `.env`
2. Verify `OPENAI_API_KEY`
3. Verify `OPENAI_API_BASE` (leave empty if unsure)
4. Verify `OPENAI_MODEL` is supported by your provider

### Scheduling/posting fails

Make sure platform access tokens and user IDs are present and not expired.

## Project Structure

```text
src/
├── index.ts             # Server entry
├── api/routes.ts        # API + dashboard routes
├── core/                # generator, scheduler, platform factory
├── db/index.ts          # SQLite operations
├── platforms/           # platform adapters + shared types
├── ui/dashboard.ts      # dashboard HTML + frontend logic
└── utils/               # logger + validator
```

## Security Notes

- Never commit `.env`
- Rotate API keys and platform tokens periodically
- For serverless deployments, use external DB instead of local SQLite

## License

MIT (see `LICENSE`)
