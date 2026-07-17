// ─────────────────────────────────────────────────────────────
// PAYWALL_SCREEN_TOKENS · PaywallScreen 內部 composition 參數
//
// Modal info screen（headerLeft close button、無 save）。
// 結構：Hero 漸層卡 / 2 欄 benefit 功能卡 / 月費·年費 segmented + 大字價格 /
//       CTA「立即升級」/ 自動續訂揭露 fine-print / restore link / legal links。
// impl src/screens/Paywall/PaywallScreen.tsx 結構鏡射。
// ─────────────────────────────────────────────────────────────

const PAYWALL_SCREEN_TOKENS = {
  // 螢幕容器
  SCREEN_GAP:             SPACING.xl,         // 區塊間距 24
  SCREEN_PADDING_X:       SPACING.lg,         // 左右 16
  SCREEN_PADDING_TOP:     SPACING['3xl'],     // 頂 40（header 下呼吸）
  SCREEN_PADDING_BOTTOM:  SPACING.xl,         // 底 24

  // Hero 漸層卡——頁面唯一彈性區：吸收剩餘高度，讓 benefit 與 plan 卡保持自然高不被壓縮
  HERO_MIN_HEIGHT:        96,                 // (literal: hero 縮到底的保底高，標題不被裁)
  HERO_RADIUS:            26,                 // (literal: hero 大圓角，超出 RADIUS 階梯最大 20)
  HERO_PADDING_Y:         SPACING.lg,         // 16 上下（標題靠置中不靠 padding 撐；48 會在保底高時裁掉標題）
  HERO_PADDING_X:         SPACING.xl,         // 24 左右
  HERO_TITLE_SIZE:        TYPE_STYLES.largeTitle.size,  // 34 行銷大標

  // Benefit grid（2 欄功能卡）
  GRID_GAP:               SPACING.md,         // 卡間距 12
  CARD_RADIUS:            RADIUS.xl,           // 16
  CARD_PADDING:           SPACING.xl,         // 24
  CHIP_SIZE:              56,                 // (literal: icon chip 56x56)
  CHIP_RADIUS:            RADIUS.lg,           // 12
  CHIP_ICON_SIZE:         ICON_SIZE.lg,        // 32
  CHIP_BOTTOM_MARGIN:     SPACING.lg,         // chip 與標題間距 16
  CARD_TITLE_SIZE:        TYPOGRAPHY.size.base, // 16
  CARD_SUB_SIZE:          TYPOGRAPHY.size.xs,  // 12
  CARD_SUB_TOP_MARGIN:    SPACING.xs,          // 4

  // Plan card（segmented + 價格）
  PLAN_RADIUS:            RADIUS['2xl'],       // 20
  PLAN_PADDING:           SPACING.xl,          // 24
  SEG_RADIUS:             RADIUS.lg,           // 12
  SEG_INNER_RADIUS:       RADIUS.md,           // 8
  SEG_PADDING:            SPACING.md,          // 12
  SEG_FONT_SIZE:          TYPOGRAPHY.size.sm,  // 14
  SEG_BOTTOM_MARGIN:      SPACING.xl,          // segmented 與價格間距 24
  PRICE_SIZE:             40,                 // (literal: 價格行銷強調，超出 HIG body 階梯)
  PRICE_SUFFIX_SIZE:      TYPOGRAPHY.size.lg,  // 18
  PRICE_HINT_SIZE:        TYPOGRAPHY.size.sm,  // 14
  PRICE_HINT_TOP_MARGIN:  SPACING.md,          // 12

  // Footer / CTA
  CTA_HEIGHT:             58,                 // (literal: CTA 固定高 58)
  CTA_RADIUS:             RADIUS.xl,           // 16
  CTA_FONT_SIZE:          TYPOGRAPHY.size.base, // 16
  FOOTER_GAP:             SPACING.lg,          // CTA 與 link 間距 16
  DISCLOSURE_SIZE:        TYPOGRAPHY.size.xs,  // 12 自動續訂揭露 fine-print
  DISCLOSURE_LINE_HEIGHT: 1.5,                 // 揭露多行行高
  DISCLOSURE_LINE_GAP:    SPACING.xs,          // 4 動態句與靜態句兩段間距
  RESTORE_SIZE:           TYPOGRAPHY.size.sm,  // 14
  LEGAL_SIZE:             TYPOGRAPHY.size.xs,  // 12
  LEGAL_TOP_MARGIN:       SPACING.md,          // 12
};

Object.assign(window, { PAYWALL_SCREEN_TOKENS });
