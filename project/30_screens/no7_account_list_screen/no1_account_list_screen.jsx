// ─────────────────────────────────────────────────────────────
// AccountListScreen · 對齊 impl src/screens/Accounts/AccountListScreen.tsx
//
// Push screen。單一 ListGroupCard 帳戶列表（impl 用 AutoDragSortableView 拖拉排序，
// design canvas 純視覺示意）。
//
// 新增入口已上移至 navbar 右上 [merge][+]（見 90_workbench/app.jsx SCREEN_META）。
// 點 [+] 進入 AccountEditor 新增模式。
//
// Variants：
//   default — 5 個帳戶（ACCOUNTS fixture）
//   empty   — 無帳戶；ListGroupCard 為空 border
// ─────────────────────────────────────────────────────────────

function AccountListScreen({ variant = 'default' }) {
  const T = ACCOUNT_LIST_SCREEN_TOKENS;
  const accounts = variant === 'empty' ? [] : ACCOUNTS;

  return (
    <div style={{
      padding: 0,
      paddingTop: T.SCREEN_PADDING_TOP,
      paddingLeft: T.SCREEN_PADDING_HORIZONTAL,
      paddingRight: T.SCREEN_PADDING_HORIZONTAL,
      paddingBottom: T.SCREEN_PADDING_BOTTOM,
      background: TOKENS.bg,
      minHeight: '100%',
    }}>
      <ListGroupCard>
        {accounts.map(a => (
          <AccountReorderRow key={a.id} account={a}/>
        ))}
      </ListGroupCard>
    </div>
  );
}

Object.assign(window, { AccountListScreen });
