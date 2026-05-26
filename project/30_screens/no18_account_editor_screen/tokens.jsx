// ─────────────────────────────────────────────────────────────
// ACCOUNT_EDITOR_SCREEN_TOKENS · AccountEditorScreen 內部 composition 參數
//
// Modal save form。Form Structure V2 採用後：
//   - 名稱：大字置中 name field
//   - 幣別：searchable dropdown（編輯模式 disabled）
//   - 類型：button group（5 選項常駐展開）
//   - 圖示：inline 4col grid 常駐
//   - Footer：Switch row + surface 底紅字 delete（Footer Zone V1）
//
// impl src/screens/Accounts/AccountEditorScreen.tsx 結構鏡射。
// ─────────────────────────────────────────────────────────────

const ACCOUNT_EDITOR_SCREEN_TOKENS = {
  SCREEN_PADDING:      SPACING.lg,
  FIELD_GAP:           SPACING.xl,               // form group 之間
  LABEL_FONT_SIZE:     TYPOGRAPHY.size.sm,
  LABEL_BOTTOM_MARGIN: SPACING.sm,
  INPUT_PADDING:       SPACING.md,
  INPUT_RADIUS:        RADIUS.md,
  INPUT_FONT_SIZE:     TYPOGRAPHY.size.base,
  PICKER_PADDING:      SPACING.md,
  PICKER_RADIUS:       RADIUS.md,
  SWITCH_ROW_PADDING:  SPACING.lg,
  DELETE_PADDING:      SPACING.lg,
};

Object.assign(window, { ACCOUNT_EDITOR_SCREEN_TOKENS });
