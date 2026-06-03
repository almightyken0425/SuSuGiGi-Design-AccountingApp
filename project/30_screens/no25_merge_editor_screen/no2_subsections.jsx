// ─────────────────────────────────────────────────────────────
// MergeEditorScreen sub-sections · 私有 sub-section 元件
//
// 鏡射 impl src/screens/Merge/MergeEditorScreen.tsx：
//   MergeVisualizationItem / MergeVisualizationRow / MergePickerBox
//
// 來源 / 目標兩 selector 改成橫向 dual picker box（取代現況的 modal-in-modal
// 與兩 selector 直疊）：外層一個 box 包兩個 noBorder static picker + 中間 → 箭頭，
// 對齊 TransferEditor 的 pickerGroupBox。
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

// ─── MergeVisualizationRow ─── 只 icon 一列；鏡射 MergePickerBox 欄位幾何，使 icon 對齊下方 picker 文字
function MergeVisualizationRow({ source, target }) {
  const T = MERGE_EDITOR_SCREEN_TOKENS;
  return (
    <div style={{
      display: 'flex', flexDirection: 'row', alignItems: 'center',
      paddingTop: T.VISUAL_PADDING_VERTICAL, paddingBottom: T.VISUAL_PADDING_VERTICAL,
      marginBottom: T.VISUAL_BOTTOM_MARGIN,
      paddingLeft: T.PICKER_BOX_PADDING_HORIZONTAL, paddingRight: T.PICKER_BOX_PADDING_HORIZONTAL,
      borderWidth: T.PICKER_BOX_BORDER_WIDTH, borderStyle: 'solid', borderColor: 'transparent',
    }}>
      <MergeVisualizationItem item={source}/>
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        paddingLeft: T.PICKER_BOX_ARROW_GAP, paddingRight: T.PICKER_BOX_ARROW_GAP,
      }}>
        <Glyph name="arrow-right" size={ICON_SIZE.md} color="transparent" stroke={2}/>
      </div>
      <MergeVisualizationItem item={target} highlight/>
    </div>
  );
}

// ─── MergePickerBox ─── 橫向 dual picker box
// 外層一個 box 包兩個 noBorder static picker + 中間 → 箭頭（對齊 TransferEditor pickerGroupBox）。
// conflict=true（來源=目標）時 borderColor 轉 TOKENS.error，對齊 impl pickerGroupBoxError。
// 互動模型：來源列全部、可任選；目標只列與來源相容子集（類別同 type、帳戶同幣別），
// 由 impl filter，design canvas 以預設 sample 示意，不演示 filter。
function MergePickerBox({ sourceLabel, targetLabel, conflict = false }) {
  const T = MERGE_EDITOR_SCREEN_TOKENS;
  return (
    <div style={{
      display: 'flex', flexDirection: 'row', alignItems: 'center',
      background: TOKENS.surface,
      borderRadius: T.PICKER_BOX_RADIUS,
      borderWidth: T.PICKER_BOX_BORDER_WIDTH, borderStyle: 'solid',
      borderColor: conflict ? TOKENS.error : TOKENS.border,
      paddingLeft: T.PICKER_BOX_PADDING_HORIZONTAL,
      paddingRight: T.PICKER_BOX_PADDING_HORIZONTAL,
    }}>
      <div style={{ flex: 1, overflow: 'hidden' }}>
        <StaticWheelPicker label={sourceLabel} noBorder/>
      </div>
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        paddingLeft: T.PICKER_BOX_ARROW_GAP, paddingRight: T.PICKER_BOX_ARROW_GAP,
      }}>
        <Glyph name="arrow-right" size={ICON_SIZE.md} color={TOKENS.ink2}/>
      </div>
      <div style={{ flex: 1, overflow: 'hidden' }}>
        <StaticWheelPicker label={targetLabel} noBorder/>
      </div>
    </div>
  );
}

Object.assign(window, { MergeVisualizationItem, MergeVisualizationRow, MergePickerBox });
