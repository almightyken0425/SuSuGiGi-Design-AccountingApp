// ─────────────────────────────────────────────────────────────
// CategoryEditorScreen · 對齊 impl src/screens/Categories/CategoryEditorScreen.tsx
//
// Modal save form。本 canon 採 Form Structure V2 (Settings style) 定案：
//   1. 大字置中 name field（取代普通 TextInput + 上方標籤）
//   2. 收支欄走 searchable dropdown（取代雙按鈕橫排的 segmented control，
//      原本 segmented 內塞 chevron-down 是視覺 bug，整片改為 dropdown 後消除）
//   3. 標準對照欄走 searchable dropdown（50+ 選項不適合 button group）
//   4. 圖示欄走 inline 4col grid 常駐（Icon Picker V1）
//   5. Footer 走 Footer Zone V1（Switch card + surface 底紅字 delete）
//
// 編輯模式 type selector 為 disabled，避免破壞已建立交易紀錄分類一致性。
//
// 共用 form helper 由 shared/no3_editor_field_helpers.jsx 提供。
//
// Variants：
//   new-expense — 新增支出分類
//   new-income  — 新增收入分類
//   edit        — 編輯模式，預填「飲食」；收支欄鎖死 disabled；含啟用 Switch 與刪除按鈕
// ─────────────────────────────────────────────────────────────

const CATEGORY_ICON_IDS = [12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23];
const STD_CATEGORY_EXPENSE = ['餐飲', '交通', '購物', '娛樂', '居住', '水電', '醫療', '教育', '其他'];
const STD_CATEGORY_INCOME  = ['薪資', '獎金', '投資', '其他'];

function CategoryEditorScreen({ variant = 'new-expense' }) {
  const T = CATEGORY_EDITOR_SCREEN_TOKENS;
  const isEdit = variant === 'edit';
  const sample = variant === 'edit'        ? CATEGORY_EDITOR_SAMPLES.edit
              : variant === 'new-income'   ? CATEGORY_EDITOR_SAMPLES.newIncome
              :                              CATEGORY_EDITOR_SAMPLES.newExpense;
  const typeLabel = sample.type === 'income' ? '收入' : '支出';
  const stdOptions = sample.type === 'income' ? STD_CATEGORY_INCOME : STD_CATEGORY_EXPENSE;

  return (
    <div style={{
      padding: T.SCREEN_PADDING,
      background: TOKENS.bg, minHeight: '100%',
    }}>
      <div style={{ marginBottom: T.FIELD_GAP }}>
        <EditorFieldLabel>分類名稱</EditorFieldLabel>
        <EditorNameField value={sample.name} placeholder="" active={!isEdit && !sample.name}/>
      </div>

      <div style={{ marginBottom: T.FIELD_GAP }}>
        <EditorFieldLabel>收支</EditorFieldLabel>
        <EditorSearchableDropdownCollapsed value={typeLabel} disabled={isEdit}/>
      </div>

      <div style={{ marginBottom: T.FIELD_GAP }}>
        <EditorFieldLabel>類型</EditorFieldLabel>
        <EditorButtonGroup options={stdOptions} selected={sample.mapping}/>
        <div style={{
          fontSize: T.HELPER_FONT_SIZE,
          color: TOKENS.ink3,
          marginTop: T.HELPER_TOP_MARGIN,
        }}>
          {CATEGORY_MAPPING_HELPER_TEXT}
        </div>
      </div>

      <div style={{ marginBottom: T.FIELD_GAP }}>
        <EditorFieldLabel>圖示</EditorFieldLabel>
        <EditorInlineIconGrid icons={CATEGORY_ICON_IDS} selectedId={sample.iconId}/>
      </div>

      {isEdit && <EditorSwitchRow label="啟用" value={true}/>}
      {isEdit && <EditorDestructiveTextButton label="刪除分類"/>}
    </div>
  );
}

Object.assign(window, { CategoryEditorScreen });
