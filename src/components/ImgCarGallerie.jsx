import React, { useState, useEffect } from 'react';
import './ImgCarGallerie.css';

const ImgCarGallerie = ({ src, slides, children }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const carouselSlides = slides || [src];

  useEffect(() => {
    if (carouselSlides.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselSlides.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [carouselSlides.length]);

  return (
    <div className="image-overlay-container">
      {carouselSlides.map((slide, index) => (
        <img
          key={index}
          src={slide}
          alt={`Galerie slide ${index + 1}`}
          className={`image-overlay-img ${carouselSlides.length > 1 && index === currentSlide ? 'active' : ''} ${carouselSlides.length > 1 ? 'carousel-img' : ''}`}
        />
      ))}
      <div className="image-overlay-text">
        {children}
      </div>
    </div>
  );
};

export default ImgCarGallerie;
 