// ─────────────────────────────────────────────────────────────
// ImportScreen · 對齊 impl src/screens/Settings/ImportScreen.tsx
//
// Modal wizard，4 個 step。header 全 icon 導航承載前進/返回，無置底列。
// 各 variant 自繪 ImportWizardHeader + 對應 step 內容；SCREEN_META 採 present 'none'
// 讓 ScreenFrame 不再疊一層 ModalHeader。design canvas 靜態示意，不做 step navigation 互動。
//
// Variants：
//   step-1 — 選擇檔案（時區 wheel + 選檔 + 下載範本/說明）
//   step-2 — 欄位對應（逐欄位收合選擇器 + 首筆預覽）
//   step-3 — 內容比對（帳戶 / 支出類別 / 收入類別）
//   step-4 — 預覽（匯入摘要資料列）
// ─────────────────────────────────────────────────────────────

function ImportScreen({ variant = 'step-1' }) {
  const stepIndex =
    variant === 'step-1' ? 1 :
    variant === 'step-2' ? 2 :
    variant === 'step-3' ? 3 :
    variant === 'step-4' ? 4 : 1;

  const headerCfg =
    stepIndex === 1 ? { left: 'close', title: '選擇檔案', right: 'next' } :
    stepIndex === 2 ? { left: 'back',  title: '欄位對應', right: 'next' } :
    stepIndex === 3 ? { left: 'back',  title: '內容比對', right: 'next' } :
                      { left: 'back',  title: '預覽匯入', right: 'submit' };

  const renderStep = () => {
    switch (stepIndex) {
      case 1: return <ImportStep1FileSelect withFile={true}/>;
      case 2: return <ImportStep2Mapping/>;
      case 3: return <ImportStep3Matching/>;
      case 4: return <ImportStep4Preview/>;
      default: return null;
    }
  };

  return (
    <div style={{ minHeight: '100%', background: TOKENS.bg }}>
      <ImportWizardHeader {...headerCfg}/>
      {renderStep()}
    </div>
  );
}

Object.assign(window, { ImportScreen });
