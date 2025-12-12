export interface User {
  id: string;
  username: string;
  email: string;
  password: string;
  createdAt: string;
}

const LOGGED_KEY = "loggedUser";
const AUTH_EVENT = "progressly-auth-change";
const API_BASE_URL = import.meta.env.VITE_API_URL ?? "http://localhost:4000";

const emitAuthChange = () => {
  window.dispatchEvent(new Event(AUTH_EVENT));
};

const persistLoggedUser = (user: User | null) => {
  if (user) {
    localStorage.setItem(LOGGED_KEY, JSON.stringify(user));
  } else {
    localStorage.removeItem(LOGGED_KEY);
  }
  emitAuthChange();
};

export const getLoggedUser = (): User | null => {
  const raw = localStorage.getItem(LOGGED_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as User;
  } catch {
    return null;
  }
};

interface RegisterPayload {
  username: string;
  email: string;
  password: string;
}

type AuthResult = {
  success: boolean;
  user?: User;
  message?: string;
};

const toMessage = (error: unknown) =>
  error instanceof Error ? error.message : "Coś poszło nie tak";

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...(init?.headers ?? {}),
    },
    ...init,
  });

  const data = (await response.json().catch(() => ({}))) as T & {
    message?: string;
  };

  if (!response.ok) {
    const message =
      typeof data?.message === "string"
        ? data.message
        : `Żądanie nie powiodło się (${response.status})`;
    throw new Error(message);
  }

  return data;
}

export async function registerUser(
  payload: RegisterPayload
): Promise<AuthResult> {
  try {
    const data = await request<{ user: User }>("/api/auth/register", {
      method: "POST",
      body: JSON.stringify(payload),
    });
    return { success: true, user: data.user };
  } catch (error) {
    return { success: false, message: toMessage(error) };
  }
}

export async function loginUser(
  identifier: string,
  password: string
): Promise<AuthResult> {
  try {
    const data = await request<{ user: User }>("/api/auth/login", {
      method: "POST",
      body: JSON.stringify({ identifier, password }),
    });
    persistLoggedUser(data.user);
    return { success: true, user: data.user };
  } catch (error) {
    return { success: false, message: toMessage(error) };
  }
}

export function logoutUser() {
  persistLoggedUser(null);
}

export async function deleteCurrentUser() {
  const current = getLoggedUser();
  if (!current) {
    return { success: false, message: "Brak zalogowanego użytkownika" };
  }

  try {
    await request(`/api/auth/users/${current.id}`, {
      method: "DELETE",
    });
    persistLoggedUser(null);
    return { success: true };
  } catch (error) {
    return { success: false, message: toMessage(error) };
  }
}

export async function updateCurrentUser(
  update: Partial<User>
): Promise<AuthResult> {
  const current = getLoggedUser();
  if (!current) {
    return { success: false, message: "Najpierw się zaloguj" };
  }

  try {
    const data = await request<{ user: User }>(
      `/api/auth/users/${current.id}`,
      {
        method: "PATCH",
        body: JSON.stringify(update),
      }
    );
    persistLoggedUser(data.user);
    return { success: true, user: data.user };
  } catch (error) {
    return { success: false, message: toMessage(error) };
  }
}
