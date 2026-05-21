// ─────────────────────────────────────────────────────────────
// Foundations > Component Tokens > Static Wheel Picker · STATIC_WHEEL_PICKER_TOKENS visualizer
// ─────────────────────────────────────────────────────────────

const STATIC_WHEEL_PICKER_TOKEN_DESC = {
  HEIGHT:                'picker 固定高度（模擬 wheel 5 行可見）',
  PADDING:               'picker 內 padding',
  RADIUS:                'picker 圓角',
  BORDER_WIDTH:          'picker 邊框',
  LABEL_SIZE:            '中央 label 字級',
  LABEL_WEIGHT:          '中央 label 字重',
  LABEL_VERTICAL_MARGIN: 'label 上下與 placeholder 行間距',
  PLACEHOLDER_SIZE:      '上下淡化選項字級',
  PLACEHOLDER_OPACITY:   '上下淡化選項透明度',
};

const STATIC_WHEEL_PICKER_TOKEN_SOURCE = {
  HEIGHT:                '110 (literal: 模擬 wheel × 5 行)',
  PADDING:               'SPACING.sm',
  RADIUS:                'RADIUS.md',
  BORDER_WIDTH:          '1 (literal: hairlineWidth)',
  LABEL_SIZE:            'TYPOGRAPHY.size.lg',
  LABEL_WEIGHT:          'TYPOGRAPHY.weight.medium',
  LABEL_VERTICAL_MARGIN: 'SPACING.xs',
  PLACEHOLDER_SIZE:      'TYPOGRAPHY.size.sm',
  PLACEHOLDER_OPACITY:   '0.6 (literal)',
};

function FoundationsCTStaticWheelPickerSection() {
  return (
    <DCSection
      id="found-ct-static-wheel-picker"
      title="Component Tokens · Static Wheel Picker"
      subtitle="design canvas 專用視覺 stub，對應 impl src/components/WheelPickerModal.tsx 的 native Picker。AccountSelector / CategorySelector 為其薄 wrapper。"
    >
      <DCFamily id="static-wheel-picker-tokens-family" title="Tokens" subtitle="STATIC_WHEEL_PICKER_TOKENS 完整表格。">
        <DCArtboard id="static-wheel-picker-tokens" label="STATIC_WHEEL_PICKER_TOKENS 表格" width="auto" height="auto">
          <TokenTableCard tokens={STATIC_WHEEL_PICKER_TOKENS} title="STATIC_WHEEL_PICKER_TOKENS" descriptions={STATIC_WHEEL_PICKER_TOKEN_DESC} sources={STATIC_WHEEL_PICKER_TOKEN_SOURCE}/>
        </DCArtboard>
      </DCFamily>
    </DCSection>
  );
}

Object.assign(window, {
  STATIC_WHEEL_PICKER_TOKEN_DESC, STATIC_WHEEL_PICKER_TOKEN_SOURCE, FoundationsCTStaticWheelPickerSection,
});
