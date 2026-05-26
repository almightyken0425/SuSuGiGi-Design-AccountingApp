// ─────────────────────────────────────────────────────────────
// DataManagementScreen · 對齊 impl src/screens/Settings/DataManagementScreen.tsx
//
// Push screen。3 個 ListSection：
//   1. 匯入交易 / 轉帳 / 定期
//   2. 匯出交易 / 轉帳 / 定期
//   3. 重設資料庫（destructive）
//
// Variants：default only。
// ─────────────────────────────────────────────────────────────

function DataManagementScreen() {
  const T = DATA_MANAGEMENT_SCREEN_TOKENS;
  const renderIcon = (name, color) => (
    <Glyph name={name} size={LIST_TOKENS.ICON_SIZE_SMALL} color={color ?? TOKENS.ink} stroke={2}/>
  );

  return (
    <div style={{
      padding: T.SCREEN_PADDING,
      background: TOKENS.bg, minHeight: '100%',
    }}>
      <ListSection>
        <ListGroupCard>
          {DM_IMPORT_ROWS.map(r => (
            <ListItem key={r.id} leftIcon={renderIcon(r.icon)} title={r.title} showChevron/>
          ))}
        </ListGroupCard>
      </ListSection>

      <ListSection>
        <ListGroupCard>
          {DM_EXPORT_ROWS.map(r => (
            <ListItem key={r.id} leftIcon={renderIcon(r.icon)} title={r.title}/>
          ))}
        </ListGroupCard>
      </ListSection>

      <ListSection>
        <ListGroupCard>
          <ListItem
            leftIcon={renderIcon('refresh', TOKENS.error)}
            title="重設資料庫"
            titleColor={TOKENS.error}
            showChevron/>
        </ListGroupCard>
      </ListSection>
    </div>
  );
}

Object.assign(window, { DataManagementScreen });
