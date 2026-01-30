type ProjectStatsProps = {
  completion: number;
  avgDifficulty: number;
  avgDuration: number | string;
};

export const ProjectStats = ({ completion, avgDifficulty, avgDuration }: ProjectStatsProps) => (
  <div className="stats-grid">
    <article className="stat-card">
      <span>Projekty ukończone</span>
      <strong>{completion}%</strong>
      <div className="progress-bar">
        <span style={{ width: `${completion}%` }} />
      </div>
    </article>
    <article className="stat-card">
      <span>Śr. trudność</span>
      <strong>{avgDifficulty}</strong>
      <p className="muted">w skali 1-5</p>
    </article>
    <article className="stat-card">
      <span>Śr. czas ukończenia</span>
      <strong>{avgDuration || "—"} dni</strong>
      <p className="muted">na podstawie planu</p>
    </article>
  </div>
);
