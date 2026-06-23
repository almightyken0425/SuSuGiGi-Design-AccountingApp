// ─────────────────────────────────────────────────────────────
// Exploration · Home Donut · Focus Indicator + 雙側辨識
//
// 來源：首頁雙向 donut（PageHeaderContent）目前兩個問題
//   問題 1（單側無開口）：只有支出或只有收入時，整圈收斂成一個閉合 ring，
//     12 點起點沒有開口。雙側時 12 點與交會點各有 pad 間隙、看得出兩段弧。
//   問題 2（焦點無指示 + 同色難讀）：focus card 切支出/收入時 donut 沒有任何
//     視覺指出選的是哪一側；且支出、收入兩側 slice 用同一條紫色色階，
//     兩段弧顏色一模一樣、讀者分不出哪段是支出哪段是收入。
//
// 本探索把兩個問題一起放進可互動的 mock：
//   - 點 focus card 切換聚焦側
//   - 切「支出+收入 / 只支出 / 只收入」情境（看問題 1 的開口差異）
//   - 「重播生長」看 indicator 是否跟著 donut 一起長出來
//
// 五個 variant：
//   baseline 現況   — 同色、無指示、單側閉合（重現兩問題）
//   P1 外圈弧       — 沿外圈加對比色橘弧，跟著聚焦側生長（使用者構想）
//   P2 雙色+淡化    — 支出紫／收入青不同色階，失焦側淡化
//   P3 雙色+外圈弧  — 雙色 + 橘弧（推薦：辨識 + 明確指向）
//   P4 [採用] 加粗  — 同色，聚焦側 outer+4 / inner−4 加粗（最終定案）
//
// 決議（2026-06-19）：採 P4 聚焦側加粗（outer+2 / inner−2、同色、不分色）；
//   Issue 1 單側開口採方案 B —— 滿圈單片在有 pad 時也吃 pad，開口 = 一般 slice
//   交接縫（~1°），不另留寬縫。已落 design 權威層 + impl。
//   註：本探索檔 DFI_Donut 用 DFI_START_GAP 是早期提案的寬縫示意，非最終值。
// 色值取自 10_foundations atomic tokens：紫 chart ramp、teal ramp、contrast 橘 #F24F13。
// ─────────────────────────────────────────────────────────────

// ---- 幾何常數 ----
const DFI_TAU = Math.PI * 2;
const DFI_PAD = (1 * Math.PI) / 180;        // 每片 slice 間隙（對齊 impl PAD_ANGLE 1°）
const DFI_START_GAP = (14 * Math.PI) / 180; // 單側時 12 點保留的開口（問題 1 的修正，可調）
const DFI_ORANGE = '#F24F13';               // contrast 對比色（外圈 indicator）

// ---- 色階：支出紫 / 收入青（hueSplit 時）----
const DFI_EXP_RAMP = ['#221250', '#2d176b', '#381d85', '#4323a0', '#6248b0'];
const DFI_EXP_OTHER = '#826cc0';            // primary[300]
const DFI_INC_RAMP = ['#00838F', '#0097A7', '#00ACC1', '#00BCD4', '#26C6DA'];
const DFI_INC_OTHER = '#4DD0E1';            // teal[300]
const DFI_EXP_HUE = '#4323a0';
const DFI_INC_HUE = '#00ACC1';

// 一側的 pie：vals 由大到小，最後一筆當 Other
function dfiPie(vals, ramp, other) {
  return vals.map((v, i) => ({ value: v, color: i < vals.length - 1 ? ramp[i] : other }));
}
function dfiSum(pie) { return pie.reduce((s, x) => s + x.value, 0); }

function dfiScenarioData(scenario, hueSplit) {
  const incRamp = hueSplit ? DFI_INC_RAMP : DFI_EXP_RAMP;
  const incOther = hueSplit ? DFI_INC_OTHER : DFI_EXP_OTHER;
  let expensePie = dfiPie([38, 20, 12], DFI_EXP_RAMP, DFI_EXP_OTHER);
  let incomePie = dfiPie([26, 16, 10], incRamp, incOther);
  if (scenario === 'expenseOnly') incomePie = [];
  if (scenario === 'incomeOnly') expensePie = [];
  return {
    expensePie, incomePie,
    expenseTotal: dfiSum(expensePie),
    incomeTotal: dfiSum(incomePie),
  };
}

function dfiMoney(units) {
  const v = Math.round(units * 100);
  return (v < 0 ? '-NT$' : 'NT$') + Math.abs(v).toLocaleString('en-US');
}

// ---- 角度 → slice：頂部=0、CW 為正。收入正角（右）、支出負角（左）----
// startGapFix=true 且單側時，保留 12 點開口、不收成滿圈。
function dfiBiSlices(expensePie, incomePie, startGapFix) {
  const eT = dfiSum(expensePie);
  const iT = dfiSum(incomePie);
  const total = eT + iT;
  if (total <= 0) return { slices: [], iMax: 0, eMin: 0, oneSided: false, empty: true };
  const eFrac = eT / total, iFrac = iT / total;
  const oneSided = eT === 0 || iT === 0;
  const reserve = startGapFix && oneSided ? DFI_START_GAP : 0;
  const span = DFI_TAU - reserve;
  const half = reserve / 2;

  const slices = [];
  // 收入：小額先放（靠 12 點），大額靠交會點
  let acc = half;
  for (let k = incomePie.length - 1; k >= 0; k--) {
    const sweep = (incomePie[k].value / total) * span;
    slices.push({ a0: acc, a1: acc + sweep, color: incomePie[k].color, side: 'income' });
    acc += sweep;
  }
  const iMax = acc;
  // 支出：大額靠交會點、小額靠 12 點
  const eMin = -(half + eFrac * span);
  let accE = eMin;
  for (let k = 0; k < expensePie.length; k++) {
    const sweep = (expensePie[k].value / total) * span;
    slices.push({ a0: accE, a1: accE + sweep, color: expensePie[k].color, side: 'expense' });
    accE += sweep;
  }
  return { slices, iMax, eMin, oneSided, empty: false };
}

function dfiPolar(r, a, cx, cy) { return [cx + r * Math.sin(a), cy - r * Math.cos(a)]; }
function dfiAnnular(a0, a1, ro, ri, cx, cy) {
  const large = a1 - a0 > Math.PI ? 1 : 0;
  const [x0, y0] = dfiPolar(ro, a0, cx, cy);
  const [x1, y1] = dfiPolar(ro, a1, cx, cy);
  const [x2, y2] = dfiPolar(ri, a1, cx, cy);
  const [x3, y3] = dfiPolar(ri, a0, cx, cy);
  return `M ${x0} ${y0} A ${ro} ${ro} 0 ${large} 1 ${x1} ${y1} L ${x2} ${y2} A ${ri} ${ri} 0 ${large} 0 ${x3} ${y3} Z`;
}
function dfiArc(a0, a1, r, cx, cy) {
  const large = a1 - a0 > Math.PI ? 1 : 0;
  const [x0, y0] = dfiPolar(r, a0, cx, cy);
  const [x1, y1] = dfiPolar(r, a1, cx, cy);
  return `M ${x0} ${y0} A ${r} ${r} 0 ${large} 1 ${x1} ${y1}`;
}

// ---- 雙向 donut 渲染 ----
function DFI_Donut({ expensePie, incomePie, focus, sweep, treatment, balance }) {
  const SIZE = 260, CX = 130, CY = 130, OUTER = 100, INNER = 76, RAIL_R = 110;
  const baseline = !!treatment.baseline;
  const startGapFix = !baseline;
  const { slices, iMax, eMin, oneSided, empty } = dfiBiSlices(expensePie, incomePie, startGapFix);
  const pad = baseline && oneSided ? 0 : DFI_PAD;            // 現況單側 = 閉合無間隙
  const half = startGapFix && oneSided ? DFI_START_GAP / 2 : 0;
  const incomeEnv = half + (iMax - half) * sweep;            // 收入弧生長到此
  const expenseStartEnv = -half + (eMin + half) * sweep;     // 支出弧生長到此

  const paths = slices.map((s, idx) => {
    let a0 = s.a0, a1 = s.a1;
    if (s.side === 'income') a1 = Math.min(a1, incomeEnv);
    else a0 = Math.max(a0, expenseStartEnv);
    if (a1 - a0 <= pad + 1e-4) return null;
    const ia0 = a0 + pad / 2, ia1 = a1 - pad / 2;
    if (ia1 <= ia0) return null;
    const lifted = treatment.thicken && focus === s.side;
    const ro = lifted ? OUTER + 2 : OUTER;
    const ri = lifted ? INNER - 2 : INNER;
    const opacity = treatment.dim && focus && s.side !== focus ? 0.3 : 1;
    return (
      <path key={idx} d={dfiAnnular(ia0, ia1, ro, ri, CX, CY)}
        fill={s.color} stroke={s.color} strokeWidth={3.4} strokeLinejoin="round" opacity={opacity} />
    );
  });

  let rail = null;
  if (treatment.rail && focus && !empty) {
    let r0, r1;
    if (focus === 'income') { r0 = half; r1 = incomeEnv; }
    else { r0 = expenseStartEnv; r1 = -half; }
    if (r1 - r0 > 0.02) {
      rail = (
        <path d={dfiArc(r0 + pad / 2, r1 - pad / 2, RAIL_R, CX, CY)}
          fill="none" stroke={DFI_ORANGE} strokeWidth={4} strokeLinecap="round" />
      );
    }
  }

  return (
    <div style={{ position: 'relative', width: SIZE, height: SIZE }}>
      <svg width={SIZE} height={SIZE} viewBox={`0 0 ${SIZE} ${SIZE}`} style={{ position: 'absolute', inset: 0 }}>
        {paths}
        {rail}
      </svg>
      <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ fontSize: 13, color: TOKENS.ink2, marginBottom: 2 }}>結餘</div>
        <div style={{ fontSize: 21, fontWeight: 500, color: TOKENS.ink, fontVariantNumeric: 'tabular-nums', letterSpacing: -0.4 }}>{dfiMoney(balance)}</div>
      </div>
    </div>
  );
}

// ---- 焦點卡（點擊切焦點）----
function DFI_FocusCards({ focus, setFocus, expenseTotal, incomeTotal, hueSplit, forced }) {
  const card = (side, label, total) => {
    const active = focus === side;
    const hue = side === 'expense' ? DFI_EXP_HUE : (hueSplit ? DFI_INC_HUE : DFI_EXP_HUE);
    const tint = side === 'expense' ? 'rgba(67,35,160,0.10)' : (hueSplit ? 'rgba(0,172,193,0.12)' : 'rgba(67,35,160,0.10)');
    return (
      <button onClick={() => !forced && setFocus(side)} style={{
        flex: 1, padding: '10px 14px', borderRadius: 14, textAlign: 'left',
        background: active ? tint : TOKENS.surface,
        border: active ? `1.5px solid ${hue}` : `1px solid ${TOKENS.border}`,
        cursor: forced ? 'default' : 'pointer', opacity: total > 0 ? 1 : 0.4,
        fontFamily: 'inherit',
      }}>
        <div style={{ fontSize: 12, color: TOKENS.ink2, marginBottom: 3 }}>{label}</div>
        <div style={{ fontSize: 16, fontWeight: 500, color: active ? hue : TOKENS.ink, fontVariantNumeric: 'tabular-nums' }}>{dfiMoney(total)}</div>
      </button>
    );
  };
  return (
    <div style={{ display: 'flex', gap: 10, width: 300 }}>
      {card('expense', '支出', expenseTotal)}
      {card('income', '收入', incomeTotal)}
    </div>
  );
}

// ---- 一個提案的互動 demo ----
function DFI_Demo({ treatment }) {
  const [scenario, setScenario] = React.useState('both');
  const [focusState, setFocus] = React.useState('expense');
  const [sweep, setSweep] = React.useState(1);
  const rafRef = React.useRef(0);

  const forced = scenario === 'expenseOnly' ? 'expense' : scenario === 'incomeOnly' ? 'income' : null;
  const focus = forced || focusState;

  const replay = () => {
    cancelAnimationFrame(rafRef.current);
    const start = performance.now(); const dur = 720;
    const tick = (now) => {
      const t = Math.min(1, (now - start) / dur);
      setSweep(1 - Math.pow(1 - t, 3));
      if (t < 1) rafRef.current = requestAnimationFrame(tick);
    };
    setSweep(0);
    rafRef.current = requestAnimationFrame(tick);
  };
  React.useEffect(() => () => cancelAnimationFrame(rafRef.current), []);

  const { expensePie, incomePie, expenseTotal, incomeTotal } = dfiScenarioData(scenario, !!treatment.hueSplit);
  const balance = incomeTotal - expenseTotal;

  const segBtn = (v, l) => (
    <button onClick={() => setScenario(v)} style={{
      padding: '6px 10px', borderRadius: 8, fontSize: 12, cursor: 'pointer', fontFamily: 'inherit',
      background: scenario === v ? TOKENS.ink : TOKENS.surface,
      color: scenario === v ? '#fff' : TOKENS.ink2,
      border: `1px solid ${scenario === v ? TOKENS.ink : TOKENS.border}`,
    }}>{l}</button>
  );

  return (
    <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start', paddingTop: 28, gap: 18 }}>
      <DFI_Donut expensePie={expensePie} incomePie={incomePie} focus={focus} sweep={sweep} treatment={treatment} balance={balance} />
      <DFI_FocusCards focus={focus} setFocus={setFocus} expenseTotal={expenseTotal} incomeTotal={incomeTotal} hueSplit={!!treatment.hueSplit} forced={forced} />
      <div style={{ width: 300, height: 1, background: TOKENS.border, margin: '2px 0' }} />
      <div style={{ display: 'flex', gap: 6 }}>
        {segBtn('both', '支出+收入')}
        {segBtn('expenseOnly', '只支出')}
        {segBtn('incomeOnly', '只收入')}
      </div>
      <button onClick={replay} style={{
        padding: '7px 14px', borderRadius: 8, fontSize: 12, cursor: 'pointer', fontFamily: 'inherit',
        background: TOKENS.surface, color: TOKENS.ink2, border: `1px solid ${TOKENS.border}`,
      }}>▶ 重播生長動畫</button>
      <div style={{ fontSize: 11, color: TOKENS.ink2, width: 300, textAlign: 'center', lineHeight: 1.5 }}>
        點焦點卡切聚焦側；切情境看單側 12 點開口差異
      </div>
    </div>
  );
}

// ---- artboard 外殼（自帶 bg + 字體）----
function DFI_Frame({ children, style = {} }) {
  return (
    <div style={{
      width: '100%', height: '100%', position: 'relative', overflow: 'hidden',
      background: TOKENS.bg, color: TOKENS.ink,
      fontFamily: '-apple-system, "SF Pro Text", "PingFang TC", "Noto Sans TC", system-ui, sans-serif',
      ...style,
    }}>{children}</div>
  );
}

// ─── Section ─────────────────────────────────────────────────
function DonutFocusIndicatorSection() {
  const W = 402, H = 660;
  const AB = (id, label, treatment) => (
    <DCArtboard id={id} label={label} width={W} height={H}>
      <DFI_Frame><DFI_Demo treatment={treatment} /></DFI_Frame>
    </DCArtboard>
  );
  return (
    <DCSection id="donut-focus-indicator"
      title="Home Donut · Focus Indicator + 雙側辨識"
      subtitle="兩問題一起提案：(1) 單側資料時 12 點要有開口、不收成閉圈；(2) 切焦點時 donut 要指出聚焦側、且支出收入不要同色。每個 artboard 可互動：點焦點卡切側、切情境看開口、重播看 indicator 跟著生長。決議 OPEN（2026-06-19），選定後落 spec / impl。">
      {AB('dfi-baseline', '現況 baseline · 同色 / 無指示 / 單側閉合', { baseline: true })}
      {AB('dfi-p1-rail', 'P1 · 外圈對比色弧（你的構想）', { rail: true })}
      {AB('dfi-p2-hue', 'P2 · 雙色區分 + 失焦淡化', { hueSplit: true, dim: true })}
      {AB('dfi-p3-combo', 'P3 [推薦] · 雙色 + 外圈弧', { hueSplit: true, rail: true })}
      {AB('dfi-p4-thick', 'P4 [採用] · 聚焦側加粗（outer+2 / inner−2，同色）', { thicken: true })}
    </DCSection>
  );
}

Object.assign(window, { DonutFocusIndicatorSection });
