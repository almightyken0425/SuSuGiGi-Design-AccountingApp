// ─────────────────────────────────────────────────────────────
// PaywallScreen sub-sections · 私有 sub-section 元件 + design canvas 預覽資料
//
// 鏡射 impl src/screens/Paywall/PaywallScreen.tsx：
//   PaywallPlanOption / PaywallBenefitList
//
// impl 端從 RevenueCat 取 IAP products，design canvas inline mock 月費 / 年費。
// ─────────────────────────────────────────────────────────────

const PAYWALL_BENEFITS = [
  '帳戶與類別無上限',
  '外幣帳戶與匯率',
  '定期交易排程',
  '多裝置同步',
];

const PAYWALL_OPTIONS = [
  { id: 'yearly',  title: '年費方案', price: 'NT$ 999 / 年',  badge: '省 30%' },
  { id: 'monthly', title: '月費方案', price: 'NT$ 120 / 月',  badge: null },
];

// ─── PaywallBenefitList ─── 福利點列
function PaywallBenefitList() {
  const T = PAYWALL_SCREEN_TOKENS;
  return (
    <div style={{
      alignSelf: 'stretch',
      marginBottom: T.BENEFITS_BOTTOM_MARGIN,
      textAlign: 'center',
    }}>
      {PAYWALL_BENEFITS.map(b => (
        <div key={b} style={{
          fontSize: T.BENEFIT_FONT_SIZE,
          color: TOKENS.ink,
          marginBottom: T.BENEFIT_GAP,
        }}>{b}</div>
      ))}
    </div>
  );
}

// ─── PaywallPlanOption ─── 單個方案選項（含 radio + price）
function PaywallPlanOption({ option, selected }) {
  const T = PAYWALL_SCREEN_TOKENS;
  return (
    <div style={{
      display: 'flex', flexDirection: 'row',
      justifyContent: 'space-between', alignItems: 'center',
      padding: T.OPTION_PADDING,
      borderRadius: T.OPTION_RADIUS,
      borderWidth: 1, borderStyle: 'solid',
      borderColor: selected ? TOKENS.p500 : TOKENS.hairline,
      background: selected ? THEME_1.state.selected.bg : TOKENS.surface,   // 對齊 impl theme.state.selected.bg（p50 純色）
      marginBottom: T.OPTION_GAP,
    }}>
      <div style={{ flex: 1 }}>
        <div style={{
          display: 'flex', alignItems: 'center', gap: SPACING.sm,
        }}>
          <span style={{
            fontSize: T.OPTION_TITLE_FONT_SIZE,
            fontWeight: TYPOGRAPHY.weight.medium,
            color: selected ? TOKENS.p600 : TOKENS.ink,
          }}>{option.title}</span>
          {option.badge && (
            <span style={{
              fontSize: TYPOGRAPHY.size.xs,
              color: TOKENS.success,
              fontWeight: TYPOGRAPHY.weight.medium,
            }}>{option.badge}</span>
          )}
        </div>
        <div style={{
          fontSize: T.OPTION_PRICE_FONT_SIZE,
          color: selected ? TOKENS.p600 : TOKENS.ink2,
          marginTop: SPACING['2xs'],
        }}>{option.price}</div>
      </div>
      <div style={{
        width: T.RADIO_SIZE, height: T.RADIO_SIZE,
        borderRadius: T.RADIO_SIZE / 2,
        borderWidth: T.RADIO_BORDER_WIDTH, borderStyle: 'solid',
        borderColor: selected ? TOKENS.p500 : TOKENS.ink3,
        background: selected ? TOKENS.p500 : 'transparent',
      }}/>
    </div>
  );
}

// ─── PaywallDisclosure ─── 自動續訂條款揭露 Apple 3.1.2
function PaywallDisclosure() {
  const T = PAYWALL_SCREEN_TOKENS;
  return (
    <div style={{
      fontSize: T.DISCLOSURE_FONT_SIZE,
      color: TOKENS.ink3,
      lineHeight: 1.4,
      textAlign: 'center',
      paddingLeft: SPACING.md, paddingRight: SPACING.md,
      marginBottom: T.DISCLOSURE_BOTTOM_MARGIN,
    }}>訂閱於到期前自動續訂，可隨時取消。款項於確認購買時向 Apple ID 帳戶收取。</div>
  );
}

// ─── PaywallLegalLinks ─── 使用條款 · 隱私政策連結
function PaywallLegalLinks() {
  const T = PAYWALL_SCREEN_TOKENS;
  return (
    <div style={{
      fontSize: T.LEGAL_FONT_SIZE,
      color: TOKENS.ink2,
      textAlign: 'center',
      marginTop: SPACING.sm,
    }}>
      <span style={{ textDecoration: 'underline' }}>使用條款</span>
      <span> · </span>
      <span style={{ textDecoration: 'underline' }}>隱私政策</span>
    </div>
  );
}

Object.assign(window, { PAYWALL_BENEFITS, PAYWALL_OPTIONS, PaywallBenefitList, PaywallPlanOption, PaywallDisclosure, PaywallLegalLinks });
