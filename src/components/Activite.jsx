// ActivitiesSection.jsx
import React from 'react';
import './Activite.css';

export default function ActivitiesSection() {
  return (
    <div className="activities-container">
      <div className="activities-wrapper">
        {/* Image Gauche - Affiche verte */}
        <div className="left-panel order-2">
          <div className="green-card">
            {/* En-tête noir */}
            <div className="header-black">
              <h3>TERRAINS A VENDRE DANS LE GRAND YAMOUSSOUKRO ET A YAMOUSSOUKRO</h3>
            </div>
            {/* Option A */}
            <div className="option-section">
              <div className="option-header">
                <h4>A) Livré avec ADU</h4>
              </div>
              <div className="option-content">
                <p className="bold-text">Grand Abidjan terrain livré avec ADU</p>
                <p>Situé à 2km du centre ville d'ALEPE et 2 km du goudron (route montezo- ALEPE)</p>
                <p>Terrain nu, site décapé et viabilisé, Projet de tours</p>
                <p className="price-large">3.000 FCFA / Paiement échelonné sur 12 mois</p>
              </div>
            </div>
            {/* Option B */}
            <div className="option-section">
              <div className="option-header">
                <h4>B) Livré avec Attestation villageoise</h4>
              </div>
              <div className="option-content">
                <p className="bold-text">Grand Abidjan Yamoussoukro</p>
                <p>Situé à 2km de l'aéroport de Yamoussoukro avec Attestation villageoise</p>
                <p className="price-medium">500.000 FCFA</p>
                <p className="payment-info">Paiement sur 12 mois: <span className="price-highlight">1.500.000 FCFA</span></p>
              </div>
            </div>
            {/* Numéros de téléphone */}
            <div className="phone-numbers">
              <p>07 59 89 03 58 / 05 74 93 9737</p>
            </div>
          </div>
        </div>
        {/* Contenu central — sur mobile, on veut afficher le centre en premier */}
        <div className="center-panel order-1">
          <div className="center-content">
            <h1 className="main-title">Nos Activités</h1>
            <p className="main-description">
              Nous sommes une entreprise polyvalente offrant des solutions complètes dans plusieurs domaines d'expertise pour accompagner votre réussite.
            </p>
            {/* Images centrales */}
            <div className="images-grid">
              <div className="image-card">
                <img 
                  className="responsive-img"
                  src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=400&h=400&fit=crop" 
                  alt="Bâtiment 1"
                />
              </div>
              <div className="image-card">
                <img 
                  className="responsive-img"
                  src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=400&h=400&fit=crop" 
                  alt="Formation professionnelle"
                />
              </div>
              <div className="image-card">
                <img 
                  className="responsive-img"
                  src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=400&h=400&fit=crop" 
                  alt="Bâtiment 2"
                />
              </div>
            </div>
            <div className="images-grid">
              <div className="image-card">
                <img className="responsive-img" src="https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=400&fit=crop" alt="Matériel informatique" />
              </div>
              <div className="image-card">
                <img className="responsive-img" src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800&fit=crop" alt="Maison vue par drone" />
              </div>
              <div className="image-card">
                <img className="responsive-img" src="https://images.unsplash.com/photo-1528909514045-2fa4ac7a08ba?w=800&fit=crop" alt="Bâtiment 2" />
              </div>
            </div>
            <div className="images-grid">
              <div className="image-card">
                <img className="responsive-img" src="https://images.unsplash.com/photo-1531834685032-c34bf0d84c77?w=800&fit=crop" alt="Bâtiment 1" />
              </div>
              <div className="image-card">
                <img className="responsive-img" src="https://plus.unsplash.com/premium_photo-1682147382418-ddf8c3e1310e?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Formation professionnelle" />
              </div>
              <div className="image-card">
                <img className="responsive-img" src="https://plus.unsplash.com/premium_photo-1750495290737-69ecd7d355e3?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Ordinateur" />
              </div>
            </div>
          </div>
        </div>
        {/* Image Droite - Logo SBR */}
        <div className="right-panel order-3">
          <div className="sbr-card">
            {/* Logo SBR */}
            <div className="logo-container">
              <div className="logo-sbr">SGI</div>
            </div>
            {/* Texte Innovation & Services */}
            <div className="tagline">
              <div className="tagline-services">SERVICES</div>
            </div>
            {/* Informations de contact */}
            <div className="contact-box">
              <h3>Contactez-nous</h3>
              <div className="contact-info">
                <p><span className="label">Email:</span> sgiservices.com</p>
                <p><span className="label">Tél:</span> +225 07 07 07 07 07</p>
                <p><span className="label">Adresse:</span> Abidjsn, Côte d'Ivoire</p>
              </div>
            </div>
            {/* Bouton d'action */}
            <button className="cta-button">
              Découvrir nos services
            </button>
            <br/>
            {/* Option A */}
            <div className="option-section">
              <div className="option-content">
                <p className="bold-text">Faites nous confiance</p>
                <p>Situé à 2km du centre ville d'ALEPE et 2 km du goudron (route montezo- ALEPE)</p>
                <p className="price-large">3.000 FCFA / Paiement échelonné sur 12 mois</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}