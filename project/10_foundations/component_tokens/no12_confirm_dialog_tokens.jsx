// ─────────────────────────────────────────────────────────────
// CONFIRM_DIALOG_TOKENS · iOS native Alert 視覺
//
// 對齊 impl 透過 React Native `Alert.alert(title, message, [{ text, style, onPress }, ...])`
// 呼叫的對話框（例：src/screens/Transactions/showRecurringModeDialog.ts）。
// iOS native Alert 視覺：半透明黑 backdrop + 圓角白卡 + title/message + 分隔線 + 按鈕。
// 按鈕排版：≤2 按鈕水平並排、3+ 按鈕垂直堆疊。
// ─────────────────────────────────────────────────────────────

const CONFIRM_DIALOG_TOKENS = {
  // ── Backdrop（半透明黑遮罩）
  BACKDROP_BG:                  'rgba(0,0,0,0.4)',                              // (literal: iOS Alert backdrop 慣例 40% 黑)
  CARD_OUTER_PADDING:           SPACING.xl,

  // ── Card（圓角白卡）
  CARD_WIDTH:                   270,                                            // (literal: iOS Alert 預設寬度 270pt)
  CARD_RADIUS:                  RADIUS.lg,
  CARD_BODY_PADDING:            SPACING.lg,

  // ── Title（粗體置中）
  TITLE_SIZE:                   TYPOGRAPHY.size.base,
  TITLE_WEIGHT:                 TYPOGRAPHY.weight.semibold,
  TITLE_BOTTOM_MARGIN:          SPACING.sm,

  // ── Message（regular 置中）
  MESSAGE_SIZE:                 TYPOGRAPHY.size.sm,
  MESSAGE_LINE_HEIGHT:          1.4,                                            // (literal: iOS Alert message 行距，落在 sm 字級的舒適閱讀區間)

  // ── Button row
  BUTTON_PADDING:               SPACING.md,
  BUTTON_TEXT_SIZE:             TYPOGRAPHY.size.base,
};

Object.assign(window, { CONFIRM_DIALOG_TOKENS });
