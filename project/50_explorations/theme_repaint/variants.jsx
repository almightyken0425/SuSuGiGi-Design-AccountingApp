// ─────────────────────────────────────────────────────────────
// Theme Repaint · variants
// 5 個 theme 的 ShowcaseCard，每張包：色票牆 + Type sample + Mini HomeScreen
// 不依賴 global TOKENS，每張卡片內部自帶 theme 物件
// 素材來源：anthropic/skills theme-factory（5 個預設主題）
// 視覺風格參考：anthropic/skills frontend-design（bold aesthetic、避免 generic AI 味）
// ─────────────────────────────────────────────────────────────

const THEME_VARIANTS = [
  {
    id: 'ocean-depths',
    nameZh: '海洋深處',
    nameEn: 'Ocean Depths',
    tagline: '專業沉穩 · 長期信任型工具',
    mood: 'light',
    palette: {
      bg: '#f1faee', surface: '#ffffff', card: '#ffffff',
      ink: '#1a2332', ink2: '#4a5566', ink3: '#8a96a3',
      primary: '#2d8b8b', primaryDeep: '#1a5959', accent: '#a8dadc',
      divider: 'rgba(26,35,50,0.08)',
      expense: '#e76f51', income: '#2d8b8b',
    },
    chart: ['#1a5959', '#2d8b8b', '#5fb0b0', '#a8dadc', '#d9eaeb'],
    font: {
      display: '"Crimson Pro", "Noto Serif TC", "PingFang TC", serif',
      body: '-apple-system, "PingFang TC", "Helvetica Neue", sans-serif',
      mono: '"SF Mono", ui-monospace, Menlo, monospace',
    },
    bgArt: 'radial-gradient(120% 80% at 85% 10%, rgba(168,218,220,0.55), transparent 55%), radial-gradient(80% 60% at 5% 95%, rgba(45,139,139,0.10), transparent 60%)',
  },
  {
    id: 'midnight-galaxy',
    nameZh: '午夜星空',
    nameEn: 'Midnight Galaxy',
    tagline: 'Dark Mode · 沉浸式記帳',
    mood: 'dark',
    palette: {
      bg: '#1a1428', surface: '#2b1e3e', card: '#3a2a52',
      ink: '#e6e6fa', ink2: '#b5a5cf', ink3: '#7d6e9a',
      primary: '#a490c2', primaryDeep: '#6c5b8c', accent: '#4a4e8f',
      divider: 'rgba(230,230,250,0.10)',
      expense: '#ef9a9a', income: '#a4e0c2',
    },
    chart: ['#a490c2', '#8779b0', '#6c5b8c', '#4a4e8f', '#2f3068'],
    font: {
      display: '"Space Grotesk", "Noto Sans TC", "PingFang TC", sans-serif',
      body: '"Inter", "PingFang TC", -apple-system, sans-serif',
      mono: '"JetBrains Mono", ui-monospace, Menlo, monospace',
    },
    bgArt: 'radial-gradient(80% 60% at 80% 20%, rgba(164,144,194,0.30), transparent 55%), radial-gradient(60% 40% at 15% 80%, rgba(74,78,143,0.35), transparent 60%)',
  },
  {
    id: 'modern-minimalist',
    nameZh: '極簡黑白',
    nameEn: 'Modern Minimalist',
    tagline: '純粹專注數字 · 去情緒化',
    mood: 'light',
    palette: {
      bg: '#fafafa', surface: '#ffffff', card: '#ffffff',
      ink: '#1a1a1a', ink2: '#5a5a5a', ink3: '#9c9c9c',
      primary: '#1a1a1a', primaryDeep: '#000000', accent: '#d3d3d3',
      divider: 'rgba(0,0,0,0.08)',
      expense: '#1a1a1a', income: '#5a5a5a',
    },
    chart: ['#1a1a1a', '#3d3d3d', '#5a5a5a', '#7a7a7a', '#a3a3a3'],
    font: {
      display: '"Inter", "PingFang TC", system-ui, sans-serif',
      body: '"Inter", "PingFang TC", -apple-system, sans-serif',
      mono: '"JetBrains Mono", "SF Mono", ui-monospace, Menlo, monospace',
    },
    bgArt: 'linear-gradient(180deg, rgba(0,0,0,0.015), transparent 40%)',
  },
  {
    id: 'forest-canopy',
    nameZh: '森林冠層',
    nameEn: 'Forest Canopy',
    tagline: '自然有機 · 永續理財感',
    mood: 'light',
    palette: {
      bg: '#faf9f6', surface: '#ffffff', card: '#ffffff',
      ink: '#1a2618', ink2: '#5a6856', ink3: '#a4ac86',
      primary: '#2d4a2b', primaryDeep: '#1c3119', accent: '#7d8471',
      divider: 'rgba(26,38,24,0.10)',
      expense: '#a4474a', income: '#2d4a2b',
    },
    chart: ['#1c3119', '#2d4a2b', '#5e7858', '#a4ac86', '#d4d9bb'],
    font: {
      display: '"Cormorant Garamond", "Noto Serif TC", "PingFang TC", serif',
      body: '"Lora", "Noto Serif TC", "PingFang TC", serif',
      mono: '"IBM Plex Mono", ui-monospace, Menlo, monospace',
    },
    bgArt: 'radial-gradient(100% 70% at 100% 0%, rgba(164,172,134,0.30), transparent 60%), radial-gradient(70% 50% at 0% 100%, rgba(45,74,43,0.08), transparent 60%)',
  },
  {
    id: 'sunset-boulevard',
    nameZh: '夕陽大道',
    nameEn: 'Sunset Boulevard',
    tagline: '暖意生活感 · 情緒派記帳',
    mood: 'light',
    palette: {
      bg: '#fef6ec', surface: '#fffaf0', card: '#ffffff',
      ink: '#264653', ink2: '#5a6b75', ink3: '#9aa5ac',
      primary: '#e76f51', primaryDeep: '#bc4a2e', accent: '#f4a261',
      divider: 'rgba(38,70,83,0.10)',
      expense: '#e76f51', income: '#264653',
    },
    chart: ['#bc4a2e', '#e76f51', '#f4a261', '#e9c46a', '#fde8b0'],
    font: {
      display: '"Playfair Display", "Noto Serif TC", "PingFang TC", serif',
      body: '"DM Sans", "PingFang TC", -apple-system, sans-serif',
      mono: '"DM Mono", ui-monospace, Menlo, monospace',
    },
    bgArt: 'radial-gradient(100% 80% at 100% 0%, rgba(244,162,97,0.40), transparent 55%), radial-gradient(80% 60% at 0% 100%, rgba(231,111,81,0.18), transparent 60%)',
  },
];

// ─────────────────────────────────────────────────────────────
// ThemeShowcaseCard — 單一主題的呈現卡片
// ─────────────────────────────────────────────────────────────

function ThemeShowcaseCard({ theme }) {
  const t = theme;
  const p = t.palette;
  return (
    <div style={{
      width: '100%', height: '100%',
      background: p.bg,
      backgroundImage: t.bgArt,
      color: p.ink,
      fontFamily: t.font.body,
      padding: '32px 36px',
      display: 'flex', flexDirection: 'column', gap: 22,
      position: 'relative', overflow: 'hidden',
    }}>
      {/* Header */}
      <div>
        <div style={{
          fontSize: 11, letterSpacing: 2, color: p.primary,
          textTransform: 'uppercase', marginBottom: 6, fontWeight: 600,
          fontFamily: t.font.body,
        }}>
          {t.nameEn}
        </div>
        <div style={{
          fontSize: 32, fontWeight: 600, lineHeight: 1.05,
          fontFamily: t.font.display, letterSpacing: -0.5,
          color: p.ink,
        }}>
          {t.nameZh}
        </div>
        <div style={{
          fontSize: 13, color: p.ink2, marginTop: 6,
          fontFamily: t.font.body,
        }}>
          {t.tagline}
        </div>
      </div>

      {/* Body: left column (palette + type) / right column (mini home) */}
      <div style={{ display: 'flex', gap: 24, flex: 1, minHeight: 0 }}>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 18, minWidth: 0 }}>
          <PaletteWall theme={t}/>
          <TypeSample theme={t}/>
        </div>
        <div style={{ width: 224, flexShrink: 0, display: 'flex', alignItems: 'stretch' }}>
          <MiniPhoneFrame mood={t.mood}>
            <MiniHomeScreen theme={t}/>
          </MiniPhoneFrame>
        </div>
      </div>
    </div>
  );
}

function PaletteWall({ theme }) {
  const t = theme;
  const p = t.palette;
  const swatches = [
    { label: 'primary',  hex: p.primary,     onLight: t.mood === 'dark' },
    { label: 'primary↓', hex: p.primaryDeep, onLight: t.mood === 'dark' },
    { label: 'accent',   hex: p.accent,      onLight: t.mood !== 'dark' },
    { label: 'surface',  hex: p.surface,     onLight: true,  border: true },
    { label: 'ink',      hex: p.ink,         onLight: t.mood === 'dark' },
    { label: 'ink₂',     hex: p.ink2,        onLight: t.mood === 'dark' },
  ];
  return (
    <div>
      <SectionLabel theme={t}>Palette</SectionLabel>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 8 }}>
        {swatches.map(s => (
          <div key={s.label} style={{
            aspectRatio: '1 / 1',
            background: s.hex,
            borderRadius: 10,
            border: s.border ? `1px solid ${p.divider}` : 'none',
            display: 'flex', alignItems: 'flex-end', justifyContent: 'flex-start',
            padding: 6,
            color: s.onLight ? p.ink : '#ffffff',
            fontSize: 9, fontWeight: 600, letterSpacing: 0.3,
            fontFamily: t.font.mono,
          }}>
            {s.label}
          </div>
        ))}
      </div>
    </div>
  );
}

function TypeSample({ theme }) {
  const t = theme;
  const p = t.palette;
  return (
    <div>
      <SectionLabel theme={t}>Typography</SectionLabel>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        <div style={{
          fontFamily: t.font.display, fontSize: 26, fontWeight: 600,
          color: p.ink, letterSpacing: -0.4, lineHeight: 1.1,
        }}>
          餘額 NT$ 482,520
        </div>
        <div style={{
          fontFamily: t.font.body, fontSize: 13, color: p.ink2,
          lineHeight: 1.5,
        }}>
          記下每一筆收支，看清楚錢去了哪裡 · The quick brown fox.
        </div>
        <div style={{
          fontFamily: t.font.mono, fontSize: 12, color: p.ink3,
          letterSpacing: 0.5, marginTop: 2,
        }}>
          May 2026 · 11 transactions · 7 categories
        </div>
      </div>
    </div>
  );
}

function SectionLabel({ children, theme }) {
  const p = theme.palette;
  return (
    <div style={{
      fontSize: 10, letterSpacing: 1.5, fontWeight: 600,
      color: p.ink3, textTransform: 'uppercase', marginBottom: 10,
      fontFamily: theme.font.body,
    }}>
      {children}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Mini HomeScreen — 不依賴 global TOKENS，吃 theme prop
// ─────────────────────────────────────────────────────────────

function MiniPhoneFrame({ children, mood }) {
  const isDark = mood === 'dark';
  return (
    <div style={{
      width: 224, height: 460,
      borderRadius: 36, padding: 6,
      background: isDark ? '#0a0612' : '#1a1a1a',
      boxShadow: isDark
        ? '0 12px 40px rgba(0,0,0,0.55), inset 0 0 0 1px rgba(255,255,255,0.06)'
        : '0 16px 40px rgba(0,0,0,0.18), inset 0 0 0 1px rgba(255,255,255,0.1)',
    }}>
      <div style={{
        width: '100%', height: '100%',
        borderRadius: 30, overflow: 'hidden',
        background: '#000',
        position: 'relative',
      }}>
        {children}
        <div style={{
          position: 'absolute', top: 7, left: '50%', transform: 'translateX(-50%)',
          width: 70, height: 18, borderRadius: 12, background: '#000',
        }}/>
      </div>
    </div>
  );
}

function MiniHomeScreen({ theme }) {
  const t = theme;
  const p = t.palette;
  const segments = [
    { value: 35, color: t.chart[0] },
    { value: 25, color: t.chart[1] },
    { value: 18, color: t.chart[2] },
    { value: 12, color: t.chart[3] },
    { value: 10, color: t.chart[4] },
  ];
  return (
    <div style={{
      width: '100%', height: '100%',
      background: p.bg,
      backgroundImage: t.bgArt,
      color: p.ink,
      fontFamily: t.font.body,
      paddingTop: 28,
      display: 'flex', flexDirection: 'column',
    }}>
      {/* status bar mock */}
      <div style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        padding: '4px 16px',
        fontSize: 10, color: p.ink, fontFamily: t.font.mono, fontWeight: 600,
      }}>
        <span>9:41</span>
        <span style={{ fontSize: 9 }}>● ● ●</span>
      </div>
      {/* nav header */}
      <div style={{
        padding: '6px 14px 4px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <div style={{
          fontSize: 16, fontWeight: 700, color: p.ink,
          fontFamily: t.font.display, letterSpacing: -0.3,
        }}>
          SuSuGiGi
        </div>
        <div style={{
          width: 22, height: 22, borderRadius: 11,
          background: p.primary, opacity: 0.85,
        }}/>
      </div>
      {/* period switcher */}
      <div style={{
        display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 8,
        padding: '8px 0 4px',
      }}>
        <div style={{
          width: 14, height: 14, borderRadius: 7,
          border: `1.5px solid ${p.ink3}`, opacity: 0.5,
        }}/>
        <div style={{
          fontSize: 13, fontWeight: 600, color: p.ink,
          fontFamily: t.font.display,
        }}>
          2026 年 5 月
        </div>
        <div style={{
          width: 14, height: 14, borderRadius: 7,
          border: `1.5px solid ${p.ink3}`, opacity: 0.5,
        }}/>
      </div>
      {/* donut */}
      <div style={{ display: 'flex', justifyContent: 'center', padding: '6px 0' }}>
        <div style={{ position: 'relative', width: 110, height: 110 }}>
          <MiniDonut size={110} segments={segments} ringWidth={16}/>
          <div style={{
            position: 'absolute', inset: 0,
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
          }}>
            <div style={{ fontSize: 9, color: p.ink2, letterSpacing: 0.5 }}>餘額</div>
            <div style={{
              fontSize: 15, fontWeight: 600, color: p.ink,
              fontFamily: t.font.display, fontVariantNumeric: 'tabular-nums',
              marginTop: 2,
            }}>
              NT$ 482k
            </div>
          </div>
        </div>
      </div>
      {/* focus row */}
      <div style={{ display: 'flex', gap: 8, padding: '4px 14px 10px' }}>
        <FocusMini theme={t} kind="expense" amount="NT$ 12,485" active={true}/>
        <FocusMini theme={t} kind="income"  amount="NT$ 68,000" active={false}/>
      </div>
      {/* section card */}
      <div style={{
        margin: '0 12px 8px',
        background: p.card,
        borderRadius: 12,
        border: `1px solid ${p.divider}`,
        boxShadow: t.mood === 'dark' ? 'none' : '0 1px 3px rgba(0,0,0,0.04)',
      }}>
        <div style={{
          padding: '8px 12px 6px',
          borderBottom: `1px solid ${p.divider}`,
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        }}>
          <div style={{
            fontSize: 12, fontWeight: 600, color: p.ink,
            fontFamily: t.font.display,
          }}>
            May 2
          </div>
          <div style={{
            fontSize: 11, color: p.expense, fontWeight: 600,
            fontFamily: t.font.mono, fontVariantNumeric: 'tabular-nums',
          }}>
            -NT$ 337
          </div>
        </div>
        <TxRow theme={t} icon="🍱" title="便當" sub="現金" amount="-120"/>
        <TxRow theme={t} icon="☕" title="路易莎咖啡" sub="信用卡" amount="-185"/>
        <TxRow theme={t} icon="🚌" title="捷運月票" sub="信用卡" amount="-32" recurring/>
      </div>
    </div>
  );
}

function FocusMini({ theme, kind, amount, active }) {
  const t = theme;
  const p = t.palette;
  const isExpense = kind === 'expense';
  const accent = isExpense ? p.expense : p.income;
  return (
    <div style={{
      flex: 1,
      padding: '8px 10px',
      background: active ? accent : (t.mood === 'dark' ? 'rgba(255,255,255,0.04)' : p.card),
      borderRadius: 12,
      border: `1px solid ${active ? accent : p.divider}`,
      display: 'flex', flexDirection: 'column', gap: 2,
    }}>
      <div style={{
        fontSize: 9, letterSpacing: 0.8, fontWeight: 600,
        color: active ? 'rgba(255,255,255,0.85)' : p.ink2,
        fontFamily: t.font.body, textTransform: 'uppercase',
      }}>
        {isExpense ? '支出' : '收入'}
      </div>
      <div style={{
        fontSize: 13, fontWeight: 600,
        color: active ? '#fff' : p.ink,
        fontFamily: t.font.display, fontVariantNumeric: 'tabular-nums',
        letterSpacing: -0.2,
      }}>
        {amount}
      </div>
    </div>
  );
}

function TxRow({ theme, icon, title, sub, amount, recurring }) {
  const t = theme;
  const p = t.palette;
  return (
    <div style={{
      padding: '7px 12px',
      display: 'flex', alignItems: 'center', gap: 10,
      borderBottom: `1px solid ${p.divider}`,
    }}>
      <div style={{
        width: 22, height: 22, borderRadius: 6,
        background: t.mood === 'dark' ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.04)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 12,
      }}>
        {icon}
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{
          fontSize: 11, color: p.ink, fontWeight: 500,
          fontFamily: t.font.body,
          whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
        }}>
          {title}
          {recurring && (
            <span style={{
              marginLeft: 5, fontSize: 8, color: p.primary,
              border: `1px solid ${p.primary}`, borderRadius: 3,
              padding: '0 3px', letterSpacing: 0.3, fontWeight: 600,
              fontFamily: t.font.body,
            }}>
              循環
            </span>
          )}
        </div>
        <div style={{ fontSize: 9, color: p.ink3, marginTop: 1, fontFamily: t.font.body }}>{sub}</div>
      </div>
      <div style={{
        fontSize: 11, fontWeight: 600, color: p.expense,
        fontFamily: t.font.mono, fontVariantNumeric: 'tabular-nums',
      }}>
        {amount}
      </div>
    </div>
  );
}

function MiniDonut({ size, segments, ringWidth }) {
  const r = size / 2 - ringWidth / 2;
  const cx = size / 2, cy = size / 2;
  const C = 2 * Math.PI * r;
  const total = segments.reduce((s, x) => s + x.value, 0);
  let offset = 0;
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <circle cx={cx} cy={cy} r={r} fill="none" strokeWidth={ringWidth} stroke="rgba(127,127,127,0.10)"/>
      {segments.map((seg, i) => {
        const len = (seg.value / total) * C;
        const el = (
          <circle
            key={i}
            cx={cx} cy={cy} r={r}
            fill="none"
            stroke={seg.color}
            strokeWidth={ringWidth}
            strokeDasharray={`${len} ${C - len}`}
            strokeDashoffset={-offset}
            transform={`rotate(-90 ${cx} ${cy})`}
            strokeLinecap="butt"
          />
        );
        offset += len;
        return el;
      })}
    </svg>
  );
}

// ─────────────────────────────────────────────────────────────
// Intro / Decision Cards · 用 SuSuGiGi 既有 TOKENS（這層仍依賴 global）
// ─────────────────────────────────────────────────────────────

function TR_IntroCard() {
  return (
    <div style={{
      width: '100%', height: '100%', padding: 36,
      background: '#fff', overflow: 'auto',
      fontFamily: '-apple-system, "PingFang TC", "Noto Sans TC", system-ui, sans-serif',
      color: TOKENS.ink,
    }}>
      <div style={{
        fontSize: 11, letterSpacing: 1.5, fontWeight: 600, color: TOKENS.p500,
        textTransform: 'uppercase', marginBottom: 8,
      }}>
        Why
      </div>
      <h2 style={{ fontSize: 22, fontWeight: 600, margin: '0 0 16px', letterSpacing: -0.3 }}>
        為什麼做這輪 Theme Repaint
      </h2>
      <p style={{ fontSize: 14, lineHeight: 1.7, margin: '0 0 12px' }}>
        SuSuGiGi 目前的 PALETTE 只有「經典紫」「海洋藍」兩個主題。
        進入下一輪視覺迭代之前，需要先看清「主題只是換 token，還是要連 typography／資訊密度／空間語言一起換」。
      </p>
      <p style={{ fontSize: 14, lineHeight: 1.7, margin: '0 0 12px', color: TOKENS.ink2 }}>
        本輪用 anthropic 公開的 <code>theme-factory</code> 主題庫做一次低成本素描，目的是
        <b style={{ color: TOKENS.ink }}>蒐集刺激</b>而非<b style={{ color: TOKENS.ink }}>選定方向</b>——讓 PM 先看到多種延伸感受，再決定下一輪要往哪走。
      </p>
      <div style={{
        marginTop: 16, padding: '10px 14px',
        background: TOKENS.surface2, borderRadius: 8,
        fontSize: 13, lineHeight: 1.6, color: TOKENS.ink2,
      }}>
        每張 ShowcaseCard 包：色票牆 / 字體 sample（中文 + 數字 + 英文）/ Mini HomeScreen mockup。
        Mini HomeScreen 是獨立簡化版，不依賴 global TOKENS，每張卡片自帶 theme 物件。
      </div>
    </div>
  );
}

function TR_DecisionCard() {
  return (
    <div style={{
      width: '100%', height: '100%', padding: 36,
      background: '#fff', overflow: 'auto',
      fontFamily: '-apple-system, "PingFang TC", "Noto Sans TC", system-ui, sans-serif',
      color: TOKENS.ink,
    }}>
      <div style={{
        fontSize: 11, letterSpacing: 1.5, fontWeight: 600, color: TOKENS.contrast,
        textTransform: 'uppercase', marginBottom: 8,
      }}>
        Current direction · 2026-05-15
      </div>
      <h2 style={{ fontSize: 22, fontWeight: 600, margin: '0 0 16px', letterSpacing: -0.3 }}>
        Open question · 本輪不選方向
      </h2>
      <p style={{ fontSize: 14, lineHeight: 1.7, margin: '0 0 12px' }}>
        下次評估時，先回答兩個上游問題：
      </p>
      <ol style={{ fontSize: 14, lineHeight: 1.7, paddingLeft: 20, margin: 0 }}>
        <li style={{ marginBottom: 8 }}>
          核心使用者是「<b>去情緒化專注數字</b>」還是「<b>情緒派生活感</b>」？
          <div style={{ fontSize: 12, color: TOKENS.ink2, marginTop: 2 }}>
            從 <code>no1_product_initiation/no1_mental_model.md</code> 找答案，不在這層決定。
          </div>
        </li>
        <li>
          Dark Mode 是<b>必備</b>還是<b>選配</b>？
          <div style={{ fontSize: 12, color: TOKENS.ink2, marginTop: 2 }}>
            影響色票結構：單一主題雙模式 vs 兩個獨立主題。
          </div>
        </li>
      </ol>
      <div style={{
        marginTop: 20, padding: '10px 14px',
        background: 'rgba(242,79,19,0.06)',
        border: `1px solid ${TOKENS.contrast}`,
        borderRadius: 8, fontSize: 13, lineHeight: 1.6, color: TOKENS.ink,
      }}>
        本檔只是素描，<b>不</b>改動 <code>10_foundations/data.jsx</code>，<b>不</b>覆蓋 impl 的 <code>src/constants/theme.ts</code>。
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// 對外 Section
// ─────────────────────────────────────────────────────────────

function ThemeRepaintSection() {
  return (
    <>
      <DCSection
        id="tr-intro"
        title="Theme Repaint · 套 anthropic 主題到 SuSuGiGi"
        subtitle="拿 theme-factory 的 5 個預設主題重塗 SuSuGiGi，蒐集延伸感受。Mini HomeScreen 自帶 theme，不汙染現有 token。">
        <DCArtboard id="tr-intro-card" label="Why this exploration" width={520} height={420}>
          <TR_IntroCard/>
        </DCArtboard>
      </DCSection>

      <DCSection
        id="tr-variants"
        title="5 種主題並陳"
        subtitle="每張卡片：色票牆 / Typography sample（中文 + 數字 + 英文）/ Mini HomeScreen mockup。">
        {THEME_VARIANTS.map(theme => (
          <DCArtboard
            key={theme.id}
            id={`tr-${theme.id}`}
            label={`${theme.nameEn} · ${theme.nameZh}`}
            width={800}
            height={560}>
            <ThemeShowcaseCard theme={theme}/>
          </DCArtboard>
        ))}
      </DCSection>

      <DCSection
        id="tr-decision"
        title="Current direction · Open question"
        subtitle="先在上游問題對齊，再回來收斂視覺方向。">
        <DCArtboard id="tr-decision-card" label="Decision" width={520} height={460}>
          <TR_DecisionCard/>
        </DCArtboard>
      </DCSection>
    </>
  );
}

Object.assign(window, { ThemeRepaintSection, THEME_VARIANTS });
