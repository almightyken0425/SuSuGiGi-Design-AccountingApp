// ─────────────────────────────────────────────────────────────
// CURRENCY_LIST_SCREEN_TOKENS · CurrencyListScreen 內部 composition 參數
//
// Push screen，列出標準幣別 + 底部 BottomSearchBar；空搜尋結果顯示 ListEmptyState。
// impl src/screens/Settings/CurrencyListScreen.tsx 結構鏡射。
//
// 消費 atomic（SPACING）+ component_tokens（LIST_TOKENS）+ search_bar token（隱含於 BottomSearchBar）。
// ─────────────────────────────────────────────────────────────

const CURRENCY_LIST_SCREEN_TOKENS = {
  SCREEN_PADDING_TOP:      LIST_TOKENS.HEADER_BREATHING,  // impl: 系統 inset 之上 +16（GroupedListCard topSpacing）
  LIST_MARGIN_HORIZONTAL:  SPACING.lg,
  LIST_BOTTOM_PADDING:     SPACING.xl,            // FlatList contentContainer paddingBottom
};

Object.assign(window, { CURRENCY_LIST_SCREEN_TOKENS });
