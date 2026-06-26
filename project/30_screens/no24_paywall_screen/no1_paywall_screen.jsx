// ─────────────────────────────────────────────────────────────
// PaywallScreen · 對齊 impl src/screens/Paywall/PaywallScreen.tsx
//
// Modal info screen（headerLeft 為 close button，無 save）。
// 結構：Hero 漸層卡 / 2 欄 benefit 功能卡 / 月費·年費 segmented + 大字價格 /
//       CTA「立即升級」/ restore link / legal links。
// 漸層 p500→p700、icon chip p50、success badge 全走 token，相容雙主題。
//
// Variants：
//   default     — 已選年費（impl 端 yearly default selected）
//   monthly     — 已選月費
//   processing  — 購買處理中（CTA 內 spinner、降透明度）
// ─────────────────────────────────────────────────────────────

function PaywallScreen({ variant = 'default' }) {
  const T = PAYWALL_SCREEN_TOKENS;
  const processing = variant === 'processing';
  const selectedId = variant === 'monthly' ? 'monthly' : 'yearly';

  return (
    <div style={{
      position: 'relative',
      height: '100%',
      display: 'flex', flexDirection: 'column',
      gap: T.SCREEN_GAP,
      background: TOKENS.bg,
      paddingTop: T.SCREEN_PADDING_TOP,
      paddingBottom: T.SCREEN_PADDING_BOTTOM,
      paddingLeft: T.SCREEN_PADDING_X,
      paddingRight: T.SCREEN_PADDING_X,
      boxSizing: 'border-box',
    }}>
      <PaywallHero/>
      <PaywallBenefitGrid/>
      <PaywallPlanCard selectedId={selectedId}/>
      <div style={{ display: 'flex', flexDirection: 'column', gap: SPACING.md }}>
        <PaywallCta processing={processing}/>
        <PaywallBottomLinks/>
      </div>
    </div>
  );
}

Object.assign(window, { PaywallScreen });
