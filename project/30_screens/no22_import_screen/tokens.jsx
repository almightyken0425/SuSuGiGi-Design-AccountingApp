// ─────────────────────────────────────────────────────────────
// IMPORT_SCREEN_TOKENS · ImportScreen 內部 composition 參數
//
// Modal wizard，4 個 step（1:選擇檔案 / 2:欄位對應 / 3:內容比對 / 4:預覽）。
// header 全 icon 導航（左 關閉/返回、右 前進/送出），無置底列。
// step 2 / 3 採 editor 欄位元件（EditorFieldLabel + EditorPickerCollapsed），
// step 4 採資料列（DataListItem）。impl src/screens/Settings/ImportScreen.tsx 結構鏡射。
// ─────────────────────────────────────────────────────────────

const IMPORT_SCREEN_TOKENS = {
  SCREEN_PADDING:           SPACING.lg,
  SECTION_GAP:              SPACING.xl,
  FIELD_GAP:                SPACING.lg,
  CARD_RADIUS:              RADIUS.lg,
  CARD_PADDING:             SPACING.lg,
  SECTION_TITLE_FONT_SIZE:  TYPOGRAPHY.size.lg,
  SECTION_TITLE_WEIGHT:     TYPOGRAPHY.weight.medium,
  DESCRIPTION_FONT_SIZE:    TYPOGRAPHY.size.sm,
};

Object.assign(window, { IMPORT_SCREEN_TOKENS });
