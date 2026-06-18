// ─────────────────────────────────────────────────────────────
// CurrencyRateEditorScreen · 對齊 impl src/screens/Settings/CurrencyRateEditorScreen.tsx
//
// Modal save form。兩 surface card：
//   1. Currency Pair（來源=主幣 base 永遠鎖 / 目標=外幣；Update mode 中目標外幣也鎖）
//   2. Amount Inputs（1 主幣 = N 外幣，主要貨幣顯示在左）
//
// Variants：
//   add            — 新增模式，來源鎖 TWD（base），目標可選外幣（USD），外幣金額待填
//   update         — 更新模式，來源(TWD)與目標(USD)都鎖，外幣金額預填倒數值 ≈ 0.03276
//   currency-modal — 幣別選擇 modal（add 模式點 From 開啟，RateCurrencySelectModal）
// ─────────────────────────────────────────────────────────────

function CurrencyRateEditorScreen({ variant = 'add' }) {
  const T = CURRENCY_RATE_EDITOR_SCREEN_TOKENS;
  if (variant === 'currency-modal') {
    return <RateCurrencySelectModal/>;
  }
  const isUpdate = variant === 'update';
  const baseCode      = 'TWD';   // 主要貨幣（鎖定，顯示在左＝來源）
  const foreignCode   = 'USD';   // 外幣（顯示在右＝目標；update 模式鎖定）
  // update 預填「1 主幣 = N 外幣」：原 1 USD = 30.5240 TWD 的倒數 ≈ 0.03276
  const foreignAmount = isUpdate ? '0.03276' : '0';

  return (
    <div style={{
      padding: T.SCREEN_PADDING,
      background: TOKENS.bg, minHeight: '100%',
      display: 'flex', flexDirection: 'column', gap: T.CARD_GAP,
    }}>
      {/* Currency Pair */}
      <div style={{
        background: TOKENS.surface,
        borderRadius: T.CARD_RADIUS,
        padding: T.CARD_PADDING,
      }}>
        <div style={{ display: 'flex', flexDirection: 'row', gap: T.PAIR_GAP }}>
          <div style={{ flex: 1 }}>
            <div style={{
              fontSize: T.LABEL_FONT_SIZE, color: TOKENS.ink2,
              marginBottom: T.LABEL_BOTTOM_MARGIN,
            }}>來源幣別</div>
            <RateCurrencyButton code={baseCode} disabled={true}/>
          </div>
          <div style={{ flex: 1 }}>
            <div style={{
              fontSize: T.LABEL_FONT_SIZE, color: TOKENS.ink2,
              marginBottom: T.LABEL_BOTTOM_MARGIN,
            }}>目標幣別</div>
            <RateCurrencyButton code={foreignCode} disabled={isUpdate}/>
          </div>
        </div>
      </div>

      {/* Amount Inputs */}
      <div style={{
        background: TOKENS.surface,
        borderRadius: T.CARD_RADIUS,
        padding: T.CARD_PADDING,
      }}>
        <div style={{
          display: 'flex', flexDirection: 'row',
          alignItems: 'flex-end', gap: T.AMOUNT_ROW_GAP,
        }}>
          <div style={{ flex: 1 }}>
            <div style={{
              fontSize: T.LABEL_FONT_SIZE, color: TOKENS.ink2,
              marginBottom: T.LABEL_BOTTOM_MARGIN,
            }}>來源金額</div>
            <RateAmountInput value="1" code={baseCode}/>
          </div>
          <RateEqualsSign/>
          <div style={{ flex: 1 }}>
            <div style={{
              fontSize: T.LABEL_FONT_SIZE, color: TOKENS.ink2,
              marginBottom: T.LABEL_BOTTOM_MARGIN,
            }}>目標金額</div>
            <RateAmountInput value={foreignAmount} code={foreignCode}/>
          </div>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { CurrencyRateEditorScreen });
