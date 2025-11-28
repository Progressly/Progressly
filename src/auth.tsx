export interface User {
    email: string;
    password: string;
  }
  
  export function registerUser(email: string, password: string) {
    const users: User[] = JSON.parse(localStorage.getItem("users") || "[]");
  
    if (users.find(u => u.email === email)) {
      return { success: false, message: "Użytkownik już istnieje" };
    }
  
    users.push({ email, password });
    localStorage.setItem("users", JSON.stringify(users));
  
    return { success: true };
  }
  
  export function loginUser(email: string, password: string) {
    const users: User[] = JSON.parse(localStorage.getItem("users") || "[]");
    const user = users.find(u => u.email === email && u.password === password);
  
    if (user) {
      localStorage.setItem("loggedUser", JSON.stringify(user));
      return { success: true };
    }
  
    return { success: false, message: "Błędny email lub hasło" };
  }
  