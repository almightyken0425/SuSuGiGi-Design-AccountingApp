// ─────────────────────────────────────────────────────────────
// AccountEditorScreen sub-sections · 私有 sub-section 元件 + 預設值
//
// 共用表單 helper（EditorFieldLabel / EditorTextInput / EditorPickerCollapsed /
// EditorSwitchRow）已 promote 到 `shared/no3_editor_field_helpers.jsx`；刪除鈕改用
// 共用元件 DeleteButton（20_components/components.jsx）。本檔僅放 AccountEditor 專屬資料。
// ─────────────────────────────────────────────────────────────

// 本 screen v1 無專屬 sub-section（form layout 全在 entry 內組合 shared helper），
// 預留檔案保持「每 screen 三件套」結構慣例。將來若 AccountEditor 出現專屬子段（如
// AccountBalanceSection）再加入此處。
const ACCOUNT_EDITOR_NEW_DEFAULTS = {
  currency: 'TWD',
  iconId:   3,        // ph-wallet（與 impl 端 default iconId 對齊）
};

Object.assign(window, { ACCOUNT_EDITOR_NEW_DEFAULTS });
