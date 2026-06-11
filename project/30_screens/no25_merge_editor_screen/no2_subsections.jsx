// ─────────────────────────────────────────────────────────────
// MergeEditorScreen sub-sections · 私有 sub-section 元件
//
// 鏡射 impl src/screens/Merge/MergeEditorScreen.tsx：
//   MergeVisualizationItem / MergeVisualizationRow
//
// 來源 / 目標兩 selector 排原私有 MergePickerBox 已促升為共用元件
// DualPickerBox（20_components），本檔不再定義，screen 直接組
// DualPickerBox + AccountSelector / CategorySelector(noBorder)。
// MergeVisualizationRow 鏡射 DualPickerBox 欄位幾何（引 DUAL_PICKER_BOX_TOKENS），
// 使上排 icon 與下排 picker 文字同欄對齊（對齊 impl visualContainer 作法）。
// AccountSelector / CategorySelector 已是 components.jsx 對外元件，本檔不重複定義。
// ─────────────────────────────────────────────────────────────

// ─── MergeVisualizationItem ─── 單側視覺化（只 icon；無 item 顯示 placeholder）。flex:1 置中，對齊下方 picker 欄
function MergeVisualizationItem({ item, highlight }) {
  const T = MERGE_EDITOR_SCREEN_TOKENS;
  if (!item) {
    return (
      <div style={{
        flex: 1,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <div style={{
          width: T.PLACEHOLDER_ICON_SIZE, height: T.PLACEHOLDER_ICON_SIZE,
          borderRadius: T.PLACEHOLDER_ICON_RADIUS,
          background: TOKENS.surface2,
        }}/>
      </div>
    );
  }
  const color = highlight ? TOKENS.p500 : TOKENS.ink2;
  return (
    <div style={{
      flex: 1,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
    }}>
      <DynamicIconById iconId={item.iconId} size={ICON_SIZE.lg} color={color}/>
    </div>
  );
}

// ─── MergeVisualizationRow ─── 只 icon 一列；鏡射 DualPickerBox 欄位幾何，使 icon 對齊下方 picker 文字
// 透明邊框補回 picker 邊框佔的寬度，對齊 impl visualContainer 引 DUAL_PICKER_BOX_TOKENS 作法。
function MergeVisualizationRow({ source, target }) {
  const T = MERGE_EDITOR_SCREEN_TOKENS;
  const P = DUAL_PICKER_BOX_TOKENS;
  return (
    <div style={{
      display: 'flex', flexDirection: 'row', alignItems: 'center',
      paddingTop: T.VISUAL_PADDING_VERTICAL, paddingBottom: T.VISUAL_PADDING_VERTICAL,
      marginBottom: T.VISUAL_BOTTOM_MARGIN,
      paddingLeft: P.PADDING_HORIZONTAL, paddingRight: P.PADDING_HORIZONTAL,
      borderWidth: P.BORDER_WIDTH, borderStyle: 'solid', borderColor: 'transparent',
    }}>
      <MergeVisualizationItem item={source}/>
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        paddingLeft: P.ARROW_GAP, paddingRight: P.ARROW_GAP,
      }}>
        <Glyph name="arrow-right" size={ICON_SIZE.md} color="transparent" stroke={2}/>
      </div>
      <MergeVisualizationItem item={target} highlight/>
    </div>
  );
}

Object.assign(window, { MergeVisualizationItem, MergeVisualizationRow });
