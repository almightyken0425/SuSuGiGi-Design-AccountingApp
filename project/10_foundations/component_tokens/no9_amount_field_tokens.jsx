// ─────────────────────────────────────────────────────────────
// AMOUNT_FIELD_TOKENS · 金額輸入欄（TransferEditor 雙欄、TransactionEditor 單欄）
//
// 對齊 impl src/screens/Transactions/TransferEditorScreen.tsx 內 amountContainer 樣式。
// active 時 p500 文字色加深，無 border / 背景切換；disabled 時整體 opacity 0.7。
// ─────────────────────────────────────────────────────────────

const AMOUNT_FIELD_TOKENS = {
  PADDING:                   SPACING.md,
  RADIUS:                    RADIUS.md,
  BORDER_WIDTH:              1,                                                // (literal: StyleSheet.hairlineWidth canvas 為 React Web 無法 resolve)
  HEIGHT:                    80,                                               // (literal: form input row 比 ROW_HEIGHT.base 58 更高，留金額易讀空間)
  DISABLED_OPACITY:          0.7,                                              // (literal: disabled 視覺校準)
  AMOUNT_SIZE:               TYPOGRAPHY.size['2xl'],
  AMOUNT_WEIGHT:             TYPOGRAPHY.weight.medium,
  CURRENCY_SIZE:             TYPOGRAPHY.size.xs,
  CURRENCY_MARGIN_TOP:       SPACING.xs,
  BACKSPACE_ICON_SIZE:       ICON_SIZE.md,
  BACKSPACE_ICON_STROKE:     1.6,                                              // (literal: stroke 視覺校準，react-native-vector-icons MaterialCommunityIcons 無 stroke 概念，僅 design canvas)
};

Object.assign(window, { AMOUNT_FIELD_TOKENS });
