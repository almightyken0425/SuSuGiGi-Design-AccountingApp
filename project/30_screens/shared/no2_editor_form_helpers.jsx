// ─────────────────────────────────────────────────────────────
// Editor form helpers · TxEditor + TransferEditor 共用的 design canvas form 元件
//
// impl 端 TxEditorScreen 與 TransferEditorScreen 內各自 inline 實作這幾個結構，
// 沒有抽共用元件（沒列入 src/components/）。
// design canvas 因 global namespace 限制無法兩 screen 各自定義同名 sub-section，
// 故於此 promote 共用，視覺上兩 screen 仍維持完全一致（impl-aligned）。
//
// 將來若 impl 重構抽出 EditorDateRow / EditorNoteField 等，可改升入 20_components/。
// ─────────────────────────────────────────────────────────────

// ─── EditorErrorBanner ─── 視覺對應 impl Alert.alert（inline banner 對齊 design canvas）
function EditorErrorBanner({ title = '錯誤', message = '請輸入有效金額' }) {
  const T = TX_EDITOR_SCREEN_TOKENS;
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

// ─── EditorDateContainer ─── 日期 pill + recurring toggle button
function EditorDateContainer({ dateLabel = '2026/05/14  14:30', recurring, onToggleRecurring }) {
  // 樣式參數以 TxEditor / TransferEditor 各自 SCREEN_TOKENS 提供的接口為準；
  // 此處取 TX_EDITOR_SCREEN_TOKENS 為 anchor（兩 screen 視覺一致，不另複製）。
  const T = TX_EDITOR_SCREEN_TOKENS;
  return (
    <div style={{
      display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
      marginBottom: T.SECTION_GAP,
    }}>
      <div style={{
        display: 'flex', alignItems: 'center',
        background: TOKENS.surface,
        paddingTop: T.DATE_PILL_PADDING_VERTICAL, paddingBottom: T.DATE_PILL_PADDING_VERTICAL,
        paddingLeft: T.DATE_PILL_PADDING_HORIZONTAL, paddingRight: T.DATE_PILL_PADDING_HORIZONTAL,
        borderRadius: T.DATE_PILL_RADIUS,
        borderWidth: 1, borderStyle: 'solid', borderColor: TOKENS.border,
        marginLeft: T.DATE_PILL_MARGIN_HORIZONTAL, marginRight: T.DATE_PILL_MARGIN_HORIZONTAL,
      }}>
        <span style={{
          fontSize: TYPOGRAPHY.size.base, color: TOKENS.ink,
          fontWeight: TYPOGRAPHY.weight.medium,
        }}>{dateLabel}</span>
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
function EditorNoteField({ value, onChange, onFocus, placeholder = '新增備註' }) {
  const T = TX_EDITOR_SCREEN_TOKENS;
  return (
    <div style={{ marginBottom: T.SECTION_GAP }}>
      <input
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

// ─── EditorDeleteButton ─── isEdit=true 時顯示
function EditorDeleteButton({ label = '刪除' }) {
  const T = TX_EDITOR_SCREEN_TOKENS;
  return (
    <div style={{
      marginTop: T.DELETE_BUTTON_TOP_MARGIN,
      display: 'flex', justifyContent: 'center',
    }}>
      <button style={{
        padding: T.DELETE_BUTTON_PADDING, background: 'transparent',
        border: 'none', cursor: 'pointer', fontFamily: 'inherit',
        color: TOKENS.error, fontSize: TYPOGRAPHY.size.base,
      }}>{label}</button>
    </div>
  );
}

Object.assign(window, {
  EditorErrorBanner, EditorDateContainer, EditorNoteField, EditorDeleteButton,
});
