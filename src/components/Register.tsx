import React, { useState } from "react";
import { registerUser } from "../auth";

const Register: React.FC = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");
  const [generatedCode, setGeneratedCode] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [messageType, setMessageType] = useState<"success" | "error">(
    "success"
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleRegister = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!username.trim() || !email.trim()) {
      setMessageType("error");
      setMessage("Podaj nazwę użytkownika oraz email");
      return;
    }

    if (password.length < 8) {
      setMessageType("error");
      setMessage("Hasło powinno mieć min. 8 znaków");
      return;
    }

    if (password !== confirmPassword) {
      setMessageType("error");
      setMessage("Hasła nie są zgodne");
      return;
    }

    if (!generatedCode || verificationCode !== generatedCode) {
      setMessageType("error");
      setMessage("Podaj kod, który wysłaliśmy na maila");
      return;
    }

    setIsSubmitting(true);
    const result = await registerUser({
      username: username.trim(),
      email: email.trim(),
      password,
    });
    setIsSubmitting(false);
    if (result.success) {
      setMessageType("success");
      setMessage("Konto stworzone! Teraz możesz się zalogować");
      if (remember) {
        localStorage.setItem("progressly-remembered-login", username.trim());
      }
      setPassword("");
      setConfirmPassword("");
      setVerificationCode("");
      setGeneratedCode(null);
    } else {
      setMessageType("error");
      setMessage(result.message || "Nie udało się utworzyć konta");
    }
  };

  const handleCodeSend = () => {
    if (!email.trim()) {
      setMessageType("error");
      setMessage("Najpierw wpisz email, abyśmy wiedzieli dokąd wysłać kod");
      return;
    }
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedCode(code);
    setMessageType("success");
    setMessage(`Kod ${code} wysłaliśmy na ${email.trim()}`);
  };

  return (
    <div className="auth-card">
      <div className="card-head">
        <p className="eyebrow">Nowe konto Progressly</p>
        <h2>Rejestracja</h2>
        <p className="muted">
          Stwórz profil, aby śledzić projekty, automatyczne foldery i wspólne
          tablice.
        </p>
      </div>
      <form className="input-stack" onSubmit={handleRegister}>
        <label className="field">
          <span>Nazwa użytkownika</span>
          <input
            type="text"
            className="input"
            placeholder="np. lunar.studio"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <label className="field">
          <span>Email</span>
          <input
            type="email"
            className="input"
            placeholder="hello@progress.ly"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <div className="dual-field">
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
          <label className="field">
            <span>Powtórz hasło</span>
            <input
              type="password"
              className="input"
              placeholder="••••••••"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </label>
        </div>
        <label className="field">
          <span>Kod potwierdzający</span>
          <div className="code-field">
            <input
              type="text"
              className="input"
              placeholder="000000"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
            />
            <button
              type="button"
              className="ghost-btn"
              onClick={handleCodeSend}
            >
              Wyślij kod
            </button>
          </div>
        </label>
        <label className="checkbox">
          <input
            type="checkbox"
            checked={remember}
            onChange={(e) => setRemember(e.target.checked)}
          />
          <span>Zapamiętaj mnie po rejestracji</span>
        </label>
        <button type="submit" className="primary-btn" disabled={isSubmitting}>
          Utwórz konto
        </button>
        {message && <p className={`helper ${messageType}`}>{message}</p>}
      </form>
    </div>
  );
};

export default Register;
