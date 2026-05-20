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

入口：`project/SuSuGiGi.html`，由 `90_workbench/app.jsx` 作 router，含 **4 個頂層 tab**：

- **Intro** — 本 repo 的使用說明書
- **Foundations** — 設計標準視覺化，含 5 個 sub-item：
    - **Type** — TYPE_STYLES（11 種 HIG style）/ TYPOGRAPHY / LINE_HEIGHT / LETTER_SPACING
    - **Colors** — PALETTE / THEMES（經典紫 + 海洋藍）/ Surfaces & Status
    - **Tokens** — 跨元件共用原語：SPACING / RADIUS / SHADOW / MOTION / ICON_SIZE / HIT_TARGET
    - **Components** — 由 `components-showcase.jsx` 引用 `20_components/components.jsx` 的元件展示。5 個 family（List / Form / Navigation / Chart / Input），每個 family 內元件 showcase 與對應 token 表（LIST_TOKENS / FORM_PICKER_TOKENS 等）緊鄰擺放
    - **Brand** — 品牌標識相關工件
- **Screens** — 22 個畫面群組（含 default / empty / loading / error 邊界狀態變體）
- **Explorations** — 5 個多版本提案主題：
    - **Axis 1 · Color & Mood**（Open question · 2026-05-16）
    - **Axis 2 · Surface & Material**（Liquid Glass 為 current direction，4 變體比較·2026-05-15）
    - **Axis 3 · Iconography & Embellishment**（Open question · 2026-05-16）
    - **Axis 4 · Personality (packaged)**（Open question · 2026-05-16）
    - **Transaction Editor**（P1/P2/P7/P8/P9 標 [Current]·2026-05-18）

注意：**Components 不是頂層 tab**，已併入 Foundations 作為 sub-item。`20_components/` 目錄仍存在，承載元件實作與 showcase 程式碼。

詳細結構說明見 `project/SuSuGiGi.html` 的 Intro 分頁。

---

## 撰寫規範

本 repo 的內容是設計工件（JSX、CSS、原型程式碼），不適用 `spec_writer` skill 政策。

- 所有 .md 文件仍適用 `universal_writing_linter` 通用政策
- JSX 不適用 spec 撰寫政策
- 任何改動前先 consult `decision_framework_router` skill 的上游 review 四問

---

## Design git 作為設計標準仲裁端

本 repo 在 SuSuGiGi 四層 git 中擔任 **設計標準的仲裁端**。意思是：

- **觸發點可來自任一端：** impl 開發中發現某個字太小、Design 探索想換配色、Spec 邏輯需要新狀態——任一端都可以發起變動訊號
- **決議寫進本 repo：** 所有 token / 元件 / 畫面的最終決議寫在本 Design git，spec 與 impl 跟隨對齊
- **本 repo 仲裁範圍：** 視覺與互動標準（token、元件、畫面、動畫）
- **不仲裁範圍：** data model 與 logic 由 Spec git 仲裁（標 `arbiter: spec`）

Foundations 以 **Apple HIG / iOS Dynamic Type** 為錨點重訂 token 系統，承擔 SuSuGiGi accounting app 的設計標準權威來源。

---

## 配對變動規則

設計變動的同步關係由 `decision_framework_router` skill 的 `products_registry.md` 中 SuSuGiGi 條目下 `no2_accounting_app` 的 `sub_mapping` 維護。**`products_registry.md` 為權威來源**，本文件僅 mirror 主要規則作為人類閱讀方便：

| 分頁變動 | 仲裁端 | 跟進端 |
|---|---|---|
| Intro | design | 本 CLAUDE.md / Product CLAUDE.md / products_registry.md（文件層級） |
| Foundations | design | impl `src/constants/theme.ts` |
| Components | design | impl `src/components/**` + spec `no2_screens/*.md` |
| Screens | design | spec `no2_screens/noN_<name>_screen.md` + impl `src/screens/<Name>/` |
| Data models | spec | impl（不經 design） |
| Logics | spec | impl（不經 design） |
| Explorations | — | 完全隔離 |

詳細欄位語意（`arbiter` / `followers` / `scope` / `isolated` / `doc_targets`）見 `products_registry.md` 的 Schema 章節。

配對 commit 使用相同 subject 與 body，branch 名稱逐字一致。
