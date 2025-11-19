'use client';

import { useEffect, useRef, useState } from 'react';
import { Calendar, Users, Award, Instagram, ChevronDown, Linkedin, Mail } from 'lucide-react';

export default function BayanEvent() {
  const preloaderRef = useRef<HTMLDivElement>(null);
  const preloaderTextRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLAnchorElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  
  const aboutRef = useRef<HTMLElement>(null);
  const aboutTitleRef = useRef<HTMLHeadingElement>(null);
  const aboutTextRef = useRef<HTMLParagraphElement>(null);
  
  const eventsRef = useRef<HTMLElement>(null);
  const galleryRef = useRef<HTMLElement>(null);
  const galleryTrackRef = useRef<HTMLDivElement>(null);
  const joinRef = useRef<HTMLElement>(null);

  const [stats, setStats] = useState({
    events: 0,
    participants: 0,
    partners: 0,
    years: 0
  });

  const [statsAnimated, setStatsAnimated] = useState(false);
  const [isWhiteSection, setIsWhiteSection] = useState(false);

  const galleryImages = [
    '/images/craft1.jpg',
    '/images/photo-2.jpg',
    '/images/photo-3.jpg',
    '/images/photo-4.jpg',
    '/images/medali.jpg',
    '/images/hero.jpg',
    '/images/bayanopen.jpg',
    '/images/bayanrun.jpg',
    '/images/bayancraft.jpg'
  ];

  useEffect(() => {
    const words = ['BAYAN GROUP', 'EVENT', 'WELCOME'];
    const colors = [
      'linear-gradient(135deg, #d86609ff 0%, #ec8804ff 100%)',
      'linear-gradient(135deg, #d86609ff 0%, #ec8804ff 100%)',
      'linear-gradient(135deg, #d86609ff 0%, #ec8804ff 100%)',
    ];
    let currentIndex = 0;
    const preloaderWord = preloaderTextRef.current?.querySelector('span');

    if (preloaderTextRef.current) {
      preloaderTextRef.current.style.opacity = '1';
      preloaderTextRef.current.style.transition = 'opacity 0.3s ease-out';
    }

    const cycleWords = () => {
      if (currentIndex >= words.length - 1) {
        setTimeout(() => {
          if (preloaderRef.current) {
            preloaderRef.current.style.transform = 'translateY(-100%)';
            preloaderRef.current.style.transition = 'transform 0.8s cubic-bezier(0.76, 0, 0.24, 1)';
            
            setTimeout(() => {
              if (preloaderRef.current) {
                preloaderRef.current.style.display = 'none';
              }
              initMainAnimations();
            }, 800);
          }
        }, 600);
        return;
      }

      currentIndex++;

      if (preloaderWord && preloaderRef.current) {
        preloaderRef.current.style.background = colors[currentIndex];
        preloaderRef.current.style.transition = 'background 0.5s cubic-bezier(0.76, 0, 0.24, 1)';

        preloaderWord.style.opacity = '0';
        preloaderWord.style.transform = 'translateY(-20px)';
        preloaderWord.style.transition = 'all 0.2s ease-in';

        setTimeout(() => {
          if (preloaderWord) {
            preloaderWord.textContent = words[currentIndex];
            preloaderWord.style.opacity = '1';
            preloaderWord.style.transform = 'translateY(0)';
            preloaderWord.style.transition = 'all 0.3s ease-out';
          }
        }, 200);
      }

      setTimeout(cycleWords, currentIndex === 1 ? 1200 : 200);
    };

    setTimeout(cycleWords, 1000);

    const initMainAnimations = () => {
      const elements = [
        { el: headerRef.current, delay: 0 },
        { el: titleRef.current, delay: 400 },
        { el: subtitleRef.current, delay: 600 },
        { el: ctaRef.current, delay: 800 },
        { el: scrollIndicatorRef.current, delay: 1000 }
      ];

      elements.forEach(({ el, delay }) => {
        if (el) {
          setTimeout(() => {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
            el.style.transition = 'all 1s cubic-bezier(0.22, 1, 0.36, 1)';
          }, delay);
        }
      });

      if (window.innerWidth > 768) {
        const handleMouseMove = (e: MouseEvent) => {
          const x = (e.clientX / window.innerWidth - 0.5) * 2;
          const y = (e.clientY / window.innerHeight - 0.5) * 2;

          if (titleRef.current) {
            titleRef.current.style.transform = `translate(${x * 15}px, ${y * 15}px)`;
            titleRef.current.style.transition = 'transform 0.5s ease-out';
          }
        };

        window.addEventListener('mousemove', handleMouseMove);
      }

      const handleScroll = () => {
        const windowHeight = window.innerHeight;

        // Check white section for logo change
        if (eventsRef.current) {
          const eventsRect = eventsRef.current.getBoundingClientRect();
          if (eventsRect.top <= 80 && eventsRect.bottom >= 80) {
            setIsWhiteSection(true);
          } else {
            setIsWhiteSection(false);
          }
        }

        if (aboutRef.current) {
          const aboutTop = aboutRef.current.getBoundingClientRect().top;
          if (aboutTop < windowHeight * 0.75) {
            if (aboutTitleRef.current) {
              aboutTitleRef.current.style.opacity = '1';
              aboutTitleRef.current.style.transform = 'translateY(0)';
            }
            setTimeout(() => {
              if (aboutTextRef.current) {
                aboutTextRef.current.style.opacity = '1';
                aboutTextRef.current.style.transform = 'translateY(0)';
              }
            }, 200);
            
            if (!statsAnimated) {
              setTimeout(() => {
                animateStats();
                setStatsAnimated(true);
              }, 400);
            }
          }
        }

        if (eventsRef.current) {
          const eventsTop = eventsRef.current.getBoundingClientRect().top;
          if (eventsTop < windowHeight * 0.75) {
            const cards = eventsRef.current.querySelectorAll('.event-card');
            cards.forEach((card, index) => {
              setTimeout(() => {
                (card as HTMLElement).style.opacity = '1';
                (card as HTMLElement).style.transform = 'translateY(0)';
              }, index * 200);
            });
          }
        }

        if (galleryRef.current) {
          const galleryTop = galleryRef.current.getBoundingClientRect().top;
          if (galleryTop < windowHeight * 0.75) {
            // Gallery animation handled by auto-scroll
          }
        }

        if (joinRef.current) {
          const joinTop = joinRef.current.getBoundingClientRect().top;
          if (joinTop < windowHeight * 0.75) {
            joinRef.current.style.opacity = '1';
            joinRef.current.style.transform = 'translateY(0)';
          }
        }
      };

      window.addEventListener('scroll', handleScroll);
      handleScroll();
    };

    // Enhanced video autoplay
    const playVideo = async () => {
      if (videoRef.current) {
        try {
          // Set video properties
          videoRef.current.muted = true;
          videoRef.current.playsInline = true;
          
          // Attempt to play
          await videoRef.current.play();
          console.log('Video playing successfully');
        } catch (err) {
          console.error('Video autoplay failed:', err);
          
          // Fallback: try playing on user interaction
          const playOnInteraction = async () => {
            try {
              if (videoRef.current) {
                await videoRef.current.play();
                console.log('Video started after user interaction');
                document.removeEventListener('click', playOnInteraction);
                document.removeEventListener('touchstart', playOnInteraction);
              }
            } catch (error) {
              console.error('Failed to play video on interaction:', error);
            }
          };
          
          document.addEventListener('click', playOnInteraction, { once: true });
          document.addEventListener('touchstart', playOnInteraction, { once: true });
        }
      }
    };

    // Delay video play until after preloader
    setTimeout(() => {
      playVideo();
    }, 3000);

    // Auto-scroll gallery animation
    const galleryTrack = galleryTrackRef.current;
    if (galleryTrack) {
      const totalWidth = galleryTrack.scrollWidth / 2;
      let position = 0;
      
      const animateGallery = () => {
        position -= 1;
        if (Math.abs(position) >= totalWidth) {
          position = 0;
        }
        if (galleryTrack) {
          galleryTrack.style.transform = `translateX(${position}px)`;
        }
        requestAnimationFrame(animateGallery);
      };
      
      requestAnimationFrame(animateGallery);
    }
  }, [statsAnimated]);

  const animateStats = () => {
    const targets = { events: 10, participants: 20000, partners: 10, years: 3 };
    const duration = 2000;
    const steps = 60;
    const interval = duration / steps;

    let step = 0;
    const timer = setInterval(() => {
      step++;
      const progress = step / steps;
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      
      setStats({
        events: Math.floor(targets.events * easeOutQuart),
        participants: Math.floor(targets.participants * easeOutQuart),
        partners: Math.floor(targets.partners * easeOutQuart),
        years: Math.floor(targets.years * easeOutQuart)
      });

      if (step >= steps) {
        clearInterval(timer);
        setStats(targets);
      }
    }, interval);
  };

  const smoothScrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const headerHeight = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="text-white overflow-x-hidden scroll-smooth">
      {/* Preloader */}
      <div
        ref={preloaderRef}
        className="fixed inset-0 z-[9999] flex items-center justify-center"
        style={{
          background: 'linear-gradient(135deg, #d86609ff 0%, #ec8804ff 100%)',
        }}
      >
        <div
          ref={preloaderTextRef}
          className="flex items-center justify-center gap-4 text-4xl md:text-7xl lg:text-8xl font-black text-white opacity-0 tracking-tighter"
        >
          <span>BAYAN GROUP</span>
        </div>
      </div>

      {/* Video Background */}
      <div className="fixed inset-0 -z-20">
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster="https://res.cloudinary.com/dgcedsrzf/video/upload/v1761553124/202510271554_vb6tyk.mp4"
        >
          <source
            src="https://res.cloudinary.com/dgcedsrzf/video/upload/v1761553124/202510271554_vb6tyk.mp4"
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>
      </div>

      <div className="fixed inset-0 bg-black/60 -z-10" />

      {/* Header */}
      <header
        ref={headerRef}
        className="fixed top-0 left-0 right-0 z-50 opacity-0 translate-y-[-20px]"
      >
        <div className="px-6 py-4 md:px-10 md:py-6 flex justify-between items-center">
          <div className="flex items-center">
            <img
              src={isWhiteSection ? "/images/black.png" : "/images/nextlevel.png"}
              alt="BAYAN SC"
              className="h-8 md:h-20 object-contain transition-all duration-500"
            />
          </div>
          <nav className="hidden md:flex gap-8 text-sm font-semibold tracking-wider">
            <button onClick={() => smoothScrollTo('about')} className="hover:text-orange-500 transition-colors">ABOUT</button>
            <button onClick={() => smoothScrollTo('events')} className="hover:text-orange-500 transition-colors">EVENTS</button>
            <button onClick={() => smoothScrollTo('gallery')} className="hover:text-orange-500 transition-colors">GALLERY</button>
            <button onClick={() => smoothScrollTo('join')} className="hover:text-orange-500 transition-colors">JOIN US</button>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 md:px-10">
        <div className="max-w-7xl w-full text-center">
          <h1
            ref={titleRef}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-[10rem] 2xl:text-[12rem] font-black text-white uppercase leading-[0.85] tracking-tighter opacity-0 translate-y-20"
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
            className="mt-4 sm:mt-6 md:mt-10 text-[0.6rem] sm:text-xs md:text-sm text-white/90 font-medium tracking-[0.2em] sm:tracking-[0.3em] uppercase opacity-0 translate-y-10 max-w-2xl mx-auto px-4"
          >
            KEEP MOVING • KEEP STRONG 
          </p>
          <a
            ref={ctaRef}
            href="#events"
            onClick={(e) => { e.preventDefault(); smoothScrollTo('events'); }}
            className="inline-block mt-6 sm:mt-8 md:mt-12 px-8 py-3 sm:px-10 sm:py-4 md:px-14 md:py-5 bg-white text-black text-[0.65rem] sm:text-xs md:text-sm font-black tracking-[0.15em] sm:tracking-[0.2em] uppercase transition-all duration-500 hover:bg-orange-600 hover:text-white hover:scale-105 hover:shadow-2xl opacity-0 translate-y-10 group"
          >
            <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">
              DISCOVER EVENTS
            </span>
          </a>
        </div>

        <div
          ref={scrollIndicatorRef}
          className="absolute bottom-6 sm:bottom-8 translate-x-1/2 opacity-0 translate-y-10 cursor-pointer"
          onClick={() => smoothScrollTo('about')}
        >
          <div className="flex flex-col items-center gap-2 text-white/60 hover:text-white transition-colors">
            <span className="text-[0.6rem] sm:text-xs font-semibold tracking-widest">SCROLL</span>
            <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5 animate-bounce" />
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" ref={aboutRef} className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 md:px-10 py-12 sm:py-16 md:py-20 bg-blue-900">
        <div className="max-w-6xl w-full">
          <h2
            ref={aboutTitleRef}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black uppercase tracking-tighter mb-6 sm:mb-8 opacity-0 translate-y-20 transition-all duration-1000"
          >
            About
            <br />
            <span className="text-orange-600">BAYAN EVENT</span>
          </h2>
          
          <p
            ref={aboutTextRef}
            className="text-sm sm:text-base md:text-lg lg:text-xl text-white/90 leading-relaxed max-w-4xl mb-8 sm:mb-10 md:mb-12 opacity-0 translate-y-20 transition-all duration-1000"
          >
            <span className="font-bold text-orange-500">BAYAN EVENT</span> adalah sebuah perjalanan pengalaman yang menyatukan energi, kreativitas, dan kolaborasi, dihadirkan melalui berbagai event berkelas yang menginspirasi. 
       Sejak tahun 2022, kami telah menghadirkan lebih dari <span className="font-bold text-orange-500">10+ event</span> yang mempertemukan ribuan peserta dari berbagai latar belakang membentuk komunitas yang solid, dinamis, dan penuh semangat.
          <br/><br/>
           Dalam rangka memperingati IPO PT Bayan Resources Tbk, momentum ini bukan hanya tentang langkah besar di dunia korporasi, tetapi juga tentang bagaimana BAYAN terus menyalakan energi kemajuan di berbagai lini termasuk melalui event-event signature kami.
            Dari <span className="font-bold">BAYAN OPEN</span> yang menampilkan kompetisi olahraga bergengsi, <span className="font-bold">BAYAN RUN</span> yang menguji ketahanan dan dedikasi para pelari, hingga <span className="font-bold">BAYAN CRAFT FESTIVAL</span> yang mendukung UMKM dan seniman lokal untuk memamerkan karya seni dan budaya
            setiap event dirancang untuk menciptakan momen tak terlupakan dan membangun komunitas yang solid.
            <br/><br/>
           Kami percaya bahwa event bukan sekadar acara tetapi pengalaman yang membentuk karakter, mempererat hubungan, dan mendorong setiap peserta untuk terus melaju lebih jauh, sejalan dengan semangat transformasi yang dibawa oleh PT Bayan Resources Tbk.
          </p>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 md:gap-8 lg:gap-12 mb-10 sm:mb-12 md:mb-16">
            <div className="text-center group hover:scale-105 transition-transform duration-300">
              <div className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-orange-600 mb-2 sm:mb-3 group-hover:text-orange-500 transition-colors">
                {stats.events}+
              </div>
              <div className="text-xs sm:text-sm md:text-base text-white/70 font-semibold tracking-wider uppercase">Total Events</div>
              <div className="text-[0.65rem] sm:text-xs text-white/40 mt-1 hidden sm:block">Successfully Organized</div>
            </div>
            <div className="text-center group hover:scale-105 transition-transform duration-300">
              <div className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-orange-600 mb-2 sm:mb-3 group-hover:text-orange-500 transition-colors">
                {stats.participants.toLocaleString()}+
              </div>
              <div className="text-xs sm:text-sm md:text-base text-white/70 font-semibold tracking-wider uppercase">Participants</div>
              <div className="text-[0.65rem] sm:text-xs text-white/40 mt-1 hidden sm:block">Across All Events</div>
            </div>
            <div className="text-center group hover:scale-105 transition-transform duration-300">
              <div className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-orange-600 mb-2 sm:mb-3 group-hover:text-orange-500 transition-colors">
                {stats.partners}+
              </div>
              <div className="text-xs sm:text-sm md:text-base text-white/70 font-semibold tracking-wider uppercase">Partners</div>
              <div className="text-[0.65rem] sm:text-xs text-white/40 mt-1 hidden sm:block">Trusted Collaborators</div>
            </div>
            <div className="text-center group hover:scale-105 transition-transform duration-300">
              <div className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-orange-600 mb-2 sm:mb-3 group-hover:text-orange-500 transition-colors">
                {stats.years}+
              </div>
              <div className="text-xs sm:text-sm md:text-base text-white/70 font-semibold tracking-wider uppercase">Years</div>
              <div className="text-[0.65rem] sm:text-xs text-white/40 mt-1 hidden sm:block">Of Excellence</div>
            </div>
          </div>

          {/* Info Cards 
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-4 sm:p-5 md:p-6 hover:bg-white/10 hover:border-orange-500/50 transition-all duration-300">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-orange-600/20 rounded-full flex items-center justify-center mb-3 sm:mb-4">
                <Award className="w-5 h-5 sm:w-6 sm:h-6 text-orange-600" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold mb-2">Premium Experience</h3>
              <p className="text-xs sm:text-sm text-white/60 leading-relaxed">Setiap event dirancang dengan standar kualitas tinggi untuk memberikan pengalaman terbaik bagi seluruh peserta.</p>
            </div>
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-4 sm:p-5 md:p-6 hover:bg-white/10 hover:border-orange-500/50 transition-all duration-300">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-orange-600/20 rounded-full flex items-center justify-center mb-3 sm:mb-4">
                <Users className="w-5 h-5 sm:w-6 sm:h-6 text-orange-600" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold mb-2">Community Building</h3>
              <p className="text-xs sm:text-sm text-white/60 leading-relaxed">Membangun komunitas solid yang saling mendukung dan menginspirasi satu sama lain melalui setiap kegiatan.</p>
            </div>
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-4 sm:p-5 md:p-6 hover:bg-white/10 hover:border-orange-500/50 transition-all duration-300 sm:col-span-2 md:col-span-1">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-orange-600/20 rounded-full flex items-center justify-center mb-3 sm:mb-4">
                <Calendar className="w-5 h-5 sm:w-6 sm:h-6 text-orange-600" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold mb-2">Consistent Excellence</h3>
              <p className="text-xs sm:text-sm text-white/60 leading-relaxed">Konsistensi dalam menghadirkan event berkualitas tinggi yang selalu dinanti oleh ribuan peserta setia kami.</p>
            </div>
          </div>*/}
        </div>
      </section>

      {/* Events Section */}
      <section id="events" ref={eventsRef} className="relative min-h-screen px-6 md:px-10 py-20 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-16 text-center text-blue-900">
            OUR <span className="text-orange-600">Events</span>
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="event-card group relative overflow-hidden opacity-0 translate-y-20 transition-all duration-700">
              <div className="aspect-[4/5] bg-gradient-to-br from-orange-600 to-orange-800 relative overflow-hidden">
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all duration-500" />
                <img 
                  src="/images/bayanopen.jpg" 
                  alt="BAYAN OPEN"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute bottom-0 left-0 right-0 p-8 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  <h3 className="text-4xl md:text-5xl font-black uppercase mb-4">BAYAN<br/>OPEN</h3>
                  <p className="text-sm text-white/80 mb-6">Turnamen olahraga tahunan yang mempertemukan atlet terbaik dalam kompetisi penuh semangat.</p>
                  <a
                    href="/events/bayanopen" 
                    className="flex items-center gap-2 text-sm font-bold tracking-wider uppercase hover:gap-4 transition-all"
                  >
                    LEARN MORE 
                    <ChevronDown className="rotate-[-90deg] w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>

            <div className="event-card group relative overflow-hidden opacity-0 translate-y-20 transition-all duration-700">
              <div className="aspect-[4/5] bg-gradient-to-br from-blue-600 to-blue-800 relative overflow-hidden">
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all duration-500" />
                <img 
                  src="/images/bayanrun.jpg" 
                  alt="BAYAN RUN"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute bottom-0 left-0 right-0 p-8 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  <h3 className="text-4xl md:text-5xl font-black uppercase mb-4">BAYAN<br/>RUN</h3>
                  <p className="text-sm text-white/80 mb-6">Event running tahunan yang menguji ketahanan dan dedikasi pelari dari berbagai kalangan.</p>
                  <a
                    href="https://bayanrun.com/" 
                    className="flex items-center gap-2 text-sm font-bold tracking-wider uppercase hover:gap-4 transition-all"
                  >
                    LEARN MORE 
                    <ChevronDown className="rotate-[-90deg] w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>

            <div className="event-card group relative overflow-hidden opacity-0 translate-y-20 transition-all duration-700">
              <div className="aspect-[4/5] bg-gradient-to-br from-purple-600 to-pink-600 relative overflow-hidden">
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all duration-500" />
                <img 
                  src="/images/bayancraft.jpg" 
                  alt="BAYAN CRAFT FESTIVAL"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute bottom-0 left-0 right-0 p-8 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  <h3 className="text-4xl md:text-5xl font-black uppercase mb-4">BAYAN<br/>CRAFT</h3>
                  <p className="text-sm text-white/80 mb-6">Festival tahunan yang mendukung UMKM dan seniman lokal untuk memamerkan karya seni dan budaya.</p>
                  <a
                    href="#gallery" 
                    className="flex items-center gap-2 text-sm font-bold tracking-wider uppercase hover:gap-4 transition-all"
                  >
                    LEARN MORE 
                    <ChevronDown className="rotate-[-90deg] w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="overflow-hidden w-full py-12 md:py-16 lg:py-20 bg-blue-900">
        <div className="text-center pb-8 md:pb-12">
          <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter text-white mb-4">
            Event <span className="text-orange-600">Gallery</span>
          </h2>
          <p className="text-white font-semibold text-lg">Explore memorable moments from our events</p>
        </div>
        
        <div className="relative">
          <div 
            ref={galleryTrackRef}
            className="flex w-max gap-6 md:gap-8 lg:gap-12"
          >
            {[...galleryImages, ...galleryImages].map((image, index) => (
              <div 
                key={index} 
                className="flex-shrink-0 group relative overflow-hidden rounded-2xl shadow-2xl hover:shadow-orange-500/50 transition-all duration-500"
              >
                <div className="relative w-[300px] h-[400px] md:w-[350px] md:h-[450px] lg:w-[400px] lg:h-[500px]">
                  <img
                    src={image}
                    alt={`Gallery ${index + 1}`}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="absolute bottom-6 left-6 text-white opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
                    <div className="text-sm font-bold tracking-wider uppercase">Bayan Event</div>
                    <div className="text-xs text-white/70 mt-1">Gallery #{(index % galleryImages.length) + 1}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Gradient Overlays */}
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white to-transparent pointer-events-none z-10"></div>
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-blue-900 to-transparent pointer-events-none z-10"></div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative px-6 md:px-10 py-12 bg-blue-900 border-t border-white/10">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <img
                src="/images/nextlevel.png"
                alt="BAYAN SC"
                className="h-24 md:h-24 object-contain"
              />
            </div>
            <div>
              <h4 className="text-sm font-bold tracking-wider uppercase mb-4">Quick Links</h4>
              <div className="space-y-2 text-sm text-white/60">
                <button onClick={() => smoothScrollTo('about')} className="block hover:text-white transition-colors cursor-pointer">About Us</button>
                <button onClick={() => smoothScrollTo('events')} className="block hover:text-white transition-colors cursor-pointer">Events</button>
                <button onClick={() => smoothScrollTo('gallery')} className="block hover:text-white transition-colors cursor-pointer">Gallery</button>
                <div className="hover:text-white transition-colors cursor-pointer">Contact</div>
              </div>
            </div>
            <div>
              <h4 className="text-sm font-bold tracking-wider uppercase mb-4">Follow Us</h4>
              <div className="flex gap-4">
                <Instagram className="w-5 h-5 hover:text-orange-600 transition-colors cursor-pointer" />
                <Linkedin className="w-5 h-5 hover:text-orange-600 transition-colors cursor-pointer" />
                <Mail className="w-5 h-5 hover:text-orange-600 transition-colors cursor-pointer" />
              </div>
            </div>
          </div>
          
          <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row font-semibold justify-between items-center gap-4 text-sm text-white">
            <div>© 2025 PT BAYAN RESOURCES TBK. All rights reserved.</div>
            <div>ICT BAYAN GROUP</div>
          </div>
        </div>
      </footer>
    </div>
  );
}