// ─────────────────────────────────────────────────────────────
// LanguageSettingScreen sub-sections · 20 個語系清單與 row 元件
//
// 20 個語系項目以原生名稱呈現，不附中文譯名。
// impl 行為：選中項排序到頂（useMemo sort），其餘照 nativeName localeCompare 字母序。
// fallback chain 統一回 en，不做語族內 fallback；該行為由 impl src/locales/i18n.ts 承載。
// ─────────────────────────────────────────────────────────────

const LANGUAGE_OPTIONS = [
  { value: 'en',      nativeName: 'English' },
  { value: 'zh-Hant', nativeName: '繁體中文' },
  { value: 'zh-Hans', nativeName: '简体中文' },
  { value: 'ja',      nativeName: '日本語' },
  { value: 'ko',      nativeName: '한국어' },
  { value: 'de',      nativeName: 'Deutsch' },
  { value: 'es',      nativeName: 'Español' },
  { value: 'fr',      nativeName: 'Français' },
  { value: 'pt-BR',   nativeName: 'Português' },
  { value: 'it',      nativeName: 'Italiano' },
  { value: 'nl',      nativeName: 'Nederlands' },
  { value: 'sv',      nativeName: 'Svenska' },
  { value: 'da',      nativeName: 'Dansk' },
  { value: 'no',      nativeName: 'Norsk' },
  { value: 'fi',      nativeName: 'Suomi' },
  { value: 'pl',      nativeName: 'Polski' },
  { value: 'id',      nativeName: 'Bahasa Indonesia' },
  { value: 'vi',      nativeName: 'Tiếng Việt' },
  { value: 'th',      nativeName: 'ไทย' },
  { value: 'hi',      nativeName: 'हिन्दी' },
];

// ─── LanguageRow ─── 含 selected 狀態的語系 row
function LanguageRow({ option, selected, onPress }) {
  return (
    <SelectionListItem
      title={option.nativeName}
      selected={selected}
      onPress={onPress}/>
  );
}

Object.assign(window, { LANGUAGE_OPTIONS, LanguageRow });
