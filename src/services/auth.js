import { api } from "./api";
import { setAuthToken } from "./api";

export async function register(payload) {
  // payload should include: name, email, password, password_confirmation
  return api.post("/auth/register", payload);
}

export async function login(payload) {
  // payload: { email, password }
  return api.post("/auth/login", payload);
}

export function saveToken(token) {
  if (!token) return;
  localStorage.setItem("token", token);
  setAuthToken(token);
}

export function clearAuth() {
  localStorage.removeItem("token");
  setAuthToken(null);
}

export function saveUser(user) {
  if (!user) return;
  try {
    localStorage.setItem('user', JSON.stringify(user));
  } catch (e) {
    console.error('Failed to save user in localStorage', e);
  }
}

export function getCurrentUser() {
  try {
    const u = localStorage.getItem('user');
    return u ? JSON.parse(u) : null;
  } catch (e) {
    console.error('Failed to parse user from localStorage', e);
    return null;
  }
}

export function clearUser() {
  localStorage.removeItem('user');
}

export function loadStoredToken() {
  const token = localStorage.getItem("token");
  if (token) setAuthToken(token);
}

export default {
  register,
  login,
  saveToken,
  clearAuth,
  loadStoredToken,
  saveUser,
  getCurrentUser,
  clearUser,
};
