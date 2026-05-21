// ─────────────────────────────────────────────────────────────
// Screen Layout · design canvas 專用 screen-level layout helper
//
// 跨 screen 共用、僅 design canvas 用（無 impl 對應）的 layout primitive。
// impl 有對應元件者請改加入 20_components/components.jsx；單 screen 用者請 inline。
// ─────────────────────────────────────────────────────────────

// ─── Spinner ─── design canvas 對應 impl ActivityIndicator
// impl 用 RN ActivityIndicator；design canvas 用 SVG circle + 旋轉 keyframe。
// 注入一次性 keyframe（id 防重複，避免多檔載入重複注入）。
if (typeof document !== 'undefined' && !document.getElementById('screens-spinner-style')) {
  const s = document.createElement('style');
  s.id = 'screens-spinner-style';
  s.textContent = '@keyframes screens-spinner-rotate { to { transform: rotate(360deg); } }';
  document.head.appendChild(s);
}
function Spinner({ size = ICON_SIZE.md, color }) {
  const c = color || TOKENS.p500;
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" style={{ animation: 'screens-spinner-rotate 0.9s linear infinite' }}>
      <circle cx="12" cy="12" r="10" stroke={c} strokeOpacity="0.2" strokeWidth="3" fill="none"/>
      <path d="M12 2 a10 10 0 0 1 10 10" stroke={c} strokeWidth="3" strokeLinecap="round" fill="none"/>
    </svg>
  );
}

// ─── ScreenScroll ─── design canvas screen 滾動容器
// 對齊 impl 端 ScrollView/FlatList + contentInsetAdjustmentBehavior="automatic" 規範
// （impl UI Coding Guideline 禁止 paddingTop 撐高 header；design canvas 內 header 由
// ScreenFrame 注入，故此處只負責滾動 + 背景）。
// 若 screen 末端與 BottomSearchBar 共處，caller 自加 paddingBottom = BOTTOM_SEARCH_BAR_TOTAL_HEIGHT + 補位。
function ScreenScroll({ children, style = {} }) {
  return (
    <div style={{
      position: 'relative',
      width: '100%', minHeight: '100%',
      background: TOKENS.bg,
      ...style,
    }}>
      {children}
    </div>
  );
}

Object.assign(window, { Spinner, ScreenScroll });
