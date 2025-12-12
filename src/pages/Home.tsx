import { Link } from "react-router-dom";
import type { User } from "../auth";

type HomePageProps = {
  user: User | null;
  language: "pl" | "en";
};

const deadlines = [
  { title: "Koncepcja robotyki", date: "10.12", type: "Robotyka" },
  { title: "Mapa myśli — geo", date: "14.12", type: "Geografia" },
  { title: "Warsztaty UX", date: "20.12", type: "Design" },
];

const HomePage = ({ user, language }: HomePageProps) => {
  const name = user?.username || (language === "pl" ? "Twórco" : "Maker");
  const greeting =
    language === "pl"
      ? `Cześć ${name}! Jak się dziś czujesz?`
      : `Hi ${name}! How are you today?`;

  return (
    <section className="page home-page">
      <div className="home-hero glow-card">
        <p className="eyebrow">Domowa tablica</p>
        <h1>{greeting}</h1>
        <p className="muted large">
          Szybki dostęp do ustawień, panelu projektów i najnowszych powiadomień
          w jednym miejscu.
        </p>
        <div className="cta-group">
          <Link to="/projects" className="primary-btn">
            Otwórz project dash
          </Link>
          <Link to="/settings" className="ghost-btn">
            Ustaw preferencje
          </Link>
        </div>
      </div>

      <div className="home-grid">
        <article className="home-card">
          <header>
            <h3>Przypięte skróty</h3>
            <span className="status-pill">Nowe</span>
          </header>
          <ul>
            <li>
              <Link to="/settings">Zarządzaj kontem</Link>
            </li>
            <li>
              <Link to="/projects">Foldery projektów</Link>
            </li>
            <li>
              <Link to="/auth">Zaproś współpracowników</Link>
            </li>
          </ul>
        </article>

        <article className="home-card">
          <header>
            <h3>Dzisiejszy fokus</h3>
            <span className="muted">3 zadania</span>
          </header>
          <ul>
            <li>Finalize moodboard dla projektu "ECHO"</li>
            <li>Zaplanuj sprint dla folderu robotyka</li>
            <li>Sprawdź nowy deadline geograficzny</li>
          </ul>
        </article>

        <article className="home-card">
          <header>
            <h3>Nadchodzące deadline'y</h3>
            <Link to="/projects" className="link-btn">
              Pokaż wszystko
            </Link>
          </header>
          <div className="deadline-list">
            {deadlines.map((item) => (
              <div key={item.title} className="deadline-row">
                <div>
                  <p>{item.title}</p>
                  <span className="muted">{item.type}</span>
                </div>
                <strong>{item.date}</strong>
              </div>
            ))}
          </div>
        </article>

        <article className="home-card">
          <header>
            <h3>Udostępnianie</h3>
            <span className="muted">Project sharing</span>
          </header>
          <p className="muted">
            Dodaj osoby do folderów, kopiuj linki albo ustaw dostęp tylko do
            odczytu dla klientów.
          </p>
          <button className="primary-btn outline">
            Utwórz link zaproszenia
          </button>
        </article>
      </div>
    </section>
  );
};

export default HomePage;
