// ─────────────────────────────────────────────────────────────
// Exploration · App Icon · Axis 1 — 書法飛白 (v1)
//
// 第一版方向：一道書法快筆，收筆裂出飛白（速度的物理痕跡），
// 橘藏在飛白裡一絲。五種筆勢：掠 / 捺 / 繞 / 頓 / 疊。
// 後被否為「太主題化」，保留在此作為演進起點。
//
// icon 由共用 swish_engine.jsx 的 <SwishIcon cfg="..."/> 繪製。
// ─────────────────────────────────────────────────────────────

function AppIconCalligraphySection() {
  const W = 240, H = 240, SZ = 196;
  const items = [
    ['glide',  '掠 Glide · 橫向掠過'],
    ['stroke', '捺 Stroke · 斜向落定'],
    ['loop',   '繞 Loop · 一筆迴轉'],
    ['drop',   '頓 Drop · 縱向落下'],
    ['weave',  '疊 Weave · 雙筆交織'],
  ];
  return (
    <DCSection id="app-icon-calligraphy"
      title="App Icon · Axis 1 — 書法飛白 (v1)"
      subtitle="第一版。一道書法快筆，收筆裂出飛白 = 速度的痕跡，橘藏在飛白裡一絲。五種筆勢：掠/捺/繞/頓/疊。後被否為太主題化，保留為演進起點。">
      {items.map(([cfg, label]) => (
        <DCArtboard key={cfg} id={"ai-cal-" + cfg} label={label} width={W} height={H}>
          <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#FFFFFF' }}>
            <SwishIcon cfg={cfg} size={SZ} />
          </div>
        </DCArtboard>
      ))}
    </DCSection>
  );
}

Object.assign(window, { AppIconCalligraphySection });
