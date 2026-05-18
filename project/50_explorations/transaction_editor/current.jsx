// ─── Editors · current state ─────────────────────────────────
// Faithful recreation of:
//   - TransactionEditorScreen (source/screens.jsx line 622)
//   - TransferEditorScreen    (source/screens.jsx line 850)
// Style stays the production SuSuGiGi iOS-native style.

const ED_BG       = '#F2F2F7';
const ED_SURFACE  = '#FFFFFF';
const ED_INK      = '#212121';
const ED_INK2     = '#757575';
const ED_INK3     = '#BDBDBD';
const ED_BORDER   = '#EEEEEE';
const ED_HAIRLINE = 'rgba(60,60,67,0.10)';
const ED_PUR      = '#4323A0';
const ED_ERROR    = '#F44336';
const ED_SUCCESS  = '#4CAF50';
const ED_FONT     = '-apple-system, "SF Pro Text", "PingFang TC", "Noto Sans TC", system-ui, sans-serif';

// ─── ModalHeader (left close · title · right save) ──────────
function EdModalHeader({ title, isEdit, isError }) {
  return (
    <div style={{
      paddingTop: 60, paddingBottom: 8, paddingLeft: 8, paddingRight: 8,
      display: 'flex', alignItems: 'center', position: 'relative', zIndex: 5,
    }}>
      <div style={{ flex: 1, minHeight: 32, display: 'flex' }}>
        <button style={{
          border: 'none', background: 'transparent', cursor: 'pointer',
          padding: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <Glyph name="x" size={17} color={ED_INK} stroke={2.4}/>
        </button>
      </div>
      <div style={{
        position: 'absolute', left: '50%', top: 60, transform: 'translateX(-50%)',
        fontSize: 17, fontWeight: 500, color: ED_INK, whiteSpace: 'nowrap',
      }}>{title}</div>
      <div style={{ flex: 1, display: 'flex', justifyContent: 'flex-end', minHeight: 32 }}>
        <button style={{
          border: 'none', background: 'transparent',
          cursor: isError ? 'default' : 'pointer',
          padding: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center',
          opacity: isError ? 0.4 : 1,
        }}>
          <Glyph name="check" size={17} color={isError ? ED_INK3 : ED_PUR} stroke={2.4}/>
        </button>
      </div>
    </div>
  );
}

// ─── Static "wheel picker" (display only) ────────────────────
function EdWheelPicker({ label, subLabel, accent }) {
  return (
    <div style={{
      flex: 1, height: 110,
      background: ED_SURFACE,
      borderRadius: 8, border: `1px solid ${ED_BORDER}`,
      overflow: 'hidden', display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center', padding: 8,
    }}>
      <div style={{ fontSize: 14, color: ED_INK3, opacity: 0.6 }}>
        {subLabel ? `(${subLabel})` : ''}
      </div>
      <div style={{ fontSize: 18, fontWeight: 500, color: accent || ED_INK, marginTop: 4, marginBottom: 4 }}>
        {label}
      </div>
      <div style={{ fontSize: 14, color: ED_INK3, opacity: 0.6 }}/>
    </div>
  );
}

// ─── Recurring options panel ─────────────────────────────────
function EdRecurringPanel() {
  const optBtn = (label, selected) => (
    <button key={label} style={{
      padding: '8px 12px', borderRadius: 16,
      border: `1px solid ${selected ? ED_PUR : ED_BORDER}`,
      marginRight: 8, marginBottom: 8,
      background: selected ? ED_PUR : ED_BG,
      color: selected ? '#fff' : ED_INK,
      fontSize: 14, fontWeight: selected ? 500 : 400,
      cursor: 'pointer', fontFamily: 'inherit',
    }}>{label}</button>
  );
  return (
    <div style={{
      background: ED_SURFACE, borderRadius: 12, padding: 16,
      marginTop: 8, marginBottom: 16,
      border: `1px solid ${ED_BORDER}`,
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <span style={{ fontSize: 16, fontWeight: 500, color: ED_PUR }}>定期設定</span>
        {/* Switch */}
        <div style={{
          width: 52, height: 32, borderRadius: 16, background: ED_PUR, position: 'relative',
        }}>
          <div style={{
            position: 'absolute', top: 2, left: 22, width: 28, height: 28,
            borderRadius: 14, background: '#fff', boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
          }}/>
        </div>
      </div>
      <div style={{ fontSize: 14, color: ED_INK2, marginTop: 8, marginBottom: 8 }}>頻率</div>
      <div style={{ display: 'flex', flexWrap: 'wrap', marginBottom: 8 }}>
        {optBtn('每日', false)}
        {optBtn('每週', false)}
        {optBtn('每月', true)}
        {optBtn('每年', false)}
      </div>
      <div style={{ fontSize: 14, color: ED_INK2, marginTop: 8, marginBottom: 8 }}>每隔</div>
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: 8 }}>
        <div style={{
          background: ED_BG, padding: 8, borderRadius: 8,
          border: `1px solid ${ED_BORDER}`, fontSize: 18, width: 60,
          textAlign: 'center', marginRight: 12, color: ED_INK,
        }}>1</div>
        <span style={{ fontSize: 16, color: ED_INK }}>月</span>
      </div>
      <div style={{ fontSize: 14, color: ED_INK2, marginTop: 8, marginBottom: 8 }}>結束於</div>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {optBtn('永不', true)}
        {optBtn('特定日期', false)}
      </div>
    </div>
  );
}

// ─── Static calculator keypad ────────────────────────────────
function EdKeypad() {
  const KEYS = [
    ['1','2','3','+'],
    ['4','5','6','-'],
    ['7','8','9','×'],
    ['.','0','=','÷'],
  ];
  const OP = new Set(['+','-','×','÷','=']);
  return (
    <div style={{ padding: 8, background: ED_SURFACE, borderTop: `1px solid ${ED_BORDER}` }}>
      {KEYS.map((row, ri) => (
        <div key={ri} style={{ display: 'flex', marginBottom: ri === 3 ? 0 : 8 }}>
          {row.map(k => {
            const op = OP.has(k);
            return (
              <div key={k} style={{
                flex: 1, height: 50, margin: '0 4px',
                borderRadius: 8,
                background: op ? 'rgba(192,182,223,0.5)' : 'rgba(255,255,255,0.55)',
                backdropFilter: 'blur(28px) saturate(180%)',
                WebkitBackdropFilter: 'blur(28px) saturate(180%)',
                border: '1px solid rgba(255,255,255,0.85)',
                boxShadow: '0 4px 12px rgba(0,0,0,0.10)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 20, fontWeight: 500, color: op ? ED_PUR : ED_INK,
              }}>{k}</div>
            );
          })}
        </div>
      ))}
    </div>
  );
}

// ─── TransactionEditor (current) ─────────────────────────────
function CurrentTransactionEditor({ variant = 'default' }) {
  const isError = variant === 'error';
  const isEdit = variant === 'edit';
  const recurring = variant === 'recurring';
  const amount = isError ? '' : '185';
  const note = isError ? '' : '路易莎咖啡';

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: ED_BG, fontFamily: ED_FONT, color: ED_INK }}>
      <EdModalHeader title={isEdit ? '編輯交易' : '新增交易'} isEdit={isEdit} isError={isError}/>

      <div style={{ flex: 1, overflowY: 'auto', padding: 16 }}>
        {/* Error banner — left-border-only accent (one of our anti-patterns, but it's in the source) */}
        {isError && (
          <div style={{
            background: `${ED_ERROR}15`,
            borderLeft: `4px solid ${ED_ERROR}`,
            padding: 12, borderRadius: 8, marginBottom: 16,
            display: 'flex', alignItems: 'flex-start', gap: 8,
          }}>
            <Glyph name="warning" size={18} color={ED_ERROR}/>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 14, fontWeight: 500, color: ED_ERROR, marginBottom: 2 }}>錯誤</div>
              <div style={{ fontSize: 14, color: ED_INK }}>請輸入有效金額</div>
            </div>
          </div>
        )}

        {/* Date pill + recurring toggle */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 24 }}>
          <div style={{
            display: 'flex', alignItems: 'center',
            background: ED_SURFACE, padding: '8px 16px',
            borderRadius: 20, border: `1px solid ${ED_BORDER}`,
            margin: '0 16px',
          }}>
            <span style={{ fontSize: 16, color: ED_INK, fontWeight: 500 }}>2026/05/14  14:30</span>
          </div>
          <div style={{
            width: 40, height: 40, borderRadius: 20,
            background: ED_SURFACE,
            border: `1px solid ${recurring ? ED_PUR : ED_BORDER}`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <Glyph name="repeat" size={24} color={recurring ? ED_PUR : ED_INK3} stroke={2}/>
          </div>
        </div>

        {recurring && <EdRecurringPanel/>}

        {/* Amount field */}
        <div style={{ marginBottom: 24 }}>
          <div style={{
            display: 'flex', alignItems: 'center',
            background: ED_BG, padding: 16,
            borderRadius: 8, border: `1px solid ${ED_PUR}`,
          }}>
            <span style={{ fontSize: 20, fontWeight: 500, color: ED_INK, marginRight: 8 }}>NT$</span>
            <span style={{
              flex: 1, fontSize: 20, fontWeight: 500,
              color: amount ? ED_INK : ED_INK3,
              fontVariantNumeric: 'tabular-nums',
            }}>{amount || '0.00'}</span>
            <div style={{ padding: 8 }}>
              <Glyph name="backspace-outline" size={24} color={ED_INK2} stroke={1.6}/>
            </div>
          </div>
        </div>

        {/* Picker row — static wheel pickers */}
        <div style={{ display: 'flex', marginBottom: 24 }}>
          <EdWheelPicker label="國泰世華 信用卡" subLabel="TWD"/>
          <div style={{ width: 16 }}/>
          <EdWheelPicker label="飲食" subLabel="支出" accent={ED_ERROR}/>
        </div>

        {/* Note */}
        <div style={{ marginBottom: 24 }}>
          <div style={{
            width: '100%', boxSizing: 'border-box',
            background: ED_SURFACE, padding: 16,
            borderRadius: 8, border: `1px solid ${ED_BORDER}`,
            fontSize: 16, color: note ? ED_INK : ED_INK3,
          }}>{note || '新增備註'}</div>
        </div>

        {isEdit && (
          <div style={{ marginTop: 16, display: 'flex', justifyContent: 'center' }}>
            <button style={{
              padding: 8, background: 'transparent', border: 'none', cursor: 'pointer',
              fontFamily: 'inherit', color: ED_ERROR, fontSize: 16,
            }}>刪除交易</button>
          </div>
        )}

        <div style={{ height: 100 }}/>
      </div>

      <EdKeypad/>
    </div>
  );
}

// ─── TransferEditor (current) ────────────────────────────────
function CurrentTransferEditor({ variant = 'default' }) {
  const fromAcc = ACC_BY_ID['bank'];
  const toAcc = ACC_BY_ID['usd_cash'];
  const isCrossCurrency = fromAcc.currency !== toAcc.currency;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: ED_BG, fontFamily: ED_FONT, color: ED_INK }}>
      <EdModalHeader title="新增轉帳"/>

      <div style={{ flex: 1, overflowY: 'auto', padding: 16 }}>
        {/* Date pill + recurring toggle */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 24 }}>
          <div style={{
            background: ED_SURFACE, padding: '8px 16px', borderRadius: 20,
            border: `1px solid ${ED_BORDER}`, margin: '0 16px',
          }}>
            <span style={{ fontSize: 16, color: ED_INK, fontWeight: 500 }}>2026/05/14  14:30</span>
          </div>
          <div style={{
            width: 40, height: 40, borderRadius: 20,
            background: ED_SURFACE, border: `1px solid ${ED_BORDER}`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <Glyph name="repeat" size={24} color={ED_INK3} stroke={2}/>
          </div>
        </div>

        {/* Amounts row */}
        <div style={{ marginBottom: 24 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <EdAmountField active value="15,000" currency={fromAcc.currency}/>
            <div style={{ width: 40, display: 'flex', alignItems: 'center', justifyContent: 'center', paddingTop: 20 }}>
              <Glyph name="arrow-right" size={24} color={ED_INK2}/>
            </div>
            <EdAmountField disabled={!isCrossCurrency} value="480" currency={toAcc.currency}/>
          </div>
        </div>

        {/* Picker row */}
        <div style={{ display: 'flex', marginBottom: 24, alignItems: 'flex-start' }}>
          <EdWheelPicker label={fromAcc.name} subLabel={fromAcc.currency}/>
          <div style={{ width: 16, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ marginTop: 30 }}>
              <Glyph name="arrow-right" size={24} color={ED_INK2}/>
            </div>
          </div>
          <EdWheelPicker label={toAcc.name} subLabel={toAcc.currency}/>
        </div>

        {/* Note */}
        <div style={{ marginBottom: 24 }}>
          <div style={{
            width: '100%', boxSizing: 'border-box',
            background: ED_SURFACE, padding: 16,
            borderRadius: 8, border: `1px solid ${ED_BORDER}`,
            fontSize: 16, color: ED_INK3,
          }}>新增備註</div>
        </div>

        <div style={{ height: 100 }}/>
      </div>

      <EdKeypad/>
    </div>
  );
}

function EdAmountField({ active, value, currency, disabled }) {
  return (
    <div style={{
      flex: 1, position: 'relative',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: disabled ? ED_BG : (active ? ED_BG : ED_SURFACE),
      padding: 12, borderRadius: 8,
      border: disabled ? 'none' : `1px solid ${active ? ED_PUR : ED_BORDER}`,
      height: 80, opacity: disabled ? 0.7 : 1,
    }}>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <span style={{
          fontSize: 24, fontWeight: 500,
          color: disabled ? ED_INK2 : (value ? ED_INK : ED_INK3),
          textAlign: 'center', fontVariantNumeric: 'tabular-nums',
        }}>{value || '0.00'}</span>
        {currency && (
          <span style={{ fontSize: 12, color: ED_INK2, marginTop: 4 }}>{currency}</span>
        )}
      </div>
      {active && !disabled && (
        <div style={{ position: 'absolute', right: 0, top: '50%', transform: 'translateY(-50%)', padding: 8 }}>
          <Glyph name="backspace-outline" size={24} color={ED_INK2} stroke={1.6}/>
        </div>
      )}
    </div>
  );
}

Object.assign(window, { CurrentTransactionEditor, CurrentTransferEditor });
