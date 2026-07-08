// ─────────────────────────────────────────────────────────────
// KEYPAD_TOKENS · CalculatorKeypad 四則運算鍵盤
//
// Key Visual 軸定案鍵面留用 V0 玻璃磚；Press Feedback 軸定案 P1 品牌色輕染。
// 鍵面玻璃參數沿用 GLASS；press 色為 canvas 快照值，
// impl 端由 theme 動態接 primary[50] / primary[100]。
// ─────────────────────────────────────────────────────────────

const KEYPAD_TOKENS = {
  // ── 幾何（V0 沿用，數字區 4 row × 3 col，op 欄 5 鍵均分同總高）
  NUM_KEY_HEIGHT:      60,                  // (literal: 數字鍵高；op 鍵均分總高 ≈ 0.8 倍)
  ROW_GAP:             SPACING.sm,
  COL_GAP:             SPACING.xs,
  CONTAINER_PADDING:   SPACING.sm,
  KEY_RADIUS:          RADIUS.md,

  // ── 字面
  KEY_FONT_SIZE:       TYPOGRAPHY.size.xl,
  KEY_FONT_WEIGHT:     TYPOGRAPHY.weight.medium,

  // ── 鍵面染色
  OP_TINT:             `${TOKENS.p100}80`,  // operator 鍵玻璃染色（8-bit hex alpha 50%）

  // ── 按壓回饋（Press Feedback 軸 P1 定案）
  PRESS_TINT_NUMBER:   TOKENS.p50,          // 按下數字鍵磚面染色
  PRESS_TINT_OP:       TOKENS.p100,         // 按下 operator 鍵磚面染色（轉實色）
  PRESS_RELEASE_MS:    160,                 // (literal: 放開回復時長，無對應 MOTION 階梯；按下即時無過渡)
};

Object.assign(window, { KEYPAD_TOKENS });
