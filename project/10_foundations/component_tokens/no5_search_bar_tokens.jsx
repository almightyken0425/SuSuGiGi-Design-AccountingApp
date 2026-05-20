// ─────────────────────────────────────────────────────────────
// SEARCH_BAR_TOKENS · BottomSearchBar pill 形搜尋列
//
// pill 高度 = HIT_TARGET.min；附帶衍生值 BOTTOM_SEARCH_BAR_TOTAL_HEIGHT。
// ─────────────────────────────────────────────────────────────

const SEARCH_BAR_TOKENS = {
  PILL_HEIGHT:               HIT_TARGET.min,
  PADDING_HORIZONTAL:        SPACING.lg,
  PADDING_VERTICAL:          SPACING.md,
  PILL_PADDING_HORIZONTAL:   SPACING.md,
  ICON_GAP:                  SPACING.sm,
  ICON_SIZE:                 ICON_SIZE.sm,
  INPUT_FONT_SIZE:           TYPOGRAPHY.size.base,
};

// 衍生值 — 搜尋列總高度（pill + 上下 padding 兩倍）。
const BOTTOM_SEARCH_BAR_TOTAL_HEIGHT = SEARCH_BAR_TOKENS.PILL_HEIGHT + SEARCH_BAR_TOKENS.PADDING_VERTICAL * 2;

Object.assign(window, { SEARCH_BAR_TOKENS, BOTTOM_SEARCH_BAR_TOTAL_HEIGHT });
