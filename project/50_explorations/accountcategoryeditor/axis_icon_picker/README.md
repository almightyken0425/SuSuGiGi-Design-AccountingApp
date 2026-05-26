# Axis · Icon Picker

從 AccountEditor / CategoryEditor 圖示選擇器的兩個痛點出發：collapsed 狀態顯示 `ph-money` 這種系統 ID 名稱、展開後的 grid 只有 4 列 × 高度 150px 一次看不到幾顆。

**問題：**
- collapsed 狀態下，picker 顯示「icon preview + `ph-money`」這串系統 unique name。對使用者來說這是內部識別碼，沒有閱讀價值。
- 展開後是 inline 4 columns、`maxHeight: 150` 的小窗格，account icons 加 category icons 加起來有幾十顆，一次只看得到 8-10 顆，捲動體驗擠。
- inline 展開還會跟外層 ScrollView 搶滾動，操作上容易誤觸。

**排除的方向：** bottom sheet 與 push screen 兩種方式，因為 AccountEditor / CategoryEditor 本身就是 modal，再疊一層 modal 或跳 segue 都不自然。確認只考慮 inline 展開路線。

## 並陳的提案

| Variant | 展開方式 | 一次可見圖示數 | 跟現況差異 |
|---|---|---|---|
| V0 [Current] · Inline cramped | inline 4col × maxHeight 150 | 8-10 | — |
| **V1 [Current direction] · Inline full 4col** | inline 4col，不限高，全部展開 | 全部 | 拿掉 maxHeight + 拿掉 uniqueName + 拿掉 picker 內 label |
| V2 · Inline full 5col | inline 5col，不限高，全部展開 | 全部（5 顆一排更緊湊） | 同 V1 但改 5col 排列 |
| V3 · 5col + 最近使用 | 5col，前段顯示最近 3 顆，hairline 後接完整 grid | 全部 | 同 V2，加最近使用分區 |

## 三者差異要點

- **V0** 是現況：系統 uniqueName 外露、展開窗格小且跟外層滾動衝突。
- **V1** 是最小變動：inline 展開，移除 `maxHeight`、uniqueName、以及 picker 本身的內部 "圖示" header，改由外層 `EditorFieldLabel` 提供標籤。4col 排列跟現況延續。
- **V2** 同 V1 邏輯，改 5col——icon 夠小，5col 一排更緊湊，能減少捲動距離。
- **V3** 在 V2 基礎上加「最近使用」分區（3 顆），hairline 分隔後接完整 grid，增加 affordance。

## 跟其他軸的相依

- 跟 axis_form_structure 直接相關：V1 的 inline 展開方式套用在所有 form structure 提案的圖示區域。
- axis_footer_zone 的 V1 footer（白底紅字、無 border）與本軸 V1 一起成為 form structure 提案的 footer 基準。

## 狀態

`Current direction: V1 · 2026-05-25`

## 變更紀錄

- 2026-05-25 · 初版：並列 V0 / V1 / V2 / V3 四 variant（含 bottom sheet / push screen 路線）
- 2026-05-25 · 修訂：排除 modal-on-modal 路線；V2/V3 改為 inline 5col / 5col + 最近使用；採用 V1
