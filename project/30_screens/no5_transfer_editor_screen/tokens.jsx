// ─────────────────────────────────────────────────────────────
// TRANSFER_EDITOR_SCREEN_TOKENS · TransferEditorScreen 內部 composition 參數
//
// Modal screen，含 EditorDateContainer / DualAmountRow / DualPickerRow /
// EditorNoteField / EditorDeleteButton + CalculatorKeypad（absolute bottom）。
// 大部分 form helper 從 30_screens/shared/no2_editor_form_helpers.jsx 共用。
// 消費 atomic + 20_components/（AmountField / StaticWheelPicker / AccountSelector）。
// ─────────────────────────────────────────────────────────────

const TRANSFER_EDITOR_SCREEN_TOKENS = {
  // ── 各 section 通用間距（與 TX_EDITOR_SCREEN_TOKENS.SECTION_GAP 對齊）
  SECTION_GAP:                     SPACING.xl,

  // ── DualAmountRow（from amount + arrow + to amount）
  AMOUNT_ARROW_FRAME_WIDTH:        ICON_SIZE.xl,                              // 40：arrow column 寬
  AMOUNT_ARROW_TOP_PADDING:        SPACING.xl,                                // 24：對齊 impl arrowColumn.paddingTop = SPACING.xl

  // ── DualPickerRow（from picker + arrow + to picker）
  PICKER_ROW_GAP:                  SPACING.lg,
  PICKER_ARROW_TOP_OFFSET:         SPACING['2xl'],                            // 32：對齊 impl pickerSpacer.paddingTop = SPACING['2xl']

  // ── Keypad area
  KEYPAD_BOTTOM_PADDING:           SPACING.xl,

  // ── Scroll spacer
  SCROLL_SPACER_HEIGHT:            400,                                       // (literal: 與 TX_EDITOR_SCREEN_TOKENS.SCROLL_SPACER_HEIGHT 對齊)
};

Object.assign(window, { TRANSFER_EDITOR_SCREEN_TOKENS });
