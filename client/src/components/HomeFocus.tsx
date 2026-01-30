export const HomeFocus = () => {
  return (
    <article className="home-card focus-card">
      <header>
        <h3>Priorytety</h3>
        <button className="icon-btn">⋮</button>
      </header>
      <div className="focus-list">
        <label className="focus-item">
          <input type="checkbox" />
          <span className="checkmark"></span>
          <div className="focus-text">
            <span>Moodboard "ECHO"</span>
            <small>Projekt UI/UX</small>
          </div>
        </label>
        <label className="focus-item">
          <input type="checkbox" />
          <span className="checkmark"></span>
          <div className="focus-text">
            <span>Sprint robotyka</span>
            <small>Inżynieria</small>
          </div>
        </label>
        <label className="focus-item checked">
          <input type="checkbox" defaultChecked />
          <span className="checkmark"></span>
          <div className="focus-text">
            <span>Przegląd maili</span>
            <small>Administracja</small>
          </div>
        </label>
      </div>
    </article>
  );
};
