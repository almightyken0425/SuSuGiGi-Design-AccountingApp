// ─────────────────────────────────────────────────────────────
// Layout tokens · 間距 / 圓角 / 陰影 / 動畫 / icon 尺寸 / 觸控目標 / row 高度
//
// 跨元件共用的版面原語階梯。元件層 token（LIST_TOKENS 等）必須引用此檔。
// SHADOW 保留為 SHADOW_ELEVATION 的向後相容 alias；視覺化讀此 alias。
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

// SHADOW 為 SHADOW_ELEVATION 的向後相容 alias（grep 確認 foundations 視覺化 + app.jsx + intro.jsx 仍消費 SHADOW）。
// 主來源為 no1_atomic_tokens.jsx 的 SHADOW_ELEVATION；此 alias 供視覺化卡片與舊路徑使用，不另定義新階梯。
const SHADOW = SHADOW_ELEVATION;

// 動畫 duration 與 easing。對齊 HIG 的 standard / decelerate / accelerate / emphasized 範式。
const MOTION = {
  duration: {
    instant:  100,
    fast:     200,
    fastPlus: 220, // fast + 20；供 END_DATE_PILL_FADE_DURATION 等單點校準 offset 使用
    base:     300,
    slow:     500,
  },
  easing: {
    standard:    'cubic-bezier(0.4, 0, 0.2, 1)',
    decelerate:  'cubic-bezier(0, 0, 0.2, 1)',
    accelerate:  'cubic-bezier(0.4, 0, 1, 1)',
    emphasized:  'cubic-bezier(0.2, 0, 0, 1)',
  },
};

// Icon 尺寸階梯。供元件層 token 與 consumer 共用，避免 icon size 散落硬編碼。
// 與 SPACING 階梯獨立，命名規則一致以便閱讀。
const ICON_SIZE = {
  xs:    16,   // chevron / 小型 inline icon
  sm:    20,   // 列表標準 icon
  md:    24,   // 大型 inline icon
  lg:    32,   // icon outline / row 左槽
  xl:    40,   // 強調區 icon
  '2xl': 48,   // 空狀態大 icon
};

// 觸控目標尺寸。iOS HIG 觸控最小目標為 44pt。
const HIT_TARGET = {
  min: 44,
};

// 跨元件共用 row 高度原語。58 = HIT_TARGET.min(44) + 視覺安全補位。
// 由 LIST_TOKENS.ITEM_MIN_HEIGHT 與 FORM_PICKER_TOKENS.ROW_MIN_HEIGHT 引用。
const ROW_HEIGHT = {
  base: 58,
};

Object.assign(window, {
  SPACING, RADIUS, SHADOW, MOTION, ICON_SIZE, HIT_TARGET, ROW_HEIGHT,
});
