import { useState, useEffect, useRef } from "react";
import "./NosServices.css";

/* ════════════════════════════════════════
   DATA
════════════════════════════════════════ */
const activities = [
  { label: "Immobilier",      sub: "Achat · Vente · Location",          color: "green",  num: "01" },
  { label: "BTP",             sub: "Construction & Rénovation",          color: "red",    num: "02" },
  { label: "Tertiaire",       sub: "Services aux entreprises",           color: "black",  num: "03" },
  { label: "Imprimerie",      sub: "Offset · Numérique · Grand format",  color: "red",    num: "04" },
  { label: "Agro-Pastoral",   sub: "Élevage & Agriculture",              color: "green",  num: "05" },
  { label: "Agro-Industriel", sub: "Transformation & Production",        color: "black",  num: "06" },
  { label: "Import-Export",   sub: "Commerce international",             color: "green",  num: "07" },
];

const operations = [
  {
    short: "Acquisition & Cession",
    color: "green",
    text: "L'acquisition, la location et la vente de tous biens meubles et immeubles.",
  },
  {
    short: "Financement",
    color: "red",
    text: "L'emprunt de toutes sommes auprès de tous établissements financiers avec possibilité de donner en garantie tout ou partie des biens sociaux.",
  },
  {
    short: "Gestion de Fonds",
    color: "black",
    text: "La prise en gérance de tous fonds de commerce.",
  },
  {
    short: "Participations",
    color: "green",
    text: "La prise de participation dans toute société existante ou devant être créée.",
  },
  {
    short: "Développement",
    color: "red",
    text: "Toute opération financière, commerciale, industrielle, mobilière et immobilière, se rapportant directement ou indirectement à l'objet social ou pouvant en faciliter l'extension ou le développement.",
  },
];

/* ════════════════════════════════════════
   HOOKS
════════════════════════════════════════ */
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

/* Typewriter for a single string */
function useTypewriter(text, started, speed = 38) {
  const [displayed, setDisplayed] = useState("");
  useEffect(() => {
    if (!started) return;
    setDisplayed("");
    let i = 0;
    const id = setInterval(() => {
      i++;
      setDisplayed(text.slice(0, i));
      if (i >= text.length) clearInterval(id);
    }, speed);
    return () => clearInterval(id);
  }, [started, text, speed]);
  return displayed;
}

/* ════════════════════════════════════════
   SUB-COMPONENTS
════════════════════════════════════════ */

/* Animated split title — each word slides in individually */
function SplitTitle({ text, className, colorMap = {} }) {
  const [ref, visible] = useReveal(0.2);
  const words = text.split(" ");
  return (
    <span ref={ref} className={`split-title ${className || ""}`} aria-label={text}>
      {words.map((word, i) => (
        <span key={i} className="split-word-wrap">
          <span
            className={`split-word ${visible ? "split-word--in" : ""} ${colorMap[word] || ""}`}
            style={{ transitionDelay: `${i * 80}ms` }}
          >
            {word}
          </span>
        </span>
      ))}
    </span>
  );
}

/* Animated number counter */
function Counter({ target, suffix = "", started }) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!started) return;
    const dur = 1600;
    const start = performance.now();
    const tick = (now) => {
      const p = Math.min((now - start) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(Math.round(eased * target));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [started, target]);
  return <>{val}{suffix}</>;
}

/* Activity card */
function ActivityCard({ item, index }) {
  const [ref, visible] = useReveal(0.05);
  const [hovered, setHovered] = useState(false);
  // Mapping activité -> id d'ancre du bouton correspondant dans Services
  let anchor = "#";
  switch (item.label) {
    case "Immobilier":
    case "BTP":
      anchor = "/services#btn-btp-immobilier";
      break;
    case "Tertiaire":
    case "Agro-Industriel":
    case "Agro-Pastoral":
      anchor = "/services#btn-divers";
      break;
    case "Imprimerie":
      anchor = "/services#btn-imprimerie";
      break;
    case "Import-Export":
      anchor = "/services#btn-import-export";
      break;
    default:
      anchor = `/services#btn-${item.label.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;
  }
  return (
    <a
      href={anchor}
      ref={ref}
      className={`ns-act-card ns-act-card--${item.color} ${visible ? "ns-reveal" : ""}`}
      style={{ "--delay": `${index * 75}ms`, textDecoration: 'none', cursor: 'pointer' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Color accent bar left */}
      <div className="ns-act-accent" />

      {/* Number */}
      <span className="ns-act-num">{item.num}</span>

      {/* Body */}
      <div className="ns-act-body">
        <div className="ns-act-label">{item.label}</div>
        <div className="ns-act-sub">{item.sub}</div>
      </div>

      {/* Arrow */}
      <svg
        className={`ns-act-arrow ${hovered ? "ns-act-arrow--show" : ""}`}
        width="16" height="16" viewBox="0 0 16 16" fill="none"
      >
        <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </a>
  );
}

/* Operation row with typewriter on hover */
function OperationRow({ op, index }) {
  const [ref, visible] = useReveal(0.08);
  const [hovered, setHovered] = useState(false);
  const typed = useTypewriter(op.text, hovered, 22);

  return (
    <div
      ref={ref}
      className={`ns-op-row ns-op-row--${op.color} ${visible ? "ns-reveal" : ""}`}
      style={{ "--delay": `${index * 100}ms` }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="ns-op-left">
        <div className="ns-op-index">{String(index + 1).padStart(2, "0")}</div>
        <div className="ns-op-color-bar" />
      </div>
      <div className="ns-op-body">
        <div className="ns-op-short">{op.short}</div>
        <p className="ns-op-text">
          {hovered ? typed : op.text}
          {hovered && typed.length < op.text.length && (
            <span className="ns-cursor">|</span>
          )}
        </p>
      </div>
    </div>
  );
}

/* ════════════════════════════════════════
   MAIN COMPONENT
════════════════════════════════════════ */
export default function NosServices() {
  const [headerRef, headerVisible] = useReveal(0.15);
  const [statsRef, statsVisible]   = useReveal(0.3);

  return (
    <div className="ns-root">

      {/* Watermark */}
      <div className="ns-watermark" aria-hidden="true">SIP-CI</div>

      {/* ── TOP COLOR BAR ── */}
      <div className="ns-top-bar">
        <div className="ns-top-bar__green" />
        <div className="ns-top-bar__white" />
        <div className="ns-top-bar__red" />
      </div>

      {/* ── HEADER ── */}
      <header
        ref={headerRef}
        className={`ns-header ${headerVisible ? "ns-reveal" : ""}`}
        style={{ "--delay": "0ms" }}
      >
        <div className="ns-eyebrow">
          <span className="ns-eyebrow__dash ns-eyebrow__dash--green" />
          <span className="ns-eyebrow__text">Objet social &amp; Établissements</span>
          <span className="ns-eyebrow__dash ns-eyebrow__dash--red" />
        </div>

        <h1 className="ns-main-title">
          <SplitTitle
            text="Renseignements Relatifs"
            colorMap={{ Relatifs: "ns-word--red" }}
          />
          <br />
          <SplitTitle
            text="à SIP CI"
            colorMap={{ SIP: "ns-word--green", CI: "ns-word--black" }}
          />
        </h1>

        <p className="ns-header-desc">
          Société Internationale Plurisectorielle de{" "}
          <strong className="ns-hl--green">Côte d'Ivoire</strong> —
          une structure multisectorielle au service du{" "}
          <strong className="ns-hl--red">développement économique</strong> ivoirien.
        </p>

        <div className="ns-header-badge">
          <span className="ns-badge-dot" />
          Statut : <strong>En vigueur</strong>
        </div>
      </header>

      {/* ── STATS ROW ── */}
      <div ref={statsRef} className="ns-stats-row">
        {[
          { n: 7,  suf: "",  label: "Domaines d'activité", color: "green" },
          { n: 15, suf: "+", label: "Ans d'expérience",    color: "red"   },
          { n: 5,  suf: "",  label: "Opérations sociales", color: "black" },
        ].map((s, i) => (
          <div key={i} className={`ns-stat ns-stat--${s.color} ${statsVisible ? "ns-reveal" : ""}`}
            style={{ "--delay": `${i * 140}ms` }}>
            <div className="ns-stat__num">
              <Counter target={s.n} suffix={s.suf} started={statsVisible} />
            </div>
            <div className="ns-stat__label">{s.label}</div>
          </div>
        ))}
      </div>

      {/* ── RULE ── */}
      <div className="ns-rule" role="separator">
        <span className="ns-rule__line" />
        <span className="ns-rule__trio">
          <span className="ns-rule__dot ns-rule__dot--green" />
          <span className="ns-rule__dot ns-rule__dot--white" />
          <span className="ns-rule__dot ns-rule__dot--red" />
        </span>
        <span className="ns-rule__line" />
      </div>

      {/* ── ACTIVITIES ── */}
      <section className="ns-section">
        <div className="ns-section-header ns-reveal" style={{ "--delay": "0ms" }}>
          <h2 className="ns-section-title">
            Activités <span className="ns-word--green">Exercées</span>
          </h2>
          <span className="ns-section-count">{activities.length} domaines</span>
        </div>

        <div className="ns-act-grid">
          {activities.map((a, i) => (
            <ActivityCard key={a.label} item={a} index={i} />
          ))}
        </div>
      </section>

      {/* ── OPERATIONS ── */}
      <section className="ns-section">
        <div className="ns-section-header">
          <h2 className="ns-section-title">
            Pour la <span className="ns-word--red">Réalisation</span> de l'Objet Social
          </h2>
          <span className="ns-section-count">{operations.length} opérations</span>
        </div>
        <p className="ns-op-hint">Survolez une ligne pour l'animer ↓</p>
        <div className="ns-op-list">
          {operations.map((op, i) => (
            <OperationRow key={i} op={op} index={i} />
          ))}
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="ns-footer">
        <div className="ns-footer-left">
          <span className="ns-footer-logo">
            <em className="ns-word--green">SIP</em>
            <em className="ns-word--red">‑</em>
            <em className="ns-word--black">CI</em>
          </span>
          <span className="ns-footer-sub">Document Officiel · Objet Social</span>
        </div>
        <div className="ns-footer-right">
          <span className="ns-status-dot" />
          <span className="ns-status-text">En vigueur</span>
        </div>
      </footer>

      {/* ── BOTTOM COLOR BAR ── */}
      <div className="ns-top-bar ns-top-bar--bottom">
        <div className="ns-top-bar__green" />
        <div className="ns-top-bar__white" />
        <div className="ns-top-bar__red" />
      </div>

    </div>
  );
}