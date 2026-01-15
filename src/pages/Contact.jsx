import React, { useState, useRef } from 'react';
import emailjs from '@emailjs/browser';
import './Contact.css';

export default function Contact() {
  const formRef = useRef();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [status, setStatus] = useState({ type: '', message: '' });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ type: '', message: '' });

    // Validation
    if (!formData.name || !formData.email || !formData.message) {
      setStatus({
        type: 'error',
        message: 'Veuillez remplir tous les champs obligatoires'
      });
      return;
    }

    if (!formData.email.includes('@')) {
      setStatus({
        type: 'error',
        message: 'Veuillez entrer un email valide'
      });
      return;
    }

    setIsLoading(true);

    try {
      // Configuration EmailJS
      // - Le `serviceId` doit être défini dans les variables d'environnement Vite :
      //   VITE_EMAILJS_SERVICE_ID=service_xxx
      // - Le `templateId` et la `publicKey` sont fournis ci-dessous (fournis par l'utilisateur)
      const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
      const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
      const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

      // Préparer les paramètres correspondant aux variables du template EmailJS
      const templateParams = {
        title: formData.subject || 'Contact via site',
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        message: formData.message
      };

      // Envoi (on passe la clé publique en 4e param). Si vous appelez `emailjs.init(publicKey)`
      // au démarrage, vous pouvez omettre le 4e argument.
      await emailjs.send(serviceId, templateId, templateParams, publicKey);

      setStatus({
        type: 'success',
        message: '✅ Message envoyé avec succès ! Nous vous répondrons rapidement.'
      });

      // Réinitialiser le formulaire
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });

    } catch (error) {
      console.error('EmailJS Error:', error);
      setStatus({
        type: 'error',
        message: '❌ Erreur lors de l\'envoi. Veuillez réessayer.'
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="contact-page">
      <div className="contact-container">
        {/* Section Info */}
        <div className="contact-info">
          <div className="info-header">
            <h1>Contactez-nous</h1>
            <p>Une question ? Un projet ? N'hésitez pas à nous écrire !</p>
          </div>

          <div className="info-cards">
            <div className="info-card">
              <div className="info-icon">📍</div>
              <h3>Adresse</h3>
              <p>Abidjan, Côte d'Ivoire</p>
            </div>

            <div className="info-card">
              <div className="info-icon">📞</div>
              <h3>Téléphone</h3>
              <p>+2250759890358</p>
            </div>

            <div className="info-card">
              <div className="info-icon">✉️</div>
              <h3>Email</h3>
              <p>sgiservices2015@gmail.com</p>
            </div>

            <div className="info-card">
              <div className="info-icon">🕒</div>
              <h3>Horaires</h3>
              <p>Lun - Sam: 8h - 18h</p>
            </div>
          </div>
        </div>

        {/* Formulaire de contact */}
        <div className="contact-form-wrapper">
          <div className="form-header">
            <h2>Envoyez-nous un message</h2>
            <p>Remplissez le formulaire ci-dessous et nous vous répondrons rapidement</p>
          </div>

          <div className="contact-form" ref={formRef}>
            {status.message && (
              <div className={`status-message ${status.type}`}>
                {status.message}
              </div>
            )}

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="name">Nom complet *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Votre nom"
                  className="form-input"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="votre@email.com"
                  className="form-input"
                  required
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="phone">Téléphone</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+225 XX XX XX XX XX"
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label htmlFor="subject">Sujet</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="Objet de votre demande"
                  className="form-input"
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="message">Message *</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Décrivez votre projet ou posez votre question..."
                className="form-textarea"
                rows="6"
                required
              />
            </div>

            <button
              type="button"
              onClick={handleSubmit}
              className="submit-button"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <span className="spinner"></span>
                  Envoi en cours...
                </>
              ) : (
                <>
                  <span>📧</span>
                  Envoyer le message
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}