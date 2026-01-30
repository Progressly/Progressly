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
    <section className="page settings-page layout-width">
      <header className="settings-header">
        <h1>Ustawienia</h1>
        <p className="hero-subtitle">Zarządzaj kontem i preferencjami aplikacji</p>
      </header>

      <div className="settings-grid-modern">
        {/* Profile Card */}
        <div className="settings-card">
          <div className="card-header">
            <div className="icon-wrapper">👤</div>
            <h3>Profil</h3>
          </div>
          <form className="settings-form" onSubmit={handleUsernameChange}>
            <div className="field">
              <label>Nazwa wyświetlana</label>
              <input
                className="input"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <button className="primary-btn small">Zapisz zmiany</button>
          </form>
        </div>

        {/* Security Card */}
        <div className="settings-card">
           <div className="card-header">
            <div className="icon-wrapper">🔒</div>
            <h3>Bezpieczeństwo</h3>
          </div>
          <form className="settings-form" onSubmit={handlePasswordChange}>
            <div className="field">
              <label>Nowe hasło</label>
              <input
                className="input"
                type="password"
                placeholder="Minimum 8 znaków"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>
            <button className="primary-btn small">Zaktualizuj hasło</button>
          </form>
        </div>
        
        {/* Appearance Card */}
        <div className="settings-card">
          <div className="card-header">
            <div className="icon-wrapper">🎨</div>
            <h3>Wygląd</h3>
          </div>
          <div className="settings-row">
             <span>Motyw</span>
             <div className="toggle-group">
                <button 
                  className={`toggle-btn ${theme === 'light' ? 'active' : ''}`}
                  onClick={() => onThemeChange("light")}
                >
                  Jasny
                </button>
                <button 
                   className={`toggle-btn ${theme === 'dark' ? 'active' : ''}`}
                   onClick={() => onThemeChange("dark")}
                >
                  Ciemny
                </button>
             </div>
          </div>
          <div className="settings-row">
             <span>Język</span>
             <div className="toggle-group">
                <button 
                  className={`toggle-btn ${language === 'pl' ? 'active' : ''}`}
                  onClick={() => onLanguageChange("pl")}
                >
                  PL
                </button>
                <button 
                   className={`toggle-btn ${language === 'en' ? 'active' : ''}`}
                   onClick={() => onLanguageChange("en")}
                >
                  EN
                </button>
             </div>
          </div>
        </div>

        {/* Notifications Card - Full Width */}
        <div className="settings-card full-width">
           <div className="card-header">
            <div className="icon-wrapper">🔔</div>
            <h3>Powiadomienia</h3>
          </div>
          <div className="toggles-list">
             <label className="toggle-row">
                <span>Powiadomienia Email (Tygodniowe podsumowanie)</span>
                <input 
                  type="checkbox" 
                  checked={notificationPrefs.email}
                  onChange={(e) => setNotificationPrefs(p => ({...p, email: e.target.checked}))} 
                />
             </label>
             <label className="toggle-row">
                <span>Przypomnienia o deadline'ach</span>
                <input 
                  type="checkbox" 
                  checked={notificationPrefs.deadlines}
                  onChange={(e) => setNotificationPrefs(p => ({...p, deadlines: e.target.checked}))} 
                />
             </label>
              <label className="toggle-row">
                <span>Alerty na stronie głównej</span>
                <input 
                  type="checkbox" 
                  checked={notificationPrefs.inApp}
                  onChange={(e) => setNotificationPrefs(p => ({...p, inApp: e.target.checked}))} 
                />
             </label>
          </div>
        </div>

        {/* Danger Zone - Full Width */}
        <div className="settings-card full-width danger">
          <div className="card-header">
            <div className="icon-wrapper danger">⚠️</div>
            <h3>Strefa niebezpieczna</h3>
          </div>
          <div className="danger-actions">
            <button className="ghost-btn" onClick={handleLogout}>
              Wyloguj się
            </button>
            <button className="danger-btn" onClick={handleDeleteAccount}>
              Usuń konto trwale
            </button>
          </div>
        </div>
      </div>

       {feedback && (
        <div className={`toast-notification ${feedbackType}`}>
          {feedback}
          <button onClick={() => setFeedback(null)}>✕</button>
        </div>
      )}
    </section>
  );
};

export default SettingsPage;
