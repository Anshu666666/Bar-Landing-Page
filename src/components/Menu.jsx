import React from 'react'
import { sliderLists } from '../../constants/index.js'
import { useState, useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap';
import SplitText from 'gsap/SplitText'; // Adjust path as needed

gsap.registerPlugin(SplitText);


const Menu = () => {
    const [currentIndex, setCurrentIndex] = useState(0)

    const totalCocktails = sliderLists.length;

    const goToSlide = (index) => {
        const newIndex = (index + totalCocktails) % totalCocktails;

        setCurrentIndex(newIndex);
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
        gsap.fromTo('.menu-img img', { opacity: 0, xPercent: -100 }, {
            xPercent: 0, opacity: 1, duration: 1, ease: 'power1.inOut'
        })
        gsap.fromTo('.menu-right-text .title', { yPercent: 100, opacity: 0 }, {
            yPercent: 0, opacity: 100, ease: 'power1.inOut'
        })
        gsap.fromTo('.menu-right-text .desc', { yPercent: 100, opacity: 0 }, {
            yPercent: 0, opacity: 100, ease: 'power1.inOut'
        })
    }, [currentIndex]);


  return (
    <div id='menu' className='relative w-[100%] h-[100vh] '>
        <img src='/images/slider-left-leaf.png'
            className=' absolute z-20 left-0 bottom-0 h-[34vh] w-[27vh] '
        />
        <img src='/images/slider-right-leaf.png'
            className=' absolute z-20 right-0 top-0 h-[34vh] w-[27vh] '
        />

        <div className="menu-item-list absolute left-1/2 -translate-x-1/2 top-[12vh] flex gap-[5vw] whitespace-nowrap ">
            {sliderLists.map((cocktail, index) => {
                const isActive = index === currentIndex;

                return (
                    <p 
                        className=' font-negra text-[1.3rem] border-b-[2px] px-[1rem] cursor-pointer '
                        key={cocktail.id}
                        style={ isActive ? { color: 'white', opacity: 1 } : { color: 'white', opacity: 0.5 }}
                        onClick={()=>{goToSlide(index)}}
                    >{cocktail.name}</p>

                )
            })}
        </div>

        <div className="menu-display-container px-[10vw] h-[70vh] w-full absolute top-1/2 left-1/2 -translate-x-1/2 md:-translate-y-[40%] ">
            <div className="menu-display relative h-full w-full flex justify-between items-center ">
                  <div onClick={()=>{goToSlide(currentIndex-1)}} className='flex flex-col items-center '>
                      <i className="ri-arrow-left-line cursor-pointer "></i>
                      <p className=' font-negra text-[1.4rem]  cursor-pointer  text-center leading-none '>{prevCocktailSplitted[0]}<br/>{prevCocktailSplitted[1]}</p>
                 </div>

                  <div className='menu-img w-[60%] h-full '>
                    <img className=' h-full mx-auto ' src={currentCocktail.image}></img>
                  </div>

                  <div onClick={()=>{goToSlide(currentIndex+1)}} className='flex flex-col items-center '>
                      <i className="ri-arrow-right-line cursor-pointer "></i>
                      <p className=' font-negra text-[1.4rem]  cursor-pointer  text-center leading-none '>{nextCocktailSplitted[0]}<br/>{nextCocktailSplitted[1]}</p>
                 </div>

                 <div className="menu-left-text absolute left-0 bottom-0 flex flex-col gap-[0.5rem] ">
                    <p className=' text-[0.8rem] '>Recipes for:</p>
                    <p className=' text-[2rem] font-negra leading-none text-[#DDCC34] '>{currentCocktailSplitted[0]}<br/>{currentCocktailSplitted[1]}</p>
                 </div>

                  <div className="menu-right-text absolute right-[1rem] bottom-0 flex flex-col w-[23vw] gap-[0.5rem] ">
                      <p className='title text-[1.9rem] font-bold leading-[2.1rem]'>{currentCocktail.title}</p>
                      <p className='desc text-[0.8rem] '>{currentCocktail.description}</p>
                  </div>
            </div>
        </div>


    </div>
  )
}

export default Menu