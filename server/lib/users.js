import { User } from "../models/User.js";

const sanitizeUser = (user) => {
  if (!user) return null;
  // toJSON already handles removing _id, __v, and password
  return user.toJSON();
};

export const createUser = async ({ username, email, password }) => {
  const existingEmail = await User.findOne({ email });
  if (existingEmail) {
    throw new Error("Email jest już zajęty");
  }
  const existingUsername = await User.findOne({ username });
  if (existingUsername) {
    throw new Error("Nazwa użytkownika jest zajęta");
  }

  const user = await User.create({
    username,
    email,
    password,
  });

  return sanitizeUser(user);
};

export const verifyUser = async ({ identifier, password }) => {
  const user = await User.findOne({
    $or: [{ email: identifier }, { username: identifier }],
  });

  if (!user || user.password !== password) {
    return null;
  }

  return sanitizeUser(user);
};

export const updateUser = async (id, updates = {}) => {
  const user = await User.findById(id);
  if (!user) {
    throw new Error("Nie znaleziono konta");
  }

  if (updates.username && updates.username !== user.username) {
    const duplicate = await User.findOne({ username: updates.username });
    if (duplicate) {
      throw new Error("Nazwa użytkownika już istnieje");
    }
    user.username = updates.username;
  }

  if (updates.email && updates.email !== user.email) {
    const duplicate = await User.findOne({ email: updates.email });
    if (duplicate) {
      throw new Error("Email jest już zajęty");
    }
    user.email = updates.email;
  }

  if (updates.password) {
    user.password = updates.password;
  }

  await user.save();
  return sanitizeUser(user);
};

export const deleteUser = async (id) => {
  const user = await User.findByIdAndDelete(id);
  if (!user) {
    throw new Error("Nie znaleziono konta");
  }
  return sanitizeUser(user);
};
