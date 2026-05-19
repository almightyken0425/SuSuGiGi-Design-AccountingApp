// ─────────────────────────────────────────────────────────────
// Tokens — SuSuGiGi 設計標準
//
// 錨點：Apple HIG / iOS Dynamic Type（Large default size）
// 角色：本檔為 Design git 內的設計標準權威，spec 與 impl 跟隨對齊
//
// Token 層級（由抽象到具體）：
//   1. 語意層：PALETTE / THEMES / TYPE_STYLES
//   2. 底層數值：TYPOGRAPHY.size / TYPOGRAPHY.weight / SPACING / RADIUS
//   3. 補充維度：LINE_HEIGHT / LETTER_SPACING / SHADOW / MOTION
//   4. 元件層：LIST_TOKENS / TX_LIST_TOKENS / SEARCH_BAR_TOKENS（內部不硬編碼，引用上層）
//
// 使用優先順序：
//   - 字體：優先採 TYPE_STYLES（HIG 語意），TYPOGRAPHY.size 為底層備用
//   - 圓角：採 RADIUS 階梯，不引入階梯外的孤兒值
//   - 字重：HIG 9 階命名清單完整保留作為設計詞彙；本標準目前僅啟用 light/regular/medium 三檔
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
// 沿用既有 SHADOW level1~3 α；level0 為「無陰影」placeholder。
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
    // disabled 已移至 state.disabled.fg
  },
  border: {
    base: PALETTE.neutral[200],
    // focus 已移至 state.focus.border
  },
  divider: {
    base:     PALETTE.neutral[300],                                       // 與 text.divisor 同義，提升命名
    hairline: 'rgba(60,60,67,0.10)',                                      // iOS systemGray with α
  },
  primary: { main: PRIMARY_PURPLE[500], ...PRIMARY_PURPLE },
  status: {
    success:    PALETTE.semantic.success,
    error:      PALETTE.semantic.error,
    warning:    PALETTE.semantic.warning,
    warning_bg: '#FFF4E5',                                                // warning callout 弱化背景（Material warning surface 慣例）
    warning_fg: '#663C00',                                                // warning callout 弱化文字
  },
  state: {
    press:    { opacity: 0.7 },                                           // 整顆元件按下透明度
    selected: { bg: PRIMARY_PURPLE[50], fg: PRIMARY_PURPLE[500], border: PRIMARY_PURPLE[500] },
    disabled: { fg: PALETTE.neutral[400], opacity: 0.38 },                // opacity 對齊 HIG 慣例
    focus:    { border: PRIMARY_PURPLE[500] },                            // TextInput 焦點邊框
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

// 攤平 TOKENS — canvas 視覺化 only（components.jsx / screens.jsx 用）。
// 鎖定 theme1，Impl 端動態 theme 系統不消費此物件；維護時不視為 Impl 對齊缺口。
const TOKENS = {
  bg:        THEME_1.bg.base,
  surface:   THEME_1.bg.surface,
  surface2:  THEME_1.bg.surface_hover,
  ink:       THEME_1.text.primary,
  ink2:      THEME_1.text.secondary,
  ink3:      THEME_1.state.disabled.fg,
  divider:   THEME_1.divider.base,
  border:    THEME_1.border.base,
  hairline:  THEME_1.divider.hairline,
  hairline2: PALETTE.neutral[200],
  p50:  THEME_1.primary[50],  p100: THEME_1.primary[100], p200: THEME_1.primary[200],
  p300: THEME_1.primary[300], p400: THEME_1.primary[400], p500: THEME_1.primary[500],
  p600: THEME_1.primary[600], p700: THEME_1.primary[700], p800: THEME_1.primary[800],
  p900: THEME_1.primary[900],
  contrast: THEME_1.contrast,
  success:  THEME_1.status.success,
  warning:  THEME_1.status.warning,
  error:    THEME_1.status.error,
  info:     PALETTE.semantic.info,
};
// CHART_COLORS — canvas 視覺化 only，鎖定 theme1；Impl 端動態 theme 系統不消費。
const CHART_COLORS = THEME_1.chart;
const GLASS = { ...GLASS_BASE };

// ─────────────────────────────────────────────────────────────
// Typography
//
// TYPOGRAPHY 為底層數值階梯（size 與 weight），供需要直接控制數字的場合使用。
// TYPE_STYLES 為 HIG 語意層，每條包含 { size, weight, lineHeight, letterSpacing }；
// 元件實際使用時優先採 TYPE_STYLES，少數情境才回退底層數值。
// ─────────────────────────────────────────────────────────────

const TYPOGRAPHY = {
  // 底層 size 階梯（pt）；對應 Tailwind 風格命名，便於跨平台溝通。
  size: { xs: 12, sm: 14, base: 16, lg: 18, xl: 20, '2xl': 24, '3xl': 30 },

  // HIG 9 階字重命名清單（完整保留作為設計詞彙）。
  // 本設計標準目前只啟用 light / regular / medium 三檔；
  // semibold 及以上保留，未來若有重要焦點需要時再開放。
  weight: {
    ultraLight: 100,
    thin:       200,
    light:      300,
    regular:    400,
    medium:     500,
    semibold:   600,  // 保留
    bold:       700,  // 保留
    heavy:      800,  // 保留
    black:      900,  // 保留
  },
};

// 本標準目前啟用的字重集合（驗證與文件用）。
const TYPOGRAPHY_WEIGHT_ENABLED = ['light', 'regular', 'medium'];

// 老命名 alias 保留向後相容（intro / foundations / showcase 用過）
const TYPE_SCALE = TYPOGRAPHY.size;
const FONT_WEIGHT = TYPOGRAPHY.weight;

// HIG Dynamic Type Large default size。每條附帶 lineHeight、letterSpacing。
// HIG 原 headline 為 semibold (600)，本標準不啟用 semibold，故 headline 以 medium 代替。
const TYPE_STYLES = {
  largeTitle:  { size: 34, weight: TYPOGRAPHY.weight.regular, lineHeight: 41, letterSpacing:  0.40 },
  title1:      { size: 28, weight: TYPOGRAPHY.weight.regular, lineHeight: 34, letterSpacing:  0.36 },
  title2:      { size: 22, weight: TYPOGRAPHY.weight.regular, lineHeight: 28, letterSpacing:  0.35 },
  title3:      { size: 20, weight: TYPOGRAPHY.weight.regular, lineHeight: 25, letterSpacing:  0.38 },
  headline:    { size: 17, weight: TYPOGRAPHY.weight.medium,  lineHeight: 22, letterSpacing: -0.41 },
  body:        { size: 17, weight: TYPOGRAPHY.weight.regular, lineHeight: 22, letterSpacing: -0.41 },
  callout:     { size: 16, weight: TYPOGRAPHY.weight.regular, lineHeight: 21, letterSpacing: -0.32 },
  subheadline: { size: 15, weight: TYPOGRAPHY.weight.regular, lineHeight: 20, letterSpacing: -0.24 },
  footnote:    { size: 13, weight: TYPOGRAPHY.weight.regular, lineHeight: 18, letterSpacing: -0.08 },
  caption1:    { size: 12, weight: TYPOGRAPHY.weight.regular, lineHeight: 16, letterSpacing:  0.00 },
  caption2:    { size: 11, weight: TYPOGRAPHY.weight.regular, lineHeight: 13, letterSpacing:  0.07 },
};

// LINE_HEIGHT 三檔比例供自由排版時引用；TYPE_STYLES 內已內建絕對 lineHeight。
const LINE_HEIGHT = { tight: 1.2, base: 1.4, relaxed: 1.6 };

// LETTER_SPACING 三檔（pt）供自由排版時引用；TYPE_STYLES 內已內建絕對 letterSpacing。
const LETTER_SPACING = { tight: -0.4, normal: 0, wide: 0.3 };

// ─────────────────────────────────────────────────────────────
// Spacing / Radius / Shadow / Motion
// ─────────────────────────────────────────────────────────────

// HIG 4-multiple baseline。語意命名階梯（Tailwind 風）。
// 最小階 2xs=2 專供「主標題下副標題行內補位」使用，不視為元件間留白。
const SPACING = {
  '2xs': 2,
  xs:    4,
  sm:    8,
  md:    12,
  lg:    16,
  xl:    24,
  '2xl': 32,
  '3xl': 40,
  '4xl': 48,
  '5xl': 64,
};

// HIG continuous corner radius 階梯。不收 14（HIG 標準階梯之外的孤兒值）。
const RADIUS = {
  none: 0,
  sm:   4,
  md:   8,
  lg:   12,
  xl:   16,
  '2xl': 20,
  full: 9999,
};

// HIG layering：level0 無、level1 subtle、level2 raised、level3 overlay。
// 階梯只控 offsetY / blur / opacity；色由 theme.shadow.color 引用（黑色基底）。
// SHADOW 為向後相容 alias，等同 THEME_1.shadow.elevation（也等於 SHADOW_ELEVATION）。
const SHADOW = SHADOW_ELEVATION;

// 動畫 duration 與 easing。對齊 HIG 的 standard / decelerate / accelerate / emphasized 範式。
const MOTION = {
  duration: {
    instant: 100,
    fast:    200,
    base:    300,
    slow:    500,
  },
  easing: {
    standard:    'cubic-bezier(0.4, 0, 0.2, 1)',
    decelerate:  'cubic-bezier(0, 0, 0.2, 1)',
    accelerate:  'cubic-bezier(0.4, 0, 1, 1)',
    emphasized:  'cubic-bezier(0.2, 0, 0, 1)',
  },
};

// 列表空狀態切換動畫；引用 MOTION，內部不再寫死毫秒數。
const LIST_EMPTY_TRANSITION = {
  DURATION_MS: MOTION.duration.fast + 20,  // 220ms（在 fast 與 base 之間，給 crossfade 用）
  EASING:      MOTION.easing.standard,
};

// ─────────────────────────────────────────────────────────────
// 元件層 token —— 內部一律引用上層 TYPE_STYLES / TYPOGRAPHY / SPACING / RADIUS，
// 不再硬編碼數字。命名保留 impl 既有形式以維持 spec/impl 對齊溝通成本。
// ─────────────────────────────────────────────────────────────

const LIST_TOKENS = {
  ITEM_MIN_HEIGHT:           58,
  ITEM_PADDING_VERTICAL:     TYPE_STYLES.body.size,         // 17
  ITEM_PADDING_HORIZONTAL:   SPACING.lg,
  ITEM_GAP_HORIZONTAL:       SPACING.md,
  ITEM_TITLE_SIZE:           TYPE_STYLES.body.size,         // body 17
  ITEM_TITLE_WEIGHT:         TYPOGRAPHY.weight.light,
  ICON_SIZE_SMALL:           20,
  ICON_SIZE_MEDIUM:          24,
  ICON_SIZE_LARGE:           40,
  DIVIDER_COLOR_LIGHT:       'rgba(60,60,67,0.10)',
  DIVIDER_INSET_WITH_ICON:   SPACING.lg + 20 + SPACING.md,
  DIVIDER_INSET_WITHOUT_ICON: SPACING.lg,
  GROUP_CARD_RADIUS:         RADIUS.lg,                     // 12（HIG 不收 14，改採 lg）
  GROUP_CARD_MARGIN_BOTTOM:  35,
  GROUP_CARD_BORDER_WIDTH:   1,
  GROUP_CARD_BORDER_COLOR:   'rgba(60,60,67,0.10)',
  SECTION_TITLE_SIZE:        TYPE_STYLES.footnote.size,     // footnote 13
  SECTION_TITLE_WEIGHT:      TYPOGRAPHY.weight.regular,
  SECTION_TITLE_LETTER_SPACING: 0.5,
  SECTION_TITLE_PADDING_TOP: SPACING.md,
  SECTION_TITLE_PADDING_BOTTOM: SPACING.xs + SPACING['2xs'],   // 6
  SECTION_TITLE_PADDING_HORIZONTAL: SPACING.lg,
  SELECTION_ITEM_RADIUS:     RADIUS.md,
  SELECTION_ITEM_MARGIN_BOTTOM: SPACING.sm,
  SELECTION_CHECKMARK_SIZE:  16,
  TRAILING_CHEVRON_SIZE:     TYPE_STYLES.footnote.size,     // 13
  TRAILING_CHEVRON_WEIGHT:   'semibold',
  TRAILING_VALUE_SIZE:       TYPE_STYLES.body.size,         // 17
  PRESS_BG_HIGHLIGHT_OPACITY: 0.5,
  GRID_COLUMNS:              2,
  GRID_GAP:                  SPACING.md,
  EMPTY_STATE_ICON_SIZE:     48,
  EMPTY_STATE_TITLE_SIZE:    TYPE_STYLES.body.size,         // 17
  EMPTY_STATE_DESCRIPTION_SIZE: TYPOGRAPHY.size.sm,         // 14
  EMPTY_STATE_ICON_GAP:      SPACING.md,
  EMPTY_STATE_TEXT_GAP:      SPACING.sm,
  EMPTY_STATE_PADDING_HORIZONTAL: SPACING.xl,
};

const TX_LIST_TOKENS = {
  SECTION_CARD_RADIUS:                  RADIUS.lg,                     // 12（HIG 不收 14）
  SECTION_CARD_MARGIN_BOTTOM:           SPACING.md + SPACING['2xs'],   // 14
  SECTION_CARD_HORIZONTAL_PADDING:      SPACING.lg,
  SECTION_HEADER_PADDING_V_COLLAPSED:   SPACING.md,
  SECTION_HEADER_PADDING_V_EXPANDED:    SPACING.sm + SPACING['2xs'],   // 10
  SECTION_HEADER_PADDING_H:             SPACING.lg,
  SECTION_HEADER_TITLE_SIZE_COLLAPSED:  TYPE_STYLES.body.size,         // 17
  SECTION_HEADER_TITLE_SIZE_EXPANDED:   TYPOGRAPHY.size.sm,            // 14
  SECTION_HEADER_TOTAL_SIZE_COLLAPSED:  TYPE_STYLES.subheadline.size,  // 15
  SECTION_HEADER_TOTAL_SIZE_EXPANDED:   TYPE_STYLES.footnote.size,     // 13
  SECTION_HEADER_TITLE_WEIGHT:          TYPOGRAPHY.weight.medium,
  SECTION_HEADER_TOTAL_WEIGHT:          TYPOGRAPHY.weight.medium,
  ICON_OUTLINE_BORDER_WIDTH:            1,
  ICON_OUTLINE_SIZE:                    32,
  ICON_OUTLINE_RADIUS:                  10,
  ROW_AMOUNT_SIZE:                      TYPE_STYLES.callout.size,      // 16
  ROW_AMOUNT_WEIGHT:                    TYPOGRAPHY.weight.medium,
  ROW_LEFT_SLOT_SIZE:                   32,
  ROW_NOTE_SIZE:                        TYPE_STYLES.subheadline.size,  // 15
  ROW_SECONDARY_SIZE:                   TYPE_STYLES.caption1.size,     // 12
  MORPH_DURATION_MS:                    MOTION.duration.fast + 80,     // 280ms
};
// 老命名 alias 保留向後相容（intro / foundations / showcase 用過）
const TX_TOKENS = TX_LIST_TOKENS;

const SEARCH_BAR_TOKENS = {
  PILL_HEIGHT:               44,
  PADDING_HORIZONTAL:        SPACING.lg,
  PADDING_VERTICAL:          SPACING.md,
  PILL_PADDING_HORIZONTAL:   SPACING.md,
  ICON_GAP:                  SPACING.sm,
  ICON_SIZE:                 20,
  INPUT_FONT_SIZE:           TYPOGRAPHY.size.base,
};
const SEARCH_TOKENS = SEARCH_BAR_TOKENS;
const BOTTOM_SEARCH_BAR_TOTAL_HEIGHT = SEARCH_BAR_TOKENS.PILL_HEIGHT + SEARCH_BAR_TOKENS.PADDING_VERTICAL * 2;

// ─────────────────────────────────────────────────────────────
// ACTION_ICON_MAP — header 動作 → SF Symbol 對應
// （與 ICON_LIBRARY 並列；ICON_LIBRARY 是 phosphor svg 集合，
//  header action 使用系統 SF Symbol 達成 iOS 原生外觀）
// ─────────────────────────────────────────────────────────────
const ACTION_ICON_MAP = {
  back:    { source: 'native', symbol: null,                           note: '原生 chevron，不自訂' },
  close:   { source: 'sf',     symbol: 'xmark',                        note: 'Modal 關閉動作' },
  done:    { source: 'sf',     symbol: 'checkmark',                    note: 'Modal 完成動作' },
  add:     { source: 'sf',     symbol: 'plus',                         note: '新增動作' },
  merge:   { source: 'sf',     symbol: 'arrow.triangle.merge',         note: '合併動作' },
  settings:{ source: 'sf',     symbol: 'gearshape',                    note: '設定入口' },
  search:  { source: 'sf',     symbol: 'magnifyingglass',              note: '搜尋入口' },
  filter:  { source: 'sf',     symbol: 'line.3.horizontal.decrease',   note: '篩選入口' },
};

// ─────────────────────────────────────────────────────────────
// IconDefinition.json — 完整 97 個 icon
// 與 impl assets/definitions/IconDefinition.json 同步；library 全為 phosphor svg。
// SVG 檔位於 project/assets/icons/phosphor/<glyph>.svg（design git 自包副本）。
// id 1-11 為 account tag；id 12-97 為 category tag。
// ─────────────────────────────────────────────────────────────
const ICON_LIBRARY = [
  { id:  1, uniqueName: 'ph-money'                  , library: 'svg', glyph: 'money'                  , tags: ['account'] },
  { id:  2, uniqueName: 'ph-coins'                  , library: 'svg', glyph: 'coins'                  , tags: ['account'] },
  { id:  3, uniqueName: 'ph-wallet'                 , library: 'svg', glyph: 'wallet'                 , tags: ['account'] },
  { id:  4, uniqueName: 'ph-piggy-bank'             , library: 'svg', glyph: 'piggy-bank'             , tags: ['account'] },
  { id:  5, uniqueName: 'ph-jar'                    , library: 'svg', glyph: 'jar'                    , tags: ['account'] },
  { id:  6, uniqueName: 'ph-gift'                   , library: 'svg', glyph: 'gift'                   , tags: ['account'] },
  { id:  7, uniqueName: 'ph-credit-card'            , library: 'svg', glyph: 'credit-card'            , tags: ['account'] },
  { id:  8, uniqueName: 'ph-contactless-payment'    , library: 'svg', glyph: 'contactless-payment'    , tags: ['account'] },
  { id:  9, uniqueName: 'ph-paypal-logo'            , library: 'svg', glyph: 'paypal-logo'            , tags: ['account'] },
  { id: 10, uniqueName: 'ph-archive'                , library: 'svg', glyph: 'archive'                , tags: ['account'] },
  { id: 11, uniqueName: 'ph-building'               , library: 'svg', glyph: 'building'               , tags: ['account'] },
  { id: 12, uniqueName: 'ph-bread'                  , library: 'svg', glyph: 'bread'                  , tags: ['category'] },
  { id: 13, uniqueName: 'ph-coffee'                 , library: 'svg', glyph: 'coffee'                 , tags: ['category'] },
  { id: 14, uniqueName: 'ph-acorn'                  , library: 'svg', glyph: 'acorn'                  , tags: ['category'] },
  { id: 15, uniqueName: 'ph-ice-cream'              , library: 'svg', glyph: 'ice-cream'              , tags: ['category'] },
  { id: 16, uniqueName: 'ph-martini'                , library: 'svg', glyph: 'martini'                , tags: ['category'] },
  { id: 17, uniqueName: 'ph-cake'                   , library: 'svg', glyph: 'cake'                   , tags: ['category'] },
  { id: 18, uniqueName: 'ph-person-simple-bike'     , library: 'svg', glyph: 'person-simple-bike'     , tags: ['category'] },
  { id: 19, uniqueName: 'ph-bicycle'                , library: 'svg', glyph: 'bicycle'                , tags: ['category'] },
  { id: 20, uniqueName: 'ph-moped'                  , library: 'svg', glyph: 'moped'                  , tags: ['category'] },
  { id: 21, uniqueName: 'ph-motorcycle'             , library: 'svg', glyph: 'motorcycle'             , tags: ['category'] },
  { id: 22, uniqueName: 'ph-car'                    , library: 'svg', glyph: 'car'                    , tags: ['category'] },
  { id: 23, uniqueName: 'ph-bus'                    , library: 'svg', glyph: 'bus'                    , tags: ['category'] },
  { id: 24, uniqueName: 'ph-train-simple'           , library: 'svg', glyph: 'train-simple'           , tags: ['category'] },
  { id: 25, uniqueName: 'ph-taxi'                   , library: 'svg', glyph: 'taxi'                   , tags: ['category'] },
  { id: 26, uniqueName: 'ph-anchor'                 , library: 'svg', glyph: 'anchor'                 , tags: ['category'] },
  { id: 27, uniqueName: 'ph-airplane-takeoff'       , library: 'svg', glyph: 'airplane-takeoff'       , tags: ['category'] },
  { id: 28, uniqueName: 'ph-shopping-cart'          , library: 'svg', glyph: 'shopping-cart'          , tags: ['category'] },
  { id: 29, uniqueName: 'ph-storefront'             , library: 'svg', glyph: 'storefront'             , tags: ['category'] },
  { id: 30, uniqueName: 'ph-dress'                  , library: 'svg', glyph: 'dress'                  , tags: ['category'] },
  { id: 31, uniqueName: 'ph-t-shirt'                , library: 'svg', glyph: 't-shirt'                , tags: ['category'] },
  { id: 32, uniqueName: 'ph-high-heel'              , library: 'svg', glyph: 'high-heel'              , tags: ['category'] },
  { id: 33, uniqueName: 'ph-watch'                  , library: 'svg', glyph: 'watch'                  , tags: ['category'] },
  { id: 34, uniqueName: 'ph-backpack'               , library: 'svg', glyph: 'backpack'               , tags: ['category'] },
  { id: 35, uniqueName: 'ph-pencil-simple'          , library: 'svg', glyph: 'pencil-simple'          , tags: ['category'] },
  { id: 36, uniqueName: 'ph-ruler'                  , library: 'svg', glyph: 'ruler'                  , tags: ['category'] },
  { id: 37, uniqueName: 'ph-phone'                  , library: 'svg', glyph: 'phone'                  , tags: ['category'] },
  { id: 38, uniqueName: 'ph-lightbulb'              , library: 'svg', glyph: 'lightbulb'              , tags: ['category'] },
  { id: 39, uniqueName: 'ph-plugs'                  , library: 'svg', glyph: 'plugs'                  , tags: ['category'] },
  { id: 40, uniqueName: 'ph-alarm'                  , library: 'svg', glyph: 'alarm'                  , tags: ['category'] },
  { id: 41, uniqueName: 'ph-umbrella-simple'        , library: 'svg', glyph: 'umbrella-simple'        , tags: ['category'] },
  { id: 42, uniqueName: 'ph-book'                   , library: 'svg', glyph: 'book'                   , tags: ['category'] },
  { id: 43, uniqueName: 'ph-projector-screen'       , library: 'svg', glyph: 'projector-screen'       , tags: ['category'] },
  { id: 44, uniqueName: 'ph-broom'                  , library: 'svg', glyph: 'broom'                  , tags: ['category'] },
  { id: 45, uniqueName: 'ph-wrench'                 , library: 'svg', glyph: 'wrench'                 , tags: ['category'] },
  { id: 46, uniqueName: 'ph-axe'                    , library: 'svg', glyph: 'axe'                    , tags: ['category'] },
  { id: 47, uniqueName: 'ph-car-battery'            , library: 'svg', glyph: 'car-battery'            , tags: ['category'] },
  { id: 48, uniqueName: 'ph-engine'                 , library: 'svg', glyph: 'engine'                 , tags: ['category'] },
  { id: 49, uniqueName: 'ph-toilet'                 , library: 'svg', glyph: 'toilet'                 , tags: ['category'] },
  { id: 50, uniqueName: 'ph-devices'                , library: 'svg', glyph: 'devices'                , tags: ['category'] },
  { id: 51, uniqueName: 'ph-baby-carriage'          , library: 'svg', glyph: 'baby-carriage'          , tags: ['category'] },
  { id: 52, uniqueName: 'ph-armchair'               , library: 'svg', glyph: 'armchair'               , tags: ['category'] },
  { id: 53, uniqueName: 'ph-house'                  , library: 'svg', glyph: 'house'                  , tags: ['category'] },
  { id: 54, uniqueName: 'ph-music-notes-simple'     , library: 'svg', glyph: 'music-notes-simple'     , tags: ['category'] },
  { id: 55, uniqueName: 'ph-palette'                , library: 'svg', glyph: 'palette'                , tags: ['category'] },
  { id: 56, uniqueName: 'ph-camera'                 , library: 'svg', glyph: 'camera'                 , tags: ['category'] },
  { id: 57, uniqueName: 'ph-video-camera'           , library: 'svg', glyph: 'video-camera'           , tags: ['category'] },
  { id: 58, uniqueName: 'ph-ghost'                  , library: 'svg', glyph: 'ghost'                  , tags: ['category'] },
  { id: 59, uniqueName: 'ph-lego'                   , library: 'svg', glyph: 'lego'                   , tags: ['category'] },
  { id: 60, uniqueName: 'ph-game-controller'        , library: 'svg', glyph: 'game-controller'        , tags: ['category'] },
  { id: 61, uniqueName: 'ph-rocket-launch'          , library: 'svg', glyph: 'rocket-launch'          , tags: ['category'] },
  { id: 62, uniqueName: 'ph-barbell'                , library: 'svg', glyph: 'barbell'                , tags: ['category'] },
  { id: 63, uniqueName: 'ph-tennis-ball'            , library: 'svg', glyph: 'tennis-ball'            , tags: ['category'] },
  { id: 64, uniqueName: 'ph-basketball'             , library: 'svg', glyph: 'basketball'             , tags: ['category'] },
  { id: 65, uniqueName: 'ph-volleyball'             , library: 'svg', glyph: 'volleyball'             , tags: ['category'] },
  { id: 66, uniqueName: 'ph-baseball'               , library: 'svg', glyph: 'baseball'               , tags: ['category'] },
  { id: 67, uniqueName: 'ph-beach-ball'             , library: 'svg', glyph: 'beach-ball'             , tags: ['category'] },
  { id: 68, uniqueName: 'ph-ping-pong'              , library: 'svg', glyph: 'ping-pong'              , tags: ['category'] },
  { id: 69, uniqueName: 'ph-boxing-glove'           , library: 'svg', glyph: 'boxing-glove'           , tags: ['category'] },
  { id: 70, uniqueName: 'ph-football'               , library: 'svg', glyph: 'football'               , tags: ['category'] },
  { id: 71, uniqueName: 'ph-hockey'                 , library: 'svg', glyph: 'hockey'                 , tags: ['category'] },
  { id: 72, uniqueName: 'ph-person-simple-snowboard', library: 'svg', glyph: 'person-simple-snowboard', tags: ['category'] },
  { id: 73, uniqueName: 'ph-handshake'              , library: 'svg', glyph: 'handshake'              , tags: ['category'] },
  { id: 74, uniqueName: 'ph-hands-praying'          , library: 'svg', glyph: 'hands-praying'          , tags: ['category'] },
  { id: 75, uniqueName: 'ph-heart'                  , library: 'svg', glyph: 'heart'                  , tags: ['category'] },
  { id: 76, uniqueName: 'ph-pill'                   , library: 'svg', glyph: 'pill'                   , tags: ['category'] },
  { id: 77, uniqueName: 'ph-fire'                   , library: 'svg', glyph: 'fire'                   , tags: ['category'] },
  { id: 78, uniqueName: 'ph-fire-extinguisher'      , library: 'svg', glyph: 'fire-extinguisher'      , tags: ['category'] },
  { id: 79, uniqueName: 'ph-ambulance'              , library: 'svg', glyph: 'ambulance'              , tags: ['category'] },
  { id: 80, uniqueName: 'ph-clover'                 , library: 'svg', glyph: 'clover'                 , tags: ['category'] },
  { id: 81, uniqueName: 'ph-cactus'                 , library: 'svg', glyph: 'cactus'                 , tags: ['category'] },
  { id: 82, uniqueName: 'ph-tree'                   , library: 'svg', glyph: 'tree'                   , tags: ['category'] },
  { id: 83, uniqueName: 'ph-bird'                   , library: 'svg', glyph: 'bird'                   , tags: ['category'] },
  { id: 84, uniqueName: 'ph-cat'                    , library: 'svg', glyph: 'cat'                    , tags: ['category'] },
  { id: 85, uniqueName: 'ph-dog'                    , library: 'svg', glyph: 'dog'                    , tags: ['category'] },
  { id: 86, uniqueName: 'ph-bone'                   , library: 'svg', glyph: 'bone'                   , tags: ['category'] },
  { id: 87, uniqueName: 'ph-chart-line'             , library: 'svg', glyph: 'chart-line'             , tags: ['category'] },
  { id: 88, uniqueName: 'ph-bank'                   , library: 'svg', glyph: 'bank'                   , tags: ['category'] },
  { id: 89, uniqueName: 'ph-scales'                 , library: 'svg', glyph: 'scales'                 , tags: ['category'] },
  { id: 90, uniqueName: 'ph-pi'                     , library: 'svg', glyph: 'pi'                     , tags: ['category'] },
  { id: 91, uniqueName: 'ph-crown-simple'           , library: 'svg', glyph: 'crown-simple'           , tags: ['category'] },
  { id: 92, uniqueName: 'ph-planet'                 , library: 'svg', glyph: 'planet'                 , tags: ['category'] },
  { id: 93, uniqueName: 'ph-flying-saucer'          , library: 'svg', glyph: 'flying-saucer'          , tags: ['category'] },
  { id: 94, uniqueName: 'ph-rainbow'                , library: 'svg', glyph: 'rainbow'                , tags: ['category'] },
  { id: 95, uniqueName: 'ph-cigarette'              , library: 'svg', glyph: 'cigarette'              , tags: ['category'] },
  { id: 96, uniqueName: 'ph-biohazard'              , library: 'svg', glyph: 'biohazard'              , tags: ['category'] },
  { id: 97, uniqueName: 'ph-trash-simple'           , library: 'svg', glyph: 'trash-simple'           , tags: ['category'] },
];
const ICON_BY_ID = Object.fromEntries(ICON_LIBRARY.map(i => [i.id, i]));

// ─────────────────────────────────────────────────────────────
// Mock data — 設計稿視覺化用 seed
// ─────────────────────────────────────────────────────────────
const CATEGORIES = [
  { id: 'food',    name: '飲食',  type: 'expense', iconId: 13 },  // ph-coffee
  { id: 'trans',   name: '交通',  type: 'expense', iconId: 23 },  // ph-bus
  { id: 'shop',    name: '購物',  type: 'expense', iconId: 28 },  // ph-shopping-cart
  { id: 'ent',     name: '娛樂',  type: 'expense', iconId: 60 },  // ph-game-controller
  { id: 'home',    name: '居家',  type: 'expense', iconId: 53 },  // ph-house
  { id: 'health',  name: '醫療',  type: 'expense', iconId: 76 },  // ph-pill
  { id: 'edu',     name: '教育',  type: 'expense', iconId: 42 },  // ph-book
  { id: 'gift',    name: '禮物',  type: 'expense', iconId:  6 },  // ph-gift
  { id: 'salary',  name: '薪資',  type: 'income',  iconId:  1 },  // ph-money
  { id: 'invest',  name: '投資',  type: 'income',  iconId: 87 },  // ph-chart-line
];
const CAT_BY_ID = Object.fromEntries(CATEGORIES.map(c => [c.id, c]));

const ACCOUNTS = [
  { id: 'cash',     name: '現金',           balance: 3240,    iconId:  1, typeId: 1, currency: 'TWD' },  // ph-money
  { id: 'bank',     name: '玉山活儲',        balance: 128450,  iconId: 11, typeId: 2, currency: 'TWD' },  // ph-building
  { id: 'credit',   name: '國泰世華 信用卡', balance: -8420,   iconId:  7, typeId: 3, currency: 'TWD' },  // ph-credit-card
  { id: 'invest',   name: '富邦證券',        balance: 462100,  iconId: 87, typeId: 4, currency: 'TWD' },  // ph-chart-line
  { id: 'usd_cash', name: 'USD 旅費',        balance: 320,     iconId:  5, typeId: 1, currency: 'USD' },  // ph-jar
];
const ACC_BY_ID = Object.fromEntries(ACCOUNTS.map(a => [a.id, a]));

const TX = [
  { id: 1,  date: 'May 2',  cat: 'food',   acc: 'credit',   amount: -185,  note: '路易莎咖啡' },
  { id: 2,  date: 'May 2',  cat: 'food',   acc: 'cash',     amount: -120,  note: '便當' },
  { id: 3,  date: 'May 2',  cat: 'trans',  acc: 'credit',   amount: -32,   note: '捷運月票',     recurring: true },
  { id: 4,  date: 'May 1',  cat: 'ent',    acc: 'usd_cash', amount: -15,   currency: 'USD', convertedAmount: -480, note: 'Netflix 訂閱',  recurring: true },
  { id: 5,  date: 'May 1',  cat: 'food',   acc: 'credit',   amount: -780,  note: '居酒屋' },
  { id: 6,  date: 'May 1',  cat: 'shop',   acc: 'usd_cash', amount: -40,   currency: 'USD', convertedAmount: -1290, note: 'Uniqlo T-shirt × 2' },
  { id: 7,  date: 'Apr 30', cat: 'salary', acc: 'bank',     amount: 68000, note: '4 月薪資',     recurring: true },
  { id: 8,  date: 'Apr 30', cat: 'trans',  acc: 'credit',   amount: -28,   note: '公車' },
  { id: 9,  date: 'Apr 29', cat: 'food',   acc: 'cash',     amount: -340,  note: '晚餐 — 牛肉麵' },
  { id: 10, date: 'Apr 29', cat: 'health', acc: 'credit',   amount: -650,  note: '牙科檢查' },
  { id: 11, date: 'Apr 29', cat: 'home',   acc: 'credit',   amount: -1480, note: '電費',         recurring: true },
];

// ─────────────────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────────────────
const baseAmount = (t) => t.convertedAmount ?? t.amount;

function periodTotals(items) {
  let income = 0, expense = 0;
  for (const t of items) {
    const a = baseAmount(t);
    if (a > 0) income += a; else expense += -a;
  }
  return { income, expense, balance: income - expense };
}

function groupByDate(items) {
  const m = new Map();
  for (const t of items) {
    if (!m.has(t.date)) m.set(t.date, []);
    m.get(t.date).push(t);
  }
  return Array.from(m.entries()).map(([title, data]) => ({
    id: 'date_' + title, title, data,
    total: data.reduce((s, t) => s + baseAmount(t), 0),
  }));
}

function groupByCategory(items, chartMode = 'expense') {
  const filtered = items.filter(t => chartMode === 'expense' ? baseAmount(t) < 0 : baseAmount(t) > 0);
  const m = new Map();
  for (const t of filtered) {
    if (!m.has(t.cat)) m.set(t.cat, []);
    m.get(t.cat).push(t);
  }
  return Array.from(m.entries()).map(([cat, data]) => ({
    id: 'cat_' + cat, cat,
    title: CAT_BY_ID[cat].name,
    iconId: CAT_BY_ID[cat].iconId,
    data,
    total: data.reduce((s, t) => s + baseAmount(t), 0),
  })).sort((a, b) => Math.abs(b.total) - Math.abs(a.total));
}

function pieData(items) {
  const m = new Map();
  for (const t of items) {
    const a = baseAmount(t);
    if (a >= 0) continue;
    m.set(t.cat, (m.get(t.cat) || 0) + (-a));
  }
  const arr = Array.from(m.entries()).sort((a, b) => b[1] - a[1]);
  return arr.map(([id, value], i) => ({
    id, value,
    color: CHART_COLORS[i % CHART_COLORS.length],
    cat: CAT_BY_ID[id],
  }));
}

function fmt(n, code = 'TWD') {
  const sign = n < 0 ? '-' : '';
  const abs = Math.abs(n);
  const symbol = code === 'TWD' ? 'NT$' : code === 'USD' ? 'US$' : code === 'JPY' ? '¥' : code;
  return sign + symbol + abs.toLocaleString('en-US');
}

Object.assign(window, {
  PALETTE, THEMES, THEME_1, THEME_2, DEFAULT_THEME, DEFAULT_THEME_ID,
  TOKENS, CHART_COLORS, GLASS,
  TYPOGRAPHY, TYPOGRAPHY_WEIGHT_ENABLED, TYPE_SCALE, FONT_WEIGHT, TYPE_STYLES,
  LINE_HEIGHT, LETTER_SPACING,
  SPACING, RADIUS, SHADOW, MOTION,
  LIST_TOKENS, TX_LIST_TOKENS, TX_TOKENS,
  SEARCH_BAR_TOKENS, SEARCH_TOKENS, BOTTOM_SEARCH_BAR_TOTAL_HEIGHT,
  ACTION_ICON_MAP, LIST_EMPTY_TRANSITION,
  ICON_LIBRARY, ICON_BY_ID,
  CATEGORIES, CAT_BY_ID, ACCOUNTS, ACC_BY_ID, TX,
  baseAmount, periodTotals, groupByDate, groupByCategory, pieData, fmt,
});
