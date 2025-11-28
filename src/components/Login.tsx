import React, { useState, useEffect } from "react";
import { loginUser } from "../auth";

interface ForgotPasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ForgotPasswordModal: React.FC<ForgotPasswordModalProps> = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState("");

  if (!isOpen) return null;

  const handleReset = () => {
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const exists = users.find((u: any) => u.email === email);

    alert(exists ? "Instrukcje resetowania wysłane!" : "Taki email nie istnieje.");
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
      <div className="bg-white w-80 p-6 rounded-lg shadow-lg">
        <h3 className="text-lg font-semibold mb-3">Reset hasła</h3>
        <input
          type="email"
          placeholder="Podaj email"
          className="w-full px-3 py-2 border rounded mb-4"
          onChange={e => setEmail(e.target.value)}
        />
        <button
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          onClick={handleReset}
        >
          Resetuj
        </button>

        <button className="w-full mt-3 text-sm text-gray-600" onClick={onClose}>
          Anuluj
        </button>
      </div>
    </div>
  );
};

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [remember, setRemember] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [isModalOpen, setModalOpen] = useState(false);

  // Ładowanie zapamiętanego emaila
  useEffect(() => {
    const saved = localStorage.getItem("rememberEmail");
    if (saved) setEmail(saved);
  }, []);

  const handleLogin = () => {
    const result = loginUser(email, password);

    if (remember) {
      localStorage.setItem("rememberEmail", email);
    } else {
      localStorage.removeItem("rememberEmail");
    }

    setMessage(result.message || "Zalogowano!");
  };

  return (
    <div className="max-w-sm mx-auto bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4 text-center">Logowanie</h2>

      <input
        type="email"
        placeholder="Email"
        className="w-full p-2 border border-gray-300 rounded mb-3"
        value={email}
        onChange={e => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Hasło"
        className="w-full p-2 border border-gray-300 rounded mb-4"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />

      <div className="flex items-center justify-between mb-4">
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={remember}
            onChange={e => setRemember(e.target.checked)}
          />
          <span className="text-sm">Pamiętaj mnie</span>
        </label>

        <button
          className="text-sm text-blue-600 hover:underline"
          onClick={() => setModalOpen(true)}
        >
          Zapomniałeś hasła?
        </button>
      </div>

      <button
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        onClick={handleLogin}
      >
        Zaloguj
      </button>

      {message && (
        <p className="text-center text-sm text-gray-700 mt-3">{message}</p>
      )}

      <ForgotPasswordModal isOpen={isModalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
};

export default Login;
