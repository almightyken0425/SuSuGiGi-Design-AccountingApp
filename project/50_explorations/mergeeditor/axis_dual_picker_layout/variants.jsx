// ─────────────────────────────────────────────────────────────
// Exploration · MergeEditor · Axis · Dual Picker Layout
//
// 把 MergeEditor 的「來源 / 目標」兩 selector 從現況的 modal-in-modal
// （點 selector 再彈 WheelPickerModal）改成 TransferEditor 那種雙 inline
// static wheel picker。本軸探索三件事：
//   1. 雙 picker 排版方向 — 橫向並排 → vs 縱向上下疊 ↓
//   2. 要不要保留頂部 source → target 視覺化列（picker 自身已顯示選擇）
//   3. 衝突態 — 來源與目標相同時的紅框 + 完成停用
//
// 互動模型（已與使用者確認，本軸只演示視覺，不演示互動）：
//   source picker 列全部、可任選；target picker 只列與 source 相容的子集
//   （類別同 type、帳戶同幣別）；相同 → 完成停用。本軸用 category mode 示意。
//
// 落地後 box 抽成共用 component token（dual-picker-box），TransferEditor
// 與 MergeEditor 共用同一真相；本探索階段先用 atomic token inline。
// ─────────────────────────────────────────────────────────────

// ─── Shared mock state（category mode 示意） ─────────────────
const MDP_SOURCE = CAT_BY_ID.food;   // 飲食（expense）
const MDP_TARGET = CAT_BY_ID.shop;   // 購物（expense）

// ─── MDP_Shell ─── ModalHeader + scroll body（無 keypad） ────
function MDP_Shell({ children, saveDisabled = false }) {
  return (
    <div style={{
      display: 'flex', flexDirection: 'column', height: '100%',
      position: 'relative', background: TOKENS.bg,
    }}>
      <ModalHeader title="合併分類" onClose={() => {}} onSave={() => {}} saveDisabled={saveDisabled}/>
      <div style={{ flex: 1, overflowY: 'auto', overflowX: 'hidden' }}>
        <div style={{ padding: SPACING.lg }}>
          {children}
        </div>
      </div>
    </div>
  );
}

// ─── Arrows ─── horizontal → / vertical ↓ ───────────────────
function MDP_HArrow() {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      paddingLeft: SPACING.sm, paddingRight: SPACING.sm,
    }}>
      <Glyph name="arrow-right" size={ICON_SIZE.md} color={TOKENS.ink2}/>
    </div>
  );
}
function MDP_VArrow() {
  const s = ICON_SIZE.md;
  return (
    <div style={{
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      paddingTop: SPACING.sm, paddingBottom: SPACING.sm,
    }}>
      <svg width={s} height={s} viewBox="0 0 16 16" fill="none">
        <path d="M8 3v10M4 9l4 4 4-4"
          stroke={TOKENS.ink2} strokeWidth={2}
          strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </div>
  );
}

// ─── MDP_PickerBox ─── 外層一個 box 包兩個 noBorder static picker + 箭頭
// conflict=true 時 borderColor 轉 TOKENS.error（對齊 impl TransferEditor pickerGroupBoxError）。
// direction='horizontal' → flex row + → ；'vertical' → flex column + ↓。
function MDP_PickerBox({ direction = 'horizontal', conflict = false, sourceLabel, targetLabel }) {
  const horizontal = direction === 'horizontal';
  const boxStyle = {
    display: 'flex',
    flexDirection: horizontal ? 'row' : 'column',
    alignItems: 'center',
    background: TOKENS.surface,
    borderRadius: RADIUS.md,
    borderWidth: 1, borderStyle: 'solid',
    borderColor: conflict ? TOKENS.error : TOKENS.border,
    paddingLeft: SPACING.md, paddingRight: SPACING.md,
    paddingTop: horizontal ? 0 : SPACING.xs,
    paddingBottom: horizontal ? 0 : SPACING.xs,
  };
  const cellStyle = horizontal
    ? { flex: 1, overflow: 'hidden' }
    : { width: '100%', overflow: 'hidden' };
  return (
    <div style={boxStyle}>
      <div style={cellStyle}>
        <StaticWheelPicker label={sourceLabel} noBorder/>
      </div>
      {horizontal ? <MDP_HArrow/> : <MDP_VArrow/>}
      <div style={cellStyle}>
        <StaticWheelPicker label={targetLabel} noBorder/>
      </div>
    </div>
  );
}

// ─── MDP_ConflictNote ─── 衝突態下方一句說明（picker 相同時） ─
function MDP_ConflictNote() {
  return (
    <div style={{
      marginTop: SPACING.sm,
      fontSize: TYPOGRAPHY.size.sm,
      color: TOKENS.error,
    }}>來源與目標相同，無法合併。</div>
  );
}

// ─── V-H · 橫向並排（無視覺化列） ───────────────────────────
function MDP_Horizontal() {
  return (
    <MDP_Shell>
      <MDP_PickerBox direction="horizontal" sourceLabel={MDP_SOURCE.name} targetLabel={MDP_TARGET.name}/>
    </MDP_Shell>
  );
}

// ─── V-V · 縱向上下疊（無視覺化列） ─────────────────────────
function MDP_Vertical() {
  return (
    <MDP_Shell>
      <MDP_PickerBox direction="vertical" sourceLabel={MDP_SOURCE.name} targetLabel={MDP_TARGET.name}/>
    </MDP_Shell>
  );
}

// ─── V-H+viz · 橫向 + 保留頂部 source → target 視覺化列 ──────
function MDP_HorizontalWithViz() {
  return (
    <MDP_Shell>
      <MergeVisualizationRow source={MDP_SOURCE} target={MDP_TARGET}/>
      <MDP_PickerBox direction="horizontal" sourceLabel={MDP_SOURCE.name} targetLabel={MDP_TARGET.name}/>
    </MDP_Shell>
  );
}

// ─── Conflict · 來源 = 目標（橫向示意） ─────────────────────
function MDP_Conflict() {
  return (
    <MDP_Shell saveDisabled>
      <MDP_PickerBox direction="horizontal" conflict sourceLabel={MDP_SOURCE.name} targetLabel={MDP_SOURCE.name}/>
      <MDP_ConflictNote/>
    </MDP_Shell>
  );
}

// ─── Section render ──────────────────────────────────────────
function MergeDualPickerLayoutSection() {
  const W = 402, H = 874;
  return (
    <DCSection id="mdp-section"
      title="Axis · Dual Picker Layout"
      subtitle="MergeEditor 的來源/目標兩 selector 改成雙 inline static wheel picker（取代現況 modal-in-modal）。並陳橫向 vs 縱向、含/不含頂部視覺化列、衝突態。互動模型：source 列全部、target 只列相容子集、相同則停用。">
      <DCArtboard id="mdp-horizontal"
        label="V-H · 橫向並排 · 一個外框包兩個 noBorder picker，中間 → 箭頭（對齊現役 TransferEditor），無頂部視覺化列"
        width={W} height={H}>
        <IOSDevice width={W} height={H}><MDP_Horizontal/></IOSDevice>
      </DCArtboard>
      <DCArtboard id="mdp-vertical"
        label="V-V · 縱向上下疊 · 一個外框包兩個 noBorder picker，中間 ↓ 箭頭，名稱長時不擠，無頂部視覺化列"
        width={W} height={H}>
        <IOSDevice width={W} height={H}><MDP_Vertical/></IOSDevice>
      </DCArtboard>
      <DCArtboard id="mdp-horizontal-with-viz"
        label="V-H+viz · 橫向 + 保留頂部 source → target 視覺化列（picker 已顯示選擇，此列是否冗餘由本軸決定）"
        width={W} height={H}>
        <IOSDevice width={W} height={H}><MDP_HorizontalWithViz/></IOSDevice>
      </DCArtboard>
      <DCArtboard id="mdp-conflict"
        label="衝突態 · 來源 = 目標 → 外框轉紅（pickerGroupBoxError）+ 完成停用 + 下方說明"
        width={W} height={H}>
        <IOSDevice width={W} height={H}><MDP_Conflict/></IOSDevice>
      </DCArtboard>
    </DCSection>
  );
}

Object.assign(window, { MergeDualPickerLayoutSection });
