// ─────────────────────────────────────────────────────────────
// LanguageSettingScreen · 對齊 impl src/screens/Settings/LanguageSettingScreen.tsx
//
// Modal screen（header 含 close + checkmark）。SelectionListItem 列表 + 底部 BottomSearchBar。
// selected 排頂，其餘照 nativeName localeCompare 字母序。
// 搜尋依語系代碼或原生名稱即時篩選。
//
// Variants：
//   default    — 已選「繁體中文」（zh-Hant 排頂，列出全 20 語系）
//   no-results — 搜尋無命中
// ─────────────────────────────────────────────────────────────

function LanguageSettingScreen({ variant = 'default', selectedValue = 'zh-Hant' }) {
  const T = LANGUAGE_SETTING_SCREEN_TOKENS;
  const isNoResults = variant === 'no-results';
  const query = isNoResults ? 'xyz' : '';
  const list = isNoResults ? [] : LANGUAGE_OPTIONS;

  // impl 端 selected 排頂；其餘照 nativeName localeCompare 字母序
  const sorted = React.useMemo(() => {
    return [...list].sort((a, b) => {
      if (a.value === selectedValue) return -1;
      if (b.value === selectedValue) return 1;
      return a.nativeName.localeCompare(b.nativeName);
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
            height: '100%',
            display: 'flex', justifyContent: 'center', alignItems: 'center',
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
            paddingTop: T.SCREEN_PADDING_TOP,
            paddingBottom: BOTTOM_SEARCH_BAR_TOTAL_HEIGHT + T.LIST_BOTTOM_PADDING,
          }}>
            <ListGroupCard>
              {sorted.map(opt => (
                <LanguageRow
                  key={opt.value}
                  option={opt}
                  selected={opt.value === selectedValue}/>
              ))}
            </ListGroupCard>
          </div>
        )}
      </div>
      <BottomSearchBar value={query} onChangeText={() => {}} placeholder="搜尋"/>
    </div>
  );
}

Object.assign(window, { LanguageSettingScreen });
