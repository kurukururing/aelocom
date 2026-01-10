import React from 'react';

const Footer = () => {
  return (
    <footer className="footer">
      {/* Bagian Atas: CTA (Call to Action) */}
      <div className="footer-cta">
        <div className="cta-content">
          <h2>Siap Menjadi Juara?</h2>
          <p>Bergabunglah dengan komunitas kami dan tingkatkan skill bermainmu sekarang!</p>
        </div>
        <button  className="btn-join-discord">
        <a >
            Join Discord
        </a>
        </button>
      </div>

      <div className="footer-content">
        {/* Kolom 1: Brand & Info */}
        <div className="footer-col brand-col">
          <div className="footer-logo">
            <span className="logo-text">AELORIA<span className="highlight">COMUNITY</span></span>
          </div>
          <p className="footer-desc">
            Komunitas gaming terbaik dan paling solid. Tempat berkumpulnya para gamers, content creator, dan pecinta esports.
          </p>
          <div className="social-links">
            {/* SVG Icons langsung di sini agar tidak perlu install library tambahan */}
            <a href="#" className="social-icon" aria-label="Instagram">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
            </a>
            <a href="#" className="social-icon" aria-label="YouTube">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon></svg>
            </a>
            <a href="#" className="social-icon" aria-label="Discord">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21.5 5h-19A2.5 2.5 0 0 0 0 7.5v9A2.5 2.5 0 0 0 2.5 19h19a2.5 2.5 0 0 0 2.5-2.5v-9A2.5 2.5 0 0 0 21.5 5z"></path><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-1.12-2.5-2.5-2.5S6 10.62 6 12a2.5 2.5 0 0 0 2.5 2.5z"></path><path d="M15.5 14.5A2.5 2.5 0 0 0 18 12c0-1.38-1.12-2.5-2.5-2.5S13 10.62 13 12a2.5 2.5 0 0 0 2.5 2.5z"></path></svg>
            </a>
            <a href="https://www.tiktok.com/@akukenshiro?_r=1&_t=ZS-92wYgFa0NSH" className="social-icon" aria-label="TikTok">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"></path></svg>
            </a>
          </div>
        </div>

        {/* Kolom 2: Navigasi */}
        <div className="footer-col">
          <h4>Explore</h4>
          <ul className="footer-links">
            <li><a href="#home">Home</a></li>
            <li><a href="#about">About Us</a></li>
            <li><a href="#teams">Our Teams</a></li>
            <li><a href="#events">Tournaments</a></li>
            <li><a href="#value">Games</a></li>
          </ul>
        </div>

        {/* Kolom 3: Support */}
        <div className="footer-col">
          <h4>Support</h4>
          <ul className="footer-links">
            <li><a href="#">FAQ</a></li>
            <li><a href="#">Privacy Policy</a></li>
            <li><a href="#">Terms of Service</a></li>
            <li><a href="#">Contact Support</a></li>
            <li><a href="#">Partnership</a></li>
          </ul>
        </div>

        {/* Kolom 4: Newsletter */}
        <div className="footer-col newsletter-col">
          <h4>Stay Updated</h4>
          <p>Dapatkan info turnamen terbaru langsung ke emailmu.</p>
          <form className="newsletter-form">
            <input type="email" placeholder="Email address" required />
            <button type="submit">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
            </button>
          </form>
        </div>
      </div>

      {/* Bagian Bawah: Copyright */}
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} AELORIA. All rights reserved.</p>
        <p>Made with 🔥 in Indonesia</p>
      </div>
    </footer>
  );
};

export default Footer;