// ─────────────────────────────────────────────────────────────
// Foundations > Atomic > Colors · 顏色系統視覺化
//
// 10 張卡片：THEME_1 / THEME_2 palette / Neutrals / Semantic / Surfaces /
// Dividers / States / Scrim / WarningCallout / GlassDemo。
// ─────────────────────────────────────────────────────────────

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

function FoundationsAtomicColorsSection() {
  return (
    <DCSection
      id="found-atomic-colors"
      title="Atomic · Colors"
      subtitle="Classic Purple（預設）+ Ocean Teal（opt-in），共用 neutral 與 status 色階。所有色彩讀 no1_atomic_tokens.jsx 的 PALETTE / THEMES 即時繪製。"
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
      <DCArtboard id="glass-demo-live" label="GLASS · pill / rounded (live)" width={520} height={420}>
        <GlassDemoCard/>
      </DCArtboard>
    </DCSection>
  );
}

Object.assign(window, {
  PaletteCard, NeutralsCard, SemanticCard, SurfacesCard, DividersCard,
  StatesCard, ScrimCard, WarningCalloutCard, GlassDemoCard,
  FoundationsAtomicColorsSection,
});
