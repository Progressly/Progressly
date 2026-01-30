export const HomeSharing = () => {
  return (
    <article className="home-card sharing-card">
      <div className="sharing-content">
        <h3>Współpraca</h3>
        <div className="avatars-stack">
          <div className="avatar" style={{ background: "#ff7b7b" }}>
            M
          </div>
          <div className="avatar" style={{ background: "#7f5dff" }}>
            K
          </div>
          <div className="avatar from-image">
            <img src="https://i.pravatar.cc/100?img=32" alt="User" />
          </div>
          <button className="add-avatar">+</button>
        </div>
        <p className="muted">Twój zespół jest online.</p>
      </div>
      <button className="primary-btn outline small">Zaproś</button>
    </article>
  );
};
