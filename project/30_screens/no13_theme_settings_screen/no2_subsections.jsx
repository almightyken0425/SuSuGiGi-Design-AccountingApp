// ─────────────────────────────────────────────────────────────
// ThemeSettingsScreen sub-sections · design canvas themes 清單 + preview
//
// impl 端 themesList = Object.values(THEMES)，design canvas 引用 atomic THEME_1 / THEME_2。
// ─────────────────────────────────────────────────────────────

const THEME_OPTIONS = [
  { id: 'theme-1', name: '經典紫', theme: THEME_1 },
  { id: 'theme-2', name: '海洋藍', theme: THEME_2 },
];

// ─── ThemePreviewRow ─── 三色預覽（primary 500 / primary 900 / bg）
// impl 用 theme.primary[500], theme.primary[900], theme.bg.base
function ThemePreviewRow({ theme }) {
  return (
    <>
      <div style={{ flex: 1, background: theme.primary[500] }}/>
      <div style={{ flex: 1, background: theme.primary[900] }}/>
      <div style={{ flex: 1, background: theme.bg.base }}/>
    </>
  );
}

Object.assign(window, { THEME_OPTIONS, ThemePreviewRow });
