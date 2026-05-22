// ─────────────────────────────────────────────────────────────
// LanguageSettingScreen sub-sections · option 清單常數
//
// impl 端 2 個選項硬編在 component 內，design canvas 移到 subsections 保持結構一致。
// impl 行為：選中項排序到頂（useMemo sort），design 端為視覺示意以 selected="zh-Hant" 為例。
// ─────────────────────────────────────────────────────────────

const LANGUAGE_OPTIONS = [
  { value: 'en',      label: 'English' },
  { value: 'zh-Hant', label: '繁體中文' },
];

Object.assign(window, { LANGUAGE_OPTIONS });
