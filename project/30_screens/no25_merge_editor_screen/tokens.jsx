// ─────────────────────────────────────────────────────────────
// MERGE_EDITOR_SCREEN_TOKENS · MergeEditorScreen 內部 composition 參數
//
// Modal save form。兩段：Visualization row（source → target）
// + 橫向 dual picker box（MergePickerBox）。impl src/screens/Merge/MergeEditorScreen.tsx 結構鏡射。
// picker box 內用 StaticWheelPicker（noBorder），與 TransferEditor pickerGroupBox 同組 atomic 組合。
// ─────────────────────────────────────────────────────────────

const MERGE_EDITOR_SCREEN_TOKENS = {
  SCREEN_PADDING:                SPACING.lg,
  VISUAL_PADDING_VERTICAL:       SPACING.xl,
  VISUAL_BOTTOM_MARGIN:          SPACING.lg,
  PLACEHOLDER_ICON_SIZE:         ICON_SIZE.lg,        // 32（引 atomic ICON_SIZE，原 literal 收斂）
  PLACEHOLDER_ICON_RADIUS:       RADIUS.xl,
  // 橫向 dual picker box（MergePickerBox），與 TransferEditor pickerGroupBox 同組 atomic 組合
  PICKER_BOX_RADIUS:             RADIUS.md,
  PICKER_BOX_BORDER_WIDTH:       1,                   // (literal: hairline，對齊 impl pickerGroupBox borderWidth 1)
  PICKER_BOX_PADDING_HORIZONTAL: SPACING.md,
  PICKER_BOX_ARROW_GAP:          SPACING.sm,
};

Object.assign(window, { MERGE_EDITOR_SCREEN_TOKENS });
