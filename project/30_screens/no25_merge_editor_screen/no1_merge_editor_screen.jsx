// ─────────────────────────────────────────────────────────────
// MergeEditorScreen · 對齊 impl src/screens/Merge/MergeEditorScreen.tsx
//
// Modal save form。三段：source → target 視覺化 / 警告 banner / 兩 selector。
// mode='account' 用 AccountSelector，mode='category' 用 CategorySelector。
// impl 端有 filterCurrency 限制（account mode 合併只允許同幣別），design canvas
// 不演示 filter，僅以預設 sample 示意。
//
// Variants：
//   account  — 帳戶模式（source: 現金 / target: 玉山活儲）
//   category — 分類模式（source: 飲食 / target: 購物）
// ─────────────────────────────────────────────────────────────

function MergeEditorScreen({ variant = 'account' }) {
  const T = MERGE_EDITOR_SCREEN_TOKENS;
  const isAccount = variant === 'account';
  const source = isAccount ? ACC_BY_ID.cash : CAT_BY_ID.food;
  const target = isAccount ? ACC_BY_ID.bank : CAT_BY_ID.shop;

  return (
    <div style={{
      padding: T.SCREEN_PADDING,
      background: TOKENS.bg,
      minHeight: '100%',
    }}>
      <MergeVisualizationRow source={source} target={target}/>

      <MergeWarningBanner/>

      <div style={{
        display: 'flex', flexDirection: 'column',
        gap: T.SELECTOR_GAP,
      }}>
        {isAccount ? (
          <>
            <AccountSelector account={source} mode="from"/>
            <AccountSelector account={target} mode="to"/>
          </>
        ) : (
          <>
            <CategorySelector category={source} mode="from"/>
            <CategorySelector category={target} mode="to"/>
          </>
        )}
      </div>
    </div>
  );
}

Object.assign(window, { MergeEditorScreen });
