import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Carousel.css"; 
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import img1 from '../assets/img2.jpg';
import img2 from '../assets/img3.jpg';
import img3 from '../assets/img2.jpg';
import img4 from '../assets/img3.jpg';

export default function Carousel() {
  const [index, setIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const timeoutRef = useRef(null);
  const navigate = useNavigate();

  const slides = [
    {
      image: img1     
    },
    {
      image: img2
    },
    {
      image: img3
    },
    {
      image: img4
    }
  ];

  const resetTimeout = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  };

  const next = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setIndex((prev) => (prev + 1) % slides.length);
    setTimeout(() => setIsAnimating(false), 500);
  };

  const prev = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setIndex((prev) => (prev - 1 + slides.length) % slides.length);
    setTimeout(() => setIsAnimating(false), 500);
  };

  const goTo = (i) => {
    if (isAnimating) return;
    setIsAnimating(true);
    setIndex(i);
    setTimeout(() => setIsAnimating(false), 500);
  };

  useEffect(() => {
    resetTimeout();
    timeoutRef.current = setTimeout(() => next(), 4000);
    return () => resetTimeout();
  }, [index]);

  return (
    <div className="carousel-container">
      <div className="carousel">
        <div
          className="carousel-inner"
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {slides.map((slide, i) => (
            <div className="carousel-item" key={i}>
              <div className="carousel-image-wrapper">
                <img src={slide.image} alt={slide.title} loading={i === 0 ? 'eager' : 'lazy'} decoding="async" />
                <div className="carousel-gradient" />
              </div>

              <div className="carousel-content">
                <h2>{slide.title}</h2>
                <p>{slide.description}</p>
                {/* <button className="carousel-btn">Voir plus</button> */}
                <button
                  className="carousel-btn"
                  onClick={() => {
                    navigate("/services");
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                >
                  Voir les services
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Buttons */}
        <button className="carousel-nav left" onClick={prev} disabled={isAnimating}>
          <FaChevronLeft />
        </button>
        <button className="carousel-nav right" onClick={next} disabled={isAnimating}>
          <FaChevronRight />
        </button>

        {/* Indicators */}
        <div className="carousel-indicators">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className={i === index ? "active" : ""}
            ></button>
          ))}
        </div>
      </div>
    </div>
  );
}
