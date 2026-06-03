// ─────────────────────────────────────────────────────────────
// TransactionEditorScreen sub-sections · 私有 sub-section 元件
//
// 鏡射 impl src/screens/Transactions/TransactionEditorScreen.tsx 拆分：
//   TransactionAmountContainer / TransactionPickerRow
//
// 共用 form helper（EditorErrorBanner / EditorDateContainer / EditorNoteField）住在
//   30_screens/shared/no2_editor_form_helpers.jsx；刪除鈕改用共用元件 DeleteButton（20_components）。
// （design canvas global namespace 限制使然，兩 editor 視覺一致時共用 helper，
//   視覺差異時才各自實作）。
//
// 消費 TRANSACTION_EDITOR_SCREEN_TOKENS + atomic
// + 20_components/（AmountField / AccountSelector / CategorySelector / Glyph）。
// ─────────────────────────────────────────────────────────────

// ─── TransactionAmountContainer ─── 金額輸入欄（outer box + 單一 AmountField）
// 對齊 TransferEditor 的 AmountGroupBox 視覺結構：surface + border + md radius 外框，
// 內含 column 佈局的 AmountField（2xl 金額置中 + xs 幣別在金額下方 secondary 色）。
// 與 TransferEditor 差異：本 editor 只有單一金額（無 from/to），box 內僅放一個 AmountField，
// 無箭頭、無第二個 AmountField。
// 幣別顯示形式：caller 傳入已映射的 symbol 字串（NT$ / US$），透過 AmountField 的 `currency` prop
// render；AmountField 不關心 symbol vs code，誰傳什麼就顯示什麼。
function TransactionAmountContainer({ symbol = 'NT$', amount, amountFocused, onFocus }) {
  const T = TRANSACTION_EDITOR_SCREEN_TOKENS;
  return (
    <div style={{
      background: TOKENS.surface,
      borderRadius: RADIUS.md,
      borderWidth: 1, borderStyle: 'solid', borderColor: TOKENS.border,
      marginBottom: T.SECTION_GAP,
      paddingLeft: SPACING.md, paddingRight: SPACING.md,
    }}>
      <AmountField
        active={amountFocused}
        value={amount}
        currency={symbol}
        onPress={onFocus}/>
    </div>
  );
}

// ─── TransactionPickerRow ─── account + category picker 並排
function TransactionPickerRow({ accountId, categoryId }) {
  const T = TRANSACTION_EDITOR_SCREEN_TOKENS;
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
  TransactionAmountContainer, TransactionPickerRow,
});
