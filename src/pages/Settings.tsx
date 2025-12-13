import { useState } from "react";
import type { User } from "../auth";
import { deleteCurrentUser, logoutUser, updateCurrentUser } from "../auth";

type SettingsPageProps = {
  theme: "light" | "dark";
  onThemeChange: (next: "light" | "dark") => void;
  language: "pl" | "en";
  onLanguageChange: (next: "pl" | "en") => void;
  user: User | null;
};

const SettingsPage = ({
  theme,
  onThemeChange,
  language,
  onLanguageChange,
  user,
}: SettingsPageProps) => {
  const [username, setUsername] = useState(user?.username || "");
  const [newPassword, setNewPassword] = useState("");
  const [notificationPrefs, setNotificationPrefs] = useState({
    email: true,
    deadlines: true,
    inApp: false,
  });
  const [twoFA, setTwoFA] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [feedbackType, setFeedbackType] = useState<"success" | "error">(
    "success"
  );

  const requireUser = () => {
    if (!user) {
      setFeedback("Zaloguj się, aby zarządzać kontem");
      setFeedbackType("error");
      return false;
    }
    return true;
  };

  const handleUsernameChange = (event: React.FormEvent) => {
    event.preventDefault();
    if (!requireUser()) return;
    if (!username.trim()) {
      setFeedback("Nazwa użytkownika nie może być pusta");
      setFeedbackType("error");
      return;
    }

    const result = updateCurrentUser({ username: username.trim() });
    setFeedbackType(result.success ? "success" : "error");
    setFeedback(
      result.success
        ? "Zmieniono nazwę użytkownika"
        : result.message || "Błąd zmiany nazwy"
    );
  };

  const handlePasswordChange = (event: React.FormEvent) => {
    event.preventDefault();
    if (!requireUser()) return;
    if (newPassword.length < 8) {
      setFeedback("Hasło powinno mieć minimum 8 znaków");
      setFeedbackType("error");
      return;
    }

    const result = updateCurrentUser({ password: newPassword });
    if (result.success) {
      setFeedbackType("success");
      setFeedback("Hasło zostało zaktualizowane");
      setNewPassword("");
    } else {
      setFeedbackType("error");
      setFeedback(result.message || "Nie udało się zmienić hasła");
    }
  };

  const handleDeleteAccount = () => {
    if (!requireUser()) return;
    if (confirm("Na pewno chcesz usunąć konto?")) {
      deleteCurrentUser();
      setFeedbackType("success");
      setFeedback("Konto usunięte");
    }
  };

  const handleLogout = () => {
    logoutUser();
    setFeedbackType("success");
    setFeedback("Wylogowano z Progressly");
  };

  return (
    <section className="page settings-page">
      <header>
        <p className="eyebrow">Ustawienia</p>
        <h1>Zarządzaj kontem, stylem i bezpieczeństwem</h1>
        <p className="muted">
          Konto, języki, powiadomienia i 2FA — wszystko w jednym miejscu.
        </p>
      </header>

      {feedback && <p className={`helper ${feedbackType}`}>{feedback}</p>}

      <div className="settings-grid">
        <article className="settings-section">
          <h3>Zarządzaj kontem</h3>
          <form onSubmit={handleUsernameChange} className="input-stack">
            <label className="field">
              <span>Nowa nazwa użytkownika</span>
              <input
                className="input"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
                placeholder="np. username123"
              />
            </label>
            <button className="primary-btn" type="submit">
              Zmień nazwę
            </button>
          </form>

          <form onSubmit={handlePasswordChange} className="input-stack">
            <label className="field">
              <span>Nowe hasło</span>
              <input
                className="input"
                type="password"
                value={newPassword}
                onChange={(event) => setNewPassword(event.target.value)}
                placeholder="••••••••"
              />
            </label>
            <button className="primary-btn outline" type="submit">
              Zaktualizuj hasło
            </button>
          </form>

          <div className="danger-zone">
            <button type="button" className="ghost-btn" onClick={handleLogout}>
              Wyloguj
            </button>
            <button
              type="button"
              className="danger-btn"
              onClick={handleDeleteAccount}
            >
              Usuń konto
            </button>
          </div>
        </article>

        <article className="settings-section">
          <h3>Styl i język</h3>
          <div className="toggle-row">
            <span>Motyw</span>
            <div className="chip-toggle">
              <button
                type="button"
                className={theme === "light" ? "chip active" : "chip"}
                onClick={() => onThemeChange("light")}
              >
                Jasny
              </button>
              <button
                type="button"
                className={theme === "dark" ? "chip active" : "chip"}
                onClick={() => onThemeChange("dark")}
              >
                Ciemny
              </button>
            </div>
          </div>
          <label className="field">
            <span>Język interfejsu</span>
            <select
              className="input"
              value={language}
              onChange={(event) =>
                onLanguageChange(event.target.value as "pl" | "en")
              }
            >
              <option value="pl">Polski</option>
              <option value="en">English</option>
            </select>
          </label>
        </article>

        <article className="settings-section">
          <h3>Powiadomienia</h3>
          <label className="checkbox">
            <input
              type="checkbox"
              checked={notificationPrefs.email}
              onChange={(event) =>
                setNotificationPrefs((prev) => ({
                  ...prev,
                  email: event.target.checked,
                }))
              }
            />
            <span>Email — tygodniowe podsumowanie</span>
          </label>
          <label className="checkbox">
            <input
              type="checkbox"
              checked={notificationPrefs.deadlines}
              onChange={(event) =>
                setNotificationPrefs((prev) => ({
                  ...prev,
                  deadlines: event.target.checked,
                }))
              }
            />
            <span>Powiadomienia o deadline'ach</span>
          </label>
          <label className="checkbox">
            <input
              type="checkbox"
              checked={notificationPrefs.inApp}
              onChange={(event) =>
                setNotificationPrefs((prev) => ({
                  ...prev,
                  inApp: event.target.checked,
                }))
              }
            />
            <span>Alerty na stronie głównej</span>
          </label>
        </article>

        <article className="settings-section">
          <h3>Security & 2FA</h3>
          <p className="muted">
            Włącz weryfikację dwuetapową, aby blokować nieautoryzowane próby
            logowania do Progressly.
          </p>
          <label className="checkbox">
            <input
              type="checkbox"
              checked={twoFA}
              onChange={(event) => setTwoFA(event.target.checked)}
            />
            <span>Aktywuj 2FA (kod email + hasło)</span>
          </label>
          <button
            className="primary-btn"
            type="button"
            onClick={() => setTwoFA(true)}
          >
            Generuj nowy kod 2FA
          </button>
        </article>
      </div>
    </section>
  );
};

export default SettingsPage;
