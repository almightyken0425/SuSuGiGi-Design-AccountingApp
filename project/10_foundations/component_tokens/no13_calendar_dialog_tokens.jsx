// ─────────────────────────────────────────────────────────────
// CALENDAR_DIALOG_TOKENS · 自研日期選擇器（Spec 模式代號 Calendar Dialog）
//
// 對齊 Spec：no4_product_specs/no2_accounting_app/no2_screens/shared_ui_policies/date_picker_policy.md
// 觸發器單一 pill → 點開置中 dialog，dialog 兩子模式（日選擇 / 月選擇）可切換。
// 日選擇：標題列(YYYY/MM) + 星期列 + 月曆格；月選擇：標題列(YYYY) + 12 月格。
// 時間滾輪固定底部（僅 Datetime 模式）。Date-only 模式無時間滾輪。
// 視覺骨架沿用 ConfirmDialog 的 backdrop + 圓角卡，放大裝月曆。
// ─────────────────────────────────────────────────────────────

const CALENDAR_DIALOG_TOKENS = {
  // ── Trigger Pill（觸發器，顯示日期或日期時間文字）
  PILL_PADDING_VERTICAL:        SPACING.sm,
  PILL_PADDING_HORIZONTAL:      SPACING.lg,
  PILL_RADIUS:                  RADIUS['2xl'],
  PILL_BORDER_WIDTH:            1,                                              // (literal: hairline 邊框，與既有 surface pill 一致)
  PILL_TEXT_SIZE:               TYPOGRAPHY.size.base,
  PILL_TEXT_WEIGHT:             TYPOGRAPHY.weight.medium,
  PILL_ICON_GAP:                SPACING.sm,

  // ── Backdrop（半透明黑遮罩，沿用 iOS Alert 慣例）
  BACKDROP_BG:                  'rgba(0,0,0,0.4)',                              // (literal: iOS 慣例 40% 黑；impl 取 theme.scrim.medium，per-theme 同值 0.40)
  BACKDROP_FADE_DURATION:       200,                                           // (literal: 對齊既有 dialog fadeIn 200ms)

  // ── Dialog Card（置中圓角卡，裝月曆＋時間）
  CARD_WIDTH:                   320,                                           // (literal: 容納 7 欄月曆格的舒適寬度，略寬於 iOS Alert 270)
  CARD_RADIUS:                  RADIUS.lg,
  CARD_PADDING:                 SPACING.lg,
  CARD_OUTER_PADDING:           SPACING.xl,

  // ── Header 標題列（可點切換子模式；日模式顯 YYYY/MM、月模式顯 YYYY）
  HEADER_TEXT_SIZE:             TYPOGRAPHY.size.lg,
  HEADER_TEXT_WEIGHT:           TYPOGRAPHY.weight.medium,
  HEADER_HEIGHT:                44,                                            // (literal: iOS min touch target，標題列可點)
  HEADER_BOTTOM_MARGIN:         SPACING.sm,
  // 標題列文字置中，無 chevron icon

  // ── Weekday Row 星期列（標籤語言依使用者語系；週起始日依 weekStart 偏好：auto 跟隨語系慣例、或固定週日／週一）
  WEEKDAY_TEXT_SIZE:            TYPOGRAPHY.size.xs,
  WEEKDAY_TEXT_WEIGHT:          TYPOGRAPHY.weight.medium,
  WEEKDAY_ROW_BOTTOM_MARGIN:    SPACING.xs,                                    // (canvas mock 用：星期列 text + 下間距版)
  WEEKDAY_ROW_HEIGHT:           24,                                            // (literal: impl 用：星期列改固定行高，把原 bottom margin 折進)

  // ── 中段 Grid 區（日/月共用固定總高，確保日↔月切換 dialog 高度不變）
  // 日模式中段 = 星期列 + 6 列日格；月模式中段 = 3 列月格；兩者撐同一 MIDDLE_AREA_HEIGHT。
  // 日格 6 列 / 月格 3 列的 row 由 1fr 均分，月格 row 自動為日格約兩倍高。
  MIDDLE_AREA_HEIGHT:           288,                                           // (literal: 星期列 + 6 列日格的總高；月格 3 列撐同高)
  GRID_COL_GAP:                 SPACING.xs,

  // ── 中段翻頁互動與動畫
  // 翻頁吸附本身：月份／年份採縱向單頁 native snap 分頁（日模式上下滑切月、月模式上下滑切年，放手吸附整頁、
  // 後一個月在下方）。impl 端為 vertical FlatList pagingEnabled（沿用 home screen period paging 機制、方向改縱向）；
  // 為 native 慣性吸附，吸附計時本身不出 token。
  // 標題更新（header pulse）：翻頁每跨一個月／年，標題列即時更新（不再等捲動停止），換值時標題做一次垂直位移淡入脈衝、
  // 方向順捲動；快滑連續跨頁時只換值、停頓才 settle 一次脈衝。
  // 日↔月切換（Zoom）：點標題列切子模式時，離場視圖縮放淡出、進場視圖從縮放淡入（拉遠／拉近語意）。
  // canvas 無法 mock swipe；header pulse 於 canvas 用「模擬翻頁」按鈕示範，Zoom 於 canvas 點標題列示範。
  VIEW_SWITCH_DURATION:         MOTION.duration.fast,                          // 日↔月切換進出場時長（200）
  VIEW_SWITCH_EASING:           MOTION.easing.emphasized,                      // 日↔月切換緩動（強調曲線）
  VIEW_SWITCH_ENTER_SCALE:      0.92,                                          // (literal: 進場視圖起始縮放，放大回 1)
  VIEW_SWITCH_EXIT_SCALE:       1.06,                                          // (literal: 離場視圖終點縮放，自 1 放大並淡出)
  HEADER_PULSE_DURATION:        MOTION.duration.instant,                       // 標題逐頁換值脈衝時長（100）
  HEADER_PULSE_EASING:          MOTION.easing.decelerate,                      // 標題脈衝緩動（減速落定）
  HEADER_PULSE_TRANSLATE:       8,                                             // (literal: 逐頁換值標題垂直位移 px，方向順捲動)

  // ── Day Grid 日格（7 欄 × 6 列；僅鋪當月日期、相鄰月位置留白不顯示——iOS 月曆慣例；
  //    列數不足的月份尾列留白，6 列框架恆定；選中圓固定尺寸置中於 cell，不隨 row 高變）
  DAY_CELL_TEXT_SIZE:           TYPOGRAPHY.size.base,
  DAY_SELECTED_SIZE:            36,                                            // (literal: 選中圓固定徑，置中於 1fr row)
  DAY_SELECTED_RADIUS:          RADIUS.full,

  // ── Month Grid 月格（4 欄 × 3 列；選中 pill 固定高置中於較高的 row）
  MONTH_CELL_TEXT_SIZE:         TYPOGRAPHY.size.base,
  MONTH_SELECTED_HEIGHT:        36,                                            // (literal: 選中 pill 固定高，置中於高 row)
  MONTH_SELECTED_PADDING_H:     SPACING.lg,
  MONTH_SELECTED_RADIUS:        RADIUS.md,

  // ── Selected 選中態（日格與月格共用，圓/圓角填色）
  // emphasis 靠 color（p500 填色）不靠 weight contrast，weight 維持 medium（設計政策只啟用 light/regular/medium）
  SELECTED_TEXT_WEIGHT:         TYPOGRAPHY.weight.medium,
  // 選中填色取 TOKENS.p500、選中字色於元件內取對比色（主題色，非 token 檔承載）

  // ── Time Wheel 時間滾輪（沿用 StaticWheelPicker 3 行視覺；僅 Datetime 模式）
  WHEEL_TOP_MARGIN:             SPACING.lg,
  WHEEL_ROW_HEIGHT:             32,                                            // (literal: 每行高＝數字間距；WHEEL_VISIBLE_ROWS 行總高 96)
  WHEEL_VISIBLE_ROWS:           3,                                             // (literal: 中央選中 + 上下各一淡化行)
  WHEEL_COLUMN_WIDTH:           72,                                            // (literal: 時/分各一欄固定寬)
  WHEEL_DIM_OPACITY:            0.3,                                           // (literal: 非選中行淡化)
  WHEEL_SEPARATOR_TEXT:         ':',                                           // (literal: 時分分隔符)
  WHEEL_GROUP_GAP:              SPACING.md,
};

Object.assign(window, { CALENDAR_DIALOG_TOKENS });
