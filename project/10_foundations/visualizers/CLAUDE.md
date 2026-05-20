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
│   └── no8_list_empty_transition_visualizer.jsx FoundationsCTListEmptyTransitionSection
└── showcase/                                對應 Foundations > Showcase group
    ├── no2_brand_visualizer.jsx             FoundationsShowcaseBrandSection
    └── no3_icon_library_visualizer.jsx      FoundationsShowcaseIconLibrarySection
    # showcase/no1 由 20_components/components-showcase.jsx 提供
    # （FoundationsShowcaseComponentsSection）
```

## Section 命名規範

- Atomic：`Foundations Atomic<Topic>Section`（例 `FoundationsAtomicTypeSection`）
- Component Tokens：`FoundationsCT<Topic>Section`（例 `FoundationsCTListSection`）
- Showcase：`FoundationsShowcase<Topic>Section`（例 `FoundationsShowcaseBrandSection`）

對應 `90_workbench/app.jsx` 的 `FOUNDATIONS_GROUPS` render 函式名稱。

## 規範

- 卡片必須讀活 token（直接引用 atomic / component_tokens 的 const），禁 hardcode 數字
- TokenTableCard 接收的 `descriptions` / `sources` 必須與該檔對應的 component_tokens 檔的 key 集合完全一致
- 改 component_tokens 的 key/value 時必須同步本目錄對應 visualizer 內的 DESC / SOURCE 表
- 共用 UI primitives 一律由 `no0_shared_card_kit.jsx` 提供，禁止在各 visualizer 內重複定義 FoundCard / Swatch / TokenTableCard

## 載入順序

- `no0_shared_card_kit.jsx` 必須最先載
- atomic / component_tokens / showcase 三層彼此無依賴，可平行載
- 全部 visualizers 必須在 `components-showcase.jsx` 之前載入（後者引用 `FoundationsShowcaseComponentsSection` 之外的 visualizer 不依賴本目錄）
