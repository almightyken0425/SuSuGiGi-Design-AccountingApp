// ─────────────────────────────────────────────────────────────
// Foundations · 設計標準視覺化
//
// 5 個 sub-item：Type / Colors / Tokens / Components / Brand
//   - Tokens：跨元件共用的設計原語階梯（Layout / Elevation / Motion / Touch）
//   - Components：由 components-showcase.jsx 的 FoundationsComponentsSection 串成
//     元件 family 內含對應元件 token 表 + anatomy（從本檔下放）
//
// 所有卡片皆為 live JSX：讀 data.jsx 的 token 即時繪製。
// token 改 → 視覺自動更新；無 HTML snapshot 雙來源。
//
// Token 錨點：Apple HIG / iOS Dynamic Type
// ─────────────────────────────────────────────────────────────

function FoundationsTypeSection() {
  return (
    <DCSection
      id="found-type"
      title="Type"
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

function FoundationsColorsSection() {
  return (
    <DCSection
      id="found-colors"
      title="Colors"
      subtitle="Classic Purple（預設）+ Ocean Teal（opt-in），共用 neutral 與 status 色階。所有色彩讀 data.jsx 的 PALETTE / THEMES 即時繪製。"
      direction="column"
    >
      <DCArtboard id="palette-theme1" label="Theme 1 · 經典紫 (live)" width={420} height={520}>
        <PaletteCard theme={THEME_1}/>
      </DCArtboard>
      <DCArtboard id="palette-theme2" label="Theme 2 · 海洋藍 (live)" width={420} height={520}>
        <PaletteCard theme={THEME_2}/>
      </DCArtboard>
      <DCArtboard id="palette-neutrals" label="Neutrals · PALETTE.neutral (live)" width={420} height={580}>
        <NeutralsCard/>
      </DCArtboard>
      <DCArtboard id="palette-semantic" label="Semantic · Status / Text / Border (live)" width={420} height={520}>
        <SemanticCard theme={THEME_1}/>
      </DCArtboard>
      <DCArtboard id="surfaces-live" label="Surfaces · base / surface / surface_hover / surface_dim (live)" width={420} height={420}>
        <SurfacesCard theme={THEME_1}/>
      </DCArtboard>
      <DCArtboard id="dividers-live" label="Dividers · base / hairline (live)" width={420} height={240}>
        <DividersCard theme={THEME_1}/>
      </DCArtboard>
      <DCArtboard id="state-live" label="State · press / selected / disabled / focus (live)" width={520} height={520}>
        <StatesCard theme={THEME_1}/>
      </DCArtboard>
      <DCArtboard id="scrim-live" label="Scrim · light / medium / heavy (live)" width={520} height={240}>
        <ScrimCard theme={THEME_1}/>
      </DCArtboard>
      <DCArtboard id="warning-callout-live" label="Status · warning callout (live)" width={520} height={280}>
        <WarningCalloutCard theme={THEME_1}/>
      </DCArtboard>
    </DCSection>
  );
}

function FoundationsTokensSection() {
  return (
    <DCSection
      id="found-tokens"
      title="Tokens"
      subtitle="設計原語階梯，跨元件共用。Layout：SPACING（HIG 4 倍數階梯 2xs→5xl，2xs=2 專供「主標題下副標題行內補位」）/ RADIUS（none/sm/md/lg/xl/2xl/full，不收 14）。Elevation：SHADOW HIG 4 階 elevation。Motion：MOTION duration + easing 對齊 HIG（standard / decelerate / accelerate / emphasized）。Touch：ICON_SIZE 6 階階梯（xs/sm/md/lg/xl/2xl），HIT_TARGET.min = 44 對齊 HIG 觸控最小目標。元件專屬 token 表（LIST_TOKENS / TX_LIST_TOKENS / FORM_PICKER_TOKENS / CHIP_TOKENS / SEARCH_BAR_TOKENS / HEADER_ICON_BUTTON_TOKENS / SWITCH_TOKENS / LIST_EMPTY_TRANSITION）已下放至 Components 子項對應 family 旁。"
      direction="column"
    >
      <DCArtboard id="spacing-live" label="SPACING · 4-multiple baseline (live)" width={520} height={520}>
        <SpacingCard/>
      </DCArtboard>
      <DCArtboard id="radius-live" label="RADIUS · none → 2xl + full (live)" width={520} height={460}>
        <RadiusCard/>
      </DCArtboard>
      <DCArtboard id="shadow-live" label="SHADOW · level0 → level3 (live)" width={520} height={440}>
        <ShadowCard/>
      </DCArtboard>
      <DCArtboard id="motion-live" label="MOTION · duration + easing (live)" width={520} height={460}>
        <MotionCard/>
      </DCArtboard>
      <DCArtboard id="icon-size-live" label="ICON_SIZE · 6 階階梯 (live)" width={520} height={520}>
        <IconSizeCard/>
      </DCArtboard>
      <DCArtboard id="hit-target-live" label="HIT_TARGET · 觸控目標下界 (live)" width={520} height={320}>
        <HitTargetCard/>
      </DCArtboard>
    </DCSection>
  );
}

function FoundationsBrandSection() {
  return (
    <DCSection
      id="found-brand"
      title="Brand"
      subtitle="品牌資產：icon set、ACTION_ICON_MAP（header 動作 → SF Symbol）、GlassView demo。"
      direction="column"
    >
      <DCArtboard id="icon-account" label="IconDefinition · account tag (live)" width={520} height={580}>
        <IconWallCard icons={ICON_LIBRARY.filter(i => i.tags.includes('account'))}/>
      </DCArtboard>
      <DCArtboard id="icon-category" label="IconDefinition · category tag (live)" width={520} height={760}>
        <IconWallCard icons={ICON_LIBRARY.filter(i => i.tags.includes('category'))}/>
      </DCArtboard>
      <DCArtboard id="icon-ui" label="UI 元素 · MCI / FontAwesome / SF Symbols (impl 白名單)" width={520} height={1100}>
        <UIGlyphWallCard/>
      </DCArtboard>
      <DCArtboard id="action-icon-map" label="ACTION_ICON_MAP · header 動作 → SF Symbol (live)" width={520} height={460}>
        <ActionIconMapCard/>
      </DCArtboard>
    </DCSection>
  );
}

// ─── PaletteCard ────────────────────────────────────────────
function PaletteCard({ theme }) {
  const shades = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900];
  return (
    <FoundCard>
      <FoundLabel>{theme.name}</FoundLabel>
      <div style={{ fontSize: 12, color: TOKENS.ink2, marginBottom: 10 }}>primary[50…900], main = primary[500] = <code style={{ fontVariantNumeric: 'tabular-nums' }}>{theme.primary.main}</code></div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6 }}>
        {shades.map(s => <Swatch key={s} hex={theme.primary[s]} name={`primary ${s}`}/>)}
      </div>
      <FoundLabel style={{ marginTop: 20 }}>Chart series · primary[800→400]</FoundLabel>
      <div style={{ display: 'flex', gap: 4 }}>
        {theme.chart.map((c, i) => <div key={i} style={{ flex: 1, height: 40, background: c, borderRadius: 4 }}/>)}
      </div>
      <FoundLabel style={{ marginTop: 20 }}>Contrast</FoundLabel>
      <Swatch hex={theme.contrast} name="contrast"/>
    </FoundCard>
  );
}

function NeutralsCard() {
  const shades = [0, 25, 50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950, 1000];
  return (
    <FoundCard>
      <FoundLabel>PALETTE.neutral · n0 → n1000</FoundLabel>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6 }}>
        {shades.map(s => <Swatch key={s} hex={PALETTE.neutral[s]} name={`neutral[${s}]`}/>)}
      </div>
    </FoundCard>
  );
}

function SemanticCard({ theme }) {
  return (
    <FoundCard>
      <FoundLabel>theme.status</FoundLabel>
      <Swatch hex={theme.status.success} name="status.success"/>
      <Swatch hex={theme.status.warning} name="status.warning"/>
      <Swatch hex={theme.status.error}   name="status.error"/>
      <FoundLabel style={{ marginTop: 16 }}>theme.text</FoundLabel>
      <Swatch hex={theme.text.primary}   name="text.primary"   note="900"/>
      <Swatch hex={theme.text.secondary} name="text.secondary" note="600"/>
      <Swatch hex={theme.text.divisor}   name="text.divisor"   note="300"/>
      <FoundLabel style={{ marginTop: 16 }}>theme.border</FoundLabel>
      <Swatch hex={theme.border.base}  name="border.base"  note="200"/>
    </FoundCard>
  );
}

// ─── 新增：Surfaces / Dividers / State / Scrim / WarningCallout ────────────
function SurfacesCard({ theme }) {
  return (
    <FoundCard>
      <FoundLabel>theme.bg · 4 層背景</FoundLabel>
      <div style={{ fontSize: 11, color: TOKENS.ink3, marginBottom: 12 }}>
        由白到淡灰的階梯。surface_dim 對齊 iOS systemFill 最淡層，給「比 surface 淡一點的子區塊背景」用（如 FloatingActionBar timer circle、segmented control、subtle button）。
      </div>
      <Swatch hex={theme.bg.base}          name="bg.base"          note="iOS systemGroupedBackground"/>
      <Swatch hex={theme.bg.surface}       name="bg.surface"       note="白卡片底"/>
      <Swatch hex={theme.bg.surface_hover} name="bg.surface_hover" note="hover / hairline-淡灰"/>
      <Swatch hex={theme.bg.surface_dim}   name="bg.surface_dim"   note="子區塊微暗背景 · rgba(0,0,0,0.06)"/>
    </FoundCard>
  );
}

function DividersCard({ theme }) {
  return (
    <FoundCard>
      <FoundLabel>theme.divider · 分隔線</FoundLabel>
      <div style={{ fontSize: 11, color: TOKENS.ink3, marginBottom: 12 }}>
        base 為實線群組分隔（= neutral[300]），hairline 為細淡分隔線（iOS systemGray with α）。
      </div>
      <div style={{ padding: '12px 0', borderTop: `1px solid ${TOKENS.hairline}` }}>
        <code style={{ fontSize: 11, color: TOKENS.ink3 }}>divider.base · {theme.divider.base}</code>
        <div style={{ height: 1, background: theme.divider.base, marginTop: 8 }}/>
      </div>
      <div style={{ padding: '12px 0', borderTop: `1px solid ${TOKENS.hairline}` }}>
        <code style={{ fontSize: 11, color: TOKENS.ink3 }}>divider.hairline · {theme.divider.hairline}</code>
        <div style={{ height: 1, background: theme.divider.hairline, marginTop: 8 }}/>
      </div>
    </FoundCard>
  );
}

function StatesCard({ theme }) {
  const box = { width: 80, height: 32, borderRadius: 8, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: 13 };
  return (
    <FoundCard>
      <FoundLabel>theme.state · 互動狀態</FoundLabel>
      <div style={{ fontSize: 11, color: TOKENS.ink3, marginBottom: 12 }}>
        press 整顆元件按下透明度；selected bg/fg/border 三件套；disabled fg + opacity；focus 邊框。
      </div>

      <SectionMini>press · opacity {theme.state.press.opacity}</SectionMini>
      <div style={{ display: 'flex', gap: 12, alignItems: 'center', padding: '6px 0 16px' }}>
        <div style={{ ...box, background: theme.primary[500], color: '#fff' }}>normal</div>
        <div style={{ ...box, background: theme.primary[500], color: '#fff', opacity: theme.state.press.opacity }}>pressed</div>
      </div>

      <SectionMini>selected · bg / fg / border</SectionMini>
      <div style={{ display: 'flex', gap: 12, alignItems: 'center', padding: '6px 0 16px' }}>
        <div style={{ ...box, background: theme.bg.surface, color: theme.text.primary, border: `2px solid ${theme.border.base}` }}>normal</div>
        <div style={{ ...box, background: theme.state.selected.bg, color: theme.state.selected.fg, border: `2px solid ${theme.state.selected.border}` }}>selected</div>
      </div>

      <SectionMini>disabled · fg + opacity {theme.state.disabled.opacity}</SectionMini>
      <div style={{ display: 'flex', gap: 12, alignItems: 'center', padding: '6px 0 16px' }}>
        <div style={{ ...box, background: theme.primary[500], color: '#fff' }}>normal</div>
        <div style={{ ...box, background: theme.primary[500], color: '#fff', opacity: theme.state.disabled.opacity }}>disabled</div>
        <div style={{ ...box, color: theme.state.disabled.fg, border: `1px solid ${theme.border.base}` }}>fg only</div>
      </div>

      <SectionMini>focus · border {theme.state.focus.border}</SectionMini>
      <div style={{ display: 'flex', gap: 12, alignItems: 'center', padding: '6px 0' }}>
        <div style={{ ...box, background: theme.bg.surface, color: theme.text.primary, border: `1px solid ${theme.border.base}` }}>normal</div>
        <div style={{ ...box, background: theme.bg.surface, color: theme.text.primary, border: `2px solid ${theme.state.focus.border}` }}>focus</div>
      </div>
    </FoundCard>
  );
}

function ScrimCard({ theme }) {
  const level = (name, color, note) => (
    <div key={name} style={{ flex: 1, position: 'relative', height: 80, borderRadius: 6, overflow: 'hidden', background: `linear-gradient(135deg, ${theme.primary[300]}, ${theme.primary[700]})` }}>
      <div style={{ position: 'absolute', inset: 0, background: color }}/>
      <div style={{ position: 'absolute', bottom: 6, left: 6, right: 6, color: '#fff', fontSize: 10, textShadow: '0 1px 2px rgba(0,0,0,0.5)' }}>
        <div style={{ fontWeight: 600 }}>{name}</div>
        <div style={{ opacity: 0.85 }}>{note}</div>
      </div>
    </div>
  );
  return (
    <FoundCard>
      <FoundLabel>theme.scrim · Modal 遮罩三檔</FoundLabel>
      <div style={{ fontSize: 11, color: TOKENS.ink3, marginBottom: 12 }}>
        對齊 iOS 系統：light = UIAlertController；medium = formSheet / actionSheet；heavy = 全屏 viewer / camera。
      </div>
      <div style={{ display: 'flex', gap: 8 }}>
        {level('light',  theme.scrim.light,  '0.20')}
        {level('medium', theme.scrim.medium, '0.40')}
        {level('heavy',  theme.scrim.heavy,  '0.60')}
      </div>
    </FoundCard>
  );
}

function WarningCalloutCard({ theme }) {
  return (
    <FoundCard>
      <FoundLabel>theme.status.warning · 弱化態</FoundLabel>
      <div style={{ fontSize: 11, color: TOKENS.ink3, marginBottom: 12 }}>
        warning（亮黃，icon/badge 強調用）+ warning_bg/warning_fg（淡橘 callout 用，沿用 Material warning surface）。
      </div>
      <div style={{ display: 'flex', gap: 16, alignItems: 'center', marginBottom: 16 }}>
        <div style={{ width: 32, height: 32, borderRadius: 16, background: theme.status.warning, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 700 }}>!</div>
        <div style={{ fontSize: 11, color: TOKENS.ink3 }}>status.warning · {theme.status.warning} · icon / badge 強調</div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: 12, borderRadius: 8, background: theme.status.warning_bg }}>
        <span style={{ fontSize: 18, color: theme.status.warning_fg }}>⚠</span>
        <div style={{ flex: 1, fontSize: 13, color: theme.status.warning_fg, lineHeight: 1.4 }}>
          這是一張 warning callout 範例。bg = {theme.status.warning_bg}，fg = {theme.status.warning_fg}。
        </div>
      </div>
    </FoundCard>
  );
}

function Swatch({ hex, name, note }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '4px 0' }}>
      <div style={{
        width: 32, height: 32, borderRadius: 6, background: hex,
        border: `1px solid ${TOKENS.hairline}`, flexShrink: 0,
      }}/>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 11, fontWeight: 500, color: TOKENS.ink, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{name}</div>
        <div style={{ fontSize: 10, color: TOKENS.ink2, fontVariantNumeric: 'tabular-nums' }}>{hex}{note ? ` · ${note}` : ''}</div>
      </div>
    </div>
  );
}

// ─── Typography cards ──────────────────────────────────────
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

// ─── Spacing / Radius / Shadow / Motion ───────────────────
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

function SectionMini({ children, style }) {
  return (
    <div style={{
      fontSize: 10, fontWeight: 600, color: TOKENS.ink3, letterSpacing: 0.5,
      textTransform: 'uppercase', marginTop: 4, marginBottom: 2, ...(style || {}),
    }}>{children}</div>
  );
}

// ─── IconSizeCard / HitTargetCard ─────────────────────────
// 視覺化 ICON_SIZE 6 階階梯（與 SPACING / RADIUS 同階展示），
// 對比 HIT_TARGET.min 標出「icon size ≠ hit target」的政策邊界。

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

// ─── TokenTableCard / ActionIconMapCard ───────────────────
function ActionIconMapCard() {
  const entries = Object.entries(ACTION_ICON_MAP);
  return (
    <FoundCard>
      <FoundLabel>ACTION_ICON_MAP · header 動作 → SF Symbol</FoundLabel>
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(72px, auto) minmax(140px, auto) 1fr', columnGap: 12, rowGap: 6, paddingTop: 4 }}>
        {entries.map(([action, def]) => (
          <React.Fragment key={action}>
            <code style={{ fontSize: 12, color: TOKENS.ink, lineHeight: 1.6 }}>{action}</code>
            <code style={{ fontSize: 11, color: TOKENS.ink2, lineHeight: 1.6 }}>
              {def.source === 'native' ? 'native chevron' : `SF · ${def.symbol}`}
            </code>
            <span style={{ fontSize: 11, color: TOKENS.ink2, lineHeight: 1.6 }}>{def.note}</span>
          </React.Fragment>
        ))}
      </div>
    </FoundCard>
  );
}

// ─── Token description tables ─────────────────────────────────────
// 為 TokenTableCard 提供「用途」欄文字。本輪只覆蓋 row family 三組
// （LIST / FORM_PICKER / CHIP）；既有 TX_LIST / SEARCH / LIST_EMPTY /
// SWITCH 留待 Phase 4 補完。

const LIST_TOKEN_DESC = {
  ITEM_MIN_HEIGHT:               'row 最小高度（≥ HIT_TARGET.min=44）',
  ITEM_PADDING_VERTICAL:         'row 上下 padding，引 body font size 維持垂直節奏',
  ITEM_PADDING_HORIZONTAL:       'row 左右邊距，有/無 icon 皆從此值起算',
  ITEM_GAP_HORIZONTAL:           'icon ↔ text、text ↔ trailing 之間的水平 gap',
  ITEM_TITLE_SIZE:               'row 主標題字級（HIG body）',
  ITEM_TITLE_WEIGHT:             'row 主標題字重（light 為安靜文字）',
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
  PRESS_BG_HIGHLIGHT_OPACITY:    'press 態背景高亮透明度',
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
  ITEM_MIN_HEIGHT:                  '—',
  ITEM_PADDING_VERTICAL:            'TYPE_STYLES.body.size',
  ITEM_PADDING_HORIZONTAL:          'SPACING.lg',
  ITEM_GAP_HORIZONTAL:              'SPACING.md',
  ITEM_TITLE_SIZE:                  'TYPE_STYLES.body.size',
  ITEM_TITLE_WEIGHT:                'TYPOGRAPHY.weight.light',
  ICON_SIZE_SMALL:                  'ICON_SIZE.sm',
  ICON_SIZE_MEDIUM:                 'ICON_SIZE.md',
  ICON_SIZE_LARGE:                  'ICON_SIZE.xl',
  DIVIDER_INSET_WITH_ICON:          'SPACING.lg + ICON_SIZE.sm + SPACING.md',
  DIVIDER_INSET_WITHOUT_ICON:       'SPACING.lg',
  GROUP_CARD_RADIUS:                'RADIUS.lg',
  GROUP_CARD_MARGIN_BOTTOM:         '—',
  GROUP_CARD_BORDER_WIDTH:          '—',
  SECTION_TITLE_SIZE:               'TYPE_STYLES.footnote.size',
  SECTION_TITLE_WEIGHT:             'TYPOGRAPHY.weight.regular',
  SECTION_TITLE_LETTER_SPACING:     '—',
  SECTION_TITLE_PADDING_TOP:        'SPACING.md',
  SECTION_TITLE_PADDING_BOTTOM:     "SPACING.xs + SPACING['2xs']",
  SECTION_TITLE_PADDING_HORIZONTAL: 'SPACING.lg',
  SELECTION_ITEM_RADIUS:            'RADIUS.md',
  SELECTION_ITEM_MARGIN_BOTTOM:     'SPACING.sm',
  SELECTION_CHECKMARK_SIZE:         'ICON_SIZE.xs',
  TRAILING_CHEVRON_SIZE:            'TYPE_STYLES.footnote.size',
  TRAILING_CHEVRON_WEIGHT:          '—',
  TRAILING_VALUE_SIZE:              'TYPE_STYLES.body.size',
  PRESS_BG_HIGHLIGHT_OPACITY:       '—',
  GRID_COLUMNS:                     '—',
  GRID_GAP:                         'SPACING.md',
  EMPTY_STATE_ICON_SIZE:            "ICON_SIZE['2xl']",
  EMPTY_STATE_TITLE_SIZE:           'TYPE_STYLES.body.size',
  EMPTY_STATE_DESCRIPTION_SIZE:     'TYPOGRAPHY.size.sm',
  EMPTY_STATE_ICON_GAP:             'SPACING.md',
  EMPTY_STATE_TEXT_GAP:             'SPACING.sm',
  EMPTY_STATE_PADDING_HORIZONTAL:   'SPACING.xl',
};

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
  ROW_MIN_HEIGHT:         '—',
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

const TX_LIST_TOKEN_DESC = {
  SECTION_CARD_RADIUS:                  '交易 section 卡片外殼圓角',
  SECTION_CARD_MARGIN_BOTTOM:           'section 卡片之間的呼吸距',
  SECTION_CARD_HORIZONTAL_PADDING:      '卡片內水平 padding',
  SECTION_HEADER_PADDING_V_COLLAPSED:   'section header 收合態垂直 padding',
  SECTION_HEADER_PADDING_V_EXPANDED:    'section header 展開態垂直 padding（較緊）',
  SECTION_HEADER_PADDING_H:             'section header 水平 padding',
  SECTION_HEADER_TITLE_SIZE_COLLAPSED:  '收合態標題字級（body）',
  SECTION_HEADER_TITLE_SIZE_EXPANDED:   '展開態標題字級（縮小）',
  SECTION_HEADER_TOTAL_SIZE_COLLAPSED:  '收合態金額字級',
  SECTION_HEADER_TOTAL_SIZE_EXPANDED:   '展開態金額字級（縮小）',
  SECTION_HEADER_TITLE_WEIGHT:          'section 標題字重',
  SECTION_HEADER_TOTAL_WEIGHT:          'section 金額字重',
  ICON_OUTLINE_BORDER_WIDTH:            '左槽 icon outline 描邊',
  ICON_OUTLINE_SIZE:                    '左槽 icon 容器尺寸（ICON_SIZE.lg）',
  ICON_OUTLINE_RADIUS:                  '左槽 icon 容器圓角（離開 RADIUS 階梯的視覺校準）',
  ROW_AMOUNT_SIZE:                      '交易列金額字級（callout）',
  ROW_AMOUNT_WEIGHT:                    '交易列金額字重',
  ROW_LEFT_SLOT_SIZE:                   '交易列左槽尺寸',
  ROW_NOTE_SIZE:                        '備註字級（subheadline）',
  ROW_SECONDARY_SIZE:                   '次要文字字級（caption1）',
  MORPH_DURATION_MS:                    'section 收合/展開動畫長度',
  SECTION_ENTRY_DURATION_MS:            'section 進場動畫長度',
  SECTION_ENTRY_STAGGER_MS:             'section 進場錯位間隔',
  SECTION_ENTRY_TRANSLATE_Y:            'section 進場初始位移',
  SECTION_ENTRY_STAGGER_MAX_INDEX:      '錯位上限索引',
  SECTION_SHRINK_DURATION_MS:           'section 縮短動畫',
  SECTION_GROW_DURATION_MS:             'section 展開動畫',
  FOCUS_CARD_SHRINK_DURATION_MS:        'focus card 縮短',
  FOCUS_CARD_GROW_DURATION_MS:          'focus card 展開',
};

const TX_LIST_TOKEN_SOURCE = {
  SECTION_CARD_RADIUS:                  'RADIUS.lg',
  SECTION_CARD_MARGIN_BOTTOM:           "SPACING.md + SPACING['2xs']",
  SECTION_CARD_HORIZONTAL_PADDING:      'SPACING.lg',
  SECTION_HEADER_PADDING_V_COLLAPSED:   'SPACING.md',
  SECTION_HEADER_PADDING_V_EXPANDED:    "SPACING.sm + SPACING['2xs']",
  SECTION_HEADER_PADDING_H:             'SPACING.lg',
  SECTION_HEADER_TITLE_SIZE_COLLAPSED:  'TYPE_STYLES.body.size',
  SECTION_HEADER_TITLE_SIZE_EXPANDED:   'TYPOGRAPHY.size.sm',
  SECTION_HEADER_TOTAL_SIZE_COLLAPSED:  'TYPE_STYLES.subheadline.size',
  SECTION_HEADER_TOTAL_SIZE_EXPANDED:   'TYPE_STYLES.footnote.size',
  SECTION_HEADER_TITLE_WEIGHT:          'TYPOGRAPHY.weight.medium',
  SECTION_HEADER_TOTAL_WEIGHT:          'TYPOGRAPHY.weight.medium',
  ICON_OUTLINE_BORDER_WIDTH:            '—',
  ICON_OUTLINE_SIZE:                    'ICON_SIZE.lg',
  ICON_OUTLINE_RADIUS:                  '—',
  ROW_AMOUNT_SIZE:                      'TYPE_STYLES.callout.size',
  ROW_AMOUNT_WEIGHT:                    'TYPOGRAPHY.weight.medium',
  ROW_LEFT_SLOT_SIZE:                   'ICON_SIZE.lg',
  ROW_NOTE_SIZE:                        'TYPE_STYLES.subheadline.size',
  ROW_SECONDARY_SIZE:                   'TYPE_STYLES.caption1.size',
  MORPH_DURATION_MS:                    'MOTION.duration.fast + 80',
};

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

const LIST_EMPTY_TRANSITION_DESC = {
  DURATION_MS: '列表空狀態切換動畫長度（220ms，fast 與 base 之間）',
  EASING:      '緩動函式（HIG standard）',
};

const LIST_EMPTY_TRANSITION_SOURCE = {
  DURATION_MS: 'MOTION.duration.fast + 20',
  EASING:      'MOTION.easing.standard',
};

const SWITCH_TOKEN_DESC = {
  TRACK_COLOR_OFF:  '未選態 track 色（surface_hover）',
  TRACK_COLOR_ON:   '選中態 track 色：default 走 success、brand 走 primary',
  THUMB_COLOR_ON:   '選中態 thumb 色（白）',
  THUMB_COLOR_OFF:  '未選態 thumb 色（淺灰）',
  IOS_BG_COLOR:     'iOS Switch 容器背景色',
};

const SWITCH_TOKEN_SOURCE = {
  TRACK_COLOR_OFF:  'TOKENS.surface2',
  TRACK_COLOR_ON:   'TOKENS.success / TOKENS.p500',
  THUMB_COLOR_ON:   '—',
  THUMB_COLOR_OFF:  '—',
  IOS_BG_COLOR:     '—',
};

const HEADER_ICON_BUTTON_TOKEN_DESC = {
  CONTENT_BOX:    'customView 正方形邊長（Liquid Glass hug 後自動成正圓 pill）',
  SYMBOL_SIZE:    'SF Symbol point size，對齊 iOS bar button 慣用 body 級',
  MULTI_ICON_GAP: '多 icon 共用 customView 時 icon 之間的水平 gap',
};

const HEADER_ICON_BUTTON_TOKEN_SOURCE = {
  CONTENT_BOX:    'ICON_SIZE.md',
  SYMBOL_SIZE:    'TYPE_STYLES.body.size',
  MULTI_ICON_GAP: 'SPACING.sm',
};

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
  BORDER_WIDTH:          '—',
};

function TokenTableCard({ tokens, title, descriptions, sources }) {
  const entries = Object.entries(tokens);
  const hasDesc = descriptions && Object.keys(descriptions).length > 0;
  const hasSource = sources && Object.keys(sources).length > 0;
  // KEY | (SOURCE) | VALUE | (用途)
  const gridTemplateColumns = [
    '1fr',
    hasSource ? 'auto' : null,
    'auto',
    hasDesc ? '1.6fr' : null,
  ].filter(Boolean).join(' ');
  const headerStyle = { fontSize: 9.5, color: TOKENS.ink3, lineHeight: 1.4, letterSpacing: 0.3 };
  return (
    <FoundCard>
      <FoundLabel>{title}</FoundLabel>
      <div style={{ display: 'grid', gridTemplateColumns, columnGap: 12, rowGap: 4 }}>
        {(hasDesc || hasSource) && (
          <React.Fragment>
            <code style={headerStyle}>KEY</code>
            {hasSource && <code style={headerStyle}>SOURCE</code>}
            <code style={{ ...headerStyle, textAlign: 'right' }}>VALUE</code>
            {hasDesc && <code style={headerStyle}>用途</code>}
          </React.Fragment>
        )}
        {entries.map(([k, v]) => (
          <React.Fragment key={k}>
            <code style={{ fontSize: 11, color: TOKENS.ink, lineHeight: 1.6 }}>{k}</code>
            {hasSource && (
              <code style={{ fontSize: 11, color: TOKENS.ink2, lineHeight: 1.6, whiteSpace: 'nowrap' }}>
                {sources[k] || '—'}
              </code>
            )}
            <code style={{ fontSize: 11, color: TOKENS.ink2, fontVariantNumeric: 'tabular-nums', lineHeight: 1.6, textAlign: 'right', whiteSpace: 'nowrap' }}>
              {typeof v === 'object' ? JSON.stringify(v) : String(v)}
            </code>
            {hasDesc && (
              <span style={{ fontSize: 10.5, color: TOKENS.ink2, lineHeight: 1.5 }}>
                {descriptions[k] || ''}
              </span>
            )}
          </React.Fragment>
        ))}
      </div>
    </FoundCard>
  );
}

// ─── Row family anatomy ──────────────────────────────────
// 把 LIST_TOKENS 的數值畫成可讀的 row 結構，與 token 表互為閱讀對位。
// 標籤一律用「token 名 = 引用鏈 = 數值」三段式，不寫 hard-coded 數字。

function AnatomyRuler({ segments }) {
  // segments: [{ width, label, color }]，由左到右串成一條 row 上方的比例尺
  return (
    <div style={{ display: 'flex', alignItems: 'stretch', height: 28, marginBottom: 4 }}>
      {segments.map((s, i) => (
        <div key={i} style={{
          width: s.width,
          background: s.color,
          borderLeft: i === 0 ? 'none' : `1px dashed ${TOKENS.ink3}`,
          borderRight: i === segments.length - 1 ? 'none' : 'none',
          display: 'flex', alignItems: 'flex-end', justifyContent: 'center',
          paddingBottom: 2,
        }}>
          <code style={{ fontSize: 8.5, color: TOKENS.ink3, fontVariantNumeric: 'tabular-nums', textAlign: 'center', lineHeight: 1.1 }}>
            {s.label}
          </code>
        </div>
      ))}
    </div>
  );
}

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
  const padShade = 'rgba(124, 92, 255, 0.10)';   // primary 淺
  const gapShade = 'rgba(124, 92, 255, 0.22)';
  const iconShade = 'rgba(60, 60, 67, 0.08)';
  const textShade = 'rgba(60, 60, 67, 0.04)';

  // 對應「有 icon」row 的 ruler segments
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

      {/* ─── 有 icon row ─── */}
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

      {/* ─── 無 icon row ─── */}
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

      {/* ─── divider inset 示意 ─── */}
      <SectionMini style={{ marginTop: 20 }}>Divider inset · 兩種規則</SectionMini>
      <div style={{ width: ROW_W, margin: '0 auto' }}>
        <div style={{ position: 'relative', marginBottom: 16 }}>
          <div style={{ height: 8, background: TOKENS.surface2 }}/>
          <div style={{ position: 'absolute', left: dividerInsetWith, right: 0, top: 8, height: 1, background: TOKENS.ink3 }}/>
          <div style={{ fontSize: 9.5, color: TOKENS.ink3, marginTop: 12, lineHeight: 1.5 }}>
            <strong>有 icon 群組</strong>：<code>DIVIDER_INSET_WITH_ICON = SPACING.lg + ICON_SIZE.sm + SPACING.md = {dividerInsetWith}</code>
          </div>
        </div>
        <div style={{ position: 'relative' }}>
          <div style={{ height: 8, background: TOKENS.surface2 }}/>
          <div style={{ position: 'absolute', left: dividerInsetNo, right: 0, top: 8, height: 1, background: TOKENS.ink3 }}/>
          <div style={{ fontSize: 9.5, color: TOKENS.ink3, marginTop: 12, lineHeight: 1.5 }}>
            <strong>無 icon 群組</strong>：<code>DIVIDER_INSET_WITHOUT_ICON = SPACING.lg = {dividerInsetNo}</code>
          </div>
        </div>
      </div>

      {/* ─── 政策說明 ─── */}
      <div style={{ marginTop: 20, padding: 12, background: TOKENS.surface2, borderRadius: RADIUS.md, fontSize: 11, color: TOKENS.ink2, lineHeight: 1.6 }}>
        <div style={{ marginBottom: 6 }}>· 有 icon vs 無 icon 的 row text baseline <strong>不對齊</strong>；需要對齊請統一帶/不帶 icon。</div>
        <div style={{ marginBottom: 6 }}>· Divider 對齊 row：有 icon 群組 inset {dividerInsetWith}（避開 icon 欄）、無 icon 群組 inset {dividerInsetNo}（齊行末 padding）。</div>
        <div style={{ marginBottom: 6 }}>· <code>GROUP_CARD_MARGIN_BOTTOM = {LIST_TOKENS.GROUP_CARD_MARGIN_BOTTOM}</code> 為刻意離開 SPACING 階梯的孤兒值（section 間呼吸距）。</div>
        <div>· Divider 顏色由 <code>TOKENS.divider.hairline</code> 仲裁（不在 LIST_TOKENS）。</div>
      </div>
    </FoundCard>
  );
}

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

// ─── IconWall / UIGlyphWall ────────────────────────────────
function IconWallCard({ icons }) {
  return (
    <FoundCard>
      <FoundLabel>{`${icons.length} 個 icon · 命名 = IconDefinition.json uniqueName`}</FoundLabel>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8, paddingTop: 8 }}>
        {icons.map(i => (
          <div key={i.id} style={{
            padding: '12px 6px', borderRadius: 8,
            background: TOKENS.surface2,
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6,
          }}>
            <DynamicIconById iconId={i.id} size={ICON_SIZE.md} color={TOKENS.ink}/>
            <code style={{ fontSize: 9.5, color: TOKENS.ink2, textAlign: 'center', wordBreak: 'break-word' }}>{i.uniqueName}</code>
            <code style={{ fontSize: 8, color: TOKENS.ink3 }}>id {i.id}</code>
          </div>
        ))}
      </div>
    </FoundCard>
  );
}

function UIGlyphWallCard() {
  // 仲裁端：impl src/constants/uiGlyphs.ts。本清單以 impl UI_MCI + UI_FA + SF Symbol
  // 三組白名單為權威；impl 端各 screen 不得直接寫字串 literal，必須引用常數。
  // Glyph 渲染為 design canvas 的 best-effort 視覺替身（透過 GLYPH_ALIASES 對應到
  // 自製 SVG），真正視覺以 impl runtime 為準。
  const uiIcons = [
    // SF Symbol（impl 透過 HeaderIconButton / HeaderCheckmarkButton / ModalCloseButton /
    // ListItem ChevronRight 集中管控）
    { name: 'line.3.horizontal.decrease', lib: 'SF' },
    { name: 'magnifyingglass',            lib: 'SF' },
    { name: 'gearshape',                  lib: 'SF' },
    { name: 'arrow.triangle.merge',       lib: 'SF' },
    { name: 'xmark',                      lib: 'SF' },
    { name: 'checkmark',                  lib: 'SF' },
    { name: 'chevron.right',              lib: 'SF' },
    // FA（UI_FA, 9 個）
    { name: 'calendar',                   lib: 'FA' },
    { name: 'check',                      lib: 'FA' },
    { name: 'check-circle',               lib: 'FA' },
    { name: 'chevron-left',               lib: 'FA' },
    { name: 'chevron-right',              lib: 'FA' },
    { name: 'exchange',                   lib: 'FA' },
    { name: 'minus',                      lib: 'FA' },
    { name: 'plus',                       lib: 'FA' },
    { name: 'times',                      lib: 'FA' },
    // MCI（UI_MCI, 31 個）
    { name: 'alert-circle',               lib: 'MCI' },
    { name: 'alert-circle-outline',       lib: 'MCI' },
    { name: 'alert-outline',              lib: 'MCI' },
    { name: 'arrow-right',                lib: 'MCI' },
    { name: 'backspace-outline',          lib: 'MCI' },
    { name: 'bank-outline',               lib: 'MCI' },
    { name: 'bank-transfer',              lib: 'MCI' },
    { name: 'bug-outline',                lib: 'MCI' },
    { name: 'calendar-blank-outline',     lib: 'MCI' },
    { name: 'calendar-clock',             lib: 'MCI' },
    { name: 'chevron-down',               lib: 'MCI' },
    { name: 'chevron-up',                 lib: 'MCI' },
    { name: 'clock-outline',              lib: 'MCI' },
    { name: 'close',                      lib: 'MCI' },
    { name: 'cog-outline',                lib: 'MCI' },
    { name: 'database-cog-outline',       lib: 'MCI' },
    { name: 'database-plus-outline',      lib: 'MCI' },
    { name: 'database-refresh-outline',   lib: 'MCI' },
    { name: 'database-remove-outline',    lib: 'MCI' },
    { name: 'download',                   lib: 'MCI' },
    { name: 'file-document-outline',      lib: 'MCI' },
    { name: 'file-export-outline',        lib: 'MCI' },
    { name: 'file-import-outline',        lib: 'MCI' },
    { name: 'help-circle-outline',        lib: 'MCI' },
    { name: 'magnify',                    lib: 'MCI' },
    { name: 'plus',                       lib: 'MCI' },
    { name: 'repeat',                     lib: 'MCI' },
    { name: 'shield-account-outline',     lib: 'MCI' },
    { name: 'star-outline',               lib: 'MCI' },
    { name: 'swap-horizontal',            lib: 'MCI' },
    { name: 'tag-outline',                lib: 'MCI' },
  ];
  return (
    <FoundCard>
      <FoundLabel>UI Glyphs · impl 白名單（SF 7 / FA 9 / MCI 31 = 47）</FoundLabel>
      <div style={{ fontSize: 11, color: TOKENS.ink3, marginBottom: 12 }}>
        仲裁端：impl <code>src/constants/uiGlyphs.ts</code>（UI_MCI、UI_FA）。
        Glyph 渲染為 design canvas best-effort 替身，真實視覺以 impl runtime 為準。
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8, paddingTop: 8 }}>
        {uiIcons.map(g => (
          <div key={`${g.lib}-${g.name}`} style={{
            padding: '12px 6px', borderRadius: 8,
            background: TOKENS.surface2,
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6,
          }}>
            <Glyph name={g.name} size={22} color={TOKENS.ink} stroke={1.8}/>
            <code style={{ fontSize: 9.5, color: TOKENS.ink2, textAlign: 'center', wordBreak: 'break-word' }}>{g.name}</code>
            <code style={{ fontSize: 8, color: TOKENS.ink3 }}>{g.lib}</code>
          </div>
        ))}
      </div>
    </FoundCard>
  );
}

// ─── GlassDemoCard ────────────────────────────────────────
function GlassDemoCard() {
  return (
    <FoundCard style={{ background: 'linear-gradient(135deg, #4323a0, #c0b6df)' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <GlassView pill style={{ display: 'inline-flex', padding: '12px 20px', alignItems: 'center', gap: 8, alignSelf: 'flex-start' }}>
          <Glyph name="magnifyingglass" size={ICON_SIZE.xs} color={TOKENS.ink} stroke={2}/>
          <span style={{ color: TOKENS.ink, fontWeight: 500 }}>GlassView pill</span>
        </GlassView>
        <GlassView style={{ padding: 16, borderRadius: RADIUS.lg }}>
          <div style={{ fontSize: 12, color: TOKENS.ink, fontWeight: 500 }}>GLASS token</div>
          <div style={{ fontSize: 11, color: TOKENS.ink2, marginTop: 6, fontVariantNumeric: 'tabular-nums', lineHeight: 1.7 }}>
            blurAmount: {GLASS.blurAmount}<br/>
            tint: {GLASS.tint}<br/>
            border: {GLASS.border}<br/>
            shadowOpacity: {GLASS.shadowOpacity}
          </div>
        </GlassView>
      </div>
    </FoundCard>
  );
}

// ─── Shared layout ─────────────────────────────────────────
function FoundCard({ children, style }) {
  return (
    <div style={{
      width: '100%', height: '100%', padding: '24px 24px',
      background: '#fff', overflow: 'auto',
      fontFamily: '-apple-system, "SF Pro Text", "PingFang TC", "Noto Sans TC", system-ui, sans-serif',
      color: TOKENS.ink, ...(style || {}),
    }}>{children}</div>
  );
}
function FoundLabel({ children, style }) {
  return (
    <div style={{
      fontSize: 11, fontWeight: 600, letterSpacing: 1, color: TOKENS.p500,
      textTransform: 'uppercase', marginBottom: 10, ...(style || {}),
    }}>{children}</div>
  );
}

Object.assign(window, {
  FoundationsTypeSection,
  FoundationsColorsSection,
  FoundationsTokensSection,
  FoundationsBrandSection,
  GlassDemoCard,
  // 以下 helpers 與 token description tables 供 components-showcase.jsx
  // 內的元件 token 表 artboard 使用
  TokenTableCard,
  ListAnatomyCard,
  FormPickerAnatomyCard,
  LIST_TOKEN_DESC,
  FORM_PICKER_TOKEN_DESC,
  TX_LIST_TOKEN_DESC,
  SEARCH_BAR_TOKEN_DESC,
  LIST_EMPTY_TRANSITION_DESC,
  SWITCH_TOKEN_DESC,
  CHIP_TOKEN_DESC,
  HEADER_ICON_BUTTON_TOKEN_DESC,
  LIST_TOKEN_SOURCE,
  FORM_PICKER_TOKEN_SOURCE,
  TX_LIST_TOKEN_SOURCE,
  SEARCH_BAR_TOKEN_SOURCE,
  LIST_EMPTY_TRANSITION_SOURCE,
  SWITCH_TOKEN_SOURCE,
  CHIP_TOKEN_SOURCE,
  HEADER_ICON_BUTTON_TOKEN_SOURCE,
});
