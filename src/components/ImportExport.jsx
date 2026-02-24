import React, { useEffect, useRef, useState } from "react";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700;900&display=swap');

  * { box-sizing: border-box; margin: 0; padding: 0; }

  body {
    background: #fff;
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: 'Montserrat', Arial, sans-serif;
    padding: 20px;
  }

  .ie-card {
    width: 100%;
    max-width: 480px;
    min-height: 700px;
    background: #fff;
    border-radius: 20px;
    overflow: hidden;
    box-shadow: 0 30px 80px rgba(0,0,0,0.4);
    animation: cardIn 0.8s cubic-bezier(.23,1.05,.58,1) both;
  }

  @keyframes cardIn {
    from { opacity: 0; transform: translateY(60px) scale(0.96); }
    to   { opacity: 1; transform: translateY(0) scale(1); }
  }

  /* ── IMAGE ── */
  .ie-image-wrap {
    position: relative;
    width: 100%;
    height: 280px;
    overflow: hidden;
  }

  .ie-image-wrap img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transform: scale(1.08);
    animation: zoomOut 1.2s 0.3s cubic-bezier(.23,1,.32,1) forwards;
  }

  @keyframes zoomOut {
    to { transform: scale(1); }
  }

  .ie-image-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(
      to bottom,
      rgba(196,0,0,0.15) 0%,
      rgba(0,0,0,0.55) 100%
    );
  }

  .ie-badge {
    position: absolute;
    top: 18px;
    right: 18px;
    background: #c40000;
    color: #fff;
    font-size: 0.7rem;
    font-weight: 700;
    letter-spacing: 2px;
    padding: 5px 12px;
    border-radius: 30px;
    text-transform: uppercase;
    box-shadow: 0 4px 14px rgba(196,0,0,0.5);
    animation: fadeSlideLeft 0.7s 0.9s both;
  }

  @keyframes fadeSlideLeft {
    from { opacity: 0; transform: translateX(20px); }
    to   { opacity: 1; transform: translateX(0); }
  }

  /* ── TITLE ── */
  .ie-title {
    background: #c40000;
    padding: 18px 24px;
    text-align: center;
    position: relative;
    overflow: hidden;
  }

  .ie-title::after {
    content: '';
    position: absolute;
    inset: 0;
    background: #fff;
    animation: shimmer 2.5s infinite;
  }

  @keyframes shimmer {
    from { transform: translateX(-100%); }
    to   { transform: translateX(100%); }
  }

  .ie-title h1 {
    color: #fff;
    font-size: 2rem;
    font-weight: 900;
    letter-spacing: 4px;
    text-transform: uppercase;
    line-height: 1.15;
    animation: titleIn 0.7s 0.5s both;
  }

  @keyframes titleIn {
    from { opacity: 0; transform: translateY(-16px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  /* ── CONTENT ── */
  .ie-content {
    padding: 24px 28px 30px;
    background: #fff;
  }

  .ie-item {
    display: flex;
    gap: 14px;
    align-items: flex-start;
    padding: 14px 0;
    border-bottom: 1px solid #f0f0f0;
    opacity: 0;
    transform: translateX(-30px);
    transition: opacity 0.5s ease, transform 0.5s ease;
  }

  .ie-item:last-child { border-bottom: none; }

  .ie-item.visible {
    opacity: 1;
    transform: translateX(0);
  }

  .ie-num {
    flex-shrink: 0;
    width: 32px;
    height: 32px;
    background: #c40000;
    color: #fff;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.85rem;
    font-weight: 700;
    margin-top: 2px;
    box-shadow: 0 4px 12px rgba(196,0,0,0.3);
  }

  .ie-item-body strong {
    display: block;
    color: #1a1a2e;
    font-size: 0.95rem;
    font-weight: 700;
    margin-bottom: 5px;
  }

  .ie-item-body ul {
    list-style: none;
    padding: 0;
  }

  .ie-item-body ul li {
    font-size: 0.83rem;
    color: #555;
    line-height: 1.6;
    padding-left: 14px;
    position: relative;
  }

  .ie-item-body ul li::before {
    content: '›';
    position: absolute;
    left: 0;
    color: #c40000;
    font-weight: 700;
  }

  @media (max-width: 500px) {
    .ie-image-wrap { height: 200px; }
    .ie-title h1 { font-size: 1.5rem; letter-spacing: 2px; }
    .ie-content { padding: 18px 16px 24px; }
  }
`;

const items = [
  {
    title: "Achats et approvisionnement à l'international",
    bullets: ["Achat de produits auprès de fournisseurs étrangers."],
  },
  {
    title: "Vente et commercialisation",
    bullets: [
      "Vente de produits sur les marchés locaux et internationaux.",
      "Prospection de nouveaux clients et gestion de la relation client.",
    ],
  },
  {
    title: "Logistique et transport international",
    bullets: [
      "Organisation du transport des marchandises (maritime, aérien, routier).",
      "Gestion des formalités douanières et documents d'expédition.",
    ],
  },
  {
    title: "Gestion administrative et financière",
    bullets: ["Gestion des devises et des transactions internationales."],
  },
  {
    title: "Veille et conformité réglementaire",
    bullets: [
      "Respect des réglementations douanières et fiscales.",
      "Analyse du marché et identification des opportunités commerciales internationales.",
    ],
  },
];

export default function ImportExport() {
  const refs = useRef([]);
  const [visible, setVisible] = useState([]);

  useEffect(() => {
    const observers = refs.current.map((el, i) => {
      if (!el) return null;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              setVisible((v) => {
                const next = [...v];
                next[i] = true;
                return next;
              });
            }, i * 120);
            obs.disconnect();
          }
        },
        { threshold: 0.2 }
      );
      obs.observe(el);
      return obs;
    });
    return () => observers.forEach((o) => o && o.disconnect());
  }, []);

  return (
    <>
      <style>{styles}</style>
      <div className="ie-card">
        {/* Image grande */}
        <div className="ie-image-wrap">
          <img
            src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=900"
            alt="Import Export"
          />
          <div className="ie-image-overlay" />
          <span className="ie-badge">Commerce mondial</span>
        </div>

        {/* Titre */}
        <div className="ie-title">
          <h1>IMPORT – EXPORT</h1>
        </div>

        {/* Contenu animé */}
        <div className="ie-content">
          {items.map((item, i) => (
            <div
              key={i}
              ref={(el) => (refs.current[i] = el)}
              className={`ie-item${visible[i] ? " visible" : ""}`}
            >
              <div className="ie-num">{i + 1}</div>
              <div className="ie-item-body">
                <strong>{item.title}</strong>
                <ul>
                  {item.bullets.map((b, j) => (
                    <li key={j}>{b}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}