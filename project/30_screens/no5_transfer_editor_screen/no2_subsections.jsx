// ─────────────────────────────────────────────────────────────
// TransferEditorScreen sub-sections · 私有 sub-section 元件
//
// 鏡射 impl src/screens/Transactions/TransferEditorScreen.tsx 拆分：
//   ExchangeArrow / DualAmountRow / DualPickerRow
//
// 共用 form helper（EditorErrorBanner / EditorDateContainer / EditorNoteField /
//   EditorDeleteButton）住在 30_screens/shared/no2_editor_form_helpers.jsx。
//
// 消費 TRANSFER_EDITOR_SCREEN_TOKENS + atomic
// + 20_components/（AmountField / AccountSelector / Glyph）。
// ─────────────────────────────────────────────────────────────

// ─── ExchangeArrow ─── 兩欄之間的右向箭頭，width / topOffset 由 caller 決定
function ExchangeArrow({ width, topOffset = 0 }) {
  return (
    <div style={{
      width,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      paddingTop: topOffset,
    }}>
      <Glyph name="arrow-right" size={ICON_SIZE.md} color={TOKENS.ink2}/>
    </div>
  );
}

// ─── DualAmountRow ─── from AmountField + ExchangeArrow + to AmountField
// 同幣別轉帳時，to AmountField 為 disabled（金額自動跟隨 from）。
function DualAmountRow({ activeField, setActiveField, fromAmount, toAmount, fromAcc, toAcc, isCrossCurrency }) {
  const T = TRANSFER_EDITOR_SCREEN_TOKENS;
  return (
    <div style={{ marginBottom: T.SECTION_GAP }}>
      <div style={{
        display: 'flex', flexDirection: 'row',
        alignItems: 'center', justifyContent: 'space-between',
      }}>
        <div style={{ flex: 1 }}>
          <AmountField
            active={activeField === 'from'}
            value={fromAmount}
            currency={fromAcc.currency}
            onPress={() => setActiveField('from')}/>
        </div>
        <ExchangeArrow
          width={T.AMOUNT_ARROW_FRAME_WIDTH}
          topOffset={T.AMOUNT_ARROW_TOP_PADDING}/>
        <div style={{ flex: 1 }}>
          <AmountField
            active={activeField === 'to' && isCrossCurrency}
            disabled={!isCrossCurrency}
            value={toAmount}
            currency={toAcc.currency}
            onPress={() => isCrossCurrency && setActiveField('to')}/>
        </div>
      </div>
    </div>
  );
}

// ─── DualPickerRow ─── from AccountSelector + ExchangeArrow + to AccountSelector
// impl pickerCol 為 { flex: 1, overflow: 'hidden' }，AccountSelector 需在該 wrapper 內。
function DualPickerRow({ fromAcc, toAcc }) {
  const T = TRANSFER_EDITOR_SCREEN_TOKENS;
  return (
    <div style={{
      display: 'flex', flexDirection: 'row',
      marginBottom: T.SECTION_GAP, alignItems: 'flex-start',
    }}>
      <div style={{ flex: 1, overflow: 'hidden' }}>
        <AccountSelector account={fromAcc}/>
      </div>
      <ExchangeArrow
        width={T.PICKER_ROW_GAP}
        topOffset={T.PICKER_ARROW_TOP_OFFSET}/>
      <div style={{ flex: 1, overflow: 'hidden' }}>
        <AccountSelector account={toAcc}/>
      </div>
    </div>
  );
}

Object.assign(window, { ExchangeArrow, DualAmountRow, DualPickerRow });
