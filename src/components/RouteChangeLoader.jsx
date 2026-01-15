import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function showOverlay() {
  const overlay = document.getElementById('loading-overlay');
  if (!overlay) return;
  overlay.style.display = 'flex';
  overlay.style.opacity = '1';
}

function hideOverlay() {
  const overlay = document.getElementById('loading-overlay');
  if (!overlay) return;
  overlay.style.opacity = '0';
  setTimeout(function () { if (overlay && overlay.parentNode) overlay.style.display = 'none'; }, 350);
}

export default function RouteChangeLoader() {
  const location = useLocation();

  useEffect(() => {
    // Exposer des fonctions globales pour que d'autres composants puissent
    // masquer le loader quand leurs données sont prêtes
    window.appShowLoader = showOverlay;
    window.appHideLoader = hideOverlay;

    return () => {
      try { delete window.appShowLoader; delete window.appHideLoader; } catch(e) {}
    };
  }, []);

  useEffect(() => {
    // Affiche le loader dès que la route change
    showOverlay();
    // Masque après le prochain rendu (double RAF) pour laisser React peindre
    requestAnimationFrame(() => requestAnimationFrame(() => {
      // Délai minimal pour que l'utilisateur voie l'animation
      setTimeout(() => {
        hideOverlay();
      }, 250);
    }));
  }, [location.pathname]);

  return null;
}
