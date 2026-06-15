// ─────────────────────────────────────────────────────────────
// Foundations > Component Tokens > List · LIST_TOKENS visualizer
//
// 內容：TokenTableCard（含 LIST_TOKEN_DESC / LIST_TOKEN_SOURCE）+ ListAnatomyCard。
// ─────────────────────────────────────────────────────────────

const LIST_TOKEN_DESC = {
  ITEM_MIN_HEIGHT:               'row 最小高度（≥ HIT_TARGET.min=44）',
  ITEM_PADDING_VERTICAL:         'row 上下 padding，引 body font size 維持垂直節奏',
  ITEM_PADDING_HORIZONTAL:       'row 左右邊距，有/無 icon 皆從此值起算',
  ITEM_GAP_HORIZONTAL:           'icon ↔ text、text ↔ trailing 之間的水平 gap',
  ITEM_TITLE_SIZE:               'row 主標題字級（HIG body）',
  ITEM_TITLE_WEIGHT:             'row 主標題字重（light 為安靜文字）',
  ITEM_TITLE_LETTER_SPACING:     'row 主標題字間距（比照 body）',
  ICON_SIZE_SMALL:               'row 標準 leftIcon 尺寸',
  ICON_SIZE_MEDIUM:              '較大型 inline icon（少用）',
  ICON_SIZE_LARGE:               '強調區或 hero icon',
  DIVIDER_INSET_WITH_ICON:       '有 icon 群組的 divider inset（避開 icon 欄）',
  DIVIDER_INSET_WITHOUT_ICON:    '無 icon 群組的 divider inset（齊行末 padding）',
  GROUP_CARD_RADIUS:             'group card 外殼圓角',
  GROUP_CARD_MARGIN_BOTTOM:      'group card 之間呼吸距（刻意離開 SPACING 階梯）',
  GROUP_CARD_BORDER_WIDTH:       'group card 外殼描邊',
  SECTION_TITLE_SIZE:            'section 標題字級（HIG footnote）',
  SECTION_TITLE_WEIGHT:          'section 標題字重',
  SECTION_TITLE_LETTER_SPACING:  'section 標題字間距（小字級補回可讀性）',
  SECTION_TITLE_PADDING_TOP:     'section 標題上方留白',
  SECTION_TITLE_PADDING_BOTTOM:  'section 標題到首列之間的留白',
  SECTION_TITLE_PADDING_HORIZONTAL: 'section 標題左右邊距，齊 row',
  SELECTION_ITEM_RADIUS:         'SelectionGridItem 卡片圓角',
  SELECTION_ITEM_MARGIN_BOTTOM:  'SelectionListItem 卡片下 margin',
  SELECTION_CHECKMARK_SIZE:      '選擇態 checkmark icon 大小',
  TRAILING_CHEVRON_SIZE:         '右側 chevron 字級',
  TRAILING_CHEVRON_WEIGHT:       '右側 chevron 字重',
  TRAILING_VALUE_SIZE:           '右側 value 字級（與 title 對齊）',
  GRID_COLUMNS:                  'SelectionGridItem 預設欄數',
  GRID_GAP:                      'SelectionGridItem 卡片之間 gap',
  EMPTY_STATE_ICON_SIZE:         '空狀態 icon 大小',
  EMPTY_STATE_TITLE_SIZE:        '空狀態主標字級',
  EMPTY_STATE_DESCRIPTION_SIZE:  '空狀態描述字級',
  EMPTY_STATE_ICON_GAP:          '空狀態 icon → 主標的垂直 gap',
  EMPTY_STATE_TEXT_GAP:          '空狀態主標 → 描述的垂直 gap',
  EMPTY_STATE_PADDING_HORIZONTAL: '空狀態左右邊距',
};

const LIST_TOKEN_SOURCE = {
  ITEM_MIN_HEIGHT:                  'ROW_HEIGHT.base',
  ITEM_PADDING_VERTICAL:            'TYPE_STYLES.body.size',
  ITEM_PADDING_HORIZONTAL:          'SPACING.lg',
  ITEM_GAP_HORIZONTAL:              'SPACING.md',
  ITEM_TITLE_SIZE:                  'TYPE_STYLES.body.size',
  ITEM_TITLE_WEIGHT:                'TYPOGRAPHY.weight.light',
  ITEM_TITLE_LETTER_SPACING:        'TYPE_STYLES.body.letterSpacing',
  ICON_SIZE_SMALL:                  'ICON_SIZE.sm',
  ICON_SIZE_MEDIUM:                 'ICON_SIZE.md',
  ICON_SIZE_LARGE:                  'ICON_SIZE.xl',
  DIVIDER_INSET_WITH_ICON:          'SPACING.lg + ICON_SIZE.sm + SPACING.md',
  DIVIDER_INSET_WITHOUT_ICON:       'SPACING.lg',
  GROUP_CARD_RADIUS:                'RADIUS.lg',
  GROUP_CARD_MARGIN_BOTTOM:         '(literal: 35, 離開 SPACING 階梯)',
  GROUP_CARD_BORDER_WIDTH:          'StyleSheet.hairlineWidth',
  SECTION_TITLE_SIZE:               'TYPE_STYLES.footnote.size',
  SECTION_TITLE_WEIGHT:             'TYPOGRAPHY.weight.regular',
  SECTION_TITLE_LETTER_SPACING:     '(literal)',
  SECTION_TITLE_PADDING_TOP:        'SPACING.md',
  SECTION_TITLE_PADDING_BOTTOM:     "SPACING.xs + SPACING['2xs']",
  SECTION_TITLE_PADDING_HORIZONTAL: 'SPACING.lg',
  SELECTION_ITEM_RADIUS:            'RADIUS.md',
  SELECTION_ITEM_MARGIN_BOTTOM:     'SPACING.sm',
  SELECTION_CHECKMARK_SIZE:         'ICON_SIZE.xs',
  TRAILING_CHEVRON_SIZE:            'TYPE_STYLES.footnote.size',
  TRAILING_CHEVRON_WEIGHT:          '(literal: SF Symbols semibold enum)',
  TRAILING_VALUE_SIZE:              'TYPE_STYLES.body.size',
  GRID_COLUMNS:                     '(literal)',
  GRID_GAP:                         'SPACING.md',
  EMPTY_STATE_ICON_SIZE:            "ICON_SIZE['2xl']",
  EMPTY_STATE_TITLE_SIZE:           'TYPE_STYLES.body.size',
  EMPTY_STATE_DESCRIPTION_SIZE:     'TYPOGRAPHY.size.sm',
  EMPTY_STATE_ICON_GAP:             'SPACING.md',
  EMPTY_STATE_TEXT_GAP:             'SPACING.sm',
  EMPTY_STATE_PADDING_HORIZONTAL:   'SPACING.xl',
};

function ListAnatomyCard() {
  const PAD = LIST_TOKENS.ITEM_PADDING_HORIZONTAL;
  const GAP = LIST_TOKENS.ITEM_GAP_HORIZONTAL;
  const ICN = LIST_TOKENS.ICON_SIZE_SMALL;
  const ROW_W = 380;                                       // 卡內 row 視覺寬度
  const titleW = ROW_W - PAD - ICN - GAP - 80 - GAP - 13 - PAD;
  const titleWNoIcon = ROW_W - PAD - 80 - GAP - 13 - PAD;
  const dividerInsetWith = LIST_TOKENS.DIVIDER_INSET_WITH_ICON;
  const dividerInsetNo   = LIST_TOKENS.DIVIDER_INSET_WITHOUT_ICON;

  const rowBg = TOKENS.surface;
  const titleColor = TOKENS.ink;
  const padShade = 'rgba(124, 92, 255, 0.10)';
  const gapShade = 'rgba(124, 92, 255, 0.22)';
  const iconShade = 'rgba(60, 60, 67, 0.08)';
  const textShade = 'rgba(60, 60, 67, 0.04)';

  const segsWith = [
    { width: PAD, label: `H-PAD\n${PAD}`,             color: padShade },
    { width: ICN, label: `ICON.sm\n${ICN}`,           color: iconShade },
    { width: GAP, label: `GAP\n${GAP}`,               color: gapShade },
    { width: titleW, label: 'TITLE',                   color: textShade },
    { width: GAP, label: `GAP\n${GAP}`,               color: gapShade },
    { width: 80,  label: 'VALUE',                      color: textShade },
    { width: GAP, label: `GAP\n${GAP}`,               color: gapShade },
    { width: 13,  label: 'CHV',                        color: iconShade },
    { width: PAD, label: `H-PAD\n${PAD}`,             color: padShade },
  ];
  const segsNoIcon = [
    { width: PAD, label: `H-PAD\n${PAD}`,             color: padShade },
    { width: titleWNoIcon, label: 'TITLE (從 16 起算)', color: textShade },
    { width: GAP, label: `GAP\n${GAP}`,               color: gapShade },
    { width: 13,  label: 'CHV',                        color: iconShade },
    { width: PAD, label: `H-PAD\n${PAD}`,             color: padShade },
  ];

  return (
    <FoundCard>
      <FoundLabel>ListItem 解剖 · LIST_TOKENS 在 row 上的位置</FoundLabel>
      <div style={{ fontSize: 11, color: TOKENS.ink3, marginBottom: 12, lineHeight: 1.5 }}>
        每段間距以 token 引用鏈標示：例如 H-PAD = <code>ITEM_PADDING_HORIZONTAL = SPACING.lg = {PAD}</code>。
        ICON 寬 = <code>ICON_SIZE_SMALL = ICON_SIZE.sm = {ICN}</code>。
        GAP = <code>ITEM_GAP_HORIZONTAL = SPACING.md = {GAP}</code>。
      </div>

      <SectionMini>有 leftIcon</SectionMini>
      <div style={{ width: ROW_W, margin: '0 auto' }}>
        <AnatomyRuler segments={segsWith}/>
        <div style={{
          width: ROW_W, height: LIST_TOKENS.ITEM_MIN_HEIGHT,
          background: rowBg,
          border: `1px solid ${TOKENS.hairline}`,
          display: 'flex', alignItems: 'center',
          paddingLeft: PAD, paddingRight: PAD,
          boxSizing: 'border-box',
        }}>
          <div style={{ width: ICN, height: ICN, borderRadius: ICN/2, background: TOKENS.p100, display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: GAP, flexShrink: 0 }}>
            <Glyph name="tag-outline" size={ICN - 4} color={TOKENS.p500} stroke={1.8}/>
          </div>
          <div style={{ flex: 1, fontSize: LIST_TOKENS.ITEM_TITLE_SIZE, color: titleColor, fontWeight: LIST_TOKENS.ITEM_TITLE_WEIGHT }}>title 標題</div>
          <div style={{ fontSize: LIST_TOKENS.TRAILING_VALUE_SIZE, color: TOKENS.ink2, marginRight: GAP, fontVariantNumeric: 'tabular-nums' }}>NT$1,200</div>
          <code style={{ fontSize: LIST_TOKENS.TRAILING_CHEVRON_SIZE, color: TOKENS.ink3 }}>›</code>
        </div>
        <div style={{ fontSize: 9.5, color: TOKENS.ink3, marginTop: 4, textAlign: 'center', lineHeight: 1.5 }}>
          ITEM_MIN_HEIGHT = {LIST_TOKENS.ITEM_MIN_HEIGHT} ≥ HIT_TARGET.min = {HIT_TARGET.min} · ITEM_PADDING_VERTICAL = TYPE_STYLES.body.size = {LIST_TOKENS.ITEM_PADDING_VERTICAL}
        </div>
      </div>

      <SectionMini style={{ marginTop: 20 }}>無 leftIcon — text 仍從 16 起算（不對齊有 icon 的 48）</SectionMini>
      <div style={{ width: ROW_W, margin: '0 auto' }}>
        <AnatomyRuler segments={segsNoIcon}/>
        <div style={{
          width: ROW_W, height: LIST_TOKENS.ITEM_MIN_HEIGHT,
          background: rowBg,
          border: `1px solid ${TOKENS.hairline}`,
          display: 'flex', alignItems: 'center',
          paddingLeft: PAD, paddingRight: PAD,
          boxSizing: 'border-box',
        }}>
          <div style={{ flex: 1, fontSize: LIST_TOKENS.ITEM_TITLE_SIZE, color: titleColor, fontWeight: LIST_TOKENS.ITEM_TITLE_WEIGHT }}>無 icon · title 從 16 開始</div>
          <code style={{ fontSize: LIST_TOKENS.TRAILING_CHEVRON_SIZE, color: TOKENS.ink3 }}>›</code>
        </div>
      </div>

      <SectionMini style={{ marginTop: 20 }}>Divider inset · 兩種規則（live <code style={{ fontSize: 'inherit' }}>&lt;ListSeparator&gt;</code>）</SectionMini>
      <div style={{ width: ROW_W, margin: '0 auto' }}>
        {[
          { label: '有 icon 群組', inset: dividerInsetWith, expr: 'SPACING.lg + ICON_SIZE.sm + SPACING.md', name: 'DIVIDER_INSET_WITH_ICON' },
          { label: '無 icon 群組', inset: dividerInsetNo,   expr: 'SPACING.lg',                              name: 'DIVIDER_INSET_WITHOUT_ICON' },
        ].map(({ label, inset, expr, name }, i) => (
          <div key={name} style={{ marginBottom: i === 0 ? 16 : 0 }}>
            {/* row above */}
            <div style={{ height: 8, background: TOKENS.surface2 }}/>
            {/* the actual ListSeparator — divider colour 與 height 由元件決定 */}
            <ListSeparator insetLeft={inset}/>
            {/* row below */}
            <div style={{ height: 8, background: TOKENS.surface2 }}/>
            <div style={{ fontSize: 9.5, color: TOKENS.ink3, marginTop: 8, lineHeight: 1.5 }}>
              <strong>{label}</strong>：<code>{name} = {expr} = {inset}</code>
            </div>
          </div>
        ))}
      </div>

      <div style={{ marginTop: 20, padding: 12, background: TOKENS.surface2, borderRadius: RADIUS.md, fontSize: 11, color: TOKENS.ink2, lineHeight: 1.6 }}>
        <div style={{ marginBottom: 6 }}>· 有 icon vs 無 icon 的 row text baseline <strong>不對齊</strong>；需要對齊請統一帶/不帶 icon。</div>
        <div style={{ marginBottom: 6 }}>· Divider 對齊 row：有 icon 群組 inset {dividerInsetWith}（避開 icon 欄）、無 icon 群組 inset {dividerInsetNo}（齊行末 padding）。</div>
        <div style={{ marginBottom: 6 }}>· <code>GROUP_CARD_MARGIN_BOTTOM = {LIST_TOKENS.GROUP_CARD_MARGIN_BOTTOM}</code> 為刻意離開 SPACING 階梯的孤兒值（section 間呼吸距）。</div>
        <div>· Divider 顏色由 <code>TOKENS.divider.hairline</code> 仲裁（不在 LIST_TOKENS）— 上方 live render 即此 token 的實際渲染。</div>
      </div>
    </FoundCard>
  );
}

function FoundationsCTListSection() {
  return (
    <DCSection
      id="found-ct-list"
      title="Component Tokens · List"
      subtitle="grouped list / ListItem / SelectionGridItem 元件的內部參數。引用 atomic 層 ROW_HEIGHT / SPACING / TYPE_STYLES / ICON_SIZE / RADIUS / TYPOGRAPHY。"
    >
      <DCFamily id="list-tokens-family" title="Tokens" subtitle="LIST_TOKENS 完整表格與引用鏈。">
        <DCArtboard id="list-tokens" label="LIST_TOKENS 表格" width="auto" height="auto">
          <TokenTableCard tokens={LIST_TOKENS} title="LIST_TOKENS" descriptions={LIST_TOKEN_DESC} sources={LIST_TOKEN_SOURCE}/>
        </DCArtboard>
      </DCFamily>
      <DCFamily id="list-anatomy-family" title="Anatomy" subtitle="ListItem 結構解剖：有 icon / 無 icon row、divider inset 兩種規則。">
        <DCArtboard id="list-anatomy" label="ListItem 解剖 · 間距政策視覺化" width={520} height={780}>
          <ListAnatomyCard/>
        </DCArtboard>
      </DCFamily>
    </DCSection>
  );
}

Object.assign(window, {
  LIST_TOKEN_DESC, LIST_TOKEN_SOURCE,
  ListAnatomyCard, FoundationsCTListSection,
});
