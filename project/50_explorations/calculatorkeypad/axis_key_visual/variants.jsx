// ─────────────────────────────────────────────────────────────
// Exploration · CalculatorKeypad · Axis · Key Visual & Dock
//
// 計算機是 token 體系建立前的元件（無 KEYPAD_TOKENS），鍵面仍是
// 玻璃磚 + 每鍵陰影 + 白邊，與 editor 現行卡片語言（不透明白、
// 無影、hairline 框）對不上。本軸並陳六種鍵面 / 底座處理，
// 排列與操作邏輯（4×3 數字 + operator column 5 鍵、useCalculator）
// 完全不動，只換皮。
//
// V0 [Current] · Glass tiles
//     現況 baseline：玻璃磚 + 每鍵 0 4px 12px 陰影 + 白邊，
//     op 欄 p100*0.5 玻璃染色，底座 surface + 硬 borderTop
// V1 · Card keys
//     鍵面改 editor 卡片語言：不透明白 + hairline 框、無陰影；
//     op 鍵 p50 底 p600 字；= 鍵 p500 實色白字強調求值
// V2 · Naked minimal
//     無鍵底純文字，字級升 2xl；op 欄 p500 字；
//     底座改圓頂角 sheet + 上浮陰影（按壓回饋改 p50 圓形 highlight，
//     canvas 以 5 鍵靜態示意）
// V3 · Refined glass
//     保留玻璃語言但收斂：去每鍵陰影、圓角升 lg；
//     op 欄 p500 實色白字；底座改玻璃浮層（對齊 BottomSearchBar
//     不畫不透明底的底部語言）
// V4 · Tonal zones
//     iOS 計算機式色階分區：數字鍵 surface2 無框無影、
//     op 欄 p500 實色、= 鍵 p700；分區靠色階不靠陰影
// V5 · Fused panel
//     一體白卡面板（radius lg + hairline 框），內部 hairline
//     格線分格、無每鍵獨立底；op 欄整條 p50 色帶；
//     對齊 GroupedListCard 的群組卡語言
// ─────────────────────────────────────────────────────────────

// ─── 共用排列（與 impl CalculatorKeypad.tsx 一致，不動） ──────
const KKV_NUMBER_ROWS = [
  ['1', '2', '3'],
  ['4', '5', '6'],
  ['7', '8', '9'],
  ['.', '0', '='],
];
const KKV_OPS = ['⌫', '+', '-', '×', '÷'];
const KKV_NUM_KEY_HEIGHT = 60;

// ─── KKV_TileGrid ─── 鍵各自帶底的排法（V0–V4 共用骨架）
// faceFor(key, zone) → { tile, label }；zone = 'number' | 'op'
// tile=null 代表無鍵底（V2 純文字）
function KKV_TileGrid({ faceFor, rowGap = SPACING.sm, colGap = SPACING.xs, onPress }) {
  const totalH = KKV_NUM_KEY_HEIGHT * KKV_NUMBER_ROWS.length
               + rowGap * (KKV_NUMBER_ROWS.length - 1);
  const keyButton = (key, zone, style) => {
    const face = faceFor(key, zone);
    return (
      <button key={key} onClick={() => onPress && onPress(key)} style={{
        border: 'none', position: 'relative', overflow: 'hidden',
        cursor: 'pointer', fontFamily: 'inherit',
        background: 'transparent', padding: 0,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        ...style,
      }}>
        {face.tile && <div style={{ position: 'absolute', inset: 0, ...face.tile }}/>}
        <span style={{ position: 'relative', zIndex: 1, ...face.label }}>{key}</span>
      </button>
    );
  };
  return (
    <div style={{ padding: SPACING.sm, display: 'flex', flexDirection: 'row' }}>
      <div style={{ flex: 3 }}>
        {KKV_NUMBER_ROWS.map((row, ri) => (
          <div key={ri} style={{
            display: 'flex', flexDirection: 'row',
            marginBottom: ri === KKV_NUMBER_ROWS.length - 1 ? 0 : rowGap,
          }}>
            {row.map(k => keyButton(k, 'number', {
              flex: 1, height: KKV_NUM_KEY_HEIGHT,
              marginLeft: colGap, marginRight: colGap,
            }))}
          </div>
        ))}
      </div>
      <div style={{
        flex: 1, marginLeft: colGap, marginRight: colGap,
        height: totalH, display: 'flex', flexDirection: 'column',
        gap: rowGap,
      }}>
        {KKV_OPS.map(op => keyButton(op, 'op', { flex: 1, width: '100%' }))}
      </div>
    </div>
  );
}

// ─── V0 [Current] · Glass tiles ──────────────────────────────
function KKV_V0_Face(key, zone) {
  const isOp = zone === 'op';
  return {
    tile: {
      borderRadius: RADIUS.md,
      background: isOp ? `${TOKENS.p100}80` : GLASS.tint,
      backdropFilter: 'blur(28px) saturate(180%)',
      WebkitBackdropFilter: 'blur(28px) saturate(180%)',
      border: `1px solid ${GLASS.border}`,
      boxShadow: '0 4px 12px rgba(0,0,0,0.10)',
    },
    label: {
      fontSize: TYPOGRAPHY.size.xl,
      fontWeight: TYPOGRAPHY.weight.medium,
      color: isOp ? TOKENS.p500 : TOKENS.ink,
    },
  };
}

// ─── V1 · Card keys ──────────────────────────────────────────
function KKV_V1_Face(key, zone) {
  const isOp = zone === 'op';
  const isEquals = key === '=';
  return {
    tile: {
      borderRadius: RADIUS.md,
      background: isEquals ? TOKENS.p500 : isOp ? TOKENS.p50 : TOKENS.surface,
      border: isEquals ? 'none' : `1px solid ${TOKENS.border}`,
    },
    label: {
      fontSize: TYPOGRAPHY.size.xl,
      fontWeight: TYPOGRAPHY.weight.medium,
      color: isEquals ? '#fff' : isOp ? TOKENS.p600 : TOKENS.ink,
    },
  };
}

// ─── V2 · Naked minimal ──────────────────────────────────────
// 無鍵底純文字。按壓回饋為 p50 圓形 highlight，canvas 以 5 鍵靜態示意。
function KKV_V2_Face(key, zone) {
  const isOp = zone === 'op';
  const pressedDemo = key === '5';
  return {
    tile: pressedDemo ? {
      borderRadius: RADIUS.md,
      background: TOKENS.p50,
    } : null,
    label: {
      fontSize: isOp ? TYPOGRAPHY.size.xl : TYPOGRAPHY.size['2xl'],
      fontWeight: TYPOGRAPHY.weight.medium,
      color: isOp ? TOKENS.p500 : TOKENS.ink,
    },
  };
}

// ─── V3 · Refined glass ──────────────────────────────────────
function KKV_V3_Face(key, zone) {
  const isOp = zone === 'op';
  return {
    tile: {
      borderRadius: RADIUS.lg,
      background: isOp ? TOKENS.p500 : GLASS.tint,
      backdropFilter: isOp ? 'none' : 'blur(28px) saturate(180%)',
      WebkitBackdropFilter: isOp ? 'none' : 'blur(28px) saturate(180%)',
      border: isOp ? 'none' : `1px solid ${GLASS.border}`,
    },
    label: {
      fontSize: TYPOGRAPHY.size.xl,
      fontWeight: TYPOGRAPHY.weight.medium,
      color: isOp ? '#fff' : TOKENS.ink,
    },
  };
}

// ─── V4 · Tonal zones ────────────────────────────────────────
function KKV_V4_Face(key, zone) {
  const isOp = zone === 'op';
  const isEquals = key === '=';
  return {
    tile: {
      borderRadius: RADIUS.md,
      background: isEquals ? TOKENS.p700 : isOp ? TOKENS.p500 : TOKENS.surface2,
    },
    label: {
      fontSize: TYPOGRAPHY.size.xl,
      fontWeight: TYPOGRAPHY.weight.medium,
      color: (isOp || isEquals) ? '#fff' : TOKENS.ink,
    },
  };
}

// ─── V5 · Fused panel ────────────────────────────────────────
// 一體白卡 + hairline 格線，不走 TileGrid（無 gap、格線分格）。
function KKV_V5_FusedPanel({ onPress }) {
  const cell = (key, zone, extra) => {
    const isOp = zone === 'op';
    return (
      <button key={key} onClick={() => onPress && onPress(key)} style={{
        border: 'none', cursor: 'pointer', fontFamily: 'inherit',
        background: 'transparent', padding: 0,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: TYPOGRAPHY.size.xl,
        fontWeight: TYPOGRAPHY.weight.medium,
        color: isOp ? TOKENS.p600 : TOKENS.ink,
        ...extra,
      }}>{key}</button>
    );
  };
  return (
    <div style={{ padding: SPACING.sm, paddingLeft: SPACING.lg, paddingRight: SPACING.lg }}>
      <div style={{
        background: TOKENS.surface,
        borderRadius: RADIUS.lg,
        border: `1px solid ${TOKENS.border}`,
        overflow: 'hidden',
        display: 'flex', flexDirection: 'row',
      }}>
        <div style={{ flex: 3 }}>
          {KKV_NUMBER_ROWS.map((row, ri) => (
            <div key={ri} style={{
              display: 'flex', flexDirection: 'row',
              borderTop: ri === 0 ? 'none' : `1px solid ${TOKENS.hairline}`,
            }}>
              {row.map((k, ci) => cell(k, 'number', {
                flex: 1, height: KKV_NUM_KEY_HEIGHT,
                borderLeft: ci === 0 ? 'none' : `1px solid ${TOKENS.hairline}`,
              }))}
            </div>
          ))}
        </div>
        <div style={{
          flex: 1, display: 'flex', flexDirection: 'column',
          background: TOKENS.p50,
          borderLeft: `1px solid ${TOKENS.hairline}`,
        }}>
          {KKV_OPS.map((op, oi) => cell(op, 'op', {
            flex: 1, width: '100%',
            borderTop: oi === 0 ? 'none' : `1px solid ${TOKENS.hairline}`,
          }))}
        </div>
      </div>
    </div>
  );
}

// ─── Dock 樣式（底座） ────────────────────────────────────────
const KKV_DOCKS = {
  // V0 現況：不透明 surface + 硬 borderTop
  current: {
    background: TOKENS.surface,
    borderTop: `1px solid ${TOKENS.border}`,
  },
  // V1 / V5：與頁面同底色，僅 hairline 分隔（鍵面 / 面板自己浮出）
  page: {
    background: TOKENS.bg,
    borderTop: `1px solid ${TOKENS.hairline}`,
  },
  // V2：圓頂角 sheet + 上浮陰影
  sheet: {
    background: TOKENS.surface,
    borderRadius: `${RADIUS.xl}px ${RADIUS.xl}px 0 0`,
    boxShadow: '0 -8px 24px rgba(0,0,0,0.08)',
  },
  // V3：玻璃浮層（對齊 BottomSearchBar 不畫不透明底）
  glass: {
    background: GLASS.tint,
    backdropFilter: 'blur(28px) saturate(180%)',
    WebkitBackdropFilter: 'blur(28px) saturate(180%)',
    borderTop: `1px solid ${TOKENS.hairline}`,
  },
  // V4：不透明 surface + hairline（分區靠鍵面色階，不需硬線）
  surfaceHairline: {
    background: TOKENS.surface,
    borderTop: `1px solid ${TOKENS.hairline}`,
  },
};

// ─── KKV_Shell ─── TransactionEditor 情境殼（可換 keypad + dock）
function KKV_Shell({ keypad, dock }) {
  const T = TRANSACTION_EDITOR_SCREEN_TOKENS;
  const acc = ACC_BY_ID['credit'];
  return (
    <div style={{
      display: 'flex', flexDirection: 'column', height: '100%',
      position: 'relative', background: TOKENS.bg,
    }}>
      <ModalHeader title="新增交易" onClose={() => {}} onSave={() => {}}/>
      <div style={{ flex: 1, overflowY: 'auto', padding: SPACING.lg }}>
        <EditorDateContainer recurring={false} onToggleRecurring={() => {}}/>
        <TransactionAmountContainer
          symbol={currencySymbolFor(acc.currency)}
          amount="185" amountFocused onFocus={() => {}}/>
        <TransactionPickerRow accountId="credit" categoryId="food"/>
        <EditorNoteField value="路易莎咖啡" onChange={() => {}}/>
        <div style={{ height: T.SCROLL_SPACER_HEIGHT }}/>
      </div>
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0,
        paddingBottom: T.KEYPAD_BOTTOM_PADDING,
        ...dock,
      }}>
        {keypad}
      </div>
    </div>
  );
}

// ─── Section render ──────────────────────────────────────────
function KeypadKeyVisualSection() {
  const W = 402, H = 874;
  const variants = [
    { id: 'kkv-v0-glass-tiles',
      label: 'V0 [Current] · Glass tiles · 玻璃磚 + 每鍵陰影白邊，op 欄 p100 半透染色，底座硬 borderTop',
      keypad: <KKV_TileGrid faceFor={KKV_V0_Face}/>, dock: KKV_DOCKS.current },
    { id: 'kkv-v1-card-keys',
      label: 'V1 · Card keys · 不透明白鍵 + hairline 框無影（editor 卡片語言），op p50 底，= 鍵 p500 強調',
      keypad: <KKV_TileGrid faceFor={KKV_V1_Face}/>, dock: KKV_DOCKS.page },
    { id: 'kkv-v2-naked-minimal',
      label: 'V2 · Naked minimal · 無鍵底純文字 2xl，op p500 字；底座圓頂角 sheet（5 鍵 = 按壓 highlight 示意）',
      keypad: <KKV_TileGrid faceFor={KKV_V2_Face}/>, dock: KKV_DOCKS.sheet },
    { id: 'kkv-v3-refined-glass',
      label: 'V3 · Refined glass · 玻璃留、陰影去、圓角升 lg；op 欄 p500 實色白字；底座玻璃浮層',
      keypad: <KKV_TileGrid faceFor={KKV_V3_Face}/>, dock: KKV_DOCKS.glass },
    { id: 'kkv-v4-tonal-zones',
      label: 'V4 · Tonal zones · 數字鍵 surface2 無框無影、op 欄 p500 實色、= 鍵 p700；色階分區',
      keypad: <KKV_TileGrid faceFor={KKV_V4_Face}/>, dock: KKV_DOCKS.surfaceHairline },
    { id: 'kkv-v5-fused-panel',
      label: 'V5 · Fused panel · 一體白卡 + hairline 格線分格，op 欄整條 p50 色帶（GroupedListCard 語言）',
      keypad: <KKV_V5_FusedPanel/>, dock: KKV_DOCKS.page },
  ];
  return (
    <DCSection id="kkv-section"
      title="Axis · Key Visual & Dock"
      subtitle="計算機鍵面與底座的視覺翻新。排列與操作邏輯不動（4×3 數字 + operator column 5 鍵），只換鍵面材質、op 欄用色、底座處理。六 variant 都放在 TransactionEditor 完整情境內比對。">
      {variants.map(v => (
        <DCArtboard key={v.id} id={v.id} label={v.label} width={W} height={H}>
          <IOSDevice width={W} height={H}>
            <KKV_Shell keypad={v.keypad} dock={v.dock}/>
          </IOSDevice>
        </DCArtboard>
      ))}
    </DCSection>
  );
}

Object.assign(window, { KeypadKeyVisualSection });
