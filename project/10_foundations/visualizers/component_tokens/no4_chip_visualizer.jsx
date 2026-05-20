// ─────────────────────────────────────────────────────────────
// Foundations > Component Tokens > Chip · CHIP_TOKENS visualizer
// ─────────────────────────────────────────────────────────────

const CHIP_TOKEN_DESC = {
  PADDING_VERTICAL:      'chip 上下 padding',
  PADDING_HORIZONTAL:    'chip 左右 padding',
  RADIUS:                'pill 圓角（半圓）',
  GAP_HORIZONTAL:        'chip 之間水平 gap',
  GAP_VERTICAL:          'chip 換行時垂直 gap',
  TEXT_SIZE:             'chip 字級',
  TEXT_WEIGHT_SELECTED:  '選中態字重',
  BORDER_WIDTH:          'chip 描邊（未選態）',
};

const CHIP_TOKEN_SOURCE = {
  PADDING_VERTICAL:      'SPACING.sm',
  PADDING_HORIZONTAL:    'SPACING.md',
  RADIUS:                'RADIUS.xl',
  GAP_HORIZONTAL:        'SPACING.sm',
  GAP_VERTICAL:          'SPACING.sm',
  TEXT_SIZE:             'TYPOGRAPHY.size.sm',
  TEXT_WEIGHT_SELECTED:  'TYPOGRAPHY.weight.medium',
  BORDER_WIDTH:          'StyleSheet.hairlineWidth',
};

function FoundationsCTChipSection() {
  return (
    <DCSection
      id="found-ct-chip"
      title="Component Tokens · Chip"
      subtitle="pill 形多選器（RecurringOptions 的 optionButton 等）。高度 ≈ 30pt 小於 HIT_TARGET.min(44)，屬輔助選擇器。"
    >
      <DCFamily id="chip-tokens-family" title="Tokens" subtitle="CHIP_TOKENS 完整表格。">
        <DCArtboard id="chip-tokens" label="CHIP_TOKENS 表格" width="auto" height="auto">
          <TokenTableCard tokens={CHIP_TOKENS} title="CHIP_TOKENS" descriptions={CHIP_TOKEN_DESC} sources={CHIP_TOKEN_SOURCE}/>
        </DCArtboard>
      </DCFamily>
    </DCSection>
  );
}

Object.assign(window, {
  CHIP_TOKEN_DESC, CHIP_TOKEN_SOURCE, FoundationsCTChipSection,
});
