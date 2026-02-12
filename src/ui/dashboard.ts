export function renderDashboardPage(): string {
  return `<!doctype html>
<html lang="zh-Hant">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Omnipost Console</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700;800&display=swap');
    :root {
      --p: #e11d48;
      --a: #2563eb;
      --t: #1f1235;
      --s: #6b5a86;
      --b: #ffd7df;
      --ok: #0f766e;
      --warn: #b45309;
      --bg: #fff7fa;
    }

    * {
      box-sizing: border-box;
    }

    body {
      margin: 0;
      font-family: "Plus Jakarta Sans", sans-serif;
      color: var(--t);
      background: radial-gradient(circle at 5% 8%, #ffd8e4 0%, transparent 30%),
        radial-gradient(circle at 95% 8%, #dbeafe 0%, transparent 34%),
        var(--bg);
    }

    .top {
      position: sticky;
      top: 12px;
      z-index: 9;
      max-width: 1380px;
      margin: 12px auto 0;
      padding: 0 24px;
    }

    .top-in {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 12px;
      padding: 14px 18px;
      background: #fff;
      border: 1px solid var(--b);
      border-radius: 999px;
      box-shadow: 0 12px 28px rgba(225, 29, 72, 0.12);
    }

    .brand {
      display: flex;
      align-items: center;
      gap: 10px;
      font-weight: 800;
      font-size: 15px;
    }

    .badge {
      width: 34px;
      height: 34px;
      border-radius: 10px;
      display: grid;
      place-items: center;
      color: #fff;
      background: linear-gradient(145deg, var(--p), var(--a));
    }

    .lang {
      display: flex;
      gap: 6px;
      padding: 4px;
      border: 1px solid var(--b);
      border-radius: 999px;
    }

    .lang button {
      border: 0;
      background: transparent;
      padding: 6px 11px;
      border-radius: 999px;
      font-weight: 800;
      font-size: 11px;
      cursor: pointer;
      color: var(--s);
    }

    .lang button.on {
      color: #fff;
      background: linear-gradient(145deg, var(--p), var(--a));
    }

    .api {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 8px 11px;
      border: 1px solid var(--b);
      border-radius: 999px;
      font-size: 12px;
      font-weight: 700;
      color: var(--s);
    }

    .dot {
      width: 8px;
      height: 8px;
      border-radius: 999px;
      background: #94a3b8;
    }

    .dot.ok {
      background: var(--ok);
    }

    .dot.warn {
      background: var(--warn);
    }

    .wrap {
      max-width: 1380px;
      margin: 0 auto;
      padding: 22px 24px 28px;
    }

    .grid {
      display: grid;
      grid-template-columns: minmax(430px, 500px) minmax(0, 1fr);
      gap: 22px;
      align-items: start;
    }

    .card {
      background: #fff;
      border: 1px solid var(--b);
      border-radius: 20px;
      box-shadow: 0 12px 28px rgba(225, 29, 72, 0.1);
    }

    .sec {
      padding: 22px;
    }

    .sec + .sec {
      border-top: 1px solid #ffe5ec;
    }

    h1 {
      margin: 0;
      font-size: 30px;
      line-height: 1.15;
      letter-spacing: -0.03em;
    }

    p.sub {
      margin: 10px 0 0;
      color: var(--s);
      font-size: 15px;
      line-height: 1.5;
    }

    label {
      display: block;
      margin: 14px 0 7px;
      font-size: 13px;
      font-weight: 800;
    }

    textarea,
    select,
    input[type="datetime-local"] {
      width: 100%;
      border: 1px solid #f5aabc;
      border-radius: 12px;
      padding: 12px;
      font: inherit;
      outline: 0;
    }

    textarea {
      min-height: 210px;
      resize: vertical;
      line-height: 1.55;
    }

    textarea:focus,
    select:focus,
    input:focus {
      border-color: var(--a);
      box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.16);
    }

    .row2 {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 12px;
    }

    .checks {
      display: flex;
      gap: 12px;
      flex-wrap: wrap;
      margin-top: 14px;
    }

    .ck {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      font-size: 13px;
      color: var(--s);
      font-weight: 700;
    }

    .ck input {
      accent-color: var(--p);
    }

    .acts {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 10px;
      margin-top: 18px;
    }

    .btn {
      border: 0;
      border-radius: 12px;
      padding: 12px;
      font: inherit;
      font-size: 14px;
      font-weight: 800;
      cursor: pointer;
    }

    .btn.pri {
      background: linear-gradient(145deg, var(--p), var(--a));
      color: #fff;
    }

    .btn.sec {
      background: #fff;
      border: 1px solid var(--b);
    }

    .status {
      margin-top: 13px;
      min-height: 20px;
      font-size: 13px;
      font-weight: 700;
      color: var(--s);
    }

    .status.ok {
      color: var(--ok);
    }

    .status.err {
      color: #b42318;
    }

    .head {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 20px 20px 16px;
      border-bottom: 1px solid #ffe5ec;
    }

    .head h2 {
      margin: 0;
      font-size: 24px;
      letter-spacing: -0.02em;
    }

    .out {
      padding: 16px 18px;
      display: grid;
      grid-template-columns: repeat(3, minmax(260px, 1fr));
      gap: 14px;
    }

    .oc {
      border: 1px solid var(--b);
      border-radius: 14px;
      padding: 12px;
      display: grid;
      gap: 10px;
      min-height: 350px;
    }

    .ot {
      display: flex;
      justify-content: space-between;
      gap: 8px;
    }

    .ot strong {
      font-size: 14px;
    }

    .cnt {
      font-size: 12px;
      font-weight: 700;
      color: var(--s);
    }

    .cnt.warn {
      color: var(--warn);
    }

    .ob {
      border: 1px solid #ffe3ea;
      border-radius: 10px;
      background: #fff8fa;
      padding: 11px;
      white-space: pre-wrap;
      line-height: 1.58;
      font-size: 14px;
      min-height: 235px;
      overflow: auto;
    }

    .foot {
      display: flex;
      justify-content: flex-end;
    }

    .mini {
      padding: 0 18px 18px;
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 14px;
    }

    .mc {
      border: 1px solid var(--b);
      border-radius: 13px;
      padding: 12px;
    }

    .mc h3 {
      margin: 0 0 9px;
      font-size: 14px;
    }

    ul {
      margin: 0;
      padding: 0;
      list-style: none;
      display: grid;
      gap: 8px;
      max-height: 220px;
      overflow: auto;
    }

    li {
      border: 1px solid #ffe5ec;
      border-radius: 10px;
      background: #fff8fa;
      padding: 9px;
      font-size: 13px;
      line-height: 1.45;
    }

    li strong {
      display: block;
      margin-bottom: 4px;
    }

    @media (max-width: 1260px) {
      .grid {
        grid-template-columns: 1fr;
      }

      .out {
        grid-template-columns: 1fr;
      }

      .mini {
        grid-template-columns: 1fr;
      }
    }

    @media (max-width: 820px) {
      .top-in {
        flex-direction: column;
        align-items: flex-start;
        border-radius: 18px;
      }

      .row2,
      .acts {
        grid-template-columns: 1fr;
      }
    }
  </style>
</head>
<body>
  <header class="top"><div class="top-in">
    <div class="brand"><span class="badge"><svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M4 4h7v7H4zM13 4h7v7h-7zM4 13h7v7H4zM13 13h7v7h-7z" fill="currentColor"/></svg></span>Omnipost Console</div>
    <div style="display:flex;gap:8px;align-items:center">
      <div class="lang"><button id="langZh" data-lang="zh-HK">繁中</button><button id="langEn" data-lang="en">EN</button></div>
      <div class="api"><span id="dot" class="dot"></span><span id="apiText">API 檢查中...</span></div>
    </div>
  </div></header>
  <main class="wrap"><section class="grid">
    <article class="card"><div class="sec">
      <h1 data-i18n="title">一次生成三平台內容</h1>
      <p class="sub" data-i18n="sub">貼一段原文，按一次即可回傳 LinkedIn / Threads / Instagram。</p>
      <form id="f">
        <label for="txt" data-i18n="lblInput">原始內容</label>
        <textarea id="txt" data-i18n-placeholder="ph"></textarea>
        <div class="row2">
          <div><label for="tone" data-i18n="lblTone">語氣</label><select id="tone"><option value="professional" data-i18n="tonePro">專業</option><option value="casual" data-i18n="toneCas">輕鬆</option><option value="engaging" data-i18n="toneEng">互動</option></select></div>
          <div><label for="at" data-i18n="lblAt">排程時間</label><input id="at" type="datetime-local" /></div>
        </div>
        <div class="checks">
          <label class="ck"><input id="tags" type="checkbox" checked /><span data-i18n="lblTag">啟用 Hashtags</span></label>
          <label class="ck"><input name="sp" type="checkbox" value="linkedin" checked />LinkedIn</label>
          <label class="ck"><input name="sp" type="checkbox" value="threads" checked />Threads</label>
          <label class="ck"><input name="sp" type="checkbox" value="instagram" checked />Instagram</label>
        </div>
        <div class="acts">
          <button id="gen" class="btn pri" type="submit" data-i18n="btnGen">一次生成全部</button>
          <button id="sch" class="btn sec" type="button" data-i18n="btnSch">建立排程</button>
          <button id="ref" class="btn sec" type="button" data-i18n="btnRef">刷新資料</button>
          <button id="clr" class="btn sec" type="button" data-i18n="btnClr">清空內容</button>
        </div>
      </form>
      <div id="st" class="status"></div>
    </div></article>
    <article class="card">
      <header class="head"><h2 data-i18n="resultTitle">三平台生成結果</h2></header>
      <section class="out">
        <article class="oc"><div class="ot"><strong>LinkedIn</strong><span id="c-l" class="cnt">0 / 3000</span></div><div id="o-l" class="ob" data-generated="false">尚未生成內容。</div><div class="foot"><button class="btn sec cp" data-p="linkedin" data-i18n="btnCopy">複製</button></div></article>
        <article class="oc"><div class="ot"><strong>Threads</strong><span id="c-t" class="cnt">0 / 500</span></div><div id="o-t" class="ob" data-generated="false">尚未生成內容。</div><div class="foot"><button class="btn sec cp" data-p="threads" data-i18n="btnCopy">複製</button></div></article>
        <article class="oc"><div class="ot"><strong>Instagram</strong><span id="c-i" class="cnt">0 / 2200</span></div><div id="o-i" class="ob" data-generated="false">尚未生成內容。</div><div class="foot"><button class="btn sec cp" data-p="instagram" data-i18n="btnCopy">複製</button></div></article>
      </section>
      <section class="mini">
        <article class="mc"><h3 data-i18n="his">最近歷史</h3><ul id="his"><li data-i18n="load">讀取中...</li></ul></article>
        <article class="mc"><h3 data-i18n="job">排程任務</h3><ul id="job"><li data-i18n="load">讀取中...</li></ul></article>
      </section>
    </article>
  </section></main>
  <script>
    const LIMIT = { linkedin: 3000, threads: 500, instagram: 2200 };
    const i18n = {
      'zh-HK': { title: '一次生成三平台內容', sub: '貼一段原文，按一次即可回傳 LinkedIn / Threads / Instagram。', lblInput: '原始內容', ph: '輸入產品更新、活動重點、觀點整理...', lblTone: '語氣', tonePro: '專業', toneCas: '輕鬆', toneEng: '互動', lblAt: '排程時間', lblTag: '啟用 Hashtags', btnGen: '一次生成全部', btnGenL: '生成中...', btnSch: '建立排程', btnSchL: '排程中...', btnRef: '刷新資料', btnClr: '清空內容', resultTitle: '三平台生成結果', btnCopy: '複製', btnCopied: '已複製', his: '最近歷史', job: '排程任務', load: '讀取中...', empty: '尚未生成內容。', apiChk: 'API 檢查中...', apiOk: 'API 正常', apiBad: 'API 連線異常', needInput: '請先輸入原始內容。', genRun: '正在一次生成三平台內容...', genOk: '三平台內容已更新。', genFail: '生成失敗：', needAt: '請先選擇排程時間。', needSp: '排程請至少勾選一個平台。', schRun: '建立排程中...', schOk: '排程建立成功：', schFail: '排程失敗：', refOk: '資料已刷新。', clrOk: '已清空輸入與結果。', cpFail: '複製失敗，請手動複製。', cpOk: '已複製：', noHis: '暫無歷史紀錄', hisFail: '歷史載入失敗', noJob: '暫無排程任務', jobFail: '排程資料載入失敗', st: '狀態', sp: '平台', noTime: '未知時間' },
      en: { title: 'Generate 3 Platforms at Once', sub: 'Paste one source text and get LinkedIn / Threads / Instagram in a single run.', lblInput: 'Original content', ph: 'Type product updates, campaign highlights, or your key message...', lblTone: 'Tone', tonePro: 'Professional', toneCas: 'Casual', toneEng: 'Engaging', lblAt: 'Scheduled time', lblTag: 'Enable hashtags', btnGen: 'Generate all', btnGenL: 'Generating...', btnSch: 'Create schedule', btnSchL: 'Scheduling...', btnRef: 'Refresh', btnClr: 'Clear', resultTitle: 'Generated Outputs', btnCopy: 'Copy', btnCopied: 'Copied', his: 'Recent history', job: 'Scheduled jobs', load: 'Loading...', empty: 'No content generated yet.', apiChk: 'Checking API...', apiOk: 'API healthy', apiBad: 'API connection issue', needInput: 'Please enter original content first.', genRun: 'Generating all platform outputs...', genOk: 'All platform outputs updated.', genFail: 'Generation failed: ', needAt: 'Please pick a schedule time.', needSp: 'Select at least one platform.', schRun: 'Creating schedule...', schOk: 'Schedule created: ', schFail: 'Schedule failed: ', refOk: 'Data refreshed.', clrOk: 'Input and outputs cleared.', cpFail: 'Copy failed. Please copy manually.', cpOk: 'Copied: ', noHis: 'No history records yet.', hisFail: 'Failed to load history', noJob: 'No scheduled jobs yet.', jobFail: 'Failed to load scheduled jobs', st: 'State', sp: 'Platforms', noTime: 'Unknown time' }
    };
    let lang = localStorage.getItem('omnipost_lang') || (navigator.language.startsWith('zh') ? 'zh-HK' : 'en'); if (!i18n[lang]) lang = 'zh-HK';
    const t = (k) => i18n[lang][k] || i18n['zh-HK'][k] || k;
    const $ = (s) => document.querySelector(s);
    const st = $('#st'), dot = $('#dot'), apiText = $('#apiText'), txt = $('#txt'), tone = $('#tone'), tags = $('#tags'), at = $('#at');
    const out = { linkedin: $('#o-l'), threads: $('#o-t'), instagram: $('#o-i') }, cnt = { linkedin: $('#c-l'), threads: $('#c-t'), instagram: $('#c-i') };
    const his = $('#his'), job = $('#job'), gen = $('#gen'), sch = $('#sch');
    function setSt(msg, type) { st.textContent = msg; st.className = type ? 'status ' + type : 'status'; }
    function esc(v) { return v.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;').replaceAll("'", '&#39;'); }
    function d(v) { return v ? new Date(v).toLocaleString(lang) : t('noTime'); }
    function setOut(p, text) { const val = text && text.trim() ? text : t('empty'); out[p].textContent = val; out[p].dataset.generated = text && text.trim() ? 'true' : 'false'; const c = (text || '').length; cnt[p].textContent = c + ' / ' + LIMIT[p]; cnt[p].className = c > LIMIT[p] ? 'cnt warn' : 'cnt'; }
    function clearOut() { setOut('linkedin', ''); setOut('threads', ''); setOut('instagram', ''); }
    function renderLang() { document.documentElement.lang = lang === 'zh-HK' ? 'zh-Hant' : 'en'; document.querySelectorAll('[data-lang]').forEach((b) => b.classList.toggle('on', b.dataset.lang === lang)); document.querySelectorAll('[data-i18n]').forEach((el) => { const k = el.getAttribute('data-i18n'); if (k) el.textContent = t(k); }); document.querySelectorAll('[data-i18n-placeholder]').forEach((el) => { const k = el.getAttribute('data-i18n-placeholder'); if (k) el.setAttribute('placeholder', t(k)); }); apiText.textContent = t('apiChk'); Object.keys(out).forEach((p) => { if (out[p].dataset.generated !== 'true') out[p].textContent = t('empty'); }); }
    async function health() { try { const r = await fetch('/health'); if (!r.ok) throw new Error('x'); const j = await r.json(); dot.className = 'dot ok'; apiText.textContent = t('apiOk') + ' · ' + new Date(j.timestamp).toLocaleTimeString(lang); } catch (e) { dot.className = 'dot warn'; apiText.textContent = t('apiBad'); } }
    async function loadHis() { try { const r = await fetch('/history?limit=6'); const j = await r.json(); if (!j.success || !Array.isArray(j.data) || j.data.length === 0) { his.innerHTML = '<li>' + t('noHis') + '</li>'; return; } his.innerHTML = j.data.map((it) => '<li><strong>' + esc(it.platform || 'unknown') + '</strong><div>' + esc((it.generated_content || '').slice(0, 90)) + '...</div><div>' + esc(d(it.created_at)) + '</div></li>').join(''); } catch (e) { his.innerHTML = '<li>' + t('hisFail') + '</li>'; } }
    async function loadJob() { try { const r = await fetch('/scheduled'); const j = await r.json(); if (!j.success || !Array.isArray(j.data) || j.data.length === 0) { job.innerHTML = '<li>' + t('noJob') + '</li>'; return; } job.innerHTML = j.data.map((it) => '<li><strong>' + esc(it.id || 'unknown') + '</strong><div>' + t('st') + ': ' + esc(it.status || '-') + '</div><div>' + t('sp') + ': ' + esc(Array.isArray(it.platforms) ? it.platforms.join(', ') : '-') + '</div><div>' + esc(d(it.scheduledAt)) + '</div></li>').join(''); } catch (e) { job.innerHTML = '<li>' + t('jobFail') + '</li>'; } }
    async function genAll() { const originalContent = txt.value.trim(); if (!originalContent) { setSt(t('needInput'), 'err'); return; } gen.disabled = true; gen.textContent = t('btnGenL'); setSt(t('genRun')); try { const r = await fetch('/generate/all', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ originalContent, tone: tone.value, hashtags: tags.checked }) }); const j = await r.json(); if (!r.ok || !j.success) throw new Error(j.error || 'failed'); const map = { linkedin: '', threads: '', instagram: '' }; j.data.forEach((e) => { map[e.platform] = e.content?.text || ''; }); setOut('linkedin', map.linkedin); setOut('threads', map.threads); setOut('instagram', map.instagram); setSt(t('genOk'), 'ok'); await loadHis(); } catch (e) { setSt(t('genFail') + (e && e.message ? e.message : 'unknown'), 'err'); } finally { gen.disabled = false; gen.textContent = t('btnGen'); } }
    async function mkSchedule() { const originalContent = txt.value.trim(); const when = at.value; const platforms = Array.from(document.querySelectorAll('input[name="sp"]:checked')).map((el) => el.value); if (!originalContent) { setSt(t('needInput'), 'err'); return; } if (!when) { setSt(t('needAt'), 'err'); return; } if (platforms.length === 0) { setSt(t('needSp'), 'err'); return; } sch.disabled = true; sch.textContent = t('btnSchL'); setSt(t('schRun')); try { const r = await fetch('/schedule', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ content: { originalContent, tone: tone.value, hashtags: tags.checked, targetPlatform: platforms[0] || 'linkedin' }, scheduledAt: new Date(when).toISOString(), platforms }) }); const j = await r.json(); if (!r.ok || !j.success) throw new Error(j.error || 'failed'); setSt(t('schOk') + j.data.postId, 'ok'); await loadJob(); } catch (e) { setSt(t('schFail') + (e && e.message ? e.message : 'unknown'), 'err'); } finally { sch.disabled = false; sch.textContent = t('btnSch'); } }
    $('#f').addEventListener('submit', async (e) => { e.preventDefault(); await genAll(); });
    sch.addEventListener('click', async () => { await mkSchedule(); });
    $('#ref').addEventListener('click', async () => { await Promise.all([health(), loadHis(), loadJob()]); setSt(t('refOk'), 'ok'); });
    $('#clr').addEventListener('click', () => { txt.value = ''; clearOut(); setSt(t('clrOk'), 'ok'); });
    document.querySelectorAll('.cp').forEach((b) => b.addEventListener('click', async () => { const p = b.dataset.p; const text = out[p].textContent || ''; if (!text || text === t('empty')) return; try { await navigator.clipboard.writeText(text); const old = b.textContent; b.textContent = t('btnCopied'); setSt(t('cpOk') + p, 'ok'); setTimeout(() => { b.textContent = old; }, 900); } catch (e) { setSt(t('cpFail'), 'err'); } }));
    document.querySelectorAll('[data-lang]').forEach((b) => b.addEventListener('click', async () => { const next = b.dataset.lang; if (!next || next === lang) return; lang = next; localStorage.setItem('omnipost_lang', lang); renderLang(); await Promise.all([health(), loadHis(), loadJob()]); }));
    renderLang(); clearOut(); void Promise.all([health(), loadHis(), loadJob()]); setInterval(() => { void health(); }, 60000);
  </script>
</body>
</html>`;
}
