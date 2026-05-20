// ─────────────────────────────────────────────────────────────
// Foundations > Atomic > Type · 字體系統視覺化
//
// 5 張卡片：TYPE_STYLES（11 HIG style）/ TYPOGRAPHY.size 階梯 / TYPOGRAPHY.weight /
// LINE_HEIGHT / LETTER_SPACING。所有卡片讀 no3_typography.jsx 的 token 即時繪製。
// ─────────────────────────────────────────────────────────────

function TypeStylesCard() {
  const order = ['largeTitle', 'title1', 'title2', 'title3', 'headline', 'body', 'callout', 'subheadline', 'footnote', 'caption1', 'caption2'];
  return (
    <FoundCard>
      <FoundLabel>TYPE_STYLES · HIG Dynamic Type</FoundLabel>
      <div style={{ fontSize: 11, color: TOKENS.ink3, marginBottom: 12 }}>
        每條：size · weight · lineHeight · letterSpacing。HIG headline 原為 semibold (600)，本標準不啟用 semibold，故以 medium (500) 代替。
      </div>
      {order.map(key => {
        const s = TYPE_STYLES[key];
        return (
          <div key={key} style={{ padding: '10px 0', borderTop: `1px solid ${TOKENS.hairline}` }}>
            <div style={{
              fontSize: s.size, fontWeight: s.weight, lineHeight: `${s.lineHeight}px`,
              letterSpacing: s.letterSpacing, color: TOKENS.ink,
            }}>{key} · 記帳 SuSuGiGi</div>
            <code style={{ fontSize: 10, color: TOKENS.ink3, fontVariantNumeric: 'tabular-nums', marginTop: 2, display: 'block' }}>
              {s.size}pt · w{s.weight} · lh {s.lineHeight} · tracking {s.letterSpacing}
            </code>
          </div>
        );
      })}
    </FoundCard>
  );
}

function TypeScaleCard() {
  const entries = Object.entries(TYPOGRAPHY.size);
  return (
    <FoundCard>
      <FoundLabel>TYPOGRAPHY.size · 底層數值階梯</FoundLabel>
      <div style={{ fontSize: 11, color: TOKENS.ink3, marginBottom: 12 }}>
        實際使用優先採 TYPE_STYLES；底層數值留給直接控制 size 的少數情境。
      </div>
      {entries.map(([k, v]) => (
        <div key={k} style={{ display: 'flex', alignItems: 'baseline', gap: 12, padding: '8px 0', borderTop: `1px solid ${TOKENS.hairline}` }}>
          <code style={{ fontSize: 11, color: TOKENS.ink3, width: 40 }}>{k}</code>
          <code style={{ fontSize: 11, color: TOKENS.ink3, width: 40, fontVariantNumeric: 'tabular-nums' }}>{v}px</code>
          <div style={{ flex: 1, fontSize: v, color: TOKENS.ink, fontWeight: 400 }}>記帳 SuSuGiGi {v}px</div>
        </div>
      ))}
    </FoundCard>
  );
}

function WeightsCard() {
  const enabledMeanings = {
    light:   '安靜文字（ListItem.title、value、note）',
    regular: 'body / 段落文字',
    medium:  'NavBar / modal title / button / amount / heading / CTA',
  };
  const reservedHint = '保留 — 未來若有重要焦點需要時開放';
  return (
    <FoundCard>
      <FoundLabel>TYPOGRAPHY.weight · HIG 9 階字重</FoundLabel>
      <div style={{ fontSize: 11, color: TOKENS.ink3, marginBottom: 8 }}>
        本標準啟用：<b style={{ color: TOKENS.ink }}>light · regular · medium</b>（3 檔）。其餘 6 檔保留。
      </div>
      {Object.entries(TYPOGRAPHY.weight).map(([k, v]) => {
        const enabled = TYPOGRAPHY_WEIGHT_ENABLED.includes(k);
        return (
          <div key={k} style={{
            padding: '10px 0', borderTop: `1px solid ${TOKENS.hairline}`,
            opacity: enabled ? 1 : 0.4,
          }}>
            <div style={{ display: 'flex', gap: 12, marginBottom: 4, alignItems: 'baseline' }}>
              <code style={{ fontSize: 11, color: TOKENS.ink3, width: 80 }}>{k}</code>
              <code style={{ fontSize: 11, color: TOKENS.ink3, width: 30 }}>{v}</code>
              <span style={{
                fontSize: 10, padding: '1px 6px', borderRadius: 3,
                background: enabled ? TOKENS.p50 : TOKENS.surface2,
                color: enabled ? TOKENS.p500 : TOKENS.ink3,
                fontWeight: 500,
              }}>{enabled ? '啟用' : '保留'}</span>
            </div>
            <div style={{ fontSize: 18, fontWeight: v, color: TOKENS.ink }}>記帳 SuSuGiGi · The quick brown fox</div>
            <div style={{ fontSize: 11, color: TOKENS.ink2, marginTop: 2 }}>
              {enabled ? enabledMeanings[k] : reservedHint}
            </div>
          </div>
        );
      })}
    </FoundCard>
  );
}

function LineHeightCard() {
  return (
    <FoundCard>
      <FoundLabel>LINE_HEIGHT · 比例</FoundLabel>
      <div style={{ fontSize: 11, color: TOKENS.ink3, marginBottom: 12 }}>
        三檔比例供自由排版時引用；TYPE_STYLES 內已內建絕對 lineHeight（pt），優先使用 TYPE_STYLES。
      </div>
      {Object.entries(LINE_HEIGHT).map(([k, v]) => (
        <div key={k} style={{ padding: '10px 0', borderTop: `1px solid ${TOKENS.hairline}` }}>
          <div style={{ display: 'flex', gap: 12, marginBottom: 4 }}>
            <code style={{ fontSize: 11, color: TOKENS.ink3, width: 60 }}>{k}</code>
            <code style={{ fontSize: 11, color: TOKENS.ink3, fontVariantNumeric: 'tabular-nums' }}>{v}</code>
          </div>
          <div style={{ fontSize: 13, lineHeight: v, color: TOKENS.ink }}>
            這是一段示範文字。SuSuGiGi 設計工作台用三檔行高比例做為通用排版基準，配合 HIG TYPE_STYLES 的絕對 lineHeight 形成完整字體系統。
          </div>
        </div>
      ))}
    </FoundCard>
  );
}

function LetterSpacingCard() {
  return (
    <FoundCard>
      <FoundLabel>LETTER_SPACING · 字距 (pt)</FoundLabel>
      <div style={{ fontSize: 11, color: TOKENS.ink3, marginBottom: 12 }}>
        TYPE_STYLES 內已內建各 style 對應 HIG tracking；獨立三檔供自由排版時引用。
      </div>
      {Object.entries(LETTER_SPACING).map(([k, v]) => (
        <div key={k} style={{ padding: '10px 0', borderTop: `1px solid ${TOKENS.hairline}` }}>
          <div style={{ display: 'flex', gap: 12, marginBottom: 4 }}>
            <code style={{ fontSize: 11, color: TOKENS.ink3, width: 60 }}>{k}</code>
            <code style={{ fontSize: 11, color: TOKENS.ink3, fontVariantNumeric: 'tabular-nums' }}>{v}pt</code>
          </div>
          <div style={{ fontSize: 16, letterSpacing: v, color: TOKENS.ink }}>記帳 SuSuGiGi · Aa</div>
        </div>
      ))}
    </FoundCard>
  );
}

function FoundationsAtomicTypeSection() {
  return (
    <DCSection
      id="found-atomic-type"
      title="Atomic · Type"
      subtitle="字體系統以 Apple HIG / iOS Dynamic Type 為錨點。TYPE_STYLES（11 種 HIG 語意 style）為使用入口，TYPOGRAPHY.size 為底層數值。本標準啟用 light / regular / medium 三檔字重；semibold 及以上保留。"
      direction="column"
    >
      <DCArtboard id="type-styles" label="TYPE_STYLES · 11 種 HIG style (live)" width={520} height={760}>
        <TypeStylesCard/>
      </DCArtboard>
      <DCArtboard id="type-scale" label="TYPOGRAPHY.size · 底層 xs → 3xl (live)" width={520} height={520}>
        <TypeScaleCard/>
      </DCArtboard>
      <DCArtboard id="type-weights" label="TYPOGRAPHY.weight · 啟用 vs 保留 (live)" width={520} height={680}>
        <WeightsCard/>
      </DCArtboard>
      <DCArtboard id="type-line-height" label="LINE_HEIGHT · tight / base / relaxed (live)" width={520} height={420}>
        <LineHeightCard/>
      </DCArtboard>
      <DCArtboard id="type-letter-spacing" label="LETTER_SPACING · tight / normal / wide (live)" width={520} height={360}>
        <LetterSpacingCard/>
      </DCArtboard>
    </DCSection>
  );
}

Object.assign(window, {
  TypeStylesCard, TypeScaleCard, WeightsCard, LineHeightCard, LetterSpacingCard,
  FoundationsAtomicTypeSection,
});
