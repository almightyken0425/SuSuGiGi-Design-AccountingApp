// ─────────────────────────────────────────────────────────────
// IMPORT_SCREEN_TOKENS · ImportScreen 內部 composition 參數
//
// Modal wizard，5 個 step（0:模板說明 / 1:檔案選擇 / 2:欄位對應 / 3:內容比對 / 4:預覽）。
// impl src/screens/Settings/ImportScreen.tsx 結構鏡射；底部固定 WizardStepContainer
// 提供 Back / Next 按鈕，design canvas 簡化為靜態示意（不做 wizard navigation 互動）。
// ─────────────────────────────────────────────────────────────

const IMPORT_SCREEN_TOKENS = {
  SCREEN_PADDING:           SPACING.lg,
  SECTION_GAP:              SPACING.xl,
  CARD_RADIUS:              RADIUS.lg,
  CARD_PADDING:             SPACING.lg,
  SECTION_TITLE_FONT_SIZE:  TYPOGRAPHY.size.lg,
  SECTION_TITLE_WEIGHT:     TYPOGRAPHY.weight.medium,
  DESCRIPTION_FONT_SIZE:    TYPOGRAPHY.size.sm,
  CHIP_RADIUS:              RADIUS.xl,
  CHIP_PADDING_H:           SPACING.sm,
  CHIP_PADDING_V:           SPACING.sm,
  CHIP_GAP:                 SPACING.sm,
  FOOTER_BAR_HEIGHT:        56,   // (literal: WizardStepContainer Next bar 高度，無 atomic 對應)
};

Object.assign(window, { IMPORT_SCREEN_TOKENS });
