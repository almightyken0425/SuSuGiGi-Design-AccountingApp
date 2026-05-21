// ─────────────────────────────────────────────────────────────
// STATIC_WHEEL_PICKER_TOKENS · design canvas 專用視覺 stub
//
// 對齊 impl src/components/WheelPickerModal.tsx 的 native Picker 視覺，
// design canvas 無法渲染 RN Picker，以中央 label + 上下淡色占位行模擬 wheel 視覺。
// ─────────────────────────────────────────────────────────────

const STATIC_WHEEL_PICKER_TOKENS = {
  HEIGHT:                    110,                                              // (literal: 模擬 native wheel 行高 × 5 行可見)
  PADDING:                   SPACING.sm,
  RADIUS:                    RADIUS.md,
  BORDER_WIDTH:              1,                                                // (literal: StyleSheet.hairlineWidth canvas 為 React Web 無法 resolve)
  LABEL_SIZE:                TYPOGRAPHY.size.lg,
  LABEL_WEIGHT:              TYPOGRAPHY.weight.medium,
  LABEL_VERTICAL_MARGIN:     SPACING.xs,
  PLACEHOLDER_SIZE:          TYPOGRAPHY.size.sm,
  PLACEHOLDER_OPACITY:       0.6,                                              // (literal: 模擬上下淡化選項)
};

Object.assign(window, { STATIC_WHEEL_PICKER_TOKENS });
