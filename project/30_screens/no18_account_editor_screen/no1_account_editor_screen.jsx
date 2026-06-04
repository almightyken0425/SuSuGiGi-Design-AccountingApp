// ─────────────────────────────────────────────────────────────
// AccountEditorScreen · 對齊 impl src/screens/Accounts/AccountEditorScreen.tsx
//
// Modal save form。本 canon 採 Form Structure V2 (Settings style) 定案：
//   1. 大字置中 name field（取代普通 TextInput + 上方標籤）
//   2. 幣別欄走 searchable dropdown（取代 collapsed picker）
//      幣別選項 label 格式為「<alphabeticCode> - <name>」，與基準貨幣設定頁
//      (no14_base_currency_setting_screen) 對齊
//   3. 圖示欄走 inline 4col grid 常駐（Icon Picker V1）
//   4. Footer 走 Footer Zone V1（Switch card + surface 底紅字 delete）
//
// 帳戶類型欄已移除：帳戶不再標記標準類型，新增帳戶只填名稱、幣別、圖示。
//
// 共用 form helper 由 shared/no3_editor_field_helpers.jsx 提供。
//
// Variants：
//   new  — 新增模式（title 在 SCREEN_META 設為「新增帳戶」），幣別可選
//   edit — 編輯模式，預填 '玉山活儲'；幣別為 disabled 樣式；含啟用 Switch 與刪除按鈕
// ─────────────────────────────────────────────────────────────

const ACCOUNT_ICON_IDS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

function AccountEditorScreen({ variant = 'new' }) {
  const T = ACCOUNT_EDITOR_SCREEN_TOKENS;
  const isEdit = variant === 'edit';
  const sample = ACC_BY_ID.bank; // '玉山活儲' for edit preview
  const defaults = ACCOUNT_EDITOR_NEW_DEFAULTS;
  const currencyLabel = `${isEdit ? sample.currency : defaults.currency} - New Taiwan Dollar`;
  const iconId = isEdit ? sample.iconId : defaults.iconId;

  return (
    <div style={{
      padding: T.SCREEN_PADDING,
      background: TOKENS.bg, minHeight: '100%',
    }}>
      <div style={{ marginBottom: T.FIELD_GAP }}>
        <EditorFieldLabel>名稱</EditorFieldLabel>
        <EditorNameField value={isEdit ? sample.name : ''} placeholder="" active={!isEdit}/>
      </div>

      <div style={{ marginBottom: T.FIELD_GAP }}>
        <EditorFieldLabel>幣別</EditorFieldLabel>
        <EditorSearchableDropdownCollapsed value={currencyLabel} disabled={isEdit}/>
      </div>

      <div style={{ marginBottom: T.FIELD_GAP }}>
        <EditorFieldLabel>圖示</EditorFieldLabel>
        <EditorInlineIconGrid icons={ACCOUNT_ICON_IDS} selectedId={iconId}/>
      </div>

      {isEdit && <EditorSwitchRow label="啟用" value={true}/>}
      {isEdit && <DeleteButton/>}
    </div>
  );
}

Object.assign(window, { AccountEditorScreen });
