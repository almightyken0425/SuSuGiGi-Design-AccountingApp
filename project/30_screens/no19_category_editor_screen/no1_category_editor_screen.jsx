// ─────────────────────────────────────────────────────────────
// CategoryEditorScreen · 對齊 impl src/screens/Categories/CategoryEditorScreen.tsx
//
// Modal save form。Type 由 form 內 CategoryTypeSelector 兩按鈕橫排決定。
// 表單 4 欄：類型 / 名稱 / 標準分類映射 / 圖示。Edit mode 多顯示啟用 Switch + 刪除。
// 編輯模式 type selector disabled，避免破壞已有交易紀錄分類一致性。
// 共用 form helper 由 30_screens/shared/no3_editor_field_helpers.jsx 提供。
//
// Variants：
//   new-expense — 新增支出分類（type=expense）
//   new-income  — 新增收入分類（type=income）
//   edit        — 編輯模式，預填「飲食」，含啟用 Switch 與刪除按鈕；type selector 鎖死
// ─────────────────────────────────────────────────────────────

function CategoryEditorScreen({ variant = 'new-expense' }) {
  const T = CATEGORY_EDITOR_SCREEN_TOKENS;
  const isEdit = variant === 'edit';
  const sample = variant === 'edit'        ? CATEGORY_EDITOR_SAMPLES.edit
              : variant === 'new-income'   ? CATEGORY_EDITOR_SAMPLES.newIncome
              :                              CATEGORY_EDITOR_SAMPLES.newExpense;

  return (
    <div style={{
      padding: T.SCREEN_PADDING,
      background: TOKENS.bg, minHeight: '100%',
    }}>
      <CategoryTypeSelector value={sample.type} disabled={isEdit}/>

      <div style={{ marginBottom: T.FIELD_GAP }}>
        <EditorFieldLabel required>分類名稱</EditorFieldLabel>
        <EditorTextInput value={sample.name} placeholder="例如：飲食、薪資"/>
      </div>

      <div style={{ marginBottom: T.FIELD_GAP }}>
        <EditorFieldLabel>標準分類對應</EditorFieldLabel>
        <EditorPickerCollapsed value={sample.mapping}/>
        <div style={{
          fontSize: T.HELPER_FONT_SIZE,
          color: TOKENS.ink3,
          marginTop: T.HELPER_TOP_MARGIN,
        }}>
          {CATEGORY_MAPPING_HELPER_TEXT}
        </div>
      </div>

      <div style={{ marginBottom: T.FIELD_GAP }}>
        <EditorFieldLabel required>圖示</EditorFieldLabel>
        <EditorPickerCollapsed
          leftIcon={<DynamicIconById iconId={sample.iconId} size={ICON_SIZE.md} color={TOKENS.ink}/>}
          value={isEdit ? 'ph-coffee' : (sample.type === 'income' ? 'ph-bus' : 'ph-bread')}/>
      </div>

      {isEdit && <EditorSwitchRow label="啟用" value={true}/>}
      {isEdit && <EditorDestructiveTextButton label="刪除分類"/>}
    </div>
  );
}

Object.assign(window, { CategoryEditorScreen });
