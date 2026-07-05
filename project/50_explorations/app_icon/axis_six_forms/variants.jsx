// ─────────────────────────────────────────────────────────────
// Exploration · App Icon · Axis 3 — 六形態 (v3)
//
// 第三版收斂：保留 v2 的速度變形 Morph 與 v1 的橫掠 Glide（標「保留」），
// 再新增四個——拉絲 / 輕掠 / 疊影 / 弧掠。當前候選集。
//
// icon 由共用 swish_engine.jsx 的 <SwishIcon cfg="..."/> 繪製。
// 註：glide 沿用 v1 書法飛白質感；morph 沿用 v2 定義。
// ─────────────────────────────────────────────────────────────

function AppIconSixFormsSection() {
  const W = 240, H = 240, SZ = 196;
  const items = [
    ['morph', '速度變形 Morph · 保留 · 一個形被甩長'],
    ['glide', '橫掠 Glide · 保留 · 左到右橫掃（書法）'],
    ['draw',  '拉絲 Draw · 新 · 頭凝聚，尾拉絲'],
    ['wisp',  '輕掠 Wisp · 新 · 輕順橫掠，末端化開'],
    ['echo',  '疊影 Echo · 新 · 主體 + 前方淡影'],
    ['arc',   '弧掠 Arc · 新 · 橫向實心弧帶'],
  ];
  return (
    <DCSection id="app-icon-six-forms"
      title="App Icon · Axis 3 — 六形態 (v3)"
      subtitle="第三版收斂。保留 Morph（v2）與 Glide（v1 書法橫掃）當底，新增拉絲/輕掠/疊影/弧掠。當前候選集，六個橘份量皆極小均衡。">
      {items.map(([cfg, label]) => (
        <DCArtboard key={cfg} id={"ai-six-" + cfg} label={label} width={W} height={H}>
          <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#FFFFFF' }}>
            <SwishIcon cfg={cfg} size={SZ} />
          </div>
        </DCArtboard>
      ))}
    </DCSection>
  );
}

Object.assign(window, { AppIconSixFormsSection });
