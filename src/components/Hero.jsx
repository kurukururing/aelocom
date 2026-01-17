const Hero = () => {
  return (
    <div className="hero">
      <div className="containerHero">
        <div className="hero-desc">
          <span className="subtitle">Temukan Squad Impianmu, Taklukkan Setiap Misi</span>
          <h1>Berkembang Bersama di<h1 className="text-gradient">Aeloria</h1></h1>
          <p>Jangan pernah main sendirian lagi. Bergabunglah dengan ribuan pemain dari berbagai genre, mulai dari FPS, MOBA, hingga RPG. Diskusikan patch terbaru, cari rekan tim yang sefrekuensi, dan bangun persahabatan di dalam maupun di luar arena permainan.</p>
          <div className="hero-button"> 
          <a href="https://discord.gg/cHRhrHE4" className="btn-primary-lg">Join Discord</a>
          <a href="#message" className="btn-outline">Message</a>
          </div>
        </div>
        <div className="hero-image">
          <img className="heroImage" src="/aeloLogo.jpeg"></img>
        </div>
      </div>
    </div>
  );
};

export default Hero;