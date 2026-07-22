# CLAUDE.md · `component_tokens/`

元件級 token 收納處。每個元件 family 一個 `noN_*.jsx`，承載該元件可調的 implementation detail。

## 規範

- 一元件 family 一檔；新增元件 family 時新增 `noN_xxx_tokens.jsx`，編號接續
- 所有值必須引用 atomic 層（`SPACING` / `RADIUS` / `TYPE_STYLES` / `ICON_SIZE` / `ROW_HEIGHT` / `MOTION` / `TYPOGRAPHY`）
- 不可寫 raw number 作為 token 值
- 例外：visual calibration 數值（離開 atomic 階梯的視覺校準）必須用 `// (literal: <原因>)` 註釋標記
- 檔尾統一 `Object.assign(window, { X_TOKENS })`

## 與 visualizers 的一對一對應

每個 `component_tokens/noN_<name>_tokens.jsx` 對應 `visualizers/component_tokens/noN_<name>_visualizer.jsx`。新增 token 必須同步更新對應 visualizer 內的 TokenTableCard 資料（DESC / SOURCE）。

## 載入順序限制

- 必須在 atomic 層（no1–no6）之後載入
- 必須在 `20_components/components.jsx` 與 `30_screens/` 各 screen 子目錄之前載入（後兩者消費這些 token）
- 內部彼此無依賴（除 `SWITCH_TOKENS` 依賴 `TOKENS` 與 `IOS_SYSTEM_COLOR`，已在 atomic 層滿足）
