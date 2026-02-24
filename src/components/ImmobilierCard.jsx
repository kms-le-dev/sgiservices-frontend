import React from "react";
import "./ImmobilierCard.css";
import immobilierImg from "../assets/immobilier.png"; // remplace par ton image

export default function ImmobilierCard() {
  return (
    <div className="immo-card">
      <div className="immo-image">
        <img src={immobilierImg} alt="Immobilier" />
      </div>

      <div className="immo-content">
        <div className="immo-title">
          <h1>IMMOBILIER</h1>
        </div>

        <div className="immo-text">
          <div className="section">
            <h2>1. Transactions immobilières</h2>
            <ul>
              <li>Achat et vente de biens immobiliers</li>
              <li>
                Location de biens (résidentiels, commerciaux, industriels)
              </li>
            </ul>
          </div>

          <div className="section">
            <h2>2. Gestion immobilière</h2>
            <ul>
              <li>Gestion locative : suivi des loyers</li>
              <li>Relations avec les locataires</li>
              <li>Entretien et maintenance des bâtiments</li>
            </ul>
          </div>

          <div className="section">
            <h2>3. Promotion immobilière</h2>
            <ul>
              <li>Construction de nouveaux logements</li>
              <li>Développement de projets résidentiels</li>
              <li>Développement de projets commerciaux</li>
            </ul>
          </div>

          <div className="section">
            <h2>4. Conseil et expertise</h2>
            <ul>
              <li>Évaluation et estimation des biens</li>
              <li>Conseil en investissement immobilier</li>
              <li>Études de marché et analyse de rentabilité</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}