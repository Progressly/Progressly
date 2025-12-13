import { useMemo, useState } from "react";
import type { User } from "../auth";

type Project = {
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

const seedProjects: Project[] = [
  {
    id: "p1",
    name: "Robotyka — moduł sensoryczny",
    category: "Robotyka",
    difficulty: 4,
    progress: 65,
    startDate: "2025-11-01 ",
    endDate: "2025-12-15",
    shared: true,
    notes: "Integracja z czujnikiem LIDAR",
  },
  {
    id: "p2",
    name: "Geografia — mapa mentalna",
    category: "Geografia",
    difficulty: 2,
    progress: 40,
    startDate: "2025-11-20 ",
    endDate: "2025-12-14",
    shared: false,
    notes: "Zebrać materiały od Oli",
  },
  {
    id: "p3",
    name: "Design — warsztaty UX",
    category: "Design",
    difficulty: 3,
    progress: 80,
    startDate: "2025-10-10 ",
    endDate: "2025-12-20",
    shared: true,
    notes: "Przygotować ćwiczenia w Figmie",
  },
  {
    id: "p4",
    name: "Robotyka — kontroler ruchu",
    category: "Robotyka",
    difficulty: 5,
    progress: 20,
    startDate: "2025-12-01 ",
    endDate: "2026-01-30",
    shared: false,
    notes: "Analiza danych z poprzedniego sprintu",
  },
];

const difficultyLabels = [
  "Łatwy",
  "Umiarkowany",
  "Średni",
  "Zaawansowany",
  "Ekspert",
];
const createProjectId = () =>
  typeof crypto !== "undefined" && crypto.randomUUID
    ? crypto.randomUUID()
    : `project-${Date.now()}-${Math.random().toString(16).slice(2)}`;

const ProjectsPage = ({ user }: { user: User | null }) => {
  const [projects, setProjects] = useState<Project[]>(seedProjects);
  const [form, setForm] = useState({
    name: "",
    category: "Robotyka",
    difficulty: 3,
    progress: 50,
    startDate: "",
    endDate: "",
    shared: true,
    notes: "",
  });

  const completion = useMemo(() => {
    if (!projects.length) return 0;
    const finished = projects.filter((p) => p.progress >= 100).length;
    return Math.round((finished / projects.length) * 100);
  }, [projects]);

  const avgDifficulty = useMemo(() => {
    if (!projects.length) return 0;
    const sum = projects.reduce((acc, project) => acc + project.difficulty, 0);
    return Number((sum / projects.length).toFixed(1));
  }, [projects]);

  const avgDuration = useMemo(() => {
    if (!projects.length) return 0;
    const total = projects.reduce((acc, project) => {
      const start = new Date(project.startDate).getTime();
      const end = new Date(project.endDate).getTime();
      if (Number.isNaN(start) || Number.isNaN(end)) {
        return acc;
      }
      const days = Math.max(1, (end - start) / (1000 * 60 * 60 * 24));
      return acc + days;
    }, 0);
    return Math.round(total / projects.length);
  }, [projects]);

  const grouped = useMemo(() => {
    return projects.reduce<Record<string, Project[]>>((acc, project) => {
      if (!acc[project.category]) {
        acc[project.category] = [];
      }
      acc[project.category].push(project);
      return acc;
    }, {});
  }, [projects]);

  const handleAddProject = (event: React.FormEvent) => {
    event.preventDefault();
    if (!form.name.trim()) return;

    const newProject: Project = {
      id: createProjectId(),
      ...form,
    };
    setProjects((prev) => [...prev, newProject]);
    setForm((prev) => ({ ...prev, name: "", notes: "", progress: 30 }));
  };

  const deleteProject = (id: string) => {
    setProjects((prev) => prev.filter((project) => project.id !== id));
  };

  return (
    <section className="page projects-page">
      <header className="projects-header">
        <div>
          <p className="eyebrow">Panel projektów</p>
          <h1>
            Hej {user?.username || "Twórco"}, tu Twoje foldery i statystyki
          </h1>
          <p className="muted">
            Dodawaj albo usuwaj projekty, śledź procent ukończenia i przełączaj
            udostępnianie w jednym miejscu.
          </p>
        </div>
        <div className="stats-grid">
          <article className="stat-card">
            <span>Projekty ukończone </span>
            <strong>{completion}%</strong>
            <div className="progress-bar">
              <span style={{ width: `${completion}%` }} />
            </div>
          </article>
          <article className="stat-card">
            <span>Śr. trudność </span>
            <strong>{avgDifficulty}</strong>
            <p className="muted">w skali 1-5</p>
          </article>
          <article className="stat-card">
            <span>Śr. czas ukończenia </span>
            <strong>{avgDuration || "—"} dni</strong>
            <p className="muted">na podstawie planu</p>
          </article>
        </div>
      </header>

      <div className="projects-grid">
        <form className="project-form" onSubmit={handleAddProject}>
          <h3>Dodaj projekt</h3>
          <label className="field">
            <span>Nazwa projektu</span>
            <input
              className="input"
              value={form.name}
              placeholder="np. Robotyka — serwomechanizmy"
              onChange={(event) =>
                setForm((prev) => ({ ...prev, name: event.target.value }))
              }
            />
          </label>
          <label className="field">
            <span>Folder</span>
            <input
              className="input"
              list="project-folders"
              value={form.category}
              placeholder="np. Robotyka"
              onChange={(event) =>
                setForm((prev) => ({ ...prev, category: event.target.value }))
              }
            />
            <datalist id="project-folders">
              {Object.keys(grouped).map((category) => (
                <option key={category} value={category} />
              ))}
            </datalist>
          </label>
          <label className="field">
            <span>Poziom trudności</span>
            <input
              type="range"
              min={1}
              max={5}
              value={form.difficulty}
              onChange={(event) =>
                setForm((prev) => ({
                  ...prev,
                  difficulty: Number(event.target.value),
                }))
              }
            />
            <small className="muted">
              {difficultyLabels[form.difficulty - 1]}
            </small>
          </label>
          <div className="dual-field">
            <label className="field">
              <span>Start</span>
              <input
                type="date"
                className="input"
                value={form.startDate}
                onChange={(event) =>
                  setForm((prev) => ({
                    ...prev,
                    startDate: event.target.value,
                  }))
                }
              />
            </label>
            <label className="field">
              <span>Deadline</span>
              <input
                type="date"
                className="input"
                value={form.endDate}
                onChange={(event) =>
                  setForm((prev) => ({ ...prev, endDate: event.target.value }))
                }
              />
            </label>
          </div>
          <label className="field">
            <span>Procent ukończenia</span>
            <div className="code-field">
              <input
                type="number"
                min={0}
                max={100}
                className="input"
                value={form.progress}
                onChange={(event) =>
                  setForm((prev) => ({
                    ...prev,
                    progress: Number(event.target.value),
                  }))
                }
              />
              <span className="muted">%</span>
            </div>
          </label>
          <label className="field">
            <span>Notatki</span>
            <textarea
              className="input"
              rows={3}
              value={form.notes}
              placeholder="Co jest kluczowe w tym projekcie?"
              onChange={(event) =>
                setForm((prev) => ({ ...prev, notes: event.target.value }))
              }
            />
          </label>
          <label className="checkbox">
            <input
              type="checkbox"
              checked={form.shared}
              onChange={(event) =>
                setForm((prev) => ({ ...prev, shared: event.target.checked }))
              }
            />
            <span>Udostępnij członkom zespołu</span>
          </label>
          <button type="submit" className="primary-btn">
            Dodaj projekt
          </button>
        </form>

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
                        onClick={() => deleteProject(project.id)}
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
      </div>
    </section>
  );
};

export default ProjectsPage;
