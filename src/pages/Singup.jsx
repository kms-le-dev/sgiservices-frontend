import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Singup.css';
import auth from '../services/auth';

export default function Signup() {
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    email: '',
    telephone: '',
    dateNaissance: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = () => {
    setError('');
    setSuccess(false);

    // Validation des champs
    if (!formData.nom || !formData.prenom || !formData.email || 
        !formData.telephone || !formData.dateNaissance || 
        !formData.password || !formData.confirmPassword) {
      setError('Veuillez remplir tous les champs');
      return;
    }

    if (!formData.email.includes('@')) {
      setError('Email invalide');
      return;
    }

    if (formData.telephone.length < 10) {
      setError('Numéro de téléphone invalide');
      return;
    }

    if (formData.password.length < 6) {
      setError('Le mot de passe doit contenir au moins 6 caractères');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Les mots de passe ne correspondent pas');
      return;
    }

    // Appel API d'inscription
    (async () => {
      try {
        const payload = {
          name: `${formData.prenom} ${formData.nom}`,
          email: formData.email,
              phone: formData.telephone,
          password: formData.password,
          password_confirmation: formData.confirmPassword,
        };
        const res = await auth.register(payload);
        const { token, user } = res.data;
        if (token) auth.saveToken(token);
        if (user) auth.saveUser(user);
        setSuccess(true);
        setTimeout(() => {
          alert('Inscription réussie !');
          window.location.href = '/';
        }, 500);
      } catch (err) {
        console.error(err);
        const msg = err?.response?.data?.message || 'Erreur lors de l\'inscription';
        setError(msg);
      }
    })();
  };

  return (
    <div className="signup-container responsive-login-layout">
      {/* Vidéo gauche (desktop) ou haut (mobile) */}
      <div className="login-video-col left responsive-video1">
        <video
          src="/video1.mp4"
          autoPlay
          loop
          muted
          playsInline
          style={{ width: '440px', maxWidth: '40vw', borderRadius: '16px', boxShadow: '0 8px 32px rgba(0,0,0,0.13)' }}
          tabIndex={-1}
          disablePictureInPicture
          controls={false}
        />
      </div>

      <div className="signup-card">
        {/* Vidéo 1 (mobile only, haut du formulaire) */}
        <div className="login-video-mobile mobile-video1">
          <video
            src="/video1.mp4"
            autoPlay
            loop
            muted
            playsInline
            style={{ width: '100%', maxWidth: '100%', borderRadius: '12px', marginBottom: '18px', boxShadow: '0 4px 16px rgba(0,0,0,0.10)' }}
            tabIndex={-1}
            disablePictureInPicture
            controls={false}
          />
        </div>

        <div className="signup-header">
          <h2>Inscription</h2>
          <p>Créez votre compte SIP-CI</p>
        </div>

        <div className="signup-form">
          {error && (
            <div className="error-message">
              {error}
            </div>
          )}

          {success && (
            <div className="success-message">
              Inscription réussie ! Bienvenue parmi nous 🎉
            </div>
          )}

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="nom">Nom *</label>
              <input
                type="text"
                id="nom"
                name="nom"
                value={formData.nom}
                onChange={handleChange}
                placeholder="Votre nom"
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label htmlFor="prenom">Prénom *</label>
              <input
                type="text"
                id="prenom"
                name="prenom"
                value={formData.prenom}
                onChange={handleChange}
                placeholder="Votre prénom"
                className="form-input"
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="email">Email *</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="exemple@email.com"
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label htmlFor="telephone">Numéro de téléphone *</label>
            <input
              type="tel"
              id="telephone"
              name="telephone"
              value={formData.telephone}
              onChange={handleChange}
              placeholder="+225 XX XX XX XX XX"
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label htmlFor="dateNaissance">Date de naissance *</label>
            <input
              type="date"
              id="dateNaissance"
              name="dateNaissance"
              value={formData.dateNaissance}
              onChange={handleChange}
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Mot de passe *</label>
            <div className="password-wrapper">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Minimum 6 caractères"
                className="form-input"
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

          <div className="form-group">
            <label htmlFor="confirmPassword">Confirmer le mot de passe *</label>
            <div className="password-wrapper">
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Retapez votre mot de passe"
                className="form-input"
              />
              <button
                type="button"
                className="toggle-password"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? '👁️' : '👁️‍🗨️'}
              </button>
            </div>
          </div>

          <button 
            type="button" 
            className="submit-btn"
            onClick={handleSubmit}
          >
            Créer mon compte
          </button>
        </div>

        <div className="signup-footer">
          <p>Vous avez déjà un compte ? <Link to="/login" className="login-link">Se connecter</Link> </p>
        </div>

        {/* Vidéo 2 (mobile only, bas du formulaire) */}
        <div className="login-video-mobile mobile-video2">
          <video
            src="/video2.mp4"
            autoPlay
            loop
            muted
            playsInline
            style={{ width: '100%', maxWidth: '100%', borderRadius: '12px', marginTop: '18px', boxShadow: '0 4px 16px rgba(0,0,0,0.10)' }}
            tabIndex={-1}
            disablePictureInPicture
            controls={false}
          />
        </div>
      </div>

      {/* Vidéo droite (desktop) */}
      <div className="login-video-col right responsive-video2">
        <video
          src="/video2.mp4"
          autoPlay
          loop
          muted
          playsInline
          style={{ width: '440px', maxWidth: '40vw', borderRadius: '16px', boxShadow: '0 8px 32px rgba(0,0,0,0.13)' }}
          tabIndex={-1}
          disablePictureInPicture
          controls={false}
        />
      </div>
    </div>
  );
}