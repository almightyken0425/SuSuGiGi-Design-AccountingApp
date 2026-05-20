// ─────────────────────────────────────────────────────────────
// Foundations > Component Tokens > Header Icon Button · HEADER_ICON_BUTTON_TOKENS visualizer
// ─────────────────────────────────────────────────────────────

const HEADER_ICON_BUTTON_TOKEN_DESC = {
  CONTENT_BOX:    'customView 正方形邊長（symbol + 上下左右 padding；Liquid Glass hug 後自動成正圓 pill）',
  SYMBOL_SIZE:    'SF Symbol point size，對齊 iOS bar button 慣用 body 級',
  MULTI_ICON_GAP: '多 icon 共用 customView 時 icon 之間的水平 gap',
};

const HEADER_ICON_BUTTON_TOKEN_SOURCE = {
  CONTENT_BOX:    'TYPE_STYLES.body.size + SPACING.md * 2',
  SYMBOL_SIZE:    'TYPE_STYLES.body.size',
  MULTI_ICON_GAP: 'SPACING.sm',
};

function FoundationsCTHeaderIconButtonSection() {
  return (
    <DCSection
      id="found-ct-header-icon-button"
      title="Component Tokens · Header Icon Button"
      subtitle="Navigation header 上 icon-only 動作鍵。對齊 iOS 26 Liquid Glass bar button item 自動 pill 行為。"
      direction="column"
    >
      <DCArtboard id="header-icon-button-tokens" label="HEADER_ICON_BUTTON_TOKENS · Navigation header icon-only 鍵" width="auto" height="auto">
        <TokenTableCard tokens={HEADER_ICON_BUTTON_TOKENS} title="HEADER_ICON_BUTTON_TOKENS" descriptions={HEADER_ICON_BUTTON_TOKEN_DESC} sources={HEADER_ICON_BUTTON_TOKEN_SOURCE}/>
      </DCArtboard>
    </DCSection>
  );
}

Object.assign(window, {
  HEADER_ICON_BUTTON_TOKEN_DESC, HEADER_ICON_BUTTON_TOKEN_SOURCE,
  FoundationsCTHeaderIconButtonSection,
});
