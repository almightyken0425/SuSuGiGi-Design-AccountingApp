// ─────────────────────────────────────────────────────────────
// Exploration · App Icon · Axis 2 — 非書法速度形態 (v2)
//
// 第二版方向：拿掉書法，改走抽象速度——讓一個紫色的存在在加速中
// 改變形態。四種：速度變形 / 流線流體 / 拖尾動勢 / 漸層光暈。橘只一絲。
//
// icon 由共用 swish_engine.jsx 的 <SwishIcon cfg="..."/> 繪製。
// ─────────────────────────────────────────────────────────────

function AppIconSpeedFormsSection() {
  const W = 240, H = 240, SZ = 196;
  const items = [
    ['morph', '速度變形 Morph · 一個形被甩長'],
    ['flow',  '流線流體 Flow · 一縷絲滑流動'],
    ['comet', '拖尾動勢 Comet · 凝聚頭 + 漸隱尾'],
    ['glow',  '漸層光暈 Glow · 一團流動的光'],
  ];
  return (
    <DCSection id="app-icon-speed-forms"
      title="App Icon · Axis 2 — 非書法速度 (v2)"
      subtitle="第二版。拿掉書法，改走抽象速度：讓紫色的存在在加速中改變形態——被拉長、流動、拖尾、暈開。橘永遠只一絲。">
      {items.map(([cfg, label]) => (
        <DCArtboard key={cfg} id={"ai-spd-" + cfg} label={label} width={W} height={H}>
          <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#FFFFFF' }}>
            <SwishIcon cfg={cfg} size={SZ} />
          </div>
        </DCArtboard>
      ))}
    </DCSection>
  );
}

Object.assign(window, { AppIconSpeedFormsSection });
