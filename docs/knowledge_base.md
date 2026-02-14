# 知識庫

## 2026-02-14：將 Omnipost 提升到可試用 MVP 的最小落地方案

### 問題
- 排程任務只存在記憶體，服務重啟即遺失。
- 生成、發佈、排程 API 沒有保護，存在直接被濫用風險。
- Instagram 發佈缺少媒體時會在執行期失敗。

### 解法
- 新增 `scheduled_jobs` 資料表，將排程任務持久化到 SQLite。
- Scheduler 改為「DB 領取 + 輪詢執行」模型，支援重啟後恢復待處理任務。
- 新增 `APP_API_KEY`，以 `x-api-key` 或 `Authorization: Bearer` 保護 API。
- 對 Instagram 的發佈與排程增加 `mediaUrls` 前置驗證，提早回傳可讀錯誤。
- `health` 回傳新增 `checks`，明確顯示 OpenAI 與 API 防護狀態。

### 驗證結果
- `npm run build` 通過。
- `npm run lint` 通過。
- `npx vitest run` 通過（52 tests）。

### 後續建議
- 若要進入正式商用，補上帳號/角色層授權（不只單一 API key）。
- 新增排程重試策略（例如指數退避）與失敗告警通道。
