import React, { useState, useEffect } from 'react';
import './ImgCarServices.css';

const ImgCarBlog = ({ src, slides, children }) => {
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
    <div className="image-overlay-container blog-hero">
      {carouselSlides.map((slide, index) => (
        <img
          key={index}
          src={slide}
          alt={`Blog slide ${index + 1}`}
          className={`image-overlay-img ${carouselSlides.length > 1 && index === currentSlide ? 'active' : ''} ${carouselSlides.length > 1 ? 'carousel-img' : ''}`}
        />
      ))}
      <div className="image-overlay-text">
        {children}
      </div>
    </div>
  );
};

export default ImgCarBlog;
