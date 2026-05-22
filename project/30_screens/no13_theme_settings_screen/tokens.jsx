// ─────────────────────────────────────────────────────────────
// THEME_SETTINGS_SCREEN_TOKENS · ThemeSettingsScreen 內部 composition 參數
//
// Modal screen，2 欄 SelectionGridItem 網格，每 cell 含三色預覽。
// impl src/screens/Settings/ThemeSettingsScreen.tsx 結構鏡射。
// ─────────────────────────────────────────────────────────────

const THEME_SETTINGS_SCREEN_TOKENS = {
  SCREEN_PADDING:        SPACING.lg,
  GRID_GAP:              LIST_TOKENS.GRID_GAP,
  GRID_CELL_WIDTH_PCT:   '47%',                 // (literal: impl 用 47% width 兩欄 + GRID_GAP 中縫)
  PREVIEW_ASPECT_RATIO:  1.4,                   // (literal: 對齊 SelectionGridItem 內 preview aspectRatio)
};

Object.assign(window, { THEME_SETTINGS_SCREEN_TOKENS });
