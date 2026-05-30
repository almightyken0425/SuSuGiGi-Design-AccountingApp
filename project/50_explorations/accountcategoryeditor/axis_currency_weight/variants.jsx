// ─────────────────────────────────────────────────────────────
// Exploration · AccountCategoryEditor · Axis · Currency Symbol
//
// typeset 幣別符號的三個決定，集中在這一個 topic：
//   1. 字重 → 已採用 400（300 vs 400 比較表保留作紀錄）
//   2. 多字元符號處理 → 符號（NT$ / kr / Kč）vs 三碼代號（TWD / SEK / CZK）
//   3. 去重 → 155 個幣別 vs 106 個唯一符號（美元家族示範）
// CurrencySymbolIcon / CURRENCY_SYMBOLS_ALL 來自 Foundations，全域可用。
// ─────────────────────────────────────────────────────────────

// ── 決定 1：字重（已採用 400，保留紀錄）──────────────────────
const CWX_PHOSPHOR_IDS = [1, 3, 13, 22, 53, 60, 75, 82, 84, 88];
const CWX_CURRENCIES = [
  { code: 'USD', symbol: '$' },
  { code: 'EUR', symbol: '€' },
  { code: 'GBP', symbol: '£' },
  { code: 'JPY', symbol: '¥' },
  { code: 'KRW', symbol: '₩' },
  { code: 'INR', symbol: '₹' },
  { code: 'RUB', symbol: '₽' },
  { code: 'THB', symbol: '฿' },
  { code: 'VND', symbol: '₫' },
  { code: 'PHP', symbol: '₱' },
];

function CurrencyWeightExploreCard() {
  const SZ = 40;
  const head = { flex: 1, fontSize: 12, fontWeight: TYPOGRAPHY.weight.semibold, color: TOKENS.ink2, textAlign: 'center' };
  const cell = { flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 4, padding: '12px 0' };
  return (
    <div style={{ background: TOKENS.surface, borderRadius: RADIUS.md, padding: SPACING.lg, width: 520 }}>
      <div style={{ display: 'flex', gap: 8, paddingBottom: 10, marginBottom: 4, borderBottom: `1px solid ${TOKENS.divider.hairline}` }}>
        <div style={head}>Phosphor（現有）</div>
        <div style={head}>typeset 300</div>
        <div style={{ ...head, color: TOKENS.p500 }}>typeset 400 ✓</div>
      </div>
      {CWX_CURRENCIES.map(function (c, i) {
        const phId = CWX_PHOSPHOR_IDS[i];
        const last = i === CWX_CURRENCIES.length - 1;
        return (
          <div key={c.code} style={{ display: 'flex', gap: 8, alignItems: 'center', borderBottom: last ? 'none' : `1px solid ${TOKENS.divider.hairline}` }}>
            <div style={cell}><DynamicIconById iconId={phId} size={SZ} color={TOKENS.ink}/></div>
            <div style={cell}><CurrencySymbolIcon symbol={c.symbol} size={SZ} color={TOKENS.ink} weight={300}/><code style={{ fontSize: 9, color: TOKENS.ink3 }}>{c.code}</code></div>
            <div style={cell}><CurrencySymbolIcon symbol={c.symbol} size={SZ} color={TOKENS.ink} weight={400}/><code style={{ fontSize: 9, color: TOKENS.ink3 }}>{c.code}</code></div>
          </div>
        );
      })}
    </div>
  );
}

// ── 決定 2：多字元符號處理 ───────────────────────────────────
// 多字元的幣別（NT$ / kr / Kč…）：要顯示「符號」還是「三碼代號」？
const CWX_MULTICHAR = [
  { code: 'TWD', symbol: 'NT$' },
  { code: 'CHF', symbol: 'CHF' },
  { code: 'SEK', symbol: 'kr' },
  { code: 'PLN', symbol: 'zł' },
  { code: 'CZK', symbol: 'Kč' },
  { code: 'BRL', symbol: 'R$' },
  { code: 'MYR', symbol: 'RM' },
  { code: 'IDR', symbol: 'Rp' },
  { code: 'HUF', symbol: 'Ft' },
  { code: 'RON', symbol: 'lei' },
];

function CurrencyMultiCharCard() {
  const SZ = 40;
  const head = { flex: 1, fontSize: 12, fontWeight: TYPOGRAPHY.weight.semibold, color: TOKENS.ink2, textAlign: 'center' };
  const cell = { flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '12px 0' };
  return (
    <div style={{ background: TOKENS.surface, borderRadius: RADIUS.md, padding: SPACING.lg, width: 460 }}>
      <div style={{ display: 'flex', gap: 8, paddingBottom: 10, marginBottom: 4, borderBottom: `1px solid ${TOKENS.divider.hairline}`, paddingLeft: 52 }}>
        <div style={head}>用符號</div>
        <div style={head}>用三碼代號</div>
      </div>
      {CWX_MULTICHAR.map(function (c, i) {
        const last = i === CWX_MULTICHAR.length - 1;
        return (
          <div key={c.code} style={{ display: 'flex', gap: 8, alignItems: 'center', borderBottom: last ? 'none' : `1px solid ${TOKENS.divider.hairline}` }}>
            <code style={{ width: 44, fontSize: 10, color: TOKENS.ink2 }}>{c.code}</code>
            <div style={cell}><CurrencySymbolIcon symbol={c.symbol} size={SZ} color={TOKENS.ink} weight={400}/></div>
            <div style={cell}><CurrencySymbolIcon symbol={c.code} size={SZ} color={TOKENS.ink} weight={400}/></div>
          </div>
        );
      })}
    </div>
  );
}

// ── 決定 3：去重（155 vs 106）────────────────────────────────
function CurrencyDedupCard() {
  const all = CURRENCY_SYMBOLS_ALL;
  const total = all.length;
  const uniq = new Set(all.map(function (c) { return c.symbol; })).size;
  const dollarFamily = all.filter(function (c) { return c.symbol === '$'; });
  const SZ = 32;
  return (
    <div style={{ background: TOKENS.surface, borderRadius: RADIUS.md, padding: SPACING.lg, width: 520 }}>
      <div style={{ fontSize: 13, fontWeight: TYPOGRAPHY.weight.semibold, color: TOKENS.ink, paddingBottom: 4 }}>
        {'全部 ' + total + ' 個幣別 · 只有 ' + uniq + ' 種不同符號'}
      </div>
      <div style={{ fontSize: 11, color: TOKENS.ink2, paddingBottom: 12, lineHeight: 1.5 }}>
        {'有 ' + (total - uniq) + ' 個幣別跟別人共用符號。下面 ' + dollarFamily.length + ' 個幣別的符號全都是「$」——保留＝選擇器裡有 ' + dollarFamily.length + ' 個一模一樣的 $；去重＝只留 1 個 $（帳戶照樣搭自己的幣別代碼）。'}
      </div>
      <div style={{ fontSize: 11, color: TOKENS.ink3, paddingBottom: 6 }}>$ 家族（{dollarFamily.length} 個）：</div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 8 }}>
        {dollarFamily.map(function (c) {
          return (
            <div key={c.code} style={{ padding: '8px 4px', borderRadius: 8, background: TOKENS.surface2, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
              <CurrencySymbolIcon symbol={c.symbol} size={SZ} color={TOKENS.ink} weight={400}/>
              <code style={{ fontSize: 9, color: TOKENS.ink3 }}>{c.code}</code>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ── 決定 4：選擇器排版（含幣別）─────────────────────────────
// 最終帳戶圖示池：原 11 帳戶 icon + BTC/ETH（Phosphor 線稿）+ 去重後 typeset 法幣符號。
function CWX_dedupFiat() {
  const prefer = { '$': 'USD', '¥': 'JPY', '£': 'GBP', 'kr': 'SEK' };
  const bySym = {};
  CURRENCY_SYMBOLS_ALL.forEach(function (c) { if (!(c.symbol in bySym)) bySym[c.symbol] = c; });
  Object.keys(prefer).forEach(function (sym) {
    const rep = CURRENCY_SYMBOLS_ALL.find(function (c) { return c.symbol === sym && c.code === prefer[sym]; });
    if (rep) bySym[sym] = rep;
  });
  return Object.keys(bySym).map(function (s) { return bySym[s]; });
}

function CWX_cryptoIds() {
  const map = {};
  ICON_LIBRARY.forEach(function (i) { map[i.glyph] = i.id; });
  return [map['currency-btc'], map['currency-eth']].filter(function (x) { return x != null; });
}

function CWX_PickerCell({ children }) {
  return (
    <div style={{ width: '25%', height: 46, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: RADIUS.md }}>
      {children}
    </div>
  );
}

function CurrencyPickerLayoutCard({ mode }) {
  const accountIds = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
  const crypto = CWX_cryptoIds();
  const fiat = CWX_dedupFiat();
  const SZ = 22;
  const grid = { display: 'flex', flexWrap: 'wrap', background: TOKENS.surface, borderRadius: RADIUS.md, padding: SPACING.xs };
  const subhdr = { fontSize: TYPOGRAPHY.size.xs, color: TOKENS.ink3, padding: '12px 4px 6px', fontWeight: TYPOGRAPHY.weight.medium };
  function byId(id) { return <DynamicIconById iconId={id} size={SZ} color={TOKENS.ink}/>; }
  function bySym(sym) { return <CurrencySymbolIcon symbol={sym} size={SZ} color={TOKENS.ink} weight={400}/>; }
  if (mode === 'grouped') {
    return (
      <div style={{ width: 340 }}>
        <div style={subhdr}>帳戶</div>
        <div style={grid}>
          {accountIds.map(function (id) { return <CWX_PickerCell key={'a' + id}>{byId(id)}</CWX_PickerCell>; })}
          {crypto.map(function (id) { return <CWX_PickerCell key={'c' + id}>{byId(id)}</CWX_PickerCell>; })}
        </div>
        <div style={subhdr}>{'幣別（' + fiat.length + '）'}</div>
        <div style={grid}>
          {fiat.map(function (c) { return <CWX_PickerCell key={c.code}>{bySym(c.symbol)}</CWX_PickerCell>; })}
        </div>
      </div>
    );
  }
  const totalN = accountIds.length + crypto.length + fiat.length;
  return (
    <div style={{ width: 340 }}>
      <div style={subhdr}>{'圖示（' + totalN + '）'}</div>
      <div style={grid}>
        {accountIds.map(function (id) { return <CWX_PickerCell key={'a' + id}>{byId(id)}</CWX_PickerCell>; })}
        {crypto.map(function (id) { return <CWX_PickerCell key={'c' + id}>{byId(id)}</CWX_PickerCell>; })}
        {fiat.map(function (c) { return <CWX_PickerCell key={c.code}>{bySym(c.symbol)}</CWX_PickerCell>; })}
      </div>
    </div>
  );
}

function AccountCategoryEditorCurrencyWeightSection() {
  return (
    <DCSection
      id="ace-currency-weight"
      title="Axis · Currency Symbol"
      subtitle="幣別符號決定全收斂：字重 400、多字元用符號、去重 106；BTC/ETH 用 Phosphor 線稿。①②③ 為決定紀錄；④⑤ 是選擇器排版（Flat vs Grouped，約 119 個 icon）。">
      <DCArtboard id="ace-cw-table" label="① 字重 · Phosphor vs 300 vs 400（已採用 400）" width={560} height={760}>
        <CurrencyWeightExploreCard/>
      </DCArtboard>
      <DCArtboard id="ace-cw-multichar" label="② 多字元 · 符號 vs 三碼代號（字重 400）" width={500} height={760}>
        <CurrencyMultiCharCard/>
      </DCArtboard>
      <DCArtboard id="ace-cw-dedup" label="③ 去重 · 155 vs 106（美元家族示範）" width={560} height={620}>
        <CurrencyDedupCard/>
      </DCArtboard>
      <DCArtboard id="ace-cw-picker-flat" label="④ 選擇器 · Flat（全部一個 grid，要捲很長）" width={400} height={1560}>
        <CurrencyPickerLayoutCard mode="flat"/>
      </DCArtboard>
      <DCArtboard id="ace-cw-picker-grouped" label="⑤ 選擇器 · Grouped（帳戶 / 幣別 分區）" width={400} height={1620}>
        <CurrencyPickerLayoutCard mode="grouped"/>
      </DCArtboard>
    </DCSection>
  );
}

Object.assign(window, {
  CurrencyWeightExploreCard,
  CurrencyMultiCharCard,
  CurrencyDedupCard,
  CWX_dedupFiat,
  CWX_cryptoIds,
  CWX_PickerCell,
  CurrencyPickerLayoutCard,
  AccountCategoryEditorCurrencyWeightSection,
});
