// ─────────────────────────────────────────────────────────────
// Foundations > Component Tokens > Confirm Dialog · CONFIRM_DIALOG_TOKENS visualizer
// ─────────────────────────────────────────────────────────────

const CONFIRM_DIALOG_TOKEN_DESC = {
  BACKDROP_BG:          '半透明黑遮罩底色',
  CARD_OUTER_PADDING:   'backdrop 內側對 card 的留白',
  CARD_WIDTH:           '圓角白卡寬度（iOS Alert 預設 270pt）',
  CARD_RADIUS:          '圓角白卡圓角',
  CARD_BODY_PADDING:    '卡片內 title + message 區的 padding',
  TITLE_SIZE:           '標題字級',
  TITLE_WEIGHT:         '標題字重',
  TITLE_BOTTOM_MARGIN:  '標題與訊息間距',
  MESSAGE_SIZE:         '訊息字級',
  MESSAGE_LINE_HEIGHT:  '訊息行距',
  BUTTON_PADDING:       '單顆按鈕的 padding',
  BUTTON_TEXT_SIZE:     '按鈕文字字級',
};

const CONFIRM_DIALOG_TOKEN_SOURCE = {
  BACKDROP_BG:          'rgba(0,0,0,0.4) (literal: iOS Alert backdrop)',
  CARD_OUTER_PADDING:   'SPACING.xl',
  CARD_WIDTH:           '270 (literal: iOS Alert 預設)',
  CARD_RADIUS:          'RADIUS.lg',
  CARD_BODY_PADDING:    'SPACING.lg',
  TITLE_SIZE:           'TYPOGRAPHY.size.base',
  TITLE_WEIGHT:         'TYPOGRAPHY.weight.semibold',
  TITLE_BOTTOM_MARGIN:  'SPACING.sm',
  MESSAGE_SIZE:         'TYPOGRAPHY.size.sm',
  MESSAGE_LINE_HEIGHT:  '1.4 (literal)',
  BUTTON_PADDING:       'SPACING.md',
  BUTTON_TEXT_SIZE:     'TYPOGRAPHY.size.base',
};

function FoundationsCTConfirmDialogSection() {
  return (
    <DCSection
      id="found-ct-confirm-dialog"
      title="Component Tokens · Confirm Dialog"
      subtitle="iOS native Alert 風格的對話框 token，對齊 impl React Native `Alert.alert(title, message, [{ text, style, onPress }, ...])` 呼叫（例：src/screens/Transactions/showRecurringModeDialog.ts）。按鈕排版：≤2 水平、3+ 垂直。"
    >
      <DCFamily id="confirm-dialog-tokens-family" title="Tokens" subtitle="CONFIRM_DIALOG_TOKENS 完整表格。">
        <DCArtboard id="confirm-dialog-tokens" label="CONFIRM_DIALOG_TOKENS 表格" width="auto" height="auto">
          <TokenTableCard tokens={CONFIRM_DIALOG_TOKENS} title="CONFIRM_DIALOG_TOKENS" descriptions={CONFIRM_DIALOG_TOKEN_DESC} sources={CONFIRM_DIALOG_TOKEN_SOURCE}/>
        </DCArtboard>
      </DCFamily>
    </DCSection>
  );
}

Object.assign(window, {
  CONFIRM_DIALOG_TOKEN_DESC, CONFIRM_DIALOG_TOKEN_SOURCE, FoundationsCTConfirmDialogSection,
});
