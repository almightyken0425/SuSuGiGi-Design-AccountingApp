// ─────────────────────────────────────────────────────────────
// Exploration · Axis 3 — Iconography & Embellishment
//
// 配色維持 Classic Purple，質感維持 Liquid Glass。每個 variant 的 icon
// 風格貫穿到 Header / Period / FocusRow / Section / Recurring / FAB 等
// 所有 icon 出現的位置。
//
//   V1 Glassmorphic Chip · 玻璃方塊 chip
//   V2 Monochrome Filled · 主色實心 chip + 白 icon
//   V3 Soft Pastel Tile  · 淺主色 tile
//   V4 Glass Sphere      · 球形玻璃 + radial highlight
//   V5 Soft Embossed     · 淺色 + inset shadow 凹陷感
//   V6 Sticker           · 白底 + 粗描邊 + offset shadow
//   V7 Tag Cut Corner    · 主色實心 + 右下斜切
// ─────────────────────────────────────────────────────────────

const IE_ACCENT = '#4323a0';
const IE_INK    = '#1B1340';
const IE_INK2   = '#5C4F8C';
const IE_INK3   = '#9D93C7';
const IE_HAIR   = 'rgba(60,40,140,0.10)';
const IE_BG     = 'linear-gradient(155deg, #DCD3FF 0%, #F4E9FF 38%, #E1F3FF 78%, #FFE8F0 100%)';

// 取 variant 下 icon 該用的顏色
function IE_iconColor(variant, dim = false) {
  if (dim) return IE_INK2;
  if (variant === 'mono' || variant === 'tagcut') return '#fff';
  return IE_ACCENT;
}

function IE_actionStroke(def) {
  return def === 'exchange' ? 2.4 : 2;
}

// ═════════════════════════════════════════════════════════════
// 統一 wrap：包 icon 進 variant 對應的 chip 外觀
// 用在 Header / Period / FocusRow / FAB / Recurring 等位置
// ═════════════════════════════════════════════════════════════
function IE_ActionWrap({ variant, size = 32, children, dim = false }) {
  if (variant === 'glasschip') {
    return (
      <div style={{
        width: size, height: size, borderRadius: 10,
        background: dim ? 'rgba(255,255,255,0.35)' : 'rgba(255,255,255,0.55)',
        backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)',
        border: `1px solid rgba(255,255,255,${dim ? 0.55 : 0.85})`,
        boxShadow: dim ? 'none' : '0 2px 6px rgba(30,18,80,0.06)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>{children}</div>
    );
  }
  if (variant === 'mono') {
    return (
      <div style={{
        width: size, height: size, borderRadius: 10,
        background: dim ? 'transparent' : IE_ACCENT,
        border: dim ? `1px solid ${IE_INK3}` : 'none',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>{children}</div>
    );
  }
  if (variant === 'pastel') {
    return (
      <div style={{
        width: size, height: size, borderRadius: 10,
        background: dim ? 'rgba(67,35,160,0.05)' : 'rgba(67,35,160,0.12)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>{children}</div>
    );
  }
  if (variant === 'sphere') {
    const glow = dim ? 0.55 : 0.95;
    const mid = dim ? 0.25 : 0.55;
    return (
      <div style={{
        width: size, height: size, borderRadius: '50%',
        background: `radial-gradient(circle at 30% 25%, rgba(255,255,255,${glow}) 0%, rgba(255,255,255,${mid}) 40%, rgba(220,200,255,0.20) 100%)`,
        backdropFilter: 'blur(14px)', WebkitBackdropFilter: 'blur(14px)',
        border: '1px solid rgba(255,255,255,0.85)',
        boxShadow: dim ? 'none' : '0 4px 10px rgba(30,18,80,0.10), inset 0 1px 2px rgba(255,255,255,0.7)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>{children}</div>
    );
  }
  if (variant === 'embossed') {
    return (
      <div style={{
        width: size, height: size, borderRadius: 10,
        background: dim ? 'rgba(67,35,160,0.04)' : 'rgba(67,35,160,0.08)',
        boxShadow: 'inset 1.5px 1.5px 3px rgba(67,35,160,0.25), inset -1.5px -1.5px 3px rgba(255,255,255,0.85)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>{children}</div>
    );
  }
  if (variant === 'sticker') {
    return (
      <div style={{
        width: size, height: size, borderRadius: 10,
        background: '#FFFFFF',
        border: `2px solid ${dim ? IE_INK3 : IE_ACCENT}`,
        boxShadow: dim ? 'none' : `2.5px 2.5px 0 rgba(67,35,160,0.30)`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>{children}</div>
    );
  }
  if (variant === 'tagcut') {
    return (
      <div style={{
        width: size, height: size,
        background: dim ? 'rgba(67,35,160,0.22)' : IE_ACCENT,
        clipPath: 'polygon(0 0, 100% 0, 100% 70%, 78% 100%, 0 100%)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>{children}</div>
    );
  }
  return <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{children}</div>;
}

// Category icon (出現在 section header / 單筆紀錄的類別槽)
function IE_CategoryIcon({ variant, catId, size = 36 }) {
  const iconId = CAT_BY_ID[catId]?.iconId || 9;
  const color = IE_iconColor(variant);
  const inner = <DynamicIconById iconId={iconId} size={Math.round(size * 0.55)} color={color}/>;
  return <IE_ActionWrap variant={variant} size={size}>{inner}</IE_ActionWrap>;
}

// Recurring icon (單筆紀錄列裡的循環圖示)
function IE_RecurringIcon({ variant }) {
  return (
    <IE_ActionWrap variant={variant} size={22} dim>
      <Glyph name="repeat" size={11} color={IE_INK3} stroke={1.8}/>
    </IE_ActionWrap>
  );
}

// ═════════════════════════════════════════════════════════════
// Header / Period / Donut / FocusRow / Section / FAB
// ═════════════════════════════════════════════════════════════
function IE_Header({ variant }) {
  const utilSize = 18;
  const wrapSize = 36;
  const color = IE_iconColor(variant);
  return (
    <div style={{
      paddingTop: 56, paddingBottom: 8, paddingLeft: 16, paddingRight: 16,
      display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: IE_INK,
    }}>
      <button style={{ width: 40, height: 40, border: 'none', background: 'transparent', cursor: 'pointer',
        display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <IE_ActionWrap variant={variant} size={wrapSize}>
          <Glyph name="filter" size={utilSize} color={color}/>
        </IE_ActionWrap>
      </button>
      <div style={{ fontSize: 17, fontWeight: 600, letterSpacing: -0.2 }}>SuSuGiGi</div>
      <div style={{ display: 'flex', gap: 4 }}>
        <button style={{ width: 40, height: 40, border: 'none', background: 'transparent', cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <IE_ActionWrap variant={variant} size={wrapSize}>
            <Glyph name="search" size={utilSize} color={color}/>
          </IE_ActionWrap>
        </button>
        <button style={{ width: 40, height: 40, border: 'none', background: 'transparent', cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <IE_ActionWrap variant={variant} size={wrapSize}>
            <Glyph name="gear" size={utilSize} color={color}/>
          </IE_ActionWrap>
        </button>
      </div>
    </div>
  );
}

function IE_PeriodSwitcher({ variant }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', paddingTop: 8, paddingBottom: 8 }}>
      <div style={{
        background: 'rgba(255,255,255,0.55)',
        backdropFilter: 'blur(24px)', WebkitBackdropFilter: 'blur(24px)',
        border: '1px solid rgba(255,255,255,0.85)',
        borderRadius: 999, paddingTop: 8, paddingBottom: 8, paddingLeft: 14, paddingRight: 14,
        display: 'flex', alignItems: 'center', gap: 12,
        boxShadow: '0 4px 12px rgba(30,18,80,0.06)',
      }}>
        <Glyph name="chevron-left" size={14} color={IE_INK3} stroke={2.5}/>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <IE_ActionWrap variant={variant} size={26}>
            <Glyph name="calendar" size={12} color={IE_iconColor(variant)} stroke={2}/>
          </IE_ActionWrap>
          <span style={{ fontSize: 16, fontWeight: 500, color: IE_INK, letterSpacing: -0.2 }}>2026年5月</span>
        </div>
        <Glyph name="chevron-right" size={14} color={IE_INK3} stroke={2.5}/>
      </div>
    </div>
  );
}

function IE_Donut() {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', marginTop: 8, marginBottom: 14 }}>
      <div style={{
        width: 280, height: 280, borderRadius: 140,
        background: 'rgba(255,255,255,0.35)',
        backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)',
        border: '1px solid rgba(255,255,255,0.7)',
        boxShadow: '0 12px 32px rgba(30,18,80,0.10)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <DonutChart data={[
          { key: 'a', value: 38, color: '#4323a0' },
          { key: 'b', value: 22, color: '#6248b0' },
          { key: 'c', value: 18, color: '#826cc0' },
          { key: 'd', value: 12, color: '#a191d0' },
          { key: 'e', value: 10, color: '#c0b6df' },
        ]} size={240} outerRadius={92} innerRadius={70}>
          <div style={{ textAlign: 'center', width: 100 }}>
            <div style={{ fontSize: 13, color: IE_INK2, marginBottom: 4 }}>餘額</div>
            <div style={{ fontSize: 21, fontWeight: 500, color: IE_INK, fontVariantNumeric: 'tabular-nums', letterSpacing: -0.4 }}>NT$184,295</div>
          </div>
        </DonutChart>
      </div>
    </div>
  );
}

function IE_FocusRow({ variant, chartMode, onMode }) {
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
            flex: 1, display: 'flex', alignItems: 'center', gap: 10,
            paddingTop: 12, paddingBottom: 12, paddingLeft: 12, paddingRight: 12,
            background: active ? 'rgba(255,255,255,0.85)' : 'rgba(255,255,255,0.40)',
            backdropFilter: 'blur(24px)', WebkitBackdropFilter: 'blur(24px)',
            border: active ? `1.5px solid ${IE_ACCENT}` : '1px solid rgba(255,255,255,0.65)',
            borderRadius: 12, fontFamily: 'inherit',
            boxShadow: active ? '0 4px 12px rgba(30,18,80,0.08)' : 'none',
            cursor: active ? 'default' : 'pointer',
          }}>
            <IE_ActionWrap variant={variant} size={32} dim={!active}>
              <Glyph name={c.icon} size={14} color={IE_iconColor(variant, !active)} stroke={IE_actionStroke()}/>
            </IE_ActionWrap>
            <span style={{
              flex: 1, textAlign: 'right',
              fontSize: 16, fontWeight: 500,
              color: active ? IE_INK : IE_INK2,
              fontVariantNumeric: 'tabular-nums',
            }}>{c.amount}</span>
          </button>
        );
      })}
    </div>
  );
}

function IE_SectionCard({ variant, catId, title, total, expanded, items }) {
  return (
    <div style={{
      marginLeft: 16, marginRight: 16, marginBottom: 12,
      background: 'rgba(255,255,255,0.55)',
      backdropFilter: 'blur(28px)', WebkitBackdropFilter: 'blur(28px)',
      border: '1px solid rgba(255,255,255,0.85)',
      borderRadius: 18, overflow: 'hidden',
      boxShadow: '0 8px 24px rgba(30,18,80,0.10)',
    }}>
      <div style={{
        paddingLeft: 12, paddingRight: 16,
        paddingTop: expanded ? 14 : 10, paddingBottom: expanded ? 14 : 10,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, flex: 1, minWidth: 0 }}>
          <div style={{ width: 14, transform: `rotate(${expanded ? 90 : 0}deg)`,
            display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Glyph name="chevron-right" size={12} color={IE_INK2} stroke={2.5}/>
          </div>
          <IE_CategoryIcon variant={variant} catId={catId} size={36}/>
          <span style={{
            fontSize: expanded ? 16 : 15, fontWeight: 500, color: IE_INK,
            whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
          }}>{title}</span>
        </div>
        <span style={{
          fontSize: expanded ? 16 : 15, fontWeight: 500, color: IE_INK,
          fontVariantNumeric: 'tabular-nums',
        }}>{total}</span>
      </div>
      {expanded && items.map((tx, i) => (
        <div key={i} style={{ borderTop: `0.5px solid ${IE_HAIR}` }}>
          <div style={{
            display: 'flex', alignItems: 'center', gap: 12,
            paddingLeft: 16, paddingRight: 16, paddingTop: 12, paddingBottom: 12,
          }}>
            <div style={{ width: 40, textAlign: 'center' }}>
              <span style={{ fontSize: 12, fontWeight: 500, color: IE_INK2, fontVariantNumeric: 'tabular-nums' }}>{tx.date}</span>
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 15, color: IE_INK, marginBottom: 2,
                whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{tx.note}</div>
              <div style={{ fontSize: 12, color: IE_INK2,
                whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{tx.acc}</div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              {tx.recurring && <IE_RecurringIcon variant={variant}/>}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                <span style={{ fontSize: 16, fontWeight: 500, color: IE_INK, fontVariantNumeric: 'tabular-nums' }}>{tx.amount}</span>
                {tx.converted && <span style={{ fontSize: 12, color: IE_INK2, fontVariantNumeric: 'tabular-nums' }}>≈ {tx.converted}</span>}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function IE_FAB({ variant }) {
  return (
    <div style={{
      position: 'absolute', bottom: 24, left: 0, right: 0,
      display: 'flex', justifyContent: 'center', zIndex: 10, pointerEvents: 'none',
    }}>
      <div style={{
        width: 208, height: 72, borderRadius: 36,
        background: 'rgba(255,255,255,0.55)',
        backdropFilter: 'blur(28px)', WebkitBackdropFilter: 'blur(28px)',
        border: '1px solid rgba(255,255,255,0.85)',
        boxShadow: '0 12px 28px rgba(30,18,80,0.14)',
        pointerEvents: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'space-around',
        paddingLeft: 8, paddingRight: 8,
      }}>
        {['minus', 'exchange', 'plus'].map((g, i) => (
          <button key={i} style={{
            width: 56, height: 56, border: 'none', background: 'transparent', cursor: 'pointer',
            borderRadius: 28, display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <IE_ActionWrap variant={variant} size={44}>
              <Glyph name={g} size={22} color={IE_iconColor(variant)} stroke={IE_actionStroke(g)}/>
            </IE_ActionWrap>
          </button>
        ))}
      </div>
    </div>
  );
}

function Home_IE({ variant }) {
  const [chartMode, setChartMode] = React.useState('expense');
  const items_food = [
    { date: '5/2', note: '路易莎咖啡', acc: '國泰世華 信用卡', amount: '-NT$185' },
    { date: '5/2', note: '便當',       acc: '現金',           amount: '-NT$120' },
    { date: '5/1', note: '居酒屋',     acc: '國泰世華 信用卡', amount: '-NT$780', recurring: true },
  ];
  const items_shop = [
    { date: '5/1', note: 'Uniqlo T-shirt × 2', acc: 'USD 旅費', amount: '-US$40', converted: 'NT$1,290' },
  ];
  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', background: IE_BG,
      fontFamily: '-apple-system, "SF Pro", "PingFang TC", "Noto Sans TC", system-ui, sans-serif' }}>
      <div style={{ position: 'absolute', inset: 0, overflowY: 'auto', overflowX: 'hidden', paddingBottom: 140 }}>
        <IE_Header variant={variant}/>
        <IE_PeriodSwitcher variant={variant}/>
        <IE_Donut/>
        <IE_FocusRow variant={variant} chartMode={chartMode} onMode={setChartMode}/>
        <IE_SectionCard variant={variant} catId="food" title="飲食" total="-NT$1,425" expanded items={items_food}/>
        <IE_SectionCard variant={variant} catId="shop" title="購物" total="-NT$1,290" expanded={false} items={items_shop}/>
        <IE_SectionCard variant={variant} catId="trans" title="交通" total="-NT$60"   expanded={false} items={[]}/>
        <IE_SectionCard variant={variant} catId="home" title="居家" total="-NT$1,480" expanded={false} items={[]}/>
      </div>
      <IE_FAB variant={variant}/>
    </div>
  );
}

function IconographySection() {
  const W = 402, H = 874;
  return (
    <DCSection id="ie-section"
      title="Axis 3 · Iconography & Embellishment"
      subtitle="七個 icon 表達形式並陳；每種風格貫穿全 icon 位置。配色 Classic Purple、質感 Liquid Glass。狀態 Open question · 2026-05-16。">
      <DCArtboard id="ie-v1-glasschip" label="V1 · Glassmorphic Chip · 玻璃方塊 chip"           width={W} height={H}>
        <IOSDevice width={W} height={H}><Home_IE variant="glasschip"/></IOSDevice>
      </DCArtboard>
      <DCArtboard id="ie-v2-mono"      label="V2 · Monochrome Filled · 主色 chip + 白 icon"     width={W} height={H}>
        <IOSDevice width={W} height={H}><Home_IE variant="mono"/></IOSDevice>
      </DCArtboard>
      <DCArtboard id="ie-v3-pastel"    label="V3 · Soft Pastel Tile · 淺主色 tile"              width={W} height={H}>
        <IOSDevice width={W} height={H}><Home_IE variant="pastel"/></IOSDevice>
      </DCArtboard>
      <DCArtboard id="ie-v4-sphere"    label="V4 · Glass Sphere · 球形玻璃 + 高光"              width={W} height={H}>
        <IOSDevice width={W} height={H}><Home_IE variant="sphere"/></IOSDevice>
      </DCArtboard>
      <DCArtboard id="ie-v5-embossed"  label="V5 · Soft Embossed · 淺色 + inset shadow"         width={W} height={H}>
        <IOSDevice width={W} height={H}><Home_IE variant="embossed"/></IOSDevice>
      </DCArtboard>
      <DCArtboard id="ie-v6-sticker"   label="V6 · Sticker · 粗描邊 + offset shadow"            width={W} height={H}>
        <IOSDevice width={W} height={H}><Home_IE variant="sticker"/></IOSDevice>
      </DCArtboard>
      <DCArtboard id="ie-v7-tagcut"    label="V7 · Tag Cut Corner · 主色 + 右下斜切"            width={W} height={H}>
        <IOSDevice width={W} height={H}><Home_IE variant="tagcut"/></IOSDevice>
      </DCArtboard>
    </DCSection>
  );
}

Object.assign(window, { IconographySection });
