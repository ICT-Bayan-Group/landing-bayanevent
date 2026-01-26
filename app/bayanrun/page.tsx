"use client";
import { useEffect, useRef, useState } from 'react';
import { ChevronDown, Trophy, Users, Calendar, MapPin, Instagram, Linkedin, Mail, Clock, Heart } from 'lucide-react';
import Preloader from '@/components/layout/Preloader';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export default function BayanRun() {
  const [isLoading, setIsLoading] = useState(true);
  const [isWhiteSection, setIsWhiteSection] = useState(false);
  const [stats, setStats] = useState({ runners: 0, distance: 0, years: 0, countries: 0 });
  const [statsAnimated, setStatsAnimated] = useState(false);

  const heroRef = useRef<HTMLElement>(null);
  const aboutRef = useRef<HTMLElement>(null);
  const categoriesRef = useRef<HTMLElement>(null);

  const categories = [
    {
      icon: "🏃",
      distance: "5K",
      title: "FUN RUN",
      description: "Kategori untuk pemula dan keluarga yang ingin menikmati lari santai",
      time: "Pukul 06.00 WITA",
      color: "from-green-400 to-emerald-600"
    },
    {
      icon: "🏃‍♂️",
      distance: "10K",
      title: "CHALLENGE RUN",
      description: "Untuk pelari dengan pengalaman menengah yang siap menghadapi tantangan",
      time: "Pukul 06.15 WITA",
      color: "from-blue-400 to-blue-600"
    },
    {
      icon: "⚡",
      distance: "21K",
      title: "HALF MARATHON",
      description: "Ajang kompetisi serius untuk pelari berpengalaman dan atlet profesional",
      time: "Pukul 05.30 WITA",
      color: "from-orange-400 to-red-600"
    }
  ];

  const facilities = [
    { name: "Race Pack Premium", desc: "Jersey, medali, goodie bag" },
    { name: "Hydration Station", desc: "10+ pos air minum" },
    { name: "Medical Team", desc: "Tim medis standby" },
    { name: "Finish Line Entertainment", desc: "Live music & food festival" },
    { name: "Official Photography", desc: "Dokumentasi profesional" },
    { name: "Digital Certificate", desc: "Sertifikat digital untuk finisher" }
  ];

  const runRoute = [
    { km: "0-5 KM", location: "Lapangan Merdeka - Jl. Jendral Sudirman" },
    { km: "5-10 KM", location: "Jl. MT Haryono - Boulevard" },
    { km: "10-15 KM", location: "Kawasan Kariangau - Tepi Laut" },
    { km: "15-21 KM", location: "Kembali ke Lapangan Merdeka (21K)" }
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

      if (categoriesRef.current) {
        const rect = categoriesRef.current.getBoundingClientRect();
        if (rect.top <= headerHeight && rect.bottom >= headerHeight) {
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
        <div className="absolute inset-0 -z-10">
          <img
            src="https://res.cloudinary.com/djs5pi7ev/image/upload/w_1920,q_auto,f_auto/v1767765516/20251012060936_-_BOM_7023_uzwd7f.jpg"
            alt="Bayan Run"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70"></div>
        </div>

        <div className="max-w-7xl w-full text-center">
          <div className="mb-8">
            <img
              src="https://res.cloudinary.com/djs5pi7ev/image/upload/w_400,q_auto,f_auto/v1767777417/LOGO_BR2025_2_ph1bh8.png"
              alt="Bayan Run 2025"
              className="h-40 md:h-60 mx-auto object-contain"
            />
          </div>
          
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black uppercase tracking-tighter mb-6" style={{ textShadow: '0 20px 60px rgba(0,0,0,0.8)' }}>
            BAYAN RUN
            <br />
            <span className="text-orange-600">2025</span>
          </h1>

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
            <span className="font-bold text-orange-500">BAYAN RUN</span> adalah event lari tahunan yang telah menjadi bagian integral dari kalender olahraga Balikpapan sejak 2022. Lebih dari sekadar lomba lari, BAYAN RUN adalah perayaan semangat, kesehatan, dan komunitas yang terus berkembang.
            <br /><br />
            Dengan rute yang melewati landmark-landmark ikonik Balikpapan, dari Lapangan Merdeka hingga kawasan tepi laut Kariangau, peserta tidak hanya menguji ketahanan fisik mereka tetapi juga menikmati keindahan kota dari perspektif yang berbeda.
            <br /><br />
            Kami percaya bahwa lari bukan hanya tentang kecepatan atau jarak, tetapi tentang perjalanan pribadi setiap individu untuk menjadi versi terbaik dari diri mereka sendiri. Dengan moto <span className="font-bold text-orange-500">"KEEP MOVING • KEEP STRONG"</span>, kami mengajak semua orang dari berbagai latar belakang untuk bergabung dalam gerakan hidup sehat dan aktif.
          </p>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            <div className="text-center group hover:scale-105 transition-transform">
              <div className="text-5xl md:text-7xl font-black text-orange-600 mb-3 group-hover:text-orange-500 transition-colors">
                {stats.runners}+
              </div>
              <div className="text-sm md:text-base text-white/70 font-semibold tracking-wider uppercase">Pelari</div>
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
          <p className="text-center text-blue-900 mb-16 font-semibold text-lg">Temukan kategori yang sesuai dengan level Anda</p>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {categories.map((category, index) => (
              <div key={index} className={`bg-gradient-to-br ${category.color} p-8 rounded-2xl text-white hover:scale-105 transition-all duration-300 hover:shadow-2xl`}>
                <div className="text-6xl mb-4">{category.icon}</div>
                <div className="text-4xl font-black mb-2">{category.distance}</div>
                <h3 className="text-2xl font-black mb-4 uppercase">{category.title}</h3>
                <p className="text-white/90 mb-4 leading-relaxed">{category.description}</p>
                <div className="flex items-center gap-2 text-sm font-semibold">
                  <Clock className="w-4 h-4" />
                  {category.time}
                </div>
              </div>
            ))}
          </div>

          {/* Facilities */}
          <div className="mt-20">
            <h3 className="text-3xl md:text-5xl font-black uppercase text-center text-blue-900 mb-12">
              FASILITAS <span className="text-orange-600">LENGKAP</span>
            </h3>
            <div className="grid md:grid-cols-3 gap-6">
              {facilities.map((facility, index) => (
                <div key={index} className="bg-gradient-to-br from-blue-50 to-orange-50 p-6 rounded-xl border-2 border-blue-100 hover:border-orange-500 transition-all duration-300">
                  <h4 className="text-xl font-black text-blue-900 mb-2">{facility.name}</h4>
                  <p className="text-blue-900/70 font-semibold">{facility.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Route Section */}
      <section id="route" className="relative min-h-screen px-6 md:px-10 py-20 bg-gradient-to-br from-orange-600 to-orange-500">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-4 text-center text-white">
            RUTE <span className="text-blue-900">LARI</span>
          </h2>
          <p className="text-center text-white/90 mb-16 text-lg font-semibold">Menelusuri keindahan Balikpapan</p>

          <div className="relative">
            {/* Route Line */}
            <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-1 bg-white/30 hidden md:block"></div>

            <div className="space-y-8">
              {runRoute.map((route, index) => (
                <div key={index} className="relative">
                  <div className="flex items-start gap-6 md:gap-0">
                    {/* Point */}
                    <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 w-8 h-8 bg-white rounded-full border-4 border-orange-600 z-10"></div>
                    
                    <div className={`flex-1 ${index % 2 === 0 ? 'md:text-right md:pr-16' : 'md:pl-16 md:ml-auto'} md:w-1/2`}>
                      <div className="bg-white/10 backdrop-blur-md p-6 rounded-xl border border-white/20">
                        <div className="text-2xl font-black text-white mb-2">{route.km}</div>
                        <p className="text-white/90 font-semibold">{route.location}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-16 text-center">
            <div className="bg-white/10 backdrop-blur-md p-8 rounded-2xl border border-white/20 inline-block">
              <Heart className="w-12 h-12 text-white mx-auto mb-4" />
              <h3 className="text-2xl font-black text-white mb-2">SCENIC ROUTE</h3>
              <p className="text-white/90 font-semibold max-w-2xl">
                Rute dirancang untuk memberikan pengalaman lari terbaik dengan pemandangan kota yang menakjubkan
              </p>
            </div>
          </div>
        </div>
      </section>

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