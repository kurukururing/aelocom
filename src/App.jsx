import React from 'react';
import './App.css'
import Navbar from './components/Navbar.jsx';
import Hero from './components/Hero';
import Stats from './components/stats';
import GameSection from './components/gameSection';
import FadeInSection from './components/FadeInSection';
import Anggota from './components/anggota.jsx';
// 1. Import Component TeamCard (Sesuaikan path jika file ada di folder components)
import TeamCard from './components/TeamCard'; 

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
        "https://i.pravatar.cc/150?img=1",
        "https://i.pravatar.cc/150?img=2",
        "https://i.pravatar.cc/150?img=3",
        "https://i.pravatar.cc/150?img=4",
        "https://i.pravatar.cc/150?img=5",
        "https://i.pravatar.cc/150?img=6"
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
        "https://i.pravatar.cc/150?img=8",
        "https://i.pravatar.cc/150?img=9",
        "https://i.pravatar.cc/150?img=10",
        "https://i.pravatar.cc/150?img=11"
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
        "https://i.pravatar.cc/150?img=8",
        "https://i.pravatar.cc/150?img=9",
        "https://i.pravatar.cc/150?img=10",
        "https://i.pravatar.cc/150?img=11"
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
        "https://i.pravatar.cc/150?img=8",
        "https://i.pravatar.cc/150?img=9",
        "https://i.pravatar.cc/150?img=10",
        "https://i.pravatar.cc/150?img=11"
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
        "https://i.pravatar.cc/150?img=8",
        "https://i.pravatar.cc/150?img=9",
        "https://i.pravatar.cc/150?img=10",
        "https://i.pravatar.cc/150?img=11"
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
        "https://i.pravatar.cc/150?img=8",
        "https://i.pravatar.cc/150?img=9",
        "https://i.pravatar.cc/150?img=10",
        "https://i.pravatar.cc/150?img=11"
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
        "https://i.pravatar.cc/150?img=8",
        "https://i.pravatar.cc/150?img=9",
        "https://i.pravatar.cc/150?img=10",
        "https://i.pravatar.cc/150?img=11"
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
            <FadeInSection>
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
                        </FadeInSection>
          </div>
        </FadeInSection>

        <div id='events' className='section'>

        </div>
      </div>
    </>
  )
}

export default App