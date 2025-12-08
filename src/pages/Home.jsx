import React, { useEffect, useRef } from 'react';
import './Home.css';
import terrainImg from '../assets/terrain.jpg';
import Carousel from '../components/Carousel';
import Activite from '../components/Activite';

export default function Home() {
  const containerRef = useRef(null);

  useEffect(() => {
    // Utiliser le scroll natif (CSS `scroll-behavior: smooth`) — Pas de JS lourd
    return () => {};
  }, []);

  useEffect(() => {
    const elements = containerRef.current.querySelectorAll('.fade-in');
    const observer = new window.IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.2 });
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div className='container' ref={containerRef}>

      {/* ------------------ HERO SECTION ------------------ */}
      <section className="hero-section fade-in">
        <div className="hero-container">
          
          {/* Image */}
          <div className="hero-image-wrapper">
            <div className="image-frame">
              <img
                src={terrainImg}
                alt="Terrain à vendre"
                className="hero-image"
              />
            </div>
          </div>

          {/* Texte */}
          <div className="hero-content">
            <p className="hero-subtitle">Bienvenue à SGI SERVICES</p>

            <h1 className="hero-title">
              Votre partenaire de confiance pour vos projets{" "}
              <span className="text-blue">Immobilier</span>,{" "}
              <span className="text-blue">Imprimerie</span>,{" "}
              <span className="text-blue">Fourniture informatique</span> et{" "}
              <span className="text-blue">Divers</span>.
            </h1>

            <p className="hero-description">
              SGI SERVICES est une entreprise spécialisée dans la gestion,
              l’achat, la vente et la location immobilière. Nous accompagnons
              particuliers, entreprises et investisseurs grâce à une expertise
              solide du marché local et une approche centrée sur la transparence
              et la satisfaction client.
            </p>

            {/* Petites stats dans le Hero */}
            <div className="stats-container">
              <div className="stat-card">
                <div className="stat-number">+250</div>
                <div className="stat-label">Biens immobiliers gérés</div>
              </div>

              <div className="stat-card">
                <div className="stat-number">+15</div>
                <div className="stat-label">Années d'expérience</div>
              </div>

              <div className="stat-card">
                <div className="stat-number">98%</div>
                <div className="stat-label">Clients satisfaits</div>
              </div>
            </div>
          </div>
        </div>   
      </section>
      <section className="fade-in"><Carousel/></section><br/>
      <section className="fade-in"><Activite/></section>

    </div>
  );
}
