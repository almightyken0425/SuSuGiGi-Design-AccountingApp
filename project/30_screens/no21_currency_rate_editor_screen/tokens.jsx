// ─────────────────────────────────────────────────────────────
// CURRENCY_RATE_EDITOR_SCREEN_TOKENS · CurrencyRateEditorScreen 內部 composition 參數
//
// Modal save form。兩 surface card 區塊：
//   1. Currency Pair（From / To；To 鎖定為 base currency）
//   2. Amount Inputs（1 X = N Y）
// 另含幣別選擇 modal（pageSheet：自繪 header + 搜尋列 + B-1 清單）。
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
  MODAL_HEADER_PADDING:     SPACING.lg,           // 幣別選擇 modal header
  MODAL_HEADER_PADDING_TOP: 60,                   // 清開 device frame status bar（同 ModalHeader 慣例）
  MODAL_CLOSE_SIZE:         41,                   // impl modalCloseButton 41×41 圓形
  MODAL_TITLE_FONT_SIZE:    TYPOGRAPHY.size.lg,
  MODAL_SEARCH_PADDING:     SPACING.md,           // 搜尋列內距
  MODAL_SEARCH_MARGIN_H:    SPACING.lg,
  MODAL_SEARCH_MARGIN_TOP:  SPACING.md,
  MODAL_SEARCH_RADIUS:      RADIUS.md,
  MODAL_SEARCH_GAP:         SPACING.sm,           // magnify 與輸入文字之間
  MODAL_SEARCH_FONT_SIZE:   TYPOGRAPHY.size.base,
  MODAL_LIST_PADDING:       SPACING.lg,           // 清單外圍
};

Object.assign(window, { CURRENCY_RATE_EDITOR_SCREEN_TOKENS });
