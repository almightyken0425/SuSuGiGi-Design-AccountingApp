// ─────────────────────────────────────────────────────────────
// CATEGORY_EDITOR_SCREEN_TOKENS · CategoryEditorScreen 內部 composition 參數
//
// Modal save form。表單欄位：類型 / 名稱 / 標準分類映射 / 圖示。
// type 由 form 內 CategoryTypeSelector 兩按鈕橫排決定；
// 編輯模式 type selector disabled，避免破壞已有交易紀錄一致性。
// impl src/screens/Categories/CategoryEditorScreen.tsx 結構鏡射。
// ─────────────────────────────────────────────────────────────

const CATEGORY_EDITOR_SCREEN_TOKENS = {
  SCREEN_PADDING:      SPACING.lg,
  FIELD_GAP:           SPACING.xl,
  HELPER_FONT_SIZE:    TYPE_STYLES.caption1.size,
  HELPER_TOP_MARGIN:   SPACING['2xs'] + 2,        // (literal: caption 與 picker 之間呼吸距，4px)
  TYPE_SELECTOR: {
    HEIGHT:                  52,                  // (literal: 對齊 EditorPickerCollapsed collapsed 視覺高度)
    GAP:                     SPACING.sm,
    BORDER_WIDTH_DEFAULT:    1,
    BORDER_WIDTH_SELECTED:   2,
    RADIUS:                  RADIUS.md,
    PADDING_HORIZONTAL:      SPACING.md,
    DISABLED_OPACITY:        0.5,
  },
};

Object.assign(window, { CATEGORY_EDITOR_SCREEN_TOKENS });
