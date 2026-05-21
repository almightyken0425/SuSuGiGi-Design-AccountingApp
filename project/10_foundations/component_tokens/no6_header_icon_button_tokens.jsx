// ─────────────────────────────────────────────────────────────
// HEADER_ICON_BUTTON_TOKENS · Navigation header 上 icon-only 動作鍵
//
// 對齊 iOS 26 Liquid Glass bar button item 自動 pill 行為：customView intrinsic
// size 為正方形 → 自動套圓 pill；多 icon 共用 customView → 自動套膠囊 pill。
// 為達成「單 icon 正圓 / 多 icon 內 icon 均勻置中」，customView 必須是固定正方形容器。
//
// 三個 button 元件統一靠本 token 拿到 41×41 customView：
//   - HeaderIconButton（多用途，dashboard / list 右側 action）
//   - HeaderCheckmarkButton（送出 / 確認，Form modal headerRight）
//   - ModalCloseButton（關閉，Modal headerLeft）
// 系統返回鍵亦透過 AppNavigator screenOptions 統一覆寫為 HeaderIconButton + chevron.left。
// ─────────────────────────────────────────────────────────────

const HEADER_ICON_BUTTON_TOKENS = {
  CONTENT_BOX:        TYPE_STYLES.body.size + SPACING.md * 2,              // 41，customView 正方形邊長（17pt symbol + 12 padding × 2）；Liquid Glass hug 後 → 正圓 41 直徑
  SYMBOL_SIZE:        TYPE_STYLES.body.size,                               // 17，SF Symbol point size，對齊 Apple bar button 慣用 body 級
  MULTI_ICON_GAP:     SPACING.sm,                                          // 8，多 icon pill 內間距，與 SEARCH_BAR_TOKENS.ICON_GAP 對齊
  HIT_TARGET_EXPAND:  (HIT_TARGET.min - (TYPE_STYLES.body.size + SPACING.md * 2)) / 2, // 1.5，hitSlop 各方向外擴：視覺 41×41、可點 44×44 達 HIG。對齊 Apple UIBarButtonItem「視覺小、hit 大」慣例
  PRESS_ANIMATION: {
    scale:    0.97,                       // (literal: 視覺校準值，對齊 BRAND.md universal button rule 與 iOS 系統 bar button tap 反饋；非 atomic 階梯項目)
    duration: MOTION.duration.instant,    // 100，按壓回饋短促；阻尼結束視覺與 haptic 同步
    easing:   MOTION.easing.standard,
  },
  COLOR_BY_INTENT: {                      // icon 顏色語意分派；impl 端對應 theme.primary.main（三 intent 統一主題色）
    commit:  TOKENS.p500,                 // 送出 / 確認（checkmark）
    action:  TOKENS.p500,                 // 主動觸發功能（search / settings / filter / merge / 返回）
    dismiss: TOKENS.p500,                 // 關閉當前畫面（xmark）。本波決議統一主題色；保留 map 結構以便未來分化（如 destructive 改紅）
    // 任一 intent 在 disabled 狀態下覆寫為 TOKENS.ink3（impl 對應 theme.state.disabled.fg）
  },
  HAPTIC_BY_INTENT: {                     // expo-haptics ImpactFeedbackStyle 常數名稱；intent 對應 COLOR_BY_INTENT
    commit:  'impactMedium',              // 送出 / 確認動作有後果，反饋稍強
    action:  'impactLight',               // 主動觸發但無破壞性後果，反饋輕觸
    dismiss: 'impactLight',               // 離開動作無後果，反饋輕觸
  },
  GLASS_CONTEXT: {                        // 政策聲明：何時靠系統、何時自己包
    native: 'rely-on-uikit',              // 在 React Navigation native header 內，UIKit 自動套 Liquid Glass pill（不可覆寫）
    sheet:  'wrap-glassview',             // 在 sheet 自繪 header 內（如 pageSheet 內部 currency 選擇器），button 自帶 <GlassView pill>
  },
};

Object.assign(window, { HEADER_ICON_BUTTON_TOKENS });
