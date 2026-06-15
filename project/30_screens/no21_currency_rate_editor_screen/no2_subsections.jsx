// ─────────────────────────────────────────────────────────────
// CurrencyRateEditorScreen sub-sections · 私有 sub-section 元件
//
// 鏡射 impl src/screens/Settings/CurrencyRateEditorScreen.tsx：
//   RateCurrencyButton / RateAmountInput / RateEqualsSign
//
// 消費 CURRENCY_RATE_EDITOR_SCREEN_TOKENS + atomic。
// ─────────────────────────────────────────────────────────────

// ─── RateCurrencyButton ─── 幣別選擇按鈕（含 disabled 樣式）
function RateCurrencyButton({ code, disabled }) {
  const T = CURRENCY_RATE_EDITOR_SCREEN_TOKENS;
  return (
    <div style={{
      padding: T.PAIR_BUTTON_PADDING,
      borderRadius: T.PAIR_BUTTON_RADIUS,
      background: TOKENS.bg,
      display: 'flex', justifyContent: 'center', alignItems: 'center',
      fontSize: T.PAIR_BUTTON_FONT_SIZE,
      fontWeight: TYPOGRAPHY.weight.medium,
      color: disabled ? TOKENS.ink2 : TOKENS.ink,
    }}>
      {code}
    </div>
  );
}

// ─── RateAmountInput ─── 數字輸入 + 右側 currency code
function RateAmountInput({ value, code }) {
  const T = CURRENCY_RATE_EDITOR_SCREEN_TOKENS;
  return (
    <div style={{
      display: 'flex', flexDirection: 'row', alignItems: 'center',
      borderRadius: T.AMOUNT_INPUT_RADIUS,
      paddingLeft: T.AMOUNT_INPUT_PADDING_H, paddingRight: T.AMOUNT_INPUT_PADDING_H,
      background: TOKENS.bg,
    }}>
      <span style={{
        flex: 1,
        fontSize: T.AMOUNT_INPUT_FONT_SIZE,
        color: TOKENS.ink,
        paddingTop: T.AMOUNT_INPUT_PADDING_V, paddingBottom: T.AMOUNT_INPUT_PADDING_V,
      }}>{value}</span>
      <span style={{
        fontSize: TYPOGRAPHY.size.sm,
        color: TOKENS.ink2,
        marginLeft: SPACING.sm,
      }}>{code}</span>
    </div>
  );
}

// ─── RateEqualsSign ─── 中央「=」字
function RateEqualsSign() {
  const T = CURRENCY_RATE_EDITOR_SCREEN_TOKENS;
  return (
    <span style={{
      fontSize: T.EQUALS_FONT_SIZE,
      fontWeight: TYPOGRAPHY.weight.medium,
      color: TOKENS.ink2,
      marginBottom: SPACING.md,
    }}>=</span>
  );
}

// ─── RateCurrencySelectModal ─── 幣別選擇 modal（pageSheet 內容）
// 鏡射 impl 的 Currency Selector Modal：自繪 header（41×41 圓形 close + 置中 title）、
// 搜尋列（magnify + placeholder）、SelectionListItem 全展開清單（選中顯勾選）。
// 幣別資料引用 CurrencyListScreen subsections 的 CURRENCY_LIST_MOCK。
function RateCurrencySelectModal({ selectedId = 2 }) {
  const T = CURRENCY_RATE_EDITOR_SCREEN_TOKENS;
  return (
    <div style={{
      display: 'flex', flexDirection: 'column', height: '100%',
      background: TOKENS.bg,
    }}>
      {/* Modal header：close 圓鈕 + 置中 title + 等寬 spacer */}
      <div style={{
        display: 'flex', flexDirection: 'row', alignItems: 'center',
        justifyContent: 'space-between',
        padding: T.MODAL_HEADER_PADDING,
        background: TOKENS.surface,
        borderBottom: `1px solid ${TOKENS.border}`,
      }}>
        <div style={{
          width: T.MODAL_CLOSE_SIZE, height: T.MODAL_CLOSE_SIZE,
          borderRadius: T.MODAL_CLOSE_SIZE / 2,
          background: TOKENS.surface2,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          cursor: 'pointer',
        }}>
          <Glyph name="x" size={ICON_SIZE.sm} color={TOKENS.p500}/>
        </div>
        <span style={{
          fontSize: T.MODAL_TITLE_FONT_SIZE,
          fontWeight: TYPOGRAPHY.weight.medium,
          color: TOKENS.ink,
        }}>選擇貨幣</span>
        <div style={{ width: T.MODAL_CLOSE_SIZE }}/>
      </div>

      {/* 搜尋列：modal 頂部 inline 搜尋（impl autoFocus），非 BottomSearchBar */}
      <div style={{
        display: 'flex', flexDirection: 'row', alignItems: 'center',
        padding: T.MODAL_SEARCH_PADDING,
        marginLeft: T.MODAL_SEARCH_MARGIN_H, marginRight: T.MODAL_SEARCH_MARGIN_H,
        marginTop: T.MODAL_SEARCH_MARGIN_TOP,
        borderRadius: T.MODAL_SEARCH_RADIUS,
        gap: T.MODAL_SEARCH_GAP,
        background: TOKENS.surface,
      }}>
        <Glyph name="magnify" size={ICON_SIZE.sm} color={TOKENS.ink2}/>
        <span style={{
          flex: 1, fontSize: T.MODAL_SEARCH_FONT_SIZE, color: TOKENS.ink2,
        }}>搜尋</span>
      </div>

      {/* 幣別清單：B-1 全展開（impl FlatList + SelectionListItem） */}
      <div style={{ flex: 1, overflowY: 'auto', padding: T.MODAL_LIST_PADDING }}>
        {CURRENCY_LIST_MOCK.map(c => (
          <SelectionListItem
            key={c.id}
            title={`${c.alphabeticCode} - ${c.name}`}
            selected={c.id === selectedId}/>
        ))}
      </div>
    </div>
  );
}

Object.assign(window, { RateCurrencyButton, RateAmountInput, RateEqualsSign, RateCurrencySelectModal });
