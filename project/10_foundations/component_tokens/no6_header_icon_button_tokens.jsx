// ─────────────────────────────────────────────────────────────
// HEADER_ICON_BUTTON_TOKENS · Navigation header 上 icon-only 動作鍵
//
// 對齊 iOS 26 Liquid Glass bar button item 自動 pill 行為：customView intrinsic
// size 為正方形 → 自動套圓 pill；多 icon 共用 customView → 自動套膠囊 pill。
// 為達成「單 icon 正圓 / 多 icon 內 icon 均勻置中」，customView 必須是固定正方形容器。
// ─────────────────────────────────────────────────────────────

const HEADER_ICON_BUTTON_TOKENS = {
  CONTENT_BOX:     ICON_SIZE.md,         // 24，customView 正方形邊長；Liquid Glass hug 後 → 正圓 24 直徑
  SYMBOL_SIZE:     TYPE_STYLES.body.size, // 17，SF Symbol point size，對齊 Apple bar button 慣用 body 級
  MULTI_ICON_GAP:  SPACING.sm,           // 8，多 icon pill 內間距，與 SEARCH_BAR_TOKENS.ICON_GAP 對齊
};

Object.assign(window, { HEADER_ICON_BUTTON_TOKENS });
