import { useState, useRef, useEffect } from 'react'
import './App.css'
import 'lenis/dist/lenis.css'
import Lenis from 'lenis'
import {gsap} from 'gsap'
import { ScrollTrigger, SplitText } from "gsap/all"
import Loader from './components/Loader'
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
  const [isLoading, setIsLoading] = useState(true);

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
  

  const handleLoaderComplete = () => {
    setIsLoading(false);
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 150);
  };

  return (
    <>
      {isLoading && <Loader onComplete={handleLoaderComplete} />}
      <main className='w-full max-w-[100vw] overflow-x-hidden relative'>
        <Navbar ref={navbarRef} />
        <div id='hero-cocktails-stage' className='relative w-full bg-black'>
          <Hero navbarHeight={navbarHeight}/>
          <Cocktails navbarHeight={navbarHeight}/>
          {/* Film grain noise overlay on top of video, underneath leaves and text */}
          <div className='pointer-events-none absolute inset-0 z-[15] noisy' />
        </div>
        <About />
        <Art />
        <Menu />
        <Contact/>
      </main>
    </>
  )
}

export default App
