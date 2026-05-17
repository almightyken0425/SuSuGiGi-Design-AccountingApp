// ─────────────────────────────────────────────────────────────
// Exploration · Axis 2 — Surface & Material (Liquid Glass family)
//
// 配色維持 Classic Purple，動的是玻璃感的不同切法。
//
//   V1  Liquid Glass · Subtle      baseline
//   V2' Liquid Glass · Mood Tint   背景隨 chartMode 變色
//   V3' Liquid Glass · Depth Layers 三層 blur 景深
//   V4' Aurora Glass               卡內 aurora 漸層
// ─────────────────────────────────────────────────────────────

const SM_ACCENT  = '#4323a0';
const SM_INK     = '#1B1340';
const SM_INK2    = '#5C4F8C';
const SM_INK3    = '#9D93C7';
const SM_HAIR    = 'rgba(60,40,140,0.10)';

const SM_BACKDROP_DEFAULT = 'linear-gradient(155deg, #DCD3FF 0%, #F4E9FF 38%, #E1F3FF 78%, #FFE8F0 100%)';
const SM_BACKDROP_EXPENSE = 'linear-gradient(155deg, #FFD3D9 0%, #FFE0C9 40%, #FFEDD9 70%, #F0D6FF 100%)';
const SM_BACKDROP_INCOME  = 'linear-gradient(155deg, #C7F5E5 0%, #D5EEFF 40%, #DDE5FF 70%, #F0E0FF 100%)';

// Glass utility — variants 共用
function SM_glassStyle({ blur = 28, opacity = 0.55, border = 'rgba(255,255,255,0.85)', radius = 18, shadow = '0 8px 24px rgba(30,18,80,0.10)' }) {
  return {
    background: `rgba(255,255,255,${opacity})`,
    backdropFilter: `blur(${blur}px)`,
    WebkitBackdropFilter: `blur(${blur}px)`,
    border: `1px solid ${border}`,
    boxShadow: shadow,
    borderRadius: radius,
  };
}

// Aurora overlay — 用在卡片內部，半透明多色漸層
function SM_AuroraOverlay({ opacity = 0.35 }) {
  return (
    <div style={{
      position: 'absolute', inset: 0, pointerEvents: 'none',
      background: 'linear-gradient(125deg, rgba(255,138,200,0.25) 0%, rgba(140,176,255,0.20) 30%, rgba(170,255,210,0.22) 60%, rgba(255,210,140,0.20) 100%)',
      mixBlendMode: 'soft-light',
      opacity,
      borderRadius: 'inherit',
    }}/>
  );
}

// ─── Common Sub-components ───────────────────────────────────
function SM_Header() {
  return (
    <div style={{
      paddingTop: 56, paddingBottom: 8, paddingLeft: 16, paddingRight: 16,
      display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: SM_INK,
    }}>
      <button style={{ width: 36, height: 36, border: 'none', background: 'transparent', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Glyph name="filter" size={20} color={SM_INK}/>
      </button>
      <div style={{ fontSize: 17, fontWeight: 600, letterSpacing: -0.2 }}>SuSuGiGi</div>
      <div style={{ display: 'flex', gap: 4 }}>
        <button style={{ width: 36, height: 36, border: 'none', background: 'transparent', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Glyph name="search" size={20} color={SM_INK}/>
        </button>
        <button style={{ width: 36, height: 36, border: 'none', background: 'transparent', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Glyph name="gear" size={20} color={SM_INK}/>
        </button>
      </div>
    </div>
  );
}

function SM_PeriodSwitcher() {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', paddingTop: 8, paddingBottom: 8 }}>
      <div style={{
        ...SM_glassStyle({ blur: 24, opacity: 0.55, radius: 999, shadow: '0 4px 12px rgba(30,18,80,0.06)' }),
        display: 'flex', alignItems: 'center', gap: 12,
        paddingTop: 8, paddingBottom: 8, paddingLeft: 14, paddingRight: 14,
      }}>
        <Glyph name="chevron-left" size={14} color={SM_INK3} stroke={2.5}/>
        <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          <Glyph name="calendar" size={13} color={SM_INK2} stroke={2}/>
          <span style={{ fontSize: 16, fontWeight: 500, color: SM_INK, letterSpacing: -0.2 }}>2026年5月</span>
        </div>
        <Glyph name="chevron-right" size={14} color={SM_INK3} stroke={2.5}/>
      </div>
    </div>
  );
}

const SM_DONUT_DATA = [
  { key: 'a', value: 38, color: '#4323a0' },
  { key: 'b', value: 22, color: '#6248b0' },
  { key: 'c', value: 18, color: '#826cc0' },
  { key: 'd', value: 12, color: '#a191d0' },
  { key: 'e', value: 10, color: '#c0b6df' },
];

function SM_BalanceCenter() {
  return (
    <div style={{ textAlign: 'center', width: 100 }}>
      <div style={{ fontSize: 13, color: SM_INK2, marginBottom: 4 }}>餘額</div>
      <div style={{ fontSize: 21, fontWeight: 500, color: SM_INK, fontVariantNumeric: 'tabular-nums', letterSpacing: -0.4 }}>NT$184,295</div>
    </div>
  );
}

function SM_FocusRow({ chartMode, onMode, cardStyle, activeStyle, withAurora }) {
  const cards = [
    { kind: 'expense', amount: 'NT$ 5,985',  icon: 'minus' },
    { kind: 'income',  amount: 'NT$ 68,000', icon: 'plus'  },
  ];
  return (
    <div style={{ display: 'flex', gap: 12, paddingLeft: 16, paddingRight: 16, paddingBottom: 12 }}>
      {cards.map(c => {
        const active = c.kind === chartMode;
        return (
          <button key={c.kind} onClick={() => onMode(c.kind)} style={{
            flex: 1, display: 'flex', alignItems: 'center', gap: 8,
            paddingTop: 12, paddingBottom: 12, paddingLeft: 12, paddingRight: 12,
            cursor: active ? 'default' : 'pointer', fontFamily: 'inherit',
            position: 'relative', overflow: 'hidden',
            ...cardStyle, ...(active ? activeStyle : {}),
          }}>
            {withAurora && active && <SM_AuroraOverlay opacity={0.5}/>}
            <div style={{
              width: 28, height: 28, borderRadius: 8,
              background: active ? SM_ACCENT + '22' : 'transparent',
              display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative',
            }}>
              <Glyph name={c.icon} size={14} color={active ? SM_ACCENT : SM_INK2}/>
            </div>
            <span style={{
              flex: 1, textAlign: 'right', position: 'relative',
              fontSize: 16, fontWeight: 500,
              color: active ? SM_INK : SM_INK2,
              fontVariantNumeric: 'tabular-nums',
            }}>{c.amount}</span>
          </button>
        );
      })}
    </div>
  );
}

function SM_SectionCard({ cardStyle, title, total, iconId, expanded, items, withAurora }) {
  return (
    <div style={{
      marginLeft: 16, marginRight: 16, marginBottom: 12,
      overflow: 'hidden', position: 'relative',
      ...cardStyle,
    }}>
      {withAurora && <SM_AuroraOverlay opacity={0.25}/>}
      <div style={{
        paddingLeft: 12, paddingRight: 16,
        paddingTop: expanded ? 14 : 10, paddingBottom: expanded ? 14 : 10,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        position: 'relative',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, flex: 1, minWidth: 0 }}>
          <div style={{ width: 14, display: 'flex', alignItems: 'center', justifyContent: 'center', transform: `rotate(${expanded ? 90 : 0}deg)` }}>
            <Glyph name="chevron-right" size={12} color={SM_INK2} stroke={2.5}/>
          </div>
          <div style={{
            width: 32, height: 32, borderRadius: 8,
            background: SM_ACCENT + '14',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <DynamicIconById iconId={iconId} size={18} color={SM_ACCENT}/>
          </div>
          <span style={{
            fontSize: expanded ? 16 : 15, fontWeight: 500, color: SM_INK,
            whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
          }}>{title}</span>
        </div>
        <span style={{
          fontSize: expanded ? 16 : 15, fontWeight: 500, color: SM_INK,
          fontVariantNumeric: 'tabular-nums',
        }}>{total}</span>
      </div>
      {expanded && items.map((tx, i) => (
        <div key={i} style={{ borderTop: `0.5px solid ${SM_HAIR}`, position: 'relative' }}>
          <div style={{
            display: 'flex', alignItems: 'center', gap: 12,
            paddingLeft: 16, paddingRight: 16, paddingTop: 12, paddingBottom: 12,
          }}>
            <div style={{ width: 40, textAlign: 'center' }}>
              <span style={{ fontSize: 12, fontWeight: 500, color: SM_INK2, fontVariantNumeric: 'tabular-nums' }}>{tx.date}</span>
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 15, color: SM_INK, marginBottom: 2,
                whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{tx.note}</div>
              <div style={{ fontSize: 12, color: SM_INK2,
                whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{tx.acc}</div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
              <span style={{ fontSize: 16, fontWeight: 500, color: SM_INK, fontVariantNumeric: 'tabular-nums' }}>{tx.amount}</span>
              {tx.converted && <span style={{ fontSize: 12, color: SM_INK2, fontVariantNumeric: 'tabular-nums' }}>≈ {tx.converted}</span>}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function SM_FAB({ blur = 28, opacity = 0.55, withAurora }) {
  return (
    <div style={{
      position: 'absolute', bottom: 24, left: 0, right: 0,
      display: 'flex', justifyContent: 'center', zIndex: 10, pointerEvents: 'none',
    }}>
      <div style={{
        width: 208, height: 72, borderRadius: 36,
        ...SM_glassStyle({ blur, opacity, radius: 36, shadow: '0 12px 28px rgba(30,18,80,0.14)' }),
        pointerEvents: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'space-around',
        paddingLeft: 8, paddingRight: 8, position: 'relative', overflow: 'hidden',
      }}>
        {withAurora && <SM_AuroraOverlay opacity={0.5}/>}
        {['minus', 'exchange', 'plus'].map((g, i) => (
          <button key={i} style={{
            width: 56, height: 56, border: 'none', background: 'transparent', cursor: 'pointer',
            borderRadius: 28, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative',
          }}>
            <Glyph name={g} size={24} color={SM_ACCENT} stroke={g === 'exchange' ? 2.4 : 2}/>
          </button>
        ))}
      </div>
    </div>
  );
}

// ─── Variant 1: Subtle baseline ──────────────────────────────
function Home_SM_Subtle() {
  const [chartMode, setChartMode] = React.useState('expense');
  const items_food = [
    { date: '5/2', note: '路易莎咖啡', acc: '國泰世華 信用卡', amount: '-NT$185' },
    { date: '5/2', note: '便當',       acc: '現金',           amount: '-NT$120' },
    { date: '5/1', note: '居酒屋',     acc: '國泰世華 信用卡', amount: '-NT$780' },
  ];
  const items_shop = [
    { date: '5/1', note: 'Uniqlo T-shirt × 2', acc: 'USD 旅費', amount: '-US$40', converted: 'NT$1,290' },
  ];
  const card = SM_glassStyle({ blur: 28, opacity: 0.55, radius: 18 });
  const focusInactive = SM_glassStyle({ blur: 24, opacity: 0.35, radius: 12, shadow: 'none', border: 'rgba(255,255,255,0.6)' });
  const focusActive   = { ...SM_glassStyle({ blur: 28, opacity: 0.85, radius: 12 }), border: `1.5px solid ${SM_ACCENT}` };
  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', background: SM_BACKDROP_DEFAULT,
      fontFamily: '-apple-system, "SF Pro", "PingFang TC", "Noto Sans TC", system-ui, sans-serif' }}>
      <div style={{ position: 'absolute', inset: 0, overflowY: 'auto', overflowX: 'hidden', paddingBottom: 140 }}>
        <SM_Header/>
        <SM_PeriodSwitcher/>
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: 8, marginBottom: 14 }}>
          <div style={{
            width: 280, height: 280, borderRadius: 140,
            ...SM_glassStyle({ blur: 20, opacity: 0.35, radius: 140 }),
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <DonutChart data={SM_DONUT_DATA} size={240} outerRadius={92} innerRadius={70}><SM_BalanceCenter/></DonutChart>
          </div>
        </div>
        <SM_FocusRow chartMode={chartMode} onMode={setChartMode} cardStyle={focusInactive} activeStyle={focusActive}/>
        <SM_SectionCard cardStyle={card} title="飲食" iconId={1} total="-NT$1,425" expanded items={items_food}/>
        <SM_SectionCard cardStyle={card} title="購物" iconId={3} total="-NT$1,290" expanded={false} items={items_shop}/>
        <SM_SectionCard cardStyle={card} title="交通" iconId={2} total="-NT$60"    expanded={false} items={[]}/>
      </div>
      <SM_FAB blur={28} opacity={0.55}/>
    </div>
  );
}

// ─── Variant 2: Mood Tint ────────────────────────────────────
function Home_SM_MoodTint() {
  const [chartMode, setChartMode] = React.useState('expense');
  const backdrop = chartMode === 'expense' ? SM_BACKDROP_EXPENSE : SM_BACKDROP_INCOME;
  const items_food = [
    { date: '5/2', note: '路易莎咖啡', acc: '國泰世華 信用卡', amount: '-NT$185' },
    { date: '5/2', note: '便當',       acc: '現金',           amount: '-NT$120' },
    { date: '5/1', note: '居酒屋',     acc: '國泰世華 信用卡', amount: '-NT$780' },
  ];
  const card = SM_glassStyle({ blur: 28, opacity: 0.55, radius: 18 });
  const focusInactive = SM_glassStyle({ blur: 24, opacity: 0.35, radius: 12, shadow: 'none', border: 'rgba(255,255,255,0.6)' });
  const focusActive   = { ...SM_glassStyle({ blur: 28, opacity: 0.85, radius: 12 }), border: `1.5px solid ${SM_ACCENT}` };
  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden',
      background: backdrop, transition: 'background 320ms ease',
      fontFamily: '-apple-system, "SF Pro", "PingFang TC", "Noto Sans TC", system-ui, sans-serif' }}>
      <div style={{ position: 'absolute', inset: 0, overflowY: 'auto', overflowX: 'hidden', paddingBottom: 140 }}>
        <SM_Header/>
        <SM_PeriodSwitcher/>
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: 8, marginBottom: 14 }}>
          <div style={{
            width: 280, height: 280, borderRadius: 140,
            ...SM_glassStyle({ blur: 20, opacity: 0.35, radius: 140 }),
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <DonutChart data={SM_DONUT_DATA} size={240} outerRadius={92} innerRadius={70}><SM_BalanceCenter/></DonutChart>
          </div>
        </div>
        <SM_FocusRow chartMode={chartMode} onMode={setChartMode} cardStyle={focusInactive} activeStyle={focusActive}/>
        <SM_SectionCard cardStyle={card} title="飲食" iconId={1} total="-NT$1,425" expanded items={items_food}/>
        <SM_SectionCard cardStyle={card} title="購物" iconId={3} total="-NT$1,290" expanded={false} items={[]}/>
        <SM_SectionCard cardStyle={card} title="交通" iconId={2} total="-NT$60"    expanded={false} items={[]}/>
      </div>
      <SM_FAB blur={28} opacity={0.55}/>
    </div>
  );
}

// ─── Variant 3: Depth Layers ─────────────────────────────────
function Home_SM_DepthLayers() {
  const [chartMode, setChartMode] = React.useState('expense');
  const items_food = [
    { date: '5/2', note: '路易莎咖啡', acc: '國泰世華 信用卡', amount: '-NT$185' },
    { date: '5/2', note: '便當',       acc: '現金',           amount: '-NT$120' },
    { date: '5/1', note: '居酒屋',     acc: '國泰世華 信用卡', amount: '-NT$780' },
  ];
  // 後層 — donut 大圓盤，最淡最厚 blur
  const donutLayer = SM_glassStyle({ blur: 40, opacity: 0.20, radius: 140, border: 'rgba(255,255,255,0.5)', shadow: '0 12px 32px rgba(30,18,80,0.06)' });
  // 中層 — section card
  const card = SM_glassStyle({ blur: 24, opacity: 0.50, radius: 18, border: 'rgba(255,255,255,0.7)', shadow: '0 8px 22px rgba(30,18,80,0.10)' });
  // 中層 — focus row
  const focusInactive = SM_glassStyle({ blur: 18, opacity: 0.40, radius: 12, shadow: 'none', border: 'rgba(255,255,255,0.65)' });
  const focusActive   = { ...SM_glassStyle({ blur: 24, opacity: 0.80, radius: 12 }), border: `1.5px solid ${SM_ACCENT}`, boxShadow: '0 6px 16px rgba(30,18,80,0.14)' };
  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', background: SM_BACKDROP_DEFAULT,
      fontFamily: '-apple-system, "SF Pro", "PingFang TC", "Noto Sans TC", system-ui, sans-serif' }}>
      {/* 背景漂浮色塊（更深的景深感） */}
      <div style={{ position: 'absolute', top: 80, left: -40, width: 220, height: 220, borderRadius: 200,
        background: 'radial-gradient(circle, rgba(180,130,255,0.55) 0%, transparent 70%)', filter: 'blur(20px)' }}/>
      <div style={{ position: 'absolute', top: 380, right: -60, width: 260, height: 260, borderRadius: 200,
        background: 'radial-gradient(circle, rgba(140,200,255,0.50) 0%, transparent 70%)', filter: 'blur(20px)' }}/>
      <div style={{ position: 'absolute', inset: 0, overflowY: 'auto', overflowX: 'hidden', paddingBottom: 140 }}>
        <SM_Header/>
        <SM_PeriodSwitcher/>
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: 8, marginBottom: 14 }}>
          <div style={{
            width: 280, height: 280, ...donutLayer,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <DonutChart data={SM_DONUT_DATA} size={240} outerRadius={92} innerRadius={70}><SM_BalanceCenter/></DonutChart>
          </div>
        </div>
        <SM_FocusRow chartMode={chartMode} onMode={setChartMode} cardStyle={focusInactive} activeStyle={focusActive}/>
        <SM_SectionCard cardStyle={card} title="飲食" iconId={1} total="-NT$1,425" expanded items={items_food}/>
        <SM_SectionCard cardStyle={card} title="購物" iconId={3} total="-NT$1,290" expanded={false} items={[]}/>
        <SM_SectionCard cardStyle={card} title="交通" iconId={2} total="-NT$60"    expanded={false} items={[]}/>
      </div>
      {/* 前層 — FAB 最強 blur + 強對比 + 較不透明 */}
      <SM_FAB blur={48} opacity={0.78}/>
    </div>
  );
}

// ─── Variant 4: Aurora Glass ─────────────────────────────────
function Home_SM_Aurora() {
  const [chartMode, setChartMode] = React.useState('expense');
  const items_food = [
    { date: '5/2', note: '路易莎咖啡', acc: '國泰世華 信用卡', amount: '-NT$185' },
    { date: '5/2', note: '便當',       acc: '現金',           amount: '-NT$120' },
    { date: '5/1', note: '居酒屋',     acc: '國泰世華 信用卡', amount: '-NT$780' },
  ];
  const card = SM_glassStyle({ blur: 28, opacity: 0.55, radius: 18 });
  const focusInactive = SM_glassStyle({ blur: 24, opacity: 0.40, radius: 12, shadow: 'none', border: 'rgba(255,255,255,0.65)' });
  const focusActive   = { ...SM_glassStyle({ blur: 28, opacity: 0.80, radius: 12 }), border: `1.5px solid ${SM_ACCENT}` };
  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden',
      background: 'linear-gradient(170deg, #E8E1FF 0%, #FFE6F2 35%, #DBF5FF 68%, #F0FFE6 100%)',
      fontFamily: '-apple-system, "SF Pro", "PingFang TC", "Noto Sans TC", system-ui, sans-serif' }}>
      {/* 背景 aurora 帶 — 漂浮色弧 */}
      <svg width="100%" height="100%" viewBox="0 0 402 874" preserveAspectRatio="none"
        style={{ position: 'absolute', inset: 0, pointerEvents: 'none', opacity: 0.7 }}>
        <defs>
          <linearGradient id="aurora1" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#FF92C2" stopOpacity="0"/>
            <stop offset="50%" stopColor="#FF92C2" stopOpacity="0.6"/>
            <stop offset="100%" stopColor="#FF92C2" stopOpacity="0"/>
          </linearGradient>
          <linearGradient id="aurora2" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#8FB4FF" stopOpacity="0"/>
            <stop offset="50%" stopColor="#8FB4FF" stopOpacity="0.6"/>
            <stop offset="100%" stopColor="#8FB4FF" stopOpacity="0"/>
          </linearGradient>
          <linearGradient id="aurora3" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#9DFFCB" stopOpacity="0"/>
            <stop offset="50%" stopColor="#9DFFCB" stopOpacity="0.55"/>
            <stop offset="100%" stopColor="#9DFFCB" stopOpacity="0"/>
          </linearGradient>
          <filter id="auroraBlur"><feGaussianBlur stdDeviation="30"/></filter>
        </defs>
        <path d="M-50 200 Q120 130 280 220 T500 230 L500 290 Q300 230 120 320 T-50 290 Z" fill="url(#aurora1)" filter="url(#auroraBlur)"/>
        <path d="M-50 380 Q150 310 320 400 T500 410 L500 470 Q280 410 100 500 T-50 470 Z" fill="url(#aurora2)" filter="url(#auroraBlur)"/>
        <path d="M-50 580 Q180 510 350 590 T500 610 L500 660 Q260 600 80 690 T-50 660 Z" fill="url(#aurora3)" filter="url(#auroraBlur)"/>
      </svg>
      <div style={{ position: 'absolute', inset: 0, overflowY: 'auto', overflowX: 'hidden', paddingBottom: 140 }}>
        <SM_Header/>
        <SM_PeriodSwitcher/>
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: 8, marginBottom: 14 }}>
          <div style={{
            width: 280, height: 280, borderRadius: 140,
            ...SM_glassStyle({ blur: 20, opacity: 0.35, radius: 140 }),
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            position: 'relative', overflow: 'hidden',
          }}>
            <SM_AuroraOverlay opacity={0.55}/>
            <DonutChart data={SM_DONUT_DATA} size={240} outerRadius={92} innerRadius={70}><SM_BalanceCenter/></DonutChart>
          </div>
        </div>
        <SM_FocusRow chartMode={chartMode} onMode={setChartMode} cardStyle={focusInactive} activeStyle={focusActive} withAurora/>
        <SM_SectionCard cardStyle={card} title="飲食" iconId={1} total="-NT$1,425" expanded items={items_food} withAurora/>
        <SM_SectionCard cardStyle={card} title="購物" iconId={3} total="-NT$1,290" expanded={false} items={[]} withAurora/>
        <SM_SectionCard cardStyle={card} title="交通" iconId={2} total="-NT$60"    expanded={false} items={[]} withAurora/>
      </div>
      <SM_FAB blur={32} opacity={0.55} withAurora/>
    </div>
  );
}

function SurfaceMaterialSection() {
  const W = 402, H = 874;
  return (
    <DCSection id="sm-section"
      title="Axis 2 · Surface & Material (Liquid Glass family)"
      subtitle="Liquid Glass 為 current direction，內部開出四個變體比較。狀態 Open question (variant) · 2026-05-15。">
      <DCArtboard id="sm-v1-subtle"  label="V1 · Liquid Glass · Subtle (baseline)"        width={W} height={H}>
        <IOSDevice width={W} height={H}><Home_SM_Subtle/></IOSDevice>
      </DCArtboard>
      <DCArtboard id="sm-v2-mood"    label="V2' · Liquid Glass · Mood Tint · 背景隨 chartMode 變色" width={W} height={H}>
        <IOSDevice width={W} height={H}><Home_SM_MoodTint/></IOSDevice>
      </DCArtboard>
      <DCArtboard id="sm-v3-depth"   label="V3' · Liquid Glass · Depth Layers · 三層景深" width={W} height={H}>
        <IOSDevice width={W} height={H}><Home_SM_DepthLayers/></IOSDevice>
      </DCArtboard>
      <DCArtboard id="sm-v4-aurora"  label="V4' · Aurora Glass · 卡內極光漸層"           width={W} height={H}>
        <IOSDevice width={W} height={H}><Home_SM_Aurora/></IOSDevice>
      </DCArtboard>
    </DCSection>
  );
}

Object.assign(window, { SurfaceMaterialSection });
