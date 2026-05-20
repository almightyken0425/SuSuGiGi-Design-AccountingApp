// ─────────────────────────────────────────────────────────────
// Foundations > Component Tokens > Form Picker · FORM_PICKER_TOKENS visualizer
//
// 內容：TokenTableCard + FormPickerAnatomyCard（解剖對比 ListItem）。
// ─────────────────────────────────────────────────────────────

const FORM_PICKER_TOKEN_DESC = {
  ROW_MIN_HEIGHT:         'form picker 高度，對齊 ListItem 視覺節奏',
  ROW_PADDING_VERTICAL:   'form input 內距，比 ListItem 緊（input 視覺）',
  ROW_PADDING_HORIZONTAL: '左右邊距，與 LIST 對齊行末',
  ICON_SIZE:              '圓形 chip icon 尺寸（比 ListItem 大）',
  ICON_RADIUS:            'icon chip 圓角（圓形）',
  ICON_GAP_HORIZONTAL:    'icon → text 的水平 gap',
  VALUE_SIZE:             '主值字級（HIG body）',
  VALUE_WEIGHT:           '主值字重（medium，比 ListItem 重）',
  SUBTEXT_SIZE:           '副文字字級',
  SUBTEXT_MARGIN_TOP:     '主值下副文字補位',
  PICKER_PANEL_RADIUS:    'inline picker 展開時的圓角',
};

const FORM_PICKER_TOKEN_SOURCE = {
  ROW_MIN_HEIGHT:         'ROW_HEIGHT.base',
  ROW_PADDING_VERTICAL:   'SPACING.md',
  ROW_PADDING_HORIZONTAL: 'SPACING.lg',
  ICON_SIZE:              'ICON_SIZE.lg',
  ICON_RADIUS:            'RADIUS.xl',
  ICON_GAP_HORIZONTAL:    'SPACING.md',
  VALUE_SIZE:             'TYPE_STYLES.body.size',
  VALUE_WEIGHT:           'TYPOGRAPHY.weight.medium',
  SUBTEXT_SIZE:           'TYPOGRAPHY.size.sm',
  SUBTEXT_MARGIN_TOP:     "SPACING['2xs']",
  PICKER_PANEL_RADIUS:    'RADIUS.md',
};

function FormPickerAnatomyCard() {
  const ROW_W = 360;
  const LIST_PAD = LIST_TOKENS.ITEM_PADDING_HORIZONTAL;
  const LIST_ICN = LIST_TOKENS.ICON_SIZE_SMALL;
  const LIST_GAP = LIST_TOKENS.ITEM_GAP_HORIZONTAL;
  const FP_PAD_H = FORM_PICKER_TOKENS.ROW_PADDING_HORIZONTAL;
  const FP_PAD_V = FORM_PICKER_TOKENS.ROW_PADDING_VERTICAL;
  const FP_ICN = FORM_PICKER_TOKENS.ICON_SIZE;
  const FP_GAP = FORM_PICKER_TOKENS.ICON_GAP_HORIZONTAL;

  return (
    <FoundCard>
      <FoundLabel>Form Picker vs ListItem · 為什麼不該共用同一份 token</FoundLabel>
      <div style={{ fontSize: 11, color: TOKENS.ink3, marginBottom: 16, lineHeight: 1.5 }}>
        ListItem 用於 grouped list（已有外殼），icon 20、padding 17；
        Form Picker（AccountSelector/CategorySelector）為單一觸發器，icon 32 圓形 chip、有自身外框、padding 12。
        兩者結構差異大，分開仲裁。
      </div>

      <SectionMini>ListItem · ICON_SIZE.sm = {LIST_ICN} / PAD_V = {LIST_TOKENS.ITEM_PADDING_VERTICAL}</SectionMini>
      <div style={{
        width: ROW_W, height: LIST_TOKENS.ITEM_MIN_HEIGHT, margin: '0 auto 18px',
        background: TOKENS.surface,
        border: `1px solid ${TOKENS.hairline}`,
        display: 'flex', alignItems: 'center',
        paddingLeft: LIST_PAD, paddingRight: LIST_PAD,
        boxSizing: 'border-box',
      }}>
        <div style={{ width: LIST_ICN, height: LIST_ICN, borderRadius: LIST_ICN/2, background: TOKENS.p100, display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: LIST_GAP, flexShrink: 0 }}>
          <Glyph name="bank-outline" size={LIST_ICN - 4} color={TOKENS.p500} stroke={1.8}/>
        </div>
        <div style={{ flex: 1, fontSize: LIST_TOKENS.ITEM_TITLE_SIZE, color: TOKENS.ink, fontWeight: LIST_TOKENS.ITEM_TITLE_WEIGHT }}>銀行帳戶</div>
        <code style={{ fontSize: LIST_TOKENS.TRAILING_CHEVRON_SIZE, color: TOKENS.ink3 }}>›</code>
      </div>

      <SectionMini>Form Picker · ICON_SIZE.lg = {FP_ICN} / PAD_V = {FP_PAD_V} / 有外框</SectionMini>
      <div style={{
        width: ROW_W, minHeight: FORM_PICKER_TOKENS.ROW_MIN_HEIGHT, margin: '0 auto',
        background: TOKENS.surface,
        borderRadius: RADIUS.md,
        border: `1px solid ${TOKENS.border}`,
        display: 'flex', alignItems: 'center',
        paddingTop: FP_PAD_V, paddingBottom: FP_PAD_V,
        paddingLeft: FP_PAD_H, paddingRight: FP_PAD_H,
        boxSizing: 'border-box',
      }}>
        <div style={{ width: FP_ICN, height: FP_ICN, borderRadius: FORM_PICKER_TOKENS.ICON_RADIUS, background: TOKENS.p100, display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: FP_GAP, flexShrink: 0 }}>
          <Glyph name="bank-outline" size={FP_ICN - 12} color={TOKENS.p500} stroke={1.8}/>
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: FORM_PICKER_TOKENS.VALUE_SIZE, color: TOKENS.ink, fontWeight: FORM_PICKER_TOKENS.VALUE_WEIGHT }}>主要支票帳戶</div>
          <div style={{ fontSize: FORM_PICKER_TOKENS.SUBTEXT_SIZE, color: TOKENS.ink2, marginTop: FORM_PICKER_TOKENS.SUBTEXT_MARGIN_TOP }}>TWD · 餘額 NT$45,200</div>
        </div>
      </div>

      <div style={{ marginTop: 18, padding: 12, background: TOKENS.surface2, borderRadius: RADIUS.md, fontSize: 11, color: TOKENS.ink2, lineHeight: 1.6 }}>
        <div style={{ marginBottom: 6 }}>· icon 大小：list 用 ICON_SIZE.sm({LIST_ICN})，picker 用 ICON_SIZE.lg({FP_ICN})——picker 為獨立觸發器，需要更強的視覺重量。</div>
        <div style={{ marginBottom: 6 }}>· padding：list 用 body size({LIST_TOKENS.ITEM_PADDING_VERTICAL})，picker 用 SPACING.md({FP_PAD_V})——picker 為 form input 視覺。</div>
        <div>· 外框：list 自身無外框（靠 ListGroupCard 群組外殼），picker 自帶 border（單獨觸發器需自證為 form 元素）。</div>
      </div>
    </FoundCard>
  );
}

function FoundationsCTFormPickerSection() {
  return (
    <DCSection
      id="found-ct-form-picker"
      title="Component Tokens · Form Picker"
      subtitle="form 觸發器（AccountSelector / CategorySelector）。視覺與 ListItem 不同：icon 32px 圓形 chip、有外框、padding 12。"
    >
      <DCFamily id="form-picker-tokens-family" title="Tokens" subtitle="FORM_PICKER_TOKENS 完整表格。">
        <DCArtboard id="form-picker-tokens" label="FORM_PICKER_TOKENS 表格" width="auto" height="auto">
          <TokenTableCard tokens={FORM_PICKER_TOKENS} title="FORM_PICKER_TOKENS" descriptions={FORM_PICKER_TOKEN_DESC} sources={FORM_PICKER_TOKEN_SOURCE}/>
        </DCArtboard>
      </DCFamily>
      <DCFamily id="form-picker-anatomy-family" title="Anatomy" subtitle="解剖：對比 ListItem 看為什麼不該共用 token。">
        <DCArtboard id="form-picker-anatomy" label="Form Picker 解剖 · 對比 ListItem" width={520} height={520}>
          <FormPickerAnatomyCard/>
        </DCArtboard>
      </DCFamily>
    </DCSection>
  );
}

Object.assign(window, {
  FORM_PICKER_TOKEN_DESC, FORM_PICKER_TOKEN_SOURCE,
  FormPickerAnatomyCard, FoundationsCTFormPickerSection,
});
