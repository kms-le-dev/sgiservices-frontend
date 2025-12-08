import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const location = useLocation();

  useEffect(() => {
    // essayer d'obtenir la hauteur du header s'il existe
    const header = document.querySelector("header");
    const headerOffset = header ? header.offsetHeight : 0;

    // si il y a un hash, scroller vers l'élément correspondant en tenant compte du header
    if (location.hash) {
      const id = location.hash.replace("#", "");
      // petit timeout pour laisser le DOM se stabiliser après navigation
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) {
          const y = el.getBoundingClientRect().top + window.pageYOffset - headerOffset - 8; // petit offset
          window.scrollTo({ top: y, behavior: "smooth" });
        }
      }, 50);
      return;
    }

    // par défaut, scroller en haut de la page en douceur
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [location]);

  return null;
}
