# Exploration · Transaction Editor

> **這個主題仍屬 design 探索層，沒對 Spec / Impl 下傳。** 即使下方有 review 結論看起來像「定案」，要正式落到 Spec 仍需另走一輪 spec 撰寫流程。

來源：2026-05-18 從 claude.ai/design 匯出的 handoff bundle。基於 `30_screens/screens.jsx` 的 TransactionEditor / TransferEditor 進行觀察 → 提案 → review 兩輪 → 整合的探索流程。

## Canvas 結構

三個 section 直向堆疊：

1. **目前的樣子** — 原樣還原 `TransactionEditor`（default / 開定期面板 / error / edit 四種變體）與 `TransferEditor`（跨幣別預設）；右側放一張 1500px 高的觀察筆記卡，列出 10 條可優化處
2. **提案區** — 6 個獨立提案卡（P1 / P2 / P7 / P8 / P9 + P10），每張 460×600
3. **融合後** — 把保留的 P1 / P2 / P7 / P8 / P9 一次套到 Transaction + Transfer 上的整合版

## 觀察 10 條

1. **TransactionEditor** — 日期 pill 與 recurring icon 被視覺切開，但語意相關
2. **TransactionEditor** — 金額欄沒有 hero 感
3. **TransactionEditor** — Static wheel picker 是假元件（視覺像 wheel 但實際點下去跳另一頁）
4. **TransactionEditor** — 看不出是支出還是收入
5. **TransactionEditor** — 備註欄太弱
6. **TransactionEditor** — 鍵盤的 +/-/×/÷ 全部是 no-op
7. **TransactionEditor** — 編輯模式刪除按鈕位置危險（底部一行紅字，鍵盤上方）
8. **TransferEditor** — 兩個金額欄無視覺主從
9. **TransferEditor** — 缺 swap from↔to 快捷
10. **兩個共通** — 視覺 hierarchy 全部一樣重，掃視難找重點

完整描述見 `observations.jsx` 內的 `ED_OBS_ISSUES` 陣列。

## 提案狀態（經 Ken r1 + r2 review 後）

### `[Current] · 2026-05-18` — 探索層保留方向

| 提案 | 內容 |
|---|---|
| **P1** | 日期 + 定期合一卡（日期主、recurring 次） |
| **P2** | 金額成為 hero（大字 + 右側 inline backspace；不顯示換算行） |
| **P7** | 刪除移到 modal header（edit 模式才出 trash icon），點下需 confirm sheet |
| **P8** | Transfer 兩個獨立金額輸入框（依 Ken r1 要求改寫；中間夾匯率提示 pill） |
| **P9** | From / To 中間箭頭可點對調帳戶方向 |

Wheel picker 行為依 Ken r2 要求保留——類別 / 帳戶選擇用 wheel 直接滑選，不採用先點開另一頁的兩段流程。

### `Explored · 2026-05-18` — 探索後拒絕

| 提案 | 拒絕原因 |
|---|---|
| **P3** | 改成 chip / tile 兩段流程：Ken r2 明示「不喜歡先點一下才能選」，要保留 wheel picker |
| **P4** | 支出 / 收入 / 轉帳 segmented：Ken r1 明示「在 homescreen 點 FAB 就等於選好模式」，editor 不應再切 |
| **P5** | 備註常用建議 chip：Ken r1 明示「不用」 |
| **P6** | 鍵盤運算強調樣式：Ken r1 明示「不用」（且 Ken r2 同步：backspace 放金額 hero、不在鍵盤） |
| **P10** | 三層視覺 hierarchy 標籤：Ken r1 明示「我不知道這個的意義」；保留實際視覺層次，但拿掉解釋性 label |

注：P3-P6 的 component 定義仍保留在 `proposals.jsx`，但 `variants.jsx` 不再把它們渲染進提案區的 DCArtboard。需要回顧時直接讀 source 即可。

## 檔案

```
transaction_editor/
├── README.md          這份檔
├── current.jsx        CurrentTransactionEditor / CurrentTransferEditor
├── observations.jsx   EditorObservations + ED_OBS_ISSUES 陣列
├── proposals.jsx      Proposal1...Proposal10（全部保留）
├── merged.jsx         MergedTransactionEditor / MergedTransferEditor
└── variants.jsx       TransactionEditorSection（DC sections composition）
```

`variants.jsx` 是這個主題對外的單一入口，向 window 註冊 `TransactionEditorSection`，由 `90_workbench/app.jsx` 的 `EXPLORATION_TOPICS` 引用。

## 後續

若要把某個保留方向正式定案落到 Spec / Impl：

1. 在 Spec git 開新 spec branch，獨立撰寫對應 screen 規格
2. Spec 撰寫不繼承本探索的結論，只引用「視覺有此可能性，請就行為層描述」
3. Impl 跟著 Spec 動，本探索的 JSX 只作為視覺參考素材
