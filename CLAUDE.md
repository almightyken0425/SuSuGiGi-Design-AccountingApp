# CLAUDE.md

本 repo 為 SuSuGiGi 產品的 **Module Design git**，module_id 為 `no2_accounting_app`，承載 accounting app 的設計工件與 design canvas（React HTML workbench）。

## 四層 git 配對

- **頂層 Product git：**
    - 位於 `../../`
    - 管理決策框架的上游四層
- **本 Module Design git：**
    - 即本 repo
    - 位於 Product git 的 `no3_product_designs/no2_accounting_app/`
- **對側 Module Spec git：**
    - 位於 Product git 的 `no4_product_specs/no2_accounting_app/`
    - 承載 Model / View / Logic 三層行為規格
- **對側 Module Impl git：**
    - 位於 Product git 的 `no6_product_development/no2_accounting_app/`
    - React Native CLI 記帳 App

完整路徑與配對表由 `decision_framework_router` skill 的 `products_registry.md` 維護。

---

## 內容概覽

本 repo 是一份 React HTML 設計 sandbox（不需建置流程，瀏覽器直接打開）。

入口：`project/SuSuGiGi.html`，含 5 個 tab：

- **Intro** — 本 repo 的使用說明書
- **Foundations** — design tokens（PALETTE、TYPOGRAPHY、SPACING、ICON_LIBRARY 等）視覺化
- **Components** — 元件展示（List、SearchBar、Glyph、CalculatorKeypad、DonutChart 等）
- **Screens** — 22 個正式畫面（含 empty / loading / error 邊界狀態變體）
- **Explorations** — 多版本提案的並陳空間（目前無主題）

詳細結構說明見 `INDEX.md`。

---

## 撰寫規範

本 repo 的內容是設計工件（JSX、CSS、原型程式碼），不適用 `spec_writer` skill 政策。

- 所有 .md 文件仍適用 `universal_writing_linter` 通用政策
- JSX 不適用 spec 撰寫政策
- 任何改動前先 consult `decision_framework_router` skill 的上游 review 四問

---

## 配對變動規則

設計變動時通常需要四層聯動檢查。

- **對側 Spec 應檢查：** 設計工件變動可能影響 `no4_product_specs/no2_accounting_app/no2_screens/` 的對應畫面規格
    - 若設計引入新畫面、新狀態或新元件，需在 Spec 補對應描述
    - 若設計只是視覺微調（token、間距），通常不影響 Spec 行為描述
- **對側 Impl 應檢查：** 視覺變動需 impl 的 `src/screens/` 跟進實作
- **上游 Product Map 應檢查：** `no2_product_planning/no2_product_map/no2_accounting_app/` 是否需更新 module 描述

配對 commit 使用相同 subject 與 body，branch 名稱逐字一致。

---

## impl 對齊

本 repo 的所有 token / icon / 元件 / 畫面都對應到 `no6_product_development/no2_accounting_app/`。最後一次全面對齊：2026-05-14。

每個 `screens.jsx` 內的 ScreenComponent 都標註對應的 impl 檔案（搜尋 `← src/screens/...`）。

impl 是真相，設計稿追著對齊。impl 改 token / 改畫面 / 新增畫面時，先在本 repo 改完、與相關人對齊視覺，再回去動 impl；或者 impl 已改，把本 repo 追上來作為下一輪迭代的起點。兩邊不該長期偏離。
