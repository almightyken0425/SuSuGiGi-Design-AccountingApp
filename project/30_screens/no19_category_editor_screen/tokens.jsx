// ─────────────────────────────────────────────────────────────
// CATEGORY_EDITOR_SCREEN_TOKENS · CategoryEditorScreen 內部 composition 參數
//
// Modal save form。表單欄位：名稱 / 標準分類映射 / 圖示。
// type 由 navigation params 決定，不在 form 內呈現。
// impl src/screens/Categories/CategoryEditorScreen.tsx 結構鏡射。
// ─────────────────────────────────────────────────────────────

const CATEGORY_EDITOR_SCREEN_TOKENS = {
  SCREEN_PADDING:      SPACING.lg,
  FIELD_GAP:           SPACING.xl,
  HELPER_FONT_SIZE:    TYPE_STYLES.caption1.size,
  HELPER_TOP_MARGIN:   SPACING['2xs'] + 2,        // (literal: caption 與 picker 之間呼吸距，4px)
};

Object.assign(window, { CATEGORY_EDITOR_SCREEN_TOKENS });
