// ─────────────────────────────────────────────────────────────
// LocalizationSettingsScreen · 對齊 impl src/screens/Settings/LocalizationSettingsScreen.tsx
//
// Push screen（從 Settings 主入口的 "Currency & Localization" 進入）。
// 1 個 ListGroupCard 含 4 個 ListItem 入口：
//   1. 基礎幣別 (value + chevron) → BaseCurrencySetting
//   2. 幣別設定 (chevron only) → CurrencyList
//   3. 時區 (value + chevron) → TimeZoneSetting
//   4. 語言 (value + chevron) → LanguageSetting
//
// Variants：default only。
// ─────────────────────────────────────────────────────────────

function LocalizationSettingsScreen() {
  const T = LOCALIZATION_SETTINGS_SCREEN_TOKENS;
  const v = LOCALIZATION_SETTINGS_PREVIEW_VALUES;

  return (
    <div style={{
      padding: T.SCREEN_PADDING,
      background: TOKENS.bg, minHeight: '100%',
    }}>
      <ListGroupCard>
        <ListItem title="基礎幣別" value={v.baseCurrency} showChevron/>
        <ListItem title="幣別設定" showChevron/>
        <ListItem title="時區"     value={v.timeZone}     showChevron/>
        <ListItem title="語言"     value={v.language}     showChevron/>
      </ListGroupCard>
    </div>
  );
}

Object.assign(window, { LocalizationSettingsScreen });
