// ─────────────────────────────────────────────────────────────
// TransactionEditorScreen sub-sections · 私有 sub-section 元件
//
// 鏡射 impl src/screens/Transactions/TransactionEditorScreen.tsx 拆分：
//   TransactionAmountContainer / TransactionPickerRow
//
// 共用 form helper（EditorErrorBanner / EditorDateContainer / EditorNoteField /
//   EditorDeleteButton）住在 30_screens/shared/no2_editor_form_helpers.jsx
// （design canvas global namespace 限制使然，兩 editor 視覺一致時共用 helper，
//   視覺差異時才各自實作）。
//
// 消費 TRANSACTION_EDITOR_SCREEN_TOKENS + atomic
// + 20_components/（AccountSelector / CategorySelector / Glyph）。
// ─────────────────────────────────────────────────────────────

// ─── TransactionAmountContainer ─── 金額輸入欄（symbol + amount text）
// 改版：active 用 amount 文字色（紫）表達，不再切 border / bg；
// inline backspace icon 拿掉（移到 CalculatorKeypad ⌫ 鍵）。
// 仍保留外框（surface + border）作為視覺 grouping，因為 transaction 只有單一 amount，
// 沒有 from/to 結構不需要 outer-grouping-box；保留框讓 amount 區跟下方 picker/note 分隔。
function TransactionAmountContainer({ symbol = 'NT$', amount, amountFocused, onFocus }) {
  const T = TRANSACTION_EDITOR_SCREEN_TOKENS;
  return (
    <div style={{ marginBottom: T.SECTION_GAP }}>
      <div onClick={onFocus} style={{
        display: 'flex', alignItems: 'center',
        background: TOKENS.surface,
        padding: T.AMOUNT_PADDING,
        borderRadius: RADIUS.md,
        borderWidth: 1, borderStyle: 'solid',
        borderColor: TOKENS.border,
        cursor: 'pointer',
      }}>
        <span style={{
          fontSize: T.AMOUNT_FONT_SIZE, fontWeight: TYPOGRAPHY.weight.medium,
          color: amountFocused ? TOKENS.p500 : TOKENS.ink,
          marginRight: T.AMOUNT_SYMBOL_GAP,
        }}>{symbol}</span>
        <span style={{
          flex: 1,
          fontSize: T.AMOUNT_FONT_SIZE, fontWeight: TYPOGRAPHY.weight.medium,
          color: amountFocused ? TOKENS.p500
               : amount        ? TOKENS.ink
                               : TOKENS.ink3,
        }}>{amount || '0.00'}</span>
      </div>
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
