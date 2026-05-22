// ─────────────────────────────────────────────────────────────
// SEARCH_SCREEN_TOKENS · SearchScreen 內部 composition 參數
//
// Modal screen，底部 BottomSearchBar + 上方結果列表 / empty / loading。
// 消費 atomic + component_tokens（SEARCH_BAR_TOKENS / BOTTOM_SEARCH_BAR_TOTAL_HEIGHT）+ LIST_TOKENS。
// ─────────────────────────────────────────────────────────────

const SEARCH_SCREEN_TOKENS = {
  // ── Empty state（含 initial-prompt 與 no-results 兩種）
  EMPTY_PADDING_TOP:        100,                                              // (literal: 為 modal header + 視覺呼吸預留 top 距離)

  // ── Result list
  RESULT_LIST_BOTTOM_GAP:   SPACING['3xl'],                                   // 40：BottomSearchBar 上額外 buffer

  // ── Recurring chip（與 HomeScreen 共用視覺；尚未升 component_tokens）
  // V1 (List Treatment) 採納後，row 視覺改消費 TX_LIST_TOKENS；
  // 但 recurring chip 是 SearchScreen 與 HomeScreen 共有的本地 chip 視覺，
  // 維持留在本 SCREEN_TOKENS 直到 component_tokens 內補 CHIP family。
  RECURRING_FRAME:          22,                                               // (literal: 22x22 chip，比 ICON_SIZE.xs=16 大、比 sm=20 略大；同 HOME_SCREEN_TOKENS.AMOUNT_COL_RECURRING_FRAME)
  RECURRING_RADIUS:         RADIUS.sm,                                        // 4：對齊 impl PeriodPage.recurIconWrap / SearchScreen.recurIconWrap
  RECURRING_ICON_SIZE:      14,                                               // (literal: 配 22x22 chip 視覺平衡；同 HOME_SCREEN_TOKENS.AMOUNT_COL_RECURRING_ICON_SIZE)
};

Object.assign(window, { SEARCH_SCREEN_TOKENS });
