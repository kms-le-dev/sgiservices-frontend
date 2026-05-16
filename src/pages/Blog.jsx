import React, { useEffect, useState, useRef } from "react";
import { api } from "../services/api";
import "./Blog.css"; // CSS classique
import ImgCarBlog from "../components/ImgCarBlog";
import ImageLightbox from "../components/ImageLightbox";
import imgBlog from "../assets/blog.png";
import img03 from "../assets/blog1.png";
import img04 from "../assets/img04.png";

export default function Blog() {
  const [posts, setPosts] = useState([]);
  const [lightboxImage, setLightboxImage] = useState(null);
  const containerRef = useRef(null);

  useEffect(() => {
    // Pas de smooth JS ici — on utilise le comportement natif (CSS)
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
  }, [posts]);

  useEffect(() => {
    api.get("/blogs")
      .then(res => {
        const data = Array.isArray(res.data) ? res.data : [];
        setPosts(data);
      })
      .catch(() => setPosts([]));
  }, []);

  return (
    <div className="blog-container" ref={containerRef}>
      <ImageLightbox image={lightboxImage} onClose={() => setLightboxImage(null)} />
      <ImgCarBlog src={imgBlog} slides={[imgBlog, img03, img04]}>
        <h2>Actualités & Blog</h2>
        <p>Retrouvez ici nos actualités, annonces et articles détaillés.</p>
      </ImgCarBlog>

      {posts.length === 0 ? (
        <p className="no-posts fade-in">Aucun article disponible pour le moment.</p>
      ) : (
        <div className="blog-grid fade-in">
          {posts.map((post, idx) => (
            <div key={post.id} className="blog-card blog-card-large">
              {post.featured_image && (
                <img 
                  src={post.featured_image} 
                  alt={post.title} 
                  className="blog-card-image" 
                  loading="lazy" 
                  decoding="async"
                  fetchPriority={idx < 3 ? "high" : "low"}
                />
              )}
              <h2 className="blog-card-title">{post.title}</h2>
              <p className="blog-card-excerpt">{(post.excerpt || (post.body || "").slice(0, 400) + '...')}</p>
              <p className="blog-card-date">{new Date(post.created_at).toLocaleDateString()}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
