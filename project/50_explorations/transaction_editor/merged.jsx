// ─── Merged editors (revised after Ken r2) ───────────────────
// Applied: P1 date+recurring · P2 hero amount (backspace inline, no conversion) ·
//          Wheel picker for category/account (Ken: keep wheel picker, not click-to-open) ·
//          P7 delete in header · P9 swap from↔to ·
//          P8 transfer with two separate amount inputs
// Dropped: P3 click-to-open picker (Ken) · P4 type tabs · P5 note suggestions ·
//          P6 calc operator emphasis · P10 hierarchy labels

const M_BG       = '#F2F2F7';
const M_SURFACE  = '#FFFFFF';
const M_INK      = '#212121';
const M_INK2     = '#757575';
const M_INK3     = '#BDBDBD';
const M_PUR      = '#4323A0';
const M_PUR_BG   = '#F0ECFA';
const M_PUR_BORDER = '#C0B6DF';
const M_ERROR    = '#F44336';
const M_BORDER   = '#EEEEEE';
const M_HAIRLINE = 'rgba(60,60,67,0.10)';
const M_FONT     = '-apple-system, "SF Pro Text", "PingFang TC", "Noto Sans TC", system-ui, sans-serif';

// ─── Header ──────────────────────────────────────────────────
function M_Header({ title, isEdit }) {
  return (
    <div style={{
      paddingTop: 60, paddingBottom: 8, paddingLeft: 8, paddingRight: 8,
      display: 'flex', alignItems: 'center', position: 'relative', zIndex: 5,
    }}>
      <div style={{ flex: 1, minHeight: 32, display: 'flex' }}>
        <button style={{
          border: 'none', background: 'transparent', cursor: 'pointer',
          padding: 10, display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <Glyph name="x" size={17} color={M_INK} stroke={2.4}/>
        </button>
      </div>
      <div style={{
        position: 'absolute', left: '50%', top: 60, transform: 'translateX(-50%)',
        fontSize: 17, fontWeight: 500, color: M_INK, whiteSpace: 'nowrap',
      }}>{title}</div>
      <div style={{ flex: 1, display: 'flex', justifyContent: 'flex-end', minHeight: 32, gap: 4 }}>
        {isEdit && (
          <button style={{
            border: 'none', background: 'transparent', cursor: 'pointer',
            padding: 10, display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <Glyph name="trash" size={17} color={M_ERROR} stroke={2.2}/>
          </button>
        )}
        <button style={{
          border: 'none', background: 'transparent', cursor: 'pointer',
          padding: 10, display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <Glyph name="check" size={17} color={M_PUR} stroke={2.4}/>
        </button>
      </div>
    </div>
  );
}

// P2: hero amount with inline backspace, no conversion line
function M_HeroAmount({ amount, currency = 'NT$', label = '支出金額' }) {
  const [whole, dec] = amount.split('.');
  return (
    <div style={{ padding: '8px 16px 16px' }}>
      <div style={{
        background: M_SURFACE, borderRadius: 14, padding: '20px 18px',
        border: '1px solid ' + M_PUR_BORDER,
        position: 'relative',
      }}>
        <div style={{
          fontSize: 11, color: M_INK2, letterSpacing: 2, textTransform: 'uppercase',
          marginBottom: 8, fontWeight: 600, textAlign: 'center',
        }}>{label}</div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12 }}>
          <div style={{ display: 'inline-flex', alignItems: 'flex-start', gap: 4 }}>
            <span style={{ fontSize: 17, color: M_INK2, fontWeight: 500, marginTop: 5, fontVariantNumeric: 'tabular-nums' }}>{currency}</span>
            <span style={{
              fontSize: 50, fontWeight: 500, color: M_INK, lineHeight: 1,
              letterSpacing: -1.8, fontVariantNumeric: 'tabular-nums',
            }}>{whole}</span>
            {dec !== undefined && (
              <span style={{ fontSize: 24, color: M_INK3, fontWeight: 500, marginTop: 2, fontVariantNumeric: 'tabular-nums' }}>.{dec}</span>
            )}
          </div>
        </div>
        <button style={{
          position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)',
          width: 36, height: 36, borderRadius: 10,
          background: M_PUR_BG, border: 'none', cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <Glyph name="backspace-outline" size={18} color={M_PUR} stroke={1.6}/>
        </button>
      </div>
    </div>
  );
}

// P1: date + recurring merged card
function M_DateRecurringCard({ recurring }) {
  return (
    <div style={{ padding: '0 16px 12px' }}>
      <div style={{
        background: M_SURFACE, borderRadius: 14, padding: 14,
        border: '1px solid ' + M_HAIRLINE,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{
            width: 36, height: 36, borderRadius: 10, background: M_PUR_BG,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <Glyph name="calendar" size={18} color={M_PUR} stroke={2}/>
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 11, color: M_INK2, marginBottom: 2 }}>日期</div>
            <div style={{ fontSize: 15, fontWeight: 500, color: M_INK }}>
              2026 年 5 月 14 日 <span style={{ color: M_INK2, fontWeight: 400, fontSize: 13 }}>週四 14:30</span>
            </div>
          </div>
          <Glyph name="chevron-right" size={13} color={M_INK3} stroke={2.4}/>
        </div>
        <div style={{ height: 0.5, background: M_HAIRLINE, margin: '12px 0 12px 48px' }}/>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{
            width: 36, height: 36, borderRadius: 10, background: recurring ? M_PUR_BG : '#F5F5F5',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <Glyph name="repeat" size={18} color={recurring ? M_PUR : M_INK3} stroke={2}/>
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 14, fontWeight: 500, color: M_INK }}>重複此筆</div>
            <div style={{ fontSize: 12, color: M_INK2, marginTop: 1 }}>
              {recurring ? '每月 14 日' : '關閉'}
            </div>
          </div>
          <div style={{
            width: 48, height: 28, borderRadius: 14, background: recurring ? M_PUR : '#E0E0E0',
            position: 'relative',
          }}>
            <div style={{
              position: 'absolute', top: 2, left: recurring ? 22 : 2,
              width: 24, height: 24, borderRadius: 12, background: '#fff',
              boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
            }}/>
          </div>
        </div>
      </div>
    </div>
  );
}

// Wheel picker — kept per Ken's request. Visualizes the surrounding items
// so the user sees they CAN scroll without tapping.
function M_WheelPicker({ items, selectedIdx, label, accent }) {
  const prev = items[(selectedIdx - 1 + items.length) % items.length];
  const next = items[(selectedIdx + 1) % items.length];
  const cur = items[selectedIdx];
  return (
    <div style={{
      flex: 1, background: M_SURFACE, borderRadius: 12,
      border: '1px solid ' + M_HAIRLINE, overflow: 'hidden',
      display: 'flex', flexDirection: 'column',
    }}>
      <div style={{
        fontSize: 10, color: M_INK2, letterSpacing: 1.5, textTransform: 'uppercase',
        fontWeight: 600, padding: '8px 12px 4px',
      }}>{label}</div>
      <div style={{
        flex: 1, position: 'relative', display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center', padding: '4px 0 10px',
      }}>
        <div style={{ fontSize: 12, color: M_INK3, opacity: 0.55, lineHeight: 1.3 }}>{prev}</div>
        <div style={{
          fontSize: 17, fontWeight: 500, color: accent || M_INK,
          margin: '4px 0', position: 'relative',
        }}>{cur}</div>
        <div style={{ fontSize: 12, color: M_INK3, opacity: 0.55, lineHeight: 1.3 }}>{next}</div>
        {/* Selection bars */}
        <div style={{
          position: 'absolute', left: 8, right: 8, top: '50%', height: 30,
          transform: 'translateY(-50%)', pointerEvents: 'none',
          borderTop: '1px solid ' + M_HAIRLINE,
          borderBottom: '1px solid ' + M_HAIRLINE,
        }}/>
      </div>
    </div>
  );
}

function M_PickerRow({ cat, acc }) {
  const catNames = CATEGORIES.filter(c => c.type === 'expense').map(c => c.name);
  const accNames = ACCOUNTS.map(a => a.name);
  const catIdx = catNames.indexOf(cat.name);
  const accIdx = accNames.indexOf(acc.name);
  return (
    <div style={{ padding: '0 16px 12px', display: 'flex', gap: 12, height: 130 }}>
      <M_WheelPicker items={accNames} selectedIdx={accIdx} label="帳戶"/>
      <M_WheelPicker items={catNames} selectedIdx={catIdx} label="類別" accent={M_PUR}/>
    </div>
  );
}

// Note — plain, no suggestions
function M_NoteCard() {
  return (
    <div style={{ padding: '0 16px 16px' }}>
      <div style={{
        display: 'flex', alignItems: 'center', gap: 12,
        background: M_SURFACE, padding: 14, borderRadius: 14,
        border: '1px solid ' + M_HAIRLINE,
      }}>
        <Glyph name="tag" size={18} color={M_INK2} stroke={2}/>
        <div style={{ flex: 1, fontSize: 14, color: M_INK3 }}>新增備註</div>
      </div>
    </div>
  );
}

// Keypad — all keys equal weight (P6 dropped)
function M_Keypad() {
  const KEYS = [
    ['7','8','9','÷'],
    ['4','5','6','×'],
    ['1','2','3','-'],
    ['.','0','=','+'],
  ];
  return (
    <div style={{ background: M_SURFACE, borderTop: '1px solid ' + M_BORDER, padding: '8px 8px 16px' }}>
      {KEYS.map((row, ri) => (
        <div key={ri} style={{ display: 'flex', gap: 6, marginBottom: ri === 3 ? 0 : 6 }}>
          {row.map(k => (
            <div key={k} style={{
              flex: 1, height: 44, borderRadius: 8, background: '#F5F5F5',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 18, fontWeight: 500, color: M_INK,
            }}>{k}</div>
          ))}
        </div>
      ))}
    </div>
  );
}

// ─── Merged Transaction editor ───────────────────────────────
function MergedTransactionEditor({ isEdit = false }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: M_BG, fontFamily: M_FONT, color: M_INK }}>
      <M_Header title={isEdit ? '編輯支出' : '新增支出'} isEdit={isEdit}/>
      <div style={{ flex: 1, overflowY: 'auto' }}>
        <M_HeroAmount amount="185.00"/>
        <M_PickerRow cat={CAT_BY_ID['food']} acc={ACC_BY_ID['credit']}/>
        <M_DateRecurringCard recurring={false}/>
        <M_NoteCard/>
        <div style={{ height: 200 }}/>
      </div>
      <M_Keypad/>
    </div>
  );
}

// ─── Transfer · two separate amount inputs ───────────────────
function M_TransferAmountPair({ fromCur, fromValue, toCur, toValue, rate, activeField = 'from' }) {
  const Field = ({ side, currency, value, active }) => {
    const [whole, dec] = String(value).split('.');
    return (
      <div style={{
        background: active ? M_SURFACE : '#FAFAFA',
        border: `1.5px solid ${active ? M_PUR : M_HAIRLINE}`,
        borderRadius: 14, padding: '16px 18px',
        position: 'relative',
      }}>
        <div style={{
          fontSize: 10, color: active ? M_PUR : M_INK2,
          letterSpacing: 1.5, textTransform: 'uppercase', fontWeight: 600,
          marginBottom: 4,
        }}>{side === 'from' ? '從這裡轉出' : '轉入這裡'}</div>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 4 }}>
          <span style={{ fontSize: 14, color: M_INK2, fontWeight: 500, marginTop: 6, fontVariantNumeric: 'tabular-nums' }}>{currency}</span>
          <span style={{
            fontSize: 34, fontWeight: 500, color: active ? M_INK : M_INK2, lineHeight: 1,
            letterSpacing: -1, fontVariantNumeric: 'tabular-nums',
          }}>{whole}</span>
          {dec !== undefined && (
            <span style={{ fontSize: 20, color: M_INK3, fontWeight: 500, marginTop: 2, fontVariantNumeric: 'tabular-nums' }}>.{dec}</span>
          )}
        </div>
        {active && (
          <button style={{
            position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)',
            width: 34, height: 34, borderRadius: 10,
            background: M_PUR_BG, border: 'none', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <Glyph name="backspace-outline" size={18} color={M_PUR} stroke={1.6}/>
          </button>
        )}
      </div>
    );
  };
  return (
    <div style={{ padding: '8px 16px 12px' }}>
      <Field side="from" currency={fromCur} value={fromValue} active={activeField === 'from'}/>
      <div style={{ display: 'flex', justifyContent: 'center', margin: '-1px 0' }}>
        <div style={{
          padding: '4px 12px', background: M_PUR_BG,
          border: '1px solid ' + M_PUR_BORDER, borderRadius: 12,
          fontSize: 11, color: M_PUR, fontWeight: 500, fontVariantNumeric: 'tabular-nums',
          position: 'relative', zIndex: 1, display: 'inline-flex', alignItems: 'center', gap: 4,
        }}>
          <Glyph name="exchange" size={11} color={M_PUR} stroke={2.4}/>
          <span>1 {fromCur} = {rate} {toCur}</span>
        </div>
      </div>
      <div style={{ marginTop: 8 }}>
        <Field side="to" currency={toCur} value={toValue} active={activeField === 'to'}/>
      </div>
    </div>
  );
}

// Transfer accounts — wheel pickers (consistent with category/account picker style)
function M_TransferAccountsCard({ from, to }) {
  const accNames = ACCOUNTS.map(a => a.name);
  const fromIdx = accNames.indexOf(from.name);
  const toIdx = accNames.indexOf(to.name);
  return (
    <div style={{ padding: '0 16px 12px', display: 'flex', gap: 8, alignItems: 'stretch', height: 130 }}>
      <M_WheelPicker items={accNames} selectedIdx={fromIdx} label="從"/>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <button style={{
          width: 36, height: 36, borderRadius: 18,
          background: M_PUR_BG, border: '1.5px solid ' + M_PUR,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          cursor: 'pointer', padding: 0, flexShrink: 0,
        }}>
          <Glyph name="exchange" size={15} color={M_PUR} stroke={2.4}/>
        </button>
      </div>
      <M_WheelPicker items={accNames} selectedIdx={toIdx} label="到"/>
    </div>
  );
}

function MergedTransferEditor({ isEdit = false }) {
  const from = ACC_BY_ID['bank'];
  const to = ACC_BY_ID['usd_cash'];
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: M_BG, fontFamily: M_FONT, color: M_INK }}>
      <M_Header title={isEdit ? '編輯轉帳' : '新增轉帳'} isEdit={isEdit}/>
      <div style={{ flex: 1, overflowY: 'auto' }}>
        <M_TransferAmountPair
          fromCur={from.currency} fromValue="15,000"
          toCur={to.currency} toValue="480.00"
          rate="0.032" activeField="from"/>
        <M_TransferAccountsCard from={from} to={to}/>
        <M_DateRecurringCard recurring={false}/>
        <M_NoteCard/>
        <div style={{ height: 200 }}/>
      </div>
      <M_Keypad/>
    </div>
  );
}

Object.assign(window, { MergedTransactionEditor, MergedTransferEditor });
