import { useEffect, useState } from "react";
import { BrowserRouter, NavLink, Route, Routes } from "react-router-dom";
import LandingPage from "./pages/Landing";
import HomePage from "./pages/Home";
import ProjectsPage from "./pages/Projects";
import SettingsPage from "./pages/Settings";
import AuthPage from "./pages/AuthPage";
import NotFoundPage from "./pages/404";
import "./App.css";
import { getLoggedUser, logoutUser } from "./auth";
import type { User } from "./auth";

const navItems = [
  { path: "/", label: "Landing" },
  { path: "/home", label: "Home" },
  { path: "/projects", label: "Projects" },
  { path: "/settings", label: "Settings" },
];

const App = () => {
  const [theme, setTheme] = useState<"light" | "dark">(
    (localStorage.getItem("progressly-theme") as "light" | "dark") || "dark"
  );
  const [language, setLanguage] = useState<"pl" | "en">(
    (localStorage.getItem("progressly-language") as "pl" | "en") || "pl"
  );
  const [user, setUser] = useState<User | null>(() => getLoggedUser());

  useEffect(() => {
    document.body.dataset.theme = theme;
    localStorage.setItem("progressly-theme", theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem("progressly-language", language);
  }, [language]);

  useEffect(() => {
    const syncUser = () => {
      setUser(getLoggedUser());
    };
    window.addEventListener("progressly-auth-change", syncUser);
    syncUser();
    return () => window.removeEventListener("progressly-auth-change", syncUser);
  }, []);

  const handleLogout = () => {
    logoutUser();
    setUser(null);
  };

  return (
    <BrowserRouter>
      <div className="app-shell">
        <header className="top-nav">
          <div className="top-nav-inner layout-width">
            <NavLink to="/" className="brand">
              Progressly
            </NavLink>
            <nav className="nav-links">
              {navItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    isActive ? "nav-link active" : "nav-link"
                  }
                >
                  {item.label}
                </NavLink>
              ))}
            </nav>
            <div className="nav-cta">
              <button
                className="ghost-btn"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              >
                {theme === "dark" ? "Tryb jasny" : "Tryb ciemny"}
              </button>
              {user ? (
                <button className="primary-btn outline" onClick={handleLogout}>
                  Wyloguj {user.username}
                </button>
              ) : (
                <NavLink to="/auth" className="primary-btn">
                  Zaloguj się
                </NavLink>
              )}
            </div>
          </div>
        </header>

        <main className="page-shell">
          <div className="page-shell-inner layout-width">
            <Routes>
              <Route path="/" element={<LandingPage language={language} />} />
              <Route
                path="/home"
                element={<HomePage user={user} language={language} />}
              />
              <Route path="/projects" element={<ProjectsPage user={user} />} />
              <Route
                path="/settings"
                element={
                  <SettingsPage
                    theme={theme}
                    onThemeChange={setTheme}
                    language={language}
                    onLanguageChange={setLanguage}
                    user={user}
                  />
                }
              />
              <Route path="/auth" element={<AuthPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </div>
        </main>

        <footer className="app-footer">
          <div className="footer-inner layout-width">
            <p>
              Progressly © {new Date().getFullYear()} - Wszystkie prawa zastrzeżone.
            </p>
          </div>
        </footer>
      </div>
    </BrowserRouter>
  );
};

export default App;
