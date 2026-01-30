import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <section className="page not-found">
      <div className="glow-card huge">
        <p className="eyebrow">404</p>
        <h1>Zagubiony adres</h1>
        <p className="muted">
          Ta ścieżka nie istnieje lub projekt został przeniesiony. Wróć na
          główną tablicę i wybierz kolejny kierunek pracy.
        </p>
        <div className="cta-group">
          <Link to="/" className="primary-btn">
            Wracaj na landing
          </Link>
          <Link to="/projects" className="ghost-btn">
            Otwórz panel projektów
          </Link>
        </div>
      </div>
    </section>
  );
};

export default NotFoundPage;
