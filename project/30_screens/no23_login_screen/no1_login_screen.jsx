// ─────────────────────────────────────────────────────────────
// LoginScreen · 對齊 impl src/screens/Auth/LoginScreen.tsx
//
// Full-screen entry。三段：Branding（App 名稱+ tagline）/ Login Button（含 disclaimer）/ Footer。
// impl 端透過 Firebase Auth SSO，design canvas 為靜態示意。
//
// Variants：default only。
// ─────────────────────────────────────────────────────────────

function LoginScreen() {
  return (
    <div style={{
      display: 'flex', flexDirection: 'column',
      height: '100%',
      background: TOKENS.bg,
    }}>
      <LoginBranding/>
      <LoginGoogleButton loading={false}/>
      <LoginFooter/>
    </div>
  );
}

Object.assign(window, { LoginScreen });
