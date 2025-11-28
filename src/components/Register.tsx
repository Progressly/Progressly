import React, { useState } from "react";
import { registerUser } from "../auth";

const Register: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleRegister = () => {
    const result = registerUser(email, password);
    setMessage(result.message || "Rejestracja udana!");
  };

  return (
    <div className="max-w-sm mx-auto bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4 text-center">Rejestracja</h2>

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

      <button
        className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
        onClick={handleRegister}
      >
        Zarejestruj
      </button>

      {message && (
        <p className="text-center text-sm text-gray-700 mt-3">{message}</p>
      )}
    </div>
  );
};

export default Register;
