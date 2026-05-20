// ─────────────────────────────────────────────────────────────
// FORM_PICKER_TOKENS · form 觸發器（AccountSelector / CategorySelector 等）
//
// 「打開 form 的單一觸發 row」。視覺與 ListItem 不同：icon 32px 圓形 chip、
// 有外框、padding 12（vs ListItem 17）。不與 LIST_TOKENS 共用。
// ─────────────────────────────────────────────────────────────

const FORM_PICKER_TOKENS = {
  ROW_MIN_HEIGHT:         ROW_HEIGHT.base,          // 對齊 ListItem，亦 ≥ HIT_TARGET.min
  ROW_PADDING_VERTICAL:   SPACING.md,               // 12（form input 內距）
  ROW_PADDING_HORIZONTAL: SPACING.lg,               // 16（與 LIST 對齊行末）
  ICON_SIZE:              ICON_SIZE.lg,             // 32（引第 3 層階梯）
  ICON_RADIUS:            RADIUS.xl,                // 16（圓形 chip）
  ICON_GAP_HORIZONTAL:    SPACING.md,               // 12（icon → text）
  VALUE_SIZE:             TYPE_STYLES.body.size,    // 17
  VALUE_WEIGHT:           TYPOGRAPHY.weight.medium,
  SUBTEXT_SIZE:           TYPOGRAPHY.size.sm,       // 14
  SUBTEXT_MARGIN_TOP:     SPACING['2xs'],           // 2
  PICKER_PANEL_RADIUS:    RADIUS.md,                // 8（picker 展開時的圓角）
};

Object.assign(window, { FORM_PICKER_TOKENS });
