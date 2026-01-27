"use client";
import { useEffect, useRef, useState } from 'react';
import { ChevronDown, Trophy, Users, Calendar, MapPin, Instagram, Linkedin, Mail, Clock, Heart } from 'lucide-react';
import Preloader from '@/components/layout/Preloader';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import RacePackCarousel from '@/components/Racepack';
import RoutesSection from '@/components/RoutesSection';
import GalleryRun from '@/components/GalleryRun';
export default function BayanRun() {
  const [isLoading, setIsLoading] = useState(true);
  const [isWhiteSection, setIsWhiteSection] = useState(false);
  const [stats, setStats] = useState({ runners: 0, distance: 0, years: 0, countries: 0 });
  const [statsAnimated, setStatsAnimated] = useState(false);

  const heroRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const categoriesRef = useRef<HTMLDivElement>(null);
  const racepackRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const categories = [
    {
      icon: "🏃",
      distance: "5K",
      title: "FUN RUN",
      description: "Kategori untuk pemula dan keluarga yang ingin menikmati lari santai",
      time: "Pukul 06.10 WITA",
      cutOff: "1 Jam",
      color: "from-green-400 to-emerald-600"
    },
    {
      icon: "🏃‍♂️",
      distance: "10K",
      title: "CHALLENGE RUN",
      description: "Untuk pelari dengan pengalaman menengah yang siap menghadapi tantangan",
      time: "Pukul 06.00 WITA",
      cutOff: "2 Jam",
      color: "from-blue-400 to-blue-600"
    },
    {
      icon: "⚡",
      distance: "21K",
      title: "HALF MARATHON",
      description: "Ajang kompetisi serius untuk pelari berpengalaman dan atlet profesional",
      time: "Pukul 05.30 WITA",
      cutOff: "4 Jam",
      color: "from-orange-400 to-red-600"
    },
    {
      icon: "👶",
      distance: "2.5K",
      title: "KIDS RUN",
      description: "Dirancang untuk peserta usia 6-12 tahun dengan rute yang aman dan menyenangkan",
      time: "Pukul 06.20 WITA",
      cutOff: "50 Menit",
      color: "from-yellow-300 to-yellow-500"
    }
  ];

  const eventSchedule = [
    {
      title: "Racepack Collection",
      date: "Sabtu, 11 Oktober 2025",
      time: "08:00 - 19:00 WITA",
      location: "Gedung Kesenian Balikpapan"
    },
    {
      title: "Race Day",
      date: "Minggu, 12 Oktober 2025",
      time: "05:30 WITA (Start)",
      location: "Lapangan Merdeka III Balikpapan"
    }
  ];

  const smoothScrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const headerHeight = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerHeight;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  const animateStats = () => {
    const targets = { runners: 8000, distance: 21, years: 4, countries: 3 };
    const duration = 2000;
    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 4);
      
      setStats({
        runners: Math.floor(targets.runners * eased),
        distance: Math.floor(targets.distance * eased),
        years: Math.floor(targets.years * eased),
        countries: Math.floor(targets.countries * eased)
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
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const headerHeight = 80;
      let isInWhite = false;

      if (categoriesRef.current || racepackRef.current) {
        const categoriesRect = categoriesRef.current?.getBoundingClientRect();
        const racepackRect = racepackRef.current?.getBoundingClientRect();
        
        if ((categoriesRect && categoriesRect.top <= headerHeight && categoriesRect.bottom >= headerHeight) ||
            (racepackRect && racepackRect.top <= headerHeight && racepackRect.bottom >= headerHeight)) {
          isInWhite = true;
        }
      }

      setIsWhiteSection(isInWhite);

      if (aboutRef.current) {
        const aboutTop = aboutRef.current.getBoundingClientRect().top;
        if (aboutTop < windowHeight * 0.75 && !statsAnimated) {
          animateStats();
          setStatsAnimated(true);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [statsAnimated]);

  return (
    <div className="text-white overflow-x-hidden">
      {isLoading && (
        <Preloader
          logoSrc="https://res.cloudinary.com/djs5pi7ev/image/upload/w_400,q_auto,f_auto/v1767777417/LOGO_BR2025_2_ph1bh8.png"
          logoAlt="Bayan Run 2025"
          onComplete={() => setIsLoading(false)}
        />
      )}

      <Header isWhiteSection={isWhiteSection} currentPage="bayanrun" />

      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center px-6 md:px-10">
       <div className="fixed inset-0 -z-20">
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          onEnded={(e) => {
            const video = e.currentTarget;
            video.currentTime = 0;
            video.play();
          }}
        >
          <source
            src="https://res.cloudinary.com/djs5pi7ev/video/upload/q_auto:low/v1769479898/bayanrun-video_ifpuhz.mp4"
            type="video/mp4"
          />
        </video>
      </div>
           <div className="fixed inset-0 bg-black/60 -z-10" />
        <div className="max-w-7xl w-full text-center">
          <div className="mb-8">
            <img
              src="https://res.cloudinary.com/djs5pi7ev/image/upload/w_400,q_auto,f_auto/v1767777417/LOGO_BR2025_2_ph1bh8.png"
              alt="Bayan Run 2025"
              className="h-40 md:h-60 mx-auto object-contain"
            />
          </div>
          <p className="text-sm md:text-lg text-white/90 font-semibold tracking-wider uppercase mb-8 max-w-3xl mx-auto">
            KEEP MOVING • KEEP STRONG
          </p>

          <div className="flex flex-wrap justify-center gap-6 mb-12">
            <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md px-6 py-3 rounded-full border border-white/20">
              <Calendar className="w-5 h-5 text-orange-500" />
              <span className="font-semibold">12 Oktober 2025</span>
            </div>
            <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md px-6 py-3 rounded-full border border-white/20">
              <MapPin className="w-5 h-5 text-orange-500" />
              <span className="font-semibold">Lapangan Merdeka Balikpapan</span>
            </div>
            <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md px-6 py-3 rounded-full border border-white/20">
              <Clock className="w-5 h-5 text-orange-500" />
              <span className="font-semibold">Start: 05.30 WITA</span>
            </div>
          </div>

          <button 
            onClick={() => smoothScrollTo('categories')}
            className="px-12 py-5 bg-orange-600 text-white text-sm font-black tracking-wider uppercase transition-all duration-500 hover:bg-orange-700 hover:scale-105 hover:shadow-2xl"
          >
            DAFTAR SEKARANG
          </button>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
          <ChevronDown className="w-6 h-6 animate-bounce text-white/60" />
        </div>
      </section>

      {/* About Section */}
      <section id="about" ref={aboutRef} className="relative min-h-screen px-6 md:px-10 py-20 bg-blue-900">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-black uppercase tracking-tighter mb-8">
            TENTANG<br />
            <span className="text-orange-600">BAYAN RUN</span>
          </h2>

          <p className="text-base md:text-lg text-white/90 leading-relaxed mb-12 max-w-4xl">
            <span className="font-bold text-orange-500">BAYAN RUN</span> adalah ajang lomba lari tahunan persembahan dari PT Bayan Resources Tbk yang kini telah menginjak tahun keempat penyelenggaraan sejak pertama kali diselenggarakan pada tahun 2022 di Balikpapan.
            <br /><br />
            BAYAN RUN 2025 akan diselenggarakan di Lapangan Merdeka 3 Balikpapan pada tanggal 12 Oktober 2025. Event ini merupakan wujud komitmen PT Bayan Resources Tbk terhadap kesehatan serta kesejahteraan masyarakat.
            <br /><br />
            Melalui BAYAN RUN 2025 peserta ditantang untuk menunjukkan kecepatan, daya tahan, dan semangat juang yang tinggi. Dengan persaingan yang sengit serta semangat untuk mencapai tujuan, menjadikan setiap langkah merupakan bukti dedikasi dan latihan keras.
            <br /><br />
            Mari Bersama membangun bangsa dengan menjadi bagian dari <span className="font-bold text-orange-500">BAYAN RUN 2025</span>.
          </p>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            <div className="text-center group hover:scale-105 transition-transform">
              <div className="text-5xl md:text-7xl font-black text-orange-600 mb-3 group-hover:text-orange-500 transition-colors">
                {stats.runners}+
              </div>
              <div className="text-sm md:text-base text-white/70 font-semibold tracking-wider uppercase">Target Pelari</div>
            </div>
            <div className="text-center group hover:scale-105 transition-transform">
              <div className="text-5xl md:text-7xl font-black text-orange-600 mb-3 group-hover:text-orange-500 transition-colors">
                {stats.distance}K
              </div>
              <div className="text-sm md:text-base text-white/70 font-semibold tracking-wider uppercase">Max Distance</div>
            </div>
            <div className="text-center group hover:scale-105 transition-transform">
              <div className="text-5xl md:text-7xl font-black text-orange-600 mb-3 group-hover:text-orange-500 transition-colors">
                {stats.years}
              </div>
              <div className="text-sm md:text-base text-white/70 font-semibold tracking-wider uppercase">Tahun</div>
            </div>
            <div className="text-center group hover:scale-105 transition-transform">
              <div className="text-5xl md:text-7xl font-black text-orange-600 mb-3 group-hover:text-orange-500 transition-colors">
                {stats.countries}
              </div>
              <div className="text-sm md:text-base text-white/70 font-semibold tracking-wider uppercase">Negara</div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section id="categories" ref={categoriesRef} className="relative min-h-screen px-6 md:px-10 py-20 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-4 text-center text-blue-900">
            PILIH <span className="text-orange-600">KATEGORI</span>
          </h2>
          <p className="text-center text-blue-900/70 mb-16 font-semibold text-lg">Temukan kategori yang sesuai dengan level Anda</p>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {categories.map((category, index) => (
              <div key={index} className={`bg-gradient-to-br ${category.color} p-8 rounded-2xl text-white hover:scale-105 transition-all duration-300 hover:shadow-2xl`}>
                <div className="text-6xl mb-4">{category.icon}</div>
                <div className="text-4xl font-black mb-2">{category.distance}</div>
                <h3 className="text-2xl font-black mb-4 uppercase">{category.title}</h3>
                <p className="text-white/90 mb-4 leading-relaxed text-sm">{category.description}</p>
                <div className="space-y-2 text-sm font-semibold">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>{category.time}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Trophy className="w-4 h-4" />
                    <span>COT: {category.cutOff}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Event Schedule Section */}
      <section className="relative px-6 md:px-10 py-20 bg-gradient-to-br from-orange-600 to-orange-500">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-4 text-center text-white">
            EVENT <span className="text-blue-900">SCHEDULE</span>
          </h2>
          <p className="text-center text-white/90 mb-16 text-lg font-semibold">Jangan lewatkan jadwal penting BAYAN RUN 2025</p>

          <div className="grid md:grid-cols-2 gap-8">
            {eventSchedule.map((event, index) => (
              <div key={index} className="bg-white/10 backdrop-blur-md p-8 rounded-2xl border border-white/20">
                <h3 className="text-3xl font-black text-white mb-4 uppercase">{event.title}</h3>
                <div className="space-y-3 text-white/90 font-semibold">
                  <div className="flex items-start gap-3">
                    <Calendar className="w-5 h-5 text-white mt-1 flex-shrink-0" />
                    <span>{event.date}</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <Clock className="w-5 h-5 text-white mt-1 flex-shrink-0" />
                    <span>{event.time}</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-white mt-1 flex-shrink-0" />
                    <span>{event.location}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Routes Section */}
      <RoutesSection />

      <GalleryRun />

      {/* Race Pack Section */}
      <div ref={racepackRef}>
        <RacePackCarousel />
      </div>

      {/* CTA Section */}
      <section className="relative min-h-[60vh] px-6 md:px-10 py-20 bg-blue-950 flex items-center justify-center">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-white mb-6">
            SIAP BERLARI<br />
            <span className="text-orange-600">BERSAMA KAMI?</span>
          </h2>
          <p className="text-white/80 text-lg md:text-xl font-semibold mb-10 leading-relaxed max-w-2xl mx-auto">
            Bergabunglah dengan ribuan pelari lainnya dan jadilah bagian dari komunitas lari terbesar di Balikpapan!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-10 py-5 bg-orange-600 text-white text-sm font-black tracking-wider uppercase transition-all duration-500 hover:bg-orange-700 hover:scale-105 hover:shadow-2xl">
              DAFTAR SEKARANG
            </button>
            <button className="px-10 py-5 bg-white text-blue-900 text-sm font-black tracking-wider uppercase transition-all duration-500 hover:bg-gray-100 hover:scale-105 hover:shadow-2xl">
              LIHAT INFO LENGKAP
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}