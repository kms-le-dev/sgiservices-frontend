import { useEffect, useRef, useState } from "react";
import "./NosServices.css";
import { Link } from "react-router-dom";

const activities = [
  { label: "Immobilier",      sub: "Achat · Vente · Location",         color: "green", num: "01" },
  { label: "BTP",             sub: "Construction & Rénovation",         color: "red",   num: "02" },
  { label: "Tertiaire",       sub: "Services aux entreprises",          color: "black", num: "03" },
  { label: "Imprimerie",      sub: "Offset · Numérique · Grand format", color: "red",   num: "04" },
  { label: "Agro-Pastoral",   sub: "Élevage & Agriculture",             color: "green", num: "05" },
  { label: "Agro-Industriel", sub: "Transformation & Production",       color: "black", num: "06" },
  { label: "Import-Export",   sub: "Commerce international",            color: "green", num: "07" },
];

const operations = [
  { short: "Acquisition & Cession", color: "green", text: "L'acquisition, la location et la vente de tous biens meubles et immeubles." },
  { short: "Financement",           color: "red",   text: "L'emprunt de toutes sommes auprès de tous établissements financiers avec possibilité de donner en garantie tout ou partie des biens sociaux." },
  { short: "Gestion de Fonds",      color: "black", text: "La prise en gérance de tous fonds de commerce." },
  { short: "Participations",        color: "green", text: "La prise de participation dans toute société existante ou devant être créée." },
  { short: "Développement",         color: "red",   text: "Toute opération financière, commerciale, industrielle, mobilière et immobilière." },
];

const PARTICLES = Array.from({ length: 20 }, (_, i) => ({
  id: i,
  left: `${Math.random() * 100}%`,
  duration: `${10 + Math.random() * 20}s`,
  delay: `${Math.random() * 5}s`,
}));

/* ── useReveal ── */
function useReveal(threshold = 0.12) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let isMobile = false;
    try {
      isMobile = window.matchMedia(
        "(max-width: 900px), (hover: none), (pointer: coarse)"
      ).matches;
    } catch (e) {
      isMobile = window.innerWidth <= 900;
    }

    if (isMobile || !("IntersectionObserver" in window)) {
      setVisible(true);
      return;
    }

    const el = ref.current;
    if (!el) return;

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold }
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return [ref, visible];
}  // ← accolade fermante de useReveal

/* ── SplitTitle ── */
function SplitTitle({ text, colorMap = {} }) {
  const [ref, visible] = useReveal(0.2);
  return (
    <span ref={ref} className="split-title">
      {text.split(" ").map((word, i) => (
        <span className="split-word-wrap" key={i}>
          <span
            className={`split-word ${visible ? "split-word--in" : ""} ${colorMap[word] || ""}`}
            style={{ transitionDelay: `${i * 100}ms` }}
          >
            {word}
          </span>
        </span>
      ))}
    </span>
  );
}

/* ── Counter ── */
function Counter({ target, started }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!started) return;
    const duration = 1800;
    const now = () => typeof performance !== "undefined" ? performance.now() : Date.now();
    const startTime = now();
    let rafId;
    const animate = () => {
      const progress = Math.min((now() - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(eased * target));
      if (progress < 1) rafId = requestAnimationFrame(animate);
    };
    rafId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafId);
  }, [started, target]);

  return count;
}

/* ── ActivityCard ── */
function ActivityCard({ item, index }) {
  const [ref, visible] = useReveal(0.1);
  return (
    <Link
      to="/services"
      ref={ref}
      className={`ns-card ns-card--${item.color} ${visible ? "ns-reveal" : ""}`}
      style={{ transitionDelay: `${index * 80}ms`, textDecoration: "none", color: "inherit", cursor: "pointer" }}
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const rotateX = -(e.clientY - rect.top - rect.height / 2) / 16;
        const rotateY = (e.clientX - rect.left - rect.width / 2) / 16;
        e.currentTarget.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
      }}
      onMouseLeave={(e) => { e.currentTarget.style.transform = ""; }}
    >
      <div className="ns-card-glow" />
      <div className="ns-card-number">{item.num}</div>
      <div className="ns-card-content">
        <h3>{item.label}</h3>
        <p>{item.sub}</p>
      </div>
      <div className="ns-arrow">→</div>
    </Link>
  );
}

/* ── OperationRow ── */
function OperationRow({ op, index }) {
  const [ref, visible] = useReveal(0.08);
  return (
    <div
      ref={ref}
      className={`ns-operation ns-operation--${op.color} ${visible ? "ns-reveal" : ""}`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <div className="ns-operation-left">
        <span>{String(index + 1).padStart(2, "0")}</span>
      </div>
      <div className="ns-operation-content">
        <h4>{op.short}</h4>
        <p>{op.text}</p>
      </div>
    </div>
  );
}

/* ── NosServices ── */
export default function NosServices() {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [headerRef, headerVisible] = useReveal(0.15);
  const [statsRef, statsVisible] = useReveal(0.2);

  useEffect(() => {
    if (window.matchMedia("(hover: none)").matches) return;
    const move = (e) => setMouse({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  return (
    <div className="ns-root" style={{ minHeight: "100vh", background: "var(--bg)", opacity: 1, visibility: "visible" }}>

      <div className="ns-mouse-glow" style={{ left: mouse.x, top: mouse.y }} />

      <div className="ns-particles">
        {PARTICLES.map((p) => (
          <span key={p.id} style={{ left: p.left, animationDuration: p.duration, animationDelay: p.delay }} />
        ))}
      </div>

      <div className="ns-top-bar">
        <div className="green" />
        <div className="white" />
        <div className="red" />
      </div>

      <header ref={headerRef} className={`ns-header ${headerVisible ? "ns-reveal" : ""}`}>
        <div className="ns-badge">
          <span />
          Société Internationale Plurisectorielle
        </div>
        <div className="ns-title-imgs">
          <img src="/btp1.png" alt="BTP gauche" className="ns-title-img ns-title-img--left" onError={(e) => { e.currentTarget.style.display = "none"; }} />
          <h1 className="ns-title">
            <SplitTitle text="Renseignements Relatifs" colorMap={{ Relatifs: "red-text" }} />
            <br />
            <SplitTitle text="à SIP CI" colorMap={{ SIP: "green-text", CI: "black-text" }} />
          </h1>
          <img src="/btp2.png" alt="BTP droite" className="ns-title-img ns-title-img--right" onError={(e) => { e.currentTarget.style.display = "none"; }} />
        </div>
        <p className="ns-description">
          Société internationale spécialisée dans plusieurs secteurs
          d'activités stratégiques contribuant au développement économique
          et industriel de la Côte d'Ivoire.
        </p>
      </header>

      <section ref={statsRef} className="ns-stats">
        {[
          { num: 7,  label: "Domaines",         color: "green" },
          { num: 15, label: "Ans d'expérience", color: "red"   },
          { num: 5,  label: "Opérations",        color: "black" },
        ].map((item, i) => (
          <div
            key={i}
            className={`ns-stat ns-stat--${item.color} ${statsVisible ? "ns-reveal" : ""}`}
            style={{ transitionDelay: `${i * 120}ms` }}
          >
            <h2><Counter target={item.num} started={statsVisible} /></h2>
            <span>{item.label}</span>
          </div>
        ))}
      </section>

      <section className="ns-section">
        <div className="ns-section-top">
          <h2>Activités <span>Exercées</span></h2>
          <div className="line" />
        </div>
        <div className="ns-grid">
          {activities.map((item, index) => (
            <ActivityCard key={item.label} item={item} index={index} />
          ))}
        </div>
      </section>

      <section className="ns-section">
        <div className="ns-section-top">
          <h2>Opérations <span>Sociales</span></h2>
          <div className="line" />
        </div>
        <div className="ns-operations">
          {operations.map((op, index) => (
            <OperationRow key={index} op={op} index={index} />
          ))}
        </div>
      </section>

      <footer className="ns-footer">
        <h2>
          <span className="green-text">SIP</span>
          <span className="red-text">-</span>
          <span className="black-text">CI</span>
        </h2>
        <p>Entreprise Multisectorielle</p>
      </footer>

    </div>
  );
}