// ─────────────────────────────────────────────────────────────
// DUAL_PICKER_BOX_TOKENS · 橫向 dual picker box 外框
//
// 對齊 impl src/components/DualPickerBox.tsx（theme.ts DUAL_PICKER_BOX_TOKENS）。
// 包左右兩個 noBorder static picker + 中間 → 箭頭的橫向外框，
// MergeEditor（來源 → 目標）與 TransferEditor（from → to 帳戶）跨畫面共用。
// conflict 狀態外框轉 error 色（無獨立 token，色值走 TOKENS.error）。
// ─────────────────────────────────────────────────────────────

const DUAL_PICKER_BOX_TOKENS = {
  RADIUS:             RADIUS.md,
  BORDER_WIDTH:       1,                                                       // (literal: hairline，對齊 impl borderWidth 1)
  PADDING_HORIZONTAL: SPACING.md,
  ARROW_GAP:          SPACING.sm,
};

Object.assign(window, { DUAL_PICKER_BOX_TOKENS });
