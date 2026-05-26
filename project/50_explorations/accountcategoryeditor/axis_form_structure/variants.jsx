// ─────────────────────────────────────────────────────────────
// Exploration · AccountCategoryEditor · Axis · Form Structure
//
// 四個 variant 各出兩個 artboard：Category（左）和 Account（右）。
// V1/V2/V3 套用已決定的四個結論：
//   1. icon picker 直接在表單內展開（4col inline grid，Icon Picker V1），無額外標籤
//   2. Category 標準對照 & Account 類型 改為 button group（Mapping & AccType V2）
//   3. Category 類型 & Account 幣別 改為 searchable dropdown（Type & Currency V3）
//   4. Footer 改用 Footer Zone V1（Switch card + delete：surface 底紅字無框）
//
// V0 · Uniform boxes
//     所有欄位同樣白盒上下排列；icon 顯示系統名稱；delete 純紅字無 box
//
// V1 · Hero identity
//     頂部大圖示 + 大字名稱 + 類型 badge；下方欄位走 list row 一張卡；
//     圖示欄位獨立顯示 inline grid
//
// V2 [採用] · Settings style · 2026-05-26
//     iOS 設定頁 list row 風格；圖示欄位在 list 卡外獨立顯示 inline grid
//     設計定案：以此 variant 作為 AccountEditor / CategoryEditor 的 form layout 仲裁
//
// V3 · Compact preview
//     頂部小 preview row 常駐；name input；屬性 chip（不含圖示）；
//     圖示欄位顯示 inline grid
// ─────────────────────────────────────────────────────────────

const ACEF_CAT_ICONS = [12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23];
const ACEF_ACC_ICONS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

const ACEF_MAPPING_OPTIONS = ['飲食 (其他)', '外食', '咖啡', '早餐', '午餐', '晚餐', '宵夜', '飲料', '甜點'];
const ACEF_ACC_TYPE_OPTIONS = ['銀行帳戶', '信用卡', '現金', '投資', '其他'];
const ACEF_TYPE_OPTIONS = ['支出', '收入'];
const ACEF_CURRENCY_OPTIONS = ['TWD', 'USD', 'JPY', 'EUR', 'HKD'];

const ACEF_CAT = {
  iconId: 13,
  name: '飲食',
  type: 'expense',
  typeLabel: '支出',
  mapping: '飲食 (其他)',
  enabled: true,
};

const ACEF_ACC = {
  iconId: 11,
  name: '玉山活儲',
  currency: 'TWD',
  type: '銀行帳戶',
  enabled: true,
};

// ─── Shell ──────────────────────────────────────────────────
function ACEF_Shell({ title, children }) {
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

// ─── Shared helpers ──────────────────────────────────────────
function ACEF_ListRow({ label, value, leftPreview, disabled, hideChevron }) {
  return (
    <div style={{
      paddingLeft: SPACING.md, paddingRight: SPACING.md,
      paddingTop: SPACING.md, paddingBottom: SPACING.md,
      display: 'flex', alignItems: 'center', minHeight: 44,
    }}>
      <span style={{
        fontSize: TYPOGRAPHY.size.base,
        color: disabled ? TOKENS.ink3 : TOKENS.ink2,
        flex: '0 0 auto', marginRight: SPACING.md,
      }}>{label}</span>
      <div style={{
        flex: 1, display: 'flex', alignItems: 'center', gap: SPACING.sm,
        justifyContent: 'flex-end',
      }}>
        {leftPreview}
        {value && (
          <span style={{
            fontSize: TYPOGRAPHY.size.base,
            color: disabled ? TOKENS.ink3 : TOKENS.ink,
          }}>{value}</span>
        )}
      </div>
      {!hideChevron && !disabled && (
        <Glyph name="chevron-down" size={ICON_SIZE.sm} color={TOKENS.ink2} stroke={2}/>
      )}
    </div>
  );
}

function ACEF_HR() {
  return (
    <div style={{ height: 1, marginLeft: SPACING.md, background: TOKENS.divider.hairline }}/>
  );
}

function ACEF_Chip({ label, value, leftPreview, disabled }) {
  return (
    <div style={{
      display: 'inline-flex', alignItems: 'center', gap: SPACING.xs,
      padding: '6px 12px', borderRadius: 999,
      background: TOKENS.surface,
      border: `1px solid ${TOKENS.divider.hairline}`,
      opacity: disabled ? 0.6 : 1,
    }}>
      {leftPreview}
      <span style={{ fontSize: TYPOGRAPHY.size.xs, color: TOKENS.ink3 }}>{label}</span>
      <span style={{
        fontSize: TYPOGRAPHY.size.sm, color: TOKENS.ink,
        fontWeight: TYPOGRAPHY.weight.medium,
      }}>{value}</span>
      {!disabled && (
        <Glyph name="chevron-down" size={12} color={TOKENS.ink3} stroke={2}/>
      )}
    </div>
  );
}

function ACEF_ButtonGroup({ options, selected }) {
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

function ACEF_SearchableDropdown({ options, selected, placeholder, defaultOpen }) {
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
                {i > 0 && <ACEF_HR/>}
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

// 互動式名稱 input — 對標 AmountField 的 active border 模式
// focus 時 border 切換為 p500、bg 切為 TOKENS.bg，同 AmountField active 態邏輯
// active prop：對標 AmountField 的 active prop，artboard 可靜態展示 focused 樣式
function ACEF_NameInput({ defaultValue, placeholder, active: activeProp }) {
  const [focused, setFocused] = React.useState(false);
  const [val, setVal] = React.useState(defaultValue || '');
  const isActive = focused || activeProp;
  return (
    <React.Fragment>
      <style>{`.acef-name-input{outline:none;font-family:inherit;}.acef-name-input::placeholder{color:${TOKENS.ink3};}`}</style>
      <input
        className="acef-name-input"
        value={val}
        onChange={e => setVal(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        placeholder={placeholder}
        style={{
          width: '100%', boxSizing: 'border-box',
          background: isActive ? TOKENS.bg : TOKENS.surface,
          padding: SPACING.md,
          borderRadius: RADIUS.md,
          borderWidth: 1, borderStyle: 'solid',
          borderColor: isActive ? TOKENS.p500 : TOKENS.border,
          fontSize: TYPOGRAPHY.size.base, color: TOKENS.ink,
        }}
      />
    </React.Fragment>
  );
}

// AmountField 風格的名稱 input（V1/V2/V3 用）
// 對標 TransactionEditor 金額輸入框：HEIGHT 80、2xl 字體、置中
// active prop 可靜態展示 focused 樣式（artboard 預設傳入）
function ACEF_NameField({ defaultValue, placeholder, active: activeProp }) {
  const [focused, setFocused] = React.useState(false);
  const [val, setVal] = React.useState(defaultValue || '');
  const isActive = focused || activeProp;
  const T = AMOUNT_FIELD_TOKENS;
  return (
    <React.Fragment>
      <style>{`.acef-name-field{outline:none;font-family:inherit;}.acef-name-field::placeholder{color:${TOKENS.ink3};text-align:center;}`}</style>
      <input
        className="acef-name-field"
        value={val}
        onChange={e => setVal(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        placeholder={placeholder || '輸入名稱'}
        style={{
          width: '100%', boxSizing: 'border-box',
          height: T.HEIGHT,
          background: isActive ? TOKENS.bg : TOKENS.surface,
          padding: T.PADDING,
          borderRadius: T.RADIUS,
          borderWidth: T.BORDER_WIDTH, borderStyle: 'solid',
          borderColor: isActive ? TOKENS.p500 : TOKENS.border,
          fontSize: T.AMOUNT_SIZE,
          fontWeight: T.AMOUNT_WEIGHT,
          color: val ? TOKENS.ink : TOKENS.ink3,
          textAlign: 'center',
        }}
      />
    </React.Fragment>
  );
}

// 4col inline icon grid（Icon Picker V1，V1/V2/V3 共用）
function ACEF_InlineIconGrid({ icons, selectedId }) {
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

// Footer Zone V1 style — Switch card + delete button（surface 底紅字無框）
function ACEF_FooterV1({ enableLabel, deleteLabel, enabled }) {
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

// type segmented（Category 用，V1+ 無 chevron bug）
function ACEF_TypeSegmented_Buggy() {
  return (
    <div style={{ display: 'flex', gap: SPACING.sm }}>
      {['支出', '收入'].map((t) => {
        const active = t === ACEF_CAT.typeLabel;
        return (
          <div key={t} style={{
            flex: 1, paddingTop: SPACING.md, paddingBottom: SPACING.md,
            paddingLeft: SPACING.sm, paddingRight: SPACING.sm,
            background: active ? TOKENS.p500 : TOKENS.surface,
            border: `1px solid ${active ? TOKENS.p500 : TOKENS.divider.hairline}`,
            borderRadius: RADIUS.md,
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
            color: active ? 'white' : TOKENS.ink2,
            fontSize: TYPOGRAPHY.size.base,
            fontWeight: active ? TYPOGRAPHY.weight.medium : 'normal',
          }}>
            {t}
            <Glyph name="chevron-down" size={14}
              color={active ? 'rgba(255,255,255,0.7)' : TOKENS.ink3} stroke={2}/>
          </div>
        );
      })}
    </div>
  );
}


// ─── V0 [Current] ─────────────────────────────────────────────

function ACEF_V0_Category() {
  return (
    <ACEF_Shell title="編輯類別">
      <div style={{ padding: SPACING.lg }}>
        <div style={{ marginBottom: SPACING.xl }}>
          <EditorFieldLabel required>類型</EditorFieldLabel>
          <ACEF_TypeSegmented_Buggy/>
        </div>
        <div style={{ marginBottom: SPACING.xl }}>
          <EditorFieldLabel required>名稱</EditorFieldLabel>
          <ACEF_NameInput defaultValue={ACEF_CAT.name} active/>
        </div>
        <div style={{ marginBottom: SPACING.xl }}>
          <EditorFieldLabel>標準對照</EditorFieldLabel>
          <EditorPickerCollapsed value={ACEF_CAT.mapping}/>
        </div>
        <div style={{ marginBottom: SPACING.xl }}>
          <EditorFieldLabel required>圖示</EditorFieldLabel>
          <EditorPickerCollapsed
            leftIcon={<DynamicIconById iconId={ACEF_CAT.iconId} size={ICON_SIZE.md} color={TOKENS.ink}/>}
            value="ph-bread"/>
        </div>
        <ACEF_FooterV1 enableLabel="啟用類別" deleteLabel="刪除類別" enabled={ACEF_CAT.enabled}/>
      </div>
    </ACEF_Shell>
  );
}

function ACEF_V0_Account() {
  return (
    <ACEF_Shell title="編輯帳戶">
      <div style={{ padding: SPACING.lg }}>
        <div style={{ marginBottom: SPACING.xl }}>
          <EditorFieldLabel required>帳戶名稱</EditorFieldLabel>
          <ACEF_NameInput defaultValue={ACEF_ACC.name} active/>
        </div>
        <div style={{ marginBottom: SPACING.xl }}>
          <EditorFieldLabel required>幣別</EditorFieldLabel>
          <EditorPickerCollapsed value={ACEF_ACC.currency} disabled/>
        </div>
        <div style={{ marginBottom: SPACING.xl }}>
          <EditorFieldLabel required>類型</EditorFieldLabel>
          <EditorPickerCollapsed value={ACEF_ACC.type}/>
        </div>
        <div style={{ marginBottom: SPACING.xl }}>
          <EditorFieldLabel required>圖示</EditorFieldLabel>
          <EditorPickerCollapsed
            leftIcon={<DynamicIconById iconId={ACEF_ACC.iconId} size={ICON_SIZE.md} color={TOKENS.ink}/>}
            value="ph-building"/>
        </div>
        <ACEF_FooterV1 enableLabel="啟用帳戶" deleteLabel="刪除帳戶" enabled={ACEF_ACC.enabled}/>
      </div>
    </ACEF_Shell>
  );
}

// ─── V1 · Hero identity ───────────────────────────────────────

function ACEF_V1_Category() {
  return (
    <ACEF_Shell title="編輯類別">
      {/* HERO */}
      <div style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        gap: SPACING.sm, paddingTop: SPACING.xl, paddingBottom: SPACING.lg,
        paddingLeft: SPACING.lg, paddingRight: SPACING.lg,
      }}>
        <div style={{
          width: 80, height: 80, borderRadius: 40,
          background: `${TOKENS.p500}1A`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <DynamicIconById iconId={ACEF_CAT.iconId} size={40} color={TOKENS.p500}/>
        </div>
        <div style={{ fontSize: 26, fontWeight: 600, color: TOKENS.ink, textAlign: 'center' }}>
          {ACEF_CAT.name}
        </div>
        <div style={{
          padding: '4px 12px', borderRadius: 999,
          background: '#FEE2E2', color: '#DC2626',
          fontSize: TYPOGRAPHY.size.sm, fontWeight: TYPOGRAPHY.weight.medium,
        }}>{ACEF_CAT.typeLabel}</div>
      </div>

      {/* NAME FIELD */}
      <div style={{ paddingLeft: SPACING.lg, paddingRight: SPACING.lg, marginTop: SPACING.lg }}>
        <ACEF_NameField defaultValue={ACEF_CAT.name} active/>
      </div>

      {/* TYPE */}
      <div style={{ paddingLeft: SPACING.lg, paddingRight: SPACING.lg, marginTop: SPACING.md }}>
        <EditorFieldLabel required>類型</EditorFieldLabel>
        <ACEF_SearchableDropdown options={ACEF_TYPE_OPTIONS} selected={ACEF_CAT.typeLabel} defaultOpen/>
      </div>

      {/* MAPPING */}
      <div style={{ paddingLeft: SPACING.lg, paddingRight: SPACING.lg, marginTop: SPACING.lg }}>
        <EditorFieldLabel>標準對照</EditorFieldLabel>
        <ACEF_ButtonGroup options={ACEF_MAPPING_OPTIONS} selected={ACEF_CAT.mapping}/>
      </div>

      {/* ICON GRID */}
      <div style={{ paddingLeft: SPACING.lg, paddingRight: SPACING.lg, marginTop: SPACING.lg }}>
        <EditorFieldLabel required>圖示</EditorFieldLabel>
        <ACEF_InlineIconGrid icons={ACEF_CAT_ICONS} selectedId={ACEF_CAT.iconId}/>
      </div>
      {/* FOOTER */}
      <div style={{ paddingLeft: SPACING.lg, paddingRight: SPACING.lg, marginTop: SPACING.xl }}>
        <ACEF_FooterV1 enableLabel="啟用類別" deleteLabel="刪除類別" enabled={ACEF_CAT.enabled}/>
      </div>
    </ACEF_Shell>
  );
}

function ACEF_V1_Account() {
  return (
    <ACEF_Shell title="編輯帳戶">
      {/* HERO */}
      <div style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        gap: SPACING.md, paddingTop: SPACING.xl, paddingBottom: SPACING.xl,
        paddingLeft: SPACING.lg, paddingRight: SPACING.lg,
      }}>
        <div style={{
          width: 88, height: 88, borderRadius: 44,
          background: `${TOKENS.p500}1A`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <DynamicIconById iconId={ACEF_ACC.iconId} size={44} color={TOKENS.p500}/>
        </div>
        <div style={{ fontSize: 28, fontWeight: 600, color: TOKENS.ink, textAlign: 'center' }}>
          {ACEF_ACC.name}
        </div>
        <div style={{ fontSize: TYPOGRAPHY.size.sm, color: TOKENS.ink2 }}>
          {ACEF_ACC.currency} · {ACEF_ACC.type}
        </div>
      </div>

      {/* NAME FIELD */}
      <div style={{ paddingLeft: SPACING.lg, paddingRight: SPACING.lg, marginTop: SPACING.lg }}>
        <ACEF_NameField defaultValue={ACEF_ACC.name} active/>
      </div>

      {/* CURRENCY */}
      <div style={{ paddingLeft: SPACING.lg, paddingRight: SPACING.lg, marginTop: SPACING.md }}>
        <EditorFieldLabel required>幣別</EditorFieldLabel>
        <ACEF_SearchableDropdown options={ACEF_CURRENCY_OPTIONS} selected={ACEF_ACC.currency} defaultOpen/>
      </div>

      {/* ACCTYPE */}
      <div style={{ paddingLeft: SPACING.lg, paddingRight: SPACING.lg, marginTop: SPACING.lg }}>
        <EditorFieldLabel required>類型</EditorFieldLabel>
        <ACEF_ButtonGroup options={ACEF_ACC_TYPE_OPTIONS} selected={ACEF_ACC.type}/>
      </div>

      {/* ICON GRID */}
      <div style={{ paddingLeft: SPACING.lg, paddingRight: SPACING.lg, marginTop: SPACING.lg }}>
        <EditorFieldLabel required>圖示</EditorFieldLabel>
        <ACEF_InlineIconGrid icons={ACEF_ACC_ICONS} selectedId={ACEF_ACC.iconId}/>
      </div>
      {/* FOOTER */}
      <div style={{ paddingLeft: SPACING.lg, paddingRight: SPACING.lg, marginTop: SPACING.xl }}>
        <ACEF_FooterV1 enableLabel="啟用帳戶" deleteLabel="刪除帳戶" enabled={ACEF_ACC.enabled}/>
      </div>
    </ACEF_Shell>
  );
}

// ─── V2 · Settings style ──────────────────────────────────────

function ACEF_V2_Category() {
  return (
    <ACEF_Shell title="編輯類別">
      <div style={{ paddingTop: SPACING.lg, paddingLeft: SPACING.lg, paddingRight: SPACING.lg }}>
        <ACEF_NameField defaultValue={ACEF_CAT.name} active/>
      </div>

      <div style={{ paddingLeft: SPACING.lg, paddingRight: SPACING.lg, marginTop: SPACING.md }}>
        <EditorFieldLabel required>類型</EditorFieldLabel>
        <ACEF_SearchableDropdown options={ACEF_TYPE_OPTIONS} selected={ACEF_CAT.typeLabel} defaultOpen/>
      </div>

      <div style={{ paddingLeft: SPACING.lg, paddingRight: SPACING.lg, marginTop: SPACING.lg }}>
        <EditorFieldLabel>標準對照</EditorFieldLabel>
        <ACEF_ButtonGroup options={ACEF_MAPPING_OPTIONS} selected={ACEF_CAT.mapping}/>
      </div>

      {/* ICON GRID */}
      <div style={{ paddingLeft: SPACING.lg, paddingRight: SPACING.lg, marginTop: SPACING.lg }}>
        <EditorFieldLabel required>圖示</EditorFieldLabel>
        <ACEF_InlineIconGrid icons={ACEF_CAT_ICONS} selectedId={ACEF_CAT.iconId}/>
      </div>
      {/* FOOTER */}
      <div style={{ paddingLeft: SPACING.lg, paddingRight: SPACING.lg, marginTop: SPACING.xl }}>
        <ACEF_FooterV1 enableLabel="啟用類別" deleteLabel="刪除類別" enabled={ACEF_CAT.enabled}/>
      </div>
    </ACEF_Shell>
  );
}

function ACEF_V2_Account() {
  return (
    <ACEF_Shell title="編輯帳戶">
      <div style={{ paddingTop: SPACING.lg, paddingLeft: SPACING.lg, paddingRight: SPACING.lg }}>
        <ACEF_NameField defaultValue={ACEF_ACC.name} active/>
      </div>

      <div style={{ paddingLeft: SPACING.lg, paddingRight: SPACING.lg, marginTop: SPACING.md }}>
        <EditorFieldLabel required>幣別</EditorFieldLabel>
        <ACEF_SearchableDropdown options={ACEF_CURRENCY_OPTIONS} selected={ACEF_ACC.currency} defaultOpen/>
      </div>

      <div style={{ paddingLeft: SPACING.lg, paddingRight: SPACING.lg, marginTop: SPACING.lg }}>
        <EditorFieldLabel required>類型</EditorFieldLabel>
        <ACEF_ButtonGroup options={ACEF_ACC_TYPE_OPTIONS} selected={ACEF_ACC.type}/>
      </div>

      {/* ICON GRID */}
      <div style={{ paddingLeft: SPACING.lg, paddingRight: SPACING.lg, marginTop: SPACING.lg }}>
        <EditorFieldLabel required>圖示</EditorFieldLabel>
        <ACEF_InlineIconGrid icons={ACEF_ACC_ICONS} selectedId={ACEF_ACC.iconId}/>
      </div>
      {/* FOOTER */}
      <div style={{ paddingLeft: SPACING.lg, paddingRight: SPACING.lg, marginTop: SPACING.xl }}>
        <ACEF_FooterV1 enableLabel="啟用帳戶" deleteLabel="刪除帳戶" enabled={ACEF_ACC.enabled}/>
      </div>
    </ACEF_Shell>
  );
}

// ─── V3 · Compact preview ─────────────────────────────────────

function ACEF_V3_Category() {
  return (
    <ACEF_Shell title="編輯類別">
      {/* PREVIEW ROW */}
      <div style={{
        marginTop: SPACING.md, marginLeft: SPACING.lg, marginRight: SPACING.lg,
        background: TOKENS.surface, borderRadius: RADIUS.lg,
        padding: SPACING.md, display: 'flex', alignItems: 'center', gap: SPACING.md,
        border: `1px solid ${TOKENS.divider.hairline}`,
      }}>
        <div style={{
          width: 44, height: 44, borderRadius: 22,
          background: `${TOKENS.p500}14`,
          display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
        }}>
          <DynamicIconById iconId={ACEF_CAT.iconId} size={24} color={TOKENS.p500}/>
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{
            fontSize: TYPOGRAPHY.size.lg, fontWeight: TYPOGRAPHY.weight.medium, color: TOKENS.ink,
          }}>{ACEF_CAT.name}</div>
          <div style={{ fontSize: TYPOGRAPHY.size.sm, color: TOKENS.ink2, marginTop: 2 }}>
            {ACEF_CAT.mapping}
          </div>
        </div>
        <div style={{
          padding: '4px 10px', borderRadius: 999,
          background: '#FEE2E2', color: '#DC2626',
          fontSize: TYPOGRAPHY.size.sm, fontWeight: TYPOGRAPHY.weight.medium,
        }}>{ACEF_CAT.typeLabel}</div>
      </div>

      <div style={{ marginTop: SPACING.lg, paddingLeft: SPACING.lg, paddingRight: SPACING.lg }}>
        <ACEF_NameField defaultValue={ACEF_CAT.name} active/>
      </div>

      <div style={{ marginTop: SPACING.lg, paddingLeft: SPACING.lg, paddingRight: SPACING.lg }}>
        <EditorFieldLabel required>類型</EditorFieldLabel>
        <ACEF_SearchableDropdown options={ACEF_TYPE_OPTIONS} selected={ACEF_CAT.typeLabel} defaultOpen/>
      </div>

      <div style={{ marginTop: SPACING.lg, paddingLeft: SPACING.lg, paddingRight: SPACING.lg }}>
        <EditorFieldLabel>標準對照</EditorFieldLabel>
        <ACEF_ButtonGroup options={ACEF_MAPPING_OPTIONS} selected={ACEF_CAT.mapping}/>
      </div>

      {/* ICON GRID */}
      <div style={{ marginTop: SPACING.lg, paddingLeft: SPACING.lg, paddingRight: SPACING.lg }}>
        <EditorFieldLabel required>圖示</EditorFieldLabel>
        <ACEF_InlineIconGrid icons={ACEF_CAT_ICONS} selectedId={ACEF_CAT.iconId}/>
      </div>
      {/* FOOTER */}
      <div style={{ marginTop: SPACING.xl, paddingLeft: SPACING.lg, paddingRight: SPACING.lg }}>
        <ACEF_FooterV1 enableLabel="啟用類別" deleteLabel="刪除類別" enabled={ACEF_CAT.enabled}/>
      </div>
    </ACEF_Shell>
  );
}

function ACEF_V3_Account() {
  return (
    <ACEF_Shell title="編輯帳戶">
      {/* PREVIEW ROW */}
      <div style={{
        marginTop: SPACING.md, marginLeft: SPACING.lg, marginRight: SPACING.lg,
        background: TOKENS.surface, borderRadius: RADIUS.lg,
        padding: SPACING.md, display: 'flex', alignItems: 'center', gap: SPACING.md,
        border: `1px solid ${TOKENS.divider.hairline}`,
      }}>
        <div style={{
          width: 44, height: 44, borderRadius: 22,
          background: `${TOKENS.p500}14`,
          display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
        }}>
          <DynamicIconById iconId={ACEF_ACC.iconId} size={24} color={TOKENS.p500}/>
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{
            fontSize: TYPOGRAPHY.size.lg, fontWeight: TYPOGRAPHY.weight.medium, color: TOKENS.ink,
          }}>{ACEF_ACC.name}</div>
          <div style={{ fontSize: TYPOGRAPHY.size.sm, color: TOKENS.ink2, marginTop: 2 }}>
            {ACEF_ACC.type}
          </div>
        </div>
        <div style={{
          padding: '4px 10px', borderRadius: 999,
          background: `${TOKENS.p500}14`, color: TOKENS.p500,
          fontSize: TYPOGRAPHY.size.sm, fontWeight: TYPOGRAPHY.weight.medium,
        }}>{ACEF_ACC.currency}</div>
      </div>

      <div style={{ marginTop: SPACING.xl, paddingLeft: SPACING.lg, paddingRight: SPACING.lg }}>
        <ACEF_NameField defaultValue={ACEF_ACC.name} active/>
      </div>

      <div style={{ marginTop: SPACING.lg, paddingLeft: SPACING.lg, paddingRight: SPACING.lg }}>
        <EditorFieldLabel required>幣別</EditorFieldLabel>
        <ACEF_SearchableDropdown options={ACEF_CURRENCY_OPTIONS} selected={ACEF_ACC.currency} defaultOpen/>
      </div>

      <div style={{ marginTop: SPACING.lg, paddingLeft: SPACING.lg, paddingRight: SPACING.lg }}>
        <EditorFieldLabel required>類型</EditorFieldLabel>
        <ACEF_ButtonGroup options={ACEF_ACC_TYPE_OPTIONS} selected={ACEF_ACC.type}/>
      </div>

      {/* ICON GRID */}
      <div style={{ marginTop: SPACING.lg, paddingLeft: SPACING.lg, paddingRight: SPACING.lg }}>
        <EditorFieldLabel required>圖示</EditorFieldLabel>
        <ACEF_InlineIconGrid icons={ACEF_ACC_ICONS} selectedId={ACEF_ACC.iconId}/>
      </div>
      {/* FOOTER */}
      <div style={{ marginTop: SPACING.xl, paddingLeft: SPACING.lg, paddingRight: SPACING.lg }}>
        <ACEF_FooterV1 enableLabel="啟用帳戶" deleteLabel="刪除帳戶" enabled={ACEF_ACC.enabled}/>
      </div>
    </ACEF_Shell>
  );
}

// ─── Section render ──────────────────────────────────────────
function AccountCategoryEditorFormStructureSection() {
  const W = 402, H = 920;
  return (
    <DCSection id="ace-form-structure"
      title="Axis · Form Structure"
      subtitle="每個 variant 左為 Category（主），右為 Account（對照）。V1/V2/V3 決定結論：4col icon picker 直接展開、button group（mapping/類型）、searchable dropdown（類型/幣別）、Footer Zone V1（Switch card + delete）。">
      <DCArtboard id="acef-v0-cat"
        label="V0 [Current] · Category · type segmented 有 chevron bug、icon 顯示系統名稱、delete 純紅字無 box"
        width={W} height={H}>
        <IOSDevice width={W} height={H}><ACEF_V0_Category/></IOSDevice>
      </DCArtboard>
      <DCArtboard id="acef-v0-acc"
        label="V0 [Current] · Account · icon 顯示系統名稱、delete 純紅字無 box"
        width={W} height={H}>
        <IOSDevice width={W} height={H}><ACEF_V0_Account/></IOSDevice>
      </DCArtboard>

      <DCArtboard id="acef-v1-cat"
        label="V1 · Hero identity · Category · 圖示大圓 + 名稱 + 支出 badge；searchable dropdown（類型）；button group（標準對照）；inline icon grid；Footer Zone V1"
        width={W} height={H}>
        <IOSDevice width={W} height={H}><ACEF_V1_Category/></IOSDevice>
      </DCArtboard>
      <DCArtboard id="acef-v1-acc"
        label="V1 · Hero identity · Account · 圖示大圓 + 名稱 + 描述；searchable dropdown（幣別）；button group（類型）；inline icon grid；Footer Zone V1"
        width={W} height={H}>
        <IOSDevice width={W} height={H}><ACEF_V1_Account/></IOSDevice>
      </DCArtboard>

      <DCArtboard id="acef-v2-cat"
        label="V2 · Settings style · Category · name field；searchable dropdown（類型）；button group（標準對照）；inline icon grid；Footer Zone V1"
        width={W} height={H}>
        <IOSDevice width={W} height={H}><ACEF_V2_Category/></IOSDevice>
      </DCArtboard>
      <DCArtboard id="acef-v2-acc"
        label="V2 · Settings style · Account · name field；searchable dropdown（幣別）；button group（類型）；inline icon grid；Footer Zone V1"
        width={W} height={H}>
        <IOSDevice width={W} height={H}><ACEF_V2_Account/></IOSDevice>
      </DCArtboard>

      <DCArtboard id="acef-v3-cat"
        label="V3 · Compact preview · Category · preview row；name；searchable dropdown（類型）；button group（標準對照）；inline icon grid；Footer Zone V1"
        width={W} height={H}>
        <IOSDevice width={W} height={H}><ACEF_V3_Category/></IOSDevice>
      </DCArtboard>
      <DCArtboard id="acef-v3-acc"
        label="V3 · Compact preview · Account · preview row；name；searchable dropdown（幣別）；button group（類型）；inline icon grid；Footer Zone V1"
        width={W} height={H}>
        <IOSDevice width={W} height={H}><ACEF_V3_Account/></IOSDevice>
      </DCArtboard>
    </DCSection>
  );
}

Object.assign(window, { AccountCategoryEditorFormStructureSection });
