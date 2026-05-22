// ─────────────────────────────────────────────────────────────
// App shell · 設計工作台 router
//
// 頂部 4 個 tab：
//   #intro / #foundations / #screens / #explorations
//
// Foundations 內含 3 個 group × 15 leaf sub-item（hash 三段式：#foundations/<group>/<topic>）：
//   - Atomic            (4) — Type / Colors / Layout / Platform
//   - Component Tokens  (8) — List / Transaction List / Form Picker / Chip / Search Bar /
//                              Header Icon Button / Switch / List Empty Transition
//   - Showcase          (3) — Components / Brand / Icon Library
//
// SCREEN_META 中央定義每個 screen 的：
//   - title           NavBar 標題
//   - present         'push' | 'modal' | 'none'  → 對應 impl 的 navigation presentation
//   - headerLeftText  push 模式回上頁的文字（例如 '設定'）
//   - headerRight     header 右側元素（merge / search / settings 等）
//   - hasFAB          是否顯示 FloatingActionBar
//   - render          (ctx) => screen body JSX，ctx 提供 push / pop / sharedFilter 等
//
// SCREEN_LIST 是 Screens tab 要顯示的 pinned id 順序。
// 想要鳥瞰全貌：用畫布的縮放（trackpad 二指捏合 / Ctrl+滾輪）拉遠即可。
// ─────────────────────────────────────────────────────────────

function PushHeader({ title, leadingText, leadingAction, trailing }) {
  return <NavHeader title={title} leadingText={leadingText} leadingAction={leadingAction} trailing={trailing}/>;
}

// SCREEN_META — 本目錄 v1 僅含 5 個重做完成的 screen。
// 其餘 17 個（Settings / Login / Paywall / Accounts / Categories / Theme / Language /
// Timezone / LaunchMode / BaseCurrency / CurrencyList / RateList / DataMgmt / Debug 等）
// 已於本次重構移除，待逐步 follow 30_screens/ 新前例重做後再補回。
const SCREEN_META = {
  // ─── Home ─── default / empty
  home: {
    title: 'SuSuGiGi', present: 'push', hasFAB: true,
    render: (ctx) => <HomeScreen filterState={ctx.sharedFilter}/>,
    headerLeft: (ctx) => <HeaderButtonPill symbols={['line.3.horizontal.decrease']} intent="action" onPress={() => ctx.push('filter')}/>,
    headerRight: (ctx) => <HeaderButtonPill symbols={['magnifyingglass']} intent="action" onPress={() => ctx.push('search')}/>,
  },
  'home-empty': {
    title: 'SuSuGiGi', present: 'push', hasFAB: true,
    render: (ctx) => <HomeScreen filterState={ctx.sharedFilter} variant="empty"/>,
    headerLeft: (ctx) => <HeaderButtonPill symbols={['line.3.horizontal.decrease']} intent="action" onPress={() => ctx.push('filter')}/>,
    headerRight: (ctx) => <HeaderButtonPill symbols={['magnifyingglass']} intent="action" onPress={() => ctx.push('search')}/>,
  },
  // ─── Filter ─── default / no-accounts
  filter: {
    title: '顯示設定', present: 'modal',
    render: (ctx) => <HomeFilterScreen filterState={ctx.sharedFilter} setFilterState={ctx.setSharedFilter}/>,
  },
  'filter-no-accounts': {
    title: '顯示設定', present: 'modal',
    render: (ctx) => <HomeFilterScreen filterState={ctx.sharedFilter} setFilterState={ctx.setSharedFilter} variant="no-accounts"/>,
  },
  // ─── Search ─── initial / with-results / no-results
  // impl loading 走 ListEmptyTransition crossfade 不顯示 spinner，design 不另畫 loading variant
  search: {
    title: '搜尋', present: 'modal',
    render: () => <SearchScreen/>,
  },
  'search-with-results': {
    title: '搜尋', present: 'modal',
    render: () => <SearchScreen variant="with-results"/>,
  },
  'search-no-results': {
    title: '搜尋', present: 'modal',
    render: () => <SearchScreen variant="no-results"/>,
  },
  // ─── Transaction Editor ─── default / income / error
  'tx-editor': {
    title: '新增支出', present: 'modal', save: true,
    render: () => <TransactionEditorScreen type="expense"/>,
  },
  'tx-editor-income': {
    title: '新增收入', present: 'modal', save: true,
    render: () => <TransactionEditorScreen type="income"/>,
  },
  'tx-editor-error': {
    title: '新增支出', present: 'modal', save: true,
    render: () => <TransactionEditorScreen type="expense" variant="error"/>,
  },
  // ─── Transfer Editor ─── default / error
  transfer: {
    title: '新增轉帳', present: 'modal', save: true,
    render: () => <TransferEditorScreen/>,
  },
  'transfer-error': {
    title: '新增轉帳', present: 'modal', save: true,
    render: () => <TransferEditorScreen variant="error"/>,
  },
};

// SCREEN_GROUPS — Screens tab 顯示結構
// 一種 screen = 一個 group = 一個 DCSection（水平列）；
// 同一 group 內排 default + 各種邊界狀態（空 / 載入 / 錯誤 / 模式變體）；
// 不同 screen 之間是垂直堆疊的 sections。
//
// 新增/移除 screen 時更新此陣列；要新邊界狀態同步加 SCREEN_META + 在對應 group.screens 加一筆。
const SCREEN_GROUPS = [
  {
    id: 'home',
    title: 'Home · 記帳',
    subtitle: '主畫面 PeriodPage（src/screens/Home/）。預設 + 空狀態（無交易紀錄時 donut 中央改顯示「尚無交易紀錄」）。',
    screens: [
      { id: 'home',       label: 'Default · 有交易' },
      { id: 'home-empty', label: 'Empty · 尚無交易紀錄' },
    ],
  },
  {
    id: 'home-filter',
    title: '顯示設定 · Home Filter',
    subtitle: 'Home 的篩選 modal（src/screens/Home/HomeFilterScreen.tsx）。',
    screens: [
      { id: 'filter',             label: 'Default · 有帳戶' },
      { id: 'filter-no-accounts', label: 'No accounts · 無可用帳戶' },
    ],
  },
  {
    id: 'search',
    title: 'Search · 搜尋',
    subtitle: '3 種狀態：初始提示輸入 / 有結果 / 找不到結果（src/screens/Search/SearchScreen.tsx）。impl loading 走 ListEmptyTransition crossfade 不顯示 spinner。',
    screens: [
      { id: 'search',              label: 'Initial · 提示輸入' },
      { id: 'search-with-results', label: 'With results · 有結果' },
      { id: 'search-no-results',   label: 'No results · 找不到結果' },
    ],
  },
  {
    id: 'tx-editor',
    title: 'Transaction Editor · 記一筆交易',
    subtitle: '記一筆支出 / 收入 modal（src/screens/Transactions/TransactionEditorScreen.tsx）。驗證錯誤對應 impl Alert（畫成 inline banner）。',
    screens: [
      { id: 'tx-editor',        label: 'Default · 新增支出' },
      { id: 'tx-editor-income', label: '新增收入' },
      { id: 'tx-editor-error',  label: 'Error · 驗證錯誤' },
    ],
  },
  {
    id: 'transfer-editor',
    title: 'Transfer Editor · 轉帳',
    subtitle: '跨帳戶 / 跨幣別轉帳 modal（src/screens/Transactions/TransferEditorScreen.tsx）。',
    screens: [
      { id: 'transfer',       label: 'Default · 跨幣別' },
      { id: 'transfer-error', label: 'Error · 驗證錯誤' },
    ],
  },
];

const PINNED_WITH_FAB = new Set(['home']);

// ScreenFrame — device 內導覽容器
function ScreenFrame({ pinned, sharedFilter, setSharedFilter }) {
  const [stack, setStack] = React.useState([pinned]);
  React.useEffect(() => { setStack([pinned]); }, [pinned]);
  const top = stack[stack.length - 1];
  const push = (s) => setStack(st => [...st, s]);
  const pop = () => setStack(st => st.length > 1 ? st.slice(0, -1) : [pinned]);
  const meta = SCREEN_META[top];
  if (!meta) return null;

  const ctx = { push, pop, sharedFilter, setSharedFilter };
  const body = meta.render(ctx);
  const isModal = meta.present === 'modal';
  const isPush = meta.present === 'push';
  const headerRight = meta.headerRight ? meta.headerRight(ctx) : null;
  const leadingText = isPush ? (meta.headerLeftText ?? '') : undefined;

  // ScreenFrame 結構：
  //   ScreenFrame (relative, h:100%, overflow:hidden)
  //   └── flex column (h:100%)
  //       ├── ModalHeader / PushHeader (fixed 在頂部、不滾)
  //       └── body wrapper (flex:1, overflowY:auto) ← screen 內容在這滾
  //
  // body wrapper 才 scroll，header 釘在 viewport 頂；
  // 這樣 screen 內 position:absolute bottom:0 的元素（BottomSearchBar / CalculatorKeypad）
  // 對齊 body wrapper bottom = viewport 底（sticky 感對齊真實 iOS 行為）。
  return (
    <div style={{
      width: '100%', height: '100%', position: 'relative',
      background: TOKENS.bg,
      fontFamily: '-apple-system, "SF Pro", "PingFang TC", "Noto Sans TC", system-ui, sans-serif',
      overflow: 'hidden',
    }} data-screen-label={pinned}>
      <div style={{
        position: 'absolute', inset: 0,
        display: 'flex', flexDirection: 'column',
      }}>
        {isModal && <ModalHeader title={meta.title} onClose={pop} onSave={meta.save ? pop : undefined}/>}
        {isPush && <PushHeader title={meta.title} leadingText={leadingText} leadingAction={stack.length > 1 ? pop : undefined} trailing={headerRight}/>}
        <div style={{ flex: 1, position: 'relative', overflowY: 'auto', overflowX: 'hidden' }}>
          {body}
        </div>
      </div>
      {(PINNED_WITH_FAB.has(top) || meta.hasFAB) && (
        <FloatingActionBar mode="actions"
          onExpensePress={() => push('tx-editor')}
          onTransferPress={() => push('transfer')}
          onIncomePress={() => push('tx-editor-income')}/>
      )}
    </div>
  );
}

// ─── Side TOC nav ────────────────────────────────────────────
// 三層 nav：top-level views → Foundations group → leaf topic。
// Screens / Explorations 仍維持兩層（views → sub-item）。
const VIEW_TABS = [
  { id: 'intro',        label: 'Intro' },
  { id: 'foundations',  label: 'Foundations',  hasSubs: true },
  { id: 'screens',      label: 'Screens',      hasSubs: true },
  { id: 'explorations', label: 'Explorations', hasSubs: true },
];
const VALID_VIEWS = VIEW_TABS.map(t => t.id);

// Foundations groups — 5 group × 19 leaf sub-item。
// hash 路徑：#foundations/<group>/<topic>。每個 topic 對應單一 Section component。
const FOUNDATIONS_GROUPS = [
  {
    id: 'atomic', label: 'Atomic',
    topics: [
      { id: 'type',     label: 'Type',     render: () => <FoundationsAtomicTypeSection/> },
      { id: 'colors',   label: 'Colors',   render: () => <FoundationsAtomicColorsSection/> },
      { id: 'layout',   label: 'Layout',   render: () => <FoundationsAtomicLayoutSection/> },
      { id: 'platform', label: 'Platform', render: () => <FoundationsAtomicPlatformSection/> },
    ],
  },
  {
    id: 'component-tokens', label: 'Component Tokens',
    topics: [
      { id: 'list',                  label: 'List',                  render: () => <FoundationsCTListSection/> },
      { id: 'tx-list',               label: 'Transaction List',      render: () => <FoundationsCTTxListSection/> },
      { id: 'form-picker',           label: 'Form Picker',           render: () => <FoundationsCTFormPickerSection/> },
      { id: 'chip',                  label: 'Chip',                  render: () => <FoundationsCTChipSection/> },
      { id: 'search-bar',            label: 'Search Bar',            render: () => <FoundationsCTSearchBarSection/> },
      { id: 'header-icon-button',    label: 'Header Icon Button',    render: () => <FoundationsCTHeaderIconButtonSection/> },
      { id: 'switch',                label: 'Switch',                render: () => <FoundationsCTSwitchSection/> },
      { id: 'list-empty-transition', label: 'List Empty Transition', render: () => <FoundationsCTListEmptyTransitionSection/> },
      { id: 'amount-field',          label: 'Amount Field',          render: () => <FoundationsCTAmountFieldSection/> },
      { id: 'static-wheel-picker',   label: 'Static Wheel Picker',   render: () => <FoundationsCTStaticWheelPickerSection/> },
      { id: 'recurring-options',     label: 'Recurring Options',     render: () => <FoundationsCTRecurringOptionsSection/> },
    ],
  },
  {
    id: 'components', label: 'Components',
    topics: [
      { id: 'list',       label: 'List',       render: () => <ComponentsListSection/> },
      { id: 'form',       label: 'Form',       render: () => <ComponentsFormSection/> },
      { id: 'navigation', label: 'Navigation', render: () => <ComponentsNavigationSection/> },
      { id: 'chart',      label: 'Chart',      render: () => <ComponentsChartSection/> },
      { id: 'input',      label: 'Input',      render: () => <ComponentsInputSection/> },
    ],
  },
  {
    id: 'brand', label: 'Brand',
    topics: [
      { id: 'ui-glyphs', label: 'UI Glyphs', render: () => <FoundationsBrandUIGlyphsSection/> },
    ],
  },
  {
    id: 'icon-library', label: 'Icon Library',
    topics: [
      { id: 'all-icons', label: 'All Icons', render: () => <FoundationsIconLibraryAllIconsSection/> },
    ],
  },
];

// EXPLORATION_GROUPS — 每個 group 對應一個 screen，group 下的 topic 為各 exploration 軸
const EXPLORATION_GROUPS = [
  {
    id: 'homescreen', label: 'Home Screen',
    topics: [
      { id: 'color-and-mood',   label: 'Axis 1 · Color & Mood',               render: () => <ColorAndMoodSection/> },
      { id: 'surface-material', label: 'Axis 2 · Surface & Material',          render: () => <SurfaceMaterialSection/> },
      { id: 'iconography',      label: 'Axis 3 · Iconography & Embellishment', render: () => <IconographySection/> },
      { id: 'personality',      label: 'Axis 4 · Personality (packaged)',      render: () => <PersonalityPackagedSection/> },
    ],
  },
];

// 找 Foundations group / topic 的 helper。沒命中時回 fallback（atomic/type）。
function resolveFoundationsRoute(rawGroup, rawTopic) {
  const group = FOUNDATIONS_GROUPS.find(g => g.id === rawGroup);
  if (!group) {
    const fallback = FOUNDATIONS_GROUPS[0];
    return { group: fallback.id, topic: fallback.topics[0].id };
  }
  const topic = group.topics.find(t => t.id === rawTopic);
  return { group: group.id, topic: topic ? topic.id : group.topics[0].id };
}

// 找 Explorations group / topic 的 helper。沒命中時回 fallback（homescreen/color-and-mood）。
function resolveExplorationsRoute(rawGroup, rawTopic) {
  const group = EXPLORATION_GROUPS.find(g => g.id === rawGroup);
  if (!group) {
    const fallback = EXPLORATION_GROUPS[0];
    return { group: fallback.id, topic: fallback.topics[0].id };
  }
  const topic = group.topics.find(t => t.id === rawTopic);
  return { group: group.id, topic: topic ? topic.id : group.topics[0].id };
}

const groupsFor = (view) => {
  if (view === 'foundations') return FOUNDATIONS_GROUPS;
  if (view === 'explorations') return EXPLORATION_GROUPS;
  return null;
};

const subsFor = (view) => {
  if (view === 'screens') return SCREEN_GROUPS.map(g => ({ id: g.id, label: g.title }));
  return null;
};

const defaultSubFor = (view) => {
  if (view === 'foundations') {
    const g = FOUNDATIONS_GROUPS[0];
    return { group: g.id, topic: g.topics[0].id };
  }
  if (view === 'explorations') {
    const g = EXPLORATION_GROUPS[0];
    return { group: g.id, topic: g.topics[0].id };
  }
  const subs = subsFor(view);
  return subs && subs[0] ? subs[0].id : null;
};

// 舊 hash 別名（向後相容）。Foundations 從兩段 #foundations/<topic> 升級為三段
// #foundations/<group>/<topic>，舊收藏連結透過此表 redirect。
const LEGACY_HASH_ALIASES = {
  'overview':       { view: 'screens' },
  'flows':          { view: 'screens' },
  'all':            { view: 'screens' },
  'filter':         { view: 'screens' },
  'tx-list':        { view: 'screens' },
  'recurring':      { view: 'screens' },
  'row-height':     { view: 'screens' },
  'design_system':  { view: 'foundations' },
  // 舊 explorations 兩段 hash → 新三段（加 group 層）
  'explorations/color-and-mood':   { view: 'explorations', group: 'homescreen', topic: 'color-and-mood' },
  'explorations/surface-material': { view: 'explorations', group: 'homescreen', topic: 'surface-material' },
  'explorations/iconography':      { view: 'explorations', group: 'homescreen', topic: 'iconography' },
  'explorations/personality':      { view: 'explorations', group: 'homescreen', topic: 'personality' },
  // 舊兩段 hash → 三段
  'foundations/type':       { view: 'foundations', group: 'atomic',       topic: 'type' },
  'foundations/colors':     { view: 'foundations', group: 'atomic',       topic: 'colors' },
  'foundations/tokens':     { view: 'foundations', group: 'atomic',       topic: 'layout' },
  'foundations/spacing':    { view: 'foundations', group: 'atomic',       topic: 'layout' },
  'foundations/components': { view: 'foundations', group: 'components',   topic: 'list' },
  'foundations/brand':      { view: 'foundations', group: 'brand',        topic: 'ui-glyphs' },
  'components':             { view: 'foundations', group: 'components',   topic: 'list' },
  // 上一版 showcase 三段 → 新三段（Components / Brand / Icon Library 升 group 後）
  'foundations/showcase/components':   { view: 'foundations', group: 'components',   topic: 'list' },
  'foundations/showcase/brand':        { view: 'foundations', group: 'brand',        topic: 'ui-glyphs' },
  'foundations/showcase/icon-library': { view: 'foundations', group: 'icon-library', topic: 'all-icons' },
};

function parseRoute() {
  const h = window.location.hash.replace('#', '');
  if (!h) return { view: 'intro', group: null, topic: null, sub: null };
  if (LEGACY_HASH_ALIASES[h]) {
    const alias = LEGACY_HASH_ALIASES[h];
    if (alias.view === 'foundations' || alias.view === 'explorations') {
      const resolver = alias.view === 'foundations' ? resolveFoundationsRoute : resolveExplorationsRoute;
      const f = alias.group ? { group: alias.group, topic: alias.topic } : defaultSubFor(alias.view);
      const resolved = alias.group ? f : resolver(f.group, f.topic);
      return { view: alias.view, group: resolved.group, topic: resolved.topic, sub: null };
    }
    return { view: alias.view, group: null, topic: null, sub: alias.sub ?? defaultSubFor(alias.view) };
  }
  const parts = h.split('/');
  const view = parts[0];
  if (!VALID_VIEWS.includes(view)) return { view: 'intro', group: null, topic: null, sub: null };
  if (view === 'foundations') {
    const f = resolveFoundationsRoute(parts[1], parts[2]);
    return { view, group: f.group, topic: f.topic, sub: null };
  }
  if (view === 'explorations') {
    const e = resolveExplorationsRoute(parts[1], parts[2]);
    return { view, group: e.group, topic: e.topic, sub: null };
  }
  const subs = subsFor(view);
  if (!subs) return { view, group: null, topic: null, sub: null };
  const rawSub = parts[1];
  const validSub = subs.find(s => s.id === rawSub);
  return { view, group: null, topic: null, sub: validSub ? validSub.id : defaultSubFor(view) };
}

function buildHash(view, payload) {
  if (view === 'foundations' || view === 'explorations') {
    if (payload && payload.group && payload.topic) return `${view}/${payload.group}/${payload.topic}`;
    return view;
  }
  return payload ? `${view}/${payload}` : view;
}

function TocRow({ label, active, hasChildren, expanded, level, onClick }) {
  const isTop = level === 0;
  // level 0 = top tab；level 1 = Foundations group 或 Screens/Explorations sub；level 2 = Foundations leaf
  const padding =
    level === 0 ? '8px 12px' :
    level === 1 ? '6px 10px 6px 26px' :
                  '5px 10px 5px 42px';
  const fontSize =
    level === 0 ? 13.5 :
    level === 1 ? 12 :
                  11.5;
  return (
    <button onClick={onClick} style={{
      display: 'flex', alignItems: 'center', gap: 6,
      width: '100%', textAlign: 'left',
      border: 'none', cursor: 'pointer',
      padding,
      borderRadius: 7,
      background: active ? (isTop ? TOKENS.p500 : 'rgba(67,35,160,0.10)') : 'transparent',
      color: active ? (isTop ? '#fff' : TOKENS.p600) : '#3a3a3a',
      fontSize,
      fontWeight: active ? 600 : 500,
      fontFamily: 'inherit',
      transition: 'background 140ms, color 140ms',
      marginBottom: 2,
      lineHeight: 1.3,
    }}>
      {hasChildren && (
        <svg width="9" height="9" viewBox="0 0 9 9" fill="none"
          stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
          style={{ opacity: active ? 1 : 0.55, flexShrink: 0 }}>
          <path d={expanded ? 'M1.5 3l3 3 3-3' : 'M3 1.5l3 3-3 3'}/>
        </svg>
      )}
      <span style={{ flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
        {label}
      </span>
    </button>
  );
}

function SideTOC({ route, onNavigate }) {
  const { view, sub, group: activeGroup, topic: activeTopic } = route;
  // 每個 Foundations group 維護自身展開狀態；預設只展開選中 leaf 所屬 group。
  const [expandedGroups, setExpandedGroups] = React.useState(() => {
    const init = {};
    FOUNDATIONS_GROUPS.forEach(g => { init[g.id] = view === 'foundations' && g.id === activeGroup; });
    EXPLORATION_GROUPS.forEach(g => { init[g.id] = view === 'explorations' && g.id === activeGroup; });
    return init;
  });
  // 路由變化時自動展開選中 group（其餘維持手動狀態）。
  React.useEffect(() => {
    if ((view === 'foundations' || view === 'explorations') && activeGroup) {
      setExpandedGroups(prev => prev[activeGroup] ? prev : { ...prev, [activeGroup]: true });
    }
  }, [view, activeGroup]);

  const toggleGroup = (gid) => setExpandedGroups(prev => ({ ...prev, [gid]: !prev[gid] }));

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, bottom: 0,
      width: 220, padding: '18px 12px 24px',
      background: 'rgba(255,255,255,0.94)',
      backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)',
      borderRight: '1px solid rgba(0,0,0,0.06)',
      boxShadow: '1px 0 6px rgba(0,0,0,0.04)',
      zIndex: 100,
      overflowY: 'auto',
      fontFamily: '-apple-system, "SF Pro", "PingFang TC", "Noto Sans TC", system-ui, sans-serif',
    }}>
      <div style={{
        fontSize: 16, fontWeight: 700, color: '#212121',
        padding: '0 8px 4px', letterSpacing: -0.2,
      }}>
        SuSuGiGi
      </div>
      <div style={{
        fontSize: 11, color: '#9aa3ad', padding: '0 8px 18px',
        letterSpacing: 0.3, fontWeight: 500,
      }}>
        Design Canvas
      </div>
      {VIEW_TABS.map(t => {
        const active = view === t.id;
        return (
          <div key={t.id}>
            <TocRow
              label={t.label}
              active={active}
              hasChildren={!!t.hasSubs}
              expanded={active}
              level={0}
              onClick={() => onNavigate(t.id, null)}
            />
            {active && groupsFor(t.id) && groupsFor(t.id).map(g => {
              const groupActive = activeGroup === g.id;
              const groupExpanded = !!expandedGroups[g.id];
              return (
                <div key={g.id}>
                  <TocRow
                    label={g.label}
                    active={false}
                    hasChildren={true}
                    expanded={groupExpanded}
                    level={1}
                    onClick={() => toggleGroup(g.id)}
                  />
                  {groupExpanded && g.topics.map(tp => (
                    <TocRow
                      key={tp.id}
                      label={tp.label}
                      active={groupActive && activeTopic === tp.id}
                      level={2}
                      onClick={() => onNavigate(t.id, { group: g.id, topic: tp.id })}
                    />
                  ))}
                </div>
              );
            })}
            {active && !groupsFor(t.id) && t.hasSubs && subsFor(t.id).map(s => (
              <TocRow
                key={s.id}
                label={s.label}
                active={sub === s.id}
                level={1}
                onClick={() => onNavigate(t.id, s.id)}
              />
            ))}
          </div>
        );
      })}
    </div>
  );
}

function App() {
  const [route, setRoute] = React.useState(() => parseRoute());
  React.useEffect(() => {
    const onHashChange = () => setRoute(parseRoute());
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  const navigate = (view, payload) => {
    const finalPayload = payload ?? defaultSubFor(view);
    const next = buildHash(view, finalPayload);
    const currentPayload = view === 'foundations'
      ? (route.view === 'foundations' ? { group: route.group, topic: route.topic } : null)
      : route.sub;
    const current = buildHash(route.view, currentPayload);
    if (next !== current) window.location.hash = next;
  };

  const { view, sub, group: foundationsGroup, topic: foundationsTopic } = route;

  const [sharedFilter, setSharedFilter] = React.useState({
    timeGranularity: 'month',
    groupBy: 'date',
    selectedAccountIds: ACCOUNTS.map(a => a.id),
  });

  const W = 402, H = 874;

  const foundationsTopicEntry = view === 'foundations'
    ? (() => {
        const g = FOUNDATIONS_GROUPS.find(grp => grp.id === foundationsGroup);
        return g ? g.topics.find(tp => tp.id === foundationsTopic) : null;
      })()
    : null;

  const explorationsTopicEntry = view === 'explorations'
    ? (() => {
        const g = EXPLORATION_GROUPS.find(grp => grp.id === foundationsGroup);
        return g ? g.topics.find(tp => tp.id === foundationsTopic) : null;
      })()
    : null;

  return (
    <>
      <SideTOC route={route} onNavigate={navigate}/>
      <DesignCanvas resetKey={
        view === 'foundations'  ? `foundations/${foundationsGroup ?? ''}/${foundationsTopic ?? ''}` :
        view === 'explorations' ? `explorations/${foundationsGroup ?? ''}/${foundationsTopic ?? ''}` :
        `${view}/${sub ?? ''}`
      }>
        {view === 'intro'        && <IntroSection/>}
        {view === 'foundations' && foundationsTopicEntry && (
          <React.Fragment>{foundationsTopicEntry.render()}</React.Fragment>
        )}
        {view === 'screens' && SCREEN_GROUPS.filter(g => g.id === sub).map(group => (
          <DCSection key={group.id} id={`screens-${group.id}`} title={group.title} subtitle={group.subtitle}>
            {group.screens.map(s => (
              <DCArtboard key={s.id} id={s.id} label={s.label} width={W} height={H}>
                <IOSDevice width={W} height={H}>
                  <ScreenFrame pinned={s.id} sharedFilter={sharedFilter} setSharedFilter={setSharedFilter}/>
                </IOSDevice>
              </DCArtboard>
            ))}
          </DCSection>
        ))}
        {view === 'explorations' && explorationsTopicEntry && (
          <React.Fragment>{explorationsTopicEntry.render()}</React.Fragment>
        )}
      </DesignCanvas>
    </>
  );
}

Object.assign(window, { SCREEN_META, SCREEN_GROUPS, ScreenFrame, FOUNDATIONS_GROUPS, EXPLORATION_GROUPS });

ReactDOM.createRoot(document.getElementById('root')).render(<App/>);
