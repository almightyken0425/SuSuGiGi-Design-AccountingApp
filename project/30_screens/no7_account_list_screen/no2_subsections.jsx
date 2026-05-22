// ─────────────────────────────────────────────────────────────
// AccountListScreen sub-sections · 私有 sub-section 元件
//
// 鏡射 impl src/screens/Accounts/AccountListScreen.tsx 拆分：
//   AccountReorderRow / AddAccountRow
//
// 消費 ACCOUNT_LIST_SCREEN_TOKENS + LIST_TOKENS + atomic。
// ─────────────────────────────────────────────────────────────

// ─── AccountReorderRow ─── 單張帳戶 row（含 disabled 樣式）
// impl AccountListItem 用 ReorderableListItem + DynamicIconById；title=name、subtitle=currencyCode。
function AccountReorderRow({ account, disabled = false }) {
  const T = ACCOUNT_LIST_SCREEN_TOKENS;
  return (
    <ReorderableListItem
      title={account.name}
      subtitle={account.currency}
      leftIcon={
        <DynamicIconById iconId={account.iconId} size={LIST_TOKENS.ICON_SIZE_SMALL} color={TOKENS.ink}/>
      }
      style={{
        height: T.REORDER_ROW_HEIGHT,
        opacity: disabled ? 0.5 : 1,
      }}/>
  );
}

// ─── AddAccountRow ─── 「新增帳戶」入口 row（primary 色文字 + plus icon）
// impl 用 ListItem + titleColor={theme.primary.main}，leftIcon 為 MaterialCommunityIcons plus。
function AddAccountRow({ onPress }) {
  return (
    <ListItem
      leftIcon={
        <Glyph name="plus" size={LIST_TOKENS.ICON_SIZE_SMALL} color={TOKENS.p500} stroke={2.5}/>
      }
      title="新增帳戶"
      titleColor={TOKENS.p500}
      onPress={onPress}/>
  );
}

Object.assign(window, { AccountReorderRow, AddAccountRow });
