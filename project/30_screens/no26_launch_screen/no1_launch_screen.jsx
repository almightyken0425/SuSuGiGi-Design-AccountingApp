// ─────────────────────────────────────────────────────────────
// LaunchScreen · 對齊 impl src/components/LaunchSplash + LaunchScreen.storyboard
//
// 啟動轉場。基礎態極簡只有 $wish（對齊 login branding、無 logo）。
// 原生 storyboard 畫靜態 $wish、JS overlay 第一幀複刻接手，等登入
// 狀態回來分岔兩條路。
//
// Variants：
//   base     — splash 基礎態（只 $wish）
//   to-login — 路徑 A：未登入，login 元素 staggered 淡入長出
//   to-home  — 路徑 B：已登入，$wish 淡出上移縮小、home 淡入
// ─────────────────────────────────────────────────────────────

function LaunchScreen({ variant = 'base' }) {
  if (variant === 'to-login') return <LaunchToLoginDemo/>;
  if (variant === 'to-home')  return <LaunchToHomeDemo/>;
  return <LaunchSplashBase/>;
}

Object.assign(window, { LaunchScreen });
