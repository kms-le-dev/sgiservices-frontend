import { Link, useNavigate, useLocation } from "react-router-dom";
import React, { useEffect, useState } from "react";
import './Header.css';
import { api } from "../services/api";
import auth from "../services/auth";
import logo from "../assets/logo.jpeg";


export default function Header() {
  const [user, setUser] = useState(null);
  const [showLogoutToast, setShowLogoutToast] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem('token');
    // console.log('Token trouvé:', token);
    if (token) {
      api.get('/user')
        .then(res => {
          // console.log('Réponse /user:', res.data);
          if (res.data) {
            auth.saveUser(res.data);
            setUser(res.data);
          }
        })
        .catch((err) => {
          // console.error('Erreur /user:', err); 
          auth.clearAuth();
          auth.clearUser();
          setUser(null);
        });
    } else {
      setUser(null);
    }

    // optional: listen to storage changes in other tabs
    const onStorage = (e) => {
      if (e.key === 'user' || e.key === 'token') {
        setUser(auth.getCurrentUser());
      }
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, [location.pathname]);

  const handleLogout = async () => {
    // afficher le message immédiatement
    setShowLogoutToast(true);

    // supprimer localement les données d'auth avant la redirection
    auth.clearAuth();
    auth.clearUser();
    setUser(null);

    // essayer d'informer le serveur (ne bloque pas l'UI)
    try {
      await api.post('/auth/logout');
    } catch (err) {
      // console.error('Logout error', err);
    }

    // laisser le toast visible un court instant puis rediriger
    setTimeout(() => {
      setShowLogoutToast(false);
      navigate('/');
    }, 900);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className="logo-link">
          <img src={logo} alt="Logo SGI" className="logo" />
        </Link>

        <h1 className="site-title">
          <span className="title-white">S I P</span>
          <span className="title-red"> C I</span>
          <span className="title-white"> . O R G</span>
        </h1>

        <nav className="nav-links">
          <div className="primary-links">
            <Link className="nav-item home" to="/">Accueil</Link>
            <Link className="nav-item services" to="/services">Services</Link>
            <Link className="nav-item gallery" to="/gallery">Galerie</Link>
            <Link className="nav-item blog" to="/blog">Blog</Link>
          </div>
          <Link className="nav-item contact" to="/contact">Contact</Link>

          {user ? (
            <>
              <span className="nav-item user-name" title={user.name}>
                <span className="user-pill" style={{display: 'flex', alignItems: 'center', gap: '6px'}}>
                  <svg className="user-icon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{verticalAlign: 'middle'}}>
                    <circle cx="12" cy="8" r="4" />
                    <path d="M4 20c0-4 4-6 8-6s8 2 8 6" />
                  </svg>
                  <span className="user-name-text" style={{whiteSpace: 'nowrap'}}>{user.name}</span>
                </span>
              </span>
              {user.role === 'admin' && (
                <Link className="nav-item admin" to="/admin">Admin</Link> 
              )}
              <button className="nav-item logout" onClick={handleLogout}>Déconnexion</button>
            </>
          ) : (
            <>
              <Link className="nav-item login" to="/login">Connexion</Link>
              <Link className="nav-item singup" to="/singup">Inscription</Link>
            </>
          )}
        </nav>

        {/* Bouton hamburger pour mobile */}
        <button 
          className={`hamburger-btn ${mobileMenuOpen ? 'open' : ''}`}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
        </button>

        {/* Menu déroulant mobile */}
        {mobileMenuOpen && (
          <nav className="mobile-menu">
            <Link className="nav-item home" to="/" onClick={closeMobileMenu}>Accueil</Link>
            <Link className="nav-item services" to="/services" onClick={closeMobileMenu}>Services</Link>
            <Link className="nav-item gallery" to="/gallery" onClick={closeMobileMenu}>Galerie</Link>
            <Link className="nav-item blog" to="/blog" onClick={closeMobileMenu}>Blog</Link>
            <Link className="nav-item contact" to="/contact" onClick={closeMobileMenu}>Contact</Link>

            {user ? (
              <>
                <span className="nav-item user-name" title={user.name}>
                  <span className="user-pill" style={{display: 'flex', alignItems: 'center', gap: '6px'}}>
                    <svg className="user-icon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{verticalAlign: 'middle'}}>
                      <circle cx="12" cy="8" r="4" />
                      <path d="M4 20c0-4 4-6 8-6s8 2 8 6" />
                    </svg>
                    <span className="user-name-text" style={{whiteSpace: 'nowrap'}}>{user.name}</span>
                  </span>
                </span>
                {user.role === 'admin' && (
                  <Link className="nav-item admin" to="/admin" onClick={closeMobileMenu}>Admin</Link>
                )}
                <button className="nav-item logout" onClick={() => { handleLogout(); closeMobileMenu(); }}>Déconnexion</button>
              </>
            ) : (
              <>
                <Link className="nav-item login" to="/login" onClick={closeMobileMenu}>Connexion</Link>
                <Link className="nav-item singup" to="/singup" onClick={closeMobileMenu}>Inscription</Link>
              </>
            )}
          </nav>
        )}
      </div>
      {/* Toast de déconnexion */}
      <div className={`logout-toast ${showLogoutToast ? 'show' : ''}`} role="status" aria-live="polite">
        Vous êtes déconnecté
      </div>
    </header>
  );
}