// ─────────────────────────────────────────────────────────────
// PreferenceScreen sub-sections · preview 用的預設值
//
// impl 端 value 來自 usePreference context，design canvas 寫死視覺示意值。
// ─────────────────────────────────────────────────────────────

const PREFERENCE_PREVIEW_VALUES = {
  theme:        '經典紫',
  launchMode:   '首頁',
  baseCurrency: 'TWD',
  language:     '繁體中文',
  timeZone:     'Taipei',
};

Object.assign(window, { PREFERENCE_PREVIEW_VALUES });
