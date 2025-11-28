import React, { useState } from "react";
import Login from "./components/Login";
import Register from "./components/Register";

const App: React.FC = () => {
  const [view, setView] = useState<"login" | "register">("login");

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <div className="flex mb-6 gap-4">
        <button
          onClick={() => setView("login")}
          className={`px-4 py-2 rounded ${
            view === "login"
              ? "bg-blue-600 text-white"
              : "bg-white border"
          }`}
        >
          Logowanie
        </button>

        <button
          onClick={() => setView("register")}
          className={`px-4 py-2 rounded ${
            view === "register"
              ? "bg-green-600 text-white"
              : "bg-white border"
          }`}
        >
          Rejestracja
        </button>
      </div>

      {view === "login" ? <Login /> : <Register />}
    </div>
  );
};

export default App;
