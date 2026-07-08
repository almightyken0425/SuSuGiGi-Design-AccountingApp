// ─────────────────────────────────────────────────────────────
// Exploration · CalculatorKeypad · Axis · Press Feedback
//
// Key Visual 軸定案鍵面留用 V0 玻璃磚。本軸深化按壓回饋：
// 現況是整鍵透明度降到 0.7（theme.state.press.opacity），
// 玻璃磚本身半透明，透明度變化在磚面上讀感很弱。
// 本軸並陳六種「按下變色」處理，鍵面 / 排列 / 底座維持 V0 不動。
//
// 全部 artboard 可互動：按住任一鍵看回饋、放開看回復動畫（160ms）。
//
// P0 [Current] · Opacity dim
//     現況 baseline：整鍵透明度 0.7
// P1 · Purple tint
//     數字鍵按下染 p50、op 鍵染 p100 實色；品牌色輕染
// P2 · Solid flash
//     按下轉 p500 實色、字轉白；對比最強、回饋最明確
// P3 · Ink dim
//     按下蓋淡墨（iOS 系統鍵盤的按壓感）；數字 op 同語言
// P4 · Ring highlight
//     按下亮 p300 內圈框；變色在框不在面、磚面不動
// P5 · Scale + tint
//     P1 輕染再加縮放 0.94；模擬按下沉的觸感
// ─────────────────────────────────────────────────────────────

const KPF_NUMBER_ROWS = [
  ['1', '2', '3'],
  ['4', '5', '6'],
  ['7', '8', '9'],
  ['.', '0', '='],
];
const KPF_OPS = ['⌫', '+', '-', '×', '÷'];
const KPF_NUM_KEY_HEIGHT = 60;
const KPF_RELEASE_MS = 160;

// ─── V0 基底鍵面（與 Key Visual 軸 V0 一致） ──────────────────
function KPF_BaseFace(isOp) {
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

// ─── 六種按壓回饋 ─── feedback(isOp) → pressed 時的覆蓋樣式
const KPF_FEEDBACKS = {
  // P0 現況：整鍵透明度 0.7
  opacityDim: (isOp) => ({
    button: { opacity: 0.7 },
  }),
  // P1：品牌色輕染
  purpleTint: (isOp) => ({
    tile: { background: isOp ? TOKENS.p100 : TOKENS.p50 },
  }),
  // P2：p500 實色 + 白字
  solidFlash: (isOp) => ({
    tile: { background: TOKENS.p500, border: `1px solid ${TOKENS.p500}` },
    label: { color: '#fff' },
  }),
  // P3：淡墨蓋色（iOS 鍵盤感）
  inkDim: (isOp) => ({
    tile: { background: isOp ? `${TOKENS.p200}80` : 'rgba(60,60,67,0.12)' },
  }),
  // P4：p300 內圈框
  ringHighlight: (isOp) => ({
    tile: { boxShadow: `0 4px 12px rgba(0,0,0,0.10), inset 0 0 0 2px ${TOKENS.p300}` },
  }),
  // P5：輕染 + 縮放下沉
  scaleTint: (isOp) => ({
    button: { transform: 'scale(0.94)' },
    tile: { background: isOp ? TOKENS.p100 : TOKENS.p50 },
  }),
};

// ─── KPF_Keypad ─── V0 keypad + 可互動按壓回饋
function KPF_Keypad({ feedback }) {
  const [pressedKey, setPressedKey] = React.useState(null);
  const rowGap = SPACING.sm;
  const colGap = SPACING.xs;
  const totalH = KPF_NUM_KEY_HEIGHT * KPF_NUMBER_ROWS.length
               + rowGap * (KPF_NUMBER_ROWS.length - 1);

  const keyButton = (key, zone, layout) => {
    const isOp = zone === 'op';
    const base = KPF_BaseFace(isOp);
    const pressed = pressedKey === key;
    const over = pressed ? feedback(isOp) : {};
    const ease = pressed
      ? 'none'
      : `opacity ${KPF_RELEASE_MS}ms, transform ${KPF_RELEASE_MS}ms`;
    const tileEase = pressed
      ? 'none'
      : `background ${KPF_RELEASE_MS}ms, box-shadow ${KPF_RELEASE_MS}ms`;
    return (
      <button key={key}
        onMouseDown={() => setPressedKey(key)}
        onMouseUp={() => setPressedKey(null)}
        onMouseLeave={() => setPressedKey(null)}
        onTouchStart={() => setPressedKey(key)}
        onTouchEnd={() => setPressedKey(null)}
        style={{
          border: 'none', position: 'relative', overflow: 'hidden',
          cursor: 'pointer', fontFamily: 'inherit',
          background: 'transparent', padding: 0,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          transition: ease,
          ...layout,
          ...(over.button || {}),
        }}>
        <div style={{
          position: 'absolute', inset: 0,
          transition: tileEase,
          ...base.tile,
          ...(over.tile || {}),
        }}/>
        <span style={{
          position: 'relative', zIndex: 1,
          ...base.label,
          ...(over.label || {}),
        }}>{key}</span>
      </button>
    );
  };

  return (
    <div style={{ padding: SPACING.sm, display: 'flex', flexDirection: 'row' }}>
      <div style={{ flex: 3 }}>
        {KPF_NUMBER_ROWS.map((row, ri) => (
          <div key={ri} style={{
            display: 'flex', flexDirection: 'row',
            marginBottom: ri === KPF_NUMBER_ROWS.length - 1 ? 0 : rowGap,
          }}>
            {row.map(k => keyButton(k, 'number', {
              flex: 1, height: KPF_NUM_KEY_HEIGHT,
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
        {KPF_OPS.map(op => keyButton(op, 'op', { flex: 1, width: '100%' }))}
      </div>
    </div>
  );
}

// ─── Dock strip ─── V0 底座（surface + 硬 borderTop）
function KPF_DockStrip({ children }) {
  return (
    <div style={{
      width: '100%', height: '100%',
      background: TOKENS.bg,
      display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
    }}>
      <div style={{
        background: TOKENS.surface,
        borderTop: `1px solid ${TOKENS.border}`,
        paddingBottom: SPACING.sm,
      }}>
        {children}
      </div>
    </div>
  );
}

// ─── Section render ──────────────────────────────────────────
function KeypadPressFeedbackSection() {
  const W = 402, H = 330;
  const variants = [
    { id: 'kpf-p0-opacity-dim',
      label: 'P0 [Current] · Opacity dim · 整鍵透明度 0.7（按住看效果）',
      feedback: KPF_FEEDBACKS.opacityDim },
    { id: 'kpf-p1-purple-tint',
      label: 'P1 · Purple tint · 數字染 p50、op 染 p100 實色（按住看效果）',
      feedback: KPF_FEEDBACKS.purpleTint },
    { id: 'kpf-p2-solid-flash',
      label: 'P2 · Solid flash · 按下轉 p500 實色白字（按住看效果）',
      feedback: KPF_FEEDBACKS.solidFlash },
    { id: 'kpf-p3-ink-dim',
      label: 'P3 · Ink dim · 淡墨蓋色，iOS 鍵盤按壓感（按住看效果）',
      feedback: KPF_FEEDBACKS.inkDim },
    { id: 'kpf-p4-ring-highlight',
      label: 'P4 · Ring highlight · p300 內圈框亮起，磚面不動（按住看效果）',
      feedback: KPF_FEEDBACKS.ringHighlight },
    { id: 'kpf-p5-scale-tint',
      label: 'P5 · Scale + tint · 輕染加縮放 0.94 下沉（按住看效果）',
      feedback: KPF_FEEDBACKS.scaleTint },
  ];
  return (
    <DCSection id="kpf-section"
      title="Axis · Press Feedback"
      subtitle="Key Visual 軸定案 V0 玻璃磚後深化按壓回饋。現況整鍵透明度 0.7 在半透明磚面上讀感弱，本軸並陳六種按下變色處理。每個 artboard 都可互動：按住任一鍵看回饋、放開看 160ms 回復。">
      {variants.map(v => (
        <DCArtboard key={v.id} id={v.id} label={v.label} width={W} height={H}>
          <KPF_DockStrip>
            <KPF_Keypad feedback={v.feedback}/>
          </KPF_DockStrip>
        </DCArtboard>
      ))}
    </DCSection>
  );
}

Object.assign(window, { KeypadPressFeedbackSection });
