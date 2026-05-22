// ─────────────────────────────────────────────────────────────
// CategoryEditorScreen sub-sections · 預設值、helper text、type selector
//
// 共用表單 helper 來自 `shared/no3_editor_field_helpers.jsx`。
// 本 screen 專屬：
//   - CATEGORY_EDITOR_SAMPLES：三 variant 預設值
//   - CATEGORY_MAPPING_HELPER_TEXT：標準分類映射說明
//   - CategoryTypeSelector：expense / income 兩按鈕橫排切換
// ─────────────────────────────────────────────────────────────

const CATEGORY_EDITOR_SAMPLES = {
  // edit preview：「飲食」expense（iconId 13 ph-coffee）
  edit:        { name: '飲食',    type: 'expense', mapping: '飲食 (其他)', iconId: 13 },
  newExpense:  { name: '',        type: 'expense', mapping: '其他',         iconId: 12 }, // ph-bread
  newIncome:   { name: '',        type: 'income',  mapping: '其他',         iconId: 55 }, // (literal: impl default income icon)
};

const CATEGORY_MAPPING_HELPER_TEXT =
  '對應到標準分類後，可在統計與匯入匯出時自動分組。';

// ─── CategoryTypeSelector ─── 兩按鈕橫排切換 expense / income
// 視覺語彙複用 AccountSelectorCard 的 selected/unselected 表達：
//   selected   — border 2 TOKENS.p500 + 背景 TOKENS.p50 + 文字 TOKENS.p500
//   unselected — border 1 TOKENS.divider.hairline + 文字 TOKENS.ink2
// 編輯模式 disabled：整塊 opacity 0.5，使用者不可改 type，
// 避免破壞已有交易紀錄分類一致性。
function CategoryTypeSelector({ value, onChange, disabled = false }) {
  const T = CATEGORY_EDITOR_SCREEN_TOKENS.TYPE_SELECTOR;
  const optionBase = {
    flex: 1,
    height: T.HEIGHT,
    paddingLeft: T.PADDING_HORIZONTAL,
    paddingRight: T.PADDING_HORIZONTAL,
    display: 'flex', flexDirection: 'row',
    alignItems: 'center', justifyContent: 'space-between',
    borderRadius: T.RADIUS,
    borderStyle: 'solid',
    background: TOKENS.surface,
    cursor: disabled ? 'not-allowed' : 'pointer',
    fontFamily: 'inherit',
  };

  const renderOption = (optValue, label) => {
    const selected = value === optValue;
    return (
      <button
        key={optValue}
        onClick={() => !disabled && !selected && onChange?.(optValue)}
        disabled={disabled}
        style={{
          ...optionBase,
          borderWidth: selected ? T.BORDER_WIDTH_SELECTED : T.BORDER_WIDTH_DEFAULT,
          borderColor: selected ? TOKENS.p500 : TOKENS.divider.hairline,
          background:  selected ? TOKENS.p50  : TOKENS.surface,
        }}>
        <span style={{
          fontSize: TYPOGRAPHY.size.base,
          fontWeight: TYPOGRAPHY.weight.medium,
          color: selected ? TOKENS.p500 : TOKENS.ink2,
        }}>{label}</span>
        <Glyph
          name="chevron-down"
          size={ICON_SIZE.sm}
          color={selected ? TOKENS.p500 : TOKENS.ink3}
          stroke={2}/>
      </button>
    );
  };

  return (
    <div style={{
      display: 'flex', flexDirection: 'row', gap: T.GAP,
      marginBottom: CATEGORY_EDITOR_SCREEN_TOKENS.FIELD_GAP,
      opacity: disabled ? T.DISABLED_OPACITY : 1,
    }}>
      {renderOption('expense', '支出')}
      {renderOption('income',  '收入')}
    </div>
  );
}

Object.assign(window, { CATEGORY_EDITOR_SAMPLES, CATEGORY_MAPPING_HELPER_TEXT, CategoryTypeSelector });
