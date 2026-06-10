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

  // ── 來源時區 wheel（5 行靜態 mock；非通用 StaticWheelPicker，行數／字級／漸層皆異，不共用其 token）
  TZ_WHEEL_HEIGHT:          180,                  // (literal: 5 行 × TZ_WHEEL_ROW_HEIGHT 的容器固定高)
  TZ_WHEEL_ROW_HEIGHT:      36,                   // (literal: 每行高＝時區文字行距)
  TZ_WHEEL_SELECTED_TOP:    72,                   // (literal: 中央高亮列上緣＝2 行 × TZ_WHEEL_ROW_HEIGHT)
  TZ_WHEEL_OPACITY_NEAR:    0.55,                 // (literal: 選中行上下鄰行淡化)
  TZ_WHEEL_OPACITY_FAR:     0.3,                  // (literal: 再外一層更淡，模擬 wheel 透視)
};

Object.assign(window, { IMPORT_SCREEN_TOKENS });
