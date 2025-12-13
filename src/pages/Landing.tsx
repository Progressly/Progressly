import { Link } from "react-router-dom";

type LandingPageProps = {
  language: "pl" | "en";
};

const metrics = [
  { label: "Zespoły", value: "140+", detail: "aktywnych workspace'ów" },
  { label: "Zamknięte projekty", value: "4.2k", detail: "w 2025 roku" },
  { label: "Punktualność", value: "92%", detail: "deadline'y dotrzymane" },
];

const featureCopy = [
  {
    title: "Project dash",
    text: "Detale, statusy i tempo zamykania w jednym, interaktywnym płótnie.",
  },
  {
    title: "Foldery tematyczne",
    text: "Robotyka? Geografia? Zbuduj własne foldery i przeciągaj projekty.",
  },
  {
    title: "Udostępnianie",
    text: "Dziel się tablicą z zespołem albo zapraszaj gości tylko do podglądu.",
  },
  {
    title: "Tryby językowe",
    text: "Polski lub angielski interfejs, dopasuj UI do sposobu pracy.",
  },
];

const copy = {
  pl: {
    heading: "Progressly",
    subheading:
      "Zarządzaj zadaniami i folderami przedmiotowymi oraz współdziel projekty bez przełączania się między arkuszami.",
    ctaPrimary: "Rozpocznij planowanie",
    ctaSecondary: "Zobacz panel projektów",
  },
  en: {
    heading: "Progressly keeps projects moving",
    subheading:
      "Shape roadmaps, thematic folders, and collaborative dashboards without juggling extra docs.",
    ctaPrimary: "Start planning",
    ctaSecondary: "View project panel",
  },
};

const LandingPage = ({ language }: LandingPageProps) => {
  const text = copy[language];

  return (
    <section className="landing">
      <div className="landing-hero glow-card">
        <p className="badge">Nowość 2025</p>
        <h1>{text.heading}</h1>
        <p className="muted large">{text.subheading}</p>
        <div className="cta-group">
          <Link to="/auth" className="primary-btn">
            {text.ctaPrimary}
          </Link>
          <Link to="/projects" className="ghost-btn">
            {text.ctaSecondary}
          </Link>
        </div>
      </div>

      <div className="landing-panel">
        {metrics.map((metric) => (
          <div key={metric.label} className="metric-card">
            <span className="eyebrow">{metric.label}</span>
            <strong>{metric.value}</strong>
            <p className="muted">{metric.detail}</p>
          </div>
        ))}
      </div>

      <div className="feature-grid">
        {featureCopy.map((feature) => (
          <article key={feature.title} className="feature-card">
            <h3>{feature.title}</h3>
            <p>{feature.text}</p>
          </article>
        ))}
      </div>
    </section>
  );
};

export default LandingPage;
