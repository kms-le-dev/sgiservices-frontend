import { useEffect, useRef, useState } from "react";

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,600;0,700;1,400&family=Jost:wght@300;400;500&display=swap');

  :root {
    --bg: #0e0c0a;
    --paper: #fff;
    --ink: #1c1712;
    --red: #c8380a;
    --gold: #c9973a;
    --muted: #7a6f62;
  }

  * { box-sizing: border-box; margin: 0; padding: 0; }

  body {
    background: var(--paper);
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: 'Jost', sans-serif;
    padding: 40px 20px;
  }

  .impr-wrapper {
    width: 100%;
    max-width: 900px;
    min-height: 70vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 0 auto;
    animation: wrapIn 0.8s cubic-bezier(.16,1,.3,1) both;
    box-sizing: border-box;
    padding: 0 10px;
  }

  @keyframes wrapIn {
    from { opacity: 0; transform: translateY(40px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  /* ── HEADER ── */
  .impr-page-header {
    text-align: center;
    margin-bottom: 48px;
    animation: fadeDown 0.7s 0.2s both;
  }

  @keyframes fadeDown {
    from { opacity: 0; transform: translateY(-20px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  .impr-eyebrow {
    display: block;
    font-size: 0.6rem;
    letter-spacing: 6px;
    text-transform: uppercase;
    color: var(--gold);
    margin-bottom: 12px;
    font-weight: 500;
  }

  .impr-page-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(2.8rem, 7vw, 5rem);
    font-weight: 700;
    color: var(--gold);
    letter-spacing: -1px;
    line-height: 1;
  }

  .impr-page-title em {
    font-style: italic;
    color: var(--gold);
  }

  .impr-title-line {
    display: block;
    width: 50px;
    height: 2px;
    background: linear-gradient(90deg, var(--red), var(--gold));
    margin: 18px auto 0;
    border-radius: 2px;
  }

  /* ── GRID ── */
  .impr-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
    width: 100%;
    max-width: 820px;
    margin: 0 auto;
  }

  /* ── CARD ── */
  .impr-img-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    opacity: 0;
    transform: translateY(50px) scale(0.96);
    transition: opacity 0.65s ease, transform 0.65s ease;
  }

  .impr-img-card.visible {
    opacity: 1;
    transform: translateY(0) scale(1);
  }

  /* ── IMAGE FRAME ── */
  .impr-img-frame {
    width: 90%;
    max-width: 210px;
    aspect-ratio: 3/4;
    overflow: hidden;
    position: relative;
    border-radius: 3px;
    box-shadow:
      0 4px 20px rgba(0,0,0,0.5),
      0 24px 60px rgba(0,0,0,0.4);
    cursor: pointer;
    margin: 0 auto;
  }

  .impr-img-frame::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(180deg, rgba(0,0,0,0) 40%, rgba(14,12,10,0.65) 100%);
    z-index: 1;
    transition: opacity 0.4s;
  }

  .impr-img-frame:hover::after { opacity: 0.5; }

  .impr-img-frame img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    filter: saturate(0.7) contrast(1.1) brightness(0.9);
    transition: transform 0.9s cubic-bezier(.23,1,.32,1), filter 0.4s ease;
  }

  .impr-img-frame:hover img {
    transform: scale(1.07);
    filter: saturate(1) contrast(1.05) brightness(1);
  }

  .impr-img-number {
    position: absolute;
    top: 14px;
    left: 14px;
    z-index: 2;
    font-family: 'Cormorant Garamond', serif;
    font-size: 0.7rem;
    color: var(--gold);
    letter-spacing: 3px;
    font-weight: 600;
  }

  /* ── TEXT BELOW ── */
  .impr-img-text {
    text-align: center;
    padding: 20px 6px 0;
    width: 100%;
  }

  .impr-img-text h2 {
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(1rem, 2.2vw, 1.4rem);
    font-weight: 800;
    color: var(--red);
    margin-bottom: 6px;
    line-height: 1.15;
  }

  .impr-sep {
    width: 22px;
    height: 1px;
    background: var(--gold);
    margin: 8px auto;
    opacity: 0.5;
  }

  .impr-subtitle-text {
    font-size: 0.65rem;
    color: black;
    letter-spacing: 2.5px;
    text-transform: uppercase;
    margin-bottom: 10px;
    font-weight: 800;
  }

  .impr-img-text ul {
    list-style: none;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  .impr-img-text li {
    font-size: clamp(0.65rem, 1.2vw, 0.78rem);
    color: var(--muted);
    font-weight: 300;
    line-height: 1.55;
    letter-spacing: 0.2px;
    transition: color 0.3s;
  }

  .impr-img-card:hover li { color: #9a8f82; }

  .impr-tag-row {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 5px;
    margin-top: 6px;
  }

  .impr-tag {
    font-family: 'Cormorant Garamond', serif;
    font-size: 0.72rem;
    font-weight: 700;
    color: var(--red);
    border: 1px solid rgba(200,56,10,0.35);
    padding: 2px 9px;
    border-radius: 2px;
    letter-spacing: 1.5px;
    transition: background 0.25s, color 0.25s, border-color 0.25s;
  }

  .impr-img-card:hover .impr-tag {
    background: var(--red);
    color: #fff;
    border-color: var(--red);
  }

  /* ── RESPONSIVE ── */
  @media (max-width: 640px) {
    .impr-grid { grid-template-columns: 1fr; gap: 40px; }
    .impr-img-frame { aspect-ratio: 16/9; }
  }
`;

const cards = [
  {
    num: "01",
    img: "https://images.unsplash.com/photo-1504270997636-07ddfbd48945?w=700",
    title: "Grand Tirage",
    subtitle: "Bâches publicitaires",
    items: ["Vinyles", "Microperforés", "Kakemonos"],
    tags: null,
  },
  {
    num: "02",
    img: "https://images.unsplash.com/photo-1562654501-a0ccc0fc3fb1?w=700",
    title: "Petit Tirage",
    subtitle: "Supports de communication",
    items: ["Flyers A6 · A5 · A4 · A3", "Cartes de visite", "Affiches promotionnelles"],
    tags: null,
  },
  {
    num: "03",
    img: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=700",
    title: "Plans & Documents",
    subtitle: "Techniques tous formats",
    items: null,
    tags: ["A0", "A1", "A2", "A3", "A4"],
  },
];

export default function ImprimerieCard() {
  const refs = useRef([]);
  const [visible, setVisible] = useState([]);

  useEffect(() => {
    const timers = [];
    refs.current.forEach((el, i) => {
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            timers.push(
              setTimeout(() => {
                setVisible(v => { const n = [...v]; n[i] = true; return n; });
              }, i * 180 + 350)
            );
            obs.disconnect();
          }
        },
        { threshold: 0.1 }
      );
      obs.observe(el);
    });
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <>
      <style>{css}</style>
      <div className="impr-wrapper">

        {/* HEADER */}
        <div className="impr-page-header">
          <span className="impr-eyebrow">Services professionnels</span>
          <h1 className="impr-page-title"><em>Imprimerie</em></h1>
          <span className="impr-title-line" />
        </div>

        {/* 3 IMAGES + TEXTES */}
        <div className="impr-grid">
          {cards.map((card, i) => (
            <div
              key={i}
              ref={el => refs.current[i] = el}
              className={`impr-img-card${visible[i] ? " visible" : ""}`}
            >
              {/* Image */}
              <div className="impr-img-frame">
                <span className="impr-img-number">{card.num}</span>
                <img src={card.img} alt={card.title} />
              </div>

              {/* Texte centré en dessous */}
              <div className="impr-img-text">
                <h2>{card.title}</h2>
                <div className="impr-sep" />
                <p className="impr-subtitle-text">{card.subtitle}</p>

                {card.items && (
                  <ul>
                    {card.items.map((item, j) => (
                      <li key={j}>{item}</li>
                    ))}
                  </ul>
                )}

                {card.tags && (
                  <div className="impr-tag-row">
                    {card.tags.map(t => (
                      <span key={t} className="impr-tag">{t}</span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

      </div>
    </>
  );
}