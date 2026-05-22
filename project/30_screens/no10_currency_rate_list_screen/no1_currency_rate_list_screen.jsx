// ─────────────────────────────────────────────────────────────
// CurrencyRateListScreen · 對齊 impl src/screens/Settings/CurrencyRateListScreen.tsx
//
// Push screen。匯率對列表 + 底部 BottomSearchBar。點 row 進入 CurrencyRateEditor。
//
// Variants：
//   default — 顯示匯率對（mock 6 對）
//   empty   — 尚未設定任何匯率（無 search query）
// ─────────────────────────────────────────────────────────────

function CurrencyRateListScreen({ variant = 'default' }) {
  const T = CURRENCY_RATE_LIST_SCREEN_TOKENS;
  const isEmpty = variant === 'empty';
  const list = isEmpty ? [] : CURRENCY_RATE_MOCK;
  const showEmpty = list.length === 0;

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
              iconName="exchange"
              title="尚無匯率設定"
              description="新增帳戶或交易時會自動建立常用匯率"/>
          </div>
        ) : (
          <div style={{
            marginLeft: T.LIST_MARGIN_HORIZONTAL,
            marginRight: T.LIST_MARGIN_HORIZONTAL,
            paddingBottom: BOTTOM_SEARCH_BAR_TOTAL_HEIGHT + T.LIST_BOTTOM_PADDING,
          }}>
            <ListGroupCard>
              {list.map(p => <RateRow key={p.id} pair={p}/>)}
            </ListGroupCard>
          </div>
        )}
      </div>
      <BottomSearchBar value="" onChangeText={() => {}} placeholder="搜尋"/>
    </div>
  );
}

Object.assign(window, { CurrencyRateListScreen });
