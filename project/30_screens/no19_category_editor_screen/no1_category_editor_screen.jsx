// ─────────────────────────────────────────────────────────────
// CategoryEditorScreen · 對齊 impl src/screens/Categories/CategoryEditorScreen.tsx
//
// Modal save form。本 canon 採 Form Structure V2 (Settings style) 定案：
//   1. 大字置中 name field（未填顯示「名稱」提示文字）
//   2. 收支欄走 searchable dropdown（取代雙按鈕橫排的 segmented control，
//      原本 segmented 內塞 chevron-down 是視覺 bug，整片改為 dropdown 後消除）
//   3. 圖示欄走 inline 4col grid 常駐（Icon Picker V1）
//   4. Footer 走 Footer Zone V1（Switch card + surface 底紅字 delete）
//
// 三欄（名稱 / 收支 / 圖示）均移除 EditorFieldLabel 欄位標題；名稱欄改以 placeholder 提示。
// 編輯模式 type selector 為 disabled，避免破壞已建立交易紀錄分類一致性。
// 標準分類映射欄已移除：類別不再對應標準分類。
//
// 共用 form helper 由 shared/no3_editor_field_helpers.jsx 提供。
//
// Variants：
//   new-expense — 新增支出分類
//   new-income  — 新增收入分類
//   edit        — 編輯模式，預填「飲食」；收支欄鎖死 disabled；含啟用 Switch 與刪除按鈕
// ─────────────────────────────────────────────────────────────

const CATEGORY_ICON_IDS = [12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23];

function CategoryEditorScreen({ variant = 'new-expense' }) {
  const T = CATEGORY_EDITOR_SCREEN_TOKENS;
  const isEdit = variant === 'edit';
  const sample = variant === 'edit'        ? CATEGORY_EDITOR_SAMPLES.edit
              : variant === 'new-income'   ? CATEGORY_EDITOR_SAMPLES.newIncome
              :                              CATEGORY_EDITOR_SAMPLES.newExpense;
  const typeLabel = sample.type === 'income' ? '收入' : '支出';

  return (
    <div style={{
      padding: T.SCREEN_PADDING,
      background: TOKENS.bg, minHeight: '100%',
    }}>
      <div style={{ marginBottom: T.FIELD_GAP }}>
        <EditorNameField value={sample.name} placeholder="名稱" active={!isEdit && !sample.name}/>
      </div>

      <div style={{ marginBottom: T.FIELD_GAP }}>
        <EditorSearchableDropdownCollapsed value={typeLabel} disabled={isEdit}/>
      </div>

      <div style={{ marginBottom: T.FIELD_GAP }}>
        <EditorInlineIconGrid icons={CATEGORY_ICON_IDS} selectedId={sample.iconId}/>
      </div>

      {isEdit && <EditorSwitchRow label="啟用" value={true}/>}
      {isEdit && <DeleteButton/>}
    </div>
  );
}

Object.assign(window, { CategoryEditorScreen });
