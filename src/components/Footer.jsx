import React from 'react';
import './Footer.css';
import logo from '../assets/logo.jpg';

export default function Footer() {
  return (
    <footer className="footer" role="contentinfo">
      <div className="footer-container">
        <div className="footer-column footer-about">
          <div className="footer-logo">
            <img src={logo} alt="Logo SGISERVICES" className="logo-icon" />
            <div className="brand">
              <h3>SGISERVICES</h3>
              <p className="tag">Solutions & services digitaux</p>
            </div>
          </div>

          <address className="footer-contact" aria-label="Coordonnées">
            <div className="contact-item">
              <svg className="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
              <a href="mailto:sgiservices2015@gmail.com" className="email-link">sgiservices2015@gmail.com</a>
            </div>

            <div className="contact-item">
              <svg className="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
              <a href="tel:+2250706591243">+2250759890358</a>
            </div>

            <div className="contact-item">
              <svg className="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
              <span>Abidjan, Plateau Dokui</span>
            </div>
          </address>
        </div>
        <div></div>

        <nav className="footer-column" aria-label="Liens utiles">
          <h4>À propos</h4>
          <ul>
            <li><a href="/about">Notre mission</a></li>
            <li><a href="/services">Services</a></li>
          </ul>
        </nav>
        <div></div>

        <div className="footer-column" aria-label="Contact">
          <h4>Contact</h4>
          <ul>
            <li><a href="/contact">Contactez-nous</a></li>
            <li><a href="https://wa.me/2250759890358" target="_blank" rel="noopener noreferrer">WhatsApp</a></li>
          </ul>
        </div>
      </div>

      <div className="footer-divider" aria-hidden="true"></div>

      <div className="footer-bottom">
        <div className="footer-bottom-content">
          <div className="footer-social" aria-label="Réseaux sociaux">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="Facebook">
              <svg viewBox="0 0 24 24" className="social-icon" aria-hidden="true"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/></svg>
            </a>

            <a href="https://wa.me/2250759890358" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="WhatsApp">
              <svg viewBox="0 0 32 32" className="social-icon" aria-hidden="true"><path d="M16.01 3C9.38 3 4 8.38 4 15.01c0 2.64.87 5.08 2.33 7.06L4 29l7.2-2.29A11.94 11.94 0 0016.01 27C22.63 27 28 21.62 28 15S22.63 3 16.01 3zm6.63 17.25c-.28.79-1.62 1.53-2.24 1.62-.6.09-1.36.13-2.2-.14-.51-.17-1.16-.38-2-1-.79-.59-1.29-1.31-1.45-1.53-.15-.21-.62-.82-.62-1.57s.39-1.1.53-1.25c.14-.16.3-.2.4-.2h.28c.09 0 .21-.03.33.25.12.29.42 1.02.46 1.1.04.08.07.17.01.28-.07.12-.1.17-.2.27-.09.09-.18.2-.25.27-.08.08-.16.17-.07.33.09.17.4.66.86 1.07.59.52 1.09.68 1.25.76.16.08.27.06.36-.03.1-.09.42-.49.54-.66.14-.17.23-.14.37-.08.15.06.96.45 1.12.53.16.08.27.12.31.19.04.08.04.83-.24 1.62z"/></svg>
            </a>

            <a href="mailto:sgiservices2015@gmail.com" className="social-link email-link" aria-label="Email">
              <svg viewBox="0 0 24 24" className="social-icon" aria-hidden="true"><path d="M22 6.5v11a2.5 2.5 0 01-2.5 2.5H4.5A2.5 2.5 0 012 17.5v-11A2.5 2.5 0 014.5 4h15A2.5 2.5 0 0122 6.5zm-2 0l-8 5-8-5v11h16v-11z"/></svg>
            </a>
          </div>

          <div className="footer-phones" aria-hidden="false">
            <a href="tel:+2250706591243" className="phone-link">+225 07 59 89 03 58</a>
            <a href="tel:+2250102030405" className="phone-link">+225 27 35 99 95 01</a>
            <a href="tel:+2250102030405" className="phone-link">+225 05 74 93 97 37</a>
            <a href="tel:+2250102030405" className="phone-link">+225 07 06 59 12 43</a>
          </div>
        </div>
      </div>

      <div className="footer-copyright">
        <p>SGISERVICES © {new Date().getFullYear()}. Tous droits réservés.</p>
      </div>
    </footer>
  );
}