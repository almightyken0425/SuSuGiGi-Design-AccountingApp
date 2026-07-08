// ─────────────────────────────────────────────────────────────
// WeekStartSettingScreen · 對齊 impl src/screens/Settings/WeekStartSettingScreen.tsx
//
// Modal screen（header 含 close + checkmark）。
// 單一 ListGroupCard 含 3 個 SelectionListItem。
// 選定值決定 CalendarDialog 星期列順序與首頁週粒度期間起算日。
//
// Variants：
//   default — 已選「跟隨語系」
// ─────────────────────────────────────────────────────────────

function WeekStartSettingScreen({ selectedValue = 'auto' }) {
  const T = WEEK_START_SETTING_SCREEN_TOKENS;
  return (
    <div style={{
      paddingTop: T.SCREEN_PADDING_TOP,
      paddingLeft: T.SCREEN_PADDING_HORIZONTAL,
      paddingRight: T.SCREEN_PADDING_HORIZONTAL,
      paddingBottom: T.SCREEN_PADDING_BOTTOM,
      background: TOKENS.bg, minHeight: '100%',
    }}>
      <ListGroupCard>
        {WEEK_START_OPTIONS.map(opt => (
          <SelectionListItem
            key={opt.value}
            title={opt.label}
            selected={opt.value === selectedValue}/>
        ))}
      </ListGroupCard>
    </div>
  );
}

Object.assign(window, { WeekStartSettingScreen });
