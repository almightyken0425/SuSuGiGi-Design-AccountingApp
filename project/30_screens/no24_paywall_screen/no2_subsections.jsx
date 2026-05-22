// ─────────────────────────────────────────────────────────────
// PaywallScreen sub-sections · 私有 sub-section 元件 + design canvas 預覽資料
//
// 鏡射 impl src/screens/Paywall/PaywallScreen.tsx：
//   PaywallPlanOption / PaywallBenefitList
//
// impl 端從 RevenueCat 取 IAP products，design canvas inline mock 月費 / 年費。
// ─────────────────────────────────────────────────────────────

const PAYWALL_BENEFITS = [
  '無限制建立帳戶與分類',
  '雲端備份與多裝置同步',
  '進階匯出與報表分析',
  '優先客服與功能搶先體驗',
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
      marginLeft: T.BENEFITS_LEFT_INDENT,
      marginBottom: T.BENEFITS_BOTTOM_MARGIN,
    }}>
      {PAYWALL_BENEFITS.map(b => (
        <div key={b} style={{
          fontSize: T.BENEFIT_FONT_SIZE,
          color: TOKENS.ink2,
          marginBottom: T.BENEFIT_GAP,
        }}>• {b}</div>
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
      borderColor: selected ? TOKENS.p500 : TOKENS.divider.hairline,
      background: selected ? 'rgba(67,35,160,0.06)' : TOKENS.surface,   // (literal: impl primary tint 透明覆層)
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

Object.assign(window, { PAYWALL_BENEFITS, PAYWALL_OPTIONS, PaywallBenefitList, PaywallPlanOption });
