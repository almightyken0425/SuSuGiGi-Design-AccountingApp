// ─────────────────────────────────────────────────────────────
// Foundations > Brand > App Icon · 定案 G4
//
// 2026-07-07 定案。演進見 Explorations > App Icon（Axis 1-6）、
// 定案代號 G4：三條微弧、純條內漸層（尾淡頭實）、走勢 30 度、
// 淺底 #F2F2F7、紫 #4323A0、無橘、無變體（dark/tinted 交系統處理）。
//
// 本檔是 impl 資產的仲裁來源：
//   iOS  ios/SuSuGiGiApp/Images.xcassets/AppIcon.appiconset/icon-1024.png
//   Android mipmap 五密度 + adaptive（drawable/ic_launcher_foreground.xml）
// 幾何常數與資產產生器對齊、0..100 座標、勿目測改值。
// ─────────────────────────────────────────────────────────────

const APP_ICON_G4 = {
  paths: [
    'M 27.55,52.19 Q 56.49,39.52 81.93,20.79',
    'M 21.81,65.57 Q 48.27,55.70 71.48,39.62',
    'M 18.07,79.21 Q 41.30,70.94 61.27,56.47',
  ],
  grad: { x1: 27.55, y1: 52.19, x2: 81.93, y2: 20.79 },
  strokeWidth: 7,
  ink: '#4323A0',
  bg: '#F2F2F7',
  riseDeg: 30,
};

function AppIconG4({ size = 120, radius = true }) {
  const g = APP_ICON_G4;
  return (
    <div style={{
      width: size, height: size, borderRadius: radius ? size * 0.224 : 0,
      overflow: 'hidden', border: '1px solid rgba(60,60,67,0.12)', flexShrink: 0,
    }}>
      <svg viewBox="0 0 100 100" style={{ width: '100%', height: '100%', display: 'block' }}>
        <defs>
          <linearGradient id="appIconG4Fade" gradientUnits="userSpaceOnUse"
            x1={g.grad.x1} y1={g.grad.y1} x2={g.grad.x2} y2={g.grad.y2}>
            <stop offset="0" stopColor={g.ink} stopOpacity="0.15"/>
            <stop offset="1" stopColor={g.ink} stopOpacity="1"/>
          </linearGradient>
        </defs>
        <rect width="100" height="100" fill={g.bg}/>
        {g.paths.map(d => (
          <path key={d} d={d} stroke="url(#appIconG4Fade)" strokeWidth={g.strokeWidth}
            strokeLinecap="round" fill="none"/>
        ))}
      </svg>
    </div>
  );
}

function FoundationsBrandAppIconSection() {
  const sizes = [180, 120, 64, 44];
  return (
    <DCSection id="foundations-brand-app-icon"
      title="Brand · App Icon（定案 G4）"
      subtitle="三條微弧、純條內漸層尾淡頭實、走勢 30 度。速度的殘影、swish 的視覺化。淺底 F2F2F7、紫 4323A0、無橘、單一版本。演進紀錄在 Explorations > App Icon Axis 1-6。仲裁端：本檔幾何常數；跟進端：impl iOS AppIcon.appiconset 與 Android mipmap/adaptive。">
      <DCArtboard id="brand-appicon-sizes" label="尺寸階梯 · 180 / 120 / 64 / 44" width={560} height={260}>
        <div style={{ width: '100%', height: '100%', background: '#FFFFFF', padding: 18, display: 'flex', gap: 18, alignItems: 'flex-end', fontFamily: '-apple-system, "PingFang TC", sans-serif' }}>
          {sizes.map(s => (
            <div key={s} style={{ display: 'flex', flexDirection: 'column', gap: 6, alignItems: 'center' }}>
              <AppIconG4 size={s}/>
              <div style={{ fontSize: 10, color: '#8e8e93' }}>{s}</div>
            </div>
          ))}
        </div>
      </DCArtboard>
      <DCArtboard id="brand-appicon-context" label="桌布情境 · 上深下淺 · 60px" width={520} height={300}>
        <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }}>
          {[true, false].map(dark => (
            <div key={String(dark)} style={{
              flex: 1, display: 'flex', gap: 20, alignItems: 'center', justifyContent: 'center',
              background: dark ? 'linear-gradient(160deg, #151226 0%, #2a1b4d 100%)' : 'linear-gradient(160deg, #dfe3ea 0%, #f4f5f8 100%)',
            }}>
              <div style={{ width: 60, height: 60, borderRadius: 60 * 0.224, background: '#3d9df0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ width: 26, height: 26, borderRadius: 13, background: '#fff' }}/>
              </div>
              <AppIconG4 size={60}/>
              <div style={{ width: 60, height: 60, borderRadius: 60 * 0.224, background: '#4cc25e', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ width: 26, height: 26, borderRadius: 7, background: '#fff' }}/>
              </div>
            </div>
          ))}
        </div>
      </DCArtboard>
    </DCSection>
  );
}

Object.assign(window, { FoundationsBrandAppIconSection, AppIconG4, APP_ICON_G4 });
