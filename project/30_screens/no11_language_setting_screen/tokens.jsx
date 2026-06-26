// ─────────────────────────────────────────────────────────────
// LANGUAGE_SETTING_SCREEN_TOKENS · LanguageSettingScreen 內部 composition 參數
//
// Modal screen（header 含 close + checkmark），SelectionListItem 列表 + 底部 BottomSearchBar；
// 空搜尋結果顯示 ListEmptyState。
// impl src/screens/Settings/LanguageSettingScreen.tsx 結構鏡射。
// ─────────────────────────────────────────────────────────────

const LANGUAGE_SETTING_SCREEN_TOKENS = {
  SCREEN_PADDING_TOP:      LIST_TOKENS.HEADER_BREATHING,  // impl: 系統 inset 之上 +16（GroupedListCard topSpacing）
  LIST_MARGIN_HORIZONTAL:  SPACING.lg,
  LIST_BOTTOM_PADDING:     SPACING.xl,
  EMPTY_PADDING_TOP:       SPACING['5xl'],
};

Object.assign(window, { LANGUAGE_SETTING_SCREEN_TOKENS });
