# CrossReach

跨平台內容生成與發布工具。一個 prompt，多平台適配發布。

![Node.js](https://img.shields.io/badge/Node.js-20+-green)
![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue)
![License](https://img.shields.io/badge/License-MIT-yellow)

## 核心功能

- **AI 內容生成** — 根據用戶輸入，生成符合各平台風格的內容
- **平台適配** — Threads、LinkedIn、Instagram 各自優化
- **排程發布** — 預設時間自動發布
- **REST API** — 簡單易用

## Project Structure

```
CrossReach/
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
│   ├── platforms/
│   │   ├── types.ts       # Shared types
│   │   ├── threads.ts     # Threads adapter
│   │   ├── linkedin.ts    # LinkedIn adapter
│   │   └── instagram.ts  # Instagram adapter
│   └── utils/
│       ├── logger.ts      # Winston logger
│       └── validator.ts   # Zod schemas
├── tests/
│   └── README.md
├── docs/
│   └── API.md
└── .env.example
```

## 快速開始

```bash
# Clone or navigate to project
cd CrossReach

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

## API 文件

See [docs/API.md](docs/API.md) for full API documentation.

## 測試

```bash
# Run all tests
npm test

# Run with UI
npm run test:ui
```

## 支援平台

| 平台 | 字數上限 | 風格 |
|------|----------|------|
| LinkedIn | 3000 | 專業、正經、產業洞察 |
| Threads | 500 | 輕鬆、對話式、互動 |
| Instagram | 2200 | 視覺導向、簡短吸引 |

## Tech Stack

- **Runtime:** Node.js 20+
- **Language:** TypeScript 5.3
- **Framework:** Hono
- **AI:** OpenAI GPT-4
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
