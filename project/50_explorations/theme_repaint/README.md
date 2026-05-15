# Theme Repaint

把 [anthropic/skills](https://github.com/anthropics/skills) 的 `theme-factory` 預設主題搬到 SuSuGiGi 視角，並陳 5 種主題下記帳 App 的延伸氣質。

## Problem statement

SuSuGiGi 目前的 PALETTE 只有「經典紫」「海洋藍」兩個主題。要進入下一輪視覺迭代之前，需要先看清「主題只是換 token，還是要連 typography／資訊密度／空間語言一起換」。

用既有的公開主題庫做一輪低成本素描，目的是**蒐集刺激**而非**選定方向**——讓 PM 視角先看到多個延伸感受，再決定下一輪要往哪走。

## Candidates

| Variant | 來源 | 延伸感受 | 適合情境 |
|---|---|---|---|
| V1 Ocean Depths · 海洋深處 | theme-factory `ocean-depths.md` | 專業沉穩、淺色為主 | 長期信任型工具，金融感 |
| V2 Midnight Galaxy · 午夜星空 | theme-factory `midnight-galaxy.md` | 深色戲劇、紫銀 | Dark Mode 沉浸式記帳 |
| V3 Modern Minimalist · 極簡黑白 | theme-factory `modern-minimalist.md` | 極簡無雜訊 | 純粹專注數字，去情緒化 |
| V4 Forest Canopy · 森林冠層 | theme-factory `forest-canopy.md` | 自然有機、襯線顯示字 | 永續理財、低壓力 |
| V5 Sunset Boulevard · 夕陽大道 | theme-factory `sunset-boulevard.md` | 暖色活潑、襯線顯示字 | 情緒派記帳人，生活感 |

## Current direction · 2026-05-15

`Open question` — 本輪只是素描，未選定方向。下次評估時應先回答：

- 我們的核心使用者是「去情緒化專注數字」還是「情緒派生活感」？這個問題從 `no1_product_initiation/no1_mental_model.md` 找答案，不在這層決定。
- Dark Mode 是必備還是選配？影響色票結構（單一主題雙模式 vs 兩個獨立主題）。

## Decision log

- **2026-05-15** · 初版建立，並陳 5 種主題的 ShowcaseCard（色票牆 + Type sample + HomeScreen mini mockup）。素材取自 anthropic 公開 skill `theme-factory`，配 `frontend-design` 思維做視覺收斂。
