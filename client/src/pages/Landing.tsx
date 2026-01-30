import { Link } from "react-router-dom";

type LandingPageProps = {
  language: "pl" | "en";
};

const metrics = [
  { label: "Użytkownicy", value: "140+", icon: "👥" },
  { label: "Projekty", value: "4.2k", icon: "📊" },
  { label: "Uptime", value: "99.9%", icon: "⚡" },
];

const copy = {
  pl: {
    heading: "Zarządzaj chaosem w Twoim projekcie.",
    subheading:
      "Progressly to Twoje centrum dowodzenia. Planuj sprinty, śledź deadline'y i współpracuj z zespołem w jednym, intuicyjnym miejscu. Bez zbędnych arkuszy.",
    ctaPrimary: "Zacznij za darmo",
    ctaSecondary: "Zobacz demo",
  },
  en: {
    heading: "Tame the chaos in your projects.",
    subheading:
      "Progressly is your command center. Plan sprints, track deadlines, and collaborate with your team in one intuitive place. No more spreadsheets.",
    ctaPrimary: "Start for free",
    ctaSecondary: "Watch demo",
  },
};

const LandingPage = ({ language }: LandingPageProps) => {
  const text = copy[language];

  return (
    <section className="landing page-container">
      {/* Hero Section */}
      <div className="landing-hero-modern">
        <div className="blobs-container">
          <div className="blob blob-1"></div>
          <div className="blob blob-2"></div>
        </div>

        <div className="hero-badge">✨ Wersja 2.0 już dostępna</div>
        <h1 className="hero-title-large">
          Zarządzaj <span className="gradient-text">Chaosem</span> <br />w Twoim
          Projekcie.
        </h1>
        <p className="hero-subtitle">{text.subheading}</p>

        <div className="hero-actions">
          <Link to="/auth" className="primary-btn lg">
            {text.ctaPrimary}
          </Link>
          <Link to="/projects" className="ghost-btn lg">
            {text.ctaSecondary}
          </Link>
        </div>

        <div className="hero-stats-row">
          {metrics.map((m) => (
            <div key={m.label} className="stat-pill-modern">
              <span className="stat-icon">{m.icon}</span>
              <div className="stat-info">
                <strong>{m.value}</strong>
                <span>{m.label}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Feature Section as Cards */}
      <div className="features-section">
        <div className="section-header">
          <h2>Wszystko czego potrzebujesz</h2>
          <p>Zbudowaliśmy narzędzia, które faktycznie przyspieszają pracę.</p>
        </div>

        <div className="bento-grid">
          <div className="bento-card large ui-preview">
            <div className="card-content">
              <h3>Interfejs, który nie przeszkadza</h3>
              <p>Czysty design, tryb ciemny i intuicyjna nawigacja.</p>
            </div>
            <div className="mock-ui">
              <div className="mock-nav"></div>
              <div className="mock-body">
                <div className="mock-row"></div>
                <div className="mock-row"></div>
                <div className="mock-card"></div>
              </div>
            </div>
          </div>

          <div className="bento-card">
            <div className="icon-wrapper">📂</div>
            <h3>Inteligentne foldery</h3>
            <p>
              Grupuj projekty tematycznie i przeciągaj je między kategoriemi.
            </p>
          </div>

          <div className="bento-card">
            <div className="icon-wrapper">⚡</div>
            <h3>Szybkie akcje</h3>
            <p>Skróty klawiszowe i szybkie menu dla power-userów.</p>
          </div>

          <div className="bento-card">
            <div className="icon-wrapper">🔒</div>
            <h3>Prywatność</h3>
            <p>
              Ty decydujesz, kto widzi Twój projekt. Pełna kontrola uprawnień.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LandingPage;
