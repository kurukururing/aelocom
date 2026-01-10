import React, { useState, useEffect } from 'react';

function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="container nav-container">
        <div className="logo">
          
          <span className='nameCom'><a href="#home">Aeloria</a></span>
        </div>
        <nav>
          <ul className="nav-links">
            <li><a href="#about">Tentang Kami</a></li>
            <li><a href="#value">Game</a></li>
            <li><a href="#teams">Anggota</a></li>
            <li><a href="#events">Dokumentasi</a></li>
          </ul>
        </nav>
        <a href="https://discord.gg/cHRhrHE4" className="btn-primary">Join Us</a>
      </div>
    </header>
  )
}

export default Navbar;