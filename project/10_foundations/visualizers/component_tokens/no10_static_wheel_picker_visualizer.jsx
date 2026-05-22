// ─────────────────────────────────────────────────────────────
// Foundations > Component Tokens > Static Wheel Picker · STATIC_WHEEL_PICKER_TOKENS visualizer
// ─────────────────────────────────────────────────────────────

const STATIC_WHEEL_PICKER_TOKEN_DESC = {
  HEIGHT:                'picker 固定高度（對齊 impl staticPickerContainer 110）',
  PADDING:               'picker 內 padding',
  RADIUS:                'picker 圓角',
  BORDER_WIDTH:          'picker 邊框',
  LABEL_SIZE:            'wheel 全行字級（中央 highlighted 與上下 dim 鄰近選項共用）',
  LABEL_WEIGHT:          '中央 highlighted 字重（上下 dim 行不加 weight）',
  LABEL_VERTICAL_MARGIN: 'highlighted label 上下與 dim 行間距',
  DIM_OPACITY:           '上下 dim 鄰近選項透明度（模擬 iOS Picker wheel 自動視覺淡化）',
};

const STATIC_WHEEL_PICKER_TOKEN_SOURCE = {
  HEIGHT:                '110 (literal: 對齊 impl staticPickerContainer style.height)',
  PADDING:               'SPACING.sm',
  RADIUS:                'RADIUS.md',
  BORDER_WIDTH:          '1 (literal: hairlineWidth)',
  LABEL_SIZE:            'TYPOGRAPHY.size.lg',
  LABEL_WEIGHT:          'TYPOGRAPHY.weight.medium',
  LABEL_VERTICAL_MARGIN: 'SPACING.xs',
  DIM_OPACITY:           '0.4 (literal)',
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
