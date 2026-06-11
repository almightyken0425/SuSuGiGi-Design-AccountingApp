// ─────────────────────────────────────────────────────────────
// CurrencyRateEditorScreen · 對齊 impl src/screens/Settings/CurrencyRateEditorScreen.tsx
//
// Modal save form。兩 surface card：
//   1. Currency Pair（From / To；To 永遠鎖為 base currency；Update mode 中 From 也鎖）
//   2. Amount Inputs（1 X = N Y，rate = amountTo / amountFrom）
//
// Variants：
//   add            — 新增模式，From 可選（USD），To 鎖 TWD（base），amountTo 為空待填
//   update         — 更新模式，From 與 To 都鎖（USD → TWD），amountTo 預填現有 rate 30.5240
//   currency-modal — 幣別選擇 modal（add 模式點 From 開啟，RateCurrencySelectModal）
// ─────────────────────────────────────────────────────────────

function CurrencyRateEditorScreen({ variant = 'add' }) {
  const T = CURRENCY_RATE_EDITOR_SCREEN_TOKENS;
  if (variant === 'currency-modal') {
    return <RateCurrencySelectModal/>;
  }
  const isUpdate = variant === 'update';
  const fromCode = 'USD';
  const toCode   = 'TWD';
  const amountTo = isUpdate ? '30.5240' : '0';

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
            <RateCurrencyButton code={fromCode} disabled={isUpdate}/>
          </div>
          <div style={{ flex: 1 }}>
            <div style={{
              fontSize: T.LABEL_FONT_SIZE, color: TOKENS.ink2,
              marginBottom: T.LABEL_BOTTOM_MARGIN,
            }}>目標幣別</div>
            <RateCurrencyButton code={toCode} disabled={true}/>
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
            <RateAmountInput value="1" code={fromCode}/>
          </div>
          <RateEqualsSign/>
          <div style={{ flex: 1 }}>
            <div style={{
              fontSize: T.LABEL_FONT_SIZE, color: TOKENS.ink2,
              marginBottom: T.LABEL_BOTTOM_MARGIN,
            }}>目標金額</div>
            <RateAmountInput value={amountTo} code={toCode}/>
          </div>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { CurrencyRateEditorScreen });
