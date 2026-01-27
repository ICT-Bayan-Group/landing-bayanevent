"use client";
import { useState, useRef, useEffect } from 'react';
import { Calendar, MapPin, Clock, ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import gsap from 'gsap';

const routes = [
  {
    id: 1,
    title: "Half Marathon",
    distance: "21K",
    image: "https://bayanrun.com/assets/images/route21.jpg",
    date: "12 Oktober 2025",
    location: "Lapangan Merdeka 3, Balikpapan Kalimantan Timur",
    startTime: "05.30 WITA",
    cutOffTime: "4 Jam",
    description: "Tantangan sejati yang Anda nantikan! Rasakan sensasi berlari di pusat kota Balikpapan dan garis pantainya yang menawan. Rute ini memadukan jalanan kota dan pemandangan pelabuhan dengan variasi elevasi yang menantang, cocok bagi pelari berpengalaman yang mengejar rekor atau pengalaman lomba yang tak terlupakan.",
    gradient: "from-orange-400 to-red-600"
  },
  {
    id: 2,
    title: "10K Bayan Run 2025",
    distance: "10K",
    image: "https://bayanrun.com/assets/images/route10.jpg",
    date: "12 Oktober 2025",
    location: "Lapangan Merdeka 3, Balikpapan Kalimantan Timur",
    startTime: "06.00 WITA",
    cutOffTime: "2 Jam",
    description: "Perpaduan sempurna antara tantangan dan keindahan. Rute 10K membawa pelari melintasi jalan-jalan utama kota dan pesisir Balikpapan yang tenang. Dengan elevasi sedang dan lintasan yang cepat, rute ini ideal bagi pelari kompetitif maupun peserta rekreasional yang menginginkan pengalaman lomba yang memuaskan.",
    gradient: "from-blue-400 to-blue-600"
  },
  {
    id: 3,
    title: "5K Bayan Run 2025",
    distance: "5K",
    image: "https://bayanrun.com/assets/images/route5.jpg",
    date: "12 Oktober 2025",
    location: "Lapangan Merdeka 3, Balikpapan Kalimantan Timur",
    startTime: "06.10 WITA",
    cutOffTime: "1 Jam",
    description: "Nikmati lomba jarak pendek yang dinamis di jalanan kota yang datar dan bersahabat. 5K ini sempurna untuk pelari santai atau yang kembali berlari, menawarkan pengalaman seru tanpa tantangan ekstrem. Dukungan penonton dan lintasan yang mulus membuat suasana semakin semangat dari awal hingga akhir.",
    gradient: "from-green-400 to-emerald-600"
  },
  {
    id: 4,
    title: "Kids 2.5K Bayan Run 2025",
    distance: "2.5K",
    image: "https://bayanrun.com/assets/images/route2_3.jpg",
    date: "12 Oktober 2025",
    location: "Lapangan Merdeka 3, Balikpapan Kalimantan Timur",
    startTime: "06.20 WITA",
    cutOffTime: "50 Menit",
    description: "Dirancang untuk peserta usia 6–12 tahun, rute ini aman, menyenangkan, dan penuh semangat. Cocok untuk memperkenalkan dunia lari sejak dini, dengan suasana yang ramah, mendukung, dan pemandangan menarik sepanjang jalur lomba.",
    gradient: "from-purple-400 to-pink-600"
  }
];

const RoutesSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);

  const currentRoute = routes[currentIndex];

  const animateTransition = (direction: 'next' | 'prev') => {
    if (isAnimating) return;
    setIsAnimating(true);

    const tl = gsap.timeline({
      onComplete: () => {
        setIsAnimating(false);
      }
    });

    // Animate out current content
    tl.to(contentRef.current, {
      opacity: 0,
      x: direction === 'next' ? -50 : 50,
      duration: 0.3,
      ease: "power2.in"
    })
    .to(imageRef.current, {
      opacity: 0,
      scale: 0.95,
      duration: 0.3,
      ease: "power2.in"
    }, "<")
    .to(badgeRef.current, {
      scale: 0,
      rotate: -180,
      duration: 0.3,
      ease: "back.in"
    }, "<")
    .call(() => {
      // Change index
      setCurrentIndex((prev) => {
        if (direction === 'next') {
          return (prev + 1) % routes.length;
        } else {
          return (prev - 1 + routes.length) % routes.length;
        }
      });
    })
    // Animate in new content
    .fromTo(imageRef.current, 
      { opacity: 0, scale: 1.1 },
      { opacity: 1, scale: 1, duration: 0.5, ease: "power2.out" }
    )
    .fromTo(badgeRef.current,
      { scale: 0, rotate: 180 },
      { scale: 1, rotate: 0, duration: 0.5, ease: "back.out(1.7)" },
      "<0.2"
    )
    .fromTo(contentRef.current,
      { opacity: 0, x: direction === 'next' ? 50 : -50 },
      { opacity: 1, x: 0, duration: 0.5, ease: "power2.out" },
      "<0.1"
    );
  };

  const nextSlide = () => {
    animateTransition('next');
  };

  const prevSlide = () => {
    animateTransition('prev');
  };

  const goToSlide = (index: number) => {
    if (index === currentIndex || isAnimating) return;
    
    const direction = index > currentIndex ? 'next' : 'prev';
    const tl = gsap.timeline({
      onComplete: () => {
        setIsAnimating(false);
      }
    });

    setIsAnimating(true);

    tl.to([contentRef.current, imageRef.current, badgeRef.current], {
      opacity: 0,
      scale: 0.95,
      duration: 0.3,
      ease: "power2.in"
    })
    .call(() => {
      setCurrentIndex(index);
    })
    .fromTo([imageRef.current, contentRef.current, badgeRef.current],
      { opacity: 0, scale: 0.95 },
      { opacity: 1, scale: 1, duration: 0.5, ease: "power2.out", stagger: 0.1 }
    );
  };

  // Initial animation on mount
  useEffect(() => {
    const tl = gsap.timeline();
    
    tl.fromTo(cardRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
    )
    .fromTo(imageRef.current,
      { opacity: 0, scale: 0.9 },
      { opacity: 1, scale: 1, duration: 0.6, ease: "power2.out" },
      "<0.2"
    )
    .fromTo(badgeRef.current,
      { scale: 0, rotate: -180 },
      { scale: 1, rotate: 0, duration: 0.6, ease: "back.out(1.7)" },
      "<0.2"
    )
    .fromTo(contentRef.current,
      { opacity: 0, x: 50 },
      { opacity: 1, x: 0, duration: 0.6, ease: "power2.out" },
      "<0.1"
    );
  }, []);

  return (
    // PERBAIKAN 1: Tambahkan w-full, max-w-full, dan overflow-x-hidden
    <section 
      id="routes" 
      className="relative min-h-screen px-4 sm:px-6 md:px-8 lg:px-10 py-16 sm:py-20 bg-blue-900 w-full max-w-full overflow-x-hidden"
    >
      {/* PERBAIKAN 2: Batasi max-width container */}
      <div className="max-w-7xl mx-auto w-full">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12 px-4">
          <h2 className="text-3xl sm:text-4xl md:text-6xl font-black uppercase tracking-tighter text-white mb-4">
            PETA & <span className="text-orange-600">RUTE</span>
          </h2>
          <p className="text-white/90 text-sm sm:text-base md:text-lg max-w-3xl mx-auto leading-relaxed">
            Bayan Run 2025 menawarkan pengalaman lari yang menarik dan menantang di jantung kota Balikpapan, Kalimantan Timur. Setiap rute telah dirancang dengan cermat untuk menawarkan perpaduan keindahan alam, suasana urban, dan kenyamanan peserta.
          </p>
        </div>

        {/* Carousel Container - PERBAIKAN 3: Tambahkan overflow-hidden */}
        <div className="relative overflow-hidden">
          {/* Main Card */}
          <div ref={cardRef} className="bg-white rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl">
            <div className="grid lg:grid-cols-2 gap-0">
              {/* Image Side */}
              <div className="relative h-[350px] sm:h-[400px] md:h-[500px] lg:h-[650px] overflow-hidden bg-gray-100">
                <div ref={imageRef} className="relative w-full h-full">
                  <Image
                    src={currentRoute.image}
                    alt={currentRoute.title}
                    fill
                    className="object-contain"
                    priority
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>
                {/* PERBAIKAN 4: Responsive badge positioning dan sizing */}
                <div 
                  ref={badgeRef} 
                  className={`absolute top-4 left-4 sm:top-6 sm:left-6 bg-gradient-to-r ${currentRoute.gradient} px-4 py-2 sm:px-6 sm:py-3 md:px-8 md:py-4 rounded-full shadow-xl`}
                >
                  <span className="text-white font-black text-2xl sm:text-3xl md:text-4xl">{currentRoute.distance}</span>
                </div>
              </div>

              {/* Info Side - PERBAIKAN 5: Responsive padding */}
              <div className="p-6 sm:p-8 md:p-10 lg:p-12 flex flex-col justify-between">
                <div ref={contentRef}>
                  {/* PERBAIKAN 6: Responsive heading */}
                  <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-blue-900 mb-6 sm:mb-8 uppercase leading-tight">
                    {currentRoute.title}
                  </h3>

                  {/* Meta Information */}
                  <div className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
                    <div className="flex items-center gap-3 text-blue-900/80">
                      <div className="bg-orange-100 p-2 rounded-lg flex-shrink-0">
                        <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-orange-600" />
                      </div>
                      <span className="font-semibold text-sm sm:text-base">{currentRoute.date}</span>
                    </div>
                    <div className="flex items-start gap-3 text-blue-900/80">
                      <div className="bg-orange-100 p-2 rounded-lg flex-shrink-0">
                        <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-orange-600" />
                      </div>
                      <span className="font-semibold text-xs sm:text-sm">{currentRoute.location}</span>
                    </div>
                    <div className="flex items-start gap-3 text-blue-900/80">
                      <div className="bg-orange-100 p-2 rounded-lg flex-shrink-0">
                        <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-orange-600" />
                      </div>
                      <span className="font-semibold text-sm sm:text-base">{currentRoute.startTime} (COT = {currentRoute.cutOffTime})</span>
                    </div>
                  </div>

                  {/* Description - PERBAIKAN 7: Responsive text */}
                  <p className="text-blue-900/70 leading-relaxed text-sm sm:text-base mb-6">
                    {currentRoute.description}
                  </p>

                  {/* CTA Button - PERBAIKAN 8: Responsive button */}
                  <button className={`w-full sm:w-auto bg-gradient-to-r ${currentRoute.gradient} text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-bold text-xs sm:text-sm uppercase tracking-wider hover:shadow-xl transition-all duration-300 hover:scale-105`}>
                    Daftar Kategori Ini
                  </button>
                </div>

                {/* Navigation Dots */}
                <div className="flex items-center justify-center gap-2 sm:gap-3 mt-6 sm:mt-8">
                  {routes.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => goToSlide(index)}
                      disabled={isAnimating}
                      className={`rounded-full transition-all duration-300 ${
                        index === currentIndex 
                          ? 'w-10 sm:w-12 h-2.5 sm:h-3 bg-orange-600' 
                          : 'w-2.5 sm:w-3 h-2.5 sm:h-3 bg-blue-900/20 hover:bg-blue-900/40'
                      }`}
                      aria-label={`Go to slide ${index + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Buttons - Desktop */}
          <button
            onClick={prevSlide}
            disabled={isAnimating}
            className="absolute left-2 lg:left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-blue-900 p-3 lg:p-4 rounded-full shadow-xl transition-all duration-300 hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed hidden lg:block z-10"
            aria-label="Previous route"
          >
            <ChevronLeft className="w-5 h-5 lg:w-6 lg:h-6" />
          </button>
          <button
            onClick={nextSlide}
            disabled={isAnimating}
            className="absolute right-2 lg:right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-blue-900 p-3 lg:p-4 rounded-full shadow-xl transition-all duration-300 hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed hidden lg:block z-10"
            aria-label="Next route"
          >
            <ChevronRight className="w-5 h-5 lg:w-6 lg:h-6" />
          </button>
        </div>

        {/* Mobile Navigation */}
        <div className="flex lg:hidden justify-center gap-4 mt-6">
          <button
            onClick={prevSlide}
            disabled={isAnimating}
            className="bg-white text-blue-900 p-3 rounded-full shadow-lg hover:scale-110 transition-transform disabled:opacity-50"
            aria-label="Previous route"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={nextSlide}
            disabled={isAnimating}
            className="bg-white text-blue-900 p-3 rounded-full shadow-lg hover:scale-110 transition-transform disabled:opacity-50"
            aria-label="Next route"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Route Thumbnails - PERBAIKAN 9: Responsive grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mt-8 sm:mt-12">
          {routes.map((route, index) => (
            <button
              key={route.id}
              onClick={() => goToSlide(index)}
              disabled={isAnimating}
              className={`relative overflow-hidden rounded-lg sm:rounded-xl transition-all duration-300 group ${
                index === currentIndex 
                  ? 'ring-2 sm:ring-4 ring-orange-600 scale-105' 
                  : 'hover:scale-105 opacity-60 hover:opacity-100'
              }`}
            >
              <div className="relative h-28 sm:h-32 md:h-40 bg-gray-100">
                <Image
                  src={route.image}
                  alt={route.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 50vw, (max-width: 768px) 50vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-2 sm:bottom-3 left-2 sm:left-3 right-2 sm:right-3">
                  <span className="text-white font-black text-lg sm:text-xl block">{route.distance}</span>
                  <span className="text-white/80 text-[10px] sm:text-xs font-semibold uppercase line-clamp-1">{route.title}</span>
                </div>
                {index === currentIndex && (
                  <div className="absolute top-2 right-2 w-2.5 sm:w-3 h-2.5 sm:h-3 bg-orange-600 rounded-full animate-pulse" />
                )}
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RoutesSection;