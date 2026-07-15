// ─────────────────────────────────────────────────────────────
// Foundations > Icon Library > All Icons · phosphor SVG icon 池預覽
//
// account tag 40 個（id 1-11 + ambulance/planet 共用 + 策展 16 + 幣別線稿 11）；
// category tag 88 個（id 12-97 + baby + beer-stein）。
// 法幣 typeset 符號 106 筆已於 2026-07 整批移除；舊資料由 impl 開機自癒。
// 對齊 impl assets/definitions/IconDefinition.json。
//
// CurrencySymbolIcon / 挑粗細 / 覆蓋牆為 2026-06 幣別符號提案的歷史工件，
// 池策展後 picker 已不含 typeset 符號，卡片保留備查、不掛 TOC。
// ─────────────────────────────────────────────────────────────

function IconWallCard({ icons }) {
  return (
    <FoundCard>
      <FoundLabel>{`${icons.length} 個 icon · 命名 = IconDefinition.json uniqueName`}</FoundLabel>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8, paddingTop: 8 }}>
        {icons.map(i => (
          <div key={i.id} style={{
            padding: '12px 6px', borderRadius: 8,
            background: TOKENS.surface2,
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6,
          }}>
            <DynamicIconById iconId={i.id} size={ICON_SIZE.md} color={TOKENS.ink}/>
            <code style={{ fontSize: 9.5, color: TOKENS.ink2, textAlign: 'center', wordBreak: 'break-word' }}>{i.uniqueName}</code>
            <code style={{ fontSize: 8, color: TOKENS.ink3 }}>id {i.id}</code>
          </div>
        ))}
      </div>
    </FoundCard>
  );
}

// 幣別符號 icon：把 symbol 排版進一個 icon 方框。
// weight = 字重（數字越小越細）；rounded = 是否加圓角底。
// 多字元符號（NT$ / CHF / kr…）自動縮小字級塞進同一方框。
function CurrencySymbolIcon({ symbol, size = ICON_SIZE.md, color = TOKENS.ink, weight = 400, rounded = false }) {
  const len = [...(symbol || '')].length;
  const ratio = len <= 1 ? 0.94 : len === 2 ? 0.62 : 0.46;
  const glyph = (
    <span style={{
      fontFamily: '-apple-system, "SF Pro Text", "SF Pro Display", system-ui, "Segoe UI", sans-serif',
      fontSize: Math.round(size * ratio),
      fontWeight: weight,
      lineHeight: 1,
      color,
      letterSpacing: len > 2 ? '-0.04em' : 0,
      display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
      width: size, height: size,
      fontVariantNumeric: 'tabular-nums',
    }}>{symbol}</span>
  );
  if (rounded) {
    return (
      <span style={{
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        width: size + 14, height: size + 14, borderRadius: 11, background: TOKENS.surface2,
      }}>{glyph}</span>
    );
  }
  return glyph;
}

// 挑粗細：左欄 Phosphor 線稿是基準，右邊三欄是 typeset 符號的不同字重。
// 看哪一欄的粗細最接近左邊線稿，就用那個。放大到 40px 方便比。
function CurrencyWeightLadderCard() {
  const byGlyph = {};
  ICON_LIBRARY.forEach(function (i) { byGlyph[i.glyph] = i.id; });
  const weights = [100, 300, 500, 700];
  const rows = [
    { code: 'USD', glyph: 'currency-dollar', symbol: '$' },
    { code: 'EUR', glyph: 'currency-eur',    symbol: '€' },
    { code: 'GBP', glyph: 'currency-gbp',    symbol: '£' },
    { code: 'JPY', glyph: 'currency-jpy',    symbol: '¥' },
    { code: 'CNY', glyph: 'currency-cny',    symbol: '¥' },
    { code: 'KRW', glyph: 'currency-krw',    symbol: '₩' },
    { code: 'INR', glyph: 'currency-inr',    symbol: '₹' },
    { code: 'RUB', glyph: 'currency-rub',    symbol: '₽' },
    { code: 'BTC', glyph: 'currency-btc',    symbol: '₿' },
  ];
  const SZ = 40;
  const head = { flex: 1, fontSize: 11, color: TOKENS.ink2, textAlign: 'center' };
  const cell = { flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '10px 0', borderRadius: 8, background: TOKENS.surface };
  const refCell = { flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '10px 0', borderRadius: 8, background: TOKENS.surface2 };
  return (
    <FoundCard>
      <FoundLabel>挑粗細 · 左欄 Phosphor 線稿是基準，右邊三欄是 typeset 符號的不同字重（放大顯示方便比）</FoundLabel>
      <div style={{ display: 'flex', gap: 6, padding: '12px 0 6px', paddingLeft: 50 }}>
        <div style={head}>Phosphor 線稿</div>
        {weights.map(function (w) { return <div key={w} style={head}>{'typeset ' + w}</div>; })}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        {rows.map(function (r) {
          return (
            <div key={r.code} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <code style={{ width: 44, fontSize: 11, color: TOKENS.ink2 }}>{r.code}</code>
              <div style={refCell}>
                {byGlyph[r.glyph] != null
                  ? <DynamicIconById iconId={byGlyph[r.glyph]} size={SZ} color={TOKENS.ink}/>
                  : <span style={{ fontSize: 11, color: TOKENS.ink3 }}>—</span>}
              </div>
              {weights.map(function (w) {
                return <div key={w} style={cell}><CurrencySymbolIcon symbol={r.symbol} size={SZ} color={TOKENS.ink} weight={w}/></div>;
              })}
            </div>
          );
        })}
      </div>
    </FoundCard>
  );
}

// 全幣別覆蓋牆：155 個幣別在預設字重下全部鋪出來，確認風格 + 抓豆腐框。
function CurrencySymbolWallCard({ items, weight = 400 }) {
  const uniq = new Set(items.map(function (i) { return i.symbol; })).size;
  return (
    <FoundCard>
      <FoundLabel>{items.length + ' 個幣別 · ' + uniq + ' 種不同符號（其餘為共用符號，如美元家族）· typeset 字重 ' + weight + '（已採用 400）'}</FoundLabel>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8, paddingTop: 8 }}>
        {items.map(function (it) {
          return (
            <div key={it.code} style={{
              padding: '10px 4px', borderRadius: 8, background: TOKENS.surface2,
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 5,
            }}>
              <CurrencySymbolIcon symbol={it.symbol} size={ICON_SIZE.md} color={TOKENS.ink} weight={weight}/>
              <code style={{ fontSize: 9.5, color: TOKENS.ink2 }}>{it.code}</code>
              <code style={{ fontSize: 8, color: TOKENS.ink3, wordBreak: 'break-word', textAlign: 'center' }}>{it.symbol}</code>
            </div>
          );
        })}
      </div>
    </FoundCard>
  );
}

function FoundationsIconLibraryAllIconsSection() {
  return (
    <DCSection
      id="found-icon-library-all"
      title="Icon Library · All Icons"
      subtitle="126 筆 icon、全部 phosphor svg。account = 40（原 11 + ambulance/planet 共用 + 策展 16 + 幣別線稿 11）；category = 88（12-97 + baby + beer-stein）。法幣 typeset 符號 106 筆已移除。對齊 impl IconDefinition.json。"
    >
      <DCFamily id="icon-walls-family" title="Account × Category" subtitle="左：帳戶池 40（原 11 + ambulance/planet 共用 + 策展 16 + 幣別線稿 11）。右：類別池 88（id 12-97 + baby、beer-stein）。高度自撐、不內捲。">
        <DCArtboard id="icon-account" label="IconDefinition · account tag (live, 40)" width={520} height="auto">
          <IconWallCard icons={ICON_LIBRARY.filter(i => i.tags.includes('account'))}/>
        </DCArtboard>
        <DCArtboard id="icon-category" label="IconDefinition · category tag (live, 88)" width={520} height="auto">
          <IconWallCard icons={ICON_LIBRARY.filter(i => i.tags.includes('category'))}/>
        </DCArtboard>
      </DCFamily>
    </DCSection>
  );
}

Object.assign(window, {
  IconWallCard,
  CurrencySymbolIcon,
  CurrencyWeightLadderCard,
  CurrencySymbolWallCard,
  FoundationsIconLibraryAllIconsSection,
});
