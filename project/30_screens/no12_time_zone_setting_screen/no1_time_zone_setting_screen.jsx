// ─────────────────────────────────────────────────────────────
// TimeZoneSettingScreen · 對齊 impl src/screens/Settings/TimeZoneSettingScreen.tsx
//
// Modal screen。SelectionListItem 列表 + 底部 BottomSearchBar。selected 排頂。
//
// Variants：
//   default    — 顯示時區（mock 10 個，已選 Taipei）
//   no-results — 搜尋無命中（模擬已輸入「xyz」query）
// ─────────────────────────────────────────────────────────────

function TimeZoneSettingScreen({ variant = 'default', selectedValue = 'Asia/Taipei' }) {
  const T = TIME_ZONE_SETTING_SCREEN_TOKENS;
  const isNoResults = variant === 'no-results';
  const query = isNoResults ? 'xyz' : '';
  const list = isNoResults ? [] : TIME_ZONE_MOCK;

  // impl 端 selected 排頂
  const sorted = React.useMemo(() => {
    return [...list].sort((a, b) => {
      if (a.name === selectedValue) return -1;
      if (b.name === selectedValue) return 1;
      return 0;
    });
  }, [list, selectedValue]);

  const showEmpty = sorted.length === 0;

  return (
    <div style={{
      display: 'flex', flexDirection: 'column', height: '100%',
      position: 'relative', background: TOKENS.bg,
    }}>
      <div style={{ flex: 1, overflowY: 'auto' }}>
        {showEmpty ? (
          <div style={{
            paddingTop: T.EMPTY_PADDING_TOP,
            display: 'flex', justifyContent: 'center',
          }}>
            <ListEmptyState
              iconName="magnify"
              title="找不到結果"
              description={query ? `「${query}」` : undefined}/>
          </div>
        ) : (
          <div style={{
            marginLeft: T.LIST_MARGIN_HORIZONTAL,
            marginRight: T.LIST_MARGIN_HORIZONTAL,
            paddingBottom: BOTTOM_SEARCH_BAR_TOTAL_HEIGHT + T.LIST_BOTTOM_PADDING,
          }}>
            <ListGroupCard>
              {sorted.map(tz => (
                <SelectionListItem
                  key={tz.name}
                  title={tz.label}
                  selected={tz.name === selectedValue}/>
              ))}
            </ListGroupCard>
          </div>
        )}
      </div>
      <BottomSearchBar value={query} onChangeText={() => {}} placeholder="搜尋"/>
    </div>
  );
}

Object.assign(window, { TimeZoneSettingScreen });
