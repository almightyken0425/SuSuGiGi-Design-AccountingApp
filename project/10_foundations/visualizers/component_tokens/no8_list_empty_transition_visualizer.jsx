// ─────────────────────────────────────────────────────────────
// Foundations > Component Tokens > List Empty Transition · LIST_EMPTY_TRANSITION visualizer
// ─────────────────────────────────────────────────────────────

const LIST_EMPTY_TRANSITION_DESC = {
  DURATION_MS: '列表空狀態切換動畫長度（220ms，fast 與 base 之間）',
  EASING:      '緩動函式（HIG standard）',
};

const LIST_EMPTY_TRANSITION_SOURCE = {
  DURATION_MS: 'MOTION.duration.fast + 20',
  EASING:      'MOTION.easing.standard',
};

function FoundationsCTListEmptyTransitionSection() {
  return (
    <DCSection
      id="found-ct-list-empty-transition"
      title="Component Tokens · List Empty Transition"
      subtitle="列表空狀態切換動畫。引用 MOTION，不再寫死毫秒數。性質為 list 元件 transition spec，收於 component_tokens。"
    >
      <DCFamily id="list-empty-transition-tokens-family" title="Tokens" subtitle="LIST_EMPTY_TRANSITION 完整表格（兩項：duration / easing）。">
        <DCArtboard id="list-empty-transition-tokens" label="LIST_EMPTY_TRANSITION · 列表空狀態切換" width="auto" height="auto">
          <TokenTableCard tokens={LIST_EMPTY_TRANSITION} title="LIST_EMPTY_TRANSITION" descriptions={LIST_EMPTY_TRANSITION_DESC} sources={LIST_EMPTY_TRANSITION_SOURCE}/>
        </DCArtboard>
      </DCFamily>
    </DCSection>
  );
}

Object.assign(window, {
  LIST_EMPTY_TRANSITION_DESC, LIST_EMPTY_TRANSITION_SOURCE,
  FoundationsCTListEmptyTransitionSection,
});
