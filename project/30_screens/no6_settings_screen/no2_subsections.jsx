// ─────────────────────────────────────────────────────────────
// SettingsListRow · SettingsScreen 私有 sub-section
//
// 薄包 ListItem，吸掉「Glyph 由 SETTINGS_SCREEN_TOKENS 上色」的樣板。
// accent=true 時 icon 與 title 採紫色（升級組），其餘採 ink 主色。
// iconName 直接接 MCI 名稱（tag-outline / bank-outline / ...），
// 由 Glyph 的 GLYPH_ALIASES 轉成 design canvas 對應的 outline glyph。
// ─────────────────────────────────────────────────────────────

function SettingsListRow({ iconName, title, accent = false, onPress }) {
  const T = SETTINGS_SCREEN_TOKENS;
  const iconColor  = accent ? T.ROW_ICON_COLOR_ACCENT  : T.ROW_ICON_COLOR_DEFAULT;
  const titleColor = accent ? T.ROW_TITLE_COLOR_ACCENT : undefined;
  return (
    <ListItem
      leftIcon={<Glyph name={iconName} size={T.ROW_ICON_SIZE} color={iconColor}/>}
      title={title}
      titleColor={titleColor}
      showChevron
      onPress={onPress}/>
  );
}

// ─────────────────────────────────────────────────────────────
// SettingsVersionFooter · 版本資訊 footer
//
// spec no8_settings_screen.md §版本資訊：「列表底部置中顯示目前 App 版本號」。
// 字色 TOKENS.ink3（disabled fg）、字級 TYPOGRAPHY.size.xs（12pt / caption1 層）、
// 上下留白 SPACING['2xl']。置中對齊。
// versionLabel 由 caller 傳入，讓 canvas 維持 hardcode 展示字串，
// 不在 design canvas 引入動態版本來源。
// ─────────────────────────────────────────────────────────────

function SettingsVersionFooter({ versionLabel = 'Version 0.1.0-alpha' }) {
  const T = SETTINGS_SCREEN_TOKENS;
  return (
    <div style={{
      marginTop:    T.VERSION_MARGIN_VERTICAL,
      marginBottom: T.VERSION_MARGIN_VERTICAL,
      textAlign:    'center',
      color:        T.VERSION_TEXT_COLOR,
      fontSize:     T.VERSION_TEXT_SIZE,
    }}>
      {versionLabel}
    </div>
  );
}

Object.assign(window, { SettingsListRow, SettingsVersionFooter });
