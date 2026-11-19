import React, {useRef} from 'react'
import {gsap} from 'gsap'
import { useGSAP } from '@gsap/react'
import { cocktailLists, mockTailLists } from '../../constants/index.js'
import { ScrollTrigger } from 'gsap/all';
gsap.registerPlugin(ScrollTrigger);

const Cocktails = ({navbarHeight}) => {
    const hero2 = useRef(null);

    useGSAP(() => {
        document.fonts.ready.then(() => {
            const t4 = gsap.timeline({
                scrollTrigger: {
                    trigger: hero2.current,
                    start: `top 30%`,
                    end: "bottom top",
                    scrub: 3,
                }
            }).to(".cocktail-right-leaf", {
                x: -70
            }, "3-same-time").to(".cocktail-left-leaf", {
                x: 70
            }, "3-same-time")
        })
    }, [])

  return (
    <div id='cocktails' ref={hero2} className='relative overflow-hidden border border-transparent z-40 w-full max-w-[100vw] bg-transparent h-[100vh]'>
    
        <img src='/images/hero-left-leaf.png'
            alt='Decorative leaf'
            className='cocktail-left-leaf absolute z-20 -left-[4rem] sm:-left-[3rem] -bottom-[2rem] w-28 sm:w-36 lg:w-[13rem] h-auto pointer-events-none opacity-40 sm:opacity-70 lg:opacity-100'
        />
        <img src='/images/hero-right-leaf.png'
            alt='Decorative leaf'
            className='cocktail-right-leaf absolute z-20 -right-[4rem] sm:-right-[3rem] bottom-[6rem] sm:bottom-[10rem] w-28 sm:w-36 lg:w-[13rem] h-auto pointer-events-none opacity-40 sm:opacity-70 lg:opacity-100'
        />
        
        {/* Left Column: Most popular cocktails */}
        <div className='w-[44%] max-w-[170px] sm:max-w-xs md:w-72 lg:w-[20rem] absolute z-40 top-16 sm:top-20 md:top-24 lg:top-[7rem] left-3 sm:left-6 lg:left-[3rem]'>
            <p className='text-[10px] sm:text-xs uppercase tracking-widest text-[#ddcc34] sm:text-slate-300 lg:text-white my-1 sm:my-[0.6rem] font-semibold'>Most popular cocktails</p>
            {cocktailLists.map((cocktail)=>(
                <div key={cocktail.name} className='flex justify-between items-start mb-2 sm:mb-[1.3rem] lg:mb-[1.5rem]'>
                    <div className="left flex flex-col gap-0">
                        <p className='text-sm sm:text-lg lg:text-[1.5rem] font-negra text-[#ddcc34] leading-tight'>{cocktail.name}</p>
                        <p className='text-[10px] sm:text-xs lg:text-sm text-slate-300 leading-tight'>{cocktail.country} | {cocktail.detail}</p>
                    </div>
                    <div className="right shrink-0 ml-1">
                        <p className='text-[10px] sm:text-sm lg:text-base font-medium text-white/90'>-{cocktail.price}</p>
                    </div>
                </div>
            ))}
        </div>

        {/* Right Column: Most popular mocktails */}
        <div className='w-[44%] max-w-[170px] sm:max-w-xs md:w-72 lg:w-[20rem] absolute z-40 top-16 sm:top-20 md:top-24 lg:top-[7rem] right-3 sm:right-6 lg:right-[3rem] text-right'>
            <p className='text-[10px] sm:text-xs uppercase tracking-widest text-[#ddcc34] sm:text-slate-300 lg:text-white my-1 sm:my-[0.6rem] font-semibold'>Most popular mocktails</p>
            {mockTailLists.map((mocktail) => (
                <div key={mocktail.name} className='flex justify-between items-start mb-2 sm:mb-[1.3rem] lg:mb-[1.5rem] flex-row-reverse'>
                    <div className="left flex flex-col gap-0 items-end">
                        <p className='text-sm sm:text-lg lg:text-[1.5rem] font-negra text-[#ddcc34] leading-tight'>{mocktail.name}</p>
                        <p className='text-[10px] sm:text-xs lg:text-sm text-slate-300 leading-tight'>{mocktail.country} | {mocktail.detail}</p>
                    </div>
                    <div className="right shrink-0 mr-1">
                        <p className='text-[10px] sm:text-sm lg:text-base font-medium text-white/90'>-{mocktail.price}</p>
                    </div>
                </div>
            ))}
        </div>
         
    </div>
  )
}

export default Cocktails