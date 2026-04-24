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
      "2 km du centre ville d'Alepé",
      '2 km du goudron (route Montezo–Alepé)',
      'Site décapé · Projet de tours',
    ],
    price: '3 000',
    unit: 'FCFA / m²',
    payment: 'Paiement échelonné sur 12 mois',
    tag: 'Nouveau',
    color: '#0057FF',
  },
  {
    id: 'B',
    badge: 'Attestation villageoise',
    location: 'Yamoussoukro',
    title: 'Terrain proche aéroport',
    details: [
      "2 km de l'aéroport de Yamoussoukro",
      'Attestation villageoise incluse',
      'Titre en cours de régularisation',
    ],
    price: '500 000',
    unit: 'FCFA',
    payment: 'Ou 1 500 000 FCFA sur 12 mois',
    tag: 'Disponible',
    color: '#00B86B',
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
function useReveal(threshold = 0.12) {
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

/* ─── Counter animation ─── */
function useCounter(target, duration = 1200, active = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!active) return;
    const num = parseInt(target.replace(/\D/g, ''), 10);
    let start = null;
    const step = (ts) => {
      if (!start) start = ts;
      const prog = Math.min((ts - start) / duration, 1);
      const ease = 1 - Math.pow(1 - prog, 3);
      setCount(Math.floor(ease * num));
      if (prog < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [active, target, duration]);
  const prefix = target.startsWith('+') ? '+' : '';
  return prefix + count;
}

/* ─── Offer Card ─── */
function OfferCard({ offer, delay }) {
  const [ref, visible] = useReveal(0.1);
  const tagColor = offer.tag === 'Nouveau' ? '#0057FF' : '#00B86B';

  return (
    <div
      ref={ref}
      className={`ac-offer-card ${visible ? 'ac-reveal' : ''}`}
      style={{ '--delay': `${delay}ms`, '--card-color': offer.color }}
    >
      <div className="ac-offer-top">
        <span className="ac-offer-badge" style={{ color: offer.color, borderColor: offer.color + '33', background: offer.color + '10' }}>
          {offer.badge}
        </span>
        <span className="ac-offer-tag" style={{ color: tagColor }}>
          <span className="ac-tag-dot" style={{ background: tagColor }} />
          {offer.tag}
        </span>
      </div>
      <div className="ac-offer-location">
        <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
          <path d="M6 1a3.5 3.5 0 0 1 3.5 3.5C9.5 7.5 6 11 6 11S2.5 7.5 2.5 4.5A3.5 3.5 0 0 1 6 1z" stroke={offer.color} strokeWidth="1.4"/>
          <circle cx="6" cy="4.5" r="1" fill={offer.color}/>
        </svg>
        {offer.location}
      </div>
      <h3 className="ac-offer-title">{offer.title}</h3>
      <ul className="ac-offer-details">
        {offer.details.map((d, i) => (
          <li key={i}>
            <span className="ac-offer-dot" style={{ background: offer.color }} />
            {d}
          </li>
        ))}
      </ul>
      <div className="ac-offer-divider" />
      <div className="ac-offer-price-row">
        <div>
          <div className="ac-offer-price" style={{ color: offer.color }}>
            {offer.price} <span className="ac-offer-unit">{offer.unit}</span>
          </div>
          <div className="ac-offer-payment">{offer.payment}</div>
        </div>
        <button className="ac-offer-btn" style={{ '--btn-color': offer.color }}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
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
    <div ref={ref} className={`ac-contact-card ${visible ? 'ac-reveal' : ''}`} style={{ '--delay': '200ms' }}>
      <div className="ac-contact-logo">
        <span className="ac-logo-sip">SIP</span>
        <span className="ac-logo-ci">CI</span>
      </div>
      <p className="ac-contact-tagline">Société Internationale Plurisectorielle de Côte d'Ivoire</p>
      <div className="ac-contact-divider" />
      <div className="ac-contact-lines">
        {[
          { icon: 'phone', text: '+225 07 59 89 03 58' },
          { icon: 'web', text: 'sgiservices.com' },
          { icon: 'pin', text: 'Abidjan, Côte d\'Ivoire' },
          { icon: 'phone', text: '05 74 93 97 37' },
        ].map(({ icon, text }, i) => (
          <div className="ac-contact-line" key={i}>
            <span className="ac-line-icon">
              {icon === 'phone' && (
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M2 2h3l1.5 3-2 1.5a8 8 0 0 0 3 3L9 7.5l3 1.5v3a1 1 0 0 1-1 1C5 13 1 9 1 3a1 1 0 0 1 1-1z" stroke="currentColor" strokeWidth="1.3"/>
                </svg>
              )}
              {icon === 'web' && (
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M1 3h12v8H1z" stroke="currentColor" strokeWidth="1.3" rx="1"/>
                  <path d="M1 3l6 5 6-5" stroke="currentColor" strokeWidth="1.3"/>
                </svg>
              )}
              {icon === 'pin' && (
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M7 1a4 4 0 0 1 4 4c0 3.5-4 8-4 8S3 8.5 3 5a4 4 0 0 1 4-4z" stroke="currentColor" strokeWidth="1.3"/>
                  <circle cx="7" cy="5" r="1.2" fill="currentColor"/>
                </svg>
              )}
            </span>
            <span>{text}</span>
          </div>
        ))}
      </div>
      <button className="ac-contact-btn">
        Nous contacter
        <svg width="15" height="15" viewBox="0 0 14 14" fill="none">
          <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
      <div className="ac-contact-trust">
        <span className="ac-trust-dot" />
        Faites-nous confiance pour vos projets
      </div>
    </div>
  );
}

/* ─── Masonry Item ─── */
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

/* ─── Stat Pill ─── */
function StatPill({ number, label, delay, color }) {
  const [ref, visible] = useReveal(0.1);
  const count = useCounter(number, 1400, visible);
  return (
    <div ref={ref} className={`ac-stat-pill ${visible ? 'ac-reveal' : ''}`} style={{ '--delay': `${delay}ms`, '--pill-color': color }}>
      <span className="ac-stat-num" style={{ color }}>{count}</span>
      <span className="ac-stat-lbl">{label}</span>
    </div>
  );
}

/* ─── Main Component ─── */
export default function ActivitiesSection() {
  const [headerRef, headerVisible] = useReveal(0.15);

  return (
    <section className="ac-root">

      {/* ── Header ── */}
      <div ref={headerRef} className={`ac-header ${headerVisible ? 'ac-reveal' : ''}`} style={{ '--delay': '0ms' }}>
        <div className="ac-header-eyebrow">
          <span className="ac-eyebrow-line" />
          <span className="ac-eyebrow-text">SIP-CI</span>
          <span className="ac-eyebrow-line" />
        </div>
        <h2 className="ac-main-title">Nos <em>Activités</em></h2>
        <p className="ac-main-desc">
          Une entreprise polyvalente offrant des solutions complètes dans plusieurs domaines d'expertise pour accompagner votre réussite.
        </p>
      </div>

      {/* ── Layout ── */}
      <div className="ac-layout">

        {/* Left — Offers */}
        <div className="ac-col ac-col--left">
          <div className="ac-col-label">
            <span className="ac-col-dot" style={{ background: '#0057FF' }} />
            Offres Foncières
          </div>
          {OFFERS.map((o, i) => <OfferCard key={o.id} offer={o} delay={i * 160} />)}
        </div>

        {/* Center — Gallery */}
        <div className="ac-col ac-col--center">
          <div className="ac-col-label">
            <span className="ac-col-dot" style={{ background: '#FF3A00' }} />
            Galerie Projets
          </div>
          <div className="ac-masonry">
            {IMAGES.map((img, i) => (
              <MasonryItem key={i} img={img} delay={i * 70} />
            ))}
          </div>
        </div>

        {/* Right — Contact */}
        <div className="ac-col ac-col--right">
          <div className="ac-col-label">
            <span className="ac-col-dot" style={{ background: '#FF3A00' }} />
            Contact Rapide
          </div>
          <ContactCard />
          <div className="ac-side-stats">
            <StatPill number="+15" label="Ans d'expérience" delay={400} color="#0057FF" />
            <StatPill number="+250" label="Biens gérés" delay={520} color="#00B86B" />
          </div>
        </div>

      </div>
    </section>
  );
}