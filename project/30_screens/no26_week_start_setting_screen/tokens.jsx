// ─────────────────────────────────────────────────────────────
// WEEK_START_SETTING_SCREEN_TOKENS · WeekStartSettingScreen 內部 composition 參數
//
// Modal screen，ScrollView 包單一 ListGroupCard 含 3 個 SelectionListItem。
// impl src/screens/Settings/WeekStartSettingScreen.tsx 結構鏡射。
// ─────────────────────────────────────────────────────────────

const WEEK_START_SETTING_SCREEN_TOKENS = {
  SCREEN_PADDING_HORIZONTAL: SPACING.lg,
  SCREEN_PADDING_TOP:        LIST_TOKENS.HEADER_BREATHING,
  SCREEN_PADDING_BOTTOM:     SPACING.xl,
};

Object.assign(window, { WEEK_START_SETTING_SCREEN_TOKENS });
