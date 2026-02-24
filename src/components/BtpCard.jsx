import React from "react";
import "./BtpCard.css";
import btpImg from "../assets/btp.jpg"; // remplace par ton image

export default function BtpCard() {
  return (
    <div className="btp-card btp-flex">
      <div className="btp-image">
        <img src={btpImg} alt="BTP" />
      </div>
      <div className="btp-content">
        <div className="btp-title">
          <h1>BTP</h1>
        </div>
        <div className="section">
          <h2>1. Construction de bâtiments</h2>
        </div>
        <div className="section">
          <h2>2. Travaux publics</h2>
          <ul>
            <li>Construction et entretien des routes, ponts…</li>
            <li>Aménagements urbains et infrastructures</li>
          </ul>
        </div>
        <div className="section">
          <h2>3. Études et conception</h2>
          <p>Réalisation d’études techniques et de plans détaillés</p>
          <p>Études de faisabilité, estimation des coûts</p>
        </div>
        <div className="section">
          <h2>4. Gestion de chantier</h2>
          <ul>
            <li>Supervision et coordination des équipes</li>
            <li>Planification, suivi de l’avancement</li>
            <li>Contrôle et respect des délais</li>
            <li>Sécurité et conformité aux normes</li>
          </ul>
        </div>
        <div className="section">
          <h2>5. Approvisionnement</h2>
          <ul>
            <li>Achat et gestion des matériaux</li>
            <li>Organisation du transport et stockage</li>
          </ul>
        </div>
      </div>
    </div>
  );
}