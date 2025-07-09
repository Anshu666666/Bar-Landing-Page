import React, {useRef} from 'react'
import {gsap} from 'gsap'
import { useGSAP } from '@gsap/react'
import { cocktailLists } from '../../constants/index.js'
import { mockTailLists } from '../../constants/index.js'
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
    <div ref={hero2}  className=' relative overflow-hidden border border-transparent z-40 w-full bg-transparent h-[100vh] mt-[100vh] '>
    
        <img src='/images/hero-left-leaf.png'
            className=' cocktail-left-leaf absolute z-20 -left-[5rem]  -bottom-[2rem] h-[22rem] w-[13rem] '
        />
        <img src='/images/hero-right-leaf.png'
            className=' cocktail-right-leaf absolute z-20 -right-[5rem]  bottom-[10rem] h-[22rem] w-[13rem] '
        />
        
        <div className=' w-[20rem] absolute z-40 top-[7rem] left-[3rem] '>
            <p className='my-[0.6rem]' >Most popular cocktails</p>
            {cocktailLists.map((cocktail, index)=>(
                <div key={cocktail.name} className=' flex justify-between mb-[1.5rem]'>
                    <div className="left flex flex-col gap-0">
                        <p className=' text-[1.5rem] font-negra text-[#ddcc34] leading-none '>{cocktail.name}</p>
                        <p className=' leading-none '>{cocktail.country} | {cocktail.detail}</p>
                    </div>
                    <div className="right">
                        <p className='' >-{cocktail.price}</p>
                    </div>
                </div>
            ))}
        </div>

        <div>
            <div className=' w-[20rem] absolute z-40 top-[7rem] right-[3rem] '>
                <p className='my-[0.6rem]' >Most popular mocktails</p>
                {mockTailLists.map((mocktail, index) => (
                    <div key={mocktail.name} className=' flex justify-between mb-[1.5rem]'>
                        <div className="left flex flex-col gap-0">
                            <p className=' text-[1.5rem] font-negra text-[#ddcc34] leading-none '>{mocktail.name}</p>
                            <p className=' leading-none '>{mocktail.country} | {mocktail.detail}</p>
                        </div>
                        <div className="right">
                            <p className='' >-{mocktail.price}</p>
                        </div>
                    </div>
                ))}
            </div>

        </div>
         
    </div>
  )
}

export default Cocktails