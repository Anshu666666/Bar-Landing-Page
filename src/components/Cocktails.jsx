import React, {useRef, useState} from 'react'
import {gsap} from 'gsap'
import { useGSAP } from '@gsap/react'
import { cocktailLists, mockTailLists } from '../../constants/index.js'
import { ScrollTrigger } from 'gsap/all';
gsap.registerPlugin(ScrollTrigger);

const Cocktails = ({navbarHeight}) => {
    const hero2 = useRef(null);
    const [mobileTab, setMobileTab] = useState('cocktails');

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
    <div id='cocktails' ref={hero2} className='relative overflow-hidden border border-transparent z-40 w-full bg-transparent h-[100vh] mt-[100vh]'>
    
        <img src='/images/hero-left-leaf.png'
            alt='Decorative leaf'
            className='cocktail-left-leaf absolute z-20 -left-[4rem] sm:-left-[3rem] -bottom-[2rem] w-28 sm:w-36 lg:w-[13rem] h-auto pointer-events-none opacity-40 sm:opacity-70 lg:opacity-100'
        />
        <img src='/images/hero-right-leaf.png'
            alt='Decorative leaf'
            className='cocktail-right-leaf absolute z-20 -right-[4rem] sm:-right-[3rem] bottom-[6rem] sm:bottom-[10rem] w-28 sm:w-36 lg:w-[13rem] h-auto pointer-events-none opacity-40 sm:opacity-70 lg:opacity-100'
        />
        
        {/* Mobile View: Tab Toggle + Active List Card */}
        <div className='md:hidden absolute z-40 top-20 inset-x-0 px-4 flex flex-col items-center'>
            <div className='flex bg-white/10 backdrop-blur-md rounded-full p-1 border border-white/10 mb-4'>
                <button 
                    type='button'
                    onClick={() => setMobileTab('cocktails')}
                    className={`px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase transition-all duration-200 ${
                        mobileTab === 'cocktails' 
                        ? 'bg-[#ddcc34] text-black shadow-lg' 
                        : 'text-white/80 hover:text-white'
                    }`}
                >
                    Cocktails
                </button>
                <button 
                    type='button'
                    onClick={() => setMobileTab('mocktails')}
                    className={`px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase transition-all duration-200 ${
                        mobileTab === 'mocktails' 
                        ? 'bg-[#ddcc34] text-black shadow-lg' 
                        : 'text-white/80 hover:text-white'
                    }`}
                >
                    Mocktails
                </button>
            </div>

            <div className='w-full max-w-sm bg-black/60 backdrop-blur-lg rounded-2xl p-4 border border-white/10 shadow-2xl'>
                <p className='text-xs uppercase tracking-widest text-[#ddcc34] mb-3 font-semibold'>
                    {mobileTab === 'cocktails' ? 'Most popular cocktails' : 'Most popular mocktails'}
                </p>
                {(mobileTab === 'cocktails' ? cocktailLists : mockTailLists).map((item) => (
                    <div key={item.name} className='flex justify-between items-start mb-3 last:mb-0 pb-2 border-b border-white/5 last:border-none'>
                        <div className="left flex flex-col">
                            <p className='text-base font-negra text-[#ddcc34] leading-tight'>{item.name}</p>
                            <p className='text-xs text-slate-300'>{item.country} | {item.detail}</p>
                        </div>
                        <div className="right">
                            <p className='text-xs font-bold text-white/90'>-{item.price}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>

        {/* Tablet & Desktop View: Side-by-side Columns */}
        <div className='hidden md:block w-72 lg:w-[20rem] absolute z-40 top-24 lg:top-[7rem] left-6 lg:left-[3rem] bg-black/40 lg:bg-transparent backdrop-blur-sm lg:backdrop-blur-none p-4 lg:p-0 rounded-2xl lg:rounded-none border border-white/10 lg:border-none'>
            <p className='text-xs uppercase tracking-widest text-slate-300 lg:text-white my-[0.6rem] font-semibold'>Most popular cocktails</p>
            {cocktailLists.map((cocktail)=>(
                <div key={cocktail.name} className='flex justify-between items-start mb-[1.3rem] lg:mb-[1.5rem]'>
                    <div className="left flex flex-col gap-0">
                        <p className='text-lg lg:text-[1.5rem] font-negra text-[#ddcc34] leading-tight'>{cocktail.name}</p>
                        <p className='text-xs lg:text-sm text-slate-300 leading-normal'>{cocktail.country} | {cocktail.detail}</p>
                    </div>
                    <div className="right">
                        <p className='text-sm lg:text-base font-medium'>-{cocktail.price}</p>
                    </div>
                </div>
            ))}
        </div>

        <div className='hidden md:block w-72 lg:w-[20rem] absolute z-40 top-24 lg:top-[7rem] right-6 lg:right-[3rem] bg-black/40 lg:bg-transparent backdrop-blur-sm lg:backdrop-blur-none p-4 lg:p-0 rounded-2xl lg:rounded-none border border-white/10 lg:border-none'>
            <p className='text-xs uppercase tracking-widest text-slate-300 lg:text-white my-[0.6rem] font-semibold'>Most popular mocktails</p>
            {mockTailLists.map((mocktail) => (
                <div key={mocktail.name} className='flex justify-between items-start mb-[1.3rem] lg:mb-[1.5rem]'>
                    <div className="left flex flex-col gap-0">
                        <p className='text-lg lg:text-[1.5rem] font-negra text-[#ddcc34] leading-tight'>{mocktail.name}</p>
                        <p className='text-xs lg:text-sm text-slate-300 leading-normal'>{mocktail.country} | {mocktail.detail}</p>
                    </div>
                    <div className="right">
                        <p className='text-sm lg:text-base font-medium'>-{mocktail.price}</p>
                    </div>
                </div>
            ))}
        </div>
         
    </div>
  )
}

export default Cocktails