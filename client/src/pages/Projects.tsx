import { useEffect, useMemo, useState } from "react";
import type { User } from "../auth";
import { ProjectStats } from "../components/projects/ProjectStats";
import { ProjectForm, type ProjectFormData } from "../components/projects/ProjectForm";
import { ProjectBoard, type Project } from "../components/projects/ProjectBoard";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000";

const ProjectsPage = ({ user }: { user: User | null }) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch projects
  useEffect(() => {
    fetch(`${API_URL}/api/projects`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch");
        return res.json();
      })
      .then((data) => {
        setProjects(data.projects || []);
      })
      .catch((err) => console.error("Error loading projects:", err))
      .finally(() => setLoading(false));
  }, []);

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

  const handleAddProject = async (data: ProjectFormData) => {
    try {
      const res = await fetch(`${API_URL}/api/projects`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      
      if (res.ok) {
        const { project } = await res.json();
        setProjects((prev) => [project, ...prev]);
      }
    } catch (error) {
      console.error("Error adding project:", error);
    }
  };

  const handleDeleteProject = async (id: string) => {
    try {
      const res = await fetch(`${API_URL}/api/projects/${id}`, {
        method: "DELETE",
      });
      
      if (res.ok) {
        setProjects((prev) => prev.filter((p) => p.id !== id));
      }
    } catch (error) {
      console.error("Error deleting project:", error);
    }
  };

  return (
    <section className="page projects-page">
      <header className="projects-header-modern">
        <div className="header-content">
          <h1>Panel Projektów</h1>
          <p className="hero-subtitle">
            Zarządzaj swoimi folderami i śledź postępy prac w czasie rzeczywistym.
          </p>
        </div>
        <div className="header-stats-row">
           <ProjectStats
            completion={completion}
            avgDifficulty={avgDifficulty}
            avgDuration={avgDuration}
          />
        </div>
      </header>
      
      <div className="projects-layout">
        <aside className="sidebar-column">
           <ProjectForm onSubmit={handleAddProject} categories={Object.keys(grouped)} />
        </aside>
        
        <main className="main-column">
          {loading ? (
            <div className="loading-state">Ładowanie projektów...</div>
          ) : (
             <ProjectBoard grouped={grouped} onDelete={handleDeleteProject} />
          )}
        </main>
      </div>
    </section>
  );
};

export default ProjectsPage;

