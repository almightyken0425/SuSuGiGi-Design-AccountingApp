// ─────────────────────────────────────────────────────────────
// Exploration · HomeFilterScreen · Axis · Control Design（第三輪）
//
// 動機：「時間範圍」「分組方式」兩顆控件太單薄。
// 第一輪（segmented 加料五方向）否決；第二輪（卡片六方向）選中
// V5 步進卡方向，並給減法：icon 旁不要標題、卡底不要說明、
// 不要左右箭頭。除兩張卡以外，畫面其餘全部照 impl 原樣。
//
// 減法後的卡：icon 置中在上、當前值大字在下，點卡循環切換
// （與現行 tile 同手感，但卡有份量、值是主角）。
//
// V0 [Current] · impl 原樣（cycle tile + 2 欄帳戶 grid）
// V1           · 定稿候選（大值卡，其餘照 impl）
// ─────────────────────────────────────────────────────────────

// ─── 共用選項 ────────────────────────────────────────────────
// 順序對齊 impl TIME_VALUES / GROUP_VALUES；「全部」用完整詞
// （impl 現況縮寫「全」，前輪已標記為待汰換的截頭縮寫）。
const HFC_TIME_OPTS = [
  { v: 'day',   l: '日' },
  { v: 'week',  l: '週' },
  { v: 'month', l: '月' },
  { v: 'year',  l: '年' },
  { v: 'all',   l: '全部' },
];
const HFC_GROUP_OPTS = [
  { v: 'category', l: '類別' },
  { v: 'date',     l: '日期' },
];
const HFC_CARD_SHADOW = HOME_FILTER_SCREEN_TOKENS.TILE_SHADOW;

// ─── filter state 工廠 ─── 對齊 impl 的防清空 toggle
function hfcUseFilterState() {
  const [state, setState] = React.useState({
    timeGranularity: 'month',
    groupBy: 'category',
    selectedAccountIds: ACCOUNTS.slice(0, 3).map(a => a.id),
  });
  const toggle = (id) => setState(s => {
    const has = s.selectedAccountIds.includes(id);
    if (has && s.selectedAccountIds.length === 1) return s;
    return {
      ...s,
      selectedAccountIds: has
        ? s.selectedAccountIds.filter(x => x !== id)
        : [...s.selectedAccountIds, id],
    };
  });
  return [state, setState, toggle];
}

// ─── HFC_ModalDevice ─── modal 外殼（對齊 Screens 分頁 ScreenFrame：
// ModalHeader 釘頂、body 才滾）。不用 IOSDevice 的 title（那是 large-title
// push header），modal 的置中小標題走 ModalHeader 原件。
function HFC_ModalDevice({ children }) {
  return (
    <IOSDevice width={402} height={874}>
      <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: TOKENS.bg }}>
        <ModalHeader title="顯示設定" onClose={() => {}}/>
        <div style={{ flex: 1, position: 'relative', overflowY: 'auto', overflowX: 'hidden' }}>
          {children}
        </div>
      </div>
    </IOSDevice>
  );
}

// ═══ V0 [Current] ════════════════════════════════════════════
// impl 原樣：30_screens 的 HomeFilterScreen 原件。
function HomeFilterFinal_V0_Current() {
  const [state, setState] = React.useState({
    timeGranularity: 'month',
    groupBy: 'category',
    selectedAccountIds: ['cash', 'bank', 'credit'],
  });
  return (
    <HFC_ModalDevice>
      <HomeFilterScreen filterState={state} setFilterState={setState}/>
    </HFC_ModalDevice>
  );
}

// ═══ V1 · 定稿候選 ═══════════════════════════════════════════
// 兩張大值卡：icon 置中在上、當前值大字在下，點卡循環切換。
// 無標題、無說明、無箭頭。卡以外全部照 impl：SCREEN_PADDING、
// TILE_GAP / TILE_ROW_BOTTOM_MARGIN 間距、AccountGrid 2 欄原件。
function HFCD_CycleCard({ icon, valueText, onPress }) {
  return (
    <button onClick={onPress} style={{
      flex: 1,
      display: 'flex', flexDirection: 'column', alignItems: 'center',
      gap: SPACING.xs + 2,                                  /* (literal: icon 與值 6px) */
      padding: `${SPACING.md}px 0`,
      borderRadius: RADIUS.xl,
      border: 'none',
      background: TOKENS.surface,
      boxShadow: HFC_CARD_SHADOW,
      cursor: 'pointer', fontFamily: 'inherit',
    }}>
      <Glyph name={icon} size={ICON_SIZE.sm} color={TOKENS.ink2} stroke={2}/>
      <span style={{
        fontSize: TYPE_STYLES.title3.size,
        fontWeight: TYPOGRAPHY.weight.bold,
        color: TOKENS.ink,
        lineHeight: 1.2,                                    /* (literal: 大值單行緊湊) */
      }}>{valueText}</span>
    </button>
  );
}

function HomeFilterFinal_V1_Candidate() {
  const [state, setState, toggle] = hfcUseFilterState();
  const T = HOME_FILTER_SCREEN_TOKENS;
  const cardWidth = (T.DESIGN_CANVAS_WIDTH - T.SCREEN_PADDING * 2 - T.ACCOUNT_CARD_INTRA_GAP) / 2;
  const cycle = (opts, cur) => opts[(opts.findIndex(o => o.v === cur) + 1) % opts.length].v;
  const timeOpt = HFC_TIME_OPTS.find(o => o.v === state.timeGranularity);
  const groupOpt = HFC_GROUP_OPTS.find(o => o.v === state.groupBy);
  return (
    <HFC_ModalDevice>
      <div style={{
        padding: T.SCREEN_PADDING,
        background: TOKENS.bg,
        minHeight: '100%',
        boxSizing: 'border-box',
      }}>
        <div style={{
          display: 'flex', flexDirection: 'row', gap: T.TILE_GAP,
          marginBottom: T.TILE_ROW_BOTTOM_MARGIN,
        }}>
          <HFCD_CycleCard icon="calendar-blank-outline" valueText={timeOpt.l}
            onPress={() => setState(s => ({ ...s, timeGranularity: cycle(HFC_TIME_OPTS, s.timeGranularity) }))}/>
          <HFCD_CycleCard icon="tag-outline" valueText={groupOpt.l}
            onPress={() => setState(s => ({ ...s, groupBy: cycle(HFC_GROUP_OPTS, s.groupBy) }))}/>
        </div>
        <AccountGrid
          accounts={ACCOUNTS}
          selectedAccountIds={state.selectedAccountIds}
          cardWidth={cardWidth}
          onToggle={toggle}/>
      </div>
    </HFC_ModalDevice>
  );
}

// ─── Section render ──────────────────────────────────────────
function HomeFilterControlSection() {
  const W = 402, H = 874;
  return (
    <DCSection id="hfc-section"
      title="Axis · Control Design"
      subtitle="第三輪定稿候選：第二輪 V5 步進卡做減法——去標題、去說明、去箭頭，剩 icon + 當前值大字，點卡循環切換。兩張卡以外全部照 impl 原樣（fullscreen、間距 token、2 欄帳戶 grid 原件）。兩張 artboard 皆可互動。">
      <DCArtboard id="hfcf-v0-current"
        label="V0 [Current] · impl 原樣 · cycle tile（icon + 小字）+ 2 欄帳戶 grid"
        width={W} height={H}>
        <HomeFilterFinal_V0_Current/>
      </DCArtboard>
      <DCArtboard id="hfcf-v1-candidate"
        label="V1 · 定稿候選 · icon 置中 + 當前值大字、點卡循環；無標題 / 說明 / 箭頭，其餘照 impl"
        width={W} height={H}>
        <HomeFilterFinal_V1_Candidate/>
      </DCArtboard>
    </DCSection>
  );
}

Object.assign(window, { HomeFilterControlSection });
