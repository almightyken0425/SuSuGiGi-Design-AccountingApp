// ─────────────────────────────────────────────────────────────
// Foundations > Icon Library > All Icons · 97 個 phosphor icon catalog
//
// account tag（id 1-11）+ category tag（id 12-97）兩段並列展示。
// 對齊 impl assets/definitions/IconDefinition.json。
// ─────────────────────────────────────────────────────────────

function IconWallCard({ icons }) {
  return (
    <FoundCard>
      <FoundLabel>{`${icons.length} 個 icon · 命名 = IconDefinition.json uniqueName`}</FoundLabel>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8, paddingTop: 8 }}>
        {icons.map(i => (
          <div key={i.id} style={{
            padding: '12px 6px', borderRadius: 8,
            background: TOKENS.surface2,
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6,
          }}>
            <DynamicIconById iconId={i.id} size={ICON_SIZE.md} color={TOKENS.ink}/>
            <code style={{ fontSize: 9.5, color: TOKENS.ink2, textAlign: 'center', wordBreak: 'break-word' }}>{i.uniqueName}</code>
            <code style={{ fontSize: 8, color: TOKENS.ink3 }}>id {i.id}</code>
          </div>
        ))}
      </div>
    </FoundCard>
  );
}

function FoundationsIconLibraryAllIconsSection() {
  return (
    <DCSection
      id="found-icon-library-all"
      title="Icon Library · All Icons"
      subtitle="97 個 phosphor SVG。account tag（id 1-11）給帳戶選擇用、category tag（id 12-97）給類別選擇用。對齊 impl assets/definitions/IconDefinition.json。"
    >
      <DCFamily id="icon-account-family" title="Account Tag" subtitle="帳戶選擇器用的 icon（id 1-11，共 11 個）。">
        <DCArtboard id="icon-account" label="IconDefinition · account tag (live)" width={520} height={580}>
          <IconWallCard icons={ICON_LIBRARY.filter(i => i.tags.includes('account'))}/>
        </DCArtboard>
      </DCFamily>
      <DCFamily id="icon-category-family" title="Category Tag" subtitle="類別選擇器用的 icon（id 12-97，共 86 個）。">
        <DCArtboard id="icon-category" label="IconDefinition · category tag (live)" width={520} height={760}>
          <IconWallCard icons={ICON_LIBRARY.filter(i => i.tags.includes('category'))}/>
        </DCArtboard>
      </DCFamily>
    </DCSection>
  );
}

Object.assign(window, { IconWallCard, FoundationsIconLibraryAllIconsSection });
