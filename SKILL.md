---
name: susugigi-design
description: Use this skill to generate well-branded interfaces and assets for SuSuGiGi — a personal accounting / general-ledger mobile app (個人記帳 App) — either for production or throwaway prototypes/mocks/etc. Contains essential design guidelines, colors, type, fonts, assets, and the canonical design canvas with React HTML components for prototyping. The brand is iOS-native in feel, Traditional Chinese (zh-TW) first, with a quiet 3-weight type system and a Classic Purple primary palette (#4323a0).
user-invocable: true
---

Read the `BRAND.md` file within this skill, and explore the other available files.

Key entry points:

- `BRAND.md` — voice / content / visual foundations / iconography
- `project/10_foundations/data.jsx` — canonical token source: `PALETTE`, `TYPOGRAPHY`, `SPACING`, `LIST_TOKENS`, `TX_LIST_TOKENS`, `SEARCH_BAR_TOKENS`, `THEMES`, plus mock data (`CATEGORIES`, `ACCOUNTS`, `TX`)
- `project/SuSuGiGi.html` — the design canvas; open in a browser to browse Intro / Foundations / Screens / Explorations (Foundations 內含 5 個 sub-item：Type / Colors / Tokens / Components / Brand。Tokens 收跨元件共用原語；元件專屬 token 表已下放至 Components 對應 family。每個 sub-item 內部用垂直 layout)
- `project/10_foundations/cards/` — 2026-05-18 claude.ai/design 匯出的快照卡片（28 張，依 5 分類分子目錄），活在 Foundations tab 的 iframe artboard 內
- `project/20_components/components.jsx` — `Glyph`, `ListItem`, `GroupCard`, `GlassView`, `DonutChart`, `FocusCard`, etc. (canonical visual implementations)
- `project/30_screens/screens.jsx` — 26 production-mirrored screens with empty / loading / error variants
- `project/90_workbench/ios-frame.jsx` — iOS 26 (Liquid Glass) device shell
- `project/assets/logo.svg`, `project/assets/wordmark.svg` — brand marks

When creating visual artifacts (slides, mocks, throwaway prototypes, etc), copy `project/assets/` into your output folder and read token values from `project/10_foundations/data.jsx` (do NOT manually re-type them — risk of drift).

When working on production code (the real impl at `no6_product_development/no2_accounting_app/`), the impl's `src/constants/theme.ts` is the source of truth. This design canvas mirrors it.

If the user invokes this skill without any other guidance, ask them what they want to build or design (mobile screen mock? marketing one-pager? slide deck for an internal review?), and act as an expert designer who outputs HTML artifacts **or** production code, depending on the need.

Hard rules for this brand:

- Type system has **only** three weights — 300 / 400 / 500. Never use 600+ unless it's a one-off `t-title` heading already defined in `data.jsx`.
- Numerals are always tabular (`font-variant-numeric: tabular-nums`) on amounts, dates, balances, percentages.
- No emoji. No gradient backgrounds outside the `GlassView` demo. No drop shadows on cards (hairline border only). No filled rectangular CTA buttons — actions live as header text/icon, FAB pill, or full-row list items.
- Cards use 14px radius and `1px solid rgba(60,60,67,0.10)` hairline border over a `#F2F2F7` tinted background.
- Empty states describe the absence ("尚無交易紀錄"), never advise ("Add your first!"). Voice is operational, not friendly.
- Customer copy is Traditional Chinese (zh-TW). Currency: `NT$1,200` (TWD prefix, comma-grouped, `-` sign).
