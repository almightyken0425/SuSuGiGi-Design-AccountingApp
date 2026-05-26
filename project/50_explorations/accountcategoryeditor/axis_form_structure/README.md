# Axis · Form Structure

從 AccountEditor / CategoryEditor 一打開來「四個白盒上下排排站」的單調感出發，探索整體版型可以如何重新分層。

**問題：** 目前 editor 打開來是「名稱 input + 三個 collapsed picker + 啟用 switch」，每個欄位寬度、高度、surface 都一致。整片白盒沒有視覺權重差別，跟 transfer editor 那種「日期 chip + 大金額 + 帳戶 pill + 計算機」豐富層次相比顯得單調。同時，編輯模式打開時，使用者沒有「這個帳戶現在長什麼樣」的整體預覽。

## 並陳的提案

| Variant | 整體版型 | 預覽 | 選擇器密度 | 跟現況差異 |
|---|---|---|---|---|
| V0 [Current] · Uniform boxes | 四個同寬同高的白盒 | 無 | 中（每個各佔一行） | — |
| V1 · Hero identity | 頂部大圖示 + 大字名稱 + 字串描述 | 頂部 hero | 低（三個 picker 變 list row 共用一張卡） | identity 為主、設定為副 |
| V2 · Settings style | iOS 設定頁風格的 list row 分組 | 無 | 低（四個 row 緊鄰一卡） | 移除 form group 框、改 row 風格 |
| V3 · Compact preview | 頂部小型 preview row + form chip | 頂部小卡 | 高（chip 緊湊排版） | preview 常駐、選擇器壓縮 |

## 三者差異要點

- **V0** 是現況：每個欄位都是同樣大小的白盒，視覺權重一致；編輯時看不到帳戶現在長什麼樣，要靠 form 內容自己腦補。
- **V1** 把「身份」（icon + 名稱 + 描述）抽成頂部 hero 區，下方三個 picker 改成共用一張卡的 settings list row 風格。「我在編誰」的問題一眼有解；form 部分視覺權重降下來。
- **V2** 直接走 iOS 設定頁風格：拿掉 form group 的 label + 框，整片都是 list row（左 label / 右 value），row 之間用 hairline 分隔。視覺最乾淨、最像 iOS。沒有 hero，但每個 row 都清楚。
- **V3** 在頂部加一個小型 preview row（左 icon、中名稱與類型、右幣別 badge），form 部分壓縮成緊湊 chip 排版。preview 不搶版面但常駐，編輯感更明確。

## 同樣套用到 CategoryEditor

四個 variant 的版型對 category editor 同樣可套：
- name 換成「分類名稱」
- 幣別 / 類型欄位換成 type selector（支出 / 收入）+ 標準分類對應
- 圖示欄位邏輯不變
- 編輯模式同樣保留啟用 toggle + 刪除按鈕

特別在 V2 / V3 風格下，category editor 既有的 type selector（兩按鈕橫排 + chevron）可以直接收進 list row 風格或 segmented chip，順便解掉 chevron 詭異的問題。

## 開放問題

- V1 的 hero 在「新增模式」（name 為空）視覺要怎麼降級？是顯示 placeholder icon + 「未命名帳戶」字串，還是 hero 直接縮成同 V2 的 list row？
- V2 / V3 的圖示 row 內，是否要在 collapsed 狀態顯示 icon preview（左側 leading icon），還是只顯示「圖示 ⌃」？跟 axis_icon_picker 軸的決議綁定。
- V3 的小型 preview row 如果同畫面下還有 Switch + 刪除按鈕，會不會視覺過於零碎？對應 axis_footer_zone 的「危險區」聚合提案。

## 狀態

`Open question · 2026-05-25`

## 變更紀錄

- 2026-05-25 · 初版：並列 V0 / V1 / V2 / V3 四 variant，AccountEditor edit mode 為主畫面，CategoryEditor 套用方式留 README 描述
