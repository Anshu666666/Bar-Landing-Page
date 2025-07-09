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
    })



  return (
    <div className='about bg-transparent w-full p-[4rem] flex flex-col gap-[5rem]'>
        <div className="about-up flex justify-between">
              <div className="about-left flex flex-col gap-[2rem]">
                  <button className=' w-max bg-white rounded-[13px] text-black text-[0.7rem] py-[0.3rem] px-[0.6rem] flex items-center font-bold '>Best Cocktails</button>
                  <div className="caption text-[3rem] font-negra leading-[2rem] ">Where every detail<br /> matters-from muddle<br /> to garnish</div>
              </div>

              <div className="about-right md:mr-[4rem] flex flex-col gap-[1rem]">
                  <div className="review-up text-[#9a9a9a] text-[0.9rem] leading-[1.1rem] ">Every cocktail we serve is a reflextion of our<br/>obsession with detail - from the first muddle to the<br/>finalgarnish. That care is what turns a simple drink<br/>into something truly memorable.</div>
                  <div className="review-down flex">
                      <div className="review-left w-[50%] ">
                        <p className=' text-white '>
                            <i className="ri-star-smile-fill"></i>
                            <i className="ri-star-smile-fill"></i>
                            <i className="ri-star-smile-fill"></i>
                            <i className="ri-star-smile-fill"></i>
                            <i className="ri-star-smile-fill"></i>
                        </p>
                        <p className=' text-[1.5rem] font-bold '>4.5/5</p>
                        <p className=' text-[0.7rem] text-[#989797] '>12000+ customers worldwide</p>
                      </div>
                      <div className="review-middle transform h-full w-[0.1rem] bg-slate-600 "></div>

                      <div className="review-right w-[50%] flex items-center justify-center ">
                        <div className='review-images-container relative flex gap- p-[0.35rem] rounded-[20px] '>
                            <div className='rounded-[50%] bg-black h-[2.1rem] w-[2.1rem] '><img src='/images/profile1.png'></img></div>
                            <div className='rounded-[50%] bg-black h-[2.1rem] w-[2.1rem] -ml-[0.5rem] '><img src='/images/profile2.png'></img></div>
                            <div className='rounded-[50%] bg-black h-[2.1rem] w-[2.1rem] -ml-[0.5rem] '><img src='/images/profile3.png'></img></div>
                            <div className='rounded-[50%] bg-black h-[2.1rem] w-[2.1rem] -ml-[0.5rem] '><img src='/images/profile4.png'></img></div>

                        </div>
                      </div>
                  </div>
              </div>
        </div>

        <div className="about-down parent h-[40%] w-[100%]">
            <div className="div1 grid-top-row rounded-[15px] bg-center bg-cover bg-[url(/images/abt1.png)]"></div>
            <div className="div2 grid-top-row rounded-[15px] py-[1rem] px-[1rem] ">
                <p className=' font-negra text-[2rem] '>Crafted to Impress</p>
                <div className=' h-[3px] w-[80%] mb-[1rem] rounded-[2px] bg-[#6a6a6a] '></div>
                <p className='flex gap-[0.3rem] mb-[0.4rem] ml-[0.5rem] font-extralight text-[#b5b5b5] '><i className="ri-check-double-line"></i>Perfectly balanced blends</p>
                <p className='flex gap-[0.3rem] mb-[0.4rem] ml-[0.5rem] font-extralight text-[#b5b5b5] '><i className="ri-check-double-line"></i>Garnished to perfection</p>
                <p className='flex gap-[0.3rem] mb-[0.4rem] ml-[0.5rem] font-extralight text-[#b5b5b5] '><i className="ri-check-double-line"></i>Ice-cold every time</p>
            </div>
            <div className="div3 grid-top-row rounded-[15px] bg-center bg-cover bg-[url(/images/abt2.png)]"></div>
            <div className="div4 grid-bottom-row rounded-[15px] bg-center bg-cover bg-[url(/images/abt3.png)]"></div>
            <div className="div5 grid-bottom-row rounded-[15px] bg-center bg-cover bg-[url(/images/abt4.png)]"></div>
        </div>
    </div>
  )
}

export default About