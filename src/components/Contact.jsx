import React from 'react'
import { socials, storeInfo } from '../../constants/index.js'
import { openingHours } from '../../constants/index.js'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap';
import SplitText from 'gsap/SplitText';
import { ScrollTrigger } from 'gsap/all';

gsap.registerPlugin(ScrollTrigger)

const Contact = () => {
    useGSAP(() => {
        document.fonts.ready.then(()=>{
            const titleSplit = new SplitText('.heading', { type: 'words' });

            const timeline = gsap.timeline({
                scrollTrigger: {
                    trigger: '#contact',
                    start: 'top center',
                },
                ease: "power1.inOut"
            })

            timeline
                .from(titleSplit.words, {
                    opacity: 0, xPercent: 100, stagger: 0.02
                }).from('.detail', {
                    opacity: 0, yPercent: 100, stagger: 0.02
                })
                .from('.detail-title, .detail-desc', {
                    opacity: 0, yPercent: 100, stagger: 0.02
                }, "-=0.08")
        })
    }, [])    

  return (
    <div id='contact' className='contact flex items-center justify-center border border-transparent w-full min-h-[100vh] py-16 md:py-0 overflow-hidden relative bg-black'>
        <div className="contact-container w-full max-w-4xl px-4 flex flex-col items-center justify-center gap-6 sm:gap-8 my-auto relative z-20">
            <img className='w-[35vw] sm:w-[25vw] md:w-[20vw] max-w-[260px] absolute right-0 -bottom-8 sm:-bottom-12 pointer-events-none opacity-30 sm:opacity-60 md:opacity-100' src="/images/footer-drinks.png" alt='Footer drinks illustration' />
        
            <h2 className='heading text-3xl sm:text-4xl md:text-[2.5rem] font-negra text-white text-center tracking-wide'>{storeInfo.heading}</h2>
            
            <div className="detail text-center tracking-wider max-w-md">
                <p className="detail-title text-[11px] sm:text-xs md:text-sm uppercase mb-1 text-[#DDCC34] font-semibold">Visit Our Store</p>
                <p className="detail-desc text-sm sm:text-base md:text-[1.2rem] text-slate-200">{storeInfo.address}</p>
            </div>

            <div className="detail text-center tracking-wider max-w-md">
                <p className="detail-title text-[11px] sm:text-xs md:text-sm uppercase mb-1 text-[#DDCC34] font-semibold">Contact Us</p>
                <p className="detail-desc text-sm sm:text-base md:text-[1.2rem] text-slate-200">{storeInfo.contact.phone}</p>
                <p className="detail-desc text-sm sm:text-base md:text-[1.2rem] text-slate-200">{storeInfo.contact.email}</p>
            </div>

            <div className="detail text-center tracking-wider max-w-md">
                <p className="detail-title text-[11px] sm:text-xs md:text-sm uppercase mb-1 text-[#DDCC34] font-semibold">Hours</p>
                {openingHours.map((time)=>(
                    <p key={time.day} className="detail-desc text-xs sm:text-sm md:text-base text-slate-300">{time.day} : {time.time}</p>
                ))}
            </div>

            <div className="detail text-center tracking-wider">
                <p className="detail-title text-[11px] sm:text-xs md:text-sm uppercase mb-2 text-[#DDCC34] font-semibold">Socials</p>
                <div className='detail-desc flex gap-3 sm:gap-4 justify-center items-center'>
                    {socials.map((social)=>(
                        <a key={social.name} href={social.url} title={social.name} className='p-2 rounded-full bg-white/5 hover:bg-white/15 transition-all duration-200 hover:scale-110 flex items-center justify-center border border-white/10'>
                            <img className='w-4 h-4 sm:w-5 sm:h-5 object-contain' src={social.icon} alt={social.name} />
                        </a>
                    ))}
                </div>
            </div>
        </div>
    </div>
  )
}

export default Contact