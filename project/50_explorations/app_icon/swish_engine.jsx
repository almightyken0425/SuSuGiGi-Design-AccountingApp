// ─────────────────────────────────────────────────────────────
// App Icon Exploration · Swish Icon Engine
//
// 三版 app icon 提案共用的 Canvas 繪製引擎。
// 每個 icon 是一道帶速度感的紫色筆勢 / 形態，橘只一絲，灰底 squircle。
//
// 對外提供（掛到 window）：
//   <SwishIcon cfg="morph" size={200}/>  — React 組件，畫一個 icon
//   SWISH_RENDER(canvas, key, progress)  — 底層繪製函式（progress 0..1）
//
// CFG 分三組：
//   書法飛白 (v1)：glide / stroke / loop / drop / weave
//   非書法速度 (v2)：morph / flow / comet / glow
//   六形態 (v3)：morph / glide / draw / wisp / echo / arc（morph=v2, glide=v1）
//
// 色：紫 #4323A0 主體、橘 #F24F13 一絲、底 #F2F2F7。
// ─────────────────────────────────────────────────────────────
(function () {
  "use strict";

  function mulberry32(a) {
    return function () {
      a |= 0; a = (a + 0x6D2B79F5) | 0;
      let t = Math.imul(a ^ (a >>> 15), 1 | a);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }
  function buildSamples(pts) {
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
  function widthAt(prof, t) {
    for (let i = 1; i < prof.length; i++) {
      if (t <= prof[i][0]) { const a = prof[i - 1], b = prof[i]; const f = (t - a[0]) / (b[0] - a[0] || 1); return a[1] + (b[1] - a[1]) * f; }
    }
    return prof[prof.length - 1][1];
  }
  function noiseTable(rng, n) { const t = []; for (let i = 0; i < n; i++) t.push(rng() * 2 - 1); return t; }
  function sampleNoise(tbl, u) {
    const x = u * (tbl.length - 1), i = Math.floor(x), f = x - i;
    const a = tbl[i], b = tbl[Math.min(i + 1, tbl.length - 1)]; const s = f * f * (3 - 2 * f);
    return a + (b - a) * s;
  }
  function sampleAtT(samp, t) { let best = samp[0], bd = 9; for (let i = 0; i < samp.length; i++) { const d = Math.abs(samp[i][2] - t); if (d < bd) { bd = d; best = samp[i]; } } return best; }
  function hexToRgb(h) { return [parseInt(h.slice(1, 3), 16), parseInt(h.slice(3, 5), 16), parseInt(h.slice(5, 7), 16)]; }
  function lerpColor(a, b, t) { const A = hexToRgb(a), B = hexToRgb(b); return "rgb(" + Math.round(A[0] + (B[0] - A[0]) * t) + "," + Math.round(A[1] + (B[1] - A[1]) * t) + "," + Math.round(A[2] + (B[2] - A[2]) * t) + ")"; }
  function normalAt(samp, i) { const a = samp[Math.max(0, i - 1)], b = samp[Math.min(samp.length - 1, i + 1)]; let tx = b[0] - a[0], ty = b[1] - a[1]; const l = Math.hypot(tx, ty) || 1; tx /= l; ty /= l; return [-ty, tx]; }

  function squircle(ctx, s) {
    const a = s / 2, n = 4.2, N = 72; ctx.beginPath();
    for (let i = 0; i <= N; i++) {
      const th = i / N * Math.PI * 2, c = Math.cos(th), si = Math.sin(th);
      const x = a + a * Math.sign(c) * Math.pow(Math.abs(c), 2 / n);
      const y = a + a * Math.sign(si) * Math.pow(Math.abs(si), 2 / n);
      i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
    }
    ctx.closePath();
  }

  function layPath(ctx, samp, opts) {
    const S = opts.S, prog = opts.progress, prof = opts.prof;
    const nz = opts.noise, nzAmt = opts.nzAmt || 0, aProf = opts.alpha, col = opts.color;
    for (let i = 0; i < samp.length; i++) {
      const p = samp[i], t = p[2]; if (t > prog) break;
      let w = widthAt(prof, t); if (nzAmt) w += sampleNoise(nz, t) * nzAmt;
      const r = Math.max(0.1, w * 0.5) * S;
      ctx.globalAlpha = aProf ? widthAt(aProf, t) : 1;
      ctx.fillStyle = typeof col === "function" ? col(t) : col;
      ctx.beginPath(); ctx.arc(p[0] * S, p[1] * S, r, 0, 6.2832); ctx.fill();
    }
    ctx.globalAlpha = 1;
  }

  // 飛白（書法收筆）：白絲 destination-out 露底，少數橘絲 source-over 藏其中
  function flybai(ctx, samp, prof, opts) {
    const S = opts.S, prog = opts.progress, rng = opts.rng, tailStart = opts.tailStart;
    ctx.save(); ctx.lineCap = "round";
    for (let i = 1; i < samp.length; i++) {
      const p = samp[i], pp = samp[i - 1], t = p[2];
      if (t < tailStart || t > prog) continue;
      let tx = p[0] - pp[0], ty = p[1] - pp[1]; const tl = Math.hypot(tx, ty) || 1; tx /= tl; ty /= tl;
      const nx = -ty, ny = tx, w = widthAt(prof, t);
      const local = (t - tailStart) / (1 - tailStart);
      const streaks = 1 + Math.floor(local * 3.5);
      for (let k = 0; k < streaks; k++) {
        if (rng() > 0.5 + local * 0.4) continue;
        const off = (rng() * 2 - 1) * w * 0.44 * S;
        const cx = p[0] * S + nx * off, cy = p[1] * S + ny * off;
        const seg = (1.6 + rng() * 3.4) * S, lw = (0.32 + rng() * 0.7) * S;
        if (rng() < 0.2) { ctx.globalCompositeOperation = "source-over"; ctx.strokeStyle = "#F24F13"; ctx.globalAlpha = 0.78 + rng() * 0.22; }
        else { ctx.globalCompositeOperation = "destination-out"; ctx.globalAlpha = 0.55 + rng() * 0.45; }
        ctx.lineWidth = lw;
        ctx.beginPath(); ctx.moveTo(cx - tx * seg * 0.5, cy - ty * seg * 0.5); ctx.lineTo(cx + tx * seg * 0.5, cy + ty * seg * 0.5); ctx.stroke();
      }
    }
    ctx.restore();
  }

  function orangeAlong(ctx, samp, prof, S, prog, lo, hi, rad, offset) {
    for (let i = 0; i < samp.length; i++) {
      const p = samp[i], t = p[2];
      if (t < lo || t > hi || t > prog) continue;
      const w = widthAt(prof, t), n = normalAt(samp, i);
      const ox = offset ? n[0] * w * offset * S : 0, oy = offset ? n[1] * w * offset * S : 0;
      ctx.fillStyle = "#F24F13"; ctx.globalAlpha = 0.86;
      ctx.beginPath(); ctx.arc(p[0] * S + ox, p[1] * S + oy, Math.max(0.1, w * rad) * S, 0, 6.2832); ctx.fill();
    }
    ctx.globalAlpha = 1;
  }
  function volumeHighlight(ctx, samp, prof, S, at) {
    const hs = sampleAtT(samp, at), w = widthAt(prof, at) * S;
    const hx = hs[0] * S - w * 0.10, hy = hs[1] * S - w * 0.24;
    const g = ctx.createRadialGradient(hx, hy, 0, hx, hy, w * 0.66);
    g.addColorStop(0, "rgba(150,126,226,0.5)"); g.addColorStop(1, "rgba(150,126,226,0)");
    ctx.fillStyle = g; ctx.beginPath(); ctx.arc(hx, hy, w * 0.66, 0, 6.2832); ctx.fill();
  }

  function drawCalligraphy(ctx, st, S, prog) {
    layPath(ctx, st._samp, { S, progress: prog, prof: st.prof, color: "#4323A0", noise: st._nz, nzAmt: 0.5 });
    flybai(ctx, st._samp, st.prof, { S, progress: prog, rng: mulberry32(st._seed), tailStart: st.tailStart });
  }
  function drawMorph(ctx, st, S, prog) {
    layPath(ctx, st._samp, { S, progress: prog, prof: st.prof, color: "#4323A0", noise: st._nz, nzAmt: 0.5 });
    if (prog > st.head) volumeHighlight(ctx, st._samp, st.prof, S, st.head);
    orangeAlong(ctx, st._samp, st.prof, S, prog, st.tail, 1, 0.32, 0);
  }
  function drawComet(ctx, st, S, prog) {
    layPath(ctx, st._samp, { S, progress: prog, prof: st.prof, color: "#4323A0", alpha: st.alpha, noise: st._nz, nzAmt: 0.35 });
    orangeAlong(ctx, st._samp, st.prof, S, prog, 0, st.head, 0.15, 0.3);
  }
  function drawStrands(ctx, st, S, prog) {
    layPath(ctx, st._samp, { S, progress: prog, prof: st.prof, color: "#4323A0", noise: st._nz, nzAmt: 0.4 });
    st._strands.forEach(sd => layPath(ctx, sd.samp, { S, progress: prog, prof: sd.prof, color: "#4323A0", alpha: sd.alpha }));
    orangeAlong(ctx, st._samp, st.prof, S, prog, 0, st.head, 0.15, 0.3);
  }
  function drawFlow(ctx, st, S, prog) {
    const col = (t) => { const m = 0.5 + 0.5 * Math.sin(t * Math.PI * 1.5 - 0.5); return lerpColor("#331982", "#5a40c2", m); };
    layPath(ctx, st._samp, { S, progress: prog, prof: st.prof, color: col });
    for (let i = 0; i < st._samp.length; i++) {
      const p = st._samp[i], t = p[2];
      if (t < st.thread[0] || t > st.thread[1] || t > prog) continue;
      const w = widthAt(st.prof, t), n = normalAt(st._samp, i);
      ctx.fillStyle = "#F24F13"; ctx.globalAlpha = 0.85;
      ctx.beginPath(); ctx.arc(p[0] * S + n[0] * w * 0.2 * S, p[1] * S + n[1] * w * 0.2 * S, 1.15 * S, 0, 6.2832); ctx.fill();
    }
    ctx.globalAlpha = 1;
  }
  function drawEcho(ctx, st, S, prog) {
    const samp = st._samp, cx = st.cx * S, cy = st.cy * S;
    const tip = samp[samp.length - 1], hd = samp[0];
    let dx = tip[0] - hd[0], dy = tip[1] - hd[1]; const dl = Math.hypot(dx, dy) || 1; dx /= dl; dy /= dl;
    ctx.save();
    ctx.translate(dx * st.echoGap * S, dy * st.echoGap * S);
    ctx.translate(cx, cy); ctx.scale(st.echoScale, st.echoScale); ctx.translate(-cx, -cy);
    layPath(ctx, samp, { S, progress: prog, prof: st.prof, color: "#4323A0", alpha: [[0, 0.28], [1, 0.28]] });
    ctx.restore();
    layPath(ctx, samp, { S, progress: prog, prof: st.prof, color: "#4323A0", noise: st._nz, nzAmt: 0.5 });
    if (prog > st.head) volumeHighlight(ctx, samp, st.prof, S, st.head);
    orangeAlong(ctx, samp, st.prof, S, prog, st.tail, 1, 0.32, 0);
  }
  function drawGlow(ctx, cfg, S, prog) {
    cfg.blobs.forEach(b => {
      ctx.save();
      ctx.translate(b.x * S, b.y * S); ctx.rotate(b.rot); ctx.scale(b.sx, 1); ctx.translate(-b.x * S, -b.y * S);
      const g = ctx.createRadialGradient(b.x * S, b.y * S, 0, b.x * S, b.y * S, b.r * S);
      g.addColorStop(0, "rgba(67,35,160," + (b.a * prog).toFixed(3) + ")");
      g.addColorStop(0.55, "rgba(71,40,168," + (b.a * 0.5 * prog).toFixed(3) + ")");
      g.addColorStop(1, "rgba(80,52,180,0)");
      ctx.fillStyle = g; ctx.beginPath(); ctx.arc(b.x * S, b.y * S, b.r * S, 0, 6.2832); ctx.fill();
      ctx.restore();
    });
    const s = cfg.spark, gx = s.x * S, gy = s.y * S;
    const og = ctx.createRadialGradient(gx, gy, 0, gx, gy, s.r * S);
    og.addColorStop(0, "rgba(242,79,19," + (s.a * prog).toFixed(3) + ")");
    og.addColorStop(1, "rgba(242,79,19,0)");
    ctx.fillStyle = og; ctx.beginPath(); ctx.arc(gx, gy, s.r * S, 0, 6.2832); ctx.fill();
  }

  const CFG = {
    // ── 書法飛白 (v1) ──
    glide:  { type: "cal", seed: 7,  strokes: [{ pts: [[26, 66], [45, 64], [65, 57], [84, 47], [98, 39]], prof: [[0, 11], [0.26, 12], [0.58, 8], [0.84, 3.6], [1, 1.2]], tailStart: 0.6 }] },
    stroke: { type: "cal", seed: 23, strokes: [{ pts: [[38, 29], [47, 43], [57, 59], [70, 75], [90, 88]], prof: [[0, 2.8], [0.25, 7], [0.58, 13], [0.75, 8.5], [0.9, 3.2], [1, 0.9]], tailStart: 0.64 }] },
    loop:   { type: "cal", seed: 41, strokes: [{ pts: [[73, 41], [54, 34], [37, 51], [45, 74], [69, 77], [81, 58], [65, 48]], prof: [[0, 7], [0.2, 9], [0.5, 8], [0.76, 6], [0.9, 2.8], [1, 1.3]], tailStart: 0.74 }] },
    drop:   { type: "cal", seed: 58, strokes: [{ pts: [[55, 25], [61, 42], [57.5, 61], [62, 79], [58.5, 94]], prof: [[0, 12.5], [0.16, 12.5], [0.5, 8.5], [0.78, 4], [1, 1.1]], tailStart: 0.58 }] },
    weave:  { type: "cal", seed: 90, strokes: [
      { pts: [[29, 77], [52, 64], [72, 51], [91, 42]], prof: [[0, 10], [0.3, 10.5], [0.65, 6.5], [0.88, 2.8], [1, 1.2]], tailStart: 0.64 },
      { pts: [[53, 35], [59, 50], [66, 66], [75, 82]], prof: [[0, 5], [0.35, 5.5], [0.7, 3.6], [1, 1.1]], tailStart: 0.6 }
    ] },

    // ── 非書法速度 (v2) ──
    morph: { type: "morph", seed: 5, strokes: [{ pts: [[47, 69], [62, 57], [77, 47], [90, 39]], prof: [[0, 18], [0.22, 18], [0.55, 13], [0.82, 6.5], [1, 1]], head: 0.13, tail: 0.85 }] },
    flow:  { type: "flow", seed: 15, strokes: [{ pts: [[25, 59], [47, 49], [69, 63], [91, 48]], prof: [[0, 1], [0.12, 10], [0.5, 11.5], [0.88, 9.5], [1, 1]], thread: [0.45, 0.57] }] },
    comet: { type: "comet", seed: 33, strokes: [{ pts: [[92, 38], [74, 48], [54, 61], [33, 76]], prof: [[0, 15], [0.12, 15], [0.5, 8], [1, 1.2]], alpha: [[0, 1], [0.28, 0.9], [0.6, 0.4], [1, 0.03]], head: 0.05 }] },
    glow:  { type: "glow", seed: 0, blobs: [
      { x: 51, y: 63, r: 25, a: 0.5, sx: 1.7, rot: -0.52 },
      { x: 62, y: 53, r: 19, a: 0.44, sx: 1.7, rot: -0.52 },
      { x: 73, y: 44, r: 12.5, a: 0.34, sx: 1.6, rot: -0.52 },
      { x: 41, y: 72, r: 17, a: 0.30, sx: 1.5, rot: -0.52 }
    ], spark: { x: 71, y: 45, r: 6.5, a: 0.6 } },

    // ── 六形態新增 (v3) ──
    draw: { type: "strands", seed: 20, strokes: [{
      pts: [[87, 50], [69, 53], [53, 56], [41, 59]],
      prof: [[0, 15], [0.15, 15], [0.5, 9], [0.8, 4], [1, 1.3]], head: 0.05,
      strands: [
        { pts: [[55, 56], [42, 53], [30, 51]], prof: [[0, 3.6], [0.5, 2.2], [1, 0.5]], alpha: [[0, 0.85], [0.5, 0.5], [1, 0.12]] },
        { pts: [[54, 58], [40, 62], [28, 66]], prof: [[0, 3.2], [0.5, 2], [1, 0.5]], alpha: [[0, 0.8], [0.5, 0.45], [1, 0.1]] }
      ]
    }] },
    wisp: { type: "comet", seed: 44, strokes: [{ pts: [[24, 54], [48, 49], [72, 48], [96, 43]], prof: [[0, 11], [0.1, 11], [0.5, 7.5], [1, 1.4]], alpha: [[0, 1], [0.3, 0.82], [0.7, 0.42], [1, 0.05]], head: 0.06 }] },
    echo: { type: "echo", seed: 12, strokes: [{ pts: [[44, 68], [60, 57], [76, 47], [90, 39]], prof: [[0, 15], [0.2, 15], [0.55, 11], [0.82, 6], [1, 1.2]], head: 0.13, tail: 0.85, cx: 60, cy: 52, echoGap: 19, echoScale: 0.6 }] },
    arc: { type: "flow", seed: 15, strokes: [{ pts: [[23, 50], [45, 64], [72, 62], [97, 47]], prof: [[0, 1], [0.12, 10], [0.5, 11], [0.88, 9], [1, 1]], thread: [0.8, 0.92] }] }
  };

  function prep(cfg) {
    if (cfg._ready) return;
    if (cfg.strokes) cfg.strokes.forEach((s, i) => {
      s._samp = buildSamples(s.pts);
      s._nz = noiseTable(mulberry32(cfg.seed * 3 + i * 17), 40);
      s._seed = cfg.seed + i * 101;
      if (s.strands) s._strands = s.strands.map(sd => ({ prof: sd.prof, alpha: sd.alpha, samp: buildSamples(sd.pts) }));
    });
    cfg._ready = true;
  }

  function render(canvas, key, progress) {
    const cfg = CFG[key]; if (!cfg || !canvas) return; prep(cfg);
    const dpr = Math.min(window.devicePixelRatio || 1, 2.5);
    const size = canvas.clientWidth || parseInt(canvas.getAttribute("width"), 10) || 200;
    canvas.width = Math.round(size * dpr); canvas.height = Math.round(size * dpr);
    const ctx = canvas.getContext("2d"); ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, size, size); const S = size / 120;
    squircle(ctx, size); ctx.clip();
    ctx.fillStyle = "#F2F2F7"; ctx.fillRect(0, 0, size, size);
    if (cfg.type === "glow") { drawGlow(ctx, cfg, S, progress); return; }
    cfg.strokes.forEach(st => {
      if (cfg.type === "cal") drawCalligraphy(ctx, st, S, progress);
      else if (cfg.type === "morph") drawMorph(ctx, st, S, progress);
      else if (cfg.type === "comet") drawComet(ctx, st, S, progress);
      else if (cfg.type === "strands") drawStrands(ctx, st, S, progress);
      else if (cfg.type === "flow") drawFlow(ctx, st, S, progress);
      else if (cfg.type === "echo") drawEcho(ctx, st, S, progress);
    });
  }

  // React 組件：畫一個 icon。explorations 靜態展示，progress 固定 1。
  function SwishIcon({ cfg, size = 200 }) {
    const ref = React.useRef(null);
    React.useEffect(() => { if (ref.current) render(ref.current, cfg, 1); }, [cfg, size]);
    return React.createElement("canvas", {
      ref: ref, width: size, height: size,
      style: { width: size, height: size, borderRadius: "22.37%", display: "block" }
    });
  }

  Object.assign(window, { SwishIcon: SwishIcon, SWISH_RENDER: render, SWISH_CFG: CFG });
})();
