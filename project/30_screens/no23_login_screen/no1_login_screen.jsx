// ─────────────────────────────────────────────────────────────
// LoginScreen · 對齊 impl src/screens/Auth/LoginScreen.tsx
//
// Full-screen entry。三段：Branding（App 名稱+ tagline）/ Login Button（含 disclaimer）/ Footer。
// impl 端透過 Firebase Auth SSO，design canvas 為靜態示意。
//
// Variants：
//   default — 登入入口（按鈕顯示 G icon + 文字）
//   loading — SSO 進行中（按鈕內 spinner、降透明度 disabled，對齊 impl loading state）
// ─────────────────────────────────────────────────────────────

function LoginScreen({ variant = 'default' }) {
  return (
    <div style={{
      display: 'flex', flexDirection: 'column',
      height: '100%',
      background: TOKENS.bg,
    }}>
      <LoginBranding/>
      <LoginGoogleButton loading={variant === 'loading'}/>
      <LoginFooter/>
    </div>
  );
}

Object.assign(window, { LoginScreen });
