// ─────────────────────────────────────────────────────────────
// CURRENCY_RATE_LIST_SCREEN_TOKENS · CurrencyRateListScreen 內部 composition 參數
//
// Push screen，列出匯率對 + 底部 BottomSearchBar；空狀態文字依「無資料」或「搜尋無結果」切換。
// impl src/screens/Settings/CurrencyRateListScreen.tsx 結構鏡射。
// ─────────────────────────────────────────────────────────────

const CURRENCY_RATE_LIST_SCREEN_TOKENS = {
  SCREEN_PADDING_TOP:      LIST_TOKENS.HEADER_BREATHING,  // impl: 系統 inset 之上 +16（GroupedListCard topSpacing）
  LIST_MARGIN_HORIZONTAL:  SPACING.lg,
  LIST_BOTTOM_PADDING:     SPACING.xl,
};

Object.assign(window, { CURRENCY_RATE_LIST_SCREEN_TOKENS });
