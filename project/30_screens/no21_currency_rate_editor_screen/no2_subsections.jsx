// ─────────────────────────────────────────────────────────────
// CurrencyRateEditorScreen sub-sections · 私有 sub-section 元件
//
// 鏡射 impl src/screens/Settings/CurrencyRateEditorScreen.tsx：
//   RateCurrencyButton / RateAmountInput / RateEqualsSign
//
// 消費 CURRENCY_RATE_EDITOR_SCREEN_TOKENS + atomic。
// ─────────────────────────────────────────────────────────────

// ─── RateCurrencyButton ─── 幣別選擇按鈕（含 disabled 樣式）
function RateCurrencyButton({ code, disabled }) {
  const T = CURRENCY_RATE_EDITOR_SCREEN_TOKENS;
  return (
    <div style={{
      padding: T.PAIR_BUTTON_PADDING,
      borderRadius: T.PAIR_BUTTON_RADIUS,
      borderWidth: 1, borderStyle: 'solid', borderColor: TOKENS.divider.hairline,
      background: TOKENS.bg,
      display: 'flex', justifyContent: 'center', alignItems: 'center',
      fontSize: T.PAIR_BUTTON_FONT_SIZE,
      fontWeight: TYPOGRAPHY.weight.medium,
      color: disabled ? TOKENS.ink2 : TOKENS.ink,
    }}>
      {code}
    </div>
  );
}

// ─── RateAmountInput ─── 數字輸入 + 右側 currency code
function RateAmountInput({ value, code }) {
  const T = CURRENCY_RATE_EDITOR_SCREEN_TOKENS;
  return (
    <div style={{
      display: 'flex', flexDirection: 'row', alignItems: 'center',
      borderRadius: T.AMOUNT_INPUT_RADIUS,
      borderWidth: 1, borderStyle: 'solid', borderColor: TOKENS.divider.hairline,
      paddingLeft: T.AMOUNT_INPUT_PADDING_H, paddingRight: T.AMOUNT_INPUT_PADDING_H,
      background: TOKENS.bg,
    }}>
      <span style={{
        flex: 1,
        fontSize: T.AMOUNT_INPUT_FONT_SIZE,
        color: TOKENS.ink,
        paddingTop: T.AMOUNT_INPUT_PADDING_V, paddingBottom: T.AMOUNT_INPUT_PADDING_V,
      }}>{value}</span>
      <span style={{
        fontSize: TYPOGRAPHY.size.sm,
        color: TOKENS.ink2,
        marginLeft: SPACING.sm,
      }}>{code}</span>
    </div>
  );
}

// ─── RateEqualsSign ─── 中央「=」字
function RateEqualsSign() {
  const T = CURRENCY_RATE_EDITOR_SCREEN_TOKENS;
  return (
    <span style={{
      fontSize: T.EQUALS_FONT_SIZE,
      fontWeight: TYPOGRAPHY.weight.medium,
      color: TOKENS.ink2,
      marginBottom: SPACING.md,
    }}>=</span>
  );
}

Object.assign(window, { RateCurrencyButton, RateAmountInput, RateEqualsSign });
