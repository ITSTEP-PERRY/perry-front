import { type FormEvent, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../app/AuthContext";
import { AuthField, AuthModal } from "../../widgets/auth/AuthModal";
import { PasswordField } from "../../widgets/auth/PasswordField";

export function AdminLoginPage() {
  const { login, isAdmin, loading } = useAuth();
  const navigate = useNavigate();
  const [loginName, setLoginName] = useState("Admin");
  const [password, setPassword] = useState("Admin");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!loading && isAdmin) navigate("/admin/products", { replace: true });
  }, [loading, isAdmin, navigate]);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      await login(loginName, password);
      navigate("/admin/products");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
    }
  };

  return (
    <div className="auth-shell">
      <Link className="auth-back" to="/">
        ← Back to store
      </Link>
      <AuthModal>
        {error && <div className="auth-alert">{error}</div>}
        <form className="login-form" onSubmit={(e) => void onSubmit(e)}>
          <div className="login-form__titles">
            <h1>Welcome back</h1>
            <h2>Login into admin account</h2>
          </div>

          <div className="login-form__fields">
            <AuthField label="Login">
              <input
                className="perry-field__input"
                type="text"
                value={loginName}
                onChange={(e) => setLoginName(e.target.value)}
                placeholder="Enter your login"
                autoComplete="username"
                required
              />
            </AuthField>

            <PasswordField label="Password" value={password} onChange={setPassword} required />
          </div>

          <button type="submit" className="perry-btn">
            Log in
          </button>
        </form>
      </AuthModal>
    </div>
  );
}
