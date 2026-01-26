"use client";
import { useEffect, useRef, useState } from 'react';
import { ChevronDown, Trophy, Users, Calendar, MapPin, Instagram, Linkedin, Mail } from 'lucide-react';
import Header from '@/components/layout/Header';
import Preloader from '@/components/layout/Preloader';
import Footer from '@/components/layout/Footer';
export default function BayanOpen() {
    const [isLoading, setIsLoading] = useState(true);
  const [isWhiteSection, setIsWhiteSection] = useState(false);
  const [stats, setStats] = useState({ matches: 0, teams: 0, prize: 0, spectators: 0 });
  const [statsAnimated, setStatsAnimated] = useState(false);

  const heroRef = useRef<HTMLElement>(null);
  const aboutRef = useRef<HTMLElement>(null);
  const categoriesRef = useRef<HTMLElement>(null);

  const categories = [
    {
      title: "KATEGORI USIA",
      items: ["U-10 (Usia 10 tahun ke bawah)", "U-12 (Usia 12 tahun ke bawah)", "U-14 (Usia 14 tahun ke bawah)", "U-16 (Usia 16 tahun ke bawah)"]
    },
    {
      title: "SISTEM PERTANDINGAN",
      items: ["Sistem gugur", "2 babak @ 25 menit", "Wasit berlisensi resmi", "Mengikuti aturan PBSI"]
    },
    {
      title: "FASILITAS",
      items: ["Lapangan standar internasional", "Medical team standby", "Area istirahat pemain", "Shuttle berkualitas tinggi"]
    }
  ];

  const timeline = [
    { date: "1-15 Juli 2025", event: "Pendaftaran dibuka", description: "Pendaftaran online melalui website resmi" },
    { date: "20 Juli 2025", event: "Technical Meeting", description: "Briefing teknis untuk semua peserta" },
    { date: "4-9 Agustus 2025", event: "Pelaksanaan Turnamen", description: "Pertandingan berlangsung di BSCC Dome" },
    { date: "9 Agustus 2025", event: "Final & Awarding", description: "Pertandingan final dan pemberian penghargaan" }
  ];

  const prizes = [
    { place: "JUARA 1", prize: "Trophy + Uang Pembinaan 10 Juta", color: "from-yellow-400 to-yellow-600" },
    { place: "JUARA 2", prize: "Trophy + Uang Pembinaan 7 Juta", color: "from-gray-300 to-gray-400" },
    { place: "JUARA 3", prize: "Trophy + Uang Pembinaan 5 Juta", color: "from-orange-400 to-orange-600" }
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
    const targets = { matches: 150, teams: 80, prize: 100, spectators: 5000 };
    const duration = 2000;
    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 4);
      
      setStats({
        matches: Math.floor(targets.matches * eased),
        teams: Math.floor(targets.teams * eased),
        prize: Math.floor(targets.prize * eased),
        spectators: Math.floor(targets.spectators * eased)
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
             logoSrc="https://res.cloudinary.com/djs5pi7ev/image/upload/w_400,q_auto,f_auto/v1767777416/LOGO_BO2025_resdzo.png"
             logoAlt="Bayan Open 2025"
             onComplete={() => setIsLoading(false)}
           />
         )}
   
         <Header isWhiteSection={isWhiteSection} currentPage="bayanopen" />

      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center px-6 md:px-10">
        <div className="absolute inset-0 -z-10">
          <img
            src="https://res.cloudinary.com/djs5pi7ev/image/upload/w_1920,q_auto,f_auto/v1767765503/Bayan-1739_e0mi1r.jpg"
            alt="Bayan Open"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70"></div>
        </div>

        <div className="max-w-7xl w-full text-center">
          <div className="mb-8">
            <img
              src="https://res.cloudinary.com/djs5pi7ev/image/upload/w_400,q_auto,f_auto/v1767777416/LOGO_BO2025_resdzo.png"
              alt="Bayan Open 2025"
              className="h-40 md:h-60 mx-auto object-contain"
            />
          </div>
          
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black uppercase tracking-tighter mb-6" style={{ textShadow: '0 20px 60px rgba(0,0,0,0.8)' }}>
            BAYAN OPEN
            <br />
            <span className="text-orange-600">SIRNAS C 2025</span>
          </h1>

          <p className="text-sm md:text-lg text-white/90 font-semibold tracking-wider uppercase mb-8 max-w-3xl mx-auto">
            Turnamen Bulu Tangkis Bergengsi Tingkat Nasional
          </p>

          <div className="flex flex-wrap justify-center gap-6 mb-12">
            <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md px-6 py-3 rounded-full border border-white/20">
              <Calendar className="w-5 h-5 text-orange-500" />
              <span className="font-semibold">4 - 9 Agustus 2025</span>
            </div>
            <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md px-6 py-3 rounded-full border border-white/20">
              <MapPin className="w-5 h-5 text-orange-500" />
              <span className="font-semibold">BSCC Dome Balikpapan</span>
            </div>
          </div>

          <button 
            onClick={() => smoothScrollTo('about')}
            className="px-12 py-5 bg-orange-600 text-white text-sm font-black tracking-wider uppercase transition-all duration-500 hover:bg-orange-700 hover:scale-105 hover:shadow-2xl"
          >
            LIHAT DETAIL
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
            <span className="text-orange-600">BAYAN OPEN</span>
          </h2>

          <p className="text-base md:text-lg text-white/90 leading-relaxed mb-12 max-w-4xl">
            <span className="font-bold text-orange-500">BAYAN OPEN</span> adalah turnamen bulu tangkis bergengsi yang diselenggarakan setiap tahun oleh PT Bayan Resources Tbk. Dimulai sejak 2022, turnamen ini telah menjadi ajang kompetisi yang dinanti-nantikan oleh para atlet muda berbakat di seluruh Indonesia.
            <br /><br />
            Dengan status <span className="font-bold text-orange-500">SIRNAS C (Sirkuit Nasional C)</span> yang diakui oleh PBSI (Persatuan Bulu Tangkis Seluruh Indonesia), BAYAN OPEN 2025 menjadi platform penting bagi para pemain muda untuk mengasah kemampuan, meraih prestasi, dan mendapatkan poin peringkat nasional.
            <br /><br />
            Turnamen ini tidak hanya tentang kompetisi, tetapi juga tentang membangun karakter, sportivitas, dan semangat juang yang tinggi. Kami berkomitmen untuk terus mendukung pengembangan olahraga bulu tangkis di Indonesia, khususnya di Kalimantan Timur.
          </p>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            <div className="text-center group hover:scale-105 transition-transform">
              <div className="text-5xl md:text-7xl font-black text-orange-600 mb-3 group-hover:text-orange-500 transition-colors">
                {stats.matches}+
              </div>
              <div className="text-sm md:text-base text-white/70 font-semibold tracking-wider uppercase">Pertandingan</div>
            </div>
            <div className="text-center group hover:scale-105 transition-transform">
              <div className="text-5xl md:text-7xl font-black text-orange-600 mb-3 group-hover:text-orange-500 transition-colors">
                {stats.teams}+
              </div>
              <div className="text-sm md:text-base text-white/70 font-semibold tracking-wider uppercase">Tim</div>
            </div>
            <div className="text-center group hover:scale-105 transition-transform">
              <div className="text-5xl md:text-7xl font-black text-orange-600 mb-3 group-hover:text-orange-500 transition-colors">
                {stats.prize}Jt+
              </div>
              <div className="text-sm md:text-base text-white/70 font-semibold tracking-wider uppercase">Total Hadiah</div>
            </div>
            <div className="text-center group hover:scale-105 transition-transform">
              <div className="text-5xl md:text-7xl font-black text-orange-600 mb-3 group-hover:text-orange-500 transition-colors">
                {stats.spectators}+
              </div>
              <div className="text-sm md:text-base text-white/70 font-semibold tracking-wider uppercase">Penonton</div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section id="categories" ref={categoriesRef} className="relative min-h-screen px-6 md:px-10 py-20 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-4 text-center text-blue-900">
            KATEGORI & <span className="text-orange-600">KETENTUAN</span>
          </h2>
          <p className="text-center text-blue-900 mb-16 font-semibold text-lg">Informasi lengkap tentang kategori dan aturan pertandingan</p>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {categories.map((category, index) => (
              <div key={index} className="bg-gradient-to-br from-blue-50 to-orange-50 p-8 rounded-2xl border-2 border-blue-100 hover:border-orange-500 transition-all duration-300 hover:scale-105 hover:shadow-xl">
                <h3 className="text-2xl font-black text-blue-900 mb-6 uppercase">{category.title}</h3>
                <ul className="space-y-3">
                  {category.items.map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-blue-900">
                      <div className="w-2 h-2 bg-orange-600 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="font-semibold">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Prizes */}
          <div className="mt-20">
            <h3 className="text-3xl md:text-5xl font-black uppercase text-center text-blue-900 mb-12">
              TOTAL HADIAH <span className="text-orange-600">100 JUTA+</span>
            </h3>
            <div className="grid md:grid-cols-3 gap-6">
              {prizes.map((prize, index) => (
                <div key={index} className={`bg-gradient-to-br ${prize.color} p-8 rounded-2xl text-white text-center transform hover:scale-105 transition-all duration-300 hover:shadow-2xl`}>
                  <Trophy className="w-16 h-16 mx-auto mb-4" />
                  <h4 className="text-2xl font-black mb-3">{prize.place}</h4>
                  <p className="font-semibold text-lg">{prize.prize}</p>
                </div>
              ))}
            </div>
            <p className="text-center text-blue-900 mt-8 font-semibold">* Setiap kategori usia</p>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section id="timeline" className="relative min-h-screen px-6 md:px-10 py-20 bg-gradient-to-br from-orange-600 to-orange-500">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-4 text-center text-white">
            TIMELINE <span className="text-blue-900">EVENT</span>
          </h2>
          <p className="text-center text-white/90 mb-16 text-lg font-semibold">Jadwal lengkap Bayan Open 2025</p>

          <div className="space-y-8">
            {timeline.map((item, index) => (
              <div key={index} className="bg-white/10 backdrop-blur-md p-8 rounded-2xl border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105">
                <div className="flex flex-col md:flex-row md:items-center gap-4">
                  <div className="bg-blue-900 text-white px-6 py-3 rounded-full font-black text-lg inline-block self-start">
                    {item.date}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-black text-white mb-2">{item.event}</h3>
                    <p className="text-white/80 font-semibold">{item.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative min-h-[60vh] px-6 md:px-10 py-20 bg-blue-950 flex items-center justify-center">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-white mb-6">
            SIAP MENJADI<br />
            <span className="text-orange-600">JUARA?</span>
          </h2>
          <p className="text-white/80 text-lg md:text-xl font-semibold mb-10 leading-relaxed max-w-2xl mx-auto">
            Daftarkan tim Anda sekarang dan raih kesempatan emas untuk bersaing dengan atlet terbaik se-Indonesia!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-10 py-5 bg-orange-600 text-white text-sm font-black tracking-wider uppercase transition-all duration-500 hover:bg-orange-700 hover:scale-105 hover:shadow-2xl">
              DAFTAR SEKARANG
            </button>
            <button className="px-10 py-5 bg-white text-blue-900 text-sm font-black tracking-wider uppercase transition-all duration-500 hover:bg-gray-100 hover:scale-105 hover:shadow-2xl">
              DOWNLOAD PANDUAN
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
                src="https://res.cloudinary.com/djs5pi7ev/image/upload/w_300,q_auto,f_auto/v1767765525/Bayan_The_Next_Level_e77j8d.png"
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
                <a href="/" className="block hover:text-white transition-colors">Home</a>
                <a href="/bayanopen" className="block hover:text-white transition-colors">Bayan Open</a>
                <a href="/bayanrun" className="block hover:text-white transition-colors">Bayan Run</a>
                <a href="/bayancraft" className="block hover:text-white transition-colors">Bayan Craft</a>
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
            </div>
          </div>
          
          <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row font-semibold justify-between items-center gap-4 text-sm text-white/60">
            <div>© 2025 PT BAYAN RESOURCES TBK. All rights reserved.</div>
          </div>
        </div>
      </footer>
    </div>
  );
}