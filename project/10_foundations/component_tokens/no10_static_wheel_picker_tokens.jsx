// ─────────────────────────────────────────────────────────────
// STATIC_WHEEL_PICKER_TOKENS · design canvas 專用視覺 stub
//
// 對齊 impl src/components/WheelPickerModal.tsx 的 native Picker 視覺，
// design canvas 無法渲染 RN Picker，以中央 label + 上下淡色占位行模擬 wheel 視覺。
// ─────────────────────────────────────────────────────────────

// 對齊 impl AccountSelector / CategorySelector 的 mode='static'：
//   - staticPickerContainer: height 110, radius FORM_PICKER_TOKENS.PICKER_PANEL_RADIUS, border 1 theme.border.base
//   - 內部 native iOS Picker：所有 wheel item fontSize TYPOGRAPHY.size.lg、color theme.text.primary
//   - 上下行為 wheel 鄰近選項（不是固定 subLabel 補充資訊），iOS Picker 自動 visual dim
// 故 design 模擬：所有行 fontSize 同 LABEL_SIZE，color 同 TOKENS.ink；中間 highlighted (medium weight)，上下 DIM_OPACITY。
const STATIC_WHEEL_PICKER_TOKENS = {
  HEIGHT:                    110,                                              // (literal: 對齊 impl staticPickerContainer style.height)
  PADDING:                   SPACING.sm,
  RADIUS:                    RADIUS.md,
  BORDER_WIDTH:              1,                                                // (literal: StyleSheet.hairlineWidth canvas 為 React Web 無法 resolve)
  LABEL_SIZE:                TYPOGRAPHY.size.lg,
  LABEL_WEIGHT:              TYPOGRAPHY.weight.medium,
  LABEL_VERTICAL_MARGIN:     SPACING.xs,
  DIM_OPACITY:               0.4,                                              // (literal: 模擬 iOS Picker wheel 上下鄰近選項自動視覺淡化，對齊 impl native picker dim 程度)
};

Object.assign(window, { STATIC_WHEEL_PICKER_TOKENS });
