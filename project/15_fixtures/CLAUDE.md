# CLAUDE.md · `15_fixtures/`

設計稿視覺化用 seed 資料 + canvas-only helpers。獨立於 `10_foundations/` 因為這層不是「設計標準」而是「視覺化素材」。

## 內容

- `no1_categories.jsx` — CATEGORIES / CAT_BY_ID（10 個分類）
- `no2_accounts.jsx` — ACCOUNTS / ACC_BY_ID（5 個帳戶）
- `no3_transactions.jsx` — TX（11 筆交易）
- `no4_helpers.jsx` — baseAmount / periodTotals / groupByDate / groupByCategory / pieData / fmt

## 與 Spec git mock 的關係

- Design 端 fixtures 為**視覺示意**用途，僅供 design canvas 渲染示範
- 不對齊 Spec git 的 logic mock；Spec mock 改動時不自動同步到本目錄
- Impl 端使用真實 SQLite / Firestore 資料源，**不消費本 mock**

## 修改流程

- 新增分類 / 帳戶 → 改 `no1_categories.jsx` / `no2_accounts.jsx`
- 新增 helpers → 改 `no4_helpers.jsx`，注意 helper 必須是 pure function，無 side effect
- 改動 fixtures 不需 review Spec / Impl 連動

## 禁止

- 在 fixtures 內寫 token（token 屬 `10_foundations/`）
- Helper 引用 impl 端業務邏輯
- Helper 帶 side effect（必須 pure function）

## 載入順序

必須在 `20_components/components.jsx`、`30_screens/` 各 screen 子目錄、`50_explorations/*` 之前載入（這些消費端讀 fixtures）。
