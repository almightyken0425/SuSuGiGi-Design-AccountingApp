// ─────────────────────────────────────────────────────────────
// CURRENCY_RATE_EDITOR_SCREEN_TOKENS · CurrencyRateEditorScreen 內部 composition 參數
//
// Modal save form。兩 surface card 區塊：
//   1. Currency Pair（From / To；To 鎖定為 base currency）
//   2. Amount Inputs（1 X = N Y）
// impl src/screens/Settings/CurrencyRateEditorScreen.tsx 結構鏡射。
// ─────────────────────────────────────────────────────────────

const CURRENCY_RATE_EDITOR_SCREEN_TOKENS = {
  SCREEN_PADDING:           SPACING.lg,
  CARD_GAP:                 SPACING.md,           // section card 之間
  CARD_RADIUS:              RADIUS.lg,
  CARD_PADDING:             SPACING.lg,
  LABEL_FONT_SIZE:          TYPOGRAPHY.size.sm,
  LABEL_BOTTOM_MARGIN:      SPACING.sm,
  PAIR_GAP:                 SPACING.lg,           // From / To 之間
  PAIR_BUTTON_PADDING:      SPACING.md,
  PAIR_BUTTON_RADIUS:       RADIUS.md,
  PAIR_BUTTON_FONT_SIZE:    TYPOGRAPHY.size.lg,
  AMOUNT_ROW_GAP:           SPACING.sm,           // amount columns + equals
  AMOUNT_INPUT_PADDING_H:   SPACING.md,
  AMOUNT_INPUT_RADIUS:      RADIUS.md,
  AMOUNT_INPUT_FONT_SIZE:   TYPOGRAPHY.size.lg,
  AMOUNT_INPUT_PADDING_V:   SPACING.md,
  EQUALS_FONT_SIZE:         TYPOGRAPHY.size.xl,
};

Object.assign(window, { CURRENCY_RATE_EDITOR_SCREEN_TOKENS });
