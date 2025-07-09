import React, {forwardRef} from 'react'
import { navLinks } from '../../constants/index.js'
import { useGSAP } from '@gsap/react'
import {gsap} from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

const Navbar = forwardRef((props, ref) => {
    useGSAP(()=>{
        const navTween = gsap.timeline({
            scrollTrigger:{
                trigger: "nav",
                start: "top top"
            }
        })

        navTween.fromTo("nav",{ backgroundColor: 'transparent'},{
            backgroundColor: "#00000050",
            backdropFilter: 'blur(10px)',
            duration: 1,
            ease: 'power1.inOut'
        })
    })

  return (
    <nav ref={ref} className=' flex max-md:flex-col max-md:gap-[0.5rem] py-[0.4rem] px-[3rem] justify-between items-center bg-blue-300 fixed z-50 w-full'>
        <a href='#home' className='flex items-center gap-[0.7rem] '>
            <img src='/images/logo.png' className='object-contain h-[2.5rem] '/>
            <p className='font-negra text-[2.3rem] align-middle leading-none pt-[0.4rem] '>Velvet Pour</p>
        </a>
        <ul className='flex gap-[2.5rem]'>
            {navLinks.map((link)=>(
                <li key={link.id}>
                    <a href={`#${link.id}`}>{link.title}</a>
                </li>
            ))}
        </ul>
    </nav>
  )
})

export default Navbar