// ─────────────────────────────────────────────────────────────
// Foundations > Component Tokens > Editor Name Field · EDITOR_NAME_FIELD_TOKENS visualizer
// ─────────────────────────────────────────────────────────────

const EDITOR_NAME_FIELD_TOKEN_DESC = {
  HEIGHT:      '名稱欄固定高度',
  PADDING:     '左右 padding',
  RADIUS:      '卡片圓角',
  FONT_SIZE:   '名稱字級',
  FONT_WEIGHT: '名稱字重',
};

const EDITOR_NAME_FIELD_TOKEN_SOURCE = {
  HEIGHT:      '80 (literal: 視覺校準)',
  PADDING:     'SPACING.md',
  RADIUS:      'RADIUS.md',
  FONT_SIZE:   "TYPOGRAPHY.size['2xl']",
  FONT_WEIGHT: 'TYPOGRAPHY.weight.medium',
};

function FoundationsCTEditorNameFieldSection() {
  return (
    <DCSection
      id="found-ct-editor-name-field"
      title="Component Tokens · Editor Name Field"
      subtitle="編輯器大字置中名稱欄（AccountEditor / CategoryEditor 共用），無框 surface card。"
    >
      <DCFamily id="editor-name-field-tokens-family" title="Tokens" subtitle="EDITOR_NAME_FIELD_TOKENS 完整表格。">
        <DCArtboard id="editor-name-field-tokens" label="EDITOR_NAME_FIELD_TOKENS 表格" width="auto" height="auto">
          <TokenTableCard tokens={EDITOR_NAME_FIELD_TOKENS} title="EDITOR_NAME_FIELD_TOKENS" descriptions={EDITOR_NAME_FIELD_TOKEN_DESC} sources={EDITOR_NAME_FIELD_TOKEN_SOURCE}/>
        </DCArtboard>
      </DCFamily>
    </DCSection>
  );
}

Object.assign(window, {
  EDITOR_NAME_FIELD_TOKEN_DESC, EDITOR_NAME_FIELD_TOKEN_SOURCE, FoundationsCTEditorNameFieldSection,
});
