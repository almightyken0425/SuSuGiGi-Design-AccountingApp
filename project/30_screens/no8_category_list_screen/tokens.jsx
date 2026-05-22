// ─────────────────────────────────────────────────────────────
// CATEGORY_LIST_SCREEN_TOKENS · CategoryListScreen 內部 composition 參數
//
// Push screen，依 type（expense / income）分兩個 section，
// 每個 section 含一個列表 ListGroupCard + 一個「新增」ListGroupCard。
// impl src/screens/Categories/CategoryListScreen.tsx 結構鏡射。
//
// 消費 atomic（SPACING）+ component_tokens（LIST_TOKENS）。
// ─────────────────────────────────────────────────────────────

const CATEGORY_LIST_SCREEN_TOKENS = {
  // ── Screen container
  SCREEN_PADDING_TOP:        SPACING.md,    // impl: headerInset + SPACING.md
  SCREEN_PADDING_HORIZONTAL: SPACING.lg,
  SCREEN_PADDING_BOTTOM:     SPACING['5xl'], // FAB / bottom safe area 預留

  // ── Reorder row（同 AccountList 規則，回歸 atomic ROW_HEIGHT.base）
  REORDER_ROW_HEIGHT:        LIST_TOKENS.ITEM_MIN_HEIGHT,
};

Object.assign(window, { CATEGORY_LIST_SCREEN_TOKENS });
