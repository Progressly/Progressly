import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <section className="page not-found">
      <div className="glow-card huge">
        <h1>404 NOT FOUND</h1>
        <p className="muted">
          Ta ścieżka nie istnieje lub projekt został przeniesiony. Wróć na
          główną tablicę.
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
