import { type FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { authApi } from "../../api";
import { AuthField, AuthModal } from "../../widgets/auth/AuthModal";

export function ForgotPasswordPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setMsg(null);
    try {
      await authApi.forgot(email);
      setMsg("If the email exists, reset instructions were sent.");
      window.setTimeout(() => {
        navigate("/reset-password?token=demo");
      }, 800);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed");
    }
  };

  return (
    <AuthModal>
      {error && <div className="auth-alert">{error}</div>}
      {msg && <p className="dev-code-hint">{msg}</p>}
      <form className="login-form" onSubmit={(e) => void onSubmit(e)}>
        <div className="login-form__titles">
          <h1>Forgot password</h1>
          <h2>Enter your email to reset your password</h2>
        </div>

        <div className="login-form__fields">
          <AuthField label="Email">
            <input
              className="perry-field__input"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              autoComplete="email"
              required
            />
          </AuthField>
        </div>

        <button type="submit" className="perry-btn">
          Continue
        </button>
      </form>
    </AuthModal>
  );
}
