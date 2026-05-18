// ─── Editor observations card ────────────────────────────────
// Manual write-up of issues I see in the current editors + ideas for
// each one. Shown as a wide artboard alongside the device screens
// so we can talk about specific issues in context.

const ED_OBS_ISSUES = [
  {
    n: 1, where: 'TransactionEditor',
    title: '日期 pill + recurring 圖示 split 兩個元件',
    issue: '日期顯示成一個窄窄的 capsule 在中央，旁邊另一個圓圈是「重複」開關。兩者語意都跟「時間」有關卻被視覺切開了。Recurring icon 是 toggle，但只用 border 顏色暗示狀態，誤觸機率高。',
    ideas: ['把日期跟 recurring 合成同一個 card（日期是主、recurring 是 secondary metadata）', '日期改成大字、可點直接開 date picker', 'recurring 改成明確的 "重複此筆" toggle pill，附 frequency 預覽（"每月 14 日"）'],
  },
  {
    n: 2, where: 'TransactionEditor',
    title: '金額欄沒有 hero 感',
    issue: '"NT$ 185" 用了跟其他欄位一樣的 20px / medium，視覺上沒有比帳戶名、類別名更重要，但這其實是用戶最關心的數字。Currency symbol 跟數字同字級，互相搶戲。',
    ideas: ['金額放大成 hero 數字（40-56px）', 'Currency symbol 縮小、放在數字上方或右上小字', '加上即時換算（"≈ US$6"）當帳戶是 USD'],
  },
  {
    n: 3, where: 'TransactionEditor',
    title: 'Static wheel picker 是假元件',
    issue: '帳戶 + 類別都用 110px 高的 "wheel" 顯示，上方下方有褪色的 sub-label 故意做出 iOS picker 滾輪的視覺，但實際上是靜態的——點下去會跳到別的選擇器畫面。Affordance 跟行為對不上。',
    ideas: ['改成清楚的 chip / tile：iconAvatar + 名稱 + chevron，跟其他 list row 一致', '保留 wheel picker 但改成真的 inline scroller（複雜）', '改成 segmented control（適合類別 4-8 項）+ chip（適合帳戶）'],
  },
  {
    n: 4, where: 'TransactionEditor',
    title: '看不出是「支出」還是「收入」',
    issue: '畫面上沒有任何明確的支出 / 收入切換。類別 sub-label 寫「支出」但小到不會被注意。Type 是傳進來的 prop，但用戶若點錯入口就無法在此修正。',
    ideas: ['頂部加 segmented control 「支出 / 收入 / 轉帳」三選一，自動切相關欄位', '把 type 反映在金額顏色（支出紅、收入綠）讓畫面有強烈視覺對比', '把這三個入口在 FAB 點下去之後就分流，editor 內不允許切換（一致 + 簡化）'],
  },
  {
    n: 5, where: 'TransactionEditor',
    title: '備註欄太弱',
    issue: '只是一個普通的 input box，沒 icon、沒 label。比 wheel picker 還不起眼，但其實是大多用戶最常編輯的欄位。',
    ideas: ['給備註 prefix icon (tag / pen)', '加 recent suggestions（"路易莎咖啡" "便當" 等常用備註）chip 列', 'allow tags (#早餐 #約會)'],
  },
  {
    n: 6, where: 'TransactionEditor',
    title: '鍵盤的 +/-/×/÷ 全部是 no-op',
    issue: '畫面下方是 4×4 calculator 鍵盤，但 +/-/×/÷ 在 impl 是 no-op，只有 0-9 和 . 會作用。視覺上像計算機卻沒運算能力，浪費了 4 個 key 位置。',
    ideas: ['真的支援運算（185+45 = 230），這是記帳常需求', '或者拿掉運算鍵，把 keypad 改成 3×4 的純數字鍵盤 + 大 backspace + 大 confirm', '或保留運算鍵但灰掉，並提示「即將支援」'],
  },
  {
    n: 7, where: 'TransactionEditor',
    title: '刪除按鈕位置危險',
    issue: '編輯模式下，「刪除交易」是底部一行小紅字，正好在鍵盤上方。容易誤觸又無確認對話框。',
    ideas: ['移到 modal header trailing（垃圾桶 icon），點下去顯示確認', '保留位置但改成 destructive style + 兩段式確認（按一下變紅、再按一下執行）', '加入 swipe-to-delete 在交易列表'],
  },
  {
    n: 8, where: 'TransferEditor',
    title: '兩個金額欄無視覺主從',
    issue: 'From 金額和 To 金額並排，相同字級、相同 layout。但 To 金額其實是 derived（從 From × 匯率算出來），不應該跟 From 一樣突出。Cross-currency 才能編輯 To 也沒提示。',
    ideas: ['From 金額放大為 hero，To 金額縮小放下方並顯示 "≈ US$480 (rate 31.25)"', '加 exchange rate chip 顯示當前匯率', '同幣別時把 To 金額完全藏起來，只留一張卡片'],
  },
  {
    n: 9, where: 'TransferEditor',
    title: '缺少 "swap from↔to" 快捷',
    issue: '常見需求是用戶選錯方向 → 想對調。目前必須各自重新選帳戶。',
    ideas: ['中間箭頭可點，點下去對調 from / to', '長按或左滑切換'],
  },
  {
    n: 10, where: '兩個共通',
    title: '視覺 hierarchy 全部一樣重',
    issue: '日期 / 金額 / 帳戶 / 類別 / 備註 全部 16px / medium / 同色，掃視時很難找重點。記帳的核心是金額 + 類別，其他都是 metadata。',
    ideas: ['分組：HERO (金額)、PRIMARY (類別/帳戶)、METADATA (日期/備註/recurring) 三個視覺層級', '用留白 + 字級差 + 卡片陰影建立 hierarchy'],
  },
];

function EditorObservations() {
  return (
    <div style={{
      width: '100%', height: '100%', overflow: 'auto', padding: 28,
      background: '#fff',
      fontFamily: '-apple-system, "SF Pro Text", "PingFang TC", "Noto Sans TC", system-ui, sans-serif',
      color: '#212121',
    }}>
      <div style={{ fontSize: 22, fontWeight: 600, marginBottom: 6, letterSpacing: -0.3 }}>
        Editor 觀察筆記 · 10 個可以優化的地方
      </div>
      <div style={{ fontSize: 13, color: '#757575', marginBottom: 22, lineHeight: 1.5 }}>
        看著左邊兩個畫面整理出來的問題。每條都附「我覺得可以怎麼改」的想法，但實際走哪個方向看你的回饋。問卷會根據這份觀察出題。
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        {ED_OBS_ISSUES.map(it => (
          <div key={it.n} style={{
            border: '1px solid rgba(60,60,67,0.10)',
            borderRadius: 12, padding: '14px 16px',
          }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, marginBottom: 6 }}>
              <span style={{
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                width: 22, height: 22, borderRadius: 11, background: '#4323A0',
                color: '#fff', fontSize: 11, fontWeight: 600, fontVariantNumeric: 'tabular-nums',
                flexShrink: 0,
              }}>{it.n}</span>
              <span style={{
                fontFamily: '"SF Mono", Menlo, monospace', fontSize: 11,
                color: '#757575', textTransform: 'uppercase', letterSpacing: 0.8,
              }}>{it.where}</span>
            </div>
            <div style={{ fontSize: 16, fontWeight: 500, color: '#212121', marginBottom: 6, letterSpacing: -0.2 }}>
              {it.title}
            </div>
            <div style={{ fontSize: 13, color: '#212121', lineHeight: 1.55, marginBottom: 10 }}>
              {it.issue}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              {it.ideas.map((idea, i) => (
                <div key={i} style={{
                  fontSize: 12.5, color: '#424242', lineHeight: 1.55,
                  paddingLeft: 14, position: 'relative',
                }}>
                  <span style={{ position: 'absolute', left: 0, color: '#4323A0' }}>→</span>
                  {idea}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div style={{
        marginTop: 24, padding: 16, borderRadius: 12,
        background: '#F0ECFA', border: '1px solid #C0B6DF',
      }}>
        <div style={{ fontSize: 14, fontWeight: 600, color: '#4323A0', marginBottom: 6 }}>
          📋 接下來
        </div>
        <div style={{ fontSize: 13, color: '#212121', lineHeight: 1.55 }}>
          看完這些問題後請點「給我問卷」, 我會根據這 10 條出題目，問你每一條想不想處理 / 想走哪個方向。
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { EditorObservations, ED_OBS_ISSUES });
