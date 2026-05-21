// ─────────────────────────────────────────────────────────────
// SearchScreen sub-sections · 私有 sub-section 元件
//
// 鏡射 impl src/screens/Search/SearchScreen.tsx 拆分：
//   SearchResultRow
//
// inline helper：highlightInText（檔尾，僅 SearchResultRow 用）
// 消費 SEARCH_SCREEN_TOKENS + atomic + LIST_TOKENS。
// ─────────────────────────────────────────────────────────────

// ─── SearchResultRow ─── 單筆結果列
// 左：category icon（金額為負 → error / 正 → success / 零 → ink）
// 右上：recurring chip + amount
// 右下：highlighted note + date
function SearchResultRow({ tx, query }) {
  const T = SEARCH_SCREEN_TOKENS;
  const cat = CAT_BY_ID[tx.cat];
  const color = tx.amount < 0 ? TOKENS.error
              : tx.amount > 0 ? TOKENS.success
              : TOKENS.ink;
  return (
    <div style={{
      display: 'flex', alignItems: 'center',
      padding: SPACING.lg,
      borderBottom: `1px solid ${TOKENS.surface}`,
    }}>
      <div style={{
        marginRight: SPACING.lg,
        width: T.RESULT_ICON_FRAME,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <DynamicIconById iconId={cat.iconId} size={ICON_SIZE.md} color={color}/>
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{
          display: 'flex', justifyContent: 'space-between',
          marginBottom: T.RESULT_HEADER_BOTTOM_MARGIN,
        }}>
          <span style={{
            fontSize: TYPOGRAPHY.size.base, fontWeight: TYPOGRAPHY.weight.medium,
            color: TOKENS.ink,
          }}>{cat.name}</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: T.RESULT_RIGHT_GAP }}>
            {tx.recurring && (
              <div style={{
                width: T.RECURRING_FRAME, height: T.RECURRING_FRAME,
                borderRadius: T.RECURRING_RADIUS,
                background: TOKENS.bg,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <Glyph name="repeat" size={T.RECURRING_ICON_SIZE} color={TOKENS.ink3} stroke={2}/>
              </div>
            )}
            <span style={{
              fontSize: TYPOGRAPHY.size.base, fontWeight: TYPOGRAPHY.weight.medium,
              color, fontVariantNumeric: 'tabular-nums',
            }}>{fmt(tx.amount, tx.currency)}</span>
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ flex: 1, paddingRight: T.NOTE_RIGHT_PADDING, minWidth: 0 }}>
            <span style={{
              fontSize: TYPOGRAPHY.size.sm, color: TOKENS.ink2,
              whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
              display: 'block',
            }}>{highlightInText(tx.note || '', query)}</span>
          </div>
          <span style={{
            fontSize: TYPOGRAPHY.size.sm, color: TOKENS.ink2,
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
