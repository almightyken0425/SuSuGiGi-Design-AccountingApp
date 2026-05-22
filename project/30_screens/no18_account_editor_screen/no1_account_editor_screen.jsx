// ─────────────────────────────────────────────────────────────
// AccountEditorScreen · 對齊 impl src/screens/Accounts/AccountEditorScreen.tsx
//
// Modal save form。表單 4 欄：名稱 / 幣別 / 類型 / 圖示。
// Edit mode 多顯示啟用 Switch + 刪除按鈕；幣別 picker 在 edit mode 為 disabled。
// 共用 form helper 由 30_screens/shared/no3_editor_field_helpers.jsx 提供。
//
// Variants：
//   new  — 新增模式（title 在 SCREEN_META 設為「新增帳戶」）
//   edit — 編輯模式，預填 '玉山活儲'，含啟用 Switch 與刪除按鈕
// ─────────────────────────────────────────────────────────────

function AccountEditorScreen({ variant = 'new' }) {
  const T = ACCOUNT_EDITOR_SCREEN_TOKENS;
  const isEdit = variant === 'edit';
  const sample = ACC_BY_ID.bank; // '玉山活儲' for edit preview
  const defaults = ACCOUNT_EDITOR_NEW_DEFAULTS;

  return (
    <div style={{
      padding: T.SCREEN_PADDING,
      background: TOKENS.bg, minHeight: '100%',
    }}>
      <div style={{ marginBottom: T.FIELD_GAP }}>
        <EditorFieldLabel required>名稱</EditorFieldLabel>
        <EditorTextInput value={isEdit ? sample.name : ''} placeholder="例如：現金、玉山活儲"/>
      </div>

      <div style={{ marginBottom: T.FIELD_GAP }}>
        <EditorFieldLabel required>幣別</EditorFieldLabel>
        <EditorPickerCollapsed value={isEdit ? sample.currency : defaults.currency} disabled={isEdit}/>
      </div>

      <div style={{ marginBottom: T.FIELD_GAP }}>
        <EditorFieldLabel required>類型</EditorFieldLabel>
        <EditorPickerCollapsed value={isEdit ? '銀行帳戶' : defaults.type}/>
      </div>

      <div style={{ marginBottom: T.FIELD_GAP }}>
        <EditorFieldLabel required>圖示</EditorFieldLabel>
        <EditorPickerCollapsed
          leftIcon={<DynamicIconById iconId={isEdit ? sample.iconId : defaults.iconId} size={ICON_SIZE.md} color={TOKENS.ink}/>}
          value={isEdit ? 'ph-building' : 'ph-wallet'}/>
      </div>

      {isEdit && <EditorSwitchRow label="啟用" value={true}/>}
      {isEdit && <EditorDestructiveTextButton label="刪除帳戶"/>}
    </div>
  );
}

Object.assign(window, { AccountEditorScreen });
