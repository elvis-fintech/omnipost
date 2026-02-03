# omnipost

Multi-platform content generation and publishing tool. One prompt, optimized for multiple platforms.

![Node.js](https://img.shields.io/badge/Node.js-20+-green)
![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue)
![License](https://img.shields.io/badge/License-MIT-yellow)

## Core Features

- **AI Content Generation** - Generate platform-optimized content from user input
- **Platform Adapters** - Optimized for Threads, LinkedIn, Instagram
- **Scheduled Publishing** - Auto-publish at scheduled times
- **Content History** - Store generation history for consistent tone
- **REST API** - Simple and easy to use

## Project Structure

```
omnipost/
├── README.md
├── package.json
├── tsconfig.json
├── .eslintrc.json
├── .gitignore
├── .env.example
├── src/
│   ├── index.ts           # Entry point
│   ├── config/
│   │   └── index.ts       # Config management
│   ├── api/
│   │   └── routes.ts      # REST API
│   ├── core/
│   │   ├── generator.ts   # AI content generation
│   │   ├── adapter.ts     # Platform adapter base
│   │   └── scheduler.ts   # Post scheduling
│   ├── db/
│   │   └── index.ts       # SQLite database
│   ├── platforms/
│   │   ├── types.ts       # Shared types
│   │   ├── threads.ts     # Threads adapter
│   │   ├── linkedin.ts    # LinkedIn adapter
│   │   └── instagram.ts   # Instagram adapter
│   └── utils/
│       ├── logger.ts       # Winston logger
│       └── validator.ts    # Zod schemas
├── tests/
│   └── README.md
├── docs/
│   └── API.md
├── data/                  # SQLite database (auto-created)
└── .env.example
```

## Quick Start

```bash
# Clone or navigate to project
cd omnipost

# Install dependencies
npm install

# Copy environment file
cp .env.example .env

# Edit .env with your API keys
# - OPENAI_API_KEY (required)
# - Platform tokens (Threads/LinkedIn/IG)

# Run development server
npm run dev
```

## API Documentation

See [docs/API.md](docs/API.md) for full API documentation.

## Testing

```bash
# Run all tests
npm test

# Run with UI
npm run test:ui
```

## Supported Platforms

| Platform | Max Length | Style |
|----------|------------|-------|
| LinkedIn | 3000 | Professional, industry insights |
| Threads | 500 | Casual, conversational |
| Instagram | 2200 | Visual, concise |

## Tech Stack

- **Runtime:** Node.js 20+
- **Language:** TypeScript 5.3
- **Framework:** Hono
- **AI:** OpenAI GPT-4
- **Database:** SQLite (better-sqlite3)
- **Testing:** Vitest
- **Linting:** ESLint

## Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

MIT License - see [LICENSE](LICENSE) for details.
