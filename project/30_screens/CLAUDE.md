# CLAUDE.md · `30_screens/`

本目錄為 SuSuGiGi accounting app 5 個目標 screen 的設計工件，每個 screen 對應 impl 的 `src/screens/<Name>/`，作為設計標準仲裁端。

## 內部分層

```
30_screens/
├── CLAUDE.md
├── shared/
│   ├── no1_screen_layout.jsx           Spinner / ScreenScroll（design canvas 對應 RN 的 helper）
│   └── no2_editor_form_helpers.jsx     EditorErrorBanner / EditorDateContainer / EditorNoteField / EditorDeleteButton
├── no1_home_screen/
│   ├── tokens.jsx                      HOME_SCREEN_TOKENS
│   ├── no3_subsections.jsx             PeriodSwitcher / DonutHero / FocusRow / TxSectionList / ...
│   ├── no2_period_page.jsx             PeriodPage（鏡射 impl HomeScreen / PeriodPage 拆分）
│   └── no1_home_screen.jsx             HomeScreen（shell + variant routing；offset prop 預備）
├── no2_home_filter_screen/
│   ├── tokens.jsx                      HOME_FILTER_SCREEN_TOKENS
│   ├── no2_subsections.jsx             FilterTileRow / AccountSelectorCard / CurrencyGroupBlock
│   └── no1_home_filter_screen.jsx
├── no3_search_screen/
│   ├── tokens.jsx                      SEARCH_SCREEN_TOKENS
│   ├── no2_subsections.jsx             SearchResultRow / SearchLoadingState / highlightInText
│   └── no1_search_screen.jsx
├── no4_tx_editor_screen/
│   ├── tokens.jsx                      TX_EDITOR_SCREEN_TOKENS
│   ├── no2_subsections.jsx             TxAmountContainer / TxPickerRow
│   └── no1_tx_editor_screen.jsx
└── no5_transfer_editor_screen/
    ├── tokens.jsx                      TRANSFER_EDITOR_SCREEN_TOKENS
    ├── no2_subsections.jsx             ExchangeArrow / DualAmountRow / DualPickerRow
    └── no1_transfer_editor_screen.jsx
```

## Granularity 規則

每個 screen 為一個 `noN_<name>_screen/` 子目錄。子目錄內最多含三類檔案：

- `tokens.jsx` — screen 級 token
- `noN_<purpose>.jsx` — 私有 sub-section 元件、PeriodPage 等內容 host
- entry `noN_<name>_screen.jsx` — screen 主元件

HomeScreen 額外含 `noN_period_page.jsx`（鏡射 impl 的 `HomeScreen.tsx` / `PeriodPage.tsx` 拆分）。

子目錄內 `tokens.jsx` 不加 `noN_` 前綴（子目錄內載入順序固定為 tokens → subsections → period_page → entry）。

## Screen 級 token 規則

每 screen `tokens.jsx` 必須 export `<SCREEN_NAME>_SCREEN_TOKENS`。值必須引用 atomic 階梯（SPACING / RADIUS / TYPE_STYLES / ICON_SIZE / MOTION / TOKENS）或 component_tokens（LIST_TOKENS / TX_LIST_TOKENS / FORM_PICKER_TOKENS 等）；bare number 必須 `// (literal: 原因)` 標記。

**Screen token vs component token 界線：**

- 可重用的元件參數（如 chip border width / list item row height）放 `10_foundations/component_tokens/`
- 本 screen 獨有的 composition 參數（如 `HOME_SCREEN_TOKENS.DONUT_BOTTOM_GAP`）放 screen tokens

檔尾統一 `Object.assign(window, { <NAME>_SCREEN_TOKENS })`。

## Variant 規則

每 screen entry 為單一 component，接受 `variant` prop 內部 switch。禁止為 variant 拆檔。SCREEN_META 透過不同 `variant=` 注入。

例：`<HomeScreen variant="empty"/>` vs `<HomeScreen/>`。

## Helper extraction 規則（三桶）

跨 screen 共用、單 screen 用、提升到 components 三桶分流：

| 桶 | 條件 | 位置 |
|---|---|---|
| Promote to 20_components/ | 跨 screen 共用 **且** impl 端已有獨立元件 | `20_components/components.jsx` + 加 showcase 到 `components-showcase.jsx` 對應 family |
| 30_screens/shared/ | 跨 screen 共用 **但** 僅 design canvas 用（無 impl 對應），或 design canvas 環境限制無法各 screen 重複實作 | `30_screens/shared/noN_*.jsx` |
| Inline | 單 screen 用 | 該 screen 子目錄內 `noN_subsections.jsx` 或 entry inline |

**註 1：** 本目錄 v1 的 `shared/no2_editor_form_helpers.jsx` 為「design canvas 環境限制」促升的例外。impl 端 TxEditor / TransferEditor 各自 inline 實作 DateContainer / NoteField / DeleteButton，但 design canvas 採 global namespace 無法同名 sub-section 共存，故 promote 共用。視覺上仍與 impl 完全對齊。

**註 2：** 將來若 impl 重構抽出共用元件（如 EditorDateRow），可改升入 `20_components/`。

## Router 註冊規則

新增 / 移除 screen 必須同步動三處：

- `90_workbench/app.jsx` 的 `SCREEN_META` 與 `SCREEN_GROUPS`
- `SuSuGiGi.html` 的 `<script>` 載入順序
- 本 CLAUDE.md（若改 granularity 規則）

## 命名規範

- Screen component：PascalCase + `Screen` 後綴（`HomeScreen` / `TransactionEditorScreen`）
- Sub-section：PascalCase 描述性名稱（`DonutHero` / `FilterTileRow`），不加檔案編號前綴
- 跨 screen 同名衝突時加 screen-namespace prefix（`TxAmountContainer` vs 將來可能的 `TransferAmountContainer`），或 promote 到 shared/ 取共用名（`EditorDateContainer`）
- Screen token：`<UPPER_SNAKE>_SCREEN_TOKENS`
- 檔案編號 `noN_` 同 `10_foundations/component_tokens/` 規

## 載入順序約束

1. 整段必在 `20_components/components.jsx` + `15_fixtures/` 之後
2. `shared/` 必在所有 screen 子目錄之前
3. 同 screen 子目錄內 `tokens.jsx` → `noN_subsections.jsx` → `period_page`（如有）→ entry
4. 整段必在 `90_workbench/app.jsx` 之前

## Object.assign 規範

每檔尾 `Object.assign(window, { ... })` 僅 export 該檔定義的 symbols。禁集中 export。

## 禁止

- 禁在 screen 檔內定義 atomic / component_tokens（屬 `10_foundations/`）
- 禁直接寫 raw number（除非 `// (literal: 原因)`）
- 禁為 variant 拆檔
- 禁將私有 sub-section 提升到 `20_components/` 前先問：impl 是否已有對應元件？沒有則留在 screen 子目錄或 `shared/`
- 禁改現有 export 名稱（與 SCREEN_META render fn 對齊）

## Follow-up

本目錄 v1 僅含 5 個 screen。其餘 17 個 screen（Settings / Preference / Login / Paywall / Accounts / AccountEditor / Categories / CategoryEditor / Theme / Language / Timezone / LaunchMode / BaseCurrency / CurrencyList / CurrencyRateList / DataMgmt / Debug）已於本次重構移除，待逐步 follow 本目錄前例重做。

新升 5 個 helper（AmountField / StaticWheelPicker / AccountSelector / CategorySelector / RecurringOptions）尚未建立專屬 `component_tokens/noN_*_tokens.jsx`，為另一個 follow-up。
