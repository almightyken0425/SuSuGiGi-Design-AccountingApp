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

// 數字等寬字形 token。金額、日期等即時變動數字統一引用此值，
// 避免逐處 hardcode 字面值造成遺漏（對應 impl fontVariant: ['tabular-nums']）。
const NUMERIC_FONT_VARIANT = 'tabular-nums';

Object.assign(window, {
  TYPOGRAPHY, TYPOGRAPHY_WEIGHT_ENABLED, TYPE_STYLES, LINE_HEIGHT, LETTER_SPACING,
  NUMERIC_FONT_VARIANT,
});
