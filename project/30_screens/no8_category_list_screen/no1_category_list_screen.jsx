// ─────────────────────────────────────────────────────────────
// CategoryListScreen · 對齊 impl src/screens/Categories/CategoryListScreen.tsx
//
// Push screen。兩個 section（支出 / 收入，無標題），每 section 含：
//   1. ListSection（無 title，純分組外殼，不顯示「支出」/「收入」字樣）
//   2. ListGroupCard 含列表（impl 用 AutoDragSortableView 拖拉，design canvas 視覺示意）
//
// 新增入口已上移至 navbar 右上 [merge][+]（見 90_workbench/app.jsx SCREEN_META）。
// 點 [+] 進入 CategoryEditor，type 由 Editor 內收支欄預設 expense 決定。
//
// Variants：
//   default — 8 支出 + 2 收入（CATEGORIES fixture）
//   empty   — 兩 section 列表 ListGroupCard 為空 border
// ─────────────────────────────────────────────────────────────

function CategoryListScreen({ variant = 'default' }) {
  const T = CATEGORY_LIST_SCREEN_TOKENS;
  const all = variant === 'empty' ? [] : CATEGORIES;
  const expense = all.filter(c => c.type === 'expense');
  const income  = all.filter(c => c.type === 'income');

  return (
    <div style={{
      paddingTop: T.SCREEN_PADDING_TOP,
      paddingLeft: T.SCREEN_PADDING_HORIZONTAL,
      paddingRight: T.SCREEN_PADDING_HORIZONTAL,
      paddingBottom: T.SCREEN_PADDING_BOTTOM,
      background: TOKENS.bg,
      minHeight: '100%',
    }}>
      <ListSection>
        <ListGroupCard>
          {expense.map(c => <CategoryReorderRow key={c.id} category={c}/>)}
        </ListGroupCard>
      </ListSection>

      <ListSection>
        <ListGroupCard>
          {income.map(c => <CategoryReorderRow key={c.id} category={c}/>)}
        </ListGroupCard>
      </ListSection>
    </div>
  );
}

Object.assign(window, { CategoryListScreen });
