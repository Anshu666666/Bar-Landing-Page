import { useState, useRef, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
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
  const handle = () => {
    if (navbarRef.current) {
      const height = navbarRef.current.getBoundingClientRect().height;
      setNavbarHeight(height);
    }
  };

  // Call after initial paint
  requestAnimationFrame(handle);
}, [])
  

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
