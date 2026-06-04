// ─────────────────────────────────────────────────────────────
// ImportScreen sub-sections · 各 step 內容元件 + wizard footer
//
// 鏡射 impl src/screens/Settings/ImportScreen.tsx 的 Step0 ~ Step4：
//   ImportStep0Template / ImportStep1FileSelect / ImportStep2Mapping /
//   ImportStep3Matching / ImportStep4Preview / ImportWizardFooter
//
// Mock 資料 inline，模擬 csv 解析後的內容。
// ─────────────────────────────────────────────────────────────

// ─── ImportWizardFooter ─── 底部 Back / Next bar
function ImportWizardFooter({ hasBack, nextLabel = '下一步', disabled }) {
  const T = IMPORT_SCREEN_TOKENS;
  return (
    <div style={{
      position: 'absolute', left: 0, right: 0, bottom: 0,
      height: T.FOOTER_BAR_HEIGHT,
      display: 'flex', flexDirection: 'row',
      borderTop: `1px solid ${TOKENS.divider.hairline}`,
      background: TOKENS.surface,
    }}>
      {hasBack && (
        <div style={{
          flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center',
          color: TOKENS.ink2,
          fontSize: TYPOGRAPHY.size.base,
          borderRight: `1px solid ${TOKENS.divider.hairline}`,
        }}>上一步</div>
      )}
      <div style={{
        flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center',
        color: disabled ? TOKENS.ink3 : TOKENS.p500,
        fontSize: TYPOGRAPHY.size.base,
        fontWeight: TYPOGRAPHY.weight.medium,
      }}>{nextLabel}</div>
    </div>
  );
}

// ─── ImportStep0Template ─── 時區提示 + 模板下載 + 欄位說明
function ImportStep0Template() {
  const T = IMPORT_SCREEN_TOKENS;
  const fields = [
    { name: 'date',     required: true,  desc: '交易日期（YYYY-MM-DD HH:mm）' },
    { name: 'amount',   required: true,  desc: '金額（正數，自動依分類判斷收支）' },
    { name: 'category', required: true,  desc: '分類名稱（自動建立或比對既有）' },
    { name: 'account',  required: true,  desc: '帳戶名稱' },
    { name: 'currency', required: true,  desc: 'ISO 4217 三字元代碼' },
    { name: 'note',     required: false, desc: '備註（可空）' },
  ];

  return (
    <div>
      <div style={{
        background: TOKENS.surface,
        padding: T.CARD_PADDING, borderRadius: T.CARD_RADIUS,
        marginBottom: T.SECTION_GAP,
      }}>
        <div style={{
          fontSize: T.SECTION_TITLE_FONT_SIZE,
          fontWeight: T.SECTION_TITLE_WEIGHT,
          color: TOKENS.ink, marginBottom: SPACING.sm,
        }}>來源時區</div>
        <div style={{
          fontSize: T.DESCRIPTION_FONT_SIZE,
          color: TOKENS.ink2, marginBottom: SPACING.md,
        }}>選擇匯入資料原本所在的時區，預設帶 app 偏好時區。日期時間依此時區解讀。</div>
        {/* inline wheel picker（列 UTC 偏移量，避開 app 時區別名不在 IANA 清單時 wheel 誤選的問題）；當場選不跳第二畫面 */}
        <div style={{ position: 'relative', height: 180, overflow: 'hidden' }}>
          <div style={{
            position: 'absolute', left: 0, right: 0, top: 72, height: 36,
            borderTop: `1px solid ${TOKENS.divider.hairline}`,
            borderBottom: `1px solid ${TOKENS.divider.hairline}`,
            background: TOKENS.bg, borderRadius: RADIUS.sm,
          }}/>
          {[
            { tz: 'UTC+10:00', opacity: 0.3 },
            { tz: 'UTC+09:00', opacity: 0.55 },
            { tz: 'UTC+08:00', opacity: 1, sel: true },
            { tz: 'UTC+07:00', opacity: 0.55 },
            { tz: 'UTC+06:00', opacity: 0.3 },
          ].map((r, i) => (
            <div key={i} style={{
              position: 'relative', height: 36, lineHeight: '36px', textAlign: 'center',
              fontSize: TYPOGRAPHY.size.base,
              fontWeight: r.sel ? TYPOGRAPHY.weight.medium : TYPOGRAPHY.weight.regular,
              color: TOKENS.ink, opacity: r.opacity,
            }}>{r.tz}</div>
          ))}
        </div>
      </div>

      <div style={{
        background: TOKENS.surface,
        padding: T.CARD_PADDING, borderRadius: T.CARD_RADIUS,
        marginBottom: T.SECTION_GAP,
      }}>
        <div style={{
          fontSize: T.SECTION_TITLE_FONT_SIZE,
          fontWeight: T.SECTION_TITLE_WEIGHT,
          color: TOKENS.ink, marginBottom: SPACING.sm,
        }}>下載匯入範本</div>
        <div style={{
          fontSize: T.DESCRIPTION_FONT_SIZE,
          color: TOKENS.ink2, marginBottom: SPACING.md,
        }}>建議使用範本進行匯入；範本格式與下方欄位說明對應。</div>
        <div style={{
          display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
          background: TOKENS.p500,
          padding: SPACING.md, borderRadius: RADIUS.md, gap: SPACING.sm,
        }}>
          <Glyph name="arrow-down" size={ICON_SIZE.sm} color="#fff" stroke={2.5}/>
          <span style={{ color: '#fff', fontWeight: TYPOGRAPHY.weight.medium }}>下載範本</span>
        </div>
      </div>

      <div style={{
        background: TOKENS.surface,
        padding: T.CARD_PADDING, borderRadius: T.CARD_RADIUS,
      }}>
        <div style={{
          fontSize: T.SECTION_TITLE_FONT_SIZE,
          fontWeight: T.SECTION_TITLE_WEIGHT,
          color: TOKENS.ink, marginBottom: SPACING.md,
        }}>欄位說明</div>
        {fields.map((f, i) => (
          <div key={f.name} style={{
            paddingTop: i === 0 ? 0 : SPACING.md,
            paddingBottom: SPACING.md,
            borderBottom: i === fields.length - 1 ? undefined : `1px solid ${TOKENS.divider.hairline}`,
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: SPACING.xs }}>
              <span style={{
                fontFamily: 'ui-monospace, "SF Mono", monospace',
                fontWeight: TYPOGRAPHY.weight.medium,
                color: TOKENS.ink,
              }}>{f.name}</span>
              {f.required && <span style={{ color: TOKENS.error }}>*</span>}
            </div>
            <div style={{
              fontSize: T.DESCRIPTION_FONT_SIZE,
              color: TOKENS.ink2,
              marginTop: SPACING['2xs'],
            }}>{f.desc}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── ImportStep1FileSelect ─── 大 icon + 說明 + 選擇按鈕
function ImportStep1FileSelect({ withFile }) {
  return (
    <div style={{
      flex: 1, display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      padding: SPACING['2xl'],
    }}>
      <Glyph name="database" size={64} color={TOKENS.ink2} stroke={1.5}/>
      <div style={{
        marginTop: SPACING.lg,
        color: TOKENS.ink2,
        fontSize: TYPOGRAPHY.size.base,
        textAlign: 'center',
      }}>檔案必須為 UTF-8 編碼的 .csv 格式</div>
      {withFile && (
        <div style={{ marginTop: SPACING['2xl'], textAlign: 'center' }}>
          <div style={{ color: TOKENS.ink, fontWeight: TYPOGRAPHY.weight.medium }}>transactions_2026.csv</div>
          <div style={{ color: TOKENS.ink2, fontSize: TYPOGRAPHY.size.sm }}>42.3 KB</div>
        </div>
      )}
      <div style={{
        marginTop: SPACING['2xl'],
        background: TOKENS.p500,
        paddingTop: SPACING.lg, paddingBottom: SPACING.lg,
        paddingLeft: SPACING['2xl'], paddingRight: SPACING['2xl'],
        borderRadius: RADIUS.md,
        color: '#fff', fontWeight: TYPOGRAPHY.weight.medium,
      }}>{withFile ? '重新選擇檔案' : '選擇檔案'}</div>
    </div>
  );
}

// ─── ImportStep2Mapping ─── 欄位對應 chip 選擇
function ImportStep2Mapping() {
  const T = IMPORT_SCREEN_TOKENS;
  const fields = [
    { label: '日期', required: true,  selected: 'date',     options: ['date', 'created_at'] },
    { label: '金額', required: true,  selected: 'amount',   options: ['amount', 'value'] },
    { label: '分類', required: true,  selected: 'category', options: ['category', 'group'] },
    { label: '帳戶', required: true,  selected: 'account',  options: ['account', 'wallet'] },
    { label: '幣別', required: true,  selected: 'currency', options: ['currency', 'ccy'] },
    { label: '備註', required: false, selected: 'note',     options: ['note', 'remark'] },
  ];

  return (
    <div>
      {fields.map(f => (
        <div key={f.label} style={{ marginBottom: T.SECTION_GAP }}>
          <div style={{ color: TOKENS.ink, fontWeight: TYPOGRAPHY.weight.medium, marginBottom: SPACING.sm }}>
            {f.label} {f.required && <span style={{ color: TOKENS.error }}>*</span>}
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: T.CHIP_GAP }}>
            {f.options.map(opt => {
              const selected = opt === f.selected;
              return (
                <div key={opt} style={{
                  paddingTop: T.CHIP_PADDING_V, paddingBottom: T.CHIP_PADDING_V,
                  paddingLeft: T.CHIP_PADDING_H, paddingRight: T.CHIP_PADDING_H,
                  borderWidth: 1, borderStyle: 'solid',
                  borderColor: selected ? TOKENS.p500 : TOKENS.divider.hairline,
                  background: selected ? TOKENS.p500 : 'transparent',
                  color: selected ? '#fff' : TOKENS.ink2,
                  borderRadius: T.CHIP_RADIUS,
                  fontSize: TYPOGRAPHY.size.sm,
                  fontWeight: selected ? TYPOGRAPHY.weight.medium : TYPOGRAPHY.weight.regular,
                }}>{opt}</div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── ImportStep3Matching ─── 內容比對 items 列表
function ImportStep3Matching() {
  const T = IMPORT_SCREEN_TOKENS;
  const accounts = [
    { name: '玉山活儲',     existing: true,  action: 'USE_EXISTING' },
    { name: 'USD 旅費',     existing: false, action: 'CREATE' },
    { name: '聯邦現金',     existing: false, action: 'SKIP' },
  ];
  const categories = [
    { name: '飲食', existing: true,  action: 'USE_EXISTING' },
    { name: '訂閱', existing: false, action: 'CREATE' },
  ];

  const renderSection = (title, items) => (
    <div style={{ marginBottom: T.SECTION_GAP }}>
      <div style={{
        fontSize: T.SECTION_TITLE_FONT_SIZE,
        fontWeight: T.SECTION_TITLE_WEIGHT,
        color: TOKENS.ink, marginBottom: SPACING.lg,
      }}>{title}</div>
      {items.map(item => (
        <div key={item.name} style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          paddingTop: SPACING.md, paddingBottom: SPACING.md,
          borderBottom: `1px solid ${TOKENS.divider.hairline}`,
        }}>
          <div>
            <div style={{ color: TOKENS.ink, fontSize: TYPOGRAPHY.size.base }}>{item.name}</div>
            {item.existing && (
              <div style={{ color: TOKENS.success, fontSize: TYPOGRAPHY.size.xs }}>已存在</div>
            )}
          </div>
          <div style={{ display: 'flex', gap: SPACING.xs }}>
            {item.existing && (
              <ImportActionChip label="沿用" active={item.action === 'USE_EXISTING'}/>
            )}
            <ImportActionChip label="新建" active={item.action === 'CREATE'}/>
            <ImportActionChip label="略過" active={item.action === 'SKIP'}/>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div>
      {renderSection('帳戶比對', accounts)}
      {renderSection('分類比對', categories)}
    </div>
  );
}

function ImportActionChip({ label, active }) {
  return (
    <div style={{
      paddingTop: SPACING['2xs'] + 2, paddingBottom: SPACING['2xs'] + 2,
      paddingLeft: SPACING.sm, paddingRight: SPACING.sm,
      borderWidth: 1, borderStyle: 'solid',
      borderColor: active ? TOKENS.p500 : TOKENS.divider.hairline,
      background: active ? TOKENS.p500 : 'transparent',
      color: active ? '#fff' : TOKENS.ink2,
      borderRadius: RADIUS.sm,
      fontSize: TYPOGRAPHY.size.sm,
    }}>{label}</div>
  );
}

// ─── ImportStep4Preview ─── 統計卡片 + ready 提示
function ImportStep4Preview() {
  return (
    <div style={{
      flex: 1, padding: SPACING.xl,
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
    }}>
      <div style={{
        background: TOKENS.surface,
        padding: SPACING.xl, borderRadius: RADIUS.lg,
        width: '100%', textAlign: 'center', marginBottom: SPACING.lg,
      }}>
        <div style={{ fontSize: TYPOGRAPHY.size.lg, color: TOKENS.ink, marginBottom: SPACING.md }}>共 124 筆紀錄</div>
        <div style={{ fontSize: TYPOGRAPHY.size.lg, color: TOKENS.ink, marginBottom: SPACING.md }}>新增 1 個帳戶</div>
        <div style={{ fontSize: TYPOGRAPHY.size.lg, color: TOKENS.ink, marginBottom: SPACING.md }}>新增 1 個分類</div>
        <div style={{ fontSize: TYPOGRAPHY.size.lg, color: TOKENS.warning, marginBottom: SPACING.md }}>略過 8 筆紀錄</div>
      </div>
      <div style={{
        display: 'flex', flexDirection: 'row', alignItems: 'center',
        background: 'rgba(255,184,0,0.12)',
        padding: SPACING.lg, borderRadius: RADIUS.md,
        marginBottom: SPACING.xl, gap: SPACING.md,
      }}>
        <Glyph name="shield" size={ICON_SIZE.md} color={TOKENS.warning} stroke={2}/>
        <div style={{ color: TOKENS.warning, fontSize: TYPOGRAPHY.size.sm, flex: 1 }}>
          被略過的紀錄會直接跳過。確認後按「開始匯入」執行。
        </div>
      </div>
      <div style={{
        fontSize: TYPOGRAPHY.size.xl,
        fontWeight: TYPOGRAPHY.weight.medium,
        color: TOKENS.p500,
      }}>準備好匯入</div>
    </div>
  );
}

Object.assign(window, {
  ImportWizardFooter, ImportActionChip,
  ImportStep0Template, ImportStep1FileSelect, ImportStep2Mapping,
  ImportStep3Matching, ImportStep4Preview,
});
