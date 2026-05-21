// ─────────────────────────────────────────────────────────────
// Foundations > Component Tokens > Recurring Options · RECURRING_OPTIONS_TOKENS visualizer
// ─────────────────────────────────────────────────────────────

const RECURRING_OPTIONS_TOKEN_DESC = {
  CONTAINER_RADIUS:             'container 圓角',
  CONTAINER_PADDING:            'container 內 padding',
  CONTAINER_MARGIN_TOP:         'container 上方間距',
  CONTAINER_MARGIN_BOTTOM:      'container 下方間距',
  CONTAINER_BORDER_WIDTH:       'container 邊框',
  HEADER_BOTTOM_MARGIN:         'header row 下方間距',
  TITLE_SIZE:                   '「定期設定」標題字級',
  TITLE_WEIGHT:                 '標題字重',
  DISABLED_OPACITY:             'enabled=false 時內容區透明度',
  LABEL_SIZE:                   '段落 label（頻率 / 每隔 / 結束於）字級',
  LABEL_VERTICAL_MARGIN:        'label 上下間距',
  ROW_BOTTOM_MARGIN:            'row 下方間距',
  INTERVAL_INPUT_WIDTH:         '數字輸入欄寬',
  INTERVAL_INPUT_PADDING:       '數字輸入欄 padding',
  INTERVAL_INPUT_RADIUS:        '數字輸入欄圓角',
  INTERVAL_INPUT_BORDER_WIDTH:  '數字輸入欄邊框',
  INTERVAL_INPUT_SIZE:          '數字輸入欄字級',
  INTERVAL_INPUT_RIGHT_GAP:     '數字欄與 unit 文字間距',
  UNIT_TEXT_SIZE:               '「天 / 週 / 月 / 年」單位文字字級',
};

const RECURRING_OPTIONS_TOKEN_SOURCE = {
  CONTAINER_RADIUS:             'RADIUS.lg',
  CONTAINER_PADDING:            'SPACING.lg',
  CONTAINER_MARGIN_TOP:         'SPACING.sm',
  CONTAINER_MARGIN_BOTTOM:      'SPACING.lg',
  CONTAINER_BORDER_WIDTH:       '1 (literal: hairlineWidth)',
  HEADER_BOTTOM_MARGIN:         'SPACING.lg',
  TITLE_SIZE:                   'TYPOGRAPHY.size.base',
  TITLE_WEIGHT:                 'TYPOGRAPHY.weight.medium',
  DISABLED_OPACITY:             '0.5 (literal)',
  LABEL_SIZE:                   'TYPOGRAPHY.size.sm',
  LABEL_VERTICAL_MARGIN:        'SPACING.sm',
  ROW_BOTTOM_MARGIN:            'SPACING.sm',
  INTERVAL_INPUT_WIDTH:         '60 (literal)',
  INTERVAL_INPUT_PADDING:       'SPACING.sm',
  INTERVAL_INPUT_RADIUS:        'RADIUS.md',
  INTERVAL_INPUT_BORDER_WIDTH:  '1 (literal)',
  INTERVAL_INPUT_SIZE:          'TYPOGRAPHY.size.lg',
  INTERVAL_INPUT_RIGHT_GAP:     'SPACING.md',
  UNIT_TEXT_SIZE:               'TYPOGRAPHY.size.base',
};

function FoundationsCTRecurringOptionsSection() {
  return (
    <DCSection
      id="found-ct-recurring-options"
      title="Component Tokens · Recurring Options"
      subtitle="定期設定卡片（TxEditor / TransferEditor 用）。container + headerRow + 頻率/每隔/結束於三段。內部 chip 視覺由 CHIP_TOKENS 提供。"
    >
      <DCFamily id="recurring-options-tokens-family" title="Tokens" subtitle="RECURRING_OPTIONS_TOKENS 完整表格。">
        <DCArtboard id="recurring-options-tokens" label="RECURRING_OPTIONS_TOKENS 表格" width="auto" height="auto">
          <TokenTableCard tokens={RECURRING_OPTIONS_TOKENS} title="RECURRING_OPTIONS_TOKENS" descriptions={RECURRING_OPTIONS_TOKEN_DESC} sources={RECURRING_OPTIONS_TOKEN_SOURCE}/>
        </DCArtboard>
      </DCFamily>
    </DCSection>
  );
}

Object.assign(window, {
  RECURRING_OPTIONS_TOKEN_DESC, RECURRING_OPTIONS_TOKEN_SOURCE, FoundationsCTRecurringOptionsSection,
});
