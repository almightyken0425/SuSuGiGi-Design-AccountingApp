// ─────────────────────────────────────────────────────────────
// Exploration · HomeFilterScreen · Axis · Layout Restructure
//
// 動機：使用者反映「顯示設定」畫面不順眼。診斷出三個 layout 層主因：
//   1. fullScreenModal 只裝 1/3 內容，下半屏死白
//   2. 控件（tile）與內容（帳戶卡）同尺寸同形狀，畫面無階層
//   3. 列狀內容（icon+名+幣別）硬拼 2 欄，名字截斷、幣別貼邊
//
// 四個 variant 比較兩個獨立變因：presentation（fullscreen vs sheet）
// 與帳戶排列（2 欄 grid vs 單欄 list）。控制區統一升級為
// 「欄位名 + segmented」（cycle tile 是全 app 孤例，一併淘汰）。
//
// V0 [Current] · Fullscreen + cycle tiles + 2 欄 grid — 現況 baseline
// V1           · Sheet + segmented + 單欄 list        — 推薦方向
// V2           · Fullscreen + segmented + 單欄 list   — 不動 presentation 的保守修法
// V3           · Sheet + segmented + 2 欄 grid        — 帳戶多（12+）時的密度方案
//
// 對比要點：
//   - V1 vs V2 只差 presentation：sheet 讓「內容多高、面板多高」，死白消失
//   - V1 vs V3 只差帳戶排列：單欄不截斷名字；grid 省高度、多帳戶不用捲
//   - 全部 variant：未選帳戶維持全亮、選中掛 checkmark（對齊 app 選擇語言，
//     淘汰現況的「未選壓 disabled 灰」）；幣別只在 ≠ 主幣別時顯示
// ─────────────────────────────────────────────────────────────

// ─── 共用選項與 mock ─────────────────────────────────────────
const HFL_TIME_OPTS = [
  { v: 'day',   l: '日' },
  { v: 'week',  l: '週' },
  { v: 'month', l: '月' },
  { v: 'year',  l: '年' },
  { v: 'all',   l: '全部' },   // 現況 zh-Hant「全」為截頭縮寫，此處一併示範完整詞
];
const HFL_GROUP_OPTS = [
  { v: 'category', l: '類別' },
  { v: 'date',     l: '日期' },
];
const HFL_BASE_CURRENCY = 'TWD';

// V3 多帳戶情境：fixtures 5 帳戶之外補 7 個，測 grid 的密度優勢
const HFL_MANY_ACCOUNTS = [
  ...ACCOUNTS,
  { id: 'x1', name: '中信活儲',   iconId: 11, currency: 'TWD' },
  { id: 'x2', name: '悠遊卡',     iconId:  5, currency: 'TWD' },
  { id: 'x3', name: 'LINE Pay',   iconId:  7, currency: 'TWD' },
  { id: 'x4', name: 'JPY 現金',   iconId:  1, currency: 'JPY' },
  { id: 'x5', name: '街口',       iconId:  5, currency: 'TWD' },
  { id: 'x6', name: '美股券商',   iconId: 87, currency: 'USD' },
  { id: 'x7', name: '零用金',     iconId:  1, currency: 'TWD' },
];

// ─── HFL_Segmented ─── iOS 原生風 segmented control
function HFL_Segmented({ options, value, onChange }) {
  return (
    <div style={{
      display: 'flex', padding: 2,
      background: 'rgba(118,118,128,0.12)',                 /* (literal: iOS segmented track systemFill) */
      borderRadius: RADIUS.md + 1,                          /* (literal: iOS segmented 外 9 內 7) */
    }}>
      {options.map(o => {
        const on = o.v === value;
        return (
          <button key={o.v}
            onClick={() => onChange(o.v)}
            style={{
              flex: 1, border: 'none', cursor: 'pointer',
              padding: `${SPACING.xs + 2}px 0`,             /* (literal: iOS segmented 高 ~32) */
              borderRadius: RADIUS.md - 1,
              background: on ? '#fff' : 'transparent',
              boxShadow: on ? '0 1px 3px rgba(0,0,0,0.12)' : 'none',
              fontFamily: 'inherit',
              fontSize: TYPE_STYLES.footnote.size,
              fontWeight: on ? TYPOGRAPHY.weight.semibold : TYPOGRAPHY.weight.regular,
              color: TOKENS.ink,
              whiteSpace: 'nowrap',
            }}>{o.l}</button>
        );
      })}
    </div>
  );
}

// ─── HFL_Field ─── 欄位名 + segmented 的直排組
function HFL_Field({ label, children }) {
  return (
    <div>
      <div style={{
        fontSize: TYPE_STYLES.footnote.size, color: TOKENS.ink2,
        marginBottom: SPACING.sm - 2,                       /* (literal: label 與控件 6px 緊貼) */
      }}>{label}</div>
      {children}
    </div>
  );
}

// ─── HFL_SectionTitle ─── 區塊小標（對齊 LIST_TOKENS.SECTION_TITLE_* 慣例）
function HFL_SectionTitle({ children }) {
  return (
    <div style={{
      fontSize: LIST_TOKENS.SECTION_TITLE_SIZE,
      fontWeight: LIST_TOKENS.SECTION_TITLE_WEIGHT,
      letterSpacing: LIST_TOKENS.SECTION_TITLE_LETTER_SPACING,
      textTransform: 'uppercase',
      color: TOKENS.ink2,
      marginBottom: SPACING.sm,
      paddingLeft: SPACING.lg,
    }}>{children}</div>
  );
}

// ─── HFL_AccountSwatch ─── 帳戶 icon 方塊（未選也保持全亮，不壓 disabled 灰）
function HFL_AccountSwatch({ account, selected, size = 28 }) {
  return (
    <div style={{
      width: size, height: size, borderRadius: RADIUS.md,
      background: selected ? TOKENS.p50 : TOKENS.surface2,
      display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
    }}>
      <DynamicIconById iconId={account.iconId} size={ICON_SIZE.sm} color={selected ? TOKENS.p500 : TOKENS.ink2}/>
    </div>
  );
}

// ─── HFL_AccountRow ─── 單欄帳戶列（建立在 SelectionListItem 語言上）
function HFL_AccountRow({ account, selected, disabled, onPress }) {
  const foreign = account.currency !== HFL_BASE_CURRENCY;
  return (
    <SelectionListItem
      leftIcon={<HFL_AccountSwatch account={account} selected={selected}/>}
      title={account.name}
      subtitle={foreign ? account.currency : undefined}
      selected={selected}
      disabled={disabled}
      onPress={onPress}/>
  );
}

// ─── HFL_AccountGridCard ─── 2 欄帳戶卡（V3 用）
// flat surface 無框（對齊 ListGroupCard 材質）；選中 = checkmark，非邊框加粗。
function HFL_AccountGridCard({ account, selected, disabled, cardWidth, onPress }) {
  const foreign = account.currency !== HFL_BASE_CURRENCY;
  return (
    <button
      onClick={disabled ? undefined : onPress}
      disabled={disabled}
      style={{
        width: cardWidth, display: 'flex', alignItems: 'center',
        gap: SPACING.sm + 2,                                /* (literal: 10，28 swatch 配 12 略鬆) */
        padding: `${SPACING.sm + 2}px ${SPACING.md}px`,     /* (literal: 高度壓到 48，比現況 59 緊) */
        borderRadius: RADIUS.lg,
        border: 'none',
        background: TOKENS.surface,
        cursor: disabled ? 'default' : 'pointer',
        fontFamily: 'inherit',
        opacity: disabled ? 0.5 : 1,
      }}>
      <HFL_AccountSwatch account={account} selected={selected}/>
      <span style={{
        flex: 1, textAlign: 'left', minWidth: 0,
        fontSize: TYPE_STYLES.subheadline.size,
        fontWeight: TYPOGRAPHY.weight.medium,
        color: TOKENS.ink,
        whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
      }}>
        {account.name}
        {foreign && (
          <span style={{ fontSize: TYPE_STYLES.caption2.size, color: TOKENS.ink2, marginLeft: SPACING.xs }}>
            {account.currency}
          </span>
        )}
      </span>
      <span style={{ width: ICON_SIZE.sm, display: 'flex', justifyContent: 'center', flexShrink: 0 }}>
        {selected && <Glyph name="check" size={LIST_TOKENS.SELECTION_CHECKMARK_SIZE} color={TOKENS.p500} stroke={2.4}/>}
      </span>
    </button>
  );
}

// ─── HFL_ControlBlock ─── 檢視方式控制區（V1/V2/V3 共用）
function HFL_ControlBlock({ state, setState }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: SPACING.lg }}>
      <HFL_Field label="時間範圍">
        <HFL_Segmented options={HFL_TIME_OPTS} value={state.timeGranularity}
          onChange={v => setState(s => ({ ...s, timeGranularity: v }))}/>
      </HFL_Field>
      <HFL_Field label="分組方式">
        <HFL_Segmented options={HFL_GROUP_OPTS} value={state.groupBy}
          onChange={v => setState(s => ({ ...s, groupBy: v }))}/>
      </HFL_Field>
    </div>
  );
}

// ─── HFL_AccountList ─── 單欄帳戶清單（ListGroupCard + SelectionListItem）
function HFL_AccountList({ accounts, state, toggle }) {
  return (
    <ListGroupCard>
      {accounts.map(a => {
        const selected = state.selectedAccountIds.includes(a.id);
        const lastSelected = selected && state.selectedAccountIds.length === 1;
        return (
          <HFL_AccountRow key={a.id} account={a}
            selected={selected} disabled={lastSelected}
            onPress={() => toggle(a.id)}/>
        );
      })}
    </ListGroupCard>
  );
}

// ─── HFL_AccountGrid ─── 2 欄帳戶 grid（V3 用；gap 對齊 LIST_TOKENS.GRID_GAP）
function HFL_AccountGrid({ accounts, state, toggle, containerWidth }) {
  const cardWidth = (containerWidth - LIST_TOKENS.GRID_GAP) / 2;
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: LIST_TOKENS.GRID_GAP }}>
      {accounts.map(a => {
        const selected = state.selectedAccountIds.includes(a.id);
        const lastSelected = selected && state.selectedAccountIds.length === 1;
        return (
          <HFL_AccountGridCard key={a.id} account={a}
            selected={selected} disabled={lastSelected}
            cardWidth={cardWidth} onPress={() => toggle(a.id)}/>
        );
      })}
    </div>
  );
}

// ─── HFL_FakeHome ─── sheet 背後的首頁示意（非還原，僅撐 context）
function HFL_FakeHome() {
  return (
    <div style={{ padding: SPACING.lg, paddingTop: 72, background: TOKENS.bg, height: '100%', boxSizing: 'border-box' }}>
      <div style={{
        fontSize: TYPE_STYLES.title2.size, fontWeight: TYPOGRAPHY.weight.bold,
        color: TOKENS.ink, marginBottom: SPACING.xl,
      }}>5月</div>
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: SPACING.xl }}>
        <div style={{
          width: 180, height: 180, borderRadius: '50%',
          background: `conic-gradient(${TOKENS.p500} 0 40%, ${TOKENS.p300} 40% 65%, ${TOKENS.p100} 65% 85%, ${TOKENS.surface2} 85% 100%)`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <div style={{ width: 120, height: 120, borderRadius: '50%', background: TOKENS.bg }}/>
        </div>
      </div>
      {[160, 220, 190, 240, 140].map((w, i) => (
        <div key={i} style={{
          display: 'flex', alignItems: 'center', gap: SPACING.md,
          padding: `${SPACING.md}px 0`,
        }}>
          <div style={{ width: 36, height: 36, borderRadius: RADIUS.md, background: TOKENS.surface2, flexShrink: 0 }}/>
          <div style={{ height: 10, width: w, borderRadius: RADIUS.full, background: TOKENS.surface2 }}/>
        </div>
      ))}
    </div>
  );
}

// ─── HFL_Sheet ─── scrim + 適高 bottom sheet（detent 隨內容）
function HFL_Sheet({ children }) {
  return (
    <div style={{ position: 'relative', height: '100%' }}>
      <HFL_FakeHome/>
      <div style={{
        position: 'absolute', inset: 0,
        background: 'rgba(0,0,0,0.32)',                     /* (literal: iOS sheet scrim) */
      }}/>
      <div style={{
        position: 'absolute', left: 0, right: 0, bottom: 0,
        borderRadius: `${RADIUS['2xl']}px ${RADIUS['2xl']}px 0 0`,
        background: TOKENS.bg,
        boxShadow: '0 -8px 40px rgba(0,0,0,0.16)',
        paddingBottom: 34,                                  /* (literal: home indicator 高) */
      }}>
        <div style={{ display: 'flex', justifyContent: 'center', padding: `${SPACING.sm}px 0 ${SPACING.xs}px` }}>
          <div style={{ width: 36, height: 5, borderRadius: RADIUS.full, background: 'rgba(60,60,67,0.3)' }}/>
        </div>
        <div style={{
          textAlign: 'center',
          fontSize: TYPE_STYLES.headline.size,
          fontWeight: TYPOGRAPHY.weight.semibold,
          color: TOKENS.ink,
          padding: `${SPACING.xs}px 0 ${SPACING.md}px`,
        }}>顯示設定</div>
        {children}
      </div>
    </div>
  );
}

// ─── HFL filter state 工廠 ─── 各 variant 私有 state + 防清空 toggle
function hflUseFilterState(accounts) {
  const [state, setState] = React.useState({
    timeGranularity: 'month',
    groupBy: 'category',
    selectedAccountIds: accounts.slice(0, 3).map(a => a.id),
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

// ─── V0 [Current] ─── 現況 baseline，直接重用 30_screens 的 HomeFilterScreen
function HomeFilter_V0_Current() {
  const [state, setState] = React.useState({
    timeGranularity: 'month',
    groupBy: 'category',
    selectedAccountIds: ['cash', 'bank', 'credit'],
  });
  return (
    <IOSDevice width={402} height={874} title="顯示設定">
      <HomeFilterScreen filterState={state} setFilterState={setState}/>
    </IOSDevice>
  );
}

// ─── V1 ─── Sheet + segmented + 單欄 list（推薦）
function HomeFilter_V1_SheetList() {
  const [state, setState, toggle] = hflUseFilterState(ACCOUNTS);
  return (
    <IOSDevice width={402} height={874}>
      <HFL_Sheet>
        <div style={{ padding: `0 ${SPACING.lg}px` }}>
          <HFL_ControlBlock state={state} setState={setState}/>
        </div>
        <div style={{ marginTop: SPACING.xl }}>
          <HFL_SectionTitle>帳戶</HFL_SectionTitle>
          <div style={{ padding: `0 ${SPACING.lg}px` }}>
            <HFL_AccountList accounts={ACCOUNTS} state={state} toggle={toggle}/>
          </div>
        </div>
      </HFL_Sheet>
    </IOSDevice>
  );
}

// ─── V2 ─── Fullscreen + segmented + 單欄 list（不動 presentation 的保守修法）
function HomeFilter_V2_FullRestructure() {
  const [state, setState, toggle] = hflUseFilterState(ACCOUNTS);
  return (
    <IOSDevice width={402} height={874} title="顯示設定">
      <div style={{ padding: SPACING.lg, background: TOKENS.bg, height: '100%', boxSizing: 'border-box' }}>
        <HFL_ControlBlock state={state} setState={setState}/>
        <div style={{ marginTop: SPACING.xl, marginLeft: -SPACING.lg, marginRight: -SPACING.lg }}>
          <HFL_SectionTitle>帳戶</HFL_SectionTitle>
          <div style={{ padding: `0 ${SPACING.lg}px` }}>
            <HFL_AccountList accounts={ACCOUNTS} state={state} toggle={toggle}/>
          </div>
        </div>
      </div>
    </IOSDevice>
  );
}

// ─── V3 ─── Sheet + segmented + 2 欄 grid（12 帳戶密度情境）
function HomeFilter_V3_SheetGrid() {
  const [state, setState, toggle] = hflUseFilterState(HFL_MANY_ACCOUNTS);
  const contentWidth = 402 - SPACING.lg * 2;
  return (
    <IOSDevice width={402} height={874}>
      <HFL_Sheet>
        <div style={{ padding: `0 ${SPACING.lg}px` }}>
          <HFL_ControlBlock state={state} setState={setState}/>
        </div>
        <div style={{ marginTop: SPACING.xl }}>
          <HFL_SectionTitle>帳戶</HFL_SectionTitle>
          <div style={{ padding: `0 ${SPACING.lg}px` }}>
            <HFL_AccountGrid accounts={HFL_MANY_ACCOUNTS} state={state} toggle={toggle}
              containerWidth={contentWidth}/>
          </div>
        </div>
      </HFL_Sheet>
    </IOSDevice>
  );
}

// ─── Section render ──────────────────────────────────────────
function HomeFilterLayoutSection() {
  const W = 402, H = 874;
  return (
    <DCSection id="hfl-section"
      title="Axis · Layout Restructure"
      subtitle="重審「顯示設定」的版面結構。兩個變因：presentation（fullscreen vs 適高 sheet）× 帳戶排列（2 欄 grid vs 單欄 list）。控制區統一改「欄位名 + segmented」，淘汰全 app 孤例的 cycle tile；未選帳戶回全亮 + checkmark 選擇語言。">
      <DCArtboard id="hfl-v0-current"
        label="V0 [Current] · Fullscreen + cycle tile + 2 欄 grid · 下半屏死白、控件與內容同形無階層、名字截斷"
        width={W} height={H}>
        <HomeFilter_V0_Current/>
      </DCArtboard>
      <DCArtboard id="hfl-v1-sheet-list"
        label="V1 · 適高 Sheet + segmented + 單欄 list · 推薦：內容多高面板多高，Home 留在背後；名字不截斷；幣別只標外幣"
        width={W} height={H}>
        <HomeFilter_V1_SheetList/>
      </DCArtboard>
      <DCArtboard id="hfl-v2-full-restructure"
        label="V2 · Fullscreen + segmented + 單欄 list · 保守修法：不動 presentation，補階層與標題；死白仍在（對照 V1）"
        width={W} height={H}>
        <HomeFilter_V2_FullRestructure/>
      </DCArtboard>
      <DCArtboard id="hfl-v3-sheet-grid"
        label="V3 · 適高 Sheet + segmented + 2 欄 grid（12 帳戶）· 帳戶多時 grid 省高度；flat 卡 + checkmark，非邊框加粗"
        width={W} height={H}>
        <HomeFilter_V3_SheetGrid/>
      </DCArtboard>
    </DCSection>
  );
}

Object.assign(window, { HomeFilterLayoutSection });
