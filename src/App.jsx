import { useState, useRef, useEffect } from 'react'
import './App.css'
import 'lenis/dist/lenis.css'
import Lenis from 'lenis'
import {gsap} from 'gsap'
import { ScrollTrigger, SplitText } from "gsap/all"
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Cocktails from './components/Cocktails'
import About from './components/About'
import Art from './components/Art'
import Menu from './components/Menu'
import Contact from './components/Contact'
gsap.registerPlugin(ScrollTrigger, SplitText);

function App() {
  const navbarRef = useRef(null);
  const [navbarHeight, setNavbarHeight] = useState(0);

  useEffect(() => {
    // Initialize Lenis smooth scrolling
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.5,
    });

    // Synchronize Lenis with GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    const updateTicker = (time) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateTicker);
    gsap.ticker.lagSmoothing(0);

    const handle = () => {
      if (navbarRef.current) {
        const height = navbarRef.current.getBoundingClientRect().height;
        setNavbarHeight(height);
      }
    };

    // Call after initial paint
    requestAnimationFrame(handle);
    window.addEventListener('resize', handle);

    return () => {
      window.removeEventListener('resize', handle);
      gsap.ticker.remove(updateTicker);
      lenis.destroy();
    };
  }, []);
  

  return (
    <main className='w-full overflow-x-hidden'>
      <Navbar ref={navbarRef} />
      <Hero navbarHeight={navbarHeight}/>
      <Cocktails navbarHeight={navbarHeight}/>
      <About />
      <Art />
      <Menu />
      <Contact/>
    </main>
  )
}

export default App
