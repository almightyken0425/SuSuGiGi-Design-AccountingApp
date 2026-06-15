// ─────────────────────────────────────────────────────────────
// Foundations > Component Tokens > Amount Field · AMOUNT_FIELD_TOKENS visualizer
// ─────────────────────────────────────────────────────────────

const AMOUNT_FIELD_TOKEN_DESC = {
  PADDING:                'container 內 padding',
  RADIUS:                 'container 圓角',
  BORDER_WIDTH:           'container 邊框（active=1、disabled=0）',
  HEIGHT:                 'container 固定高度',
  DISABLED_OPACITY:       'disabled 整體透明度',
  AMOUNT_SIZE:            '主金額字級',
  AMOUNT_WEIGHT:          '主金額字重',
  CURRENCY_SIZE:          '貨幣縮寫字級',
  CURRENCY_MARGIN_TOP:    'currency 與 amount 垂直間距',
  BACKSPACE_ICON_SIZE:    '右側 backspace icon 大小',
  BACKSPACE_ICON_STROKE:  'backspace icon stroke 寬度（design canvas only）',
};

const AMOUNT_FIELD_TOKEN_SOURCE = {
  PADDING:                'SPACING.md',
  RADIUS:                 'RADIUS.md',
  BORDER_WIDTH:           '1 (literal: hairlineWidth)',
  HEIGHT:                 '80 (literal: 視覺校準)',
  DISABLED_OPACITY:       '0.7 (literal)',
  AMOUNT_SIZE:            'TYPOGRAPHY.size[\'2xl\']',
  AMOUNT_WEIGHT:          'TYPOGRAPHY.weight.medium',
  CURRENCY_SIZE:          'TYPOGRAPHY.size.xs',
  CURRENCY_MARGIN_TOP:    'SPACING.xs',
  BACKSPACE_ICON_SIZE:    'ICON_SIZE.md',
  BACKSPACE_ICON_STROKE:  '1.6 (literal)',
};

function FoundationsCTAmountFieldSection() {
  return (
    <DCSection
      id="found-ct-amount-field"
      title="Component Tokens · Amount Field"
      subtitle="金額輸入欄（TransferEditor 雙欄、TransactionEditor 單欄）。active / disabled 三態切換視覺。"
    >
      <DCFamily id="amount-field-tokens-family" title="Tokens" subtitle="AMOUNT_FIELD_TOKENS 完整表格。">
        <DCArtboard id="amount-field-tokens" label="AMOUNT_FIELD_TOKENS 表格" width="auto" height="auto">
          <TokenTableCard tokens={AMOUNT_FIELD_TOKENS} title="AMOUNT_FIELD_TOKENS" descriptions={AMOUNT_FIELD_TOKEN_DESC} sources={AMOUNT_FIELD_TOKEN_SOURCE}/>
        </DCArtboard>
      </DCFamily>
    </DCSection>
  );
}

Object.assign(window, {
  AMOUNT_FIELD_TOKEN_DESC, AMOUNT_FIELD_TOKEN_SOURCE, FoundationsCTAmountFieldSection,
});
