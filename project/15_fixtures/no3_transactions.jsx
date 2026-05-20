// ─────────────────────────────────────────────────────────────
// Mock TX · 11 筆交易，設計稿視覺化用 seed
//
// 涵蓋 TWD / USD 跨幣別、recurring、convertedAmount 等 spec 邊界情境。
// ─────────────────────────────────────────────────────────────

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
];

Object.assign(window, { TX });
