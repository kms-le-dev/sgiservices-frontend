import React, { useEffect, useState, useRef } from "react";
import { api } from "../services/api";
import "./Gallery.css"; // CSS classique
import "../components/ServiceDetails.css"; // reuse article-card styles
import ImgCarGallerie from "../components/ImgCarGallerie";
import imggallerie from "../assets/img01.png";
import img03 from "../assets/imprimerie.png";
import img04 from "../assets/divers.png";

export default function Gallery() {
  const [media, setMedia] = useState([]);
  const containerRef = useRef(null);

  useEffect(() => {
    // On conserve seulement l'observer d'intersection; pas de scroll JS
    return () => {};
  }, []);

  useEffect(() => {
    const elements = containerRef.current.querySelectorAll('.fade-in');
    const observer = new window.IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.2 });
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [media]);

  useEffect(() => {
    api.get("/media")
      .then(res => setMedia(res.data))
      .catch(err => console.log(err));
  }, []);

  return (
    <div className="gallery-container" ref={containerRef}>
      <ImgCarGallerie src={imggallerie} slides={[imggallerie, img03, img04]}>
        <h2>Gallerie</h2>
        <p>Nos galleries</p>
      </ImgCarGallerie>

      <div className="articles-grid fade-in">
        {media.map((m) => (
          <div key={m.id} id={`media-${m.id}`} className="article-card">
            <div className="media-wrap">
                {m.url && String(m.url).toLowerCase().endsWith('.mp4') ? (
                <video src={m.url} controls className="article-image" preload="metadata" />
              ) : (
                <img src={m.url} alt={m.title} className="article-image" loading="lazy" decoding="async" />
              )}
            </div>
            <h3 className="article-title">{m.title || 'Sans titre'}</h3>
            <p className="article-desc">{m.description || 'Aucune description'}</p>
            <button
              className="article-button"
              onClick={() => {
                const phone = ':+2250759890358'.replace(/[^0-9+]/g, '');
                const titre = m.title || 'élément';
                const desc = m.description || '';
                const origin = typeof window !== 'undefined' ? window.location.origin : '';
                const articleLink = m.link ? (String(m.link).startsWith('http') ? m.link : `${origin}${m.link}`) : `${origin}/gallery#media-${m.id}`;
                const message = `Bonjour, j'aimerais passer une commande concernant ${titre}. ${desc}\n\nLien: ${articleLink}\n\nPouvez-vous m'en dire plus ?`;
                const text = encodeURIComponent(message);
                const url = `https://wa.me/${phone.replace(/^\+/, '')}?text=${text}`;
                window.open(url, '_blank');
              }}
            >
              Commander
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
