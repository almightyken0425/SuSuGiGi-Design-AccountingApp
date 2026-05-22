// ─────────────────────────────────────────────────────────────
// TransactionEditorScreen · 對齊 impl src/screens/Transactions/TransactionEditorScreen.tsx
//
// Modal screen。記一筆支出 / 收入。
// 內容順序：DateContainer → [RecurringOptions?] → AmountContainer
//          → PickerRow → NoteField → [DeleteButton?] → SCROLL_SPACER → KEYPAD(absolute)
//
// Variants：
//   default        — 支出 (expense)
//   income         — 收入 (income)
//
// impl 無 invalid-amount 的 inline error banner：金額輸入只能透過 keypad（限定 0-9 與 .），
// 且 save 守門靠 header checkmark `disabled: !amount || !accountId`（line 463），無法觸發無效 save。
// 真實 error 場景（save 失敗 / delete 失敗）走 Alert.alert runtime 彈窗，非 screen 視覺。
// 故 design 端不保留 error variant 與 EditorErrorBanner 渲染。
// ─────────────────────────────────────────────────────────────

function TransactionEditorScreen({ type = 'expense', isEdit = false }) {
  const T = TX_EDITOR_SCREEN_TOKENS;

  const [amount, setAmount] = React.useState('185');
  const [note, setNote] = React.useState('路易莎咖啡');
  const [recurring, setRecurring] = React.useState(false);
  const [accountId, setAccountId] = React.useState('credit');
  const [categoryId, setCategoryId] = React.useState(type === 'income' ? 'salary' : 'food');
  const [amountFocused, setAmountFocused] = React.useState(true);

  const acc = ACC_BY_ID[accountId];
  const symbol = acc.currency === 'TWD' ? 'NT$'
              : acc.currency === 'USD' ? 'US$'
              : acc.currency;

  return (
    <div style={{
      display: 'flex', flexDirection: 'column', height: '100%',
      background: TOKENS.bg,
    }}>
      <div style={{ flex: 1, overflowY: 'auto', padding: SPACING.lg }}>
        <EditorDateContainer
          recurring={recurring}
          onToggleRecurring={() => setRecurring(!recurring)}/>

        {recurring && <RecurringOptions/>}

        <TxAmountContainer
          symbol={symbol}
          amount={amount}
          amountFocused={amountFocused}
          onFocus={() => setAmountFocused(true)}/>

        <TxPickerRow accountId={accountId} categoryId={categoryId}/>

        <EditorNoteField
          value={note}
          onChange={(v) => { setNote(v); setAmountFocused(false); }}
          onFocus={() => setAmountFocused(false)}/>

        {isEdit && <EditorDeleteButton label="刪除交易"/>}

        <div style={{ height: amountFocused ? T.SCROLL_SPACER_HEIGHT : T.SCROLL_SPACER_HEIGHT_INACTIVE }}/>
      </div>

      {amountFocused && (
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0,
          background: TOKENS.surface,
          borderTop: `1px solid ${TOKENS.border}`,
          paddingBottom: T.KEYPAD_BOTTOM_PADDING,
        }}>
          <CalculatorKeypad onPress={(k) => {
            if (k === '=') return;
            if (k === '.' || /^\d$/.test(k)) {
              setAmount(prev => (prev === '0' ? k : prev + k));
            }
          }}/>
        </div>
      )}
    </div>
  );
}

Object.assign(window, { TransactionEditorScreen });
