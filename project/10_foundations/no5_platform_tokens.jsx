// ─────────────────────────────────────────────────────────────
// Platform tokens · 平台特定固定值
//
// iOS 原生元件的色彩政策與 SF Symbol 對應；不參與 theme 切換。
// ─────────────────────────────────────────────────────────────

// IOS_SYSTEM_COLOR — RN 原生 Switch 等 iOS 元件的視覺一致性需求收斂在此命名空間。
// 屬平台元件原色，非主題色、不參與 theme 切換。
const IOS_SYSTEM_COLOR = {
  switchThumbOn:  '#FFFFFF',
  switchThumbOff: '#F4F3F4',
  switchTrackBg:  '#3E3E3E',
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
