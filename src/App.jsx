import React, { useEffect, useState } from 'react';
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
import Message from './components/message.jsx';

function App() {


  const teamsData = [
    {
      teamName: "AELORIA LUMINA",
      game: "Roblox",
      genre: "SANDBOX",
      badge: "ADMIN",
      rank: "#1",
      achievement: "JAGO",
      bannerImg: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=800&q=80",
      members: [
      { name: "Kenshiro", avatar: "https://i.pravatar.cc/150?img=1" },
      { name: "Galan", avatar: "https://i.pravatar.cc/150?img=2" },
      { name: "Raw", avatar: "https://i.pravatar.cc/150?img=3" },
      { name: "Una", avatar: "https://i.pravatar.cc/150?img=4" }
    ]
    },
    {
      teamName: "AELORIA STREAMER",
      game: "ALL",
      genre: "ALL",
      badge: "GAMER",
      rank: "#3",
      achievement: "ARTIST",
      bannerImg: "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?auto=format&fit=crop&w=800&q=80",
      members: [
      { name: "Kenshiro", avatar: "https://i.pravatar.cc/150?img=1" },
      { name: "Galan", avatar: "https://i.pravatar.cc/150?img=2" },
      { name: "Raw", avatar: "https://i.pravatar.cc/150?img=3" },
      { name: "Una", avatar: "https://i.pravatar.cc/150?img=4" }
    ]
    },
    {
      teamName: "AELORIA PRIME",
      game: "ROBLOX",
      genre: "SANDBOX",
      badge: "ADMIN",
      rank: "#4",
      achievement: "JAGO",
      bannerImg: "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?auto=format&fit=crop&w=800&q=80",
      members: [
      { name: "Kenshiro", avatar: "https://i.pravatar.cc/150?img=1" },
      { name: "Galan", avatar: "https://i.pravatar.cc/150?img=2" },
      { name: "Raw", avatar: "https://i.pravatar.cc/150?img=3" },
      { name: "Una", avatar: "https://i.pravatar.cc/150?img=4" }
    ]
    }
    ,

    {
      teamName: "GIFTER AELORIA",
      game: "ROBLOX",
      genre: "SANDBOX",
      badge: "SULTAN",
      rank: "#6",
      achievement: "KING",
      bannerImg: "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?auto=format&fit=crop&w=800&q=80",
      members: [
      { name: "Kenshiro", avatar: "https://i.pravatar.cc/150?img=1" },
      { name: "Galan", avatar: "https://i.pravatar.cc/150?img=2" },
      { name: "Raw", avatar: "https://i.pravatar.cc/150?img=3" },
      { name: "Una", avatar: "https://i.pravatar.cc/150?img=4" }
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
        <FadeInSection>
        <div id='message' className='section'>
            <Message />
        </div>
        </FadeInSection>
        <Footer />
      </div>
    </>
  )
}

export default App