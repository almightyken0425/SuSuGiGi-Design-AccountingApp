// ─────────────────────────────────────────────────────────────
// MERGE_EDITOR_SCREEN_TOKENS · MergeEditorScreen 內部 composition 參數
//
// Modal save form。三段：Visualization row（source → target）+ Warning banner + 兩 selector。
// impl src/screens/Merge/MergeEditorScreen.tsx 結構鏡射。
// 使用 AccountSelector / CategorySelector 元件（已存在於 20_components/）。
// ─────────────────────────────────────────────────────────────

const MERGE_EDITOR_SCREEN_TOKENS = {
  SCREEN_PADDING:           SPACING.lg,
  VISUAL_PADDING_VERTICAL:  SPACING.xl,
  VISUAL_BOTTOM_MARGIN:     SPACING.lg,
  VISUAL_ITEM_WIDTH:        100,                  // (literal: impl visualItem width 100)
  VISUAL_TEXT_TOP_MARGIN:   SPACING.sm,
  VISUAL_TEXT_FONT_SIZE:    TYPOGRAPHY.size.sm,
  PLACEHOLDER_ICON_SIZE:    32,                   // (literal: impl placeholderIcon 32x32)
  PLACEHOLDER_ICON_RADIUS:  RADIUS.xl,
  WARNING_PADDING:          SPACING.md,
  WARNING_RADIUS:           RADIUS.md,
  WARNING_BOTTOM_MARGIN:    SPACING.xl,
  WARNING_FONT_SIZE:        TYPOGRAPHY.size.sm,
  WARNING_LINE_HEIGHT:      20,                   // (literal: impl warningText lineHeight 20)
  SELECTOR_GAP:             SPACING.lg,
};

Object.assign(window, { MERGE_EDITOR_SCREEN_TOKENS });
