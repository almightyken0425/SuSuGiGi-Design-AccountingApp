// ─────────────────────────────────────────────────────────────
// Mock ACCOUNTS · 設計稿視覺化用 seed
//
// 僅供 design canvas 渲染；impl 端使用真實 SQLite，不消費此 mock。
// ─────────────────────────────────────────────────────────────

const ACCOUNTS = [
  { id: 'cash',     name: '現金',           balance: 3240,    iconId:  1, typeId: 1, currency: 'TWD' },  // ph-money
  { id: 'bank',     name: '玉山活儲',        balance: 128450,  iconId: 11, typeId: 2, currency: 'TWD' },  // ph-building
  { id: 'credit',   name: '國泰世華 信用卡', balance: -8420,   iconId:  7, typeId: 3, currency: 'TWD' },  // ph-credit-card
  { id: 'invest',   name: '富邦證券',        balance: 462100,  iconId: 87, typeId: 4, currency: 'TWD' },  // ph-chart-line
  { id: 'usd_cash', name: 'USD 旅費',        balance: 320,     iconId:  5, typeId: 1, currency: 'USD' },  // ph-jar
];
const ACC_BY_ID = Object.fromEntries(ACCOUNTS.map(a => [a.id, a]));

// 對齊 impl src/utils/currencyUtils.ts 的 getCurrencySymbol（讀 Currency.json symbol 欄位）。
// design canvas 無 JSON import 機制，硬編常見幣別映射；未列入者直出 code。
// TransactionEditor / TransferEditor 共用，讓兩 editor 幣別顯示形式一致為 symbol。
function currencySymbolFor(code) {
  if (code === 'TWD') return 'NT$';
  if (code === 'USD') return 'US$';
  return code;
}

Object.assign(window, { ACCOUNTS, ACC_BY_ID, currencySymbolFor });
