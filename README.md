# SuSuGiGi · Accounting App · Module Design git

本 repo 是 SuSuGiGi 產品 `no2_accounting_app` module 的 **Module Design git**，承載該 module 的設計工件、視覺原型與 design canvas。

## 角色

四層 git 中的設計層：

- **Product git**：上一層，承載提案 / 需求 / Product Map / Roadmap
- **Module Design git**：即本 repo，承載 design canvas、視覺工件
- **Module Spec git**：對側，承載行為規格（`no4_product_specs/no2_accounting_app/`）
- **Module Impl git**：對側，承載實作（`no6_product_development/no2_accounting_app/`）

## 入口

在瀏覽器開 `project/SuSuGiGi.html`，5 個 tab 切換各視角：Intro / Foundations / Components / Screens / Explorations。

詳細結構說明見 `INDEX.md`。

## 對齊規則

impl 是真相，設計稿追著對齊。當 impl 改 token / 改畫面 / 新增畫面：

1. 先在本 repo 改完、與相關人對齊視覺
2. 再回去動 impl
3. 或者 impl 已改、把本 repo 追上來作為下一輪迭代起點

兩邊不該長期偏離。當對應 Spec 的 `no2_screens/` 有定案視覺需求，本 repo 的 Screens tab 應反映。

## 撰寫規範

設計工件不適用 `spec_writer` 政策（spec_writer 管的是規格文件的技術深度邊界，本 repo 是 design canvas）。所有 .md 仍適用 `universal_writing_linter` 通用政策。

## 歷史

本 repo 原為 `SuSuGiGi/no99_archive/claude_design_handoff_susugigi_20260506/`，由 claude.ai/design 產出的 handoff bundle。2026-05-15 提拔成獨立 Module Design git，移除原 `chats/` 對話紀錄資料夾（內容已透過此 repo 與 spec / impl 的對齊取代）。
