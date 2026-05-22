// ─────────────────────────────────────────────────────────────
// LanguageSettingScreen · 對齊 impl src/screens/Settings/LanguageSettingScreen.tsx
//
// Modal screen（header 含 close + checkmark）。
// 單一 ListGroupCard 含 2 個 SelectionListItem。selected 項排序到頂。
//
// Variants：
//   default — 已選「繁體中文」（zh-Hant 排頂）
// ─────────────────────────────────────────────────────────────

function LanguageSettingScreen({ selectedValue = 'zh-Hant' }) {
  const T = LANGUAGE_SETTING_SCREEN_TOKENS;
  // impl 端 selected 排頂；design 端用 useMemo sort 模擬
  const sorted = React.useMemo(() => {
    return [...LANGUAGE_OPTIONS].sort((a, b) => {
      if (a.value === selectedValue) return -1;
      if (b.value === selectedValue) return 1;
      return 0;
    });
  }, [selectedValue]);

  return (
    <div style={{
      paddingTop: T.SCREEN_PADDING_TOP,
      paddingLeft: T.SCREEN_PADDING_HORIZONTAL,
      paddingRight: T.SCREEN_PADDING_HORIZONTAL,
      paddingBottom: T.SCREEN_PADDING_BOTTOM,
      background: TOKENS.bg, minHeight: '100%',
    }}>
      <ListGroupCard>
        {sorted.map(opt => (
          <SelectionListItem
            key={opt.value}
            title={opt.label}
            selected={opt.value === selectedValue}/>
        ))}
      </ListGroupCard>
    </div>
  );
}

Object.assign(window, { LanguageSettingScreen });
