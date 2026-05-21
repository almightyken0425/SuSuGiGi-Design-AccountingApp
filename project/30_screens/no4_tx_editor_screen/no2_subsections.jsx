// ─────────────────────────────────────────────────────────────
// TransactionEditorScreen sub-sections · 私有 sub-section 元件
//
// 鏡射 impl src/screens/Transactions/TransactionEditorScreen.tsx 拆分：
//   TxAmountContainer / TxPickerRow
//
// 共用 form helper（EditorErrorBanner / EditorDateContainer / EditorNoteField /
//   EditorDeleteButton）住在 30_screens/shared/no2_editor_form_helpers.jsx
// （design canvas global namespace 限制使然，兩 editor 視覺一致時共用 helper，
//   視覺差異時才各自實作）。
//
// 消費 TX_EDITOR_SCREEN_TOKENS + atomic
// + 20_components/（AccountSelector / CategorySelector / Glyph）。
// ─────────────────────────────────────────────────────────────

// ─── TxAmountContainer ─── 金額輸入欄（symbol + amount text + backspace）
// 與 20_components/AmountField 不同：AmountField 為通用兩態欄（TransferEditor 用），
// TxAmountContainer 含 currency symbol prefix 與 tap-to-focus 開鍵盤行為。
function TxAmountContainer({ symbol = 'NT$', amount, amountFocused, onFocus }) {
  const T = TX_EDITOR_SCREEN_TOKENS;
  return (
    <div style={{ marginBottom: T.SECTION_GAP }}>
      <div onClick={onFocus} style={{
        display: 'flex', alignItems: 'center',
        background: amountFocused ? TOKENS.bg : TOKENS.surface,
        padding: T.AMOUNT_PADDING,
        borderRadius: RADIUS.md,
        borderWidth: 1, borderStyle: 'solid',
        borderColor: amountFocused ? TOKENS.p500 : TOKENS.border,
        cursor: 'pointer',
      }}>
        <span style={{
          fontSize: T.AMOUNT_FONT_SIZE, fontWeight: TYPOGRAPHY.weight.medium,
          color: TOKENS.ink, marginRight: T.AMOUNT_SYMBOL_GAP,
        }}>{symbol}</span>
        <span style={{
          flex: 1,
          fontSize: T.AMOUNT_FONT_SIZE, fontWeight: TYPOGRAPHY.weight.medium,
          color: amount ? TOKENS.ink : TOKENS.ink3,
          fontVariantNumeric: 'tabular-nums',
        }}>{amount || '0.00'}</span>
        <div style={{ padding: T.AMOUNT_BACKSPACE_PADDING }}>
          <Glyph name="backspace-outline" size={ICON_SIZE.md} color={TOKENS.ink2} stroke={1.6}/>
        </div>
      </div>
    </div>
  );
}

// ─── TxPickerRow ─── account + category picker 並排
function TxPickerRow({ accountId, categoryId }) {
  const T = TX_EDITOR_SCREEN_TOKENS;
  return (
    <div style={{
      display: 'flex', flexDirection: 'row',
      marginBottom: T.SECTION_GAP,
    }}>
      <AccountSelector account={ACC_BY_ID[accountId]}/>
      <div style={{ width: T.PICKER_ROW_GAP }}/>
      <CategorySelector category={CAT_BY_ID[categoryId]}/>
    </div>
  );
}

Object.assign(window, {
  TxAmountContainer, TxPickerRow,
});
