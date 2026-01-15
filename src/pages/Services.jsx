import React, { useState, useEffect, useRef } from "react";
import ServiceButton from "../components/ServiceButton";
import ServiceDetails from "../components/ServiceDetails";
import ImgCarServices from "../components/ImgCarServices";
import { api } from "../services/api";
import imgservices from "../assets/img01.png";
import img03 from "../assets/imprimerie.png";
import img04 from "../assets/divers.png";
import "./services.css"; // <--- IMPORTANT

export default function Services() {
  const [services, setServices] = useState([]);
  const [categories, setCategories] = useState([]);
  const [activeIndex, setActiveIndex] = useState(null);
  const containerRef = useRef(null);

  // charger les services depuis l'API et dériver les catégories
  useEffect(() => {
    let mounted = true;
    api.get('/services')
      .then((res) => {
        if (!mounted) return;
        const data = res.data || [];
        setServices(data);
        const cats = Array.from(new Set(data.map(s => s.category || 'Autres')));
        setCategories(cats);
        
        // Définir "Imprimerie" comme sélectionné par défaut
        const imprimeryIndex = cats.indexOf('Imprimerie');
        if (imprimeryIndex !== -1) {
          setActiveIndex(imprimeryIndex);
        }
      })
      .catch((err) => {
        console.error('Erreur chargement services', err);
      });
    return () => { mounted = false; };
  }, []);

  useEffect(() => {
    // Scroll natif suffit; on évite l'initialisation de librairies JS pour le scroll (performances)
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
  }, [categories, activeIndex]);

  const toggle = (i) => {
    setActiveIndex((prev) => (prev === i ? null : i));
  };

  const buildServiceGroup = (category) => {
    const items = services.filter((s) => s.category === category);
    return {
      title: category,
      description: `${items.length} offre(s) disponible(s) dans ${category}.`,
      articles: items.map((it) => ({
        id: it.id,
        title: it.title,
        description: it.description || "",
        image: it.image || null,
        // link vers la page des services + ancre pour retrouver l'article
        link: `/services#service-${it.id}`,
      })),
    };
  };

  return (
    <div className="services-container" ref={containerRef}>
      <ImgCarServices src={imgservices} slides={[imgservices, img03, img04]}>
        <h2>Services</h2>
        <p>Nos services</p>
      </ImgCarServices>

      <div className="services-buttons fade-in">
        {categories.map((c, idx) => (
          <ServiceButton
            key={c}
            title={c}
            active={activeIndex === idx}
            onClick={() => toggle(idx)}
          />
        ))}
      </div>

      <div className={`details-panel fade-in ${activeIndex !== null ? "open" : ""}`}>
        {activeIndex !== null && (
          <ServiceDetails
            service={buildServiceGroup(categories[activeIndex])}
            whatsappNumber=":+2250759890358"
          />
        )}
      </div>
    </div>
  );
}
