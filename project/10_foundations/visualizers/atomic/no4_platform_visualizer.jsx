// ─────────────────────────────────────────────────────────────
// Foundations > Atomic > Platform · 平台特定固定值視覺化
//
// 2 張卡片：IOS_SYSTEM_COLOR（Switch 等 iOS 元件固定色）+ ACTION_ICON_MAP
// （header 動作 → SF Symbol 對應）。
// ─────────────────────────────────────────────────────────────

function IosSystemColorCard() {
  return (
    <FoundCard>
      <FoundLabel>IOS_SYSTEM_COLOR · RN 原生元件固定色</FoundLabel>
      <div style={{ fontSize: 11, color: TOKENS.ink3, marginBottom: 12, lineHeight: 1.5 }}>
        平台元件原色命名空間。Switch 政策修訂後（2026-05-26）原本的 switchThumbOn / switchThumbOff /
        switchTrackBg 三個常數已移除——impl 端 thumbColor 不傳值讓 iOS UISwitch 跑系統原生外觀
        （含 iOS 26 Liquid Glass），ios_backgroundColor 從 theme.bg.surface_hover 動態取值。
        本表目前無 token（未來如需收新平台色再加回）。
      </div>
    </FoundCard>
  );
}

function ActionIconMapCard() {
  const entries = Object.entries(ACTION_ICON_MAP);
  return (
    <FoundCard>
      <FoundLabel>ACTION_ICON_MAP · header 動作 → SF Symbol</FoundLabel>
      <div style={{ fontSize: 11, color: TOKENS.ink3, marginBottom: 12, lineHeight: 1.5 }}>
        Header action 使用系統 SF Symbol 達成 iOS 原生外觀。add 動作不入此表（由 FAB 與 listItem leftIcon 處理）。
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(72px, auto) minmax(140px, auto) 1fr', columnGap: 12, rowGap: 6, paddingTop: 4 }}>
        {entries.map(([action, def]) => (
          <React.Fragment key={action}>
            <code style={{ fontSize: 12, color: TOKENS.ink, lineHeight: 1.6 }}>{action}</code>
            <code style={{ fontSize: 11, color: TOKENS.ink2, lineHeight: 1.6 }}>
              {def.source === 'native' ? 'native chevron' : `SF · ${def.symbol}`}
            </code>
            <span style={{ fontSize: 11, color: TOKENS.ink2, lineHeight: 1.6 }}>{def.note}</span>
          </React.Fragment>
        ))}
      </div>
    </FoundCard>
  );
}

function FoundationsAtomicPlatformSection() {
  return (
    <DCSection
      id="found-atomic-platform"
      title="Atomic · Platform"
      subtitle="平台特定固定值。IOS_SYSTEM_COLOR 收 RN 原生 Switch 的色彩需求；ACTION_ICON_MAP 收 header 動作 → SF Symbol 對應。兩者皆不參與 theme 切換。"
    >
      <DCFamily id="platform-ios-color" title="iOS System Color" subtitle="RN 原生 Switch 等元件的固定色彩，不參與 theme 切換。">
        <DCArtboard id="ios-system-color" label="IOS_SYSTEM_COLOR (live)" width={420} height={260}>
          <IosSystemColorCard/>
        </DCArtboard>
      </DCFamily>

      <DCFamily id="platform-icon-map" title="Action Icon Map" subtitle="Header action 對應 SF Symbol，使用系統 icon 達成 iOS 原生外觀。">
        <DCArtboard id="action-icon-map" label="ACTION_ICON_MAP · header 動作 → SF Symbol (live)" width={520} height={460}>
          <ActionIconMapCard/>
        </DCArtboard>
      </DCFamily>
    </DCSection>
  );
}

Object.assign(window, {
  IosSystemColorCard, ActionIconMapCard, FoundationsAtomicPlatformSection,
});
