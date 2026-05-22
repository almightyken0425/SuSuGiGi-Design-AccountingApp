// ─────────────────────────────────────────────────────────────
// SettingsScreen · 對齊 impl src/screens/Settings/SettingsScreen.tsx
//                  與 spec no4_product_specs/.../no2_screens/no8_settings_screen.md
//
// Push screen，三組 list section：
//   group 1：類別 / 帳戶 / 資料管理
//   group 2：偏好設定
//   group 3：升級至付費版（僅未訂閱時顯示）
//
// 不含 impl 端的 Debug Tools section（dev 工具，spec 未定義為產品行為）。
//
// Variants：
//   default     — 未訂閱，顯示三組
//   subscribed  — 已訂閱，隱藏第三組「升級至付費版」
// ─────────────────────────────────────────────────────────────

function SettingsScreen({ variant = 'default' }) {
  const T = SETTINGS_SCREEN_TOKENS;
  const subscribed = variant === 'subscribed';
  return (
    <div style={{
      padding: T.SCREEN_PADDING,
      background: TOKENS.bg,
      minHeight: '100%',
    }}>
      <ListSection>
        <ListGroupCard>
          <SettingsListRow iconName="tag-outline"           title="類別管理" onPress={() => {}}/>
          <SettingsListRow iconName="bank-outline"          title="帳戶管理" onPress={() => {}}/>
          <SettingsListRow iconName="database-cog-outline"  title="資料管理" onPress={() => {}}/>
        </ListGroupCard>
      </ListSection>

      <ListSection>
        <ListGroupCard>
          <SettingsListRow iconName="cog-outline" title="偏好設定" onPress={() => {}}/>
        </ListGroupCard>
      </ListSection>

      {!subscribed && (
        <ListSection>
          <ListGroupCard>
            <SettingsListRow iconName="star-outline" title="升級至付費版" accent onPress={() => {}}/>
          </ListGroupCard>
        </ListSection>
      )}
    </div>
  );
}

Object.assign(window, { SettingsScreen });
