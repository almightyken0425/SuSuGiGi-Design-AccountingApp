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
        平台元件原色，非主題色、不參與 theme 切換。RN 原生 Switch 的視覺一致性需求收斂在此命名空間。
      </div>
      <Swatch hex={IOS_SYSTEM_COLOR.switchThumbOn}  name="switchThumbOn"  note="Switch 開啟態 thumb"/>
      <Swatch hex={IOS_SYSTEM_COLOR.switchThumbOff} name="switchThumbOff" note="Switch 關閉態 thumb"/>
      <Swatch hex={IOS_SYSTEM_COLOR.switchTrackBg}  name="switchTrackBg"  note="Switch 容器背景"/>
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
      direction="column"
    >
      <DCArtboard id="ios-system-color" label="IOS_SYSTEM_COLOR (live)" width={420} height={260}>
        <IosSystemColorCard/>
      </DCArtboard>
      <DCArtboard id="action-icon-map" label="ACTION_ICON_MAP · header 動作 → SF Symbol (live)" width={520} height={460}>
        <ActionIconMapCard/>
      </DCArtboard>
    </DCSection>
  );
}

Object.assign(window, {
  IosSystemColorCard, ActionIconMapCard, FoundationsAtomicPlatformSection,
});
