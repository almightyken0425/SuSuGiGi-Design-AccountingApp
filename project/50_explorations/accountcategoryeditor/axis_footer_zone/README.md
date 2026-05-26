# Axis · Footer Zone

從 AccountEditor / CategoryEditor 編輯模式底部「啟用 toggle + 刪除按鈕」兩個元素的視覺處理出發。

**問題：**
- 啟用 toggle 的 row 用 `bg.surface` 白底，跟上方 form 的 picker / input 同樣白底，沒有「這是另一組」的視覺分隔；同時自定 `Switch` 元件 thumb 右側目前有渲染瑕疵（會出現一段深色短條），需要修。
- 刪除按鈕只是「置中紅字 + padding」，沒有 background、border、radius；跟 Settings 的登出按鈕（有 box）風格不一致，視覺上像浮在背景上、不夠像「按鈕」。
- toggle 跟刪除按鈕語意上都屬於「對既有資料的危險操作」，目前卻是兩個鬆散獨立的 row，沒有聚合感。

## 並陳的提案

| Variant | 啟用 toggle | 刪除按鈕 | 聚合 | 跟現況差異 |
|---|---|---|---|---|
| V0 [Current] · Loose rows | 白底 surface row + 自定 Switch（有渲染 bug） | 純紅字置中、無 box | 兩個獨立 row | — |
| V1 · Minimal box-up | 白底 surface row + 乾淨 Switch | 紅字 + 紅色 outline + 白底 box | 兩個獨立 row | 修 Switch bug + delete 加 box |
| V2 · Danger zone card | 在「危險區」卡內：toggle row + hairline + delete row | 同左，row 樣式（紅字 + chevron-right 或無） | 一張卡兩 row | 聚合視覺、強化『底部危險操作』語意 |
| V3 · Prominent destructive | segmented「啟用 / 停用」+ 區隔線 | 紅底白字 prominent button | 區隔線分群 | 用色塊強化破壞性 |

## 三者差異要點

- **V0** 是現況：toggle 跟刪除是兩個鬆散獨立 row、Switch 有 bug、刪除沒 box。
- **V1** 是最小變動：修 Switch bug、刪除加 outline box 跟 settings 對齊（白底紅字紅框）。toggle 跟刪除仍是獨立 row，沒做語意聚合。
- **V2** 是聚合方案：在底部建一個「危險區」card（淡紅 tint 背景或單純標題分隔），內部含 toggle row 與 delete row，hairline 分隔。視覺上把「對已存在帳戶/類別的危險操作」聚合成一塊，降低 form 的散落感。
- **V3** 是強化方案：toggle 改 segmented control「啟用 / 停用」直接表達當前狀態，視覺更明確；刪除改紅底白字 prominent button，破壞性意圖最強烈。適合「希望使用者三思」場景，可能對日常啟用切換略嫌過重。

## 跟其他軸的相依

- V1 / V2 跟 axis_form_structure 的 V0 V1 V3 視覺風格相容；V2 跟 V3 在 axis_form_structure 的 V2 (settings style) 下會更自然（settings list row 風格本就支援多卡分組）。
- delete 按鈕外觀也跟 spec git 的 destructive button 通用政策有關，這軸做完得回頭把 destructive button 的 token 補進 component_tokens。

## Switch 渲染 bug 註記

simulator 截圖顯示 toggle on 狀態下 thumb 右側出現一段深色短條，懷疑是自定 `Switch` 元件（`src/components/Switch.tsx`）的 shadow / overflow 設定有誤，或 thumb 位移計算錯誤。本軸所有 V1 / V2 / V3 預設此 bug 已修；視覺上 thumb 應為純圓、無多餘漏色。

## 開放問題

- V2 的「危險區」card 要不要視覺上更搶眼（淡紅 tint 背景 vs. 中性 surface + 標題提示）？做到太搶眼會干擾 form 主視覺，做到太淡聚合語意就丟了。
- V3 的 segmented「啟用 / 停用」跟 category editor 既有的「支出 / 收入」segmented 形式類似，視覺上會不會混淆？兩者語意不同（一個是 enable state、一個是 type）。
- V3 的紅底白字 prominent button 跟「儲存」checkmark 並列時會不會視覺競爭？checkmark 在 nav header 內，紅 button 在底部，分區應該夠遠。

## 狀態

`Open question · 2026-05-25`

## 變更紀錄

- 2026-05-25 · 初版：並列 V0 / V1 / V2 / V3 四 variant
