# Axis · Dual Picker Layout

把 MergeEditor 的來源與目標兩 selector 從現況改成 TransferEditor 那種雙 inline static wheel picker。本軸定排版方向、要不要保留頂部視覺化列、衝突態長相。

**問題：** 現況 MergeEditor 本身是 fullScreenModal，來源與目標 selector 用 `mode="modal"`，點下去**又彈一個 WheelPickerModal**——modal 裡再彈 modal，層級深、體驗差。另外類別模式現在把兩個 selector 都鎖在來源的 type、預設 expense，收入類別永遠選不到，這是 bug。本軸改成兩個常駐 wheel picker：來源列全部、可任選；目標只列與來源相容的子集，類別同 type、帳戶同幣別，相同則停用。剩下要定的是排版方向與頂部視覺化列去留。

## 並陳的提案

| Variant | 容器排向 | 方向元素 | 頂部視覺化列 | 與 TransferEditor 對齊 |
|---|---|---|---|---|
| V-H · Horizontal | 橫向並排 | 中央 `→` | 無 | 一致，現役 transfer 橫向 box |
| V-V · Vertical | 縱向上下疊 | 中央 `↓` | 無 | 部分，對齊 transfer box_framing 待定的 V2 方向 |
| V-H+viz · Horizontal + Viz | 橫向並排 | 中央 `→` | 保留 source → target | 一致，多一列摘要 |
| Conflict | 橫向示意 | 中央 `→` | 無 | 來源=目標 → 紅框 + 完成停用 |

## 三者差異要點

- **V-H** 直接照現役 TransferEditor 的橫向 box：兩 picker 各分半寬，中間夾 `→`。跨 editor 視覺一致；痛點是類別或帳戶名稱長時被切半寬擠壓。
- **V-V** 全寬縱向疊放，picker 拿回完整寬度，箭頭走 `↓` 只佔行距；名稱長時不擠。代價是垂直空間佔比較高，且與現役 transfer 橫向不一致，除非 transfer 也一起轉 V2。
- **V-H+viz** 在 V-H 之上保留頂部 source → target 的 icon 加名稱摘要列。picker 本身已顯示當前選擇，這列的價值在於用 icon 強化方向與保留刪除語意；冗餘與否本軸決定。TransferEditor 沒有這列。
- **Conflict** 演示來源與目標相同時：外框轉 `TOKENS.error` 紅、header 完成鈕停用、下方一句說明。對齊 impl TransferEditor 的 `pickerGroupBoxError`。初始兩 picker 皆第一項，預設就是這個衝突態，使用者改任一側才解開。

## 開放問題，exploration 完留作下游記錄

- 排版方向定案後，box 抽成共用 component token 名為 dual-picker-box，TransferEditor 與 MergeEditor 共用同一真相；本探索階段先用 atomic token inline。
- 若選 V-V，是否連帶把 TransferEditor 也轉 V2，即 box_framing 軸的待定項，一起收斂，避免兩 editor 一橫一縱不一致。
- 帳戶模式同幣別跟隨，視覺與類別模式相同，本軸用類別示意，未另開帳戶 artboard。
- 同型別或同幣別只有一項時兩 picker 必相同 → 永遠停用，語意正確，不足兩項無法合併；是否補一句 helper text 屬下游 polish。

## 狀態

`Open question · 2026-06-01`

## 變更紀錄

- 2026-06-01 · 初版：並列 V-H、V-V、V-H+viz、Conflict 四 variant，留排版方向與視覺化列去留待使用者在 canvas 拍板。
