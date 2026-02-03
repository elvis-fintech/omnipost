# CrossReach

跨平台內容生成與發布工具。一個 prompt，多平台適配發布。

## 核心功能

- **AI 內容生成** — 根據用戶輸入，生成符合各平台風格的內容
- **平台適配** — Threads、LinkedIn、Instagram 各自優化
- **排程發布** — 預設時間自動發布
- **成效追蹤** — 追蹤各平台互動數據

## Project Structure

```
CrossReach/
├── README.md
├── src/
│   ├── core/              # 核心邏輯
│   │   ├── generator.ts   # AI 內容生成
│   │   ├── adapter.ts     # 平台適配器
│   │   └── scheduler.ts   # 排程系統
│   ├── platforms/         # 各平台實作
│   │   ├── threads.ts
│   │   ├── linkedin.ts
│   │   ├── instagram.ts
│   │   └── types.ts       # 平台通用類型
│   ├── api/               # API 介面
│   │   ├── routes.ts
│   │   └── schema.ts      # 請求驗證
│   ├── config/            # 設定
│   │   ├── index.ts
│   │   └── prompts.ts     # 各平台 prompt 模板
│   └── utils/
│       ├── logger.ts
│       └── validator.ts
├── tests/
├── docs/
├── package.json
└── .env.example
```

## 快速開始

```bash
npm install
cp .env.example .env
# 填入 API keys
npm run dev
```

## 支援平台

| 平台 | 風格特點 |
|------|----------|
| LinkedIn | 專業、正經、產業洞察 |
| Threads | 輕鬆、對話式、互動向 |
| Instagram | 視覺導向、簡短吸引 |

## License

MIT
