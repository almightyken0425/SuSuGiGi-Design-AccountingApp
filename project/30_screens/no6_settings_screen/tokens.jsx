// ─────────────────────────────────────────────────────────────
// SETTINGS_SCREEN_TOKENS · SettingsScreen 內部 composition 參數
//
// Push screen，提供存取類別 / 帳戶 / 資料管理 / 偏好 / 升級的中心化入口。
// 消費 atomic（SPACING / TOKENS）+ component_tokens（LIST_TOKENS）。
// ListGroupCard 自帶 GROUP_CARD_MARGIN_BOTTOM=35，section 間距由其控制，
// 本檔無需 SECTION_GAP。
// ─────────────────────────────────────────────────────────────

const SETTINGS_SCREEN_TOKENS = {
  // ── Screen container
  SCREEN_PADDING:           SPACING.lg,

  // ── List row icon / title 色彩
  ROW_ICON_COLOR_DEFAULT:   TOKENS.ink,
  ROW_ICON_COLOR_ACCENT:    TOKENS.p500,                                   // 對齊 impl theme.primary.main
  ROW_TITLE_COLOR_ACCENT:   TOKENS.p500,
  ROW_ICON_SIZE:            LIST_TOKENS.ICON_SIZE_SMALL,                   // 對齊 impl LIST_TOKENS.ICON_SIZE_SMALL
};

Object.assign(window, { SETTINGS_SCREEN_TOKENS });
