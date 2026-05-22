// ─────────────────────────────────────────────────────────────
// DataManagementScreen sub-sections · row 清單常數
//
// impl 端 import / export rows 用 MaterialCommunityIcons，design canvas 用 Glyph
// 近似 icon（arrow-down / arrow-right / exchange / clock / database / refresh）。
// ─────────────────────────────────────────────────────────────

const DM_IMPORT_ROWS = [
  { id: 'import-tx',       title: '匯入交易',   icon: 'arrow-down' },
  { id: 'import-transfer', title: '匯入轉帳',   icon: 'exchange' },
  { id: 'import-schedule', title: '匯入定期',   icon: 'clock' },
];

const DM_EXPORT_ROWS = [
  { id: 'export-tx',       title: '匯出交易',   icon: 'arrow-right' },
  { id: 'export-transfer', title: '匯出轉帳',   icon: 'exchange' },
  { id: 'export-schedule', title: '匯出定期',   icon: 'clock' },
];

Object.assign(window, { DM_IMPORT_ROWS, DM_EXPORT_ROWS });
