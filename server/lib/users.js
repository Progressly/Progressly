import { readFile, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { randomUUID } from "node:crypto";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const USERS_PATH = path.resolve(__dirname, "../data/users.json");

const ensureStore = async () => {
  if (!existsSync(USERS_PATH)) {
    await writeFile(USERS_PATH, "[]", "utf-8");
  }
};

const readUsers = async () => {
  try {
    await ensureStore();
    const raw = await readFile(USERS_PATH, "utf-8");
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    console.warn("Nie udało się odczytać bazy użytkowników", error);
    await writeFile(USERS_PATH, "[]", "utf-8");
    return [];
  }
};

const writeUsers = async (users) => {
  await writeFile(USERS_PATH, JSON.stringify(users, null, 2), "utf-8");
};

const sanitizeUser = (user) => {
  if (!user) return null;
  const { password, ...rest } = user;
  return rest;
};

const isDuplicate = (users, field, value, ignoreId) =>
  users.some((user) => user[field] === value && user.id !== ignoreId);

export const createUser = async ({ username, email, password }) => {
  const users = await readUsers();
  if (users.some((u) => u.email === email)) {
    throw new Error("Email jest już zajęty");
  }
  if (users.some((u) => u.username === username)) {
    throw new Error("Nazwa użytkownika jest zajęta");
  }

  const user = {
    id: randomUUID(),
    username,
    email,
    password,
    createdAt: new Date().toISOString(),
  };

  await writeUsers([...users, user]);
  return sanitizeUser(user);
};

export const verifyUser = async ({ identifier, password }) => {
  const users = await readUsers();
  const match = users.find(
    (user) =>
      (user.email === identifier || user.username === identifier) &&
      user.password === password
  );
  return sanitizeUser(match || null);
};

export const updateUser = async (id, updates = {}) => {
  const users = await readUsers();
  const index = users.findIndex((user) => user.id === id);
  if (index === -1) {
    throw new Error("Nie znaleziono konta");
  }

  const nextUser = { ...users[index] };

  if (updates.username && updates.username !== nextUser.username) {
    if (isDuplicate(users, "username", updates.username, id)) {
      throw new Error("Nazwa użytkownika już istnieje");
    }
    nextUser.username = updates.username;
  }

  if (updates.email && updates.email !== nextUser.email) {
    if (isDuplicate(users, "email", updates.email, id)) {
      throw new Error("Email jest już zajęty");
    }
    nextUser.email = updates.email;
  }

  if (updates.password) {
    nextUser.password = updates.password;
  }

  users[index] = nextUser;
  await writeUsers(users);
  return sanitizeUser(nextUser);
};

export const deleteUser = async (id) => {
  const users = await readUsers();
  const index = users.findIndex((user) => user.id === id);
  if (index === -1) {
    throw new Error("Nie znaleziono konta");
  }

  const [removed] = users.splice(index, 1);
  await writeUsers(users);
  return sanitizeUser(removed);
};
