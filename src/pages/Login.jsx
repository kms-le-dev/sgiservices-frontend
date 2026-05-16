import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Login.css';
import auth from '../services/auth';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showLoginToast, setShowLoginToast] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    try {
      const img = new Image();
      img.src = '/loading.gif';
    } catch (e) {}
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
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
        // console.log('Réponse complète:', res.data);
        const { token, user } = res.data;
        if (token) auth.saveToken(token);
        if (user) auth.saveUser(user);
        setLoading(false);
        setShowLoginToast(true);
        setTimeout(() => {
          setShowLoginToast(false);
          // window.location.href = '/';
          navigate('/');
        }, 900);
      } catch (err) {
        const msg = err?.response?.data?.message || 'Erreur lors de la connexion';
        // console.log('ERREUR COMPLÈTE:', err);
        // console.log('Response data:', err?.response?.data);
        // console.log('Status:', err?.response?.status);
        setError(msg);
      } finally {
        setLoading(false);
      }
    })();
  };

  return (
    <div className="login-container responsive-login-layout">

      {/* Vidéo gauche (desktop uniquement) */}
      <div className="login-video-col left responsive-video1">
        <video
          src="/video1.mp4"
          autoPlay loop muted playsInline
          style={{ width: '340px', maxWidth: '40vw', borderRadius: '16px', boxShadow: '0 8px 32px rgba(0,0,0,0.13)' }}
          tabIndex={-1}
          disablePictureInPicture
        />
      </div>

      {/* Formulaire */}
      <div className="login-card">

        {/* Vidéo 1 (mobile uniquement, haut) */}
        <div className="login-video-mobile mobile-video1">
          <video
            src="/video1.mp4"
            autoPlay loop muted playsInline
            style={{ width: '100%', borderRadius: '12px', marginBottom: '18px', boxShadow: '0 4px 16px rgba(0,0,0,0.10)' }}
            tabIndex={-1}
            disablePictureInPicture
          />
        </div>

        <div className="login-header">
          <h2>Connexion</h2>
          <p>Accédez à votre compte SIP-CI</p>
        </div>

        <div className="login-form">
          {error && <div className="error-message">{error}</div>}

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

        {/* Vidéo 2 (mobile uniquement, bas) */}
        <div className="login-video-mobile mobile-video2">
          <video
            src="/video2.mp4"
            autoPlay loop muted playsInline
            style={{ width: '100%', borderRadius: '12px', marginTop: '18px', boxShadow: '0 4px 16px rgba(0,0,0,0.10)' }}
            tabIndex={-1}
            disablePictureInPicture
          />
        </div>

      </div>

      {/* Vidéo droite (desktop uniquement) */}
      <div className="login-video-col right responsive-video2">
        <video
          src="/video2.mp4"
          autoPlay loop muted playsInline
          style={{ width: '340px', maxWidth: '40vw', borderRadius: '16px', boxShadow: '0 8px 32px rgba(0,0,0,0.13)' }}
          tabIndex={-1}
          disablePictureInPicture
        />
      </div>

      {loading && (
        <div className="loading-overlay" role="status" aria-live="polite" />
      )}

      <div className={`login-toast ${showLoginToast ? 'show' : ''}`} role="status" aria-live="polite">
        Vous êtes connecté
      </div>

    </div>
  );
}