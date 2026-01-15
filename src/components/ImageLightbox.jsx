import React from "react";
import "./ImageLightbox.css";

export default function ImageLightbox({ image, onClose }) {
  if (!image) return null;

  const handleBackgroundClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="lightbox-overlay" onClick={handleBackgroundClick}>
      <div className="lightbox-content">
        <button className="lightbox-close" onClick={onClose}>
          ✕
        </button>
        <img src={image} alt="Aperçu" className="lightbox-image" />
      </div>
    </div>
  );
}
