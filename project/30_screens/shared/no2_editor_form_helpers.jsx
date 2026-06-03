// ─────────────────────────────────────────────────────────────
// Editor form helpers · TransactionEditor + TransferEditor 共用的 design canvas form 元件
//
// impl 端 TransactionEditorScreen 與 TransferEditorScreen 內各自 inline 實作這幾個結構，
// 沒有抽共用元件（沒列入 src/components/）。
// design canvas 因 global namespace 限制無法兩 screen 各自定義同名 sub-section，
// 故於此 promote 共用，視覺上兩 screen 仍維持完全一致（impl-aligned）。
//
// 將來若 impl 重構抽出 EditorDateRow / EditorNoteField 等，可改升入 20_components/。
// ─────────────────────────────────────────────────────────────

// ─── EditorErrorBanner ─── 視覺對應 impl Alert.alert（inline banner 對齊 design canvas）
function EditorErrorBanner({ title = '錯誤', message = '請輸入有效金額' }) {
  const T = TRANSACTION_EDITOR_SCREEN_TOKENS;
  return (
    <div style={{
      background: `${TOKENS.error}${T.ERROR_BANNER_BG_OPACITY}`,
      borderLeftWidth: T.ERROR_BANNER_BORDER_LEFT_WIDTH,
      borderLeftStyle: 'solid', borderLeftColor: TOKENS.error,
      padding: T.ERROR_BANNER_PADDING,
      borderRadius: T.ERROR_BANNER_RADIUS,
      marginBottom: T.ERROR_BANNER_BOTTOM_MARGIN,
      display: 'flex', alignItems: 'flex-start', gap: T.ERROR_BANNER_ICON_GAP,
    }}>
      <Glyph name="warning" size={ICON_SIZE.sm} color={TOKENS.error}/>
      <div style={{ flex: 1 }}>
        <div style={{
          fontSize: TYPOGRAPHY.size.sm, fontWeight: TYPOGRAPHY.weight.medium,
          color: TOKENS.error, marginBottom: T.ERROR_BANNER_TITLE_BOTTOM_MARGIN,
        }}>{title}</div>
        <div style={{ fontSize: TYPOGRAPHY.size.sm, color: TOKENS.ink }}>{message}</div>
      </div>
    </div>
  );
}

// ─── EditorDateContainer ─── CalendarDialog 觸發 pill + recurring toggle button
// 日期改用自研 CalendarDialog（Spec 模式代號 Calendar Dialog · Datetime）：單一 pill 點開月曆 dialog。
// dialog 為 absolute 蓋滿最近 positioned 祖先（screen frame），浮在畫面上。
function EditorDateContainer({ recurring, onToggleRecurring }) {
  const T = TRANSACTION_EDITOR_SCREEN_TOKENS;
  return (
    <div style={{
      display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
      marginBottom: T.SECTION_GAP,
    }}>
      <div style={{ marginLeft: T.DATE_PILL_MARGIN_HORIZONTAL, marginRight: T.DATE_PILL_MARGIN_HORIZONTAL }}>
        <CalendarDialog mode="datetime"/>
      </div>
      <button onClick={onToggleRecurring} style={{
        width: T.RECURRING_TOGGLE_FRAME, height: T.RECURRING_TOGGLE_FRAME,
        borderRadius: T.RECURRING_TOGGLE_RADIUS,
        background: TOKENS.surface,
        borderWidth: 1, borderStyle: 'solid',
        borderColor: recurring ? TOKENS.p500 : TOKENS.border,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        cursor: 'pointer', padding: 0,
      }}>
        <Glyph name="repeat" size={ICON_SIZE.md} color={recurring ? TOKENS.p500 : TOKENS.ink3} stroke={2}/>
      </button>
    </div>
  );
}

// ─── EditorNoteField ─── 備註輸入欄
// placeholder color 對齊 impl placeholderTextColor={theme.state.disabled.fg} → TOKENS.ink3
// design canvas 為純 HTML <input>，inline style 不支援 ::placeholder，
// 改在 caller scope inject 一段 scoped CSS（className 唯一）。
function EditorNoteField({ value, onChange, onFocus, placeholder = '新增備註' }) {
  const T = TRANSACTION_EDITOR_SCREEN_TOKENS;
  return (
    <div style={{ marginBottom: T.SECTION_GAP }}>
      <style>{`.editor-note-input::placeholder { color: ${TOKENS.ink3}; }`}</style>
      <input
        className="editor-note-input"
        value={value || ''}
        onChange={(e) => onChange && onChange(e.target.value)}
        onFocus={onFocus}
        placeholder={placeholder}
        style={{
          width: '100%', boxSizing: 'border-box',
          background: TOKENS.surface,
          padding: T.NOTE_PADDING,
          borderRadius: RADIUS.md,
          borderWidth: 1, borderStyle: 'solid', borderColor: TOKENS.border,
          fontSize: TYPOGRAPHY.size.base, color: TOKENS.ink,
          fontFamily: 'inherit', outline: 'none',
        }}/>
    </div>
  );
}

// 刪除鈕已收斂為共用元件 DeleteButton（20_components/components.jsx），不再由本 helper 提供。

Object.assign(window, {
  EditorErrorBanner, EditorDateContainer, EditorNoteField,
});
