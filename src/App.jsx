import './App.css'
import Navbar from './components/Navbar.jsx';
import Hero from './components/Hero';
import Stats from './components/stats';
import GameSection from './components/gameSection';
import Dokumentasi from './components/dokumentasi';
// import CtaSection from './components/ctaSection';
function App() {
  return (
    <div className="App">
      <div id='home' className='section'>
        <Navbar />
        <Hero />
      </div>
      <div id='about' className='section'>
        <Stats />
      </div>
      <div id='value' className='section'>
        <GameSection />
      </div>
      <div id='teams' className='section'> 
        <Dokumentasi />
      </div>
      <div id='events' className='section'>

      </div>
    </div>
  )
}

export default App
