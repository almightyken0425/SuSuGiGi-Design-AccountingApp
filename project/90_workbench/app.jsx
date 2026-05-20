// ─────────────────────────────────────────────────────────────
// App shell · 設計工作台 router
//
// 頂部 4 個 tab：
//   #intro / #foundations / #screens / #explorations
//
// Foundations 內含 5 個 sub-item：Type / Colors / Tokens / Components / Brand。
// Tokens 收跨元件共用原語；元件專屬 token 表已下放 Components 對應 family。
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

const SCREEN_META = {
  // ─── Home ─── default / 邊界狀態
  home: {
    title: 'SuSuGiGi', present: 'push', hasFAB: true,
    render: (ctx) => <HomeScreen filterState={ctx.sharedFilter}/>,
    headerLeft: (ctx) => <HeaderIconButton symbol="line.3.horizontal.decrease" onPress={() => ctx.push('filter')}/>,
    headerRight: (ctx) => (
      <div style={{ display: 'flex', flexDirection: 'row', gap: 4 }}>
        <HeaderIconButton symbol="magnifyingglass" onPress={() => ctx.push('search')}/>
        <HeaderIconButton symbol="gearshape" onPress={() => ctx.push('settings')}/>
      </div>
    ),
  },
  'home-empty': {
    title: 'SuSuGiGi', present: 'push', hasFAB: true,
    render: (ctx) => <HomeScreen filterState={ctx.sharedFilter} variant="empty"/>,
    headerLeft: (ctx) => <HeaderIconButton symbol="line.3.horizontal.decrease" onPress={() => ctx.push('filter')}/>,
    headerRight: (ctx) => (
      <div style={{ display: 'flex', flexDirection: 'row', gap: 4 }}>
        <HeaderIconButton symbol="magnifyingglass" onPress={() => ctx.push('search')}/>
        <HeaderIconButton symbol="gearshape" onPress={() => ctx.push('settings')}/>
      </div>
    ),
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
  // ─── Search ─── default(initial) / with-results / no-results / loading
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
  'search-loading': {
    title: '搜尋', present: 'modal',
    render: () => <SearchScreen variant="loading"/>,
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
  transfer: {
    title: '新增轉帳', present: 'modal', save: true,
    render: () => <TransferEditorScreen/>,
  },
  // ─── Login ─── default / loading
  login: {
    title: '', present: 'none',
    render: () => <LoginScreen/>,
  },
  'login-loading': {
    title: '', present: 'none',
    render: () => <LoginScreen variant="loading"/>,
  },
  settings: {
    title: '設定', present: 'push', headerLeftText: '',
    render: (ctx) => <SettingsScreen
      onAccounts={() => ctx.push('accounts')}
      onCategories={() => ctx.push('categories')}
      onPreference={() => ctx.push('preference')}
      onPaywall={() => ctx.push('paywall')}
      onData={() => ctx.push('data-mgmt')}
      onDebug={() => ctx.push('debug')}
    />,
  },
  preference: {
    title: '偏好設定', present: 'push', headerLeftText: '',
    render: (ctx) => <PreferenceScreen
      onTheme={() => ctx.push('theme')}
      onLaunch={() => ctx.push('launchmode')}
      onCurrency={() => ctx.push('currency')}
      onCurrencyList={() => ctx.push('currlist')}
      onRateList={() => ctx.push('ratelist')}
      onLanguage={() => ctx.push('language')}
      onTimezone={() => ctx.push('timezone')}
    />,
  },
  // ─── Paywall ─── default / loading
  paywall: {
    title: '解鎖 Premium', present: 'modal',
    render: () => <PaywallScreen/>,
  },
  'paywall-loading': {
    title: '解鎖 Premium', present: 'modal',
    render: () => <PaywallScreen variant="loading"/>,
  },
  // ─── Accounts ─── default / empty
  accounts: {
    title: '帳戶', present: 'push', headerLeftText: '',
    render: (ctx) => <AccountListScreen onAdd={() => ctx.push('acc-editor')}/>,
    headerRight: () => <HeaderIconButton symbol="arrow.triangle.merge" color={TOKENS.p500} onPress={() => {}}/>,
  },
  'accounts-empty': {
    title: '帳戶', present: 'push', headerLeftText: '',
    render: (ctx) => <AccountListScreen onAdd={() => ctx.push('acc-editor')} variant="empty"/>,
    headerRight: () => <HeaderIconButton symbol="arrow.triangle.merge" color={TOKENS.p500} onPress={() => {}}/>,
  },
  'acc-editor': {
    title: '新增帳戶', present: 'modal', save: true,
    render: () => <AccountEditorScreen isNew/>,
  },
  'acc-editor-edit': {
    title: '編輯帳戶', present: 'modal', save: true,
    render: () => <AccountEditorScreen isNew={false}/>,
  },
  categories: {
    title: '類別', present: 'push', headerLeftText: '',
    render: (ctx) => <CategoryListScreen
      onAddExpense={() => ctx.push('cat-editor')}
      onAddIncome={() => ctx.push('cat-editor')}/>,
    headerRight: () => <HeaderIconButton symbol="arrow.triangle.merge" color={TOKENS.p500} onPress={() => {}}/>,
  },
  'cat-editor': {
    title: '新增類別', present: 'modal', save: true,
    render: () => <CategoryEditorScreen isNew type="expense"/>,
  },
  'cat-editor-edit': {
    title: '編輯類別', present: 'modal', save: true,
    render: () => <CategoryEditorScreen isNew={false} type="expense"/>,
  },
  theme: {
    title: '主題', present: 'modal', save: true,
    render: () => <ThemeSettingsScreen/>,
  },
  language: {
    title: '語言', present: 'modal', save: true,
    render: () => <LanguageSettingScreen/>,
  },
  timezone: {
    title: '時區', present: 'modal', save: true,
    render: () => <TimeZoneSettingScreen/>,
  },
  launchmode: {
    title: '啟動設定', present: 'modal', save: true,
    render: () => <LaunchModeSettingScreen/>,
  },
  currency: {
    title: '基準貨幣', present: 'modal', save: true,
    render: () => <BaseCurrencySettingScreen/>,
  },
  currlist: {
    title: '貨幣設定', present: 'push', headerLeftText: '',
    render: () => <CurrencyListScreen/>,
  },
  ratelist: {
    title: '匯率管理', present: 'push', headerLeftText: '',
    render: () => <CurrencyRateListScreen/>,
  },
  'ratelist-empty': {
    title: '匯率管理', present: 'push', headerLeftText: '',
    render: () => <CurrencyRateListScreen variant="empty"/>,
  },
  'data-mgmt': {
    title: '資料管理', present: 'push', headerLeftText: '',
    render: () => <DataManagementScreen/>,
  },
  debug: {
    title: 'Debug Info', present: 'push', headerLeftText: '',
    render: () => <DebugInfoScreen/>,
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
    subtitle: '4 種狀態：初始提示輸入 / 載入中 / 有結果 / 找不到結果（src/screens/Search/SearchScreen.tsx）。',
    screens: [
      { id: 'search',              label: 'Initial · 提示輸入' },
      { id: 'search-loading',      label: 'Loading · 搜尋中' },
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
      { id: 'transfer', label: 'Default · 跨幣別' },
    ],
  },
  {
    id: 'login',
    title: 'Login · 登入',
    subtitle: 'Google 登入畫面（src/screens/Auth/LoginScreen.tsx）。',
    screens: [
      { id: 'login',         label: 'Default' },
      { id: 'login-loading', label: 'Loading · 登入中' },
    ],
  },
  {
    id: 'settings',
    title: 'Settings · 設定',
    subtitle: '設定總頁（src/screens/Settings/SettingsScreen.tsx）。',
    screens: [
      { id: 'settings', label: 'Default' },
    ],
  },
  {
    id: 'preference',
    title: 'Preference · 偏好設定',
    subtitle: '偏好設定總頁（src/screens/Settings/PreferenceScreen.tsx）。',
    screens: [
      { id: 'preference', label: 'Default' },
    ],
  },
  {
    id: 'paywall',
    title: 'Paywall · 解鎖 Premium',
    subtitle: 'IAP 訂閱頁（src/screens/Paywall/PaywallScreen.tsx）。',
    screens: [
      { id: 'paywall',         label: 'Default · 顯示產品' },
      { id: 'paywall-loading', label: 'Loading · 載入產品中' },
    ],
  },
  {
    id: 'accounts',
    title: 'Accounts · 帳戶',
    subtitle: '帳戶列表（src/screens/Accounts/AccountListScreen.tsx）。empty 狀態：只顯示新增帳戶按鈕。',
    screens: [
      { id: 'accounts',       label: 'Default · 有帳戶' },
      { id: 'accounts-empty', label: 'Empty · 無帳戶' },
    ],
  },
  {
    id: 'account-editor',
    title: 'Account Editor · 編輯帳戶',
    subtitle: '帳戶編輯器（src/screens/Accounts/AccountEditorScreen.tsx）。新增模式無刪除按鈕；編輯模式有啟用開關 + 刪除。',
    screens: [
      { id: 'acc-editor',      label: '新增模式' },
      { id: 'acc-editor-edit', label: '編輯模式' },
    ],
  },
  {
    id: 'categories',
    title: 'Categories · 類別',
    subtitle: '類別列表（src/screens/Categories/CategoryListScreen.tsx）。支出 / 收入兩個區段。',
    screens: [
      { id: 'categories', label: 'Default' },
    ],
  },
  {
    id: 'category-editor',
    title: 'Category Editor · 編輯類別',
    subtitle: '類別編輯器（src/screens/Categories/CategoryEditorScreen.tsx）。',
    screens: [
      { id: 'cat-editor',      label: '新增模式' },
      { id: 'cat-editor-edit', label: '編輯模式' },
    ],
  },
  {
    id: 'theme',
    title: 'Theme Settings · 主題',
    subtitle: '雙主題切換（src/screens/Settings/ThemeSettingsScreen.tsx）。SelectionGridItem 卡片 + 顏色 preview。',
    screens: [
      { id: 'theme', label: 'Default' },
    ],
  },
  {
    id: 'language',
    title: 'Language Setting · 語言',
    subtitle: 'src/screens/Settings/LanguageSettingScreen.tsx',
    screens: [
      { id: 'language', label: 'Default' },
    ],
  },
  {
    id: 'timezone',
    title: 'TimeZone Setting · 時區',
    subtitle: '帶 BottomSearchBar（src/screens/Settings/TimeZoneSettingScreen.tsx）。',
    screens: [
      { id: 'timezone', label: 'Default' },
    ],
  },
  {
    id: 'launchmode',
    title: 'Launch Mode · 啟動設定',
    subtitle: 'src/screens/Settings/LaunchModeSettingScreen.tsx',
    screens: [
      { id: 'launchmode', label: 'Default' },
    ],
  },
  {
    id: 'base-currency',
    title: 'Base Currency · 基準貨幣',
    subtitle: '帶 BottomSearchBar（src/screens/Settings/BaseCurrencySettingScreen.tsx）。',
    screens: [
      { id: 'currency', label: 'Default' },
    ],
  },
  {
    id: 'currency-list',
    title: 'Currency List · 貨幣設定',
    subtitle: 'src/screens/Settings/CurrencyListScreen.tsx',
    screens: [
      { id: 'currlist', label: 'Default' },
    ],
  },
  {
    id: 'rate-list',
    title: 'Currency Rate List · 匯率管理',
    subtitle: '跨幣別匯率（src/screens/Settings/CurrencyRateListScreen.tsx）。empty 用 currency_rate.empty_state 字串。',
    screens: [
      { id: 'ratelist',       label: 'Default · 有匯率' },
      { id: 'ratelist-empty', label: 'Empty · 尚無匯率' },
    ],
  },
  {
    id: 'data-mgmt',
    title: 'Data Management · 資料管理',
    subtitle: '備份 / 匯入 / 匯出 / 清空（src/screens/Settings/DataManagementScreen.tsx）。',
    screens: [
      { id: 'data-mgmt', label: 'Default' },
    ],
  },
  {
    id: 'debug',
    title: 'Debug Info',
    subtitle: '帳戶活動統計（src/screens/Settings/DebugInfoScreen.tsx）。',
    screens: [
      { id: 'debug', label: 'Default' },
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

  return (
    <div style={{
      width: '100%', height: '100%', position: 'relative',
      background: TOKENS.bg,
      fontFamily: '-apple-system, "SF Pro", "PingFang TC", "Noto Sans TC", system-ui, sans-serif',
      overflow: 'hidden',
    }} data-screen-label={pinned}>
      <div style={{ position: 'absolute', inset: 0, overflowY: 'auto', overflowX: 'hidden' }}>
        {isModal && <ModalHeader title={meta.title} onClose={pop} onSave={meta.save ? pop : undefined}/>}
        {isPush && <PushHeader title={meta.title} leadingText={leadingText} leadingAction={stack.length > 1 ? pop : undefined} trailing={headerRight}/>}
        {body}
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
// 兩層 nav：top-level views 與 sub-items（Screens groups / Explorations topics）。
// 選擇 screens 或 explorations 子項時，canvas 只 render 該子項，避免 canvas 過大。
const VIEW_TABS = [
  { id: 'intro',        label: 'Intro' },
  { id: 'foundations',  label: 'Foundations',  hasSubs: true },
  { id: 'screens',      label: 'Screens',      hasSubs: true },
  { id: 'explorations', label: 'Explorations', hasSubs: true },
];
const VALID_VIEWS = VIEW_TABS.map(t => t.id);

// Foundations topics — 5 個 sub-item。
// 每個 sub-item 對應 foundations.jsx / components-showcase.jsx 註冊的 Section component；
// 內部 DCSection 用 direction="column"，卡片由上往下垂直堆。
// Tokens 收 SPACING / RADIUS / SHADOW / MOTION / ICON_SIZE / HIT_TARGET 共用原語；
// 元件專屬 token 表（LIST / TX_LIST / FORM_PICKER / CHIP / SEARCH / HEADER_ICON / SWITCH /
// LIST_EMPTY_TRANSITION）已下放至 Components sub-item 對應 family 內。
const FOUNDATIONS_TOPICS = [
  { id: 'type',       label: 'Type',       render: () => <FoundationsTypeSection/> },
  { id: 'colors',     label: 'Colors',     render: () => <FoundationsColorsSection/> },
  { id: 'tokens',     label: 'Tokens',     render: () => <FoundationsTokensSection/> },
  { id: 'components', label: 'Components', render: () => <FoundationsComponentsSection/> },
  { id: 'brand',      label: 'Brand',      render: () => <FoundationsBrandSection/> },
];

// Foundations sub-item 舊名向後相容
const FOUNDATIONS_SUB_ALIASES = {
  spacing: 'tokens',
};

// Explorations topics — 每個 entry 對應 50_explorations/<dir>/variants.jsx 註冊的 Section component
const EXPLORATION_TOPICS = [
  { id: 'color-and-mood',    label: 'Axis 1 · Color & Mood',              render: () => <ColorAndMoodSection/> },
  { id: 'surface-material',  label: 'Axis 2 · Surface & Material',        render: () => <SurfaceMaterialSection/> },
  { id: 'iconography',       label: 'Axis 3 · Iconography & Embellishment', render: () => <IconographySection/> },
  { id: 'personality',       label: 'Axis 4 · Personality (packaged)',    render: () => <PersonalityPackagedSection/> },
  { id: 'transaction-editor', label: 'Transaction Editor',                render: () => <TransactionEditorSection/> },
];

const subsFor = (view) => {
  if (view === 'foundations')  return FOUNDATIONS_TOPICS.map(t => ({ id: t.id, label: t.label }));
  if (view === 'screens')      return SCREEN_GROUPS.map(g => ({ id: g.id, label: g.title }));
  if (view === 'explorations') return EXPLORATION_TOPICS.map(t => ({ id: t.id, label: t.label }));
  return null;
};

const defaultSubFor = (view) => {
  const subs = subsFor(view);
  return subs && subs[0] ? subs[0].id : null;
};

// 舊 hash 別名（向後相容）— entry 可以選擇性帶 sub，沒帶就走 defaultSubFor。
const LEGACY_HASH_ALIASES = {
  'overview':       { view: 'screens' },
  'flows':          { view: 'screens' },
  'all':            { view: 'screens' },
  'filter':         { view: 'screens' },
  'tx-list':        { view: 'screens' },
  'recurring':      { view: 'screens' },
  'row-height':     { view: 'screens' },
  'design_system':  { view: 'foundations' },
  'components':     { view: 'foundations', sub: 'components' },
};

function parseRoute() {
  const h = window.location.hash.replace('#', '');
  if (!h) return { view: 'intro', sub: null };
  if (LEGACY_HASH_ALIASES[h]) {
    const alias = LEGACY_HASH_ALIASES[h];
    return { view: alias.view, sub: alias.sub ?? defaultSubFor(alias.view) };
  }
  const [view, rawSub] = h.split('/');
  if (!VALID_VIEWS.includes(view)) return { view: 'intro', sub: null };
  const subs = subsFor(view);
  if (!subs) return { view, sub: null };
  const sub = view === 'foundations' && FOUNDATIONS_SUB_ALIASES[rawSub]
    ? FOUNDATIONS_SUB_ALIASES[rawSub]
    : rawSub;
  const validSub = subs.find(s => s.id === sub);
  return { view, sub: validSub ? validSub.id : defaultSubFor(view) };
}

function buildHash(view, sub) {
  return sub ? `${view}/${sub}` : view;
}

function TocRow({ label, active, hasChildren, expanded, level, onClick }) {
  const isTop = level === 0;
  return (
    <button onClick={onClick} style={{
      display: 'flex', alignItems: 'center', gap: 6,
      width: '100%', textAlign: 'left',
      border: 'none', cursor: 'pointer',
      padding: isTop ? '8px 12px' : '6px 10px 6px 26px',
      borderRadius: 7,
      background: active ? (isTop ? TOKENS.p500 : 'rgba(67,35,160,0.10)') : 'transparent',
      color: active ? (isTop ? '#fff' : TOKENS.p600) : '#3a3a3a',
      fontSize: isTop ? 13.5 : 12,
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

function SideTOC({ view, sub, onNavigate }) {
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
        const subs = t.hasSubs ? subsFor(t.id) : null;
        return (
          <div key={t.id}>
            <TocRow
              label={t.label}
              active={active}
              hasChildren={!!subs}
              expanded={active}
              level={0}
              onClick={() => onNavigate(t.id, null)}
            />
            {active && subs && subs.map(s => (
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

  const navigate = (view, sub) => {
    const finalSub = sub || defaultSubFor(view);
    const next = buildHash(view, finalSub);
    const current = buildHash(route.view, route.sub);
    if (next !== current) window.location.hash = next;
  };

  const { view, sub } = route;

  const [sharedFilter, setSharedFilter] = React.useState({
    timeGranularity: 'month',
    groupBy: 'date',
    selectedAccountIds: ACCOUNTS.map(a => a.id),
  });

  const W = 402, H = 874;

  return (
    <>
      <SideTOC view={view} sub={sub} onNavigate={navigate}/>
      <DesignCanvas resetKey={`${view}/${sub ?? ''}`}>
        {view === 'intro'        && <IntroSection/>}
        {view === 'foundations' && FOUNDATIONS_TOPICS.filter(t => t.id === sub).map(t => (
          <React.Fragment key={t.id}>{t.render()}</React.Fragment>
        ))}
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
        {view === 'explorations' && EXPLORATION_TOPICS.filter(t => t.id === sub).map(t => (
          <React.Fragment key={t.id}>{t.render()}</React.Fragment>
        ))}
      </DesignCanvas>
    </>
  );
}

Object.assign(window, { SCREEN_META, SCREEN_GROUPS, ScreenFrame, FOUNDATIONS_TOPICS, EXPLORATION_TOPICS });

ReactDOM.createRoot(document.getElementById('root')).render(<App/>);
