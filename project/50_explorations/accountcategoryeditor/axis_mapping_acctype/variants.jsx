// ─────────────────────────────────────────────────────────────
// Exploration · AccountCategoryEditor · Axis · Mapping & Account Type
//
// Category 標準對照（B-1 list picker，50+ 選項，含搜尋）
// vs Account 類型（B-1 list picker，5 選項，無搜尋）的體驗一致性探索。
// 左為 Category，右為 Account。
//
// V0 · Collapsed
//     兩者收合狀態已一致（EditorPickerCollapsed）
//
// V1 · Expanded
//     兩者展開後的比較：標準對照顯示搜尋 + 清單，帳戶類型只顯示清單
//
// V2 [採用] · Button group for short list · 2026-05-26
//     帳戶類型（5 選項）改為 inline button group 常駐顯示；
//     標準對照（50+ 選項）走 searchable dropdown（見 axis_type_currency V3 採用）
//     設計定案：本軸的「短選項清單採 button group 常駐」結論落地至 AccountEditor 的類型欄
// ─────────────────────────────────────────────────────────────

const ACEMA_CAT = { name: '飲食', typeLabel: '支出', mapping: '飲食 (其他)' };
const ACEMA_ACC = { name: '玉山活儲', currency: 'TWD', type: '銀行帳戶' };

const ACEMA_MAPPING_OPTIONS = [
  '飲食 (其他)', '外食', '咖啡', '早餐', '午餐', '晚餐', '宵夜', '飲料', '甜點',
];
const ACEMA_ACC_TYPE_OPTIONS = ['銀行帳戶', '信用卡', '現金', '投資', '其他'];

function ACEMA_Shell({ title, children }) {
  return (
    <div style={{ height: '100%', background: TOKENS.bg, display: 'flex', flexDirection: 'column' }}>
      <ModalHeader title={title} onClose={() => {}} onSave={() => {}}/>
      <div style={{ flex: 1, overflowY: 'auto', paddingBottom: 60 }}>
        {children}
      </div>
    </div>
  );
}

function ACEMA_HR() {
  return <div style={{ height: 1, marginLeft: SPACING.md, background: TOKENS.divider.hairline }}/>;
}

// 展開狀態：含搜尋 + 清單（Category 標準對照用）
function ACEMA_ExpandedWithSearch({ options, selected }) {
  return (
    <div style={{ background: TOKENS.surface, borderRadius: RADIUS.md, overflow: 'hidden' }}>
      <div style={{
        display: 'flex', alignItems: 'center', gap: SPACING.sm,
        padding: SPACING.md, borderBottom: `1px solid ${TOKENS.divider.hairline}`,
      }}>
        <Glyph name="magnifying-glass" size={ICON_SIZE.sm} color={TOKENS.ink3} stroke={2}/>
        <span style={{ fontSize: TYPOGRAPHY.size.base, color: TOKENS.ink3 }}>搜尋標準類別</span>
      </div>
      {options.map((opt, i) => {
        const isSelected = opt === selected;
        return (
          <React.Fragment key={opt}>
            {i > 0 && <ACEMA_HR/>}
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

// 展開狀態：只有清單（Account 類型用，選項少不需搜尋）
function ACEMA_ExpandedList({ options, selected }) {
  return (
    <div style={{ background: TOKENS.surface, borderRadius: RADIUS.md, overflow: 'hidden' }}>
      {options.map((opt, i) => {
        const isSelected = opt === selected;
        return (
          <React.Fragment key={opt}>
            {i > 0 && <ACEMA_HR/>}
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

// Button group（Account 類型 V2 用）
function ACEMA_TypeButtonGroup({ options, selected }) {
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
            border: `1px solid ${active ? TOKENS.p500 : TOKENS.divider.hairline}`,
            color: active ? 'white' : TOKENS.ink2,
            fontSize: TYPOGRAPHY.size.base,
            fontWeight: active ? TYPOGRAPHY.weight.medium : 'normal',
          }}>{opt}</div>
        );
      })}
    </div>
  );
}

// ─── V0 [Current] · Collapsed ─────────────────────────────────

function ACEMA_V0_Category() {
  return (
    <ACEMA_Shell title="編輯類別">
      <div style={{ padding: SPACING.lg }}>
        <div style={{ marginBottom: SPACING.xl }}>
          <EditorFieldLabel required>類型</EditorFieldLabel>
          <EditorPickerCollapsed value={ACEMA_CAT.typeLabel} disabled/>
        </div>
        <div style={{ marginBottom: SPACING.xl }}>
          <EditorFieldLabel required>名稱</EditorFieldLabel>
          <EditorTextInput value={ACEMA_CAT.name}/>
        </div>
        <div style={{ marginBottom: SPACING.xl }}>
          <EditorFieldLabel>標準對照</EditorFieldLabel>
          <EditorPickerCollapsed value={ACEMA_CAT.mapping}/>
        </div>
        <div style={{ marginBottom: SPACING.xl }}>
          <EditorFieldLabel required>圖示</EditorFieldLabel>
          <EditorPickerCollapsed
            leftIcon={<DynamicIconById iconId={13} size={ICON_SIZE.md} color={TOKENS.ink}/>}
            value="ph-bread"/>
        </div>
      </div>
    </ACEMA_Shell>
  );
}

function ACEMA_V0_Account() {
  return (
    <ACEMA_Shell title="編輯帳戶">
      <div style={{ padding: SPACING.lg }}>
        <div style={{ marginBottom: SPACING.xl }}>
          <EditorFieldLabel required>帳戶名稱</EditorFieldLabel>
          <EditorTextInput value={ACEMA_ACC.name}/>
        </div>
        <div style={{ marginBottom: SPACING.xl }}>
          <EditorFieldLabel required>幣別</EditorFieldLabel>
          <EditorPickerCollapsed value={ACEMA_ACC.currency} disabled/>
        </div>
        <div style={{ marginBottom: SPACING.xl }}>
          <EditorFieldLabel required>類型</EditorFieldLabel>
          <EditorPickerCollapsed value={ACEMA_ACC.type}/>
        </div>
        <div style={{ marginBottom: SPACING.xl }}>
          <EditorFieldLabel required>圖示</EditorFieldLabel>
          <EditorPickerCollapsed
            leftIcon={<DynamicIconById iconId={11} size={ICON_SIZE.md} color={TOKENS.ink}/>}
            value="ph-building"/>
        </div>
      </div>
    </ACEMA_Shell>
  );
}

// ─── V1 · Expanded ────────────────────────────────────────────

function ACEMA_V1_Category() {
  return (
    <ACEMA_Shell title="編輯類別">
      <div style={{ padding: SPACING.lg }}>
        <div style={{ marginBottom: SPACING.xl }}>
          <EditorFieldLabel required>類型</EditorFieldLabel>
          <EditorPickerCollapsed value={ACEMA_CAT.typeLabel} disabled/>
        </div>
        <div style={{ marginBottom: SPACING.xl }}>
          <EditorFieldLabel required>名稱</EditorFieldLabel>
          <EditorTextInput value={ACEMA_CAT.name}/>
        </div>
        <div style={{ marginBottom: SPACING.xl }}>
          <EditorFieldLabel>標準對照</EditorFieldLabel>
          <ACEMA_ExpandedWithSearch options={ACEMA_MAPPING_OPTIONS} selected={ACEMA_CAT.mapping}/>
        </div>
      </div>
    </ACEMA_Shell>
  );
}

function ACEMA_V1_Account() {
  return (
    <ACEMA_Shell title="編輯帳戶">
      <div style={{ padding: SPACING.lg }}>
        <div style={{ marginBottom: SPACING.xl }}>
          <EditorFieldLabel required>帳戶名稱</EditorFieldLabel>
          <EditorTextInput value={ACEMA_ACC.name}/>
        </div>
        <div style={{ marginBottom: SPACING.xl }}>
          <EditorFieldLabel required>幣別</EditorFieldLabel>
          <EditorPickerCollapsed value={ACEMA_ACC.currency} disabled/>
        </div>
        <div style={{ marginBottom: SPACING.xl }}>
          <EditorFieldLabel required>類型</EditorFieldLabel>
          <ACEMA_ExpandedList options={ACEMA_ACC_TYPE_OPTIONS} selected={ACEMA_ACC.type}/>
        </div>
      </div>
    </ACEMA_Shell>
  );
}

// ─── V2 · Button group for short list ────────────────────────

function ACEMA_V2_Category() {
  return (
    <ACEMA_Shell title="編輯類別">
      <div style={{ padding: SPACING.lg }}>
        <div style={{ marginBottom: SPACING.xl }}>
          <EditorFieldLabel required>類型</EditorFieldLabel>
          <EditorPickerCollapsed value={ACEMA_CAT.typeLabel} disabled/>
        </div>
        <div style={{ marginBottom: SPACING.xl }}>
          <EditorFieldLabel required>名稱</EditorFieldLabel>
          <EditorTextInput value={ACEMA_CAT.name}/>
        </div>
        <div style={{ marginBottom: SPACING.xl }}>
          <EditorFieldLabel>標準對照</EditorFieldLabel>
          <ACEMA_TypeButtonGroup options={ACEMA_MAPPING_OPTIONS} selected={ACEMA_CAT.mapping}/>
        </div>
        <div style={{ marginBottom: SPACING.xl }}>
          <EditorFieldLabel required>圖示</EditorFieldLabel>
          <EditorPickerCollapsed
            leftIcon={<DynamicIconById iconId={13} size={ICON_SIZE.md} color={TOKENS.ink}/>}
            value="ph-bread"/>
        </div>
      </div>
    </ACEMA_Shell>
  );
}

function ACEMA_V2_Account() {
  return (
    <ACEMA_Shell title="編輯帳戶">
      <div style={{ padding: SPACING.lg }}>
        <div style={{ marginBottom: SPACING.xl }}>
          <EditorFieldLabel required>帳戶名稱</EditorFieldLabel>
          <EditorTextInput value={ACEMA_ACC.name}/>
        </div>
        <div style={{ marginBottom: SPACING.xl }}>
          <EditorFieldLabel required>幣別</EditorFieldLabel>
          <EditorPickerCollapsed value={ACEMA_ACC.currency} disabled/>
        </div>
        <div style={{ marginBottom: SPACING.xl }}>
          <EditorFieldLabel required>類型</EditorFieldLabel>
          <ACEMA_TypeButtonGroup options={ACEMA_ACC_TYPE_OPTIONS} selected={ACEMA_ACC.type}/>
        </div>
        <div style={{ marginBottom: SPACING.xl }}>
          <EditorFieldLabel required>圖示</EditorFieldLabel>
          <EditorPickerCollapsed
            leftIcon={<DynamicIconById iconId={11} size={ICON_SIZE.md} color={TOKENS.ink}/>}
            value="ph-building"/>
        </div>
      </div>
    </ACEMA_Shell>
  );
}

// ─── Section render ──────────────────────────────────────────
function AccountCategoryEditorMappingAccTypeSection() {
  const W = 402, H = 874;
  return (
    <DCSection id="ace-mapping-acctype"
      title="Axis · Mapping & Account Type"
      subtitle="Category 標準對照（50+ 選項含搜尋）與 Account 類型（5 選項無搜尋）的體驗一致性探索。左為 Category，右為 Account。">
      <DCArtboard id="acema-v0-cat"
        label="V0 [Current] · Category · 標準對照 = collapsed picker（收合）"
        width={W} height={H}>
        <IOSDevice width={W} height={H}><ACEMA_V0_Category/></IOSDevice>
      </DCArtboard>
      <DCArtboard id="acema-v0-acc"
        label="V0 [Current] · Account · 類型 = collapsed picker（收合，與 Category 一致）"
        width={W} height={H}>
        <IOSDevice width={W} height={H}><ACEMA_V0_Account/></IOSDevice>
      </DCArtboard>

      <DCArtboard id="acema-v1-cat"
        label="V1 · Expanded · Category · 標準對照展開（搜尋 + 清單）"
        width={W} height={H}>
        <IOSDevice width={W} height={H}><ACEMA_V1_Category/></IOSDevice>
      </DCArtboard>
      <DCArtboard id="acema-v1-acc"
        label="V1 · Expanded · Account · 類型展開（清單，無搜尋）"
        width={W} height={H}>
        <IOSDevice width={W} height={H}><ACEMA_V1_Account/></IOSDevice>
      </DCArtboard>

      <DCArtboard id="acema-v2-cat"
        label="V2 · Button group · Category · 標準對照也改為 button group（與 Account 類型一致）"
        width={W} height={H}>
        <IOSDevice width={W} height={H}><ACEMA_V2_Category/></IOSDevice>
      </DCArtboard>
      <DCArtboard id="acema-v2-acc"
        label="V2 · Button group · Account · 類型改為 5 選項常駐 button group"
        width={W} height={H}>
        <IOSDevice width={W} height={H}><ACEMA_V2_Account/></IOSDevice>
      </DCArtboard>
    </DCSection>
  );
}

Object.assign(window, { AccountCategoryEditorMappingAccTypeSection });
