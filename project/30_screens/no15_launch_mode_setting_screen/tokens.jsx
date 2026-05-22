// ─────────────────────────────────────────────────────────────
// LAUNCH_MODE_SETTING_SCREEN_TOKENS · LaunchModeSettingScreen 內部 composition 參數
//
// Modal screen，ScrollView 包單一 ListGroupCard 含 4 個 SelectionListItem。
// impl src/screens/Settings/LaunchModeSettingScreen.tsx 結構鏡射。
// ─────────────────────────────────────────────────────────────

const LAUNCH_MODE_SETTING_SCREEN_TOKENS = {
  SCREEN_PADDING_HORIZONTAL: SPACING.lg,
  SCREEN_PADDING_TOP:        SPACING.lg,
  SCREEN_PADDING_BOTTOM:     SPACING.xl,
};

Object.assign(window, { LAUNCH_MODE_SETTING_SCREEN_TOKENS });
