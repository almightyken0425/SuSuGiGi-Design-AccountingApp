// ─────────────────────────────────────────────────────────────
// CurrencyListScreen sub-sections · 私有 sub-section 元件 + design canvas mock
//
// impl 端讀 assets/definitions/Currency.json（約 150 個幣別），design canvas
// 為視覺示意僅取 12 個常用幣別 inline mock，不對齊 impl 完整資料。
// ─────────────────────────────────────────────────────────────

const CURRENCY_LIST_MOCK = [
  { id: 1,  alphabeticCode: 'TWD', name: '新台幣' },
  { id: 2,  alphabeticCode: 'USD', name: '美元' },
  { id: 3,  alphabeticCode: 'JPY', name: '日圓' },
  { id: 4,  alphabeticCode: 'EUR', name: '歐元' },
  { id: 5,  alphabeticCode: 'CNY', name: '人民幣' },
  { id: 6,  alphabeticCode: 'HKD', name: '港幣' },
  { id: 7,  alphabeticCode: 'KRW', name: '韓圜' },
  { id: 8,  alphabeticCode: 'GBP', name: '英鎊' },
  { id: 9,  alphabeticCode: 'AUD', name: '澳幣' },
  { id: 10, alphabeticCode: 'SGD', name: '新加坡元' },
  { id: 11, alphabeticCode: 'CAD', name: '加拿大元' },
  { id: 12, alphabeticCode: 'THB', name: '泰銖' },
];

// ─── CurrencyRow ─── 單張幣別 row（title=code、subtitle=name、showChevron）
function CurrencyRow({ currency, onPress }) {
  return (
    <ListItem
      title={currency.alphabeticCode}
      subtitle={currency.name}
      showChevron
      onPress={onPress}/>
  );
}

Object.assign(window, { CURRENCY_LIST_MOCK, CurrencyRow });
