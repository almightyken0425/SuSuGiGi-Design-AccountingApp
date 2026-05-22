// ─────────────────────────────────────────────────────────────
// Foundations > Component Tokens > Header Icon Button · HEADER_ICON_BUTTON_TOKENS visualizer
// ─────────────────────────────────────────────────────────────

const HEADER_ICON_BUTTON_TOKEN_DESC = {
  CONTENT_BOX:       'pill 正方形邊長（symbol + 上下左右 padding）。自帶 borderRadius，不依賴 UIKit auto-hug',
  BORDER_RADIUS:     'pill 圓角半徑 = CONTENT_BOX / 2，使 41×41 容器渲染為正圓',
  SYMBOL_SIZE:       'SF Symbol point size，對齊 iOS bar button 慣用 body 級',
  MULTI_ICON_GAP:    '多 icon header 內 button 之間的水平 gap（impl 端用 react-navigation type:spacing item）',
  HIT_TARGET_EXPAND: 'hitSlop 各方向外擴量。視覺維持 41×41 pill，實際可點區擴至 44×44 達 HIG 標準；對齊 Apple UIBarButtonItem「視覺小、hit 大」慣例',
  PRESS_ANIMATION:   '按壓回饋：scale 縮放比例 + duration + easing。HeaderButton 三 variant + 覆寫返回鍵統一套用',
  COLOR_BY_INTENT:   '依按鈕語意分派 icon 顏色；本波三 intent 統一 ink 黑灰（impl 端 theme.text.primary，對齊 iOS UIColor.label 視覺，與 header title 同色）。保留 map 結構以便未來分化（如 destructive 改紅）；disabled 一律覆寫為 ink3',
  HAPTIC_BY_INTENT:  '依按鈕語意分派 expo-haptics ImpactFeedbackStyle：commit 有後果（medium）、action 與 dismiss 無破壞性（light）',
};

const HEADER_ICON_BUTTON_TOKEN_SOURCE = {
  CONTENT_BOX:       'TYPE_STYLES.body.size + SPACING.md * 2',
  BORDER_RADIUS:     'CONTENT_BOX / 2',
  SYMBOL_SIZE:       'TYPE_STYLES.body.size',
  MULTI_ICON_GAP:    'SPACING.sm',
  HIT_TARGET_EXPAND: '(HIT_TARGET.min - CONTENT_BOX) / 2',
  PRESS_ANIMATION:   '{ scale: 0.97, duration: MOTION.duration.instant, easing: MOTION.easing.standard }',
  COLOR_BY_INTENT:   '{ commit: TOKENS.ink, action: TOKENS.ink, dismiss: TOKENS.ink }',
  HAPTIC_BY_INTENT:  '{ commit: impactMedium, action: impactLight, dismiss: impactLight }',
};

// design canvas mock 顏色，對齊 components.jsx HeaderButtonPill 的 HEADER_BUTTON_MOCK_BG。
// iOS 26 navigation bar systemFill 淡灰半透明近似值，非設計 token。
const HEADER_BTN_MOCK_BG = 'rgba(118,118,128,0.12)';

// ─── Hit area 視覺化 ─────────────────────────────────────────
function HeaderIconBtnHitAreaCard() {
  const cb = HEADER_ICON_BUTTON_TOKENS.CONTENT_BOX;       // 41
  const expand = HEADER_ICON_BUTTON_TOKENS.HIT_TARGET_EXPAND; // 1.5
  const hit = cb + expand * 2;                             // 44
  return (
    <FoundCard>
      <FoundLabel>HIT AREA · 視覺 vs 可點</FoundLabel>
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '24px 16px', gap: 32, minHeight: 120,
      }}>
        <div style={{ position: 'relative', width: hit, height: hit, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{
            position: 'absolute', inset: 0,
            border: `1px dashed ${TOKENS.p500}`, borderRadius: '50%',
            background: `${TOKENS.p500}14`,
          }}/>
          <div style={{
            width: cb, height: cb, borderRadius: '50%',
            background: HEADER_BTN_MOCK_BG,
            backdropFilter: 'blur(20px) saturate(180%)',
            WebkitBackdropFilter: 'blur(20px) saturate(180%)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <Glyph name="checkmark" size={HEADER_ICON_BUTTON_TOKENS.SYMBOL_SIZE} color={HEADER_ICON_BUTTON_TOKENS.COLOR_BY_INTENT.commit} stroke={2.4}/>
          </div>
        </div>
        <div style={{ fontSize: 11, color: TOKENS.ink2, lineHeight: 1.6 }}>
          <div><strong style={{ color: TOKENS.ink }}>實心 pill</strong> = 視覺 {cb}×{cb}（CONTENT_BOX）</div>
          <div><strong style={{ color: TOKENS.p500 }}>虛線外圈</strong> = 可點 {hit}×{hit}（CONTENT_BOX + 2 × HIT_TARGET_EXPAND）</div>
          <div style={{ marginTop: 8, fontSize: 10.5, color: TOKENS.ink3 }}>外擴 {expand}pt 達 HIG 44 標準；視覺維持 pill 對稱不變大</div>
        </div>
      </div>
    </FoundCard>
  );
}

// ─── 按壓動畫展示 ────────────────────────────────────────────
function HeaderIconBtnPressAnimationCard() {
  const cb = HEADER_ICON_BUTTON_TOKENS.CONTENT_BOX;
  const anim = HEADER_ICON_BUTTON_TOKENS.PRESS_ANIMATION;
  function Pill({ scaled, label }) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
        <div style={{
          width: cb, height: cb, borderRadius: '50%',
          background: HEADER_BTN_MOCK_BG,
          backdropFilter: 'blur(20px) saturate(180%)',
          WebkitBackdropFilter: 'blur(20px) saturate(180%)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          transform: scaled ? `scale(${anim.scale})` : 'scale(1)',
          transition: `transform ${anim.duration}ms ${anim.easing}`,
        }}>
          <Glyph name="checkmark" size={HEADER_ICON_BUTTON_TOKENS.SYMBOL_SIZE} color={HEADER_ICON_BUTTON_TOKENS.COLOR_BY_INTENT.commit} stroke={2.4}/>
        </div>
        <div style={{ fontSize: 10, color: TOKENS.ink3, letterSpacing: 0.3 }}>{label}</div>
      </div>
    );
  }
  return (
    <FoundCard>
      <FoundLabel>PRESS ANIMATION · scale {anim.scale} · {anim.duration}ms</FoundLabel>
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '24px 16px', gap: 48, minHeight: 120,
      }}>
        <Pill scaled={false} label="REST"/>
        <div style={{ fontSize: 18, color: TOKENS.ink3 }}>→</div>
        <Pill scaled={true} label={`ACTIVE · scale ${anim.scale}`}/>
      </div>
      <div style={{ fontSize: 10.5, color: TOKENS.ink3, textAlign: 'center', marginTop: -8 }}>
        HeaderButton 三 variant 統一套用；haptic 由 HAPTIC_BY_INTENT 分派
      </div>
    </FoundCard>
  );
}

// ─── Intent 矩陣 · color + haptic + icon 範例 ────────────────
function HeaderIconBtnIntentMatrixCard() {
  const rows = [
    { intent: 'commit',  icon: 'checkmark',          users: 'HeaderButton variant="checkmark"' },
    { intent: 'action',  icon: 'magnifyingglass',    users: 'HeaderButton variant="icon"（search / settings / filter / merge / 返回鍵）' },
    { intent: 'dismiss', icon: 'xmark',              users: 'HeaderButton variant="close"' },
  ];
  const cb = HEADER_ICON_BUTTON_TOKENS.CONTENT_BOX;
  const cellStyle = { fontSize: 11, color: TOKENS.ink2, lineHeight: 1.6, padding: '6px 8px' };
  const headerCellStyle = { fontSize: 9.5, color: TOKENS.ink3, letterSpacing: 0.3, padding: '4px 8px', textTransform: 'uppercase' };
  return (
    <FoundCard>
      <FoundLabel>INTENT MATRIX · 單一 intent 同時驅動 color + haptic</FoundLabel>
      <div style={{ display: 'grid', gridTemplateColumns: 'auto auto auto auto 1fr', alignItems: 'center', rowGap: 4 }}>
        <code style={headerCellStyle}>INTENT</code>
        <code style={headerCellStyle}>SAMPLE</code>
        <code style={headerCellStyle}>COLOR</code>
        <code style={headerCellStyle}>HAPTIC</code>
        <code style={headerCellStyle}>用在</code>
        {rows.map(r => (
          <React.Fragment key={r.intent}>
            <code style={{ ...cellStyle, color: TOKENS.ink, fontWeight: 600 }}>{r.intent}</code>
            <div style={{ padding: '6px 8px', display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }}>
              <div style={{
                width: cb, height: cb, borderRadius: '50%',
                background: HEADER_BTN_MOCK_BG,
                backdropFilter: 'blur(20px) saturate(180%)',
                WebkitBackdropFilter: 'blur(20px) saturate(180%)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <Glyph name={r.icon} size={HEADER_ICON_BUTTON_TOKENS.SYMBOL_SIZE} color={HEADER_ICON_BUTTON_TOKENS.COLOR_BY_INTENT[r.intent]} stroke={2.4}/>
              </div>
            </div>
            <div style={{ padding: '6px 8px', display: 'flex', alignItems: 'center', gap: 6 }}>
              <div style={{
                width: 16, height: 16, borderRadius: 4,
                background: HEADER_ICON_BUTTON_TOKENS.COLOR_BY_INTENT[r.intent],
                border: `1px solid ${TOKENS.hairline}`,
              }}/>
              <code style={{ fontSize: 10, color: TOKENS.ink2 }}>ink</code>
            </div>
            <code style={{ ...cellStyle, fontSize: 10.5 }}>{HEADER_ICON_BUTTON_TOKENS.HAPTIC_BY_INTENT[r.intent]}</code>
            <span style={{ ...cellStyle, fontSize: 10.5 }}>{r.users}</span>
          </React.Fragment>
        ))}
      </div>
      <div style={{ fontSize: 10.5, color: TOKENS.ink3, marginTop: 12, paddingLeft: 8 }}>
        impl 端三個 button 元件用同一個 <code style={{ fontSize: 10, color: TOKENS.ink2 }}>intent</code> prop 同時驅動 color + haptic，呼叫端只需指定語意、不直接傳顏色或 haptic 類型。
      </div>
    </FoundCard>
  );
}

function FoundationsCTHeaderIconButtonSection() {
  return (
    <DCSection
      id="found-ct-header-icon-button"
      title="Component Tokens · Header Icon Button"
      subtitle="Navigation header 上 icon-only 動作鍵。impl 端已下放 react-navigation 7 + UIKit（unstable_headerLeftItems / RightItems + type:'button' + SF Symbol icon-only），由 UIKit 接管尺寸 / 圓角 / 背景 / press 動畫 / Liquid Glass shared background pill / haptic。本 token 群保留為 design canvas mock 視覺校準參考，impl 不消費。"
    >
      <DCFamily id="header-icon-button-tokens-family" title="Tokens" subtitle="HEADER_ICON_BUTTON_TOKENS 完整表格（含 hit area 外擴、按壓動畫、haptic 對應）。">
        <DCArtboard id="header-icon-button-tokens" label="HEADER_ICON_BUTTON_TOKENS · Navigation header icon-only 鍵" width="auto" height="auto">
          <TokenTableCard tokens={HEADER_ICON_BUTTON_TOKENS} title="HEADER_ICON_BUTTON_TOKENS" descriptions={HEADER_ICON_BUTTON_TOKEN_DESC} sources={HEADER_ICON_BUTTON_TOKEN_SOURCE}/>
        </DCArtboard>
      </DCFamily>

      <DCFamily id="header-icon-button-interaction-family" title="Interaction Details" subtitle="hit area 外擴、按壓動畫視覺化，HeaderButton 三 variant 統一套用。">
        <DCArtboard id="header-icon-button-hit-area" label="Hit area · 視覺 41 / 可點 44" width={420} height={200}>
          <HeaderIconBtnHitAreaCard/>
        </DCArtboard>
        <DCArtboard id="header-icon-button-press-animation" label="Press animation · scale 0.97 / 100ms" width={420} height={200}>
          <HeaderIconBtnPressAnimationCard/>
        </DCArtboard>
      </DCFamily>

      <DCFamily id="header-icon-button-intent-family" title="Intent System" subtitle="commit / action / dismiss 三種 intent，單一 prop 同時驅動 icon 顏色與 haptic 強度。">
        <DCArtboard id="header-icon-button-intent-matrix" label="Intent matrix · color + haptic 對應" width={640} height={240}>
          <HeaderIconBtnIntentMatrixCard/>
        </DCArtboard>
      </DCFamily>
    </DCSection>
  );
}

Object.assign(window, {
  HEADER_ICON_BUTTON_TOKEN_DESC, HEADER_ICON_BUTTON_TOKEN_SOURCE,
  HeaderIconBtnHitAreaCard, HeaderIconBtnPressAnimationCard, HeaderIconBtnIntentMatrixCard,
  FoundationsCTHeaderIconButtonSection,
});
