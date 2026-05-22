// ─────────────────────────────────────────────────────────────
// ACCOUNT_EDITOR_SCREEN_TOKENS · AccountEditorScreen 內部 composition 參數
//
// Modal save form。表單欄位：Name、Currency picker、Type picker、Icon picker。
// Edit mode 多顯示啟用 Switch + 刪除按鈕。
// impl src/screens/Accounts/AccountEditorScreen.tsx 結構鏡射，picker 由手刻 inline
// collapse/expand pattern 構成，design canvas 顯示 collapsed 狀態示意。
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
