// ─────────────────────────────────────────────────────────────
// LAUNCH_SCREEN_TOKENS · launch screen 基礎態 + 轉場參數
//
// launch 不是靜態海報，是轉場起點。基礎態極簡只有 app 名稱 $wish，
// 刻意對齊 login branding（同位置、同樣式、無 logo）。等登入狀態
// 回來分岔兩條路。
//
// 轉場動畫 token 與 impl src/constants/theme.ts 的 LAUNCH_TRANSITION
// 同源——design 仲裁、impl 跟進。基礎態樣式對齊 no23_login_screen
// 的 appName（fontSize 48 / weight medium / color primary）。
// ─────────────────────────────────────────────────────────────

const LAUNCH_SCREEN_TOKENS = {
  // ─── 基礎態（對齊 login brandingContainer flex 2 區）───
  BG:                     '#F2F2F7',                // = bg.base / login / home，啟動到內頁零跳色
  APP_NAME_FONT_SIZE:     48,                       // = login appName（literal，無 atomic 對應）
  APP_NAME_WEIGHT:        TYPOGRAPHY.weight.medium, // 500
  APP_NAME_BOTTOM_MARGIN: SPACING.md,               // 12
  TAGLINE_FONT_SIZE:      TYPOGRAPHY.size.base,
  BRANDING_PADDING_TOP:   SPACING['4xl'],           // 48，對齊 login brandingContainer

  // ─── 進場（路徑 A：login 元素由下往上錯落淡入）───
  REVEAL_DURATION_MS:     MOTION.duration.base,     // 300
  REVEAL_TRANSLATE_Y:     16,                       // 由下往上位移量
  REVEAL_STAGGER_MS:      70,                       // 元素錯落間隔
  REVEAL_EASING:          MOTION.easing.standard,   // cubic-bezier(0.4,0,0.2,1)

  // ─── 退場（路徑 B：$wish 淡出 + 上移縮小，home 淡入）───
  EXIT_DURATION_MS:       MOTION.duration.base,     // 300
  EXIT_TRANSLATE_Y:       -12,
  EXIT_SCALE:             0.92,
  HOME_FADE_DURATION_MS:  MOTION.duration.fast,     // 200，home 整片淡入（短，讓內部 section stagger 接力）

  // ─── splash 停頓（模擬等 auth 狀態恢復）───
  HOLD_MS:                540,
};

Object.assign(window, { LAUNCH_SCREEN_TOKENS });
