import React from 'react'
import { featureLists } from '../../constants/index.js'
import { goodLists } from '../../constants/index.js'
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
 })

  return (
    <div id='art' className='relative art w-[100%] mx-auto h-[100vh]  ' >
        <p className="will-fade absolute top-[15vh] left-1/2 -translate-x-1/2 inline-block font-negra text-[16vw] whitespace-nowrap text-[#5b5b5b] leading-none tracking-wider">The Art</p>
        
        <div className="content will-fade absolute flex justify-between w-[90%] left-1/2 -translate-x-1/2 bottom-[25vh] ">
            <div className="content-left">
                {featureLists.map((feature)=>(
                    <p key={feature} className=' flex gap-[0.5rem] text-[1.1rem] ' ><i className="ri-check-double-line"></i>{feature}</p>
                ))}
            </div>
            <div className="content-right">
                  {goodLists.map((feature) => (
                      <p key={feature} className=' flex gap-[0.5rem] text-[1.1rem] ' ><i className="ri-check-double-line"></i>{feature}</p>
                  ))}
            </div>
        </div>

        <div className="cocktail-img relative w-full h-full">
            <img src="/images/under-img.jpg"
                 className='masked-img absolute z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 object-contain h-[65vh] rounded-[15px] ' />
        </div>

        <div className="masked-container absolute left-1/2 -translate-x-1/2 text-center bottom-[5vh]">
              <p className="will-fade font-negra text-[2rem] text-[#DDCC34]">Sip-Worthy Perfection</p>
              <div id="masked-content">
                  <p className=' text-[#595959] '>Made with Craft, Poured with Passion</p>
                  <p className=' whitespace-nowrap font-negra text-[1.5rem] ' >This isn't just a drink - It's a carefully crafted moment made just for you</p>
              </div>
        </div>


    </div>
  )
}

export default Art