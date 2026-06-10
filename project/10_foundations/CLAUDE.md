# CLAUDE.md · `10_foundations/`

本目錄為 SuSuGiGi accounting app 的設計標準權威來源。Spec 與 Impl 跟隨對齊。

## 內部分層

```
10_foundations/
├── no1_atomic_tokens.jsx        顏色 / 主題 / 玻璃 / 陰影階梯 / 遮罩
├── no2_canvas_tokens.jsx        TOKENS / CHART_COLORS / GLASS（canvas 渲染快照，impl 不消費）
├── no3_typography.jsx           字體系統
├── no4_layout_tokens.jsx        間距 / 圓角 / 陰影 alias / 動畫 / icon 尺寸 / 觸控目標 / row 高度
├── no5_platform_tokens.jsx      平台特定固定值（iOS system color、ACTION_ICON_MAP）
├── no6_icon_library.jsx         205 個 phosphor SVG IconDefinition
├── component_tokens/            元件級 token（一元件一檔，引用 atomic 層）
└── visualizers/                 canvas 視覺化卡片（對應 Foundations TOC 三 group）
```

## 修改流程

- 改 atomic token → 自動波及 component_tokens（透過引用鏈）與 visualizers（即時 re-render）
- 改 component token → 必須同步更新對應 `visualizers/component_tokens/noN_*.jsx` 內的 TokenTableCard 資料（DESC / SOURCE）
- 新增 token 類別 → 在對應子目錄新增 `noN_xxx.jsx`，編號接續，並更新 `project/SuSuGiGi.html` 載入順序

## 禁止

- 在 `component_tokens/` 內硬編碼數值（必須引用 atomic 層；視覺校準例外時用 `// (literal: <原因>)` 標記）
- 在 `visualizers/` 內定義 token（visualizer 只能讀活 token 渲染卡片）
- 改動 export 名稱（會打到 impl 對齊；新增名稱可，重命名不可）

## 互動狀態政策

任何元件按下、停用、選取的視覺反饋一律走 token，不另起 opacity 路線。

- **Pressed**: 背景換成 `TOKENS.surface2`，即 atomic 層的 `surface_hover`。不要用 `activeOpacity` 把整列淡掉——opacity 法會與拖拉列表 lifted 狀態的 opacity 視覺打架，也跟 iOS native list 的底色變化不一致
- **Disabled**: 文字色從 `TOKENS.ink` 降到 `TOKENS.ink3`；背景維持 `TOKENS.surface`，不另變色
- **Selected**: 靠 trailing checkmark 或右上 check-circle 表達，不改背景；selected + pressed 同時發生時 pressed 視覺優先

新增 row 級元件依此 pattern 補 pressed 內部 state，搭配 `onPointerDown` / `onPointerUp` / `onPointerLeave` 切換，背景三元式寫成 `pressed && !disabled ? TOKENS.surface2 : TOKENS.surface`。受外層手勢容器拘束的元件——例如 `ReorderableListItem` 在 `AutoDragSortableView` 內——按相同視覺結果處理，僅 impl 端用 `onTouch*` 替代 `Pressable` 避免搶 responder lock。實際展示見 Foundations > Components > List 的 Interaction States family。

## TOC 對應

Foundations TOC 由 `90_workbench/app.jsx` 的 `FOUNDATIONS_GROUPS` 驅動，5 group × 24 leaf：

| Group | Leaf | 渲染檔案 |
|---|---|---|
| Atomic | Type | `visualizers/atomic/no1_type_visualizer.jsx` |
| Atomic | Colors | `visualizers/atomic/no2_colors_visualizer.jsx` |
| Atomic | Layout | `visualizers/atomic/no3_layout_visualizer.jsx` |
| Atomic | Platform | `visualizers/atomic/no4_platform_visualizer.jsx` |
| Component Tokens | List | `visualizers/component_tokens/no1_list_visualizer.jsx` |
| Component Tokens | Transaction List | `visualizers/component_tokens/no2_tx_list_visualizer.jsx` |
| Component Tokens | Form Picker | `visualizers/component_tokens/no3_form_picker_visualizer.jsx` |
| Component Tokens | Chip | `visualizers/component_tokens/no4_chip_visualizer.jsx` |
| Component Tokens | Search Bar | `visualizers/component_tokens/no5_search_bar_visualizer.jsx` |
| Component Tokens | Header Icon Button | `visualizers/component_tokens/no6_header_icon_button_visualizer.jsx` |
| Component Tokens | Switch | `visualizers/component_tokens/no7_switch_visualizer.jsx` |
| Component Tokens | List Empty Transition | `visualizers/component_tokens/no8_list_empty_transition_visualizer.jsx` |
| Component Tokens | Amount Field | `visualizers/component_tokens/no9_amount_field_visualizer.jsx` |
| Component Tokens | Static Wheel Picker | `visualizers/component_tokens/no10_static_wheel_picker_visualizer.jsx` |
| Component Tokens | Recurring Options | `visualizers/component_tokens/no11_recurring_options_visualizer.jsx` |
| Component Tokens | Confirm Dialog | `visualizers/component_tokens/no12_confirm_dialog_visualizer.jsx` |
| Component Tokens | Calendar Dialog | `visualizers/component_tokens/no13_calendar_dialog_visualizer.jsx` |
| Components | List | `20_components/components-showcase.jsx`（`ComponentsListSection`） |
| Components | Form | `20_components/components-showcase.jsx`（`ComponentsFormSection`） |
| Components | Navigation | `20_components/components-showcase.jsx`（`ComponentsNavigationSection`） |
| Components | Chart | `20_components/components-showcase.jsx`（`ComponentsChartSection`） |
| Components | Input | `20_components/components-showcase.jsx`（`ComponentsInputSection`） |
| Brand | UI Glyphs | `visualizers/brand/no1_ui_glyphs.jsx` |
| Icon Library | All Icons | `visualizers/icon_library/no1_all_icons.jsx` |

## 載入順序

依賴鏈見 `README.md` 與 `project/SuSuGiGi.html`。修改子目錄時務必驗證載入順序未被破壞（V6 載入順序驗證）。
