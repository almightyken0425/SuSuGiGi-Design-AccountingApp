// ─────────────────────────────────────────────────────────────
// Exploration · App Icon · Axis 6 — Glide 深化 (v1 書法版翻案)
//
// 使用者重看 Axis 1-5 後選定 v1 書法飛白的掠 Glide 深化。
// 本檔是參數化 Glide Lab：把 swish_engine 的 cal 繪法移植成
// 可掃參數的版本（不動共用 engine），軸包含：
//   角度（水平 / 斜升）、tailStart（飛白裂點）、飛白密度、底色。
//
// 三個 family：
//   1. 生死關 — 現參數的尺寸階梯 + 深淺桌布情境（44px 是飛白存亡線）
//   2. 方向軸 — 0° / -12° / -20°
//   3. 小因子表 — 底色 × tailStart × 密度
//
// 座標空間 0..120、squircle 裁切、與 engine 一致。
// ─────────────────────────────────────────────────────────────

(function () {
  'use strict';

  // ── 從 swish_engine 移植的核心（參數化版） ──
  function GL_rng(a) {
    return function () {
      a |= 0; a = (a + 0x6D2B79F5) | 0;
      let t = Math.imul(a ^ (a >>> 15), 1 | a);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }
  function GL_samples(pts) {
    const P = pts.slice(); P.unshift(pts[0]); P.push(pts[pts.length - 1]);
    const out = []; const segs = P.length - 3; const per = 30;
    for (let s = 0; s < segs; s++) {
      const p0 = P[s], p1 = P[s + 1], p2 = P[s + 2], p3 = P[s + 3];
      for (let i = 0; i < per; i++) {
        const t = i / per, t2 = t * t, t3 = t2 * t;
        const x = 0.5 * ((2 * p1[0]) + (-p0[0] + p2[0]) * t + (2 * p0[0] - 5 * p1[0] + 4 * p2[0] - p3[0]) * t2 + (-p0[0] + 3 * p1[0] - 3 * p2[0] + p3[0]) * t3);
        const y = 0.5 * ((2 * p1[1]) + (-p0[1] + p2[1]) * t + (2 * p0[1] - 5 * p1[1] + 4 * p2[1] - p3[1]) * t2 + (-p0[1] + 3 * p1[1] - 3 * p2[1] + p3[1]) * t3);
        out.push([x, y]);
      }
    }
    let len = 0; const acc = [0];
    for (let i = 1; i < out.length; i++) { len += Math.hypot(out[i][0] - out[i - 1][0], out[i][1] - out[i - 1][1]); acc.push(len); }
    for (let i = 0; i < out.length; i++) out[i][2] = acc[i] / len;
    return out;
  }
  function GL_widthAt(prof, t) {
    for (let i = 1; i < prof.length; i++) {
      if (t <= prof[i][0]) { const a = prof[i - 1], b = prof[i]; const f = (t - a[0]) / (b[0] - a[0] || 1); return a[1] + (b[1] - a[1]) * f; }
    }
    return prof[prof.length - 1][1];
  }
  function GL_noise(rng, n) { const t = []; for (let i = 0; i < n; i++) t.push(rng() * 2 - 1); return t; }
  function GL_nzAt(tbl, u) {
    const x = u * (tbl.length - 1), i = Math.floor(x), f = x - i;
    const a = tbl[i], b = tbl[Math.min(i + 1, tbl.length - 1)]; const s = f * f * (3 - 2 * f);
    return a + (b - a) * s;
  }
  function GL_squircle(ctx, s) {
    const a = s / 2, n = 4.2, N = 72; ctx.beginPath();
    for (let i = 0; i <= N; i++) {
      const th = i / N * Math.PI * 2, c = Math.cos(th), si = Math.sin(th);
      const x = a + a * Math.sign(c) * Math.pow(Math.abs(c), 2 / n);
      const y = a + a * Math.sign(si) * Math.pow(Math.abs(si), 2 / n);
      i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
    }
    ctx.closePath();
  }
  function GL_rotatePts(pts, deg, cx, cy) {
    const th = deg * Math.PI / 180, c = Math.cos(th), s = Math.sin(th);
    return pts.map(([x, y]) => [cx + (x - cx) * c - (y - cy) * s, cy + (x - cx) * s + (y - cy) * c]);
  }

  // glide 基準幾何（同 engine CFG.glide）
  const GL_BASE_PTS = [[26, 66], [45, 64], [65, 57], [84, 47], [98, 39]];
  const GL_PROF = [[0, 11], [0.26, 12], [0.58, 8], [0.84, 3.6], [1, 1.2]];

  const GL_BGS = {
    lite:   { ink: '#4323A0', paint: (ctx, s) => { ctx.fillStyle = '#F2F2F7'; ctx.fillRect(0, 0, s, s); } },
    deep:   { ink: '#F2F2F7', paint: (ctx, s) => { ctx.fillStyle = '#2A1660'; ctx.fillRect(0, 0, s, s); } },
    aurora: { ink: '#4323A0', paint: (ctx, s) => {
      const g = ctx.createLinearGradient(0, 0, s, s);
      g.addColorStop(0, '#DCD3FF'); g.addColorStop(0.38, '#F4E9FF');
      g.addColorStop(0.78, '#E1F3FF'); g.addColorStop(1, '#FFE8F0');
      ctx.fillStyle = g; ctx.fillRect(0, 0, s, s);
    } },
  };

  // p: { angle, tailStart, density, bg, seed }
  function GL_render(canvas, p) {
    if (!canvas) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2.5);
    const size = canvas.clientWidth || parseInt(canvas.getAttribute('width'), 10) || 200;
    canvas.width = Math.round(size * dpr); canvas.height = Math.round(size * dpr);
    const ctx = canvas.getContext('2d'); ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, size, size);
    const S = size / 120;
    GL_squircle(ctx, size); ctx.clip();
    const bg = GL_BGS[p.bg || 'lite'];
    bg.paint(ctx, size);

    const pts = p.angle ? GL_rotatePts(GL_BASE_PTS, p.angle, 62, 53) : GL_BASE_PTS;
    const samp = GL_samples(pts);
    const nz = GL_noise(GL_rng((p.seed || 7) * 3), 40);
    // 主體：沿樣條蓋圓、寬度剖面 + 微噪
    for (let i = 0; i < samp.length; i++) {
      const q = samp[i], t = q[2];
      let w = GL_widthAt(GL_PROF, t) + GL_nzAt(nz, t) * 0.5;
      ctx.fillStyle = bg.ink; ctx.globalAlpha = 1;
      ctx.beginPath(); ctx.arc(q[0] * S, q[1] * S, Math.max(0.1, w * 0.5) * S, 0, 6.2832); ctx.fill();
    }
    // 飛白：destination-out 露底、兩成橘絲
    const rng = GL_rng(p.seed || 7);
    const tailStart = p.tailStart != null ? p.tailStart : 0.6;
    const density = p.density != null ? p.density : 1;
    ctx.save(); ctx.lineCap = 'round';
    for (let i = 1; i < samp.length; i++) {
      const q = samp[i], qq = samp[i - 1], t = q[2];
      if (t < tailStart) continue;
      let tx = q[0] - qq[0], ty = q[1] - qq[1]; const tl = Math.hypot(tx, ty) || 1; tx /= tl; ty /= tl;
      const nx = -ty, ny = tx, w = GL_widthAt(GL_PROF, t);
      const local = (t - tailStart) / (1 - tailStart);
      const streaks = Math.max(1, Math.round((1 + local * 3.5) * density));
      for (let k = 0; k < streaks; k++) {
        if (rng() > (0.5 + local * 0.4) * Math.min(1.15, 0.75 + density * 0.35)) continue;
        const off = (rng() * 2 - 1) * w * 0.44 * S;
        const cx = q[0] * S + nx * off, cy = q[1] * S + ny * off;
        const seg = (1.6 + rng() * 3.4) * S, lw = (0.32 + rng() * 0.7) * S;
        if (rng() < 0.2) { ctx.globalCompositeOperation = 'source-over'; ctx.strokeStyle = '#F24F13'; ctx.globalAlpha = 0.78 + rng() * 0.22; }
        else { ctx.globalCompositeOperation = 'destination-out'; ctx.globalAlpha = 0.55 + rng() * 0.45; }
        ctx.lineWidth = lw;
        ctx.beginPath(); ctx.moveTo(cx - tx * seg * 0.5, cy - ty * seg * 0.5); ctx.lineTo(cx + tx * seg * 0.5, cy + ty * seg * 0.5); ctx.stroke();
      }
    }
    ctx.restore();
  }

  function GlideIcon({ size = 120, angle = 0, tailStart = 0.6, density = 1, bg = 'lite', seed = 7 }) {
    const ref = React.useRef(null);
    React.useEffect(() => { GL_render(ref.current, { angle, tailStart, density, bg, seed }); });
    return <canvas ref={ref} width={size} height={size} style={{ width: size, height: size, display: 'block' }}/>;
  }

  // ── Family 1 · 生死關 ──
  function GL_SizeRamp() {
    const sizes = [180, 120, 96, 64, 44];
    return (
      <div style={{ width: '100%', height: '100%', background: '#FFFFFF', padding: 18, display: 'flex', gap: 18, alignItems: 'flex-end', fontFamily: '-apple-system, "PingFang TC", sans-serif' }}>
        {sizes.map(s => (
          <div key={s} style={{ display: 'flex', flexDirection: 'column', gap: 6, alignItems: 'center' }}>
            <GlideIcon size={s}/>
            <div style={{ fontSize: 10, color: '#8e8e93' }}>{s}</div>
          </div>
        ))}
      </div>
    );
  }
  function GL_WallRow({ dark }) {
    const size = 60;
    return (
      <div style={{
        flex: 1, display: 'flex', gap: 20, alignItems: 'center', justifyContent: 'center',
        background: dark ? 'linear-gradient(160deg, #151226 0%, #2a1b4d 100%)' : 'linear-gradient(160deg, #dfe3ea 0%, #f4f5f8 100%)',
      }}>
        <div style={{ width: size, height: size, borderRadius: size * 0.224, background: '#3d9df0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ width: 26, height: 26, borderRadius: 13, background: '#fff' }}/>
        </div>
        <GlideIcon size={size}/>
        <GlideIcon size={size} bg="deep"/>
        <div style={{ width: size, height: size, borderRadius: size * 0.224, background: '#4cc25e', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ width: 26, height: 26, borderRadius: 7, background: '#fff' }}/>
        </div>
      </div>
    );
  }
  function GL_WallMock() {
    return (
      <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }}>
        <GL_WallRow dark/>
        <GL_WallRow/>
      </div>
    );
  }

  // ── Family 2 · 方向軸 ──
  function GL_AngleBoard() {
    const items = [[0, '0° 水平原版'], [-12, '-12° 微斜升'], [-20, '-20° 斜升']];
    return (
      <div style={{ width: '100%', height: '100%', background: '#FFFFFF', padding: 18, display: 'flex', gap: 22, alignItems: 'center', justifyContent: 'center', fontFamily: '-apple-system, "PingFang TC", sans-serif' }}>
        {items.map(([a, label]) => (
          <div key={a} style={{ display: 'flex', flexDirection: 'column', gap: 8, alignItems: 'center' }}>
            <GlideIcon size={140} angle={a}/>
            <GlideIcon size={64} angle={a}/>
            <div style={{ fontSize: 11, color: '#3a3a3c' }}>{label}</div>
          </div>
        ))}
      </div>
    );
  }

  // ── Family 3 · 小因子表：底色 × tailStart × 密度 ──
  function GL_FactorBoard({ bg }) {
    const tails = [[0.45, '裂點早 0.45'], [0.6, '現版 0.60'], [0.75, '裂點晚 0.75']];
    const dens = [[0.6, '疏'], [1.4, '密']];
    return (
      <div style={{ width: '100%', height: '100%', background: '#FFFFFF', padding: 14, fontFamily: '-apple-system, "PingFang TC", sans-serif' }}>
        <div style={{ display: 'flex', gap: 10, marginLeft: 46 }}>
          {tails.map(([t, tl]) => <div key={t} style={{ width: 104, fontSize: 10, color: '#6e6e73' }}>{tl}</div>)}
        </div>
        {dens.map(([d, dl]) => (
          <div key={d} style={{ display: 'flex', gap: 10, alignItems: 'center', marginTop: 8 }}>
            <div style={{ width: 38, fontSize: 10, color: '#6e6e73', flexShrink: 0 }}>{dl}</div>
            {tails.map(([t]) => <GlideIcon key={t} size={104} tailStart={t} density={d} bg={bg}/>)}
          </div>
        ))}
      </div>
    );
  }

  // ── Family 4 · K15 深化（Axis 5 因子表的 多條×深淺×直棒×無暈×斜升） ──
  const K15_BGS = {
    lite:   { ink: '#4323A0', rect: '<rect width="100" height="100" fill="#F2F2F7"/>' },
    deep:   { ink: '#F2F2F7', rect: '<rect width="100" height="100" fill="#2A1660"/>' },
    aurora: { ink: '#4323A0', rect: '<rect width="100" height="100" fill="url(#glAur)"/>' },
  };
  const K15_DEFS = `
    <linearGradient id="glAur" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#DCD3FF"/><stop offset="0.38" stop-color="#F4E9FF"/>
      <stop offset="0.78" stop-color="#E1F3FF"/><stop offset="1" stop-color="#FFE8F0"/>
    </linearGradient>
    <linearGradient id="glFadeP" gradientUnits="userSpaceOnUse" x1="24" y1="58" x2="74" y2="20">
      <stop offset="0" stop-color="#4323A0" stop-opacity="0.15"/><stop offset="1" stop-color="#4323A0" stop-opacity="1"/>
    </linearGradient>`;
  const K15_BASE = [[24, 58, 74, 20, 1.0], [20, 72, 66, 40, 0.60], [18, 86, 58, 58, 0.32]];

  function K15_art(variant, bgKey) {
    const bg = K15_BGS[bgKey || 'lite'];
    let bars = K15_BASE, widths = [7, 7, 7], cap = 'round', paint = null;
    if (variant === 'weight')  widths = [9, 6.5, 4.5];
    if (variant === 'front') bars = [[24, 58, 74, 20, 1.0], [30.1, 57.4, 66.7, 29.6, 0.60], [33.9, 58.5, 59.4, 39.1, 0.32]];
    if (variant === 'fade')  paint = 'url(#glFadeP)';
    if (variant === 'cut')   cap = 'butt';
    if (variant === 'four')  { bars = [[24, 56, 74, 18, 1.0], [21, 68, 68, 34, 0.66], [19, 80, 62, 50, 0.42], [17, 92, 56, 66, 0.22]]; widths = [7, 7, 7, 7]; }
    let out = `<defs>${K15_DEFS}</defs>` + bg.rect;
    bars.forEach(([x1, y1, x2, y2, op], i) => {
      out += `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${paint || bg.ink}" stroke-width="${widths[i] || widths[0]}" stroke-linecap="${cap}" opacity="${op}"/>`;
    });
    return out;
  }

  function K15_Tile({ variant, bg, size }) {
    return (
      <div style={{ width: size, height: size, borderRadius: size * 0.224, overflow: 'hidden', border: '1px solid rgba(60,60,67,0.12)', flexShrink: 0 }}>
        <svg viewBox="0 0 100 100" style={{ width: '100%', height: '100%', display: 'block' }}
          dangerouslySetInnerHTML={{ __html: K15_art(variant, bg) }}/>
      </div>
    );
  }

  const K15_VARIANTS = [
    ['base',   'lite',   'K15-1 · 基準（Axis 5 原樣）'],
    ['weight', 'lite',   'K15-2 · 粗細階 9/6.5/4.5'],
    ['front',  'lite',   'K15-3 · 前緣切齊、尾錯落'],
    ['fade',   'lite',   'K15-4 · 條內漸層、尾淡頭實'],
    ['cut',    'lite',   'K15-5 · 平切端、去圓頭'],
    ['four',   'lite',   'K15-6 · 四條、階距收緊'],
    ['base',   'deep',   'K15-7 · 深紫底反白'],
    ['base',   'aurora', 'K15-8 · 極光漸層底'],
  ];

  // ── Family 5 · K15-4 再深化（條內漸層軌） ──
  const K154_DEFS = K15_DEFS + `
    <linearGradient id="glFadeP0" gradientUnits="userSpaceOnUse" x1="24" y1="58" x2="74" y2="20">
      <stop offset="0" stop-color="#4323A0" stop-opacity="0"/><stop offset="1" stop-color="#4323A0" stop-opacity="1"/>
    </linearGradient>
    <linearGradient id="glFadeL" gradientUnits="userSpaceOnUse" x1="24" y1="58" x2="74" y2="20">
      <stop offset="0" stop-color="#F2F2F7" stop-opacity="0.15"/><stop offset="1" stop-color="#F2F2F7" stop-opacity="1"/>
    </linearGradient>`;

  // 錐形條：尾細頭粗、圓頭用弧線併進同一 path、避免疊筆接縫
  function K154_taper(x1, y1, x2, y2, wt, wh, paint, op) {
    let ux = x2 - x1, uy = y2 - y1; const L = Math.hypot(ux, uy); ux /= L; uy /= L;
    const nx = -uy, ny = ux; const r = wh / 2;
    const a = `${x1 + nx * wt / 2},${y1 + ny * wt / 2}`, b = `${x2 + nx * r},${y2 + ny * r}`;
    const c = `${x2 - nx * r},${y2 - ny * r}`, d = `${x1 - nx * wt / 2},${y1 - ny * wt / 2}`;
    return `<path d="M ${a} L ${b} A ${r} ${r} 0 0 0 ${c} L ${d} Z" fill="${paint}" opacity="${op}"/>`;
  }

  function K154_art(variant, bgKey) {
    const bg = K15_BGS[bgKey || 'lite'];
    const grad = bgKey === 'deep' ? 'url(#glFadeL)' : 'url(#glFadeP)';
    const grad0 = bgKey === 'deep' ? 'url(#glFadeL)' : 'url(#glFadeP0)';
    let out = `<defs>${K154_DEFS}</defs>` + bg.rect;
    const line = (b, w, paint, op, cap) =>
      `<line x1="${b[0]}" y1="${b[1]}" x2="${b[2]}" y2="${b[3]}" stroke="${paint}" stroke-width="${w}" stroke-linecap="${cap || 'round'}" opacity="${op}"/>`;
    if (variant === 'base') {
      K15_BASE.forEach(b => { out += line(b, 7, grad, b[4]); });
    } else if (variant === 'zerotail') {
      K15_BASE.forEach(b => { out += line(b, 7, grad0, b[4]); });
    } else if (variant === 'pure') {
      K15_BASE.forEach(b => { out += line(b, 7, grad, 1); });
    } else if (variant === 'weight') {
      const ws = [9, 6.5, 4.5];
      K15_BASE.forEach((b, i) => { out += line(b, ws[i], grad, b[4]); });
    } else if (variant === 'taper') {
      K15_BASE.forEach(b => { out += K154_taper(b[0], b[1], b[2], b[3], 2.5, 8.5, grad, b[4]); });
    } else if (variant === 'cut') {
      K15_BASE.forEach(b => { out += line(b, 7, grad, b[4], 'butt'); });
    } else if (variant === 'spark') {
      K15_BASE.forEach(b => { out += line(b, 7, grad, b[4]); });
      out += `<line x1="78.5" y1="16.6" x2="83.5" y2="12.8" stroke="#F24F13" stroke-width="3" stroke-linecap="round"/>`;
    }
    return out;
  }

  const K154_VARIANTS = [
    ['base',     'lite',   'D1 · 基準 K15-4'],
    ['zerotail', 'lite',   'D2 · 尾全透、從零起'],
    ['pure',     'lite',   'D3 · 純條內漸層、無條間階'],
    ['weight',   'lite',   'D4 · 漸層 × 粗細階'],
    ['taper',    'lite',   'D5 · 錐形條、尾細頭粗'],
    ['cut',      'lite',   'D6 · 平切端 + 漸層'],
    ['base',     'deep',   'D7 · 深紫底反白漸層'],
    ['spark',    'lite',   'D8 · 主條頭橘火花'],
  ];

  function K154_Tile({ variant, bg, size }) {
    return (
      <div style={{ width: size, height: size, borderRadius: size * 0.224, overflow: 'hidden', border: '1px solid rgba(60,60,67,0.12)', flexShrink: 0 }}>
        <svg viewBox="0 0 100 100" style={{ width: '100%', height: '100%', display: 'block' }}
          dangerouslySetInnerHTML={{ __html: K154_art(variant, bg) }}/>
      </div>
    );
  }

  function K154_Board() {
    return (
      <div style={{ width: '100%', height: '100%', background: '#FFFFFF', padding: 16, display: 'flex', flexWrap: 'wrap', gap: 16, alignContent: 'flex-start', fontFamily: '-apple-system, "PingFang TC", sans-serif' }}>
        {K154_VARIANTS.map(([variant, bg, label]) => (
          <div key={label} style={{ display: 'flex', flexDirection: 'column', gap: 6, alignItems: 'center', width: 132 }}>
            <K154_Tile variant={variant} bg={bg} size={120}/>
            <K154_Tile variant={variant} bg={bg} size={44}/>
            <div style={{ fontSize: 10, color: '#3a3a3c', textAlign: 'center', lineHeight: 1.35 }}>{label}</div>
          </div>
        ))}
      </div>
    );
  }

  // ── Family 6 · D3 再深化（純條內漸層軌、無條間階、全條同濃） ──
  function K1544_art(variant, bgKey) {
    const bg = K15_BGS[bgKey || 'lite'];
    const grad = bgKey === 'deep' ? 'url(#glFadeL)' : 'url(#glFadeP)';
    const grad0 = bgKey === 'deep' ? 'url(#glFadeL)' : 'url(#glFadeP0)';
    let out = `<defs>${K154_DEFS}</defs>` + bg.rect;
    const line = (b, w, paint, cap) =>
      `<line x1="${b[0]}" y1="${b[1]}" x2="${b[2]}" y2="${b[3]}" stroke="${paint}" stroke-width="${w}" stroke-linecap="${cap || 'round'}" opacity="1"/>`;
    const bow = (b, w, paint, k) => {
      let ux = b[2] - b[0], uy = b[3] - b[1]; const L = Math.hypot(ux, uy);
      const mx = (b[0] + b[2]) / 2 - uy / L * k, my = (b[1] + b[3]) / 2 + ux / L * k;
      return `<path d="M ${b[0]},${b[1]} Q ${mx},${my} ${b[2]},${b[3]}" stroke="${paint}" stroke-width="${w}" stroke-linecap="round" fill="none" opacity="1"/>`;
    };
    if (variant === 'base') {
      K15_BASE.forEach(b => { out += line(b, 7, grad); });
    } else if (variant === 'weight') {
      const ws = [9, 6.5, 4.5];
      K15_BASE.forEach((b, i) => { out += line(b, ws[i], grad); });
    } else if (variant === 'zerotail') {
      K15_BASE.forEach(b => { out += line(b, 7, grad0); });
    } else if (variant === 'taper') {
      K15_BASE.forEach(b => { out += K154_taper(b[0], b[1], b[2], b[3], 2.5, 8.5, grad, 1); });
    } else if (variant === 'bowed') {
      K15_BASE.forEach(b => { out += bow(b, 7, grad, 3.5); });
    } else if (variant === 'cut') {
      K15_BASE.forEach(b => { out += line(b, 7, grad, 'butt'); });
    } else if (variant === 'spark') {
      K15_BASE.forEach(b => { out += line(b, 7, grad); });
      out += `<line x1="78.5" y1="16.6" x2="83.5" y2="12.8" stroke="#F24F13" stroke-width="3" stroke-linecap="round"/>`;
    }
    return out;
  }

  const K1544_VARIANTS = [
    ['base',     'lite',   'E1 · 基準 D3'],
    ['weight',   'lite',   'E2 · 加粗細階 9/6.5/4.5'],
    ['zerotail', 'lite',   'E3 · 尾全透、從零起'],
    ['taper',    'lite',   'E4 · 錐形條、全條同濃'],
    ['bowed',    'lite',   'E5 · 微弧 · 直彎之間'],
    ['cut',      'lite',   'E6 · 平切端'],
    ['base',     'deep',   'E7 · 深紫底反白'],
    ['spark',    'aurora', 'E8 · 極光底 + 橘火花'],
  ];

  function K1544_Board() {
    return (
      <div style={{ width: '100%', height: '100%', background: '#FFFFFF', padding: 16, display: 'flex', flexWrap: 'wrap', gap: 16, alignContent: 'flex-start', fontFamily: '-apple-system, "PingFang TC", sans-serif' }}>
        {K1544_VARIANTS.map(([variant, bg, label]) => (
          <div key={label} style={{ display: 'flex', flexDirection: 'column', gap: 6, alignItems: 'center', width: 132 }}>
            <div style={{ width: 120, height: 120, borderRadius: 120 * 0.224, overflow: 'hidden', border: '1px solid rgba(60,60,67,0.12)' }}>
              <svg viewBox="0 0 100 100" style={{ width: '100%', height: '100%', display: 'block' }} dangerouslySetInnerHTML={{ __html: K1544_art(variant, bg) }}/>
            </div>
            <div style={{ width: 44, height: 44, borderRadius: 44 * 0.224, overflow: 'hidden', border: '1px solid rgba(60,60,67,0.12)' }}>
              <svg viewBox="0 0 100 100" style={{ width: '100%', height: '100%', display: 'block' }} dangerouslySetInnerHTML={{ __html: K1544_art(variant, bg) }}/>
            </div>
            <div style={{ fontSize: 10, color: '#3a3a3c', textAlign: 'center', lineHeight: 1.35 }}>{label}</div>
          </div>
        ))}
      </div>
    );
  }

  // ── Family 7 · E5 再深化（微弧×純條內漸層軌） ──
  function E5_bowPath(b, k) {
    let ux = b[2] - b[0], uy = b[3] - b[1]; const L = Math.hypot(ux, uy);
    const mx = (b[0] + b[2]) / 2 - uy / L * k, my = (b[1] + b[3]) / 2 + ux / L * k;
    return { mx, my, px: -uy / L, py: ux / L };
  }
  function E5_bowLine(b, k, w, paint) {
    const { mx, my } = E5_bowPath(b, k);
    return `<path d="M ${b[0]},${b[1]} Q ${mx},${my} ${b[2]},${b[3]}" stroke="${paint}" stroke-width="${w}" stroke-linecap="round" fill="none" opacity="1"/>`;
  }
  // 微弧錐形：沿弧線的尾細頭粗、頭尾都用弧收
  function E5_bowTaper(b, k, wt, wh, paint) {
    const { mx, my, px, py } = E5_bowPath(b, k);
    const wm = (wt + wh) / 2 * 1.05, rh = wh / 2, rt = wt / 2;
    const aP = `${b[0] + px * rt},${b[1] + py * rt}`, aM = `${b[0] - px * rt},${b[1] - py * rt}`;
    const bP = `${b[2] + px * rh},${b[3] + py * rh}`, bM = `${b[2] - px * rh},${b[3] - py * rh}`;
    const mP = `${mx + px * wm / 2},${my + py * wm / 2}`, mM = `${mx - px * wm / 2},${my - py * wm / 2}`;
    return `<path d="M ${aP} Q ${mP} ${bP} A ${rh} ${rh} 0 0 0 ${bM} Q ${mM} ${aM} A ${rt} ${rt} 0 0 0 ${aP} Z" fill="${paint}" opacity="1"/>`;
  }

  function E5D_art(variant, bgKey) {
    const bg = K15_BGS[bgKey || 'lite'];
    const grad = bgKey === 'deep' ? 'url(#glFadeL)' : 'url(#glFadeP)';
    const grad0 = bgKey === 'deep' ? 'url(#glFadeL)' : 'url(#glFadeP0)';
    let out = `<defs>${K154_DEFS}</defs>` + bg.rect;
    if (variant === 'base') {
      K15_BASE.forEach(b => { out += E5_bowLine(b, 3.5, 7, grad); });
    } else if (variant === 'shallow') {
      K15_BASE.forEach(b => { out += E5_bowLine(b, 2, 7, grad); });
    } else if (variant === 'deepbow') {
      K15_BASE.forEach(b => { out += E5_bowLine(b, 5.5, 7, grad); });
    } else if (variant === 'weight') {
      const ws = [9, 6.5, 4.5];
      K15_BASE.forEach((b, i) => { out += E5_bowLine(b, 3.5, ws[i], grad); });
    } else if (variant === 'taper') {
      K15_BASE.forEach(b => { out += E5_bowTaper(b, 3.5, 2.5, 8.5, grad); });
    } else if (variant === 'zerotail') {
      K15_BASE.forEach(b => { out += E5_bowLine(b, 3.5, 7, grad0); });
    } else if (variant === 'spark') {
      K15_BASE.forEach(b => { out += E5_bowLine(b, 3.5, 7, grad); });
      out += `<line x1="78.5" y1="16.6" x2="83.5" y2="12.8" stroke="#F24F13" stroke-width="3" stroke-linecap="round"/>`;
    }
    return out;
  }

  const E5D_VARIANTS = [
    ['base',    'lite',   'F1 · 基準 E5 · 弧 3.5'],
    ['shallow', 'lite',   'F2 · 弧更淺 2'],
    ['deepbow', 'lite',   'F3 · 弧更深 5.5'],
    ['weight',  'lite',   'F4 · 微弧 + 粗細階'],
    ['taper',   'lite',   'F5 · 微弧錐形'],
    ['zerotail','lite',   'F6 · 尾全透'],
    ['base',    'deep',   'F7 · 深紫底反白'],
    ['spark',   'aurora', 'F8 · 極光底 + 橘火花'],
  ];

  function E5D_Board() {
    return (
      <div style={{ width: '100%', height: '100%', background: '#FFFFFF', padding: 16, display: 'flex', flexWrap: 'wrap', gap: 16, alignContent: 'flex-start', fontFamily: '-apple-system, "PingFang TC", sans-serif' }}>
        {E5D_VARIANTS.map(([variant, bg, label]) => (
          <div key={label} style={{ display: 'flex', flexDirection: 'column', gap: 6, alignItems: 'center', width: 132 }}>
            <div style={{ width: 120, height: 120, borderRadius: 120 * 0.224, overflow: 'hidden', border: '1px solid rgba(60,60,67,0.12)' }}>
              <svg viewBox="0 0 100 100" style={{ width: '100%', height: '100%', display: 'block' }} dangerouslySetInnerHTML={{ __html: E5D_art(variant, bg) }}/>
            </div>
            <div style={{ width: 44, height: 44, borderRadius: 44 * 0.224, overflow: 'hidden', border: '1px solid rgba(60,60,67,0.12)' }}>
              <svg viewBox="0 0 100 100" style={{ width: '100%', height: '100%', display: 'block' }} dangerouslySetInnerHTML={{ __html: E5D_art(variant, bg) }}/>
            </div>
            <div style={{ fontSize: 10, color: '#3a3a3c', textAlign: 'center', lineHeight: 1.35 }}>{label}</div>
          </div>
        ))}
      </div>
    );
  }

  // ── Family 8 · 角度掃描（E5 微弧基底、基準走勢約 37 度） ──
  const E5A_BASE_DEG = 37.24; // atan(38/50)
  function E5A_art(riseDeg, bgKey) {
    const bg = K15_BGS[bgKey || 'lite'];
    const grad = bgKey === 'deep' ? 'url(#glFadeL)' : 'url(#glFadeP)';
    const delta = E5A_BASE_DEG - riseDeg;
    // 旋轉後取外框重心、平移回 tile 正中、每檔各自置中
    const th = delta * Math.PI / 180, c = Math.cos(th), s = Math.sin(th);
    const rot = (x, y) => [46 + (x - 46) * c - (y - 53) * s, 53 + (x - 46) * s + (y - 53) * c];
    const pts = [];
    K15_BASE.forEach(b => {
      const A = rot(b[0], b[1]), B = rot(b[2], b[3]);
      const { mx, my } = E5_bowPath([A[0], A[1], B[0], B[1]], 3.5);
      pts.push(A, B);
      [0.25, 0.5, 0.75].forEach(t => {
        const u = 1 - t;
        pts.push([u * u * A[0] + 2 * u * t * mx + t * t * B[0], u * u * A[1] + 2 * u * t * my + t * t * B[1]]);
      });
    });
    const xs = pts.map(p => p[0]), ys = pts.map(p => p[1]);
    const dx = (50 - (Math.min(...xs) + Math.max(...xs)) / 2).toFixed(2);
    const dy = (50 - (Math.min(...ys) + Math.max(...ys)) / 2).toFixed(2);
    let bars = '';
    K15_BASE.forEach(b => { bars += E5_bowLine(b, 3.5, 7, grad); });
    return `<defs>${K154_DEFS}</defs>` + bg.rect +
      `<g transform="translate(${dx} ${dy}) rotate(${delta.toFixed(2)} 46 53)">${bars}</g>`;
  }

  const E5A_VARIANTS = [
    [0,  'G1 · 水平 0°'],
    [10, 'G2 · 10°'],
    [20, 'G3 · 20°'],
    [30, 'G4 · 30°'],
    [37, 'G5 · 基準 37°'],
    [45, 'G6 · 45°'],
  ];

  function E5A_Board() {
    return (
      <div style={{ width: '100%', height: '100%', background: '#FFFFFF', padding: 16, display: 'flex', flexWrap: 'wrap', gap: 16, alignContent: 'flex-start', fontFamily: '-apple-system, "PingFang TC", sans-serif' }}>
        {E5A_VARIANTS.map(([deg, label]) => (
          <div key={label} style={{ display: 'flex', flexDirection: 'column', gap: 6, alignItems: 'center', width: 132 }}>
            <div style={{ width: 120, height: 120, borderRadius: 120 * 0.224, overflow: 'hidden', border: '1px solid rgba(60,60,67,0.12)' }}>
              <svg viewBox="0 0 100 100" style={{ width: '100%', height: '100%', display: 'block' }} dangerouslySetInnerHTML={{ __html: E5A_art(deg) }}/>
            </div>
            <div style={{ width: 44, height: 44, borderRadius: 44 * 0.224, overflow: 'hidden', border: '1px solid rgba(60,60,67,0.12)' }}>
              <svg viewBox="0 0 100 100" style={{ width: '100%', height: '100%', display: 'block' }} dangerouslySetInnerHTML={{ __html: E5A_art(deg) }}/>
            </div>
            <div style={{ fontSize: 10, color: '#3a3a3c', textAlign: 'center', lineHeight: 1.35 }}>{label}</div>
          </div>
        ))}
      </div>
    );
  }

  function K15_Board() {
    return (
      <div style={{ width: '100%', height: '100%', background: '#FFFFFF', padding: 16, display: 'flex', flexWrap: 'wrap', gap: 16, alignContent: 'flex-start', fontFamily: '-apple-system, "PingFang TC", sans-serif' }}>
        {K15_VARIANTS.map(([variant, bg, label]) => (
          <div key={label} style={{ display: 'flex', flexDirection: 'column', gap: 6, alignItems: 'center', width: 132 }}>
            <K15_Tile variant={variant} bg={bg} size={120}/>
            <K15_Tile variant={variant} bg={bg} size={44}/>
            <div style={{ fontSize: 10, color: '#3a3a3c', textAlign: 'center', lineHeight: 1.35 }}>{label}</div>
          </div>
        ))}
      </div>
    );
  }

  function AppIconGlideRefinementSection() {
    return (
      <DCSection id="app-icon-glide-refinement"
        title="App Icon · Axis 6 — 深化場（Glide + K15）"
        subtitle="兩條深化軌：v1 書法掠 Glide 翻案深化（Axis 1 狀態已同步註記）、Axis 5 因子表 K15 直棒三條深化。Glide 為參數化 Lab（角度/裂點/密度/底色）、K15 為八變體。先驗生死關：44px 是存亡線。Open question · 2026-07-06。">
        <DCFamily id="glr-survival" title="1 · 生死關" subtitle="現參數尺寸階梯 180 → 44、深淺桌布 60px 情境。看飛白與橘絲在小尺寸還剩多少。">
          <DCArtboard id="glr-ramp" label="尺寸階梯 · 現參數" width={620} height={260}>
            <GL_SizeRamp/>
          </DCArtboard>
          <DCArtboard id="glr-wall" label="桌布情境 · 上深下淺 · 60px · 淺深兩底並排" width={520} height={300}>
            <GL_WallMock/>
          </DCArtboard>
        </DCFamily>
        <DCFamily id="glr-angle" title="2 · 方向軸" subtitle="因子實驗結論：斜升 energy 較好。0° 為 v1 原版。">
          <DCArtboard id="glr-angles" label="0° / -12° / -20°" width={620} height={300}>
            <GL_AngleBoard/>
          </DCArtboard>
        </DCFamily>
        <DCFamily id="glr-factor" title="3 · 小因子表" subtitle="tailStart 裂點 × 飛白密度、三種底各一板。deep 底自動換淺筆、飛白露深底。">
          <DCArtboard id="glr-f-lite" label="淺底 F2F2F7" width={420} height={290}>
            <GL_FactorBoard bg="lite"/>
          </DCArtboard>
          <DCArtboard id="glr-f-deep" label="深紫底 2A1660" width={420} height={290}>
            <GL_FactorBoard bg="deep"/>
          </DCArtboard>
          <DCArtboard id="glr-f-aurora" label="極光漸層底" width={420} height={290}>
            <GL_FactorBoard bg="aurora"/>
          </DCArtboard>
        </DCFamily>
        <DCFamily id="glr-k15" title="4 · K15 深化" subtitle="Axis 5 的 K15（多條×深淺×直棒×無暈×斜升）八個深化變體。每案附 120 與 44 兩級。">
          <DCArtboard id="glr-k15-board" label="K15 八變體 · 120 + 44" width={620} height={460}>
            <K15_Board/>
          </DCArtboard>
        </DCFamily>
        <DCFamily id="glr-k154" title="5 · K15-4 再深化" subtitle="條內漸層軌的八變體：尾透程度、有無條間階、粗細階、錐形條、平切端、深底反白、橘火花。每案附 120 與 44 兩級。">
          <DCArtboard id="glr-k154-board" label="K15-4 八變體 · 120 + 44" width={620} height={460}>
            <K154_Board/>
          </DCArtboard>
        </DCFamily>
        <DCFamily id="glr-k1544" title="6 · D3 再深化" subtitle="純條內漸層軌（無條間階、全條同濃）的八變體：粗細階有無、尾透、錐形、微弧、平切端、深底、極光加橘。每案附 120 與 44 兩級。">
          <DCArtboard id="glr-k1544-board" label="D3 八變體 · 120 + 44" width={620} height={460}>
            <K1544_Board/>
          </DCArtboard>
        </DCFamily>
        <DCFamily id="glr-e5d" title="7 · E5 再深化" subtitle="微弧×純條內漸層軌的八變體：弧度掃描 2/3.5/5.5、粗細階、微弧錐形、尾全透、深底、極光加橘。每案附 120 與 44 兩級。">
          <DCArtboard id="glr-e5d-board" label="E5 八變體 · 120 + 44" width={620} height={460}>
            <E5D_Board/>
          </DCArtboard>
        </DCFamily>
        <DCFamily id="glr-e5a" title="8 · 角度掃描" subtitle="E5 微弧基底、走勢角六檔：0 / 10 / 20 / 30 / 37 基準 / 45。條內漸層隨整組旋轉、fade 方向跟著走勢。每案附 120 與 44 兩級。">
          <DCArtboard id="glr-e5a-board" label="角度六檔 · 120 + 44" width={620} height={460}>
            <E5A_Board/>
          </DCArtboard>
        </DCFamily>
      </DCSection>
    );
  }

  Object.assign(window, { AppIconGlideRefinementSection, GlideIcon, GL_render });
})();
