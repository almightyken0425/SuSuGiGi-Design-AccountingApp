// ─────────────────────────────────────────────────────────────
// TransactionEditorScreen · 對齊 impl src/screens/Transactions/TransactionEditorScreen.tsx
//
// Modal screen。記一筆支出 / 收入。
// 內容順序：[ErrorBanner?] → DateContainer → [RecurringOptions?] → AmountContainer
//          → PickerRow → NoteField → [DeleteButton?] → SCROLL_SPACER → KEYPAD(absolute)
//
// Variants：
//   default        — 支出 (expense)
//   income         — 收入 (income)
//   error          — 含 ErrorBanner（impl 為 Alert，design 畫成 inline）
// ─────────────────────────────────────────────────────────────

function TransactionEditorScreen({ type = 'expense', isEdit = false, variant = 'default' }) {
  const T = TX_EDITOR_SCREEN_TOKENS;
  const isError = variant === 'error';

  const [amount, setAmount] = React.useState(isError ? '' : '185');
  const [note, setNote] = React.useState(isError ? '' : '路易莎咖啡');
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
        {isError && <EditorErrorBanner/>}

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

        <div style={{ height: T.SCROLL_SPACER_HEIGHT }}/>
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
