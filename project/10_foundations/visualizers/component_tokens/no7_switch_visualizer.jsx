// ─────────────────────────────────────────────────────────────
// Foundations > Component Tokens > Switch · SWITCH_TOKENS visualizer
// ─────────────────────────────────────────────────────────────

const SWITCH_TOKEN_DESC = {
  TRACK_COLOR_OFF:  '未選態 track 色（surface_hover）',
  TRACK_COLOR_ON:   '選中態 track 色：default 走 success、brand 走 primary',
  THUMB_COLOR_ON:   '選中態 thumb 色（白）',
  THUMB_COLOR_OFF:  '未選態 thumb 色（淺灰）',
  IOS_BG_COLOR:     'iOS Switch 容器背景色',
};

const SWITCH_TOKEN_SOURCE = {
  TRACK_COLOR_OFF:  'TOKENS.surface2',
  TRACK_COLOR_ON:   'TOKENS.success / TOKENS.p500',
  THUMB_COLOR_ON:   'IOS_SYSTEM_COLOR.switchThumbOn',
  THUMB_COLOR_OFF:  'IOS_SYSTEM_COLOR.switchThumbOff',
  IOS_BG_COLOR:     'IOS_SYSTEM_COLOR.switchTrackBg',
};

function FoundationsCTSwitchSection() {
  return (
    <DCSection
      id="found-ct-switch"
      title="Component Tokens · Switch"
      subtitle="RN 原生 Switch 的兩態色彩政策。default 走 status.success（一般 toggle），brand 走 primary.main（定期/品牌相關 toggle）。impl makeSwitchTrackColor(theme, variant) 回傳 theme 動態色。"
      direction="column"
    >
      <DCArtboard id="switch-tokens" label="SWITCH_TOKENS · RN 原生 Switch 兩態" width="auto" height="auto">
        <TokenTableCard tokens={SWITCH_TOKENS} title="SWITCH_TOKENS" descriptions={SWITCH_TOKEN_DESC} sources={SWITCH_TOKEN_SOURCE}/>
      </DCArtboard>
    </DCSection>
  );
}

Object.assign(window, {
  SWITCH_TOKEN_DESC, SWITCH_TOKEN_SOURCE, FoundationsCTSwitchSection,
});
