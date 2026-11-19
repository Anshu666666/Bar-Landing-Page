import React from 'react'
import { featureLists, goodLists } from '../../constants/index.js'
import {gsap} from 'gsap'
import {useGSAP} from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useMediaQuery } from 'react-responsive'

gsap.registerPlugin(ScrollTrigger)

const Art = () => {
    const isMobile = useMediaQuery({ maxWidth: 539 });

    useGSAP(() => {
	const start = isMobile ? 'top 20%' : 'top top';
	
	const maskTimeline = gsap.timeline({
	 scrollTrigger: {
		trigger: '#art',
		start,
		end: 'bottom center',
		scrub: 3,
		pin: true,
	 }
	})
	
	maskTimeline
	 .to('.will-fade', { opacity: 0, stagger: 0.2, ease: 'power1.inOut', })
	 .to('.masked-img', { maskPosition: 'center', maskSize: '400%', duration: 1, ease: 'power1.inOut '})
	 .fromTo('#masked-content',{opacity:0}, { opacity: 1, duration: 0.5, ease: 'power1.inOut'})
 }, [])

  return (
    <div id='art' className='relative art w-full mx-auto h-[100vh] overflow-hidden'>
        <p className="will-fade absolute top-[12vh] sm:top-[15vh] left-1/2 -translate-x-1/2 inline-block font-negra text-[16vw] whitespace-nowrap text-[#5b5b5b] leading-none tracking-wider pointer-events-none">The Art</p>
        
        <div className="content will-fade absolute flex justify-between w-[94%] sm:w-[90%] left-1/2 -translate-x-1/2 bottom-[20vh] sm:bottom-[25vh] z-30 pointer-events-none">
            <div className="content-left flex flex-col gap-1 sm:gap-2 max-w-[45%]">
                {featureLists.map((feature)=>(
                    <p key={feature} className='flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm md:text-base lg:text-[1.1rem] leading-tight text-white/90'>
                        <i className="ri-check-double-line text-[#DDCC34] shrink-0"></i>
                        <span>{feature}</span>
                    </p>
                ))}
            </div>
            <div className="content-right flex flex-col gap-1 sm:gap-2 max-w-[45%] items-end text-right">
                  {goodLists.map((feature) => (
                      <p key={feature} className='flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm md:text-base lg:text-[1.1rem] leading-tight text-white/90'>
                          <span>{feature}</span>
                          <i className="ri-check-double-line text-[#DDCC34] shrink-0"></i>
                      </p>
                  ))}
            </div>
        </div>

        <div className="cocktail-img relative w-full h-full pointer-events-none">
            <img src="/images/under-img.jpg"
                 alt='Cocktail art process'
                 className='masked-img absolute z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 object-contain h-[55vh] sm:h-[62vh] md:h-[65vh] max-w-[90vw] rounded-[15px]' />
        </div>

        <div className="masked-container absolute left-1/2 -translate-x-1/2 text-center bottom-[4vh] sm:bottom-[5vh] w-full px-4 z-40">
              <p className="will-fade font-negra text-xl sm:text-2xl md:text-[2rem] text-[#DDCC34]">Sip-Worthy Perfection</p>
              <div id="masked-content" className='w-full'>
                  <p className='text-xs sm:text-sm text-[#8a8a8a] mb-1'>Made with Craft, Poured with Passion</p>
                  <p className='font-negra text-sm sm:text-base md:text-[1.4rem] text-white max-w-xl mx-auto leading-snug'>This isn't just a drink — It's a carefully crafted moment made just for you</p>
              </div>
        </div>

    </div>
  )
}

export default Art