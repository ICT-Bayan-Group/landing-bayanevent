'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function Home() {
  const preloaderRef = useRef<HTMLDivElement>(null);
  const preloaderTextRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLAnchorElement>(null);
  const sideInfoRef = useRef<HTMLDivElement>(null);
  const footerInfoRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const words = ['BAYAN GROUP', 'EVENT', 'WELCOME'];
    const colors = [
      'linear-gradient(135deg, #d86609ff 0%, #ec8804ff 100%)',
      'linear-gradient(135deg, #d86609ff 0%, #ec8804ff 100%)',
      'linear-gradient(135deg, #d86609ff 0%, #ec8804ff 100%)',
    ];
    let currentIndex = 0;
    const preloaderWord = preloaderTextRef.current?.querySelector('span');

    gsap.to(preloaderTextRef.current, {
      opacity: 1,
      duration: 0.3,
      ease: 'power2.out',
    });

    const cycleWords = () => {
      if (currentIndex >= words.length - 1) {
        setTimeout(() => {
          gsap.to(preloaderRef.current, {
            y: '-100%',
            duration: 0.8,
            ease: 'power4.inOut',
            onComplete: () => {
              if (preloaderRef.current) {
                preloaderRef.current.style.display = 'none';
              }
              initMainAnimations();
            },
          });
        }, 600);
        return;
      }

      currentIndex++;

      if (preloaderWord && preloaderRef.current) {
        gsap.to(preloaderRef.current, {
          background: colors[currentIndex],
          duration: 0.5,
          ease: 'power2.inOut',
        });

        gsap.to(preloaderWord, {
          opacity: 0,
          y: -20,
          duration: 0.2,
          ease: 'power2.in',
          onComplete: () => {
            if (preloaderWord) {
              preloaderWord.textContent = words[currentIndex];
            }
            gsap.to(preloaderWord, {
              opacity: 1,
              y: 0,
              duration: 0.3,
              ease: 'power2.out',
            });
          },
        });
      }

      setTimeout(cycleWords, currentIndex === 1 ? 1200 : 200);
    };

    setTimeout(cycleWords, 1000);

    const initMainAnimations = () => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.to(headerRef.current, {
        opacity: 1,
        y: 0,
        duration: 1,
      })
        .to(
          titleRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 1.4,
          },
          '-=0.6'
        )
        .to(
          subtitleRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 1.2,
          },
          '-=1'
        )
        .to(
          ctaRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 1,
          },
          '-=0.8'
        )
        .to(
          [sideInfoRef.current, footerInfoRef.current],
          {
            opacity: 1,
            duration: 1.5,
          },
          '-=0.5'
        );

      if (window.innerWidth > 768) {
        const handleMouseMove = (e: MouseEvent) => {
          const x = (e.clientX / window.innerWidth - 0.5) * 2;
          const y = (e.clientY / window.innerHeight - 0.5) * 2;

          gsap.to(titleRef.current, {
            x: x * 15,
            y: y * 15,
            duration: 0.5,
            ease: 'power2.out',
          });
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
      }
    };

    if (videoRef.current) {
      videoRef.current.play().catch((err) => {
        console.log('Video autoplay failed:', err);
      });
    }
  }, []);

  return (
    <>
      <div
        ref={preloaderRef}
        className="fixed inset-0 z-[9999] flex items-center justify-center"
        style={{
          background: 'linear-gradient(135deg, #d86609ff 0%, #ec8804ff 100%)',
        }}
      >
        <div
          ref={preloaderTextRef}
          className="flex items-center justify-center gap-4 text-6xl md:text-8xl lg:text-9xl font-black text-white opacity-0 tracking-tighter"
        >
          <span>BAYAN GROUP</span>
        </div>
      </div>

      <video
        ref={videoRef}
        className="fixed inset-0 w-full h-full object-cover -z-20"
        autoPlay
        muted
        loop
        playsInline
      >
        <source
          src="https://res.cloudinary.com/dgcedsrzf/video/upload/v1761553124/202510271554_vb6tyk.mp4"
          type="video/mp4"
        />
      </video>

      <div className="fixed inset-0  -z-10" />

      <header
        ref={headerRef}
        className="fixed top-0 left-0 right-0 z-50 opacity-0 translate-y-[-20px]"
      >
        <div className="px-6 py-4 md:px-10 md:py-6">
          <div className="flex items-center">
            <img
              src="/images/white.png"
              alt="BAYAN SC"
              className="h-8 md:h-10 object-contain"
            />
          </div>
        </div>
      </header>

      <main className="relative min-h-screen flex flex-col items-center justify-center px-6 md:px-10">
        <div className="max-w-7xl w-full text-center">
          <h1
            ref={titleRef}
            className="text-7xl sm:text-8xl md:text-9xl lg:text-[12rem] xl:text-[14rem] font-black text-white uppercase leading-[0.85] tracking-tighter opacity-0 translate-y-20 will-change-transform"
            style={{
              textShadow: '0 20px 60px rgba(0,0,0,0.8)',
            }}
          >
            BAYAN
            <br />
            EVENT
          </h1>

          <p
            ref={subtitleRef}
            className="mt-8 md:mt-12 text-sm md:text-base text-white/80 font-medium tracking-widest uppercase opacity-0 translate-y-10 max-w-2xl mx-auto"
          >
            KEEP MOVING • KEEP STRONG • THE NEXT LEVEL
          </p>

          <a
            ref={ctaRef}
            href="#register"
            className="inline-block mt-10 md:mt-16 px-12 py-5 md:px-16 md:py-6 bg-white text-black text-sm md:text-base font-black tracking-widest uppercase transition-all duration-500 hover:bg-blue-500 hover:text-white hover:scale-105 hover:shadow-2xl opacity-0 translate-y-10 group"
          >
            <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">
              TO BE ANNOUNCED
            </span>
          </a>
        </div>
      </main>

      <div
        ref={sideInfoRef}
        className="hidden lg:block fixed right-10 top-1/2 -translate-y-1/2 opacity-0"
      >
        <div
          className="text-white/70 text-xs font-semibold tracking-[0.3em] uppercase"
          style={{ writingMode: 'vertical-rl' }}
        >
          PT BAYAN RESOURCES TBK
        </div>
      </div>

      <div
        ref={footerInfoRef}
        className="fixed bottom-6 left-6 right-6 md:bottom-10 md:left-10 md:right-10 flex justify-between items-end opacity-0"
      >
        <div className="flex items-center gap-3 text-xs md:text-sm font-semibold tracking-wider">
          <a
            href="/"
            className="text-white/70 transition-all duration-300 hover:text-white"
          >
            © 2025
          </a>
          <span className="text-white/40">/</span>
          <a
            className="text-white/70 transition-all duration-300 hover:text-white"
          >
            ICT BAYAN GROUP
          </a>
        </div>

        <div className="bg-orange-600 text-white px-8 py-4 font-bold text-xs md:text-sm tracking-wide">
          <div className="text-sm md:text-base">COMING SOON</div>
        </div>
      </div>

      <div className="lg:hidden fixed bottom-24 left-0 right-0 text-center opacity-0">
        <div className="text-white/70 text-xs font-semibold tracking-[0.2em] uppercase">
          Balikpapan Stadion Batakan
        </div>
      </div>
    </>
  );
}
