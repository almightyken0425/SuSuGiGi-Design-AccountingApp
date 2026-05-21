// ─────────────────────────────────────────────────────────────
// HomeScreen · 對齊 impl src/screens/Home/HomeScreen.tsx
//
// impl 端 HomeScreen 為 FlatList horizontal pagingEnabled inverted 的 shell，
// 負責 period offset 管理 + StatusBar + footer hide on scroll。
// design canvas 無真實 swipe，僅以 shell + 單頁 PeriodPage 呈現。
// offset prop 預留為未來「多月並排 artboard」接口（不同 offset 對應不同月份）。
//
// Variants：
//   default — 顯示 TX 資料
//   empty   — 無交易紀錄；對齊 impl 行為：DonutHero 中央仍是「餘額 / $0」、
//             FocusCard 仍是「$0」，TxSectionList 為空，無任何 empty 專屬 UI
// ─────────────────────────────────────────────────────────────

function HomeScreen({ filterState, variant = 'default', offset = 0, monthLabel }) {
  // monthLabel 為 design canvas 接口，方便不同 artboard 顯示不同月份
  const label = monthLabel || '2026年5月';
  return (
    <PeriodPage
      filterState={filterState}
      variant={variant}
      monthLabel={label}
      offset={offset}/>
  );
}

Object.assign(window, { HomeScreen });
