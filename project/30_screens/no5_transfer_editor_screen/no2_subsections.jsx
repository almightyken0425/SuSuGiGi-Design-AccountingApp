// ─────────────────────────────────────────────────────────────
// TransferEditorScreen sub-sections · 私有 sub-section 元件
//
// 鏡射 impl src/screens/Transactions/TransferEditorScreen.tsx 拆分：
//   AmountGroupBox / PickerGroupBox + 內 ExchangeArrow
//
// 改版：from / to 不再各自有獨立 box，外層一個 grouping box 包住整 row。
// box 樣式（surface + solid grey border + md radius）對齊既有 V0 內元素 box，
// 讓視覺風格延續。內部 AmountField / AccountSelector 拿掉自帶 border。
// active 改用 amount 文字色（紫）；backspace 改由 CalculatorKeypad ⌫ 鍵承接（不再 inline icon）。
//
// 共用 form helper（EditorErrorBanner / EditorDateContainer / EditorNoteField /
//   EditorDeleteButton）住在 30_screens/shared/no2_editor_form_helpers.jsx。
//
// 消費 TRANSFER_EDITOR_SCREEN_TOKENS + atomic
// + 20_components/（AmountField / AccountSelector / Glyph）。
// ─────────────────────────────────────────────────────────────

// ─── ExchangeArrow ─── group box 內 from / to 中間的右向箭頭
function ExchangeArrow({ topOffset = 0 }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      paddingLeft: SPACING.sm, paddingRight: SPACING.sm,
      paddingTop: topOffset,
    }}>
      <Glyph name="arrow-right" size={ICON_SIZE.md} color={TOKENS.ink2}/>
    </div>
  );
}

// ─── AmountGroupBox ─── 外層 box 包 from AmountField + → + to AmountField
// 同幣別轉帳時，to AmountField 為 disabled（金額自動跟隨 from）。
function AmountGroupBox({ activeField, setActiveField, fromAmount, toAmount, fromAcc, toAcc, isCrossCurrency }) {
  const T = TRANSFER_EDITOR_SCREEN_TOKENS;
  return (
    <div style={{
      background: TOKENS.surface,
      borderRadius: RADIUS.md,
      borderWidth: 1, borderStyle: 'solid', borderColor: TOKENS.border,
      marginBottom: T.SECTION_GAP,
      paddingLeft: SPACING.md, paddingRight: SPACING.md,
    }}>
      <div style={{
        display: 'flex', flexDirection: 'row',
        alignItems: 'center', justifyContent: 'space-between',
      }}>
        <AmountField
          active={activeField === 'from'}
          value={fromAmount}
          currency={currencySymbolFor(fromAcc.currency)}
          onPress={() => setActiveField('from')}/>
        <ExchangeArrow/>
        <AmountField
          active={activeField === 'to' && isCrossCurrency}
          disabled={!isCrossCurrency}
          value={toAmount}
          currency={currencySymbolFor(toAcc.currency)}
          onPress={() => isCrossCurrency && setActiveField('to')}/>
      </div>
    </div>
  );
}

// ─── PickerGroupBox ─── 外層 box 包 from AccountSelector + → + to AccountSelector
// AccountSelector 傳 noBorder=true 拿掉自帶外框，由本 group box 統一表達 grouping
function PickerGroupBox({ fromAcc, toAcc }) {
  const T = TRANSFER_EDITOR_SCREEN_TOKENS;
  return (
    <div style={{
      background: TOKENS.surface,
      borderRadius: RADIUS.md,
      borderWidth: 1, borderStyle: 'solid', borderColor: TOKENS.border,
      marginBottom: T.SECTION_GAP,
      paddingLeft: SPACING.md, paddingRight: SPACING.md,
      display: 'flex', flexDirection: 'row',
      alignItems: 'center',
    }}>
      <div style={{ flex: 1, overflow: 'hidden' }}>
        <AccountSelector account={fromAcc} noBorder/>
      </div>
      <ExchangeArrow/>
      <div style={{ flex: 1, overflow: 'hidden' }}>
        <AccountSelector account={toAcc} noBorder/>
      </div>
    </div>
  );
}

Object.assign(window, { ExchangeArrow, AmountGroupBox, PickerGroupBox });
