// ─────────────────────────────────────────────────────────────
// CategoryEditorScreen sub-sections · 預設值 + helper text
//
// 共用表單 helper 來自 `shared/no3_editor_field_helpers.jsx`。
// Form Structure V2 採用後，收支欄改 searchable dropdown，原 CategoryTypeSelector
// （雙按鈕橫排）已移除——該 component 內塞 chevron-down 的視覺 bug 一併消除。
//
// 本 screen 專屬：
//   - CATEGORY_EDITOR_SAMPLES：三 variant 預設值。新增模式 mapping 預設 = 該收支
//     標準類別清單第一項（餐飲 / 薪資），對齊 impl getFirstStandardCategoryId
//   - CATEGORY_MAPPING_HELPER_TEXT：標準分類映射說明
// ─────────────────────────────────────────────────────────────

const CATEGORY_EDITOR_SAMPLES = {
  // edit preview：「飲食」expense（iconId 13 ph-coffee）
  edit:        { name: '飲食',    type: 'expense', mapping: '餐飲',         iconId: 13 },
  newExpense:  { name: '',        type: 'expense', mapping: '餐飲',         iconId: 12 }, // ph-bread
  newIncome:   { name: '',        type: 'income',  mapping: '薪資',         iconId: 55 }, // (literal: impl default income icon)
};

const CATEGORY_MAPPING_HELPER_TEXT =
  '對應到標準分類後，可在統計與匯入匯出時自動分組。';

Object.assign(window, { CATEGORY_EDITOR_SAMPLES, CATEGORY_MAPPING_HELPER_TEXT });
