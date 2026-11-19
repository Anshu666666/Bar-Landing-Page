import React, { useEffect, useState, useRef } from 'react'
import { gsap } from 'gsap'

const Loader = ({ onComplete }) => {
  const [progress, setProgress] = useState(0)
  const loaderRef = useRef(null)
  const contentRef = useRef(null)

  useEffect(() => {
    // Animate progress percentage smoothly
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 90) {
          clearInterval(interval)
          return 90
        }
        return prev + 15
      })
    }, 80)

    const handleReady = () => {
      setProgress(100)
      clearInterval(interval)

      setTimeout(() => {
        const tl = gsap.timeline({
          onComplete: () => {
            if (onComplete) onComplete()
          }
        })

        tl.to(contentRef.current, {
          opacity: 0,
          scale: 0.95,
          duration: 0.4,
          ease: 'power2.in'
        }).to(loaderRef.current, {
          yPercent: -100,
          duration: 0.6,
          ease: 'power3.inOut'
        })
      }, 300)
    }

    if (document.readyState === 'complete') {
      document.fonts.ready.then(handleReady)
    } else {
      window.addEventListener('load', () => {
        document.fonts.ready.then(handleReady)
      })
    }

    // Safety timeout in case assets take too long
    const timeout = setTimeout(handleReady, 2500)

    return () => {
      clearInterval(interval)
      clearTimeout(timeout)
    }
  }, [onComplete])

  return (
    <div 
      ref={loaderRef} 
      className='fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center w-full h-full'
    >
      <div ref={contentRef} className='flex flex-col items-center justify-center gap-4 px-6 text-center'>
        <div className='relative'>
          <img 
            src='/images/logo.png' 
            alt='Velvet Pour' 
            className='w-16 h-16 sm:w-20 sm:h-20 object-contain drop-shadow-[0_0_25px_rgba(221,204,52,0.4)] animate-pulse'
          />
        </div>

        <p className='font-negra text-3xl sm:text-4xl text-white tracking-wide mt-2'>
          Velvet Pour
        </p>

        <p className='text-xs uppercase tracking-widest text-[#DDCC34] font-medium'>
          Crafting the Experience
        </p>

        {/* Sleek Progress Bar */}
        <div className='w-48 sm:w-56 h-[3px] bg-white/10 rounded-full mt-4 overflow-hidden relative'>
          <div 
            className='h-full bg-gradient-to-r from-[#ddcc34] via-amber-300 to-[#ddcc34] transition-all duration-150 ease-out rounded-full'
            style={{ width: `${progress}%` }}
          ></div>
        </div>

        <span className='text-[10px] text-slate-500 font-mono tracking-wider mt-1'>
          {progress}%
        </span>
      </div>
    </div>
  )
}

export default Loader
