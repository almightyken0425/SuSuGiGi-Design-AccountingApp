// ─────────────────────────────────────────────────────────────
// CurrencyRateListScreen sub-sections · 私有 sub-section 元件 + design canvas mock
//
// impl 端從 currencyService 動態組裝 currency pairs，design canvas inline mock。
// pair label 格式：「1 USD = 30.5000 TWD」對齊 impl renderItem 字串組裝。
// ─────────────────────────────────────────────────────────────

const CURRENCY_RATE_MOCK = [
  { id: 'usd-twd', fromCode: 'USD', toCode: 'TWD', rate: 30.5240 },
  { id: 'jpy-twd', fromCode: 'JPY', toCode: 'TWD', rate: 0.2034 },
  { id: 'eur-twd', fromCode: 'EUR', toCode: 'TWD', rate: 33.1075 },
  { id: 'cny-twd', fromCode: 'CNY', toCode: 'TWD', rate: 4.2150 },
  { id: 'hkd-twd', fromCode: 'HKD', toCode: 'TWD', rate: 3.9182 },
  { id: 'krw-twd', fromCode: 'KRW', toCode: 'TWD', rate: 0.0222 },
];

// ─── RateRow ─── 單筆匯率 row（title 含完整等式）
function RateRow({ pair, onPress }) {
  const label = `1 ${pair.fromCode} = ${pair.rate.toFixed(4)} ${pair.toCode}`;
  return (
    <ListItem
      title={label}
      showChevron
      onPress={onPress}/>
  );
}

Object.assign(window, { CURRENCY_RATE_MOCK, RateRow });
