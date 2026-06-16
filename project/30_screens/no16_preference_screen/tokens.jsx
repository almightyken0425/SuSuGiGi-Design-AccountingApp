// ─────────────────────────────────────────────────────────────
// PREFERENCE_SCREEN_TOKENS · PreferenceScreen 內部 composition 參數
//
// Push screen，5 個 ListSection（無 title），每 section 一張 ListGroupCard。
// impl src/screens/Settings/PreferenceScreen.tsx 結構鏡射。
// ─────────────────────────────────────────────────────────────

const PREFERENCE_SCREEN_TOKENS = {
  SCREEN_PADDING: SPACING.lg,
};

Object.assign(window, { PREFERENCE_SCREEN_TOKENS });
