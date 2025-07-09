import React, {useRef} from 'react'
import { useGSAP } from '@gsap/react'
import {gsap} from 'gsap'
import { SplitText } from 'gsap/all'
import Navbar from './Navbar'
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
          // markers: true
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
          // markers: true,
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
    <section style={{ height: `calc(100vh - ${navbarHeight}px)` }} className='hero noisy relative z-10  max-md:mt-[5rem] mt-[3.5rem] h-[calc(100vh-4.5rem)]  w-[100%] flex flex-col items-center overflow-hidden '>
        <h1 ref={titleRef} className=' absolute font-negra text-[22vw] leading-[22vw] top-[3rem]  '>MOJITO</h1>
        <img src='/images/hero-left-leaf.png' 
             className=' left-leaf absolute z-20 left-0 md:top-[5rem] max-md:bottom-[0rem] h-[22rem] w-[13rem] '
             />
        <img src='/images/hero-right-leaf.png' 
              className=' right-leaf absolute z-20 right-0 md:top-0 max-md:bottom-[10rem] h-[22rem] w-[13rem] '
            />

        <div className="body">
          <div className="content">
            <div className=' max-md:hidden md:block absolute bottom-[2rem] left-[4rem] '>
              <p>Cool. Crisp. Classic.</p>
              <p ref={subtitleRef1} className=' font-negra text-[3rem] leading-[3rem] text-[#ddcc34] '>Sip the Spirit<br/> of Summer</p>
            </div>
            <div className=' max-md:hidden md:block  absolute bottom-[2rem] right-[4rem] '>
              <p ref={subtitleRef2} className=' '>Every cocktail on our meny is a<br/> blend of premium ingredients,<br/> creative flair, and timeless recipes<br/> -designed to delight your senses</p>
              <a href='#cocktails'>View Cocktails</a>
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