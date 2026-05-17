# Axis 2 · Surface & Material

從質感與材質著手探索 HomeScreen 的視覺風格。配色維持 Classic Purple，只動「卡面 / donut / FAB 看起來像什麼」。

**方向：** 以 Liquid Glass 為主軸（current direction）。本輪在 Liquid Glass 內部開出多個變體，比較哪一種玻璃感最適合記帳 App。

## 並陳的提案

| Variant | 變體角度 | 關鍵差異 |
|---|---|---|
| V1  · Liquid Glass · Subtle  | baseline                  | 靜態漸層底 + 中等模糊玻璃卡 |
| V2' · Mood Tint              | 背景隨 chartMode 變色      | 背景大色塊：expense 偏暖、income 偏冷 |
| V3' · Depth Layers           | 三層 z-axis 景深          | donut 後層 / focus mid / FAB 前層，blur 強度遞增 |
| V4' · Aurora Glass           | 玻璃內 aurora 漸層        | 卡片內部隱約有極光漸層，借鑒 iOS 17 Music |

## 狀態

`Current direction (axis) · 2026-05-15` — Liquid Glass 為當前路線
`Open question (variant) · 2026-05-15` — V1 V2' V3' V4' 之間尚未選定

## 變更紀錄

- 2026-05-15 · 原 V2 Soft Neumorphism、V3 Paper Stack 標 Superseded（不在 current direction 上），歷史見 git。本輪改在 Liquid Glass 內展開。
