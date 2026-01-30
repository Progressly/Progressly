import { Link } from "react-router-dom";

type HomeHeroProps = {
  greeting: string;
};

export const HomeHero = ({ greeting }: HomeHeroProps) => {
  const today = new Date().toLocaleDateString("pl-PL", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="home-hero">
      <div className="hero-content">
        <p className="eyebrow">{today}</p>
        <h1 className="hero-title">{greeting}</h1>
        <div className="hero-stats">
          <div className="stat-pill">
            <span className="value">12</span>
            <span className="label">Projektów</span>
          </div>
          <div className="stat-pill">
            <span className="value">85%</span>
            <span className="label">Śr. postęp</span>
          </div>
          <div className="stat-pill highlight">
            <span className="value">3</span>
            <span className="label">Deadline'y</span>
          </div>
        </div>
      </div>
      <div className="hero-actions">
        <Link to="/projects" className="primary-btn">
          <span>+</span> Nowy Projekt
        </Link>
      </div>
    </div>
  );
};
