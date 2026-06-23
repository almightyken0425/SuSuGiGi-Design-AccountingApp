// ─────────────────────────────────────────────────────────────
// PaywallScreen · 對齊 impl src/screens/Paywall/PaywallScreen.tsx
//
// Modal info screen（headerLeft 為 close button，無 save）。
// 結構：Title / 1 個 benefit 點列 / Yearly + Monthly 選項 / CTA / Restore link / Close link。
//
// Variants：
//   default  — 已選年費（impl 端 yearly default selected）
//   monthly  — 已選月費
// ─────────────────────────────────────────────────────────────

function PaywallScreen({ variant = 'default' }) {
  const T = PAYWALL_SCREEN_TOKENS;
  const processing = variant === 'processing';
  const selectedId = variant === 'monthly' ? 'monthly' : 'yearly';

  return (
    <div style={{
      padding: T.SCREEN_PADDING,
      background: TOKENS.bg,
      minHeight: '100%',
      display: 'flex', flexDirection: 'column',
      justifyContent: 'center', alignItems: 'center',
    }}>
      <PaywallBenefitList/>

      <div style={{ width: '100%', marginBottom: T.OPTIONS_BOTTOM_MARGIN }}>
        {PAYWALL_OPTIONS.map(opt => (
          <PaywallPlanOption key={opt.id} option={opt} selected={opt.id === selectedId}/>
        ))}
      </div>

      <div style={{
        background: TOKENS.p500,
        opacity: processing ? 0.6 : 1,
        padding: T.CTA_PADDING,
        borderRadius: T.CTA_RADIUS,
        width: T.CTA_WIDTH_PCT,
        display: 'flex', justifyContent: 'center', alignItems: 'center',
        marginBottom: T.CTA_BOTTOM_MARGIN,
      }}>
        {processing
          ? <Spinner size={ICON_SIZE.md} color={TOKENS.surface}/>
          : <span style={{
              color: TOKENS.surface,
              fontSize: T.CTA_FONT_SIZE,
              fontWeight: TYPOGRAPHY.weight.medium,
            }}>立即升級</span>}
      </div>

      <PaywallDisclosure/>

      <div style={{
        padding: T.AUX_BUTTON_PADDING,
        color: TOKENS.ink2,
        textDecoration: 'underline',
      }}>還原購買</div>

      <PaywallLegalLinks/>

      <div style={{
        marginTop: SPACING.sm,
        padding: T.AUX_BUTTON_PADDING,
        color: TOKENS.ink2,
      }}>暫不升級</div>
    </div>
  );
}

Object.assign(window, { PaywallScreen });
