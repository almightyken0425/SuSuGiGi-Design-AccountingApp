// ─────────────────────────────────────────────────────────────
// BASE_CURRENCY_SETTING_SCREEN_TOKENS · BaseCurrencySettingScreen 內部 composition 參數
//
// Modal screen，SelectionListItem 列表 + 底部 BottomSearchBar；空搜尋結果顯示 ListEmptyState。
// impl src/screens/Settings/BaseCurrencySettingScreen.tsx 結構鏡射。
// ─────────────────────────────────────────────────────────────

const BASE_CURRENCY_SETTING_SCREEN_TOKENS = {
  LIST_MARGIN_HORIZONTAL:  SPACING.lg,
  LIST_BOTTOM_PADDING:     SPACING.xl,
};

Object.assign(window, { BASE_CURRENCY_SETTING_SCREEN_TOKENS });
