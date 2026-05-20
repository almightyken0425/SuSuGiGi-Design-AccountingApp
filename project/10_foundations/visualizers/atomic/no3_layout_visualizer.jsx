// ─────────────────────────────────────────────────────────────
// Foundations > Atomic > Layout · 版面原語視覺化
//
// 6 張卡片：SPACING / RADIUS / SHADOW / MOTION / ICON_SIZE / HIT_TARGET。
// ─────────────────────────────────────────────────────────────

function SpacingCard() {
  return (
    <FoundCard>
      <FoundLabel>SPACING · 4-multiple baseline</FoundLabel>
      {Object.entries(SPACING).map(([k, v]) => (
        <div key={k} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '6px 0', borderTop: `1px solid ${TOKENS.hairline}` }}>
          <code style={{ fontSize: 11, color: TOKENS.ink3, width: 50, fontVariantNumeric: 'tabular-nums' }}>{k}</code>
          <code style={{ fontSize: 11, color: TOKENS.ink3, width: 40, fontVariantNumeric: 'tabular-nums' }}>{v}px</code>
          <div style={{ height: 14, background: TOKENS.p500, width: v, borderRadius: 3 }}/>
        </div>
      ))}
    </FoundCard>
  );
}

function RadiusCard() {
  return (
    <FoundCard>
      <FoundLabel>RADIUS · HIG continuous corner</FoundLabel>
      <div style={{ fontSize: 11, color: TOKENS.ink3, marginBottom: 12 }}>
        階梯 none / sm / md / lg / xl / 2xl / full。Impl 端孤兒值統一 snap down：6→sm(4) · 10→md(8) · 14→lg(12) · 24→2xl(20)。
      </div>
      <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', paddingTop: 8 }}>
        {Object.entries(RADIUS).map(([k, v]) => (
          <div key={k} style={{ textAlign: 'center' }}>
            <div style={{
              width: 60, height: 60,
              borderRadius: v === 9999 ? 9999 : v,
              background: TOKENS.p100, border: `1.5px solid ${TOKENS.p500}`,
            }}/>
            <code style={{ fontSize: 11, color: TOKENS.ink2, display: 'block', marginTop: 6 }}>{k}</code>
            <code style={{ fontSize: 11, color: TOKENS.ink3, fontVariantNumeric: 'tabular-nums' }}>{v === 9999 ? 'full' : `${v}px`}</code>
          </div>
        ))}
      </div>
    </FoundCard>
  );
}

function ShadowCard() {
  // 從 THEME_1 取 shadow.color 與 shadow.elevation；SHADOW 老 alias 等同 elevation。
  const shadowColor = THEME_1.shadow.color;
  // 把 hex 黑（#000000）轉成 rgba(0,0,0,opacity) 給 boxShadow 用
  const composeShadow = (s) => s.offsetY === 0 && s.blur === 0
    ? 'none'
    : `0 ${s.offsetY}px ${s.blur}px 0 rgba(0,0,0,${s.opacity})`;
  return (
    <FoundCard>
      <FoundLabel>SHADOW · HIG layering</FoundLabel>
      <div style={{ fontSize: 11, color: TOKENS.ink3, marginBottom: 12 }}>
        level0 無 / level1 subtle (cards) / level2 raised (FAB) / level3 overlay (modals)。
        color = theme.shadow.color（{shadowColor}），階梯只控 offsetY / blur / opacity。
      </div>
      <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', padding: '16px 8px 24px' }}>
        {Object.entries(THEME_1.shadow.elevation).map(([k, s]) => (
          <div key={k} style={{ textAlign: 'center' }}>
            <div style={{
              width: 80, height: 80, borderRadius: RADIUS.md,
              background: TOKENS.surface,
              boxShadow: composeShadow(s),
            }}/>
            <code style={{ fontSize: 11, color: TOKENS.ink2, display: 'block', marginTop: 8 }}>{k}</code>
            <code style={{ fontSize: 9.5, color: TOKENS.ink3, fontVariantNumeric: 'tabular-nums' }}>
              y{s.offsetY} blur{s.blur} α{s.opacity}
            </code>
          </div>
        ))}
      </div>
    </FoundCard>
  );
}

function MotionCard() {
  return (
    <FoundCard>
      <FoundLabel>MOTION · duration + easing</FoundLabel>
      <div style={{ fontSize: 11, color: TOKENS.ink3, marginBottom: 12 }}>
        動畫四檔 duration 與四個 easing 函式，對齊 HIG standard / decelerate / accelerate / emphasized。
      </div>
      <SectionMini>duration (ms)</SectionMini>
      {Object.entries(MOTION.duration).map(([k, v]) => (
        <div key={k} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '5px 0', borderTop: `1px solid ${TOKENS.hairline}` }}>
          <code style={{ fontSize: 11, color: TOKENS.ink3, width: 70 }}>{k}</code>
          <code style={{ fontSize: 11, color: TOKENS.ink3, fontVariantNumeric: 'tabular-nums' }}>{v}ms</code>
        </div>
      ))}
      <SectionMini style={{ marginTop: 16 }}>easing</SectionMini>
      {Object.entries(MOTION.easing).map(([k, v]) => (
        <div key={k} style={{ padding: '5px 0', borderTop: `1px solid ${TOKENS.hairline}` }}>
          <code style={{ fontSize: 11, color: TOKENS.ink3 }}>{k}</code>
          <code style={{ fontSize: 10, color: TOKENS.ink2, display: 'block', marginTop: 2 }}>{v}</code>
        </div>
      ))}
    </FoundCard>
  );
}

const ICON_SIZE_USAGE = {
  xs:    'chevron / 小型 inline icon',
  sm:    '列表標準 leftIcon、search bar icon',
  md:    '稍大 inline icon、header SF Symbol pill 內 icon',
  lg:    'form picker chip、TxList row 左槽 outline',
  xl:    '強調區 / hero icon',
  '2xl': '空狀態 icon',
};

function IconSizeCard() {
  return (
    <FoundCard>
      <FoundLabel>ICON_SIZE · 6 階階梯（與 SPACING / RADIUS 同階）</FoundLabel>
      <div style={{ fontSize: 11, color: TOKENS.ink3, marginBottom: 14, lineHeight: 1.5 }}>
        第 3 層共用階梯，供元件層 token（LIST_TOKENS / TX_LIST_TOKENS / SEARCH_BAR_TOKENS /
        FORM_PICKER_TOKENS）內 icon 尺寸引用，不再 hard-code。
      </div>
      <div style={{ display: 'flex', alignItems: 'flex-end', gap: 16, padding: '8px 0 16px', minHeight: 80 }}>
        {Object.entries(ICON_SIZE).map(([k, v]) => (
          <div key={k} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{
              width: v, height: v, display: 'flex', alignItems: 'center', justifyContent: 'center',
              background: TOKENS.p50, borderRadius: 4,
            }}>
              <Glyph name="cog-outline" size={v - 2} color={TOKENS.p500} stroke={1.6}/>
            </div>
            <code style={{ fontSize: 11, color: TOKENS.ink2, marginTop: 6, fontVariantNumeric: 'tabular-nums' }}>{k}</code>
            <code style={{ fontSize: 10, color: TOKENS.ink3, fontVariantNumeric: 'tabular-nums' }}>{v}px</code>
          </div>
        ))}
      </div>
      <SectionMini style={{ marginTop: 16 }}>典型用途</SectionMini>
      <div style={{ display: 'grid', gridTemplateColumns: 'auto auto 1fr', columnGap: 12, rowGap: 4 }}>
        {Object.entries(ICON_SIZE).map(([k, v]) => (
          <React.Fragment key={k}>
            <code style={{ fontSize: 11, color: TOKENS.ink, lineHeight: 1.6 }}>{k}</code>
            <code style={{ fontSize: 11, color: TOKENS.ink2, fontVariantNumeric: 'tabular-nums', lineHeight: 1.6 }}>{v}</code>
            <span style={{ fontSize: 10.5, color: TOKENS.ink2, lineHeight: 1.6 }}>{ICON_SIZE_USAGE[k]}</span>
          </React.Fragment>
        ))}
      </div>
    </FoundCard>
  );
}

function HitTargetCard() {
  const hit = HIT_TARGET.min;
  const sm  = ICON_SIZE.sm;
  return (
    <FoundCard>
      <FoundLabel>HIT_TARGET.min · 觸控目標下界 = {hit}pt</FoundLabel>
      <div style={{ fontSize: 11, color: TOKENS.ink3, marginBottom: 16, lineHeight: 1.5 }}>
        iOS HIG 規範觸控最小目標為 44pt。icon size ≠ hit target——小 icon 周圍可加 padding 達標。
      </div>
      <div style={{ display: 'flex', gap: 32, alignItems: 'center', justifyContent: 'center', padding: '12px 0 8px' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{
            width: hit, height: hit,
            background: 'rgba(124, 92, 255, 0.18)',
            border: `1px dashed ${TOKENS.p500}`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            borderRadius: 4,
          }}>
            <Glyph name="cog-outline" size={sm} color={TOKENS.p500} stroke={1.8}/>
          </div>
          <code style={{ fontSize: 10, color: TOKENS.ink3, display: 'block', marginTop: 6, lineHeight: 1.5 }}>
            ICON_SIZE.sm ({sm}) 居中於<br/>HIT_TARGET.min ({hit})
          </code>
        </div>
        <div style={{ fontSize: 11, color: TOKENS.ink2, lineHeight: 1.6, maxWidth: 220 }}>
          <div style={{ marginBottom: 6 }}>· 虛線方框 = 44×44 觸控目標</div>
          <div style={{ marginBottom: 6 }}>· 實心 icon = 20×20</div>
          <div>· 兩者差距由元件 padding / hit slop 補滿</div>
        </div>
      </div>
      <SectionMini style={{ marginTop: 14 }}>套用情境</SectionMini>
      <div style={{ fontSize: 10.5, color: TOKENS.ink2, lineHeight: 1.6, paddingTop: 4 }}>
        · <code>SEARCH_BAR_TOKENS.PILL_HEIGHT = HIT_TARGET.min</code><br/>
        · <code>LIST_TOKENS.ITEM_MIN_HEIGHT(58) ≥ HIT_TARGET.min(44)</code><br/>
        · <code>FORM_PICKER_TOKENS.ROW_MIN_HEIGHT(58) ≥ HIT_TARGET.min(44)</code><br/>
        · <code>CHIP_TOKENS</code> 高度 ≈ 30pt &lt; 44，屬例外（chip 為輔助選擇器）
      </div>
    </FoundCard>
  );
}

function FoundationsAtomicLayoutSection() {
  return (
    <DCSection
      id="found-atomic-layout"
      title="Atomic · Layout"
      subtitle="設計原語階梯，跨元件共用。SPACING（HIG 4 倍數階梯 2xs→5xl，2xs=2 專供「主標題下副標題行內補位」）/ RADIUS（none/sm/md/lg/xl/2xl/full，不收 14）/ SHADOW HIG 4 階 elevation / MOTION duration + easing 對齊 HIG / ICON_SIZE 6 階階梯 / HIT_TARGET.min = 44 對齊 HIG 觸控最小目標。元件專屬 token 表已移至 Component Tokens group。"
    >
      <DCFamily id="layout-spacing-radius" title="Spacing & Radius" subtitle="4 倍數間距階梯 + HIG continuous corner 圓角階梯。">
        <DCArtboard id="spacing-live" label="SPACING · 4-multiple baseline (live)" width={520} height={520}>
          <SpacingCard/>
        </DCArtboard>
        <DCArtboard id="radius-live" label="RADIUS · none → 2xl + full (live)" width={520} height={460}>
          <RadiusCard/>
        </DCArtboard>
      </DCFamily>

      <DCFamily id="layout-effects" title="Effects" subtitle="HIG 4 階陰影 elevation + MOTION duration / easing。">
        <DCArtboard id="shadow-live" label="SHADOW · level0 → level3 (live)" width={520} height={440}>
          <ShadowCard/>
        </DCArtboard>
        <DCArtboard id="motion-live" label="MOTION · duration + easing (live)" width={520} height={460}>
          <MotionCard/>
        </DCArtboard>
      </DCFamily>

      <DCFamily id="layout-sizing" title="Sizing" subtitle="ICON_SIZE 6 階共用階梯 + HIT_TARGET.min 觸控最小目標規範。">
        <DCArtboard id="icon-size-live" label="ICON_SIZE · 6 階階梯 (live)" width={520} height={520}>
          <IconSizeCard/>
        </DCArtboard>
        <DCArtboard id="hit-target-live" label="HIT_TARGET · 觸控目標下界 (live)" width={520} height={320}>
          <HitTargetCard/>
        </DCArtboard>
      </DCFamily>
    </DCSection>
  );
}

Object.assign(window, {
  SpacingCard, RadiusCard, ShadowCard, MotionCard, IconSizeCard, HitTargetCard,
  FoundationsAtomicLayoutSection,
});
