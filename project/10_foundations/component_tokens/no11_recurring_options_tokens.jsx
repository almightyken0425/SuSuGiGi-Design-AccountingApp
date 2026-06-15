// ─────────────────────────────────────────────────────────────
// RECURRING_OPTIONS_TOKENS · 定期設定卡片
//
// 對齊 impl src/components/RecurringOptions.tsx。
// container 卡片 + headerRow（title + Switch）+ 內容區（frequency / interval / endCondition）。
// 內部 chip 視覺由 CHIP_TOKENS 提供（已存在於 no4_chip_tokens.jsx）。
// ─────────────────────────────────────────────────────────────

const RECURRING_OPTIONS_TOKENS = {
  // ── Container（卡片外框）
  CONTAINER_RADIUS:            RADIUS.lg,
  CONTAINER_PADDING:           SPACING.lg,
  CONTAINER_MARGIN_TOP:        SPACING.sm,
  CONTAINER_MARGIN_BOTTOM:     SPACING.lg,
  CONTAINER_BORDER_WIDTH:      1,                                              // (literal: StyleSheet.hairlineWidth canvas 為 React Web 無法 resolve)

  // ── HeaderRow（title + Switch）
  HEADER_BOTTOM_MARGIN:        SPACING.lg,
  TITLE_SIZE:                  TYPOGRAPHY.size.base,
  TITLE_WEIGHT:                TYPOGRAPHY.weight.medium,

  // ── 內容區
  DISABLED_OPACITY:            0.5,                                            // (literal: enabled=false 時內容區半透明)
  LABEL_SIZE:                  TYPOGRAPHY.size.sm,
  LABEL_VERTICAL_MARGIN:       SPACING.sm,
  ROW_BOTTOM_MARGIN:           SPACING.sm,

  // ── Interval input（數字輸入欄）
  INTERVAL_INPUT_WIDTH:        60,                                             // (literal: 數字輸入欄寬，無對應階梯)
  INTERVAL_INPUT_PADDING:      SPACING.sm,
  INTERVAL_INPUT_RADIUS:       RADIUS.md,
  INTERVAL_INPUT_BORDER_WIDTH: 1,                                              // (literal: 同上 hairline)
  INTERVAL_INPUT_SIZE:         TYPOGRAPHY.size.lg,
  INTERVAL_INPUT_RIGHT_GAP:    SPACING.md,
  UNIT_TEXT_SIZE:              TYPOGRAPHY.size.base,

  // ── End-date pill（與「永不 / 特定日期」chip 同行的 DatePill）
  // 對齊 impl src/components/RecurringOptions.tsx 中與兩顆 chip 同行的 DateTimePicker。
  // 永不時 pill 留在原位置淡出停用，避免整列寬度跳動。
  // 高度透過 PADDING_VERTICAL 與 CHIP_TOKENS.PADDING_VERTICAL 一致（皆 SPACING.sm = 8），
  // 與 chip 等高 30pt，可在 flex row 內並排對齊。
  END_DATE_PILL_PADDING_VERTICAL:   SPACING.sm,                                  // (literal: 與 CHIP_TOKENS.PADDING_VERTICAL 綁定，確保 pill 與 chip 等高)
  END_DATE_PILL_PADDING_HORIZONTAL: SPACING.md,
  END_DATE_PILL_RADIUS:             RADIUS.md,
  END_DATE_PILL_BORDER_WIDTH:       1,                                          // (literal: 同上 hairline)
  END_DATE_PILL_TEXT_SIZE:          TYPOGRAPHY.size.base,
  END_DATE_PILL_ICON_GAP:           SPACING.sm,
  END_DATE_PILL_DISABLED_OPACITY:   0.5,                                        // (literal: 永不時的淡出停用透明度，沿用 DISABLED_OPACITY 值)
  END_DATE_PILL_FADE_DURATION:      MOTION.duration.fastPlus,                   // 220ms，對齊 ListEmptyTransition 慣例
};

Object.assign(window, { RECURRING_OPTIONS_TOKENS });
