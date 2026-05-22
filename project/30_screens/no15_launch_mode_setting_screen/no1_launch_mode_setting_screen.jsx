// ─────────────────────────────────────────────────────────────
// LaunchModeSettingScreen · 對齊 impl src/screens/Settings/LaunchModeSettingScreen.tsx
//
// Modal screen（header 含 close + checkmark）。
// 單一 ListGroupCard 含 4 個 SelectionListItem。
//
// Variants：
//   default — 已選「首頁」
// ─────────────────────────────────────────────────────────────

function LaunchModeSettingScreen({ selectedValue = 'home' }) {
  const T = LAUNCH_MODE_SETTING_SCREEN_TOKENS;
  return (
    <div style={{
      paddingTop: T.SCREEN_PADDING_TOP,
      paddingLeft: T.SCREEN_PADDING_HORIZONTAL,
      paddingRight: T.SCREEN_PADDING_HORIZONTAL,
      paddingBottom: T.SCREEN_PADDING_BOTTOM,
      background: TOKENS.bg, minHeight: '100%',
    }}>
      <ListGroupCard>
        {LAUNCH_MODE_OPTIONS.map(opt => (
          <SelectionListItem
            key={opt.value}
            title={opt.label}
            selected={opt.value === selectedValue}/>
        ))}
      </ListGroupCard>
    </div>
  );
}

Object.assign(window, { LaunchModeSettingScreen });
