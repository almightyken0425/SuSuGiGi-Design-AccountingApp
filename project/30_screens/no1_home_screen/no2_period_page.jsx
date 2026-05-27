// ─────────────────────────────────────────────────────────────
// PeriodPage · 對齊 impl src/screens/Home/PeriodPage.tsx
//
// HomeScreen 的實際內容 host。impl 端是 FlatList horizontal pagingEnabled inverted
// 內的每一頁；design canvas 無真實 swipe，但仍鏡射 shell / page 拆分以利對齊。
//
// 內含：PeriodSwitcher → DonutHero → FocusRow → TxSectionList
// 接收 filterState（用於 groupMode）+ variant + monthLabel。
//
// Variants：
//   default — 顯示 TX 資料
//   empty   — 無交易紀錄；impl 端對 empty 不換 UI，donut 中央仍是「餘額 / $0」、
//             FocusCard 仍是「$0」，TxSectionList 為空（無任何 section card）
// ─────────────────────────────────────────────────────────────

function PeriodPage({ filterState, variant = 'default', monthLabel = '2026年5月', offset = 0 }) {
  const [chartMode, setChartMode] = React.useState('expense');
  const groupMode = filterState.groupBy;
  const [collapsed, setCollapsed] = React.useState(() => new Set());

  const isEmpty = variant === 'empty';
  const dataSource = isEmpty ? [] : TX;
  const totals = periodTotals(dataSource);
  const expensePie = expensePieData(dataSource);
  const incomePie = incomePieData(dataSource);
  const sections = groupMode === 'date'
    ? groupByDate(dataSource)
    : groupByCategory(dataSource, chartMode);

  const toggle = (id) => setCollapsed(prev => {
    const next = new Set(prev);
    next.has(id) ? next.delete(id) : next.add(id);
    return next;
  });

  return (
    <div style={{
      paddingBottom: HOME_SCREEN_TOKENS.BOTTOM_PADDING_FOR_FAB,
      background: TOKENS.bg,
    }}>
      <div style={{
        display: 'flex', flexDirection: 'column', alignItems: 'stretch',
        paddingBottom: HOME_SCREEN_TOKENS.PAGE_HEADER_PADDING_BOTTOM,
      }}>
        <PeriodSwitcher label={monthLabel}/>
        <DonutHero expenseData={expensePie} incomeData={incomePie} totals={totals}/>
        <FocusRow totals={totals} chartMode={chartMode} onChartModeChange={setChartMode}/>
      </div>
      <TxSectionList sections={sections} collapsed={collapsed} onToggle={toggle} mode={groupMode}/>
    </div>
  );
}

Object.assign(window, { PeriodPage });
