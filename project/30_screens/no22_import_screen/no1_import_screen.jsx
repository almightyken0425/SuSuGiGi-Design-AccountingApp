// ─────────────────────────────────────────────────────────────
// ImportScreen · 對齊 impl src/screens/Settings/ImportScreen.tsx
//
// Modal wizard，5 個 step。impl 端用 WizardStepContainer 包 children + 底部 footer。
// design canvas 各 variant 直接 render 對應 step 的內容 + footer 靜態示意，
// 不做 step navigation 互動。
//
// Variants：
//   step-0 — 模板說明（時區 + 下載範本 + 欄位說明）
//   step-1 — 檔案選擇（empty / with-file 用同 variant，design 端取 with-file 預覽）
//   step-2 — 欄位對應（chip 選擇）
//   step-3 — 內容比對（USE_EXISTING / CREATE / SKIP）
//   step-4 — 預覽（統計卡 + ready 提示）
// ─────────────────────────────────────────────────────────────

function ImportScreen({ variant = 'step-0' }) {
  const T = IMPORT_SCREEN_TOKENS;
  const stepIndex =
    variant === 'step-0' ? 0 :
    variant === 'step-1' ? 1 :
    variant === 'step-2' ? 2 :
    variant === 'step-3' ? 3 :
    variant === 'step-4' ? 4 : 0;

  const renderStep = () => {
    switch (stepIndex) {
      case 0: return <ImportStep0Template/>;
      case 1: return <ImportStep1FileSelect withFile={true}/>;
      case 2: return <ImportStep2Mapping/>;
      case 3: return <ImportStep3Matching/>;
      case 4: return <ImportStep4Preview/>;
      default: return null;
    }
  };

  const nextLabel = stepIndex === 4 ? '開始匯入' : '下一步';

  return (
    <div style={{
      position: 'relative',
      height: '100%',
      background: TOKENS.bg,
    }}>
      <div style={{
        paddingTop: T.SCREEN_PADDING,
        paddingLeft: T.SCREEN_PADDING,
        paddingRight: T.SCREEN_PADDING,
        paddingBottom: T.FOOTER_BAR_HEIGHT + T.SCREEN_PADDING,
        minHeight: '100%',
        boxSizing: 'border-box',
      }}>
        {renderStep()}
      </div>
      <ImportWizardFooter hasBack={stepIndex > 0} nextLabel={nextLabel}/>
    </div>
  );
}

Object.assign(window, { ImportScreen });
