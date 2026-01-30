import { Link } from "react-router-dom";

export const HomeShortcuts = () => {
  return (
    <article className="home-card shortcuts-card">
      <header>
        <h3>Szybkie akcje</h3>
      </header>
      <div className="shortcuts-grid">
        <Link to="/settings" className="shortcut-tile">
          <div className="icon-box">⚙️</div>
          <span>Ustawienia</span>
        </Link>
        <Link to="/projects" className="shortcut-tile">
          <div className="icon-box">📂</div>
          <span>Projekty</span>
        </Link>
        <Link to="/auth" className="shortcut-tile">
          <div className="icon-box">👥</div>
          <span>Zespół</span>
        </Link>
        <div className="shortcut-tile disabled">
          <div className="icon-box">📊</div>
          <span>Raporty</span>
        </div>
      </div>
    </article>
  );
};
