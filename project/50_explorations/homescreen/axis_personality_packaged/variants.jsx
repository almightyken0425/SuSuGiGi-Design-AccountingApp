// ─────────────────────────────────────────────────────────────
// Exploration · Axis 4 — Personality (packaged)
//
// 完整 packaged HomeScreen，套用兩色系規則 + Liquid Glass 質感。
//
//   V2  Private Bank     · 深綠 + 金 + glass
//   V4' Glass Stone      · 淺灰 stone + 松石綠 + light serif
//   V5' Night Studio     · 深炭 + 琥珀 + frosted dark glass + mono numerals
//   V6' Linen Calm       · 亞麻白 + 靜謐藍 + linen weave + 大留白
// ─────────────────────────────────────────────────────────────

// ═════════════════════════════════════════════════════════════
// V1 — Private Bank
// ═════════════════════════════════════════════════════════════
function PP_PrivateBank() {
  const [mode, setMode] = React.useState('expense');
  const bg = '#0C1A14', surface = 'rgba(20,40,30,0.65)', surfaceStrong = 'rgba(28,52,40,0.85)';
  const gold = '#C9A95C', goldSoft = 'rgba(201,169,92,0.18)';
  const ink = '#F2EDD8', ink2 = '#A89E80', ink3 = '#6E6650';
  const hairline = 'rgba(201,169,92,0.20)';
  const serif = '"Didot", "Bodoni 72", "Cochin", serif';

  const cats = [
    { id: 'food',  title: '飲食 Dining',    iconId: 13, total: '−$1,425', expanded: true },
    { id: 'shop',  title: '購物 Shopping',  iconId: 28, total: '−$1,290', expanded: false },
    { id: 'trans', title: '交通 Transport', iconId: 23, total: '−$60',    expanded: false },
  ];
  const items_food = [
    { date: '5/2', note: 'Louisa Coffee',          acc: 'Cathay Credit', amount: '−185' },
    { date: '5/2', note: 'Bento Box',              acc: 'Cash',          amount: '−120' },
    { date: '5/1', note: 'Izakaya · Group Dinner', acc: 'Cathay Credit', amount: '−780' },
  ];

  return (
    <div style={{
      position: 'absolute', inset: 0, overflow: 'hidden',
      background: `radial-gradient(circle at 50% -10%, #1B3527 0%, ${bg} 60%)`,
      color: ink, fontFamily: '-apple-system, "SF Pro", "Noto Sans TC", system-ui, sans-serif',
    }}>
      <div style={{ position: 'absolute', inset: 0, overflowY: 'auto', overflowX: 'hidden', paddingBottom: 140 }}>
        <div style={{
          paddingTop: 56, paddingBottom: 14, paddingLeft: 20, paddingRight: 20,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          borderBottom: `0.5px solid ${hairline}`,
        }}>
          <button style={{ width: 32, height: 32, border: 'none', background: 'transparent', cursor: 'pointer' }}>
            <Glyph name="filter" size={20} color={gold}/>
          </button>
          <div style={{ fontFamily: serif, fontSize: 17, fontWeight: 500, letterSpacing: 4, color: gold }}>SUSUGIGI</div>
          <div style={{ display: 'flex', gap: 6 }}>
            <button style={{ width: 32, height: 32, border: 'none', background: 'transparent', cursor: 'pointer' }}>
              <Glyph name="search" size={20} color={gold}/>
            </button>
            <button style={{ width: 32, height: 32, border: 'none', background: 'transparent', cursor: 'pointer' }}>
              <Glyph name="gear" size={20} color={gold}/>
            </button>
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 14, paddingTop: 14, paddingBottom: 4 }}>
          <Glyph name="chevron-left" size={14} color={ink3}/>
          <div style={{ fontFamily: serif, fontSize: 13, color: gold, letterSpacing: 3 }}>MAY · 2026</div>
          <Glyph name="chevron-right" size={14} color={ink3}/>
        </div>
        <div style={{ textAlign: 'center', paddingTop: 16, paddingBottom: 12 }}>
          <div style={{ fontFamily: serif, fontSize: 12, color: ink2, letterSpacing: 3, marginBottom: 6 }}>NET BALANCE</div>
          <div style={{ fontFamily: serif, fontSize: 48, fontWeight: 400, color: ink, fontVariantNumeric: 'tabular-nums', letterSpacing: -1.4 }}>NT$184,295</div>
          <div style={{ width: 56, height: 1, background: gold, margin: '8px auto 0', opacity: 0.6 }}/>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 18, marginTop: 6 }}>
          <div style={{
            width: 240, height: 240, borderRadius: 120,
            border: `1px solid ${gold}`, padding: 8,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: `0 0 32px ${goldSoft}, inset 0 0 12px ${goldSoft}`,
          }}>
            <DonutChart
              data={[
                { key: 'a', value: 38, color: gold },
                { key: 'b', value: 22, color: '#7E6A38' },
                { key: 'c', value: 18, color: '#594B27' },
                { key: 'd', value: 12, color: '#3F3722' },
                { key: 'e', value: 10, color: '#26241B' },
              ]} size={216} outerRadius={86} innerRadius={78} cornerRadius={2}>
              <div style={{ textAlign: 'center', width: 100 }}>
                <div style={{ fontFamily: serif, fontSize: 10, color: ink2, letterSpacing: 3, marginBottom: 2 }}>EXPENSES</div>
                <div style={{ fontFamily: serif, fontSize: 18, fontWeight: 500, color: ink, fontVariantNumeric: 'tabular-nums' }}>NT$5,985</div>
                <div style={{ fontFamily: serif, fontSize: 11, color: ink3, marginTop: 4, letterSpacing: 1 }}>11 transactions</div>
              </div>
            </DonutChart>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 10, paddingLeft: 20, paddingRight: 20, paddingBottom: 16 }}>
          {[
            { kind: 'expense', amount: 'NT$ 5,985',  label: 'EXPENSES' },
            { kind: 'income',  amount: 'NT$ 68,000', label: 'INCOME'   },
          ].map(c => {
            const active = c.kind === mode;
            return (
              <button key={c.kind} onClick={() => setMode(c.kind)} style={{
                flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 4,
                paddingTop: 12, paddingBottom: 12, paddingLeft: 16, paddingRight: 16,
                borderRadius: 2,
                border: `0.5px solid ${active ? gold : hairline}`,
                background: active ? goldSoft : 'transparent',
                cursor: active ? 'default' : 'pointer', fontFamily: 'inherit',
              }}>
                <span style={{ fontFamily: serif, fontSize: 10, letterSpacing: 2.5, color: active ? gold : ink2, fontWeight: 500 }}>{c.label}</span>
                <span style={{ fontFamily: serif, fontSize: 20, fontWeight: 500, color: active ? ink : ink2, fontVariantNumeric: 'tabular-nums', letterSpacing: -0.4 }}>{c.amount}</span>
              </button>
            );
          })}
        </div>
        {cats.map(c => (
          <div key={c.id} style={{
            marginLeft: 20, marginRight: 20, marginBottom: 12,
            background: surface,
            backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)',
            borderRadius: 2, border: `0.5px solid ${hairline}`, overflow: 'hidden',
          }}>
            <div style={{
              paddingLeft: 14, paddingRight: 16,
              paddingTop: c.expanded ? 14 : 10, paddingBottom: c.expanded ? 14 : 10,
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, flex: 1 }}>
                <div style={{ width: 14, transform: `rotate(${c.expanded ? 90 : 0}deg)` }}>
                  <Glyph name="chevron-right" size={12} color={ink2}/>
                </div>
                <div style={{
                  width: 28, height: 28, border: `0.5px solid ${gold}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <DynamicIconById iconId={c.iconId} size={14} color={gold}/>
                </div>
                <span style={{ fontFamily: serif, fontSize: c.expanded ? 16 : 14, fontWeight: 500, color: ink, letterSpacing: 0.3 }}>{c.title}</span>
              </div>
              <span style={{ fontFamily: serif, fontSize: c.expanded ? 17 : 15, fontWeight: 500, color: gold, fontVariantNumeric: 'tabular-nums' }}>{c.total}</span>
            </div>
            {c.expanded && items_food.map((tx, i) => (
              <div key={i} style={{
                display: 'flex', alignItems: 'center', gap: 12,
                paddingLeft: 16, paddingRight: 16, paddingTop: 12, paddingBottom: 12,
                borderTop: `0.5px solid ${hairline}`, background: surfaceStrong,
              }}>
                <div style={{ width: 44 }}>
                  <span style={{ fontFamily: serif, fontSize: 12, color: ink3, fontVariantNumeric: 'tabular-nums', letterSpacing: 1 }}>{tx.date}</span>
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 14, color: ink, marginBottom: 2,
                    whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{tx.note}</div>
                  <div style={{ fontFamily: serif, fontSize: 11, color: ink3, letterSpacing: 1.5,
                    whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{tx.acc.toUpperCase()}</div>
                </div>
                <span style={{ fontFamily: serif, fontSize: 17, fontWeight: 500, color: ink, fontVariantNumeric: 'tabular-nums', letterSpacing: -0.2 }}>{tx.amount}</span>
              </div>
            ))}
          </div>
        ))}
      </div>
      <div style={{ position: 'absolute', bottom: 24, left: 0, right: 0, display: 'flex', justifyContent: 'center', zIndex: 10, pointerEvents: 'none' }}>
        <div style={{
          width: 208, height: 60, borderRadius: 30,
          background: surfaceStrong,
          backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)',
          border: `0.5px solid ${gold}`,
          boxShadow: `0 0 32px ${goldSoft}, 0 12px 24px rgba(0,0,0,0.45)`,
          pointerEvents: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'space-around',
          paddingLeft: 8, paddingRight: 8,
        }}>
          {['minus', 'exchange', 'plus'].map((g, i) => (
            <button key={i} style={{
              width: 44, height: 44, border: 'none', background: 'transparent', cursor: 'pointer',
              borderRadius: 22, display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <Glyph name={g} size={20} color={gold} stroke={g === 'exchange' ? 2.2 : 1.8}/>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// ═════════════════════════════════════════════════════════════
// V2 — Night Studio
// ═════════════════════════════════════════════════════════════
function PP_NightStudio() {
  const [mode, setMode] = React.useState('expense');
  const ink = '#EEECE2', ink2 = '#9C9991', ink3 = '#646055';
  const amber = '#E0A23B', amberSoft = 'rgba(224,162,59,0.15)';
  const hairline = 'rgba(238,236,226,0.08)';
  const mono = '"JetBrains Mono", "SF Mono", "Menlo", monospace';

  const cats = [
    { id: 'food',  title: '飲食',  iconId: 13, total: '-1,425', expanded: true },
    { id: 'shop',  title: '購物',  iconId: 28, total: '-1,290', expanded: false },
    { id: 'trans', title: '交通',  iconId: 23, total: '-60',    expanded: false },
  ];
  const items_food = [
    { date: '05/02', note: '路易莎咖啡', acc: '國泰世華 信用卡', amount: '-185' },
    { date: '05/02', note: '便當',       acc: '現金',           amount: '-120' },
    { date: '05/01', note: '居酒屋',     acc: '國泰世華 信用卡', amount: '-780' },
  ];
  const card = {
    background: 'rgba(255,255,255,0.06)',
    backdropFilter: 'blur(28px)', WebkitBackdropFilter: 'blur(28px)',
    border: `0.5px solid ${hairline}`,
    borderRadius: 14, overflow: 'hidden',
  };
  return (
    <div style={{
      position: 'absolute', inset: 0, overflow: 'hidden',
      background: 'radial-gradient(circle at 30% 0%, #2A2D33 0%, #16181A 60%, #0C0E10 100%)',
      color: ink, fontFamily: '-apple-system, "SF Pro", "Noto Sans TC", system-ui, sans-serif',
    }}>
      <div style={{ position: 'absolute', inset: 0, overflowY: 'auto', overflowX: 'hidden', paddingBottom: 140 }}>
        <div style={{
          paddingTop: 56, paddingBottom: 8, paddingLeft: 20, paddingRight: 20,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>
          <button style={{ width: 36, height: 36, border: 'none', background: 'transparent', cursor: 'pointer' }}>
            <Glyph name="filter" size={20} color={ink2}/>
          </button>
          <div style={{ fontFamily: mono, fontSize: 13, fontWeight: 500, letterSpacing: 2, color: amber }}>SUSUGIGI · STUDIO</div>
          <div style={{ display: 'flex', gap: 4 }}>
            <button style={{ width: 36, height: 36, border: 'none', background: 'transparent', cursor: 'pointer' }}>
              <Glyph name="search" size={20} color={ink2}/>
            </button>
            <button style={{ width: 36, height: 36, border: 'none', background: 'transparent', cursor: 'pointer' }}>
              <Glyph name="gear" size={20} color={ink2}/>
            </button>
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', paddingTop: 6, paddingBottom: 6 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <Glyph name="chevron-left" size={14} color={ink3}/>
            <span style={{ fontFamily: mono, fontSize: 12, color: ink2, letterSpacing: 2 }}>2026 / 05</span>
            <Glyph name="chevron-right" size={14} color={ink3}/>
          </div>
        </div>
        {/* 大餘額 mono */}
        <div style={{ textAlign: 'center', paddingTop: 14, paddingBottom: 8 }}>
          <div style={{ fontFamily: mono, fontSize: 10, color: ink3, letterSpacing: 2.5, marginBottom: 6 }}>NET / TWD</div>
          <div style={{ fontFamily: mono, fontSize: 38, fontWeight: 500, color: ink, fontVariantNumeric: 'tabular-nums', letterSpacing: -1 }}>184,295</div>
          <div style={{ fontFamily: mono, fontSize: 11, color: amber, marginTop: 4, letterSpacing: 1 }}>↑ 62,015 vs Apr</div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: 4, marginBottom: 14 }}>
          <div style={{
            width: 260, height: 260, borderRadius: 130,
            background: 'rgba(255,255,255,0.04)',
            backdropFilter: 'blur(28px)', WebkitBackdropFilter: 'blur(28px)',
            border: `0.5px solid ${hairline}`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <DonutChart
              data={[
                { key: 'a', value: 38, color: amber },
                { key: 'b', value: 22, color: '#867A52' },
                { key: 'c', value: 18, color: '#5E5944' },
                { key: 'd', value: 12, color: '#3D3B30' },
                { key: 'e', value: 10, color: '#262521' },
              ]} size={220} outerRadius={88} innerRadius={74} cornerRadius={2}>
              <div style={{ textAlign: 'center', width: 100 }}>
                <div style={{ fontFamily: mono, fontSize: 10, color: ink3, letterSpacing: 2 }}>OUT</div>
                <div style={{ fontFamily: mono, fontSize: 19, fontWeight: 500, color: ink, fontVariantNumeric: 'tabular-nums' }}>5,985</div>
                <div style={{ fontFamily: mono, fontSize: 10, color: ink3, marginTop: 2 }}>11 tx</div>
              </div>
            </DonutChart>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 12, paddingLeft: 20, paddingRight: 20, paddingBottom: 16 }}>
          {[
            { kind: 'expense', amount: '5,985',  label: 'OUT' },
            { kind: 'income',  amount: '68,000', label: 'IN'  },
          ].map(c => {
            const active = c.kind === mode;
            return (
              <button key={c.kind} onClick={() => setMode(c.kind)} style={{
                flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 2,
                paddingTop: 12, paddingBottom: 12, paddingLeft: 14, paddingRight: 14,
                background: active ? amberSoft : 'rgba(255,255,255,0.04)',
                border: `0.5px solid ${active ? amber : hairline}`,
                borderRadius: 8, fontFamily: 'inherit',
                cursor: active ? 'default' : 'pointer',
              }}>
                <span style={{ fontFamily: mono, fontSize: 10, letterSpacing: 2.5, color: active ? amber : ink2 }}>{c.label}</span>
                <span style={{ fontFamily: mono, fontSize: 22, fontWeight: 500, color: active ? ink : ink2, fontVariantNumeric: 'tabular-nums', letterSpacing: -0.4 }}>{c.amount}</span>
              </button>
            );
          })}
        </div>
        {cats.map(c => (
          <div key={c.id} style={{ marginLeft: 20, marginRight: 20, marginBottom: 10, ...card }}>
            <div style={{
              paddingLeft: 14, paddingRight: 16,
              paddingTop: c.expanded ? 12 : 10, paddingBottom: c.expanded ? 12 : 10,
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, flex: 1 }}>
                <div style={{ width: 14, transform: `rotate(${c.expanded ? 90 : 0}deg)` }}>
                  <Glyph name="chevron-right" size={12} color={ink2}/>
                </div>
                <div style={{
                  width: 28, height: 28, borderRadius: 6,
                  background: amberSoft,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <DynamicIconById iconId={c.iconId} size={14} color={amber}/>
                </div>
                <span style={{ fontSize: c.expanded ? 15 : 14, fontWeight: 500, color: ink, letterSpacing: -0.1 }}>{c.title}</span>
              </div>
              <span style={{ fontFamily: mono, fontSize: c.expanded ? 16 : 14, fontWeight: 500, color: ink, fontVariantNumeric: 'tabular-nums' }}>{c.total}</span>
            </div>
            {c.expanded && items_food.map((tx, i) => (
              <div key={i} style={{
                display: 'flex', alignItems: 'center', gap: 12,
                paddingLeft: 16, paddingRight: 16, paddingTop: 11, paddingBottom: 11,
                borderTop: `0.5px solid ${hairline}`,
              }}>
                <div style={{ width: 46 }}>
                  <span style={{ fontFamily: mono, fontSize: 11, color: ink3, fontVariantNumeric: 'tabular-nums' }}>{tx.date}</span>
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 14, color: ink, marginBottom: 1,
                    whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{tx.note}</div>
                  <div style={{ fontFamily: mono, fontSize: 10, color: ink3, letterSpacing: 1,
                    whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{tx.acc}</div>
                </div>
                <span style={{ fontFamily: mono, fontSize: 15, color: ink, fontVariantNumeric: 'tabular-nums' }}>{tx.amount}</span>
              </div>
            ))}
          </div>
        ))}
      </div>
      <div style={{ position: 'absolute', bottom: 24, left: 0, right: 0, display: 'flex', justifyContent: 'center', zIndex: 10, pointerEvents: 'none' }}>
        <div style={{
          width: 208, height: 60, borderRadius: 30,
          background: 'rgba(20,22,24,0.65)',
          backdropFilter: 'blur(28px)', WebkitBackdropFilter: 'blur(28px)',
          border: `0.5px solid ${hairline}`,
          boxShadow: `0 0 28px ${amberSoft}, 0 12px 24px rgba(0,0,0,0.5)`,
          pointerEvents: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'space-around',
          paddingLeft: 8, paddingRight: 8,
        }}>
          {['minus', 'exchange', 'plus'].map((g, i) => (
            <button key={i} style={{
              width: 44, height: 44, border: 'none', background: 'transparent', cursor: 'pointer',
              borderRadius: 22, display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <Glyph name={g} size={20} color={amber} stroke={g === 'exchange' ? 2.2 : 2}/>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// ═════════════════════════════════════════════════════════════
// V3 — Mid-Century Modern
// ═════════════════════════════════════════════════════════════
function PP_MidCentury() {
  const [mode, setMode] = React.useState('expense');
  const bg = '#F0DBA1';                 // 米黃
  const surface = '#F8E9BC';
  const ink = '#1E2E22', ink2 = '#52614D', ink3 = '#9CA398';
  const forest = '#2C4A3E', forestSoft = 'rgba(44,74,62,0.14)';
  const hairline = 'rgba(30,46,34,0.12)';
  const geomSans = '"Avenir Next", "Futura", "Helvetica Neue", -apple-system, sans-serif';
  const serif = '"Cooper Hewitt", "Recoleta", "Georgia", serif';

  const cats = [
    { id: 'food',  title: '飲食 / Food',     iconId: 13, total: '−NT$1,425', expanded: true,  shape: 'circle' },
    { id: 'shop',  title: '購物 / Shopping', iconId: 28, total: '−NT$1,290', expanded: false, shape: 'square' },
    { id: 'trans', title: '交通 / Transit',  iconId: 23, total: '−NT$60',    expanded: false, shape: 'triangle' },
  ];
  const items_food = [
    { date: '5/2', note: '路易莎咖啡', acc: '國泰世華 信用卡', amount: '−NT$185' },
    { date: '5/2', note: '便當',       acc: '現金',           amount: '−NT$120' },
    { date: '5/1', note: '居酒屋',     acc: '國泰世華 信用卡', amount: '−NT$780' },
  ];

  const Shape = ({ kind, size = 30, color }) => {
    if (kind === 'circle') {
      return <svg width={size} height={size} viewBox="0 0 30 30"><circle cx="15" cy="15" r="13" fill={color}/></svg>;
    }
    if (kind === 'square') {
      return <svg width={size} height={size} viewBox="0 0 30 30"><rect x="2" y="2" width="26" height="26" fill={color}/></svg>;
    }
    if (kind === 'triangle') {
      return <svg width={size} height={size} viewBox="0 0 30 30"><polygon points="15,3 27,26 3,26" fill={color}/></svg>;
    }
    return null;
  };

  return (
    <div style={{
      position: 'absolute', inset: 0, overflow: 'hidden',
      background: bg, color: ink, fontFamily: geomSans,
    }}>
      {/* 大色塊裝飾（mid-century 印刷感） */}
      <div style={{ position: 'absolute', top: 110, right: -40, width: 180, height: 180, background: forest, borderRadius: '50%', opacity: 0.85, pointerEvents: 'none' }}/>
      <div style={{ position: 'absolute', top: 280, left: -30, width: 100, height: 100, background: ink, opacity: 0.9, pointerEvents: 'none' }}/>
      <div style={{ position: 'absolute', inset: 0, overflowY: 'auto', overflowX: 'hidden', paddingBottom: 140 }}>
        <div style={{
          paddingTop: 56, paddingBottom: 8, paddingLeft: 24, paddingRight: 24,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'relative',
        }}>
          <button style={{ width: 36, height: 36, border: 'none', background: 'transparent', cursor: 'pointer' }}>
            <Glyph name="filter" size={20} color={ink}/>
          </button>
          <div style={{ fontFamily: serif, fontSize: 22, fontWeight: 600, letterSpacing: -0.6, color: ink }}>SuSuGiGi</div>
          <div style={{ display: 'flex', gap: 4 }}>
            <button style={{ width: 36, height: 36, border: 'none', background: 'transparent', cursor: 'pointer' }}>
              <Glyph name="search" size={20} color={ink}/>
            </button>
            <button style={{ width: 36, height: 36, border: 'none', background: 'transparent', cursor: 'pointer' }}>
              <Glyph name="gear" size={20} color={ink}/>
            </button>
          </div>
        </div>
        <div style={{ paddingLeft: 24, paddingRight: 24, paddingTop: 10, paddingBottom: 6, position: 'relative' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <Glyph name="chevron-left" size={14} color={ink2}/>
            <span style={{ fontFamily: geomSans, fontSize: 12, letterSpacing: 4, color: forest, fontWeight: 600 }}>MAY · 2026</span>
            <Glyph name="chevron-right" size={14} color={ink2}/>
          </div>
        </div>
        {/* Hero 大餘額 — 大膽幾何 */}
        <div style={{ paddingLeft: 24, paddingRight: 24, paddingTop: 16, paddingBottom: 14, position: 'relative' }}>
          <div style={{ fontFamily: geomSans, fontSize: 10, color: forest, letterSpacing: 3, fontWeight: 700, marginBottom: 4 }}>BALANCE</div>
          <div style={{ fontFamily: serif, fontSize: 46, fontWeight: 700, color: ink, fontVariantNumeric: 'tabular-nums', letterSpacing: -1.5, lineHeight: 1 }}>NT$184,295</div>
        </div>
        {/* Donut 嵌在大色塊上 */}
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: 8, marginBottom: 18, position: 'relative' }}>
          <div style={{
            width: 240, height: 240, borderRadius: 120,
            background: surface, border: `2px solid ${ink}`,
            boxShadow: `4px 4px 0 ${forest}`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <DonutChart
              data={[
                { key: 'a', value: 38, color: forest },
                { key: 'b', value: 22, color: ink },
                { key: 'c', value: 18, color: '#7C4F37' },
                { key: 'd', value: 12, color: '#C9A87A' },
                { key: 'e', value: 10, color: '#9CA3D8' },
              ]} size={208} outerRadius={84} innerRadius={66} cornerRadius={2}>
              <div style={{ textAlign: 'center', width: 100 }}>
                <div style={{ fontFamily: geomSans, fontSize: 10, color: ink2, letterSpacing: 2, fontWeight: 600 }}>OUT</div>
                <div style={{ fontFamily: serif, fontSize: 22, fontWeight: 700, color: ink, fontVariantNumeric: 'tabular-nums' }}>5,985</div>
              </div>
            </DonutChart>
          </div>
        </div>
        {/* Focus — pill-tab */}
        <div style={{ display: 'flex', gap: 0, paddingLeft: 24, paddingRight: 24, paddingBottom: 18, position: 'relative' }}>
          {[
            { kind: 'expense', amount: 'NT$ 5,985',  label: 'OUT' },
            { kind: 'income',  amount: 'NT$ 68,000', label: 'IN'  },
          ].map((c, idx) => {
            const active = c.kind === mode;
            return (
              <button key={c.kind} onClick={() => setMode(c.kind)} style={{
                flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 2,
                paddingTop: 12, paddingBottom: 12, paddingLeft: 14, paddingRight: 14,
                background: active ? ink : 'transparent',
                color: active ? bg : ink2,
                border: `2px solid ${ink}`,
                borderLeft: idx > 0 ? 'none' : `2px solid ${ink}`,
                cursor: active ? 'default' : 'pointer', fontFamily: 'inherit',
              }}>
                <span style={{ fontFamily: geomSans, fontSize: 9, letterSpacing: 3, fontWeight: 700, color: active ? bg : forest }}>{c.label}</span>
                <span style={{ fontFamily: serif, fontSize: 20, fontWeight: 700, fontVariantNumeric: 'tabular-nums', letterSpacing: -0.4 }}>{c.amount}</span>
              </button>
            );
          })}
        </div>
        {/* Sections */}
        <div style={{ paddingLeft: 24, paddingRight: 24, position: 'relative' }}>
          {cats.map((c, idx) => (
            <div key={c.id} style={{
              background: surface, border: `2px solid ${ink}`,
              marginBottom: 12,
              boxShadow: c.expanded ? `4px 4px 0 ${forest}` : `3px 3px 0 ${forestSoft}`,
            }}>
              <div style={{
                paddingLeft: 12, paddingRight: 16,
                paddingTop: c.expanded ? 12 : 10, paddingBottom: c.expanded ? 12 : 10,
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, flex: 1 }}>
                  <div style={{ width: 14, transform: `rotate(${c.expanded ? 90 : 0}deg)` }}>
                    <Glyph name="chevron-right" size={12} color={ink}/>
                  </div>
                  {/* 幾何 shape 代替 icon 框 */}
                  <div style={{ position: 'relative', width: 30, height: 30, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <div style={{ position: 'absolute', inset: 0 }}><Shape kind={c.shape} size={30} color={forest}/></div>
                    <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <DynamicIconById iconId={c.iconId} size={14} color={bg}/>
                    </div>
                  </div>
                  <span style={{ fontFamily: serif, fontSize: c.expanded ? 16 : 14, fontWeight: 600, color: ink, letterSpacing: -0.2 }}>{c.title}</span>
                </div>
                <span style={{ fontFamily: serif, fontSize: c.expanded ? 16 : 14, fontWeight: 700, color: ink, fontVariantNumeric: 'tabular-nums' }}>{c.total}</span>
              </div>
              {c.expanded && items_food.map((tx, i) => (
                <div key={i} style={{
                  display: 'flex', alignItems: 'center', gap: 12,
                  paddingLeft: 16, paddingRight: 16, paddingTop: 10, paddingBottom: 10,
                  borderTop: `1px solid ${hairline}`,
                }}>
                  <div style={{ width: 36, textAlign: 'left' }}>
                    <span style={{ fontFamily: geomSans, fontSize: 11, fontWeight: 600, color: forest, fontVariantNumeric: 'tabular-nums', letterSpacing: 0.5 }}>{tx.date}</span>
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontFamily: serif, fontSize: 14, fontWeight: 500, color: ink,
                      whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{tx.note}</div>
                    <div style={{ fontFamily: geomSans, fontSize: 10, color: ink2, letterSpacing: 1,
                      whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{tx.acc}</div>
                  </div>
                  <span style={{ fontFamily: serif, fontSize: 15, fontWeight: 700, color: ink, fontVariantNumeric: 'tabular-nums', letterSpacing: -0.2 }}>{tx.amount}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
      {/* FAB — 大膽硬邊 */}
      <div style={{ position: 'absolute', bottom: 24, left: 0, right: 0, display: 'flex', justifyContent: 'center', zIndex: 10, pointerEvents: 'none' }}>
        <div style={{
          width: 220, height: 64,
          background: bg, border: `2px solid ${ink}`,
          boxShadow: `4px 4px 0 ${forest}`,
          pointerEvents: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'space-around',
          paddingLeft: 8, paddingRight: 8,
        }}>
          {[
            { g: 'minus', shape: 'square' },
            { g: 'exchange', shape: 'circle' },
            { g: 'plus', shape: 'triangle' },
          ].map((b, i) => (
            <button key={i} style={{
              width: 50, height: 50, border: 'none', background: 'transparent', cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative',
            }}>
              <Glyph name={b.g} size={22} color={ink} stroke={b.g === 'exchange' ? 2.4 : 2.2}/>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// ═════════════════════════════════════════════════════════════
// V4 — Risograph Print
// 借鑒 V3 Editorial 的 FAB「米黃底 + 細邊 + offset shadow」+ 印刷品 mis-registration
// ═════════════════════════════════════════════════════════════
function PP_Risograph() {
  const [mode, setMode] = React.useState('expense');
  const bg = '#F5EDD4';
  const ink = '#1A1612', ink2 = '#54483A', ink3 = '#9C8E7C';
  const hotPink = '#FF6B9D', hotPinkSoft = 'rgba(255,107,157,0.14)';
  const hairline = 'rgba(26,22,18,0.10)';
  const sans = '"Helvetica Neue", "Avenir Next", -apple-system, sans-serif';

  const cats = [
    { id: 'food',  title: '飲食', iconId: 13, total: '−NT$1,425', expanded: true  },
    { id: 'shop',  title: '購物', iconId: 28, total: '−NT$1,290', expanded: false },
    { id: 'trans', title: '交通', iconId: 23, total: '−NT$60',    expanded: false },
  ];
  const items_food = [
    { date: '5/2', note: '路易莎咖啡', acc: '國泰世華 信用卡', amount: '−NT$185' },
    { date: '5/2', note: '便當',       acc: '現金',           amount: '−NT$120' },
    { date: '5/1', note: '居酒屋',     acc: '國泰世華 信用卡', amount: '−NT$780' },
  ];
  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', background: bg, color: ink, fontFamily: sans }}>
      {/* 大粉色塊 mis-registration */}
      <div style={{ position: 'absolute', top: 110, right: -50, width: 200, height: 200,
        background: hotPink, borderRadius: '50%', mixBlendMode: 'multiply', opacity: 0.55,
        pointerEvents: 'none', filter: 'blur(2px)' }}/>
      <div style={{ position: 'absolute', top: 360, left: -40, width: 110, height: 110,
        background: hotPink, borderRadius: '50%', mixBlendMode: 'multiply', opacity: 0.3,
        pointerEvents: 'none' }}/>
      <div style={{ position: 'absolute', inset: 0, overflowY: 'auto', overflowX: 'hidden', paddingBottom: 140 }}>
        <div style={{
          paddingTop: 56, paddingBottom: 8, paddingLeft: 20, paddingRight: 20,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'relative',
        }}>
          <button style={{ width: 36, height: 36, border: 'none', background: 'transparent', cursor: 'pointer' }}>
            <Glyph name="filter" size={20} color={ink}/>
          </button>
          <div style={{ fontFamily: sans, fontSize: 18, fontWeight: 800, color: ink, letterSpacing: -0.4,
            textShadow: `1.5px 1.5px 0 ${hotPink}` }}>SUSUGIGI</div>
          <div style={{ display: 'flex', gap: 4 }}>
            <button style={{ width: 36, height: 36, border: 'none', background: 'transparent', cursor: 'pointer' }}>
              <Glyph name="search" size={20} color={ink}/>
            </button>
            <button style={{ width: 36, height: 36, border: 'none', background: 'transparent', cursor: 'pointer' }}>
              <Glyph name="gear" size={20} color={ink}/>
            </button>
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', paddingTop: 8, paddingBottom: 4 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <Glyph name="chevron-left" size={14} color={ink2}/>
            <span style={{ fontFamily: sans, fontSize: 13, fontWeight: 800, letterSpacing: 4, color: ink }}>MAY · 2026</span>
            <Glyph name="chevron-right" size={14} color={ink2}/>
          </div>
        </div>
        <div style={{ textAlign: 'center', paddingTop: 16, paddingBottom: 10, position: 'relative' }}>
          <div style={{ fontFamily: sans, fontSize: 10, color: ink2, letterSpacing: 3, fontWeight: 700, marginBottom: 6 }}>BALANCE</div>
          <div style={{
            fontFamily: sans, fontSize: 46, fontWeight: 900,
            color: ink, fontVariantNumeric: 'tabular-nums', letterSpacing: -1.8,
            textShadow: `2.5px 2.5px 0 ${hotPink}`,
          }}>NT$184,295</div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: 8, marginBottom: 18, position: 'relative' }}>
          <div style={{
            width: 240, height: 240, borderRadius: 120,
            background: bg, border: `2px solid ${ink}`,
            boxShadow: `4px 4px 0 ${hotPink}`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <DonutChart
              data={[
                { key: 'a', value: 38, color: hotPink },
                { key: 'b', value: 22, color: ink },
                { key: 'c', value: 18, color: '#54483A' },
                { key: 'd', value: 12, color: '#9C8E7C' },
                { key: 'e', value: 10, color: '#D4C5AC' },
              ]} size={208} outerRadius={84} innerRadius={66} cornerRadius={2}>
              <div style={{ textAlign: 'center', width: 100 }}>
                <div style={{ fontFamily: sans, fontSize: 10, color: ink2, letterSpacing: 3, fontWeight: 800 }}>OUT</div>
                <div style={{ fontFamily: sans, fontSize: 22, fontWeight: 900, color: ink, fontVariantNumeric: 'tabular-nums', letterSpacing: -0.5 }}>5,985</div>
              </div>
            </DonutChart>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 10, paddingLeft: 20, paddingRight: 20, paddingBottom: 16 }}>
          {[
            { kind: 'expense', amount: 'NT$ 5,985',  label: 'OUT' },
            { kind: 'income',  amount: 'NT$ 68,000', label: 'IN'  },
          ].map(c => {
            const active = c.kind === mode;
            return (
              <button key={c.kind} onClick={() => setMode(c.kind)} style={{
                flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 2,
                paddingTop: 12, paddingBottom: 12, paddingLeft: 14, paddingRight: 14,
                background: active ? hotPinkSoft : bg,
                border: `2px solid ${ink}`, borderRadius: 0,
                boxShadow: active ? `3px 3px 0 ${hotPink}` : 'none',
                cursor: active ? 'default' : 'pointer', fontFamily: 'inherit',
              }}>
                <span style={{ fontFamily: sans, fontSize: 9, letterSpacing: 3, fontWeight: 800, color: active ? hotPink : ink2 }}>{c.label}</span>
                <span style={{ fontFamily: sans, fontSize: 19, fontWeight: 900, color: ink, fontVariantNumeric: 'tabular-nums', letterSpacing: -0.4 }}>{c.amount}</span>
              </button>
            );
          })}
        </div>
        <div style={{ paddingLeft: 20, paddingRight: 20 }}>
          {cats.map(c => (
            <div key={c.id} style={{
              marginBottom: 12, background: bg, border: `2px solid ${ink}`,
              boxShadow: c.expanded ? `4px 4px 0 ${hotPink}` : `3px 3px 0 ${hairline}`,
            }}>
              <div style={{
                paddingLeft: 12, paddingRight: 16,
                paddingTop: c.expanded ? 14 : 10, paddingBottom: c.expanded ? 14 : 10,
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, flex: 1 }}>
                  <div style={{ width: 14, transform: `rotate(${c.expanded ? 90 : 0}deg)` }}>
                    <Glyph name="chevron-right" size={12} color={ink}/>
                  </div>
                  <div style={{
                    width: 32, height: 32, background: hotPink, border: `1.5px solid ${ink}`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <DynamicIconById iconId={c.iconId} size={16} color={ink}/>
                  </div>
                  <span style={{ fontFamily: sans, fontSize: c.expanded ? 16 : 15, fontWeight: 800, color: ink, letterSpacing: -0.2 }}>{c.title}</span>
                </div>
                <span style={{ fontFamily: sans, fontSize: c.expanded ? 16 : 15, fontWeight: 900, color: ink, fontVariantNumeric: 'tabular-nums' }}>{c.total}</span>
              </div>
              {c.expanded && items_food.map((tx, i) => (
                <div key={i} style={{
                  display: 'flex', alignItems: 'center', gap: 12,
                  paddingLeft: 16, paddingRight: 16, paddingTop: 10, paddingBottom: 10,
                  borderTop: `1px solid ${hairline}`,
                }}>
                  <span style={{ width: 36, fontFamily: sans, fontSize: 11, fontWeight: 800, color: hotPink, fontVariantNumeric: 'tabular-nums' }}>{tx.date}</span>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontFamily: sans, fontSize: 14, fontWeight: 500, color: ink,
                      whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{tx.note}</div>
                    <div style={{ fontFamily: sans, fontSize: 10, color: ink2, letterSpacing: 1,
                      whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{tx.acc}</div>
                  </div>
                  <span style={{ fontFamily: sans, fontSize: 15, fontWeight: 800, color: ink, fontVariantNumeric: 'tabular-nums' }}>{tx.amount}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
      <div style={{ position: 'absolute', bottom: 24, left: 0, right: 0, display: 'flex', justifyContent: 'center', zIndex: 10, pointerEvents: 'none' }}>
        <div style={{
          width: 220, height: 64,
          background: bg, border: `2px solid ${ink}`,
          boxShadow: `4px 4px 0 ${hotPink}`,
          pointerEvents: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'space-around',
          paddingLeft: 8, paddingRight: 8,
        }}>
          {['minus', 'exchange', 'plus'].map((g, i) => (
            <button key={i} style={{
              width: 50, height: 50, border: 'none', background: 'transparent', cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <Glyph name={g} size={22} color={ink} stroke={g === 'exchange' ? 2.4 : 2.2}/>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// ═════════════════════════════════════════════════════════════
// V5 — Industrial Blueprint
// 借鑒 V4 Mid-Century 的「大色塊背景 + 幾何裝飾」，但走工程藍圖路線
// ═════════════════════════════════════════════════════════════
const BLUEPRINT_GRID = "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24'><path d='M24 0H0V24' fill='none' stroke='%235BE8FF' stroke-width='0.4' stroke-opacity='0.16'/></svg>\")";

function PP_Blueprint() {
  const [mode, setMode] = React.useState('expense');
  const bg = '#0F2A47';
  const ink = '#E8F0FA', ink2 = '#7E96B5', ink3 = '#496180';
  const cyan = '#5BE8FF', cyanSoft = 'rgba(91,232,255,0.16)';
  const hairline = 'rgba(232,240,250,0.12)';
  const mono = '"JetBrains Mono", "SF Mono", "Menlo", monospace';
  const sans = '"Helvetica Neue", "Arial", sans-serif';

  const cats = [
    { id: 'food',  title: 'DINING',    chinese: '飲食', iconId: 13, total: '−1,425.00', expanded: true,  tag: 'A-01' },
    { id: 'shop',  title: 'RETAIL',    chinese: '購物', iconId: 28, total: '−1,290.00', expanded: false, tag: 'A-02' },
    { id: 'trans', title: 'TRANSPORT', chinese: '交通', iconId: 23, total: '−60.00',    expanded: false, tag: 'A-03' },
  ];
  const items_food = [
    { date: '05/02', note: '路易莎咖啡',  acc: 'CTBC', amount: '−185.00' },
    { date: '05/02', note: '便當',        acc: 'Cash', amount: '−120.00' },
    { date: '05/01', note: '居酒屋',      acc: 'CTBC', amount: '−780.00' },
  ];
  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden',
      background: bg, backgroundImage: BLUEPRINT_GRID, color: ink, fontFamily: sans }}>
      {/* 工程引線裝飾 */}
      <svg width="100%" height="100%" style={{ position: 'absolute', inset: 0, pointerEvents: 'none', opacity: 0.5 }}>
        <circle cx="370" cy="160" r="5" fill="none" stroke={cyan} strokeWidth="0.8"/>
        <path d="M370 165 L370 200" stroke={cyan} strokeWidth="0.8"/>
        <text x="376" y="205" fontFamily="monospace" fontSize="9" fill={cyan} letterSpacing="1">R.5</text>
      </svg>
      <div style={{ position: 'absolute', inset: 0, overflowY: 'auto', overflowX: 'hidden', paddingBottom: 140 }}>
        <div style={{
          paddingTop: 56, paddingBottom: 6, paddingLeft: 20, paddingRight: 20,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          borderBottom: `1px solid ${cyan}`,
        }}>
          <button style={{ width: 32, height: 32, border: 'none', background: 'transparent', cursor: 'pointer' }}>
            <Glyph name="filter" size={20} color={cyan} stroke={1.2}/>
          </button>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontFamily: mono, fontSize: 14, fontWeight: 500, letterSpacing: 4, color: cyan }}>SUSUGIGI</div>
            <div style={{ fontFamily: mono, fontSize: 8, color: ink2, letterSpacing: 2, marginTop: 1 }}>DWG · MAY-2026 · REV.A</div>
          </div>
          <div style={{ display: 'flex', gap: 4 }}>
            <button style={{ width: 32, height: 32, border: 'none', background: 'transparent', cursor: 'pointer' }}>
              <Glyph name="search" size={20} color={cyan} stroke={1.2}/>
            </button>
            <button style={{ width: 32, height: 32, border: 'none', background: 'transparent', cursor: 'pointer' }}>
              <Glyph name="gear" size={20} color={cyan} stroke={1.2}/>
            </button>
          </div>
        </div>
        <div style={{ paddingLeft: 20, paddingRight: 20, paddingTop: 12, paddingBottom: 8 }}>
          <div style={{ fontFamily: mono, fontSize: 10, color: ink2, letterSpacing: 2, marginBottom: 4 }}>{'<<'} TIMESPAN {'>>'}</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <Glyph name="chevron-left" size={14} color={ink2}/>
            <div style={{ flex: 1, height: 22, position: 'relative',
              borderTop: `1px solid ${cyan}`, borderBottom: `1px solid ${cyan}`,
              display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ fontFamily: mono, fontSize: 11, color: cyan, letterSpacing: 2, background: bg, padding: '0 8px' }}>MAY 2026</span>
            </div>
            <Glyph name="chevron-right" size={14} color={ink2}/>
          </div>
        </div>
        <div style={{ textAlign: 'center', paddingTop: 16, paddingBottom: 10, position: 'relative' }}>
          <div style={{ fontFamily: mono, fontSize: 10, color: cyan, letterSpacing: 3, marginBottom: 6 }}>// NET BAL</div>
          <div style={{ fontFamily: mono, fontSize: 38, fontWeight: 500, color: ink, fontVariantNumeric: 'tabular-nums', letterSpacing: -1, textShadow: `0 0 12px rgba(91,232,255,0.4)` }}>184,295</div>
          <div style={{ fontFamily: mono, fontSize: 9, color: ink2, letterSpacing: 1.5, marginTop: 4 }}>UNIT · NTD</div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: 6, marginBottom: 18 }}>
          <div style={{
            width: 240, height: 240, borderRadius: 120,
            border: `1px dashed ${cyan}`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: `inset 0 0 20px rgba(91,232,255,0.10)`,
          }}>
            <DonutChart
              data={[
                { key: 'a', value: 38, color: cyan },
                { key: 'b', value: 22, color: '#3F87B0' },
                { key: 'c', value: 18, color: '#2C5470' },
                { key: 'd', value: 12, color: '#1E3A52' },
                { key: 'e', value: 10, color: '#142839' },
              ]} size={208} outerRadius={84} innerRadius={68} cornerRadius={1}>
              <div style={{ textAlign: 'center', width: 100 }}>
                <div style={{ fontFamily: mono, fontSize: 9, color: cyan, letterSpacing: 2 }}>{'<'}DEBIT{'>'}</div>
                <div style={{ fontFamily: mono, fontSize: 18, fontWeight: 600, color: ink, fontVariantNumeric: 'tabular-nums' }}>5,985.00</div>
              </div>
            </DonutChart>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 8, paddingLeft: 20, paddingRight: 20, paddingBottom: 16 }}>
          {[
            { kind: 'expense', amount: '5,985.00',  label: 'DEBIT' },
            { kind: 'income',  amount: '68,000.00', label: 'CREDIT' },
          ].map(c => {
            const active = c.kind === mode;
            return (
              <button key={c.kind} onClick={() => setMode(c.kind)} style={{
                flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 2,
                paddingTop: 10, paddingBottom: 10, paddingLeft: 12, paddingRight: 12,
                background: active ? cyanSoft : 'transparent',
                border: active ? `1px solid ${cyan}` : `1px dashed ${ink3}`,
                borderRadius: 0, fontFamily: 'inherit',
                cursor: active ? 'default' : 'pointer',
              }}>
                <span style={{ fontFamily: mono, fontSize: 9, letterSpacing: 2.5, color: active ? cyan : ink2 }}>{c.label}</span>
                <span style={{ fontFamily: mono, fontSize: 18, fontWeight: 600, color: active ? ink : ink2, fontVariantNumeric: 'tabular-nums' }}>${c.amount}</span>
              </button>
            );
          })}
        </div>
        <div style={{ marginLeft: 20, marginRight: 20, border: `1px solid ${cyan}` }}>
          {cats.map((c, idx) => (
            <React.Fragment key={c.id}>
              <div style={{
                paddingLeft: 12, paddingRight: 12,
                paddingTop: c.expanded ? 12 : 9, paddingBottom: c.expanded ? 12 : 9,
                display: 'flex', alignItems: 'center', gap: 10,
                borderTop: idx === 0 ? 'none' : `1px dashed ${hairline}`,
                background: c.expanded ? cyanSoft : 'transparent',
              }}>
                <div style={{ width: 12, transform: `rotate(${c.expanded ? 90 : 0}deg)` }}>
                  <Glyph name="chevron-right" size={10} color={cyan}/>
                </div>
                <div style={{
                  width: 28, height: 28, border: `1px dashed ${cyan}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <DynamicIconById iconId={c.iconId} size={14} color={cyan}/>
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontFamily: mono, fontSize: c.expanded ? 13 : 12, fontWeight: 600, color: ink, letterSpacing: 1 }}>{c.title}</div>
                  <div style={{ fontFamily: sans, fontSize: 10, color: ink2 }}>{c.chinese} · {c.tag}</div>
                </div>
                <span style={{ fontFamily: mono, fontSize: c.expanded ? 14 : 13, fontWeight: 600, color: ink, fontVariantNumeric: 'tabular-nums' }}>{c.total}</span>
              </div>
              {c.expanded && items_food.map((tx, i) => (
                <div key={i} style={{
                  display: 'flex', alignItems: 'center', gap: 10,
                  paddingLeft: 38, paddingRight: 12, paddingTop: 8, paddingBottom: 8,
                  borderTop: `1px dashed ${hairline}`,
                }}>
                  <span style={{ fontFamily: mono, fontSize: 10, color: cyan, width: 44 }}>{tx.date}</span>
                  <span style={{ flex: 1, fontFamily: sans, fontSize: 13, color: ink, minWidth: 0,
                    whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{tx.note}</span>
                  <span style={{ fontFamily: mono, fontSize: 9, color: ink3, width: 36 }}>{tx.acc}</span>
                  <span style={{ fontFamily: mono, fontSize: 13, fontWeight: 600, color: ink, fontVariantNumeric: 'tabular-nums' }}>${tx.amount}</span>
                </div>
              ))}
            </React.Fragment>
          ))}
        </div>
      </div>
      <div style={{ position: 'absolute', bottom: 24, left: 0, right: 0, display: 'flex', justifyContent: 'center', zIndex: 10, pointerEvents: 'none' }}>
        <div style={{
          width: 224, height: 60, borderRadius: 0,
          background: 'rgba(15,42,71,0.85)', border: `1px solid ${cyan}`,
          boxShadow: `0 0 24px rgba(91,232,255,0.30), 0 12px 24px rgba(0,0,0,0.4)`,
          pointerEvents: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'space-around',
          paddingLeft: 8, paddingRight: 8,
        }}>
          {[
            { g: 'minus', l: 'DR' },
            { g: 'exchange', l: 'TX' },
            { g: 'plus', l: 'CR' },
          ].map((b, i) => (
            <button key={i} style={{
              width: 60, height: 50, border: 'none', background: 'transparent', cursor: 'pointer',
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 1,
              borderRight: i < 2 ? `1px dashed ${hairline}` : 'none',
            }}>
              <Glyph name={b.g} size={18} color={cyan} stroke={1.4}/>
              <span style={{ fontFamily: mono, fontSize: 8, color: cyan, letterSpacing: 1.5 }}>{b.l}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// ═════════════════════════════════════════════════════════════
// V6 — Brutalist Concrete
// 借鑒 V4 Mid-Century 的「大色塊 + offset shadow」推到極致 — 粗黑 + 螢光萊姆
// ═════════════════════════════════════════════════════════════
function PP_Brutalist() {
  const [mode, setMode] = React.useState('expense');
  const bg = '#A8A39B', surface = '#C5C0B6';
  const ink = '#0A0A0A', ink2 = '#3A3A38', ink3 = '#6E6E6A';
  const lime = '#D8F229';
  const sans = '"Helvetica Neue", "Arial Black", sans-serif';

  const cats = [
    { id: 'food',  title: 'FOOD',    iconId: 13, total: '−NT$1,425', expanded: true  },
    { id: 'shop',  title: 'SHOP',    iconId: 28, total: '−NT$1,290', expanded: false },
    { id: 'trans', title: 'TRANSIT', iconId: 23, total: '−NT$60',    expanded: false },
  ];
  const items_food = [
    { date: '5/2', note: '路易莎咖啡', acc: '國泰世華 信用卡', amount: '−NT$185' },
    { date: '5/2', note: '便當',       acc: '現金',           amount: '−NT$120' },
    { date: '5/1', note: '居酒屋',     acc: '國泰世華 信用卡', amount: '−NT$780' },
  ];
  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', background: bg, color: ink, fontFamily: sans }}>
      <div style={{ position: 'absolute', inset: 0, overflowY: 'auto', overflowX: 'hidden', paddingBottom: 140 }}>
        {/* 全寬黑塊 header */}
        <div style={{
          paddingTop: 56, paddingBottom: 10, paddingLeft: 16, paddingRight: 16,
          background: ink, color: bg,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          borderBottom: `4px solid ${lime}`,
        }}>
          <button style={{ width: 36, height: 36, border: 'none', background: 'transparent', cursor: 'pointer' }}>
            <Glyph name="filter" size={22} color={bg} stroke={2.5}/>
          </button>
          <div style={{ fontFamily: sans, fontSize: 22, fontWeight: 900, color: bg, letterSpacing: -1 }}>SuSuGiGi</div>
          <div style={{ display: 'flex', gap: 4 }}>
            <button style={{ width: 36, height: 36, border: 'none', background: 'transparent', cursor: 'pointer' }}>
              <Glyph name="search" size={22} color={bg} stroke={2.5}/>
            </button>
            <button style={{ width: 36, height: 36, border: 'none', background: 'transparent', cursor: 'pointer' }}>
              <Glyph name="gear" size={22} color={bg} stroke={2.5}/>
            </button>
          </div>
        </div>
        <div style={{ paddingLeft: 16, paddingRight: 16, paddingTop: 12, paddingBottom: 4 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <Glyph name="chevron-left" size={16} color={ink} stroke={3}/>
            <span style={{ fontFamily: sans, fontSize: 13, fontWeight: 900, letterSpacing: 4, color: ink }}>MAY 2026</span>
            <Glyph name="chevron-right" size={16} color={ink} stroke={3}/>
          </div>
        </div>
        <div style={{ paddingLeft: 16, paddingRight: 16, paddingTop: 14, paddingBottom: 10 }}>
          <div style={{
            display: 'inline-block', background: ink, color: lime,
            paddingLeft: 8, paddingRight: 8, paddingTop: 2, paddingBottom: 2,
            fontSize: 11, fontWeight: 900, letterSpacing: 3, marginBottom: 8,
          }}>BALANCE</div>
          <div style={{
            fontFamily: sans, fontSize: 54, fontWeight: 900,
            color: ink, fontVariantNumeric: 'tabular-nums', letterSpacing: -2.5, lineHeight: 0.92,
          }}>NT$<br/>184,295</div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: 10, marginBottom: 16 }}>
          <div style={{
            width: 240, height: 240, borderRadius: 120,
            background: surface, border: `4px solid ${ink}`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <DonutChart
              data={[
                { key: 'a', value: 38, color: ink },
                { key: 'b', value: 22, color: '#3A3A38' },
                { key: 'c', value: 18, color: '#6E6E6A' },
                { key: 'd', value: 12, color: '#A8A39B' },
                { key: 'e', value: 10, color: lime },
              ]} size={196} outerRadius={84} innerRadius={50} cornerRadius={0} padAngleDeg={2}>
              <div style={{ textAlign: 'center', width: 100 }}>
                <div style={{ fontFamily: sans, fontSize: 9, color: ink2, letterSpacing: 3, fontWeight: 900 }}>SPENT</div>
                <div style={{ fontFamily: sans, fontSize: 22, fontWeight: 900, color: ink, fontVariantNumeric: 'tabular-nums', letterSpacing: -0.8 }}>5,985</div>
              </div>
            </DonutChart>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 0, paddingLeft: 16, paddingRight: 16, paddingBottom: 16 }}>
          {[
            { kind: 'expense', amount: '5,985',  label: 'OUT' },
            { kind: 'income',  amount: '68,000', label: 'IN'  },
          ].map((c, idx) => {
            const active = c.kind === mode;
            return (
              <button key={c.kind} onClick={() => setMode(c.kind)} style={{
                flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 2,
                paddingTop: 14, paddingBottom: 14, paddingLeft: 16, paddingRight: 16,
                background: active ? ink : surface,
                color: active ? lime : ink,
                border: `3px solid ${ink}`,
                borderLeft: idx > 0 ? 'none' : `3px solid ${ink}`,
                cursor: active ? 'default' : 'pointer', fontFamily: 'inherit',
              }}>
                <span style={{ fontFamily: sans, fontSize: 10, letterSpacing: 3, fontWeight: 900 }}>{c.label}</span>
                <span style={{ fontFamily: sans, fontSize: 22, fontWeight: 900, fontVariantNumeric: 'tabular-nums', letterSpacing: -0.6 }}>NT${c.amount}</span>
              </button>
            );
          })}
        </div>
        <div style={{ paddingLeft: 16, paddingRight: 16 }}>
          {cats.map(c => (
            <div key={c.id} style={{
              marginBottom: 12, background: surface, border: `3px solid ${ink}`,
              boxShadow: c.expanded ? `6px 6px 0 ${lime}` : 'none',
            }}>
              <div style={{
                paddingLeft: 12, paddingRight: 16,
                paddingTop: c.expanded ? 14 : 11, paddingBottom: c.expanded ? 14 : 11,
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                background: c.expanded ? lime : surface,
                borderBottom: c.expanded ? `3px solid ${ink}` : 'none',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, flex: 1 }}>
                  <div style={{ width: 14, transform: `rotate(${c.expanded ? 90 : 0}deg)` }}>
                    <Glyph name="chevron-right" size={14} color={ink} stroke={3}/>
                  </div>
                  <div style={{
                    width: 32, height: 32, background: ink,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <DynamicIconById iconId={c.iconId} size={16} color={lime}/>
                  </div>
                  <span style={{ fontFamily: sans, fontSize: c.expanded ? 17 : 15, fontWeight: 900, color: ink, letterSpacing: -0.3 }}>{c.title}</span>
                </div>
                <span style={{ fontFamily: sans, fontSize: c.expanded ? 17 : 15, fontWeight: 900, color: ink, fontVariantNumeric: 'tabular-nums' }}>{c.total}</span>
              </div>
              {c.expanded && items_food.map((tx, i) => (
                <div key={i} style={{
                  display: 'flex', alignItems: 'center', gap: 12,
                  paddingLeft: 16, paddingRight: 16, paddingTop: 10, paddingBottom: 10,
                  borderTop: i === 0 ? 'none' : `1.5px solid ${ink}`,
                }}>
                  <div style={{ width: 40 }}>
                    <span style={{ fontFamily: sans, fontSize: 11, fontWeight: 900, color: ink, fontVariantNumeric: 'tabular-nums' }}>{tx.date}</span>
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontFamily: sans, fontSize: 14, fontWeight: 700, color: ink,
                      whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{tx.note}</div>
                    <div style={{ fontFamily: sans, fontSize: 10, color: ink2, letterSpacing: 1,
                      whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{tx.acc}</div>
                  </div>
                  <span style={{ fontFamily: sans, fontSize: 15, fontWeight: 900, color: ink, fontVariantNumeric: 'tabular-nums', letterSpacing: -0.4 }}>{tx.amount}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
      <div style={{ position: 'absolute', bottom: 20, left: 0, right: 0, display: 'flex', justifyContent: 'center', zIndex: 10, pointerEvents: 'none' }}>
        <div style={{
          width: 240, height: 64, background: ink, border: `3px solid ${ink}`,
          boxShadow: `6px 6px 0 ${lime}`,
          pointerEvents: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'space-around',
        }}>
          {['minus', 'exchange', 'plus'].map((g, i) => (
            <button key={i} style={{
              width: 70, height: 56, border: 'none', background: 'transparent', cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              borderRight: i < 2 ? `2px solid ${lime}` : 'none',
            }}>
              <Glyph name={g} size={24} color={lime} stroke={g === 'exchange' ? 2.8 : 2.6}/>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// ═════════════════════════════════════════════════════════════
// V7 — Origami Fold
// 摺紙日式：紙白系 + 櫻花粉 + 折線陰影
// ═════════════════════════════════════════════════════════════
function PP_Origami() {
  const [mode, setMode] = React.useState('expense');
  const bg = '#FAF6EE', surface = '#FFFFFF';
  const ink = '#1F1A14', ink2 = '#6A5F50', ink3 = '#A89C8A';
  const pink = '#F4A6BC', pinkSoft = 'rgba(244,166,188,0.18)';
  const hairline = 'rgba(31,26,20,0.10)';
  const serif = '"Cochin", "Yu Mincho", "Songti TC", serif';
  // 摺紙陰影：右上亮、左下暗
  const fold = 'linear-gradient(135deg, #FFFFFF 0%, #FAF6EE 48%, #ECE5D6 100%)';

  const cats = [
    { id: 'food',  title: '飲食', kana: 'いんしょく', iconId: 13, total: '−NT$1,425', expanded: true  },
    { id: 'shop',  title: '購物', kana: 'かいもの',   iconId: 28, total: '−NT$1,290', expanded: false },
    { id: 'trans', title: '交通', kana: 'こうつう',   iconId: 23, total: '−NT$60',    expanded: false },
  ];
  const items_food = [
    { date: '5/2', note: '路易莎咖啡', acc: '國泰世華 信用卡', amount: '−NT$185' },
    { date: '5/2', note: '便當',       acc: '現金',           amount: '−NT$120' },
    { date: '5/1', note: '居酒屋',     acc: '國泰世華 信用卡', amount: '−NT$780' },
  ];
  // 摺角 SVG
  const FoldedCorner = ({ size = 14, color = ink3 }) => (
    <svg width={size} height={size} viewBox="0 0 14 14" style={{ position: 'absolute', top: 0, right: 0 }}>
      <polygon points="14,0 0,0 14,14" fill={pinkSoft}/>
      <polyline points="14,0 0,0 14,14" stroke={color} strokeWidth="0.6" fill="none" opacity="0.5"/>
    </svg>
  );
  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', background: bg, color: ink, fontFamily: serif }}>
      <div style={{ position: 'absolute', inset: 0, overflowY: 'auto', overflowX: 'hidden', paddingBottom: 140 }}>
        <div style={{
          paddingTop: 56, paddingBottom: 8, paddingLeft: 24, paddingRight: 24,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>
          <button style={{ width: 32, height: 32, border: 'none', background: 'transparent', cursor: 'pointer' }}>
            <Glyph name="filter" size={20} color={ink2} stroke={1.4}/>
          </button>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontFamily: serif, fontSize: 19, fontWeight: 500, letterSpacing: 2, color: ink, fontStyle: 'italic' }}>SuSuGiGi</div>
            <div style={{ fontSize: 9, color: pink, letterSpacing: 3, marginTop: 2 }}>折 · ORIGAMI</div>
          </div>
          <div style={{ display: 'flex', gap: 4 }}>
            <button style={{ width: 32, height: 32, border: 'none', background: 'transparent', cursor: 'pointer' }}>
              <Glyph name="search" size={20} color={ink2} stroke={1.4}/>
            </button>
            <button style={{ width: 32, height: 32, border: 'none', background: 'transparent', cursor: 'pointer' }}>
              <Glyph name="gear" size={20} color={ink2} stroke={1.4}/>
            </button>
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', paddingTop: 10, paddingBottom: 4 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <Glyph name="chevron-left" size={14} color={ink3}/>
            <span style={{ fontFamily: serif, fontSize: 14, fontWeight: 500, letterSpacing: 3, color: ink, fontStyle: 'italic' }}>五月 · MAY 2026</span>
            <Glyph name="chevron-right" size={14} color={ink3}/>
          </div>
        </div>
        {/* Hero */}
        <div style={{ textAlign: 'center', paddingTop: 16, paddingBottom: 12 }}>
          <div style={{ fontFamily: serif, fontSize: 11, color: ink2, letterSpacing: 3, marginBottom: 6 }}>BALANCE</div>
          <div style={{ fontFamily: serif, fontSize: 42, fontWeight: 400, color: ink, fontVariantNumeric: 'tabular-nums', letterSpacing: -1, fontStyle: 'italic' }}>NT$184,295</div>
        </div>
        {/* Donut — 紙片折感 */}
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: 4, marginBottom: 18 }}>
          <div style={{
            width: 260, height: 260, borderRadius: '50%',
            background: fold, border: `1px solid ${hairline}`,
            boxShadow: '0 12px 24px rgba(31,26,20,0.10), 6px 6px 0 rgba(244,166,188,0.20)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            position: 'relative',
          }}>
            <DonutChart
              data={[
                { key: 'a', value: 38, color: pink },
                { key: 'b', value: 22, color: '#C97B95' },
                { key: 'c', value: 18, color: '#6A5F50' },
                { key: 'd', value: 12, color: '#A89C8A' },
                { key: 'e', value: 10, color: '#D8CFBE' },
              ]} size={220} outerRadius={88} innerRadius={72} cornerRadius={2}>
              <div style={{ textAlign: 'center', width: 100 }}>
                <div style={{ fontFamily: serif, fontSize: 10, color: ink2, letterSpacing: 2 }}>支出 / OUT</div>
                <div style={{ fontFamily: serif, fontSize: 20, fontWeight: 500, color: ink, fontVariantNumeric: 'tabular-nums', fontStyle: 'italic' }}>NT$5,985</div>
              </div>
            </DonutChart>
          </div>
        </div>
        {/* Focus row — 紙片摺角 */}
        <div style={{ display: 'flex', gap: 12, paddingLeft: 20, paddingRight: 20, paddingBottom: 16 }}>
          {[
            { kind: 'expense', amount: '5,985',  label: '支出' },
            { kind: 'income',  amount: '68,000', label: '收入' },
          ].map(c => {
            const active = c.kind === mode;
            return (
              <button key={c.kind} onClick={() => setMode(c.kind)} style={{
                flex: 1, position: 'relative',
                paddingTop: 14, paddingBottom: 14, paddingLeft: 14, paddingRight: 14,
                background: active ? fold : surface,
                border: `1px solid ${active ? pink : hairline}`,
                borderRadius: 0, fontFamily: 'inherit',
                cursor: active ? 'default' : 'pointer',
                boxShadow: active ? '3px 3px 0 rgba(244,166,188,0.30)' : 'none',
                textAlign: 'left',
              }}>
                <FoldedCorner size={14} color={ink3}/>
                <div style={{ fontFamily: serif, fontSize: 10, letterSpacing: 3, color: active ? pink : ink2, fontStyle: 'italic' }}>{c.label}</div>
                <div style={{ fontFamily: serif, fontSize: 20, fontWeight: 500, color: active ? ink : ink2, fontVariantNumeric: 'tabular-nums', letterSpacing: -0.4, fontStyle: 'italic' }}>NT${c.amount}</div>
              </button>
            );
          })}
        </div>
        {/* Sections — 紙片堆疊 */}
        <div style={{ paddingLeft: 20, paddingRight: 20 }}>
          {cats.map(c => (
            <div key={c.id} style={{
              marginBottom: 14, background: fold,
              border: `1px solid ${hairline}`,
              boxShadow: c.expanded ? '4px 4px 0 rgba(244,166,188,0.25)' : '2px 2px 0 rgba(31,26,20,0.06)',
              position: 'relative',
            }}>
              <FoldedCorner size={20} color={ink3}/>
              <div style={{
                paddingLeft: 12, paddingRight: 22,
                paddingTop: c.expanded ? 14 : 11, paddingBottom: c.expanded ? 14 : 11,
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, flex: 1 }}>
                  <div style={{ width: 14, transform: `rotate(${c.expanded ? 90 : 0}deg)` }}>
                    <Glyph name="chevron-right" size={12} color={ink2}/>
                  </div>
                  <div style={{
                    width: 32, height: 32, background: pinkSoft,
                    border: `1px solid ${pink}`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <DynamicIconById iconId={c.iconId} size={16} color={ink}/>
                  </div>
                  <div>
                    <div style={{ fontFamily: serif, fontSize: c.expanded ? 17 : 15, fontWeight: 500, color: ink, letterSpacing: 0.5 }}>{c.title}</div>
                    <div style={{ fontFamily: serif, fontSize: 9, color: pink, letterSpacing: 2, fontStyle: 'italic' }}>{c.kana}</div>
                  </div>
                </div>
                <span style={{ fontFamily: serif, fontSize: c.expanded ? 17 : 15, fontWeight: 500, color: ink, fontVariantNumeric: 'tabular-nums', fontStyle: 'italic' }}>{c.total}</span>
              </div>
              {c.expanded && items_food.map((tx, i) => (
                <div key={i} style={{
                  display: 'flex', alignItems: 'center', gap: 12,
                  paddingLeft: 16, paddingRight: 16, paddingTop: 10, paddingBottom: 10,
                  borderTop: `0.5px dashed ${hairline}`,
                }}>
                  <span style={{ fontFamily: serif, fontSize: 12, color: pink, fontVariantNumeric: 'tabular-nums', width: 36, fontStyle: 'italic' }}>{tx.date}</span>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 14, color: ink,
                      whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{tx.note}</div>
                    <div style={{ fontFamily: serif, fontSize: 10, color: ink3, letterSpacing: 1,
                      whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{tx.acc}</div>
                  </div>
                  <span style={{ fontFamily: serif, fontSize: 15, color: ink, fontVariantNumeric: 'tabular-nums', fontStyle: 'italic' }}>{tx.amount}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
      <div style={{ position: 'absolute', bottom: 24, left: 0, right: 0, display: 'flex', justifyContent: 'center', zIndex: 10, pointerEvents: 'none' }}>
        <div style={{
          width: 216, height: 64,
          background: fold, border: `1px solid ${ink}`,
          boxShadow: `4px 4px 0 rgba(244,166,188,0.40)`,
          pointerEvents: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'space-around',
          paddingLeft: 8, paddingRight: 8, position: 'relative',
        }}>
          <FoldedCorner size={14} color={ink2}/>
          {['minus', 'exchange', 'plus'].map((g, i) => (
            <button key={i} style={{
              width: 50, height: 50, border: 'none', background: 'transparent', cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <Glyph name={g} size={22} color={ink} stroke={g === 'exchange' ? 2 : 1.8}/>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// ═════════════════════════════════════════════════════════════
// V8 — Tropical Resort
// 椰奶白 + 椰葉綠 + 珊瑚橘強調 + 椰葉裝飾
// ═════════════════════════════════════════════════════════════
function PP_Tropical() {
  const [mode, setMode] = React.useState('expense');
  const bg = '#F5F1E8', surface = '#FFFFFF';
  const ink = '#1A2F22', ink2 = '#4A6553', ink3 = '#92A597';
  const palm = '#2D5641', palmSoft = 'rgba(45,86,65,0.10)';
  const coral = '#FF7A5C', coralSoft = 'rgba(255,122,92,0.14)';
  const hairline = 'rgba(26,47,34,0.10)';
  const serif = '"Cochin", "Playfair Display", "Georgia", serif';

  const cats = [
    { id: 'food',  title: '飲食 · Bites',     iconId: 13, total: '−NT$1,425', expanded: true  },
    { id: 'shop',  title: '購物 · Goodies',   iconId: 28, total: '−NT$1,290', expanded: false },
    { id: 'trans', title: '交通 · Trips',     iconId: 23, total: '−NT$60',    expanded: false },
  ];
  const items_food = [
    { date: '5/2', note: '路易莎咖啡', acc: '國泰世華 信用卡', amount: '−NT$185' },
    { date: '5/2', note: '便當',       acc: '現金',           amount: '−NT$120' },
    { date: '5/1', note: '居酒屋',     acc: '國泰世華 信用卡', amount: '−NT$780' },
  ];
  // 椰葉 SVG
  const PalmLeaf = ({ size = 80, color = palm, opacity = 1, transform = '' }) => (
    <svg width={size} height={size} viewBox="0 0 80 80" style={{ opacity, transform }}>
      <path d="M40 76 Q38 60 32 44 Q26 30 16 22" stroke={color} strokeWidth="1.5" fill="none" strokeLinecap="round"/>
      <path d="M32 44 Q26 38 18 36" stroke={color} strokeWidth="1.2" fill="none" strokeLinecap="round"/>
      <path d="M30 50 Q24 46 14 46" stroke={color} strokeWidth="1.2" fill="none" strokeLinecap="round"/>
      <path d="M28 56 Q22 54 12 56" stroke={color} strokeWidth="1.2" fill="none" strokeLinecap="round"/>
      <path d="M34 38 Q32 32 26 28" stroke={color} strokeWidth="1.2" fill="none" strokeLinecap="round"/>
      <path d="M36 32 Q36 26 30 22" stroke={color} strokeWidth="1.2" fill="none" strokeLinecap="round"/>
    </svg>
  );
  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', background: bg, color: ink, fontFamily: serif }}>
      {/* 椰葉裝飾 */}
      <div style={{ position: 'absolute', top: 80, left: -10, pointerEvents: 'none' }}>
        <PalmLeaf size={100} color={palm} opacity={0.18}/>
      </div>
      <div style={{ position: 'absolute', top: 120, right: -20, pointerEvents: 'none' }}>
        <PalmLeaf size={140} color={palm} opacity={0.16} transform="scaleX(-1) rotate(20deg)"/>
      </div>
      <div style={{ position: 'absolute', bottom: 200, left: -30, pointerEvents: 'none' }}>
        <PalmLeaf size={110} color={coral} opacity={0.10} transform="rotate(170deg)"/>
      </div>
      <div style={{ position: 'absolute', inset: 0, overflowY: 'auto', overflowX: 'hidden', paddingBottom: 140 }}>
        <div style={{
          paddingTop: 56, paddingBottom: 8, paddingLeft: 24, paddingRight: 24,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'relative',
        }}>
          <button style={{ width: 36, height: 36, border: 'none', background: 'transparent', cursor: 'pointer' }}>
            <Glyph name="filter" size={20} color={palm}/>
          </button>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontFamily: serif, fontSize: 20, fontWeight: 500, color: palm, letterSpacing: 1, fontStyle: 'italic' }}>SuSuGiGi</div>
            <div style={{ fontFamily: serif, fontSize: 9, color: coral, letterSpacing: 4, marginTop: 1 }}>· RESORT ·</div>
          </div>
          <div style={{ display: 'flex', gap: 4 }}>
            <button style={{ width: 36, height: 36, border: 'none', background: 'transparent', cursor: 'pointer' }}>
              <Glyph name="search" size={20} color={palm}/>
            </button>
            <button style={{ width: 36, height: 36, border: 'none', background: 'transparent', cursor: 'pointer' }}>
              <Glyph name="gear" size={20} color={palm}/>
            </button>
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', paddingTop: 8 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <Glyph name="chevron-left" size={14} color={ink3}/>
            <span style={{ fontFamily: serif, fontSize: 15, fontWeight: 500, letterSpacing: 1, color: palm, fontStyle: 'italic' }}>May 2026</span>
            <Glyph name="chevron-right" size={14} color={ink3}/>
          </div>
        </div>
        {/* Hero — 度假感大字 */}
        <div style={{ textAlign: 'center', paddingTop: 14, paddingBottom: 12 }}>
          <div style={{ fontFamily: serif, fontSize: 10, color: ink2, letterSpacing: 3, marginBottom: 4 }}>BALANCE</div>
          <div style={{ fontFamily: serif, fontSize: 44, fontWeight: 500, color: ink, fontVariantNumeric: 'tabular-nums', letterSpacing: -1.2, fontStyle: 'italic' }}>NT$184,295</div>
          <svg width="80" height="6" viewBox="0 0 80 6" style={{ marginTop: 4 }}>
            <path d="M2 3 Q20 1 40 3 T78 3" stroke={coral} strokeWidth="1.5" fill="none"/>
          </svg>
        </div>
        {/* Donut — 椰葉圍繞 */}
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: 4, marginBottom: 18, position: 'relative' }}>
          <div style={{
            width: 244, height: 244, borderRadius: '50%',
            background: 'rgba(255,255,255,0.55)',
            backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)',
            border: `1px solid ${palmSoft}`,
            boxShadow: '0 10px 28px rgba(45,86,65,0.16)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <DonutChart
              data={[
                { key: 'a', value: 38, color: palm },
                { key: 'b', value: 22, color: '#5C7C68' },
                { key: 'c', value: 18, color: coral },
                { key: 'd', value: 12, color: '#92A597' },
                { key: 'e', value: 10, color: '#D2DBD0' },
              ]} size={208} outerRadius={86} innerRadius={68}>
              <div style={{ textAlign: 'center', width: 100 }}>
                <div style={{ fontFamily: serif, fontSize: 10, color: ink2, letterSpacing: 2 }}>SPENT</div>
                <div style={{ fontFamily: serif, fontSize: 20, fontWeight: 500, color: ink, fontVariantNumeric: 'tabular-nums', fontStyle: 'italic' }}>NT$5,985</div>
              </div>
            </DonutChart>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 12, paddingLeft: 24, paddingRight: 24, paddingBottom: 16 }}>
          {[
            { kind: 'expense', amount: 'NT$ 5,985',  label: 'OUT' },
            { kind: 'income',  amount: 'NT$ 68,000', label: 'IN'  },
          ].map(c => {
            const active = c.kind === mode;
            return (
              <button key={c.kind} onClick={() => setMode(c.kind)} style={{
                flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 2,
                paddingTop: 12, paddingBottom: 12, paddingLeft: 14, paddingRight: 14,
                background: active ? 'rgba(255,255,255,0.85)' : 'transparent',
                border: active ? `1.5px solid ${coral}` : `1px solid ${hairline}`,
                borderRadius: 999, fontFamily: 'inherit',
                cursor: active ? 'default' : 'pointer',
              }}>
                <span style={{ fontFamily: serif, fontSize: 10, letterSpacing: 3, color: active ? coral : ink2 }}>{c.label}</span>
                <span style={{ fontFamily: serif, fontSize: 20, fontWeight: 500, color: active ? ink : ink2, fontVariantNumeric: 'tabular-nums', letterSpacing: -0.4, fontStyle: 'italic' }}>{c.amount}</span>
              </button>
            );
          })}
        </div>
        <div style={{ paddingLeft: 24, paddingRight: 24 }}>
          {cats.map(c => (
            <div key={c.id} style={{
              marginBottom: 12, background: 'rgba(255,255,255,0.55)',
              backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)',
              border: `1px solid ${hairline}`,
              borderLeft: `3px solid ${coral}`,
              borderRadius: 0,
            }}>
              <div style={{
                paddingLeft: 12, paddingRight: 16,
                paddingTop: c.expanded ? 14 : 11, paddingBottom: c.expanded ? 14 : 11,
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, flex: 1 }}>
                  <div style={{ width: 14, transform: `rotate(${c.expanded ? 90 : 0}deg)` }}>
                    <Glyph name="chevron-right" size={12} color={ink2}/>
                  </div>
                  <div style={{
                    width: 30, height: 30, borderRadius: '50%',
                    background: palmSoft, border: `1px solid ${palm}`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <DynamicIconById iconId={c.iconId} size={14} color={palm}/>
                  </div>
                  <span style={{ fontFamily: serif, fontSize: c.expanded ? 17 : 15, fontWeight: 500, color: ink, letterSpacing: 0.3, fontStyle: 'italic' }}>{c.title}</span>
                </div>
                <span style={{ fontFamily: serif, fontSize: c.expanded ? 16 : 14, fontWeight: 500, color: ink, fontVariantNumeric: 'tabular-nums', fontStyle: 'italic' }}>{c.total}</span>
              </div>
              {c.expanded && items_food.map((tx, i) => (
                <div key={i} style={{
                  display: 'flex', alignItems: 'center', gap: 12,
                  paddingLeft: 16, paddingRight: 16, paddingTop: 10, paddingBottom: 10,
                  borderTop: `0.5px solid ${hairline}`,
                }}>
                  <span style={{ fontFamily: serif, fontSize: 12, color: coral, fontVariantNumeric: 'tabular-nums', width: 32, fontStyle: 'italic' }}>{tx.date}</span>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 14, color: ink,
                      whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{tx.note}</div>
                    <div style={{ fontFamily: serif, fontSize: 10, color: ink3, letterSpacing: 1,
                      whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{tx.acc}</div>
                  </div>
                  <span style={{ fontFamily: serif, fontSize: 15, color: ink, fontVariantNumeric: 'tabular-nums', fontStyle: 'italic' }}>{tx.amount}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
      {/* FAB — 椰葉感圓 pill */}
      <div style={{ position: 'absolute', bottom: 24, left: 0, right: 0, display: 'flex', justifyContent: 'center', zIndex: 10, pointerEvents: 'none' }}>
        <div style={{
          width: 220, height: 64, borderRadius: 999,
          background: 'rgba(255,255,255,0.85)',
          backdropFilter: 'blur(28px)', WebkitBackdropFilter: 'blur(28px)',
          border: `1.5px solid ${palm}`,
          boxShadow: `0 10px 24px rgba(45,86,65,0.18)`,
          pointerEvents: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'space-around',
          paddingLeft: 8, paddingRight: 8,
        }}>
          {['minus', 'exchange', 'plus'].map((g, i) => (
            <button key={i} style={{
              width: 50, height: 50, border: 'none', background: 'transparent', cursor: 'pointer',
              borderRadius: 25, display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <Glyph name={g} size={22} color={i === 1 ? coral : palm} stroke={g === 'exchange' ? 2.4 : 2.2}/>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// ═════════════════════════════════════════════════════════════
// V9 — Comic Manga
// 米白 + 黑線 + 半色調網點 + 日漫紅速度線
// ═════════════════════════════════════════════════════════════
const MANGA_HALFTONE = "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='10' height='10'><circle cx='2' cy='2' r='0.9' fill='%23000000' fill-opacity='0.10'/></svg>\")";

function PP_Manga() {
  const [mode, setMode] = React.useState('expense');
  const bg = '#FAF6EE', surface = '#FFFFFF';
  const ink = '#0A0A0A', ink2 = '#3D3D3D', ink3 = '#8A8A8A';
  const red = '#E32330', redSoft = 'rgba(227,35,48,0.10)';
  const hairline = '#0A0A0A';
  const sans = '"Helvetica Neue", "Arial Black", sans-serif';
  const hand = '"Bradley Hand", "Caveat", "Comic Sans MS", cursive';

  const cats = [
    { id: 'food',  title: '飲食', iconId: 13, total: '−NT$1,425', expanded: true,  fx: 'WHAM!' },
    { id: 'shop',  title: '購物', iconId: 28, total: '−NT$1,290', expanded: false, fx: 'POP!'  },
    { id: 'trans', title: '交通', iconId: 23, total: '−NT$60',    expanded: false, fx: 'ZIP!'  },
  ];
  const items_food = [
    { date: '5/2', note: '路易莎咖啡', acc: '國泰世華 信用卡', amount: '−NT$185' },
    { date: '5/2', note: '便當',       acc: '現金',           amount: '−NT$120' },
    { date: '5/1', note: '居酒屋',     acc: '國泰世華 信用卡', amount: '−NT$780' },
  ];
  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', background: bg, color: ink, fontFamily: sans }}>
      <div style={{ position: 'absolute', inset: 0, overflowY: 'auto', overflowX: 'hidden', paddingBottom: 140 }}>
        {/* Header — 漫畫 panel 黑框 */}
        <div style={{
          paddingTop: 56, paddingBottom: 8, paddingLeft: 16, paddingRight: 16,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          borderBottom: `3px solid ${ink}`,
        }}>
          <button style={{ width: 36, height: 36, border: `2px solid ${ink}`, background: surface, cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Glyph name="filter" size={18} color={ink} stroke={2.4}/>
          </button>
          <div style={{ fontFamily: sans, fontSize: 24, fontWeight: 900, color: ink, letterSpacing: -1, fontStyle: 'italic' }}>SuSuGiGi!</div>
          <div style={{ display: 'flex', gap: 4 }}>
            <button style={{ width: 36, height: 36, border: `2px solid ${ink}`, background: surface, cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Glyph name="search" size={18} color={ink} stroke={2.4}/>
            </button>
            <button style={{ width: 36, height: 36, border: `2px solid ${ink}`, background: surface, cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Glyph name="gear" size={18} color={ink} stroke={2.4}/>
            </button>
          </div>
        </div>
        {/* 速度線 + period */}
        <div style={{ position: 'relative', paddingTop: 14, paddingBottom: 6, paddingLeft: 16, paddingRight: 16 }}>
          <svg width="100%" height="6" viewBox="0 0 400 6" preserveAspectRatio="none" style={{ position: 'absolute', top: 18, left: 0 }}>
            <path d="M0 3 L60 3 M80 3 L130 3 M140 3 L180 3 M220 3 L270 3 M280 3 L320 3 M340 3 L400 3" stroke={red} strokeWidth="2"/>
          </svg>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 14, position: 'relative', background: bg, width: 180, margin: '0 auto', padding: '2px 10px' }}>
            <Glyph name="chevron-left" size={14} color={ink} stroke={3}/>
            <span style={{ fontFamily: hand, fontSize: 22, fontWeight: 700, color: ink, letterSpacing: 0 }}>May 2026</span>
            <Glyph name="chevron-right" size={14} color={ink} stroke={3}/>
          </div>
        </div>
        {/* Hero — 漫畫 sound effect 大字 */}
        <div style={{ paddingLeft: 16, paddingRight: 16, paddingTop: 14, paddingBottom: 10, position: 'relative' }}>
          <div style={{
            display: 'inline-block', background: ink, color: bg,
            paddingLeft: 8, paddingRight: 8, paddingTop: 2, paddingBottom: 2,
            fontSize: 10, fontWeight: 900, letterSpacing: 3, marginBottom: 6,
            transform: 'rotate(-2deg)',
          }}>BALANCE</div>
          <div style={{
            fontFamily: hand, fontSize: 56, fontWeight: 700,
            color: ink, fontVariantNumeric: 'tabular-nums', letterSpacing: -1, lineHeight: 0.95,
            textShadow: `3px 3px 0 ${red}`,
            transform: 'rotate(-1deg)', display: 'inline-block',
          }}>NT$184,295!</div>
        </div>
        {/* Donut — 漫畫 panel 內 */}
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: 8, marginBottom: 16 }}>
          <div style={{
            width: 240, height: 240, borderRadius: '50%',
            background: surface, border: `3px solid ${ink}`,
            backgroundImage: MANGA_HALFTONE,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <DonutChart
              data={[
                { key: 'a', value: 38, color: red },
                { key: 'b', value: 22, color: ink },
                { key: 'c', value: 18, color: '#3D3D3D' },
                { key: 'd', value: 12, color: '#8A8A8A' },
                { key: 'e', value: 10, color: '#C4C4C4' },
              ]} size={200} outerRadius={84} innerRadius={62} cornerRadius={2} padAngleDeg={2}>
              <div style={{ textAlign: 'center', width: 100 }}>
                <div style={{ fontFamily: sans, fontSize: 10, color: ink2, letterSpacing: 2, fontWeight: 900 }}>OUT</div>
                <div style={{ fontFamily: hand, fontSize: 24, fontWeight: 700, color: ink, fontVariantNumeric: 'tabular-nums', textShadow: `1.5px 1.5px 0 ${red}` }}>5,985!</div>
              </div>
            </DonutChart>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 10, paddingLeft: 16, paddingRight: 16, paddingBottom: 16 }}>
          {[
            { kind: 'expense', amount: '5,985',  label: 'OUT!' },
            { kind: 'income',  amount: '68,000', label: 'IN!'  },
          ].map((c, idx) => {
            const active = c.kind === mode;
            return (
              <button key={c.kind} onClick={() => setMode(c.kind)} style={{
                flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 2,
                paddingTop: 12, paddingBottom: 12, paddingLeft: 14, paddingRight: 14,
                background: active ? ink : surface,
                color: active ? bg : ink,
                border: `2.5px solid ${ink}`,
                cursor: active ? 'default' : 'pointer', fontFamily: 'inherit',
                boxShadow: active ? `3px 3px 0 ${red}` : `2px 2px 0 ${ink}`,
                transform: idx === 0 ? 'rotate(-1deg)' : 'rotate(1deg)',
              }}>
                <span style={{ fontFamily: sans, fontSize: 10, letterSpacing: 2, fontWeight: 900 }}>{c.label}</span>
                <span style={{ fontFamily: hand, fontSize: 24, fontWeight: 700, fontVariantNumeric: 'tabular-nums', letterSpacing: -0.4 }}>NT${c.amount}</span>
              </button>
            );
          })}
        </div>
        {/* Sections — comic panels */}
        <div style={{ paddingLeft: 16, paddingRight: 16 }}>
          {cats.map((c, idx) => (
            <div key={c.id} style={{
              marginBottom: 12, background: surface,
              border: `2.5px solid ${ink}`,
              boxShadow: c.expanded ? `4px 4px 0 ${red}` : `2.5px 2.5px 0 ${ink}`,
              position: 'relative',
              transform: `rotate(${idx % 2 === 0 ? -0.5 : 0.5}deg)`,
            }}>
              {/* FX bubble */}
              <div style={{
                position: 'absolute', top: -10, right: 12,
                background: red, color: bg, paddingLeft: 8, paddingRight: 8, paddingTop: 1, paddingBottom: 1,
                fontFamily: hand, fontSize: 14, fontWeight: 700, letterSpacing: 0,
                border: `1.5px solid ${ink}`,
                transform: 'rotate(-4deg)',
              }}>{c.fx}</div>
              <div style={{
                paddingLeft: 12, paddingRight: 16,
                paddingTop: c.expanded ? 14 : 11, paddingBottom: c.expanded ? 14 : 11,
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                backgroundImage: c.expanded ? 'none' : MANGA_HALFTONE,
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, flex: 1 }}>
                  <div style={{ width: 14, transform: `rotate(${c.expanded ? 90 : 0}deg)` }}>
                    <Glyph name="chevron-right" size={14} color={ink} stroke={3}/>
                  </div>
                  <div style={{
                    width: 32, height: 32, background: ink,
                    border: `2px solid ${ink}`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <DynamicIconById iconId={c.iconId} size={16} color={bg}/>
                  </div>
                  <span style={{ fontFamily: hand, fontSize: c.expanded ? 22 : 19, fontWeight: 700, color: ink }}>{c.title}</span>
                </div>
                <span style={{ fontFamily: sans, fontSize: c.expanded ? 16 : 14, fontWeight: 900, color: ink, fontVariantNumeric: 'tabular-nums' }}>{c.total}</span>
              </div>
              {c.expanded && items_food.map((tx, i) => (
                <div key={i} style={{
                  display: 'flex', alignItems: 'center', gap: 12,
                  paddingLeft: 16, paddingRight: 16, paddingTop: 10, paddingBottom: 10,
                  borderTop: i === 0 ? `2px solid ${ink}` : `1px dashed ${ink2}`,
                }}>
                  <span style={{ fontFamily: sans, fontSize: 11, fontWeight: 900, color: red, fontVariantNumeric: 'tabular-nums', width: 36 }}>{tx.date}</span>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontFamily: hand, fontSize: 16, fontWeight: 600, color: ink,
                      whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{tx.note}</div>
                    <div style={{ fontFamily: sans, fontSize: 10, color: ink2, letterSpacing: 1, fontWeight: 700,
                      whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{tx.acc}</div>
                  </div>
                  <span style={{ fontFamily: sans, fontSize: 15, fontWeight: 900, color: ink, fontVariantNumeric: 'tabular-nums' }}>{tx.amount}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
      <div style={{ position: 'absolute', bottom: 24, left: 0, right: 0, display: 'flex', justifyContent: 'center', zIndex: 10, pointerEvents: 'none' }}>
        <div style={{
          width: 232, height: 68,
          background: surface, border: `3px solid ${ink}`,
          boxShadow: `5px 5px 0 ${red}`,
          pointerEvents: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'space-around',
          paddingLeft: 8, paddingRight: 8,
        }}>
          {['minus', 'exchange', 'plus'].map((g, i) => (
            <button key={i} style={{
              width: 60, height: 56, border: 'none', background: 'transparent', cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              borderRight: i < 2 ? `1.5px solid ${ink}` : 'none',
            }}>
              <Glyph name={g} size={26} color={ink} stroke={g === 'exchange' ? 3 : 2.8}/>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// ═════════════════════════════════════════════════════════════
// V10 — Marble Sculpture
// 大理石米白 + 黑曜石 + classical serif
// ═════════════════════════════════════════════════════════════
const MARBLE_TEX = "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='m'><feTurbulence type='fractalNoise' baseFrequency='0.012 0.04' numOctaves='3' seed='5'/><feColorMatrix values='0 0 0 0 0.65  0 0 0 0 0.62  0 0 0 0 0.58  0 0 0 0.45 0'/></filter><rect width='100%' height='100%' fill='%23F0EDE6'/><rect width='100%' height='100%' filter='url(%23m)' opacity='0.5'/></svg>\")";

function PP_Marble() {
  const [mode, setMode] = React.useState('expense');
  const bg = '#F0EDE6';
  const ink = '#0F0F0F', ink2 = '#54524D', ink3 = '#9C9994';
  const obsidian = '#0F0F0F', obsidianSoft = 'rgba(15,15,15,0.10)';
  const hairline = 'rgba(15,15,15,0.10)';
  const serif = '"Cormorant Garamond", "Cinzel", "Playfair Display", "Trajan Pro", serif';

  const cats = [
    { id: 'food',  title: 'DINING',    iconId: 13, total: '−NT$1,425', expanded: true,  num: 'I'   },
    { id: 'shop',  title: 'SHOPPING',  iconId: 28, total: '−NT$1,290', expanded: false, num: 'II'  },
    { id: 'trans', title: 'TRANSPORT', iconId: 23, total: '−NT$60',    expanded: false, num: 'III' },
  ];
  const items_food = [
    { date: '5/2', note: '路易莎咖啡', acc: 'CTBC Credit', amount: '−NT$185' },
    { date: '5/2', note: '便當',       acc: 'Cash',        amount: '−NT$120' },
    { date: '5/1', note: '居酒屋',     acc: 'CTBC Credit', amount: '−NT$780' },
  ];
  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden',
      background: bg, backgroundImage: MARBLE_TEX, color: ink, fontFamily: serif }}>
      <div style={{ position: 'absolute', inset: 0, overflowY: 'auto', overflowX: 'hidden', paddingBottom: 140 }}>
        <div style={{
          paddingTop: 56, paddingBottom: 10, paddingLeft: 24, paddingRight: 24,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          borderBottom: `1px solid ${ink}`,
        }}>
          <button style={{ width: 32, height: 32, border: 'none', background: 'transparent', cursor: 'pointer' }}>
            <Glyph name="filter" size={20} color={ink} stroke={1.2}/>
          </button>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontFamily: serif, fontSize: 18, fontWeight: 500, letterSpacing: 6, color: ink }}>SUSUGIGI</div>
            <div style={{ fontFamily: serif, fontSize: 9, color: ink2, letterSpacing: 4, marginTop: 2, fontStyle: 'italic' }}>· MMXXVI ·</div>
          </div>
          <div style={{ display: 'flex', gap: 4 }}>
            <button style={{ width: 32, height: 32, border: 'none', background: 'transparent', cursor: 'pointer' }}>
              <Glyph name="search" size={20} color={ink} stroke={1.2}/>
            </button>
            <button style={{ width: 32, height: 32, border: 'none', background: 'transparent', cursor: 'pointer' }}>
              <Glyph name="gear" size={20} color={ink} stroke={1.2}/>
            </button>
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', paddingTop: 14, paddingBottom: 4 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <Glyph name="chevron-left" size={14} color={ink2}/>
            <span style={{ fontFamily: serif, fontSize: 14, fontWeight: 500, letterSpacing: 5, color: ink, fontStyle: 'italic' }}>MAY MMXXVI</span>
            <Glyph name="chevron-right" size={14} color={ink2}/>
          </div>
        </div>
        {/* Hero — classical serif 大字 */}
        <div style={{ textAlign: 'center', paddingTop: 14, paddingBottom: 6 }}>
          <div style={{ fontFamily: serif, fontSize: 11, color: ink2, letterSpacing: 5, marginBottom: 6 }}>BALANCE</div>
          <div style={{ fontFamily: serif, fontSize: 50, fontWeight: 400, color: ink, fontVariantNumeric: 'tabular-nums', letterSpacing: -1.5 }}>NT$184,295</div>
          <div style={{ width: 60, height: 1, background: ink, margin: '8px auto 0' }}/>
        </div>
        {/* Donut — 大理石框 */}
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: 14, marginBottom: 18 }}>
          <div style={{
            width: 252, height: 252, borderRadius: '50%',
            background: bg, backgroundImage: MARBLE_TEX,
            border: `1.5px solid ${ink}`, padding: 6,
            boxShadow: '0 12px 28px rgba(15,15,15,0.15)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <div style={{
              width: '100%', height: '100%', borderRadius: '50%',
              border: `0.5px solid ${ink}`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <DonutChart
                data={[
                  { key: 'a', value: 38, color: obsidian },
                  { key: 'b', value: 22, color: '#3F3D38' },
                  { key: 'c', value: 18, color: '#6B6862' },
                  { key: 'd', value: 12, color: '#9C9994' },
                  { key: 'e', value: 10, color: '#C7C4BD' },
                ]} size={210} outerRadius={86} innerRadius={70} cornerRadius={1}>
                <div style={{ textAlign: 'center', width: 100 }}>
                  <div style={{ fontFamily: serif, fontSize: 10, color: ink2, letterSpacing: 3 }}>SPENT</div>
                  <div style={{ fontFamily: serif, fontSize: 20, fontWeight: 500, color: ink, fontVariantNumeric: 'tabular-nums' }}>NT$5,985</div>
                </div>
              </DonutChart>
            </div>
          </div>
        </div>
        {/* Focus — 古典分隔 */}
        <div style={{ display: 'flex', gap: 0, paddingLeft: 24, paddingRight: 24, paddingBottom: 18,
          borderTop: `0.5px solid ${ink}`, borderBottom: `0.5px solid ${ink}` }}>
          {[
            { kind: 'expense', amount: 'NT$ 5,985',  label: 'EXPENSES' },
            { kind: 'income',  amount: 'NT$ 68,000', label: 'INCOME'   },
          ].map((c, idx) => {
            const active = c.kind === mode;
            return (
              <button key={c.kind} onClick={() => setMode(c.kind)} style={{
                flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 2,
                paddingTop: 14, paddingBottom: 14, paddingLeft: 16, paddingRight: 16,
                background: 'transparent',
                border: 'none', borderLeft: idx > 0 ? `0.5px solid ${ink2}` : 'none',
                cursor: active ? 'default' : 'pointer', fontFamily: 'inherit',
              }}>
                <span style={{ fontFamily: serif, fontSize: 10, letterSpacing: 3, color: active ? ink : ink3, fontStyle: 'italic' }}>{c.label}</span>
                <span style={{ fontFamily: serif, fontSize: 22, fontWeight: 500, color: active ? ink : ink3, fontVariantNumeric: 'tabular-nums', letterSpacing: -0.4 }}>{c.amount}</span>
              </button>
            );
          })}
        </div>
        {/* Sections — 雕刻列 */}
        <div style={{ paddingLeft: 24, paddingRight: 24, paddingTop: 4 }}>
          {cats.map((c, idx) => (
            <div key={c.id} style={{
              borderBottom: `0.5px solid ${ink}`,
              paddingTop: c.expanded ? 16 : 13, paddingBottom: c.expanded ? 16 : 13,
              position: 'relative',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 14, flex: 1 }}>
                  <div style={{ width: 14, transform: `rotate(${c.expanded ? 90 : 0}deg)` }}>
                    <Glyph name="chevron-right" size={12} color={ink2}/>
                  </div>
                  <span style={{ fontFamily: serif, fontSize: 11, color: ink2, letterSpacing: 2, width: 28, fontStyle: 'italic' }}>{c.num}</span>
                  <div style={{
                    width: 32, height: 32, borderRadius: '50%',
                    background: bg, backgroundImage: MARBLE_TEX,
                    border: `1px solid ${ink}`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <DynamicIconById iconId={c.iconId} size={15} color={ink}/>
                  </div>
                  <span style={{ fontFamily: serif, fontSize: c.expanded ? 17 : 15, fontWeight: 500, color: ink, letterSpacing: 1.5 }}>{c.title}</span>
                </div>
                <span style={{ fontFamily: serif, fontSize: c.expanded ? 17 : 15, fontWeight: 500, color: ink, fontVariantNumeric: 'tabular-nums' }}>{c.total}</span>
              </div>
              {c.expanded && (
                <div style={{ marginTop: 12, paddingLeft: 56 }}>
                  {items_food.map((tx, i) => (
                    <div key={i} style={{
                      display: 'flex', alignItems: 'center', gap: 12,
                      paddingTop: 8, paddingBottom: 8,
                      borderTop: i === 0 ? 'none' : `0.5px solid ${hairline}`,
                    }}>
                      <span style={{ fontFamily: serif, fontSize: 12, color: ink2, fontVariantNumeric: 'tabular-nums', width: 32, fontStyle: 'italic' }}>{tx.date}</span>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontSize: 14, color: ink,
                          whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{tx.note}</div>
                        <div style={{ fontFamily: serif, fontSize: 10, color: ink3, letterSpacing: 1.5,
                          whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{tx.acc.toUpperCase()}</div>
                      </div>
                      <span style={{ fontFamily: serif, fontSize: 15, color: ink, fontVariantNumeric: 'tabular-nums' }}>{tx.amount}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      <div style={{ position: 'absolute', bottom: 24, left: 0, right: 0, display: 'flex', justifyContent: 'center', zIndex: 10, pointerEvents: 'none' }}>
        <div style={{
          width: 220, height: 64,
          background: bg, backgroundImage: MARBLE_TEX,
          border: `1.5px solid ${ink}`,
          boxShadow: `0 12px 24px rgba(15,15,15,0.15)`,
          pointerEvents: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'space-around',
          paddingLeft: 8, paddingRight: 8,
        }}>
          {['minus', 'exchange', 'plus'].map((g, i) => (
            <button key={i} style={{
              width: 56, height: 52, border: 'none', background: 'transparent', cursor: 'pointer',
              borderRight: i < 2 ? `0.5px solid ${ink2}` : 'none',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <Glyph name={g} size={22} color={ink} stroke={g === 'exchange' ? 1.8 : 1.6}/>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// ═════════════════════════════════════════════════════════════
// Row 2 (V11-V20) — 10 個全新 packaged 性格
// ═════════════════════════════════════════════════════════════

// ─── V11 · Vaporwave ─────────────────────────────────────────
function PP_Vaporwave() {
  const [mode, setMode] = React.useState('expense');
  const bg = 'linear-gradient(180deg, #FCE4F4 0%, #F2A6E0 45%, #B66BD9 100%)';
  const ink = '#2D0F40', ink2 = '#5A2D7E', ink3 = '#9173B0';
  const cyan = '#00F5C8', cyanSoft = 'rgba(0,245,200,0.22)';
  const hairline = 'rgba(45,15,64,0.18)';
  const mono = '"VT323", "Press Start 2P", "Courier New", monospace';
  const sans = '"Helvetica Neue", -apple-system, sans-serif';

  const cats = [
    { id: 'food', title: 'DINING', kana: '飲食', iconId: 13, total: '-NT$1,425', expanded: true },
    { id: 'shop', title: 'RETAIL', kana: '購物', iconId: 28, total: '-NT$1,290', expanded: false },
    { id: 'trans', title: 'TRANSIT', kana: '交通', iconId: 23, total: '-NT$60', expanded: false },
  ];
  const items_food = [
    { date: '5/2', note: '路易莎咖啡', acc: 'CTBC', amount: '-NT$185' },
    { date: '5/2', note: '便當', acc: 'Cash', amount: '-NT$120' },
    { date: '5/1', note: '居酒屋', acc: 'CTBC', amount: '-NT$780' },
  ];
  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', background: bg, color: ink, fontFamily: sans }}>
      {/* CRT 水平 grid */}
      <svg width="100%" height="100%" style={{ position: 'absolute', inset: 0, pointerEvents: 'none', opacity: 0.22 }}>
        {Array.from({ length: 18 }).map((_, i) => (
          <line key={i} x1="0" y1={48 * i} x2="100%" y2={48 * i} stroke={cyan} strokeWidth="0.5"/>
        ))}
      </svg>
      <div style={{ position: 'absolute', inset: 0, overflowY: 'auto', overflowX: 'hidden', paddingBottom: 140 }}>
        <div style={{ paddingTop: 56, paddingBottom: 8, paddingLeft: 20, paddingRight: 20,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'relative' }}>
          <button style={{ width: 36, height: 36, border: 'none', background: 'transparent', cursor: 'pointer' }}>
            <Glyph name="filter" size={20} color={ink}/></button>
          <div style={{ fontFamily: mono, fontSize: 22, fontWeight: 400, color: ink, letterSpacing: 4,
            textShadow: `2px 2px 0 ${cyan}` }}>SUSUGIGI</div>
          <div style={{ display: 'flex', gap: 4 }}>
            <button style={{ width: 36, height: 36, border: 'none', background: 'transparent', cursor: 'pointer' }}>
              <Glyph name="search" size={20} color={ink}/></button>
            <button style={{ width: 36, height: 36, border: 'none', background: 'transparent', cursor: 'pointer' }}>
              <Glyph name="gear" size={20} color={ink}/></button>
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', paddingTop: 8, paddingBottom: 6 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <Glyph name="chevron-left" size={14} color={ink2}/>
            <span style={{ fontFamily: mono, fontSize: 16, color: ink, letterSpacing: 4 }}>MAY ▼ 2026</span>
            <Glyph name="chevron-right" size={14} color={ink2}/>
          </div>
        </div>
        <div style={{ textAlign: 'center', paddingTop: 16, paddingBottom: 10 }}>
          <div style={{ fontFamily: mono, fontSize: 11, color: cyan, letterSpacing: 4, marginBottom: 4 }}>// BALANCE</div>
          <div style={{ fontFamily: mono, fontSize: 44, fontWeight: 400, color: ink, fontVariantNumeric: 'tabular-nums',
            letterSpacing: -1, textShadow: `3px 3px 0 ${cyan}` }}>NT$184,295</div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: 6, marginBottom: 18 }}>
          <div style={{ width: 240, height: 240, borderRadius: '50%',
            background: 'rgba(255,255,255,0.35)', backdropFilter: 'blur(14px)', WebkitBackdropFilter: 'blur(14px)',
            border: `1px solid ${cyan}`,
            boxShadow: `0 0 24px ${cyanSoft}, inset 0 0 16px rgba(0,245,200,0.15)`,
            display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <DonutChart data={[
              { key: 'a', value: 38, color: cyan },
              { key: 'b', value: 22, color: '#FF8FE3' },
              { key: 'c', value: 18, color: '#9173B0' },
              { key: 'd', value: 12, color: '#5A2D7E' },
              { key: 'e', value: 10, color: '#2D0F40' },
            ]} size={208} outerRadius={84} innerRadius={66}>
              <div style={{ textAlign: 'center', width: 100 }}>
                <div style={{ fontFamily: mono, fontSize: 10, color: cyan, letterSpacing: 3 }}>OUT</div>
                <div style={{ fontFamily: mono, fontSize: 20, color: ink, fontVariantNumeric: 'tabular-nums' }}>5,985</div>
              </div>
            </DonutChart>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 10, paddingLeft: 20, paddingRight: 20, paddingBottom: 16 }}>
          {[{ kind: 'expense', amount: '5,985', label: 'OUT' }, { kind: 'income', amount: '68,000', label: 'IN' }].map(c => {
            const active = c.kind === mode;
            return (
              <button key={c.kind} onClick={() => setMode(c.kind)} style={{
                flex: 1, display: 'flex', flexDirection: 'column', gap: 2,
                paddingTop: 12, paddingBottom: 12, paddingLeft: 14, paddingRight: 14,
                background: active ? 'rgba(255,255,255,0.50)' : 'rgba(255,255,255,0.25)',
                backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)',
                border: active ? `1.5px solid ${cyan}` : `1px solid ${hairline}`,
                borderRadius: 4, fontFamily: 'inherit', cursor: active ? 'default' : 'pointer',
                boxShadow: active ? `2px 2px 0 ${cyan}` : 'none', textAlign: 'left',
              }}>
                <span style={{ fontFamily: mono, fontSize: 10, color: active ? cyan : ink2, letterSpacing: 3 }}>{c.label}</span>
                <span style={{ fontFamily: mono, fontSize: 22, color: ink, fontVariantNumeric: 'tabular-nums' }}>NT${c.amount}</span>
              </button>
            );
          })}
        </div>
        <div style={{ paddingLeft: 20, paddingRight: 20 }}>
          {cats.map(c => (
            <div key={c.id} style={{
              marginBottom: 12, background: 'rgba(255,255,255,0.45)',
              backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)',
              border: `1px solid ${cyan}`,
              boxShadow: c.expanded ? `3px 3px 0 ${cyanSoft}` : 'none',
            }}>
              <div style={{ paddingLeft: 12, paddingRight: 16,
                paddingTop: c.expanded ? 13 : 10, paddingBottom: c.expanded ? 13 : 10,
                display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, flex: 1 }}>
                  <div style={{ width: 14, transform: `rotate(${c.expanded ? 90 : 0}deg)` }}>
                    <Glyph name="chevron-right" size={12} color={ink2}/></div>
                  <div style={{ width: 30, height: 30, border: `1px solid ${cyan}`, background: 'rgba(0,245,200,0.18)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <DynamicIconById iconId={c.iconId} size={14} color={ink}/></div>
                  <div>
                    <div style={{ fontFamily: mono, fontSize: c.expanded ? 14 : 12, color: ink, letterSpacing: 2 }}>{c.title}</div>
                    <div style={{ fontSize: 10, color: ink2 }}>{c.kana}</div>
                  </div>
                </div>
                <span style={{ fontFamily: mono, fontSize: c.expanded ? 15 : 13, color: ink, fontVariantNumeric: 'tabular-nums' }}>{c.total}</span>
              </div>
              {c.expanded && items_food.map((tx, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12,
                  paddingLeft: 16, paddingRight: 16, paddingTop: 9, paddingBottom: 9,
                  borderTop: `1px dashed ${hairline}` }}>
                  <span style={{ fontFamily: mono, fontSize: 11, color: cyan, width: 32, fontVariantNumeric: 'tabular-nums' }}>{tx.date}</span>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 13, color: ink, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{tx.note}</div>
                    <div style={{ fontFamily: mono, fontSize: 10, color: ink2, letterSpacing: 1 }}>{tx.acc}</div>
                  </div>
                  <span style={{ fontFamily: mono, fontSize: 14, color: ink, fontVariantNumeric: 'tabular-nums' }}>{tx.amount}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
      <div style={{ position: 'absolute', bottom: 24, left: 0, right: 0, display: 'flex', justifyContent: 'center', zIndex: 10, pointerEvents: 'none' }}>
        <div style={{ width: 220, height: 60, background: 'rgba(255,255,255,0.45)',
          backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)',
          border: `1.5px solid ${cyan}`,
          boxShadow: `0 0 24px ${cyanSoft}, 3px 3px 0 ${cyan}`,
          pointerEvents: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'space-around', paddingLeft: 8, paddingRight: 8 }}>
          {['minus', 'exchange', 'plus'].map((g, i) => (
            <button key={i} style={{ width: 56, height: 50, border: 'none', background: 'transparent', cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Glyph name={g} size={22} color={ink} stroke={g === 'exchange' ? 2.4 : 2.2}/></button>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── V12 · Cyberpunk Neon ────────────────────────────────────
function PP_Cyberpunk() {
  const [mode, setMode] = React.useState('expense');
  const bg = '#0A0014';
  const ink = '#FFFFFF', ink2 = '#FF89D8', ink3 = '#7A4878';
  const neon = '#FF2A87', neonSoft = 'rgba(255,42,135,0.22)';
  const purple = '#9E3DFF';
  const hairline = 'rgba(255,255,255,0.10)';
  const mono = '"JetBrains Mono", "Courier New", monospace';
  const sans = '"Helvetica Neue", sans-serif';

  const cats = [
    { id: 'food', title: 'FOOD.exe', iconId: 13, total: '-1,425.00', expanded: true },
    { id: 'shop', title: 'BUY.app', iconId: 28, total: '-1,290.00', expanded: false },
    { id: 'trans', title: 'MOVE.sys', iconId: 23, total: '-60.00', expanded: false },
  ];
  const items_food = [
    { date: '05.02', note: '路易莎咖啡', acc: 'CTBC', amount: '-185.00' },
    { date: '05.02', note: '便當', acc: 'Cash', amount: '-120.00' },
    { date: '05.01', note: '居酒屋', acc: 'CTBC', amount: '-780.00' },
  ];
  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', background: bg, color: ink, fontFamily: sans }}>
      {/* 霓虹光暈 */}
      <div style={{ position: 'absolute', top: 100, left: -40, width: 200, height: 200,
        background: `radial-gradient(circle, ${neon} 0%, transparent 70%)`, opacity: 0.25, pointerEvents: 'none' }}/>
      <div style={{ position: 'absolute', top: 360, right: -30, width: 220, height: 220,
        background: `radial-gradient(circle, ${purple} 0%, transparent 70%)`, opacity: 0.22, pointerEvents: 'none' }}/>
      <div style={{ position: 'absolute', inset: 0, overflowY: 'auto', overflowX: 'hidden', paddingBottom: 140 }}>
        <div style={{ paddingTop: 56, paddingBottom: 10, paddingLeft: 20, paddingRight: 20,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          borderBottom: `1px solid ${neon}` }}>
          <button style={{ width: 32, height: 32, border: 'none', background: 'transparent', cursor: 'pointer' }}>
            <Glyph name="filter" size={20} color={neon} stroke={1.2}/></button>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontFamily: mono, fontSize: 14, color: neon, letterSpacing: 4, textShadow: `0 0 12px ${neon}` }}>SUSUGIGI//</div>
            <div style={{ fontFamily: mono, fontSize: 8, color: ink3, letterSpacing: 2, marginTop: 1 }}>NET.LEDGER · v.5.26</div>
          </div>
          <div style={{ display: 'flex', gap: 4 }}>
            <button style={{ width: 32, height: 32, border: 'none', background: 'transparent', cursor: 'pointer' }}>
              <Glyph name="search" size={20} color={neon} stroke={1.2}/></button>
            <button style={{ width: 32, height: 32, border: 'none', background: 'transparent', cursor: 'pointer' }}>
              <Glyph name="gear" size={20} color={neon} stroke={1.2}/></button>
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', paddingTop: 12, paddingBottom: 6 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <Glyph name="chevron-left" size={14} color={ink3}/>
            <span style={{ fontFamily: mono, fontSize: 12, color: neon, letterSpacing: 3, textShadow: `0 0 8px ${neon}` }}>[ MAY 2026 ]</span>
            <Glyph name="chevron-right" size={14} color={ink3}/>
          </div>
        </div>
        <div style={{ textAlign: 'center', paddingTop: 16, paddingBottom: 10 }}>
          <div style={{ fontFamily: mono, fontSize: 10, color: ink3, letterSpacing: 3, marginBottom: 6 }}>{'>>'} BALANCE</div>
          <div style={{ fontFamily: mono, fontSize: 40, color: ink, fontVariantNumeric: 'tabular-nums',
            letterSpacing: -0.8, textShadow: `0 0 16px ${neon}, 0 0 32px ${neonSoft}` }}>184,295</div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: 8, marginBottom: 18 }}>
          <div style={{ width: 240, height: 240, borderRadius: '50%',
            border: `1px solid ${neon}`,
            boxShadow: `0 0 24px ${neonSoft}, inset 0 0 12px ${neonSoft}`,
            display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <DonutChart data={[
              { key: 'a', value: 38, color: neon },
              { key: 'b', value: 22, color: purple },
              { key: 'c', value: 18, color: '#5C2870' },
              { key: 'd', value: 12, color: '#3A1448' },
              { key: 'e', value: 10, color: '#22082A' },
            ]} size={210} outerRadius={86} innerRadius={70} cornerRadius={1}>
              <div style={{ textAlign: 'center', width: 100 }}>
                <div style={{ fontFamily: mono, fontSize: 9, color: neon, letterSpacing: 3 }}>OUT//</div>
                <div style={{ fontFamily: mono, fontSize: 18, color: ink, fontVariantNumeric: 'tabular-nums' }}>5,985.00</div>
              </div>
            </DonutChart>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 8, paddingLeft: 20, paddingRight: 20, paddingBottom: 16 }}>
          {[{ kind: 'expense', amount: '5,985.00', label: 'OUT' }, { kind: 'income', amount: '68,000.00', label: 'IN' }].map(c => {
            const active = c.kind === mode;
            return (
              <button key={c.kind} onClick={() => setMode(c.kind)} style={{
                flex: 1, display: 'flex', flexDirection: 'column', gap: 2,
                paddingTop: 10, paddingBottom: 10, paddingLeft: 12, paddingRight: 12,
                background: active ? neonSoft : 'transparent',
                border: active ? `1px solid ${neon}` : `1px solid ${hairline}`,
                borderRadius: 0, fontFamily: 'inherit', cursor: active ? 'default' : 'pointer', textAlign: 'left',
                boxShadow: active ? `0 0 12px ${neonSoft}` : 'none',
              }}>
                <span style={{ fontFamily: mono, fontSize: 9, color: active ? neon : ink3, letterSpacing: 3 }}>[{c.label}]</span>
                <span style={{ fontFamily: mono, fontSize: 18, color: active ? ink : ink3, fontVariantNumeric: 'tabular-nums' }}>${c.amount}</span>
              </button>
            );
          })}
        </div>
        <div style={{ marginLeft: 20, marginRight: 20, border: `1px solid ${neon}`, boxShadow: `0 0 16px ${neonSoft}` }}>
          {cats.map((c, idx) => (
            <React.Fragment key={c.id}>
              <div style={{ paddingLeft: 12, paddingRight: 12,
                paddingTop: c.expanded ? 12 : 9, paddingBottom: c.expanded ? 12 : 9,
                display: 'flex', alignItems: 'center', gap: 10,
                borderTop: idx === 0 ? 'none' : `1px solid ${hairline}`,
                background: c.expanded ? neonSoft : 'transparent' }}>
                <div style={{ width: 12, transform: `rotate(${c.expanded ? 90 : 0}deg)` }}>
                  <Glyph name="chevron-right" size={10} color={neon}/></div>
                <div style={{ width: 28, height: 28, border: `1px solid ${neon}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <DynamicIconById iconId={c.iconId} size={14} color={neon}/></div>
                <span style={{ flex: 1, fontFamily: mono, fontSize: c.expanded ? 13 : 12, color: ink, letterSpacing: 2 }}>{c.title}</span>
                <span style={{ fontFamily: mono, fontSize: c.expanded ? 14 : 13, color: ink, fontVariantNumeric: 'tabular-nums' }}>{c.total}</span>
              </div>
              {c.expanded && items_food.map((tx, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10,
                  paddingLeft: 38, paddingRight: 12, paddingTop: 8, paddingBottom: 8,
                  borderTop: `1px dashed ${hairline}` }}>
                  <span style={{ fontFamily: mono, fontSize: 10, color: neon, width: 40 }}>{tx.date}</span>
                  <span style={{ flex: 1, fontFamily: sans, fontSize: 13, color: ink, minWidth: 0,
                    whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{tx.note}</span>
                  <span style={{ fontFamily: mono, fontSize: 9, color: ink3, width: 32 }}>{tx.acc}</span>
                  <span style={{ fontFamily: mono, fontSize: 13, color: ink, fontVariantNumeric: 'tabular-nums' }}>{tx.amount}</span>
                </div>
              ))}
            </React.Fragment>
          ))}
        </div>
      </div>
      <div style={{ position: 'absolute', bottom: 24, left: 0, right: 0, display: 'flex', justifyContent: 'center', zIndex: 10, pointerEvents: 'none' }}>
        <div style={{ width: 220, height: 60, background: 'rgba(10,0,20,0.85)',
          backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)',
          border: `1px solid ${neon}`,
          boxShadow: `0 0 28px ${neon}, 0 0 56px ${neonSoft}`,
          pointerEvents: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'space-around', paddingLeft: 8, paddingRight: 8 }}>
          {['minus', 'exchange', 'plus'].map((g, i) => (
            <button key={i} style={{ width: 56, height: 50, border: 'none', background: 'transparent', cursor: 'pointer',
              borderRight: i < 2 ? `1px dashed ${hairline}` : 'none',
              display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Glyph name={g} size={22} color={neon} stroke={g === 'exchange' ? 1.6 : 1.4}/></button>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── V13 · Pixel Retro Game ──────────────────────────────────
function PP_Pixel() {
  const [mode, setMode] = React.useState('expense');
  const bg = '#0E1429';
  const ink = '#00F77A', ink2 = '#88D9A8', ink3 = '#3D6E54';
  const red = '#FF4747', redSoft = 'rgba(255,71,71,0.22)';
  const hairline = 'rgba(0,247,122,0.20)';
  const mono = '"Press Start 2P", "VT323", "Courier New", monospace';

  const cats = [
    { id: 'food', title: 'FOOD', iconId: 13, total: '-1425', expanded: true, hp: '20/30' },
    { id: 'shop', title: 'SHOP', iconId: 28, total: '-1290', expanded: false, hp: '14/30' },
    { id: 'trans', title: 'MOVE', iconId: 23, total: '-60', expanded: false, hp: '29/30' },
  ];
  const items_food = [
    { date: '05/02', note: 'LOUISA', acc: 'CTBC', amount: '-185' },
    { date: '05/02', note: 'BENTO', acc: 'CASH', amount: '-120' },
    { date: '05/01', note: 'IZAKAYA', acc: 'CTBC', amount: '-780' },
  ];
  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', background: bg, color: ink, fontFamily: mono }}>
      {/* CRT scanlines */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage: 'linear-gradient(rgba(0,247,122,0.06) 50%, transparent 50%)', backgroundSize: '100% 4px', opacity: 0.4 }}/>
      <div style={{ position: 'absolute', inset: 0, overflowY: 'auto', overflowX: 'hidden', paddingBottom: 140 }}>
        <div style={{ paddingTop: 56, paddingBottom: 10, paddingLeft: 16, paddingRight: 16,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          borderBottom: `3px solid ${ink}` }}>
          <button style={{ width: 32, height: 32, border: `2px solid ${ink}`, background: bg, cursor: 'pointer' }}>
            <Glyph name="filter" size={16} color={ink} stroke={2.4}/></button>
          <div style={{ fontFamily: mono, fontSize: 13, color: ink, letterSpacing: 2 }}>★ SUSUGIGI ★</div>
          <div style={{ display: 'flex', gap: 4 }}>
            <button style={{ width: 32, height: 32, border: `2px solid ${ink}`, background: bg, cursor: 'pointer' }}>
              <Glyph name="search" size={16} color={ink} stroke={2.4}/></button>
            <button style={{ width: 32, height: 32, border: `2px solid ${ink}`, background: bg, cursor: 'pointer' }}>
              <Glyph name="gear" size={16} color={ink} stroke={2.4}/></button>
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', paddingLeft: 16, paddingRight: 16, paddingTop: 12, paddingBottom: 4 }}>
          <span style={{ fontSize: 10, color: red, letterSpacing: 1 }}>►MAY 2026</span>
          <span style={{ fontSize: 10, color: ink3, letterSpacing: 1 }}>LV.5 ⚙</span>
        </div>
        <div style={{ paddingLeft: 16, paddingRight: 16, paddingTop: 12, paddingBottom: 8 }}>
          <div style={{ fontSize: 9, color: red, letterSpacing: 2, marginBottom: 6 }}>♦ COIN BALANCE ♦</div>
          <div style={{ fontSize: 30, color: ink, fontVariantNumeric: 'tabular-nums', letterSpacing: 1,
            textShadow: `2px 2px 0 ${red}` }}>$ 184,295</div>
          <div style={{ marginTop: 8, height: 8, border: `2px solid ${ink}`, position: 'relative' }}>
            <div style={{ position: 'absolute', inset: 1, background: ink, width: '68%' }}/>
          </div>
          <div style={{ fontSize: 8, color: ink2, marginTop: 4, letterSpacing: 1 }}>HP 68% · BUDGET REMAINING</div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: 12, marginBottom: 16 }}>
          <div style={{ width: 200, height: 200, border: `4px solid ${ink}`,
            display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
            <DonutChart data={[
              { key: 'a', value: 38, color: ink },
              { key: 'b', value: 22, color: red },
              { key: 'c', value: 18, color: ink2 },
              { key: 'd', value: 12, color: ink3 },
              { key: 'e', value: 10, color: '#1A2D40' },
            ]} size={172} outerRadius={70} innerRadius={42} cornerRadius={0} padAngleDeg={3}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 8, color: red, letterSpacing: 2 }}>SPENT</div>
                <div style={{ fontSize: 14, color: ink, fontVariantNumeric: 'tabular-nums' }}>5985</div>
              </div>
            </DonutChart>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 8, paddingLeft: 16, paddingRight: 16, paddingBottom: 16 }}>
          {[{ kind: 'expense', amount: '5985', label: 'OUT' }, { kind: 'income', amount: '68000', label: 'IN' }].map(c => {
            const active = c.kind === mode;
            return (
              <button key={c.kind} onClick={() => setMode(c.kind)} style={{
                flex: 1, display: 'flex', flexDirection: 'column', gap: 2,
                paddingTop: 10, paddingBottom: 10, paddingLeft: 12, paddingRight: 12,
                background: active ? ink : 'transparent', color: active ? bg : ink,
                border: `3px solid ${ink}`, cursor: active ? 'default' : 'pointer',
                fontFamily: 'inherit', textAlign: 'left',
              }}>
                <span style={{ fontSize: 8, letterSpacing: 2, color: active ? red : ink2 }}>►{c.label}</span>
                <span style={{ fontSize: 17, fontVariantNumeric: 'tabular-nums', letterSpacing: 1 }}>${c.amount}</span>
              </button>
            );
          })}
        </div>
        <div style={{ paddingLeft: 16, paddingRight: 16 }}>
          {cats.map(c => (
            <div key={c.id} style={{ marginBottom: 10,
              background: 'transparent', border: `3px solid ${ink}` }}>
              <div style={{ paddingLeft: 10, paddingRight: 12,
                paddingTop: c.expanded ? 11 : 8, paddingBottom: c.expanded ? 11 : 8,
                display: 'flex', alignItems: 'center', gap: 8,
                background: c.expanded ? ink : 'transparent', color: c.expanded ? bg : ink }}>
                <span style={{ fontSize: 11 }}>{c.expanded ? '▼' : '►'}</span>
                <div style={{ width: 26, height: 26, background: c.expanded ? bg : ink,
                  display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <DynamicIconById iconId={c.iconId} size={12} color={c.expanded ? ink : bg}/></div>
                <span style={{ flex: 1, fontSize: c.expanded ? 11 : 10, letterSpacing: 2 }}>{c.title} ·{c.hp}</span>
                <span style={{ fontSize: c.expanded ? 13 : 11, fontVariantNumeric: 'tabular-nums', letterSpacing: 1 }}>${c.total}</span>
              </div>
              {c.expanded && items_food.map((tx, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10,
                  paddingLeft: 12, paddingRight: 12, paddingTop: 8, paddingBottom: 8,
                  borderTop: i === 0 ? `2px solid ${ink}` : `1px dashed ${hairline}` }}>
                  <span style={{ fontSize: 9, color: red, width: 40, fontVariantNumeric: 'tabular-nums' }}>{tx.date}</span>
                  <span style={{ flex: 1, fontSize: 11, color: ink, letterSpacing: 1,
                    whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{tx.note}</span>
                  <span style={{ fontSize: 9, color: ink3, width: 32, letterSpacing: 1 }}>{tx.acc}</span>
                  <span style={{ fontSize: 11, color: ink, fontVariantNumeric: 'tabular-nums', letterSpacing: 1 }}>${tx.amount}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
      <div style={{ position: 'absolute', bottom: 20, left: 0, right: 0, display: 'flex', justifyContent: 'center', zIndex: 10, pointerEvents: 'none' }}>
        <div style={{ width: 240, height: 56, background: bg,
          border: `4px solid ${ink}`, boxShadow: `4px 4px 0 ${red}`,
          pointerEvents: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'space-around' }}>
          {[{ g: 'minus', l: 'A' }, { g: 'exchange', l: 'B' }, { g: 'plus', l: 'X' }].map((b, i) => (
            <button key={i} style={{ width: 70, height: 48, border: 'none', background: 'transparent', cursor: 'pointer',
              borderRight: i < 2 ? `2px solid ${ink}` : 'none',
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
              <Glyph name={b.g} size={18} color={ink} stroke={b.g === 'exchange' ? 2.4 : 2.2}/>
              <span style={{ fontSize: 8, color: red, letterSpacing: 1 }}>[{b.l}]</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── V14 · Memphis 80s ───────────────────────────────────────
function PP_Memphis() {
  const [mode, setMode] = React.useState('expense');
  const bg = '#F4F0E8', surface = '#FFFFFF';
  const ink = '#1A1A1A', ink2 = '#5A5A5A', ink3 = '#9A9A9A';
  const coral = '#FF7A5C', coralSoft = 'rgba(255,122,92,0.16)';
  const hairline = 'rgba(26,26,26,0.12)';
  const sans = '"Helvetica Neue", "Avenir Next", sans-serif';

  const cats = [
    { id: 'food', title: '飲食', iconId: 13, total: '−NT$1,425', expanded: true, shape: 'squiggle' },
    { id: 'shop', title: '購物', iconId: 28, total: '−NT$1,290', expanded: false, shape: 'dots' },
    { id: 'trans', title: '交通', iconId: 23, total: '−NT$60', expanded: false, shape: 'cross' },
  ];
  const items_food = [
    { date: '5/2', note: '路易莎咖啡', acc: '國泰世華 信用卡', amount: '−NT$185' },
    { date: '5/2', note: '便當', acc: '現金', amount: '−NT$120' },
    { date: '5/1', note: '居酒屋', acc: '國泰世華 信用卡', amount: '−NT$780' },
  ];
  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', background: bg, color: ink, fontFamily: sans }}>
      {/* Memphis confetti 裝飾 */}
      <svg width="100%" height="100%" style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
        {/* squiggle */}
        <path d="M30 150 Q40 140 50 150 T70 150 T90 150" stroke={ink} strokeWidth="2" fill="none"/>
        <path d="M310 280 Q320 270 330 280 T350 280" stroke={coral} strokeWidth="2.5" fill="none"/>
        {/* dots */}
        <circle cx="350" cy="120" r="3" fill={coral}/>
        <circle cx="362" cy="130" r="3" fill={ink}/>
        <circle cx="350" cy="142" r="3" fill={coral}/>
        <circle cx="50" cy="430" r="3" fill={ink}/>
        <circle cx="62" cy="440" r="3" fill={coral}/>
        <circle cx="50" cy="452" r="3" fill={ink}/>
        {/* triangles */}
        <polygon points="340,500 350,490 360,500" fill={ink}/>
        <polygon points="60,700 70,690 80,700" fill={coral}/>
        {/* cross */}
        <line x1="20" y1="610" x2="34" y2="624" stroke={ink} strokeWidth="2.5"/>
        <line x1="20" y1="624" x2="34" y2="610" stroke={ink} strokeWidth="2.5"/>
        <line x1="370" y1="700" x2="382" y2="712" stroke={coral} strokeWidth="2.5"/>
        <line x1="370" y1="712" x2="382" y2="700" stroke={coral} strokeWidth="2.5"/>
      </svg>
      <div style={{ position: 'absolute', inset: 0, overflowY: 'auto', overflowX: 'hidden', paddingBottom: 140 }}>
        <div style={{ paddingTop: 56, paddingBottom: 8, paddingLeft: 20, paddingRight: 20,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <button style={{ width: 36, height: 36, border: 'none', background: 'transparent', cursor: 'pointer' }}>
            <Glyph name="filter" size={20} color={ink}/></button>
          <div style={{ fontSize: 20, fontWeight: 900, color: ink, letterSpacing: -0.6, fontStyle: 'italic' }}>SuSuGiGi!</div>
          <div style={{ display: 'flex', gap: 4 }}>
            <button style={{ width: 36, height: 36, border: 'none', background: 'transparent', cursor: 'pointer' }}>
              <Glyph name="search" size={20} color={ink}/></button>
            <button style={{ width: 36, height: 36, border: 'none', background: 'transparent', cursor: 'pointer' }}>
              <Glyph name="gear" size={20} color={ink}/></button>
          </div>
        </div>
        <div style={{ paddingLeft: 20, paddingRight: 20, paddingTop: 12, paddingBottom: 6 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, transform: 'rotate(-1deg)', display: 'inline-flex' }}>
            <Glyph name="chevron-left" size={14} color={ink2}/>
            <span style={{ fontSize: 13, fontWeight: 800, letterSpacing: 4, color: ink }}>MAY · 2026</span>
            <Glyph name="chevron-right" size={14} color={ink2}/>
          </div>
        </div>
        <div style={{ paddingLeft: 20, paddingRight: 20, paddingTop: 12, paddingBottom: 14, position: 'relative' }}>
          <div style={{ display: 'inline-block', background: coral, color: bg,
            paddingLeft: 8, paddingRight: 8, paddingTop: 2, paddingBottom: 2,
            fontSize: 10, fontWeight: 900, letterSpacing: 3, transform: 'rotate(-3deg)' }}>BALANCE!</div>
          <div style={{ fontSize: 52, fontWeight: 900, color: ink, fontVariantNumeric: 'tabular-nums',
            letterSpacing: -2, lineHeight: 0.95, marginTop: 8 }}>NT$184,295</div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: 8, marginBottom: 16 }}>
          <div style={{ width: 230, height: 230, borderRadius: '50%',
            background: surface, border: `3px solid ${ink}`,
            boxShadow: `5px 5px 0 ${coral}`,
            display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <DonutChart data={[
              { key: 'a', value: 38, color: ink },
              { key: 'b', value: 22, color: coral },
              { key: 'c', value: 18, color: '#5A5A5A' },
              { key: 'd', value: 12, color: '#9A9A9A' },
              { key: 'e', value: 10, color: '#D5D5D5' },
            ]} size={196} outerRadius={82} innerRadius={56} cornerRadius={1} padAngleDeg={2}>
              <div style={{ textAlign: 'center', width: 100 }}>
                <div style={{ fontSize: 10, color: coral, letterSpacing: 3, fontWeight: 900 }}>OUT</div>
                <div style={{ fontSize: 22, fontWeight: 900, color: ink, fontVariantNumeric: 'tabular-nums', letterSpacing: -0.8 }}>5,985</div>
              </div>
            </DonutChart>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 10, paddingLeft: 20, paddingRight: 20, paddingBottom: 16 }}>
          {[{ kind: 'expense', amount: '5,985', label: 'OUT', rot: -1 }, { kind: 'income', amount: '68,000', label: 'IN', rot: 1 }].map(c => {
            const active = c.kind === mode;
            return (
              <button key={c.kind} onClick={() => setMode(c.kind)} style={{
                flex: 1, display: 'flex', flexDirection: 'column', gap: 2,
                paddingTop: 12, paddingBottom: 12, paddingLeft: 14, paddingRight: 14,
                background: active ? ink : surface, color: active ? bg : ink,
                border: `3px solid ${ink}`, cursor: active ? 'default' : 'pointer', fontFamily: 'inherit',
                boxShadow: active ? `3px 3px 0 ${coral}` : `2px 2px 0 ${ink}`,
                transform: `rotate(${c.rot}deg)`, textAlign: 'left',
              }}>
                <span style={{ fontSize: 10, letterSpacing: 3, fontWeight: 900, color: active ? coral : ink2 }}>{c.label}!</span>
                <span style={{ fontSize: 22, fontWeight: 900, fontVariantNumeric: 'tabular-nums', letterSpacing: -0.6 }}>NT${c.amount}</span>
              </button>
            );
          })}
        </div>
        <div style={{ paddingLeft: 20, paddingRight: 20 }}>
          {cats.map((c, idx) => (
            <div key={c.id} style={{ marginBottom: 12, background: surface, border: `2.5px solid ${ink}`,
              boxShadow: c.expanded ? `4px 4px 0 ${coral}` : `2.5px 2.5px 0 ${ink}`,
              transform: `rotate(${idx % 2 === 0 ? -0.4 : 0.4}deg)` }}>
              <div style={{ paddingLeft: 12, paddingRight: 16,
                paddingTop: c.expanded ? 13 : 10, paddingBottom: c.expanded ? 13 : 10,
                display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, flex: 1 }}>
                  <div style={{ width: 14, transform: `rotate(${c.expanded ? 90 : 0}deg)` }}>
                    <Glyph name="chevron-right" size={12} color={ink} stroke={3}/></div>
                  <div style={{ width: 32, height: 32, background: coral, border: `2px solid ${ink}`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    transform: 'rotate(-3deg)' }}>
                    <DynamicIconById iconId={c.iconId} size={16} color={ink}/></div>
                  <span style={{ fontSize: c.expanded ? 17 : 15, fontWeight: 900, color: ink, letterSpacing: -0.3, fontStyle: 'italic' }}>{c.title}</span>
                </div>
                <span style={{ fontSize: c.expanded ? 16 : 14, fontWeight: 900, color: ink, fontVariantNumeric: 'tabular-nums' }}>{c.total}</span>
              </div>
              {c.expanded && items_food.map((tx, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12,
                  paddingLeft: 16, paddingRight: 16, paddingTop: 10, paddingBottom: 10,
                  borderTop: i === 0 ? `1.5px solid ${ink}` : `1px dashed ${ink2}` }}>
                  <span style={{ fontSize: 11, fontWeight: 900, color: coral, fontVariantNumeric: 'tabular-nums', width: 36 }}>{tx.date}</span>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 14, fontWeight: 700, color: ink, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{tx.note}</div>
                    <div style={{ fontSize: 10, color: ink2, letterSpacing: 1, fontWeight: 700 }}>{tx.acc}</div>
                  </div>
                  <span style={{ fontSize: 15, fontWeight: 900, color: ink, fontVariantNumeric: 'tabular-nums' }}>{tx.amount}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
      <div style={{ position: 'absolute', bottom: 24, left: 0, right: 0, display: 'flex', justifyContent: 'center', zIndex: 10, pointerEvents: 'none' }}>
        <div style={{ width: 232, height: 68, background: surface,
          border: `3px solid ${ink}`, boxShadow: `5px 5px 0 ${coral}`,
          pointerEvents: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'space-around', paddingLeft: 8, paddingRight: 8 }}>
          {['minus', 'exchange', 'plus'].map((g, i) => (
            <button key={i} style={{ width: 60, height: 56, border: 'none', background: 'transparent', cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              borderRight: i < 2 ? `1.5px solid ${ink}` : 'none' }}>
              <Glyph name={g} size={24} color={i === 1 ? coral : ink} stroke={g === 'exchange' ? 2.8 : 2.6}/></button>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── V15 · Bauhaus Modernist ─────────────────────────────────
function PP_Bauhaus() {
  const [mode, setMode] = React.useState('expense');
  const bg = '#F0EDE5';
  const ink = '#0A0A0A', ink2 = '#3A3A3A', ink3 = '#7A7A7A';
  const red = '#E52E26', redSoft = 'rgba(229,46,38,0.14)';
  const yellow = '#F0C03B';
  const blue = '#1E59C9';
  const hairline = 'rgba(10,10,10,0.12)';
  const sans = '"Futura", "Avenir Next", "Helvetica Neue", sans-serif';

  const cats = [
    { id: 'food', title: '飲食 DINING', iconId: 13, total: '−NT$1,425', expanded: true, shape: 'circle', color: red },
    { id: 'shop', title: '購物 SHOPPING', iconId: 28, total: '−NT$1,290', expanded: false, shape: 'square', color: yellow },
    { id: 'trans', title: '交通 TRANSIT', iconId: 23, total: '−NT$60', expanded: false, shape: 'triangle', color: blue },
  ];
  const items_food = [
    { date: '5/2', note: '路易莎咖啡', acc: '國泰世華 信用卡', amount: '−NT$185' },
    { date: '5/2', note: '便當', acc: '現金', amount: '−NT$120' },
    { date: '5/1', note: '居酒屋', acc: '國泰世華 信用卡', amount: '−NT$780' },
  ];
  const Shape = ({ kind, size = 28, color }) => {
    if (kind === 'circle') return <svg width={size} height={size} viewBox="0 0 28 28"><circle cx="14" cy="14" r="12" fill={color}/></svg>;
    if (kind === 'square') return <svg width={size} height={size} viewBox="0 0 28 28"><rect x="2" y="2" width="24" height="24" fill={color}/></svg>;
    if (kind === 'triangle') return <svg width={size} height={size} viewBox="0 0 28 28"><polygon points="14,2 26,24 2,24" fill={color}/></svg>;
    return null;
  };
  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', background: bg, color: ink, fontFamily: sans }}>
      <div style={{ position: 'absolute', inset: 0, overflowY: 'auto', overflowX: 'hidden', paddingBottom: 140 }}>
        <div style={{ paddingTop: 56, paddingBottom: 10, paddingLeft: 20, paddingRight: 20,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          borderBottom: `2px solid ${ink}` }}>
          <button style={{ width: 36, height: 36, border: 'none', background: 'transparent', cursor: 'pointer' }}>
            <Glyph name="filter" size={20} color={ink} stroke={1.4}/></button>
          <div style={{ fontSize: 18, fontWeight: 500, letterSpacing: 5, color: ink }}>SUSUGIGI</div>
          <div style={{ display: 'flex', gap: 4 }}>
            <button style={{ width: 36, height: 36, border: 'none', background: 'transparent', cursor: 'pointer' }}>
              <Glyph name="search" size={20} color={ink} stroke={1.4}/></button>
            <button style={{ width: 36, height: 36, border: 'none', background: 'transparent', cursor: 'pointer' }}>
              <Glyph name="gear" size={20} color={ink} stroke={1.4}/></button>
          </div>
        </div>
        {/* 三原色 + 三幾何 banner */}
        <div style={{ display: 'flex', height: 32, borderBottom: `2px solid ${ink}` }}>
          <div style={{ flex: 1, background: red, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Shape kind="circle" size={20} color={ink}/></div>
          <div style={{ flex: 1, background: yellow, display: 'flex', alignItems: 'center', justifyContent: 'center', borderLeft: `2px solid ${ink}`, borderRight: `2px solid ${ink}` }}>
            <Shape kind="square" size={18} color={ink}/></div>
          <div style={{ flex: 1, background: blue, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Shape kind="triangle" size={20} color={ink}/></div>
        </div>
        <div style={{ paddingLeft: 20, paddingRight: 20, paddingTop: 12, paddingBottom: 4 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <Glyph name="chevron-left" size={14} color={ink2}/>
            <span style={{ fontSize: 12, fontWeight: 500, letterSpacing: 5, color: ink }}>MAY · 2026</span>
            <Glyph name="chevron-right" size={14} color={ink2}/>
          </div>
        </div>
        <div style={{ paddingLeft: 20, paddingRight: 20, paddingTop: 14, paddingBottom: 12 }}>
          <div style={{ fontSize: 10, color: ink2, letterSpacing: 4, fontWeight: 500, marginBottom: 4 }}>BALANCE</div>
          <div style={{ fontSize: 48, fontWeight: 500, color: ink, fontVariantNumeric: 'tabular-nums', letterSpacing: -1.5, lineHeight: 1 }}>NT$184,295</div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: 6, marginBottom: 18 }}>
          <div style={{ width: 232, height: 232, borderRadius: '50%',
            background: bg, border: `2px solid ${ink}`,
            display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <DonutChart data={[
              { key: 'a', value: 38, color: red },
              { key: 'b', value: 22, color: yellow },
              { key: 'c', value: 18, color: blue },
              { key: 'd', value: 12, color: ink },
              { key: 'e', value: 10, color: '#9A9A9A' },
            ]} size={200} outerRadius={82} innerRadius={52} cornerRadius={0} padAngleDeg={3}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 10, color: ink2, letterSpacing: 3, fontWeight: 500 }}>OUT</div>
                <div style={{ fontSize: 22, fontWeight: 500, color: ink, fontVariantNumeric: 'tabular-nums' }}>5,985</div>
              </div>
            </DonutChart>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 0, paddingLeft: 20, paddingRight: 20, paddingBottom: 16 }}>
          {[{ kind: 'expense', amount: 'NT$ 5,985', label: 'OUT', col: red }, { kind: 'income', amount: 'NT$ 68,000', label: 'IN', col: blue }].map((c, idx) => {
            const active = c.kind === mode;
            return (
              <button key={c.kind} onClick={() => setMode(c.kind)} style={{
                flex: 1, display: 'flex', flexDirection: 'column', gap: 4,
                paddingTop: 12, paddingBottom: 12, paddingLeft: 14, paddingRight: 14,
                background: active ? c.col : 'transparent',
                color: active ? bg : ink,
                border: `2px solid ${ink}`, borderLeft: idx > 0 ? 'none' : `2px solid ${ink}`,
                cursor: active ? 'default' : 'pointer', fontFamily: 'inherit', textAlign: 'left',
              }}>
                <span style={{ fontSize: 10, letterSpacing: 3, fontWeight: 700 }}>{c.label}</span>
                <span style={{ fontSize: 20, fontWeight: 500, fontVariantNumeric: 'tabular-nums', letterSpacing: -0.4 }}>{c.amount}</span>
              </button>
            );
          })}
        </div>
        <div style={{ paddingLeft: 20, paddingRight: 20 }}>
          {cats.map(c => (
            <div key={c.id} style={{ marginBottom: 10, background: bg, border: `2px solid ${ink}` }}>
              <div style={{ paddingLeft: 12, paddingRight: 16,
                paddingTop: c.expanded ? 12 : 10, paddingBottom: c.expanded ? 12 : 10,
                display: 'flex', alignItems: 'center', gap: 10,
                background: c.expanded ? c.color : bg, color: c.expanded ? ink : ink,
                borderBottom: c.expanded ? `2px solid ${ink}` : 'none' }}>
                <div style={{ width: 14, transform: `rotate(${c.expanded ? 90 : 0}deg)` }}>
                  <Glyph name="chevron-right" size={12} color={ink} stroke={2}/></div>
                <Shape kind={c.shape} size={28} color={c.expanded ? ink : c.color}/>
                <span style={{ flex: 1, fontSize: c.expanded ? 14 : 13, fontWeight: 500, color: ink, letterSpacing: 1 }}>{c.title}</span>
                <span style={{ fontSize: c.expanded ? 14 : 13, fontWeight: 500, color: ink, fontVariantNumeric: 'tabular-nums' }}>{c.total}</span>
              </div>
              {c.expanded && items_food.map((tx, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12,
                  paddingLeft: 16, paddingRight: 16, paddingTop: 10, paddingBottom: 10,
                  borderTop: i === 0 ? 'none' : `1px solid ${hairline}` }}>
                  <span style={{ fontSize: 11, fontWeight: 500, color: ink2, fontVariantNumeric: 'tabular-nums', width: 32, letterSpacing: 1 }}>{tx.date}</span>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 14, color: ink, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{tx.note}</div>
                    <div style={{ fontSize: 10, color: ink2, letterSpacing: 1 }}>{tx.acc}</div>
                  </div>
                  <span style={{ fontSize: 14, color: ink, fontVariantNumeric: 'tabular-nums', letterSpacing: -0.2 }}>{tx.amount}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
      <div style={{ position: 'absolute', bottom: 24, left: 0, right: 0, display: 'flex', justifyContent: 'center', zIndex: 10, pointerEvents: 'none' }}>
        <div style={{ width: 240, height: 64, display: 'flex',
          border: `2px solid ${ink}`, background: bg,
          pointerEvents: 'auto' }}>
          {[
            { g: 'minus', col: red },
            { g: 'exchange', col: yellow },
            { g: 'plus', col: blue },
          ].map((b, i) => (
            <button key={i} style={{ flex: 1, height: '100%', border: 'none', background: b.col, cursor: 'pointer',
              borderRight: i < 2 ? `2px solid ${ink}` : 'none',
              display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Glyph name={b.g} size={22} color={ink} stroke={b.g === 'exchange' ? 2.4 : 2.2}/></button>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── V16 · Art Deco ──────────────────────────────────────────
function PP_ArtDeco() {
  const [mode, setMode] = React.useState('expense');
  const bg = '#16110A';
  const ink = '#F0E2C0', ink2 = '#C9A55C', ink3 = '#7A6238';
  const gold = '#C9A55C', goldSoft = 'rgba(201,165,92,0.20)';
  const hairline = 'rgba(201,165,92,0.24)';
  const serif = '"Didot", "Cochin", "Playfair Display", serif';

  const cats = [
    { id: 'food', title: 'DINING', sub: '飲食', iconId: 13, total: '−$1,425', expanded: true, num: 'I' },
    { id: 'shop', title: 'RETAIL', sub: '購物', iconId: 28, total: '−$1,290', expanded: false, num: 'II' },
    { id: 'trans', title: 'TRANSIT', sub: '交通', iconId: 23, total: '−$60', expanded: false, num: 'III' },
  ];
  const items_food = [
    { date: '5/2', note: 'Louisa Coffee', acc: 'CTBC', amount: '−$185' },
    { date: '5/2', note: 'Bento Box', acc: 'Cash', amount: '−$120' },
    { date: '5/1', note: 'Izakaya', acc: 'CTBC', amount: '−$780' },
  ];
  // 扇形 motif
  const Fan = ({ size = 36, color = gold }) => (
    <svg width={size} height={size} viewBox="0 0 36 36">
      <path d="M18 30 L4 14 A18 18 0 0 1 32 14 Z" fill="none" stroke={color} strokeWidth="0.8"/>
      <path d="M18 30 L10 16 A14 14 0 0 1 26 16 Z" fill="none" stroke={color} strokeWidth="0.8"/>
      <path d="M18 30 L14 18 A8 8 0 0 1 22 18 Z" fill="none" stroke={color} strokeWidth="0.8"/>
      <line x1="18" y1="30" x2="18" y2="4" stroke={color} strokeWidth="0.8"/>
    </svg>
  );
  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden',
      background: `radial-gradient(circle at 50% -20%, #2A1E10 0%, ${bg} 70%)`, color: ink, fontFamily: serif }}>
      <div style={{ position: 'absolute', inset: 0, overflowY: 'auto', overflowX: 'hidden', paddingBottom: 140 }}>
        <div style={{ paddingTop: 56, paddingBottom: 12, paddingLeft: 24, paddingRight: 24,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          borderBottom: `0.5px solid ${gold}` }}>
          <button style={{ width: 32, height: 32, border: 'none', background: 'transparent', cursor: 'pointer' }}>
            <Glyph name="filter" size={20} color={gold}/></button>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontFamily: serif, fontSize: 11, color: gold, letterSpacing: 5, marginBottom: 2 }}>◆ ◆ ◆</div>
            <div style={{ fontFamily: serif, fontSize: 18, fontWeight: 500, color: gold, letterSpacing: 5 }}>SUSUGIGI</div>
          </div>
          <div style={{ display: 'flex', gap: 4 }}>
            <button style={{ width: 32, height: 32, border: 'none', background: 'transparent', cursor: 'pointer' }}>
              <Glyph name="search" size={20} color={gold}/></button>
            <button style={{ width: 32, height: 32, border: 'none', background: 'transparent', cursor: 'pointer' }}>
              <Glyph name="gear" size={20} color={gold}/></button>
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 16, paddingTop: 14, paddingBottom: 6 }}>
          <Fan size={20} color={gold}/>
          <span style={{ fontFamily: serif, fontSize: 13, color: gold, letterSpacing: 4 }}>MAY · MMXXVI</span>
          <Fan size={20} color={gold}/>
        </div>
        <div style={{ textAlign: 'center', paddingTop: 14, paddingBottom: 8 }}>
          <div style={{ fontFamily: serif, fontSize: 11, color: ink3, letterSpacing: 4, marginBottom: 6 }}>BALANCE</div>
          <div style={{ fontFamily: serif, fontSize: 46, fontWeight: 400, color: ink, fontVariantNumeric: 'tabular-nums', letterSpacing: -1.2 }}>NT$184,295</div>
          <div style={{ width: 50, height: 1, background: gold, margin: '8px auto 0', opacity: 0.7 }}/>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: 12, marginBottom: 18, position: 'relative' }}>
          <div style={{ width: 250, height: 250, borderRadius: '50%',
            border: `0.5px solid ${gold}`, padding: 8,
            boxShadow: `0 0 32px ${goldSoft}, inset 0 0 12px ${goldSoft}`,
            display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ width: '100%', height: '100%', borderRadius: '50%',
              border: `0.5px solid ${gold}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <DonutChart data={[
                { key: 'a', value: 38, color: gold },
                { key: 'b', value: 22, color: '#9A7E40' },
                { key: 'c', value: 18, color: '#65512A' },
                { key: 'd', value: 12, color: '#3D311A' },
                { key: 'e', value: 10, color: '#221B0E' },
              ]} size={210} outerRadius={84} innerRadius={78} cornerRadius={1}>
                <div style={{ textAlign: 'center', width: 100 }}>
                  <div style={{ fontFamily: serif, fontSize: 9, color: gold, letterSpacing: 4 }}>EXPENSES</div>
                  <div style={{ fontFamily: serif, fontSize: 18, color: ink, fontVariantNumeric: 'tabular-nums' }}>NT$5,985</div>
                </div>
              </DonutChart>
            </div>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 10, paddingLeft: 24, paddingRight: 24, paddingBottom: 16 }}>
          {[{ kind: 'expense', amount: 'NT$ 5,985', label: 'EXPENSES' }, { kind: 'income', amount: 'NT$ 68,000', label: 'INCOME' }].map(c => {
            const active = c.kind === mode;
            return (
              <button key={c.kind} onClick={() => setMode(c.kind)} style={{
                flex: 1, display: 'flex', flexDirection: 'column', gap: 4,
                paddingTop: 12, paddingBottom: 12, paddingLeft: 14, paddingRight: 14,
                background: active ? goldSoft : 'transparent',
                border: `0.5px solid ${active ? gold : hairline}`,
                cursor: active ? 'default' : 'pointer', fontFamily: 'inherit', textAlign: 'left',
              }}>
                <span style={{ fontFamily: serif, fontSize: 9, letterSpacing: 4, color: active ? gold : ink3 }}>{c.label}</span>
                <span style={{ fontFamily: serif, fontSize: 20, color: active ? ink : ink3, fontVariantNumeric: 'tabular-nums', letterSpacing: -0.3 }}>{c.amount}</span>
              </button>
            );
          })}
        </div>
        <div style={{ paddingLeft: 24, paddingRight: 24 }}>
          {cats.map(c => (
            <div key={c.id} style={{
              borderTop: `0.5px solid ${gold}`, borderBottom: `0.5px solid ${gold}`,
              marginBottom: 0, position: 'relative',
              paddingTop: c.expanded ? 14 : 12, paddingBottom: c.expanded ? 14 : 12 }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 14, flex: 1 }}>
                  <div style={{ width: 12, transform: `rotate(${c.expanded ? 90 : 0}deg)` }}>
                    <Glyph name="chevron-right" size={10} color={gold}/></div>
                  <span style={{ fontFamily: serif, fontSize: 11, color: gold, letterSpacing: 3, width: 24 }}>{c.num}</span>
                  <div style={{ width: 30, height: 30, border: `0.5px solid ${gold}`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <DynamicIconById iconId={c.iconId} size={14} color={gold}/></div>
                  <div>
                    <div style={{ fontFamily: serif, fontSize: c.expanded ? 15 : 13, color: ink, letterSpacing: 2 }}>{c.title}</div>
                    <div style={{ fontFamily: serif, fontSize: 10, color: ink3, letterSpacing: 1 }}>{c.sub}</div>
                  </div>
                </div>
                <span style={{ fontFamily: serif, fontSize: c.expanded ? 16 : 14, color: gold, fontVariantNumeric: 'tabular-nums' }}>{c.total}</span>
              </div>
              {c.expanded && (
                <div style={{ marginTop: 12, paddingLeft: 50 }}>
                  {items_food.map((tx, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12,
                      paddingTop: 8, paddingBottom: 8,
                      borderTop: i === 0 ? 'none' : `0.5px solid ${hairline}` }}>
                      <span style={{ fontFamily: serif, fontSize: 12, color: gold, fontVariantNumeric: 'tabular-nums', width: 32 }}>{tx.date}</span>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontSize: 14, color: ink, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{tx.note}</div>
                        <div style={{ fontFamily: serif, fontSize: 9, color: ink3, letterSpacing: 2 }}>{tx.acc.toUpperCase()}</div>
                      </div>
                      <span style={{ fontFamily: serif, fontSize: 14, color: ink, fontVariantNumeric: 'tabular-nums' }}>{tx.amount}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      <div style={{ position: 'absolute', bottom: 24, left: 0, right: 0, display: 'flex', justifyContent: 'center', zIndex: 10, pointerEvents: 'none' }}>
        <div style={{ width: 220, height: 60,
          background: bg, border: `0.5px solid ${gold}`,
          boxShadow: `0 0 24px ${goldSoft}`,
          pointerEvents: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'space-around', paddingLeft: 8, paddingRight: 8 }}>
          {['minus', 'exchange', 'plus'].map((g, i) => (
            <button key={i} style={{ width: 56, height: 50, border: 'none', background: 'transparent', cursor: 'pointer',
              borderRight: i < 2 ? `0.5px solid ${gold}` : 'none',
              display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Glyph name={g} size={20} color={gold} stroke={g === 'exchange' ? 1.6 : 1.4}/></button>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── V17 · Vintage Map ───────────────────────────────────────
const MAP_GRID = "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='40' height='40'><path d='M40 0H0V40' fill='none' stroke='%234A2F18' stroke-width='0.3' stroke-opacity='0.15'/></svg>\")";

function PP_VintageMap() {
  const [mode, setMode] = React.useState('expense');
  const bg = '#EFE5CB';
  const ink = '#3D2410', ink2 = '#6F4A28', ink3 = '#A88556';
  const sepia = '#6F4A28';
  const ruby = '#B5302C', rubySoft = 'rgba(181,48,44,0.14)';
  const hairline = 'rgba(61,36,16,0.18)';
  const serif = '"Cochin", "Cormorant Garamond", "Georgia", serif';
  const mono = '"Courier New", "American Typewriter", monospace';

  const cats = [
    { id: 'food', title: '飲食', tag: 'N 25.04°', iconId: 13, total: '−$1,425', expanded: true },
    { id: 'shop', title: '購物', tag: 'N 25.05°', iconId: 28, total: '−$1,290', expanded: false },
    { id: 'trans', title: '交通', tag: 'E 121.55°', iconId: 23, total: '−$60', expanded: false },
  ];
  const items_food = [
    { date: '5/2', note: '路易莎咖啡', acc: 'CTBC', amount: '−$185' },
    { date: '5/2', note: '便當', acc: 'Cash', amount: '−$120' },
    { date: '5/1', note: '居酒屋', acc: 'CTBC', amount: '−$780' },
  ];
  // 羅盤
  const Compass = ({ size = 50 }) => (
    <svg width={size} height={size} viewBox="0 0 50 50">
      <circle cx="25" cy="25" r="22" fill="none" stroke={sepia} strokeWidth="0.8"/>
      <circle cx="25" cy="25" r="18" fill="none" stroke={sepia} strokeWidth="0.5"/>
      <polygon points="25,6 28,25 25,44 22,25" fill={ruby} stroke={sepia} strokeWidth="0.5"/>
      <line x1="25" y1="3" x2="25" y2="9" stroke={sepia} strokeWidth="1"/>
      <text x="25" y="14" textAnchor="middle" fontFamily="serif" fontSize="6" fill={sepia} fontWeight="600">N</text>
    </svg>
  );
  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden',
      background: bg, backgroundImage: MAP_GRID, color: ink, fontFamily: serif }}>
      {/* 等高線裝飾 */}
      <svg width="100%" height="100%" style={{ position: 'absolute', inset: 0, pointerEvents: 'none', opacity: 0.18 }}>
        <path d="M-20 200 Q100 180 200 220 T420 200" stroke={sepia} strokeWidth="0.6" fill="none"/>
        <path d="M-20 240 Q100 220 200 260 T420 240" stroke={sepia} strokeWidth="0.6" fill="none"/>
        <path d="M-20 280 Q100 260 200 300 T420 280" stroke={sepia} strokeWidth="0.6" fill="none"/>
        <path d="M-20 540 Q100 520 200 560 T420 540" stroke={sepia} strokeWidth="0.6" fill="none"/>
        <path d="M-20 580 Q100 560 200 600 T420 580" stroke={sepia} strokeWidth="0.6" fill="none"/>
      </svg>
      <div style={{ position: 'absolute', inset: 0, overflowY: 'auto', overflowX: 'hidden', paddingBottom: 140 }}>
        <div style={{ paddingTop: 56, paddingBottom: 10, paddingLeft: 24, paddingRight: 24,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          borderBottom: `1px solid ${sepia}` }}>
          <button style={{ width: 32, height: 32, border: 'none', background: 'transparent', cursor: 'pointer' }}>
            <Glyph name="filter" size={20} color={sepia} stroke={1.2}/></button>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontFamily: serif, fontSize: 18, fontWeight: 600, color: ink, letterSpacing: 3, fontStyle: 'italic' }}>SuSuGiGi</div>
            <div style={{ fontFamily: mono, fontSize: 9, color: ink2, letterSpacing: 2, marginTop: 1 }}>CARTOGRAPHIA · LEDGER</div>
          </div>
          <div style={{ display: 'flex', gap: 4 }}>
            <button style={{ width: 32, height: 32, border: 'none', background: 'transparent', cursor: 'pointer' }}>
              <Glyph name="search" size={20} color={sepia} stroke={1.2}/></button>
            <button style={{ width: 32, height: 32, border: 'none', background: 'transparent', cursor: 'pointer' }}>
              <Glyph name="gear" size={20} color={sepia} stroke={1.2}/></button>
          </div>
        </div>
        <div style={{ paddingLeft: 24, paddingRight: 24, paddingTop: 12, paddingBottom: 6,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <Glyph name="chevron-left" size={14} color={sepia}/>
            <span style={{ fontFamily: serif, fontSize: 14, color: ink, fontStyle: 'italic', letterSpacing: 2 }}>May · 2026</span>
            <Glyph name="chevron-right" size={14} color={sepia}/>
          </div>
          <Compass size={36}/>
        </div>
        <div style={{ paddingLeft: 24, paddingRight: 24, paddingTop: 12, paddingBottom: 8 }}>
          <div style={{ fontFamily: mono, fontSize: 10, color: ruby, letterSpacing: 3, marginBottom: 4 }}>BALANCE · N 25.04° E 121.55°</div>
          <div style={{ fontFamily: serif, fontSize: 42, fontWeight: 500, color: ink, fontVariantNumeric: 'tabular-nums', letterSpacing: -1, fontStyle: 'italic' }}>NT$184,295</div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: 8, marginBottom: 18 }}>
          <div style={{ width: 244, height: 244, borderRadius: '50%',
            border: `1px solid ${sepia}`, padding: 6,
            background: bg, backgroundImage: MAP_GRID,
            boxShadow: `0 8px 20px rgba(61,36,16,0.18)`,
            display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ width: '100%', height: '100%', borderRadius: '50%',
              border: `0.5px dashed ${sepia}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <DonutChart data={[
                { key: 'a', value: 38, color: ruby },
                { key: 'b', value: 22, color: '#7C3B1F' },
                { key: 'c', value: 18, color: sepia },
                { key: 'd', value: 12, color: '#A88556' },
                { key: 'e', value: 10, color: '#D2B789' },
              ]} size={208} outerRadius={84} innerRadius={68} cornerRadius={1}>
                <div style={{ textAlign: 'center', width: 100 }}>
                  <div style={{ fontFamily: mono, fontSize: 9, color: ruby, letterSpacing: 2 }}>SPENT</div>
                  <div style={{ fontFamily: serif, fontSize: 18, color: ink, fontVariantNumeric: 'tabular-nums', fontStyle: 'italic' }}>$5,985</div>
                </div>
              </DonutChart>
            </div>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 10, paddingLeft: 24, paddingRight: 24, paddingBottom: 16 }}>
          {[{ kind: 'expense', amount: '5,985', label: 'OUTBOUND' }, { kind: 'income', amount: '68,000', label: 'INBOUND' }].map(c => {
            const active = c.kind === mode;
            return (
              <button key={c.kind} onClick={() => setMode(c.kind)} style={{
                flex: 1, display: 'flex', flexDirection: 'column', gap: 2,
                paddingTop: 12, paddingBottom: 12, paddingLeft: 14, paddingRight: 14,
                background: active ? rubySoft : 'transparent',
                border: active ? `1px solid ${ruby}` : `1px dashed ${sepia}`,
                cursor: active ? 'default' : 'pointer', fontFamily: 'inherit', textAlign: 'left',
              }}>
                <span style={{ fontFamily: mono, fontSize: 9, color: active ? ruby : ink2, letterSpacing: 2 }}>◄ {c.label}</span>
                <span style={{ fontFamily: serif, fontSize: 20, color: active ? ink : ink2, fontVariantNumeric: 'tabular-nums', fontStyle: 'italic' }}>$ {c.amount}</span>
              </button>
            );
          })}
        </div>
        <div style={{ paddingLeft: 24, paddingRight: 24 }}>
          {cats.map(c => (
            <div key={c.id} style={{ marginBottom: 12,
              border: `0.5px solid ${sepia}`, background: 'rgba(255,253,245,0.4)' }}>
              <div style={{ paddingLeft: 12, paddingRight: 16,
                paddingTop: c.expanded ? 12 : 10, paddingBottom: c.expanded ? 12 : 10,
                display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{ width: 14, transform: `rotate(${c.expanded ? 90 : 0}deg)` }}>
                  <Glyph name="chevron-right" size={12} color={sepia}/></div>
                <div style={{ width: 30, height: 30, borderRadius: '50%',
                  border: `0.5px solid ${ruby}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <DynamicIconById iconId={c.iconId} size={14} color={ruby}/></div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontFamily: serif, fontSize: c.expanded ? 16 : 14, fontStyle: 'italic', color: ink, letterSpacing: 1 }}>{c.title}</div>
                  <div style={{ fontFamily: mono, fontSize: 9, color: ink2, letterSpacing: 1 }}>◈ {c.tag}</div>
                </div>
                <span style={{ fontFamily: serif, fontSize: c.expanded ? 15 : 13, color: ink, fontVariantNumeric: 'tabular-nums', fontStyle: 'italic' }}>{c.total}</span>
              </div>
              {c.expanded && items_food.map((tx, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12,
                  paddingLeft: 16, paddingRight: 16, paddingTop: 10, paddingBottom: 10,
                  borderTop: `0.5px dashed ${hairline}` }}>
                  <span style={{ fontFamily: mono, fontSize: 11, color: ruby, fontVariantNumeric: 'tabular-nums', width: 32 }}>{tx.date}</span>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 14, color: ink, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{tx.note}</div>
                    <div style={{ fontFamily: mono, fontSize: 9, color: ink3, letterSpacing: 1 }}>{tx.acc}</div>
                  </div>
                  <span style={{ fontFamily: serif, fontSize: 14, color: ink, fontVariantNumeric: 'tabular-nums', fontStyle: 'italic' }}>{tx.amount}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
      <div style={{ position: 'absolute', bottom: 24, left: 0, right: 0, display: 'flex', justifyContent: 'center', zIndex: 10, pointerEvents: 'none' }}>
        <div style={{ width: 220, height: 60,
          background: bg, backgroundImage: MAP_GRID,
          border: `1px solid ${sepia}`,
          boxShadow: `0 6px 14px rgba(61,36,16,0.18)`,
          pointerEvents: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'space-around', paddingLeft: 8, paddingRight: 8 }}>
          {['minus', 'exchange', 'plus'].map((g, i) => (
            <button key={i} style={{ width: 56, height: 50, border: 'none', background: 'transparent', cursor: 'pointer',
              borderRight: i < 2 ? `0.5px dashed ${sepia}` : 'none',
              display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Glyph name={g} size={20} color={ruby} stroke={g === 'exchange' ? 1.8 : 1.6}/></button>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── V18 · Wabi-Sabi ─────────────────────────────────────────
function PP_WabiSabi() {
  const [mode, setMode] = React.useState('expense');
  const bg = '#F2EDE3';
  const ink = '#1A1814', ink2 = '#54483A', ink3 = '#9C8E7C';
  const sumi = '#1A1814';
  const zhu = '#B5302C', zhuSoft = 'rgba(181,48,44,0.12)';
  const hairline = 'rgba(26,24,20,0.12)';
  const serif = '"Yu Mincho", "Songti TC", "Cochin", serif';

  const cats = [
    { id: 'food', title: '飲食', kana: 'いただき', iconId: 13, total: '−1,425', expanded: true },
    { id: 'shop', title: '購物', kana: 'もの', iconId: 28, total: '−1,290', expanded: false },
    { id: 'trans', title: '交通', kana: 'みち', iconId: 23, total: '−60', expanded: false },
  ];
  const items_food = [
    { date: '五日', note: '路易莎', acc: '信用卡', amount: '−185' },
    { date: '五日', note: '便當', acc: '現金', amount: '−120' },
    { date: '四日', note: '居酒屋', acc: '信用卡', amount: '−780' },
  ];
  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', background: bg, color: ink, fontFamily: serif }}>
      <div style={{ position: 'absolute', inset: 0, overflowY: 'auto', overflowX: 'hidden', paddingBottom: 140 }}>
        <div style={{ paddingTop: 56, paddingBottom: 12, paddingLeft: 28, paddingRight: 28,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <button style={{ width: 32, height: 32, border: 'none', background: 'transparent', cursor: 'pointer' }}>
            <Glyph name="filter" size={20} color={ink} stroke={1.2}/></button>
          <div style={{ fontFamily: serif, fontSize: 18, fontWeight: 400, color: ink, letterSpacing: 4 }}>須須記</div>
          <div style={{ display: 'flex', gap: 4 }}>
            <button style={{ width: 32, height: 32, border: 'none', background: 'transparent', cursor: 'pointer' }}>
              <Glyph name="search" size={20} color={ink} stroke={1.2}/></button>
            <button style={{ width: 32, height: 32, border: 'none', background: 'transparent', cursor: 'pointer' }}>
              <Glyph name="gear" size={20} color={ink} stroke={1.2}/></button>
          </div>
        </div>
        {/* 不規則毛筆橫劃 */}
        <div style={{ display: 'flex', justifyContent: 'center', paddingTop: 4 }}>
          <svg width="120" height="20" viewBox="0 0 120 20">
            <path d="M8 12 Q40 6 70 10 Q95 13 112 8" stroke={ink} strokeWidth="3" fill="none" strokeLinecap="round" opacity="0.85"/>
          </svg>
        </div>
        <div style={{ textAlign: 'center', paddingTop: 4, paddingBottom: 6 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 14 }}>
            <Glyph name="chevron-left" size={14} color={ink2}/>
            <span style={{ fontFamily: serif, fontSize: 16, color: ink, letterSpacing: 3 }}>五月</span>
            <Glyph name="chevron-right" size={14} color={ink2}/>
          </div>
        </div>
        <div style={{ textAlign: 'center', paddingTop: 24, paddingBottom: 10 }}>
          <div style={{ fontFamily: serif, fontSize: 12, color: ink2, letterSpacing: 5, marginBottom: 4 }}>のこり</div>
          <div style={{ fontFamily: serif, fontSize: 40, fontWeight: 400, color: ink, fontVariantNumeric: 'tabular-nums', letterSpacing: -1 }}>¥ 184,295</div>
        </div>
        {/* 朱印 */}
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: 14, marginBottom: 18 }}>
          <div style={{ width: 220, height: 220, borderRadius: '50%',
            background: bg,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            position: 'relative' }}>
            <DonutChart data={[
              { key: 'a', value: 38, color: sumi },
              { key: 'b', value: 22, color: '#54483A' },
              { key: 'c', value: 18, color: '#857664' },
              { key: 'd', value: 12, color: '#B0A28E' },
              { key: 'e', value: 10, color: zhu },
            ]} size={196} outerRadius={84} innerRadius={70} cornerRadius={2}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontFamily: serif, fontSize: 11, color: ink2, letterSpacing: 3 }}>支出</div>
                <div style={{ fontFamily: serif, fontSize: 19, color: ink, fontVariantNumeric: 'tabular-nums' }}>5,985</div>
              </div>
            </DonutChart>
            <div style={{ position: 'absolute', top: 8, right: 14,
              width: 28, height: 28, background: zhu, color: bg,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontFamily: serif, fontSize: 12, fontWeight: 600, letterSpacing: 1 }}>記</div>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 14, paddingLeft: 28, paddingRight: 28, paddingBottom: 18 }}>
          {[{ kind: 'expense', amount: '5,985', label: '支出' }, { kind: 'income', amount: '68,000', label: '収入' }].map(c => {
            const active = c.kind === mode;
            return (
              <button key={c.kind} onClick={() => setMode(c.kind)} style={{
                flex: 1, display: 'flex', flexDirection: 'column', gap: 4,
                paddingTop: 14, paddingBottom: 14, paddingLeft: 0, paddingRight: 0,
                background: 'transparent',
                border: 'none', borderBottom: `2px solid ${active ? zhu : hairline}`,
                cursor: active ? 'default' : 'pointer', fontFamily: 'inherit', textAlign: 'left',
              }}>
                <span style={{ fontFamily: serif, fontSize: 12, color: active ? zhu : ink2, letterSpacing: 4 }}>{c.label}</span>
                <span style={{ fontFamily: serif, fontSize: 22, color: active ? ink : ink2, fontVariantNumeric: 'tabular-nums', letterSpacing: -0.3 }}>¥ {c.amount}</span>
              </button>
            );
          })}
        </div>
        <div style={{ paddingLeft: 28, paddingRight: 28 }}>
          {cats.map((c, idx) => (
            <div key={c.id} style={{
              paddingTop: c.expanded ? 14 : 12, paddingBottom: c.expanded ? 14 : 12,
              borderBottom: idx === cats.length - 1 ? 'none' : `0.5px solid ${hairline}` }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 14, flex: 1 }}>
                  <div style={{ width: 14, transform: `rotate(${c.expanded ? 90 : 0}deg)` }}>
                    <Glyph name="chevron-right" size={12} color={ink2}/></div>
                  <DynamicIconById iconId={c.iconId} size={20} color={ink}/>
                  <div>
                    <div style={{ fontFamily: serif, fontSize: c.expanded ? 17 : 15, color: ink, letterSpacing: 2 }}>{c.title}</div>
                    <div style={{ fontFamily: serif, fontSize: 9, color: zhu, letterSpacing: 2 }}>{c.kana}</div>
                  </div>
                </div>
                <span style={{ fontFamily: serif, fontSize: c.expanded ? 16 : 14, color: ink, fontVariantNumeric: 'tabular-nums' }}>¥ {c.total}</span>
              </div>
              {c.expanded && (
                <div style={{ marginTop: 12, paddingLeft: 38 }}>
                  {items_food.map((tx, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'baseline', gap: 14, paddingTop: 8, paddingBottom: 8,
                      borderTop: i === 0 ? 'none' : `0.5px dotted ${hairline}` }}>
                      <span style={{ fontFamily: serif, fontSize: 11, color: zhu, width: 30, letterSpacing: 1 }}>{tx.date}</span>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontSize: 14, color: ink, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{tx.note}</div>
                        <div style={{ fontFamily: serif, fontSize: 10, color: ink3, letterSpacing: 1 }}>{tx.acc}</div>
                      </div>
                      <span style={{ fontFamily: serif, fontSize: 14, color: ink, fontVariantNumeric: 'tabular-nums' }}>¥ {tx.amount}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      <div style={{ position: 'absolute', bottom: 28, left: 0, right: 0, display: 'flex', justifyContent: 'center', zIndex: 10, pointerEvents: 'none' }}>
        <div style={{ width: 200, height: 56,
          background: bg, border: `0.5px solid ${ink}`,
          boxShadow: `2px 2px 0 ${zhuSoft}, 0 8px 14px rgba(26,24,20,0.10)`,
          pointerEvents: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'space-around', paddingLeft: 8, paddingRight: 8 }}>
          {['minus', 'exchange', 'plus'].map((g, i) => (
            <button key={i} style={{ width: 50, height: 48, border: 'none', background: 'transparent', cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Glyph name={g} size={20} color={ink} stroke={g === 'exchange' ? 1.4 : 1.2}/></button>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── V19 · Cinema Marquee ────────────────────────────────────
function PP_CinemaMarquee() {
  const [mode, setMode] = React.useState('expense');
  const bg = '#5C0E1F';
  const ink = '#FFEFC9', ink2 = '#E0C8A6', ink3 = '#9C7A52';
  const bulb = '#FFEFC9', bulbSoft = 'rgba(255,239,201,0.22)';
  const neon = '#FFC23A', neonSoft = 'rgba(255,194,58,0.30)';
  const hairline = 'rgba(255,239,201,0.18)';
  const serifBold = '"Cooper Black", "Cochin", "Georgia", serif';
  const serif = '"Cochin", "Georgia", serif';

  const cats = [
    { id: 'food', title: 'DINING', sub: '飲食', iconId: 13, total: '−$1,425', expanded: true },
    { id: 'shop', title: 'SHOPS', sub: '購物', iconId: 28, total: '−$1,290', expanded: false },
    { id: 'trans', title: 'TRANSIT', sub: '交通', iconId: 23, total: '−$60', expanded: false },
  ];
  const items_food = [
    { date: '5/2', note: 'LOUISA COFFEE', acc: 'CTBC', amount: '−$185' },
    { date: '5/2', note: 'BENTO BOX', acc: 'CASH', amount: '−$120' },
    { date: '5/1', note: 'IZAKAYA', acc: 'CTBC', amount: '−$780' },
  ];
  // 燈泡圍邊
  const Bulbs = ({ count = 16, color = bulb, glow = bulbSoft }) => (
    <div style={{ display: 'flex', gap: 'auto', justifyContent: 'space-between', width: '100%' }}>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} style={{ width: 6, height: 6, borderRadius: '50%', background: color, boxShadow: `0 0 6px ${glow}` }}/>
      ))}
    </div>
  );
  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden',
      background: `radial-gradient(circle at 50% 0%, #7A1A2C 0%, ${bg} 70%)`, color: ink, fontFamily: serif }}>
      <div style={{ position: 'absolute', inset: 0, overflowY: 'auto', overflowX: 'hidden', paddingBottom: 140 }}>
        <div style={{ paddingTop: 56, paddingBottom: 8, paddingLeft: 20, paddingRight: 20,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <button style={{ width: 32, height: 32, border: 'none', background: 'transparent', cursor: 'pointer' }}>
            <Glyph name="filter" size={20} color={neon}/></button>
          <div style={{ fontFamily: serifBold, fontSize: 26, fontWeight: 900, color: neon, letterSpacing: 2,
            textShadow: `0 0 12px ${neon}, 0 2px 0 #B5302C` }}>SUSUGIGI</div>
          <div style={{ display: 'flex', gap: 4 }}>
            <button style={{ width: 32, height: 32, border: 'none', background: 'transparent', cursor: 'pointer' }}>
              <Glyph name="search" size={20} color={neon}/></button>
            <button style={{ width: 32, height: 32, border: 'none', background: 'transparent', cursor: 'pointer' }}>
              <Glyph name="gear" size={20} color={neon}/></button>
          </div>
        </div>
        {/* 燈泡邊 */}
        <div style={{ paddingLeft: 16, paddingRight: 16, paddingTop: 6 }}>
          <Bulbs count={28}/>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 14, paddingTop: 10, paddingBottom: 6 }}>
          <Glyph name="chevron-left" size={14} color={neon}/>
          <span style={{ fontFamily: serifBold, fontSize: 16, color: neon, letterSpacing: 3, textShadow: `0 0 6px ${neonSoft}` }}>★ MAY 2026 ★</span>
          <Glyph name="chevron-right" size={14} color={neon}/>
        </div>
        <div style={{ textAlign: 'center', paddingTop: 12, paddingBottom: 10 }}>
          <div style={{ fontFamily: serif, fontSize: 11, color: ink2, letterSpacing: 4, marginBottom: 4 }}>NOW SHOWING · BALANCE</div>
          <div style={{ fontFamily: serifBold, fontSize: 48, fontWeight: 900, color: bulb, fontVariantNumeric: 'tabular-nums', letterSpacing: -1,
            textShadow: `0 0 16px ${bulbSoft}, 0 3px 0 #B5302C` }}>$ 184,295</div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: 10, marginBottom: 18 }}>
          <div style={{ width: 240, height: 240, borderRadius: '50%',
            border: `2px solid ${neon}`, padding: 6,
            background: '#3A0813',
            boxShadow: `0 0 28px ${neonSoft}, inset 0 0 16px rgba(0,0,0,0.6)`,
            display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
            <DonutChart data={[
              { key: 'a', value: 38, color: neon },
              { key: 'b', value: 22, color: bulb },
              { key: 'c', value: 18, color: '#B5302C' },
              { key: 'd', value: 12, color: '#7A1A2C' },
              { key: 'e', value: 10, color: '#3A0813' },
            ]} size={208} outerRadius={84} innerRadius={68} cornerRadius={2}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontFamily: serif, fontSize: 10, color: neon, letterSpacing: 3 }}>OUT</div>
                <div style={{ fontFamily: serifBold, fontSize: 20, color: bulb, fontVariantNumeric: 'tabular-nums', textShadow: `0 0 8px ${bulbSoft}` }}>$5,985</div>
              </div>
            </DonutChart>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 10, paddingLeft: 20, paddingRight: 20, paddingBottom: 16 }}>
          {[{ kind: 'expense', amount: '5,985', label: 'OUT' }, { kind: 'income', amount: '68,000', label: 'IN' }].map(c => {
            const active = c.kind === mode;
            return (
              <button key={c.kind} onClick={() => setMode(c.kind)} style={{
                flex: 1, display: 'flex', flexDirection: 'column', gap: 2,
                paddingTop: 12, paddingBottom: 12, paddingLeft: 14, paddingRight: 14,
                background: active ? neonSoft : 'rgba(0,0,0,0.25)',
                border: `1.5px solid ${active ? neon : hairline}`,
                cursor: active ? 'default' : 'pointer', fontFamily: 'inherit', textAlign: 'left',
                boxShadow: active ? `0 0 12px ${neonSoft}` : 'none',
              }}>
                <span style={{ fontFamily: serif, fontSize: 10, color: active ? neon : ink2, letterSpacing: 3 }}>★ {c.label}</span>
                <span style={{ fontFamily: serifBold, fontSize: 22, color: bulb, fontVariantNumeric: 'tabular-nums', letterSpacing: -0.4 }}>$ {c.amount}</span>
              </button>
            );
          })}
        </div>
        <div style={{ paddingLeft: 20, paddingRight: 20 }}>
          {cats.map(c => (
            <div key={c.id} style={{ marginBottom: 12,
              background: 'rgba(0,0,0,0.30)',
              border: `1px solid ${neon}`,
              boxShadow: c.expanded ? `0 0 16px ${neonSoft}` : 'none' }}>
              <div style={{ paddingLeft: 12, paddingRight: 16,
                paddingTop: c.expanded ? 12 : 10, paddingBottom: c.expanded ? 12 : 10,
                display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{ width: 14, transform: `rotate(${c.expanded ? 90 : 0}deg)` }}>
                  <Glyph name="chevron-right" size={12} color={neon}/></div>
                <div style={{ width: 30, height: 30, borderRadius: '50%',
                  background: neon, boxShadow: `0 0 8px ${neonSoft}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <DynamicIconById iconId={c.iconId} size={14} color={bg}/></div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontFamily: serifBold, fontSize: c.expanded ? 16 : 14, color: bulb, letterSpacing: 2 }}>{c.title}</div>
                  <div style={{ fontSize: 9, color: ink3, letterSpacing: 1 }}>{c.sub}</div>
                </div>
                <span style={{ fontFamily: serifBold, fontSize: c.expanded ? 15 : 13, color: neon, fontVariantNumeric: 'tabular-nums' }}>{c.total}</span>
              </div>
              {c.expanded && items_food.map((tx, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12,
                  paddingLeft: 16, paddingRight: 16, paddingTop: 10, paddingBottom: 10,
                  borderTop: `0.5px solid ${hairline}` }}>
                  <span style={{ fontFamily: serif, fontSize: 10, color: neon, fontVariantNumeric: 'tabular-nums', width: 32, letterSpacing: 1 }}>{tx.date}</span>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontFamily: serifBold, fontSize: 13, color: bulb, letterSpacing: 1,
                      whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{tx.note}</div>
                    <div style={{ fontSize: 10, color: ink3, letterSpacing: 1 }}>{tx.acc}</div>
                  </div>
                  <span style={{ fontFamily: serifBold, fontSize: 14, color: bulb, fontVariantNumeric: 'tabular-nums' }}>{tx.amount}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
      <div style={{ position: 'absolute', bottom: 24, left: 0, right: 0, display: 'flex', justifyContent: 'center', zIndex: 10, pointerEvents: 'none' }}>
        <div style={{ width: 232, height: 64, borderRadius: 32,
          background: '#3A0813',
          border: `2px solid ${neon}`,
          boxShadow: `0 0 24px ${neon}, inset 0 0 8px rgba(0,0,0,0.4)`,
          pointerEvents: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'space-around', paddingLeft: 8, paddingRight: 8 }}>
          {['minus', 'exchange', 'plus'].map((g, i) => (
            <button key={i} style={{ width: 60, height: 52, border: 'none', background: 'transparent', cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Glyph name={g} size={22} color={bulb} stroke={g === 'exchange' ? 2.4 : 2.2}/></button>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── V20 · Receipt Stack ─────────────────────────────────────
function PP_ReceiptStack() {
  const [mode, setMode] = React.useState('expense');
  const bg = '#F8F4EA';
  const ink = '#1A1814', ink2 = '#5A5045', ink3 = '#9C9285';
  const red = '#B5302C', redSoft = 'rgba(181,48,44,0.12)';
  const hairline = 'rgba(26,24,20,0.16)';
  const mono = '"Courier New", "American Typewriter", "Menlo", monospace';

  const cats = [
    { id: 'food', title: 'DINING', iconId: 13, total: '-1,425.00', expanded: true, no: '#01' },
    { id: 'shop', title: 'SHOPPING', iconId: 28, total: '-1,290.00', expanded: false, no: '#02' },
    { id: 'trans', title: 'TRANSPORT', iconId: 23, total: '-60.00', expanded: false, no: '#03' },
  ];
  const items_food = [
    { date: '05/02', note: '路易莎咖啡', acc: 'CTBC', amount: '-185.00' },
    { date: '05/02', note: '便當', acc: 'Cash', amount: '-120.00' },
    { date: '05/01', note: '居酒屋', acc: 'CTBC', amount: '-780.00' },
  ];
  // 鋸齒邊 (zig-zag receipt edge)
  const ZigZag = ({ width = 200, color = bg, dir = 'down' }) => (
    <svg width={width} height="6" viewBox={`0 0 ${width} 6`} preserveAspectRatio="none">
      <path d={
        dir === 'down'
          ? `M 0 0 ${Array.from({ length: Math.floor(width / 8) }).map((_, i) => `L ${i * 8 + 4} 6 L ${(i + 1) * 8} 0`).join(' ')}`
          : `M 0 6 ${Array.from({ length: Math.floor(width / 8) }).map((_, i) => `L ${i * 8 + 4} 0 L ${(i + 1) * 8} 6`).join(' ')}`
      } fill={color}/>
    </svg>
  );
  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', background: '#E8DFCC', color: ink, fontFamily: mono }}>
      <div style={{ position: 'absolute', inset: 0, overflowY: 'auto', overflowX: 'hidden', paddingBottom: 140 }}>
        {/* 主收據紙 */}
        <div style={{ marginLeft: 16, marginRight: 16, marginTop: 0, background: bg,
          boxShadow: '0 4px 12px rgba(26,24,20,0.18)' }}>
          <ZigZag width={368} color={bg} dir="up"/>
          <div style={{ paddingTop: 50, paddingBottom: 12, paddingLeft: 20, paddingRight: 20,
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            borderBottom: `1.5px dashed ${hairline}` }}>
            <button style={{ width: 28, height: 28, border: 'none', background: 'transparent', cursor: 'pointer' }}>
              <Glyph name="filter" size={18} color={ink}/></button>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontFamily: mono, fontSize: 13, fontWeight: 700, color: ink, letterSpacing: 3 }}>SUSUGIGI POS</div>
              <div style={{ fontFamily: mono, fontSize: 9, color: ink2, letterSpacing: 2, marginTop: 1 }}>RCPT · #20260516-001</div>
            </div>
            <div style={{ display: 'flex', gap: 2 }}>
              <button style={{ width: 28, height: 28, border: 'none', background: 'transparent', cursor: 'pointer' }}>
                <Glyph name="search" size={18} color={ink}/></button>
              <button style={{ width: 28, height: 28, border: 'none', background: 'transparent', cursor: 'pointer' }}>
                <Glyph name="gear" size={18} color={ink}/></button>
            </div>
          </div>
          <div style={{ paddingLeft: 20, paddingRight: 20, paddingTop: 10, paddingBottom: 6,
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            borderBottom: `0.5px solid ${hairline}` }}>
            <Glyph name="chevron-left" size={12} color={ink2}/>
            <span style={{ fontFamily: mono, fontSize: 11, color: ink, letterSpacing: 2 }}>05/01 - 05/31, 2026</span>
            <Glyph name="chevron-right" size={12} color={ink2}/>
          </div>
          <div style={{ paddingLeft: 20, paddingRight: 20, paddingTop: 14, paddingBottom: 10,
            display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
            <div>
              <div style={{ fontFamily: mono, fontSize: 9, color: ink2, letterSpacing: 2 }}>RUNNING TOTAL</div>
              <div style={{ fontFamily: mono, fontSize: 28, fontWeight: 700, color: ink, fontVariantNumeric: 'tabular-nums' }}>$184,295.00</div>
            </div>
            {/* 紅章 */}
            <div style={{
              transform: 'rotate(-10deg)', border: `2px solid ${red}`,
              padding: '2px 8px',
              fontFamily: mono, fontSize: 10, fontWeight: 700, color: red, letterSpacing: 2 }}>PAID</div>
          </div>
          <div style={{ paddingLeft: 20, paddingRight: 20, paddingBottom: 12 }}>
            <div style={{ width: '100%', height: 1, background: ink, opacity: 0.5 }}/>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', paddingBottom: 14 }}>
            <div style={{ width: 200, height: 200, border: `1px dashed ${ink}`, borderRadius: '50%',
              display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <DonutChart data={[
                { key: 'a', value: 38, color: red },
                { key: 'b', value: 22, color: ink },
                { key: 'c', value: 18, color: '#5A5045' },
                { key: 'd', value: 12, color: '#9C9285' },
                { key: 'e', value: 10, color: '#C9BFAA' },
              ]} size={172} outerRadius={70} innerRadius={56} cornerRadius={1}>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontFamily: mono, fontSize: 9, color: red, letterSpacing: 2 }}>DR</div>
                  <div style={{ fontFamily: mono, fontSize: 14, color: ink, fontWeight: 700, fontVariantNumeric: 'tabular-nums' }}>5,985.00</div>
                </div>
              </DonutChart>
            </div>
          </div>
          <div style={{ paddingLeft: 20, paddingRight: 20, paddingBottom: 12,
            borderTop: `1px dashed ${hairline}`, borderBottom: `1px dashed ${hairline}`,
            display: 'flex' }}>
            {[{ kind: 'expense', amount: '5,985.00', label: 'DR · 支' }, { kind: 'income', amount: '68,000.00', label: 'CR · 收' }].map((c, idx) => {
              const active = c.kind === mode;
              return (
                <button key={c.kind} onClick={() => setMode(c.kind)} style={{
                  flex: 1, display: 'flex', flexDirection: 'column', gap: 2,
                  paddingTop: 10, paddingBottom: 10, paddingLeft: 12, paddingRight: 12,
                  background: active ? redSoft : 'transparent',
                  border: 'none', borderLeft: idx > 0 ? `1px dashed ${hairline}` : 'none',
                  cursor: active ? 'default' : 'pointer', fontFamily: 'inherit', textAlign: 'left',
                }}>
                  <span style={{ fontFamily: mono, fontSize: 9, color: active ? red : ink2, letterSpacing: 2 }}>{c.label}</span>
                  <span style={{ fontFamily: mono, fontSize: 17, color: active ? ink : ink2, fontWeight: 700, fontVariantNumeric: 'tabular-nums' }}>${c.amount}</span>
                </button>
              );
            })}
          </div>
          <div style={{ paddingLeft: 20, paddingRight: 20, paddingTop: 12, paddingBottom: 16 }}>
            <div style={{ fontFamily: mono, fontSize: 9, color: ink2, letterSpacing: 2, marginBottom: 8 }}>ITEMIZED BREAKDOWN ────</div>
            {cats.map(c => (
              <div key={c.id} style={{ marginBottom: 10 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10,
                  paddingTop: c.expanded ? 8 : 6, paddingBottom: c.expanded ? 8 : 6,
                  borderBottom: c.expanded ? `1px dashed ${hairline}` : `0.5px dotted ${hairline}` }}>
                  <div style={{ width: 12, transform: `rotate(${c.expanded ? 90 : 0}deg)` }}>
                    <Glyph name="chevron-right" size={10} color={ink2}/></div>
                  <span style={{ fontFamily: mono, fontSize: 10, color: red, width: 26, fontWeight: 700 }}>{c.no}</span>
                  <DynamicIconById iconId={c.iconId} size={14} color={ink}/>
                  <span style={{ flex: 1, fontFamily: mono, fontSize: c.expanded ? 13 : 12, color: ink, fontWeight: 700, letterSpacing: 1 }}>{c.title}</span>
                  <span style={{ fontFamily: mono, fontSize: c.expanded ? 13 : 12, color: ink, fontWeight: 700, fontVariantNumeric: 'tabular-nums' }}>${c.total}</span>
                </div>
                {c.expanded && items_food.map((tx, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8,
                    paddingLeft: 28, paddingRight: 0, paddingTop: 6, paddingBottom: 6 }}>
                    <span style={{ fontFamily: mono, fontSize: 10, color: ink2, width: 40 }}>{tx.date}</span>
                    <span style={{ flex: 1, fontFamily: mono, fontSize: 12, color: ink, minWidth: 0,
                      whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{tx.note}</span>
                    <span style={{ fontFamily: mono, fontSize: 9, color: ink3, width: 32 }}>{tx.acc}</span>
                    <span style={{ fontFamily: mono, fontSize: 12, color: ink, fontVariantNumeric: 'tabular-nums' }}>${tx.amount}</span>
                  </div>
                ))}
              </div>
            ))}
          </div>
          <div style={{ paddingLeft: 20, paddingRight: 20, paddingBottom: 8 }}>
            <div style={{ fontFamily: mono, fontSize: 9, color: ink2, letterSpacing: 2, textAlign: 'center', borderTop: `1px dashed ${hairline}`, paddingTop: 8 }}>
              THANK YOU · KEEP RECEIPT FOR RECORDS
            </div>
          </div>
          <ZigZag width={368} color="#E8DFCC" dir="down"/>
        </div>
      </div>
      <div style={{ position: 'absolute', bottom: 24, left: 0, right: 0, display: 'flex', justifyContent: 'center', zIndex: 10, pointerEvents: 'none' }}>
        <div style={{ width: 232, height: 60, background: bg,
          border: `1px solid ${ink}`, borderTop: `2px solid ${red}`,
          boxShadow: `2px 2px 0 ${redSoft}, 0 8px 16px rgba(26,24,20,0.18)`,
          pointerEvents: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'space-around', paddingLeft: 8, paddingRight: 8 }}>
          {[{ g: 'minus', l: 'DR' }, { g: 'exchange', l: 'TX' }, { g: 'plus', l: 'CR' }].map((b, i) => (
            <button key={i} style={{ width: 60, height: 52, border: 'none', background: 'transparent', cursor: 'pointer',
              borderRight: i < 2 ? `1px dashed ${hairline}` : 'none',
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
              <Glyph name={b.g} size={18} color={ink} stroke={b.g === 'exchange' ? 2 : 1.8}/>
              <span style={{ fontFamily: mono, fontSize: 8, color: red, fontWeight: 700, letterSpacing: 1 }}>{b.l}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// ═════════════════════════════════════════════════════════════
// Row 3 (V21-V25) — 全圓角、無橫向切割線、無直角 panel
// ═════════════════════════════════════════════════════════════

// ─── V21 · Claymorphism Soft 3D ──────────────────────────────
function PP_Claymorphism() {
  const [mode, setMode] = React.useState('expense');
  const bg = '#F5EFE6';
  const ink = '#3D3025', ink2 = '#7A6655', ink3 = '#B5A493';
  const pink = '#F08C8C', pinkSoft = 'rgba(240,140,140,0.20)';
  const sans = '"SF Pro Rounded", "Avenir Next Rounded", -apple-system, sans-serif';
  // 黏土 3D 陰影
  const clayShadow = '6px 6px 14px rgba(80,55,40,0.14), -4px -4px 12px rgba(255,255,255,0.9)';
  const clayInset = 'inset 2px 2px 5px rgba(80,55,40,0.10), inset -2px -2px 5px rgba(255,255,255,0.85)';

  const cats = [
    { id: 'food', title: '飲食', iconId: 13, total: '−NT$1,425', expanded: true },
    { id: 'shop', title: '購物', iconId: 28, total: '−NT$1,290', expanded: false },
    { id: 'trans', title: '交通', iconId: 23, total: '−NT$60', expanded: false },
  ];
  const items_food = [
    { date: '5/2', note: '路易莎咖啡', acc: '國泰世華 信用卡', amount: '−NT$185' },
    { date: '5/2', note: '便當', acc: '現金', amount: '−NT$120' },
    { date: '5/1', note: '居酒屋', acc: '國泰世華 信用卡', amount: '−NT$780' },
  ];
  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', background: bg, color: ink, fontFamily: sans }}>
      <div style={{ position: 'absolute', inset: 0, overflowY: 'auto', overflowX: 'hidden', paddingBottom: 140 }}>
        <div style={{ paddingTop: 56, paddingBottom: 14, paddingLeft: 20, paddingRight: 20,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <button style={{ width: 44, height: 44, borderRadius: 22, border: 'none', background: bg, cursor: 'pointer',
            boxShadow: clayShadow, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Glyph name="filter" size={18} color={ink} stroke={2}/></button>
          <div style={{ fontSize: 19, fontWeight: 700, letterSpacing: -0.4, color: ink }}>SuSuGiGi</div>
          <div style={{ display: 'flex', gap: 8 }}>
            <button style={{ width: 44, height: 44, borderRadius: 22, border: 'none', background: bg, cursor: 'pointer',
              boxShadow: clayShadow, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Glyph name="search" size={18} color={ink} stroke={2}/></button>
            <button style={{ width: 44, height: 44, borderRadius: 22, border: 'none', background: bg, cursor: 'pointer',
              boxShadow: clayShadow, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Glyph name="gear" size={18} color={ink} stroke={2}/></button>
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', paddingTop: 4, paddingBottom: 10 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14,
            paddingLeft: 18, paddingRight: 18, paddingTop: 10, paddingBottom: 10,
            borderRadius: 999, background: bg, boxShadow: clayInset }}>
            <Glyph name="chevron-left" size={14} color={ink2} stroke={2.4}/>
            <span style={{ fontSize: 14, fontWeight: 600, color: ink, letterSpacing: 0.5 }}>2026 年 5 月</span>
            <Glyph name="chevron-right" size={14} color={ink2} stroke={2.4}/>
          </div>
        </div>
        <div style={{ textAlign: 'center', paddingTop: 14, paddingBottom: 12 }}>
          <div style={{ fontSize: 11, color: ink2, letterSpacing: 3, fontWeight: 600, marginBottom: 6 }}>BALANCE</div>
          <div style={{ fontSize: 42, fontWeight: 800, color: ink, fontVariantNumeric: 'tabular-nums', letterSpacing: -1.4 }}>NT$184,295</div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: 8, marginBottom: 22 }}>
          <div style={{ width: 250, height: 250, borderRadius: '50%',
            background: bg, boxShadow: clayShadow,
            display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ width: 234, height: 234, borderRadius: '50%',
              background: bg, boxShadow: clayInset,
              display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <DonutChart data={[
                { key: 'a', value: 38, color: pink },
                { key: 'b', value: 22, color: '#F5B49D' },
                { key: 'c', value: 18, color: '#D8AC8F' },
                { key: 'd', value: 12, color: '#B5A493' },
                { key: 'e', value: 10, color: '#E8DDCD' },
              ]} size={196} outerRadius={78} innerRadius={62} cornerRadius={6}>
                <div style={{ textAlign: 'center', width: 100 }}>
                  <div style={{ fontSize: 11, color: ink2, letterSpacing: 2, fontWeight: 600 }}>OUT</div>
                  <div style={{ fontSize: 20, fontWeight: 700, color: ink, fontVariantNumeric: 'tabular-nums' }}>$5,985</div>
                </div>
              </DonutChart>
            </div>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 12, paddingLeft: 20, paddingRight: 20, paddingBottom: 18 }}>
          {[{ kind: 'expense', amount: 'NT$ 5,985', label: 'OUT' }, { kind: 'income', amount: 'NT$ 68,000', label: 'IN' }].map(c => {
            const active = c.kind === mode;
            return (
              <button key={c.kind} onClick={() => setMode(c.kind)} style={{
                flex: 1, display: 'flex', flexDirection: 'column', gap: 4,
                paddingTop: 14, paddingBottom: 14, paddingLeft: 16, paddingRight: 16,
                borderRadius: 22, border: 'none',
                background: active ? pinkSoft : bg,
                boxShadow: active ? clayInset : clayShadow,
                cursor: active ? 'default' : 'pointer', fontFamily: 'inherit', textAlign: 'left',
              }}>
                <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: 2.5, color: active ? pink : ink2 }}>{c.label}</span>
                <span style={{ fontSize: 21, fontWeight: 800, color: ink, fontVariantNumeric: 'tabular-nums', letterSpacing: -0.4 }}>{c.amount}</span>
              </button>
            );
          })}
        </div>
        <div style={{ paddingLeft: 20, paddingRight: 20 }}>
          {cats.map(c => (
            <div key={c.id} style={{ marginBottom: 14,
              borderRadius: 24, background: bg,
              boxShadow: c.expanded ? clayInset : clayShadow,
              overflow: 'hidden' }}>
              <div style={{ paddingLeft: 14, paddingRight: 18,
                paddingTop: c.expanded ? 14 : 12, paddingBottom: c.expanded ? 14 : 12,
                display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ width: 16, transform: `rotate(${c.expanded ? 90 : 0}deg)` }}>
                  <Glyph name="chevron-right" size={12} color={ink2} stroke={2.4}/></div>
                <div style={{ width: 40, height: 40, borderRadius: 14, background: pinkSoft,
                  boxShadow: 'inset 1.5px 1.5px 3px rgba(240,140,140,0.20), inset -1.5px -1.5px 3px rgba(255,255,255,0.8)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <DynamicIconById iconId={c.iconId} size={18} color={pink}/></div>
                <span style={{ flex: 1, fontSize: c.expanded ? 17 : 15, fontWeight: 700, color: ink, letterSpacing: -0.2 }}>{c.title}</span>
                <span style={{ fontSize: c.expanded ? 16 : 14, fontWeight: 700, color: ink, fontVariantNumeric: 'tabular-nums' }}>{c.total}</span>
              </div>
              {c.expanded && (
                <div style={{ paddingLeft: 18, paddingRight: 18, paddingBottom: 12 }}>
                  {items_food.map((tx, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12,
                      marginTop: 8, paddingTop: 8, paddingBottom: 8, paddingLeft: 12, paddingRight: 14,
                      borderRadius: 14, background: bg, boxShadow: clayInset }}>
                      <span style={{ fontSize: 11, fontWeight: 700, color: pink, fontVariantNumeric: 'tabular-nums', width: 32 }}>{tx.date}</span>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontSize: 14, fontWeight: 600, color: ink, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{tx.note}</div>
                        <div style={{ fontSize: 11, color: ink3, fontWeight: 500 }}>{tx.acc}</div>
                      </div>
                      <span style={{ fontSize: 15, fontWeight: 700, color: ink, fontVariantNumeric: 'tabular-nums' }}>{tx.amount}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      <div style={{ position: 'absolute', bottom: 24, left: 0, right: 0, display: 'flex', justifyContent: 'center', zIndex: 10, pointerEvents: 'none' }}>
        <div style={{ width: 224, height: 72, borderRadius: 36,
          background: bg, boxShadow: clayShadow,
          pointerEvents: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'space-around', paddingLeft: 10, paddingRight: 10 }}>
          {['minus', 'exchange', 'plus'].map((g, i) => (
            <button key={i} style={{ width: 52, height: 52, borderRadius: 26, border: 'none', cursor: 'pointer',
              background: bg, boxShadow: clayInset,
              display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Glyph name={g} size={22} color={pink} stroke={g === 'exchange' ? 2.4 : 2.2}/></button>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── V22 · Aurora Borealis ──────────────────────────────────
function PP_Aurora() {
  const [mode, setMode] = React.useState('expense');
  const bg = 'linear-gradient(170deg, #0B1430 0%, #173044 28%, #1F5762 50%, #357B5A 72%, #75A867 100%)';
  const ink = '#FFFFFF', ink2 = '#C8E8DF', ink3 = '#88B4A0';
  const aurora = '#B4FFE5', auroraSoft = 'rgba(180,255,229,0.22)';
  const violet = '#C8A8FF';
  const sans = '"SF Pro Rounded", "Avenir Next Rounded", -apple-system, sans-serif';

  const cats = [
    { id: 'food', title: '飲食', iconId: 13, total: '−NT$1,425', expanded: true },
    { id: 'shop', title: '購物', iconId: 28, total: '−NT$1,290', expanded: false },
    { id: 'trans', title: '交通', iconId: 23, total: '−NT$60', expanded: false },
  ];
  const items_food = [
    { date: '5/2', note: '路易莎咖啡', acc: '國泰世華 信用卡', amount: '−NT$185' },
    { date: '5/2', note: '便當', acc: '現金', amount: '−NT$120' },
    { date: '5/1', note: '居酒屋', acc: '國泰世華 信用卡', amount: '−NT$780' },
  ];
  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', background: bg, color: ink, fontFamily: sans }}>
      {/* aurora 流動光帶 */}
      <svg width="100%" height="100%" preserveAspectRatio="none" style={{ position: 'absolute', inset: 0, pointerEvents: 'none', opacity: 0.7 }}>
        <defs>
          <linearGradient id="aurora1" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={aurora} stopOpacity="0"/>
            <stop offset="50%" stopColor={aurora} stopOpacity="0.6"/>
            <stop offset="100%" stopColor={aurora} stopOpacity="0"/>
          </linearGradient>
          <linearGradient id="aurora2" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={violet} stopOpacity="0"/>
            <stop offset="50%" stopColor={violet} stopOpacity="0.55"/>
            <stop offset="100%" stopColor={violet} stopOpacity="0"/>
          </linearGradient>
          <filter id="auroraBlurB"><feGaussianBlur stdDeviation="22"/></filter>
        </defs>
        <path d="M-40 240 Q120 200 280 260 T440 250 L440 320 Q280 260 120 320 T-40 320 Z" fill="url(#aurora1)" filter="url(#auroraBlurB)"/>
        <path d="M-40 480 Q160 440 320 500 T440 490 L440 540 Q280 480 100 540 T-40 540 Z" fill="url(#aurora2)" filter="url(#auroraBlurB)"/>
      </svg>
      <div style={{ position: 'absolute', inset: 0, overflowY: 'auto', overflowX: 'hidden', paddingBottom: 140 }}>
        <div style={{ paddingTop: 56, paddingBottom: 14, paddingLeft: 20, paddingRight: 20,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <button style={{ width: 40, height: 40, borderRadius: 20, border: 'none', cursor: 'pointer',
            background: 'rgba(255,255,255,0.10)', backdropFilter: 'blur(14px)', WebkitBackdropFilter: 'blur(14px)',
            display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Glyph name="filter" size={18} color={ink}/></button>
          <div style={{ fontSize: 18, fontWeight: 600, color: ink, letterSpacing: 1.5,
            textShadow: `0 0 12px ${auroraSoft}` }}>SuSuGiGi</div>
          <div style={{ display: 'flex', gap: 6 }}>
            <button style={{ width: 40, height: 40, borderRadius: 20, border: 'none', cursor: 'pointer',
              background: 'rgba(255,255,255,0.10)', backdropFilter: 'blur(14px)', WebkitBackdropFilter: 'blur(14px)',
              display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Glyph name="search" size={18} color={ink}/></button>
            <button style={{ width: 40, height: 40, borderRadius: 20, border: 'none', cursor: 'pointer',
              background: 'rgba(255,255,255,0.10)', backdropFilter: 'blur(14px)', WebkitBackdropFilter: 'blur(14px)',
              display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Glyph name="gear" size={18} color={ink}/></button>
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', paddingTop: 4, paddingBottom: 6 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14,
            paddingLeft: 18, paddingRight: 18, paddingTop: 10, paddingBottom: 10,
            borderRadius: 999, background: 'rgba(255,255,255,0.10)',
            backdropFilter: 'blur(18px)', WebkitBackdropFilter: 'blur(18px)',
            border: `1px solid rgba(255,255,255,0.20)` }}>
            <Glyph name="chevron-left" size={14} color={ink2}/>
            <span style={{ fontSize: 14, fontWeight: 500, color: ink, letterSpacing: 2 }}>MAY · 2026</span>
            <Glyph name="chevron-right" size={14} color={ink2}/>
          </div>
        </div>
        <div style={{ textAlign: 'center', paddingTop: 16, paddingBottom: 12 }}>
          <div style={{ fontSize: 11, color: aurora, letterSpacing: 4, marginBottom: 6, textShadow: `0 0 12px ${auroraSoft}` }}>BALANCE</div>
          <div style={{ fontSize: 44, fontWeight: 300, color: ink, fontVariantNumeric: 'tabular-nums', letterSpacing: -1,
            textShadow: `0 0 24px ${auroraSoft}` }}>NT$184,295</div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: 10, marginBottom: 22 }}>
          <div style={{ width: 250, height: 250, borderRadius: '50%',
            background: 'rgba(255,255,255,0.06)',
            backdropFilter: 'blur(22px)', WebkitBackdropFilter: 'blur(22px)',
            border: `1px solid ${auroraSoft}`,
            boxShadow: `0 0 40px ${auroraSoft}, inset 0 0 24px rgba(180,255,229,0.10)`,
            display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <DonutChart data={[
              { key: 'a', value: 38, color: aurora },
              { key: 'b', value: 22, color: violet },
              { key: 'c', value: 18, color: '#88B4A0' },
              { key: 'd', value: 12, color: '#5A7E8A' },
              { key: 'e', value: 10, color: '#2D3F60' },
            ]} size={216} outerRadius={88} innerRadius={70} cornerRadius={4}>
              <div style={{ textAlign: 'center', width: 100 }}>
                <div style={{ fontSize: 10, color: aurora, letterSpacing: 3 }}>OUT</div>
                <div style={{ fontSize: 20, fontWeight: 400, color: ink, fontVariantNumeric: 'tabular-nums' }}>$5,985</div>
              </div>
            </DonutChart>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 12, paddingLeft: 20, paddingRight: 20, paddingBottom: 18 }}>
          {[{ kind: 'expense', amount: 'NT$ 5,985', label: 'OUT' }, { kind: 'income', amount: 'NT$ 68,000', label: 'IN' }].map(c => {
            const active = c.kind === mode;
            return (
              <button key={c.kind} onClick={() => setMode(c.kind)} style={{
                flex: 1, display: 'flex', flexDirection: 'column', gap: 4,
                paddingTop: 14, paddingBottom: 14, paddingLeft: 16, paddingRight: 16,
                borderRadius: 20,
                background: active ? 'rgba(180,255,229,0.18)' : 'rgba(255,255,255,0.08)',
                backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)',
                border: active ? `1.5px solid ${aurora}` : `1px solid rgba(255,255,255,0.18)`,
                boxShadow: active ? `0 0 20px ${auroraSoft}` : 'none',
                cursor: active ? 'default' : 'pointer', fontFamily: 'inherit', textAlign: 'left',
              }}>
                <span style={{ fontSize: 10, fontWeight: 600, letterSpacing: 3, color: active ? aurora : ink2 }}>{c.label}</span>
                <span style={{ fontSize: 21, fontWeight: 400, color: ink, fontVariantNumeric: 'tabular-nums', letterSpacing: -0.3 }}>{c.amount}</span>
              </button>
            );
          })}
        </div>
        <div style={{ paddingLeft: 20, paddingRight: 20 }}>
          {cats.map(c => (
            <div key={c.id} style={{ marginBottom: 14, borderRadius: 24,
              background: 'rgba(255,255,255,0.07)',
              backdropFilter: 'blur(22px)', WebkitBackdropFilter: 'blur(22px)',
              border: `1px solid rgba(255,255,255,0.16)`,
              boxShadow: c.expanded ? `0 0 24px ${auroraSoft}` : 'none',
              overflow: 'hidden' }}>
              <div style={{ paddingLeft: 14, paddingRight: 18,
                paddingTop: c.expanded ? 14 : 12, paddingBottom: c.expanded ? 14 : 12,
                display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ width: 16, transform: `rotate(${c.expanded ? 90 : 0}deg)` }}>
                  <Glyph name="chevron-right" size={12} color={ink2} stroke={2}/></div>
                <div style={{ width: 38, height: 38, borderRadius: 19,
                  background: 'rgba(180,255,229,0.18)',
                  border: `1px solid ${auroraSoft}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <DynamicIconById iconId={c.iconId} size={16} color={aurora}/></div>
                <span style={{ flex: 1, fontSize: c.expanded ? 16 : 15, fontWeight: 500, color: ink, letterSpacing: 0.5 }}>{c.title}</span>
                <span style={{ fontSize: c.expanded ? 15 : 14, fontWeight: 400, color: ink, fontVariantNumeric: 'tabular-nums' }}>{c.total}</span>
              </div>
              {c.expanded && (
                <div style={{ paddingLeft: 18, paddingRight: 18, paddingBottom: 12 }}>
                  {items_food.map((tx, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12,
                      marginTop: 8, paddingTop: 10, paddingBottom: 10, paddingLeft: 14, paddingRight: 14,
                      borderRadius: 14, background: 'rgba(255,255,255,0.06)',
                      border: `1px solid rgba(255,255,255,0.10)` }}>
                      <span style={{ fontSize: 11, fontWeight: 500, color: aurora, fontVariantNumeric: 'tabular-nums', width: 30 }}>{tx.date}</span>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontSize: 14, color: ink, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{tx.note}</div>
                        <div style={{ fontSize: 11, color: ink3 }}>{tx.acc}</div>
                      </div>
                      <span style={{ fontSize: 14, color: ink, fontVariantNumeric: 'tabular-nums' }}>{tx.amount}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      <div style={{ position: 'absolute', bottom: 24, left: 0, right: 0, display: 'flex', justifyContent: 'center', zIndex: 10, pointerEvents: 'none' }}>
        <div style={{ width: 220, height: 64, borderRadius: 32,
          background: 'rgba(255,255,255,0.10)',
          backdropFilter: 'blur(28px)', WebkitBackdropFilter: 'blur(28px)',
          border: `1px solid ${aurora}`,
          boxShadow: `0 0 28px ${auroraSoft}, 0 12px 28px rgba(0,0,0,0.4)`,
          pointerEvents: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'space-around', paddingLeft: 10, paddingRight: 10 }}>
          {['minus', 'exchange', 'plus'].map((g, i) => (
            <button key={i} style={{ width: 48, height: 48, borderRadius: 24, border: 'none', background: 'transparent', cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Glyph name={g} size={22} color={aurora} stroke={g === 'exchange' ? 2 : 1.8}/></button>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── V23 · Pebble Stone ──────────────────────────────────────
function PP_Pebble() {
  const [mode, setMode] = React.useState('expense');
  const bg = '#EBE5D8';
  const ink = '#2D2A24', ink2 = '#65605A', ink3 = '#A5A09A';
  const moss = '#4A6650', mossSoft = 'rgba(74,102,80,0.16)';
  const sans = '"SF Pro Rounded", "Avenir Next Rounded", -apple-system, sans-serif';
  const stoneShadow = '0 8px 16px rgba(45,42,36,0.10), 0 1px 2px rgba(45,42,36,0.06)';

  const cats = [
    { id: 'food', title: '飲食', iconId: 13, total: '−NT$1,425', expanded: true },
    { id: 'shop', title: '購物', iconId: 28, total: '−NT$1,290', expanded: false },
    { id: 'trans', title: '交通', iconId: 23, total: '−NT$60', expanded: false },
  ];
  const items_food = [
    { date: '5/2', note: '路易莎咖啡', acc: '國泰世華', amount: '−NT$185' },
    { date: '5/2', note: '便當', acc: '現金', amount: '−NT$120' },
    { date: '5/1', note: '居酒屋', acc: '國泰世華', amount: '−NT$780' },
  ];
  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', background: bg, color: ink, fontFamily: sans }}>
      {/* 背景漂浮卵石形狀 */}
      <div style={{ position: 'absolute', top: 90, right: -50, width: 160, height: 130,
        borderRadius: '60% 50% 50% 60% / 55% 60% 55% 60%',
        background: 'rgba(74,102,80,0.10)', filter: 'blur(8px)', pointerEvents: 'none' }}/>
      <div style={{ position: 'absolute', top: 480, left: -40, width: 130, height: 110,
        borderRadius: '55% 65% 50% 55% / 60% 55% 60% 55%',
        background: 'rgba(74,102,80,0.08)', filter: 'blur(10px)', pointerEvents: 'none' }}/>
      <div style={{ position: 'absolute', inset: 0, overflowY: 'auto', overflowX: 'hidden', paddingBottom: 140 }}>
        <div style={{ paddingTop: 56, paddingBottom: 14, paddingLeft: 22, paddingRight: 22,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <button style={{ width: 42, height: 38, border: 'none', cursor: 'pointer',
            borderRadius: '50% 60% 55% 50% / 55% 50% 55% 60%',
            background: bg, boxShadow: stoneShadow,
            display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Glyph name="filter" size={18} color={ink2}/></button>
          <div style={{ fontSize: 18, fontWeight: 600, color: ink, letterSpacing: -0.2 }}>SuSuGiGi</div>
          <div style={{ display: 'flex', gap: 8 }}>
            <button style={{ width: 42, height: 38, border: 'none', cursor: 'pointer',
              borderRadius: '60% 50% 50% 60% / 50% 55% 60% 50%',
              background: bg, boxShadow: stoneShadow,
              display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Glyph name="search" size={18} color={ink2}/></button>
            <button style={{ width: 42, height: 38, border: 'none', cursor: 'pointer',
              borderRadius: '50% 55% 60% 50% / 60% 50% 55% 55%',
              background: bg, boxShadow: stoneShadow,
              display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Glyph name="gear" size={18} color={ink2}/></button>
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', paddingTop: 4, paddingBottom: 8 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14,
            paddingLeft: 22, paddingRight: 22, paddingTop: 10, paddingBottom: 10,
            borderRadius: '55% 50% 60% 50% / 50% 60% 50% 55%',
            background: bg, boxShadow: stoneShadow }}>
            <Glyph name="chevron-left" size={13} color={ink2}/>
            <span style={{ fontSize: 14, fontWeight: 500, color: ink, letterSpacing: 2 }}>May · 2026</span>
            <Glyph name="chevron-right" size={13} color={ink2}/>
          </div>
        </div>
        <div style={{ textAlign: 'center', paddingTop: 14, paddingBottom: 10 }}>
          <div style={{ fontSize: 11, color: moss, letterSpacing: 3, fontWeight: 600, marginBottom: 6 }}>BALANCE</div>
          <div style={{ fontSize: 42, fontWeight: 400, color: ink, fontVariantNumeric: 'tabular-nums', letterSpacing: -1.2 }}>NT$184,295</div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: 8, marginBottom: 18 }}>
          <div style={{ width: 252, height: 232,
            borderRadius: '52% 48% 50% 50% / 50% 52% 48% 50%',
            background: bg, boxShadow: stoneShadow,
            display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <DonutChart data={[
              { key: 'a', value: 38, color: moss },
              { key: 'b', value: 22, color: '#65605A' },
              { key: 'c', value: 18, color: '#A5A09A' },
              { key: 'd', value: 12, color: '#C9C2B5' },
              { key: 'e', value: 10, color: '#DDD6C6' },
            ]} size={196} outerRadius={80} innerRadius={64} cornerRadius={5}>
              <div style={{ textAlign: 'center', width: 100 }}>
                <div style={{ fontSize: 10, color: moss, letterSpacing: 3, fontWeight: 600 }}>OUT</div>
                <div style={{ fontSize: 19, fontWeight: 500, color: ink, fontVariantNumeric: 'tabular-nums' }}>$5,985</div>
              </div>
            </DonutChart>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 14, paddingLeft: 22, paddingRight: 22, paddingBottom: 18 }}>
          {[
            { kind: 'expense', amount: '5,985', label: 'OUT', rad: '55% 50% 50% 55% / 50% 60% 50% 55%' },
            { kind: 'income', amount: '68,000', label: 'IN', rad: '50% 55% 55% 50% / 60% 50% 55% 50%' },
          ].map(c => {
            const active = c.kind === mode;
            return (
              <button key={c.kind} onClick={() => setMode(c.kind)} style={{
                flex: 1, display: 'flex', flexDirection: 'column', gap: 4,
                paddingTop: 16, paddingBottom: 16, paddingLeft: 18, paddingRight: 18,
                borderRadius: c.rad,
                background: active ? mossSoft : bg, boxShadow: stoneShadow,
                border: active ? `1.5px solid ${moss}` : 'none',
                cursor: active ? 'default' : 'pointer', fontFamily: 'inherit', textAlign: 'left',
              }}>
                <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: 3, color: active ? moss : ink2 }}>{c.label}</span>
                <span style={{ fontSize: 22, fontWeight: 500, color: ink, fontVariantNumeric: 'tabular-nums', letterSpacing: -0.4 }}>NT${c.amount}</span>
              </button>
            );
          })}
        </div>
        <div style={{ paddingLeft: 22, paddingRight: 22 }}>
          {cats.map((c, idx) => {
            const rad = ['50% 55% 50% 55% / 55% 50% 55% 50%',
                         '55% 50% 55% 50% / 50% 55% 50% 55%',
                         '52% 53% 48% 52% / 48% 52% 52% 50%'][idx];
            return (
              <div key={c.id} style={{ marginBottom: 14, borderRadius: rad,
                background: bg, boxShadow: stoneShadow, overflow: 'hidden' }}>
                <div style={{ paddingLeft: 18, paddingRight: 22,
                  paddingTop: c.expanded ? 14 : 12, paddingBottom: c.expanded ? 14 : 12,
                  display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{ width: 14, transform: `rotate(${c.expanded ? 90 : 0}deg)` }}>
                    <Glyph name="chevron-right" size={12} color={ink2}/></div>
                  <div style={{ width: 38, height: 34,
                    borderRadius: '52% 48% 55% 50% / 50% 55% 50% 50%',
                    background: mossSoft,
                    display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <DynamicIconById iconId={c.iconId} size={16} color={moss}/></div>
                  <span style={{ flex: 1, fontSize: c.expanded ? 16 : 15, fontWeight: 500, color: ink, letterSpacing: 0.3 }}>{c.title}</span>
                  <span style={{ fontSize: c.expanded ? 15 : 13, fontWeight: 500, color: ink, fontVariantNumeric: 'tabular-nums' }}>{c.total}</span>
                </div>
                {c.expanded && (
                  <div style={{ paddingLeft: 22, paddingRight: 22, paddingBottom: 14 }}>
                    {items_food.map((tx, i) => (
                      <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12,
                        marginTop: 8, paddingTop: 8, paddingBottom: 8, paddingLeft: 12, paddingRight: 14,
                        borderRadius: '50% 55% 55% 50% / 55% 50% 50% 55%',
                        background: 'rgba(74,102,80,0.06)' }}>
                        <span style={{ fontSize: 11, fontWeight: 500, color: moss, fontVariantNumeric: 'tabular-nums', width: 30 }}>{tx.date}</span>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ fontSize: 13, color: ink, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{tx.note}</div>
                          <div style={{ fontSize: 10, color: ink3 }}>{tx.acc}</div>
                        </div>
                        <span style={{ fontSize: 14, color: ink, fontVariantNumeric: 'tabular-nums' }}>{tx.amount}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
      <div style={{ position: 'absolute', bottom: 24, left: 0, right: 0, display: 'flex', justifyContent: 'center', zIndex: 10, pointerEvents: 'none' }}>
        <div style={{ width: 224, height: 66,
          borderRadius: '50% 55% 55% 50% / 55% 50% 55% 50%',
          background: bg, boxShadow: stoneShadow,
          pointerEvents: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'space-around', paddingLeft: 10, paddingRight: 10 }}>
          {['minus', 'exchange', 'plus'].map((g, i) => (
            <button key={i} style={{ width: 48, height: 44, border: 'none', cursor: 'pointer',
              borderRadius: '50% 55% 50% 55% / 55% 50% 55% 50%',
              background: mossSoft,
              display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Glyph name={g} size={20} color={moss} stroke={g === 'exchange' ? 2.2 : 2}/></button>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── V24 · Cotton Candy ──────────────────────────────────────
function PP_CottonCandy() {
  const [mode, setMode] = React.useState('expense');
  const bg = 'linear-gradient(135deg, #FFE5F4 0%, #F0E2FF 45%, #D8E5FF 100%)';
  const ink = '#4A2C5C', ink2 = '#7A5C8F', ink3 = '#A893BD';
  const skyBlue = '#6B9DF0', skyBlueSoft = 'rgba(107,157,240,0.20)';
  const pink = '#FFB4D8';
  const sans = '"SF Pro Rounded", "Avenir Next Rounded", -apple-system, sans-serif';
  const cardShadow = '0 8px 24px rgba(74,44,92,0.10)';

  const cats = [
    { id: 'food', title: '飲食', iconId: 13, total: '−NT$1,425', expanded: true },
    { id: 'shop', title: '購物', iconId: 28, total: '−NT$1,290', expanded: false },
    { id: 'trans', title: '交通', iconId: 23, total: '−NT$60', expanded: false },
  ];
  const items_food = [
    { date: '5/2', note: '路易莎咖啡', acc: '國泰世華 信用卡', amount: '−NT$185' },
    { date: '5/2', note: '便當', acc: '現金', amount: '−NT$120' },
    { date: '5/1', note: '居酒屋', acc: '國泰世華 信用卡', amount: '−NT$780' },
  ];
  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', background: bg, color: ink, fontFamily: sans }}>
      {/* 飄浮雲朵 */}
      <div style={{ position: 'absolute', top: 120, right: -30, width: 180, height: 100, borderRadius: '60% 50% 55% 60% / 65% 55% 60% 55%',
        background: 'rgba(255,180,216,0.30)', filter: 'blur(20px)', pointerEvents: 'none' }}/>
      <div style={{ position: 'absolute', top: 440, left: -40, width: 200, height: 120, borderRadius: '55% 60% 60% 55% / 60% 55% 55% 60%',
        background: 'rgba(107,157,240,0.25)', filter: 'blur(22px)', pointerEvents: 'none' }}/>
      <div style={{ position: 'absolute', inset: 0, overflowY: 'auto', overflowX: 'hidden', paddingBottom: 140 }}>
        <div style={{ paddingTop: 56, paddingBottom: 14, paddingLeft: 22, paddingRight: 22,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <button style={{ width: 42, height: 42, borderRadius: 21, border: 'none', cursor: 'pointer',
            background: 'rgba(255,255,255,0.55)', backdropFilter: 'blur(14px)', WebkitBackdropFilter: 'blur(14px)',
            boxShadow: cardShadow,
            display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Glyph name="filter" size={18} color={ink2}/></button>
          <div style={{ fontSize: 19, fontWeight: 700, color: ink, letterSpacing: -0.4 }}>SuSuGiGi</div>
          <div style={{ display: 'flex', gap: 8 }}>
            <button style={{ width: 42, height: 42, borderRadius: 21, border: 'none', cursor: 'pointer',
              background: 'rgba(255,255,255,0.55)', backdropFilter: 'blur(14px)', WebkitBackdropFilter: 'blur(14px)',
              boxShadow: cardShadow,
              display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Glyph name="search" size={18} color={ink2}/></button>
            <button style={{ width: 42, height: 42, borderRadius: 21, border: 'none', cursor: 'pointer',
              background: 'rgba(255,255,255,0.55)', backdropFilter: 'blur(14px)', WebkitBackdropFilter: 'blur(14px)',
              boxShadow: cardShadow,
              display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Glyph name="gear" size={18} color={ink2}/></button>
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', paddingTop: 4, paddingBottom: 6 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14,
            paddingLeft: 20, paddingRight: 20, paddingTop: 10, paddingBottom: 10,
            borderRadius: 999, background: 'rgba(255,255,255,0.55)',
            backdropFilter: 'blur(18px)', WebkitBackdropFilter: 'blur(18px)',
            boxShadow: cardShadow }}>
            <Glyph name="chevron-left" size={14} color={ink2}/>
            <span style={{ fontSize: 14, fontWeight: 600, color: ink, letterSpacing: 1 }}>2026 · 5 月</span>
            <Glyph name="chevron-right" size={14} color={ink2}/>
          </div>
        </div>
        <div style={{ textAlign: 'center', paddingTop: 14, paddingBottom: 10 }}>
          <div style={{ fontSize: 11, color: pink, letterSpacing: 3, fontWeight: 700, marginBottom: 6 }}>♡ BALANCE</div>
          <div style={{ fontSize: 44, fontWeight: 700, color: ink, fontVariantNumeric: 'tabular-nums', letterSpacing: -1.2 }}>NT$184,295</div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: 10, marginBottom: 20 }}>
          <div style={{ width: 260, height: 240,
            borderRadius: '55% 50% 55% 50% / 55% 50% 50% 55%',
            background: 'rgba(255,255,255,0.55)',
            backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)',
            boxShadow: `0 12px 28px rgba(74,44,92,0.10), inset 0 0 24px rgba(255,180,216,0.10)`,
            display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <DonutChart data={[
              { key: 'a', value: 38, color: skyBlue },
              { key: 'b', value: 22, color: pink },
              { key: 'c', value: 18, color: '#C8AEE5' },
              { key: 'd', value: 12, color: '#A893BD' },
              { key: 'e', value: 10, color: '#E0CFE8' },
            ]} size={200} outerRadius={82} innerRadius={66} cornerRadius={6}>
              <div style={{ textAlign: 'center', width: 100 }}>
                <div style={{ fontSize: 11, color: pink, letterSpacing: 2, fontWeight: 700 }}>OUT</div>
                <div style={{ fontSize: 20, fontWeight: 700, color: ink, fontVariantNumeric: 'tabular-nums' }}>$5,985</div>
              </div>
            </DonutChart>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 12, paddingLeft: 22, paddingRight: 22, paddingBottom: 18 }}>
          {[{ kind: 'expense', amount: '5,985', label: 'OUT', col: pink }, { kind: 'income', amount: '68,000', label: 'IN', col: skyBlue }].map(c => {
            const active = c.kind === mode;
            return (
              <button key={c.kind} onClick={() => setMode(c.kind)} style={{
                flex: 1, display: 'flex', flexDirection: 'column', gap: 4,
                paddingTop: 14, paddingBottom: 14, paddingLeft: 16, paddingRight: 16,
                borderRadius: 24,
                background: active ? 'rgba(255,255,255,0.75)' : 'rgba(255,255,255,0.40)',
                backdropFilter: 'blur(18px)', WebkitBackdropFilter: 'blur(18px)',
                border: active ? `2px solid ${c.col}` : 'none',
                boxShadow: cardShadow,
                cursor: active ? 'default' : 'pointer', fontFamily: 'inherit', textAlign: 'left',
              }}>
                <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: 2.5, color: active ? c.col : ink2 }}>{c.label}</span>
                <span style={{ fontSize: 22, fontWeight: 700, color: ink, fontVariantNumeric: 'tabular-nums', letterSpacing: -0.4 }}>NT${c.amount}</span>
              </button>
            );
          })}
        </div>
        <div style={{ paddingLeft: 22, paddingRight: 22 }}>
          {cats.map((c, idx) => {
            const col = [pink, skyBlue, '#C8AEE5'][idx];
            return (
              <div key={c.id} style={{ marginBottom: 14, borderRadius: 26,
                background: 'rgba(255,255,255,0.55)',
                backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)',
                boxShadow: cardShadow, overflow: 'hidden' }}>
                <div style={{ paddingLeft: 16, paddingRight: 18,
                  paddingTop: c.expanded ? 14 : 12, paddingBottom: c.expanded ? 14 : 12,
                  display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{ width: 14, transform: `rotate(${c.expanded ? 90 : 0}deg)` }}>
                    <Glyph name="chevron-right" size={12} color={ink2} stroke={2.2}/></div>
                  <div style={{ width: 42, height: 42, borderRadius: 21,
                    background: col + '38',
                    display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <DynamicIconById iconId={c.iconId} size={18} color={col}/></div>
                  <span style={{ flex: 1, fontSize: c.expanded ? 17 : 15, fontWeight: 700, color: ink, letterSpacing: -0.2 }}>{c.title}</span>
                  <span style={{ fontSize: c.expanded ? 16 : 14, fontWeight: 700, color: ink, fontVariantNumeric: 'tabular-nums' }}>{c.total}</span>
                </div>
                {c.expanded && (
                  <div style={{ paddingLeft: 18, paddingRight: 18, paddingBottom: 14 }}>
                    {items_food.map((tx, i) => (
                      <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12,
                        marginTop: 8, paddingTop: 10, paddingBottom: 10, paddingLeft: 14, paddingRight: 14,
                        borderRadius: 18, background: 'rgba(255,255,255,0.55)' }}>
                        <span style={{ fontSize: 11, fontWeight: 700, color: pink, fontVariantNumeric: 'tabular-nums', width: 30 }}>{tx.date}</span>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ fontSize: 14, fontWeight: 600, color: ink, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{tx.note}</div>
                          <div style={{ fontSize: 11, color: ink3 }}>{tx.acc}</div>
                        </div>
                        <span style={{ fontSize: 14, fontWeight: 700, color: ink, fontVariantNumeric: 'tabular-nums' }}>{tx.amount}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
      <div style={{ position: 'absolute', bottom: 24, left: 0, right: 0, display: 'flex', justifyContent: 'center', zIndex: 10, pointerEvents: 'none' }}>
        <div style={{ width: 224, height: 68, borderRadius: 34,
          background: 'rgba(255,255,255,0.65)',
          backdropFilter: 'blur(28px)', WebkitBackdropFilter: 'blur(28px)',
          boxShadow: '0 12px 28px rgba(74,44,92,0.18)',
          pointerEvents: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'space-around', paddingLeft: 10, paddingRight: 10 }}>
          {[{ g: 'minus', col: pink }, { g: 'exchange', col: '#C8AEE5' }, { g: 'plus', col: skyBlue }].map((b, i) => (
            <button key={i} style={{ width: 50, height: 50, borderRadius: 25, border: 'none', cursor: 'pointer',
              background: b.col + '38',
              display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Glyph name={b.g} size={22} color={b.col} stroke={b.g === 'exchange' ? 2.4 : 2.2}/></button>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── V25 · Soap Bubble ───────────────────────────────────────
function PP_SoapBubble() {
  const [mode, setMode] = React.useState('expense');
  const bg = 'linear-gradient(135deg, #FDF0FF 0%, #E8F7FF 50%, #FFF0F0 100%)';
  const ink = '#3A2C5C', ink2 = '#6F5C8A', ink3 = '#A893BD';
  const bubble1 = '#FF8FB8', bubble2 = '#8FCFFF', bubble3 = '#C5A8FF';
  const bubbleSoft = 'rgba(255,143,184,0.20)';
  const sans = '"SF Pro Rounded", "Avenir Next Rounded", -apple-system, sans-serif';

  const cats = [
    { id: 'food', title: '飲食', iconId: 13, total: '−NT$1,425', expanded: true },
    { id: 'shop', title: '購物', iconId: 28, total: '−NT$1,290', expanded: false },
    { id: 'trans', title: '交通', iconId: 23, total: '−NT$60', expanded: false },
  ];
  const items_food = [
    { date: '5/2', note: '路易莎咖啡', acc: '國泰世華 信用卡', amount: '−NT$185' },
    { date: '5/2', note: '便當', acc: '現金', amount: '−NT$120' },
    { date: '5/1', note: '居酒屋', acc: '國泰世華 信用卡', amount: '−NT$780' },
  ];
  const Bubble = ({ size = 36, color = bubble1 }) => (
    <div style={{ width: size, height: size, borderRadius: '50%',
      background: `radial-gradient(circle at 30% 25%, rgba(255,255,255,0.85) 0%, ${color}cc 40%, ${color}99 100%)`,
      boxShadow: `0 4px 12px ${color}40, inset 0 1px 2px rgba(255,255,255,0.6)`,
      display: 'flex', alignItems: 'center', justifyContent: 'center' }}/>
  );
  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', background: bg, color: ink, fontFamily: sans }}>
      {/* 漂浮泡泡 */}
      <div style={{ position: 'absolute', top: 100, right: 24, width: 60, height: 60, borderRadius: '50%',
        background: `radial-gradient(circle at 30% 25%, rgba(255,255,255,0.85) 0%, ${bubble2}66 60%, ${bubble2}33 100%)`,
        pointerEvents: 'none' }}/>
      <div style={{ position: 'absolute', top: 200, left: 18, width: 40, height: 40, borderRadius: '50%',
        background: `radial-gradient(circle at 30% 25%, rgba(255,255,255,0.85) 0%, ${bubble1}66 60%, ${bubble1}33 100%)`,
        pointerEvents: 'none' }}/>
      <div style={{ position: 'absolute', top: 580, right: 14, width: 50, height: 50, borderRadius: '50%',
        background: `radial-gradient(circle at 30% 25%, rgba(255,255,255,0.85) 0%, ${bubble3}66 60%, ${bubble3}33 100%)`,
        pointerEvents: 'none' }}/>
      <div style={{ position: 'absolute', inset: 0, overflowY: 'auto', overflowX: 'hidden', paddingBottom: 140 }}>
        <div style={{ paddingTop: 56, paddingBottom: 14, paddingLeft: 22, paddingRight: 22,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <button style={{ width: 44, height: 44, borderRadius: '50%', border: 'none', cursor: 'pointer',
            background: `radial-gradient(circle at 30% 25%, rgba(255,255,255,0.85) 0%, ${bubble3}99 50%, ${bubble3}66 100%)`,
            boxShadow: `0 4px 14px ${bubble3}40, inset 0 1px 2px rgba(255,255,255,0.6)`,
            display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Glyph name="filter" size={18} color={ink}/></button>
          <div style={{ fontSize: 19, fontWeight: 700, color: ink, letterSpacing: -0.4 }}>SuSuGiGi</div>
          <div style={{ display: 'flex', gap: 8 }}>
            <button style={{ width: 44, height: 44, borderRadius: '50%', border: 'none', cursor: 'pointer',
              background: `radial-gradient(circle at 30% 25%, rgba(255,255,255,0.85) 0%, ${bubble2}99 50%, ${bubble2}66 100%)`,
              boxShadow: `0 4px 14px ${bubble2}40, inset 0 1px 2px rgba(255,255,255,0.6)`,
              display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Glyph name="search" size={18} color={ink}/></button>
            <button style={{ width: 44, height: 44, borderRadius: '50%', border: 'none', cursor: 'pointer',
              background: `radial-gradient(circle at 30% 25%, rgba(255,255,255,0.85) 0%, ${bubble1}99 50%, ${bubble1}66 100%)`,
              boxShadow: `0 4px 14px ${bubble1}40, inset 0 1px 2px rgba(255,255,255,0.6)`,
              display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Glyph name="gear" size={18} color={ink}/></button>
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', paddingTop: 4, paddingBottom: 6 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14,
            paddingLeft: 22, paddingRight: 22, paddingTop: 10, paddingBottom: 10,
            borderRadius: 999,
            background: `linear-gradient(135deg, rgba(255,255,255,0.85), rgba(255,255,255,0.55))`,
            backdropFilter: 'blur(18px)', WebkitBackdropFilter: 'blur(18px)',
            boxShadow: '0 6px 18px rgba(58,44,92,0.10), inset 0 1px 1px rgba(255,255,255,0.6)' }}>
            <Glyph name="chevron-left" size={14} color={ink2}/>
            <span style={{ fontSize: 14, fontWeight: 600, color: ink, letterSpacing: 1 }}>May · 2026</span>
            <Glyph name="chevron-right" size={14} color={ink2}/>
          </div>
        </div>
        <div style={{ textAlign: 'center', paddingTop: 14, paddingBottom: 10 }}>
          <div style={{ fontSize: 11, color: bubble1, letterSpacing: 4, fontWeight: 700, marginBottom: 6 }}>○ BALANCE ○</div>
          <div style={{ fontSize: 44, fontWeight: 700, color: ink, fontVariantNumeric: 'tabular-nums', letterSpacing: -1.2 }}>NT$184,295</div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: 10, marginBottom: 20 }}>
          <div style={{ width: 256, height: 256, borderRadius: '50%',
            background: `radial-gradient(circle at 28% 22%, rgba(255,255,255,0.90) 0%, rgba(255,200,230,0.50) 35%, rgba(180,210,255,0.45) 70%, rgba(220,180,255,0.50) 100%)`,
            boxShadow: `0 16px 40px rgba(58,44,92,0.16), inset 0 2px 4px rgba(255,255,255,0.7), inset 0 -2px 6px rgba(255,143,184,0.20)`,
            display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <DonutChart data={[
              { key: 'a', value: 38, color: bubble1 },
              { key: 'b', value: 22, color: bubble2 },
              { key: 'c', value: 18, color: bubble3 },
              { key: 'd', value: 12, color: '#FFCFA3' },
              { key: 'e', value: 10, color: '#C0F2D8' },
            ]} size={200} outerRadius={82} innerRadius={66} cornerRadius={8}>
              <div style={{ textAlign: 'center', width: 100 }}>
                <div style={{ fontSize: 10, color: bubble1, letterSpacing: 3, fontWeight: 700 }}>○ OUT ○</div>
                <div style={{ fontSize: 20, fontWeight: 700, color: ink, fontVariantNumeric: 'tabular-nums' }}>$5,985</div>
              </div>
            </DonutChart>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 14, paddingLeft: 22, paddingRight: 22, paddingBottom: 18 }}>
          {[{ kind: 'expense', amount: '5,985', label: 'OUT', col: bubble1 }, { kind: 'income', amount: '68,000', label: 'IN', col: bubble2 }].map(c => {
            const active = c.kind === mode;
            return (
              <button key={c.kind} onClick={() => setMode(c.kind)} style={{
                flex: 1, display: 'flex', flexDirection: 'column', gap: 4,
                paddingTop: 16, paddingBottom: 16, paddingLeft: 18, paddingRight: 18,
                borderRadius: 999,
                background: active
                  ? `radial-gradient(circle at 30% 25%, rgba(255,255,255,0.85) 0%, ${c.col}55 60%, ${c.col}33 100%)`
                  : `linear-gradient(135deg, rgba(255,255,255,0.6), rgba(255,255,255,0.4))`,
                backdropFilter: 'blur(14px)', WebkitBackdropFilter: 'blur(14px)',
                border: 'none',
                boxShadow: active
                  ? `0 8px 20px ${c.col}55, inset 0 1px 2px rgba(255,255,255,0.7)`
                  : `0 6px 16px rgba(58,44,92,0.10)`,
                cursor: active ? 'default' : 'pointer', fontFamily: 'inherit', textAlign: 'left',
              }}>
                <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: 3, color: active ? c.col : ink2 }}>○ {c.label}</span>
                <span style={{ fontSize: 22, fontWeight: 700, color: ink, fontVariantNumeric: 'tabular-nums', letterSpacing: -0.4 }}>NT${c.amount}</span>
              </button>
            );
          })}
        </div>
        <div style={{ paddingLeft: 22, paddingRight: 22 }}>
          {cats.map((c, idx) => {
            const col = [bubble1, bubble2, bubble3][idx];
            return (
              <div key={c.id} style={{ marginBottom: 14, borderRadius: 28,
                background: `linear-gradient(135deg, rgba(255,255,255,0.70), rgba(255,255,255,0.45))`,
                backdropFilter: 'blur(18px)', WebkitBackdropFilter: 'blur(18px)',
                boxShadow: c.expanded
                  ? `0 12px 28px ${col}33, inset 0 1px 2px rgba(255,255,255,0.6)`
                  : `0 8px 20px rgba(58,44,92,0.10)`,
                overflow: 'hidden' }}>
                <div style={{ paddingLeft: 16, paddingRight: 18,
                  paddingTop: c.expanded ? 14 : 12, paddingBottom: c.expanded ? 14 : 12,
                  display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{ width: 14, transform: `rotate(${c.expanded ? 90 : 0}deg)` }}>
                    <Glyph name="chevron-right" size={12} color={ink2} stroke={2.2}/></div>
                  <Bubble size={42} color={col}/>
                  <span style={{ flex: 1, fontSize: c.expanded ? 17 : 15, fontWeight: 700, color: ink, letterSpacing: -0.2, marginLeft: 4 }}>{c.title}</span>
                  <span style={{ fontSize: c.expanded ? 16 : 14, fontWeight: 700, color: ink, fontVariantNumeric: 'tabular-nums' }}>{c.total}</span>
                </div>
                {c.expanded && (
                  <div style={{ paddingLeft: 18, paddingRight: 18, paddingBottom: 14 }}>
                    {items_food.map((tx, i) => (
                      <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12,
                        marginTop: 8, paddingTop: 10, paddingBottom: 10, paddingLeft: 14, paddingRight: 14,
                        borderRadius: 22,
                        background: `linear-gradient(135deg, rgba(255,255,255,0.85), rgba(255,255,255,0.55))` }}>
                        <span style={{ fontSize: 11, fontWeight: 700, color: col, fontVariantNumeric: 'tabular-nums', width: 30 }}>{tx.date}</span>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ fontSize: 14, fontWeight: 600, color: ink, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{tx.note}</div>
                          <div style={{ fontSize: 11, color: ink3 }}>{tx.acc}</div>
                        </div>
                        <span style={{ fontSize: 14, fontWeight: 700, color: ink, fontVariantNumeric: 'tabular-nums' }}>{tx.amount}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
      <div style={{ position: 'absolute', bottom: 24, left: 0, right: 0, display: 'flex', justifyContent: 'center', zIndex: 10, pointerEvents: 'none', gap: 8 }}>
        {[{ g: 'minus', col: bubble1 }, { g: 'exchange', col: bubble3 }, { g: 'plus', col: bubble2 }].map((b, i) => (
          <button key={i} style={{ width: 64, height: 64, borderRadius: '50%', border: 'none', cursor: 'pointer',
            background: `radial-gradient(circle at 30% 25%, rgba(255,255,255,0.85) 0%, ${b.col}cc 50%, ${b.col}99 100%)`,
            boxShadow: `0 8px 20px ${b.col}55, inset 0 2px 4px rgba(255,255,255,0.7)`,
            pointerEvents: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Glyph name={b.g} size={22} color={ink} stroke={b.g === 'exchange' ? 2.4 : 2.2}/></button>
        ))}
      </div>
    </div>
  );
}

// ─── Section render ──────────────────────────────────────────
function PersonalityPackagedSection() {
  const W = 402, H = 874;
  return (
    <>
      <DCSection id="pp-section-row1"
        title="Axis 4 · Personality (packaged) — Row 1"
        subtitle="第一行 V1-V10：Private Bank / Night Studio / Mid-Century / Risograph / Blueprint / Brutalist / Origami / Tropical / Manga / Marble。狀態 Open question · 2026-05-16。">
        <DCArtboard id="pp-v1-privatebank"  label="V1 · Private Bank · 深綠 + 金"                width={W} height={H}>
          <IOSDevice width={W} height={H} dark><PP_PrivateBank/></IOSDevice>
        </DCArtboard>
        <DCArtboard id="pp-v2-nightstudio"  label="V2 · Night Studio · 深炭 + 琥珀 (mono)"       width={W} height={H}>
          <IOSDevice width={W} height={H} dark><PP_NightStudio/></IOSDevice>
        </DCArtboard>
        <DCArtboard id="pp-v3-midcentury"   label="V3 · Mid-Century Modern · 米黃 + 深松綠"      width={W} height={H}>
          <IOSDevice width={W} height={H}><PP_MidCentury/></IOSDevice>
        </DCArtboard>
        <DCArtboard id="pp-v4-risograph"    label="V4 · Risograph Print · 米黃 + 螢光桃粉"       width={W} height={H}>
          <IOSDevice width={W} height={H}><PP_Risograph/></IOSDevice>
        </DCArtboard>
        <DCArtboard id="pp-v5-blueprint"    label="V5 · Industrial Blueprint · 深普魯士藍 + 青"  width={W} height={H}>
          <IOSDevice width={W} height={H} dark><PP_Blueprint/></IOSDevice>
        </DCArtboard>
        <DCArtboard id="pp-v6-brutalist"    label="V6 · Brutalist Concrete · 混凝土灰 + 螢光萊姆" width={W} height={H}>
          <IOSDevice width={W} height={H}><PP_Brutalist/></IOSDevice>
        </DCArtboard>
        <DCArtboard id="pp-v7-origami"      label="V7 · Origami Fold · 紙白 + 櫻花粉 (折線陰影)"  width={W} height={H}>
          <IOSDevice width={W} height={H}><PP_Origami/></IOSDevice>
        </DCArtboard>
        <DCArtboard id="pp-v8-tropical"     label="V8 · Tropical Resort · 椰奶 + 椰葉綠 + 珊瑚"   width={W} height={H}>
          <IOSDevice width={W} height={H}><PP_Tropical/></IOSDevice>
        </DCArtboard>
        <DCArtboard id="pp-v9-manga"        label="V9 · Comic Manga · 米白 + 黑線 + 日漫紅"       width={W} height={H}>
          <IOSDevice width={W} height={H}><PP_Manga/></IOSDevice>
        </DCArtboard>
        <DCArtboard id="pp-v10-marble"      label="V10 · Marble Sculpture · 大理石 + 黑曜石"      width={W} height={H}>
          <IOSDevice width={W} height={H}><PP_Marble/></IOSDevice>
        </DCArtboard>
      </DCSection>
      <DCSection id="pp-section-row2"
        title="Axis 4 · Personality (packaged) — Row 2"
        subtitle="第二行 V11-V20：Vaporwave / Cyberpunk Neon / Pixel Retro / Memphis 80s / Bauhaus / Art Deco / Vintage Map / Wabi-Sabi / Cinema Marquee / Receipt Stack。">
        <DCArtboard id="pp-v11-vaporwave"      label="V11 · Vaporwave · 粉紫青漸層 + 蒂芬妮綠 (蒸汽波)"      width={W} height={H}>
          <IOSDevice width={W} height={H}><PP_Vaporwave/></IOSDevice>
        </DCArtboard>
        <DCArtboard id="pp-v12-cyberpunk"      label="V12 · Cyberpunk Neon · 深紫黑底 + 霓虹粉 (賽博龐克)"  width={W} height={H}>
          <IOSDevice width={W} height={H} dark><PP_Cyberpunk/></IOSDevice>
        </DCArtboard>
        <DCArtboard id="pp-v13-pixel"          label="V13 · Pixel Retro Game · CRT 藍 + GameBoy 綠 (8-bit)" width={W} height={H}>
          <IOSDevice width={W} height={H} dark><PP_Pixel/></IOSDevice>
        </DCArtboard>
        <DCArtboard id="pp-v14-memphis"        label="V14 · Memphis 80s · 米白 + 黑 confetti + 珊瑚 (後現代)" width={W} height={H}>
          <IOSDevice width={W} height={H}><PP_Memphis/></IOSDevice>
        </DCArtboard>
        <DCArtboard id="pp-v15-bauhaus"        label="V15 · Bauhaus Modernist · 米白 + 三原色幾何 (包浩斯)" width={W} height={H}>
          <IOSDevice width={W} height={H}><PP_Bauhaus/></IOSDevice>
        </DCArtboard>
        <DCArtboard id="pp-v16-artdeco"        label="V16 · Art Deco · 黑曜石 + 金箔 + 扇形 (裝飾藝術)"     width={W} height={H}>
          <IOSDevice width={W} height={H} dark><PP_ArtDeco/></IOSDevice>
        </DCArtboard>
        <DCArtboard id="pp-v17-vintagemap"     label="V17 · Vintage Map · 米紙 + sepia + 朱紅 (古地圖)"     width={W} height={H}>
          <IOSDevice width={W} height={H}><PP_VintageMap/></IOSDevice>
        </DCArtboard>
        <DCArtboard id="pp-v18-wabisabi"       label="V18 · Wabi-Sabi · 米茶 + 墨 + 朱印 (侘寂東方)"        width={W} height={H}>
          <IOSDevice width={W} height={H}><PP_WabiSabi/></IOSDevice>
        </DCArtboard>
        <DCArtboard id="pp-v19-cinema"         label="V19 · Cinema Marquee · 深紅 + 燈泡黃 (戲院招牌)"      width={W} height={H}>
          <IOSDevice width={W} height={H} dark><PP_CinemaMarquee/></IOSDevice>
        </DCArtboard>
        <DCArtboard id="pp-v20-receiptstack"   label="V20 · Receipt Stack · 米白印刷紙 + 黑印 + 紅章 (收據堆)" width={W} height={H}>
          <IOSDevice width={W} height={H}><PP_ReceiptStack/></IOSDevice>
        </DCArtboard>
      </DCSection>
      <DCSection id="pp-section-row3"
        title="Axis 4 · Personality (packaged) — Row 3 · 全圓角 · 無切線"
        subtitle="第三行 V21-V25：全圓角、無橫向切割線、無直角 panel；用陰影 / 浮起 / 玻璃 / 卵石形分隔。Claymorphism / Aurora / Pebble / Cotton Candy / Soap Bubble。">
        <DCArtboard id="pp-v21-clay"        label="V21 · Claymorphism Soft 3D · 奶油 + 粉 (軟黏土)"        width={W} height={H}>
          <IOSDevice width={W} height={H}><PP_Claymorphism/></IOSDevice>
        </DCArtboard>
        <DCArtboard id="pp-v22-aurora"      label="V22 · Aurora Borealis · 深藍青綠漸層 + 淺青 (北極光)"   width={W} height={H}>
          <IOSDevice width={W} height={H} dark><PP_Aurora/></IOSDevice>
        </DCArtboard>
        <DCArtboard id="pp-v23-pebble"      label="V23 · Pebble Stone · 米石灰 + 苔綠 (有機卵石形)"        width={W} height={H}>
          <IOSDevice width={W} height={H}><PP_Pebble/></IOSDevice>
        </DCArtboard>
        <DCArtboard id="pp-v24-cotton"      label="V24 · Cotton Candy · 粉藍漸層 + 粉藍 (棉花糖)"         width={W} height={H}>
          <IOSDevice width={W} height={H}><PP_CottonCandy/></IOSDevice>
        </DCArtboard>
        <DCArtboard id="pp-v25-bubble"      label="V25 · Soap Bubble · 彩虹光暈 + 粉藍紫 (肥皂泡)"          width={W} height={H}>
          <IOSDevice width={W} height={H}><PP_SoapBubble/></IOSDevice>
        </DCArtboard>
      </DCSection>
    </>
  );
}

Object.assign(window, { PersonalityPackagedSection });
