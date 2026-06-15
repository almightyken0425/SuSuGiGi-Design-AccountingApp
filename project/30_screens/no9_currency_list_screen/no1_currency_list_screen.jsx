// ─────────────────────────────────────────────────────────────
// CurrencyListScreen · 對齊 impl src/screens/Settings/CurrencyListScreen.tsx
//
// Push screen。標準幣別列表 + 底部 BottomSearchBar。點 row 進入 CurrencyDetailConfig。
//
// Variants：
//   default    — 顯示所有幣別（mock 12 個）
//   no-results — 搜尋無命中（模擬已輸入「xyz」query）
// ─────────────────────────────────────────────────────────────

function CurrencyListScreen({ variant = 'default' }) {
  const T = CURRENCY_LIST_SCREEN_TOKENS;
  const isNoResults = variant === 'no-results';
  const query = isNoResults ? 'xyz' : '';
  const list = isNoResults ? [] : CURRENCY_LIST_MOCK;
  const showEmpty = list.length === 0;

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
            paddingBottom: BOTTOM_SEARCH_BAR_TOTAL_HEIGHT + T.LIST_BOTTOM_PADDING,
          }}>
            <ListGroupCard>
              {list.map(c => <CurrencyRow key={c.id} currency={c}/>)}
            </ListGroupCard>
          </div>
        )}
      </div>
      <BottomSearchBar value={query} onChangeText={() => {}} placeholder="搜尋"/>
    </div>
  );
}

Object.assign(window, { CurrencyListScreen });
