// ─────────────────────────────────────────────────────────────
// AccountListScreen · 對齊 impl src/screens/Accounts/AccountListScreen.tsx
//
// Push screen。兩段 ListGroupCard：
//   1. 帳戶列表（impl 用 AutoDragSortableView 拖拉排序，design canvas 純視覺示意）
//   2. 「新增帳戶」入口 row
//
// Variants：
//   default — 5 個帳戶（ACCOUNTS fixture）
//   empty   — 無帳戶；對齊 impl 行為：第一個 ListGroupCard 為空 border，
//             第二個 ListGroupCard 的「新增帳戶」row 仍在
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
      <ListGroupCard>
        <AddAccountRow/>
      </ListGroupCard>
    </div>
  );
}

Object.assign(window, { AccountListScreen });
