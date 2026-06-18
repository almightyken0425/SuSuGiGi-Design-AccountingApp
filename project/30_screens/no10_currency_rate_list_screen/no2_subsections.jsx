// ─────────────────────────────────────────────────────────────
// CurrencyRateListScreen sub-sections · 私有 sub-section 元件 + design canvas mock
//
// impl 端從 currencyService 動態組裝 currency pairs，design canvas inline mock。
// pair label 格式：「1 主幣 = 倒數值 外幣」（主要貨幣在左），對齊 impl renderItem。
// mock 的 rate 仍是「1 外幣 = rate 主幣」（外幣→主幣，與 getCurrencyPairs 同向）；
// 顯示時取倒數 1/rate 得「1 主幣 = N 外幣」。
//
// 動態精度規則（formatExchangeRate，為 impl helper 的權威來源）：
//   小數位 = clamp(3 - floor(log10(value)), 2, 8)
//   → 保證至少 4 位有效數字、至少 2 位小數、上限 8 位小數防爆。
//   value <= 0 或非有限值 → 顯示 '—'（擋 1/0 = Infinity）。
// ─────────────────────────────────────────────────────────────

const CURRENCY_RATE_MOCK = [
  { id: 'usd-twd', fromCode: 'USD', toCode: 'TWD', rate: 30.5240 },
  { id: 'jpy-twd', fromCode: 'JPY', toCode: 'TWD', rate: 0.2034 },
  { id: 'eur-twd', fromCode: 'EUR', toCode: 'TWD', rate: 33.1075 },
  { id: 'cny-twd', fromCode: 'CNY', toCode: 'TWD', rate: 4.2150 },
  { id: 'hkd-twd', fromCode: 'HKD', toCode: 'TWD', rate: 3.9182 },
  { id: 'krw-twd', fromCode: 'KRW', toCode: 'TWD', rate: 0.0222 },
];

// ─── formatExchangeRate ─── 動態精度：依數值大小推導小數位，保住有效數字（見檔頭規則）
function formatExchangeRate(value) {
  if (!isFinite(value) || value <= 0) { return '—'; }
  const decimals = Math.min(8, Math.max(2, 3 - Math.floor(Math.log10(value))));
  return value.toFixed(decimals);
}

// ─── RateRow ─── 單筆匯率 row（主幣在左，顯示「1 主幣 = N 外幣」）
function RateRow({ pair, onPress }) {
  const label = `1 ${pair.toCode} = ${formatExchangeRate(1 / pair.rate)} ${pair.fromCode}`;
  return (
    <ListItem
      title={label}
      showChevron
      onPress={onPress}/>
  );
}

Object.assign(window, { CURRENCY_RATE_MOCK, formatExchangeRate, RateRow });
