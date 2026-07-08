# Axis · Key Visual & Dock

## 問題

- 計算機是 token 體系建立前的元件
- 元件 token 表不含 keypad 條目
- 鍵面停在玻璃磚語言
    - 每鍵獨立陰影與白邊
    - operator 欄用 p100 半透染色
- 底座是不透明 surface 加硬 borderTop
- editor 現行卡片語言已翻新
    - 不透明白、無陰影、hairline 框
- 兩者並置顯得計算機髒且浮
- 排列與操作邏輯不在本軸範圍
    - 4×3 數字區加 operator 欄五鍵不動
    - 計算邏輯由 useCalculator 承載、不動

---

## 並陳的提案

| Variant | 鍵面 | operator 欄 | 底座 | 對齊語言 |
|---|---|---|---|---|
| V0 現況 · Glass tiles | 玻璃磚、每鍵陰影白邊 | p100 半透染色 | surface 加硬 borderTop | 舊玻璃磚 |
| V1 · Card keys | 不透明白、hairline 框、無影 | p50 底 p600 字 | 頁面同底色加 hairline | editor 卡片 |
| V2 · Naked minimal | 無鍵底純文字、字級升 2xl | p500 文字 | 圓頂角 sheet 加上浮陰影 | iOS 撥號盤 |
| V3 · Refined glass | 玻璃留、陰影去、圓角升 lg | p500 實色白字 | 玻璃浮層 | BottomSearchBar 浮層 |
| V4 · Tonal zones | surface2 無框無影 | p500 實色 | surface 加 hairline | iOS 計算機分區 |
| V5 · Fused panel | 一體白卡、hairline 格線 | 整條 p50 色帶 | 頁面同底色加 hairline | GroupedListCard |

---

## 各 variant 要點

- **V0 現況:**
    - baseline、供比對用
- **V1 · Card keys:**
    - 鍵面直接複用 editor 卡片語法
    - 求值鍵改 p500 實色白字強調
    - 與畫面其他卡片最無縫
- **V2 · Naked minimal:**
    - 視覺重量最低、數字最大
    - 按壓回饋改 p50 圓形 highlight
    - canvas 以數字 5 靜態示意按壓態
- **V3 · Refined glass:**
    - 保留品牌玻璃語言、收斂雜訊
    - 底座跟進搜尋列的浮層語言
    - 內容可從鍵盤下方透出
- **V4 · Tonal zones:**
    - 功能分區靠色階不靠陰影
    - operator 欄存在感最強
    - 求值鍵升 p700 做第二層強調
- **V5 · Fused panel:**
    - 鍵盤變一張群組卡
    - 與列表頁 GroupedListCard 語言呼應
    - 格線密度高、視覺較工具感

---

## 開放問題

- 定案後補 KEYPAD_TOKENS 元件 token 表
- 底座與鍵面可跨 variant 混搭
    - 例如 V1 鍵面配 V3 玻璃底座
- 按壓回饋動態不在 canvas 靜態稿範圍
    - 落地時由 impl 依定案語言補
- 深色主題對應值待定案後一併展開

---

## 狀態

`Resolved · 2026-07-08`

- 鍵面定案 V0 現況玻璃磚
- 按壓回饋深化另開 Press Feedback 軸

---

## 變更紀錄

- 2026-07-08 · 初版：並列 V0 至 V5 六 variant、留 open question
- 2026-07-08 · 定案：鍵面留用 V0、按壓回饋轉往 Press Feedback 軸深化
