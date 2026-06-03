// ─────────────────────────────────────────────────────────────
// Exploration · Undo Bar · Segmented Pill
//
// sim-review 回饋：現況 undo bar 是單一 208×72 glass pill，[倒數圈][訊息][X]
// 三者擠在固定寬度裡，訊息「已刪除交易」被 flex 壓到截斷成「已刪除…」。
//
// 提案：拆成 nested pill — 外層一個 glass pill 包住兩個內 pill：
//   pill A = [倒數 + 文字]   → undo 本體，點擊復原（executeUndo）
//   pill B = [取消]          → 關閉、不復原（closeUndo）
// 外層寬度 auto-fit 內容，訊息完整顯示、不截斷。
//
// 比較軸：取消用 X icon 或「取消」文字、內 pill 用實色填底或巢狀 glass、倒數圈實心或外框。
// 互動語意（點 A 復原 / 點 B 關閉）待選定後落 spec 與 impl，本檔只提案長相。
// ─────────────────────────────────────────────────────────────

// ---- 共用 frame（避免依賴 CompFrame，自帶 bg 與字體）----
function SPB_Frame({ children, style = {} }) {
  return (
    <div style={{
      width: '100%', height: '100%', position: 'relative', overflow: 'hidden',
      background: TOKENS.bg, color: TOKENS.ink,
      fontFamily: '-apple-system, "SF Pro Text", "PingFang TC", "Noto Sans TC", system-ui, sans-serif',
      ...style,
    }}>{children}</div>
  );
}

// ---- 淺色假首頁 backdrop：讓 glass 模糊有東西可糊 + undo bar 釘底置中 ----
const SPB_SAMPLE = [
  { name: '路易莎咖啡', sub: '國泰世華 信用卡', amt: '-NT$185', c: '#C9A227' },
  { name: '便當',       sub: '現金',            amt: '-NT$120', c: '#4CAF50' },
  { name: '捷運月票',   sub: '國泰世華 信用卡', amt: '-NT$32',  c: '#2196F3' },
  { name: 'Netflix',    sub: 'USD 旅費',        amt: '-US$15',  c: '#F44336' },
  { name: '居酒屋',     sub: '國泰世華 信用卡', amt: '-NT$780', c: '#9C27B0' },
];
function SPB_Backdrop({ children }) {
  const rows = Array.from({ length: 9 }, (_, i) => SPB_SAMPLE[i % SPB_SAMPLE.length]);
  return (
    <SPB_Frame>
      <div style={{ padding: 16 }}>
        <div style={{
          height: 92, borderRadius: RADIUS.lg, background: TOKENS.surface, marginBottom: 16,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: TOKENS.ink2, fontSize: 13, fontWeight: TYPOGRAPHY.weight.medium,
        }}>餘額 · NT$62,615</div>
        <div style={{ borderRadius: RADIUS.lg, background: TOKENS.surface, overflow: 'hidden' }}>
          {rows.map((r, i) => (
            <div key={i} style={{
              display: 'flex', alignItems: 'center', gap: 12, padding: '11px 14px',
              borderTop: i ? `1px solid ${TOKENS.border}` : 'none',
            }}>
              <div style={{ width: 34, height: 34, borderRadius: 17, background: r.c, opacity: 0.85, flexShrink: 0 }}/>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 15, color: TOKENS.ink, fontWeight: TYPOGRAPHY.weight.medium }}>{r.name}</div>
                <div style={{ fontSize: 12, color: TOKENS.ink2 }}>{r.sub}</div>
              </div>
              <div style={{ fontSize: 15, color: TOKENS.ink, fontVariantNumeric: 'tabular-nums' }}>{r.amt}</div>
            </div>
          ))}
        </div>
      </div>
      <div style={{ position: 'absolute', left: 0, right: 0, bottom: SPACING.xl, display: 'flex', justifyContent: 'center' }}>
        {children}
      </div>
    </SPB_Frame>
  );
}

// ---- 倒數元素：實心圈（沿用現況 token）或外框圈 ----
function SPB_Timer({ remaining = 4, size = 32, ring = false }) {
  return (
    <div style={{
      width: size, height: size, borderRadius: size / 2, flexShrink: 0,
      background: ring ? 'transparent' : 'rgba(0,0,0,0.06)',
      border: ring ? `1.5px solid ${TOKENS.p500}` : 'none',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
    }}>
      <span style={{ fontSize: 14, fontWeight: TYPOGRAPHY.weight.medium, color: ring ? TOKENS.p500 : TOKENS.ink }}>{remaining}</span>
    </div>
  );
}

// ---- 內 pill 殼：實色填底 / 巢狀 glass ----
function SPB_InnerSolid({ children, tint, style = {} }) {
  return (
    <div style={{ height: 48, borderRadius: RADIUS.full, background: tint, display: 'flex', alignItems: 'center', ...style }}>
      {children}
    </div>
  );
}
function SPB_InnerGlass({ children, style = {} }) {
  return (
    <GlassView pill style={{ height: 48, display: 'flex', alignItems: 'center', ...style }}>{children}</GlassView>
  );
}

const SPB_MSG = { fontSize: TYPOGRAPHY.size.base, fontWeight: TYPOGRAPHY.weight.medium, color: TOKENS.ink, whiteSpace: 'nowrap' };

// ---- V1 · Baseline 現況：單一 pill，訊息被壓到截斷 ----
function SPB_BarBaseline({ message = '已刪除交易', remaining = 4 }) {
  return (
    <GlassView pill style={{ width: 208, height: 72 }}>
      <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: `0 ${SPACING.sm}px` }}>
        <div style={{ width: 56, display: 'flex', justifyContent: 'center' }}><SPB_Timer remaining={remaining}/></div>
        <span style={{ flex: 1, margin: '0 8px', textAlign: 'center', overflow: 'hidden', textOverflow: 'ellipsis', ...SPB_MSG }}>{message}</span>
        <div style={{ width: 56, display: 'flex', justifyContent: 'center' }}><Glyph name="x" size={ICON_SIZE.md} color={TOKENS.p500} stroke={2.4}/></div>
      </div>
    </GlassView>
  );
}

// ---- 外層 segmented 殼 ----
function SPB_Outer({ children }) {
  return (
    <GlassView pill style={{ height: 56, display: 'flex', alignItems: 'center', gap: SPACING.xs, padding: SPACING.xs }}>
      {children}
    </GlassView>
  );
}

// ---- V2 · Segmented · X icon · 實色內 pill ----
function SPB_BarV2({ message = '已刪除交易', remaining = 4 }) {
  return (
    <SPB_Outer>
      <SPB_InnerSolid tint="rgba(255,255,255,0.62)" style={{ paddingLeft: 8, paddingRight: 16, gap: 8 }}>
        <SPB_Timer remaining={remaining}/>
        <span style={SPB_MSG}>{message}</span>
      </SPB_InnerSolid>
      <SPB_InnerSolid tint="rgba(118,118,128,0.12)" style={{ width: 48, justifyContent: 'center' }}>
        <Glyph name="x" size={ICON_SIZE.md} color={TOKENS.ink} stroke={2.4}/>
      </SPB_InnerSolid>
    </SPB_Outer>
  );
}

// ---- V3 · Segmented · 取消 文字 · 實色內 pill ----
function SPB_BarV3({ message = '已刪除交易', remaining = 4 }) {
  return (
    <SPB_Outer>
      <SPB_InnerSolid tint="rgba(255,255,255,0.62)" style={{ paddingLeft: 8, paddingRight: 16, gap: 8 }}>
        <SPB_Timer remaining={remaining}/>
        <span style={SPB_MSG}>{message}</span>
      </SPB_InnerSolid>
      <SPB_InnerSolid tint="rgba(118,118,128,0.12)" style={{ paddingLeft: 18, paddingRight: 18, justifyContent: 'center' }}>
        <span style={{ ...SPB_MSG, color: TOKENS.ink2 }}>取消</span>
      </SPB_InnerSolid>
    </SPB_Outer>
  );
}

// ---- V4 · Segmented · X icon · 巢狀 glass · 外框倒數 ----
function SPB_BarV4({ message = '已刪除交易', remaining = 4 }) {
  return (
    <SPB_Outer>
      <SPB_InnerGlass style={{ paddingLeft: 8, paddingRight: 16, gap: 8 }}>
        <SPB_Timer remaining={remaining} size={28} ring/>
        <span style={SPB_MSG}>{message}</span>
      </SPB_InnerGlass>
      <SPB_InnerGlass style={{ width: 48, justifyContent: 'center' }}>
        <Glyph name="x" size={ICON_SIZE.md} color={TOKENS.p500} stroke={2.4}/>
      </SPB_InnerGlass>
    </SPB_Outer>
  );
}

// ─── Section ─────────────────────────────────────────────────
function UndoBarSegmentedPillSection() {
  const W = 402, H = 720;
  return (
    <DCSection id="undo-bar-segmented-pill"
      title="Undo Bar · Segmented Pill 提案"
      subtitle="現況單一 pill 把訊息壓到截斷成「已刪除…」。提案拆成 nested pill：外層 glass pill 包住 [倒數+文字] pill 與 [取消] pill，外寬 auto-fit、訊息完整。比較取消用 X 或「取消」、內 pill 實色或巢狀 glass。互動：點 [倒數+文字] 復原、點 [取消] 關閉，選定後落 impl。">
      <DCArtboard id="spb-v1-baseline" label="V1 · Baseline 現況（訊息截斷成 已刪除…）" width={W} height={H}>
        <SPB_Backdrop><SPB_BarBaseline/></SPB_Backdrop>
      </DCArtboard>
      <DCArtboard id="spb-v2-icon-solid" label="V2 · Segmented · X icon · 實色內 pill" width={W} height={H}>
        <SPB_Backdrop><SPB_BarV2/></SPB_Backdrop>
      </DCArtboard>
      <DCArtboard id="spb-v3-text-solid" label="V3 · Segmented · 取消 文字 · 實色內 pill" width={W} height={H}>
        <SPB_Backdrop><SPB_BarV3/></SPB_Backdrop>
      </DCArtboard>
      <DCArtboard id="spb-v4-nested-glass" label="V4 [採用] · Segmented · X icon · 巢狀 glass · 外框倒數" width={W} height={H}>
        <SPB_Backdrop><SPB_BarV4/></SPB_Backdrop>
      </DCArtboard>
      <DCArtboard id="spb-msg-lengths" label="訊息長度檢查 · 三種訊息皆不截斷（V2 樣式）" width={W} height={H}>
        <SPB_Frame style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 20 }}>
          <SPB_BarV2 message="已刪除交易"/>
          <SPB_BarV2 message="已刪除帳戶"/>
          <SPB_BarV2 message="合併完成"/>
        </SPB_Frame>
      </DCArtboard>
    </DCSection>
  );
}

Object.assign(window, { UndoBarSegmentedPillSection });
