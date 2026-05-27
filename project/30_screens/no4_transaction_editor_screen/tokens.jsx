// ─────────────────────────────────────────────────────────────
// TRANSACTION_EDITOR_SCREEN_TOKENS · TransactionEditorScreen 內部 composition 參數
//
// Modal screen，含 ErrorBanner / DateContainer / AmountContainer / PickerRow /
// NoteField / DeleteButton + AnimatedKeypad（CalculatorKeypad absolute bottom）。
// 消費 atomic + FORM_PICKER_TOKENS（透過 AccountSelector / CategorySelector wrapper）。
// ─────────────────────────────────────────────────────────────

const TRANSACTION_EDITOR_SCREEN_TOKENS = {
  // ── 各 section 通用間距（mb）
  SECTION_GAP:                       SPACING.xl,

  // ── DateContainer（日期 pill + recurring toggle）
  DATE_PILL_RADIUS:                  RADIUS['2xl'],
  DATE_PILL_PADDING_VERTICAL:        SPACING.sm,
  DATE_PILL_PADDING_HORIZONTAL:      SPACING.lg,
  DATE_PILL_MARGIN_HORIZONTAL:       SPACING.lg,
  DATE_PILL_INNER_HEIGHT:            40,                                      // (literal: 對齊 impl TransactionEditorScreen.tsx 內 DateTimePicker style.height=40)
  RECURRING_TOGGLE_FRAME:            40,                                      // (literal: 40 圓形 toggle，比 HIT_TARGET.min=44 略小，對齊 impl recurringTrigger width/height)
  RECURRING_TOGGLE_RADIUS:           RADIUS['2xl'],                           // 20（= RECURRING_TOGGLE_FRAME / 2，對齊 impl borderRadius: RADIUS['2xl']）

  // ── AmountContainer（金額輸入欄）
  // 改採共用 AmountField（20_components/）+ outer grouping box 模式（鏡射 TransferEditor 的 AmountGroupBox）。
  // 視覺參數由 AMOUNT_FIELD_TOKENS 提供，box 樣式直接引用 atomic SPACING / RADIUS / TOKENS，
  // 不再 screen-level token 化。

  // ── PickerRow（account picker + category picker 並排）
  PICKER_ROW_GAP:                    SPACING.lg,

  // ── NoteField（備註輸入）
  NOTE_PADDING:                      SPACING.lg,

  // ── DeleteButton（isEdit=true 時）
  DELETE_BUTTON_PADDING:             SPACING.sm,
  DELETE_BUTTON_TOP_MARGIN:          SPACING.lg,

  // ── ErrorBanner（impl Alert 的 inline 視覺對應）
  ERROR_BANNER_PADDING:              SPACING.md,
  ERROR_BANNER_RADIUS:               RADIUS.md,
  ERROR_BANNER_BG_OPACITY:           '15',                                    // (literal: 8-bit hex alpha ~8%，將 TOKENS.error 染色透明化)
  ERROR_BANNER_BORDER_LEFT_WIDTH:    4,                                       // (literal: 視覺強調，無對應階梯)
  ERROR_BANNER_ICON_GAP:             SPACING.sm,
  ERROR_BANNER_BOTTOM_MARGIN:        SPACING.lg,
  ERROR_BANNER_TITLE_BOTTOM_MARGIN:  SPACING['2xs'],

  // ── Keypad area（absolute bottom，AnimatedKeypad 容器）
  KEYPAD_BOTTOM_PADDING:             SPACING.xl,

  // ── Scroll spacer（為 keypad 預留空間，避免內容被遮）
  // 對齊 impl ScrollView contentContainerStyle.paddingBottom 的 conditional：
  //   amountFocused === true → SCROLL_SPACER_HEIGHT (對齊 impl KEYPAD_HEIGHT)
  //   amountFocused === false → SCROLL_SPACER_HEIGHT_INACTIVE
  SCROLL_SPACER_HEIGHT:              400,                                     // (literal: 對齊 impl const KEYPAD_HEIGHT = 400)
  SCROLL_SPACER_HEIGHT_INACTIVE:     100,                                     // (literal: 對齊 impl else 分支 paddingBottom)
};

Object.assign(window, { TRANSACTION_EDITOR_SCREEN_TOKENS });
