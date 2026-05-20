// ─────────────────────────────────────────────────────────────
// SWITCH_TOKENS · RN 原生 Switch 的兩態色彩政策
//
// Design 不自繪 Switch，impl 直接用 React Native Switch；本 token 將「定期/品牌
// 相關 toggle 用品牌色、一般 toggle 用 success 綠」這條原本隱性的設計政策正式化。
// TRACK_COLOR_ON 拆 default / brand 兩變體：
//   - default：一般狀態 toggle，使用 status.success（與 iOS 預設綠相近）
//   - brand：定期交易、品牌相關功能 toggle，使用 primary.main
// 配色採用 TOKENS（theme1 snapshot），impl 端 makeSwitchTrackColor(theme, variant)
// 會回傳對應的 theme 動態色。
// ─────────────────────────────────────────────────────────────

const SWITCH_TOKENS = {
  TRACK_COLOR_OFF: TOKENS.surface2,
  TRACK_COLOR_ON: {
    default: TOKENS.success,
    brand:   TOKENS.p500,
  },
  THUMB_COLOR_ON:  IOS_SYSTEM_COLOR.switchThumbOn,
  THUMB_COLOR_OFF: IOS_SYSTEM_COLOR.switchThumbOff,
  IOS_BG_COLOR:    IOS_SYSTEM_COLOR.switchTrackBg,
};

Object.assign(window, { SWITCH_TOKENS });
