// ─────────────────────────────────────────────────────────────
// CategoryEditorScreen sub-sections · 預設值與 helper text
//
// 共用表單 helper 來自 `shared/no3_editor_field_helpers.jsx`。
// 本 screen 專屬只有 standard category mapping 的提示文字與預設值。
// ─────────────────────────────────────────────────────────────

const CATEGORY_EDITOR_SAMPLES = {
  // edit preview：「飲食」expense（iconId 13 ph-coffee）
  edit:        { name: '飲食',    type: 'expense', mapping: '飲食 (其他)', iconId: 13 },
  newExpense:  { name: '',        type: 'expense', mapping: '其他',         iconId: 12 }, // ph-bread
  newIncome:   { name: '',        type: 'income',  mapping: '其他',         iconId: 55 }, // (literal: impl default income icon)
};

const CATEGORY_MAPPING_HELPER_TEXT =
  '對應到標準分類後，可在統計與匯入匯出時自動分組。';

Object.assign(window, { CATEGORY_EDITOR_SAMPLES, CATEGORY_MAPPING_HELPER_TEXT });
