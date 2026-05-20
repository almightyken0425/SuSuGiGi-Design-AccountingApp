// ─────────────────────────────────────────────────────────────
// Components Showcase · 元件視覺化（純展示，不含 token 表）
//
// 5 個家族 section，各自為 Foundations > Components group 底下一個 leaf：
//   - ComponentsListSection         List / TxList row family
//   - ComponentsFormSection         FormPicker / Chip family
//   - ComponentsNavigationSection   Header / SearchBar / FAB
//   - ComponentsChartSection        Donut / FocusCard
//   - ComponentsInputSection        Switch / Keypad / GlassView
//
// 本檔僅承載「元件實境 demo」。對應的元件級 token 表搬到
// Foundations > Component Tokens 對應 leaf 內。
//
// 所有卡片皆為 live JSX：讀 components.jsx 的元件即時 render。
// ─────────────────────────────────────────────────────────────

function ComponentsListSection() {
  return (
    <DCSection id="comp-list" title="Components · List" subtitle="iOS 風格 grouped list row 元件家族。對應 token 表與 ListSeparator divider inset 規則見 Foundations > Component Tokens 對應 leaf（List / Transaction List / List Empty Transition）。" direction="column">
      <DCArtboard id="comp-listitem" label="ListItem · 變體 (live)" width={402} height={620}>
        <CompFrame>
          <CompLabel>ListItem 不同組合</CompLabel>
          <div style={{ padding: SPACING.lg }}>
            <ListGroupCard>
              <ListItem leftIcon={<Glyph name="tag-outline" size={ICON_SIZE.sm} color={TOKENS.ink} stroke={1.8}/>}
                title="只有 title"/>
              <ListItem leftIcon={<Glyph name="bank-outline" size={ICON_SIZE.sm} color={TOKENS.ink} stroke={1.8}/>}
                title="title + subtitle" subtitle="輔助說明文字"/>
              <ListItem leftIcon={<Glyph name="cog-outline" size={ICON_SIZE.sm} color={TOKENS.ink} stroke={1.8}/>}
                title="title + value + chevron" value="NT$1,200" showChevron/>
              <ListItem title="無 leftIcon · divider 縮到 16px" showChevron/>
              <ListItem leftIcon={<Glyph name="star-outline" size={ICON_SIZE.sm} color={TOKENS.p500} stroke={1.8}/>}
                title="titleColor = primary" titleColor={TOKENS.p500} showChevron/>
              <ListItem leftIcon={<Glyph name="trash" size={ICON_SIZE.sm} color={TOKENS.error} stroke={1.8}/>}
                title="destructive (error 色)" titleColor={TOKENS.error}/>
              <ListItem leftIcon={<Glyph name="bug-outline" size={ICON_SIZE.sm} color={TOKENS.ink} stroke={1.8}/>}
                title="disabled state" disabled/>
            </ListGroupCard>
          </div>
        </CompFrame>
      </DCArtboard>

      <DCArtboard id="comp-selection-list" label="SelectionListItem · 選擇列 (live)" width={402} height={500}>
        <CompFrame>
          <CompLabel>用於 ThemeSettings / Language / Timezone</CompLabel>
          <div style={{ padding: SPACING.lg }}>
            <ListGroupCard>
              <SelectionListItem title="繁體中文" selected/>
              <SelectionListItem title="English"/>
              <SelectionListItem title="日本語"/>
            </ListGroupCard>
          </div>
        </CompFrame>
      </DCArtboard>

      <DCArtboard id="comp-reorderable" label="ReorderableListItem · 60px 拖拉列 (live)" width={402} height={500}>
        <CompFrame>
          <CompLabel>用於 AccountList / CategoryList — 無 drag handle（整列可拖）</CompLabel>
          <div style={{ padding: SPACING.lg }}>
            <ListGroupCard>
              {ACCOUNTS.map(a => (
                <ReorderableListItem key={a.id}
                  leftIcon={<DynamicIconById iconId={a.iconId} size={ICON_SIZE.sm} color={TOKENS.ink}/>}
                  title={a.name} subtitle={a.currency}
                  style={{ height: 60 }}/>
              ))}
            </ListGroupCard>
          </div>
        </CompFrame>
      </DCArtboard>

      <DCArtboard id="comp-grid" label="SelectionGridItem · 卡片風格 (live)" width={402} height={500}>
        <CompFrame>
          <CompLabel>用於 ThemeSettings — preview 區（aspectRatio 1.4）+ title + check-circle 右上角</CompLabel>
          <div style={{ padding: SPACING.lg, display: 'flex', flexWrap: 'wrap', gap: 12 }}>
            <div style={{ width: '47%' }}>
              <SelectionGridItem title="經典紫 (Classic Purple)" selected onPress={()=>{}}>
                <div style={{ flex: 1, background: THEME_1.primary[500] }}/>
                <div style={{ flex: 1, background: THEME_1.primary[900] }}/>
                <div style={{ flex: 1, background: THEME_1.bg.base }}/>
              </SelectionGridItem>
            </div>
            <div style={{ width: '47%' }}>
              <SelectionGridItem title="海洋藍 (Ocean Teal)" onPress={()=>{}}>
                <div style={{ flex: 1, background: THEME_2.primary[500] }}/>
                <div style={{ flex: 1, background: THEME_2.primary[900] }}/>
                <div style={{ flex: 1, background: THEME_2.bg.base }}/>
              </SelectionGridItem>
            </div>
          </div>
        </CompFrame>
      </DCArtboard>

      <DCArtboard id="comp-list-section" label="ListSection · 有/無 title 兩變體 (live)" width={402} height={520}>
        <CompFrame>
          <CompLabel>title 是 optional prop — impl 全部 caller 都沒帶 title（單純用作分組外殼）</CompLabel>
          <div style={{ padding: SPACING.lg }}>
            <ListSection style={{ marginBottom: SPACING.xl }}>
              <ListGroupCard>
                <ListItem title="無 title 變體 · 純容器" showChevron/>
                <ListItem title="Settings 全部 ListSection 都這樣用" showChevron/>
              </ListGroupCard>
            </ListSection>
            <ListSection title="資料管理">
              <ListGroupCard>
                <ListItem title="有 title 變體 · 帶區塊標題" showChevron/>
                <ListItem title="管理類別" showChevron/>
                <ListItem title="管理帳戶" showChevron/>
              </ListGroupCard>
            </ListSection>
          </div>
        </CompFrame>
      </DCArtboard>

      <DCArtboard id="comp-empty-live" label="ListEmptyState (live)" width={402} height={500}>
        <CompFrame>
          <div style={{ padding: 80 }}>
            <ListEmptyState iconName="magnify" title="找不到結果" description="「USD」"/>
          </div>
        </CompFrame>
      </DCArtboard>

      <DCArtboard id="comp-list-empty-transition" label="ListEmptyTransition · 列表與空狀態 crossfade (live)" width={402} height={500}>
        <CompFrame>
          <CompLabel>按按鈕切換 isEmpty，{LIST_EMPTY_TRANSITION.DURATION_MS}ms standard easing crossfade</CompLabel>
          <ListEmptyTransitionDemo/>
        </CompFrame>
      </DCArtboard>
    </DCSection>
  );
}

function ComponentsFormSection() {
  return (
    <DCSection id="comp-form" title="Components · Form" subtitle="Form 觸發器與多選 chip。FormPicker（AccountSelector / CategorySelector）為單一觸發器；CHIP（pill 形多選）用於 RecurringOptions 等多選場景。對應 token 表見 Foundations > Component Tokens > Form Picker / Chip。" direction="column">
      <DCArtboard id="comp-form-placeholder" label="Form 元件 demo 預留位" width={402} height={140}>
        <CompFrame>
          <CompLabel>FormPicker / Chip live demo（規格細節見對應 Component Tokens sub-item）</CompLabel>
        </CompFrame>
      </DCArtboard>
    </DCSection>
  );
}

function ListEmptyTransitionDemo() {
  const [isEmpty, setIsEmpty] = React.useState(false);
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div style={{ padding: SPACING.lg, borderBottom: `1px solid ${TOKENS.hairline2}` }}>
        <button onClick={() => setIsEmpty(v => !v)} style={{
          padding: '8px 16px', borderRadius: RADIUS.md,
          border: `1px solid ${TOKENS.border}`, background: TOKENS.surface,
          color: TOKENS.ink, fontSize: TYPOGRAPHY.size.sm, cursor: 'pointer',
        }}>
          切換 isEmpty（目前 {isEmpty ? 'true' : 'false'}）
        </button>
      </div>
      <div style={{ position: 'relative', flex: 1 }}>
        <ListEmptyTransition
          isEmpty={isEmpty}
          emptyState={<ListEmptyState iconName="magnify" title="找不到結果" description="「USD」"/>}
        >
          <div style={{ padding: SPACING.lg }}>
            <ListGroupCard>
              <ListItem title="交易 1" value="NT$1,200"/>
              <ListItem title="交易 2" value="NT$3,400"/>
              <ListItem title="交易 3" value="NT$560"/>
            </ListGroupCard>
          </div>
        </ListEmptyTransition>
      </div>
    </div>
  );
}

function ComponentsNavigationSection() {
  return (
    <DCSection id="comp-nav" title="Components · Navigation" subtitle="放在 screen 邊界的元件。Header 採 React Navigation 原生 createNativeStackNavigator；NavHeader / ModalHeader 已廢除，配置由下方政策說明界定。" direction="column">
      <DCArtboard id="comp-native-header-policy" label="Native Header Configuration · 政策" width={560} height={620}>
        <CompFrame style={{ padding: SPACING.lg, overflow: 'auto' }}>
          <div style={{
            fontSize: TYPE_STYLES.title3.size,
            fontWeight: TYPOGRAPHY.weight.medium,
            color: TOKENS.ink,
            marginBottom: SPACING.md,
          }}>
            Native Header Configuration
          </div>
          <div style={{
            fontSize: TYPE_STYLES.body.size,
            lineHeight: 1.45,
            color: TOKENS.ink2,
            marginBottom: SPACING.lg,
          }}>
            SuSuGiGi 不自繪 navigation header。所有 push / modal screen 的 header
            由 React Navigation 的 createNativeStackNavigator 渲染，對齊 iOS 26
            Liquid Glass 與 HIG 預設行為（含 minimal back button、原生 blur 等）。
            Design 端 NavHeader / ModalHeader 函式保留作視覺參考但不對外 export，
            screens.jsx 也不再使用。
          </div>

          <PolicyHeading>Push screen 共通 screenOptions</PolicyHeading>
          <PolicyRow token="TYPE_STYLES.body.size" target="headerTitleStyle.fontSize" note="17pt medium，對齊 HIG body"/>
          <PolicyRow token="theme.primary.main" target="headerTintColor" note="back / trailing 顏色"/>
          <PolicyRow token="true" target="headerTransparent" note="無底色，背景內容延伸到 header 後"/>
          <PolicyRow token="'minimal'" target="headerBackButtonDisplayMode" note="iOS 16+ 預設：只圖示不帶文字"/>
          <PolicyRow token="false" target="headerShadowVisible" note="無底邊陰影線"/>

          <PolicyHeading>Trailing / Leading 元件組合</PolicyHeading>
          <PolicyRow token="Home 模式" target="headerLeft = HeaderIconButton('line.3.horizontal.decrease')；headerRight = [HeaderIconButton('magnifyingglass'), HeaderIconButton('gearshape')]"/>
          <PolicyRow token="Push 模式" target="headerRight = HeaderIconButton(action)；leading 由原生 back button 處理"/>

          <PolicyHeading>Modal screen 配置（presentation: 'fullScreenModal'）</PolicyHeading>
          <PolicyRow token="共同基底" target="headerLeft = ModalCloseButton（SF symbol 'xmark'）"/>
          <PolicyRow token="Info Modal" target="無 headerRight。例：Filter / Paywall / Search"/>
          <PolicyRow token="Editor Modal" target="headerRight = HeaderCheckmarkButton（含 disabled 狀態）。例：AccountEditor / CategoryEditor"/>

          <div style={{
            marginTop: SPACING.lg,
            paddingTop: SPACING.md,
            borderTop: `1px solid ${TOKENS.hairline2}`,
            fontSize: TYPE_STYLES.footnote.size,
            color: TOKENS.ink3,
            lineHeight: 1.5,
          }}>
            Impl 原型參照：<code>src/navigation/AppNavigator.tsx</code> 的 screenOptions
            與各 screen 透過 useLayoutEffect + navigation.setOptions 設定的 headerLeft /
            headerRight。
          </div>
        </CompFrame>
      </DCArtboard>
      <DCArtboard id="comp-fab-actions" label="FloatingActionBar · actions (live)" width={402} height={160}>
        <CompFrame style={{ position: 'relative', height: 160, background: TOKENS.bg }}>
          <FloatingActionBar mode="actions" onExpensePress={()=>{}} onTransferPress={()=>{}} onIncomePress={()=>{}}/>
        </CompFrame>
      </DCArtboard>
      <DCArtboard id="comp-fab-undo" label="FloatingActionBar · undo (live)" width={402} height={160}>
        <CompFrame style={{ position: 'relative', height: 160, background: TOKENS.bg }}>
          <FloatingActionBar mode="undo" undoMessage="已刪除交易" remainingTime={4}/>
        </CompFrame>
      </DCArtboard>
      <DCArtboard id="comp-search-pill" label="BottomSearchBar · GlassView pill (live)" width={402} height={140}>
        <CompFrame style={{ position: 'relative', background: TOKENS.bg }}>
          <BottomSearchBar value="" onChangeText={()=>{}} placeholder="搜尋..."/>
        </CompFrame>
      </DCArtboard>
      <DCArtboard id="comp-modal-close" label="ModalCloseButton · X (live)" width={402} height={80}>
        <CompFrame style={{ display: 'flex', alignItems: 'center', padding: 16 }}>
          <ModalCloseButton onPress={()=>{}}/>
        </CompFrame>
      </DCArtboard>
      <DCArtboard id="comp-header-icon-btn" label="HeaderIconButton · SF Symbol (live)" width={402} height={80}>
        <CompFrame style={{ display: 'flex', alignItems: 'center', gap: 4, padding: 16 }}>
          <HeaderIconButton symbol="line.3.horizontal.decrease" color={TOKENS.p500} onPress={() => {}}/>
          <HeaderIconButton symbol="magnifyingglass" color={TOKENS.p500} onPress={() => {}}/>
          <HeaderIconButton symbol="gearshape" color={TOKENS.p500} onPress={() => {}}/>
          <HeaderIconButton symbol="arrow.triangle.merge" color={TOKENS.p500} onPress={() => {}}/>
        </CompFrame>
      </DCArtboard>
      <DCArtboard id="comp-header-check" label="HeaderCheckmarkButton (live)" width={402} height={80}>
        <CompFrame style={{ display: 'flex', alignItems: 'center', gap: 12, padding: 16 }}>
          <HeaderCheckmarkButton onPress={()=>{}}/>
          <HeaderCheckmarkButton onPress={()=>{}} disabled/>
        </CompFrame>
      </DCArtboard>
    </DCSection>
  );
}

function ComponentsChartSection() {
  return (
    <DCSection id="comp-chart" title="Components · Chart" subtitle="DonutChart 是 Home 中央視覺核心。SIZE 260, OUTER 100, INNER 76, CORNER 6, PAD_ANGLE 1deg。FocusCard 切換 expense / income 模式。" direction="column">
      <DCArtboard id="comp-donut" label="DonutChart (live)" width={402} height={360}>
        <CompFrame style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: 32 }}>
          <DonutChart data={pieData(TX).map(d => ({ key: d.id, value: d.value, color: d.color }))}>
            <div style={{ textAlign: 'center', width: 100 }}>
              <div style={{ fontSize: TYPOGRAPHY.size.sm, color: TOKENS.ink2, marginBottom: 4 }}>餘額</div>
              <div style={{
                fontSize: TYPOGRAPHY.size.xl, fontWeight: TYPOGRAPHY.weight.medium,
                color: TOKENS.ink, fontVariantNumeric: 'tabular-nums',
              }}>{fmt(periodTotals(TX).balance)}</div>
            </div>
          </DonutChart>
        </CompFrame>
      </DCArtboard>
      <DCArtboard id="comp-focus" label="FocusCard · active / inactive (live)" width={402} height={180}>
        <CompFrame style={{ padding: 16 }}>
          <div style={{ display: 'flex', gap: 12 }}>
            <FocusCard kind="expense" amount={4395} active onPress={()=>{}}/>
            <FocusCard kind="income"  amount={68000} active={false} onPress={()=>{}}/>
          </div>
        </CompFrame>
      </DCArtboard>
    </DCSection>
  );
}

function ComponentsInputSection() {
  return (
    <DCSection id="comp-input" title="Components · Input" subtitle="Switch / CalculatorKeypad / GlassView。CalculatorKeypad 是完整四則運算鍵盤，operator 用 primary[100]*0.5 玻璃染色。對應 SWITCH_TOKENS 表見 Foundations > Component Tokens > Switch。" direction="column">
      <DCArtboard id="comp-switch" label="Switch · default / brand 兩變體 (live)" width={402} height={260}>
        <CompFrame style={{ padding: SPACING.xl }}>
          <CompLabel>採 RN 原生 Switch。trackColor 由 SWITCH_TOKENS 提供兩變體</CompLabel>
          <div style={{ display: 'flex', flexDirection: 'column', gap: SPACING.lg, marginTop: SPACING.md }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: SPACING.md }}>
              <SwitchDemo defaultValue={true} trackColorOn={SWITCH_TOKENS.TRACK_COLOR_ON.default}/>
              <SwitchDemo defaultValue={false} trackColorOn={SWITCH_TOKENS.TRACK_COLOR_ON.default}/>
              <span style={{ fontSize: TYPE_STYLES.footnote.size, color: TOKENS.ink2 }}>
                default · status.success（AccountEditor / CategoryEditor 用）
              </span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: SPACING.md }}>
              <SwitchDemo defaultValue={true} trackColorOn={SWITCH_TOKENS.TRACK_COLOR_ON.brand}/>
              <SwitchDemo defaultValue={false} trackColorOn={SWITCH_TOKENS.TRACK_COLOR_ON.brand}/>
              <span style={{ fontSize: TYPE_STYLES.footnote.size, color: TOKENS.ink2 }}>
                brand · primary.main（RecurringOptions / CurrencyDetailConfig 用）
              </span>
            </div>
          </div>
        </CompFrame>
      </DCArtboard>
      <DCArtboard id="comp-keypad" label="CalculatorKeypad · 1-2-3-+ / 4-5-6-− / 7-8-9-× / .-0-=-÷ (live)" width={402} height={320}>
        <CompFrame style={{ padding: 0 }}>
          <CalculatorKeypad onPress={()=>{}}/>
        </CompFrame>
      </DCArtboard>
      <DCArtboard id="comp-glass" label="GlassView · pill (live)" width={402} height={140}>
        <CompFrame style={{ padding: 24, background: 'linear-gradient(135deg, #4323a0, #c0b6df)' }}>
          <GlassView pill style={{ padding: '12px 20px', display: 'inline-flex', alignItems: 'center', gap: 8 }}>
            <Glyph name="line.3.horizontal.decrease" size={ICON_SIZE.xs} color={TOKENS.ink} stroke={2}/>
            <span style={{ color: TOKENS.ink, fontWeight: 500 }}>Glass pill</span>
          </GlassView>
        </CompFrame>
      </DCArtboard>
    </DCSection>
  );
}

function SwitchDemo({ defaultValue, trackColorOn }) {
  const [v, setV] = React.useState(defaultValue);
  return <Switch value={v} onChange={setV} trackColorOn={trackColorOn}/>;
}

function CompFrame({ children, style = {} }) {
  return (
    <div style={{
      width: '100%', height: '100%',
      background: TOKENS.bg, overflow: 'hidden',
      fontFamily: '-apple-system, "SF Pro Text", "PingFang TC", "Noto Sans TC", system-ui, sans-serif',
      color: TOKENS.ink, ...style,
    }}>{children}</div>
  );
}
function CompLabel({ children }) {
  return (
    <div style={{
      padding: '12px 16px 6px',
      fontSize: 11, fontWeight: 600, letterSpacing: 1, color: TOKENS.ink3,
      textTransform: 'uppercase',
    }}>{children}</div>
  );
}

// PolicyHeading / PolicyRow — Native Header Configuration 等政策段落用的 text 元件。
function PolicyHeading({ children }) {
  return (
    <div style={{
      fontSize: TYPE_STYLES.headline.size,
      fontWeight: TYPOGRAPHY.weight.medium,
      color: TOKENS.ink,
      marginTop: SPACING.lg,
      marginBottom: SPACING.sm,
    }}>{children}</div>
  );
}
function PolicyRow({ token, target, note }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'flex-start',
      paddingTop: SPACING.xs, paddingBottom: SPACING.xs,
      borderBottom: `1px solid ${TOKENS.hairline2}`,
    }}>
      <div style={{
        flex: '0 0 38%',
        fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
        fontSize: TYPE_STYLES.footnote.size,
        color: TOKENS.p700,
        wordBreak: 'break-all',
      }}>{token}</div>
      <div style={{ flex: 1, paddingLeft: SPACING.sm }}>
        <div style={{
          fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
          fontSize: TYPE_STYLES.footnote.size,
          color: TOKENS.ink,
        }}>{target}</div>
        {note && (
          <div style={{
            fontSize: TYPE_STYLES.caption1.size,
            color: TOKENS.ink3,
            marginTop: 2,
          }}>{note}</div>
        )}
      </div>
    </div>
  );
}

Object.assign(window, {
  ComponentsListSection,
  ComponentsFormSection,
  ComponentsNavigationSection,
  ComponentsChartSection,
  ComponentsInputSection,
});
