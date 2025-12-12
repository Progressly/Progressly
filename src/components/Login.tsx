import React, { useState, useEffect } from "react";
import { loginUser } from "../auth";

interface ForgotPasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ForgotPasswordModal: React.FC<ForgotPasswordModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [email, setEmail] = useState("");
  const [feedback, setFeedback] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleReset = () => {
    if (!email.trim()) {
      setFeedback("Podaj proszę email");
      return;
    }

    setFeedback(
      `Jeśli ${email.trim()} istnieje w Progressly, wysłaliśmy kod resetujący. Sprawdź spam!`
    );
  };

  return (
    <div className="modal-overlay" role="dialog" aria-modal>
      <div className="modal-card">
        <h3>Reset hasła</h3>
        <p className="muted">Podaj email, aby otrzymać jednorazowy kod.</p>
        <input
          type="email"
          placeholder="nazwa@domena.com"
          className="input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {feedback && <p className="helper">{feedback}</p>}
        <div className="modal-actions">
          <button type="button" className="primary-btn" onClick={handleReset}>
            Wyślij kod
          </button>
          <button type="button" className="ghost-btn" onClick={onClose}>
            Zamknij
          </button>
        </div>
      </div>
    </div>
  );
};

const Login: React.FC = () => {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [messageType, setMessageType] = useState<"success" | "error">(
    "success"
  );
  const [isModalOpen, setModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("progressly-remembered-login");
    if (saved) {
      setIdentifier(saved);
      setRemember(true);
    }
  }, []);

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!identifier.trim() || !password.trim()) {
      setMessageType("error");
      setMessage("Uzupełnij login oraz hasło");
      return;
    }

    setIsSubmitting(true);
    const result = await loginUser(identifier.trim(), password.trim());
    setIsSubmitting(false);

    if (result.success) {
      if (remember) {
        localStorage.setItem("progressly-remembered-login", identifier.trim());
      } else {
        localStorage.removeItem("progressly-remembered-login");
      }
      setMessageType("success");
      setMessage("Miło Cię znowu widzieć!");
      setPassword("");
    } else {
      setMessageType("error");
      setMessage(result.message || "Coś poszło nie tak");
    }
  };

  return (
    <div className="auth-card">
      <div className="card-head">
        <h2>Zaloguj do Progressly</h2>
      </div>
      <form className="input-stack" onSubmit={handleLogin}>
        <label className="field">
          <span>Nazwa użytkownika lub email</span>
          <input
            type="text"
            className="input"
            placeholder="np. username / email@progressly.com"
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
          />
        </label>
        <label className="field">
          <span>Hasło</span>
          <input
            type="password"
            className="input"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <div className="form-row">
          <label className="checkbox">
            <input
              type="checkbox"
              checked={remember}
              onChange={(e) => setRemember(e.target.checked)}
            />
            <span>Zapamiętaj mnie</span>
          </label>
          <button
            type="button"
            className="link-btn"
            onClick={() => setModalOpen(true)}
          >
            Zapomniałeś hasła?
          </button>
        </div>
        <button type="submit" className="primary-btn" disabled={isSubmitting}>
          Zaloguj się
        </button>
        {message && <p className={`helper ${messageType}`}>{message}</p>}
      </form>

      <ForgotPasswordModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
      />
    </div>
  );
};

export default Login;
