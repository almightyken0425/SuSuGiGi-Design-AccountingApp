// ─────────────────────────────────────────────────────────────
// Exploration · AccountCategoryEditor · Axis · Footer Zone
//
// 每個 variant 左為 Category（主），右為 Account（對照）。
// 兩者的 footer 問題相同（toggle bug + delete 無 box），
// 解法也相同，差別只在標籤文字。
//
// V0 · Loose rows
//     toggle row（白底 surface，Switch 有 thumb bug）+ 純紅字 delete
//
// V1 [採用] · Minimal box-up · 2026-05-26
//     乾淨 Switch + delete 包 surface 底紅字（去除 RN Switch 的 thumb bug，讓 iOS 拿回原生外觀）
//     設計定案：editor footer 統一採此 pattern
//
// V2 · Danger zone card
//     toggle + delete 包進一張卡，hairline 分隔，上方加小標
//
// V3 · Prominent destructive
//     segmented「啟用 / 停用」+ delete 改紅底白字 prominent button
// ─────────────────────────────────────────────────────────────

const ACEFZ_CAT = {
  iconId: 13,
  name: '飲食',
  typeLabel: '支出',
  mapping: '飲食 (其他)',
  enabled: true,
};

const ACEFZ_ACC = {
  iconId: 11,
  name: '玉山活儲',
  currency: 'TWD',
  type: '銀行帳戶',
  enabled: true,
};

// ─── Shell ──────────────────────────────────────────────────
function ACEFZ_Shell({ title, children }) {
  return (
    <div style={{
      height: '100%', background: TOKENS.bg,
      display: 'flex', flexDirection: 'column',
    }}>
      <ModalHeader title={title} onClose={() => {}} onSave={() => {}}/>
      <div style={{ flex: 1, overflowY: 'auto', paddingBottom: 60 }}>
        {children}
      </div>
    </div>
  );
}

// ─── Form above（固定，Category 版）─────────────────────────
function ACEFZ_CatForm() {
  return (
    <React.Fragment>
      <div style={{ marginBottom: SPACING.lg }}>
        <EditorFieldLabel>類型</EditorFieldLabel>
        <div style={{
          background: TOKENS.surface, borderRadius: RADIUS.md,
          padding: 4, display: 'flex', gap: 4,
        }}>
          {['支出', '收入'].map((t) => {
            const active = t === ACEFZ_CAT.typeLabel;
            return (
              <div key={t} style={{
                flex: 1, paddingTop: 10, paddingBottom: 10,
                display: 'flex', justifyContent: 'center', alignItems: 'center',
                borderRadius: RADIUS.sm || 6,
                background: active ? TOKENS.p500 : 'transparent',
                color: active ? 'white' : TOKENS.ink2,
                fontSize: TYPOGRAPHY.size.sm, fontWeight: TYPOGRAPHY.weight.medium,
              }}>{t}</div>
            );
          })}
        </div>
      </div>
      <div style={{ marginBottom: SPACING.xl }}>
        <EditorFieldLabel required>名稱</EditorFieldLabel>
        <EditorTextInput value={ACEFZ_CAT.name}/>
      </div>
      <div style={{ marginBottom: SPACING.xl }}>
        <EditorFieldLabel>標準對照</EditorFieldLabel>
        <EditorPickerCollapsed value={ACEFZ_CAT.mapping}/>
      </div>
      <div style={{ marginBottom: SPACING.xl }}>
        <EditorFieldLabel required>圖示</EditorFieldLabel>
        <EditorPickerCollapsed
          leftIcon={<DynamicIconById iconId={ACEFZ_CAT.iconId} size={ICON_SIZE.md} color={TOKENS.ink}/>}
          value="圖示"/>
      </div>
    </React.Fragment>
  );
}

// ─── Form above（固定，Account 版）──────────────────────────
function ACEFZ_AccForm() {
  return (
    <React.Fragment>
      <div style={{ marginBottom: SPACING.xl }}>
        <EditorFieldLabel required>帳戶名稱</EditorFieldLabel>
        <EditorTextInput value={ACEFZ_ACC.name}/>
      </div>
      <div style={{ marginBottom: SPACING.xl }}>
        <EditorFieldLabel required>幣別</EditorFieldLabel>
        <EditorPickerCollapsed value={ACEFZ_ACC.currency} disabled/>
      </div>
      <div style={{ marginBottom: SPACING.xl }}>
        <EditorFieldLabel required>類型</EditorFieldLabel>
        <EditorPickerCollapsed value={ACEFZ_ACC.type}/>
      </div>
      <div style={{ marginBottom: SPACING.xl }}>
        <EditorFieldLabel required>圖示</EditorFieldLabel>
        <EditorPickerCollapsed
          leftIcon={<DynamicIconById iconId={ACEFZ_ACC.iconId} size={ICON_SIZE.md} color={TOKENS.ink}/>}
          value="圖示"/>
      </div>
    </React.Fragment>
  );
}

// ─── V0 [Current] · Loose rows ────────────────────────────────

function ACEFZ_V0_Category() {
  return (
    <ACEFZ_Shell title="編輯類別">
      <div style={{ padding: SPACING.lg }}>
        <ACEFZ_CatForm/>
        <EditorSwitchRow label="啟用類別" value={ACEFZ_CAT.enabled}/>
        <DeleteButton label="刪除類別"/>
      </div>
    </ACEFZ_Shell>
  );
}

function ACEFZ_V0_Account() {
  return (
    <ACEFZ_Shell title="編輯帳戶">
      <div style={{ padding: SPACING.lg }}>
        <ACEFZ_AccForm/>
        <EditorSwitchRow label="啟用帳戶" value={ACEFZ_ACC.enabled}/>
        <DeleteButton label="刪除帳戶"/>
      </div>
    </ACEFZ_Shell>
  );
}

// ─── V1 · Minimal box-up ──────────────────────────────────────

function ACEFZ_V1_Footer({ enableLabel, deleteLabel, enabled }) {
  return (
    <React.Fragment>
      <div style={{
        background: TOKENS.surface, borderRadius: RADIUS.md,
        padding: SPACING.lg, display: 'flex',
        justifyContent: 'space-between', alignItems: 'center',
        marginBottom: SPACING.xl,
      }}>
        <span style={{ fontSize: TYPOGRAPHY.size.base, color: TOKENS.ink }}>{enableLabel}</span>
        <Switch value={enabled}/>
      </div>
      <button style={{
        width: '100%', padding: SPACING.lg,
        background: TOKENS.surface, color: TOKENS.error,
        border: 'none', borderRadius: RADIUS.md,
        fontSize: TYPOGRAPHY.size.base, cursor: 'pointer',
        fontWeight: TYPOGRAPHY.weight.medium,
      }}>{deleteLabel}</button>
    </React.Fragment>
  );
}

function ACEFZ_V1_Category() {
  return (
    <ACEFZ_Shell title="編輯類別">
      <div style={{ padding: SPACING.lg }}>
        <ACEFZ_CatForm/>
        <ACEFZ_V1_Footer enableLabel="啟用類別" deleteLabel="刪除類別" enabled={ACEFZ_CAT.enabled}/>
      </div>
    </ACEFZ_Shell>
  );
}

function ACEFZ_V1_Account() {
  return (
    <ACEFZ_Shell title="編輯帳戶">
      <div style={{ padding: SPACING.lg }}>
        <ACEFZ_AccForm/>
        <ACEFZ_V1_Footer enableLabel="啟用帳戶" deleteLabel="刪除帳戶" enabled={ACEFZ_ACC.enabled}/>
      </div>
    </ACEFZ_Shell>
  );
}

// ─── V2 · Danger zone card ────────────────────────────────────

function ACEFZ_V2_Footer({ sectionLabel, enableLabel, deleteLabel, enabled }) {
  return (
    <React.Fragment>
      <div style={{
        fontSize: TYPOGRAPHY.size.sm, color: TOKENS.ink3,
        textTransform: 'uppercase', letterSpacing: 0.6,
        marginBottom: SPACING.sm, paddingLeft: SPACING.sm,
      }}>{sectionLabel}</div>
      <div style={{ background: TOKENS.surface, borderRadius: RADIUS.md, overflow: 'hidden' }}>
        <div style={{
          padding: SPACING.md, display: 'flex',
          justifyContent: 'space-between', alignItems: 'center', minHeight: 44,
        }}>
          <span style={{ fontSize: TYPOGRAPHY.size.base, color: TOKENS.ink }}>{enableLabel}</span>
          <Switch value={enabled}/>
        </div>
        <div style={{ height: 1, marginLeft: SPACING.md, background: TOKENS.divider.hairline }}/>
        <div style={{
          padding: SPACING.md, display: 'flex',
          justifyContent: 'center', alignItems: 'center', minHeight: 44, cursor: 'pointer',
          fontSize: TYPOGRAPHY.size.base, color: TOKENS.error, fontWeight: TYPOGRAPHY.weight.medium,
        }}>{deleteLabel}</div>
      </div>
    </React.Fragment>
  );
}

function ACEFZ_V2_Category() {
  return (
    <ACEFZ_Shell title="編輯類別">
      <div style={{ padding: SPACING.lg }}>
        <ACEFZ_CatForm/>
        <ACEFZ_V2_Footer sectionLabel="類別管理" enableLabel="啟用類別" deleteLabel="刪除類別" enabled={ACEFZ_CAT.enabled}/>
      </div>
    </ACEFZ_Shell>
  );
}

function ACEFZ_V2_Account() {
  return (
    <ACEFZ_Shell title="編輯帳戶">
      <div style={{ padding: SPACING.lg }}>
        <ACEFZ_AccForm/>
        <ACEFZ_V2_Footer sectionLabel="帳戶管理" enableLabel="啟用帳戶" deleteLabel="刪除帳戶" enabled={ACEFZ_ACC.enabled}/>
      </div>
    </ACEFZ_Shell>
  );
}

// ─── V3 · Prominent destructive ───────────────────────────────

function ACEFZ_V3_Footer({ stateLabel, deleteLabel, enabled }) {
  return (
    <React.Fragment>
      <div style={{ marginBottom: SPACING.xl }}>
        <EditorFieldLabel>{stateLabel}</EditorFieldLabel>
        <div style={{
          background: TOKENS.surface, borderRadius: RADIUS.md,
          padding: 4, display: 'flex', gap: 4,
          border: `1px solid ${TOKENS.divider.hairline}`,
        }}>
          {['啟用', '停用'].map((t) => {
            const active = (t === '啟用') === enabled;
            return (
              <div key={t} style={{
                flex: 1, paddingTop: 10, paddingBottom: 10,
                display: 'flex', justifyContent: 'center', alignItems: 'center',
                borderRadius: RADIUS.sm || 6,
                background: active ? TOKENS.p500 : 'transparent',
                color: active ? 'white' : TOKENS.ink2,
                fontSize: TYPOGRAPHY.size.sm, fontWeight: TYPOGRAPHY.weight.medium,
              }}>{t}</div>
            );
          })}
        </div>
      </div>
      <button style={{
        width: '100%', padding: SPACING.lg,
        background: TOKENS.error, color: 'white',
        border: 'none', borderRadius: RADIUS.md,
        fontSize: TYPOGRAPHY.size.base, cursor: 'pointer',
        fontWeight: TYPOGRAPHY.weight.medium,
      }}>{deleteLabel}</button>
    </React.Fragment>
  );
}

function ACEFZ_V3_Category() {
  return (
    <ACEFZ_Shell title="編輯類別">
      <div style={{ padding: SPACING.lg }}>
        <ACEFZ_CatForm/>
        <ACEFZ_V3_Footer stateLabel="狀態" deleteLabel="刪除類別" enabled={ACEFZ_CAT.enabled}/>
      </div>
    </ACEFZ_Shell>
  );
}

function ACEFZ_V3_Account() {
  return (
    <ACEFZ_Shell title="編輯帳戶">
      <div style={{ padding: SPACING.lg }}>
        <ACEFZ_AccForm/>
        <ACEFZ_V3_Footer stateLabel="狀態" deleteLabel="刪除帳戶" enabled={ACEFZ_ACC.enabled}/>
      </div>
    </ACEFZ_Shell>
  );
}

// ─── Section render ──────────────────────────────────────────
function AccountCategoryEditorFooterZoneSection() {
  const W = 402, H = 874;
  return (
    <DCSection id="ace-footer-zone"
      title="Axis · Footer Zone"
      subtitle="每個 variant 左為 Category，右為 Account。上方 form 固定，只變 footer 的啟用 toggle + 刪除按鈕處理方式。">
      <DCArtboard id="acefz-v0-cat"
        label="V0 [Current] · Category · 兩個鬆散獨立 row（toggle 白底 + Switch bug、delete 純紅字無 box）"
        width={W} height={H}>
        <IOSDevice width={W} height={H}><ACEFZ_V0_Category/></IOSDevice>
      </DCArtboard>
      <DCArtboard id="acefz-v0-acc"
        label="V0 [Current] · Account · 兩個鬆散獨立 row（toggle 白底 + Switch bug、delete 純紅字無 box）"
        width={W} height={H}>
        <IOSDevice width={W} height={H}><ACEFZ_V0_Account/></IOSDevice>
      </DCArtboard>

      <DCArtboard id="acefz-v1-cat"
        label="V1 · Minimal box-up · Category · 乾淨 Switch + delete 改紅 outline box（白底紅字紅框）"
        width={W} height={H}>
        <IOSDevice width={W} height={H}><ACEFZ_V1_Category/></IOSDevice>
      </DCArtboard>
      <DCArtboard id="acefz-v1-acc"
        label="V1 · Minimal box-up · Account · 乾淨 Switch + delete 改紅 outline box（白底紅字紅框）"
        width={W} height={H}>
        <IOSDevice width={W} height={H}><ACEFZ_V1_Account/></IOSDevice>
      </DCArtboard>

      <DCArtboard id="acefz-v2-cat"
        label="V2 · Danger zone card · Category · toggle + delete 包進一張卡，上方加『類別管理』小標"
        width={W} height={H}>
        <IOSDevice width={W} height={H}><ACEFZ_V2_Category/></IOSDevice>
      </DCArtboard>
      <DCArtboard id="acefz-v2-acc"
        label="V2 · Danger zone card · Account · toggle + delete 包進一張卡，上方加『帳戶管理』小標"
        width={W} height={H}>
        <IOSDevice width={W} height={H}><ACEFZ_V2_Account/></IOSDevice>
      </DCArtboard>

      <DCArtboard id="acefz-v3-cat"
        label="V3 · Prominent destructive · Category · segmented『啟用/停用』+ delete 改紅底白字 prominent button"
        width={W} height={H}>
        <IOSDevice width={W} height={H}><ACEFZ_V3_Category/></IOSDevice>
      </DCArtboard>
      <DCArtboard id="acefz-v3-acc"
        label="V3 · Prominent destructive · Account · segmented『啟用/停用』+ delete 改紅底白字 prominent button"
        width={W} height={H}>
        <IOSDevice width={W} height={H}><ACEFZ_V3_Account/></IOSDevice>
      </DCArtboard>
    </DCSection>
  );
}

Object.assign(window, { AccountCategoryEditorFooterZoneSection });
