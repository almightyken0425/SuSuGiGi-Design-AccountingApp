// ─────────────────────────────────────────────────────────────
// Atomic tokens · 顏色 / 主題 / 玻璃 / 陰影 / 遮罩
//
// 跨元件最底層原料。spec 與 impl 對齊此檔的 export 名稱。
// 雙 theme（經典紫 / 海洋藍）共用 neutral、glass、shadow elevation、scrim 三檔。
// ─────────────────────────────────────────────────────────────

const PALETTE = {
  neutral: {
    0: '#FFFFFF', 25: '#FAFAFC', 50: '#FAFAFA', 100: '#F5F5F5', 200: '#EEEEEE',
    300: '#E0E0E0', 400: '#BDBDBD', 500: '#9E9E9E', 600: '#757575', 700: '#616161',
    800: '#424242', 900: '#212121', 950: '#121212', 1000: '#000000',
  },
  semantic: {
    success: '#4CAF50', warning: '#FFC107', error: '#F44336', info: '#2196F3',
  },
};

const PRIMARY_PURPLE = {
  50: '#f0ecfa', 100: '#c0b6df', 200: '#a191d0', 300: '#826cc0', 400: '#6248b0',
  500: '#4323a0', 600: '#381d85', 700: '#2d176b', 800: '#221250', 900: '#160c35',
  contrast: '#F24F13',
};

const PRIMARY_TEAL = {
  50: '#E0F7FA', 100: '#B2EBF2', 200: '#80DEEA', 300: '#4DD0E1', 400: '#26C6DA',
  500: '#00BCD4', 600: '#00ACC1', 700: '#0097A7', 800: '#00838F', 900: '#006064',
  contrast: '#FF6F00',
};

const GLASS_BASE = {
  blurAmount: 28,
  blurType: 'light',
  tint: 'rgba(255,255,255,0.55)',
  border: 'rgba(255,255,255,0.85)',
  shadowColor: '#000',
  shadowOpacity: 0.10,
};

// SHADOW_ELEVATION 為兩 theme 共享的陰影階梯（offsetY / blur / opacity，color 由 theme.shadow.color 引用）。
// level0 為「無陰影」placeholder。
const SHADOW_ELEVATION = {
  level0: { offsetY: 0, blur: 0,  opacity: 0    },
  level1: { offsetY: 1, blur: 2,  opacity: 0.08 },
  level2: { offsetY: 2, blur: 8,  opacity: 0.12 },
  level3: { offsetY: 8, blur: 24, opacity: 0.16 },
};

// SCRIM_LEVELS 為兩 theme 共享的遮罩三檔，對齊 iOS 系統慣例。
const SCRIM_LEVELS = {
  light:  'rgba(0,0,0,0.20)',  // iOS UIAlertController 等級
  medium: 'rgba(0,0,0,0.40)',  // iOS formSheet / actionSheet 等級
  heavy:  'rgba(0,0,0,0.60)',  // iOS 全屏 viewer 等級
};

const THEME_1 = {
  id: 'theme1',
  name: '經典紫 (Classic Purple)',
  statusBar: 'dark-content',
  bg: {
    base:          '#F2F2F7',                                            // iOS systemGroupedBackground
    surface:       PALETTE.neutral[0],
    surface_hover: PALETTE.neutral[100],
    surface_dim:   'rgba(0,0,0,0.06)',                                   // 比 surface 淡一點的子區塊底（對齊 iOS systemFill 最淡層）
  },
  text: {
    primary:   PALETTE.neutral[900],
    secondary: PALETTE.neutral[600],
    divisor:   PALETTE.neutral[300],
  },
  border: {
    base: PALETTE.neutral[200],
  },
  divider: {
    base:     PALETTE.neutral[300],
    hairline: 'rgba(60,60,67,0.10)',                                      // iOS systemGray with α
  },
  primary: { main: PRIMARY_PURPLE[500], ...PRIMARY_PURPLE },
  status: {
    success:    PALETTE.semantic.success,
    error:      PALETTE.semantic.error,
    warning:    PALETTE.semantic.warning,
    warning_bg: '#FFF4E5',
    warning_fg: '#663C00',
  },
  state: {
    press:    { opacity: 0.7 },
    selected: { bg: PRIMARY_PURPLE[50], fg: PRIMARY_PURPLE[500], border: PRIMARY_PURPLE[500] },
    disabled: { fg: PALETTE.neutral[400], opacity: 0.38 },
    focus:    { border: PRIMARY_PURPLE[500] },
  },
  scrim: SCRIM_LEVELS,
  shadow: { color: PALETTE.neutral[1000], elevation: SHADOW_ELEVATION },
  chart: [PRIMARY_PURPLE[800], PRIMARY_PURPLE[700], PRIMARY_PURPLE[600], PRIMARY_PURPLE[500], PRIMARY_PURPLE[400]],
  contrast: PRIMARY_PURPLE.contrast,
  glass: GLASS_BASE,
};

const THEME_2 = {
  id: 'theme2',
  name: '海洋藍 (Ocean Teal)',
  statusBar: 'dark-content',
  bg: {
    base:          '#F2F2F7',
    surface:       PALETTE.neutral[0],
    surface_hover: PALETTE.neutral[100],
    surface_dim:   'rgba(0,0,0,0.06)',
  },
  text: {
    primary:   PALETTE.neutral[900],
    secondary: PALETTE.neutral[600],
    divisor:   PALETTE.neutral[300],
  },
  border: {
    base: PALETTE.neutral[200],
  },
  divider: {
    base:     PALETTE.neutral[300],
    hairline: 'rgba(60,60,67,0.10)',
  },
  primary: { main: PRIMARY_TEAL[500], ...PRIMARY_TEAL },
  status: {
    success:    PALETTE.semantic.success,
    error:      PALETTE.semantic.error,
    warning:    PALETTE.semantic.warning,
    warning_bg: '#FFF4E5',
    warning_fg: '#663C00',
  },
  state: {
    press:    { opacity: 0.7 },
    selected: { bg: PRIMARY_TEAL[50], fg: PRIMARY_TEAL[500], border: PRIMARY_TEAL[500] },
    disabled: { fg: PALETTE.neutral[400], opacity: 0.38 },
    focus:    { border: PRIMARY_TEAL[500] },
  },
  scrim: SCRIM_LEVELS,
  shadow: { color: PALETTE.neutral[1000], elevation: SHADOW_ELEVATION },
  chart: [PRIMARY_TEAL[800], PRIMARY_TEAL[700], PRIMARY_TEAL[600], PRIMARY_TEAL[500], PRIMARY_TEAL[400]],
  contrast: PRIMARY_TEAL.contrast,
  glass: GLASS_BASE,
};

const THEMES = { theme1: THEME_1, theme2: THEME_2 };
const DEFAULT_THEME_ID = 'theme1';
const DEFAULT_THEME = THEME_1;

Object.assign(window, {
  PALETTE, PRIMARY_PURPLE, PRIMARY_TEAL,
  GLASS_BASE, SHADOW_ELEVATION, SCRIM_LEVELS,
  THEME_1, THEME_2, THEMES, DEFAULT_THEME, DEFAULT_THEME_ID,
});
