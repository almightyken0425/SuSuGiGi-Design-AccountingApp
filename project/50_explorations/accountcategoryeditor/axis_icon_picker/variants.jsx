// ─────────────────────────────────────────────────────────────
// Exploration · AccountCategoryEditor · Axis · Icon Picker
//
// icon picker 直接在表單內展開，不另開 modal / sheet / push screen。
// 欄位標題 label（「圖示 *」）由上方 EditorFieldLabel 負責，
// picker 區塊本身不再重複寫 "圖示" 標籤。
//
// 每個 variant 左為 Category（分類 icon 集），右為 Account（帳戶 icon 集）。
//
// V0 · Inline cramped
//     expanded 4col × maxHeight 小窗，header 顯示系統 uniqueName
//
// V1 [採用] · Inline 4col · 2026-05-25
//     移除 header 與 maxHeight，直接顯示完整 4col grid
//     設計定案：editor 內 icon picker 常駐 4 列展開，由外層 label 管理欄位標題
//
// V2 · Inline 5col
//     5col 更緊湊，同一螢幕高度顯示更多圖示
//
// V3 · Inline 5col + 最近使用
//     5col，grid 前置「最近使用」3 個圖示（含分隔線），其餘圖示接續
// ─────────────────────────────────────────────────────────────

const ACEI_CAT = {
  iconId: 13,
  name: '飲食',
  typeLabel: '支出',
  mapping: '飲食 (其他)',
  enabled: true,
};

const ACEI_ACC = {
  iconId: 11,
  name: '玉山活儲',
  currency: 'TWD',
  type: '銀行帳戶',
  enabled: true,
};

const ACEI_CATEGORY_ICONS = [12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23];
const ACEI_ACCOUNT_ICONS  = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

// ─── Shell ──────────────────────────────────────────────────
function ACEI_Shell({ title, children }) {
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

// ─── Type segmented（Category 用）────────────────────────────
function ACEI_TypeSegmented({ activeLabel }) {
  return (
    <div style={{
      background: TOKENS.surface, borderRadius: RADIUS.md,
      padding: 4, display: 'flex', gap: 4,
    }}>
      {['支出', '收入'].map((t) => {
        const active = t === activeLabel;
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
  );
}

// ─── Top fields ───────────────────────────────────────────────
function ACEI_CatTopFields() {
  return (
    <React.Fragment>
      <div style={{ marginBottom: SPACING.lg }}>
        <EditorFieldLabel>類型</EditorFieldLabel>
        <ACEI_TypeSegmented activeLabel={ACEI_CAT.typeLabel}/>
      </div>
      <div style={{ marginBottom: SPACING.xl }}>
        <EditorFieldLabel required>名稱</EditorFieldLabel>
        <EditorTextInput value={ACEI_CAT.name}/>
      </div>
      <div style={{ marginBottom: SPACING.xl }}>
        <EditorFieldLabel>標準對照</EditorFieldLabel>
        <EditorPickerCollapsed value={ACEI_CAT.mapping}/>
      </div>
    </React.Fragment>
  );
}

function ACEI_AccTopFields() {
  return (
    <React.Fragment>
      <div style={{ marginBottom: SPACING.xl }}>
        <EditorFieldLabel required>帳戶名稱</EditorFieldLabel>
        <EditorTextInput value={ACEI_ACC.name}/>
      </div>
      <div style={{ marginBottom: SPACING.xl }}>
        <EditorFieldLabel required>幣別</EditorFieldLabel>
        <EditorPickerCollapsed value={ACEI_ACC.currency} disabled/>
      </div>
      <div style={{ marginBottom: SPACING.xl }}>
        <EditorFieldLabel required>類型</EditorFieldLabel>
        <EditorPickerCollapsed value={ACEI_ACC.type}/>
      </div>
    </React.Fragment>
  );
}

// ─── Icon grid helpers ────────────────────────────────────────
function ACEI_Grid({ icons, selectedId, cols, maxHeight }) {
  return (
    <div style={{
      display: 'flex', flexWrap: 'wrap',
      padding: SPACING.sm,
      ...(maxHeight ? { maxHeight, overflow: 'auto' } : {}),
    }}>
      {icons.map(id => (
        <div key={id} style={{
          width: `${100 / cols}%`, aspectRatio: 1,
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

// ─── Footer（V1 style：white surface + red text，無 border）──
function ACEI_Footer({ enableLabel, deleteLabel, enabled }) {
  return (
    <React.Fragment>
      <EditorSwitchRow label={enableLabel} value={enabled}/>
      <div style={{ marginTop: SPACING.sm }}>
        <button style={{
          width: '100%', padding: SPACING.lg,
          background: TOKENS.surface, color: TOKENS.error,
          border: 'none', borderRadius: RADIUS.md,
          fontSize: TYPOGRAPHY.size.base, cursor: 'pointer',
          fontWeight: TYPOGRAPHY.weight.medium,
        }}>{deleteLabel}</button>
      </div>
    </React.Fragment>
  );
}

// ─── V0 [Current] · Inline cramped ────────────────────────────

function ACEI_V0_Category() {
  return (
    <ACEI_Shell title="編輯類別">
      <div style={{ padding: SPACING.lg }}>
        <ACEI_CatTopFields/>
        <div style={{ marginBottom: SPACING.xl }}>
          <EditorFieldLabel required>圖示</EditorFieldLabel>
          <div style={{
            background: TOKENS.surface, borderRadius: RADIUS.md,
            border: `1px solid ${TOKENS.p500}`, maxHeight: 200, overflow: 'hidden',
          }}>
            <div style={{
              padding: SPACING.md, display: 'flex',
              justifyContent: 'space-between', alignItems: 'center',
              borderBottom: `1px solid ${TOKENS.divider.hairline}`,
            }}>
              <span style={{ fontSize: TYPOGRAPHY.size.sm, color: TOKENS.ink2 }}>圖示</span>
              <Glyph name="chevron-up" size={ICON_SIZE.sm} color={TOKENS.ink2} stroke={2}/>
            </div>
            <ACEI_Grid icons={ACEI_CATEGORY_ICONS} selectedId={ACEI_CAT.iconId} cols={4} maxHeight={150}/>
          </div>
        </div>
        <ACEI_Footer enableLabel="啟用類別" deleteLabel="刪除類別" enabled={ACEI_CAT.enabled}/>
      </div>
    </ACEI_Shell>
  );
}

function ACEI_V0_Account() {
  return (
    <ACEI_Shell title="編輯帳戶">
      <div style={{ padding: SPACING.lg }}>
        <ACEI_AccTopFields/>
        <div style={{ marginBottom: SPACING.xl }}>
          <EditorFieldLabel required>圖示</EditorFieldLabel>
          <div style={{
            background: TOKENS.surface, borderRadius: RADIUS.md,
            border: `1px solid ${TOKENS.p500}`, maxHeight: 200, overflow: 'hidden',
          }}>
            <div style={{
              padding: SPACING.md, display: 'flex',
              justifyContent: 'space-between', alignItems: 'center',
              borderBottom: `1px solid ${TOKENS.divider.hairline}`,
            }}>
              <span style={{ fontSize: TYPOGRAPHY.size.sm, color: TOKENS.ink2 }}>圖示</span>
              <Glyph name="chevron-up" size={ICON_SIZE.sm} color={TOKENS.ink2} stroke={2}/>
            </div>
            <ACEI_Grid icons={ACEI_ACCOUNT_ICONS} selectedId={ACEI_ACC.iconId} cols={4} maxHeight={150}/>
          </div>
        </div>
        <ACEI_Footer enableLabel="啟用帳戶" deleteLabel="刪除帳戶" enabled={ACEI_ACC.enabled}/>
      </div>
    </ACEI_Shell>
  );
}

// ─── V1 · Inline 4col ─────────────────────────────────────────

function ACEI_V1_Category() {
  return (
    <ACEI_Shell title="編輯類別">
      <div style={{ padding: SPACING.lg }}>
        <ACEI_CatTopFields/>
        <div style={{ marginBottom: SPACING.xl }}>
          <EditorFieldLabel required>圖示</EditorFieldLabel>
          <div style={{ background: TOKENS.surface, borderRadius: RADIUS.md }}>
            <ACEI_Grid icons={ACEI_CATEGORY_ICONS} selectedId={ACEI_CAT.iconId} cols={4}/>
          </div>
        </div>
        <ACEI_Footer enableLabel="啟用類別" deleteLabel="刪除類別" enabled={ACEI_CAT.enabled}/>
      </div>
    </ACEI_Shell>
  );
}

function ACEI_V1_Account() {
  return (
    <ACEI_Shell title="編輯帳戶">
      <div style={{ padding: SPACING.lg }}>
        <ACEI_AccTopFields/>
        <div style={{ marginBottom: SPACING.xl }}>
          <EditorFieldLabel required>圖示</EditorFieldLabel>
          <div style={{ background: TOKENS.surface, borderRadius: RADIUS.md }}>
            <ACEI_Grid icons={ACEI_ACCOUNT_ICONS} selectedId={ACEI_ACC.iconId} cols={4}/>
          </div>
        </div>
        <ACEI_Footer enableLabel="啟用帳戶" deleteLabel="刪除帳戶" enabled={ACEI_ACC.enabled}/>
      </div>
    </ACEI_Shell>
  );
}

// ─── V2 · Inline 5col ─────────────────────────────────────────

function ACEI_V2_Category() {
  return (
    <ACEI_Shell title="編輯類別">
      <div style={{ padding: SPACING.lg }}>
        <ACEI_CatTopFields/>
        <div style={{ marginBottom: SPACING.xl }}>
          <EditorFieldLabel required>圖示</EditorFieldLabel>
          <div style={{ background: TOKENS.surface, borderRadius: RADIUS.md }}>
            <ACEI_Grid icons={ACEI_CATEGORY_ICONS} selectedId={ACEI_CAT.iconId} cols={5}/>
          </div>
        </div>
        <ACEI_Footer enableLabel="啟用類別" deleteLabel="刪除類別" enabled={ACEI_CAT.enabled}/>
      </div>
    </ACEI_Shell>
  );
}

function ACEI_V2_Account() {
  return (
    <ACEI_Shell title="編輯帳戶">
      <div style={{ padding: SPACING.lg }}>
        <ACEI_AccTopFields/>
        <div style={{ marginBottom: SPACING.xl }}>
          <EditorFieldLabel required>圖示</EditorFieldLabel>
          <div style={{ background: TOKENS.surface, borderRadius: RADIUS.md }}>
            <ACEI_Grid icons={ACEI_ACCOUNT_ICONS} selectedId={ACEI_ACC.iconId} cols={5}/>
          </div>
        </div>
        <ACEI_Footer enableLabel="啟用帳戶" deleteLabel="刪除帳戶" enabled={ACEI_ACC.enabled}/>
      </div>
    </ACEI_Shell>
  );
}

// ─── V3 · Inline 5col + 最近使用 ──────────────────────────────
// grid 前置「最近使用」row（3 個圖示），hairline 分隔後接完整清單

function ACEI_V3_Category() {
  const recent = [ACEI_CAT.iconId, 14, 16];
  return (
    <ACEI_Shell title="編輯類別">
      <div style={{ padding: SPACING.lg }}>
        <ACEI_CatTopFields/>
        <div style={{ marginBottom: SPACING.xl }}>
          <EditorFieldLabel required>圖示</EditorFieldLabel>
          <div style={{ background: TOKENS.surface, borderRadius: RADIUS.md }}>
            {/* 最近使用 */}
            <div style={{
              paddingTop: SPACING.xs, paddingBottom: SPACING.xs,
              paddingLeft: SPACING.sm, paddingRight: SPACING.sm,
            }}>
              <div style={{
                fontSize: TYPOGRAPHY.size.xs, color: TOKENS.ink3,
                paddingLeft: 4, paddingBottom: SPACING.xs,
              }}>最近使用</div>
              <div style={{ display: 'flex' }}>
                {recent.map(id => (
                  <div key={id} style={{
                    width: `${100 / 5}%`, aspectRatio: 1,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    borderRadius: RADIUS.md,
                    background: id === ACEI_CAT.iconId ? TOKENS.p500 : 'transparent',
                  }}>
                    <DynamicIconById iconId={id} size={ICON_SIZE.md}
                      color={id === ACEI_CAT.iconId ? 'white' : TOKENS.ink}/>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ height: 1, marginLeft: SPACING.sm, background: TOKENS.divider.hairline }}/>
            {/* 全部 */}
            <ACEI_Grid icons={ACEI_CATEGORY_ICONS} selectedId={ACEI_CAT.iconId} cols={5}/>
          </div>
        </div>
        <ACEI_Footer enableLabel="啟用類別" deleteLabel="刪除類別" enabled={ACEI_CAT.enabled}/>
      </div>
    </ACEI_Shell>
  );
}

function ACEI_V3_Account() {
  const recent = [ACEI_ACC.iconId, 2, 5];
  return (
    <ACEI_Shell title="編輯帳戶">
      <div style={{ padding: SPACING.lg }}>
        <ACEI_AccTopFields/>
        <div style={{ marginBottom: SPACING.xl }}>
          <EditorFieldLabel required>圖示</EditorFieldLabel>
          <div style={{ background: TOKENS.surface, borderRadius: RADIUS.md }}>
            {/* 最近使用 */}
            <div style={{
              paddingTop: SPACING.xs, paddingBottom: SPACING.xs,
              paddingLeft: SPACING.sm, paddingRight: SPACING.sm,
            }}>
              <div style={{
                fontSize: TYPOGRAPHY.size.xs, color: TOKENS.ink3,
                paddingLeft: 4, paddingBottom: SPACING.xs,
              }}>最近使用</div>
              <div style={{ display: 'flex' }}>
                {recent.map(id => (
                  <div key={id} style={{
                    width: `${100 / 5}%`, aspectRatio: 1,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    borderRadius: RADIUS.md,
                    background: id === ACEI_ACC.iconId ? TOKENS.p500 : 'transparent',
                  }}>
                    <DynamicIconById iconId={id} size={ICON_SIZE.md}
                      color={id === ACEI_ACC.iconId ? 'white' : TOKENS.ink}/>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ height: 1, marginLeft: SPACING.sm, background: TOKENS.divider.hairline }}/>
            {/* 全部 */}
            <ACEI_Grid icons={ACEI_ACCOUNT_ICONS} selectedId={ACEI_ACC.iconId} cols={5}/>
          </div>
        </div>
        <ACEI_Footer enableLabel="啟用帳戶" deleteLabel="刪除帳戶" enabled={ACEI_ACC.enabled}/>
      </div>
    </ACEI_Shell>
  );
}

// ─── Section render ──────────────────────────────────────────
function AccountCategoryEditorIconPickerSection() {
  const W = 402, H = 874;
  return (
    <DCSection id="ace-icon-picker"
      title="Axis · Icon Picker"
      subtitle="icon picker 直接在表單內展開，不另開 modal / sheet。欄位標題由 EditorFieldLabel 負責，picker 本身不重複標籤。左 Category，右 Account。">
      <DCArtboard id="acei-v0-cat"
        label="V0 [Current] · Category · 4col × maxHeight 小窗，header 多餘，grid 被截斷"
        width={W} height={H}>
        <IOSDevice width={W} height={H}><ACEI_V0_Category/></IOSDevice>
      </DCArtboard>
      <DCArtboard id="acei-v0-acc"
        label="V0 [Current] · Account · 4col × maxHeight 小窗，header 多餘，grid 被截斷"
        width={W} height={H}>
        <IOSDevice width={W} height={H}><ACEI_V0_Account/></IOSDevice>
      </DCArtboard>

      <DCArtboard id="acei-v1-cat"
        label="V1 · Inline 4col · Category · 直接展開完整 grid，無 header，無 maxHeight"
        width={W} height={H}>
        <IOSDevice width={W} height={H}><ACEI_V1_Category/></IOSDevice>
      </DCArtboard>
      <DCArtboard id="acei-v1-acc"
        label="V1 · Inline 4col · Account · 直接展開完整 grid，無 header，無 maxHeight"
        width={W} height={H}>
        <IOSDevice width={W} height={H}><ACEI_V1_Account/></IOSDevice>
      </DCArtboard>

      <DCArtboard id="acei-v2-cat"
        label="V2 · Inline 5col · Category · 5col 更緊湊，同螢幕高度可見更多圖示"
        width={W} height={H}>
        <IOSDevice width={W} height={H}><ACEI_V2_Category/></IOSDevice>
      </DCArtboard>
      <DCArtboard id="acei-v2-acc"
        label="V2 · Inline 5col · Account · 5col 更緊湊，同螢幕高度可見更多圖示"
        width={W} height={H}>
        <IOSDevice width={W} height={H}><ACEI_V2_Account/></IOSDevice>
      </DCArtboard>

      <DCArtboard id="acei-v3-cat"
        label="V3 · 5col + 最近使用 · Category · grid 前置最近使用 row，hairline 分隔後接完整清單"
        width={W} height={H}>
        <IOSDevice width={W} height={H}><ACEI_V3_Category/></IOSDevice>
      </DCArtboard>
      <DCArtboard id="acei-v3-acc"
        label="V3 · 5col + 最近使用 · Account · grid 前置最近使用 row，hairline 分隔後接完整清單"
        width={W} height={H}>
        <IOSDevice width={W} height={H}><ACEI_V3_Account/></IOSDevice>
      </DCArtboard>
    </DCSection>
  );
}

Object.assign(window, { AccountCategoryEditorIconPickerSection });
