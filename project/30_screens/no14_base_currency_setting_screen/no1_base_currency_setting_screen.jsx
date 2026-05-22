// ─────────────────────────────────────────────────────────────
// BaseCurrencySettingScreen · 對齊 impl src/screens/Settings/BaseCurrencySettingScreen.tsx
//
// Modal screen。SelectionListItem 列表 + 底部 BottomSearchBar。selected 排頂。
// 引用 CurrencyListScreen subsections 的 CURRENCY_LIST_MOCK（同 impl 端同樣讀 Currency.json）。
//
// Variants：
//   default    — 顯示幣別（已選 TWD）
//   no-results — 搜尋無命中
// ─────────────────────────────────────────────────────────────

function BaseCurrencySettingScreen({ variant = 'default', selectedId = 1 }) {
  const T = BASE_CURRENCY_SETTING_SCREEN_TOKENS;
  const isNoResults = variant === 'no-results';
  const query = isNoResults ? 'xyz' : '';
  const list = isNoResults ? [] : CURRENCY_LIST_MOCK;

  // impl 端 selected 排頂；其餘照 code 字母序
  const sorted = React.useMemo(() => {
    return [...list].sort((a, b) => {
      if (a.id === selectedId) return -1;
      if (b.id === selectedId) return 1;
      return a.alphabeticCode.localeCompare(b.alphabeticCode);
    });
  }, [list, selectedId]);

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
              {sorted.map(c => (
                <BaseCurrencyRow
                  key={c.id}
                  currency={c}
                  selected={c.id === selectedId}/>
              ))}
            </ListGroupCard>
          </div>
        )}
      </div>
      <BottomSearchBar value={query} onChangeText={() => {}} placeholder="搜尋"/>
    </div>
  );
}

Object.assign(window, { BaseCurrencySettingScreen });
