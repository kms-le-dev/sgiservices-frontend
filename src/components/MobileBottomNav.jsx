import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './MobileBottomNav.css';

export default function MobileBottomNav() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 1024);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  if (!isMobile) return null;

  return (
    <nav className="mobile-bottom-nav" role="navigation" aria-label="Navigation principale">
      <Link to="/" className="mbn-item" aria-label="Accueil">
        <svg viewBox="0 0 24 24" className="mbn-icon" aria-hidden="true"><path d="M3 11.5L12 4l9 7.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1v-8.5z"/></svg>
        <span className="mbn-label">Accueil</span>
      </Link>

      <Link to="/services" className="mbn-item" aria-label="Services">
        <svg viewBox="0 0 24 24" className="mbn-icon" aria-hidden="true"><path d="M20 6H4v12h16V6zM6 8h12v2H6V8zm0 4h8v2H6v-2z"/></svg>
        <span className="mbn-label">Services</span>
      </Link>

      <Link to="/gallery" className="mbn-item" aria-label="Galerie">
        <svg viewBox="0 0 24 24" className="mbn-icon" aria-hidden="true"><path d="M21 19V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14l4-3 3 3 5-4 5 4z"/></svg>
        <span className="mbn-label">Galerie</span>
      </Link>

      <Link to="/blog" className="mbn-item" aria-label="Blog">
        <svg viewBox="0 0 24 24" className="mbn-icon" aria-hidden="true"><path d="M4 4h16v12H5.17L4 17.17V4zM6 6v6h12V6H6z"/></svg>
        <span className="mbn-label">Blog</span>
      </Link>
    </nav>
  );
}
