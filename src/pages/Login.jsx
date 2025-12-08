import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Login.css';
import auth from '../services/auth';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showLoginToast, setShowLoginToast] = useState(false);

  // Précharger le GIF pour qu'il s'affiche instantanément lorsqu'on active l'overlay
  useEffect(() => {
    try {
      const img = new Image();
      img.src = '/loading.gif';
    } catch (e) {
      // noop
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    // afficher le GIF immédiatement
    setError('');
    setLoading(true);

    if (!email || !password) {
      setError('Veuillez remplir tous les champs');
      setLoading(false);
      return;
    }

    if (!email.includes('@')) {
      setError('Email invalide');
      setLoading(false);
      return;
    }

    (async () => {
      try {
        const res = await auth.login({ email, password });
        const { token, user } = res.data;
        if (token) {
          auth.saveToken(token);
        }
        if (user) {
          auth.saveUser(user);
        }
        console.log('Utilisateur connecté', user);
        // Afficher le toast de succès et rediriger après un court délai
        setLoading(false);
        setShowLoginToast(true);
        setTimeout(() => {
          setShowLoginToast(false);
          window.location.href = '/';
        }, 900);
      } catch (err) {
        console.error(err);
        const msg = err?.response?.data?.message || 'Erreur lors de la connexion';
        setError(msg);
      } finally {
        // si on n'a pas déjà caché le loading, s'assurer de le faire
        setLoading(false);
      }
    })();
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <h2>Connexion</h2>
          <p>Accédez à votre compte SGI Services</p>
        </div>

        <div className="login-form">
          {error && (
            <div className="error-message">
              {error}
            </div>
          )}

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="exemple@email.com"
              className="form-input"
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Mot de passe</label>
            <div className="password-wrapper">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="form-input"
                disabled={loading}
              />
              <button
                type="button"
                className="toggle-password"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? '👁️' : '👁️‍🗨️'}
              </button>
            </div>
          </div>

          <div className="form-options">
            <label className="checkbox-label">
              <input type="checkbox" />
              <span>Se souvenir de moi</span>
            </label>
            <a href="/forgot-password" className="forgot-password">
              Mot de passe oublié ?
            </a>
          </div>

          <button 
            type="button" 
            className="submit-btn"
            onClick={handleSubmit}
            disabled={loading}
          >
            Se connecter
          </button>
        </div>

        <div className="login-footer">
          <p>Pas encore de compte ? <Link to="/singup" className="signup-link">S'inscrire</Link></p>
        </div>
      </div>

        {loading && (
          <div className="loading-overlay" role="status" aria-live="polite" />
        )}

        {/* Toast de succès connexion */}
        <div className={`login-toast ${showLoginToast ? 'show' : ''}`} role="status" aria-live="polite">
          Vous êtes connecté
        </div>
    </div>
  );
}