// ─────────────────────────────────────────────────────────────
// HomeFilterScreen sub-sections · 私有 sub-section 元件
//
// 鏡射 impl src/screens/Home/HomeFilterScreen.tsx 拆分：
//   FilterTileRow / AccountSelectorCard / AccountGrid
//
// 消費 HOME_FILTER_SCREEN_TOKENS + atomic + LIST_TOKENS。
// ─────────────────────────────────────────────────────────────

// Cycle helper + 標籤對照表
const TIME_VALUES = ['day', 'week', 'month', 'year', 'all'];
const GROUP_VALUES = ['category', 'date'];
const TIME_LABELS = { day: '日', week: '週', month: '月', year: '年', all: '全' };
const GROUP_LABELS = { category: '類別', date: '日期' };
const _hfCycle = (arr, c) => arr[(arr.indexOf(c) + 1) % arr.length];

// ─── FilterTileRow ─── 時間粒度 + 分組方式兩 tile
function FilterTileRow({ filterState, setFilterState }) {
  const T = HOME_FILTER_SCREEN_TOKENS;
  const { timeGranularity, groupBy } = filterState;
  const tileStyle = {
    flex: 1, display: 'flex', alignItems: 'center', gap: SPACING.sm,
    paddingTop: T.TILE_PADDING_VERTICAL, paddingBottom: T.TILE_PADDING_VERTICAL,
    paddingLeft: T.TILE_PADDING_HORIZONTAL, paddingRight: T.TILE_PADDING_HORIZONTAL,
    borderRadius: T.TILE_RADIUS,
    background: TOKENS.surface, border: 'none',
    boxShadow: T.TILE_SHADOW,
    cursor: 'pointer', fontFamily: 'inherit',
  };
  const tileTextStyle = {
    fontSize: T.TILE_FONT_SIZE, fontWeight: TYPOGRAPHY.weight.medium,
    letterSpacing: T.TILE_LETTER_SPACING, color: TOKENS.ink,
  };
  return (
    <div style={{
      display: 'flex', flexDirection: 'row', gap: T.TILE_GAP,
      marginBottom: T.TILE_ROW_BOTTOM_MARGIN,
    }}>
      <button
        onClick={() => setFilterState(s => ({ ...s, timeGranularity: _hfCycle(TIME_VALUES, timeGranularity) }))}
        style={tileStyle}>
        <Glyph name="calendar-blank-outline" size={ICON_SIZE.xs} color={TOKENS.ink2} stroke={2}/>
        <span style={tileTextStyle}>{TIME_LABELS[timeGranularity]}</span>
      </button>
      <button
        onClick={() => setFilterState(s => ({ ...s, groupBy: _hfCycle(GROUP_VALUES, groupBy) }))}
        style={tileStyle}>
        <Glyph name="tag-outline" size={ICON_SIZE.xs} color={TOKENS.ink2} stroke={2}/>
        <span style={tileTextStyle}>{GROUP_LABELS[groupBy]}</span>
      </button>
    </div>
  );
}

// ─── AccountSelectorCard ─── 單張帳戶卡（含 selected / lastSelected 狀態）
// 最後一張被選中時 disable，避免使用者把選擇集合清空。
function AccountSelectorCard({ account, selected, lastSelected, cardWidth, onPress }) {
  const T = HOME_FILTER_SCREEN_TOKENS;
  const swatchIconColor = selected ? TOKENS.p500 : TOKENS.ink3;
  const nameColor       = selected ? TOKENS.ink  : TOKENS.ink2;
  const currencyColor   = selected ? TOKENS.ink2 : TOKENS.ink3;
  return (
    <button
      onClick={() => !lastSelected && onPress()}
      disabled={lastSelected}
      style={{
        width: cardWidth, display: 'flex', alignItems: 'center',
        gap: T.ACCOUNT_CARD_CONTENT_GAP,
        paddingTop: T.ACCOUNT_CARD_PADDING_VERTICAL,
        paddingBottom: T.ACCOUNT_CARD_PADDING_VERTICAL,
        paddingLeft: T.ACCOUNT_CARD_PADDING_HORIZONTAL,
        paddingRight: T.ACCOUNT_CARD_PADDING_HORIZONTAL,
        borderRadius: T.ACCOUNT_CARD_RADIUS,
        borderWidth: selected ? T.ACCOUNT_CARD_BORDER_WIDTH_SELECTED : T.ACCOUNT_CARD_BORDER_WIDTH_DEFAULT,
        borderStyle: 'solid',
        borderColor: selected ? TOKENS.p500 : TOKENS.hairline,
        background: TOKENS.surface,
        cursor: lastSelected ? 'not-allowed' : 'pointer',
        fontFamily: 'inherit',
      }}>
      <div style={{
        width: T.ACCOUNT_CARD_ICON_FRAME, height: T.ACCOUNT_CARD_ICON_FRAME,
        borderRadius: T.ACCOUNT_CARD_ICON_RADIUS,
        background: selected ? TOKENS.p50 : TOKENS.surface,
        borderWidth: selected ? 0 : 1, borderStyle: 'solid',
        borderColor: TOKENS.hairline,
        display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
      }}>
        <DynamicIconById iconId={account.iconId} size={T.ACCOUNT_CARD_ICON_SIZE} color={swatchIconColor}/>
      </div>
      <span style={{
        flex: 1, textAlign: 'left',
        fontSize: T.ACCOUNT_CARD_NAME_SIZE, fontWeight: TYPOGRAPHY.weight.medium,
        color: nameColor,
        whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
      }}>{account.name}</span>
      <span style={{
        fontSize: T.ACCOUNT_CARD_CURRENCY_SIZE, fontWeight: TYPOGRAPHY.weight.medium,
        letterSpacing: T.ACCOUNT_CARD_CURRENCY_LETTER_SPACING, color: currencyColor,
      }}>{account.currency}</span>
    </button>
  );
}

// ─── AccountGrid ─── 所有帳戶連續 2 欄排列（flex-wrap，不分群）
function AccountGrid({ accounts, selectedAccountIds, cardWidth, onToggle }) {
  return (
    <div style={{
      display: 'flex', flexWrap: 'wrap',
      gap: HOME_FILTER_SCREEN_TOKENS.ACCOUNT_CARD_INTRA_GAP,
    }}>
      {accounts.map(a => {
        const selected = selectedAccountIds.includes(a.id);
        const lastSelected = selected && selectedAccountIds.length === 1;
        return (
          <AccountSelectorCard
            key={a.id}
            account={a}
            selected={selected}
            lastSelected={lastSelected}
            cardWidth={cardWidth}
            onPress={() => onToggle(a.id)}/>
        );
      })}
    </div>
  );
}

Object.assign(window, {
  TIME_VALUES, GROUP_VALUES, TIME_LABELS, GROUP_LABELS,
  FilterTileRow, AccountSelectorCard, AccountGrid,
});
