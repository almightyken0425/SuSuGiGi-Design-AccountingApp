// ─────────────────────────────────────────────────────────────
// CurrencyDetailConfigScreen sub-sections · section 標題與 helper
//
// impl 端用手刻 styled Text 渲染 section title（與 ListSectionTitle 樣式相似但
// 並未走 ListSection），design canvas 沿用相同 inline title pattern。
// ─────────────────────────────────────────────────────────────

// ─── ConfigSectionTitle ─── section 上方小標題（與 ListSectionTitle 樣式相似但不走 uppercase）
function ConfigSectionTitle({ children }) {
  const T = CURRENCY_DETAIL_CONFIG_SCREEN_TOKENS;
  return (
    <div style={{
      fontSize: T.SECTION_TITLE_FONT_SIZE,
      color: TOKENS.ink2,
      fontWeight: TYPOGRAPHY.weight.medium,
      marginBottom: T.SECTION_TITLE_BOTTOM_MARGIN,
    }}>
      {children}
    </div>
  );
}

Object.assign(window, { ConfigSectionTitle });
