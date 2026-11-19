import React, { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import { SplitText } from 'gsap/all'

const Hero = ({ navbarHeight }) => {
  const titleRef = useRef(null)
  const subtitleRef1 = useRef(null)
  const subtitleRef2 = useRef(null)
  const videoRef = useRef(null)
  const videoWrapperRef = useRef(null)
  const posterRef = useRef(null)

  useGSAP(() => {
    document.fonts.ready.then(() => {
      const heroSplit = new SplitText(titleRef.current, { type: 'chars, words' })
      heroSplit.chars.forEach((char) => char.classList.add('text-gradient'))
      const paragraphSplit1 = new SplitText(subtitleRef1.current, { type: 'lines' })
      const paragraphSplit2 = new SplitText(subtitleRef2.current, { type: 'lines' })

      const t1 = gsap.timeline()

      t1.from(heroSplit.chars, {
        y: 10,
        duration: 0.3,
        opacity: 0,
        delay: 0.5,
        stagger: 0.06
      }).from(paragraphSplit1.lines, {
        y: 20,
        opacity: 0,
        stagger: 0.1,
        duration: 0.5,
        ease: 'power2.out',
      }, "same-time").from(paragraphSplit2.lines, {
        y: 20,
        opacity: 0,
        stagger: 0.1,
        duration: 0.5,
        ease: 'power2.out',
      }, "same-time");

      const t2 = gsap.timeline({
        scrollTrigger: {
          trigger: ".hero",
          start: `top ${navbarHeight}`,
          end: "bottom top",
          scrub: 1,
        }
      }).to(".right-leaf", {
        y: 100,

      }, "2-same-time").to(".left-leaf", {
        y: -100,

      }, "2-same-time")

      let videoTimeline = null;

      const setupVideoScrollTrigger = () => {
        if (!videoRef.current) return;

        const video = videoRef.current;
        const duration = (!isNaN(video.duration) && video.duration > 0) ? video.duration : 12.95;
        const maxTime = Math.max(0, duration - 0.08);

        if (videoTimeline) {
          videoTimeline.kill();
        }

        // Scrub video playback across #hero-cocktails-stage
        videoTimeline = gsap.timeline({
          scrollTrigger: {
            trigger: "#hero-cocktails-stage",
            start: "top top",
            end: "bottom top",
            scrub: 1.2,
            onLeave: () => {
              if (videoWrapperRef.current) gsap.set(videoWrapperRef.current, { autoAlpha: 0 });
            },
            onEnterBack: () => {
              if (videoWrapperRef.current) gsap.set(videoWrapperRef.current, { autoAlpha: 1 });
            },
          }
        });

        // Play the video scrub from Y=0 until Cocktails is in view (first half of stage)
        videoTimeline.fromTo(video, {
          currentTime: 0.001,
        }, {
          currentTime: maxTime,
          ease: 'none',
          duration: 0.5,
        }, 0);

        // Keep video held at final frame throughout Cocktails view so it never disappears
        videoTimeline.to(video, {
          currentTime: maxTime,
          ease: 'none',
          duration: 0.5,
        }, 0.5);
      };

      setupVideoScrollTrigger();

      if (videoRef.current) {
        const video = videoRef.current;

        // Force browser engine to decode and paint the first frame immediately
        video.currentTime = 0.001;
        const playPromise = video.play();
        if (playPromise !== undefined) {
          playPromise.then(() => {
            video.pause();
            video.currentTime = 0.001;
          }).catch(() => {});
        }

        const handleVideoReady = () => {
          setupVideoScrollTrigger();
          // Fade poster out cleanly once video frame is painted
          if (posterRef.current) {
            gsap.to(posterRef.current, {
              opacity: 0,
              duration: 0.4,
              ease: 'power1.out',
              onComplete: () => {
                if (posterRef.current) posterRef.current.style.display = 'none';
              }
            });
          }
        };

        if (video.readyState >= 2) {
          handleVideoReady();
        } else {
          video.addEventListener('loadeddata', handleVideoReady, { once: true });
        }

        video.addEventListener('loadedmetadata', () => {
          setupVideoScrollTrigger();
        }, { once: true });

        // Safety fallback if ended event ever fires
        video.addEventListener('ended', () => {
          if (videoRef.current && videoRef.current.duration > 0) {
            videoRef.current.currentTime = Math.max(0, videoRef.current.duration - 0.08);
          }
        });
      }

    })

  }, []);




  return (
    <>
      <div 
        ref={videoWrapperRef} 
        className='video-container fixed inset-0 w-full h-screen pointer-events-none z-10 flex items-end justify-center overflow-hidden'
      >
        {/* Instant first-frame poster ensuring glass is never blank on initial load */}
        <img
          ref={posterRef}
          src='/images/cocktail-poster.jpg'
          alt='Mojito Cocktail'
          className='absolute h-[68vh] sm:h-[76vh] md:h-[84vh] lg:h-[90vh] w-auto max-w-none object-contain pointer-events-none mix-blend-screen'
        />
        <video
          ref={videoRef}
          className='relative h-[68vh] sm:h-[76vh] md:h-[84vh] lg:h-[90vh] w-auto max-w-none object-contain pointer-events-none mix-blend-screen'
          src='/videos/output.mp4'
          muted
          playsInline
          preload='auto'
        />
      </div>

      <section style={{ height: `calc(100vh - ${navbarHeight}px)` }} className='hero bg-transparent relative z-20 max-md:mt-[4.5rem] mt-[3.5rem] h-[calc(100vh-4.5rem)] w-full flex flex-col items-center overflow-hidden pointer-events-none'>
        <h1 ref={titleRef} className='absolute font-negra text-[22vw] leading-[22vw] top-[2.5rem] sm:top-[3rem] tracking-tight z-[35] pointer-events-none select-none'>MOJITO</h1>
        <img src='/images/hero-left-leaf.png'
          alt='Hero left leaf'
          className='left-leaf absolute z-[28] -left-4 sm:left-0 top-[1.5rem] sm:top-[3rem] md:top-[5rem] w-40 sm:w-48 md:w-48 lg:w-[14rem] h-auto pointer-events-none opacity-85 sm:opacity-90 md:opacity-100'
        />
        <img src='/images/hero-right-leaf.png'
          alt='Hero right leaf'
          className='right-leaf absolute z-[28] -right-4 sm:right-0 top-[4.5rem] sm:top-[4rem] md:top-0 w-40 sm:w-48 md:w-48 lg:w-[14rem] h-auto pointer-events-none opacity-85 sm:opacity-90 md:opacity-100'
        />

        <div className="body w-full h-full relative z-[35] pointer-events-auto">
          <div className="content">
            <div className='max-md:hidden md:block absolute bottom-8 left-6 lg:left-12 max-w-xs'>
              <p className='text-sm md:text-base text-slate-300'>Cool. Crisp. Classic.</p>
              <p ref={subtitleRef1} className='font-negra text-2xl sm:text-3xl md:text-[2.6rem] leading-none text-[#ddcc34] mt-1'>Sip the Spirit<br /> of Summer</p>
            </div>
            <div className='max-md:hidden md:block absolute bottom-8 right-6 lg:right-12 text-right max-w-xs'>
              <p ref={subtitleRef2} className='text-xs md:text-sm text-slate-300 leading-relaxed'>Every cocktail on our menu is a<br /> blend of premium ingredients,<br /> creative flair, and timeless recipes<br /> — designed to delight your senses</p>
              <a href='#cocktails' className='inline-block mt-2 text-xs md:text-sm font-semibold tracking-wider uppercase text-[#ddcc34] hover:underline'>View Cocktails →</a>
            </div>

            {/* Mobile-only subtle scroll prompt */}
            <div className='md:hidden absolute bottom-4 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-1 text-center pointer-events-none w-full px-4'>
              <span className='text-xs uppercase tracking-widest text-[#ddcc34] font-medium'>Sip the Spirit of Summer</span>
              <span className='text-[11px] text-slate-400 flex items-center gap-1 animate-pulse'>Scroll down <i className="ri-arrow-down-s-line"></i></span>
            </div>
          </div>
        </div>

      </section>
    </>
  )
}

export default Hero