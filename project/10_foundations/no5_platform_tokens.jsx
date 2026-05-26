// ─────────────────────────────────────────────────────────────
// Platform tokens · 平台特定固定值
//
// iOS 原生元件的色彩政策與 SF Symbol 對應；不參與 theme 切換。
// ─────────────────────────────────────────────────────────────

// IOS_SYSTEM_COLOR — iOS 平台元件原色（非主題色、不參與 theme 切換）。
//
// Switch 政策修訂（2026-05-26 採用 Footer Zone V1）：
//   - thumbColor 不再寫死值。Impl 端 <Switch> 不傳 thumbColor，讓 iOS UISwitch 跑
//     系統原生外觀（含 iOS 26 Liquid Glass 材質）。原 switchThumbOn / switchThumbOff
//     兩個常數移除。
//   - ios_backgroundColor 由 caller 從 theme.bg.surface_hover 動態取值，不再固定深灰
//     `#3E3E3E`。原本固定值在淺色模式下會導致 off 狀態 track 顯示深灰，與系統 toggle
//     的淺灰背景不一致。switchTrackBg 常數移除。
//
// 本檔目前不再持有 Switch 相關 token。SF Symbol 對應仍保留在下方 ACTION_ICON_MAP。
const IOS_SYSTEM_COLOR = {
  // (intentionally empty — see Switch 政策修訂註解)
};

// ─────────────────────────────────────────────────────────────
// ACTION_ICON_MAP — header 動作 → SF Symbol 對應
// （與 ICON_LIBRARY 並列；ICON_LIBRARY 是 phosphor svg 集合，
//  header action 使用系統 SF Symbol 達成 iOS 原生外觀）
// ─────────────────────────────────────────────────────────────
// add 動作不放此表。實作端 add 透過 FloatingActionBar (FontAwesome plus)
// 與列項 leftIcon (MCI plus) 呈現，非 header SF Symbol；本表角色限於 header 動作對應。
const ACTION_ICON_MAP = {
  back:    { source: 'native', symbol: null,                           note: '原生 chevron，不自訂' },
  close:   { source: 'sf',     symbol: 'xmark',                        note: 'Modal 關閉動作' },
  done:    { source: 'sf',     symbol: 'checkmark',                    note: 'Modal 完成動作' },
  merge:   { source: 'sf',     symbol: 'arrow.triangle.merge',         note: '合併動作' },
  settings:{ source: 'sf',     symbol: 'gearshape',                    note: '設定入口' },
  search:  { source: 'sf',     symbol: 'magnifyingglass',              note: '搜尋入口' },
  filter:  { source: 'sf',     symbol: 'line.3.horizontal.decrease',   note: '篩選入口' },
};

Object.assign(window, { IOS_SYSTEM_COLOR, ACTION_ICON_MAP });
