// ─────────────────────────────────────────────────────────────
// LOGIN_SCREEN_TOKENS · LoginScreen 內部 composition 參數
//
// Full-screen entry。三段：branding（flex 2）/ login button area（flex 1）/
// footer（條款說明句 + 法律連結 + 版權）。
// impl src/screens/Auth/LoginScreen.tsx 結構鏡射。
// ─────────────────────────────────────────────────────────────

const LOGIN_SCREEN_TOKENS = {
  BRANDING_PADDING_TOP:      SPACING['4xl'],
  APP_NAME_FONT_SIZE:        48,                   // (literal: impl 48px brand size，無 atomic 對應，大字級故 literal)
  APP_NAME_WEIGHT:           TYPOGRAPHY.weight.medium,
  LOGIN_CONTAINER_PADDING_H: SPACING['2xl'],
  BUTTON_PADDING_V:          SPACING.lg,
  BUTTON_PADDING_H:          SPACING.xl,
  BUTTON_RADIUS:             RADIUS.md,
  BUTTON_MAX_WIDTH:          320,                  // (literal: impl maxWidth: 320，限制寬登入按鈕)
  BUTTON_FONT_SIZE:          TYPOGRAPHY.size.lg,
  BUTTON_ICON_SIZE:          24,                   // (literal: impl Google icon container 24x24)
  BUTTON_ICON_RADIUS:        RADIUS.lg,
  BUTTON_ICON_TEXT_SIZE:     16,                   // (literal: impl Google 'G' fontSize 16)
  DISCLAIMER_FONT_SIZE:      TYPOGRAPHY.size.sm,   // footer 條款說明句
  LEGAL_SIZE:                TYPOGRAPHY.size.xs,   // footer 法律連結（對齊 paywall LEGAL_SIZE）
  FOOTER_GAP:                SPACING.md,           // footer 三段（說明句 / 連結 / 版權）間距
  FOOTER_PADDING_BOTTOM:     SPACING['2xl'],
  FOOTER_FONT_SIZE:          TYPOGRAPHY.size.xs,
};

Object.assign(window, { LOGIN_SCREEN_TOKENS });
