// ─────────────────────────────────────────────────────────────
// ThemeSettingsScreen · 對齊 impl src/screens/Settings/ThemeSettingsScreen.tsx
//
// Modal screen。2 欄 SelectionGridItem 網格，每 cell 為 ThemePreviewRow（三色預覽）。
//
// Variants：
//   default — 已選「經典紫」（theme-1）
// ─────────────────────────────────────────────────────────────

function ThemeSettingsScreen({ selectedId = 'theme-1' }) {
  const T = THEME_SETTINGS_SCREEN_TOKENS;
  return (
    <div style={{
      padding: T.SCREEN_PADDING,
      background: TOKENS.bg, minHeight: '100%',
    }}>
      <div style={{
        display: 'flex', flexDirection: 'row', flexWrap: 'wrap',
        gap: T.GRID_GAP,
      }}>
        {THEME_OPTIONS.map(opt => (
          <div key={opt.id} style={{ width: T.GRID_CELL_WIDTH_PCT }}>
            <SelectionGridItem
              title={opt.name}
              selected={opt.id === selectedId}>
              <ThemePreviewRow theme={opt.theme}/>
            </SelectionGridItem>
          </div>
        ))}
      </div>
    </div>
  );
}

Object.assign(window, { ThemeSettingsScreen });
