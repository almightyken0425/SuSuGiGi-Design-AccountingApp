// ─────────────────────────────────────────────────────────────
// Exploration · AccountCategoryEditor · Axis · Type & Currency
//
// Category 類型（支出/收入）vs Account 幣別（TWD）的視覺一致性探索。
// 兩者皆有「新增可選、編輯鎖定」特性，但目前外觀不一致。
// 左為 Category，右為 Account。
//
// V0 · 不一致
//     Category 類型 = segmented control；Account 幣別 = collapsed picker
//
// V1 · Unified new mode
//     兩者都改為 collapsed picker（新增模式，可點按展開選單）
//
// V2 · Unified locked state
//     V1 基礎上展示編輯模式：兩者都 disabled，外觀一致
//
// V3 [採用] · Searchable Dropdown · 2026-05-26
//     V1 的 collapsed picker 改為 textbox + 展開 dropdown，可輸入文字搜尋選項
//     設計定案：Category 類型、Account 幣別、Category 標準對照三處統一採此 pattern
// ─────────────────────────────────────────────────────────────

const ACETC_CAT = { name: '飲食', typeLabel: '支出' };
const ACETC_ACC = { name: '玉山活儲', currency: 'TWD' };

const ACETC_TYPE_OPTIONS = ['支出', '收入'];
const ACETC_CURRENCY_OPTIONS = ['TWD', 'USD', 'JPY', 'EUR', 'HKD'];

function ACETC_Shell({ title, children }) {
  return (
    <div style={{ height: '100%', background: TOKENS.bg, display: 'flex', flexDirection: 'column' }}>
      <ModalHeader title={title} onClose={() => {}} onSave={() => {}}/>
      <div style={{ flex: 1, overflowY: 'auto', paddingBottom: 60 }}>
        {children}
      </div>
    </div>
  );
}

function ACETC_SegmentedType() {
  return (
    <div style={{ display: 'flex', gap: SPACING.sm }}>
      {['支出', '收入'].map(t => {
        const active = t === ACETC_CAT.typeLabel;
        return (
          <div key={t} style={{
            flex: 1, padding: SPACING.md, textAlign: 'center',
            background: active ? TOKENS.p500 : TOKENS.surface,
            border: `1px solid ${active ? TOKENS.p500 : TOKENS.divider.hairline}`,
            borderRadius: RADIUS.md,
            color: active ? 'white' : TOKENS.ink2,
            fontSize: TYPOGRAPHY.size.base,
            fontWeight: active ? TYPOGRAPHY.weight.medium : 'normal',
          }}>{t}</div>
        );
      })}
    </div>
  );
}

function ACETC_HR() {
  return <div style={{ height: 1, marginLeft: SPACING.md, background: TOKENS.divider.hairline }}/>;
}

function ACETC_ExpandedList({ options, selected }) {
  return (
    <div style={{ background: TOKENS.surface, borderRadius: RADIUS.md, overflow: 'hidden' }}>
      {options.map((opt, i) => {
        const isSelected = opt === selected;
        return (
          <React.Fragment key={opt}>
            {i > 0 && <ACETC_HR/>}
            <div style={{
              paddingLeft: SPACING.md, paddingRight: SPACING.md,
              paddingTop: SPACING.md, paddingBottom: SPACING.md,
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              minHeight: 44,
            }}>
              <span style={{
                fontSize: TYPOGRAPHY.size.base,
                color: isSelected ? TOKENS.p500 : TOKENS.ink,
                fontWeight: isSelected ? TYPOGRAPHY.weight.medium : 'normal',
              }}>{opt}</span>
              {isSelected && <Glyph name="check" size={ICON_SIZE.sm} color={TOKENS.p500} stroke={2.5}/>}
            </div>
          </React.Fragment>
        );
      })}
    </div>
  );
}

function ACETC_SearchableDropdown({ options, selected, placeholder, defaultOpen }) {
  const [open, setOpen] = React.useState(!!defaultOpen);
  const [query, setQuery] = React.useState('');
  const [value, setValue] = React.useState(selected || '');

  const filtered = options.filter(opt =>
    !query || opt.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div style={{ position: 'relative' }}>
      <div style={{
        display: 'flex', alignItems: 'center', gap: SPACING.sm,
        background: open ? TOKENS.bg : TOKENS.surface,
        borderRadius: RADIUS.md,
        border: `1px solid ${open ? TOKENS.p500 : TOKENS.border}`,
        paddingLeft: SPACING.md, paddingRight: SPACING.md,
        minHeight: 44,
      }}>
        <input
          value={open ? query : value}
          readOnly={!open}
          onChange={e => setQuery(e.target.value)}
          onFocus={() => { setOpen(true); setQuery(''); }}
          onBlur={() => setTimeout(() => { setOpen(false); setQuery(''); }, 150)}
          placeholder={open ? (placeholder || '搜尋...') : (!value ? (placeholder || '選擇...') : '')}
          style={{
            flex: 1, border: 'none', outline: 'none',
            background: 'transparent', fontFamily: 'inherit',
            fontSize: TYPOGRAPHY.size.base,
            color: open ? TOKENS.ink : (value ? TOKENS.ink : TOKENS.ink3),
            cursor: open ? 'text' : 'pointer',
          }}
        />
        <Glyph
          name={open ? 'chevron-up' : 'chevron-down'}
          size={ICON_SIZE.sm} color={open ? TOKENS.p500 : TOKENS.ink3} stroke={2}
        />
      </div>
      {open && (
        <div style={{
          position: 'absolute', left: 0, right: 0, zIndex: 10,
          marginTop: 4,
          background: TOKENS.surface,
          borderRadius: RADIUS.md,
          border: `1px solid ${TOKENS.p500}`,
          overflow: 'hidden',
          maxHeight: 220, overflowY: 'auto',
        }}>
          {filtered.length > 0 ? filtered.map((opt, i) => {
            const isSel = opt === value;
            return (
              <React.Fragment key={opt}>
                {i > 0 && <ACETC_HR/>}
                <div
                  onMouseDown={() => { setValue(opt); setOpen(false); setQuery(''); }}
                  style={{
                    paddingLeft: SPACING.md, paddingRight: SPACING.md,
                    paddingTop: SPACING.md, paddingBottom: SPACING.md,
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                    minHeight: 44, cursor: 'pointer',
                  }}
                >
                  <span style={{
                    fontSize: TYPOGRAPHY.size.base,
                    color: isSel ? TOKENS.p500 : TOKENS.ink,
                    fontWeight: isSel ? TYPOGRAPHY.weight.medium : 'normal',
                  }}>{opt}</span>
                  {isSel && <Glyph name="check" size={ICON_SIZE.sm} color={TOKENS.p500} stroke={2.5}/>}
                </div>
              </React.Fragment>
            );
          }) : (
            <div style={{ padding: SPACING.md, textAlign: 'center', color: TOKENS.ink3, fontSize: TYPOGRAPHY.size.base }}>
              無符合結果
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ─── V0 [Current] ─────────────────────────────────────────────

function ACETC_V0_Category() {
  return (
    <ACETC_Shell title="新增類別">
      <div style={{ padding: SPACING.lg }}>
        <div style={{ marginBottom: SPACING.xl }}>
          <EditorFieldLabel required>類型</EditorFieldLabel>
          <ACETC_SegmentedType/>
        </div>
        <div style={{ marginBottom: SPACING.xl }}>
          <EditorFieldLabel required>名稱</EditorFieldLabel>
          <EditorTextInput value={ACETC_CAT.name}/>
        </div>
        <div style={{ marginBottom: SPACING.xl }}>
          <EditorFieldLabel>標準對照</EditorFieldLabel>
          <EditorPickerCollapsed value="飲食 (其他)"/>
        </div>
        <div style={{ marginBottom: SPACING.xl }}>
          <EditorFieldLabel required>圖示</EditorFieldLabel>
          <EditorPickerCollapsed
            leftIcon={<DynamicIconById iconId={13} size={ICON_SIZE.md} color={TOKENS.ink}/>}
            value="ph-bread"/>
        </div>
      </div>
    </ACETC_Shell>
  );
}

function ACETC_V0_Account() {
  return (
    <ACETC_Shell title="新增帳戶">
      <div style={{ padding: SPACING.lg }}>
        <div style={{ marginBottom: SPACING.xl }}>
          <EditorFieldLabel required>帳戶名稱</EditorFieldLabel>
          <EditorTextInput value={ACETC_ACC.name}/>
        </div>
        <div style={{ marginBottom: SPACING.xl }}>
          <EditorFieldLabel required>幣別</EditorFieldLabel>
          <EditorPickerCollapsed value={ACETC_ACC.currency}/>
        </div>
        <div style={{ marginBottom: SPACING.xl }}>
          <EditorFieldLabel required>類型</EditorFieldLabel>
          <EditorPickerCollapsed value="銀行帳戶"/>
        </div>
        <div style={{ marginBottom: SPACING.xl }}>
          <EditorFieldLabel required>圖示</EditorFieldLabel>
          <EditorPickerCollapsed
            leftIcon={<DynamicIconById iconId={11} size={ICON_SIZE.md} color={TOKENS.ink}/>}
            value="ph-building"/>
        </div>
      </div>
    </ACETC_Shell>
  );
}

// ─── V1 · Unified new mode ────────────────────────────────────

function ACETC_V1_Category() {
  return (
    <ACETC_Shell title="新增類別">
      <div style={{ padding: SPACING.lg }}>
        <div style={{ marginBottom: SPACING.xl }}>
          <EditorFieldLabel required>類型</EditorFieldLabel>
          <EditorPickerCollapsed value={ACETC_CAT.typeLabel}/>
        </div>
        <div style={{ marginBottom: SPACING.xl }}>
          <EditorFieldLabel required>名稱</EditorFieldLabel>
          <EditorTextInput value={ACETC_CAT.name}/>
        </div>
        <div style={{ marginBottom: SPACING.xl }}>
          <EditorFieldLabel>標準對照</EditorFieldLabel>
          <EditorPickerCollapsed value="飲食 (其他)"/>
        </div>
        <div style={{ marginBottom: SPACING.xl }}>
          <EditorFieldLabel required>圖示</EditorFieldLabel>
          <EditorPickerCollapsed
            leftIcon={<DynamicIconById iconId={13} size={ICON_SIZE.md} color={TOKENS.ink}/>}
            value="ph-bread"/>
        </div>
      </div>
    </ACETC_Shell>
  );
}

function ACETC_V1_Account() {
  return (
    <ACETC_Shell title="新增帳戶">
      <div style={{ padding: SPACING.lg }}>
        <div style={{ marginBottom: SPACING.xl }}>
          <EditorFieldLabel required>帳戶名稱</EditorFieldLabel>
          <EditorTextInput value={ACETC_ACC.name}/>
        </div>
        <div style={{ marginBottom: SPACING.xl }}>
          <EditorFieldLabel required>幣別</EditorFieldLabel>
          <EditorPickerCollapsed value={ACETC_ACC.currency}/>
        </div>
        <div style={{ marginBottom: SPACING.xl }}>
          <EditorFieldLabel required>類型</EditorFieldLabel>
          <EditorPickerCollapsed value="銀行帳戶"/>
        </div>
        <div style={{ marginBottom: SPACING.xl }}>
          <EditorFieldLabel required>圖示</EditorFieldLabel>
          <EditorPickerCollapsed
            leftIcon={<DynamicIconById iconId={11} size={ICON_SIZE.md} color={TOKENS.ink}/>}
            value="ph-building"/>
        </div>
      </div>
    </ACETC_Shell>
  );
}

// ─── V2 · Unified locked state (edit mode) ───────────────────

function ACETC_V2_Category() {
  return (
    <ACETC_Shell title="編輯類別">
      <div style={{ padding: SPACING.lg }}>
        <div style={{ marginBottom: SPACING.xl }}>
          <EditorFieldLabel required>類型</EditorFieldLabel>
          <EditorPickerCollapsed value={ACETC_CAT.typeLabel} disabled/>
        </div>
        <div style={{ marginBottom: SPACING.xl }}>
          <EditorFieldLabel required>名稱</EditorFieldLabel>
          <EditorTextInput value={ACETC_CAT.name}/>
        </div>
        <div style={{ marginBottom: SPACING.xl }}>
          <EditorFieldLabel>標準對照</EditorFieldLabel>
          <EditorPickerCollapsed value="飲食 (其他)"/>
        </div>
        <div style={{ marginBottom: SPACING.xl }}>
          <EditorFieldLabel required>圖示</EditorFieldLabel>
          <EditorPickerCollapsed
            leftIcon={<DynamicIconById iconId={13} size={ICON_SIZE.md} color={TOKENS.ink}/>}
            value="ph-bread"/>
        </div>
        <EditorSwitchRow label="啟用類別" value={true}/>
        <DeleteButton label="刪除類別"/>
      </div>
    </ACETC_Shell>
  );
}

function ACETC_V2_Account() {
  return (
    <ACETC_Shell title="編輯帳戶">
      <div style={{ padding: SPACING.lg }}>
        <div style={{ marginBottom: SPACING.xl }}>
          <EditorFieldLabel required>帳戶名稱</EditorFieldLabel>
          <EditorTextInput value={ACETC_ACC.name}/>
        </div>
        <div style={{ marginBottom: SPACING.xl }}>
          <EditorFieldLabel required>幣別</EditorFieldLabel>
          <EditorPickerCollapsed value={ACETC_ACC.currency} disabled/>
        </div>
        <div style={{ marginBottom: SPACING.xl }}>
          <EditorFieldLabel required>類型</EditorFieldLabel>
          <EditorPickerCollapsed value="銀行帳戶"/>
        </div>
        <div style={{ marginBottom: SPACING.xl }}>
          <EditorFieldLabel required>圖示</EditorFieldLabel>
          <EditorPickerCollapsed
            leftIcon={<DynamicIconById iconId={11} size={ICON_SIZE.md} color={TOKENS.ink}/>}
            value="ph-building"/>
        </div>
        <EditorSwitchRow label="啟用帳戶" value={true}/>
        <DeleteButton label="刪除帳戶"/>
      </div>
    </ACETC_Shell>
  );
}

// ─── V3 · Searchable Dropdown ─────────────────────────────────

function ACETC_V3_Category() {
  return (
    <ACETC_Shell title="新增類別">
      <div style={{ padding: SPACING.lg }}>
        <div style={{ marginBottom: SPACING.xl }}>
          <EditorFieldLabel required>類型</EditorFieldLabel>
          <ACETC_SearchableDropdown options={ACETC_TYPE_OPTIONS} selected={ACETC_CAT.typeLabel} defaultOpen/>
        </div>
        <div style={{ marginBottom: SPACING.xl }}>
          <EditorFieldLabel required>名稱</EditorFieldLabel>
          <EditorTextInput value={ACETC_CAT.name}/>
        </div>
        <div style={{ marginBottom: SPACING.xl }}>
          <EditorFieldLabel>標準對照</EditorFieldLabel>
          <EditorPickerCollapsed value="飲食 (其他)"/>
        </div>
        <div style={{ marginBottom: SPACING.xl }}>
          <EditorFieldLabel required>圖示</EditorFieldLabel>
          <EditorPickerCollapsed
            leftIcon={<DynamicIconById iconId={13} size={ICON_SIZE.md} color={TOKENS.ink}/>}
            value="ph-bread"/>
        </div>
      </div>
    </ACETC_Shell>
  );
}

function ACETC_V3_Account() {
  return (
    <ACETC_Shell title="新增帳戶">
      <div style={{ padding: SPACING.lg }}>
        <div style={{ marginBottom: SPACING.xl }}>
          <EditorFieldLabel required>帳戶名稱</EditorFieldLabel>
          <EditorTextInput value={ACETC_ACC.name}/>
        </div>
        <div style={{ marginBottom: SPACING.xl }}>
          <EditorFieldLabel required>幣別</EditorFieldLabel>
          <ACETC_SearchableDropdown options={ACETC_CURRENCY_OPTIONS} selected={ACETC_ACC.currency} defaultOpen/>
        </div>
        <div style={{ marginBottom: SPACING.xl }}>
          <EditorFieldLabel required>類型</EditorFieldLabel>
          <EditorPickerCollapsed value="銀行帳戶"/>
        </div>
        <div style={{ marginBottom: SPACING.xl }}>
          <EditorFieldLabel required>圖示</EditorFieldLabel>
          <EditorPickerCollapsed
            leftIcon={<DynamicIconById iconId={11} size={ICON_SIZE.md} color={TOKENS.ink}/>}
            value="ph-building"/>
        </div>
      </div>
    </ACETC_Shell>
  );
}

// ─── Section render ──────────────────────────────────────────
function AccountCategoryEditorTypeCurrencySection() {
  const W = 402, H = 874;
  return (
    <DCSection id="ace-type-currency"
      title="Axis · Type & Currency"
      subtitle="Category 類型（支出/收入）與 Account 幣別的視覺一致性探索。兩者皆有「新增可選、編輯鎖定」特性。左為 Category，右為 Account。">
      <DCArtboard id="acetc-v0-cat"
        label="V0 [Current] · Category · 類型 = segmented control（新增模式）"
        width={W} height={H}>
        <IOSDevice width={W} height={H}><ACETC_V0_Category/></IOSDevice>
      </DCArtboard>
      <DCArtboard id="acetc-v0-acc"
        label="V0 [Current] · Account · 幣別 = collapsed picker（新增模式，與 Category 外觀不一致）"
        width={W} height={H}>
        <IOSDevice width={W} height={H}><ACETC_V0_Account/></IOSDevice>
      </DCArtboard>

      <DCArtboard id="acetc-v1-cat"
        label="V1 · Unified · Category · 類型 → collapsed picker（新增模式，與幣別一致）"
        width={W} height={H}>
        <IOSDevice width={W} height={H}><ACETC_V1_Category/></IOSDevice>
      </DCArtboard>
      <DCArtboard id="acetc-v1-acc"
        label="V1 · Unified · Account · 幣別 collapsed picker（新增模式）"
        width={W} height={H}>
        <IOSDevice width={W} height={H}><ACETC_V1_Account/></IOSDevice>
      </DCArtboard>

      <DCArtboard id="acetc-v2-cat"
        label="V2 · Locked · Category · 類型 disabled（編輯模式，與 Account 幣別同款鎖定外觀）"
        width={W} height={H}>
        <IOSDevice width={W} height={H}><ACETC_V2_Category/></IOSDevice>
      </DCArtboard>
      <DCArtboard id="acetc-v2-acc"
        label="V2 · Locked · Account · 幣別 disabled（編輯模式）"
        width={W} height={H}>
        <IOSDevice width={W} height={H}><ACETC_V2_Account/></IOSDevice>
      </DCArtboard>

      <DCArtboard id="acetc-v3-cat"
        label="V3 · Searchable Dropdown · Category · 類型 = textbox + dropdown（可搜尋，預設展開）"
        width={W} height={H}>
        <IOSDevice width={W} height={H}><ACETC_V3_Category/></IOSDevice>
      </DCArtboard>
      <DCArtboard id="acetc-v3-acc"
        label="V3 · Searchable Dropdown · Account · 幣別 = textbox + dropdown（可搜尋，預設展開）"
        width={W} height={H}>
        <IOSDevice width={W} height={H}><ACETC_V3_Account/></IOSDevice>
      </DCArtboard>
    </DCSection>
  );
}

Object.assign(window, { AccountCategoryEditorTypeCurrencySection });
