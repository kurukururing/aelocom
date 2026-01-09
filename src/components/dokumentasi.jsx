import React, { useState } from 'react';

const galleryData = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=800&q=80',
    title: 'Turnamen Nasional 2023',
    date: 'Desember 2023',
    size: 'large' // Mengatur ukuran grid
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=800&q=80',
    title: 'Gathering Komunitas',
    date: 'Januari 2024',
    size: 'tall'
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1560253023-3ec5d502959f?auto=format&fit=crop&w=800&q=80',
    title: 'Coaching Clinic',
    date: 'Februari 2024',
    size: 'normal'
  },
  {
    id: 4,
    image: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?auto=format&fit=crop&w=800&q=80',
    title: 'Grand Final Match',
    date: 'Maret 2024',
    size: 'normal'
  },
  {
    id: 5,
    image: 'https://images.unsplash.com/photo-1511882150382-421056c89033?auto=format&fit=crop&w=800&q=80',
    title: 'Bootcamp Session',
    date: 'April 2024',
    size: 'wide'
  },
  {
    id: 6,
    image: 'https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?auto=format&fit=crop&w=800&q=80',
    title: 'Award Night',
    date: 'Mei 2024',
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