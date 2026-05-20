// ─────────────────────────────────────────────────────────────
// CHIP_TOKENS · pill 形多選器（RecurringOptions 的 optionButton 等）
//
// 注意：chip 高度 ≈ PADDING_VERTICAL*2 + TEXT_SIZE = 8*2 + 14 = 30pt，
// 小於 HIT_TARGET.min(44)。屬輔助選擇器，主 CTA 需外加 hit slop。
// ─────────────────────────────────────────────────────────────

const CHIP_TOKENS = {
  PADDING_VERTICAL:       SPACING.sm,               // 8
  PADDING_HORIZONTAL:     SPACING.md,               // 12
  RADIUS:                 RADIUS.xl,                // 16（pill）
  GAP_HORIZONTAL:         SPACING.sm,               // 8（chip 之間）
  GAP_VERTICAL:           SPACING.sm,               // 8（chip 換行間距）
  TEXT_SIZE:              TYPOGRAPHY.size.sm,       // 14
  TEXT_WEIGHT_SELECTED:   TYPOGRAPHY.weight.medium,
  BORDER_WIDTH:           1,                        // (literal: StyleSheet.hairlineWidth；canvas 為 React Web 無法 resolve)
};

Object.assign(window, { CHIP_TOKENS });
