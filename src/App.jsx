import './App.css'
import Navbar from './components/Navbar.jsx';
import Hero from './components/Hero';
import Stats from './components/stats';
import GameSection from './components/gameSection';
import Dokumentasi from './components/dokumentasi';
import FadeInSection from './components/FadeInSection.jsx';

function App() {
  return (
    <>
      <div className="App">
          <FadeInSection>
        <div id='home' className='section'>
          <Navbar />
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
        <div id='teams' className='section'> 
          <Dokumentasi />
        </div>
        <div id='events' className='section'>

        </div>
      </div>
    </>
  )
}

export default App
