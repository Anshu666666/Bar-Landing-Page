import React, { useState } from 'react'
import { sliderLists } from '../../constants/index.js'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'

const Menu = () => {
    const [currentIndex, setCurrentIndex] = useState(0)
    const [touchStart, setTouchStart] = useState(null)
    const [touchEnd, setTouchEnd] = useState(null)

    const totalCocktails = sliderLists.length;

    const goToSlide = (index) => {
        const newIndex = (index + totalCocktails) % totalCocktails;
        setCurrentIndex(newIndex);
    }

    const onTouchStart = (e) => {
        setTouchEnd(null)
        setTouchStart(e.targetTouches[0].clientX)
    }

    const onTouchMove = (e) => {
        setTouchEnd(e.targetTouches[0].clientX)
    }

    const onTouchEnd = () => {
        if (!touchStart || !touchEnd) return
        const distance = touchStart - touchEnd
        if (distance > 50) {
            goToSlide(currentIndex + 1)
        } else if (distance < -50) {
            goToSlide(currentIndex - 1)
        }
    }

    const getCocktailAt = (indexOffset) => {
        return sliderLists[(currentIndex + indexOffset + totalCocktails) % totalCocktails]
    }

    const currentCocktail = getCocktailAt(0);
    const currentCocktailSplitted = currentCocktail.name.split(" ")

    const prevCocktail = getCocktailAt(-1);
    const prevCocktailSplitted = prevCocktail.name.split(" ")

    const nextCocktail = getCocktailAt(1);
    const nextCocktailSplitted = nextCocktail.name.split(" ")

    useGSAP(() => {
        gsap.fromTo('.menu-img img', { opacity: 0, xPercent: -50 }, {
            xPercent: 0, opacity: 1, duration: 0.6, ease: 'power2.out'
        })
        gsap.fromTo('.title', { yPercent: 40, opacity: 0 }, {
            yPercent: 0, opacity: 1, duration: 0.5, ease: 'power2.out'
        })
        gsap.fromTo('.desc', { yPercent: 40, opacity: 0 }, {
            yPercent: 0, opacity: 1, duration: 0.5, ease: 'power2.out'
        })
    }, [currentIndex]);

  return (
    <div id='menu' className='relative w-full h-[100vh] overflow-hidden'>
        <img src='/images/slider-left-leaf.png'
            alt='Slider leaf'
            className='absolute z-10 -left-4 sm:left-0 bottom-0 w-36 sm:w-40 md:w-44 lg:h-[34vh] lg:w-[27vh] h-auto pointer-events-none opacity-70 sm:opacity-80 lg:opacity-100'
        />
        <img src='/images/slider-right-leaf.png'
            alt='Slider leaf'
            className='absolute z-10 -right-4 sm:right-0 top-0 w-36 sm:w-40 md:w-44 lg:h-[34vh] lg:w-[27vh] h-auto pointer-events-none opacity-70 sm:opacity-80 lg:opacity-100'
        />

        {/* Top Category Selectors */}
        <div className="menu-item-list absolute left-1/2 -translate-x-1/2 top-[8vh] sm:top-[10vh] md:top-[12vh] flex gap-3 sm:gap-6 md:gap-[5vw] overflow-x-auto no-scrollbar max-w-[95vw] px-4 z-30">
            {sliderLists.map((cocktail, index) => {
                const isActive = index === currentIndex;

                return (
                    <button 
                        type='button'
                        className={`font-negra text-sm sm:text-base md:text-lg lg:text-[1.3rem] whitespace-nowrap transition-all duration-300 pb-1 cursor-pointer border-b-2 ${
                            isActive 
                            ? 'text-white border-[#DDCC34] opacity-100 scale-105' 
                            : 'text-white/50 border-transparent hover:text-white/80'
                        }`}
                        key={cocktail.id}
                        onClick={()=>{goToSlide(index)}}
                    >
                        {cocktail.name}
                    </button>
                )
            })}
        </div>

        {/* Display Container */}
        <div 
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
            className="menu-display-container px-4 sm:px-[6vw] lg:px-[10vw] h-[72vh] sm:h-[70vh] w-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[45%] md:-translate-y-[40%] z-20"
        >
            <div className="menu-display relative h-full w-full flex justify-between items-center">
                  {/* Prev Button */}
                  <button 
                      type='button'
                      aria-label='Previous Cocktail'
                      onClick={()=>{goToSlide(currentIndex-1)}} 
                      className='flex flex-col items-center justify-center p-2 rounded-full hover:bg-white/10 transition-colors cursor-pointer z-30 group'
                  >
                      <i className="ri-arrow-left-s-line text-3xl sm:text-4xl text-white group-hover:text-[#DDCC34] transition-colors"></i>
                      <p className='hidden sm:block font-negra text-xs sm:text-sm md:text-[1.3rem] cursor-pointer text-center leading-tight text-slate-300 group-hover:text-white mt-1'>
                        {prevCocktailSplitted[0]}<br/>{prevCocktailSplitted[1]}
                      </p>
                 </button>

                  {/* Center Drink Image */}
                  <div className='menu-img w-[55%] sm:w-[50%] lg:w-[60%] h-[40vh] sm:h-[48vh] lg:h-full flex items-center justify-center pointer-events-none'>
                    <img 
                        key={currentCocktail.id} 
                        className='h-full max-h-[50vh] lg:max-h-full mx-auto object-contain drop-shadow-2xl' 
                        src={currentCocktail.image} 
                        alt={currentCocktail.name}
                    />
                  </div>

                  {/* Next Button */}
                  <button 
                      type='button'
                      aria-label='Next Cocktail'
                      onClick={()=>{goToSlide(currentIndex+1)}} 
                      className='flex flex-col items-center justify-center p-2 rounded-full hover:bg-white/10 transition-colors cursor-pointer z-30 group'
                  >
                      <i className="ri-arrow-right-s-line text-3xl sm:text-4xl text-white group-hover:text-[#DDCC34] transition-colors"></i>
                      <p className='hidden sm:block font-negra text-xs sm:text-sm md:text-[1.3rem] cursor-pointer text-center leading-tight text-slate-300 group-hover:text-white mt-1'>
                        {nextCocktailSplitted[0]}<br/>{nextCocktailSplitted[1]}
                      </p>
                 </button>

                 {/* Desktop: Corner Text Blocks */}
                 <div className="hidden lg:flex menu-left-text absolute left-0 bottom-0 flex-col gap-[0.5rem]">
                    <p className='text-[0.8rem] text-slate-400'>Recipes for:</p>
                    <p className='text-[2rem] font-negra leading-none text-[#DDCC34]'>{currentCocktailSplitted[0]}<br/>{currentCocktailSplitted[1]}</p>
                 </div>

                 <div className="hidden lg:flex menu-right-text absolute right-[1rem] bottom-0 flex-col w-[260px] xl:w-[320px] gap-[0.5rem]">
                    <p className='title text-[1.6rem] xl:text-[1.9rem] font-bold leading-tight'>{currentCocktail.title}</p>
                    <p className='desc text-[0.85rem] text-slate-300 leading-relaxed'>{currentCocktail.description}</p>
                 </div>

                 {/* Mobile & Tablet: Centered Bottom Card */}
                 <div className="lg:hidden absolute inset-x-0 bottom-[-2vh] sm:bottom-[0vh] flex flex-col items-center text-center px-4 max-w-md mx-auto bg-black/60 backdrop-blur-md p-3 sm:p-4 rounded-2xl border border-white/10 shadow-2xl z-30">
                    <p className='text-[11px] sm:text-xs uppercase tracking-widest text-[#DDCC34] font-semibold'>Recipe for {currentCocktail.name}</p>
                    <p className='title text-sm sm:text-base md:text-lg font-bold text-white mt-0.5 leading-snug'>{currentCocktail.title}</p>
                    <p className='desc text-[11px] sm:text-xs md:text-sm text-slate-300 mt-1 leading-normal line-clamp-3 sm:line-clamp-none'>{currentCocktail.description}</p>
                 </div>
            </div>
        </div>

    </div>
  )
}

export default Menu