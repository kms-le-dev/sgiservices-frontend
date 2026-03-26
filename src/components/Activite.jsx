import React, { useRef, useEffect, useState } from 'react';
import './Activite.css';

/* ─── Data ─── */
const OFFERS = [
  {
    id: 'A',
    badge: 'ADU',
    location: 'Grand Abidjan — ALEPE',
    title: 'Terrain viabilisé avec ADU',
    details: [
      '2 km du centre ville d\'Alepé',
      '2 km du goudron (route Montezo–Alepé)',
      'Site décapé · Projet de tours',
    ],
    price: '3 000',
    unit: 'FCFA / m²',
    payment: 'Paiement échelonné sur 12 mois',
    tag: 'Nouveau',
    accent: '#c9a84c',
  },
  {
    id: 'B',
    badge: 'Attestation villageoise',
    location: 'Yamoussoukro',
    title: 'Terrain proche aéroport',
    details: [
      '2 km de l\'aéroport de Yamoussoukro',
      'Attestation villageoise incluse',
      'Titre en cours de régularisation',
    ],
    price: '500 000',
    unit: 'FCFA',
    payment: 'Ou 1 500 000 FCFA sur 12 mois',
    tag: 'Disponible',
    accent: '#a8c9b4',
  },
];

const IMAGES = [
  { src: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=600&h=400&fit=crop', alt: 'Construction', span: 'wide' },
  { src: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=400&h=400&fit=crop', alt: 'Architecture' },
  { src: 'https://images.unsplash.com/photo-1528909514045-2fa4ac7a08ba?w=400&h=500&fit=crop', alt: 'Bâtiment', span: 'tall' },
  { src: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=300&fit=crop', alt: 'Informatique' },
  { src: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=400&h=300&fit=crop', alt: 'Chantier' },
  { src: 'https://images.unsplash.com/photo-1531834685032-c34bf0d84c77?w=400&h=400&fit=crop', alt: 'Immeuble' },
  { src: 'https://plus.unsplash.com/premium_photo-1682147382418-ddf8c3e1310e?w=400&h=400&fit=crop', alt: 'Impression' },
  { src: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=300&fit=crop', alt: 'Fourniture IT' },
];

/* ─── Intersection hook ─── */
function useReveal(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setVisible(true); obs.disconnect(); }
    }, { threshold });
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
}

/* ─── Offer Card ─── */
function OfferCard({ offer, delay }) {
  const [ref, visible] = useReveal(0.1);
  // Couleurs dynamiques :
  // - badge : vert si "ADU", rouge si "Attestation villageoise", noir sinon
  const badgeClass = offer.badge === 'ADU' ? 'text-vert' : offer.badge === 'Attestation villageoise' ? 'text-rouge' : 'text-noir';
  // - titre toujours noir
  // - tag : vert si "Nouveau", rouge si "Disponible", noir sinon
  const tagClass = offer.tag === 'Nouveau' ? 'text-vert' : offer.tag === 'Disponible' ? 'text-rouge' : 'text-noir';
  // - prix en noir
  // - paiement en vert
  return (
    <div
      ref={ref}
      className={`ac-offer-card ${visible ? 'ac-reveal' : ''}`}
      style={{ '--delay': `${delay}ms`, '--accent': offer.accent }}
    >
      <div className="ac-offer-top">
        <span className={`ac-offer-badge ${badgeClass}`}>{offer.badge}</span>
        <span className={`ac-offer-tag ${tagClass}`}>{offer.tag}</span>
      </div>
      <div className="ac-offer-location text-noir">
        <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
          <path d="M6 1a3.5 3.5 0 0 1 3.5 3.5C9.5 7.5 6 11 6 11S2.5 7.5 2.5 4.5A3.5 3.5 0 0 1 6 1z" stroke="currentColor" strokeWidth="1.2"/>
          <circle cx="6" cy="4.5" r="1" fill="currentColor"/>
        </svg>
        {offer.location}
      </div>
      <h3 className="ac-offer-title text-noir">{offer.title}</h3>
      <ul className="ac-offer-details">
        {offer.details.map((d, i) => (
          <li key={i} className="text-noir">
            <span className="ac-offer-dot" />
            {d}
          </li>
        ))}
      </ul>
      <div className="ac-offer-divider" />
      <div className="ac-offer-price-row">
        <div>
          <div className="ac-offer-price text-noir">{offer.price} <span className="ac-offer-unit">{offer.unit}</span></div>
          <div className="ac-offer-payment text-vert">{offer.payment}</div>
        </div>
        <button className="ac-offer-btn">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>
    </div>
  );
}

/* ─── Contact Card ─── */
function ContactCard() {
  const [ref, visible] = useReveal(0.1);
  return (
    <div ref={ref} className={`ac-contact-card ${visible ? 'ac-reveal' : ''}`} style={{ '--delay': '300ms' }}>
      <div className="ac-contact-logo">
        <span className="ac-logo-sip">SIP</span>
        <span className="ac-logo-ci">CI</span>
      </div>
      <p className="ac-contact-tagline">Société Internationale Plurisectorielle de Côte d'Ivoire</p>
      <div className="ac-contact-divider" />
      <div className="ac-contact-lines">
        <div className="ac-contact-line">
          <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
            <path d="M2 2h3l1.5 3-2 1.5a8 8 0 0 0 3 3L9 7.5l3 1.5v3a1 1 0 0 1-1 1C5 13 1 9 1 3a1 1 0 0 1 1-1z" stroke="currentColor" strokeWidth="1.2"/>
          </svg>
          <span>+225 07 59 89 03 58</span>
        </div>
        <div className="ac-contact-line">
          <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
            <path d="M1 3h12v8H1z" stroke="currentColor" strokeWidth="1.2" rx="1"/>
            <path d="M1 3l6 5 6-5" stroke="currentColor" strokeWidth="1.2"/>
          </svg>
          <span>sgiservices.com</span>
        </div>
        <div className="ac-contact-line">
          <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
            <path d="M7 1a4 4 0 0 1 4 4c0 3.5-4 8-4 8S3 8.5 3 5a4 4 0 0 1 4-4z" stroke="currentColor" strokeWidth="1.2"/>
            <circle cx="7" cy="5" r="1.2" fill="currentColor"/>
          </svg>
          <span>Abidjan, Côte d'Ivoire</span>
        </div>
        <div className="ac-contact-line">
          <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
            <path d="M2 2h3l1.5 3-2 1.5a8 8 0 0 0 3 3L9 7.5l3 1.5v3a1 1 0 0 1-1 1C5 13 1 9 1 3a1 1 0 0 1 1-1z" stroke="currentColor" strokeWidth="1.2"/>
          </svg>
          <span>05 74 93 97 37</span>
        </div>
      </div>
      <button className="ac-contact-btn">Nous contacter
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
      <div className="ac-contact-trust">
        <span className="ac-trust-dot" />
        Faites-nous confiance pour vos projets
      </div>
    </div>
  );
}

/* ─── Main Component ─── */
export default function ActivitiesSection() {
  const [headerRef, headerVisible] = useReveal(0.2);

  return (
    <section className="ac-root">

      {/* ── Section header ── */}
      <div ref={headerRef} className={`ac-header ${headerVisible ? 'ac-reveal' : ''}`} style={{ '--delay': '0ms' }}>
        <div className="ac-header-line" />
        <div className="ac-header-text">
          <h2 className="ac-main-title">Nos Activités</h2>
          <p className="ac-main-desc">
            Une entreprise polyvalente offrant des solutions complètes dans plusieurs domaines d'expertise pour accompagner votre réussite.
          </p>
        </div>
      </div>

      {/* ── Three-column layout ── */}
      <div className="ac-layout">

        {/* Left — Offers */}
        <div className="ac-col ac-col--left">
          <div className="ac-col-label">
            <span className="ac-col-dot" />
            Offres Foncières
          </div>
          {OFFERS.map((o, i) => <OfferCard key={o.id} offer={o} delay={i * 150} />)}
        </div>

        {/* Center — Masonry gallery */}
        <div className="ac-col ac-col--center">
          <div className="ac-masonry">
            {IMAGES.map((img, i) => (
              <MasonryItem key={i} img={img} delay={i * 80} />
            ))}
          </div>
        </div>

        {/* Right — Contact */}
        <div className="ac-col ac-col--right">
          <div className="ac-col-label">
            <span className="ac-col-dot" />
            Contact Rapide
          </div>
          <ContactCard />
          {/* Decorative stat */}
          <div className="ac-side-stats">
            <StatPill number="+15" label="Ans d'expérience" delay={400} />
            <StatPill number="+250" label="Biens gérés" delay={520} />
          </div>
        </div>

      </div>
    </section>
  );
}

function MasonryItem({ img, delay }) {
  const [ref, visible] = useReveal(0.05);
  return (
    <div
      ref={ref}
      className={`ac-masonry-item ${img.span ? `ac-masonry-item--${img.span}` : ''} ${visible ? 'ac-reveal' : ''}`}
      style={{ '--delay': `${delay}ms` }}
    >
      <img src={img.src} alt={img.alt} loading="lazy" decoding="async" />
      <div className="ac-masonry-overlay" />
      <span className="ac-masonry-label">{img.alt}</span>
    </div>
  );
}

function StatPill({ number, label, delay }) {
  const [ref, visible] = useReveal(0.1);
  return (
    <div ref={ref} className={`ac-stat-pill ${visible ? 'ac-reveal' : ''}`} style={{ '--delay': `${delay}ms` }}>
      <span className="ac-stat-num">{number}</span>
      <span className="ac-stat-lbl">{label}</span>
    </div>
  );
}