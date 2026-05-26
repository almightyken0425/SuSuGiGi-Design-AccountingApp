// ─────────────────────────────────────────────────────────────
// Foundations > Component Tokens > Switch · SWITCH_TOKENS visualizer
// ─────────────────────────────────────────────────────────────

const SWITCH_TOKEN_DESC = {
  TRACK_COLOR_OFF:  '未選態 track 色（surface_hover，淺灰跟系統 toggle 對齊）',
  TRACK_COLOR_ON:   '選中態 track 色：default 走 success、brand 走 primary',
};

const SWITCH_TOKEN_SOURCE = {
  TRACK_COLOR_OFF:  'TOKENS.surface2',
  TRACK_COLOR_ON:   'TOKENS.success / TOKENS.p500',
};

function FoundationsCTSwitchSection() {
  return (
    <DCSection
      id="found-ct-switch"
      title="Component Tokens · Switch"
      subtitle="RN 原生 Switch 兩態色彩政策。thumbColor 不傳值（讓 iOS 跑原生 UISwitch、含 iOS 26 Liquid Glass 材質），ios_backgroundColor 由 caller 動態接 theme.bg.surface_hover。default 走 status.success，brand 走 primary.main。impl makeSwitchTrackColor(theme, variant) 回傳 theme 動態色。"
    >
      <DCFamily id="switch-tokens-family" title="Tokens" subtitle="SWITCH_TOKENS 完整表格（兩態色彩政策）。">
        <DCArtboard id="switch-tokens" label="SWITCH_TOKENS · RN 原生 Switch 兩態" width="auto" height="auto">
          <TokenTableCard tokens={SWITCH_TOKENS} title="SWITCH_TOKENS" descriptions={SWITCH_TOKEN_DESC} sources={SWITCH_TOKEN_SOURCE}/>
        </DCArtboard>
      </DCFamily>
    </DCSection>
  );
}

Object.assign(window, {
  SWITCH_TOKEN_DESC, SWITCH_TOKEN_SOURCE, FoundationsCTSwitchSection,
});
