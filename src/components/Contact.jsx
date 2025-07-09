import React from 'react'
import { socials, storeInfo } from '../../constants/index.js'
import { openingHours } from '../../constants/index.js'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap';
import SplitText from 'gsap/SplitText'; // Adjust path as needed
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
    },[])    

  return (
    <div id='contact' className='contact flex items-center border border-transparent w-[100%] h-[100vh] overflow-hidden relative  bg-black '>
        <div className="contact-container h-[80%] w-full flex flex-col items-center justify-between">
            <img className=' w-[20vw] absolute right-0 -bottom-[2rem] ' src="/images/footer-drinks.png" />
        
        <p className='heading text-[2.5rem] mb-[0.5rem] font-negra '>{storeInfo.heading}</p>
        
        <div className="detail text-center mb-[1.8rem] tracking-wider ">
            <p className="detail-title uppercase mb-[0.3rem] text-slate-400 ">Visit Our Store</p>
            <p className="detail-desc text-[1.2rem] ">{storeInfo.address}</p>
        </div>

        <div className="detail text-center mb-[1.8rem] tracking-wider ">
            <p className="detail-title uppercase mb-[0.3rem] text-slate-400 ">Contact us</p>
            <p className="detail-desc text-[1.2rem] ">{storeInfo.contact.phone}</p>
            <p className="detail-desc text-[1.2rem] ">{storeInfo.contact.email}</p>
        </div>

          <div className="detail text-center mb-[1.8rem] tracking-wider ">
              <p className="detail-title uppercase mb-[0.3rem] text-slate-400 ">Opens Every Day</p>
                {openingHours.map((time)=>(
                  <p key={time.day} className="detail-desc text-[1.2rem] ">{time.day} : {time.time}</p>
                ))}
          </div>

          <div className="detail text-center mb-[1.8rem] tracking-wider ">
            <p className="detail-title uppercase mb-[0.3rem] text-slate-400  ">Socials</p>
            <div className='detail-desc flex gap-[1.4rem] '>
                {socials.map((social)=>(
                    <img key={social.name} className=' w-[1.7rem] h-[1.7rem] ' src={social.icon} />
                ))}
            </div>
          </div>
        </div>
    </div>
  )
}

export default Contact