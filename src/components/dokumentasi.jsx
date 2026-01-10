import React, { useState } from 'react';

const galleryData = [
  {
    id: 1,
    image: '/foto.jpeg',
    title: 'Game Night',
    date: '2025',
    size: 'large' // Mengatur ukuran grid
  },
  {
    id: 2,
    image: '/foto1.jpeg',
    title: 'Game Night',
    date: '2025',
    size: 'tall'
  },
  {
    id: 3,
    image: '/foto3.jpeg',
    title: 'Game Night',
    date: '2025',
    size: 'normal'
  },
  {
    id: 4,
    image: '/foto4.jpeg',
    title: 'Game Night',
    date: '2025',
    size: 'normal'
  },
  {
    id: 5,
    image: '/foto5.jpeg',
    title: 'Game Night',
    date: '2025',
    size: 'wide'
  },
  {
    id: 6,
    image: '/foto6.jpeg',
    title: 'Game Night',
    date: '2025',
    size: 'normal'
  },
  {
    id: 7,
    image: '/foto7.jpeg',
    title: 'Game Night',
    date: '2025',
    size: 'normal'
  }
];

const Dokumentasi = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <div className="gallery-container">
      <div className="gallery-header">
        <h2 className="text-gradient">Best Moment</h2>
        <p>Jejak langkah dan keseruan komunitas kami</p>
      </div>

      <div className="gallery-grid">
        {galleryData.map((item) => (
          <div 
            key={item.id} 
            className={`gallery-item ${item.size}`}
            onClick={() => setSelectedImage(item)}
          >
            <img src={item.image} alt={item.title} loading="lazy" />
            <div className="gallery-overlay">
              <div className="overlay-content">
                <h3>{item.title}</h3>
                <span>{item.date}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox / Modal View */}
      {selectedImage && (
        <div className="lightbox" onClick={() => setSelectedImage(null)}>
          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            <img src={selectedImage.image} alt={selectedImage.title} />
            <div className="lightbox-info">
              <h3>{selectedImage.title}</h3>
              <p>{selectedImage.date}</p>
            </div>
            <button className="close-btn" onClick={() => setSelectedImage(null)}>✕</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dokumentasi;