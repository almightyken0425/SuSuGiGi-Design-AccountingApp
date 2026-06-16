// ─────────────────────────────────────────────────────────────
// CATEGORY_EDITOR_SCREEN_TOKENS · CategoryEditorScreen 內部 composition 參數
//
// Modal save form。Form Structure V2 採用後：類型欄走 searchable dropdown，
// 不再使用雙按鈕橫排的 segmented control（原 CategoryTypeSelector 已移除）。
// 表單欄位：名稱 / 收支 / 圖示。
// 編輯模式類型欄走 disabled 樣式，避免破壞已有交易紀錄一致性。
// impl src/screens/Categories/CategoryEditorScreen.tsx 結構鏡射。
// ─────────────────────────────────────────────────────────────

const CATEGORY_EDITOR_SCREEN_TOKENS = {
  SCREEN_PADDING:      SPACING.lg,
  FIELD_GAP:           SPACING.xl,
};

Object.assign(window, { CATEGORY_EDITOR_SCREEN_TOKENS });
