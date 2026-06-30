// ─────────────────────────────────────────────────────────────
// LaunchScreen sub-sections · splash 基礎態 + 兩條路轉場 demo
//
// 對齊 impl：
//   基礎態 $wish     → src/components/WishBranding（login 與 splash 共用）
//   路徑 A login 入場 → src/screens/Auth/LoginScreen staggered fade-in
//   路徑 B home 淡入  → src/screens/Home/HomeScreen container opacity
//
// ScreenFrame 提供手機框 / status bar / home indicator，這裡只畫內容。
// 進場自動播一次，右上「重播」可重看。
// ─────────────────────────────────────────────────────────────

// ─── $wish（共用，對齊 login appName）───
function LaunchWishName({ style = {} }) {
  const T = LAUNCH_SCREEN_TOKENS;
  return (
    <div style={{
      fontSize: T.APP_NAME_FONT_SIZE, fontWeight: T.APP_NAME_WEIGHT, color: TOKENS.p500,
      letterSpacing: -0.5, lineHeight: 1, ...style,
    }}>$wish</div>
  );
}

// ─── 進場 reveal wrapper（淡入 + 由下往上）───
function LaunchReveal({ on, delay = 0, children, style = {} }) {
  const T = LAUNCH_SCREEN_TOKENS;
  return (
    <div style={{
      opacity: on ? 1 : 0,
      transform: on ? 'translateY(0)' : `translateY(${T.REVEAL_TRANSLATE_Y}px)`,
      transition: `opacity ${T.REVEAL_DURATION_MS}ms ${T.REVEAL_EASING} ${delay}ms, transform ${T.REVEAL_DURATION_MS}ms ${T.REVEAL_EASING} ${delay}ms`,
      ...style,
    }}>{children}</div>
  );
}

// ─── reveal hook：mount 停頓後播放、可重播 ───
function useLaunchReveal() {
  const T = LAUNCH_SCREEN_TOKENS;
  const [on, setOn] = React.useState(false);
  const timer = React.useRef(null);
  const play = React.useCallback(() => {
    setOn(false);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setOn(true), T.HOLD_MS);
  }, [T.HOLD_MS]);
  React.useEffect(() => { play(); return () => { if (timer.current) clearTimeout(timer.current); }; }, [play]);
  return [on, play];
}

// ─── design 控制：重播浮層（非 launch 內容）───
function LaunchReplayBtn({ onClick }) {
  return (
    <button onClick={onClick} style={{
      position: 'absolute', top: 12, right: 12, zIndex: 30,
      padding: '6px 12px', borderRadius: 8, fontSize: 11, cursor: 'pointer', fontWeight: 500,
      background: 'rgba(0,0,0,0.05)', color: TOKENS.ink2, border: '1px solid rgba(0,0,0,0.10)',
    }}>▶ 重播</button>
  );
}

// ─── Google 按鈕（對齊 login LoginGoogleButton）───
function LaunchGoogleButton() {
  return (
    <div style={{
      display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
      background: TOKENS.p500, padding: `${SPACING.lg}px ${SPACING.xl}px`, borderRadius: RADIUS.md,
      width: '100%', maxWidth: 320, boxShadow: '0 1px 3px rgba(0,0,0,0.12)',
    }}>
      <div style={{
        width: 24, height: 24, borderRadius: RADIUS.lg, background: TOKENS.surface,
        display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: SPACING.md,
      }}>
        <span style={{ fontSize: 16, fontWeight: 500, color: TOKENS.p500 }}>G</span>
      </div>
      <span style={{ color: TOKENS.surface, fontSize: TYPOGRAPHY.size.lg, fontWeight: 500 }}>使用 Google 登入</span>
    </div>
  );
}

// ─── Home 第一眼 mock（簡化示意，對齊 HomeScreen 首幀）───
function LaunchHomeMock() {
  const hair = 'rgba(60,60,67,0.10)';
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: LAUNCH_SCREEN_TOKENS.BG, paddingTop: 12 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16, padding: '12px 0' }}>
        <span style={{ fontSize: 18, color: TOKENS.ink2 }}>‹</span>
        <span style={{ fontSize: 17, fontWeight: 500, color: TOKENS.ink }}>2026年5月</span>
        <span style={{ fontSize: 18, color: TOKENS.ink2 }}>›</span>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', padding: '12px 0' }}>
        <svg width="176" height="176" viewBox="0 0 180 180">
          <circle cx="90" cy="90" r="70" fill="none" stroke="#E5E1F0" strokeWidth="22" />
          <circle cx="90" cy="90" r="70" fill="none" stroke={TOKENS.p500} strokeWidth="22"
            strokeDasharray="300 140" strokeLinecap="round" transform="rotate(-90 90 90)" />
          <text x="90" y="84" textAnchor="middle" fontSize="12" fill={TOKENS.ink2}>餘額</text>
          <text x="90" y="106" textAnchor="middle" fontSize="20" fontWeight="500" fill={TOKENS.ink}>NT$0</text>
        </svg>
      </div>
      <div style={{ display: 'flex', gap: 12, padding: '4px 16px 0' }}>
        {['支出', '收入'].map((t) => (
          <div key={t} style={{ flex: 1, background: TOKENS.surface, borderRadius: 14, border: `1px solid ${hair}`, padding: '14px 16px' }}>
            <div style={{ fontSize: 13, color: TOKENS.ink2 }}>{t}</div>
            <div style={{ fontSize: 18, fontWeight: 500, color: TOKENS.ink, marginTop: 4 }}>NT$0</div>
          </div>
        ))}
      </div>
      <div style={{ margin: '20px 16px 0', background: TOKENS.surface, borderRadius: 14, border: `1px solid ${hair}`, overflow: 'hidden' }}>
        {[0, 1, 2].map((i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '14px 16px', borderTop: i ? `0.5px solid ${hair}` : 'none' }}>
            <div style={{ width: 36, height: 36, borderRadius: 18, background: '#ECE8F6' }} />
            <div style={{ flex: 1, height: 10, borderRadius: 5, background: '#ECECEF' }} />
            <div style={{ width: 48, height: 10, borderRadius: 5, background: '#ECECEF' }} />
          </div>
        ))}
      </div>
      <div style={{
        position: 'absolute', bottom: 40, left: '50%', transform: 'translateX(-50%)',
        width: 56, height: 56, borderRadius: 28, background: TOKENS.p500,
        display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 12px rgba(67,35,160,0.4)',
      }}>
        <span style={{ color: '#fff', fontSize: 28, fontWeight: 300, lineHeight: 1 }}>+</span>
      </div>
    </div>
  );
}

const launchBranding = (paddingTop) => ({
  flex: 2, display: 'flex', flexDirection: 'column',
  justifyContent: 'center', alignItems: 'center', paddingTop,
});

// ─── 基礎態：只有 $wish（對齊 login branding 位置）───
function LaunchSplashBase() {
  const T = LAUNCH_SCREEN_TOKENS;
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: T.BG }}>
      <div style={launchBranding(T.BRANDING_PADDING_TOP)}>
        <LaunchWishName />
      </div>
      <div style={{ flex: 1 }} />
    </div>
  );
}

// ─── 路徑 A · → Login（$wish 不動，其餘元素 staggered 淡入）───
function LaunchToLoginDemo() {
  const T = LAUNCH_SCREEN_TOKENS;
  const [on, play] = useLaunchReveal();
  return (
    <div style={{ position: 'relative', height: '100%', background: T.BG }}>
      <LaunchReplayBtn onClick={play} />
      <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
        {/* branding flex 2：$wish 靜態 + tagline 淡入 */}
        <div style={launchBranding(T.BRANDING_PADDING_TOP)}>
          <LaunchWishName style={{ marginBottom: T.APP_NAME_BOTTOM_MARGIN }} />
          <LaunchReveal on={on} delay={0}>
            <div style={{ fontSize: T.TAGLINE_FONT_SIZE, color: TOKENS.ink2 }}>輕巧、簡單的個人記帳</div>
          </LaunchReveal>
        </div>
        {/* login button area flex 1 */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', paddingLeft: SPACING['2xl'], paddingRight: SPACING['2xl'] }}>
          <LaunchReveal on={on} delay={T.REVEAL_STAGGER_MS} style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
            <LaunchGoogleButton />
          </LaunchReveal>
          <LaunchReveal on={on} delay={T.REVEAL_STAGGER_MS * 2} style={{ marginTop: SPACING.xl }}>
            <div style={{ fontSize: TYPOGRAPHY.size.sm, color: TOKENS.ink2, textAlign: 'center', paddingLeft: SPACING.lg, paddingRight: SPACING.lg }}>
              登入即代表您同意我們的服務條款與隱私權政策
            </div>
          </LaunchReveal>
        </div>
        {/* footer */}
        <LaunchReveal on={on} delay={T.REVEAL_STAGGER_MS * 3} style={{ paddingBottom: SPACING['2xl'], display: 'flex', justifyContent: 'center' }}>
          <span style={{ fontSize: TYPOGRAPHY.size.xs, color: TOKENS.ink2 }}>© 2026 $wish. All rights reserved.</span>
        </LaunchReveal>
      </div>
    </div>
  );
}

// ─── 路徑 B · → Home（$wish 淡出上移縮小，home 淡入）───
function LaunchToHomeDemo() {
  const T = LAUNCH_SCREEN_TOKENS;
  const [on, play] = useLaunchReveal();
  return (
    <div style={{ position: 'relative', height: '100%', background: T.BG, overflow: 'hidden' }}>
      <LaunchReplayBtn onClick={play} />
      {/* home 淡入（底層）*/}
      <div style={{ position: 'absolute', inset: 0, opacity: on ? 1 : 0, transition: `opacity ${T.HOME_FADE_DURATION_MS}ms ${T.REVEAL_EASING}` }}>
        <LaunchHomeMock />
      </div>
      {/* $wish splash 淡出 + 上移縮小（上層，起點與路徑 A 一致）*/}
      <div style={{
        position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', pointerEvents: 'none',
        opacity: on ? 0 : 1,
        transform: on ? `translateY(${T.EXIT_TRANSLATE_Y}px) scale(${T.EXIT_SCALE})` : 'none',
        transition: `opacity ${T.EXIT_DURATION_MS}ms ${T.REVEAL_EASING}, transform ${T.EXIT_DURATION_MS}ms ${T.REVEAL_EASING}`,
      }}>
        <div style={launchBranding(T.BRANDING_PADDING_TOP)}>
          <LaunchWishName />
        </div>
        <div style={{ flex: 1 }} />
      </div>
    </div>
  );
}

Object.assign(window, { LaunchSplashBase, LaunchToLoginDemo, LaunchToHomeDemo });
