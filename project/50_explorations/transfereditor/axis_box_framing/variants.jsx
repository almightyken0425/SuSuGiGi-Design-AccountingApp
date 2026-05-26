// ─────────────────────────────────────────────────────────────
// Exploration · TransferEditor · Axis · Box Framing
//
// 四個 variant 比較 amount / account 兩 row 的容器處理，以及進一步把
// amount focus 變色與 backspace 位置一起重新安排。
//
// V0 [Current] · No box · Horizontal arrow
//     amount / account 各自橫排，from / to 各自有 surface + border，中間 → 箭頭
//
// V1 · Horizontal box · 內元素裸排
//     外層一個 box 包 amount row（無內 box），中間 → 箭頭；account row 同理
//     active state 用紫色文字（不再 border + bg）
//
// V2 · Vertical box · 內元素裸疊
//     外層一個 box，內部 from / to 全寬縱向疊，中間 ↓ 箭頭
//
// V3 · V1 + Calculator-as-controller · 完整方向
//     在 V1 之上：amount 內 inline backspace 移除（改到 calculator 內）+
//     calculator 改用 C-1 排法（operator column 5 鍵含 ⌫，operator 鍵略矮）。
//     對齊「金額不是 input 框、calculator 是金額的主要控制中心」這個方向。
//     落地需同步動 TransactionEditor 與共用 CalculatorKeypad 元件。
//
// Date / Note 不變。
// ─────────────────────────────────────────────────────────────

// ─── Shared mock state ───────────────────────────────────────
const TBF_FROM_ACC = ACC_BY_ID['bank'];
const TBF_TO_ACC   = ACC_BY_ID['usd_cash'];
const TBF_FROM_AMOUNT = '15,000';
const TBF_TO_AMOUNT   = '480';

// ─── TBF_Shell ─── ModalHeader + scroll body + 可換 keypad
function TBF_Shell({ children, keypad }) {
  const T = TRANSFER_EDITOR_SCREEN_TOKENS;
  return (
    <div style={{
      display: 'flex', flexDirection: 'column', height: '100%',
      position: 'relative', background: TOKENS.bg,
    }}>
      <ModalHeader title="新增轉帳" onClose={() => {}} onSave={() => {}}/>
      <div style={{
        flex: 1, position: 'relative',
        overflowY: 'auto', overflowX: 'hidden',
      }}>
        <div style={{ padding: SPACING.lg }}>
          <EditorDateContainer recurring={false} onToggleRecurring={() => {}}/>
          {children}
          <EditorNoteField value="" onChange={() => {}}/>
          <div style={{ height: T.SCROLL_SPACER_HEIGHT }}/>
        </div>
      </div>
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0,
        background: TOKENS.surface,
        borderTop: `1px solid ${TOKENS.border}`,
        paddingBottom: T.KEYPAD_BOTTOM_PADDING,
      }}>
        {keypad || <CalculatorKeypad/>}
      </div>
    </div>
  );
}

// ─── Arrows ─── horizontal → / vertical ↓
function TBF_HorizontalArrow() {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      paddingLeft: SPACING.sm, paddingRight: SPACING.sm,
    }}>
      <Glyph name="arrow-right" size={ICON_SIZE.md} color={TOKENS.ink2}/>
    </div>
  );
}
function TBF_VerticalArrow() {
  const s = ICON_SIZE.md;
  return (
    <div style={{
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      paddingTop: SPACING.sm, paddingBottom: SPACING.sm,
    }}>
      <svg width={s} height={s} viewBox="0 0 16 16" fill="none">
        <path d="M8 3v10M4 9l4 4 4-4"
          stroke={TOKENS.ink2} strokeWidth={2}
          strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </div>
  );
}

// ─── TBF_RawAmount ─── 裸 amount（無 box）
// active 用紫色文字 + 右側 backspace（V1 / V2 用）；
// V3 設 showBackspace=false（backspace 改到 calculator C-1 內）
function TBF_RawAmount({ active, value, currency, align = 'center', showBackspace = true }) {
  const A = AMOUNT_FIELD_TOKENS;
  return (
    <div style={{
      display: 'flex', flexDirection: 'column',
      alignItems: align === 'center' ? 'center' : 'flex-start',
      flex: 1,
      paddingTop: SPACING.md, paddingBottom: SPACING.md,
      position: 'relative',
    }}>
      <div style={{
        fontSize: A.AMOUNT_SIZE, fontWeight: A.AMOUNT_WEIGHT,
        color: active ? TOKENS.p500 : (value ? TOKENS.ink : TOKENS.ink3),
        fontVariantNumeric: 'tabular-nums',
        display: 'inline-flex', alignItems: 'center', gap: SPACING.sm,
      }}>
        <span>{value || '0.00'}</span>
        {active && showBackspace && (
          <Glyph name="backspace-outline" size={A.BACKSPACE_ICON_SIZE} color={TOKENS.ink2} stroke={A.BACKSPACE_ICON_STROKE}/>
        )}
      </div>
      {currency && (
        <div style={{
          fontSize: A.CURRENCY_SIZE, color: TOKENS.ink2,
          marginTop: A.CURRENCY_MARGIN_TOP,
        }}>{currency}</div>
      )}
    </div>
  );
}

// ─── TBF_RawAccount ─── 拿掉 wheel picker 外框但保留 wheel 高度與 3 行內容
// impl 端為 RN native iOS Picker（wheel），design canvas 用三行模擬：
// 上 dim row / 中 highlighted（account name）/ 下 dim row。
// 高度對齊 STATIC_WHEEL_PICKER_TOKENS.HEIGHT，避免 design 跟 impl 視覺對不齊。
function TBF_RawAccount({ account }) {
  const S = STATIC_WHEEL_PICKER_TOKENS;
  const dimRowStyle = {
    fontSize: S.LABEL_SIZE,
    color: TOKENS.ink,
    opacity: S.DIM_OPACITY,
    height: S.LABEL_SIZE,
  };
  return (
    <div style={{
      flex: 1,
      height: S.HEIGHT,
      overflow: 'hidden',
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      padding: S.PADDING,
    }}>
      <div style={dimRowStyle}/>
      <div style={{
        fontSize: S.LABEL_SIZE, fontWeight: S.LABEL_WEIGHT,
        color: TOKENS.ink,
        marginTop: S.LABEL_VERTICAL_MARGIN, marginBottom: S.LABEL_VERTICAL_MARGIN,
      }}>{account.name}</div>
      <div style={dimRowStyle}/>
    </div>
  );
}

// ─── TBF_CalculatorKeypadC1 ─── operator column 5 鍵含 ⌫（C-1 排法）
// 數字區（左 3 欄）4 row × 3 col；operator 區（右 1 欄）5 鍵均分總高度，
// 因此 operator 鍵高度 ≈ 數字鍵 × 0.8（不對稱 grid）。
// keypad 整體高度不變（= 數字鍵 4 row）。⌫ 不染紫，跟其他 operator 在視覺上區分。
function TBF_CalculatorKeypadC1({ onPress }) {
  const NUMBER_ROWS = [
    ['1', '2', '3'],
    ['4', '5', '6'],
    ['7', '8', '9'],
    ['.', '0', '='],
  ];
  // ⌫ 放在 + 上方（operator column 最上鍵），染紫色跟其他 operator 一致
  const OPS = ['⌫', '+', '−', '×', '÷'];
  const OPS_PURPLE = new Set(['⌫', '+', '−', '×', '÷']);
  const N_HEIGHT = 60;
  const ROW_GAP = SPACING.sm;
  const TOTAL_H = N_HEIGHT * NUMBER_ROWS.length + ROW_GAP * (NUMBER_ROWS.length - 1);

  // 共用 glass key visual（沿用 CalculatorKeypad 的 GLASS tint + backdrop）
  const keyVisual = (isOp) => ({
    position: 'absolute', inset: 0,
    borderRadius: RADIUS.md,
    background: isOp ? `${TOKENS.p100}80` : GLASS.tint,
    backdropFilter: 'blur(28px) saturate(180%)',
    WebkitBackdropFilter: 'blur(28px) saturate(180%)',
    border: `1px solid ${GLASS.border}`,
    boxShadow: '0 4px 12px rgba(0,0,0,0.10)',
  });
  const keyLabel = (isPurpleOp) => ({
    position: 'relative', zIndex: 1,
    fontSize: TYPOGRAPHY.size.xl,
    fontWeight: TYPOGRAPHY.weight.medium,
    color: isPurpleOp ? TOKENS.p500 : TOKENS.ink,
  });
  const keyButton = (height) => ({
    flex: 1, height,
    marginLeft: SPACING.xs, marginRight: SPACING.xs,
    border: 'none', position: 'relative', overflow: 'hidden',
    borderRadius: RADIUS.md, cursor: 'pointer', fontFamily: 'inherit',
    background: 'transparent', padding: 0,
  });
  const opButton = {
    width: '100%',
    border: 'none', position: 'relative', overflow: 'hidden',
    borderRadius: RADIUS.md, cursor: 'pointer', fontFamily: 'inherit',
    background: 'transparent', padding: 0,
  };

  return (
    <div style={{
      padding: SPACING.sm,
      background: TOKENS.surface,
      borderTop: `1px solid ${TOKENS.border}`,
      display: 'flex', flexDirection: 'row',
    }}>
      {/* 數字區 · flex 3 */}
      <div style={{ flex: 3 }}>
        {NUMBER_ROWS.map((row, ri) => (
          <div key={ri} style={{
            display: 'flex', flexDirection: 'row',
            marginBottom: ri === NUMBER_ROWS.length - 1 ? 0 : ROW_GAP,
          }}>
            {row.map(k => (
              <button key={k} onClick={() => onPress && onPress(k)} style={keyButton(N_HEIGHT)}>
                <div style={keyVisual(false)}/>
                <span style={keyLabel(false)}>{k}</span>
              </button>
            ))}
          </div>
        ))}
      </div>
      {/* operator column · flex 1 · 5 鍵均分 TOTAL_H */}
      <div style={{
        flex: 1, marginLeft: SPACING.xs, marginRight: SPACING.xs,
        height: TOTAL_H,
        display: 'flex', flexDirection: 'column',
      }}>
        {OPS.map((op, oi) => {
          const isPurple = OPS_PURPLE.has(op);
          return (
            <button key={op} onClick={() => onPress && onPress(op)} style={{
              ...opButton, flex: 1,
              marginBottom: oi === OPS.length - 1 ? 0 : ROW_GAP / 2,
              marginTop: oi === 0 ? 0 : ROW_GAP / 2,
            }}>
              <div style={keyVisual(true)}/>
              <span style={keyLabel(isPurple)}>{op}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ─── V0 · No box · 現況 ─────────────────────────────────────
function TBF_V0_NoBox() {
  const T = TRANSFER_EDITOR_SCREEN_TOKENS;
  return (
    <TBF_Shell>
      <div style={{ marginBottom: T.SECTION_GAP }}>
        <div style={{
          display: 'flex', flexDirection: 'row',
          alignItems: 'center', justifyContent: 'space-between',
        }}>
          <div style={{ flex: 1 }}>
            <AmountField active value={TBF_FROM_AMOUNT} currency={TBF_FROM_ACC.currency}/>
          </div>
          <div style={{ width: T.AMOUNT_ARROW_FRAME_WIDTH, paddingTop: T.AMOUNT_ARROW_TOP_PADDING,
            display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Glyph name="arrow-right" size={ICON_SIZE.md} color={TOKENS.ink2}/>
          </div>
          <div style={{ flex: 1 }}>
            <AmountField value={TBF_TO_AMOUNT} currency={TBF_TO_ACC.currency}/>
          </div>
        </div>
      </div>
      <div style={{
        display: 'flex', flexDirection: 'row',
        marginBottom: T.SECTION_GAP, alignItems: 'flex-start',
      }}>
        <div style={{ flex: 1, overflow: 'hidden' }}>
          <AccountSelector account={TBF_FROM_ACC}/>
        </div>
        <div style={{ width: T.PICKER_ROW_GAP, paddingTop: T.PICKER_ARROW_TOP_OFFSET,
          display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Glyph name="arrow-right" size={ICON_SIZE.md} color={TOKENS.ink2}/>
        </div>
        <div style={{ flex: 1, overflow: 'hidden' }}>
          <AccountSelector account={TBF_TO_ACC}/>
        </div>
      </div>
    </TBF_Shell>
  );
}

// ─── V1 · Horizontal box · 內元素裸排 ────────────────────────
function TBF_V1_HorizontalBox() {
  const T = TRANSFER_EDITOR_SCREEN_TOKENS;
  const boxStyle = {
    background: TOKENS.surface,
    borderRadius: RADIUS.md,
    borderWidth: 1, borderStyle: 'solid', borderColor: TOKENS.border,
    marginBottom: T.SECTION_GAP,
    paddingLeft: SPACING.md, paddingRight: SPACING.md,
  };
  return (
    <TBF_Shell>
      <div style={boxStyle}>
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
          <TBF_RawAmount active value={TBF_FROM_AMOUNT} currency={TBF_FROM_ACC.currency}/>
          <TBF_HorizontalArrow/>
          <TBF_RawAmount value={TBF_TO_AMOUNT} currency={TBF_TO_ACC.currency}/>
        </div>
      </div>
      <div style={boxStyle}>
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
          <TBF_RawAccount account={TBF_FROM_ACC}/>
          <TBF_HorizontalArrow/>
          <TBF_RawAccount account={TBF_TO_ACC}/>
        </div>
      </div>
    </TBF_Shell>
  );
}

// ─── V2 · Vertical box · 內元素裸疊 ──────────────────────────
function TBF_V2_VerticalBox() {
  const T = TRANSFER_EDITOR_SCREEN_TOKENS;
  const boxStyle = {
    background: TOKENS.surface,
    borderRadius: RADIUS.md,
    borderWidth: 1, borderStyle: 'solid', borderColor: TOKENS.border,
    marginBottom: T.SECTION_GAP,
    paddingLeft: SPACING.md, paddingRight: SPACING.md,
  };
  return (
    <TBF_Shell>
      <div style={boxStyle}>
        <TBF_RawAmount active value={TBF_FROM_AMOUNT} currency={TBF_FROM_ACC.currency}/>
        <TBF_VerticalArrow/>
        <TBF_RawAmount value={TBF_TO_AMOUNT} currency={TBF_TO_ACC.currency}/>
      </div>
      <div style={boxStyle}>
        <TBF_RawAccount account={TBF_FROM_ACC}/>
        <TBF_VerticalArrow/>
        <TBF_RawAccount account={TBF_TO_ACC}/>
      </div>
    </TBF_Shell>
  );
}

// ─── V3 · V1 + Calculator-as-controller ─────────────────────
// V1 box framing + amount 內無 inline backspace + calculator 改 C-1 排法
function TBF_V3_FullStack() {
  const T = TRANSFER_EDITOR_SCREEN_TOKENS;
  const boxStyle = {
    background: TOKENS.surface,
    borderRadius: RADIUS.md,
    borderWidth: 1, borderStyle: 'solid', borderColor: TOKENS.border,
    marginBottom: T.SECTION_GAP,
    paddingLeft: SPACING.md, paddingRight: SPACING.md,
  };
  return (
    <TBF_Shell keypad={<TBF_CalculatorKeypadC1/>}>
      <div style={boxStyle}>
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
          <TBF_RawAmount active value={TBF_FROM_AMOUNT} currency={TBF_FROM_ACC.currency} showBackspace={false}/>
          <TBF_HorizontalArrow/>
          <TBF_RawAmount value={TBF_TO_AMOUNT} currency={TBF_TO_ACC.currency} showBackspace={false}/>
        </div>
      </div>
      <div style={boxStyle}>
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
          <TBF_RawAccount account={TBF_FROM_ACC}/>
          <TBF_HorizontalArrow/>
          <TBF_RawAccount account={TBF_TO_ACC}/>
        </div>
      </div>
    </TBF_Shell>
  );
}

// ─── Section render ──────────────────────────────────────────
function TransferBoxFramingSection() {
  const W = 402, H = 874;
  return (
    <DCSection id="tbf-section"
      title="Axis · Box Framing"
      subtitle="探索 TransferEditor 的 amount / account 兩 row 容器處理。V1 V2 把 from / to 內元素拿掉自帶 box，只留外層一個 box；V3 在 V1 之上把 amount 內 backspace 移到 calculator（C-1 排法，operator column 5 鍵含 ⌫）。">
      <DCArtboard id="tbf-v0-no-box"
        label="V0 [Current] · No box · amount/account 各自橫排，from/to 各自有 box，中間 → 箭頭"
        width={W} height={H}>
        <IOSDevice width={W} height={H}><TBF_V0_NoBox/></IOSDevice>
      </DCArtboard>
      <DCArtboard id="tbf-v1-horizontal-box"
        label="V1 · Horizontal box · 一個外框包，from/to 裸橫排（無自己的 box），中間 → 箭頭"
        width={W} height={H}>
        <IOSDevice width={W} height={H}><TBF_V1_HorizontalBox/></IOSDevice>
      </DCArtboard>
      <DCArtboard id="tbf-v2-vertical-box"
        label="V2 · Vertical box · 一個外框包，from/to 裸縱疊（無自己的 box），中間 ↓ 箭頭"
        width={W} height={H}>
        <IOSDevice width={W} height={H}><TBF_V2_VerticalBox/></IOSDevice>
      </DCArtboard>
      <DCArtboard id="tbf-v3-full-stack"
        label="V3 · V1 + Calculator-as-controller · amount 內無 backspace（搬到 calculator C-1 排法），落地需同步動 TransactionEditor + 共用 CalculatorKeypad"
        width={W} height={H}>
        <IOSDevice width={W} height={H}><TBF_V3_FullStack/></IOSDevice>
      </DCArtboard>
    </DCSection>
  );
}

Object.assign(window, { TransferBoxFramingSection });
