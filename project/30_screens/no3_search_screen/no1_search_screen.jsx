// ─────────────────────────────────────────────────────────────
// SearchScreen · 對齊 impl src/screens/Search/SearchScreen.tsx
//
// Modal screen。底部固定 BottomSearchBar，上方為結果列表 / ListEmptyState。
// 兩狀態互斥：results.length === 0 → empty；else → 結果列表。
// hasSearched 用以區分「初始提示輸入」與「找不到結果」的 empty 文案。
//
// impl 端 loading 走 ListEmptyTransition 的 crossfade 機制（emptyContent = null），
// 不顯示 spinner / 文字。design canvas 對齊 impl，不另畫 loading state。
//
// Variants：
//   default        — initial prompt（請輸入關鍵字）
//   with-results   — 有結果（用「咖啡」query 命中數筆）
//   no-results     — 找不到結果（用「USD 旅遊」query）
// ─────────────────────────────────────────────────────────────

function SearchScreen({ initialQuery = '', variant = 'default' }) {
  const T = SEARCH_SCREEN_TOKENS;

  const presetQuery = variant === 'with-results' ? '咖啡'
                    : variant === 'no-results'  ? 'USD 旅遊'
                    : initialQuery;
  const [q, setQ] = React.useState(presetQuery);

  const baseResults = variant === 'with-results'
    ? TX.filter(t => (t.note || '').includes('咖啡') || (t.note || '').includes('居酒屋'))
    : variant === 'no-results'
      ? []
      : (q ? TX.filter(t => (t.note || '').toLowerCase().includes(q.toLowerCase())) : []);

  const hasSearched = variant === 'no-results' || variant === 'with-results' || (q && variant === 'default');
  const showEmpty   = baseResults.length === 0;

  // 結構鏡射 TxEditor / TransferEditor：
  //   外層 flex column + height:100% + position:relative；內層 scroll 區 flex:1；
  //   BottomSearchBar 用 position:absolute bottom:0 對齊根 div = viewport 底（sticky 感）。
  // 否則列表長時 BottomSearchBar 對 SearchScreen 文件流底（滾到最下才看見）。
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
              title={hasSearched ? '找不到結果' : '輸入關鍵字以搜尋交易'}
              description={hasSearched ? `「${q}」` : undefined}/>
          </div>
        ) : (
          <div style={{
            paddingTop: T.SCREEN_PADDING_TOP,
            paddingLeft: SPACING.lg, paddingRight: SPACING.lg,
            paddingBottom: BOTTOM_SEARCH_BAR_TOTAL_HEIGHT + T.RESULT_LIST_BOTTOM_GAP,
          }}>
            <ListGroupCard>
              {baseResults.map((tx, i) => (
                <div key={tx.id} style={{
                  borderTop: i === 0 ? 'none' : `0.5px solid ${TOKENS.hairline}`,
                }}>
                  <SearchResultRow tx={tx}/>
                </div>
              ))}
            </ListGroupCard>
          </div>
        )}
      </div>
      <BottomSearchBar value={q} onChangeText={setQ} placeholder="搜尋..." autoFocus/>
    </div>
  );
}

Object.assign(window, { SearchScreen });
