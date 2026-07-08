// ─────────────────────────────────────────────────────────────
// WeekStartSettingScreen sub-sections · option 清單常數
//
// impl 端選項由 calendarGrid 的 WEEK_START_PREFERENCE_VALUES 值域常數推導（guard test 鎖順序）、
// label 走 i18n；design canvas 以本 subsections 常數鏡射同一份值域。
// value 對齊 Settings.weekStart 值域（auto / sunday / monday）。
// ─────────────────────────────────────────────────────────────

const WEEK_START_OPTIONS = [
  { value: 'auto',   label: '跟隨語系' },
  { value: 'sunday', label: '週日' },
  { value: 'monday', label: '週一' },
];

Object.assign(window, { WEEK_START_OPTIONS });
