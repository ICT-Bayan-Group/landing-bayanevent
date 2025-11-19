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
  const ctaSectionRef = useRef<HTMLElement>(null);
  const galleryTrackRef = useRef<HTMLDivElement>(null);
  const testimonialsRef = useRef<HTMLElement>(null);
  const partnersRef = useRef<HTMLElement>(null);
  const timelineRef = useRef<HTMLElement>(null);

  const [stats, setStats] = useState({ events: 0, participants: 0, partners: 0, years: 0 });
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [statsAnimated, setStatsAnimated] = useState(false);
  const [isWhiteSection, setIsWhiteSection] = useState(false);

  const galleryImages = [
    'https://res.cloudinary.com/dgcedsrzf/image/upload/v1763519206/photo-1_vrxzkt.jpg',
    'https://res.cloudinary.com/dgcedsrzf/image/upload/v1763519206/photo-3_wecnxn.jpg',
    'https://res.cloudinary.com/dgcedsrzf/image/upload/v1763519201/hero_cjhl1z.jpg',
    'https://res.cloudinary.com/dgcedsrzf/image/upload/v1763519195/craft2_bu0ild.jpg',
    'https://res.cloudinary.com/dgcedsrzf/image/upload/v1763519201/medali_xmg8cw.jpg',
    'https://res.cloudinary.com/dgcedsrzf/image/upload/v1763519201/hero_cjhl1z.jpg',
    'https://res.cloudinary.com/dgcedsrzf/image/upload/v1763519208/photo-4_yhivjf.jpg',
    'https://res.cloudinary.com/dgcedsrzf/image/upload/v1763519900/DJI_20251012090310_0032_D_uy1q3c.jpg',
    'https://res.cloudinary.com/dgcedsrzf/image/upload/v1763519898/20251012061749_-_BOM_0335_1_sdvtol.jpg'
  ];

  const testimonials = [
    {
      name: "Agus Setiawan",
      role: "Peserta BAYAN RUN 2024",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop",
      quote: "BAYAN RUN adalah pengalaman luar biasa! Rute yang menantang, organisasi yang profesional, dan semangat kebersamaan yang luar biasa. Tidak sabar untuk ikut lagi tahun depan!"
    },
    {
      name: "Sarah Wijaya",
      role: "Atlet BAYAN OPEN 2023",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop",
      quote: "Turnamen yang sangat terorganisir dengan baik. Fasilitas kelas dunia dan atmosfer kompetisi yang fair play. BAYAN OPEN benar-benar mengangkat standar event olahraga di Indonesia."
    },
    {
      name: "Budi Hartono",
      role: "Vendor BAYAN CRAFT 2024",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop",
      quote: "Sebagai pelaku UMKM, BAYAN CRAFT memberikan platform yang sempurna untuk memamerkan produk kami. Footfall yang tinggi dan audience yang tepat sasaran. Highly recommended!"
    }
  ];

  const partners = [
    { name: "Partner 1", logo: "https://via.placeholder.com/150x80/1e3a8a/ffffff?text=PARTNER+1" },
    { name: "Partner 2", logo: "https://via.placeholder.com/150x80/1e3a8a/ffffff?text=PARTNER+2" },
    { name: "Partner 3", logo: "https://via.placeholder.com/150x80/1e3a8a/ffffff?text=PARTNER+3" },
    { name: "Partner 4", logo: "https://via.placeholder.com/150x80/1e3a8a/ffffff?text=PARTNER+4" },
    { name: "Partner 5", logo: "https://via.placeholder.com/150x80/1e3a8a/ffffff?text=PARTNER+5" },
    { name: "Partner 6", logo: "https://via.placeholder.com/150x80/1e3a8a/ffffff?text=PARTNER+6" },
  ];

  const timeline = [
    { year: "2022", title: "The Beginning", description: "Bayan Run 2022 | Bayan Open 2022 | Bayan CraftArt Fest 2022" },
    { year: "2023", title: "Rapid Growth", description: "Bayan Run 2023 | Bayan Open 2023 | Bayan CraftArt Fest 2023" },
    { year: "2024", title: "Future Vision", description: "Bayan Run 2024 | Bayan Open 400 2024 | Bayan CraftArt Fest 2024" },
    { year: "2025", title: "The Next Level", description: "Bayan Run 2025 | Bayan Open Sirnas C 2025 | Bayan CraftArt Fest 2025" }
  ];

  // Smooth scroll function
  const smoothScrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const headerHeight = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerHeight;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  // Counter animation dengan smooth easing
  const animateStats = () => {
    const targets = { events: 10, participants: 20000, partners: 10, years: 3 };
    const duration = 2000;
    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      const eased = 1 - Math.pow(1 - progress, 4);
      
      setStats({
        events: Math.floor(targets.events * eased),
        participants: Math.floor(targets.participants * eased),
        partners: Math.floor(targets.partners * eased),
        years: Math.floor(targets.years * eased)
      });

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setStats(targets);
      }
    };

    requestAnimationFrame(animate);
  };

  useEffect(() => {
    // Preloader animation
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
    }

    const cycleWords = () => {
      if (currentIndex >= words.length - 1) {
        setTimeout(() => {
          if (preloaderRef.current) {
            preloaderRef.current.style.transform = 'translateY(-100%)';
            preloaderRef.current.style.transition = 'transform 0.8s cubic-bezier(0.76, 0, 0.24, 1)';
            
            setTimeout(() => {
              if (preloaderRef.current) preloaderRef.current.style.display = 'none';
              initMainAnimations();
            }, 800);
          }
        }, 600);
        return;
      }

      currentIndex++;

      if (preloaderWord && preloaderRef.current) {
        preloaderRef.current.style.background = colors[currentIndex];
        preloaderWord.style.opacity = '0';
        preloaderWord.style.transform = 'translateY(-20px)';

        setTimeout(() => {
          if (preloaderWord) {
            preloaderWord.textContent = words[currentIndex];
            preloaderWord.style.opacity = '1';
            preloaderWord.style.transform = 'translateY(0)';
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
          }, delay);
        }
      });

      if (window.innerWidth > 768) {
        const handleMouseMove = (e: MouseEvent) => {
          const x = (e.clientX / window.innerWidth - 0.5) * 2;
          const y = (e.clientY / window.innerHeight - 0.5) * 2;
          if (titleRef.current) {
            titleRef.current.style.transform = `translate(${x * 15}px, ${y * 15}px)`;
          }
        };
        window.addEventListener('mousemove', handleMouseMove);
      }

      const handleScroll = () => {
        const windowHeight = window.innerHeight;
        const headerHeight = 80;
        let isInWhiteSection = false;

        // Check Events Section (bg-white)
        if (eventsRef.current) {
          const eventsRect = eventsRef.current.getBoundingClientRect();
          if (eventsRect.top <= headerHeight && eventsRect.bottom >= headerHeight) {
            isInWhiteSection = true;
          }
        }

        // Check CTA Section (bg-white)
        if (ctaSectionRef.current) {
          const ctaRect = ctaSectionRef.current.getBoundingClientRect();
          if (ctaRect.top <= headerHeight && ctaRect.bottom >= headerHeight) {
            isInWhiteSection = true;
          }
        }

        setIsWhiteSection(isInWhiteSection);

        // About section
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

        // Events section
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
      };

      window.addEventListener('scroll', handleScroll);
      handleScroll();
    };

    // Video autoplay
    const playVideo = async () => {
      if (videoRef.current) {
        try {
          videoRef.current.muted = true;
          videoRef.current.playsInline = true;
          await videoRef.current.play();
        } catch (err) {
          const playOnInteraction = async () => {
            try {
              if (videoRef.current) await videoRef.current.play();
            } catch (error) {
              console.error('Video play failed:', error);
            }
          };
          document.addEventListener('click', playOnInteraction, { once: true });
        }
      }
    };

    setTimeout(playVideo, 3000);

    // Gallery auto-scroll dengan smooth animation
    const galleryTrack = galleryTrackRef.current;
    if (galleryTrack) {
      let position = 0;
      let lastTime = performance.now();
      const speed = 0.03;
      
      const animateGallery = (currentTime: number) => {
        const deltaTime = currentTime - lastTime;
        lastTime = currentTime;
        
        position -= speed * deltaTime;
        
        const totalWidth = galleryTrack.scrollWidth / 2;
        if (Math.abs(position) >= totalWidth) {
          position = 0;
        }
        
        galleryTrack.style.transform = `translateX(${position}px)`;
        requestAnimationFrame(animateGallery);
      };
      
      requestAnimationFrame(animateGallery);
    }
  }, [statsAnimated]);

  return (
    <div className="text-white overflow-x-hidden scroll-smooth">
      {/* Preloader */}
      <div
        ref={preloaderRef}
        className="fixed inset-0 z-[9999] flex items-center justify-center"
        style={{ background: 'linear-gradient(135deg, #d86609ff 0%, #ec8804ff 100%)' }}
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
        >
          <source
            src="https://res.cloudinary.com/dgcedsrzf/video/upload/v1763518716/Mars_Bayan_update_2025_kompress_bvjqld.mp4"
            type="video/mp4"
          />
        </video>
      </div>

      <div className="fixed inset-0 bg-black/60 -z-10" />

      {/* Header */}
      <header ref={headerRef} className="fixed top-0 left-0 right-0 z-50 opacity-0 translate-y-[-20px] transition-all duration-1000">
        <div className="px-6 py-4 md:px-10 md:py-6 flex justify-between items-center">
          <img
            src={isWhiteSection ? "https://res.cloudinary.com/dgcedsrzf/image/upload/v1763519204/black_uqk69m.png" : "https://res.cloudinary.com/dgcedsrzf/image/upload/v1763519200/nextlevel_aqk8gz.png"}
            alt="BAYAN SC"
            className="h-8 md:h-20 object-contain transition-all duration-500 ease-in-out"
          />
          <nav className={`hidden md:flex gap-8 text-sm font-semibold tracking-wider transition-colors duration-500 ${isWhiteSection ? 'text-blue-900' : 'text-white'}`}>
            <button onClick={() => smoothScrollTo('about')} className={`transition-colors ${isWhiteSection ? 'hover:text-orange-600' : 'hover:text-orange-500'}`}>ABOUT</button>
            <button onClick={() => smoothScrollTo('events')} className={`transition-colors ${isWhiteSection ? 'hover:text-orange-600' : 'hover:text-orange-500'}`}>EVENTS</button>
            <button onClick={() => smoothScrollTo('timeline')} className={`transition-colors ${isWhiteSection ? 'hover:text-orange-600' : 'hover:text-orange-500'}`}>TIMELINE</button>
            <button onClick={() => smoothScrollTo('testimonials')} className={`transition-colors ${isWhiteSection ? 'hover:text-orange-600' : 'hover:text-orange-500'}`}>TESTIMONIALS</button>
            <button onClick={() => smoothScrollTo('gallery')} className={`transition-colors ${isWhiteSection ? 'hover:text-orange-600' : 'hover:text-orange-500'}`}>GALLERY</button>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 md:px-10">
        <div className="max-w-7xl w-full text-center">
          <h1
            ref={titleRef}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-[10rem] 2xl:text-[12rem] font-black text-white uppercase leading-[0.85] tracking-tighter opacity-0 translate-y-20 transition-all duration-1000"
            style={{ textShadow: '0 20px 60px rgba(0,0,0,0.8)' }}
          >
            BAYAN<br />EVENT
          </h1>

          <p
            ref={subtitleRef}
            className="mt-4 sm:mt-6 md:mt-10 text-[0.6rem] sm:text-xs md:text-sm text-white/90 font-medium tracking-[0.2em] sm:tracking-[0.3em] uppercase opacity-0 translate-y-10 transition-all duration-1000 max-w-2xl mx-auto px-4"
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
          className="absolute bottom-6 sm:bottom-8 translate-x-1/2 opacity-0 translate-y-10 cursor-pointer transition-all duration-1000"
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
            About<br />
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
                  src="https://res.cloudinary.com/dgcedsrzf/image/upload/v1763519199/bayanopen_gxlw2z.jpg" 
                  alt="BAYAN OPEN"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute bottom-0 left-0 right-0 p-8 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  <h3 className="text-4xl md:text-5xl font-black uppercase mb-4">BAYAN<br/>OPEN</h3>
                  <p className="text-sm text-white/80 mb-6">Turnamen olahraga tahunan yang mempertemukan atlet terbaik dalam kompetisi penuh semangat.</p>
                  <a href="/events/bayanopen" className="flex items-center gap-2 text-sm font-bold tracking-wider uppercase hover:gap-4 transition-all">
                    LEARN MORE <ChevronDown className="rotate-[-90deg] w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>

            <div className="event-card group relative overflow-hidden opacity-0 translate-y-20 transition-all duration-700">
              <div className="aspect-[4/5] bg-gradient-to-br from-blue-600 to-blue-800 relative overflow-hidden">
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all duration-500" />
                <img 
                  src="https://res.cloudinary.com/dgcedsrzf/image/upload/v1763519206/bayanrun_lhaqwe.jpg" 
                  alt="BAYAN RUN"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute bottom-0 left-0 right-0 p-8 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  <h3 className="text-4xl md:text-5xl font-black uppercase mb-4">BAYAN<br/>RUN</h3>
                  <p className="text-sm text-white/80 mb-6">Event running tahunan yang menguji ketahanan dan dedikasi pelari dari berbagai kalangan.</p>
                  <a href="https://bayanrun.com/" className="flex items-center gap-2 text-sm font-bold tracking-wider uppercase hover:gap-4 transition-all">
                    LEARN MORE <ChevronDown className="rotate-[-90deg] w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>

            <div className="event-card group relative overflow-hidden opacity-0 translate-y-20 transition-all duration-700">
              <div className="aspect-[4/5] bg-gradient-to-br from-purple-600 to-pink-600 relative overflow-hidden">
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all duration-500" />
                <img 
                  src="https://res.cloudinary.com/dgcedsrzf/image/upload/v1763519196/bayancraft_obrgla.jpg" 
                  alt="BAYAN CRAFT FESTIVAL"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute bottom-0 left-0 right-0 p-8 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  <h3 className="text-4xl md:text-5xl font-black uppercase mb-4">BAYAN<br/>CRAFT</h3>
                  <p className="text-sm text-white/80 mb-6">Festival tahunan yang mendukung UMKM dan seniman lokal untuk memamerkan karya seni dan budaya.</p>
                  <a href="#gallery" className="flex items-center gap-2 text-sm font-bold tracking-wider uppercase hover:gap-4 transition-all">
                    LEARN MORE <ChevronDown className="rotate-[-90deg] w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section id="timeline" ref={timelineRef} className="relative min-h-screen px-6 md:px-10 py-20 overflow-hidden">
        <div className="absolute inset-0 w-full h-full">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          >
            <source src="https://res.cloudinary.com/dgcedsrzf/video/upload/v1763532560/teaser_c0bxdo.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-black/60"></div>
        </div>

        <div className="relative z-10 max-w-6xl mx-auto">
          <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-4 text-center text-white">
            Our <span className="text-orange-600">Journey</span>
          </h2>
          <p className="text-center text-white/70 mb-16 text-lg">Perjalanan kami dalam menghadirkan event menarik di Balikpapan</p>

          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-orange-600 via-orange-500 to-orange-600 hidden md:block"></div>

            {timeline.map((item, index) => (
              <div key={index} className={`mb-16 flex items-center ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} flex-col`}>
                <div className={`w-full md:w-5/12 ${index % 2 === 0 ? 'md:text-right md:pr-12' : 'md:text-left md:pl-12'} mb-8 md:mb-0`}>
                  <div className="inline-block bg-orange-600 text-white px-6 py-2 rounded-full text-2xl font-black mb-4">
                    {item.year}
                  </div>
                  <h3 className="text-3xl font-black text-white mb-3">{item.title}</h3>
                  <p className="text-white/70 text-lg">{item.description}</p>
                </div>
                
                <div className="hidden md:flex w-2/12 justify-center">
                  <div className="w-6 h-6 bg-orange-600 rounded-full border-4 border-blue-900 relative z-10 shadow-lg shadow-orange-500/50"></div>
                </div>
                
                <div className="w-full md:w-5/12"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" ref={testimonialsRef} className="relative min-h-screen px-6 md:px-10 py-20 bg-gradient-to-br from-blue-950 via-blue-900 to-blue-950">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-4 text-center text-white">
            What They <span className="text-orange-600">Say</span>
          </h2>
          <p className="text-center text-white/70 mb-16 font-semibold text-lg">Apa kata mereka tentang event kami</p>

          <div className="relative">
            <div className="grid md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <div 
                  key={index}
                  className="bg-gradient-to-br from-blue-50 to-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-blue-100"
                >
                  <div className="flex items-center mb-6">
                    <img 
                      src={testimonial.image} 
                      alt={testimonial.name}
                      className="w-16 h-16 rounded-full object-cover border-4 border-orange-500"
                    />
                    <div className="ml-4">
                      <h4 className="font-bold text-blue-900 text-lg">{testimonial.name}</h4>
                      <p className="text-sm text-gray-600">{testimonial.role}</p>
                    </div>
                  </div>
                  <div className="text-6xl text-orange-500 mb-4 opacity-20">"</div>
                  <p className="text-gray-700 leading-relaxed italic">
                    {testimonial.quote}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Schedule Section */}
      <section className="relative min-h-screen px-6 md:px-10 py-20 bg-gradient-to-br from-orange-600 via-orange-500 to-orange-600">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-4 text-center text-white">
            JADWAL <span className="text-blue-900">BAYAN EVENT</span>
          </h2>
          <p className="text-center text-white/90 mb-16 text-lg">Berikut Untuk Jadwal Bayan Event Hari ini</p>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white/10 backdrop-blur-md p-8 rounded-2xl border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105">
              <div className="w-33 h-33 mx-auto mb-6 flex items-center justify-center">
                <img 
                  src="https://res.cloudinary.com/dgcedsrzf/image/upload/v1763524204/LOGO_EVENT_Bayan_2025_skeag0.png" 
                  alt="Bayan Event 2025"
                  className="w-full h-full object-contain"
                />
              </div>
              <h3 className="text-2xl font-black text-center text-white mb-4">Bayan CraftArt Festival</h3>
              <p className="text-white/80 leading-relaxed text-center font-semibold">
               BSCC Dome Balikpapan
              </p>
               <p className="text-white/80 leading-relaxed text-center font-semibold">
               4 - 10 Agustus 2025
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-md p-8 rounded-2xl border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105">
              <div className="w-42 h-42 mx-auto mb-6 flex items-center justify-center">
                <img 
                  src="https://res.cloudinary.com/dgcedsrzf/image/upload/v1763524200/LOGO_BR2025_2_uyb9q4.png" 
                  alt="Bayan Run 2025"
                  className="w-full h-full object-contain"
                />
              </div>
              <h3 className="text-2xl font-black text-white text-center mb-4">Bayan Run</h3>
              <p className="text-white/80 leading-relaxed text-center font-semibold">
               Lapangan Merdeka Balikpapan
              </p>
               <p className="text-white/80 leading-relaxed text-center font-semibold">
               12 Oktober 2025
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-md p-8 rounded-2xl border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105">
              <div className="w-42 h-42 mx-auto mb-6 flex items-center justify-center">
                <img 
                  src="https://res.cloudinary.com/dgcedsrzf/image/upload/v1763524200/LOGO_BO2025_mqhcsr.png" 
                  alt="Bayan OPEN 2025"
                  className="w-full h-full object-contain"
                />
              </div>
              <h3 className="text-2xl font-black text-center text-white mb-4">Bayan Open</h3>
               <p className="text-white/80 leading-relaxed text-center font-semibold">
               BSCC Dome Balikpapan
              </p>
               <p className="text-white/80 leading-relaxed text-center font-semibold">
               4 - 9 Agustus 2025
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="overflow-hidden w-full py-12 md:py-16 lg:py-20 bg-blue-950">
        <div className="text-center pb-8 md:pb-12">
          <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter text-white mb-4">
            Event <span className="text-orange-600">Gallery</span>
          </h2>
          <p className="text-white/70 font-semibold text-lg">Explore memorable moments from our events</p>
        </div>
        
        <div className="relative">
          <div ref={galleryTrackRef} className="flex w-max gap-6 md:gap-8 lg:gap-12">
            {[...galleryImages, ...galleryImages].map((image, index) => (
              <div key={index} className="flex-shrink-0 group relative overflow-hidden rounded-2xl shadow-2xl hover:shadow-orange-500/50 transition-all duration-500">
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
          
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-blue-950 to-transparent pointer-events-none z-10"></div>
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-blue-950 to-transparent pointer-events-none z-10"></div>
        </div>
      </section>

      {/* CTA Section */}
      <section ref={ctaSectionRef} className="relative min-h-[60vh] px-6 md:px-10 py-20 bg-white flex items-center justify-center">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-black uppercase tracking-tighter text-blue-900 mb-6">
            Ready to Join<br />
            <span className="text-orange-600">The Movement?</span>
          </h2>
          <p className="text-blue-900 text-lg md:text-xl font-semibold mb-10 leading-relaxed max-w-2xl mx-auto">
            Bergabunglah dengan ribuan peserta lainnya dalam event-event spektakuler kami. 
            Jadilah bagian dari komunitas yang terus berkembang dan berprestasi.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => smoothScrollTo('events')}
              className="px-10 py-5 bg-orange-600 text-white text-sm font-black tracking-wider uppercase transition-all duration-500 hover:bg-orange-700 hover:scale-105 hover:shadow-2xl"
            >
              EXPLORE EVENTS
            </button>
            <button className="px-10 py-5 bg-blue-900 text-white text-sm font-black tracking-wider uppercase transition-all duration-500 hover:bg-gray-100 hover:scale-105 hover:shadow-2xl">
              CONTACT US
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative px-6 md:px-10 py-12 bg-blue-950 border-t border-white/10">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div className="md:col-span-1">
              <img
                src="https://res.cloudinary.com/dgcedsrzf/image/upload/v1763519200/nextlevel_aqk8gz.png"
                alt="BAYAN SC"
                className="h-16 md:h-20 object-contain mb-4"
              />
              <p className="text-white/60 text-sm leading-relaxed">
                Menghadirkan event yang dikelola Bayan Group sejak 2022.
              </p>
            </div>
            <div>
              <h4 className="text-sm font-bold tracking-wider uppercase mb-4 text-white">Quick Links</h4>
              <div className="space-y-2 text-sm text-white/60">
                <button onClick={() => smoothScrollTo('about')} className="block hover:text-white transition-colors">About Us</button>
                <button onClick={() => smoothScrollTo('events')} className="block hover:text-white transition-colors">Events</button>
                <button onClick={() => smoothScrollTo('timeline')} className="block hover:text-white transition-colors">Timeline</button>
                <button onClick={() => smoothScrollTo('gallery')} className="block hover:text-white transition-colors">Gallery</button>
              </div>
            </div>
            <div>
              <h4 className="text-sm font-bold tracking-wider uppercase mb-4 text-white">Contact</h4>
              <div className="space-y-2 text-sm text-white/60">
                <div>Email: bayanopen@gmail.com</div>
                <div>Phone: +62 8215 4815 113</div>
                <div>Balikpapan, Kalimantan Timur</div>
              </div>
            </div>
            <div>
              <h4 className="text-sm font-bold tracking-wider uppercase mb-4 text-white">Follow Us</h4>
              <div className="flex gap-4 mb-4">
                <Instagram className="w-5 h-5 hover:text-orange-600 transition-colors cursor-pointer" />
                <Linkedin className="w-5 h-5 hover:text-orange-600 transition-colors cursor-pointer" />
                <Mail className="w-5 h-5 hover:text-orange-600 transition-colors cursor-pointer" />
              </div>
              <p className="text-white/60 text-xs">
                Stay updated with our latest events and news
              </p>
            </div>
          </div>
          
          <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row font-semibold justify-between items-center gap-4 text-sm text-white/60">
            <div>© 2025 PT BAYAN RESOURCES TBK. All rights reserved.</div>
            <div>Powered by ICT BAYAN GROUP</div>
          </div>
        </div>
      </footer>
    </div>
  );
}