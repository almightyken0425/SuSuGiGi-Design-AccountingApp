// ─────────────────────────────────────────────────────────────
// Exploration · Transaction Editor
//
// 觀察 10 條 → 出 10 個提案（P1-P10）→ Ken review 兩輪 → 留下 P1/P2/P7/P8/P9 採用，
// 其餘 P3/P4/P5/P6/P10 explored 後拒絕。整個主題**仍屬探索層**，沒對 Spec / Impl 下傳。
//
// 三個 section（DesignCanvas 直向堆疊）：
//   1. 目前的樣子 — 原樣還原 source/screens.jsx 的 TransactionEditor / TransferEditor
//   2. 提案區     — 6 個保留的提案（P1/P2/P7/P8/P9 標 [Current]，P10 也保留做素材）
//   3. 融合後     — 採用提案套到 Transaction + Transfer 上的整合版
//
// 來源：2026-05-18 claude.ai/design bundle
// 詳細狀態與決策脈絡見同層 README.md。
// ─────────────────────────────────────────────────────────────

function TxEdVariantShell({ children }) {
  return (
    <div style={{
      width: 460, height: 920,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
    }}>
      <IOSDevice width={402} height={874}>
        <div style={{ height: '100%', position: 'relative', overflow: 'hidden' }}>
          {children}
        </div>
      </IOSDevice>
    </div>
  );
}

function TransactionEditorSection() {
  return (
    <>
      <DCSection
        id="tx-editor-current"
        title="目前的樣子"
        subtitle="原樣還原 source/screens.jsx 的 TransactionEditor / TransferEditor。"
      >
        <DCArtboard id="tx-default" label="Transaction · default" width={460} height={920}>
          <TxEdVariantShell><CurrentTransactionEditor variant="default"/></TxEdVariantShell>
        </DCArtboard>
        <DCArtboard id="tx-recurring" label="Transaction · 開定期面板" width={460} height={920}>
          <TxEdVariantShell><CurrentTransactionEditor variant="recurring"/></TxEdVariantShell>
        </DCArtboard>
        <DCArtboard id="tx-error" label="Transaction · error state" width={460} height={920}>
          <TxEdVariantShell><CurrentTransactionEditor variant="error"/></TxEdVariantShell>
        </DCArtboard>
        <DCArtboard id="tx-edit" label="Transaction · edit mode" width={460} height={920}>
          <TxEdVariantShell><CurrentTransactionEditor variant="edit"/></TxEdVariantShell>
        </DCArtboard>
        <DCArtboard id="transfer-default" label="Transfer · 跨幣別" width={460} height={920}>
          <TxEdVariantShell><CurrentTransferEditor/></TxEdVariantShell>
        </DCArtboard>
        <DCArtboard id="observations" label="觀察筆記 · 10 個可優化處" width={680} height={1500}>
          <EditorObservations/>
        </DCArtboard>
      </DCSection>

      <DCSection
        id="tx-editor-proposals"
        title="提案區"
        subtitle="P1 / P2 / P7 / P8 / P9 經 Ken r2 review 保留，標 [Current] · 2026-05-18。P3 / P4 / P5 / P6 / P10 在 review 中被拒絕，定義仍在 proposals.jsx 留作探索素材。"
      >
        <DCArtboard id="p1" label="P1 · 日期 + 定期 合一卡 · [Current] 2026-05-18" width={460} height={600}>
          <Proposal1/>
        </DCArtboard>
        <DCArtboard id="p2" label="P2 · 金額 hero (含 backspace) · [Current] 2026-05-18" width={460} height={600}>
          <Proposal2/>
        </DCArtboard>
        <DCArtboard id="p7" label="P7 · 刪除移到 header + 確認 · [Current] 2026-05-18" width={460} height={600}>
          <Proposal7/>
        </DCArtboard>
        <DCArtboard id="p8" label="P8 · Transfer 兩個獨立金額欄 · [Current] 2026-05-18" width={460} height={600}>
          <Proposal8/>
        </DCArtboard>
        <DCArtboard id="p9" label="P9 · 中間箭頭可對調 from/to · [Current] 2026-05-18" width={460} height={600}>
          <Proposal9/>
        </DCArtboard>
        <DCArtboard id="p10" label="P10 · 三層視覺 hierarchy · Explored 2026-05-18" width={460} height={600}>
          <Proposal10/>
        </DCArtboard>
      </DCSection>

      <DCSection
        id="tx-editor-merged"
        title="融合後"
        subtitle="保留的 P1 / P2 / P7 / P8 / P9 一次套到 Transaction + Transfer editor 上，wheel picker 依 Ken 要求保留。仍屬探索成果，未對 Spec / Impl 下傳。"
      >
        <DCArtboard id="merged-tx" label="Transaction · 融合後" width={460} height={920}>
          <TxEdVariantShell><MergedTransactionEditor/></TxEdVariantShell>
        </DCArtboard>
        <DCArtboard id="merged-tx-edit" label="Transaction · 融合後 (edit 模式)" width={460} height={920}>
          <TxEdVariantShell><MergedTransactionEditor isEdit/></TxEdVariantShell>
        </DCArtboard>
        <DCArtboard id="merged-transfer" label="Transfer · 融合後" width={460} height={920}>
          <TxEdVariantShell><MergedTransferEditor/></TxEdVariantShell>
        </DCArtboard>
      </DCSection>
    </>
  );
}

Object.assign(window, { TransactionEditorSection });
