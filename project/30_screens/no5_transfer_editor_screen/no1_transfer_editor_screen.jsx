// ─────────────────────────────────────────────────────────────
// TransferEditorScreen · 對齊 impl src/screens/Transactions/TransferEditorScreen.tsx
//
// Modal screen。跨帳戶 / 跨幣別轉帳。
// 內容順序：EditorDateContainer → [RecurringOptions?]
//          → DualAmountRow → DualPickerRow → EditorNoteField → [EditorDeleteButton?]
//          → SCROLL_SPACER → CalculatorKeypad(absolute)
//
// Variants：
//   default                — 跨幣別轉帳（TWD → USD），預設 from 為 active、Recurring 收起
//   initialRecurring=true  — RecurringOptions 預設展開（對應 impl showRecurringOptions=true）
//
// 無 error variant：impl 的 save button disabled 條件已攔死「amountFrom 為空」場景，
// 「請輸入有效金額」這條 Alert 在 transfer 路徑跑不到；TxEditor 仍保留 error variant。
// ─────────────────────────────────────────────────────────────

function TransferEditorScreen({ isEdit = false, initialRecurring = false }) {
  const T = TRANSFER_EDITOR_SCREEN_TOKENS;

  const [fromAccount] = React.useState('bank');
  const [toAccount]   = React.useState('usd_cash');
  const [activeField, setActiveField] = React.useState('from');
  const [recurring, setRecurring] = React.useState(initialRecurring);
  const [note, setNote] = React.useState('');

  const fromAcc = ACC_BY_ID[fromAccount];
  const toAcc = ACC_BY_ID[toAccount];
  const isCrossCurrency = fromAcc.currency !== toAcc.currency;

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

        <DualAmountRow
          activeField={activeField}
          setActiveField={setActiveField}
          fromAmount="15,000"
          toAmount="480"
          fromAcc={fromAcc}
          toAcc={toAcc}
          isCrossCurrency={isCrossCurrency}/>

        <DualPickerRow fromAcc={fromAcc} toAcc={toAcc}/>

        <EditorNoteField value={note} onChange={setNote}/>

        {isEdit && <EditorDeleteButton label="刪除"/>}

        <div style={{ height: T.SCROLL_SPACER_HEIGHT }}/>
      </div>

      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0,
        background: TOKENS.surface,
        borderTop: `1px solid ${TOKENS.border}`,
        paddingBottom: T.KEYPAD_BOTTOM_PADDING,
      }}>
        <CalculatorKeypad/>
      </div>
    </div>
  );
}

Object.assign(window, { TransferEditorScreen });
