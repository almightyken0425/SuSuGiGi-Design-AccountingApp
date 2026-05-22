// ─────────────────────────────────────────────────────────────
// CURRENCY_DETAIL_CONFIG_SCREEN_TOKENS · CurrencyDetailConfigScreen 內部 composition 參數
//
// Modal save form。設定幣別的「千位省略」與「小數位數」。
// impl src/screens/Settings/CurrencyDetailConfigScreen.tsx 結構鏡射。
// ─────────────────────────────────────────────────────────────

const CURRENCY_DETAIL_CONFIG_SCREEN_TOKENS = {
  SCREEN_PADDING:           SPACING.lg,
  HEADER_NAME_FONT_SIZE:    TYPOGRAPHY.size.xl,
  HEADER_NAME_BOTTOM_MARGIN: SPACING.xl,
  SECTION_GAP:              SPACING.xl,
  SECTION_TITLE_FONT_SIZE:  TYPOGRAPHY.size.sm,
  SECTION_TITLE_BOTTOM_MARGIN: SPACING.sm,
};

Object.assign(window, { CURRENCY_DETAIL_CONFIG_SCREEN_TOKENS });
