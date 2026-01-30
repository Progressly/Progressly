import { useState } from "react";

const difficultyLabels = [
  "Łatwy",
  "Umiarkowany",
  "Średni",
  "Zaawansowany",
  "Ekspert",
];

export type ProjectFormData = {
  name: string;
  category: string;
  difficulty: number;
  progress: number;
  startDate: string;
  endDate: string;
  shared: boolean;
  notes: string;
};

type ProjectFormProps = {
  onSubmit: (data: ProjectFormData) => void;
  categories: string[];
};

export const ProjectForm = ({ onSubmit, categories }: ProjectFormProps) => {
  const [form, setForm] = useState<ProjectFormData>({
    name: "",
    category: "Robotyka",
    difficulty: 3,
    progress: 50,
    startDate: "",
    endDate: "",
    shared: true,
    notes: "",
  });

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!form.name.trim()) return;
    onSubmit(form);
    setForm((prev) => ({
      ...prev,
      name: "",
      notes: "",
      progress: 50,
      difficulty: 3,
    }));
  };

  return (
    <form className="project-form" onSubmit={handleSubmit}>
      <h3>Dodaj lub usuń projekt</h3>
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
          {categories.map((category) => (
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
  );
};
