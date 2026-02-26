import { useState, useEffect } from "react";

const activities = [
  { label: "IMMOBILIER", icon: "🏢" },
  { label: "BTP", icon: "🏗️" },
  { label: "TERTIAIRE", icon: "💼" },
  { label: "IMPRIMERIE", icon: "🖨️" },
  { label: "AGRO-PASTORAL", icon: "🌾" },
  { label: "AGRO-INDUSTRIEL", icon: "🏭" },
  { label: "IMPORT-EXPORT", icon: "🚢" },
];

const operations = [
  "L'acquisition, la location et la vente de tous biens meubles et immeubles.",
  "L'emprunt de toutes sommes auprès de tous établissements financiers avec possibilité de donner en garantie tout ou partie des biens sociaux.",
  "La prise en gérance de tous fonds de commerce.",
  "La prise de participation dans toute société existante ou devant être créée.",
  "Toute opération financière, commerciale, industrielle, mobilière et immobilière, se rapportant directement ou indirectement à l'objet social ou pouvant en faciliter l'extension ou le développement.",
];

const style = `
  @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Barlow:wght@300;400;600&display=swap');

  * { box-sizing: border-box; margin: 0; padding: 0; }

  .os-root {
    min-height: 100vh;
    background: #fff;
    font-family: 'Barlow', sans-serif;
    color: #111;
    overflow: hidden;
    position: relative;
  }

  /* Animated background grid */
  .os-root::before {
    content: '';
    position: fixed;
    inset: 0;
    background-image:
      linear-gradient(rgba(220,20,20,0.07) 1px, transparent 1px),
      linear-gradient(90deg, rgba(220,20,20,0.07) 1px, transparent 1px);
    background-size: 60px 60px;
    animation: gridSlide 20s linear infinite;
    z-index: 0;
  }

  @keyframes gridSlide {
    0% { background-position: 0 0; }
    100% { background-position: 60px 60px; }
  }

  /* Accent diagonal stripe */
  .os-stripe {
    position: fixed;
    top: -200px;
    right: -100px;
    width: 400px;
    height: 1200px;
    background: linear-gradient(to bottom, #dc1414, #1a7a1a);
    transform: rotate(-20deg);
    opacity: 0.08;
    z-index: 0;
    animation: stripeFloat 8s ease-in-out infinite alternate;
  }

  @keyframes stripeFloat {
    from { transform: rotate(-20deg) translateY(0); }
    to { transform: rotate(-20deg) translateY(40px); }
  }

  .os-container {
    position: relative;
    z-index: 1;
    max-width: 1000px;
    margin: 0 auto;
    padding: 60px 30px;
  }

  /* Header */
  .os-header {
    text-align: center;
    margin-bottom: 70px;
    animation: fadeDown 0.8s ease both;
  }

  @keyframes fadeDown {
    from { opacity: 0; transform: translateY(-30px); }
    to { opacity: 1; transform: translateY(0); }
  }

  .os-label {
    display: inline-block;
    background: #dc1414;
    color: #111;
    font-family: 'Bebas Neue', sans-serif;
    font-size: 12px;
    letter-spacing: 4px;
    padding: 6px 20px;
    margin-bottom: 20px;
    clip-path: polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%);
  }

  .os-title {
    font-family: 'Bebas Neue', sans-serif;
    font-size: clamp(36px, 6vw, 72px);
    line-height: 1;
    color: #111;
    letter-spacing: 4px;
  }

  .os-title span {
    color: #dc1414;
  }

  .os-subtitle {
    font-weight: 300;
    font-size: 13px;
    letter-spacing: 6px;
    color: black;
    margin-top: 12px;
    text-transform: uppercase;
  }

  .os-divider {
    width: 80px;
    height: 3px;
    background: linear-gradient(to right, #dc1414, #1a7a1a);
    margin: 24px auto 0;
    position: relative;
  }

  .os-divider::after {
    content: '';
    position: absolute;
    width: 8px;
    height: 8px;
    background: #fff;
    border-radius: 50%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    animation: pulse 2s ease-in-out infinite;
  }

  @keyframes pulse {
    0%, 100% { box-shadow: 0 0 0 0 rgba(255,255,255,0.4); }
    50% { box-shadow: 0 0 0 8px rgba(255,255,255,0); }
  }

  /* Section titles */
  .os-section-title {
    font-family: 'Bebas Neue', sans-serif;
    font-size: 18px;
    letter-spacing: 6px;
    color: black;
    text-transform: uppercase;
    margin-bottom: 28px;
    display: flex;
    align-items: center;
    gap: 14px;
  }

  .os-section-title::before {
    content: '';
    display: block;
    width: 24px;
    height: 2px;
    background: #dc1414;
  }

  /* Activities grid */
  .os-activities {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 16px;
    margin-bottom: 70px;
  }

  .os-activity-card {
    background: rgba(255,255,255,0.03);
    border: 1px solid rgba(255,255,255,0.07);
    padding: 22px 20px;
    position: relative;
    cursor: default;
    transition: all 0.35s ease;
    animation: fadeUp 0.6s ease both;
    overflow: hidden;
  }

  .os-activity-card::before {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 2px;
    background: linear-gradient(to right, #dc1414, #1a7a1a);
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 0.35s ease;
  }

  .os-activity-card::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, rgba(220,20,20,0.05), transparent);
    opacity: 0;
    transition: opacity 0.35s ease;
  }

  .os-activity-card:hover {
    border-color: rgba(220,20,20,0.4);
    transform: translateY(-4px);
    background: rgba(255,255,255,0.06);
  }

  .os-activity-card:hover::before { transform: scaleX(1); }
  .os-activity-card:hover::after { opacity: 1; }

  .os-activity-icon {
    font-size: 28px;
    margin-bottom: 10px;
    display: block;
    transition: transform 0.3s ease;
  }

  .os-activity-card:hover .os-activity-icon {
    transform: scale(1.2) rotate(-5deg);
  }

  .os-activity-name {
    font-family: 'Bebas Neue', sans-serif;
    font-size: 20px;
    letter-spacing: 3px;
    color: #111;
  }

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }

  /* Operations */
  .os-operations {
    margin-bottom: 60px;
  }

  .os-op-item {
    display: flex;
    gap: 20px;
    padding: 22px 0;
    border-bottom: 1px solid rgba(255,255,255,0.06);
    animation: fadeUp 0.6s ease both;
    transition: padding 0.25s ease;
  }

  .os-op-item:last-child { border-bottom: none; }

  .os-op-item:hover {
    padding-left: 10px;
  }

  .os-op-num {
    font-family: 'Bebas Neue', sans-serif;
    font-size: 42px;
    line-height: 1;
    color: rgba(220,20,20,0.2);
    min-width: 48px;
    transition: color 0.3s ease;
    flex-shrink: 0;
  }

  .os-op-item:hover .os-op-num {
    color: rgba(220,20,20,0.7);
  }

  .os-op-content {
    padding-top: 6px;
  }

  .os-op-dot {
    display: inline-block;
    width: 6px;
    height: 6px;
    background: #1a7a1a;
    border-radius: 50%;
    margin-right: 10px;
    vertical-align: middle;
    flex-shrink: 0;
  }

  .os-op-text {
    font-size: 15px;
    font-weight: 300;
    line-height: 1.7;
    color: #111;
  }

  /* Footer bar */
  .os-footer {
    border-top: 1px solid rgba(255,255,255,0.08);
    padding-top: 30px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 16px;
  }

  .os-footer-tag {
    font-family: 'Bebas Neue', sans-serif;
    font-size: 13px;
    letter-spacing: 4px;
    color: black;
  }

  .os-status {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 12px;
    color: green;
    letter-spacing: 2px;
    text-transform: uppercase;
  }

  .os-status-dot {
    width: 8px;
    height: 8px;
    background: #1a7a1a;
    border-radius: 50%;
    animation: blink 2s ease-in-out infinite;
  }

  @keyframes blink {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.3; }
  }

  .os-corner {
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 50px;
    height: 50px;
    z-index: 10;
  }

  .os-corner-svg rect {
    fill: none;
    stroke: #dc1414;
    stroke-width: 2;
    stroke-dasharray: 180;
    stroke-dashoffset: 180;
    animation: drawBorder 2s ease forwards 1s;
  }

  @keyframes drawBorder {
    to { stroke-dashoffset: 0; }
  }
`;

export default function ObjetSocial() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <>
      <style>{style}</style>
      <div className="os-root">
        <div className="os-stripe" />

        <div className="os-container">
          {/* Header */}
          <header className="os-header">
            <div className="os-label">Les activités de SIP-CI</div>
            <h1 className="os-title">
              RENSEIGNEMENTS<br />
              <span>RELATIFS</span> À
            </h1>
            <p className="os-subtitle">l'objet social & aux établissements</p>
            <div className="os-divider" />
          </header>

          {/* Activities */}
          <section style={{ marginBottom: 70 }}>
            <h2 className="os-section-title">Activités Exercées</h2>
            <div className="os-activities">
              {activities.map((a, i) => (
                <div
                  key={a.label}
                  className="os-activity-card"
                  style={{ animationDelay: `${0.1 * i + 0.3}s` }}
                >
                  <span className="os-activity-icon">{a.icon}</span>
                  <div className="os-activity-name">{a.label}</div>
                </div>
              ))}
            </div>
          </section>

          {/* Operations */}
          <section className="os-operations">
            <h2 className="os-section-title">Pour la réalisation de l'objet social</h2>
            {operations.map((op, i) => (
              <div
                key={i}
                className="os-op-item"
                style={{ animationDelay: `${0.1 * i + 0.6}s` }}
              >
                <div className="os-op-num">{String(i + 1).padStart(2, "0")}</div>
                <div className="os-op-content">
                  <span className="os-op-dot" />
                  <span className="os-op-text">{op}</span>
                </div>
              </div>
            ))}
          </section>

          {/* Footer */}
          <footer className="os-footer">
            <span className="os-footer-tag">Document Officiel · Objet Social</span>
            <div className="os-status">
              <div className="os-status-dot" />
              En vigueur
            </div>
          </footer>
        </div>

        {/* Decorative corner */}
        <div className="os-corner">
          <svg viewBox="0 0 50 50" className="os-corner-svg">
            <rect x="1" y="1" width="48" height="48" rx="4" />
          </svg>
        </div>
      </div>
    </>
  );
}