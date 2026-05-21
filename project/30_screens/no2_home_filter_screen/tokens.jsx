// ─────────────────────────────────────────────────────────────
// HOME_FILTER_SCREEN_TOKENS · HomeFilterScreen 內部 composition 參數
//
// Modal screen，提供時間粒度 + 分組方式切換 + 跨幣別帳戶多選。
// 消費 atomic（SPACING / RADIUS / TYPE_STYLES）+ component_tokens（LIST_TOKENS.GROUP_CARD_RADIUS）。
// ─────────────────────────────────────────────────────────────

const HOME_FILTER_SCREEN_TOKENS = {
  // ── Screen container
  SCREEN_PADDING:                       SPACING.lg,

  // ── Tile row（time / group-by 兩 tile）
  TILE_ROW_BOTTOM_MARGIN:               SPACING['3xl'],
  TILE_GAP:                             SPACING.sm,
  TILE_PADDING_VERTICAL:                SPACING.lg,
  TILE_PADDING_HORIZONTAL:              SPACING.md,
  TILE_RADIUS:                          LIST_TOKENS.GROUP_CARD_RADIUS,
  TILE_FONT_SIZE:                       TYPE_STYLES.body.size,
  TILE_LETTER_SPACING:                  -0.2,                                  // (literal: HIG body letter-spacing 視覺校準)
  TILE_SHADOW:                          '0 1px 2px rgba(0,0,0,0.04)',          // (literal: 比 SHADOW_ELEVATION.level1 更輕，tile 區與背景區分用)

  // ── Currency group block 間距
  CURRENCY_GROUP_GAP:                   SPACING.lg,                            // 跨 currency group 垂直間距
  ACCOUNT_CARD_INTRA_GAP:               SPACING.sm,                            // group 內 wrap gap

  // ── Account selector card
  ACCOUNT_CARD_PADDING_VERTICAL:        SPACING.md,
  ACCOUNT_CARD_PADDING_HORIZONTAL:      SPACING.md,
  ACCOUNT_CARD_RADIUS:                  RADIUS.lg,
  ACCOUNT_CARD_CONTENT_GAP:             SPACING.md,                            // icon → text → currency 間距
  ACCOUNT_CARD_BORDER_WIDTH_SELECTED:   1.5,                                   // (literal: selected emphasis，比 unselected 1 略粗)
  ACCOUNT_CARD_BORDER_WIDTH_DEFAULT:    1,
  ACCOUNT_CARD_ICON_FRAME:              32,                                    // (literal: icon swatch frame，無 atomic 階梯對應)
  ACCOUNT_CARD_ICON_RADIUS:             RADIUS.md,
  ACCOUNT_CARD_ICON_SIZE:               17,                                    // (literal: 比 ICON_SIZE.sm=20 略小，配 32 frame 內留呼吸)
  ACCOUNT_CARD_NAME_SIZE:               TYPE_STYLES.footnote.size,
  ACCOUNT_CARD_CURRENCY_SIZE:           TYPE_STYLES.caption2.size,
  ACCOUNT_CARD_CURRENCY_LETTER_SPACING: 0.4,                                   // (literal: 字母間距視覺校準，currency code 強化辨識)

  // ── Layout helper
  DESIGN_CANVAS_WIDTH:                  402,                                   // (literal: 與 ScreenFrame 寬一致，用於 card width 計算)
};

Object.assign(window, { HOME_FILTER_SCREEN_TOKENS });
