# Axis 1 · Color & Mood

從整體色調著手探索 HomeScreen 的視覺風格。Wireframe 結構與互動行為與 spec 完全一致，只動配色。

**色彩規則：** 每個 variant 內部主色系（深淺變化）+ 一個強調色（底色不算第三色系）。一致用法：支出 = 主色（深 / 中），收入 = 強調色。

## 並陳的提案（四行）

### Row 1 · Mono+Accent (V1-V6)

六個各自獨立色系的 mono+accent 方向。

| Variant | 主色系 | 強調色 |
|---|---|---|
| V1 · Mono Indigo + Citrus     | 深藍紫 indigo（dark）       | 螢光黃綠 citrus |
| V2 · Mono Charcoal + Mint     | 灰階 charcoal              | 薄荷綠 mint |
| V3 · Mono Brick + Teal        | 暖磚紅 brick               | 鴨蛋青 teal |
| V4 · Mono Sage + Rose         | 鼠尾草綠 sage              | 玫瑰粉 rose |
| V5 · Mono Sand + Cobalt       | 沙色 sand                  | 鈷藍 cobalt |
| V6 · Mono Ink + Ruby          | 墨深 ink（dark）           | 紅寶 ruby |

### Row 2 · Olive Palette Swap (V7-V9)

同一組綠色色票 `#FEFAE0` / `#606C38` / `#283618` 在不同位置 swap。

| Variant | 底 | 主色 | 強調 |
|---|---|---|---|
| V7 · Olive Field         | Cornsilk `#FEFAE0`      | Black Forest `#283618` | Olive Leaf `#606C38` |
| V8 · Forest Deep         | Black Forest `#283618`  | 中綠                    | 淺綠 highlight |
| V9 · Olive Field Mid     | Olive Leaf `#606C38`    | Black Forest `#283618` | Cornsilk `#FEFAE0` |

### Row 3 · Coffee Palette Swap (V10-V12)

同一組咖啡色票 `#371E13` / `#5E2A25` / `#C0AA8A` / `#E1D3A9` 在不同位置 swap。

| Variant | 底 | 主色 | 強調 |
|---|---|---|---|
| V10 · Cafe Latte         | Creme `#E1D3A9`         | Coffee `#371E13`       | Maroon `#5E2A25` |
| V11 · Espresso Night     | Coffee `#371E13`        | Clay Dust              | Creme |
| V12 · Velvet Maroon      | Maroon `#5E2A25`        | Clay Dust              | Creme |

### Row 4 · Navy + Gold Palette Swap (V13-V15)

同一組海軍藍色票 `#101A2C` / `#11284D` / `#264B6F` / `#F4EFDF` / `#D5B370` 在不同位置 swap。

| Variant | 底 | 主色 | 強調 |
|---|---|---|---|
| V13 · Daylight Cream     | Cream `#F4EFDF`         | Navy `#11284D`         | Gold `#D5B370` |
| V14 · Midnight Navy      | Midnight `#101A2C`      | Navy steel             | Gold `#D5B370` |
| V15 · Royal Midnight     | Royal `#11284D`         | Gold `#D5B370`         | Cream `#F4EFDF` |

## 狀態

`Open question · 2026-05-16`

## 變更紀錄

- 2026-05-15 · Round 1：Sand & Espresso、Midnight Indigo 因多色違規移除。
- 2026-05-16 · Round 3：6 個 mono+accent 提案。
- 2026-05-16 · Round 4：替換成 3 個對應參考圖的方向（Navy / Coffee / Olive）。
- 2026-05-16 · Round 5：還原 Round 3 的 6 個排到 Navy / Coffee / Olive 前面，合計 V1-V9。
- 2026-05-16 · Round 6：V7-V9 換成同一組綠色色票 swap 三種視覺。
- 2026-05-16 · Round 7：拆兩列，Row 1 = V1-V9（含 coffee 三個），Row 2 = V10-V12 olive。
- 2026-05-16 · Round 8：重組四行佈局。Row 1 = V1-V6 mono+accent；Row 2 = V7-V9 olive；Row 3 = V10-V12 coffee；Row 4 = V13-V15 navy 新增。
- 2026-05-16 · Round 9：Row 5 新增 V16-V18，使用電光紫紅色票（Cyber Violet / Pop Pink / Velvet Wine）swap 三種視覺。
- 2026-05-16 · Round 10：Row 5 換用「更深的紫」為主色（不再用 #4227F2 電光紫），搭配 #A60D61 深莓紅；三個 variant 改為 Deep Purple Night / Royal Plum / Velvet Wine，皆 dark mode。
- 2026-05-16 · Round 11：Row 5 擴成五個 variant，使用色票 #4227F2 / #F27EB4 / #A60D61 / #07D98C / #400224 互相 swap：Cyber Violet / Pop Pink / Velvet Wine / Neon Jade / Midnight Wine。
- 2026-05-16 · Round 12：Row 5 換色票為 #F24F13 / #8082A6 / #46334F 三色，三個純底 + 兩個漸層底 swap 五個 variant：Ember Sunset / Pewter Coral / Plum Night / Slate Plum Twilight / Coral Plum Dawn。
- 2026-05-16 · Round 13：Row 5 整列移除，剩四行 V1-V15。
