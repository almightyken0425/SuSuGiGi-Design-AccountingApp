// ─────────────────────────────────────────────────────────────
// SearchScreen sub-sections · 私有 sub-section 元件
//
// 鏡射 impl src/screens/Search/SearchScreen.tsx 拆分：
//   SearchResultRow
//
// inline helper：fmtSearchAmount（檔尾，金額號別格式化）
//
// V1 (List Treatment) 採納後，row 視覺對齊 HomeScreen 的 TxRow：
//   - 消費 TX_LIST_TOKENS（icon outline + ROW_AMOUNT/NOTE/SECONDARY）
//   - 與 HomeScreen inline TxRow 視覺一致（note 不做命中高亮，統一次要色 ink2）
// 外層由 SearchScreen entry 用 ListGroupCard 包裹，row 間 hairline divider。
// ─────────────────────────────────────────────────────────────

// ─── SearchResultRow ─── 單筆結果列
// 左：icon outline — 交易為類別圖、轉帳為 swap-horizontal，皆主題色 p500（無類別退灰）
// 上列：標題（交易=類別名／轉帳=來源帳戶 → 目的帳戶）/ recurring chip / 金額
// 下列：highlighted note + date
// 金額：中性主題色 p900；收入無號、支出負號置於幣別符號後（NT$-185）、轉帳不帶號；
//       跨幣別轉帳兩端金額單行併排（US$100 → NT$3,200，toAmount 為 to 端實收）。
// 文字色對標 HomeScreen（no1_home_screen 的 TxRow / AmountCol），改色須兩處連動：
//   主文字 ink ←→ Home TxRow primary；次要 ink2 ←→ Home TxRow secondary / AmountCol ≈；金額 p900 ←→ Home AmountCol。
function SearchResultRow({ tx }) {
  const isTransfer = tx.type === 'transfer';
  const cat = isTransfer ? null : CAT_BY_ID[tx.cat];

  // 轉帳兩端帳戶（名稱 + 幣別由 ACC_BY_ID 查）
  const fromAcc = isTransfer ? ACC_BY_ID[tx.fromAcc] : null;
  const toAcc   = isTransfer ? ACC_BY_ID[tx.toAcc]   : null;
  const crossCurrency = isTransfer && fromAcc.currency !== toAcc.currency;

  // 金額文字：交易依正負決定號別、轉帳不帶號；跨幣別轉帳併排兩端
  let amountText;
  if (isTransfer) {
    const fromText = fmtSearchAmount(Math.abs(tx.amount), fromAcc.currency, 'neutral');
    amountText = crossCurrency
      ? `${fromText} → ${fmtSearchAmount(tx.toAmount, toAcc.currency, 'neutral')}`
      : fromText;
  } else {
    amountText = fmtSearchAmount(tx.amount, tx.currency, tx.amount < 0 ? 'expense' : 'income');
  }

  const titleAccountStyle = {
    minWidth: 0, flexShrink: 1,
    fontSize: TX_LIST_TOKENS.ROW_NOTE_SIZE, color: TOKENS.ink,
    whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
  };

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
        {isTransfer
          ? <Glyph name="swap-horizontal" size={ICON_SIZE.sm} color={TOKENS.p500} stroke={2}/>
          : <DynamicIconById iconId={cat.iconId} size={ICON_SIZE.sm} color={TOKENS.p500}/>}
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'baseline',
          marginBottom: SPACING['2xs'],
        }}>
          {isTransfer ? (
            <div style={{
              flex: 1, marginRight: SPACING.sm, minWidth: 0,
              display: 'flex', alignItems: 'center', gap: SPACING['2xs'],
            }}>
              <span style={titleAccountStyle}>{fromAcc.name}</span>
              <span style={{ flexShrink: 0, fontSize: TX_LIST_TOKENS.ROW_NOTE_SIZE, color: TOKENS.ink2 }}>→</span>
              <span style={titleAccountStyle}>{toAcc.name}</span>
            </div>
          ) : (
            <span style={{
              flex: 1, marginRight: SPACING.sm,
              fontSize: TX_LIST_TOKENS.ROW_NOTE_SIZE,
              color: TOKENS.ink,
              whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
            }}>{cat.name}</span>
          )}
          <div style={{ display: 'flex', alignItems: 'center', gap: SPACING.sm, flexShrink: 0 }}>
            {tx.recurring && (
              <div style={{
                width: SEARCH_SCREEN_TOKENS.RECURRING_FRAME,
                height: SEARCH_SCREEN_TOKENS.RECURRING_FRAME,
                borderRadius: SEARCH_SCREEN_TOKENS.RECURRING_RADIUS,
                background: TOKENS.bg,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <Glyph name="repeat" size={SEARCH_SCREEN_TOKENS.RECURRING_ICON_SIZE}
                  color={TOKENS.ink3} stroke={2}/>
              </div>
            )}
            <span style={{
              fontSize: TX_LIST_TOKENS.ROW_AMOUNT_SIZE,
              fontWeight: TX_LIST_TOKENS.ROW_AMOUNT_WEIGHT,
              color: TOKENS.p900, fontVariantNumeric: NUMERIC_FONT_VARIANT,
            }}>{amountText}</span>
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
          }}>{tx.note || ''}</span>
          <span style={{
            flexShrink: 0,
            fontSize: TX_LIST_TOKENS.ROW_SECONDARY_SIZE, color: TOKENS.ink2,
            fontVariantNumeric: NUMERIC_FONT_VARIANT,
          }}>{tx.date}</span>
        </div>
      </div>
    </div>
  );
}

// ─── fmtSearchAmount ─── 金額顯示：收入/轉帳無號；支出負號置於幣別符號後（NT$-185）
// mode: 'expense' → 符號後負號；'income' / 'neutral' → 無號。
// 有別於 fmt() 的符號前負號（-NT$185）；search 列收支靠號別 + 中性 p900 色區分，不用紅綠。
function fmtSearchAmount(amount, currency, mode) {
  const symbol = currencySymbolFor(currency || 'TWD');
  const abs = Math.abs(amount).toLocaleString('en-US');
  return mode === 'expense' ? `${symbol}-${abs}` : `${symbol}${abs}`;
}

Object.assign(window, { SearchResultRow, fmtSearchAmount });
