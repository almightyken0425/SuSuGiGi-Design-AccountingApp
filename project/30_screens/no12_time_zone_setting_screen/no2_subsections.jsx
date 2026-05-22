// ─────────────────────────────────────────────────────────────
// TimeZoneSettingScreen sub-sections · design canvas mock 時區清單
//
// impl 端用 @vvo/tzdb getTimeZones() (~430 個)，design canvas 為視覺示意僅取 10 個。
// label 格式對齊 impl renderItem：「<主城市> (UTC<offset>)」。
// ─────────────────────────────────────────────────────────────

const TIME_ZONE_MOCK = [
  { name: 'Asia/Taipei',         label: 'Taipei (UTC+08:00)' },
  { name: 'Asia/Tokyo',          label: 'Tokyo (UTC+09:00)' },
  { name: 'Asia/Hong_Kong',      label: 'Hong Kong (UTC+08:00)' },
  { name: 'Asia/Singapore',      label: 'Singapore (UTC+08:00)' },
  { name: 'America/Los_Angeles', label: 'Los Angeles (UTC-07:00)' },
  { name: 'America/New_York',    label: 'New York (UTC-04:00)' },
  { name: 'Europe/London',       label: 'London (UTC+01:00)' },
  { name: 'Europe/Paris',        label: 'Paris (UTC+02:00)' },
  { name: 'Australia/Sydney',    label: 'Sydney (UTC+10:00)' },
  { name: 'Pacific/Auckland',    label: 'Auckland (UTC+12:00)' },
];

Object.assign(window, { TIME_ZONE_MOCK });
