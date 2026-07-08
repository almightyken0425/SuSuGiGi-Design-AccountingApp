// ─────────────────────────────────────────────────────────────
// TransactionEditorScreen · 對齊 impl src/screens/Transactions/TransactionEditorScreen.tsx
//
// Modal screen。記一筆支出 / 收入。
// 內容順序：DateContainer → [RecurringOptions?] → AmountContainer
//          → PickerRow → NoteField → [DeleteButton?] → SCROLL_SPACER → KEYPAD(absolute)
//          → [ScheduleModeDialog?] overlay
//
// Variants：
//   default                       — 支出 (expense)，recurring 收起
//   income                        — 收入 (income)，recurring 收起
//   initialRecurring=true         — 對應 impl showRecurringOptions=true，RecurringOptions 預設展開
//   showScheduleModeDialog=true   — 編輯既有週期交易時的「本次 / 未來所有」對話框
//                                   （對齊 impl src/screens/Transactions/showRecurringModeDialog.ts）
//
// impl 無 invalid-amount 的 inline error banner：金額輸入透過 CalculatorKeypad
// （支援 0-9 / . / + - × ÷ =，由 impl `src/hooks/useCalculator.ts` 解析計算式），
// save 守門靠 header checkmark `disabled: amount<=0 || !accountId || !categoryId`，
// 即使按下 operator 也因 displayValue 仍存在而不會 disable。真實 error 場景
// （save 失敗 / delete 失敗）走 Alert.alert runtime 彈窗，非 screen 視覺。
// 故 design 端不保留 error variant 與 EditorErrorBanner 渲染。
//
// 註：曾考慮加 locked / LEVEL_2 鎖定態 variant，但盤點 impl 後確認其
//     RecurringOptions 對未付費使用者採 Silent Deny（toggle 自動回 off，無提示），
//     元件本身無 inline lock 視覺。為避免 design 端混入主動 affordance 提議，已撤回。
// ─────────────────────────────────────────────────────────────

function TransactionEditorScreen({
  type = 'expense',
  isEdit = false,
  initialRecurring = false,
  showScheduleModeDialog = false,
}) {
  const T = TRANSACTION_EDITOR_SCREEN_TOKENS;

  const [amount, setAmount] = React.useState('185');
  const [note, setNote] = React.useState('路易莎咖啡');
  const [recurring, setRecurring] = React.useState(initialRecurring);
  const [accountId, setAccountId] = React.useState('credit');
  const [categoryId, setCategoryId] = React.useState(type === 'income' ? 'salary' : 'food');
  const [amountFocused, setAmountFocused] = React.useState(true);

  const acc = ACC_BY_ID[accountId];
  const symbol = currencySymbolFor(acc.currency);

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

        <TransactionAmountContainer
          symbol={symbol}
          amount={amount}
          amountFocused={amountFocused}
          onFocus={() => setAmountFocused(true)}/>

        <TransactionPickerRow accountId={accountId} categoryId={categoryId}/>

        <EditorNoteField
          value={note}
          onChange={(v) => { setNote(v); setAmountFocused(false); }}
          onFocus={() => setAmountFocused(false)}/>

        {isEdit && <DeleteButton/>}

        <div style={{ height: amountFocused ? T.SCROLL_SPACER_HEIGHT : T.SCROLL_SPACER_HEIGHT_INACTIVE }}/>
      </div>

      {amountFocused && (
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0,
          background: TOKENS.surface,
          borderTop: `1px solid ${TOKENS.border}`,
          paddingTop: KEYPAD_TOKENS.DOCK_PADDING_TOP,
          paddingBottom: T.KEYPAD_BOTTOM_PADDING,
        }}>
          <CalculatorKeypad onPress={(k) => {
            // Design canvas demo only。所有按鍵 echo 到 amount 字串以呈現「按下有反應」；
            // impl 計算機邏輯（operator 暫存 / `=` 求值 / 小數位限制）在 src/hooks/useCalculator.ts。
            setAmount(prev => (prev === '0' ? k : prev + k));
          }}/>
        </div>
      )}

      {showScheduleModeDialog && (
        <ConfirmDialog
          message="此交易屬於週期交易。要套用變更至？"
          actions={[
            { label: '取消',     style: 'cancel' },
            { label: '僅本次',   style: 'default' },
            { label: '未來所有', style: 'default' },
          ]}/>
      )}
    </div>
  );
}

Object.assign(window, { TransactionEditorScreen });
