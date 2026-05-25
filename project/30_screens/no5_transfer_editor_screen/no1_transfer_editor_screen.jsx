// ─────────────────────────────────────────────────────────────
// TransferEditorScreen · 對齊 impl src/screens/Transactions/TransferEditorScreen.tsx
//
// Modal screen。跨帳戶 / 跨幣別轉帳。
// 內容順序：EditorDateContainer → [RecurringOptions?]
//          → AmountGroupBox → PickerGroupBox → EditorNoteField → [EditorDeleteButton?]
//          → SCROLL_SPACER → CalculatorKeypad(absolute)
//
// Variants（對齊 impl 進入點狀態 route.params.id / recurringRule / 兩 account currency）：
//   default                  — 新增模式，跨幣別轉帳（TWD → USD），預設 from active、Recurring 收起
//   recurring                — 新增 + RecurringOptions 預設展開（route.params.recurringRule 存在）
//   same-currency            — 新增 + 同幣別轉帳（TWD → TWD），to AmountField 套 disabled 樣式不可獲焦
//                              （對齊 impl 第 244-278 行 amountTo 自動同步 amountFrom 行為）
//   same-currency-recurring  — 新增 + 同幣別 + RecurringOptions 預設展開
//   edit                     — 編輯既有 transfer（route.params.id 存在），title 改「編輯轉帳」+ Delete button
//   edit-recurring           — 編輯 + RecurringOptions 預設展開
//   edit-same-currency       — 編輯 + 同幣別 + Delete button
//
// 不包含 edit-schedule-instance variant：impl `id + scheduleId + scheduleRecurrence` 觸發的差異
// 在 save / delete 時跳 Alert.alert mode dialog（「本次 / 未來」）；RecurringOptions 本身渲染
// 跟 edit-recurring 一致（rule 從 schedule 載入、isEnabled=true）。mode dialog 需新增
// ConfirmDialog 元件不在本次 scope。
//
// 無 error variant：impl 的 save button disabled 條件已攔死「amountFrom 為空」場景，
// 「請輸入有效金額」這條 Alert 在 transfer 路徑跑不到；TxEditor 仍保留 error variant。
// ─────────────────────────────────────────────────────────────

function TransferEditorScreen({ variant = 'default' }) {
  const T = TRANSFER_EDITOR_SCREEN_TOKENS;

  const isSameCurrency = variant.includes('same-currency');
  const isEdit         = variant.startsWith('edit');
  const initialRecur   = variant.includes('recurring');

  const [fromAccount] = React.useState('bank');
  const [toAccount]   = React.useState(isSameCurrency ? 'cash' : 'usd_cash');
  const [activeField, setActiveField] = React.useState('from');
  const [recurring, setRecurring] = React.useState(initialRecur);
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

        <AmountGroupBox
          activeField={activeField}
          setActiveField={setActiveField}
          fromAmount="15,000"
          toAmount={isCrossCurrency ? '480' : '15,000'}
          fromAcc={fromAcc}
          toAcc={toAcc}
          isCrossCurrency={isCrossCurrency}/>

        <PickerGroupBox fromAcc={fromAcc} toAcc={toAcc}/>

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
