import React from 'react';

const TeamCard = ({ 
  teamName, 
  game, 
  genre, 
  badge, 
  rank, 
  achievement, 
  bannerImg, 
  members 
}) => {
  
  // Icon Checkmark Terverifikasi (SVG)
  const VerifiedIcon = () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="verified-icon">
      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
    </svg>
  );

  // Icon Trophy (SVG)
  const TrophyIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="stat-icon">
      <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"></path>
      <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"></path>
      <path d="M4 22h16"></path>
      <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"></path>
      <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"></path>
      <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"></path>
    </svg>
  );

  // Icon Rank/Medal (SVG)
  const RankIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="stat-icon">
       <path d="M12 15c-3.3 0-6-1.5-6-5V5c0-1.1.9-2 2-2h8c1.1 0 2 .9 2 2v5c0 3.5-2.7 5-6 5Z"/>
       <path d="m8 12 4 4 4-4"/>
       <path d="M12 22v-3"/>
    </svg>
  );

  // Logika untuk menampilkan maksimal 4 avatar, sisanya menjadi counter (+2)
  const displayMembers = members.slice(0, 4);
  const remainingCount = members.length - 4;

  return (
    <div className="team-card">
      <div className="card-header">
        <img src={bannerImg} alt={teamName} className="card-banner" />
        <div className="overlay"></div>
        <span className="category-badge">{badge}</span>
      </div>

      {/* Body Card */}
      <div className="card-body">
        <div className="team-header">
          <h3 className="team-name">
            {teamName} 
            <VerifiedIcon />
          </h3>
        </div>
        
        <p className="game-info">{game} • {genre}</p>

        {/* Member Avatars */}
        <div className="team-roster">
          {displayMembers.map((member, index) => (
            <img 
              key={index} 
              src={member} 
              alt="Player" 
              className="player-avatar" 
            />
          ))}
          {remainingCount > 0 && (
            <div className="roster-count">+{remainingCount}</div>
          )}
        </div>

        {/* Statistik */}
        <div className="stats-container">
          <div className="stat-row">
            <RankIcon />
            <span><span className="stat-label">Rank:</span> <b>{rank}</b></span>
          </div>
          <div className="stat-row">
            <TrophyIcon />
            <span>{achievement}</span>
          </div>
        </div>

        {/* Tombol Action */}
        <button className="view-btn">View Profile</button>
      </div>
    </div>
  );
};

export default TeamCard;