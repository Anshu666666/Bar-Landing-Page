import React, {forwardRef, useState} from 'react'
import { navLinks } from '../../constants/index.js'
import { useGSAP } from '@gsap/react'
import {gsap} from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

const Navbar = forwardRef((props, ref) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useGSAP(()=>{
        const navTween = gsap.timeline({
            scrollTrigger:{
                trigger: "body",
                start: "20px top",
                toggleActions: "play none none reverse"
            }
        })

        navTween.to("nav", {
            backgroundColor: "rgba(0, 0, 0, 0.8)",
            backdropFilter: 'blur(16px)',
            duration: 0.3,
            ease: 'power1.inOut'
        })
    }, [])

  return (
    <nav ref={ref} className='flex py-3 px-4 sm:px-8 md:px-12 justify-between items-center bg-black/60 backdrop-blur-md md:bg-transparent fixed top-0 inset-x-0 z-50 w-full max-w-[100vw] transition-all duration-300 border-b border-white/5 md:border-transparent'>
        <a href='#home' className='flex items-center gap-2 sm:gap-3 shrink-0'>
            <img src='/images/logo.png' alt='Velvet Pour Logo' className='object-contain h-8 sm:h-9 md:h-10'/>
            <p className='font-negra text-2xl sm:text-3xl md:text-[2.2rem] align-middle leading-none pt-1'>Velvet Pour</p>
        </a>

        {/* Desktop Navigation */}
        <ul className='hidden md:flex items-center gap-6 lg:gap-10 text-sm lg:text-base tracking-wide font-medium'>
            {navLinks.map((link)=>(
                <li key={link.id}>
                    <a href={`#${link.id}`} className='hover:text-[#DDCC34] transition-colors duration-200'>{link.title}</a>
                </li>
            ))}
        </ul>

        {/* Mobile Hamburger Button */}
        <button 
            type='button'
            aria-label='Toggle navigation menu'
            onClick={() => setIsMenuOpen(prev => !prev)}
            className='md:hidden text-white text-2xl p-2 rounded-md hover:bg-white/10 transition-colors focus:outline-none flex items-center justify-center shrink-0 ml-auto z-50'
        >
            <i className={isMenuOpen ? "ri-close-line" : "ri-menu-line"}></i>
        </button>

        {/* Mobile Dropdown Menu */}
        {isMenuOpen && (
            <div className='md:hidden absolute top-full left-0 w-full bg-black/95 backdrop-blur-2xl border-b border-white/10 px-6 py-5 flex flex-col gap-4 shadow-2xl'>
                {navLinks.map((link)=>(
                    <a 
                        key={link.id} 
                        href={`#${link.id}`} 
                        onClick={() => setIsMenuOpen(false)}
                        className='text-base font-medium text-white/90 hover:text-[#DDCC34] transition-colors flex items-center justify-between py-1 border-b border-white/5 last:border-none'
                    >
                        <span>{link.title}</span>
                        <i className="ri-arrow-right-s-line text-slate-500"></i>
                    </a>
                ))}
            </div>
        )}
    </nav>
  )
})

export default Navbar