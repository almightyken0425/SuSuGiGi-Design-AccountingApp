// ─────────────────────────────────────────────────────────────
// LoginScreen sub-sections · 私有 sub-section 元件
//
// 鏡射 impl src/screens/Auth/LoginScreen.tsx：
//   LoginBranding / LoginGoogleButton / LoginFooter
// ─────────────────────────────────────────────────────────────

// ─── LoginBranding ─── App 名稱 + tagline（flex 2 區域置中）
function LoginBranding() {
  const T = LOGIN_SCREEN_TOKENS;
  return (
    <div style={{
      flex: 2,
      display: 'flex', flexDirection: 'column',
      justifyContent: 'center', alignItems: 'center',
      paddingTop: T.BRANDING_PADDING_TOP,
    }}>
      <div style={{
        fontSize: T.APP_NAME_FONT_SIZE,
        fontWeight: T.APP_NAME_WEIGHT,
        color: TOKENS.p500,
        marginBottom: T.APP_NAME_BOTTOM_MARGIN,
      }}>SuSuGiGi</div>
      <div style={{
        fontSize: T.TAGLINE_FONT_SIZE,
        color: TOKENS.ink2,
        textAlign: 'center',
      }}>輕巧、簡單的個人記帳</div>
    </div>
  );
}

// ─── LoginGoogleButton ─── primary 色登入按鈕（含 'G' icon + disclaimer）
function LoginGoogleButton({ loading }) {
  const T = LOGIN_SCREEN_TOKENS;
  return (
    <div style={{
      flex: 1,
      display: 'flex', flexDirection: 'column',
      justifyContent: 'center', alignItems: 'center',
      paddingLeft: T.LOGIN_CONTAINER_PADDING_H,
      paddingRight: T.LOGIN_CONTAINER_PADDING_H,
    }}>
      <div style={{
        display: 'flex', flexDirection: 'row',
        alignItems: 'center', justifyContent: 'center',
        background: TOKENS.p500,
        paddingTop: T.BUTTON_PADDING_V, paddingBottom: T.BUTTON_PADDING_V,
        paddingLeft: T.BUTTON_PADDING_H, paddingRight: T.BUTTON_PADDING_H,
        borderRadius: T.BUTTON_RADIUS,
        width: '100%', maxWidth: T.BUTTON_MAX_WIDTH,
        boxShadow: `0px ${SHADOW_ELEVATION.level1.offsetY}px ${SHADOW_ELEVATION.level1.blur}px rgba(0,0,0,${SHADOW_ELEVATION.level1.opacity})`,
        opacity: loading ? 0.6 : 1,
      }}>
        {loading ? (
          // loading 態（對齊 impl）：按鈕內以 spinner 取代 G icon + 文字，按鈕降透明度 disabled
          <Spinner size={ICON_SIZE.md} color={TOKENS.surface}/>
        ) : (
          <>
            <div style={{
              width: T.BUTTON_ICON_SIZE, height: T.BUTTON_ICON_SIZE,
              borderRadius: T.BUTTON_ICON_RADIUS,
              background: TOKENS.surface,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              marginRight: SPACING.md,
            }}>
              <span style={{
                fontSize: T.BUTTON_ICON_TEXT_SIZE,
                fontWeight: TYPOGRAPHY.weight.medium,
                color: TOKENS.p500,
              }}>G</span>
            </div>
            <span style={{
              color: TOKENS.surface,
              fontSize: T.BUTTON_FONT_SIZE,
              fontWeight: TYPOGRAPHY.weight.medium,
            }}>使用 Google 登入</span>
          </>
        )}
      </div>
      <div style={{
        marginTop: T.DISCLAIMER_TOP_MARGIN,
        fontSize: T.DISCLAIMER_FONT_SIZE,
        color: TOKENS.ink2,
        textAlign: 'center',
        paddingLeft: SPACING.lg, paddingRight: SPACING.lg,
      }}>登入即代表您同意我們的服務條款與隱私權政策</div>
    </div>
  );
}

// ─── LoginFooter ─── 版權字
function LoginFooter() {
  const T = LOGIN_SCREEN_TOKENS;
  return (
    <div style={{
      paddingBottom: T.FOOTER_PADDING_BOTTOM,
      display: 'flex', justifyContent: 'center',
    }}>
      <span style={{
        fontSize: T.FOOTER_FONT_SIZE,
        color: TOKENS.ink2,
      }}>© 2026 SuSuGiGi. All rights reserved.</span>
    </div>
  );
}

Object.assign(window, { LoginBranding, LoginGoogleButton, LoginFooter });
