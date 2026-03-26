import React, { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import "./Carousel.css";
import img1 from '../assets/img2.jpg';
import img2 from '../assets/imgimpression.webp';
import img3 from '../assets/imgimportexport.jpg';
import img4 from '../assets/imgfourniture informatique.jpeg';

const slides = [
  {
    image: img1,
    category: "Immobilier",
    title: "Des Terrains d'Exception",
    subtitle: "Abidjan & ses environs",
    description: "Parcelles viabilisées, titres fonciers sécurisés. Investissez dans le foncier ivoirien avec la sérénité d'un partenaire de confiance.",
    cta: "Explorer les biens",
    accent: "#c9a84c",
  },
  {
    image: img2,
    category: "Imprimerie",
    title: "L'Impression au Niveau Supérieur",
    subtitle: "Qualité professionnelle",
    description: "Brochures, flyers, kakémonos, enseignes — chaque support reflète l'excellence de votre image de marque.",
    cta: "Nos prestations",
    accent: "#a8c9b4",
  },
  {
    image: img3,
    category: "Import · Export",
    title: "Vos Échanges, Notre Expertise",
    subtitle: "Réseau international",
    description: "Gestion logistique, dédouanement, sourcing à l'international. SIP-CI facilite vos échanges commerciaux.",
    cta: "En savoir plus",
    accent: "#c9a84c",
  },
  {
    image: img4,
    category: "Fourniture Informatique",
    title: "Équipez-vous, Performez",
    subtitle: "Matériel & solutions IT",
    description: "Ordinateurs, périphériques, consommables — une gamme complète pour équiper vos équipes au meilleur rapport qualité-prix.",
    cta: "Voir le catalogue",
    accent: "#a8b8c9",
  },
];

export default function Carousel() {
  const [index, setIndex]             = useState(0);
  const [prevIndex, setPrevIndex]     = useState(null);
  const [direction, setDirection]     = useState(1); // 1=forward, -1=backward
  const [transitioning, setTransitioning] = useState(false);
  const [paused, setPaused]           = useState(false);
  const [progress, setProgress]       = useState(0);
  const timeoutRef  = useRef(null);
  const progressRef = useRef(null);
  const navigate    = useNavigate();
  const DURATION    = 5000;

  /* ─ Progress bar ─ */
  useEffect(() => {
    if (paused) return;
    setProgress(0);
    const start = performance.now();
    const tick = (now) => {
      const pct = Math.min((now - start) / DURATION, 1);
      setProgress(pct * 100);
      if (pct < 1) progressRef.current = requestAnimationFrame(tick);
    };
    progressRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(progressRef.current);
  }, [index, paused]);

  /* ─ Auto-advance ─ */
  useEffect(() => {
    if (paused) return;
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => advance(1), DURATION);
    return () => clearTimeout(timeoutRef.current);
  }, [index, paused]);

  const advance = useCallback((dir) => {
    if (transitioning) return;
    setTransitioning(true);
    setDirection(dir);
    setPrevIndex(index);
    setIndex((prev) => (prev + dir + slides.length) % slides.length);
    setTimeout(() => { setTransitioning(false); setPrevIndex(null); }, 900);
  }, [transitioning, index]);

  const goTo = useCallback((i) => {
    if (transitioning || i === index) return;
    advance(i > index ? 1 : -1);
    setTimeout(() => setIndex(i), 0);
  }, [transitioning, index, advance]);

  const current = slides[index];

  return (
    <div
      className="cx-root"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* ── Track ── */}
      <div className="cx-track">

        {/* Background layers */}
        {slides.map((slide, i) => (
          <div
            key={i}
            className={`cx-bg
              ${i === index      ? 'cx-bg--current'  : ''}
              ${i === prevIndex  ? 'cx-bg--prev'     : ''}
            `}
          >
            <img
              src={slide.image}
              alt={slide.title}
              className="cx-bg-img"
              loading={i === 0 ? 'eager' : 'lazy'}
              decoding="async"
            />
          </div>
        ))}

        {/* Dark vignette overlay */}
        <div className="cx-vignette" />

        {/* Architectural lines */}
        <div className="cx-lines" aria-hidden="true">
          <div className="cx-line cx-line--v1" />
          <div className="cx-line cx-line--v2" />
          <div className="cx-line cx-line--h"  />
        </div>

        {/* ── Content ── */}
        <div className={`cx-content ${transitioning ? 'cx-content--exit' : 'cx-content--enter'}`} key={index}>

          <div className="cx-meta">
            <span className="cx-category">
              <span className="cx-category-dot" style={{ background: current.accent }} />
              {current.category}
            </span>
            <span className="cx-subtitle">{current.subtitle}</span>
          </div>

          <h2 className="cx-title">{current.title}</h2>

          <p className="cx-desc">{current.description}</p>

          <div className="cx-actions">
            <button
              className="cx-btn-primary"
              style={{ '--accent': current.accent }}
              onClick={() => { navigate("/services"); window.scrollTo({ top: 0, behavior: "smooth" }); }}
            >
              <span>{current.cta}</span>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <span className="cx-count">
              <strong>{String(index + 1).padStart(2, '0')}</strong>
              <span className="cx-count-sep" />
              {String(slides.length).padStart(2, '0')}
            </span>
          </div>
        </div>

        {/* ── Progress bar ── */}
        <div className="cx-progress-track">
          <div className="cx-progress-fill" style={{ width: `${progress}%`, '--accent': current.accent }} />
        </div>

        {/* ── Side nav ── */}
        <button className="cx-nav cx-nav--prev" onClick={() => advance(-1)} aria-label="Précédent">
          <div className="cx-nav-inner">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M13 4l-6 6 6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </button>
        <button className="cx-nav cx-nav--next" onClick={() => advance(1)} aria-label="Suivant">
          <div className="cx-nav-inner">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M7 4l6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </button>

      </div>

      {/* ── Thumbnails / Dots ── */}
      <div className="cx-thumbs">
        {slides.map((slide, i) => (
          <button
            key={i}
            className={`cx-thumb ${i === index ? 'cx-thumb--active' : ''}`}
            onClick={() => goTo(i)}
            aria-label={`Slide ${i + 1}`}
          >
            <img src={slide.image} alt="" />
            <div className="cx-thumb-overlay" />
            <span className="cx-thumb-label">{slide.category}</span>
            {i === index && (
              <div className="cx-thumb-progress" style={{ '--accent': current.accent }}>
                <div className="cx-thumb-bar" style={{ width: `${progress}%` }} />
              </div>
            )}
          </button>
        ))}
      </div>

    </div>
  );
}