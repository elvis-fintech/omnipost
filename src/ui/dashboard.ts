export function renderDashboardPage(): string {
  return `<!doctype html>
<html lang="zh-Hant">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <link rel="manifest" href="/static/manifest.json">
  <title>Omnipost Console</title>
  <link rel="icon" type="image/svg+xml" href="/favicon.svg">
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;700;800&family=Noto+Sans+TC:wght@400;500;700;900&display=swap');

    :root {
      --primary: #0f4c81;
      --secondary: #ea580c;
      --text-main: #0f172a;
      --text-sub: #475569;
      --line: #dbe4f0;
      --surface: #ffffff;
      --surface-soft: #f8fbff;
      --ok: #0f766e;
      --warn: #b45309;
      --danger: #b91c1c;
      --focus: rgba(15, 76, 129, 0.2);
    }

    * {
      box-sizing: border-box;
    }

    html,
    body {
      margin: 0;
      padding: 0;
      font-family: "Plus Jakarta Sans", "Noto Sans TC", "Segoe UI", sans-serif;
      font-size: 16px;
      color: var(--text-main);
      background:
        radial-gradient(circle at 2% 0%, #dbeafe 0%, transparent 22%),
        radial-gradient(circle at 98% 4%, #ffedd5 0%, transparent 24%),
        #f1f5f9;
    }

    body {
      min-height: 100vh;
    }

    .topbar {
      position: sticky;
      top: 0;
      z-index: 10;
      backdrop-filter: blur(10px);
      background: rgba(241, 245, 249, 0.82);
      border-bottom: 1px solid rgba(148, 163, 184, 0.25);
    }

    .topbar-inner {
      max-width: 1820px;
      margin: 0 auto;
      padding: 14px 28px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 16px;
    }

    .brand {
      display: flex;
      align-items: center;
      gap: 12px;
      font-size: 24px;
      font-weight: 800;
      letter-spacing: 0.01em;
    }

    .brand-badge {
      width: 40px;
      height: 40px;
      border-radius: 12px;
      display: grid;
      place-items: center;
    }

    .top-actions {
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .lang-switch {
      display: inline-flex;
      padding: 4px;
      border-radius: 999px;
      border: 1px solid var(--line);
      background: #fff;
      gap: 6px;
    }

    .lang-switch button {
      border: 0;
      background: transparent;
      color: var(--text-sub);
      border-radius: 999px;
      padding: 8px 14px;
      font-size: 13px;
      font-weight: 800;
      cursor: pointer;
    }

    .lang-switch button.on {
      color: #fff;
      background: linear-gradient(135deg, var(--primary), #1d4ed8);
    }

    .api-pill {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      border: 1px solid var(--line);
      background: #fff;
      border-radius: 999px;
      padding: 10px 14px;
      font-size: 13px;
      font-weight: 700;
      color: var(--text-sub);
      white-space: nowrap;
    }

    .dot {
      width: 9px;
      height: 9px;
      border-radius: 999px;
      background: #94a3b8;
    }

    .dot.ok {
      background: var(--ok);
    }

    .dot.warn {
      background: var(--warn);
    }

    .layout {
      max-width: 1820px;
      margin: 0 auto;
      padding: 20px 24px 24px;
      display: grid;
      grid-template-columns: minmax(360px, 420px) minmax(0, 1fr);
      gap: 20px;
      align-items: stretch;
    }

    .card {
      background: var(--surface);
      border: 1px solid var(--line);
      border-radius: 20px;
      box-shadow: 0 12px 30px rgba(15, 23, 42, 0.08);
    }

    .control {
      position: static;
      overflow: visible;
      max-height: none;
    }

    .section {
      padding: 18px;
    }

    .section + .section {
      border-top: 1px solid #e2e8f0;
    }

    .hero-title {
      margin: 0;
      font-size: 28px;
      line-height: 1.2;
      letter-spacing: -0.01em;
    }

    .hero-sub {
      margin: 8px 0 0;
      color: var(--text-sub);
      font-size: 15px;
      line-height: 1.45;
    }

    .label {
      display: block;
      margin: 12px 0 8px;
      font-size: 14px;
      font-weight: 800;
    }

    textarea,
    select,
    input[type="datetime-local"] {
      width: 100%;
      border: 1px solid #cbd5e1;
      border-radius: 14px;
      padding: 12px 14px;
      font: inherit;
      color: var(--text-main);
      background: #fff;
      outline: 0;
    }

    textarea {
      min-height: 180px;
      resize: vertical;
      line-height: 1.55;
    }

    textarea:focus,
    select:focus,
    input[type="datetime-local"]:focus {
      border-color: var(--primary);
      box-shadow: 0 0 0 3px var(--focus);
    }

    .primary-actions {
      margin-top: 14px;
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 10px;
    }

    .btn {
      border: 0;
      border-radius: 12px;
      padding: 12px 14px;
      font: inherit;
      font-size: 15px;
      font-weight: 800;
      cursor: pointer;
      transition: filter 0.2s ease, background-color 0.2s ease, border-color 0.2s ease;
    }

    .btn:hover {
      filter: brightness(1.02);
    }

    .btn:focus-visible {
      outline: none;
      box-shadow: 0 0 0 3px var(--focus);
    }

    .btn.primary {
      color: #fff;
      background: linear-gradient(135deg, var(--primary), #1d4ed8);
    }

    .btn.secondary {
      color: var(--text-main);
      background: #fff;
      border: 1px solid #cbd5e1;
    }

    .advanced {
      margin-top: 14px;
      border: 1px solid #dbe4f0;
      border-radius: 16px;
      background: #f8fbff;
      overflow: hidden;
    }

    .advanced summary {
      list-style: none;
      padding: 14px 16px;
      font-size: 14px;
      font-weight: 800;
      color: #1e3a8a;
      cursor: pointer;
      user-select: none;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 8px;
    }

    .advanced summary::-webkit-details-marker {
      display: none;
    }

    .advanced summary::after {
      content: "+";
      font-size: 20px;
      line-height: 1;
    }

    .advanced[open] summary::after {
      content: "−";
    }

    .advanced-content {
      border-top: 1px solid #dbe4f0;
      padding: 16px;
      display: grid;
      gap: 12px;
      background: #fff;
    }

    .two-col {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 12px;
    }

    .check-row {
      display: flex;
      gap: 12px;
      flex-wrap: wrap;
      align-items: center;
    }

    .hint {
      margin: 0;
      color: var(--text-sub);
      font-size: 13px;
      font-weight: 600;
    }

    .check {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      font-size: 14px;
      color: var(--text-sub);
      font-weight: 700;
    }

    .check input {
      accent-color: var(--primary);
    }

    .platform-grid {
      display: grid;
      grid-template-columns: repeat(3, minmax(0, 1fr));
      gap: 10px;
      width: 100%;
    }

    .platform-grid .check {
      border: 1px solid #cbd5e1;
      border-radius: 12px;
      padding: 10px;
      justify-content: center;
      background: #fff;
    }

    .secondary-actions {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 10px;
    }

    .status {
      min-height: 24px;
      margin-top: 14px;
      font-size: 14px;
      font-weight: 700;
      color: var(--text-sub);
    }

    .status.ok {
      color: var(--ok);
    }

    .status.err {
      color: var(--danger);
    }

    .workspace {
      overflow: hidden;
      display: flex;
      flex-direction: column;
      min-height: 0;
    }

    .workspace-head {
      padding: 18px 20px 12px;
      border-bottom: 1px solid #e2e8f0;
      display: flex;
      justify-content: space-between;
      gap: 18px;
      align-items: center;
    }

    .workspace-head h2 {
      margin: 0;
      font-size: 26px;
      letter-spacing: -0.02em;
    }

    .workspace-head p {
      margin: 4px 0 0;
      color: var(--text-sub);
      font-size: 14px;
    }

    .workspace-meta {
      display: inline-flex;
      gap: 8px;
      align-items: center;
      flex-wrap: wrap;
    }

    .meta-pill {
      border: 1px solid #bfdbfe;
      color: #1e40af;
      background: #eff6ff;
      border-radius: 999px;
      padding: 6px 12px;
      font-size: 12px;
      font-weight: 800;
      white-space: nowrap;
    }

    .meta-pill.live {
      border-color: #fcd34d;
      color: #92400e;
      background: #fffbeb;
    }

    .tabs {
      display: none;
    }

    .tab {
      margin: 10px 0;
      border: 1px solid #cbd5e1;
      border-radius: 12px;
      background: #fff;
      color: var(--text-main);
      font: inherit;
      cursor: pointer;
      padding: 8px 12px;
      display: inline-flex;
      align-items: center;
      gap: 8px;
      font-weight: 800;
    }

    .tab small {
      font-size: 13px;
      color: var(--text-sub);
      font-weight: 700;
    }

    .tab.active {
      border-color: #93c5fd;
      background: #eff6ff;
      color: #1e40af;
    }

    .quick-grid {
      padding: 12px 20px 0;
      display: grid;
      grid-template-columns: repeat(3, minmax(0, 1fr));
      gap: 10px;
    }

    .quick-card {
      border: 1px solid #dbe4f0;
      border-radius: 14px;
      background: #fff;
      padding: 12px;
      display: grid;
      gap: 6px;
      cursor: pointer;
      transition: border-color 0.2s ease, box-shadow 0.2s ease;
    }

    .quick-card:hover {
      border-color: #93c5fd;
      box-shadow: 0 8px 22px rgba(15, 76, 129, 0.09);
    }

    .quick-card:focus-visible {
      outline: none;
      border-color: #93c5fd;
      box-shadow: 0 0 0 3px var(--focus);
    }

    .quick-card.active {
      border-color: #60a5fa;
      box-shadow: 0 10px 24px rgba(37, 99, 235, 0.12);
      background: #f8fbff;
    }

    .quick-head {
      display: flex;
      justify-content: space-between;
      gap: 8px;
      align-items: center;
      font-size: 14px;
      font-weight: 800;
    }

    .quick-state {
      border: 1px solid #cbd5e1;
      border-radius: 999px;
      padding: 4px 9px;
      font-size: 12px;
      color: #475569;
      background: #f8fafc;
    }

    .quick-state.ok {
      color: #0f766e;
      border-color: #99f6e4;
      background: #f0fdfa;
    }

    .quick-foot {
      display: flex;
      justify-content: flex-start;
      align-items: center;
    }

    .quick-count {
      color: #334155;
      font-size: 12px;
      font-weight: 700;
    }

    .quick-snippet {
      margin: 0;
      color: var(--text-sub);
      font-size: 13px;
      line-height: 1.45;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }

    .quick-card:not(.has-content) .quick-snippet {
      color: #94a3b8;
    }

    .focus {
      padding: 14px 20px 16px;
      display: grid;
      grid-template-rows: auto auto auto;
      gap: 12px;
      min-height: 0;
    }

    .focus-top {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      gap: 20px;
    }

    .focus-top strong {
      color: var(--text-main);
      font-size: 22px;
      line-height: 1.2;
      display: block;
    }

    .focus-meta {
      margin: 6px 0 0;
      color: var(--text-sub);
      font-size: 14px;
      font-weight: 600;
    }

    .usage {
      min-width: 196px;
      display: grid;
      gap: 5px;
      justify-items: end;
      color: var(--text-sub);
      font-size: 13px;
      font-weight: 700;
    }

    .batch-progress {
      font-size: 12px;
      color: #1e40af;
      font-weight: 800;
    }

    .focus-state {
      border: 1px solid #cbd5e1;
      border-radius: 999px;
      padding: 4px 12px;
      font-size: 12px;
      color: #475569;
      background: #f8fafc;
    }

    .focus-state.ok {
      color: #0f766e;
      border-color: #99f6e4;
      background: #f0fdfa;
    }

    .meter {
      width: 180px;
      height: 8px;
      border-radius: 999px;
      background: #e2e8f0;
      overflow: hidden;
    }

    .meter > span {
      display: block;
      width: 0;
      height: 100%;
      border-radius: inherit;
      background: linear-gradient(135deg, #0f4c81, #1d4ed8);
      transition: width 0.2s ease;
    }

    .meter > span.warn {
      background: linear-gradient(135deg, #d97706, #b45309);
    }

    .focus-body {
      border: 1px solid #cbd5e1;
      background: var(--surface-soft);
      border-radius: 16px;
      padding: 14px;
      min-height: 220px;
      max-height: min(44vh, 480px);
      height: auto;
      font-size: 15px;
      line-height: 1.6;
      white-space: pre-wrap;
      overflow: auto;
    }

    .focus-body[data-generated="false"] {
      white-space: normal;
      min-height: 150px;
      max-height: 220px;
      overflow: auto;
    }

    .focus-empty {
      display: grid;
      gap: 8px;
      justify-items: start;
    }

    .focus-empty strong {
      font-size: 15px;
      line-height: 1.3;
    }

    .inline-gen {
      margin-top: 0;
    }

    .focus-actions {
      display: flex;
      gap: 10px;
      justify-content: flex-start;
      flex-wrap: wrap;
    }

    .feed-wrap {
      margin: 0 20px 18px;
      border: 1px solid #dbe4f0;
      border-radius: 14px;
      background: #fff;
      overflow: hidden;
    }

    .feed-wrap summary {
      list-style: none;
      padding: 12px 14px;
      font-size: 14px;
      font-weight: 800;
      cursor: pointer;
      color: #1e3a8a;
      border-bottom: 1px solid transparent;
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 10px;
    }

    .feed-wrap summary::after {
      content: "+";
      font-size: 18px;
      line-height: 1;
      color: #1e40af;
    }

    .feed-wrap[open] summary {
      border-bottom-color: #e2e8f0;
    }

    .feed-wrap[open] summary::after {
      content: "−";
    }

    .feed-wrap summary::-webkit-details-marker {
      display: none;
    }

    .feed-grid {
      padding: 14px;
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 12px;
    }

    .feed-card {
      border: 1px solid #dbe4f0;
      border-radius: 14px;
      padding: 12px;
      min-height: 140px;
      background: #fff;
    }

    .feed-card h3 {
      margin: 0 0 10px;
      font-size: 16px;
    }

    .feed-card ul {
      margin: 0;
      padding: 0;
      list-style: none;
      display: grid;
      gap: 8px;
      max-height: 220px;
      overflow: auto;
    }

    .feed-card li {
      border: 1px solid #e2e8f0;
      border-radius: 12px;
      padding: 10px;
      background: #f8fafc;
      font-size: 13px;
      line-height: 1.45;
    }

    .feed-card li strong {
      display: block;
      margin-bottom: 5px;
    }

    @media (max-width: 1520px) {
      .layout {
        grid-template-columns: minmax(340px, 390px) minmax(0, 1fr);
        gap: 16px;
        padding: 16px 18px 20px;
      }
    }

    @media (max-width: 1320px) and (min-width: 1201px) {
      .quick-grid {
        grid-template-columns: repeat(2, minmax(0, 1fr));
      }
    }

    @media (max-width: 1200px) {
      .layout {
        grid-template-columns: 1fr;
      }

      .control {
        position: static;
        max-height: none;
      }

      .feed-grid {
        grid-template-columns: 1fr;
      }
    }

    @media (max-height: 820px) and (min-width: 1201px) {
      textarea {
        min-height: 160px;
      }

      .quick-snippet {
        -webkit-line-clamp: 1;
      }

      .feed-card {
        min-height: 110px;
      }

      .focus-body {
        min-height: 140px;
        max-height: min(36vh, 340px);
      }

      ul {
        max-height: 170px;
      }
    }

    @media (max-width: 860px) {
      .topbar-inner {
        flex-direction: column;
        align-items: flex-start;
      }

      .two-col,
      .platform-grid,
      .secondary-actions,
      .primary-actions,
      .quick-grid {
        grid-template-columns: 1fr;
      }

      .workspace-head,
      .focus-top {
        flex-direction: column;
        align-items: flex-start;
      }

      .usage {
        justify-items: start;
      }

      .meter {
        width: 100%;
      }

      .meta-pill.secondary {
        display: none;
      }
    }
  </style>
</head>
<body>
  <header class="topbar">
    <div class="topbar-inner">
      <div class="brand">
        <span class="brand-badge">
          <img src="/logo.svg" alt="Omnipost" width="40" height="40" />
        </span>
        Omnipost Console
      </div>
      <div class="top-actions">
        <div class="lang-switch">
          <button id="langZh" data-lang="zh-HK">繁中</button>
          <button id="langEn" data-lang="en">EN</button>
        </div>
        <div class="api-pill">
          <span id="dot" class="dot"></span>
          <span id="apiText">API 檢查中...</span>
        </div>
      </div>
    </div>
  </header>

  <main class="layout">
    <aside class="card control">
      <section class="section">
        <h1 class="hero-title" data-i18n="title">一鍵三平台</h1>
        <p class="hero-sub" data-i18n="sub">貼一次原文，立即批次生成。</p>

        <form id="form">
          <label class="label" for="txt" data-i18n="lblInput">原始內容</label>
          <textarea id="txt" data-i18n-placeholder="ph"></textarea>

          <div class="primary-actions">
            <button id="gen" class="btn primary" type="submit" data-i18n="btnGen">一次生成全部</button>
            <button id="clr" class="btn secondary" type="button" data-i18n="btnClr">清空</button>
          </div>

          <details class="advanced" id="advancedPanel">
            <summary data-i18n="advToggle">進階設定（可選）</summary>
            <div class="advanced-content">
              <div class="two-col">
                <div>
                  <label class="label" for="tone" data-i18n="lblTone">語氣</label>
                  <select id="tone">
                    <option value="professional" data-i18n="tonePro">專業</option>
                    <option value="casual" data-i18n="toneCas">輕鬆</option>
                    <option value="engaging" data-i18n="toneEng">互動</option>
                  </select>
                </div>
                <div>
                  <label class="label" for="outputLanguage" data-i18n="lblOutputLang">輸出語言</label>
                  <select id="outputLanguage">
                    <option value="zh-Hant" data-i18n="outputLangZh">繁體中文</option>
                    <option value="en" data-i18n="outputLangEn">English</option>
                  </select>
                </div>
              </div>
              <p class="hint" data-i18n="outputLangHint">內容輸出語言可獨立於界面語言。</p>

              <div>
                <label class="label" for="at" data-i18n="lblAt">排程時間</label>
                <input id="at" type="datetime-local" />
              </div>

              <div class="check-row">
                <label class="check">
                  <input id="tags" type="checkbox" checked />
                  <span data-i18n="lblTag">啟用 Hashtags</span>
                </label>
              </div>

              <div class="check-row platform-grid">
                <label class="check"><input name="sp" type="checkbox" value="linkedin" checked />LinkedIn</label>
                <label class="check"><input name="sp" type="checkbox" value="threads" checked />Threads</label>
                <label class="check"><input name="sp" type="checkbox" value="instagram" checked />Instagram</label>
              </div>
              <p class="hint" data-i18n="platformHint">可取消不需要的平台</p>

              <div class="secondary-actions">
                <button id="sch" class="btn secondary" type="button" data-i18n="btnSch">建立排程</button>
                <button id="ref" class="btn secondary" type="button" data-i18n="btnRef">刷新資料</button>
              </div>
            </div>
          </details>
        </form>

        <div id="st" class="status"></div>
      </section>
    </aside>

    <section class="card workspace">
      <header class="workspace-head">
        <div>
          <h2 data-i18n="resultTitle">內容工作台</h2>
          <p data-i18n="resultSub">生成後直接切換與複製。</p>
        </div>
        <div class="workspace-meta">
          <span id="batchStatus" class="meta-pill" data-i18n="metaBatch">Batch Mode</span>
          <span class="meta-pill secondary" data-i18n="metaSync">3 Platforms Synced</span>
        </div>
      </header>

      <div class="tabs">
        <button class="tab active" data-platform="linkedin">
          <span>LinkedIn</span>
          <small id="tab-l">待生成</small>
        </button>
        <button class="tab" data-platform="threads">
          <span>Threads</span>
          <small id="tab-t">待生成</small>
        </button>
        <button class="tab" data-platform="instagram">
          <span>Instagram</span>
          <small id="tab-i">待生成</small>
        </button>
      </div>

      <section class="quick-grid">
        <article class="quick-card active" data-quick="linkedin" role="button" tabindex="0">
          <div class="quick-head">
            <span>LinkedIn</span>
            <span id="quick-st-l" class="quick-state" data-i18n="quickIdle">待生成</span>
          </div>
          <p id="quick-s-l" class="quick-snippet" data-i18n="quickEmpty">未有內容</p>
          <div class="quick-foot"><span id="quick-c-l" class="quick-count">0 / 3000</span></div>
        </article>
        <article class="quick-card" data-quick="threads" role="button" tabindex="0">
          <div class="quick-head">
            <span>Threads</span>
            <span id="quick-st-t" class="quick-state" data-i18n="quickIdle">待生成</span>
          </div>
          <p id="quick-s-t" class="quick-snippet" data-i18n="quickEmpty">未有內容</p>
          <div class="quick-foot"><span id="quick-c-t" class="quick-count">0 / 500</span></div>
        </article>
        <article class="quick-card" data-quick="instagram" role="button" tabindex="0">
          <div class="quick-head">
            <span>Instagram</span>
            <span id="quick-st-i" class="quick-state" data-i18n="quickIdle">待生成</span>
          </div>
          <p id="quick-s-i" class="quick-snippet" data-i18n="quickEmpty">未有內容</p>
          <div class="quick-foot"><span id="quick-c-i" class="quick-count">0 / 2200</span></div>
        </article>
      </section>

      <section class="focus">
        <div class="focus-top">
          <div>
            <strong id="focusName">LinkedIn</strong>
            <p id="focusMeta" class="focus-meta">尚未生成，按「一鍵生成三平台」。</p>
          </div>
          <div class="usage">
            <span id="focusState" class="focus-state">待生成</span>
            <span id="focusBatch" class="batch-progress">已完成 0 / 3</span>
            <span id="focusCount">0 / 3000</span>
            <div class="meter"><span id="focusMeter"></span></div>
          </div>
        </div>
        <div id="focusBody" class="focus-body" data-generated="false">尚未生成內容。</div>
        <div class="focus-actions">
          <button id="copyAll" class="btn secondary" type="button" data-i18n="btnCopyAll">複製三平台</button>
          <button id="copyActive" class="btn secondary" type="button" data-i18n="btnCopyCurrent">複製目前平台</button>
        </div>
      </section>

      <details class="feed-wrap">
        <summary data-i18n="feedToggle">歷史與排程</summary>
        <section class="feed-grid">
          <article class="feed-card">
            <h3 data-i18n="his">最近歷史</h3>
            <ul id="his"><li data-i18n="load">讀取中...</li></ul>
          </article>
          <article class="feed-card">
            <h3 data-i18n="job">排程任務</h3>
            <ul id="job"><li data-i18n="load">讀取中...</li></ul>
          </article>
        </section>
      </details>
    </section>
  </main>

  <script>
    const LIMIT = { linkedin: 3000, threads: 500, instagram: 2200 };
    const PLATFORM_LABEL = { linkedin: 'LinkedIn', threads: 'Threads', instagram: 'Instagram' };
    const i18n = {
      'zh-HK': {
        title: '一鍵三平台',
        sub: '貼一次內容，三平台同步。',
        lblInput: '內容',
        ph: '輸入產品更新、活動重點...',
        advToggle: '進階設定（可選）',
        lblTone: '語氣',
        tonePro: '專業',
        toneCas: '輕鬆',
        toneEng: '互動',
        lblOutputLang: '輸出語言',
        outputLangZh: '繁體中文',
        outputLangEn: '英文',
        outputLangHint: '內容輸出語言可獨立於界面語言。',
        lblAt: '排程時間',
        lblTag: '啟用 Hashtags',
        platformHint: '可取消不需要的平台',
        btnGen: '一鍵生成三平台',
        btnGenL: '三平台生成中...',
        btnSch: '建立排程',
        btnSchL: '排程中...',
        btnRef: '刷新資料',
        btnClr: '清空',
        resultTitle: '內容工作台',
        resultSub: '一次生成，直接複製。',
        metaBatch: '批次模式',
        metaBatchRun: '批次生成中',
        metaBatchDone: '已批次生成',
        metaSync: '三平台同步',
        feedToggle: '歷史與排程',
        tabIdle: '待生成',
        tabReady: '已生成',
        focusIdle: '待生成',
        focusReady: '已生成',
        focusIdleMeta: '尚未生成，按「一鍵生成三平台」。',
        focusReadyMeta: '已生成，可直接複製或切換查看。',
        batchReady: '已完成',
        remaining: '剩餘字數',
        overLimit: '超出字數',
        btnCopyAll: '複製三平台',
        btnCopyCurrent: '複製目前平台',
        btnCopied: '已複製',
        his: '最近歷史',
        job: '排程任務',
        load: '讀取中...',
        empty: '尚未生成內容。',
        apiChk: 'API 檢查中...',
        apiOk: 'API 正常',
        apiBad: 'API 連線異常',
        needInput: '請先輸入原始內容。',
        genRun: '正在一次生成三平台內容...',
        genOk: '三平台內容已更新。',
        genFail: '生成失敗：',
        needAt: '請先選擇排程時間。',
        needSp: '排程請至少勾選一個平台。',
        schRun: '建立排程中...',
        schOk: '排程建立成功：',
        schFail: '排程失敗：',
        refOk: '資料已刷新。',
        clrOk: '已清空輸入與結果。',
        cpFail: '複製失敗，請手動複製。',
        cpOk: '已複製：',
        cpAllOk: '已複製三平台內容。',
        regionErr: '當前請求地區不支援，請檢查 API 可用區域或更換金鑰。',
        emptyTitle: '尚未生成內容。',
        btnGenInline: '一鍵生成三平台',
        noHis: '暫無歷史紀錄',
        hisFail: '歷史載入失敗',
        noJob: '暫無排程任務',
        jobFail: '排程資料載入失敗',
        st: '狀態',
        sp: '平台',
        noTime: '未知時間',
        quickEmpty: '-',
        quickIdle: '未生成',
        quickReady: '已生成'
      },
      en: {
        title: 'One-Click Multi-Platform',
        sub: 'Paste once, sync all three.',
        lblInput: 'Content',
        ph: 'Type product updates or campaign highlights...',
        advToggle: 'Advanced settings (optional)',
        lblTone: 'Tone',
        tonePro: 'Professional',
        toneCas: 'Casual',
        toneEng: 'Engaging',
        lblOutputLang: 'Output language',
        outputLangZh: 'Traditional Chinese',
        outputLangEn: 'English',
        outputLangHint: 'Output language is independent from UI language.',
        lblAt: 'Scheduled time',
        lblTag: 'Enable hashtags',
        platformHint: 'Uncheck any platform you do not need',
        btnGen: 'Generate 3 platforms',
        btnGenL: 'Generating 3 drafts...',
        btnSch: 'Create schedule',
        btnSchL: 'Scheduling...',
        btnRef: 'Refresh',
        btnClr: 'Clear',
        resultTitle: 'Content Workspace',
        resultSub: 'Generate once and copy fast.',
        metaBatch: 'Batch Mode',
        metaBatchRun: 'Generating Batch',
        metaBatchDone: 'Batch Ready',
        metaSync: '3 Platforms Synced',
        feedToggle: 'History & Schedule',
        tabIdle: 'Not ready',
        tabReady: 'Generated',
        focusIdle: 'Not generated',
        focusReady: 'Generated',
        focusIdleMeta: 'Not generated. Click "Generate 3 platforms".',
        focusReadyMeta: 'Generated. Copy directly or switch to review.',
        batchReady: 'Ready',
        remaining: 'Remaining',
        overLimit: 'Over limit',
        btnCopyAll: 'Copy all platforms',
        btnCopyCurrent: 'Copy current output',
        btnCopied: 'Copied',
        his: 'Recent history',
        job: 'Scheduled jobs',
        load: 'Loading...',
        empty: 'No content generated yet.',
        apiChk: 'Checking API...',
        apiOk: 'API healthy',
        apiBad: 'API connection issue',
        needInput: 'Please enter original content first.',
        genRun: 'Generating all platform outputs...',
        genOk: 'All platform outputs updated.',
        genFail: 'Generation failed: ',
        needAt: 'Please pick a schedule time.',
        needSp: 'Select at least one platform.',
        schRun: 'Creating schedule...',
        schOk: 'Schedule created: ',
        schFail: 'Schedule failed: ',
        refOk: 'Data refreshed.',
        clrOk: 'Input and outputs cleared.',
        cpFail: 'Copy failed. Please copy manually.',
        cpOk: 'Copied: ',
        cpAllOk: 'Copied all platform outputs.',
        regionErr: 'This request region is not supported. Check API region access or key settings.',
        emptyTitle: 'No generated content yet.',
        btnGenInline: 'Generate 3 platforms',
        noHis: 'No history records yet.',
        hisFail: 'Failed to load history',
        noJob: 'No scheduled jobs yet.',
        jobFail: 'Failed to load scheduled jobs',
        st: 'State',
        sp: 'Platforms',
        noTime: 'Unknown time',
        quickEmpty: '-',
        quickIdle: 'Not ready',
        quickReady: 'Ready'
      }
    };

    let lang = localStorage.getItem('omnipost_lang') || (navigator.language.startsWith('zh') ? 'zh-HK' : 'en');
    if (!i18n[lang]) {
      lang = 'zh-HK';
    }
    const OUTPUT_LANGUAGE_STORAGE_KEY = 'omnipost_output_lang';

    const outputs = { linkedin: '', threads: '', instagram: '' };
    let activePlatform = 'linkedin';
    let batchState = 'idle';

    const t = (key) => i18n[lang][key] || i18n['zh-HK'][key] || key;
    const $ = (selector) => document.querySelector(selector);
    const $$ = (selector) => document.querySelectorAll(selector);

    const txt = $('#txt');
    const tone = $('#tone');
    const outputLanguage = $('#outputLanguage');
    const tags = $('#tags');
    const at = $('#at');
    const st = $('#st');
    const gen = $('#gen');
    const sch = $('#sch');
    const dot = $('#dot');
    const apiText = $('#apiText');
    const batchStatus = $('#batchStatus');
    const his = $('#his');
    const job = $('#job');
    const focusName = $('#focusName');
    const focusMeta = $('#focusMeta');
    const focusCount = $('#focusCount');
    const focusState = $('#focusState');
    const focusBatch = $('#focusBatch');
    const focusMeter = $('#focusMeter');
    const focusBody = $('#focusBody');
    const copyAll = $('#copyAll');
    const copyActive = $('#copyActive');
    const tabCount = { linkedin: $('#tab-l'), threads: $('#tab-t'), instagram: $('#tab-i') };
    const quickCount = { linkedin: $('#quick-c-l'), threads: $('#quick-c-t'), instagram: $('#quick-c-i') };
    const quickState = { linkedin: $('#quick-st-l'), threads: $('#quick-st-t'), instagram: $('#quick-st-i') };
    const quickSnippet = { linkedin: $('#quick-s-l'), threads: $('#quick-s-t'), instagram: $('#quick-s-i') };

    function setStatus(message, type) {
      st.textContent = message;
      st.className = type ? 'status ' + type : 'status';
    }

    function getOutputLanguage() {
      return outputLanguage && outputLanguage.value === 'en' ? 'en' : 'zh-Hant';
    }

    function syncOutputLanguageWithUiLanguage() {
      if (!outputLanguage) {
        return;
      }
      const savedOutputLanguage = localStorage.getItem(OUTPUT_LANGUAGE_STORAGE_KEY);
      if (savedOutputLanguage === 'zh-Hant' || savedOutputLanguage === 'en') {
        outputLanguage.value = savedOutputLanguage;
        return;
      }
      outputLanguage.value = lang === 'en' ? 'en' : 'zh-Hant';
    }

    function esc(value) {
      return value
        .replaceAll('&', '&amp;')
        .replaceAll('<', '&lt;')
        .replaceAll('>', '&gt;')
        .replaceAll('"', '&quot;')
        .replaceAll("'", '&#39;');
    }

    function formatDate(value) {
      return value ? new Date(value).toLocaleString(lang) : t('noTime');
    }

    function textLength(platform) {
      return (outputs[platform] || '').length;
    }

    function readyPlatformCount() {
      return Object.values(outputs).filter((content) => !!(content && content.trim())).length;
    }

    function formatBatchProgress() {
      const readyCount = readyPlatformCount();
      if (lang === 'zh-HK') {
        return t('batchReady') + ' ' + readyCount + ' / 3';
      }
      return readyCount + ' / 3 ' + t('batchReady');
    }

    function refreshTabCounters() {
      Object.keys(tabCount).forEach((platform) => {
        const currentLength = textLength(platform);
        tabCount[platform].textContent = currentLength > 0 ? currentLength + ' / ' + LIMIT[platform] : t('tabIdle');
        tabCount[platform].title = currentLength > 0 ? t('tabReady') : t('tabIdle');
      });
    }

    function quickPreview(platform) {
      const content = (outputs[platform] || '').trim();
      if (!content) {
        return t('quickEmpty');
      }
      return content.length > 140 ? content.slice(0, 140) + '...' : content;
    }

    function refreshBatchStatus() {
      if (!batchStatus) {
        return;
      }
      const key = batchState === 'running' ? 'metaBatchRun' : batchState === 'done' ? 'metaBatchDone' : 'metaBatch';
      batchStatus.textContent = t(key);
      batchStatus.classList.toggle('live', batchState === 'running');
    }

    function refreshQuickCards() {
      Object.keys(quickCount).forEach((platform) => {
        const currentLength = textLength(platform);
        const hasContent = currentLength > 0;
        const card = document.querySelector('.quick-card[data-quick="' + platform + '"]');
        quickCount[platform].textContent = currentLength + ' / ' + LIMIT[platform];
        quickState[platform].textContent = hasContent ? t('quickReady') : t('quickIdle');
        quickState[platform].classList.toggle('ok', hasContent);
        quickSnippet[platform].textContent = quickPreview(platform);
        if (card) {
          card.classList.toggle('has-content', hasContent);
        }
      });
    }

    function refreshFocus() {
      const content = outputs[activePlatform];
      const currentLength = textLength(activePlatform);
      const limit = LIMIT[activePlatform];
      const ratio = limit > 0 ? currentLength / limit : 0;
      const hasContent = !!(content && content.trim());
      focusName.textContent = PLATFORM_LABEL[activePlatform];
      focusMeta.textContent = hasContent ? t('focusReadyMeta') : t('focusIdleMeta');
      focusState.textContent = hasContent ? t('focusReady') : t('focusIdle');
      focusBatch.textContent = formatBatchProgress();
      focusState.classList.toggle('ok', hasContent);
      focusCount.textContent = currentLength + ' / ' + limit + (ratio > 1 ? ' · ' + t('overLimit') : '');
      focusCount.style.color = ratio > 1 ? 'var(--warn)' : 'var(--text-sub)';
      focusMeter.style.width = Math.min(Math.max(ratio, 0), 1) * 100 + '%';
      focusMeter.classList.toggle('warn', ratio > 1);
      focusBody.dataset.generated = hasContent ? 'true' : 'false';
      if (hasContent) {
        focusBody.textContent = content;
      } else {
        focusBody.innerHTML =
          '<div class="focus-empty">' +
          '<strong>' + t('emptyTitle') + '</strong>' +
          '<button type="button" class="btn secondary inline-gen" data-action="gen-inline">' + t('btnGenInline') + '</button>' +
          '</div>';
      }
    }

    function selectPlatform(platform) {
      if (!outputs.hasOwnProperty(platform)) {
        return;
      }
      activePlatform = platform;
      $$('.tab').forEach((tab) => {
        tab.classList.toggle('active', tab.dataset.platform === activePlatform);
      });
      $$('.quick-card').forEach((card) => {
        card.classList.toggle('active', card.dataset.quick === activePlatform);
      });
      refreshFocus();
    }

    function setOutput(platform, content) {
      outputs[platform] = content || '';
      refreshTabCounters();
      refreshQuickCards();
      if (activePlatform === platform) {
        refreshFocus();
      }
    }

    function clearOutputs() {
      outputs.linkedin = '';
      outputs.threads = '';
      outputs.instagram = '';
      batchState = 'idle';
      refreshTabCounters();
      refreshQuickCards();
      refreshBatchStatus();
      refreshFocus();
    }

    function renderLanguage() {
      document.documentElement.lang = lang === 'zh-HK' ? 'zh-Hant' : 'en';
      $$('[data-lang]').forEach((button) => {
        button.classList.toggle('on', button.dataset.lang === lang);
      });
      $$('[data-i18n]').forEach((element) => {
        const key = element.getAttribute('data-i18n');
        if (key) {
          element.textContent = t(key);
        }
      });
      $$('[data-i18n-placeholder]').forEach((element) => {
        const key = element.getAttribute('data-i18n-placeholder');
        if (key) {
          element.setAttribute('placeholder', t(key));
        }
      });
      syncOutputLanguageWithUiLanguage();
      apiText.textContent = t('apiChk');
      refreshFocus();
      refreshTabCounters();
      refreshQuickCards();
      refreshBatchStatus();
    }

    function normalizeError(error) {
      const message = error && error.message ? String(error.message) : 'unknown';
      const lowerCaseMessage = message.toLowerCase();
      if (lowerCaseMessage.includes('country') || lowerCaseMessage.includes('region') || lowerCaseMessage.includes('territory')) {
        return t('regionErr');
      }
      return message;
    }

    async function healthCheck() {
      try {
        const response = await fetch('/health');
        if (!response.ok) {
          throw new Error('health check failed');
        }
        const payload = await response.json();
        dot.className = 'dot ok';
        apiText.textContent = t('apiOk') + ' · ' + new Date(payload.timestamp).toLocaleTimeString(lang);
      } catch (error) {
        dot.className = 'dot warn';
        apiText.textContent = t('apiBad');
      }
    }

    async function loadHistory() {
      try {
        const response = await fetch('/history?limit=6');
        const payload = await response.json();
        if (!payload.success || !Array.isArray(payload.data) || payload.data.length === 0) {
          his.innerHTML = '<li>' + t('noHis') + '</li>';
          return;
        }
        his.innerHTML = payload.data
          .map((item) => '<li><strong>' + esc(item.platform || 'unknown') + '</strong><div>' + esc((item.generated_content || '').slice(0, 110)) + '...</div><div>' + esc(formatDate(item.created_at)) + '</div></li>')
          .join('');
      } catch (error) {
        his.innerHTML = '<li>' + t('hisFail') + '</li>';
      }
    }

    async function loadJobs() {
      try {
        const response = await fetch('/scheduled');
        const payload = await response.json();
        if (!payload.success || !Array.isArray(payload.data) || payload.data.length === 0) {
          job.innerHTML = '<li>' + t('noJob') + '</li>';
          return;
        }
        job.innerHTML = payload.data
          .map((item) => '<li><strong>' + esc(item.id || 'unknown') + '</strong><div>' + t('st') + ': ' + esc(item.status || '-') + '</div><div>' + t('sp') + ': ' + esc(Array.isArray(item.platforms) ? item.platforms.join(', ') : '-') + '</div><div>' + esc(formatDate(item.scheduledAt)) + '</div></li>')
          .join('');
      } catch (error) {
        job.innerHTML = '<li>' + t('jobFail') + '</li>';
      }
    }

    async function generateAll() {
      const originalContent = txt.value.trim();
      if (!originalContent) {
        setStatus(t('needInput'), 'err');
        return;
      }

      gen.disabled = true;
      gen.textContent = t('btnGenL');
      batchState = 'running';
      refreshBatchStatus();
      setStatus(t('genRun'));

      try {
        const response = await fetch('/generate/all', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            originalContent,
            tone: tone.value,
            hashtags: tags.checked,
            outputLanguage: getOutputLanguage()
          })
        });
        const payload = await response.json();
        if (!response.ok || !payload.success) {
          throw new Error(payload.error || 'generate failed');
        }
        const mapped = { linkedin: '', threads: '', instagram: '' };
        payload.data.forEach((entry) => {
          mapped[entry.platform] = entry.content?.text || '';
        });
        setOutput('linkedin', mapped.linkedin);
        setOutput('threads', mapped.threads);
        setOutput('instagram', mapped.instagram);
        batchState = 'done';
        refreshFocus();
        refreshBatchStatus();
        setStatus(t('genOk'), 'ok');
        await loadHistory();
      } catch (error) {
        batchState = 'idle';
        refreshBatchStatus();
        setStatus(t('genFail') + normalizeError(error), 'err');
      } finally {
        gen.disabled = false;
        gen.textContent = t('btnGen');
      }
    }

    async function createSchedule() {
      const originalContent = txt.value.trim();
      const scheduledAt = at.value;
      const platforms = Array.from($$('input[name="sp"]:checked')).map((element) => element.value);

      if (!originalContent) {
        setStatus(t('needInput'), 'err');
        return;
      }
      if (!scheduledAt) {
        setStatus(t('needAt'), 'err');
        return;
      }
      if (platforms.length === 0) {
        setStatus(t('needSp'), 'err');
        return;
      }

      sch.disabled = true;
      sch.textContent = t('btnSchL');
      setStatus(t('schRun'));

      try {
        const response = await fetch('/schedule', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            content: {
              originalContent,
              tone: tone.value,
              hashtags: tags.checked,
              outputLanguage: getOutputLanguage(),
              targetPlatform: platforms[0] || 'linkedin'
            },
            scheduledAt: new Date(scheduledAt).toISOString(),
            platforms
          })
        });
        const payload = await response.json();
        if (!response.ok || !payload.success) {
          throw new Error(payload.error || 'schedule failed');
        }
        setStatus(t('schOk') + payload.data.postId, 'ok');
        await loadJobs();
      } catch (error) {
        setStatus(t('schFail') + (error && error.message ? error.message : 'unknown'), 'err');
      } finally {
        sch.disabled = false;
        sch.textContent = t('btnSch');
      }
    }

    async function copyCurrentOutput() {
      const content = outputs[activePlatform];
      if (!content || !content.trim()) {
        return;
      }
      try {
        await navigator.clipboard.writeText(content);
        const oldText = copyActive.textContent;
        copyActive.textContent = t('btnCopied');
        setStatus(t('cpOk') + PLATFORM_LABEL[activePlatform], 'ok');
        setTimeout(() => {
          copyActive.textContent = oldText;
        }, 900);
      } catch (error) {
        setStatus(t('cpFail'), 'err');
      }
    }

    async function copyAllOutputs() {
      const merged = Object.entries(outputs)
        .filter(([, content]) => !!(content && content.trim()))
        .map(([platform, content]) => '[' + PLATFORM_LABEL[platform] + ']\\n' + content.trim())
        .join('\\n\\n');

      if (!merged) {
        return;
      }

      try {
        await navigator.clipboard.writeText(merged);
        setStatus(t('cpAllOk'), 'ok');
      } catch (error) {
        setStatus(t('cpFail'), 'err');
      }
    }

    $('#form').addEventListener('submit', async (event) => {
      event.preventDefault();
      await generateAll();
    });

    sch.addEventListener('click', async () => {
      await createSchedule();
    });

    $('#ref').addEventListener('click', async () => {
      await Promise.all([healthCheck(), loadHistory(), loadJobs()]);
      setStatus(t('refOk'), 'ok');
    });

    $('#clr').addEventListener('click', () => {
      txt.value = '';
      clearOutputs();
      setStatus(t('clrOk'), 'ok');
    });

    copyActive.addEventListener('click', async () => {
      await copyCurrentOutput();
    });

    copyAll.addEventListener('click', async () => {
      await copyAllOutputs();
    });

    focusBody.addEventListener('click', async (event) => {
      const target = event.target;
      if (!(target instanceof HTMLElement)) {
        return;
      }
      if (target.dataset.action !== 'gen-inline') {
        return;
      }
      await generateAll();
    });

    $$('.tab').forEach((tab) => {
      tab.addEventListener('click', () => {
        const platform = tab.dataset.platform;
        if (!platform) {
          return;
        }
        selectPlatform(platform);
      });
    });

    $$('.quick-card').forEach((card) => {
      const pick = () => {
        const platform = card.dataset.quick;
        if (!platform) {
          return;
        }
        selectPlatform(platform);
      };
      card.addEventListener('click', pick);
      card.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          pick();
        }
      });
    });

    $$('[data-lang]').forEach((button) => {
      button.addEventListener('click', async () => {
        const nextLang = button.dataset.lang;
        if (!nextLang || nextLang === lang) {
          return;
        }
        lang = nextLang;
        localStorage.setItem('omnipost_lang', lang);
        renderLanguage();
        await Promise.all([healthCheck(), loadHistory(), loadJobs()]);
      });
    });

    if (outputLanguage) {
      outputLanguage.addEventListener('change', () => {
        localStorage.setItem(OUTPUT_LANGUAGE_STORAGE_KEY, getOutputLanguage());
      });
    }

    renderLanguage();
    clearOutputs();
    selectPlatform('linkedin');
    void Promise.all([healthCheck(), loadHistory(), loadJobs()]);
    setInterval(() => {
      void healthCheck();
    }, 60000);
  </script>
</body>
</html>`;
}
