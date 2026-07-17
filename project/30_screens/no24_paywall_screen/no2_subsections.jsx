// ─────────────────────────────────────────────────────────────
// PaywallScreen sub-sections · 私有 sub-section 元件 + design canvas 預覽資料
//
// 鏡射 impl src/screens/Paywall/PaywallScreen.tsx：
//   PaywallHero / PaywallBenefitGrid / PaywallPlanCard / PaywallCta /
//   PaywallRenewalNote / PaywallBottomLinks
//
// impl 端從 react-native-iap 取 IAP products，design canvas inline mock 月費 / 年費。
// 圖示沿用既有 glyph registry：類別 tag-outline、帳戶 bank-outline、hero sparkle star-outline。
// ─────────────────────────────────────────────────────────────

// 功能卡 mock：副標的免費版上限對齊 impl limits.ts（MAX_FREE_CATEGORIES=7 / MAX_FREE_ACCOUNTS=3）。
const PAYWALL_FEATURES = [
  { id: 'categories', glyph: 'tag-outline',  title: '無限類別', sub: '突破免費版 7 類別上限' },
  { id: 'accounts',   glyph: 'bank-outline', title: '無限帳戶', sub: '突破免費版 3 帳戶上限' },
];

// 方案 mock：impl 端價格由 IAP 在地化字串提供，每月均價 = 年費 ÷ 12 經 formatCurrencyValue 推導。
// disclosure 為自動續訂揭露動態句（期長＋每期價格，App Review 要求進 binary），跟著選中方案切換；
// 收款與取消方式為靜態句，兩方案共用、獨立於方案表。
const PAYWALL_PLANS = {
  yearly:  { price: 'NT$480', suffix: '/ 年', save: '省 33%', hint: '約 NT$40／月，可隨時取消',
             disclosure: '年費訂閱每年 NT$480 自動續訂，直到取消。' },
  monthly: { price: 'NT$60',  suffix: '/ 月', save: null,     hint: '可隨時取消',
             disclosure: '月費訂閱每月 NT$60 自動續訂，直到取消。' },
};
const PAYWALL_DISCLOSURE_PAYMENT = '款項向 Apple 帳戶收取，可隨時於 App Store 取消。';

// ─── PaywallHero ─── 漸層強調卡（sparkle + 大標）
// 頁面唯一 flex 彈性區：吸收剩餘高度、內容多時自動縮，保底 HERO_MIN_HEIGHT。
function PaywallHero() {
  const T = PAYWALL_SCREEN_TOKENS;
  return (
    <div style={{
      flex: 1,
      minHeight: T.HERO_MIN_HEIGHT,
      position: 'relative', overflow: 'hidden',
      borderRadius: T.HERO_RADIUS,
      paddingTop: T.HERO_PADDING_Y, paddingBottom: T.HERO_PADDING_Y,
      paddingLeft: T.HERO_PADDING_X, paddingRight: T.HERO_PADDING_X,
      background: `linear-gradient(155deg, ${TOKENS.p500} 0%, ${TOKENS.p700} 100%)`,
      boxShadow: `0 14px 34px ${TOKENS.p700}52`,   // 漸層深色投影（α≈0.32）
      display: 'flex', alignItems: 'center', justifyContent: 'center',
    }}>
      <div style={{
        fontSize: T.HERO_TITLE_SIZE,
        fontWeight: TYPOGRAPHY.weight.medium,
        color: TOKENS.surface,
        lineHeight: 1.2,
        textAlign: 'center',
      }}>突破限制</div>
    </div>
  );
}

// ─── PaywallFeatureCard ─── 單張功能卡（icon chip + 標題 + 副標）
function PaywallFeatureCard({ feature }) {
  const T = PAYWALL_SCREEN_TOKENS;
  return (
    <div style={{
      flex: 1,
      background: TOKENS.surface,
      borderRadius: T.CARD_RADIUS,
      padding: T.CARD_PADDING,
      boxShadow: `0 1px 2px ${TOKENS.ink}0d`,   // 極淡卡片投影（α≈0.05）
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center',
    }}>
      <div style={{
        width: T.CHIP_SIZE, height: T.CHIP_SIZE,
        borderRadius: T.CHIP_RADIUS,
        background: TOKENS.p50,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        marginBottom: T.CHIP_BOTTOM_MARGIN,
      }}>
        <Glyph name={feature.glyph} size={T.CHIP_ICON_SIZE} color={TOKENS.p500} stroke={1.6}/>
      </div>
      <div style={{
        fontSize: T.CARD_TITLE_SIZE,
        fontWeight: TYPOGRAPHY.weight.medium,
        color: TOKENS.ink,
        lineHeight: 1.3,
      }}>{feature.title}</div>
      <div style={{
        fontSize: T.CARD_SUB_SIZE,
        color: TOKENS.ink2,
        marginTop: T.CARD_SUB_TOP_MARGIN,
        lineHeight: 1.4,
      }}>{feature.sub}</div>
    </div>
  );
}

// ─── PaywallBenefitGrid ─── 2 欄功能卡；自然高（內容決定），不參與頁面剩餘高度分配
function PaywallBenefitGrid() {
  const T = PAYWALL_SCREEN_TOKENS;
  return (
    <div style={{ display: 'flex', flexDirection: 'row', gap: T.GRID_GAP }}>
      {PAYWALL_FEATURES.map(f => <PaywallFeatureCard key={f.id} feature={f}/>)}
    </div>
  );
}

// ─── PaywallPlanCard ─── segmented（月費/年費）+ 大字價格 + 每月均價 hint；自然高同 grid
function PaywallPlanCard({ selectedId = 'yearly' }) {
  const T = PAYWALL_SCREEN_TOKENS;
  const plan = PAYWALL_PLANS[selectedId];
  const segItem = (id, label, badge) => {
    const on = id === selectedId;
    return (
      <div style={{
        flex: 1,
        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: SPACING.xs,
        padding: T.SEG_PADDING,
        borderRadius: T.SEG_INNER_RADIUS,
        background: on ? TOKENS.surface : 'transparent',
        boxShadow: on ? `0 1px 2px ${TOKENS.ink}14` : 'none',   // 選中浮起（α≈0.08）
        fontSize: T.SEG_FONT_SIZE,
        fontWeight: TYPOGRAPHY.weight.medium,
        color: on ? TOKENS.p500 : TOKENS.ink2,
        whiteSpace: 'nowrap',
      }}>
        {label}
        {badge && <span style={{ fontSize: TYPOGRAPHY.size['2xs'], color: TOKENS.success }}>{badge}</span>}
      </div>
    );
  };
  return (
    <div style={{
      display: 'flex', flexDirection: 'column', justifyContent: 'center',
      background: TOKENS.surface,
      borderRadius: T.PLAN_RADIUS,
      padding: T.PLAN_PADDING,
      boxShadow: `0 1px 2px ${TOKENS.ink}0d`,
    }}>
      <div style={{
        display: 'flex',
        background: TOKENS.surface2,
        borderRadius: T.SEG_RADIUS,
        padding: SPACING.xs,
        marginBottom: T.SEG_BOTTOM_MARGIN,
      }}>
        {segItem('monthly', '月費', null)}
        {segItem('yearly', '年費', PAYWALL_PLANS.yearly.save)}
      </div>
      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'center', gap: SPACING['2xs'] }}>
        <span style={{ fontSize: T.PRICE_SIZE, fontWeight: TYPOGRAPHY.weight.medium, color: TOKENS.ink, lineHeight: 1 }}>{plan.price}</span>
        <span style={{ fontSize: T.PRICE_SUFFIX_SIZE, color: TOKENS.ink2 }}>{plan.suffix}</span>
      </div>
      <div style={{
        textAlign: 'center',
        fontSize: T.PRICE_HINT_SIZE,
        color: TOKENS.ink2,
        marginTop: T.PRICE_HINT_TOP_MARGIN,
      }}>{plan.hint}</div>
    </div>
  );
}

// ─── PaywallCta ─── 主行動按鈕；緊接 plan card（不沉底）
function PaywallCta({ processing = false }) {
  const T = PAYWALL_SCREEN_TOKENS;
  return (
    <div style={{
      background: TOKENS.p500,
      opacity: processing ? 0.6 : 1,
      height: T.CTA_HEIGHT,
      borderRadius: T.CTA_RADIUS,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      boxShadow: `0 8px 20px ${TOKENS.p500}52`,
    }}>
      {processing
        ? <Spinner size={ICON_SIZE.md} color={TOKENS.surface}/>
        : <span style={{ color: TOKENS.surface, fontSize: T.CTA_FONT_SIZE, fontWeight: TYPOGRAPHY.weight.medium }}>立即升級</span>}
    </div>
  );
}

// ─── PaywallRenewalNote ─── 自動續訂揭露 fine-print；緊接 CTA 下方、鋪在 restore link 之上。
// 兩段結構：動態句（跟方案）在上、靜態句（收款＋取消）在下，各自獨立折行。
function PaywallRenewalNote({ selectedId = 'yearly' }) {
  const T = PAYWALL_SCREEN_TOKENS;
  const line = {
    fontSize: T.DISCLOSURE_SIZE,
    lineHeight: T.DISCLOSURE_LINE_HEIGHT,
    color: TOKENS.inkTertiary,
    textAlign: 'center',
  };
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: T.DISCLOSURE_LINE_GAP }}>
      <div style={line}>{PAYWALL_PLANS[selectedId].disclosure}</div>
      <div style={line}>{PAYWALL_DISCLOSURE_PAYMENT}</div>
    </div>
  );
}

// ─── PaywallBottomLinks ─── restore + legal fine-print；marginTop:auto 沉底
function PaywallBottomLinks() {
  const T = PAYWALL_SCREEN_TOKENS;
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: SPACING.md }}>
      <span style={{ fontSize: T.RESTORE_SIZE, color: TOKENS.p500 }}>還原購買</span>
      <div style={{ display: 'flex', alignItems: 'center', gap: SPACING.sm, fontSize: T.LEGAL_SIZE, color: TOKENS.inkTertiary }}>
        <span style={{ textDecoration: 'underline' }}>使用條款</span>
        <span>·</span>
        <span style={{ textDecoration: 'underline' }}>隱私政策</span>
      </div>
    </div>
  );
}

Object.assign(window, { PAYWALL_FEATURES, PAYWALL_PLANS, PAYWALL_DISCLOSURE_PAYMENT, PaywallHero, PaywallFeatureCard, PaywallBenefitGrid, PaywallPlanCard, PaywallCta, PaywallRenewalNote, PaywallBottomLinks });
