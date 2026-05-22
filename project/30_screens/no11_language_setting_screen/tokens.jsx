// ─────────────────────────────────────────────────────────────
// LANGUAGE_SETTING_SCREEN_TOKENS · LanguageSettingScreen 內部 composition 參數
//
// Modal screen（header 含 close + checkmark），ScrollView 包單一 ListGroupCard 含 2 個 SelectionListItem。
// impl src/screens/Settings/LanguageSettingScreen.tsx 結構鏡射。
// ─────────────────────────────────────────────────────────────

const LANGUAGE_SETTING_SCREEN_TOKENS = {
  SCREEN_PADDING_HORIZONTAL: SPACING.lg,
  SCREEN_PADDING_TOP:        SPACING.lg,
  SCREEN_PADDING_BOTTOM:     SPACING.xl,
};

Object.assign(window, { LANGUAGE_SETTING_SCREEN_TOKENS });
