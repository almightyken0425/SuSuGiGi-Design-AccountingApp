// ─────────────────────────────────────────────────────────────
// LIST_EMPTY_TRANSITION · 列表空狀態切換動畫
//
// 本 token 性質為「list 元件 transition spec」——獨立於 LIST_TOKENS 但仍屬
// list 元件實作參數範疇，故收於 component_tokens 而非 atomic layout。
// 引用 MOTION，內部不再寫死毫秒數。
// ─────────────────────────────────────────────────────────────

const LIST_EMPTY_TRANSITION = {
  DURATION_MS: MOTION.duration.fast + 20,  // 220ms（在 fast 與 base 之間，給 crossfade 用）
  EASING:      MOTION.easing.standard,
};

Object.assign(window, { LIST_EMPTY_TRANSITION });
