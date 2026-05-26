# Axis · Box Framing

從 TransferEditor 的 amount / account 兩 row 探索容器處理：要不要包外框、內部 from→to 改橫向或縱向。Date / Note / Calculator 不變。

**問題：** 目前 amount / account 兩 row 各自橫排 `[from] → [to]`，中間夾箭頭。痛點是 `from`、`to` 各分到一半寬度（再扣箭頭欄 40），金額輸入框很窄；中間的箭頭也擠壓 selector 內容，做大會遮、做小看不到。同時 Transfer 跟 TransactionEditor 的視覺風格不一致（Transaction 是縱向疊放、Transfer 是橫向 + 箭頭）。

## 並陳的提案

| Variant | 容器 | 內部排向 | 方向元素 | 與 TransactionEditor 對齊 |
|---|---|---|---|---|
| V0 [Current] · No box | 無外框 | 橫排 | 中央 `→` | 不一致（Transaction 全縱向） |
| V1 · Horizontal box | 外框包 row | 橫排 | 中央 `→` | 部分（多了 grouping，但仍橫向） |
| V2 · Vertical box | 外框包 row | 縱向疊 | 中央 `↓` | 一致（縱向疊放） |

## 三者差異要點

- **V0** 是現況。grouping 視覺不存在；金額框與帳戶 selector 都被切成半寬，箭頭擠在中間
- **V1** 補上外框讓「這兩個是同一組、有方向」的視覺意義成立；但內部還是橫排，金額框仍被切半的痛點沒解
- **V2** 全寬縱向疊放，金額框與帳戶 selector 都拿回完整寬度；箭頭從 `→` 變 `↓` 走垂直只佔行距，不再卡水平空間；視覺結構回到 TransactionEditor 的縱向疊放邏輯，跨 editor 風格一致

## 開放問題（exploration 完留作下游記錄）

- V2 在單幣別場景可進一步退化為單金額框（不顯示 to amount），這是另一軸探索
- box 用 surface 背景 + border 還是用更輕的 tint 表達 grouping，視 TransactionEditor 的 amount field 視覺後續一併調整
- 跨幣別時 active state 切換 from / to 金額焦點的 keypad 行為不在本軸 scope

## 狀態

`Open question · 2026-05-25`

## 變更紀錄

- 2026-05-25 · 初版：並列 V0 / V1 / V2 三 variant，留 open question
