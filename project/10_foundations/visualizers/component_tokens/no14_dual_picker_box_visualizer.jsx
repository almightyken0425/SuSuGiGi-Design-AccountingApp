// ─────────────────────────────────────────────────────────────
// Foundations > Component Tokens > Dual Picker Box · DUAL_PICKER_BOX_TOKENS visualizer
// ─────────────────────────────────────────────────────────────

const DUAL_PICKER_BOX_TOKEN_DESC = {
  RADIUS:             '外框圓角',
  BORDER_WIDTH:       '外框邊框（conflict 時 borderColor 轉 TOKENS.error）',
  PADDING_HORIZONTAL: '外框左右內距（picker 欄與外框的間距）',
  ARROW_GAP:          '中間 → 箭頭欄左右間距',
};

const DUAL_PICKER_BOX_TOKEN_SOURCE = {
  RADIUS:             'RADIUS.md',
  BORDER_WIDTH:       '1 (literal: hairline，對齊 impl borderWidth 1)',
  PADDING_HORIZONTAL: 'SPACING.md',
  ARROW_GAP:          'SPACING.sm',
};

function FoundationsCTDualPickerBoxSection() {
  return (
    <DCSection
      id="found-ct-dual-picker-box"
      title="Component Tokens · Dual Picker Box"
      subtitle="包左右兩個 noBorder static picker + 中間 → 箭頭的橫向外框，對應 impl src/components/DualPickerBox.tsx。MergeEditor 與 TransferEditor 跨畫面共用。"
    >
      <DCFamily id="dual-picker-box-tokens-family" title="Tokens" subtitle="DUAL_PICKER_BOX_TOKENS 完整表格。">
        <DCArtboard id="dual-picker-box-tokens" label="DUAL_PICKER_BOX_TOKENS 表格" width="auto" height="auto">
          <TokenTableCard tokens={DUAL_PICKER_BOX_TOKENS} title="DUAL_PICKER_BOX_TOKENS" descriptions={DUAL_PICKER_BOX_TOKEN_DESC} sources={DUAL_PICKER_BOX_TOKEN_SOURCE}/>
        </DCArtboard>
      </DCFamily>
    </DCSection>
  );
}

Object.assign(window, {
  DUAL_PICKER_BOX_TOKEN_DESC, DUAL_PICKER_BOX_TOKEN_SOURCE, FoundationsCTDualPickerBoxSection,
});
