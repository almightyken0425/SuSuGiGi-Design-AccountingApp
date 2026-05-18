// ─── Proposal demos ──────────────────────────────────────────
// One isolated demo per observation. Each focuses on the single
// element being proposed so we can compare against the current
// version without other variables interfering.
//
// Layout convention:
//   - Top: small "BEFORE / AFTER" label band
//   - Middle: the focused proposal (often just a card slice, not whole screen)
//   - Bottom: short caption describing what changed

const PROP_BG       = '#F2F2F7';
const PROP_SURFACE  = '#FFFFFF';
const PROP_INK      = '#212121';
const PROP_INK2     = '#757575';
const PROP_INK3     = '#BDBDBD';
const PROP_PUR      = '#4323A0';
const PROP_PUR_DEEP = '#2D176B';
const PROP_PUR_BG   = '#F0ECFA';
const PROP_PUR_BORDER = '#C0B6DF';
const PROP_ERROR    = '#F44336';
const PROP_SUCCESS  = '#4CAF50';
const PROP_BORDER   = '#EEEEEE';
const PROP_HAIRLINE = 'rgba(60,60,67,0.10)';
const PROP_FONT     = '-apple-system, "SF Pro Text", "PingFang TC", "Noto Sans TC", system-ui, sans-serif';

// ─── Shared shell for a proposal card ────────────────────────
function PropFrame({ tag, title, summary, children, height = 600 }) {
  return (
    <div style={{
      width: '100%', height: '100%', overflow: 'hidden',
      background: '#FAFAFA', padding: 20,
      fontFamily: PROP_FONT, color: PROP_INK,
      display: 'flex', flexDirection: 'column', gap: 14,
    }}>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
        <span style={{
          display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
          padding: '3px 7px', borderRadius: 5, background: PROP_PUR, color: '#fff',
          fontSize: 10, fontWeight: 600, letterSpacing: 0.5, textTransform: 'uppercase',
          fontFamily: '"SF Mono", Menlo, monospace',
        }}>{tag}</span>
        <span style={{ fontSize: 15, fontWeight: 600, color: PROP_INK, letterSpacing: -0.2 }}>
          {title}
        </span>
      </div>
      <div style={{
        flex: 1, background: PROP_BG, borderRadius: 14,
        padding: 16, border: '1px solid ' + PROP_HAIRLINE,
        overflow: 'auto',
      }}>{children}</div>
      <div style={{ fontSize: 12, color: PROP_INK2, lineHeight: 1.55 }}>
        {summary}
      </div>
    </div>
  );
}

// ─── Proposal 1 · Date + Recurring 合一卡 ────────────────────
function Proposal1() {
  return (
    <PropFrame
      tag="P1"
      title="日期 + 定期 合成一張卡"
      summary="日期成為主元素（大字、可點開 picker），定期改成卡片底部明確的 toggle row + frequency 預覽。不再是兩個視覺切開的元件。">
      <div style={{
        background: PROP_SURFACE, borderRadius: 12, padding: 16,
        border: '1px solid ' + PROP_HAIRLINE,
      }}>
        {/* Date row */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{
            width: 40, height: 40, borderRadius: 10, background: PROP_PUR_BG,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <Glyph name="calendar" size={20} color={PROP_PUR} stroke={2}/>
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 12, color: PROP_INK2, marginBottom: 2 }}>日期</div>
            <div style={{ fontSize: 18, fontWeight: 500, color: PROP_INK }}>
              2026 年 5 月 14 日 <span style={{ color: PROP_INK2, fontWeight: 400, fontSize: 14 }}>週四 14:30</span>
            </div>
          </div>
          <Glyph name="chevron-right" size={14} color={PROP_INK3} stroke={2.4}/>
        </div>
        {/* Divider */}
        <div style={{ height: 1, background: PROP_HAIRLINE, margin: '14px 0' }}/>
        {/* Recurring toggle row */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{
            width: 40, height: 40, borderRadius: 10, background: PROP_PUR_BG,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <Glyph name="repeat" size={20} color={PROP_PUR} stroke={2}/>
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 15, fontWeight: 500, color: PROP_INK }}>重複此筆</div>
            <div style={{ fontSize: 12, color: PROP_INK2, marginTop: 2 }}>每月 14 日</div>
          </div>
          <div style={{
            width: 52, height: 32, borderRadius: 16, background: PROP_PUR,
            position: 'relative',
          }}>
            <div style={{
              position: 'absolute', top: 2, left: 22,
              width: 28, height: 28, borderRadius: 14, background: '#fff',
              boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
            }}/>
          </div>
        </div>
      </div>
    </PropFrame>
  );
}

// ─── Proposal 2 · Hero amount ────────────────────────────────
function Proposal2() {
  return (
    <PropFrame
      tag="P2"
      title="金額成為 hero (含 backspace)"
      summary={'金額放大到 56px / medium。Currency symbol 縮成 18px 上標。backspace 圖示放在右側 — 計算機鍵盤已經沒有 backspace 鍵，金額卡是最自然的位置（手指要刪數字時眼睛已經在這裡）。'}>
      <div style={{
        background: PROP_SURFACE, borderRadius: 12, padding: '28px 24px',
        border: '1px solid ' + PROP_PUR_BORDER,
        textAlign: 'center', position: 'relative',
      }}>
        <div style={{ fontSize: 11, color: PROP_INK2, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 10, fontWeight: 600 }}>
          支出金額
        </div>
        <div style={{ display: 'inline-flex', alignItems: 'flex-start', gap: 6 }}>
          <span style={{
            fontSize: 18, color: PROP_INK2, fontWeight: 500,
            marginTop: 6, fontVariantNumeric: 'tabular-nums',
          }}>NT$</span>
          <span style={{
            fontSize: 56, fontWeight: 500, color: PROP_INK,
            lineHeight: 1, letterSpacing: -2, fontVariantNumeric: 'tabular-nums',
          }}>185</span>
          <span style={{
            fontSize: 28, color: PROP_INK3, fontWeight: 500,
            marginTop: 2, fontVariantNumeric: 'tabular-nums',
          }}>.00</span>
        </div>
        <button style={{
          position: 'absolute', right: 18, top: '50%', transform: 'translateY(-50%)',
          width: 40, height: 40, borderRadius: 12,
          background: PROP_PUR_BG, border: 'none', cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <Glyph name="backspace-outline" size={20} color={PROP_PUR} stroke={1.6}/>
        </button>
      </div>
    </PropFrame>
  );
}

// ─── Proposal 3 · Real picker rows ───────────────────────────
function Proposal3() {
  const cat = CAT_BY_ID['food'];
  const acc = ACC_BY_ID['credit'];
  return (
    <PropFrame
      tag="P3"
      title="帳戶 / 類別 改成清楚的 picker row"
      summary="拆掉假的 wheel picker。每個欄位變成 icon + label + 選中的值 + chevron。affordance 跟其他 list row 一致，點下去清楚會開選擇器。">
      <div style={{
        background: PROP_SURFACE, borderRadius: 12,
        border: '1px solid ' + PROP_HAIRLINE, overflow: 'hidden',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '14px 16px' }}>
          <div style={{
            width: 36, height: 36, borderRadius: 10, background: PROP_PUR_BG,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <DynamicIconById iconId={cat.iconId} size={18} color={PROP_PUR}/>
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 12, color: PROP_INK2, marginBottom: 2 }}>類別</div>
            <div style={{ fontSize: 15, fontWeight: 500, color: PROP_INK }}>{cat.name}</div>
          </div>
          <Glyph name="chevron-right" size={14} color={PROP_INK3} stroke={2.4}/>
        </div>
        <div style={{ height: 0.5, background: PROP_HAIRLINE, marginLeft: 64 }}/>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '14px 16px' }}>
          <div style={{
            width: 36, height: 36, borderRadius: 10, background: PROP_PUR_BG,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <DynamicIconById iconId={acc.iconId} size={18} color={PROP_PUR}/>
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 12, color: PROP_INK2, marginBottom: 2 }}>帳戶</div>
            <div style={{ fontSize: 15, fontWeight: 500, color: PROP_INK }}>{acc.name}</div>
            <div style={{ fontSize: 11, color: PROP_INK2, marginTop: 2, fontVariantNumeric: 'tabular-nums' }}>餘額 -NT$8,420 · TWD</div>
          </div>
          <Glyph name="chevron-right" size={14} color={PROP_INK3} stroke={2.4}/>
        </div>
      </div>
    </PropFrame>
  );
}

// ─── Proposal 4 · 支出 / 收入 / 轉帳 segmented ────────────────
function Proposal4() {
  const [mode, setMode] = React.useState('expense');
  return (
    <PropFrame
      tag="P4"
      title="頂部加 支出/收入/轉帳 三選一"
      summary="進入 editor 後 type 仍可改。Active tab 用主色 fill + 白字；inactive 是 ghost。轉帳 tab 直接切換到 transfer 模式（畫面 layout 跟著變）。">
      <div style={{
        display: 'flex', padding: 4, gap: 4,
        background: PROP_SURFACE, borderRadius: 12,
        border: '1px solid ' + PROP_HAIRLINE,
      }}>
        {[
          { v: 'expense', label: '支出', icon: 'minus' },
          { v: 'income', label: '收入', icon: 'plus' },
          { v: 'transfer', label: '轉帳', icon: 'exchange' },
        ].map(t => {
          const active = mode === t.v;
          return (
            <button key={t.v} onClick={() => setMode(t.v)} style={{
              flex: 1, padding: '10px 8px', borderRadius: 8,
              border: 'none',
              background: active ? PROP_PUR : 'transparent',
              color: active ? '#fff' : PROP_INK2,
              fontSize: 14, fontWeight: 500, fontFamily: 'inherit',
              cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
            }}>
              <Glyph name={t.icon} size={14} color={active ? '#fff' : PROP_INK2} stroke={2.4}/>
              {t.label}
            </button>
          );
        })}
      </div>
      <div style={{ marginTop: 14, fontSize: 12, color: PROP_INK2 }}>
        切換到「{ mode === 'expense' ? '支出' : mode === 'income' ? '收入' : '轉帳' }」模式 — 整個 editor 的欄位佈局會跟著變。
      </div>
    </PropFrame>
  );
}

// ─── Proposal 5 · Note with suggestions ──────────────────────
function Proposal5() {
  return (
    <PropFrame
      tag="P5"
      title="備註欄加 icon + 常用建議"
      summary="加上 prefix icon 暗示這是文字輸入。下方顯示同類別最近 3 個常用備註的 chip — 點一下直接帶入。減少打字、強化 muscle memory。">
      <div>
        <div style={{
          display: 'flex', alignItems: 'center', gap: 12,
          background: PROP_SURFACE, padding: 14, borderRadius: 10,
          border: '1px solid ' + PROP_HAIRLINE,
        }}>
          <Glyph name="tag" size={18} color={PROP_INK2} stroke={2}/>
          <input placeholder="新增備註... 例: 路易莎咖啡"
            style={{
              flex: 1, border: 'none', outline: 'none', background: 'transparent',
              fontSize: 15, color: PROP_INK, fontFamily: 'inherit',
            }}/>
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 12 }}>
          {['路易莎咖啡', '星巴克', '便當', '麥當勞', '7-11'].map(s => (
            <button key={s} style={{
              padding: '6px 12px', borderRadius: 16, border: '1px solid ' + PROP_HAIRLINE,
              background: PROP_SURFACE, color: PROP_INK, fontSize: 13, fontFamily: 'inherit',
              cursor: 'pointer',
            }}>{s}</button>
          ))}
        </div>
        <div style={{ fontSize: 11, color: PROP_INK3, marginTop: 8 }}>
          ↑ 「飲食」類別最近 5 筆的備註
        </div>
      </div>
    </PropFrame>
  );
}

// ─── Proposal 6 · Calculator that works ──────────────────────
function Proposal6() {
  return (
    <PropFrame
      tag="P6"
      title="鍵盤的運算子真的能算"
      summary="支援 185 + 45 = 230。記帳很常一次有多筆要加總。也讓 +/-/×/÷ 不再是裝飾。Pending expression 顯示在金額欄上方小字。">
      {/* Mock display */}
      <div style={{
        background: PROP_SURFACE, padding: '14px 16px',
        borderRadius: 10, border: '1px solid ' + PROP_PUR_BORDER,
        marginBottom: 12,
      }}>
        <div style={{ fontSize: 12, color: PROP_INK2, fontVariantNumeric: 'tabular-nums', marginBottom: 4 }}>
          185 + 45 + 60 =
        </div>
        <div style={{ fontSize: 28, fontWeight: 500, color: PROP_INK, fontVariantNumeric: 'tabular-nums' }}>
          NT$ 290
        </div>
      </div>
      {/* Keypad row showing operators light up */}
      <div style={{ display: 'flex', gap: 6 }}>
        {['7', '8', '9', '+'].map(k => {
          const op = k === '+';
          return (
            <div key={k} style={{
              flex: 1, height: 42, borderRadius: 8,
              background: op ? PROP_PUR : PROP_SURFACE,
              border: op ? 'none' : '1px solid ' + PROP_HAIRLINE,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 18, fontWeight: 500,
              color: op ? '#fff' : PROP_INK,
            }}>{k}</div>
          );
        })}
      </div>
      <div style={{ fontSize: 11, color: PROP_INK3, marginTop: 8 }}>
        ↑ Operators 變成主色 active 樣式，按下會運算
      </div>
    </PropFrame>
  );
}

// ─── Proposal 7 · Delete button moved + confirmed ────────────
function Proposal7() {
  return (
    <PropFrame
      tag="P7"
      title="刪除按鈕移到 header，加確認"
      summary="從畫面底部紅字（誤觸區）移到 header trailing 的垃圾桶 icon。點下去顯示半透明確認 sheet，避免一鍵刪除。">
      {/* Header preview */}
      <div style={{
        background: PROP_SURFACE, padding: '12px 14px', borderRadius: 10,
        border: '1px solid ' + PROP_HAIRLINE, marginBottom: 14,
        display: 'flex', alignItems: 'center',
      }}>
        <Glyph name="x" size={17} color={PROP_INK} stroke={2.4}/>
        <span style={{ flex: 1, textAlign: 'center', fontSize: 15, fontWeight: 500 }}>編輯交易</span>
        <div style={{ display: 'flex', gap: 8 }}>
          <Glyph name="trash" size={17} color={PROP_ERROR} stroke={2.2}/>
          <Glyph name="check" size={17} color={PROP_PUR} stroke={2.4}/>
        </div>
      </div>
      {/* Confirmation sheet preview */}
      <div style={{
        background: PROP_SURFACE, borderRadius: 12, padding: 18,
        border: '1px solid ' + PROP_HAIRLINE,
      }}>
        <div style={{ fontSize: 15, fontWeight: 500, color: PROP_INK, marginBottom: 6 }}>
          確定要刪除這筆交易？
        </div>
        <div style={{ fontSize: 13, color: PROP_INK2, marginBottom: 14 }}>
          飲食 · 路易莎咖啡 · -NT$185
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button style={{
            flex: 1, padding: '10px', borderRadius: 8, border: '1px solid ' + PROP_HAIRLINE,
            background: PROP_SURFACE, color: PROP_INK, fontSize: 14, fontWeight: 500, fontFamily: 'inherit',
            cursor: 'pointer',
          }}>取消</button>
          <button style={{
            flex: 1, padding: '10px', borderRadius: 8, border: 'none',
            background: PROP_ERROR, color: '#fff', fontSize: 14, fontWeight: 500, fontFamily: 'inherit',
            cursor: 'pointer',
          }}>刪除</button>
        </div>
      </div>
    </PropFrame>
  );
}

// ─── Proposal 8 · Transfer amount hierarchy ──────────────────
function Proposal8() {
  return (
    <PropFrame
      tag="P8"
      title="Transfer 金額分主從"
      summary="From 金額為 hero。To 金額縮小為 secondary 一行字 + 匯率提示。同幣別時 To 自動隱藏（一筆轉帳只剩一個金額）。">
      <div style={{
        background: PROP_SURFACE, borderRadius: 12, padding: 20,
        border: '1px solid ' + PROP_PUR_BORDER,
        textAlign: 'center',
      }}>
        <div style={{ fontSize: 11, color: PROP_INK2, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 10, fontWeight: 600 }}>
          從 玉山活儲 轉出
        </div>
        <div style={{ display: 'inline-flex', alignItems: 'flex-start', gap: 4 }}>
          <span style={{ fontSize: 16, color: PROP_INK2, fontWeight: 500, marginTop: 5 }}>NT$</span>
          <span style={{
            fontSize: 48, fontWeight: 500, color: PROP_INK, lineHeight: 1,
            letterSpacing: -1.5, fontVariantNumeric: 'tabular-nums',
          }}>15,000</span>
        </div>
        <div style={{
          marginTop: 14, padding: '8px 12px', display: 'inline-flex', gap: 6,
          background: PROP_PUR_BG, borderRadius: 16, alignItems: 'center',
        }}>
          <Glyph name="exchange" size={12} color={PROP_PUR} stroke={2.2}/>
          <span style={{ fontSize: 12, color: PROP_PUR, fontWeight: 500, fontVariantNumeric: 'tabular-nums' }}>
            ≈ US$480  ·  rate 31.25
          </span>
        </div>
      </div>
    </PropFrame>
  );
}

// ─── Proposal 9 · Swap from↔to ───────────────────────────────
function Proposal9() {
  return (
    <PropFrame
      tag="P9"
      title="中間箭頭可點 → 對調 from/to"
      summary="中間的箭頭變成 tappable swap button — 點下去 from / to 對調。長按或左滑也可。避免用戶選錯方向後要重來。">
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <div style={{
          flex: 1, background: PROP_SURFACE, padding: 14, borderRadius: 10,
          border: '1px solid ' + PROP_HAIRLINE,
        }}>
          <div style={{ fontSize: 11, color: PROP_INK2, marginBottom: 4 }}>從</div>
          <div style={{ fontSize: 14, fontWeight: 500, color: PROP_INK }}>玉山活儲</div>
        </div>
        <button style={{
          width: 36, height: 36, borderRadius: 18,
          background: PROP_PUR_BG, border: '1.5px solid ' + PROP_PUR,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          cursor: 'pointer', padding: 0, position: 'relative',
        }}>
          <Glyph name="exchange" size={16} color={PROP_PUR} stroke={2.4}/>
        </button>
        <div style={{
          flex: 1, background: PROP_SURFACE, padding: 14, borderRadius: 10,
          border: '1px solid ' + PROP_HAIRLINE,
        }}>
          <div style={{ fontSize: 11, color: PROP_INK2, marginBottom: 4 }}>到</div>
          <div style={{ fontSize: 14, fontWeight: 500, color: PROP_INK }}>USD 旅費</div>
        </div>
      </div>
      <div style={{ fontSize: 11, color: PROP_INK3, marginTop: 12, textAlign: 'center' }}>
        點中間的箭頭對調 ↑
      </div>
    </PropFrame>
  );
}

// ─── Proposal 10 · Visual hierarchy ──────────────────────────
function Proposal10() {
  return (
    <PropFrame
      tag="P10"
      title="三層視覺 hierarchy"
      summary="HERO (金額) → PRIMARY (類別/帳戶) → METADATA (日期/備註/recurring)。用字級、卡片陰影、留白建立層級。掃視時眼睛知道往哪看。">
      {/* HERO */}
      <div style={{
        background: PROP_SURFACE, borderRadius: 12, padding: 20,
        border: '1px solid ' + PROP_PUR_BORDER, textAlign: 'center', marginBottom: 12,
      }}>
        <div style={{ fontSize: 10, color: PROP_INK2, letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 6, fontWeight: 600 }}>HERO</div>
        <div style={{ fontSize: 36, fontWeight: 500, color: PROP_INK, letterSpacing: -1, fontVariantNumeric: 'tabular-nums' }}>NT$ 185</div>
      </div>
      {/* PRIMARY */}
      <div style={{
        background: PROP_SURFACE, borderRadius: 10, padding: '10px 12px',
        border: '1px solid ' + PROP_HAIRLINE, marginBottom: 8,
        display: 'flex', gap: 10,
      }}>
        <div style={{ fontSize: 9, color: PROP_INK2, letterSpacing: 1.5, textTransform: 'uppercase', width: 56 }}>PRIMARY</div>
        <div style={{ flex: 1, fontSize: 14, color: PROP_INK }}>飲食 · 國泰世華 信用卡</div>
      </div>
      {/* METADATA */}
      <div style={{
        background: 'transparent', padding: '8px 12px',
        display: 'flex', gap: 10,
      }}>
        <div style={{ fontSize: 9, color: PROP_INK3, letterSpacing: 1.5, textTransform: 'uppercase', width: 56 }}>META</div>
        <div style={{ flex: 1, fontSize: 12, color: PROP_INK2 }}>2026/05/14 · 路易莎咖啡 · 不重複</div>
      </div>
    </PropFrame>
  );
}

Object.assign(window, {
  Proposal1, Proposal2, Proposal3, Proposal4, Proposal5,
  Proposal6, Proposal7, Proposal8, Proposal9, Proposal10,
});
