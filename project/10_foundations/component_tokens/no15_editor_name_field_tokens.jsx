// ─────────────────────────────────────────────────────────────
// EDITOR_NAME_FIELD_TOKENS · 編輯器大字置中名稱欄（AccountEditor / CategoryEditor 共用）
//
// design EditorNameField（30_screens/shared/no3_editor_field_helpers.jsx）與
// impl src/components/EditorNameField.tsx 共同消費。無框 surface card。
// ─────────────────────────────────────────────────────────────

const EDITOR_NAME_FIELD_TOKENS = {
  HEIGHT:       80,                          // (literal: 大字置中名稱欄高度，比 ROW_HEIGHT.base 58 高，留大字易讀空間)
  PADDING:      SPACING.md,
  RADIUS:       RADIUS.md,
  FONT_SIZE:    TYPOGRAPHY.size['2xl'],
  FONT_WEIGHT:  TYPOGRAPHY.weight.medium,
};

Object.assign(window, { EDITOR_NAME_FIELD_TOKENS });
