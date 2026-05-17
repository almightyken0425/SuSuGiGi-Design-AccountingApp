// ─────────────────────────────────────────────────────────────
// Exploration · Axis 1 — Color & Mood
//
// 三個 HomeScreen 變體，wireframe 結構不動、只動色彩。
// 共用一個 Home_CM 元件，吃 palette prop 切換 3 個方向。
//
// V1 Sand & Espresso  · 暖色文具感
// V2 Midnight Indigo  · 夜間記帳 / 深色模式優先
// V3 Mono + Mint      · 極簡單色 + 強調色
// ─────────────────────────────────────────────────────────────

// ─── Palettes ────────────────────────────────────────────────
// 規則：每個 palette 一個主色系（深淺）+ 一個強調色 + 一個底色。
// 一致用法：支出 = 主色（深 / 中），收入 = 強調色。
// V1-V6 是 Round 3 還原回來的 mono+accent 色系；
// V7-V9 對應使用者提供的三張參考配色圖。
const CM_PALETTES = {
  // ─── V1 · Mono Indigo + Citrus (dark, Round 3 還原) ──────
  indigo_citrus: {
    name: 'Mono Indigo + Citrus',
    p50:  '#E8E9F5', p100: '#BFC0E0', p200: '#9598C6', p300: '#6A6FAC',
    p400: '#44488F', p500: '#2D316E', p600: '#1E2155', p700: '#14163E',
    p800: '#0B0D27', p900: '#050617',
    bg: '#0B0D27', surface: '#14163E', surface2: '#1E2155',
    ink: '#E8E9F5', ink2: '#9598C6', ink3: '#6A6FAC',
    hairline: 'rgba(232,233,245,0.08)',
    accent: '#C9F25C', accentSoft: 'rgba(201,242,92,0.16)',
    expense: '#9598C6', income: '#C9F25C',
    chart: ['#C9F25C', '#9598C6', '#6A6FAC', '#44488F', '#2D316E'],
    iconBg: 'rgba(201,242,92,0.14)',
    statusBar: 'light',
  },
  // ─── V2 · Mono Charcoal + Mint (light, Round 3 還原) ─────
  charcoal_mint: {
    name: 'Mono Charcoal + Mint',
    p50:  '#FAFAFA', p100: '#F0F0F0', p200: '#E0E0E0', p300: '#C0C0C0',
    p400: '#999999', p500: '#666666', p600: '#444444', p700: '#2A2A2A',
    p800: '#1A1A1A', p900: '#0A0A0A',
    bg: '#FFFFFF', surface: '#FAFAFA', surface2: '#F0F0F0',
    ink: '#0A0A0A', ink2: '#666666', ink3: '#B0B0B0',
    hairline: 'rgba(0,0,0,0.06)',
    accent: '#34D7A3', accentSoft: 'rgba(52,215,163,0.12)',
    expense: '#0A0A0A', income: '#34D7A3',
    chart: ['#0A0A0A', '#444444', '#888888', '#BBBBBB', '#34D7A3'],
    iconBg: 'rgba(52,215,163,0.10)',
    statusBar: 'dark',
  },
  // ─── V3 · Mono Brick + Teal (light, Round 3 還原) ────────
  brick_teal: {
    name: 'Mono Brick + Teal',
    p50:  '#FBF1ED', p100: '#F4D6CB', p200: '#E8AE94', p300: '#D88469',
    p400: '#BD5A3F', p500: '#9C4127', p600: '#7B2F1B', p700: '#5C2113',
    p800: '#3F1808', p900: '#221004',
    bg: '#FBF1ED', surface: '#FFFFFF', surface2: '#F4E0D5',
    ink: '#3F1808', ink2: '#7B2F1B', ink3: '#BD5A3F',
    hairline: 'rgba(63,24,8,0.10)',
    accent: '#2F8F8A', accentSoft: 'rgba(47,143,138,0.14)',
    expense: '#5C2113', income: '#2F8F8A',
    chart: ['#5C2113', '#9C4127', '#BD5A3F', '#D88469', '#2F8F8A'],
    iconBg: 'rgba(47,143,138,0.14)',
    statusBar: 'dark',
  },
  // ─── V4 · Mono Sage + Rose (light, Round 3 還原) ─────────
  sage_rose: {
    name: 'Mono Sage + Rose',
    p50:  '#F2F5EE', p100: '#DAE3CE', p200: '#B9CAA3', p300: '#97AC79',
    p400: '#758C53', p500: '#5C7240', p600: '#475A30', p700: '#354323',
    p800: '#232E17', p900: '#131A0C',
    bg: '#F2F5EE', surface: '#FFFFFF', surface2: '#E5EBD9',
    ink: '#232E17', ink2: '#475A30', ink3: '#758C53',
    hairline: 'rgba(35,46,23,0.10)',
    accent: '#C77B8F', accentSoft: 'rgba(199,123,143,0.14)',
    expense: '#354323', income: '#C77B8F',
    chart: ['#354323', '#5C7240', '#758C53', '#97AC79', '#C77B8F'],
    iconBg: 'rgba(199,123,143,0.14)',
    statusBar: 'dark',
  },
  // ─── V5 · Mono Sand + Cobalt (light, Round 3 還原) ───────
  sand_cobalt: {
    name: 'Mono Sand + Cobalt',
    p50:  '#FAF7F0', p100: '#F0E8D4', p200: '#DECEA6', p300: '#C2AB76',
    p400: '#A18854', p500: '#7F6A3F', p600: '#635330', p700: '#483D24',
    p800: '#2F2917', p900: '#1A170D',
    bg: '#FAF7F0', surface: '#FFFFFF', surface2: '#F0E8D4',
    ink: '#2F2917', ink2: '#635330', ink3: '#A18854',
    hairline: 'rgba(47,41,23,0.10)',
    accent: '#1F4FC6', accentSoft: 'rgba(31,79,198,0.12)',
    expense: '#483D24', income: '#1F4FC6',
    chart: ['#483D24', '#7F6A3F', '#A18854', '#C2AB76', '#1F4FC6'],
    iconBg: 'rgba(31,79,198,0.12)',
    statusBar: 'dark',
  },
  // ─── V6 · Mono Ink + Ruby (dark, Round 3 還原) ───────────
  ink_ruby: {
    name: 'Mono Ink + Ruby',
    p50:  '#F5F5F6', p100: '#DEDFE0', p200: '#C0C2C4', p300: '#9A9C9F',
    p400: '#6E7177', p500: '#4F525B', p600: '#3A3D45', p700: '#2A2D34',
    p800: '#1E2026', p900: '#131418',
    bg: '#131418', surface: '#1E2026', surface2: '#2A2D34',
    ink: '#F5F5F6', ink2: '#9A9C9F', ink3: '#6E7177',
    hairline: 'rgba(245,245,246,0.08)',
    accent: '#D63A4E', accentSoft: 'rgba(214,58,78,0.16)',
    expense: '#9A9C9F', income: '#D63A4E',
    chart: ['#D63A4E', '#9A9C9F', '#6E7177', '#4F525B', '#3A3D45'],
    iconBg: 'rgba(214,58,78,0.16)',
    statusBar: 'light',
  },
  // ─────────────────────────────────────────────────────────
  // V7-V9：同一組咖啡色票 #371E13 / #5E2A25 / #C0AA8A / #E1D3A9
  // 四色都在 coffee→maroon→clay→creme 同色系內，三個 variant 在
  // 「底色 / 主色 / 強調色」位置 swap 出三種視覺。
  // ─────────────────────────────────────────────────────────
  // ─── V7 · Cafe Latte (Creme 淺底，拿鐵咖啡感) ───────────
  cafe_latte: {
    name: 'Cafe Latte',
    p50:  '#FBF4E0', p100: '#E1D3A9', p200: '#D4BD8F', p300: '#C0AA8A',
    p400: '#8E6F4F', p500: '#6E4C2F', p600: '#5E2A25', p700: '#371E13',
    p800: '#2A1812', p900: '#1A0E08',
    bg: '#E1D3A9', surface: '#F0E5C5', surface2: '#D4C29E',
    ink: '#371E13', ink2: '#5E2A25', ink3: '#8E6F4F',
    hairline: 'rgba(55,30,19,0.12)',
    accent: '#5E2A25', accentSoft: 'rgba(94,42,37,0.14)',
    expense: '#371E13', income: '#5E2A25',
    chart: ['#371E13', '#5E2A25', '#8E6F4F', '#C0AA8A', '#D4C29E'],
    iconBg: 'rgba(94,42,37,0.14)',
    statusBar: 'dark',
  },
  // ─── V8 · Espresso Night (Coffee 深底，濃縮夜晚感) ───────
  espresso_night: {
    name: 'Espresso Night',
    p50:  '#FBF4E0', p100: '#E1D3A9', p200: '#D4BD8F', p300: '#C0AA8A',
    p400: '#8E6F4F', p500: '#6E4C2F', p600: '#5E2A25', p700: '#371E13',
    p800: '#2A1812', p900: '#1A0E08',
    bg: '#371E13', surface: '#4D2A1B', surface2: '#5E3622',
    ink: '#E1D3A9', ink2: '#C0AA8A', ink3: '#8E6F4F',
    hairline: 'rgba(225,211,169,0.10)',
    accent: '#C0AA8A', accentSoft: 'rgba(192,170,138,0.18)',
    expense: '#C0AA8A', income: '#E1D3A9',
    chart: ['#E1D3A9', '#C0AA8A', '#8E6F4F', '#5E2A25', '#4D2A1B'],
    iconBg: 'rgba(192,170,138,0.18)',
    statusBar: 'light',
  },
  // ─── V9 · Velvet Maroon (Maroon 紅褐底，酒窖絲絨感) ──────
  velvet_maroon: {
    name: 'Velvet Maroon',
    p50:  '#FBF4E0', p100: '#E1D3A9', p200: '#D4BD8F', p300: '#C0AA8A',
    p400: '#8E6F4F', p500: '#6E4C2F', p600: '#5E2A25', p700: '#371E13',
    p800: '#2A1812', p900: '#1A0E08',
    bg: '#5E2A25', surface: '#6F3A30', surface2: '#80493E',
    ink: '#E1D3A9', ink2: '#C0AA8A', ink3: '#9C7E5C',
    hairline: 'rgba(225,211,169,0.10)',
    accent: '#E1D3A9', accentSoft: 'rgba(225,211,169,0.18)',
    expense: '#C0AA8A', income: '#E1D3A9',
    chart: ['#E1D3A9', '#C0AA8A', '#9C7E5C', '#6E4C2F', '#371E13'],
    iconBg: 'rgba(225,211,169,0.18)',
    statusBar: 'light',
  },
  // ─────────────────────────────────────────────────────────
  // V10-V12：同一組綠色色票 #606C38 / #283618 / #FEFAE0
  // 三色都在 olive→forest→cornsilk 同色系內，三個 variant 在
  // 「底色 / 主色 / 強調色」位置 swap 出三種視覺。
  // ─────────────────────────────────────────────────────────
  // ─── V10 · Olive Field (Cornsilk 底，明亮田野感) ─────────
  olive_field: {
    name: 'Olive Field',
    p50:  '#FEFAE0', p100: '#F5EFC2', p200: '#DDDD9C', p300: '#BCC477',
    p400: '#9DAA56', p500: '#7D8A3F', p600: '#606C38', p700: '#424E25',
    p800: '#283618', p900: '#15200E',
    bg: '#FEFAE0', surface: '#FFFFFF', surface2: '#F5EFC2',
    ink: '#283618', ink2: '#606C38', ink3: '#9DAA56',
    hairline: 'rgba(40,54,24,0.12)',
    accent: '#606C38', accentSoft: 'rgba(96,108,56,0.14)',
    expense: '#283618', income: '#606C38',
    chart: ['#283618', '#424E25', '#606C38', '#7D8A3F', '#BCC477'],
    iconBg: 'rgba(96,108,56,0.14)',
    statusBar: 'dark',
  },
  // ─── V8 · Forest Deep (Black Forest 底，深林夜晚感) ──────
  forest_deep: {
    name: 'Forest Deep',
    p50:  '#FEFAE0', p100: '#F5EFC2', p200: '#DDDD9C', p300: '#BCC477',
    p400: '#9DAA56', p500: '#7D8A3F', p600: '#606C38', p700: '#424E25',
    p800: '#283618', p900: '#15200E',
    bg: '#283618', surface: '#324325', surface2: '#3F5430',
    ink: '#FEFAE0', ink2: '#BCC477', ink3: '#7D8A3F',
    hairline: 'rgba(254,250,224,0.10)',
    accent: '#DDDD9C', accentSoft: 'rgba(221,221,156,0.18)',
    expense: '#9DAA56', income: '#DDDD9C',
    chart: ['#DDDD9C', '#BCC477', '#9DAA56', '#7D8A3F', '#606C38'],
    iconBg: 'rgba(221,221,156,0.16)',
    statusBar: 'light',
  },
  // ─── V9 · Olive Field Mid (Olive 底，橄欖軍裝感) ─────────
  olive_mid: {
    name: 'Olive Field Mid',
    p50:  '#FEFAE0', p100: '#F5EFC2', p200: '#DDDD9C', p300: '#BCC477',
    p400: '#9DAA56', p500: '#7D8A3F', p600: '#606C38', p700: '#424E25',
    p800: '#283618', p900: '#15200E',
    bg: '#606C38', surface: '#7D8A3F', surface2: '#9DAA56',
    ink: '#FEFAE0', ink2: '#DDDD9C', ink3: '#BCC477',
    hairline: 'rgba(254,250,224,0.12)',
    accent: '#FEFAE0', accentSoft: 'rgba(254,250,224,0.18)',
    expense: '#283618', income: '#FEFAE0',
    chart: ['#FEFAE0', '#DDDD9C', '#BCC477', '#424E25', '#283618'],
    iconBg: 'rgba(254,250,224,0.18)',
    statusBar: 'light',
  },
  // ─────────────────────────────────────────────────────────
  // V13-V15：同一組海軍藍色票 #11284D / #264B6F / #101A2C / #F4EFDF / #D5B370
  // 三色 navy 梯度 + 米白 + 沙金；三個 variant 在「底色 / 主色 / 強調色」
  // 位置 swap 出三種視覺。
  // ─────────────────────────────────────────────────────────
  // ─── V13 · Daylight Cream (米白底，明亮高級理財感) ───────
  daylight_cream: {
    name: 'Daylight Cream',
    p50:  '#F4EFDF', p100: '#DCE0E8', p200: '#B5BFD0', p300: '#818FA8',
    p400: '#4D5E80', p500: '#264B6F', p600: '#1A3A5E', p700: '#11284D',
    p800: '#0A1B38', p900: '#101A2C',
    bg: '#F4EFDF', surface: '#FFFFFF', surface2: '#EBE5D2',
    ink: '#101A2C', ink2: '#11284D', ink3: '#4D5E80',
    hairline: 'rgba(16,26,44,0.10)',
    accent: '#D5B370', accentSoft: 'rgba(213,179,112,0.18)',
    expense: '#11284D', income: '#D5B370',
    chart: ['#101A2C', '#11284D', '#264B6F', '#818FA8', '#D5B370'],
    iconBg: 'rgba(213,179,112,0.16)',
    statusBar: 'dark',
  },
  // ─── V14 · Midnight Navy (最深藍底 #101A2C，午夜深藍) ────
  midnight_navy: {
    name: 'Midnight Navy',
    p50:  '#F4EFDF', p100: '#DCE0E8', p200: '#B5BFD0', p300: '#818FA8',
    p400: '#4D5E80', p500: '#264B6F', p600: '#1A3A5E', p700: '#11284D',
    p800: '#0A1B38', p900: '#101A2C',
    bg: '#101A2C', surface: '#1A2A48', surface2: '#264B6F',
    ink: '#F4EFDF', ink2: '#B5BFD0', ink3: '#818FA8',
    hairline: 'rgba(244,239,223,0.10)',
    accent: '#D5B370', accentSoft: 'rgba(213,179,112,0.22)',
    expense: '#818FA8', income: '#D5B370',
    chart: ['#D5B370', '#B5BFD0', '#818FA8', '#4D5E80', '#264B6F'],
    iconBg: 'rgba(213,179,112,0.18)',
    statusBar: 'light',
  },
  // ─── V15 · Royal Midnight (#11284D 中深底，皇家藍) ───────
  royal_midnight: {
    name: 'Royal Midnight',
    p50:  '#F4EFDF', p100: '#DCE0E8', p200: '#B5BFD0', p300: '#818FA8',
    p400: '#4D5E80', p500: '#264B6F', p600: '#1A3A5E', p700: '#11284D',
    p800: '#0A1B38', p900: '#101A2C',
    bg: '#11284D', surface: '#1F3D5E', surface2: '#264B6F',
    ink: '#F4EFDF', ink2: '#D5B370', ink3: '#B5BFD0',
    hairline: 'rgba(244,239,223,0.10)',
    accent: '#F4EFDF', accentSoft: 'rgba(244,239,223,0.18)',
    expense: '#D5B370', income: '#F4EFDF',
    chart: ['#F4EFDF', '#D5B370', '#B5BFD0', '#818FA8', '#101A2C'],
    iconBg: 'rgba(244,239,223,0.18)',
    statusBar: 'light',
  },
};

// ─── Mock data subset ────────────────────────────────────────
// 直接用全域 TX；section 顯示時取前兩組 category（展開＋收合各一）

// ─── Pieces ──────────────────────────────────────────────────
function CM_Header({ pal }) {
  return (
    <div style={{
      paddingTop: 56, paddingBottom: 8,
      paddingLeft: 16, paddingRight: 16,
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      background: pal.bg, color: pal.ink,
    }}>
      <button style={{ width: 36, height: 36, border: 'none', background: 'transparent', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Glyph name="filter" size={20} color={pal.ink}/>
      </button>
      <div style={{ fontSize: 17, fontWeight: 600, letterSpacing: -0.2 }}>SuSuGiGi</div>
      <div style={{ display: 'flex', gap: 4 }}>
        <button style={{ width: 36, height: 36, border: 'none', background: 'transparent', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Glyph name="search" size={20} color={pal.ink}/>
        </button>
        <button style={{ width: 36, height: 36, border: 'none', background: 'transparent', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Glyph name="gear" size={20} color={pal.ink}/>
        </button>
      </div>
    </div>
  );
}

function CM_PeriodSwitcher({ pal }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      gap: 8, paddingTop: 12, paddingBottom: 4,
    }}>
      <Glyph name="chevron-left" size={14} color={pal.ink3} stroke={2.5}/>
      <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
        <Glyph name="calendar" size={13} color={pal.ink2} stroke={2}/>
        <span style={{ fontSize: 18, fontWeight: 500, color: pal.ink, letterSpacing: -0.2 }}>2026年5月</span>
      </div>
      <Glyph name="chevron-right" size={14} color={pal.ink3} stroke={2.5}/>
    </div>
  );
}

function CM_Donut({ pal, balance }) {
  const data = [
    { key: 'a', value: 38, color: pal.chart[0] },
    { key: 'b', value: 22, color: pal.chart[1] },
    { key: 'c', value: 18, color: pal.chart[2] },
    { key: 'd', value: 12, color: pal.chart[3] },
    { key: 'e', value: 10, color: pal.chart[4] },
  ];
  return (
    <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 12 }}>
      <DonutChart data={data}>
        <div style={{ textAlign: 'center', width: 100 }}>
          <div style={{ fontSize: 14, color: pal.ink2, marginBottom: 4 }}>餘額</div>
          <div style={{
            fontSize: 22, fontWeight: 500, color: pal.ink,
            fontVariantNumeric: 'tabular-nums', textAlign: 'center', letterSpacing: -0.4,
          }}>NT$184,295</div>
        </div>
      </DonutChart>
    </div>
  );
}

function CM_FocusRow({ pal, mode, onMode }) {
  const cards = [
    { kind: 'expense', amount: 'NT$ 5,985',  icon: 'minus', color: pal.expense },
    { kind: 'income',  amount: 'NT$ 68,000', icon: 'plus',  color: pal.income },
  ];
  return (
    <div style={{
      display: 'flex', gap: 12,
      paddingLeft: 16, paddingRight: 16,
      paddingTop: 4, paddingBottom: 12,
    }}>
      {cards.map(c => {
        const active = c.kind === mode;
        return (
          <button key={c.kind} onClick={() => onMode(c.kind)} style={{
            flex: 1, display: 'flex', alignItems: 'center', gap: 8,
            paddingTop: 12, paddingBottom: 12, paddingLeft: 12, paddingRight: 12,
            borderRadius: 12,
            borderWidth: 1.5, borderStyle: 'solid',
            borderColor: active ? c.color : 'transparent',
            background: active ? pal.surface : pal.surface2,
            cursor: active ? 'default' : 'pointer', fontFamily: 'inherit',
            boxShadow: active ? '0 1px 3px rgba(0,0,0,0.08)' : 'none',
          }}>
            <div style={{
              width: 28, height: 28, borderRadius: 8,
              background: active ? c.color + '22' : pal.surface,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <Glyph name={c.icon} size={14} color={active ? c.color : pal.ink2}/>
            </div>
            <span style={{
              flex: 1, textAlign: 'right',
              fontSize: 16, fontWeight: 500,
              color: active ? pal.ink : pal.ink2,
              fontVariantNumeric: 'tabular-nums',
            }}>{c.amount}</span>
          </button>
        );
      })}
    </div>
  );
}

function CM_SectionCard({ pal, title, total, iconId, expanded, items }) {
  return (
    <div style={{
      marginLeft: 16, marginRight: 16, marginBottom: 12,
      background: pal.surface,
      borderRadius: 12,
      border: `1px solid ${pal.hairline}`,
      overflow: 'hidden',
    }}>
      <div style={{
        cursor: 'pointer',
        paddingLeft: 12, paddingRight: 16,
        paddingTop: expanded ? 14 : 10, paddingBottom: expanded ? 14 : 10,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, flex: 1, minWidth: 0 }}>
          <div style={{
            width: 14, display: 'flex', alignItems: 'center', justifyContent: 'center',
            transform: `rotate(${expanded ? 90 : 0}deg)`,
          }}>
            <Glyph name="chevron-right" size={12} color={pal.ink2} stroke={2.5}/>
          </div>
          <div style={{
            width: 32, height: 32, borderRadius: 8,
            background: pal.iconBg,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <DynamicIconById iconId={iconId} size={18} color={pal.accent}/>
          </div>
          <span style={{
            fontSize: expanded ? 16 : 15, fontWeight: 500, color: pal.ink,
            whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
          }}>{title}</span>
        </div>
        <span style={{
          fontSize: expanded ? 16 : 15, fontWeight: 500, color: pal.expense,
          fontVariantNumeric: 'tabular-nums',
        }}>{total}</span>
      </div>
      {expanded && items.map((tx, i) => (
        <div key={i} style={{ borderTop: `0.5px solid ${pal.hairline}` }}>
          <div style={{
            display: 'flex', alignItems: 'center', gap: 12,
            paddingLeft: 16, paddingRight: 16, paddingTop: 12, paddingBottom: 12,
          }}>
            <div style={{ width: 40, textAlign: 'center' }}>
              <span style={{ fontSize: 12, fontWeight: 500, color: pal.ink2, fontVariantNumeric: 'tabular-nums' }}>{tx.date}</span>
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 15, color: pal.ink, marginBottom: 2,
                whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{tx.note}</div>
              <div style={{ fontSize: 12, color: pal.ink2,
                whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{tx.acc}</div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              {tx.recurring && (
                <div style={{
                  width: 22, height: 22, borderRadius: 6, background: pal.bg,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <Glyph name="repeat" size={13} color={pal.ink3} stroke={2}/>
                </div>
              )}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                <span style={{ fontSize: 16, fontWeight: 500, color: pal.ink, fontVariantNumeric: 'tabular-nums' }}>{tx.amount}</span>
                {tx.converted && (
                  <span style={{ fontSize: 12, color: pal.ink2, fontVariantNumeric: 'tabular-nums' }}>≈ {tx.converted}</span>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function CM_FAB({ pal }) {
  return (
    <div style={{
      position: 'absolute', bottom: 24, left: 0, right: 0,
      display: 'flex', justifyContent: 'center', zIndex: 10, pointerEvents: 'none',
    }}>
      <div style={{
        width: 208, height: 72, borderRadius: 36,
        background: pal.statusBar === 'light'
          ? 'rgba(255,255,255,0.12)'
          : 'rgba(255,255,255,0.55)',
        backdropFilter: 'blur(28px)', WebkitBackdropFilter: 'blur(28px)',
        border: `1px solid ${pal.statusBar === 'light' ? 'rgba(255,255,255,0.18)' : 'rgba(255,255,255,0.85)'}`,
        boxShadow: '0 8px 24px rgba(0,0,0,0.10)',
        pointerEvents: 'auto',
        display: 'flex', alignItems: 'center', justifyContent: 'space-around',
        paddingLeft: 8, paddingRight: 8,
      }}>
        <button style={{ width: 56, height: 56, border: 'none', background: 'transparent', cursor: 'pointer', borderRadius: 28, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Glyph name="minus" size={24} color={pal.accent}/>
        </button>
        <button style={{ width: 56, height: 56, border: 'none', background: 'transparent', cursor: 'pointer', borderRadius: 28, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Glyph name="exchange" size={24} color={pal.accent} stroke={2.4}/>
        </button>
        <button style={{ width: 56, height: 56, border: 'none', background: 'transparent', cursor: 'pointer', borderRadius: 28, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Glyph name="plus" size={24} color={pal.accent}/>
        </button>
      </div>
    </div>
  );
}

// ─── Home variant ────────────────────────────────────────────
function Home_CM({ palette }) {
  const pal = CM_PALETTES[palette];
  const [mode, setMode] = React.useState('expense');
  const items_food = [
    { date: '5/2', note: '路易莎咖啡', acc: '國泰世華 信用卡', amount: '-NT$185' },
    { date: '5/2', note: '便當',       acc: '現金',           amount: '-NT$120' },
    { date: '5/1', note: '居酒屋',     acc: '國泰世華 信用卡', amount: '-NT$780' },
    { date: '4/29', note: '晚餐 — 牛肉麵', acc: '現金',       amount: '-NT$340' },
  ];
  const items_shop = [
    { date: '5/1', note: 'Uniqlo T-shirt × 2', acc: 'USD 旅費', amount: '-US$40', converted: 'NT$1,290' },
  ];
  return (
    <div style={{
      position: 'absolute', inset: 0, overflow: 'hidden',
      background: pal.bg, color: pal.ink,
      fontFamily: '-apple-system, "SF Pro", "PingFang TC", "Noto Sans TC", system-ui, sans-serif',
    }}>
      <div style={{ position: 'absolute', inset: 0, overflowY: 'auto', overflowX: 'hidden', paddingBottom: 140 }}>
        <CM_Header pal={pal}/>
        <CM_PeriodSwitcher pal={pal}/>
        <CM_Donut pal={pal}/>
        <CM_FocusRow pal={pal} mode={mode} onMode={setMode}/>
        <CM_SectionCard pal={pal} title="飲食"  iconId={1} total="-NT$1,425" expanded items={items_food}/>
        <CM_SectionCard pal={pal} title="購物"  iconId={3} total="-NT$1,290" expanded={false} items={items_shop}/>
        <CM_SectionCard pal={pal} title="交通"  iconId={2} total="-NT$60"    expanded={false} items={[]}/>
        <CM_SectionCard pal={pal} title="居家"  iconId={5} total="-NT$1,480" expanded={false} items={[]}/>
      </div>
      <CM_FAB pal={pal}/>
    </div>
  );
}

// ─── Section render ──────────────────────────────────────────
function ColorAndMoodSection() {
  const W = 402, H = 874;
  return (
    <>
      <DCSection id="cm-section-row1"
        title="Axis 1 · Color & Mood — Row 1 · Mono + Accent"
        subtitle="第一行 V1-V6：六個各自獨立色系的 mono+accent 方向。狀態 Open question · 2026-05-16。">
        <DCArtboard id="cm-v1-indigo"  label="V1 · Mono Indigo + Citrus · 深藍紫 + 螢光黃綠 (dark)" width={W} height={H}>
          <IOSDevice width={W} height={H} dark><Home_CM palette="indigo_citrus"/></IOSDevice>
        </DCArtboard>
        <DCArtboard id="cm-v2-mono"    label="V2 · Mono Charcoal + Mint · 灰階 + 薄荷 (light)"      width={W} height={H}>
          <IOSDevice width={W} height={H}><Home_CM palette="charcoal_mint"/></IOSDevice>
        </DCArtboard>
        <DCArtboard id="cm-v3-brick"   label="V3 · Mono Brick + Teal · 暖磚紅 + 鴨蛋青 (light)"     width={W} height={H}>
          <IOSDevice width={W} height={H}><Home_CM palette="brick_teal"/></IOSDevice>
        </DCArtboard>
        <DCArtboard id="cm-v4-sage"    label="V4 · Mono Sage + Rose · 鼠尾草綠 + 玫瑰粉 (light)"    width={W} height={H}>
          <IOSDevice width={W} height={H}><Home_CM palette="sage_rose"/></IOSDevice>
        </DCArtboard>
        <DCArtboard id="cm-v5-sand"    label="V5 · Mono Sand + Cobalt · 沙色 + 鈷藍 (light)"        width={W} height={H}>
          <IOSDevice width={W} height={H}><Home_CM palette="sand_cobalt"/></IOSDevice>
        </DCArtboard>
        <DCArtboard id="cm-v6-ink"     label="V6 · Mono Ink + Ruby · 墨深 + 紅寶 (dark)"            width={W} height={H}>
          <IOSDevice width={W} height={H} dark><Home_CM palette="ink_ruby"/></IOSDevice>
        </DCArtboard>
      </DCSection>
      <DCSection id="cm-section-row2"
        title="Axis 1 · Color & Mood — Row 2 · Olive Palette Swap"
        subtitle="第二行 V7-V9：同一組綠色色票 (#FEFAE0 / #606C38 / #283618) 在底色 / 主色 / 強調色位置 swap 出的三種視覺。">
        <DCArtboard id="cm-v7-olive-field" label="V7 · Olive Field · Cornsilk 底 + Olive 強調 (明亮田野)"   width={W} height={H}>
          <IOSDevice width={W} height={H}><Home_CM palette="olive_field"/></IOSDevice>
        </DCArtboard>
        <DCArtboard id="cm-v8-forest-deep" label="V8 · Forest Deep · Black Forest 底 + 淺綠 highlight (深林夜)" width={W} height={H}>
          <IOSDevice width={W} height={H} dark><Home_CM palette="forest_deep"/></IOSDevice>
        </DCArtboard>
        <DCArtboard id="cm-v9-olive-mid"   label="V9 · Olive Field Mid · Olive 中綠底 + Cornsilk 對比 (軍裝)"  width={W} height={H}>
          <IOSDevice width={W} height={H} dark><Home_CM palette="olive_mid"/></IOSDevice>
        </DCArtboard>
      </DCSection>
      <DCSection id="cm-section-row3"
        title="Axis 1 · Color & Mood — Row 3 · Coffee Palette Swap"
        subtitle="第三行 V10-V12：同一組咖啡色票 (#371E13 / #5E2A25 / #C0AA8A / #E1D3A9) 在底色 / 主色 / 強調色位置 swap 出的三種視覺。">
        <DCArtboard id="cm-v10-cafe-latte"     label="V10 · Cafe Latte · Creme 淺底 + Maroon 強調 (拿鐵)"     width={W} height={H}>
          <IOSDevice width={W} height={H}><Home_CM palette="cafe_latte"/></IOSDevice>
        </DCArtboard>
        <DCArtboard id="cm-v11-espresso-night" label="V11 · Espresso Night · Coffee 深底 + Clay/Creme 強調 (濃縮夜)" width={W} height={H}>
          <IOSDevice width={W} height={H} dark><Home_CM palette="espresso_night"/></IOSDevice>
        </DCArtboard>
        <DCArtboard id="cm-v12-velvet-maroon"  label="V12 · Velvet Maroon · Maroon 紅褐底 + Creme 對比 (酒窖絲絨)" width={W} height={H}>
          <IOSDevice width={W} height={H} dark><Home_CM palette="velvet_maroon"/></IOSDevice>
        </DCArtboard>
      </DCSection>
      <DCSection id="cm-section-row4"
        title="Axis 1 · Color & Mood — Row 4 · Navy + Gold Palette Swap"
        subtitle="第四行 V13-V15：同一組海軍藍色票 (#101A2C / #11284D / #264B6F / #F4EFDF / #D5B370) 在底色 / 主色 / 強調色位置 swap 出的三種視覺。">
        <DCArtboard id="cm-v13-daylight-cream" label="V13 · Daylight Cream · 米白底 + Navy + 沙金 (高級理財)"     width={W} height={H}>
          <IOSDevice width={W} height={H}><Home_CM palette="daylight_cream"/></IOSDevice>
        </DCArtboard>
        <DCArtboard id="cm-v14-midnight-navy"  label="V14 · Midnight Navy · 最深藍底 + 沙金強調 (午夜深藍)"      width={W} height={H}>
          <IOSDevice width={W} height={H} dark><Home_CM palette="midnight_navy"/></IOSDevice>
        </DCArtboard>
        <DCArtboard id="cm-v15-royal-midnight" label="V15 · Royal Midnight · 中深藍底 + Cream + Gold (皇家藍)"    width={W} height={H}>
          <IOSDevice width={W} height={H} dark><Home_CM palette="royal_midnight"/></IOSDevice>
        </DCArtboard>
      </DCSection>
    </>
  );
}

Object.assign(window, { ColorAndMoodSection });
