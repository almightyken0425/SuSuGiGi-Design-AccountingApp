// ─────────────────────────────────────────────────────────────
// MergeEditorScreen · 對齊 impl src/screens/Merge/MergeEditorScreen.tsx
//
// Modal save form。三段：source → target 視覺化 / 警告 banner / 橫向 dual picker box。
// 來源 / 目標兩 selector 收進一個橫向 box（MergePickerBox），取代現況的 modal-in-modal。
// 互動模型：來源列全部、可任選；目標只列與來源相容子集（類別同 type、帳戶同幣別），
// 相同則完成停用 + box 轉紅。design canvas 不演示 filter / 互動，僅以預設 sample 示意。
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

      <MergePickerBox sourceLabel={source.name} targetLabel={target.name}/>
    </div>
  );
}

Object.assign(window, { MergeEditorScreen });
