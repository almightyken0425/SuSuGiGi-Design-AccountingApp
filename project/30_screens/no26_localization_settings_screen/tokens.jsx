// ─────────────────────────────────────────────────────────────
// LOCALIZATION_SETTINGS_SCREEN_TOKENS · LocalizationSettingsScreen 內部 composition 參數
//
// Push screen（從 Settings 主入口進入），1 個 ListGroupCard 含 4 個 ListItem 入口：
//   Base Currency / Currency Format / Timezone / Language
// impl src/screens/Settings/LocalizationSettingsScreen.tsx 結構鏡射。
// ─────────────────────────────────────────────────────────────

const LOCALIZATION_SETTINGS_SCREEN_TOKENS = {
  SCREEN_PADDING: SPACING.lg,
};

Object.assign(window, { LOCALIZATION_SETTINGS_SCREEN_TOKENS });
