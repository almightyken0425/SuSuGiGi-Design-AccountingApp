// ─────────────────────────────────────────────────────────────
// Exploration · App Icon · Axis 4 — 命名廣掃 135 案
//
// 與 Axis 1-3 平行的第二條 review 線。前提差異：使用者明示放下
// v1 之前的舊 icon brief（記號/字母/箭頭等禁項全解除），改回
// 命名脈絡本身廣掃：速速記記＝最快記完一筆、swish＝快速掠過
// ＋空心入網。輪次 W/X/Y/V/U/T ＋ 90 案 contact sheet（A-I 九族）。
//
// 資料在 broadscan_data.js（window.APP_ICON_BROADSCAN，自動匯出、
// 勿手改 art 字串）。橘點 ● 標記＝使用者圈選：W6 X2 Y1 Y3 A2 C9 D9。
// 圈選歸納出四元素：多條殘影、透明度階、弧形掠痕、光暈——
// 後續因子實驗見 Axis 5。
// ─────────────────────────────────────────────────────────────

// 共用 SVG defs：本 axis 與 Axis 5 因子實驗共用，id 皆帶 ai 前綴避撞。
function AppIconSharedDefs() {
  return (
    <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true">
      <defs>
        <linearGradient id="aiGradPurple" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#5B3BD1"/><stop offset="0.55" stopColor="#4323a0"/><stop offset="1" stopColor="#2A1660"/>
        </linearGradient>
        <linearGradient id="aiGA" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#5B3BD1"/><stop offset="1" stopColor="#2A1660"/>
        </linearGradient>
        <linearGradient id="aiGB" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#7a63cf"/><stop offset="1" stopColor="#b7a9e6"/>
        </linearGradient>
        <linearGradient id="aiGC" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#4323a0"/><stop offset="1" stopColor="#F24F13"/>
        </linearGradient>
        <linearGradient id="aiGHero" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#4323a0"/><stop offset="1" stopColor="#c0b6df"/>
        </linearGradient>
        <linearGradient id="aiGAur" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#DCD3FF"/><stop offset="0.38" stopColor="#F4E9FF"/>
          <stop offset="0.78" stopColor="#E1F3FF"/><stop offset="1" stopColor="#FFE8F0"/>
        </linearGradient>
        <linearGradient id="aiFadeD" gradientUnits="userSpaceOnUse" x1="22" y1="68" x2="78" y2="26">
          <stop offset="0" stopColor="#F2F2F7" stopOpacity="0.22"/><stop offset="1" stopColor="#F2F2F7" stopOpacity="1"/>
        </linearGradient>
        <linearGradient id="aiFadeH" gradientUnits="userSpaceOnUse" x1="16" y1="52" x2="84" y2="46">
          <stop offset="0" stopColor="#F2F2F7" stopOpacity="0.22"/><stop offset="1" stopColor="#F2F2F7" stopOpacity="1"/>
        </linearGradient>
        <linearGradient id="aiFadeDP" gradientUnits="userSpaceOnUse" x1="22" y1="68" x2="78" y2="26">
          <stop offset="0" stopColor="#4323a0" stopOpacity="0.22"/><stop offset="1" stopColor="#4323a0" stopOpacity="1"/>
        </linearGradient>
        <linearGradient id="aiFadeHP" gradientUnits="userSpaceOnUse" x1="16" y1="52" x2="84" y2="46">
          <stop offset="0" stopColor="#4323a0" stopOpacity="0.22"/><stop offset="1" stopColor="#4323a0" stopOpacity="1"/>
        </linearGradient>
        <filter id="aiFB" x="-40%" y="-40%" width="180%" height="180%"><feGaussianBlur stdDeviation="3"/></filter>
        <filter id="aiFB2" x="-40%" y="-40%" width="180%" height="180%"><feGaussianBlur stdDeviation="2.6"/></filter>
      </defs>
    </svg>
  );
}

// 單一 tile：art 為 0..100 座標的 SVG 字串。bg=light 補淺底＋紫 ink；
// self / self8 由 art 自帶底、容器只負責圓角裁切。
function AIB_Tile({ item, size = 96 }) {
  const isLight = item.bg === 'light';
  return (
    <div style={{ width: size + 12, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 5 }}>
      <div style={{
        width: size, height: size, borderRadius: size * 0.224, overflow: 'hidden',
        background: isLight ? '#F2F2F7' : 'transparent', color: '#4323a0',
        border: '1px solid rgba(60,60,67,0.12)', flexShrink: 0,
      }}>
        <svg viewBox="0 0 100 100" style={{ width: '100%', height: '100%', display: 'block' }}
          dangerouslySetInnerHTML={{ __html: item.art }}/>
      </div>
      <div style={{ fontSize: 10, color: '#3a3a3c', textAlign: 'center', lineHeight: 1.3 }}>
        <span style={{ fontWeight: 600 }}>{item.id}</span> {item.name}
        {item.pick && <span style={{ color: '#F24F13', fontWeight: 700 }}> ●</span>}
      </div>
    </div>
  );
}

function AIB_FamilyBoard({ fam }) {
  return (
    <div style={{
      width: '100%', height: '100%', background: '#FFFFFF', padding: 14,
      display: 'flex', flexWrap: 'wrap', gap: 10, alignContent: 'flex-start',
      fontFamily: '-apple-system, "SF Pro Text", "PingFang TC", system-ui, sans-serif',
    }}>
      {fam.items.map(item => <AIB_Tile key={item.id} item={item}/>)}
    </div>
  );
}

function AppIconBroadscanSection() {
  const fams = window.APP_ICON_BROADSCAN || [];
  return (
    <DCSection id="app-icon-broadscan"
      title="App Icon · Axis 4 — 命名廣掃 135 案"
      subtitle="與 Axis 1-3 平行的第二條 review 線、舊 brief 已解除。從命名脈絡（速速記記＝最快記完一筆、swish＝掠過聲＋空心入網）逐輪廣掃：W 三路試探 → X/Y 同層橫開 → V 命名逐點 → U 構圖語言 → T 材質節奏 → 90 案九族。橘點 ● ＝使用者圈選（W6 X2 Y1 Y3 A2 C9 D9），歸納四元素：多條殘影、透明度階、弧形掠痕、光暈。收斂見 Axis 5 因子實驗。Open question · 2026-07-05。">
      <AppIconSharedDefs/>
      {fams.map(fam => {
        const n = fam.items.length;
        const cols = n >= 9 ? 5 : 3;
        const rows = Math.ceil(n / cols);
        const W = cols * 108 + 28, H = rows * 128 + 28;
        return (
          <DCFamily key={fam.key} id={"aib-" + fam.key} title={fam.title} subtitle={fam.note}>
            <DCArtboard id={"aib-board-" + fam.key} label={fam.title} width={W} height={H}>
              <AIB_FamilyBoard fam={fam}/>
            </DCArtboard>
          </DCFamily>
        );
      })}
    </DCSection>
  );
}

Object.assign(window, { AppIconBroadscanSection, AppIconSharedDefs, AIB_Tile });
