# Repository Guidelines

## Project Structure & Module Organization
核心程式碼位於 `src/`。`src/index.ts` 是服務入口；`src/api/` 放路由；`src/core/` 放內容生成、排程與轉接邏輯；`src/platforms/` 放各平台實作（Threads、LinkedIn、Instagram）；`src/db/` 為 SQLite 存取；`src/utils/` 放 logger 與驗證工具。單元測試以同層方式放在 `src/**/*.test.ts`，`tests/` 目前保留給整合測試。API 文件在 `docs/API.md`，執行後會自動建立 `data/` 資料庫檔案。

## Build, Test, and Development Commands
- `npm install`：安裝依賴。
- `npm run dev`：以 `tsx watch` 啟動開發模式。
- `npm run build`：使用 TypeScript 編譯至 `dist/`。
- `npm run start`：執行編譯後的 `dist/index.js`。
- `npm test`：執行 Vitest 測試（Node 環境，測試 DB 使用記憶體）。
- `npm run lint`：對 `src/**/*.ts` 執行 ESLint。

## Coding Style & Naming Conventions
使用 TypeScript（ES2022、`strict: true`），縮排 2 空白並保留分號。檔名採小寫功能名（如 `generator.ts`、`routes.ts`）。類別使用 PascalCase（如 `ContentGenerator`），函式與變數使用 camelCase，常數使用 UPPER_SNAKE_CASE（如 `PLATFORM_PROMPTS`）。維持模組單一責任，避免跨層直接耦合。

## Testing Guidelines
測試框架為 Vitest。新增或修改功能時，請在對應模組旁新增 `*.test.ts`，命名建議使用 `should ...` 行為描述。優先覆蓋核心流程、錯誤處理與平台差異邏輯；涉及 API 變更時，請同步更新 `docs/API.md` 範例。

## Commit & Pull Request Guidelines
目前 commit 歷史以簡短祈使句為主（例如 `Add ...`、`Fix ...`、`Update ...`、`Rename ...`）。請保持單一主題提交，訊息格式建議：`<Verb> <scope/summary>`。PR 需包含：變更摘要、測試結果（至少 `npm test` 與 `npm run lint`）、關聯議題（若有）、以及 API 或設定變更說明。

## Security & Configuration Tips
敏感資訊只放 `.env`，禁止提交 API 金鑰。至少確認 `OPENAI_API_KEY` 已設定；部署到無法使用本地 SQLite 的環境（如 serverless）時，需改用外部資料庫方案。
