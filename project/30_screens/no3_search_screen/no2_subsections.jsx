// ─────────────────────────────────────────────────────────────
// SearchScreen sub-sections · 私有 sub-section 元件
//
// 鏡射 impl src/screens/Search/SearchScreen.tsx 拆分：
//   SearchResultRow
//
// inline helper：highlightInText（檔尾，僅 SearchResultRow 用）
//
// V1 (List Treatment) 採納後，row 視覺對齊 HomeScreen 的 TxRow：
//   - 消費 TX_LIST_TOKENS（icon outline + ROW_AMOUNT/NOTE/SECONDARY）
//   - 與 HomeScreen inline TxRow 視覺一致；額外保留 query highlight
// 外層由 SearchScreen entry 用 ListGroupCard 包裹，row 間 hairline divider。
// ─────────────────────────────────────────────────────────────

// ─── SearchResultRow ─── 單筆結果列
// 左：category icon outline（金額為負 → error / 正 → success / 零 → ink）
// 上列：category 名稱 / recurring chip / amount
// 下列：highlighted note + date
function SearchResultRow({ tx, query }) {
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
              color, fontVariantNumeric: 'tabular-nums',
            }}>{fmt(tx.amount, tx.currency)}</span>
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
          }}>{highlightInText(tx.note || '', query)}</span>
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

// ─── highlightInText ─── note 內 query 命中片段強調為 primary
function highlightInText(text, q) {
  if (!q || !q.trim()) return text;
  const parts = text.split(new RegExp(`(${q})`, 'gi'));
  return parts.map((p, i) =>
    p.toLowerCase() === q.toLowerCase()
      ? <span key={i} style={{ color: TOKENS.p500, fontWeight: TYPOGRAPHY.weight.medium }}>{p}</span>
      : <span key={i}>{p}</span>
  );
}

Object.assign(window, { SearchResultRow, highlightInText });
