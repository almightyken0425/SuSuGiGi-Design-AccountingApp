// ─────────────────────────────────────────────────────────────
// Canvas tokens · 設計稿渲染用快照
//
// 攤平 THEME_1 為 TOKENS 物件，僅供 design canvas（components.jsx /
// 30_screens/ 各 screen 檔 / visualizers）即時讀色，**Impl 端動態 theme 系統不消費**。
// 維護時不視為 Impl 對齊缺口。
// ─────────────────────────────────────────────────────────────

const TOKENS = {
  bg:        THEME_1.bg.base,
  surface:   THEME_1.bg.surface,
  surface2:  THEME_1.bg.surface_hover,
  ink:       THEME_1.text.primary,
  ink2:      THEME_1.text.secondary,
  inkTertiary: THEME_1.text.tertiary,   // 第三階純文字（法定揭露等最低權重背景文字）；與 ink3（停用態前景）同值不同語意
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

// GLASS — 為 GlassDemoCard 等視覺化卡片提供 GLASS_BASE 的別名（保留向後相容）。
const GLASS = { ...GLASS_BASE };

Object.assign(window, { TOKENS, CHART_COLORS, GLASS });
