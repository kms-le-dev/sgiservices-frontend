import React, { useEffect, useRef, useState } from "react";
import "./About.css";
import { Link } from "react-router-dom";

const stats = [
  { value: 15, suffix: "+", label: "Années d'expérience" },
  { value: 800, suffix: "+", label: "Clients accompagnés" },
  { value: 320, suffix: "+", label: "Biens gérés" },
  { value: 98, suffix: "%", label: "Taux de satisfaction" },
];

const services = [
  {
    icon: "/gestion immobiliere.png",
    title: "Gestion Immobilière",
    description:
      "Administration et suivi de vos biens immobiliers : entretien, gestion locative et optimisation de la valeur.",
  },
  {
    icon: "/achat&vente.png",
    title: "Achat & Vente",
    description:
      "Accompagnement complet dans vos transactions immobilières, de l'estimation à la signature définitive.",
  },
  {
    icon: "/location.png",
    title: "Location",
    description:
      "Mise en location de logements et locaux commerciaux avec sélection rigoureuse des locataires.",
  },
  {
    icon: "/conseil&investissement.png",
    title: "Conseil & Investissement",
    description:
      "Expertise du marché local pour guider particuliers et investisseurs vers les meilleures opportunités.",
  },
];

function useCountUp(target, duration = 1800, started) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!started) return;
    let start = 0;
    const step = Math.ceil(target / (duration / 16));
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, 16);
    return () => clearInterval(timer);
  }, [started, target, duration]);
  return count;
}

function StatItem({ stat, started, index }) {
  const count = useCountUp(stat.value, 1800, started);
  return (
    <div className="stat-card" style={{ animationDelay: `${index * 0.15}s` }}>
      <span className="stat-value">
        {count}
        {stat.suffix}
      </span>
      <span className="stat-label">{stat.label}</span>
    </div>
  );
}

export default function About() {
  const statsRef = useRef(null);
  const [statsStarted, setStatsStarted] = useState(false);
  const [visibleCards, setVisibleCards] = useState([]);
  const cardRefs = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStatsStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    if (statsRef.current) observer.observe(statsRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const observers = cardRefs.current.map((ref, i) => {
      if (!ref) return null;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setVisibleCards((prev) => [...new Set([...prev, i])]);
            obs.disconnect();
          }
        },
        { threshold: 0.15 }
      );
      obs.observe(ref);
      return obs;
    });
    return () => observers.forEach((o) => o && o.disconnect());
  }, []);

  return (
    <div className="about-wrapper">
      {/* Fond décoratif */}
      <div className="about-bg-deco" aria-hidden="true">
        <div className="deco-circle deco-circle--1" />
        <div className="deco-circle deco-circle--2" />
        <div className="deco-line deco-line--1" />
        <div className="deco-line deco-line--2" />
      </div>

      {/* Hero section */}
      <section className="about-hero">
        <div className="about-hero__badge">Qui sommes-nous</div>
        <h1 className="about-title">
          <span className="about-title__top">SIP-CI</span>
          <span className="about-title__main">Immobilier</span>
        </h1>
        <p className="about-subtitle">
          <strong>SIP-CI</strong> est une entreprise spécialisée dans la
          gestion, l'achat, la vente et la location immobilière.
        </p>
        <div className="about-hero__divider" />
        <p className="about-desc">
          Nous accompagnons particuliers, entreprises et investisseurs grâce à
          une expertise solide du marché local et une approche centrée sur la
          transparence et la satisfaction client.
        </p>
      </section>

      {/* Statistiques */}
      <section className="about-stats" ref={statsRef}>
        {stats.map((stat, i) => (
          <StatItem key={i} stat={stat} started={statsStarted} index={i} />
        ))}
      </section>

      {/* Services */}
      <section className="about-services">
        <h2 className="about-services__title">Nos Services Immobiliers</h2>
        <div className="services-grid">
          {services.map((s, i) => (
            <div
              key={i}
              className={`service-card${visibleCards.includes(i) ? " service-card--visible" : ""}`}
              ref={(el) => (cardRefs.current[i] = el)}
              style={{ transitionDelay: `${i * 0.1}s` }}
            >
              <div className="service-card__icon">
                <img src={s.icon} alt={s.title} style={{ width: 180, height: 180, objectFit: "contain" }} />
              </div>
              <h3 className="service-card__title">{s.title}</h3>
              <p className="service-card__desc">{s.description}</p>
              <div className="service-card__bar" />
            </div>
          ))}
        </div>
      </section>

      {/* Mission */}
      <section className="about-mission">
        <div className="mission-content">
          <div className="mission-tag">Notre Mission</div>
          <h2 className="mission-title">
            Votre projet immobilier, notre priorité
          </h2>
          <p className="mission-text">
            Chez SIP-CI, la transparence et la satisfaction client sont au cœur
            de chaque transaction. Que vous soyez primo-accédant, propriétaire
            bailleur ou investisseur, nous mettons notre expertise du marché
            local à votre service pour concrétiser vos ambitions immobilières.
          </p>
          <Link to="/contact" className="mission-cta">
            Contactez-nous <span className="cta-arrow">→</span>
          </Link>
        </div>
        <div className="mission-visual" aria-hidden="true">
          <div className="mission-ring mission-ring--1" />
          <div className="mission-ring mission-ring--2" />
          <div className="mission-ring mission-ring--3" />
          <span className="mission-icon-center">✦</span>
        </div>
      </section>
    </div>
  );
}