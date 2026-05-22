// ─────────────────────────────────────────────────────────────
// CurrencyDetailConfigScreen · 對齊 impl src/screens/Settings/CurrencyDetailConfigScreen.tsx
//
// Modal save form。設定特定幣別的「千位省略」與「小數位數」。
// Title 為 currencyCode（SCREEN_META 設定），畫面頂部顯示 currencyName 大字。
//
// 兩個 section：
//   1. 千位省略模式（ListItem + Switch trailing）
//   2. 小數位數（4 個 SelectionListItem [0,1,2,3] + 1 個 ListItem 「重設為預設」primary 色）
//
// Variants：
//   default — 預覽 USD，小數位數 = 2、千位省略 = OFF
// ─────────────────────────────────────────────────────────────

function CurrencyDetailConfigScreen({
  currencyCode = 'USD',
  currencyName = '美元',
  decimals = 2,
  useThousands = false,
  isoDefault = 2,
}) {
  const T = CURRENCY_DETAIL_CONFIG_SCREEN_TOKENS;

  return (
    <div style={{
      padding: T.SCREEN_PADDING,
      background: TOKENS.bg, minHeight: '100%',
    }}>
      <div style={{
        fontSize: T.HEADER_NAME_FONT_SIZE,
        fontWeight: TYPOGRAPHY.weight.medium,
        color: TOKENS.ink,
        marginBottom: T.HEADER_NAME_BOTTOM_MARGIN,
      }}>
        {currencyName}
      </div>

      <div style={{ marginBottom: T.SECTION_GAP }}>
        <ConfigSectionTitle>千位省略模式（K）</ConfigSectionTitle>
        <ListGroupCard>
          <ListItem
            title="省略最後 3 位 0"
            subtitle={useThousands ? '輸入 1 = 1,000；10,000 顯示為 10。' : '標準顯示（1:1）。'}
            trailing={<Switch value={useThousands}/>}/>
        </ListGroupCard>
      </div>

      <div style={{ marginBottom: T.SECTION_GAP }}>
        <ConfigSectionTitle>小數位數</ConfigSectionTitle>
        <ListGroupCard>
          {[0, 1, 2, 3].map(d => (
            <SelectionListItem
              key={d}
              title={String(d)}
              selected={decimals === d}/>
          ))}
          <ListItem
            title={`重設為預設 (${isoDefault})`}
            titleColor={TOKENS.p500}/>
        </ListGroupCard>
      </div>
    </div>
  );
}

Object.assign(window, { CurrencyDetailConfigScreen });
