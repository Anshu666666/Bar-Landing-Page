import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'
import {gsap} from 'gsap'
import React from 'react'
gsap.registerPlugin(ScrollTrigger, SplitText)

const About = () => {
    useGSAP(()=>{
        document.fonts.ready.then(()=>{
            const headingSplit = new SplitText('.caption', { type: 'words' })
            const aboutTimeline = gsap.timeline({
                scrollTrigger: {
                    trigger: '.about',
                    start: 'top center',
                    end: '25% top',
                    scrub: 2
                }
            }).from(headingSplit.words, {
                opacity: 0,
                duration: 1,
                delay: 0.3,
                y: 20,
                ease: 'power1.inOut',
                stagger: 0.02
            }).from(".grid-top-row, .grid-bottom-row", {
                opacity: 0,
                duration: 1,
                stagger: 0.04
            }, "-=0.5")
        })
    }, [])

  return (
    <div id='about' className='about bg-transparent w-full px-4 sm:px-8 md:px-12 lg:p-[4rem] py-14 sm:py-20 flex flex-col gap-10 md:gap-14 lg:gap-[5rem]'>
        <div className="about-up flex flex-col lg:flex-row justify-between gap-8 lg:gap-12">
              <div className="about-left flex flex-col gap-4 sm:gap-6 max-w-xl">
                  <span className='w-max bg-white rounded-full text-black text-xs py-1 px-3.5 flex items-center font-bold tracking-wide uppercase shadow-sm'>Best Cocktails</span>
                  <div className="caption text-3xl sm:text-4xl md:text-5xl lg:text-[3rem] font-negra leading-tight sm:leading-snug">Where every detail<br /> matters—from muddle<br /> to garnish</div>
              </div>

              <div className="about-right lg:mr-8 flex flex-col gap-4 sm:gap-6 max-w-md">
                  <p className="review-up text-slate-400 text-sm sm:text-base leading-relaxed">Every cocktail we serve is a reflection of our obsession with detail — from the first muddle to the final garnish. That care is what turns a simple drink into something truly memorable.</p>
                  
                  <div className="review-down flex items-center justify-between bg-white/5 border border-white/10 rounded-2xl p-4">
                      <div className="review-left">
                        <p className='text-[#DDCC34] text-sm flex gap-0.5'>
                            <i className="ri-star-smile-fill"></i>
                            <i className="ri-star-smile-fill"></i>
                            <i className="ri-star-smile-fill"></i>
                            <i className="ri-star-smile-fill"></i>
                            <i className="ri-star-smile-fill"></i>
                        </p>
                        <p className='text-xl sm:text-2xl font-bold mt-1'>4.5/5</p>
                        <p className='text-[11px] sm:text-xs text-slate-400'>12,000+ customers worldwide</p>
                      </div>

                      <div className="h-12 w-[1px] bg-white/10 mx-2"></div>

                      <div className="review-right flex items-center justify-center">
                        <div className='review-images-container relative flex p-1.5 rounded-full border border-white/10 shadow-lg'>
                            <div className='rounded-full overflow-hidden bg-black h-8 w-8 sm:h-9 sm:w-9 border border-white/20'><img src='/images/profile1.png' alt='Customer avatar' className='w-full h-full object-cover' /></div>
                            <div className='rounded-full overflow-hidden bg-black h-8 w-8 sm:h-9 sm:w-9 -ml-2 border border-white/20'><img src='/images/profile2.png' alt='Customer avatar' className='w-full h-full object-cover' /></div>
                            <div className='rounded-full overflow-hidden bg-black h-8 w-8 sm:h-9 sm:w-9 -ml-2 border border-white/20'><img src='/images/profile3.png' alt='Customer avatar' className='w-full h-full object-cover' /></div>
                            <div className='rounded-full overflow-hidden bg-black h-8 w-8 sm:h-9 sm:w-9 -ml-2 border border-white/20'><img src='/images/profile4.png' alt='Customer avatar' className='w-full h-full object-cover' /></div>
                        </div>
                      </div>
                  </div>
              </div>
        </div>

        <div className="about-down parent w-full">
            <div className="div1 grid-top-row rounded-[15px] bg-center bg-cover bg-[url(/images/abt1.png)] min-h-[180px] sm:min-h-[220px]"></div>
            <div className="div2 grid-top-row rounded-[15px] p-5 sm:p-6 flex flex-col justify-center border border-white/10">
                <p className='font-negra text-2xl sm:text-3xl text-white'>Crafted to Impress</p>
                <div className='h-[2px] w-24 my-3 rounded-full bg-[#ddcc34]'></div>
                <p className='flex items-center gap-2 mb-2 font-normal text-xs sm:text-sm text-slate-300'><i className="ri-check-double-line text-[#ddcc34]"></i>Perfectly balanced blends</p>
                <p className='flex items-center gap-2 mb-2 font-normal text-xs sm:text-sm text-slate-300'><i className="ri-check-double-line text-[#ddcc34]"></i>Garnished to perfection</p>
                <p className='flex items-center gap-2 font-normal text-xs sm:text-sm text-slate-300'><i className="ri-check-double-line text-[#ddcc34]"></i>Ice-cold every time</p>
            </div>
            <div className="div3 grid-top-row rounded-[15px] bg-center bg-cover bg-[url(/images/abt2.png)] min-h-[180px] sm:min-h-[220px]"></div>
            <div className="div4 grid-bottom-row rounded-[15px] bg-center bg-cover bg-[url(/images/abt3.png)] min-h-[180px] sm:min-h-[220px]"></div>
            <div className="div5 grid-bottom-row rounded-[15px] bg-center bg-cover bg-[url(/images/abt4.png)] min-h-[180px] sm:min-h-[220px]"></div>
        </div>
    </div>
  )
}

export default About