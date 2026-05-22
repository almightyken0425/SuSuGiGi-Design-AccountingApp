# Axis · List Treatment

從 SearchScreen 結果列表的「容器層 + row 樣式」探索。Header 與 BottomSearchBar 不變，只動 header 以下的列表呈現。

**問題：** 目前 `SearchResultRow` 是 SearchScreen 私有元件，與 Foundations List family（`ListGroupCard` / `ListItem`）以及 HomeScreen 的 `TxRow` 視覺體系皆不一致；Spec 端標 `List 模式: Custom` 繞過 list_policy。本軸並陳三個方向，定錨 SearchScreen 在 List 體系中的位置。

## 並陳的提案

| Variant | 容器層 | Row 樣式 | 與 Home 對齊 | 與 Settings 對齊 |
|---|---|---|---|---|
| V1 [Current] · Group Card + Tx Row | `ListGroupCard` 包整段結果 | 沿用 `TX_LIST_TOKENS`（icon outline、雙列、雙幣別、recurring chip、highlight） | row 一致 | 卡片外殼一致 |
| V2 · Flat + Tx Row                 | 無卡片，扁平 list             | 同 V1 row，row 間 hairline                                                       | row 一致      | 不一致         |
| V3 · Group Card + ListItem         | `ListGroupCard` 包整段結果   | 直接套 `ListItem`，title = note / subtitle = category·date / value = amount     | row 不一致    | 完整一致       |

## V1 為 Current direction 的理由

- SearchScreen 顯示的是「交易紀錄」，row 內容欄位（icon + category + note 含 highlight + amount + 雙幣別 + date + recurring chip）超出 `ListItem` 的 (icon + title + value + chevron) 表達能力。直接套 `ListItem` 必然犧牲資訊。
- 與 HomeScreen 同類內容應使用同一視覺體系；`TX_LIST_TOKENS` 是交易列的權威 token 群組（`ICON_OUTLINE_SIZE` / `ROW_AMOUNT_SIZE` / `ROW_NOTE_SIZE` / `ROW_SECONDARY_SIZE`）。
- 卡片外殼用 `ListGroupCard`（搜尋結果不分組，所以是「單一 12px 圓角卡片包扁平結果」，不沿用 `TxSectionCard` 的可折疊 section header）讓 SearchScreen 在卡片組合語言上仍與 Settings 對齊。

V3 是「直接套 Settings」的下限對照：證明套 `ListItem` 必須犧牲哪些 Search 既有的資訊呈現（highlight、雙幣別、icon 染色、recurring chip 的視覺權重等）。

## 採納後的下游動作（exploration 完不在本軸範圍內，留作記錄）

1. **Components**：將 `SearchResultRow` 升格為 `TxRow` 變體或新增 `TxResultRow`，放入 `20_components/components.jsx`。命名與升格層級（`30_screens/shared/` vs `20_components/`）依「impl 是否要同步抽出共用元件」決議。
2. **Screens**：`30_screens/no3_search_screen/no1_search_screen.jsx` 改用 `ListGroupCard` 包共用 row。
3. **Spec**：`no4_product_specs/no2_accounting_app/no2_screens/no4_search_screen.md` 將 `List 模式: Custom` 改為「List 模式: A 變體 + 引用共用 row」。
4. **Impl**：對齊 V1 的容器層與 row 視覺。`PeriodPage` 是否同步重構為共用元件作為另一議題處理。

## 狀態

`Current direction (V1) · 2026-05-22`

## 變更紀錄

- 2026-05-22 · 初版：並列三 variant，V1 標 Current direction。
