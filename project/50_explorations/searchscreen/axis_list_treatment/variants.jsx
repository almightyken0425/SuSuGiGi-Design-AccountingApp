// ─────────────────────────────────────────────────────────────
// Exploration · SearchScreen · Axis · List Treatment
//
// 三個 variant 比較 SearchScreen 結果列表的容器層與 row 樣式。
// Header（modal 頂部由 IOSDevice 模擬）與 BottomSearchBar 不變，
// 只動 header 以下的結果列表內容。
//
// V1 [Current] · Group Card + Tx Row    — ListGroupCard 外殼 + 沿用 TX_LIST_TOKENS 的 Tx 視覺 row
// V2          · Flat + Tx Row           — 無外殼，扁平 list；row 同 V1
// V3          · Group Card + ListItem   — ListGroupCard + 直接套 ListItem（Settings 風）
//
// 視覺對比要點：
//   - V1 V2 row 內含 icon outline / category 名 / 金額（含正負色與雙幣別） / note(highlight) / date / recurring chip
//   - V3 套 ListItem 後，highlight / 雙幣別 / icon 染色 / recurring chip 視覺權重全部退化
// ─────────────────────────────────────────────────────────────

// ─── Shared mock results ─────────────────────────────────────
// 模擬「咖啡」query 結果。包含：純台幣支出 / recurring chip / 多幣別 convertedAmount /
// 長 note ellipsis 等 row 變化，覆蓋 SearchResultRow 既有資訊密度。
const SLT_QUERY = '咖啡';
const SLT_RESULTS = [
  { id: 'a', cat: 'food', amount: -185,  currency: 'TWD',                          note: '路易莎咖啡',                date: '5/2'  },
  { id: 'b', cat: 'food', amount: -120,  currency: 'TWD',                          note: '咖啡豆 補貨',               date: '5/2', recurring: true },
  { id: 'c', cat: 'ent',  amount: -15,   currency: 'USD', convertedAmount: -480,   note: 'Netflix 訂閱 含咖啡專輯',   date: '5/1', recurring: true },
  { id: 'd', cat: 'shop', amount: -40,   currency: 'USD', convertedAmount: -1290,  note: '咖啡杯禮盒 × 2',            date: '5/1' },
  { id: 'e', cat: 'food', amount: -340,  currency: 'TWD',                          note: '午餐 咖啡甜點套餐',         date: '4/29' },
];

// ─── _slt_highlight ─── 對齊 30_screens/no3_search_screen/no2_subsections.jsx 的 highlightInText
function _slt_highlight(text, q) {
  if (!q || !q.trim()) return text;
  const parts = text.split(new RegExp(`(${q})`, 'gi'));
  return parts.map((p, i) =>
    p.toLowerCase() === q.toLowerCase()
      ? <span key={i} style={{ color: TOKENS.p500, fontWeight: TYPOGRAPHY.weight.medium }}>{p}</span>
      : <span key={i}>{p}</span>
  );
}

// ─── SLT_TxResultRow ─── V1 / V2 共用 row
// 沿用 HomeScreen TxRow + AmountCol 的視覺體系（消費 TX_LIST_TOKENS），
// 並保留 Search 必要的 highlight 與「note + date 同列」雙列排版。
function SLT_TxResultRow({ tx, query }) {
  const cat = CAT_BY_ID[tx.cat];
  const color = tx.amount < 0 ? TOKENS.error
              : tx.amount > 0 ? TOKENS.success
              : TOKENS.ink;
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: SPACING.md,
      paddingTop: SPACING.md, paddingBottom: SPACING.md,
      paddingLeft: SPACING.lg, paddingRight: SPACING.lg,
    }}>
      <div style={{
        width: TX_LIST_TOKENS.ICON_OUTLINE_SIZE,
        height: TX_LIST_TOKENS.ICON_OUTLINE_SIZE,
        borderRadius: TX_LIST_TOKENS.ICON_OUTLINE_RADIUS,
        borderWidth: TX_LIST_TOKENS.ICON_OUTLINE_BORDER_WIDTH,
        borderStyle: 'solid', borderColor: TOKENS.hairline,
        background: TOKENS.surface,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        flexShrink: 0,
      }}>
        <DynamicIconById iconId={cat.iconId} size={ICON_SIZE.sm} color={color}/>
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'baseline',
          marginBottom: SPACING['2xs'],
        }}>
          <span style={{
            fontSize: TX_LIST_TOKENS.ROW_NOTE_SIZE,
            color: TOKENS.ink,
            whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
          }}>{cat.name}</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: SPACING.sm, flexShrink: 0 }}>
            {tx.recurring && (
              <div style={{
                width: 22, height: 22,                          /* (literal: 同 SEARCH_SCREEN_TOKENS.RECURRING_FRAME) */
                borderRadius: RADIUS.sm,
                background: TOKENS.bg,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <Glyph name="repeat" size={14} color={TOKENS.ink3} stroke={2}/>
              </div>
            )}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
              <span style={{
                fontSize: TX_LIST_TOKENS.ROW_AMOUNT_SIZE,
                fontWeight: TX_LIST_TOKENS.ROW_AMOUNT_WEIGHT,
                color, fontVariantNumeric: 'tabular-nums',
              }}>{fmt(tx.amount, tx.currency)}</span>
              {tx.convertedAmount != null && (
                <span style={{
                  fontSize: TX_LIST_TOKENS.ROW_SECONDARY_SIZE,
                  color: TOKENS.ink2, fontVariantNumeric: 'tabular-nums',
                }}>≈ {fmt(tx.convertedAmount, 'TWD')}</span>
              )}
            </div>
          </div>
        </div>
        <div style={{
          display: 'flex', justifyContent: 'space-between',
          alignItems: 'center', gap: SPACING.sm,
        }}>
          <span style={{
            flex: 1, minWidth: 0,
            fontSize: TX_LIST_TOKENS.ROW_SECONDARY_SIZE, color: TOKENS.ink2,
            whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
          }}>{_slt_highlight(tx.note, query)}</span>
          <span style={{
            flexShrink: 0,
            fontSize: TX_LIST_TOKENS.ROW_SECONDARY_SIZE, color: TOKENS.ink2,
            fontVariantNumeric: 'tabular-nums',
          }}>{tx.date}</span>
        </div>
      </div>
    </div>
  );
}

// ─── SLT_Shell ─── 帶 ModalHeader + BottomSearchBar 的 SearchScreen 外殼
// 對齊 ScreenFrame（90_workbench/app.jsx）對 modal screen 的包裝結構：
//   ModalHeader 釘在頂、flex:1 內 scroll body、BottomSearchBar 用 absolute 鎖 body 底。
// search SCREEN_META 標 present: 'modal'、title: '搜尋'。
function SLT_Shell({ children }) {
  return (
    <div style={{
      display: 'flex', flexDirection: 'column', height: '100%',
      position: 'relative', background: TOKENS.bg,
    }}>
      <ModalHeader title="搜尋" onClose={() => {}}/>
      <div style={{
        flex: 1, position: 'relative',
        overflowY: 'auto', overflowX: 'hidden',
      }}>
        <div style={{
          paddingTop: SPACING.md,
          paddingBottom: BOTTOM_SEARCH_BAR_TOTAL_HEIGHT + SPACING['3xl'],
        }}>
          {children}
        </div>
        <BottomSearchBar value={SLT_QUERY} onChangeText={() => {}} placeholder="搜尋..."/>
      </div>
    </div>
  );
}

// ─── V1 · Group Card + Tx Row [Current direction] ───
function SearchScreen_V1_GroupCardTxRow() {
  return (
    <SLT_Shell>
      <div style={{ paddingLeft: SPACING.lg, paddingRight: SPACING.lg }}>
        <ListGroupCard>
          {SLT_RESULTS.map((tx, i) => (
            <div key={tx.id} style={{
              borderTop: i === 0 ? 'none' : `0.5px solid ${TOKENS.hairline}`,
            }}>
              <SLT_TxResultRow tx={tx} query={SLT_QUERY}/>
            </div>
          ))}
        </ListGroupCard>
      </div>
    </SLT_Shell>
  );
}

// ─── V2 · Flat + Tx Row ───
function SearchScreen_V2_FlatTxRow() {
  return (
    <SLT_Shell>
      <div>
        {SLT_RESULTS.map((tx, i) => (
          <div key={tx.id} style={{
            borderTop: i === 0 ? 'none' : `0.5px solid ${TOKENS.hairline}`,
          }}>
            <SLT_TxResultRow tx={tx} query={SLT_QUERY}/>
          </div>
        ))}
      </div>
    </SLT_Shell>
  );
}

// ─── V3 · Group Card + ListItem (Settings 風) ───
// 直接套 ListItem：title=note；subtitle=`${category} · ${date}`；trailing=amount(+recurring icon)。
// 此 variant 是「直接套 Settings」的下限對照，明確展示套 ListItem 必然犧牲：
//   - highlight（subtitle 為純字串，無 JSX 表達能力）→ 此處 title 雖能承載 JSX 但 ListItem 內部 ellipsis 處理會吃掉自訂 node
//   - 雙幣別換算（trailing 高度有限）
//   - icon 染色語意（左 icon 統一為 ink）
//   - recurring chip 的視覺權重（退化為純 icon 不帶 chip background）
function SearchScreen_V3_GroupCardListItem() {
  return (
    <SLT_Shell>
      <div style={{ paddingLeft: SPACING.lg, paddingRight: SPACING.lg }}>
        <ListGroupCard>
          {SLT_RESULTS.map(tx => {
            const cat = CAT_BY_ID[tx.cat];
            const color = tx.amount < 0 ? TOKENS.error
                        : tx.amount > 0 ? TOKENS.success
                        : TOKENS.ink;
            const trailing = (
              <div style={{ display: 'flex', alignItems: 'center', gap: SPACING.sm }}>
                {tx.recurring && (
                  <Glyph name="repeat" size={14} color={TOKENS.ink3} stroke={2}/>
                )}
                <span style={{
                  fontSize: LIST_TOKENS.TRAILING_VALUE_SIZE, color,
                  fontVariantNumeric: 'tabular-nums',
                }}>{fmt(tx.amount, tx.currency)}</span>
              </div>
            );
            return (
              <ListItem
                key={tx.id}
                leftIcon={<DynamicIconById iconId={cat.iconId} size={LIST_TOKENS.ICON_SIZE_MEDIUM} color={TOKENS.ink}/>}
                title={tx.note}
                subtitle={`${cat.name} · ${tx.date}`}
                trailing={trailing}/>
            );
          })}
        </ListGroupCard>
      </div>
    </SLT_Shell>
  );
}

// ─── Section render ──────────────────────────────────────────
function SearchListTreatmentSection() {
  const W = 402, H = 874;
  return (
    <DCSection id="slt-section"
      title="Axis · List Treatment"
      subtitle="探索 SearchScreen 結果列表的容器層與 row 樣式。Header 與 BottomSearchBar 不變，僅比較結果列。V1 為 Current direction。">
      <DCArtboard id="slt-v1-groupcard-txrow"
        label="V1 [Current] · ListGroupCard + Tx Row · 沿用 TX_LIST_TOKENS，row 與 HomeScreen 視覺一致；外層卡片對齊 Settings"
        width={W} height={H}>
        <IOSDevice width={W} height={H}><SearchScreen_V1_GroupCardTxRow/></IOSDevice>
      </DCArtboard>
      <DCArtboard id="slt-v2-flat-txrow"
        label="V2 · Flat + Tx Row · 同 V1 row，但移除卡片外殼；主張「搜尋結果不分組所以不要卡片」"
        width={W} height={H}>
        <IOSDevice width={W} height={H}><SearchScreen_V2_FlatTxRow/></IOSDevice>
      </DCArtboard>
      <DCArtboard id="slt-v3-groupcard-listitem"
        label="V3 · ListGroupCard + ListItem · 直接套 Settings 風 ListItem；犧牲 highlight / 雙幣別 / icon 染色 / recurring chip 視覺權重"
        width={W} height={H}>
        <IOSDevice width={W} height={H}><SearchScreen_V3_GroupCardListItem/></IOSDevice>
      </DCArtboard>
    </DCSection>
  );
}

Object.assign(window, { SearchListTreatmentSection });
