// ─────────────────────────────────────────────────────────────
// Foundations > Component Tokens > Calendar Dialog · CALENDAR_DIALOG_TOKENS visualizer
// ─────────────────────────────────────────────────────────────

const CALENDAR_DIALOG_TOKEN_DESC = {
  PILL_PADDING_VERTICAL:      '觸發 pill 上下 padding',
  PILL_PADDING_HORIZONTAL:    '觸發 pill 左右 padding',
  PILL_RADIUS:                '觸發 pill 圓角',
  PILL_BORDER_WIDTH:          '觸發 pill 邊框寬',
  PILL_TEXT_SIZE:             'pill 日期文字字級',
  PILL_TEXT_WEIGHT:           'pill 日期文字字重',
  PILL_ICON_GAP:              'pill calendar icon 與文字間距',
  BACKDROP_BG:                '半透明黑遮罩底色',
  BACKDROP_FADE_DURATION:     'backdrop 淡入時長',
  CARD_WIDTH:                 'dialog 圓角卡寬度（容納 7 欄月曆）',
  CARD_RADIUS:                'dialog 卡片圓角',
  CARD_PADDING:               'dialog 卡片內側 padding',
  CARD_OUTER_PADDING:         'backdrop 對卡片的留白',
  HEADER_TEXT_SIZE:           '標題列字級（YYYY/MM 或 YYYY）',
  HEADER_TEXT_WEIGHT:         '標題列字重',
  HEADER_HEIGHT:              '標題列高度（可點切換日/月模式）',
  HEADER_BOTTOM_MARGIN:       '標題列與中段間距',
  WEEKDAY_TEXT_SIZE:          '星期列字級（標籤依語系）',
  WEEKDAY_TEXT_WEIGHT:        '星期列字重',
  WEEKDAY_ROW_BOTTOM_MARGIN:  '星期列與日格間距（canvas mock）',
  WEEKDAY_ROW_HEIGHT:         '星期列固定行高（impl）',
  MIDDLE_AREA_HEIGHT:         '中段固定總高（日/月共用，切模式不跳高）',
  GRID_COL_GAP:               '日/月格欄間距',
  DAY_CELL_TEXT_SIZE:         '日格數字字級',
  DAY_SELECTED_SIZE:          '日選中圓固定徑',
  DAY_SELECTED_RADIUS:        '日選中圓角',
  MONTH_CELL_TEXT_SIZE:       '月格文字字級',
  MONTH_SELECTED_HEIGHT:      '月選中 pill 固定高',
  MONTH_SELECTED_PADDING_H:   '月選中 pill 左右 padding',
  MONTH_SELECTED_RADIUS:      '月選中 pill 圓角',
  SELECTED_TEXT_WEIGHT:       '選中態字重（日/月共用）',
  WHEEL_TOP_MARGIN:           '時間滾輪與中段間距',
  WHEEL_ROW_HEIGHT:           '滾輪每行高（＝數字間距）',
  WHEEL_VISIBLE_ROWS:         '滾輪可見行數（中央選中 + 上下淡化）',
  WHEEL_COLUMN_WIDTH:         '時/分各一欄固定寬',
  WHEEL_DIM_OPACITY:          '滾輪非選中行淡化',
  WHEEL_SEPARATOR_TEXT:       '時分分隔符',
  WHEEL_GROUP_GAP:            '時/分兩滾輪組間距',
  VIEW_SWITCH_DURATION:       '日↔月切換進出場時長',
  VIEW_SWITCH_EASING:         '日↔月切換緩動曲線',
  VIEW_SWITCH_ENTER_SCALE:    '進場視圖起始縮放',
  VIEW_SWITCH_EXIT_SCALE:     '離場視圖終點縮放',
  HEADER_PULSE_DURATION:      '標題逐頁換值脈衝時長',
  HEADER_PULSE_EASING:        '標題脈衝緩動曲線',
  HEADER_PULSE_TRANSLATE:     '標題逐頁換值垂直位移',
};

const CALENDAR_DIALOG_TOKEN_SOURCE = {
  PILL_PADDING_VERTICAL:      'SPACING.sm',
  PILL_PADDING_HORIZONTAL:    'SPACING.lg',
  PILL_RADIUS:                "RADIUS['2xl']",
  PILL_BORDER_WIDTH:          '1 (literal: hairline)',
  PILL_TEXT_SIZE:             'TYPOGRAPHY.size.base',
  PILL_TEXT_WEIGHT:           'TYPOGRAPHY.weight.medium',
  PILL_ICON_GAP:              'SPACING.sm',
  BACKDROP_BG:                'rgba(0,0,0,0.4) (literal: iOS 40% 黑)',
  BACKDROP_FADE_DURATION:     '200 (literal: 對齊既有 dialog 200ms)',
  CARD_WIDTH:                 '320 (literal: 容納 7 欄月曆)',
  CARD_RADIUS:                'RADIUS.lg',
  CARD_PADDING:               'SPACING.lg',
  CARD_OUTER_PADDING:         'SPACING.xl',
  HEADER_TEXT_SIZE:           'TYPOGRAPHY.size.lg',
  HEADER_TEXT_WEIGHT:         'TYPOGRAPHY.weight.medium',
  HEADER_HEIGHT:              '44 (literal: iOS min touch target)',
  HEADER_BOTTOM_MARGIN:       'SPACING.sm',
  WEEKDAY_TEXT_SIZE:          'TYPOGRAPHY.size.xs',
  WEEKDAY_TEXT_WEIGHT:        'TYPOGRAPHY.weight.medium',
  WEEKDAY_ROW_BOTTOM_MARGIN:  'SPACING.xs',
  WEEKDAY_ROW_HEIGHT:         '24 (literal: impl 固定行高)',
  MIDDLE_AREA_HEIGHT:         '288 (literal: 星期列 + 6 列日格總高)',
  GRID_COL_GAP:               'SPACING.xs',
  DAY_CELL_TEXT_SIZE:         'TYPOGRAPHY.size.base',
  DAY_SELECTED_SIZE:          '36 (literal: 選中圓固定徑)',
  DAY_SELECTED_RADIUS:        'RADIUS.full',
  MONTH_CELL_TEXT_SIZE:       'TYPOGRAPHY.size.base',
  MONTH_SELECTED_HEIGHT:      '36 (literal: 選中 pill 固定高)',
  MONTH_SELECTED_PADDING_H:   'SPACING.lg',
  MONTH_SELECTED_RADIUS:      'RADIUS.md',
  SELECTED_TEXT_WEIGHT:       'TYPOGRAPHY.weight.medium',
  WHEEL_TOP_MARGIN:           'SPACING.lg',
  WHEEL_ROW_HEIGHT:           '32 (literal: 行高＝數字間距)',
  WHEEL_VISIBLE_ROWS:         '3 (literal)',
  WHEEL_COLUMN_WIDTH:         '72 (literal)',
  WHEEL_DIM_OPACITY:          '0.3 (literal: 非選中淡化)',
  WHEEL_SEPARATOR_TEXT:       "':' (literal: 時分分隔符)",
  WHEEL_GROUP_GAP:            'SPACING.md',
  VIEW_SWITCH_DURATION:       'MOTION.duration.fast (200)',
  VIEW_SWITCH_EASING:         'MOTION.easing.emphasized',
  VIEW_SWITCH_ENTER_SCALE:    '0.92 (literal: 進場起始縮放)',
  VIEW_SWITCH_EXIT_SCALE:     '1.06 (literal: 離場終點縮放)',
  HEADER_PULSE_DURATION:      'MOTION.duration.instant (100)',
  HEADER_PULSE_EASING:        'MOTION.easing.decelerate',
  HEADER_PULSE_TRANSLATE:     '8 (literal: 逐頁換值垂直位移 px)',
};

function FoundationsCTCalendarDialogSection() {
  return (
    <DCSection
      id="found-ct-calendar-dialog"
      title="Component Tokens · Calendar Dialog"
      subtitle="自研日期選擇器 token，對齊 Spec date_picker_policy.md（模式代號 Calendar Dialog）。單一 pill 點開置中 dialog，日/月雙子模式可切換、即時生效點外關閉。中段固定總高確保切模式 dialog 高度不變。時間滾輪僅 Datetime 模式。"
    >
      <DCFamily id="calendar-dialog-tokens-family" title="Tokens" subtitle="CALENDAR_DIALOG_TOKENS 完整表格。">
        <DCArtboard id="calendar-dialog-tokens" label="CALENDAR_DIALOG_TOKENS 表格" width="auto" height="auto">
          <TokenTableCard tokens={CALENDAR_DIALOG_TOKENS} title="CALENDAR_DIALOG_TOKENS" descriptions={CALENDAR_DIALOG_TOKEN_DESC} sources={CALENDAR_DIALOG_TOKEN_SOURCE}/>
        </DCArtboard>
      </DCFamily>
    </DCSection>
  );
}

Object.assign(window, {
  CALENDAR_DIALOG_TOKEN_DESC, CALENDAR_DIALOG_TOKEN_SOURCE, FoundationsCTCalendarDialogSection,
});
