// ─────────────────────────────────────────────────────────────
// Foundations > Component Tokens > Search Bar · SEARCH_BAR_TOKENS visualizer
// ─────────────────────────────────────────────────────────────

const SEARCH_BAR_TOKEN_DESC = {
  PILL_HEIGHT:               'pill 高度（= HIT_TARGET.min）',
  PADDING_HORIZONTAL:        'bar 容器左右 padding',
  PADDING_VERTICAL:          'bar 容器上下 padding',
  PILL_PADDING_HORIZONTAL:   'pill 內水平 padding',
  ICON_GAP:                  'pill 內 icon ↔ text gap',
  ICON_SIZE:                 'pill 內 icon 大小（ICON_SIZE.sm）',
  INPUT_FONT_SIZE:           '輸入框字級（body 對齊）',
};

const SEARCH_BAR_TOKEN_SOURCE = {
  PILL_HEIGHT:               'HIT_TARGET.min',
  PADDING_HORIZONTAL:        'SPACING.lg',
  PADDING_VERTICAL:          'SPACING.md',
  PILL_PADDING_HORIZONTAL:   'SPACING.md',
  ICON_GAP:                  'SPACING.sm',
  ICON_SIZE:                 'ICON_SIZE.sm',
  INPUT_FONT_SIZE:           'TYPOGRAPHY.size.base',
};

function FoundationsCTSearchBarSection() {
  return (
    <DCSection
      id="found-ct-search-bar"
      title="Component Tokens · Search Bar"
      subtitle="BottomSearchBar pill 形搜尋列。pill 高度 = HIT_TARGET.min；附帶衍生值 BOTTOM_SEARCH_BAR_TOTAL_HEIGHT。"
      direction="column"
    >
      <DCArtboard id="search-bar-tokens" label="SEARCH_BAR_TOKENS 表格" width="auto" height="auto">
        <TokenTableCard tokens={SEARCH_BAR_TOKENS} title="SEARCH_BAR_TOKENS" descriptions={SEARCH_BAR_TOKEN_DESC} sources={SEARCH_BAR_TOKEN_SOURCE}/>
      </DCArtboard>
      <DCArtboard id="search-bar-total-height" label="BOTTOM_SEARCH_BAR_TOTAL_HEIGHT · 衍生值" width={520} height={140}>
        <FoundCard>
          <FoundLabel>BOTTOM_SEARCH_BAR_TOTAL_HEIGHT</FoundLabel>
          <div style={{ fontSize: 12, color: TOKENS.ink2, lineHeight: 1.6 }}>
            <code>BOTTOM_SEARCH_BAR_TOTAL_HEIGHT = SEARCH_BAR_TOKENS.PILL_HEIGHT + SEARCH_BAR_TOKENS.PADDING_VERTICAL * 2</code>
            <div style={{ marginTop: 8 }}>= {SEARCH_BAR_TOKENS.PILL_HEIGHT} + {SEARCH_BAR_TOKENS.PADDING_VERTICAL} × 2 = <code style={{ fontVariantNumeric: 'tabular-nums' }}>{BOTTOM_SEARCH_BAR_TOTAL_HEIGHT}</code></div>
          </div>
        </FoundCard>
      </DCArtboard>
    </DCSection>
  );
}

Object.assign(window, {
  SEARCH_BAR_TOKEN_DESC, SEARCH_BAR_TOKEN_SOURCE, FoundationsCTSearchBarSection,
});
