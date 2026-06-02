// ─────────────────────────────────────────────────────────────
// MERGE_EDITOR_SCREEN_TOKENS · MergeEditorScreen 內部 composition 參數
//
// Modal save form。三段：Visualization row（source → target）+ Warning banner
// + 橫向 dual picker box（MergePickerBox）。impl src/screens/Merge/MergeEditorScreen.tsx 結構鏡射。
// picker box 內用 StaticWheelPicker（noBorder），與 TransferEditor pickerGroupBox 同組 atomic 組合。
// ─────────────────────────────────────────────────────────────

const MERGE_EDITOR_SCREEN_TOKENS = {
  SCREEN_PADDING:                SPACING.lg,
  VISUAL_PADDING_VERTICAL:       SPACING.xl,
  VISUAL_BOTTOM_MARGIN:          SPACING.lg,
  VISUAL_ITEM_WIDTH:             100,                 // (literal: 視覺化單側固定寬，icon + 名稱置中，離開 SPACING 階梯的版面校準)
  VISUAL_TEXT_TOP_MARGIN:        SPACING.sm,
  VISUAL_TEXT_FONT_SIZE:         TYPOGRAPHY.size.sm,
  PLACEHOLDER_ICON_SIZE:         ICON_SIZE.lg,        // 32（引 atomic ICON_SIZE，原 literal 收斂）
  PLACEHOLDER_ICON_RADIUS:       RADIUS.xl,
  WARNING_PADDING:               SPACING.md,
  WARNING_RADIUS:                RADIUS.md,
  WARNING_BOTTOM_MARGIN:         SPACING.xl,
  WARNING_FONT_SIZE:             TYPOGRAPHY.size.sm,
  WARNING_LINE_HEIGHT:           20,                  // (literal: warning 多行行高，離開 SPACING 階梯的視覺校準)
  // 橫向 dual picker box（MergePickerBox），與 TransferEditor pickerGroupBox 同組 atomic 組合
  PICKER_BOX_RADIUS:             RADIUS.md,
  PICKER_BOX_BORDER_WIDTH:       1,                   // (literal: hairline，對齊 impl pickerGroupBox borderWidth 1)
  PICKER_BOX_PADDING_HORIZONTAL: SPACING.md,
  PICKER_BOX_ARROW_GAP:          SPACING.sm,
};

Object.assign(window, { MERGE_EDITOR_SCREEN_TOKENS });
