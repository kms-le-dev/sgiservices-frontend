import React, { useState, useEffect, useRef } from "react";
import ServiceButton from "../components/ServiceButton";
import ServiceDetails from "../components/ServiceDetails";
import ImgCarServices from "../components/ImgCarServices";
import ImprimerieCard from "../components/ImprimerieCard";
import BtpCard from "../components/BtpCard";
import ImmobilierCard from "../components/ImmobilierCard";
import ImportExport from "../components/ImportExport";
import { api } from "../services/api";
import imgservices from "../assets/img01.png";
import img03 from "../assets/imprimerie.png";
import img04 from "../assets/divers.png";
import "./Services.css";
import "../components/ImprimerieCard";
import "../components/BtpCard";

// Catégories fixes
const FIXED_CATEGORIES = [
  'Import - Export',
  'Fourniture Informatique',
  'Imprimerie',
  'BTP & Immobilier',
  'Divers',
];

// Données statiques fallback pour chaque catégorie
const STATIC_SERVICES = [
  // Import - Export
  {
    id: 1,
    title: 'Import de marchandises',
    description: 'Nous facilitons l’importation de vos produits depuis l’international.',
    category: 'Import - Export',
    image: null,
  },
  {
    id: 2,
    title: 'Export de produits locaux',
    description: 'Valorisez vos produits à l’export grâce à notre réseau.',
    category: 'Import - Export',
    image: null,
  },
  // Fourniture Informatique
  {
    id: 3,
    title: 'Vente de matériel informatique',
    description: 'Ordinateurs, imprimantes, accessoires et plus.',
    category: 'Fourniture Informatique',
    image: null,
  },
  // Imprimerie
  {
    id: 4,
    title: 'Impression numérique',
    description: 'Cartes de visite, flyers, affiches, etc.',
    category: 'Imprimerie',
    image: null,
  },
  // BTP & Immobilier
  {
    id: 5,
    title: 'Construction de bâtiments',
    description: 'Réalisation de projets immobiliers clé en main.',
    category: 'BTP & Immobilier',
    image: null,
  },
  // Divers
  {
    id: 6,
    title: 'Services divers',
    description: 'Découvrez nos autres prestations sur demande.',
    category: 'Divers',
    image: null,
  },
];

export default function Services() {
  const [services, setServices] = useState([]);
  const [categories, setCategories] = useState(FIXED_CATEGORIES);
  // Par défaut : Imprimerie, mais on check l'ancre à l'arrivée
  const getInitialIndex = () => {
    if (typeof window !== 'undefined') {
      switch (window.location.hash) {
        case '#btn-btp-immobilier':
          return FIXED_CATEGORIES.findIndex(c => c === 'BTP & Immobilier');
        case '#btn-imprimerie':
          return FIXED_CATEGORIES.findIndex(c => c === 'Imprimerie');
        case '#btn-import-export':
          return FIXED_CATEGORIES.findIndex(c => c === 'Import - Export');
        case '#btn-divers':
          return FIXED_CATEGORIES.findIndex(c => c === 'Divers');
        default:
          return 2; // Imprimerie par défaut
      }
    }
    return 2;
  };
  const [activeIndex, setActiveIndex] = useState(getInitialIndex);
  const containerRef = useRef(null);

  // Charger les services depuis l'API, sinon fallback statique
  useEffect(() => {
    let mounted = true;
    api.get('/services')
      .then((res) => {
        if (!mounted) return;
        const data = res.data || [];
        setServices(data.length ? data : STATIC_SERVICES);
      })
      .catch(() => {
        setServices(STATIC_SERVICES);
      });
    return () => { mounted = false; };
  }, []);


  // Si l'utilisateur change d'ancre sans recharger, on écoute le hashchange
  useEffect(() => {
    const onHashChange = () => {
      switch (window.location.hash) {
        case '#btn-btp-immobilier':
          setActiveIndex(FIXED_CATEGORIES.findIndex(c => c === 'BTP & Immobilier'));
          break;
        case '#btn-imprimerie':
          setActiveIndex(FIXED_CATEGORIES.findIndex(c => c === 'Imprimerie'));
          break;
        case '#btn-import-export':
          setActiveIndex(FIXED_CATEGORIES.findIndex(c => c === 'Import - Export'));
          break;
        case '#btn-divers':
          setActiveIndex(FIXED_CATEGORIES.findIndex(c => c === 'Divers'));
          break;
        default:
          setActiveIndex(2);
      }
    };
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
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
    let items = services.filter((s) => {
      if (category === 'BTP & Immobilier') return s.category === 'BTP & Immobilier' || s.category === 'Immobilier';
      return s.category === category;
    });
    // Si aucun service dynamique, fallback statique
    if (!items.length) {
      items = STATIC_SERVICES.filter((s) => {
        if (category === 'BTP & Immobilier') return s.category === 'BTP & Immobilier' || s.category === 'Immobilier';
        return s.category === category;
      });
    }
    return {
      title: category,
      description: `${items.length} offre(s) disponible(s) dans ${category}.`,
      articles: items.map((it) => ({
        id: it.id,
        title: it.title,
        description: it.description || "",
        image: it.image || null,
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
            id={
              c === "Import - Export" ? "btn-import-export" :
              c === "Fourniture Informatique" ? "btn-fourniture-informatique" :
              c === "Imprimerie" ? "btn-imprimerie" :
              c === "BTP & Immobilier" ? "btn-btp-immobilier" :
              c === "Divers" ? "btn-divers" : undefined
            }
          />
        ))}
      </div>

      <div className={`details-panel fade-in ${activeIndex !== null ? "open" : ""}`}>
        {activeIndex !== null && (
          categories[activeIndex] === "Imprimerie" ? (
            <>
              <ImprimerieCard />
              <div style={{ marginTop: '2rem' }}>
                <ServiceDetails
                  service={buildServiceGroup(categories[activeIndex])}
                  whatsappNumber=":+2250759890358"
                />
              </div>
            </>
          ) : categories[activeIndex] === "BTP & Immobilier" ? (
            <>
              <ImmobilierCard />
              <BtpCard />
              <div style={{ marginTop: '2rem' }}>
                <ServiceDetails
                  service={buildServiceGroup(categories[activeIndex])}
                  whatsappNumber=":+2250759890358"
                />
              </div>
            </>
          ) : categories[activeIndex] === "Import - Export" ? (
            <div style={{display: 'flex', flexDirection: 'row', gap: '2rem', alignItems: 'flex-start', flexWrap: 'wrap', justifyContent: 'center'}}>
              <div style={{flex: '1 1 340px', minWidth: 0}}>
                <ImportExport />
              </div>
              <div style={{flex: '2 1 400px', minWidth: 0, display: 'flex', justifyContent: 'center'}}>
                <div style={{
                  maxHeight: '700px',
                  minHeight: '420px',
                  overflowY: 'auto',
                  width: '100%',
                  scrollbarWidth: 'thin',
                  scrollbarColor: '#c8380a #f0f0f0',
                }}
                  className="importexport-scroll"
                >
                  <ServiceDetails
                    service={buildServiceGroup(categories[activeIndex])}
                    whatsappNumber=":+2250759890358"
                    grid3={true}
                  />
                </div>
              </div>
            </div>
          ) : (
            <ServiceDetails
              service={buildServiceGroup(categories[activeIndex])}
              whatsappNumber=":+2250759890358"
            />
          )
        )}
      </div>
    </div>
  );
}
