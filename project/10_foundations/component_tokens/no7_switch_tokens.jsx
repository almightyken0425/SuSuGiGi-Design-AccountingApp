// ─────────────────────────────────────────────────────────────
// SWITCH_TOKENS · RN 原生 Switch 的兩態色彩政策
//
// Design 不自繪 Switch，impl 直接用 React Native Switch。
//
// 政策修訂（2026-05-26 採用 Footer Zone V1）：
//   - thumbColor 從本表移除。Impl 端 <Switch> 不傳 thumbColor，讓 iOS UISwitch 跑
//     系統原生外觀（含 iOS 26 Liquid Glass 材質）。
//   - IOS_BG_COLOR 從本表移除。Impl 端 ios_backgroundColor 改從 theme.bg.surface_hover
//     動態取值，不再固定深灰（淺色模式下會與系統 toggle 的淺灰背景不一致）。
//   - TRACK_COLOR_ON 仍維持 default / brand 兩變體：
//       - default：一般 toggle，使用 status.success（與 iOS 預設綠相近）
//       - brand：定期/品牌相關 toggle，使用 primary.main
//   - 配色採用 TOKENS（theme1 snapshot），impl 端 makeSwitchTrackColor(theme, variant)
//     回傳 theme 動態色。
// ─────────────────────────────────────────────────────────────

const SWITCH_TOKENS = {
  TRACK_COLOR_OFF: TOKENS.surface2,
  TRACK_COLOR_ON: {
    default: TOKENS.success,
    brand:   TOKENS.p500,
  },
};

Object.assign(window, { SWITCH_TOKENS });
