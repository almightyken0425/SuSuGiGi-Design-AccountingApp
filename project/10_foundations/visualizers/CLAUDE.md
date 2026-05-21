# CLAUDE.md · `visualizers/`

Foundations canvas 視覺化卡片。每個 leaf sub-item 一個 visualizer Section function。

## 分層

```
visualizers/
├── no0_shared_card_kit.jsx                 共用 UI primitives（FoundCard / FoundLabel / Swatch / SectionMini / AnatomyRuler / TokenTableCard）
├── atomic/                                  對應 Foundations > Atomic group
│   ├── no1_type_visualizer.jsx              FoundationsAtomicTypeSection
│   ├── no2_colors_visualizer.jsx            FoundationsAtomicColorsSection
│   ├── no3_layout_visualizer.jsx            FoundationsAtomicLayoutSection
│   └── no4_platform_visualizer.jsx          FoundationsAtomicPlatformSection
├── component_tokens/                        對應 Foundations > Component Tokens group
│   ├── no1_list_visualizer.jsx              FoundationsCTListSection
│   ├── no2_tx_list_visualizer.jsx           FoundationsCTTxListSection
│   ├── no3_form_picker_visualizer.jsx       FoundationsCTFormPickerSection
│   ├── no4_chip_visualizer.jsx              FoundationsCTChipSection
│   ├── no5_search_bar_visualizer.jsx        FoundationsCTSearchBarSection
│   ├── no6_header_icon_button_visualizer.jsx FoundationsCTHeaderIconButtonSection
│   ├── no7_switch_visualizer.jsx            FoundationsCTSwitchSection
│   ├── no8_list_empty_transition_visualizer.jsx FoundationsCTListEmptyTransitionSection
│   ├── no9_amount_field_visualizer.jsx      FoundationsCTAmountFieldSection
│   ├── no10_static_wheel_picker_visualizer.jsx FoundationsCTStaticWheelPickerSection
│   └── no11_recurring_options_visualizer.jsx FoundationsCTRecurringOptionsSection
├── brand/                                   對應 Foundations > Brand group
│   └── no1_ui_glyphs.jsx                    FoundationsBrandUIGlyphsSection
└── icon_library/                            對應 Foundations > Icon Library group
    └── no1_all_icons.jsx                    FoundationsIconLibraryAllIconsSection

# Foundations > Components group 5 leaf 由 20_components/components-showcase.jsx 提供
# （ComponentsListSection / ComponentsFormSection / ComponentsNavigationSection /
#  ComponentsChartSection / ComponentsInputSection）
```

## Section 命名規範

- Atomic：`FoundationsAtomic<Topic>Section`（例 `FoundationsAtomicTypeSection`）
- Component Tokens：`FoundationsCT<Topic>Section`（例 `FoundationsCTListSection`）
- Brand：`FoundationsBrand<Topic>Section`（例 `FoundationsBrandUIGlyphsSection`）
- Icon Library：`FoundationsIconLibrary<Topic>Section`（例 `FoundationsIconLibraryAllIconsSection`）
- Components（在 20_components/ 下）：`Components<Topic>Section`（例 `ComponentsListSection`）

對應 `90_workbench/app.jsx` 的 `FOUNDATIONS_GROUPS` render 函式名稱。

## 規範

- 卡片必須讀活 token（直接引用 atomic / component_tokens 的 const），禁 hardcode 數字
- TokenTableCard 接收的 `descriptions` / `sources` 必須與該檔對應的 component_tokens 檔的 key 集合完全一致
- 改 component_tokens 的 key/value 時必須同步本目錄對應 visualizer 內的 DESC / SOURCE 表
- 共用 UI primitives 一律由 `no0_shared_card_kit.jsx` 提供，禁止在各 visualizer 內重複定義 FoundCard / Swatch / TokenTableCard

## DCFamily 結構規範

Canvas 容器階層為 `DCSection > DCFamily > DCArtboard` 三層。每個 visualizer Section 內所有 artboard 必須包在至少一個 DCFamily 內（不允許 artboard 直接掛在 Section 下）。

- **必要 props**：`id`（kebab-case）、`title`（人類可讀）
- **可選 props**：`subtitle`、`direction`（預設 `'row'`，family 內 artboard 水平並排；token 表類巨型卡片可改 `'column'`）
- **section direction 已忽略**：family 模式下 DCSection 不再讀 `direction` prop，family 一律垂直堆疊；artboard 方向由 family 自身的 direction 決定
- **1-artboard 頁面也要包 family**：family title 可以用 `Tokens` 或更具體的子題名稱，維持結構一致

### Family 命名範例

| 場景 | family id 命名 | family title |
|---|---|---|
| 純 token 表 | `<leaf>-tokens-family` | `Tokens` |
| 元件 anatomy | `<leaf>-anatomy-family` | `Anatomy` |
| 衍生公式 | `<leaf>-derived-family` | `Derived Values` |
| Components 多元件 | `comp-<leaf>-<topic>` | 具體子題（如 `Item Variants` / `Containers`） |

### Focus overlay 鍵盤行為

- `← / →`：在同 family 內 cycle artboard
- `shift + ← / →`：跨 family（跳到下一個 family 的第一個 artboard）
- `↑ / ↓`：跨 section（跳到下一個 leaf 的第一個 artboard）

### 拖拉重排

artboard 可在同 family 內拖拉重排，不會越過 family 邊界。順序持久化到 `.design-canvas.state.json` 的 `sections.<sid>.families.<fid>.order`。

## 載入順序

- `no0_shared_card_kit.jsx` 必須最先載
- atomic / component_tokens / brand / icon_library 四個子目錄彼此無依賴，可平行載
- 本目錄與 `components-showcase.jsx` 彼此獨立，但都需在 `app.jsx` 之前載入（後者透過 `FOUNDATIONS_GROUPS` 引用 Section 函式）
