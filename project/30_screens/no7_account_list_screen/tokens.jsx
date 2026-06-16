// ─────────────────────────────────────────────────────────────
// ACCOUNT_LIST_SCREEN_TOKENS · AccountListScreen 內部 composition 參數
//
// Push screen，列出所有帳戶；新增入口走 header 右側按鈕。
// impl src/screens/Accounts/AccountListScreen.tsx 採 ScrollView + 單張 ListGroupCard：
//   帳戶列表（AutoDragSortableView 拖拉排序），「新增帳戶」入口為 header right 按鈕、非列表 row。
// design canvas 對齊單段 ListGroupCard 結構，但拖拉互動為視覺示意（無實際手勢）。
//
// 消費 atomic（SPACING）+ component_tokens（LIST_TOKENS.ITEM_MIN_HEIGHT）。
// ─────────────────────────────────────────────────────────────

const ACCOUNT_LIST_SCREEN_TOKENS = {
  // ── Screen container
  SCREEN_PADDING_TOP:        SPACING.lg,    // impl: headerInset + SPACING.lg，design canvas 無 inset 概念
  SCREEN_PADDING_HORIZONTAL: SPACING.lg,
  SCREEN_PADDING_BOTTOM:     SPACING['5xl'], // FAB / bottom safe area 預留

  // ── Reorder row
  // impl 端 ITEM_HEIGHT = 60 為拖拉計算固定值，design canvas 不拖拉，回歸 atomic ROW_HEIGHT.base = 58
  REORDER_ROW_HEIGHT:        LIST_TOKENS.ITEM_MIN_HEIGHT,
};

Object.assign(window, { ACCOUNT_LIST_SCREEN_TOKENS });
