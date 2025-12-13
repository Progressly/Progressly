import express from "express";
import cors from "cors";
import { randomUUID } from "node:crypto";
import { seedProjects } from "./data/projects.js";
import { createUser, deleteUser, updateUser, verifyUser } from "./lib/users.js";

import mongoose from "mongoose";

const app = express();
const PORT = Number(process.env.PORT) || 4000;



const projects = [...seedProjects];

app.use(cors());
app.use(express.json());

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", timestamp: Date.now() });
});

app.get("/api/projects", (_req, res) => {
  res.json({ projects });
});

app.post("/api/projects", (req, res) => {
  const { name, category, startDate, endDate } = req.body ?? {};

  if (!name || !category) {
    return res.status(400).json({ message: "Brakuje nazwy lub folderu" });
  }

  const newProject = {
    id: randomUUID(),
    name,
    category,
    difficulty: Number(req.body?.difficulty) || 3,
    progress: Number(req.body?.progress) || 0,
    startDate: startDate || new Date().toISOString().slice(0, 10),
    endDate: endDate || startDate || new Date().toISOString().slice(0, 10),
    dateRange: `${startDate || new Date().toISOString().slice(0, 10)} ${endDate || startDate || new Date().toISOString().slice(0, 10)}`,
    shared: Boolean(req.body?.shared),
    notes: req.body?.notes || ""
  };

  projects.push(newProject);
  res.status(201).json({ project: newProject });
});

app.delete("/api/projects/:id", (req, res) => {
  const target = req.params.id;
  const index = projects.findIndex((project) => project.id === target);

  if (index === -1) {
    return res.status(404).json({ message: "Projekt nie istnieje" });
  }

  const [removed] = projects.splice(index, 1);
  res.json({ project: removed });
});

app.post("/api/auth/register", async (req, res) => {
  const username = req.body?.username?.trim();
  const email = req.body?.email?.trim();
  const password = req.body?.password;

  if (!username || !email || !password) {
    return res
      .status(400)
      .json({ message: "Podaj nazwę użytkownika, email i hasło" });
  }

  try {
    const user = await createUser({ username, email, password });
    return res.status(201).json({ user });
  } catch (error) {
    return res
      .status(400)
      .json({ message: error.message || "Nie udało się utworzyć konta" });
  }
});

app.post("/api/auth/login", async (req, res) => {
  const identifier = req.body?.identifier?.trim();
  const password = req.body?.password;

  if (!identifier || !password) {
    return res
      .status(400)
      .json({ message: "Podaj login (email lub użytkownik) i hasło" });
  }

  try {
    const user = await verifyUser({ identifier, password });
    if (!user) {
      return res.status(401).json({ message: "Nieprawidłowe dane logowania" });
    }
    return res.json({ user });
  } catch (error) {
    return res
      .status(500)
      .json({ message: error.message || "Nie udało się zalogować" });
  }
});

app.patch("/api/auth/users/:id", async (req, res) => {
  try {
    const user = await updateUser(req.params.id, req.body ?? {});
    return res.json({ user });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Błąd aktualizacji";
    return res.status(message === "Nie znaleziono konta" ? 404 : 400).json({
      message,
    });
  }
});

app.delete("/api/auth/users/:id", async (req, res) => {
  try {
    const user = await deleteUser(req.params.id);
    return res.json({ user });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Błąd usuwania";
    return res.status(message === "Nie znaleziono konta" ? 404 : 400).json({
      message,
    });
  }
});

app.use((req, res) => {
  res.status(404).json({ message: `Route ${req.path} nie istnieje` });
});


mongoose
  .connect("mongodb://127.0.0.1:27017/progressly")
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => {
      console.log(`Progressly API listening on http://localhost:${PORT}`);
    });
  })
  .catch((err) => console.error("MongoDB connection error:", err));

