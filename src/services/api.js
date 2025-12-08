import axios from "axios";

const getBaseURL = () => {
  if (typeof window !== 'undefined' && window.location.hostname === 'localhost') {
    return 'http://localhost:8000/api';
  }
  // Pour la production sur Netlify, adapter l'URL de votre backend
  return 'https://votre-backend-production.com/api';
};

export const api = axios.create({
  baseURL: getBaseURL(),
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
