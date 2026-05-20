// ─────────────────────────────────────────────────────────────
// LIST_TOKENS · grouped list / ListItem / SelectionGridItem 的元件參數
//
// 內部一律引用 atomic 層（ROW_HEIGHT / SPACING / TYPE_STYLES / ICON_SIZE / RADIUS / TYPOGRAPHY）。
// literal 值統一以 `// (literal: <原因>)` 標記。
// ─────────────────────────────────────────────────────────────

const LIST_TOKENS = {
  ITEM_MIN_HEIGHT:           ROW_HEIGHT.base,
  ITEM_PADDING_VERTICAL:     TYPE_STYLES.body.size,         // 17
  ITEM_PADDING_HORIZONTAL:   SPACING.lg,
  ITEM_GAP_HORIZONTAL:       SPACING.md,
  ITEM_TITLE_SIZE:           TYPE_STYLES.body.size,         // body 17
  ITEM_TITLE_WEIGHT:         TYPOGRAPHY.weight.light,
  ICON_SIZE_SMALL:           ICON_SIZE.sm,
  ICON_SIZE_MEDIUM:          ICON_SIZE.md,
  ICON_SIZE_LARGE:           ICON_SIZE.xl,
  DIVIDER_INSET_WITH_ICON:   SPACING.lg + ICON_SIZE.sm + SPACING.md,
  DIVIDER_INSET_WITHOUT_ICON: SPACING.lg,
  GROUP_CARD_RADIUS:         RADIUS.lg,                     // 12（HIG 不收 14，改採 lg）
  GROUP_CARD_MARGIN_BOTTOM:  35,                            // (literal: 35, 離開 SPACING 階梯為 section 間呼吸距)
  GROUP_CARD_BORDER_WIDTH:   1,                             // (literal: StyleSheet.hairlineWidth；canvas 為 React Web 無法 resolve)
  SECTION_TITLE_SIZE:        TYPE_STYLES.footnote.size,     // footnote 13
  SECTION_TITLE_WEIGHT:      TYPOGRAPHY.weight.regular,
  SECTION_TITLE_LETTER_SPACING: 0.5,                        // (literal: 小字級補回可讀性)
  SECTION_TITLE_PADDING_TOP: SPACING.md,
  SECTION_TITLE_PADDING_BOTTOM: SPACING.xs + SPACING['2xs'],   // 6
  SECTION_TITLE_PADDING_HORIZONTAL: SPACING.lg,
  SELECTION_ITEM_RADIUS:     RADIUS.md,
  SELECTION_ITEM_MARGIN_BOTTOM: SPACING.sm,
  SELECTION_CHECKMARK_SIZE:  ICON_SIZE.xs,
  TRAILING_CHEVRON_SIZE:     TYPE_STYLES.footnote.size,     // 13
  TRAILING_CHEVRON_WEIGHT:   'semibold',                    // (literal: SF Symbols semibold enum)
  TRAILING_VALUE_SIZE:       TYPE_STYLES.body.size,         // 17
  PRESS_BG_HIGHLIGHT_OPACITY: 0.5,                          // (literal: press 態高亮)
  GRID_COLUMNS:              2,                             // (literal: SelectionGridItem 預設欄數)
  GRID_GAP:                  SPACING.md,
  EMPTY_STATE_ICON_SIZE:     ICON_SIZE['2xl'],
  EMPTY_STATE_TITLE_SIZE:    TYPE_STYLES.body.size,         // 17
  EMPTY_STATE_DESCRIPTION_SIZE: TYPOGRAPHY.size.sm,         // 14
  EMPTY_STATE_ICON_GAP:      SPACING.md,
  EMPTY_STATE_TEXT_GAP:      SPACING.sm,
  EMPTY_STATE_PADDING_HORIZONTAL: SPACING.xl,
};

Object.assign(window, { LIST_TOKENS });
