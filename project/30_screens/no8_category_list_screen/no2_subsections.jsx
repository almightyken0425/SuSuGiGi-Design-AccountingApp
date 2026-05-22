// ─────────────────────────────────────────────────────────────
// CategoryListScreen sub-sections · 私有 sub-section 元件
//
// 鏡射 impl src/screens/Categories/CategoryListScreen.tsx 拆分：
//   CategoryReorderRow
//
// 新增入口已上移至 navbar 右上 [+]，inline AddCategoryRow 已移除。
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

Object.assign(window, { CategoryReorderRow });
