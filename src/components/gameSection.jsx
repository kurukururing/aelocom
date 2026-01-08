import React, { useState } from 'react';


const gamesData = [
  {
    id: 1,
    title: "Valorant",
    genre: "FPS",
    image: "src/assets/valo.gif"
  },
  {
    id: 2,
    title: "Mobile Legends",
    genre: "MOBA",
    image: "src/assets/mole.gif"
  },
  {
    id: 3,
    title: "Genshin Impact",
    genre: "RPG",
    image: "src/assets/genshin.gif"
  },
  {
    id: 4,
    title: "EA FC 24",
    genre: "Sports",
    image: "src/assets/ea4.gif"
  },
  {
    id: 5,
    title: "Roblox",
    genre: "SandBox",
    image: "src/assets/roblox.gif"
  },
  {
    id: 6,
    title: "Wuthering Waves",
    genre: "RPG",
    image: "src/assets/wuwa.gif"
  },
  {
    id: 7,
    title: "Zenless Zone Zero",
    genre: "RPG",
    image: "src/assets/zzz.gif"
  },
  {
    id: 8,
    title: "E",
    genre: "Sports",
    image: "src/assets/himmel.gif"
  }
  ,
  {
    id: 7,
    title: "Genshin Impact",
    genre: "RPG",
    image: "src/assets/himmel.gif"
  },
  {
    id: 8,
    title: "EA FC 24",
    genre: "Sports",
    image: "src/assets/himmel.gif"
  }
];

const GameSection = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredGames = gamesData.filter((game) =>
    game.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="content-section">
      <div className="container content-grid">
        <div className="text-col">
          <h2>Game Yang Kami Mainkan</h2>
          <p>Game-game kompetitif dan santai yang rutin kami mainkan setiap hari.</p>
        </div>
        <div className="game-grid">
          {filteredGames.length > 0 ? (
            filteredGames.map((game) => (
              <div className="game-card" key={game.id}>
                <img src={game.image} alt={game.title} />
                <div className="game-overlay">
                  <h3 className='game-title'>{game.title}</h3>
                  <span className="badge">{game.genre}</span>
                </div>
              </div>
            ))
          ) : (
            // Tampilan jika game tidak ditemukan
            <p style={{ color: 'white', gridColumn: '1/-1', textAlign: 'center' }}>
              Game tidak ditemukan...
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default GameSection;