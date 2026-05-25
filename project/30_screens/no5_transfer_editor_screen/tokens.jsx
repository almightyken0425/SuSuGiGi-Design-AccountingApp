// ─────────────────────────────────────────────────────────────
// TRANSFER_EDITOR_SCREEN_TOKENS · TransferEditorScreen 內部 composition 參數
//
// Modal screen，含 EditorDateContainer / AmountGroupBox / PickerGroupBox /
// EditorNoteField / EditorDeleteButton + CalculatorKeypad（absolute bottom）。
// 大部分 form helper 從 30_screens/shared/no2_editor_form_helpers.jsx 共用。
// 消費 atomic + 20_components/（AmountField / StaticWheelPicker / AccountSelector）。
//
// box 視覺（surface + solid grey border + md radius）直接使用 atomic SPACING / RADIUS / TOKENS，
// 不另設 token；group box 與 V0 內元素 box 樣式一致。
// ExchangeArrow 內 padding / arrow icon size 由 atomic SPACING / ICON_SIZE 表達，無 screen-level token。
// ─────────────────────────────────────────────────────────────

const TRANSFER_EDITOR_SCREEN_TOKENS = {
  // ── 各 section 通用間距（與 TRANSACTION_EDITOR_SCREEN_TOKENS.SECTION_GAP 對齊）
  SECTION_GAP:                     SPACING.xl,

  // ── Keypad area
  KEYPAD_BOTTOM_PADDING:           SPACING.xl,

  // ── Scroll spacer
  SCROLL_SPACER_HEIGHT:            400,                                       // (literal: 與 TRANSACTION_EDITOR_SCREEN_TOKENS.SCROLL_SPACER_HEIGHT 對齊)
};

Object.assign(window, { TRANSFER_EDITOR_SCREEN_TOKENS });
