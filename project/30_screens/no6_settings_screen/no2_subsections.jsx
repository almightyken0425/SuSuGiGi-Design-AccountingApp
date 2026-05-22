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

Object.assign(window, { SettingsListRow });
