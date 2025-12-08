import React from "react";
import "./ServiceDetails.css";


export default function ServiceDetails({ service, whatsappNumber = "+229XXXXXXXX" }) {
  if (!service) return null;

  const handleOrder = (article) => {
    const phone = whatsappNumber.replace(/[^0-9+]/g, "");
    const titre = article.title || service.title;
    const desc = article.description || "";
    // construire le lien complet de l'article (si relatif, préfixer par origin)
    const origin = typeof window !== 'undefined' ? window.location.origin : '';
    const articleLink = article.link
      ? (article.link.startsWith('http') ? article.link : `${origin}${article.link}`)
      : `${origin}/services`;

    const message = `Bonjour, j'aimerais passer une commande concernant ${titre}. ${desc}\n\nLien: ${articleLink}\n\nPouvez-vous m'en dire plus ?`;
    const text = encodeURIComponent(message);
    const url = `https://wa.me/${phone.replace(/^\+/, "")}?text=${text}`;
    window.open(url, "_blank");
  };

  return (
    <>
    <div className="service-details">
      <h2 className="service-title">{service.title}</h2>
      <p className="service-description">{service.description}</p>

      <div className="articles-grid">
        {service.articles.map((a, i) => (
          <div key={i} id={`service-${a.id || i}`} className="article-card">
            {a.image && (
              <img src={a.image} alt={a.title || `${service.title} ${i}`} className="article-image" loading="lazy" decoding="async" />
            )}
            <h3 className="article-title">{a.title}</h3>
            <p className="article-desc">{a.description}</p>
            <button className="article-button" onClick={() => handleOrder(a)}>
              Commander
            </button>
          </div>
        ))}
      </div>
    </div>
    </>
  );
}
