// ─────────────────────────────────────────────────────────────
// TIME_ZONE_SETTING_SCREEN_TOKENS · TimeZoneSettingScreen 內部 composition 參數
//
// Modal screen，SelectionListItem 列表 + 底部 BottomSearchBar；空搜尋結果顯示 ListEmptyState。
// impl src/screens/Settings/TimeZoneSettingScreen.tsx 結構鏡射。
// ─────────────────────────────────────────────────────────────

const TIME_ZONE_SETTING_SCREEN_TOKENS = {
  SCREEN_PADDING_TOP:      LIST_TOKENS.HEADER_BREATHING,  // impl: 系統 inset 之上 +16（GroupedListCard topSpacing）
  LIST_MARGIN_HORIZONTAL:  SPACING.lg,
  LIST_BOTTOM_PADDING:     SPACING.xl,
};

Object.assign(window, { TIME_ZONE_SETTING_SCREEN_TOKENS });
