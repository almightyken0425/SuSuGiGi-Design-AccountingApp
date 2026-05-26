# Axis · Type & Currency

Category 的「類型」欄（支出/收入）與 Account 的「幣別」欄（TWD/USD/…），在行為上有相似的「新增可選、編輯鎖定」特性，但目前視覺上不一致。

**問題：**
- Category 類型：目前用 segmented control（兩按鈕並排），形狀與其他欄位差距大
- Account 幣別：目前用 EditorPickerCollapsed（collapsed picker + chevron），與 Category 類型外觀不同
- 兩者在編輯模式下都需要「鎖定」，但鎖定的視覺處理尚未統一

**核心問題：** 應該讓這兩個欄位看起來一樣嗎？如果要，哪種外觀最適合兩者？

## 並陳的提案

| Variant | Category 類型 | Account 幣別 | 備註 |
|---|---|---|---|
| V0 [Current] | segmented control | collapsed picker | 不一致 |
| **V1 · Unified new mode** | collapsed picker | collapsed picker | 統一為 collapsed picker，新增模式 |
| **V2 · Unified locked state** | collapsed picker, disabled | collapsed picker, disabled | 統一鎖定態，編輯模式 |

## 狀態

`Open question · 2026-05-26`

## 變更紀錄

- 2026-05-26 · 初版：並列 V0 / V1 / V2 三 variant
