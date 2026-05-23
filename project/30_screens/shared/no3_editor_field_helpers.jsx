// ─────────────────────────────────────────────────────────────
// shared / Editor field helpers · AccountEditor + CategoryEditor 共用
//
// impl 端 AccountEditorScreen 與 CategoryEditorScreen 各自 inline 實作 form group
// （label + input/picker），但兩者結構一致。design canvas 採 global namespace 無法
// 雙 screen 同名 sub-section 共存，故 promote 共用（同 no2_editor_form_helpers
// 的 promotion 邏輯）。
//
// 將來若 impl 重構抽出共用元件（如 EditorFormField），可改升入 20_components/。
//
// 消費 atomic（SPACING / RADIUS / TYPOGRAPHY / TYPE_STYLES / ICON_SIZE / TOKENS）。
// 不消費 screen-level token：本 helper 給多支 screen 用，token 來自 caller 或自帶 default。
// ─────────────────────────────────────────────────────────────

// ─── EditorFieldLabel ─── 欄位上方小標題（含 required *）
function EditorFieldLabel({ children, required }) {
  return (
    <div style={{
      fontSize: TYPOGRAPHY.size.sm, color: TOKENS.ink2,
      marginBottom: SPACING.sm,
    }}>
      {children}{required && ' *'}
    </div>
  );
}

// ─── EditorTextInput ─── 表單文字輸入（design canvas 為 read-only 視覺）
function EditorTextInput({ value, placeholder, disabled }) {
  const isEmpty = !value;
  return (
    <div style={{
      background: TOKENS.surface,
      padding: SPACING.md,
      borderRadius: RADIUS.md,
      borderWidth: 1, borderStyle: 'solid', borderColor: TOKENS.divider.hairline,
      fontSize: TYPOGRAPHY.size.base,
      color: disabled ? TOKENS.ink3 : (isEmpty ? TOKENS.ink3 : TOKENS.ink),
    }}>
      {value || placeholder}
    </div>
  );
}

// ─── EditorPickerCollapsed ─── collapsed picker（左 value、右 chevron）
// impl expand 後展開 SelectionListItem 列表，design canvas 不做 expanded variant
function EditorPickerCollapsed({ value, leftIcon, disabled }) {
  return (
    <div style={{
      display: 'flex', flexDirection: 'row',
      justifyContent: 'space-between', alignItems: 'center',
      background: TOKENS.surface,
      padding: SPACING.md,
      borderRadius: RADIUS.md,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: SPACING.sm }}>
        {leftIcon}
        <span style={{
          fontSize: TYPOGRAPHY.size.base,
          color: disabled ? TOKENS.ink3 : TOKENS.ink,
        }}>{value}</span>
      </div>
      {!disabled && (
        <Glyph name="chevron-down" size={ICON_SIZE.sm} color={TOKENS.ink2} stroke={2}/>
      )}
    </div>
  );
}

// ─── EditorSwitchRow ─── 「啟用」開關 row（edit mode only）
function EditorSwitchRow({ label, value }) {
  return (
    <div style={{
      display: 'flex', flexDirection: 'row',
      justifyContent: 'space-between', alignItems: 'center',
      background: TOKENS.surface,
      padding: SPACING.lg,
      borderRadius: RADIUS.md,
      marginBottom: SPACING.xl,
    }}>
      <span style={{ fontSize: TYPOGRAPHY.size.base, color: TOKENS.ink }}>{label}</span>
      <Switch value={value}/>
    </div>
  );
}

// ─── EditorDestructiveTextButton ─── 「刪除」按鈕（destructive 中央紅字，edit mode only）
function EditorDestructiveTextButton({ label }) {
  return (
    <div style={{
      display: 'flex', justifyContent: 'center',
      padding: SPACING.lg,
      fontSize: TYPOGRAPHY.size.base,
      color: TOKENS.error,
    }}>
      {label}
    </div>
  );
}

Object.assign(window, {
  EditorFieldLabel, EditorTextInput, EditorPickerCollapsed,
  EditorSwitchRow, EditorDestructiveTextButton,
});
