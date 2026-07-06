// ─────────────────────────────────────────────────────────────
// Exploration · App Icon · Axis 5 — 因子實驗 K / L / N
//
// 把 Axis 4 使用者圈選歸納的四元素化成二元軸、正交展開：
//   K 塊：條數 × 深淺 × 線形 × 光暈（斜升）── 16 格
//   L 塊：同上、方向改左到右          ── 16 格
//   深紫底與白底各一套（共 64 格）
//   N 塊：形定 K13 / K5，展開 材質(平塗/玻璃) × 底型(四種) ── 16 格
//
// 幾何與第十輪、第十一輪對話產圖逐格一致，編號沿用 K/L/N。
// 目前候選：K13（多條彎深淺無暈）、K6（單條流光）、L13（水平風紋）、
// N1（K13 深紫）、N13（極光底平塗）、N2（深紫玻璃）。
// 依賴 axis_broadscan 的 AppIconSharedDefs（ai 前綴 defs）。
// ─────────────────────────────────────────────────────────────

const AIF_GEO = {
  diag: {
    curveSingle: 'M 22,68 C 42,62 58,48 78,26',
    lineSingle:  'M 22,68 L 78,26',
    curveTrio: [['M 24,58 C 42,52 56,40 74,20', 1.0], ['M 20,72 C 36,67 50,57 66,40', 0.60], ['M 18,86 C 32,82 44,74 58,58', 0.32]],
    lineTrio:  [['M 24,58 L 74,20', 1.0], ['M 20,72 L 66,40', 0.60], ['M 18,86 L 58,58', 0.32]],
    fadeLight: 'aiFadeD', fadePurple: 'aiFadeDP',
  },
  horiz: {
    curveSingle: 'M 16,52 C 38,60 62,46 84,44',
    lineSingle:  'M 16,50 L 84,50',
    curveTrio: [['M 18,32 C 36,38 58,26 80,24', 1.0], ['M 16,50 C 32,55 52,45 72,42', 0.60], ['M 14,68 C 28,72 46,64 62,61', 0.32]],
    lineTrio:  [['M 18,30 L 80,30', 1.0], ['M 16,49 L 71,49', 0.60], ['M 14,68 L 61,68', 0.32]],
    fadeLight: 'aiFadeH', fadePurple: 'aiFadeHP',
  },
};

function AIF_strokeEl(d, paint, width, op, blur) {
  const f = blur ? ' filter="url(#aiFB)"' : '';
  return `<path d="${d}" stroke="${paint}" stroke-width="${width}" stroke-linecap="round" fill="none" opacity="${op.toFixed(2)}"${f}/>`;
}

// K/L 因子 tile：tone=dark|lite 決定底色與 ink
function AIF_klArt(dir, multi, ladder, curved, glow, tone) {
  const g = AIF_GEO[dir];
  const ink = tone === 'dark' ? '#F2F2F7' : '#4323a0';
  const bg = tone === 'dark' ? '#2A1660' : '#FFFFFF';
  let paths, paint;
  if (multi) {
    const trio = curved ? g.curveTrio : g.lineTrio;
    paths = trio.map(([d, op]) => [d, ladder ? op : 1.0]);
    paint = ink;
  } else {
    const d = curved ? g.curveSingle : g.lineSingle;
    paint = ladder ? `url(#${tone === 'dark' ? g.fadeLight : g.fadePurple})` : ink;
    paths = [[d, 1.0]];
  }
  let out = `<rect width="100" height="100" fill="${bg}"/>`;
  if (glow) for (const [d, op] of paths) out += AIF_strokeEl(d, paint, 15, Math.min(0.55, 0.55 * op + 0.08), true);
  for (const [d, op] of paths) out += AIF_strokeEl(d, paint, 7, op, false);
  return out;
}

// N 塊：玻璃材質擬態（GlassView 配方）
function AIF_glassStroke(d, tone, op) {
  let out = `<path d="${d}" stroke="rgba(20,10,60,${(0.30 * op).toFixed(2)})" stroke-width="8" stroke-linecap="round" fill="none" transform="translate(0,2.4)" filter="url(#aiFB2)"/>`;
  if (tone === 'dark') {
    out += `<path d="${d}" stroke="rgba(255,255,255,${(0.50 * op).toFixed(2)})" stroke-width="7" stroke-linecap="round" fill="none"/>`;
  } else {
    out += `<path d="${d}" stroke="rgba(60,60,67,${(0.22 * op).toFixed(2)})" stroke-width="8.2" stroke-linecap="round" fill="none"/>`;
    out += `<path d="${d}" stroke="rgba(255,255,255,${(0.92 * op).toFixed(2)})" stroke-width="7" stroke-linecap="round" fill="none"/>`;
  }
  out += `<path d="${d}" stroke="rgba(255,255,255,${(0.95 * op).toFixed(2)})" stroke-width="1.6" stroke-linecap="round" fill="none" transform="translate(-0.6,-2.2)"/>`;
  return out;
}

const AIF_N_BGS = [
  ['深紫平色', 'dark', '<rect width="100" height="100" fill="#2A1660"/>'],
  ['深紫漸層', 'dark', '<rect width="100" height="100" fill="url(#aiGHero)"/>'],
  ['白平色',   'lite', '<rect width="100" height="100" fill="#FFFFFF"/>'],
  ['極光漸層', 'lite', '<rect width="100" height="100" fill="url(#aiGAur)"/>'],
];

function AIF_nArt(bgIdx, mark, material) {
  const [, tone, bgRect] = AIF_N_BGS[bgIdx];
  const g = AIF_GEO.diag;
  const ink = tone === 'dark' ? '#F2F2F7' : '#4323a0';
  let art = bgRect;
  if (mark === 'trio') {
    for (const [d, op] of g.curveTrio) {
      art += material === 'flat' ? AIF_strokeEl(d, ink, 7, op, false) : AIF_glassStroke(d, tone, op);
    }
  } else {
    if (material === 'flat') {
      art += AIF_strokeEl(g.curveSingle, `url(#${tone === 'dark' ? g.fadeLight : g.fadePurple})`, 7, 1.0, false);
    } else {
      art += AIF_glassStroke(g.curveSingle, tone, 1.0);
    }
  }
  return art;
}

const AIF_PICKS = new Set(['K6', 'K13', 'L13', 'N1', 'N2', 'N13']);

function AIF_Tile({ id, art, sub, size = 92 }) {
  return (
    <div style={{ width: size + 10, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
      <div style={{
        width: size, height: size, borderRadius: size * 0.224, overflow: 'hidden',
        border: '1px solid rgba(60,60,67,0.15)', flexShrink: 0,
      }}>
        <svg viewBox="0 0 100 100" style={{ width: '100%', height: '100%', display: 'block' }}
          dangerouslySetInnerHTML={{ __html: art }}/>
      </div>
      <div style={{ fontSize: 10, color: '#3a3a3c', textAlign: 'center', lineHeight: 1.25 }}>
        <span style={{ fontWeight: 600 }}>{id}</span>
        {AIF_PICKS.has(id) && <span style={{ color: '#F24F13', fontWeight: 700 }}> ●</span>}
        {sub && <div style={{ color: '#8e8e93', fontSize: 8.5 }}>{sub}</div>}
      </div>
    </div>
  );
}

const AIF_ROWS = [['一條·無深淺', false, false], ['一條·有深淺', false, true], ['多條·無深淺', true, false], ['多條·有深淺', true, true]];
const AIF_COLS = [['彎·無暈', true, false], ['彎·暈', true, true], ['直·無暈', false, false], ['直·暈', false, true]];

function AIF_KLGrid({ dir, tone, prefix }) {
  return (
    <div style={{ width: '100%', height: '100%', background: '#FFFFFF', padding: 12, fontFamily: '-apple-system, "SF Pro Text", "PingFang TC", system-ui, sans-serif' }}>
      <div style={{ display: 'flex', gap: 8, marginLeft: 78 }}>
        {AIF_COLS.map(([cl]) => <div key={cl} style={{ width: 102, fontSize: 10, color: '#6e6e73' }}>{cl}</div>)}
      </div>
      {AIF_ROWS.map(([rl, multi, ladder], r) => (
        <div key={rl} style={{ display: 'flex', gap: 8, alignItems: 'center', marginTop: 6 }}>
          <div style={{ width: 70, fontSize: 10, color: '#6e6e73', flexShrink: 0 }}>{rl}</div>
          {AIF_COLS.map(([, curved, glow], c) => {
            const num = r * 4 + c + 1;
            return <AIF_Tile key={c} id={prefix + num} art={AIF_klArt(dir, multi, ladder, curved, glow, tone)}/>;
          })}
        </div>
      ))}
    </div>
  );
}

const AIF_N_COLS = [['多條·平塗', 'trio', 'flat'], ['多條·玻璃', 'trio', 'glass'], ['單條·平塗', 'single', 'flat'], ['單條·玻璃', 'single', 'glass']];

function AIF_NGrid() {
  return (
    <div style={{ width: '100%', height: '100%', background: '#FFFFFF', padding: 12, fontFamily: '-apple-system, "SF Pro Text", "PingFang TC", system-ui, sans-serif' }}>
      <div style={{ display: 'flex', gap: 8, marginLeft: 78 }}>
        {AIF_N_COLS.map(([cl]) => <div key={cl} style={{ width: 102, fontSize: 10, color: '#6e6e73' }}>{cl}</div>)}
      </div>
      {AIF_N_BGS.map(([bl], r) => (
        <div key={bl} style={{ display: 'flex', gap: 8, alignItems: 'center', marginTop: 6 }}>
          <div style={{ width: 70, fontSize: 10, color: '#6e6e73', flexShrink: 0 }}>{bl}</div>
          {AIF_N_COLS.map(([, mark, material], c) => (
            <AIF_Tile key={c} id={'N' + (r * 4 + c + 1)} art={AIF_nArt(r, mark, material)}/>
          ))}
        </div>
      ))}
    </div>
  );
}

function AppIconFactorialSection() {
  const W = 560, H = 560;
  return (
    <DCSection id="app-icon-factorial"
      title="App Icon · Axis 5 — 因子實驗 K / L / N"
      subtitle="Axis 4 圈選元素化成二元軸正交展開。K 斜升、L 左到右，各 16 格、深白兩底。N 塊形定 K13 與 K5、展開材質（平塗/玻璃、GlassView 擬態）×底型（深紫平/深紫漸層/白平/極光漸層）。橘點 ● ＝目前候選：K13 K6 L13 N1 N2 N13。已知結論：直棒在水平向讀成減號與漢堡選單、多條加光暈會糊、玻璃在白底近隱形。Open question · 2026-07-05。">
      <AppIconSharedDefs/>
      <DCFamily id="aif-k" title="K · 斜升 16 格" subtitle="條數 × 深淺 × 線形 × 光暈。深紫底與白底。">
        <DCArtboard id="aif-k-dark" label="K · 深紫底" width={W} height={H}>
          <AIF_KLGrid dir="diag" tone="dark" prefix="K"/>
        </DCArtboard>
        <DCArtboard id="aif-k-lite" label="K · 白底" width={W} height={H}>
          <AIF_KLGrid dir="diag" tone="lite" prefix="K"/>
        </DCArtboard>
      </DCFamily>
      <DCFamily id="aif-l" title="L · 左到右 16 格" subtitle="同 K 四軸、方向改水平。直棒列已知踩減號與漢堡雷。">
        <DCArtboard id="aif-l-dark" label="L · 深紫底" width={W} height={H}>
          <AIF_KLGrid dir="horiz" tone="dark" prefix="L"/>
        </DCArtboard>
        <DCArtboard id="aif-l-lite" label="L · 白底" width={W} height={H}>
          <AIF_KLGrid dir="horiz" tone="lite" prefix="L"/>
        </DCArtboard>
      </DCFamily>
      <DCFamily id="aif-n" title="N · 材質 × 底型 16 格" subtitle="形定 K13 多條與 K5 單條、無光暈。玻璃＝GlassView 配方擬態、單條玻璃無深淺。">
        <DCArtboard id="aif-n-grid" label="N · 材質 × 底型" width={W} height={H}>
          <AIF_NGrid/>
        </DCArtboard>
      </DCFamily>
    </DCSection>
  );
}

Object.assign(window, { AppIconFactorialSection, AIF_klArt, AIF_nArt });
