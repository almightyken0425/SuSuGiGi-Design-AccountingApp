// ─────────────────────────────────────────────────────────────
// CategoryEditorScreen sub-sections · 預設值
//
// 共用表單 helper 來自 `shared/no3_editor_field_helpers.jsx`。
// Form Structure V2 採用後，收支欄改 searchable dropdown，原 CategoryTypeSelector
// （雙按鈕橫排）已移除——該 component 內塞 chevron-down 的視覺 bug 一併消除。
// 標準分類映射欄已移除：類別不再對應標準分類，故 sample 不再帶 mapping。
//
// 本 screen 專屬：
//   - CATEGORY_EDITOR_SAMPLES：三 variant 預設值。
// ─────────────────────────────────────────────────────────────

const CATEGORY_EDITOR_SAMPLES = {
  // edit preview：「飲食」expense（iconId 13 ph-coffee）
  // 圖示預設不分型：新增支出/收入的預設圖示同為 category 清單第一個（iconId 12 ph-bread）
  edit:        { name: '飲食',    type: 'expense', iconId: 13 },
  newExpense:  { name: '',        type: 'expense', iconId: 12 }, // ph-bread
  newIncome:   { name: '',        type: 'income',  iconId: 12 }, // ph-bread（與 expense 同源，不分型）
};

Object.assign(window, { CATEGORY_EDITOR_SAMPLES });
