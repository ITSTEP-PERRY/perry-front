import { type FormEvent, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../app/AuthContext";
import { AuthField, AuthModal } from "../../widgets/auth/AuthModal";
import { PasswordField } from "../../widgets/auth/PasswordField";

export function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as { from?: { pathname?: string } })?.from?.pathname || "/";
  const [loginName, setLoginName] = useState("");
  const [password, setPassword] = useState("");
  const [stay, setStay] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const failCount = useRef(0);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setError(null);
    try {
      await login(loginName, password);
      failCount.current = 0;
      navigate(from, { replace: true });
    } catch (err) {
      failCount.current += 1;
      if (failCount.current >= 3) {
        navigate(`/verify-code?email=${encodeURIComponent(loginName.trim())}`);
        return;
      }
      setError(err instanceof Error ? err.message : "Login failed");
    } finally {
      setBusy(false);
    }
  };

  return (
    <AuthModal>
      {error && <div className="auth-alert">{error}</div>}
      <form className="login-form" onSubmit={(e) => void onSubmit(e)}>
        <div className="login-form__titles">
          <h1>Welcome back</h1>
          <h2>Login into your account</h2>
        </div>

        <div className="login-form__fields">
          <AuthField label="Email">
            <input
              className="perry-field__input"
              type="text"
              value={loginName}
              onChange={(e) => setLoginName(e.target.value)}
              placeholder="Enter your email"
              autoComplete="username"
              required
            />
          </AuthField>

          <PasswordField label="Password" value={password} onChange={setPassword} required />

          <div className="login-form__row">
            <label className="login-form__remember">
              <input type="checkbox" checked={stay} onChange={(e) => setStay(e.target.checked)} />
              Stay signed in
            </label>
            <Link className="login-form__forgot" to="/forgot-password">
              Forgot password?
            </Link>
          </div>
        </div>

        <button type="submit" className="perry-btn" disabled={busy}>
          {busy ? "…" : "Log in"}
        </button>
      </form>

      <p className="auth-modal__signup">
        Don&apos;t have an account? <Link to="/register">Sign Up</Link>
      </p>
    </AuthModal>
  );
}
