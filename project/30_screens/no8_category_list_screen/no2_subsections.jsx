// ─────────────────────────────────────────────────────────────
// CategoryListScreen sub-sections · 私有 sub-section 元件
//
// 鏡射 impl src/screens/Categories/CategoryListScreen.tsx 拆分：
//   CategoryReorderRow / AddCategoryRow
//
// 消費 CATEGORY_LIST_SCREEN_TOKENS + LIST_TOKENS + atomic。
// ─────────────────────────────────────────────────────────────

// ─── CategoryReorderRow ─── 單張分類 row（含 disabled / subtitle = 「停用」）
// impl CategoryListItem 用 ReorderableListItem，title=name；
// disabled 時 subtitle="停用" + opacity 0.5。
function CategoryReorderRow({ category, disabled = false }) {
  const T = CATEGORY_LIST_SCREEN_TOKENS;
  return (
    <ReorderableListItem
      title={category.name}
      subtitle={disabled ? '停用' : undefined}
      leftIcon={
        <DynamicIconById iconId={category.iconId} size={LIST_TOKENS.ICON_SIZE_SMALL} color={TOKENS.ink}/>
      }
      style={{
        height: T.REORDER_ROW_HEIGHT,
        opacity: disabled ? 0.5 : 1,
      }}/>
  );
}

// ─── AddCategoryRow ─── 「新增支出 / 收入分類」row
// impl 用 ListItem + titleColor={theme.primary.main} + plus icon。
function AddCategoryRow({ type, onPress }) {
  const label = type === 'expense' ? '新增支出分類' : '新增收入分類';
  return (
    <ListItem
      leftIcon={
        <Glyph name="plus" size={LIST_TOKENS.ICON_SIZE_SMALL} color={TOKENS.p500} stroke={2.5}/>
      }
      title={label}
      titleColor={TOKENS.p500}
      onPress={onPress}/>
  );
}

Object.assign(window, { CategoryReorderRow, AddCategoryRow });
