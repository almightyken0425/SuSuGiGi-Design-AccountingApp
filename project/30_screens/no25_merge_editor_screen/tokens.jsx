// ─────────────────────────────────────────────────────────────
// MERGE_EDITOR_SCREEN_TOKENS · MergeEditorScreen 內部 composition 參數
//
// Modal save form。兩段：Visualization row（source → target）
// + 橫向 dual picker box（DualPickerBox，20_components 共用）。
// impl src/screens/Merge/MergeEditorScreen.tsx 結構鏡射。
// picker box 外框 token 由 DUAL_PICKER_BOX_TOKENS（no14）承載，本檔不再重複；
// Visualization row 鏡射其欄位幾何時直接引 DUAL_PICKER_BOX_TOKENS。
// ─────────────────────────────────────────────────────────────

const MERGE_EDITOR_SCREEN_TOKENS = {
  SCREEN_PADDING:                SPACING.lg,
  VISUAL_PADDING_VERTICAL:       SPACING.xl,
  VISUAL_BOTTOM_MARGIN:          SPACING.lg,
  PLACEHOLDER_ICON_SIZE:         ICON_SIZE.lg,        // 32（引 atomic ICON_SIZE，原 literal 收斂）
  PLACEHOLDER_ICON_RADIUS:       RADIUS.xl,
};

Object.assign(window, { MERGE_EDITOR_SCREEN_TOKENS });
