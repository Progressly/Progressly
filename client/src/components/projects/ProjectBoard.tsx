export type Project = {
  id: string;
  name: string;
  category: string;
  difficulty: number;
  progress: number;
  startDate: string;
  endDate: string;
  shared: boolean;
  notes: string;
};

type ProjectBoardProps = {
  grouped: Record<string, Project[]>;
  onDelete: (id: string) => void;
};

const difficultyLabels = [
  "Łatwy",
  "Umiarkowany",
  "Średni",
  "Zaawansowany",
  "Ekspert",
];

export const ProjectBoard = ({ grouped, onDelete }: ProjectBoardProps) => {
  return (
    <div className="projects-board">
      <div className="folder-chips">
        {Object.entries(grouped).map(([category, list]) => (
          <span key={category} className="folder-chip">
            {category}
            <small>{list.length}</small>
          </span>
        ))}
      </div>

      {Object.entries(grouped).map(([category, list]) => (
        <div key={category} className="category-block">
          <div className="block-head">
            <h3>{category}</h3>
            <span className="muted">{list.length} projekty</span>
          </div>
          <div className="category-grid">
            {list.map((project) => (
              <article key={project.id} className="project-card">
                <header>
                  <h4>{project.name}</h4>
                  <button
                    className="ghost-btn"
                    type="button"
                    onClick={() => onDelete(project.id)}
                  >
                    Usuń
                  </button>
                </header>
                <p className="muted small">{project.notes}</p>
                <div className="progress-bar compact">
                  <span style={{ width: `${project.progress}%` }} />
                </div>
                <div className="project-meta">
                  <span className="pill">
                    {difficultyLabels[project.difficulty - 1]}
                  </span>
                  <span className="pill ghost">
                    {project.shared ? "Udostępniony" : "Prywatny"}
                  </span>
                </div>
                <footer>
                  <small>{project.startDate}</small>
                  <small>{project.endDate}</small>
                </footer>
              </article>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
