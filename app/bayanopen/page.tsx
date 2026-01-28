"use client";
import { useEffect, useRef, useState, useCallback } from 'react';
import { ChevronDown, Trophy, Users, Calendar, MapPin, Instagram, Linkedin, Mail, Star } from 'lucide-react';
import Header from '@/components/layout/Header';
import Preloader from '@/components/layout/Preloader';
import Footer from '@/components/layout/Footer';
import VideoSection from '@/components/OpenVideo';
import Image from 'next/image';

export default function BayanOpen() {
  const [isLoading, setIsLoading] = useState(true);
  const [isWhiteSection, setIsWhiteSection] = useState(false);
  const [stats, setStats] = useState({ matches: 0, teams: 0, prize: 0, spectators: 0 });
  const [statsAnimated, setStatsAnimated] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const aboutRef = useRef<HTMLElement>(null);
  const categoriesRef = useRef<HTMLElement>(null);

  const categories = [
    {
      title: "KATEGORI OPEN",
      items: [
        "Ganda Dewasa Putra/Putri",
        "Ganda Veteran Putra",
        "Beregu Putra Se-Kota Balikpapan"
      ]
    },
    {
      title: "KATEGORI SIRKUIT NASIONAL C",
      subtitle: "TUNGGAL",
      items: [
        "Usia Dini Putra/Putri",
        "Anak-anak Putra/Putri",
        "Pemula Putra/Putri",
        "Remaja Putra/Putri",
        "Taruna Putra/Putri"
      ]
    },
    {
      title: "KATEGORI SIRKUIT NASIONAL C",
      subtitle: "GANDA",
      items: [
        "Pemula Putra/Putri",
        "Remaja Putra/Putri",
        "Remaja Campuran",
        "Taruna Putra/Putri",
        "Taruna Campuran"
      ]
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

  const legends = [
    {
      name: "Hendra Setiawan",
      title: "Legenda Ganda Putra Indonesia",
      image: "https://res.cloudinary.com/djs5pi7ev/image/upload/w_600,h_750,c_fill,g_face,q_auto:good,f_auto/v1769503892/hendrasetiawan_llcznh.jpg",
      achievements: [
        "Juara Olimpiade 2016 (Rio)",
        "Juara Dunia 2013, 2015, 2019",
        "Juara All England 8x",
        "Pemain dengan prestasi terlengkap di Indonesia"
      ]
    },
    {
      name: "Marcus Fernaldi Gideon",
      title: "The Young Legend",
      image: "https://res.cloudinary.com/djs5pi7ev/image/upload/w_600,h_750,c_fill,g_face,q_auto:good,f_auto/v1769503893/marcus_q9noxl.jpg",
      achievements: [
        "Juara Dunia 2017, 2019, 2021",
        "Juara All England 2018",
        "Peringkat 1 Dunia BWF",
        "Pasangan terkuat bersama Kevin Sanjaya"
      ]
    }
  ];

  const venues = [
    {
      name: "BSCC Dome",
      description: "Venue utama dengan lapangan standar internasional",
      facilities: ["Lapangan standar internasional", "Kapasitas 3000+ penonton", "Medical team standby", "Area VIP dan tribun nyaman"]
    },
    {
      name: "GOR Hevindo",
      description: "Venue pendukung untuk kategori preliminaries",
      facilities: ["Lapangan berkualitas tinggi", "Area istirahat pemain", "Shuttle berkualitas tinggi", "Wasit berlisensi resmi"]
    }
  ];

  const smoothScrollTo = useCallback((id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const headerHeight = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerHeight;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  }, []);

  const animateStats = useCallback(() => {
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
  }, []);

  useEffect(() => {
    let ticking = false;
    
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
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

          if (aboutRef.current && !statsAnimated) {
            const aboutTop = aboutRef.current.getBoundingClientRect().top;
            if (aboutTop < windowHeight * 0.75) {
              animateStats();
              setStatsAnimated(true);
            }
          }
          
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [statsAnimated, animateStats]);

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
        <div className="fixed inset-0 -z-20">
          <video
            ref={videoRef}
            className="w-full h-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            poster="https://res.cloudinary.com/djs5pi7ev/image/upload/w_1920,q_auto:low,f_auto/v1769502814/bayanopen-hero_iqhyip.jpg"
            onEnded={(e) => {
              const video = e.currentTarget;
              video.currentTime = 0;
              video.play();
            }}
          >
            <source
              src="https://res.cloudinary.com/djs5pi7ev/video/upload/q_auto:low,w_1920/v1769502814/bayanopen-hero_iqhyip.mp4"
              type="video/mp4"
            />
          </video>
        </div>

        <div className="max-w-7xl w-full text-center">
          <div className="mb-8">
            <Image
              src="https://res.cloudinary.com/djs5pi7ev/image/upload/w_400,q_auto,f_auto/v1767777416/LOGO_BO2025_resdzo.png"
              alt="Bayan Open 2025"
              width={400}
              height={240}
              className="h-40 md:h-60 w-auto mx-auto object-contain"
              priority
            />
          </div>
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
            Turnamen ini tidak hanya tentang kompetisi, tetapi juga tentang membangun karakter, sportivitas, dan semangat juang yang tinggi. Klub-klub besar seperti <span className="font-bold text-orange-500">PB Djarum, PB Jaya Raya, dan PB Exist</span> turut berlaga, menjadikan turnamen ini ajang pembuktian sekaligus batu loncatan menuju level nasional dan internasional.
            <br /><br />
            Pengcab PBSI Balikpapan menilai kehadiran turnamen ini menjadi kesempatan emas bagi atlet lokal. Minimnya kejuaraan skala nasional di Kalimantan membuat Bayan Open menjadi ajang penting untuk menambah pengalaman bertanding sekaligus mengejar poin ke pelatnas.
          </p>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            <div className="text-center group hover:scale-105 transition-transform will-change-transform">
              <div className="text-5xl md:text-7xl font-black text-orange-600 mb-3 group-hover:text-orange-500 transition-colors">
                {stats.matches}+
              </div>
              <div className="text-sm md:text-base text-white/70 font-semibold tracking-wider uppercase">Pertandingan</div>
            </div>
            <div className="text-center group hover:scale-105 transition-transform will-change-transform">
              <div className="text-5xl md:text-7xl font-black text-orange-600 mb-3 group-hover:text-orange-500 transition-colors">
                {stats.teams}+
              </div>
              <div className="text-sm md:text-base text-white/70 font-semibold tracking-wider uppercase">Tim</div>
            </div>
            <div className="text-center group hover:scale-105 transition-transform will-change-transform">
              <div className="text-5xl md:text-7xl font-black text-orange-600 mb-3 group-hover:text-orange-500 transition-colors">
                {stats.prize}Jt+
              </div>
              <div className="text-sm md:text-base text-white/70 font-semibold tracking-wider uppercase">Total Hadiah</div>
            </div>
            <div className="text-center group hover:scale-105 transition-transform will-change-transform">
              <div className="text-5xl md:text-7xl font-black text-orange-600 mb-3 group-hover:text-orange-500 transition-colors">
                {stats.spectators}+
              </div>
              <div className="text-sm md:text-base text-white/70 font-semibold tracking-wider uppercase">Penonton</div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Legends Section */}
      <section className="relative min-h-screen px-6 md:px-10 py-20 bg-gradient-to-br from-red-900 to-red-950">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-4 text-white">
              OUR <span className="text-orange-600">LEGENDS</span>
            </h2>
            <p className="text-white/80 text-lg font-semibold">Legenda Bulutangkis Indonesia di Bayan Open 2025</p>
            <div className="flex items-center justify-center gap-2 mt-4">
              <span className="text-orange-500 text-lg font-bold">Coaching Clinic & Exhibition Match</span>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6 md:gap-8 max-w-5xl mx-auto">
            {legends.map((legend, index) => (
              <div key={index} className="bg-white/5 backdrop-blur-md rounded-2xl overflow-hidden border border-white/10 hover:border-orange-500/50 transition-all duration-500 hover:scale-105 hover:shadow-2xl will-change-transform">
                <div className="aspect-[3/4] relative overflow-hidden bg-gradient-to-br from-blue-800 to-blue-900">
                  <Image 
                    src={legend.image}
                    alt={legend.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 40vw"
                    className="object-cover"
                    loading="lazy"
                    quality={85}
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-black text-white mb-1">{legend.name}</h3>
                  <p className="text-orange-500 font-bold text-base mb-4">{legend.title}</p>
                  <div className="space-y-2">
                    {legend.achievements.map((achievement, i) => (
                      <div key={i} className="flex items-start gap-2 text-white/80">
                        <Trophy className="w-4 h-4 text-orange-500 flex-shrink-0 mt-0.5" />
                        <span className="font-medium text-sm">{achievement}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <div className="bg-orange-600/20 backdrop-blur-md border border-orange-500/30 rounded-2xl p-8 max-w-4xl mx-auto">
              <p className="text-white text-lg leading-relaxed">
                Kedua legenda ini akan memberikan <span className="font-bold text-orange-500">motivasi langsung</span> kepada para peserta, menggelar <span className="font-bold text-orange-500">coaching clinic eksklusif</span>, dan menampilkan <span className="font-bold text-orange-500">laga ekshibisi</span> yang menghibur sekaligus menginspirasi generasi muda atlet bulutangkis Indonesia.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section id="categories" ref={categoriesRef} className="relative min-h-screen px-6 md:px-10 py-20 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-4 text-center text-blue-900">
            KATEGORI <span className="text-orange-600">PERTANDINGAN</span>
          </h2>
          <p className="text-center text-blue-900 mb-16 font-semibold text-lg">18 Kategori dengan Standar PBSI</p>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {categories.map((category, index) => (
              <div key={index} className="bg-gradient-to-br from-blue-50 to-orange-50 p-8 rounded-2xl border-2 border-blue-100 hover:border-orange-500 transition-all duration-300 hover:scale-105 hover:shadow-xl will-change-transform">
                <h3 className="text-2xl font-black text-blue-900 mb-2 uppercase">{category.title}</h3>
                {category.subtitle && (
                  <p className="text-orange-600 font-bold text-lg mb-4">{category.subtitle}</p>
                )}
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

          {/* Venues */}
          <div className="mb-16">
            <h3 className="text-3xl md:text-5xl font-black uppercase text-center text-blue-900 mb-12">
              VENUE <span className="text-orange-600">PERTANDINGAN</span>
            </h3>
            <div className="grid md:grid-cols-2 gap-8">
              {venues.map((venue, index) => (
                <div key={index} className="bg-gradient-to-br from-blue-900 to-blue-950 p-8 rounded-2xl text-white hover:scale-105 transition-all duration-300 hover:shadow-2xl will-change-transform">
                  <MapPin className="w-12 h-12 text-orange-500 mb-4" />
                  <h4 className="text-2xl font-black mb-3">{venue.name}</h4>
                  <p className="text-white/80 mb-6 font-semibold">{venue.description}</p>
                  <ul className="space-y-2">
                    {venue.facilities.map((facility, i) => (
                      <li key={i} className="flex items-start gap-3 text-white/70">
                        <div className="w-1.5 h-1.5 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                        <span className="font-medium">{facility}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Prizes */}
          <div className="mt-20">
            <h3 className="text-3xl md:text-5xl font-black uppercase text-center text-blue-900 mb-12">
              TOTAL HADIAH <span className="text-orange-600">100 JUTA+</span>
            </h3>
            <div className="grid md:grid-cols-3 gap-6">
              {prizes.map((prize, index) => (
                <div key={index} className={`bg-gradient-to-br ${prize.color} p-8 rounded-2xl text-white text-center transform hover:scale-105 transition-all duration-300 hover:shadow-2xl will-change-transform`}>
                  <Trophy className="w-16 h-16 mx-auto mb-4" />
                  <h4 className="text-2xl font-black mb-3">{prize.place}</h4>
                  <p className="font-semibold text-lg">{prize.prize}</p>
                </div>
              ))}
            </div>
            <p className="text-center text-blue-900 mt-8 font-semibold">* Setiap kategori pertandingan</p>
          </div>
        </div>
      </section>
      
      <VideoSection />

      {/* Timeline Section */}
      <section id="timeline" className="relative min-h-screen px-6 md:px-10 py-20 bg-gradient-to-br from-yellow-500 to-amber-600">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-4 text-center text-white">
            TIMELINE <span className="text-white">EVENT</span>
          </h2>
          <p className="text-center text-white/90 mb-16 text-lg uppercase font-bold">Jadwal lengkap Bayan Open 2025</p>

          <div className="space-y-8">
            {timeline.map((item, index) => (
              <div key={index} className="bg-white/10 backdrop-blur-md p-8 rounded-2xl border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105 will-change-transform">
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
      <section className="relative min-h-[60vh] px-6 md:px-10 py-20 flex items-center justify-center opacity-95 bg-black/50">
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
              <Image
                src="https://res.cloudinary.com/djs5pi7ev/image/upload/w_300,q_auto,f_auto/v1767765525/Bayan_The_Next_Level_e77j8d.png"
                alt="BAYAN SC"
                width={300}
                height={80}
                className="h-16 md:h-20 w-auto object-contain mb-4"
                loading="lazy"
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