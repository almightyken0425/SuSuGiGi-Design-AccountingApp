// ─────────────────────────────────────────────────────────────
// shared / Editor field helpers · AccountEditor + CategoryEditor 共用
//
// impl 端 AccountEditorScreen 與 CategoryEditorScreen 各自 inline 實作 form group
// （label + input/picker），但兩者結構一致。design canvas 採 global namespace 無法
// 雙 screen 同名 sub-section 共存，故 promote 共用（同 no2_editor_form_helpers
// 的 promotion 邏輯）。
//
// 將來若 impl 重構抽出共用元件（如 EditorFormField），可改升入 20_components/。
//
// 消費 atomic（SPACING / RADIUS / TYPOGRAPHY / TYPE_STYLES / ICON_SIZE / TOKENS）。
// 不消費 screen-level token：本 helper 給多支 screen 用，token 來自 caller 或自帶 default。
// ─────────────────────────────────────────────────────────────

// ─── EditorFieldLabel ─── 欄位上方小標題（含 required *）
function EditorFieldLabel({ children, required }) {
  return (
    <div style={{
      fontSize: TYPOGRAPHY.size.sm, color: TOKENS.ink2,
      marginBottom: SPACING.sm,
    }}>
      {children}{required && ' *'}
    </div>
  );
}

// ─── EditorTextInput ─── 表單文字輸入（design canvas 為 read-only 視覺）
function EditorTextInput({ value, placeholder, disabled }) {
  const isEmpty = !value;
  return (
    <div style={{
      background: TOKENS.surface,
      padding: SPACING.md,
      borderRadius: RADIUS.md,
      fontSize: TYPOGRAPHY.size.base,
      color: disabled ? TOKENS.ink3 : (isEmpty ? TOKENS.ink3 : TOKENS.ink),
    }}>
      {value || placeholder}
    </div>
  );
}

// ─── EditorPickerCollapsed ─── collapsed picker（左 value、右 chevron）
// impl expand 後展開 SelectionListItem 列表，design canvas 不做 expanded variant
function EditorPickerCollapsed({ value, leftIcon, disabled }) {
  return (
    <div style={{
      display: 'flex', flexDirection: 'row',
      justifyContent: 'space-between', alignItems: 'center',
      background: TOKENS.surface,
      padding: SPACING.md,
      borderRadius: RADIUS.md,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: SPACING.sm }}>
        {leftIcon}
        <span style={{
          fontSize: TYPOGRAPHY.size.base,
          color: disabled ? TOKENS.ink3 : TOKENS.ink,
        }}>{value}</span>
      </div>
      {!disabled && (
        <Glyph name="chevron-down" size={ICON_SIZE.sm} color={TOKENS.ink2} stroke={2}/>
      )}
    </div>
  );
}

// ─── EditorSwitchRow ─── 「啟用」開關 row（edit mode only）
function EditorSwitchRow({ label, value }) {
  return (
    <div style={{
      display: 'flex', flexDirection: 'row',
      justifyContent: 'space-between', alignItems: 'center',
      background: TOKENS.surface,
      padding: SPACING.lg,
      borderRadius: RADIUS.md,
      marginBottom: SPACING.xl,
    }}>
      <span style={{ fontSize: TYPOGRAPHY.size.base, color: TOKENS.ink }}>{label}</span>
      <Switch value={value}/>
    </div>
  );
}

// 刪除鈕已收斂為共用元件 DeleteButton（20_components/components.jsx），不再由本 helper 提供。

// ─── EditorNameField ─── 大字置中名稱輸入（V2 form structure 採用：高 80、24px 字、中對齊）
// 對齊 TransactionEditor 的 AmountField 視覺語彙，讓 editor 入口的名稱欄成為視覺焦點。
function EditorNameField({ value, placeholder, active }) {
  const isEmpty = !value;
  return (
    <div style={{
      width: '100%', boxSizing: 'border-box',
      height: 80,
      background: TOKENS.surface,
      padding: SPACING.md,
      borderRadius: RADIUS.md,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontSize: TYPOGRAPHY.size['2xl'],
      fontWeight: TYPOGRAPHY.weight.medium,
      color: isEmpty ? TOKENS.ink3 : TOKENS.ink,
      textAlign: 'center',
    }}>
      {value || placeholder}
    </div>
  );
}

// ─── EditorButtonGroup ─── chip 群組（5 選項以下常駐顯示）
// 短選項清單（5 項以下）常駐顯示採此 pattern。
function EditorButtonGroup({ options, selected }) {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: SPACING.sm }}>
      {options.map(opt => {
        const active = opt === selected;
        return (
          <div key={opt} style={{
            paddingTop: SPACING.sm, paddingBottom: SPACING.sm,
            paddingLeft: SPACING.md, paddingRight: SPACING.md,
            borderRadius: RADIUS.md,
            background: active ? TOKENS.p500 : TOKENS.surface,
            color: active ? 'white' : TOKENS.ink2,
            fontSize: TYPOGRAPHY.size.base,
            fontWeight: active ? TYPOGRAPHY.weight.medium : 'normal',
          }}>{opt}</div>
        );
      })}
    </div>
  );
}

// ─── EditorSearchableDropdownCollapsed ─── 可搜尋下拉的 collapsed 狀態
// V2 採用：收支 / 幣別兩處統一採此 pattern。Canon 渲染 collapsed 狀態示意，
// expanded 狀態（搜尋 input + 清單）見 20_components showcase。
// disabled 為編輯模式鎖定態（幣別、Category 類型在 edit mode 為 disabled）。
function EditorSearchableDropdownCollapsed({ value, placeholder, disabled }) {
  const isEmpty = !value;
  return (
    <div style={{
      display: 'flex', flexDirection: 'row',
      justifyContent: 'space-between', alignItems: 'center',
      background: TOKENS.surface,
      paddingLeft: SPACING.md, paddingRight: SPACING.md,
      borderRadius: RADIUS.md,
      minHeight: 44,
      opacity: disabled ? 0.5 : 1,
    }}>
      <span style={{
        fontSize: TYPOGRAPHY.size.base,
        color: isEmpty ? TOKENS.ink3 : (disabled ? TOKENS.ink2 : TOKENS.ink),
      }}>{value || placeholder}</span>
      {!disabled && (
        <Glyph name="chevron-down" size={ICON_SIZE.sm} color={TOKENS.ink3} stroke={2}/>
      )}
    </div>
  );
}

// ─── EditorInlineIconGrid ─── 4 列常駐圖示網格（V2 採用：圖示 picker 不再折疊）
// Icon Picker V1 結論：移除 header 與 maxHeight、4col 全展開、由外層 label 管理欄位標題。
function EditorInlineIconGrid({ icons, selectedId }) {
  return (
    <div style={{
      background: TOKENS.surface, borderRadius: RADIUS.md,
      display: 'flex', flexWrap: 'wrap', padding: SPACING.sm,
    }}>
      {icons.map(id => (
        <div key={id} style={{
          width: '25%', aspectRatio: 1,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          borderRadius: RADIUS.md, marginTop: 2, marginBottom: 2,
          background: id === selectedId ? TOKENS.p500 : 'transparent',
        }}>
          <DynamicIconById iconId={id} size={ICON_SIZE.md}
            color={id === selectedId ? 'white' : TOKENS.ink}/>
        </div>
      ))}
    </div>
  );
}

Object.assign(window, {
  EditorFieldLabel, EditorTextInput, EditorPickerCollapsed,
  EditorSwitchRow,
  EditorNameField, EditorButtonGroup,
  EditorSearchableDropdownCollapsed, EditorInlineIconGrid,
});
