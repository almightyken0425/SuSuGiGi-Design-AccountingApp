// ─────────────────────────────────────────────────────────────
// AccountListScreen sub-sections · 私有 sub-section 元件
//
// 鏡射 impl src/screens/Accounts/AccountListScreen.tsx 拆分：
//   AccountReorderRow
//
// 新增入口已上移至 navbar 右上 [+]，inline AddAccountRow 已移除。
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

Object.assign(window, { AccountReorderRow });
