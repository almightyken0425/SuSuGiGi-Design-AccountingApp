# Axis · Mapping & Account Type

Category 的「標準對照」欄（映射至標準類別，50+ 選項含搜尋）與 Account 的「類型」欄（帳戶類型，5 選項無搜尋），兩者都是 B-1 list picker 模式。

**共同點：**
- 都是「從清單中選一個值」的欄位
- 收合時都顯示當前值 + chevron
- 點按後展開選單

**差異點：**
- 標準對照：50+ 選項，需要搜尋輸入框
- 帳戶類型：5 個選項，不需搜尋

**問題：**
- V0 收合狀態已一致，但展開後體驗不同（一個有搜尋，一個沒有）
- 選項數量差這麼多，兩個欄位的展開體驗還能保持一致嗎？
- 5 選項的帳戶類型是否值得用更簡潔的 inline button group 取代 collapsed picker？

## 並陳的提案

| Variant | Category 標準對照 | Account 類型 | 備註 |
|---|---|---|---|
| V0 [Current] | collapsed picker（收合） | collapsed picker（收合） | 收合時一致 |
| **V1 · Expanded** | collapsed picker（展開：搜尋 + 清單） | collapsed picker（展開：清單） | 展開後比較 |
| **V2 · Button group** | collapsed picker（選項太多維持收合） | button group（5 個選項常駐顯示） | 短清單用不同模式 |

## 狀態

`Open question · 2026-05-26`

## 變更紀錄

- 2026-05-26 · 初版：並列 V0 / V1 / V2 三 variant
