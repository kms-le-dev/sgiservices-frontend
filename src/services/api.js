import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:8000/api",
  // Ne pas forcer `Content-Type` ici : laisser axios le définir automatiquement
  // (utile pour les envois `FormData` / fichiers)
});

export function setAuthToken(token) {
  if (token) {
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common["Authorization"];
  }
}
