// ─────────────────────────────────────────────────────────────
// Foundations > Component Tokens > Keypad · KEYPAD_TOKENS visualizer
// ─────────────────────────────────────────────────────────────

const KEYPAD_TOKEN_DESC = {
  NUM_KEY_HEIGHT:      '數字鍵高度；operator 欄 5 鍵均分數字區總高（每鍵 ≈ 0.8 倍）',
  ROW_GAP:             '鍵列垂直間距',
  COL_GAP:             '鍵欄水平間距（每鍵左右各出一半）',
  CONTAINER_PADDING:   '鍵盤容器內距',
  KEY_RADIUS:          '鍵面圓角',
  KEY_FONT_SIZE:       '鍵字級（數字與 operator 同級）',
  KEY_FONT_WEIGHT:     '鍵字重',
  OP_TINT:             'operator 鍵玻璃染色（p100 半透，疊在 GLASS 磚上）',
  DOCK_PADDING_TOP:    'dock 上緣呼吸；殼承載底與線，鍵盤自己不畫（單一擁有者）',
  PRESS_TINT_NUMBER:   '按下數字鍵磚面染色（Press Feedback P1 定案）',
  PRESS_TINT_OP:       '按下 operator 鍵磚面染色（轉 p100 實色）',
  PRESS_RELEASE_MS:    '放開回復動畫時長；按下即時無過渡',
};

const KEYPAD_TOKEN_SOURCE = {
  NUM_KEY_HEIGHT:      '60 (literal)',
  ROW_GAP:             'SPACING.sm',
  COL_GAP:             'SPACING.xs',
  CONTAINER_PADDING:   'SPACING.sm',
  KEY_RADIUS:          'RADIUS.md',
  KEY_FONT_SIZE:       'TYPOGRAPHY.size.xl',
  KEY_FONT_WEIGHT:     'TYPOGRAPHY.weight.medium',
  OP_TINT:             'TOKENS.p100 + 50% alpha',
  DOCK_PADDING_TOP:    'SPACING.lg',
  PRESS_TINT_NUMBER:   'TOKENS.p50',
  PRESS_TINT_OP:       'TOKENS.p100',
  PRESS_RELEASE_MS:    '160 (literal)',
};

function FoundationsCTKeypadSection() {
  return (
    <DCSection
      id="found-ct-keypad"
      title="Component Tokens · Keypad"
      subtitle="CalculatorKeypad 四則運算鍵盤。鍵面 V0 玻璃磚（GLASS 參數 + 每鍵陰影），按壓回饋 P1 品牌色輕染：數字鍵染 p50、operator 鍵轉 p100 實色，放開 160ms 回復、按下即時。press 色 impl 端由 theme 動態接 primary[50] / primary[100]，不寫死 hex。"
    >
      <DCFamily id="keypad-tokens-family" title="Tokens" subtitle="KEYPAD_TOKENS 完整表格（幾何 / 字面 / 染色 / 按壓回饋）。">
        <DCArtboard id="keypad-tokens" label="KEYPAD_TOKENS · CalculatorKeypad" width="auto" height="auto">
          <TokenTableCard tokens={KEYPAD_TOKENS} title="KEYPAD_TOKENS" descriptions={KEYPAD_TOKEN_DESC} sources={KEYPAD_TOKEN_SOURCE}/>
        </DCArtboard>
        <DCArtboard id="keypad-tokens-live" label="CalculatorKeypad · live（按住鍵看 P1 回饋）" width={402} height={320}>
          <div style={{ background: TOKENS.surface, borderTop: `1px solid ${TOKENS.border}`, paddingTop: KEYPAD_TOKENS.DOCK_PADDING_TOP, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', boxSizing: 'border-box' }}>
            <CalculatorKeypad onPress={() => {}}/>
          </div>
        </DCArtboard>
      </DCFamily>
    </DCSection>
  );
}

Object.assign(window, {
  KEYPAD_TOKEN_DESC, KEYPAD_TOKEN_SOURCE, FoundationsCTKeypadSection,
});
