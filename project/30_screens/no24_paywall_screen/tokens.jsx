// ─────────────────────────────────────────────────────────────
// PAYWALL_SCREEN_TOKENS · PaywallScreen 內部 composition 參數
//
// Modal info screen。Title、benefits 點列、yearly / monthly 兩選項、CTA、restore、close。
// impl src/screens/Paywall/PaywallScreen.tsx 結構鏡射。
// ─────────────────────────────────────────────────────────────

const PAYWALL_SCREEN_TOKENS = {
  SCREEN_PADDING:           SPACING.xl,
  TITLE_FONT_SIZE:          TYPOGRAPHY.size['3xl'],
  TITLE_WEIGHT:             TYPOGRAPHY.weight.medium,
  TITLE_BOTTOM_MARGIN:      SPACING['2xl'],
  BENEFIT_FONT_SIZE:        TYPOGRAPHY.size.lg,
  BENEFIT_GAP:              SPACING.lg,
  BENEFITS_BOTTOM_MARGIN:   SPACING.xl,
  BENEFITS_LEFT_INDENT:     SPACING.lg,
  OPTIONS_BOTTOM_MARGIN:    SPACING.xl,
  OPTION_PADDING:           SPACING.lg,
  OPTION_RADIUS:            RADIUS.lg,
  OPTION_GAP:               SPACING.md,
  OPTION_TITLE_FONT_SIZE:   TYPOGRAPHY.size.base,
  OPTION_PRICE_FONT_SIZE:   TYPOGRAPHY.size.sm,
  RADIO_SIZE:               20,                       // (literal: impl radio diameter 20)
  RADIO_BORDER_WIDTH:       2,                        // (literal: radio border 2px)
  CTA_PADDING:              SPACING.lg,
  CTA_RADIUS:               RADIUS['2xl'],
  CTA_WIDTH_PCT:            '90%',
  CTA_FONT_SIZE:            TYPOGRAPHY.size.lg,
  CTA_BOTTOM_MARGIN:        SPACING.lg,
  AUX_BUTTON_PADDING:       SPACING.sm,
};

Object.assign(window, { PAYWALL_SCREEN_TOKENS });
