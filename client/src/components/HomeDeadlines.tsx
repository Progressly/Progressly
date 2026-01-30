import { Link } from "react-router-dom";

const deadlines = [
  { title: "Koncepcja robotyki", date: "10.12", day: "Wt", color: "#f472b6" },
  { title: "Mapa myśli", date: "14.12", day: "Sb", color: "#c084fc" },
  { title: "Warsztaty UX", date: "20.12", day: "Pt", color: "#818cf8" },
  { title: "Prezentacja", date: "22.12", day: "Nd", color: "#34d399" },
];

export const HomeDeadlines = () => {
  return (
    <article className="home-card deadlines-card">
      <header>
        <h3>Oś czasu</h3>
        <Link to="/projects" className="text-link">
          Kalendarz &rarr;
        </Link>
      </header>
      <div className="timeline-container">
        {deadlines.map((item, i) => (
          <div key={i} className="timeline-item">
            <div
              className="timeline-marker"
              style={{ backgroundColor: item.color }}
            ></div>
            <div className="timeline-content">
              <span className="timeline-date">
                {item.date} <small>{item.day}</small>
              </span>
              <p>{item.title}</p>
            </div>
          </div>
        ))}
      </div>
    </article>
  );
};
