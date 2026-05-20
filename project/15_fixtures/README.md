# 15_fixtures · 人類導覽

Design canvas 渲染用的種子資料與輔助函式。

## Seed 結構速查

### CATEGORIES（`no1_categories.jsx`）

```js
{ id: string, name: string, type: 'expense' | 'income', iconId: number }
```

10 個分類：飲食 / 交通 / 購物 / 娛樂 / 居家 / 醫療 / 教育 / 禮物（expense 8 個）/ 薪資 / 投資（income 2 個）。

### ACCOUNTS（`no2_accounts.jsx`）

```js
{ id: string, name: string, balance: number, iconId: number, typeId: number, currency: 'TWD' | 'USD' }
```

5 個帳戶涵蓋 cash / bank / credit / invest / 外幣（USD）。

### TX（`no3_transactions.jsx`）

```js
{
  id: number, date: string, cat: string, acc: string,
  amount: number,
  currency?: 'USD', convertedAmount?: number, recurring?: boolean,
  note: string,
}
```

11 筆交易涵蓋 May 2 / May 1 / Apr 30 / Apr 29 四個日期，混合 TWD / USD、recurring 旗標、convertedAmount 換算。

## Helper 簽名速查

| 函式 | 簽名 | 用途 |
|---|---|---|
| `baseAmount(t)` | `(tx) => number` | 跨幣別取基準金額：`convertedAmount ?? amount` |
| `periodTotals(items)` | `(tx[]) => { income, expense, balance }` | 統計期間收支 |
| `groupByDate(items)` | `(tx[]) => [{ id, title, data, total }]` | 按日期分組 |
| `groupByCategory(items, chartMode?)` | `(tx[], 'expense'\|'income') => [{ id, cat, title, iconId, data, total }]` | 按類別分組，預設 expense |
| `pieData(items)` | `(tx[]) => [{ id, value, color, cat }]` | 圓餅圖資料（僅 expense） |
| `fmt(n, code?)` | `(number, currency?) => string` | 金額格式化（NT$ / US$ / ¥） |

所有 helpers 為 pure function，可在 visualizer 與 screen 之間自由共用。
