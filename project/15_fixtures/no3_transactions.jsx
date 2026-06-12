// ─────────────────────────────────────────────────────────────
// Mock TX · 11 筆交易 + 2 筆轉帳，設計稿視覺化用 seed
//
// 涵蓋 TWD / USD 跨幣別、recurring、convertedAmount 等 spec 邊界情境。
//
// 轉帳列（type: 'transfer'）對齊 impl PeriodDataStore UnifiedRecord 的視覺欄位：
//   fromAcc / toAcc — 來源 / 目的帳戶 id（查 ACC_BY_ID 得名稱、幣別）
//   amount — 帶號，負＝轉出視角（design 預設，對齊 impl 全選帳戶時 fromSelected 優先）
//   currency / convertedAmount — 跨幣別時原幣金額與主幣換算（同幣別省略）
// 轉帳不計入收支統計（donut / totals / pie 一律 skip，見 no4_helpers.jsx）；
// 僅在 date 分組以「轉帳列」形式呈現（home TxSectionCard / search SearchResultRow 各有分支）。
const TX = [
  { id: 1,  date: 'May 2',  cat: 'food',   acc: 'credit',   amount: -185,  note: '路易莎咖啡' },
  { id: 2,  date: 'May 2',  cat: 'food',   acc: 'cash',     amount: -120,  note: '便當' },
  { id: 3,  date: 'May 2',  cat: 'trans',  acc: 'credit',   amount: -32,   note: '捷運月票',     recurring: true },
  { id: 4,  date: 'May 1',  cat: 'ent',    acc: 'usd_cash', amount: -15,   currency: 'USD', convertedAmount: -480, note: 'Netflix 訂閱',  recurring: true },
  { id: 5,  date: 'May 1',  cat: 'food',   acc: 'credit',   amount: -780,  note: '居酒屋' },
  { id: 6,  date: 'May 1',  cat: 'shop',   acc: 'usd_cash', amount: -40,   currency: 'USD', convertedAmount: -1290, note: 'Uniqlo T-shirt × 2' },
  { id: 7,  date: 'Apr 30', cat: 'salary', acc: 'bank',     amount: 68000, note: '4 月薪資',     recurring: true },
  { id: 8,  date: 'Apr 30', cat: 'trans',  acc: 'credit',   amount: -28,   note: '公車' },
  { id: 9,  date: 'Apr 29', cat: 'food',   acc: 'cash',     amount: -340,  note: '晚餐 — 牛肉麵' },
  { id: 10, date: 'Apr 29', cat: 'health', acc: 'credit',   amount: -650,  note: '牙科檢查' },
  { id: 11, date: 'Apr 29', cat: 'home',   acc: 'credit',   amount: -1480, note: '電費',         recurring: true },
  // 同幣別轉帳：玉山活儲 → 現金（TWD）
  { id: 12, date: 'May 2',  type: 'transfer', fromAcc: 'bank',     toAcc: 'cash', amount: -5000, note: '提領現金' },
  // 跨幣別轉帳：USD 旅費 → 玉山活儲（US$100 ≈ NT$3,200）
  { id: 13, date: 'May 1',  type: 'transfer', fromAcc: 'usd_cash', toAcc: 'bank', amount: -100, currency: 'USD', convertedAmount: -3200, note: '美金結匯' },
];

Object.assign(window, { TX });
