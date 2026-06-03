# Axis · Undo Bar · Segmented Pill

把 undo bar 從單一 pill 改成 nested segmented pill 的提案。

## 起因

sim-review 在 simulator 上看到兩個問題：

- 訊息「已刪除交易」被壓到截斷成「已刪除…」——現況單一 208×72 pill 把倒數圈、訊息、X 三者塞進固定寬度，訊息只分到中間一小段 flex 空間。
- 點訊息文字不會復原——這屬 impl 接線缺漏（executeUndo 沒接到 UI），由選定方向後的 impl restructure 一併處理，非本提案範圍。

## 結構

外層一個 glass pill，包住兩個內 pill：

- pill A = `[倒數 + 文字]` → undo 本體，點擊復原
- pill B = `[取消]` → 關閉、不復原

外層寬度 auto-fit 內容，訊息完整顯示。

## 並陳變體

| Variant | 內 pill 填底 | 取消 | 倒數 | 取向 |
|---|---|---|---|---|
| V1 Baseline | 單一 pill（非 segmented） | X icon | 實心圈 | 現況對照，呈現截斷問題 |
| V2 | 實色（白 / 中性灰） | X icon | 實心圈 | 對比清楚、最穩 |
| V3 | 實色（白 / 中性灰） | 「取消」文字 | 實心圈 | 語意明確、占寬較大 |
| V4 | 巢狀 glass | X icon | 外框圈 | 最輕透，巢狀 glass 觀感待現場判斷 |

末艙並排 `已刪除交易` / `已刪除帳戶` / `合併完成`，驗證三種訊息皆不截斷。

## 互動語意（待選定後落 spec / impl）

- 點 `[倒數+文字]` pill → `executeUndo`（復原）
- 點 `[取消]` pill → `closeUndo`（關閉、不復原）
- 倒數歸零 → 自動 `closeUndo`

## 狀態

`Resolved · 2026-06-02` — 採用 V4（segmented · X icon · 巢狀 glass · 外框倒數）。已下傳 design 元件 FloatingActionBar、spec undo_bar_policy 互動、impl FloatingActionBar restructure 含 executeUndo 接線。本探索保留作決議紀錄。
