// ─────────────────────────────────────────────────────────────
// LoginScreen · 對齊 impl src/screens/Auth/LoginScreen.tsx
//
// Full-screen entry。三段：Branding（App 名稱+ tagline）/ Login Button（圓形 G 鈕）/ Footer（引導句 + 連結 + 版權）。
// impl 端透過 Firebase Auth SSO，design canvas 為靜態示意。
//
// Variants：
//   default — 登入入口（圓形 primary 鈕，僅白圓 G icon、無文字）
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
