import Login from "../components/Login";
import Register from "../components/Register";

const AuthPage = () => {
  return (
    <section className="page auth-page">
      <header className="auth-header">
        <p className="eyebrow">Logowanie i tworzenie konta</p>
        <h1>Wejdź do Progressly</h1>
        <p className="muted">
          Użyj istniejącego konta lub utwórz nowe. Formularze zapisują
          preferencje "Pamiętaj mnie" oraz kod wysyłany na email.
        </p>
      </header>

      <div className="auth-grid">
        <Login />
        <Register />
      </div>
    </section>
  );
};

export default AuthPage;
