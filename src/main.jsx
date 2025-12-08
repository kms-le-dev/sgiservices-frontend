import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

import App from "./App";
import { loadStoredToken } from './services/auth';
import emailjs from '@emailjs/browser';

// Charger le token stocké (si présent) pour préconfigurer axios
loadStoredToken();

// Initialiser EmailJS globalement (optionnel) avec la clé publique
const emailjsPublicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
if (emailjsPublicKey) {
  try {
    emailjs.init(emailjsPublicKey);
    // eslint-disable-next-line no-console
    console.log('EmailJS initialisé');
  } catch (err) {
    // eslint-disable-next-line no-console
    console.warn('Impossible d\'initialiser EmailJS:', err);
  }
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
