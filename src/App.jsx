import React from 'react';
import './App.css'
import Navbar from './components/Navbar.jsx';
import Hero from './components/Hero';
import Stats from './components/stats';
import GameSection from './components/gameSection';
import FadeInSection from './components/FadeInSection';
import Anggota from './components/anggota.jsx';
import Dokumentasi from './components/dokumentasi.jsx';
import TeamCard from './components/TeamCard'; 
import Footer from './components/Footer.jsx';

function App() {


  const teamsData = [
    {
      teamName: "AELORIA LUMINA",
      game: "ROBLOX",
      genre: "SANDBOX",
      badge: "ADMIN",
      rank: "#1",
      achievement: "M-Series Champion",
      bannerImg: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=800&q=80",
      members: [
      { name: "Lemon", avatar: "https://i.pravatar.cc/150?img=1" },
      { name: "Skylar", avatar: "https://i.pravatar.cc/150?img=2" },
      { name: "Alberttt", avatar: "https://i.pravatar.cc/150?img=3" },
      { name: "Vyn", avatar: "https://i.pravatar.cc/150?img=4" },
      { name: "Clayyy", avatar: "https://i.pravatar.cc/150?img=5" },
      { name: "Xinnn", avatar: "https://i.pravatar.cc/150?img=6" }
    ]
    },
    {
      teamName: "AELORIA WINGS",
      game: "Valorant",
      genre: "FPS",
      badge: "Elite",
      rank: "#2 Pacific",
      achievement: "Major Finalist",
      bannerImg: "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?auto=format&fit=crop&w=800&q=80",
      members: [
      { name: "Lemon", avatar: "https://i.pravatar.cc/150?img=1" },
      { name: "Skylar", avatar: "https://i.pravatar.cc/150?img=2" },
      { name: "Alberttt", avatar: "https://i.pravatar.cc/150?img=3" },
      { name: "Vyn", avatar: "https://i.pravatar.cc/150?img=4" },
      { name: "Clayyy", avatar: "https://i.pravatar.cc/150?img=5" },
      { name: "Xinnn", avatar: "https://i.pravatar.cc/150?img=6" }
    ]
    },
    {
      teamName: "AELORIA STREAMER",
      game: "Valorant",
      genre: "FPS",
      badge: "Elite",
      rank: "#2 Pacific",
      achievement: "Major Finalist",
      bannerImg: "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?auto=format&fit=crop&w=800&q=80",
      members: [
      { name: "Lemon", avatar: "https://i.pravatar.cc/150?img=1" },
      { name: "Skylar", avatar: "https://i.pravatar.cc/150?img=2" },
      { name: "Alberttt", avatar: "https://i.pravatar.cc/150?img=3" },
      { name: "Vyn", avatar: "https://i.pravatar.cc/150?img=4" },
      { name: "Clayyy", avatar: "https://i.pravatar.cc/150?img=5" },
      { name: "Xinnn", avatar: "https://i.pravatar.cc/150?img=6" }
    ]
    },
    {
      teamName: "AELORIA PRIME",
      game: "Valorant",
      genre: "FPS",
      badge: "Elite",
      rank: "#2 Pacific",
      achievement: "Major Finalist",
      bannerImg: "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?auto=format&fit=crop&w=800&q=80",
      members: [
      { name: "Lemon", avatar: "https://i.pravatar.cc/150?img=1" },
      { name: "Skylar", avatar: "https://i.pravatar.cc/150?img=2" },
      { name: "Alberttt", avatar: "https://i.pravatar.cc/150?img=3" },
      { name: "Vyn", avatar: "https://i.pravatar.cc/150?img=4" },
      { name: "Clayyy", avatar: "https://i.pravatar.cc/150?img=5" },
      { name: "Xinnn", avatar: "https://i.pravatar.cc/150?img=6" }
    ]
    }
    ,
    {
      teamName: "AELORIA KING",
      game: "Valorant",
      genre: "FPS",
      badge: "Elite",
      rank: "#2 Pacific",
      achievement: "Major Finalist",
      bannerImg: "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?auto=format&fit=crop&w=800&q=80",
      members: [
      { name: "Lemon", avatar: "https://i.pravatar.cc/150?img=1" },
      { name: "Skylar", avatar: "https://i.pravatar.cc/150?img=2" },
      { name: "Alberttt", avatar: "https://i.pravatar.cc/150?img=3" },
      { name: "Vyn", avatar: "https://i.pravatar.cc/150?img=4" },
      { name: "Clayyy", avatar: "https://i.pravatar.cc/150?img=5" },
      { name: "Xinnn", avatar: "https://i.pravatar.cc/150?img=6" }
    ]
    },
    {
      teamName: "AELORIA QUEEN",
      game: "Valorant",
      genre: "FPS",
      badge: "Elite",
      rank: "#2 Pacific",
      achievement: "Major Finalist",
      bannerImg: "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?auto=format&fit=crop&w=800&q=80",
      members: [
      { name: "Lemon", avatar: "https://i.pravatar.cc/150?img=1" },
      { name: "Skylar", avatar: "https://i.pravatar.cc/150?img=2" },
      { name: "Alberttt", avatar: "https://i.pravatar.cc/150?img=3" },
      { name: "Vyn", avatar: "https://i.pravatar.cc/150?img=4" },
      { name: "Clayyy", avatar: "https://i.pravatar.cc/150?img=5" },
      { name: "Xinnn", avatar: "https://i.pravatar.cc/150?img=6" }
    ]
    },
    {
      teamName: "GIFTER AELORIA",
      game: "Valorant",
      genre: "FPS",
      badge: "Elite",
      rank: "#2 Pacific",
      achievement: "Major Finalist",
      bannerImg: "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?auto=format&fit=crop&w=800&q=80",
      members: [
      { name: "Lemon", avatar: "https://i.pravatar.cc/150?img=1" },
      { name: "Skylar", avatar: "https://i.pravatar.cc/150?img=2" },
      { name: "Alberttt", avatar: "https://i.pravatar.cc/150?img=3" },
      { name: "Vyn", avatar: "https://i.pravatar.cc/150?img=4" },
      { name: "Clayyy", avatar: "https://i.pravatar.cc/150?img=5" },
      { name: "Xinnn", avatar: "https://i.pravatar.cc/150?img=6" }
    ]
    }
  ];

  return (
    <>
      <div className="App">
        <Navbar />
        
        <FadeInSection>
          <div id='home' className='section'>
            <Hero />
          </div>
        </FadeInSection>

        <FadeInSection>
          <div id='about' className='section'>
            <Stats />
          </div>
        </FadeInSection>

        <FadeInSection>
          <div id='value' className='section'>
            <GameSection />
          </div>
        </FadeInSection>

        <FadeInSection>
          <div id='teams' className='section'> 
            <Anggota />
            <div className="team-card-container" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '30px', padding: '40px 0' }}>
              {teamsData.map((team, index) => (
                <TeamCard 
                  key={index}
                  teamName={team.teamName}
                  game={team.game}
                  genre={team.genre}
                  badge={team.badge}
                  rank={team.rank}
                  achievement={team.achievement}
                  bannerImg={team.bannerImg}
                  members={team.members}
                />
              ))}
            </div>
          </div>
        </FadeInSection>
        <FadeInSection>
        <div id='events' className='section'>
            <Dokumentasi />
        </div>
        </FadeInSection>
        <Footer />
      </div>
    </>
  )
}

export default App