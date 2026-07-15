// ─────────────────────────────────────────────────────────────
// LaunchModeSettingScreen sub-sections · option 清單常數
//
// impl 端 4 個選項硬編在 component 內，design canvas 移到 subsections 保持結構一致。
// ─────────────────────────────────────────────────────────────

const LAUNCH_MODE_OPTIONS = [
  { value: 'home',     label: '首頁' },
  { value: 'expense',  label: '支出' },
  { value: 'income',   label: '收入' },
  { value: 'transfer', label: '轉帳' },
];

Object.assign(window, { LAUNCH_MODE_OPTIONS });
