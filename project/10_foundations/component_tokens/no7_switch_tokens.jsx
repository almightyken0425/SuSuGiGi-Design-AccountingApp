// ─────────────────────────────────────────────────────────────
// SWITCH_TOKENS · RN 原生 Switch 的兩態色彩政策
//
// Design 不自繪 Switch，impl 直接用 React Native Switch。
//
// 政策修訂（2026-05-27 統一 active track 走主題色）：
//   - thumbColor 從本表移除。Impl 端 <Switch> 不傳 thumbColor，讓 iOS UISwitch 跑
//     系統原生外觀（含 iOS 26 Liquid Glass 材質）。
//   - IOS_BG_COLOR 從本表移除。Impl 端 ios_backgroundColor 改從 theme.bg.surface_hover
//     動態取值，不再固定深灰（淺色模式下會與系統 toggle 的淺灰背景不一致）。
//   - TRACK_COLOR_ON 統一走主題色 primary.main，不再分 default / brand 變體：
//     歷史上 default 走 status.success（與 iOS 預設綠對齊），但使用點不一致導致
//     視覺零散，2026-05-27 統一收斂到主題色。
//   - 配色採用 TOKENS（theme1 snapshot），impl 端 makeSwitchTrackColor(theme)
//     回傳 theme 動態色（單參數，不再帶 variant）。
// ─────────────────────────────────────────────────────────────

const SWITCH_TOKENS = {
  TRACK_COLOR_OFF: TOKENS.surface2,
  TRACK_COLOR_ON:  TOKENS.p500,
};

Object.assign(window, { SWITCH_TOKENS });
