// ─────────────────────────────────────────────────────────────
// BaseCurrencySettingScreen sub-sections · 共用 CurrencyListScreen mock 資料
//
// impl 端也讀 Currency.json，但 row 改為 SelectionListItem（含 checkmark）。
// 直接共用 CURRENCY_LIST_MOCK（已在 CurrencyListScreen subsections 定義）。
// label 格式對齊 impl：「<code> - <name>」。
// ─────────────────────────────────────────────────────────────

// ─── BaseCurrencyRow ─── 含 selected 狀態的幣別 row
function BaseCurrencyRow({ currency, selected, onPress }) {
  return (
    <SelectionListItem
      title={`${currency.alphabeticCode} - ${currency.name}`}
      selected={selected}
      onPress={onPress}/>
  );
}

Object.assign(window, { BaseCurrencyRow });
