import React, {useRef} from 'react'
import { useGSAP } from '@gsap/react'
import {gsap} from 'gsap'
import { SplitText } from 'gsap/all'
import {useMediaQuery} from 'react-responsive'

const Hero = ({navbarHeight}) => {
  const titleRef = useRef(null)
  const subtitleRef1 = useRef(null)
  const subtitleRef2 = useRef(null)
  const videoRef = useRef()

  const isMobile = useMediaQuery({ maxWidth: 539 })

  useGSAP(() => {
    document.fonts.ready.then(()=>{
      const heroSplit = new SplitText( titleRef.current, { type: 'chars, words' } )
      heroSplit.chars.forEach((char)=>char.classList.add('text-gradient'))
      const paragraphSplit1 = new SplitText( subtitleRef1.current, { type: 'lines' } )
      const paragraphSplit2 = new SplitText( subtitleRef2.current, { type: 'lines' } )
    
      const t1 = gsap.timeline()

      t1.from(heroSplit.chars,{
        y: 10,
        duration: 0.3,
        opacity: 0,
        delay:0.5,
        stagger: 0.06
      }).from(paragraphSplit1.lines, {
        y: 20,
        opacity: 0,
        stagger: 0.1,
        duration: 0.5,
        ease: 'power2.out',
      },"same-time").from(paragraphSplit2.lines, {
        y: 20,
        opacity: 0,
        stagger: 0.1,
        duration: 0.5,
        ease: 'power2.out',
      },"same-time");

      const t2 = gsap.timeline({
        scrollTrigger:{
          trigger:".hero",
          start:`top ${navbarHeight}`,
          end:"bottom top",
          scrub: 1,
        }
      }).to(".right-leaf",{
        y: 100,
        
      }, "2-same-time").to(".left-leaf",{
        y: -100,
        
      }, "2-same-time")

      const startValue = isMobile ? 'top 50%' : 'center 60%'
      const endValue = isMobile ? '120% top' : 'bottom top'

      const setupVideoScrollTrigger = () => {
      if (!videoRef.current || isNaN(videoRef.current.duration) || videoRef.current.duration === 0) return;

      gsap.timeline({
        scrollTrigger: {
          trigger: videoRef.current,
          start: startValue,
          end: endValue,
          scrub: 2,
          pin: true,
        }
      }).to(videoRef.current, {
        currentTime: videoRef.current.duration,
        ease: 'none',
      });
    };

    // Run immediately if metadata is already loaded (e.g., cached video)
    if (videoRef.current.readyState >= 1) {
      setupVideoScrollTrigger();
    } else {
      videoRef.current.onloadedmetadata = setupVideoScrollTrigger;
    }


  })

    

}, []);




  return (
    <>
    <section style={{ height: `calc(100vh - ${navbarHeight}px)` }} className='hero noisy relative z-10 max-md:mt-[4.5rem] mt-[3.5rem] h-[calc(100vh-4.5rem)] w-full flex flex-col items-center overflow-hidden'>
        <h1 ref={titleRef} className='absolute font-negra text-[22vw] leading-[22vw] top-[2.5rem] sm:top-[3rem] tracking-tight'>MOJITO</h1>
        <img src='/images/hero-left-leaf.png' 
             alt='Hero left leaf'
             className='left-leaf absolute z-20 left-0 top-[2rem] sm:top-[3rem] md:top-[5rem] w-24 sm:w-36 md:w-44 lg:w-[13rem] h-auto pointer-events-none opacity-70 md:opacity-100'
             />
        <img src='/images/hero-right-leaf.png' 
              alt='Hero right leaf'
              className='right-leaf absolute z-20 right-0 top-[6rem] sm:top-[4rem] md:top-0 w-24 sm:w-36 md:w-44 lg:w-[13rem] h-auto pointer-events-none opacity-70 md:opacity-100'
            />

        <div className="body w-full h-full relative">
          <div className="content">
            <div className='max-md:hidden md:block absolute bottom-8 left-6 lg:left-12 max-w-xs'>
              <p className='text-sm md:text-base text-slate-300'>Cool. Crisp. Classic.</p>
              <p ref={subtitleRef1} className='font-negra text-2xl sm:text-3xl md:text-[2.6rem] leading-none text-[#ddcc34] mt-1'>Sip the Spirit<br/> of Summer</p>
            </div>
            <div className='max-md:hidden md:block absolute bottom-8 right-6 lg:right-12 text-right max-w-xs'>
              <p ref={subtitleRef2} className='text-xs md:text-sm text-slate-300 leading-relaxed'>Every cocktail on our menu is a<br/> blend of premium ingredients,<br/> creative flair, and timeless recipes<br/> — designed to delight your senses</p>
              <a href='#cocktails' className='inline-block mt-2 text-xs md:text-sm font-semibold tracking-wider uppercase text-[#ddcc34] hover:underline'>View Cocktails →</a>
            </div>

            {/* Mobile-only subtle scroll prompt */}
            <div className='md:hidden absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1 text-center pointer-events-none w-full px-4'>
              <span className='text-xs uppercase tracking-widest text-[#ddcc34] font-medium'>Sip the Spirit of Summer</span>
              <span className='text-[11px] text-slate-400 flex items-center gap-1 animate-pulse'>Scroll down <i className="ri-arrow-down-s-line"></i></span>
            </div>
          </div>
        </div>

    </section>

    <div className='video absolute z-0 w-full h-[80%] max-md:h-[50%] bottom-0 '>
      <video ref={videoRef} className='absolute h-full w-auto bottom-0 left-1/2 -translate-x-1/2 max-md:object-contain object-contain' src='/videos/output.mp4' muted playsInline preload='auto'></video>
    </div>
    </>
  )
}

export default Hero