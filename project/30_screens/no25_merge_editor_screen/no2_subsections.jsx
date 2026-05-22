// ─────────────────────────────────────────────────────────────
// MergeEditorScreen sub-sections · 私有 sub-section 元件
//
// 鏡射 impl src/screens/Merge/MergeEditorScreen.tsx：
//   MergeVisualizationItem / MergeVisualizationRow / MergeWarningBanner
//
// AccountSelector / CategorySelector 已是 components.jsx 對外元件，本檔不重複定義。
// ─────────────────────────────────────────────────────────────

// ─── MergeVisualizationItem ─── 單側視覺化（icon + name；無 item 顯示 placeholder）
function MergeVisualizationItem({ item, highlight }) {
  const T = MERGE_EDITOR_SCREEN_TOKENS;
  if (!item) {
    return (
      <div style={{
        width: T.VISUAL_ITEM_WIDTH,
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
      width: T.VISUAL_ITEM_WIDTH,
      display: 'flex', flexDirection: 'column', alignItems: 'center',
    }}>
      <DynamicIconById iconId={item.iconId} size={ICON_SIZE.lg} color={color}/>
      <span style={{
        marginTop: T.VISUAL_TEXT_TOP_MARGIN,
        fontSize: T.VISUAL_TEXT_FONT_SIZE,
        color,
        fontWeight: TYPOGRAPHY.weight.medium,
        whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
        maxWidth: '100%',
      }}>{item.name}</span>
    </div>
  );
}

// ─── MergeVisualizationRow ─── source → target 一列
function MergeVisualizationRow({ source, target }) {
  const T = MERGE_EDITOR_SCREEN_TOKENS;
  return (
    <div style={{
      display: 'flex', flexDirection: 'row',
      justifyContent: 'space-around', alignItems: 'center',
      paddingTop: T.VISUAL_PADDING_VERTICAL, paddingBottom: T.VISUAL_PADDING_VERTICAL,
      marginBottom: T.VISUAL_BOTTOM_MARGIN,
    }}>
      <MergeVisualizationItem item={source}/>
      <Glyph name="arrow-right" size={ICON_SIZE.lg} color={TOKENS.ink2} stroke={2}/>
      <MergeVisualizationItem item={target} highlight/>
    </div>
  );
}

// ─── MergeWarningBanner ─── 警告 banner（合併無法復原提示）
function MergeWarningBanner() {
  const T = MERGE_EDITOR_SCREEN_TOKENS;
  return (
    <div style={{
      display: 'flex', flexDirection: 'row', alignItems: 'center',
      background: 'rgba(255,184,0,0.12)',                  // (literal: 對齊 impl warning_bg 透明覆層)
      padding: T.WARNING_PADDING,
      borderRadius: T.WARNING_RADIUS,
      marginBottom: T.WARNING_BOTTOM_MARGIN,
    }}>
      <Glyph name="shield" size={ICON_SIZE.sm} color={TOKENS.warning} stroke={2}/>
      <span style={{
        flex: 1,
        marginLeft: SPACING.sm,
        fontSize: T.WARNING_FONT_SIZE,
        color: TOKENS.warning,
        lineHeight: `${T.WARNING_LINE_HEIGHT}px`,
      }}>合併後來源項目將被刪除，並把其資料轉移到目標。此操作有 5 秒 Undo 視窗，逾時無法復原。</span>
    </div>
  );
}

Object.assign(window, { MergeVisualizationItem, MergeVisualizationRow, MergeWarningBanner });
