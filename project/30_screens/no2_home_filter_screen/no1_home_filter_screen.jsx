// ─────────────────────────────────────────────────────────────
// HomeFilterScreen · 對齊 impl src/screens/Home/HomeFilterScreen.tsx
//
// Modal screen。Tile row 切換時間粒度 / 分組方式，下方為跨幣別帳戶多選。
// 每個 currency 自成 group（flex-wrap），同 group 內 card flex-grow 平均。
// 最後一張被選中時 disable 該 card，避免清空選擇集合。
//
// Variants：
//   default      — 有帳戶可選
//   no-accounts  — 無可用帳戶，account 區塊空白
// ─────────────────────────────────────────────────────────────

function HomeFilterScreen({ filterState, setFilterState, variant = 'default' }) {
  const T = HOME_FILTER_SCREEN_TOKENS;
  const { selectedAccountIds } = filterState;
  const noAccounts = variant === 'no-accounts';

  const toggleAcc = (id) => setFilterState(s => {
    const has = s.selectedAccountIds.includes(id);
    if (has && s.selectedAccountIds.length === 1) return s;
    return {
      ...s,
      selectedAccountIds: has ? s.selectedAccountIds.filter(x => x !== id) : [...s.selectedAccountIds, id],
    };
  });

  // currency-grouped accounts，依照 ACCOUNTS 內出現順序
  const groups = React.useMemo(() => {
    if (noAccounts) return [];
    const map = new Map();
    const ordered = [];
    for (const a of ACCOUNTS) {
      if (!map.has(a.currency)) {
        const list = [];
        map.set(a.currency, list);
        ordered.push({ currency: a.currency, accounts: list });
      }
      map.get(a.currency).push(a);
    }
    return ordered;
  }, [noAccounts]);

  // 2-up card width 算式：(canvas width - 兩側 padding - 中間 gap) / 2
  const cardWidth = (T.DESIGN_CANVAS_WIDTH - T.SCREEN_PADDING * 2 - T.ACCOUNT_CARD_INTRA_GAP) / 2;

  return (
    <div style={{
      padding: T.SCREEN_PADDING,
      background: TOKENS.bg,
      minHeight: '100%',
    }}>
      <FilterTileRow filterState={filterState} setFilterState={setFilterState}/>

      <div style={{ display: 'flex', flexDirection: 'column', gap: T.CURRENCY_GROUP_GAP }}>
        {groups.map(g => (
          <CurrencyGroupBlock
            key={g.currency}
            accounts={g.accounts}
            selectedAccountIds={selectedAccountIds}
            cardWidth={cardWidth}
            onToggle={toggleAcc}/>
        ))}
      </div>
    </div>
  );
}

Object.assign(window, { HomeFilterScreen });
