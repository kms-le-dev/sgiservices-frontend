import React, { useState } from 'react';
import './ForgotPassword.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { api } from '../services/api';

export default function ForgotPassword() {
  const [form, setForm] = useState({
    nom: '',
    prenom: '',
    email: '',
    phone: '',
    dob: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  function onChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!form.nom || !form.prenom || !form.email || !form.phone || !form.dob || !form.password || !form.confirmPassword) {
      setError('Veuillez remplir tous les champs');
      return;
    }
    if (form.password.length < 6) {
      setError('Le mot de passe doit contenir au moins 6 caractères');
      return;
    }
    if (form.password !== form.confirmPassword) {
      setError('Les mots de passe ne correspondent pas');
      return;
    }

    try {
      setLoading(true);
      // Appel au backend : /api/auth/reset-password en utilisant l'instance `api`
      const payload = {
        email: form.email,
        phone: form.phone,
        password: form.password,
        password_confirmation: form.confirmPassword,
      };
      const res = await api.post('/auth/reset-password', payload);
      setSuccess(res?.data?.message || 'Mot de passe mis à jour');
    } catch (err) {
      console.error('Reset password error', err?.response || err);
      // Prefer server message, then validation errors, then fallback
      const serverData = err?.response?.data;
      let msg = 'Erreur lors de la mise à jour';
      if (serverData) {
        if (serverData.message) msg = serverData.message;
        else if (serverData.errors) {
          // concat validation errors
          const list = Object.values(serverData.errors).flat();
          msg = list.join(' - ');
        }
      }
      setError(msg);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Header />
      <main>
        <div className="signup-container">
          <div className="signup-card">
            <h2>Réinitialiser le mot de passe</h2>
            <p>Remplissez les informations pour modifier votre mot de passe</p>

        {error && <div className="error-message">{error}</div>}
        {success && <div className="success-message">{success}</div>}

        <form onSubmit={handleSubmit} className="signup-form">
          <div className="form-row">
            <div className="form-group">
              <label>Nom</label>
              <input name="nom" value={form.nom} onChange={onChange} />
            </div>
            <div className="form-group">
              <label>Prénom</label>
              <input name="prenom" value={form.prenom} onChange={onChange} />
            </div>
          </div>

          <div className="form-group">
            <label>Email</label>
            <input name="email" value={form.email} onChange={onChange} type="email" />
          </div>

          <div className="form-group">
            <label>Numéro de téléphone</label>
            <input name="phone" value={form.phone} onChange={onChange} />
          </div>

          <div className="form-group">
            <label>Date de naissance</label>
            <input name="dob" value={form.dob} onChange={onChange} type="date" />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label> Nouveau mot de passe</label>
              <input name="password" value={form.password} onChange={onChange} type="password" />
            </div>
            <div className="form-group">
              <label> Confirmer le nouveau mot de passe</label>
              <input name="confirmPassword" value={form.confirmPassword} onChange={onChange} type="password" />
            </div>
          </div>

          <button type="submit" className="submit-btn" disabled={loading}>{loading ? 'Modification...' : 'Modifier le mot de passe'}</button>
        </form>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
