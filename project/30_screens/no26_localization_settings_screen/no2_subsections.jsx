// ─────────────────────────────────────────────────────────────
// LocalizationSettingsScreen sub-sections · preview 用的預設值
//
// impl 端 value 來自 usePreference context，design canvas 寫死視覺示意值。
// ─────────────────────────────────────────────────────────────

const LOCALIZATION_SETTINGS_PREVIEW_VALUES = {
  baseCurrency: 'TWD',
  timeZone:     'Taipei',
  language:     '繁體中文',
};

Object.assign(window, { LOCALIZATION_SETTINGS_PREVIEW_VALUES });
