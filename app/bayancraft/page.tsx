"use client";
import { useEffect, useRef, useState } from 'react';
import { ChevronDown, Palette, ShoppingBag, Music, Calendar, MapPin, Instagram, Linkedin, Mail, Store, Users, Heart, Sparkles } from 'lucide-react';
import Header from '@/components/layout/Header';
import Preloader from '@/components/layout/Preloader';
import Footer from '@/components/layout/Footer';

export default function BayanCraft() {
  const [isLoading, setIsLoading] = useState(true);
  const [isWhiteSection, setIsWhiteSection] = useState(false);
  const [stats, setStats] = useState({ vendors: 0, visitors: 0, artists: 0, days: 0 });
  const [statsAnimated, setStatsAnimated] = useState(false);

  const heroRef = useRef<HTMLElement>(null);
  const aboutRef = useRef<HTMLElement>(null);
  const zonesRef = useRef<HTMLElement>(null);
  const galleryRef = useRef<HTMLElement>(null);

  const zones = [
    {
      icon: <Store className="w-12 h-12" />,
      title: "UMKM ZONE",
      description: "Lebih dari 100 booth UMKM lokal menampilkan produk kerajinan tangan, kuliner khas, fashion, dan produk inovatif lainnya",
      color: "from-orange-500 to-red-600",
      highlights: ["100+ Tenant UMKM", "Produk Lokal Berkualitas", "Harga Spesial", "Meet & Greet Pengusaha"]
    },
    {
      icon: <Palette className="w-12 h-12" />,
      title: "ART EXHIBITION",
      description: "Pameran seni rupa dari seniman lokal dan nasional, menampilkan lukisan, patung, instalasi, dan karya seni kontemporer",
      color: "from-red-500 to-orange-600",
      highlights: ["50+ Karya Seni", "Workshop Seni", "Live Painting", "Art Competition"]
    },
    {
      icon: <Music className="w-12 h-12" />,
      title: "ENTERTAINMENT",
      description: "Panggung hiburan dengan penampilan musisi lokal, band, DJ, dan pertunjukan seni budaya yang menghibur sepanjang festival",
      color: "from-orange-600 to-red-700",
      highlights: ["Live Music Daily", "Cultural Performance", "DJ Night", "Kids Corner"]
    }
  ];

  const schedule = [
    {
      day: "Hari 1-2",
      title: "Grand Opening & UMKM Showcase",
      activities: ["Opening Ceremony", "UMKM Product Launching", "Fashion Show Local Brand", "Live Music Performance"]
    },
    {
      day: "Hari 3-4",
      title: "Art & Culture Days",
      activities: ["Art Exhibition Opening", "Traditional Dance Performance", "Craft Workshop", "Cultural Talk Show"]
    },
    {
      day: "Hari 5-6",
      title: "Family Fun Weekend",
      activities: ["Kids Activities", "Food Festival", "Music Festival", "Street Performance"]
    },
    {
      day: "Hari 7",
      title: "Closing Festival",
      activities: ["Award Ceremony", "Grand Sale", "Closing Concert", "Fireworks Display"]
    }
  ];

  const benefits = [
    {
      icon: <ShoppingBag className="w-8 h-8" />,
      title: "Mendukung UMKM Lokal",
      description: "Setiap pembelian Anda membantu pengembangan usaha lokal"
    },
    {
      icon: <Heart className="w-8 h-8" />,
      title: "Pengalaman Unik",
      description: "Temukan produk dan karya seni yang tidak dijual di tempat lain"
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Komunitas Kreatif",
      description: "Bertemu dengan kreator dan seniman berbakat"
    }
  ];

  // Gallery images - add more as needed
  const galleryImages = [
    "https://res.cloudinary.com/djs5pi7ev/image/upload/w_800,q_auto,f_auto/v1767765488/Bayan-8827_woaplh.jpg",
    "https://res.cloudinary.com/djs5pi7ev/image/upload/w_800,q_auto,f_auto/v1767779754/Bayan-7833_qmyabn.jpg",
    "https://res.cloudinary.com/djs5pi7ev/image/upload/w_800,q_auto,f_auto/v1767779754/Bayan-7315_my1gbe.jpg",
    "https://res.cloudinary.com/djs5pi7ev/image/upload/w_800,q_auto,f_auto/v1767779755/Bayan-935_luj3sf.jpg",
    "https://res.cloudinary.com/djs5pi7ev/image/upload/w_800,q_auto,f_auto/v1767765487/Bayan-8327_ckwhqx.jpg",
    "https://res.cloudinary.com/djs5pi7ev/image/upload/w_800,q_auto,f_auto/v1767765488/Bayan-8313_ikglap.jpg",
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
    const targets = { vendors: 150, visitors: 50000, artists: 100, days: 7 };
    const duration = 2000;
    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 4);
      
      setStats({
        vendors: Math.floor(targets.vendors * eased),
        visitors: Math.floor(targets.visitors * eased),
        artists: Math.floor(targets.artists * eased),
        days: Math.floor(targets.days * eased)
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

      if (zonesRef.current) {
        const rect = zonesRef.current.getBoundingClientRect();
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
          logoSrc="https://res.cloudinary.com/djs5pi7ev/image/upload/w_400,q_auto,f_auto/v1767777423/LOGO_EVENT_Bayan_2025_f8yznc.png"
          logoAlt="Bayan Craft Festival 2025"
          onComplete={() => setIsLoading(false)}
        />
      )}

      <Header isWhiteSection={isWhiteSection} currentPage="bayancraft" />

      {/* Hero Section with Video Background */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center px-6 md:px-10">
        <div className="absolute inset-0 -z-10">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          >
            <source src="https://res.cloudinary.com/djs5pi7ev/video/upload/q_auto:low/v1769499141/bayancraft-hero_vqzumk.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70"></div>
        </div>

        <div className="max-w-7xl w-full text-center z-10">
          <div className="mb-8 animate-fade-in">
            <img
              src="https://res.cloudinary.com/djs5pi7ev/image/upload/w_400,q_auto,f_auto/v1767777423/LOGO_EVENT_Bayan_2025_f8yznc.png"
              alt="Bayan CraftArt Festival 2025"
              className="h-40 md:h-60 mx-auto object-contain drop-shadow-2xl"
            />
          </div>
          <p className="text-sm md:text-lg text-white/90 font-semibold tracking-wider uppercase mb-8 max-w-3xl mx-auto animate-slide-up">
            CELEBRATING LOCAL CREATIVITY & CULTURE
          </p>

          <div className="flex flex-wrap justify-center gap-6 mb-12 animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md px-6 py-3 rounded-full border border-white/20 hover:bg-white/20 transition-all duration-300">
              <Calendar className="w-5 h-5 text-orange-500" />
              <span className="font-semibold">4 - 10 Agustus 2025</span>
            </div>
            <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md px-6 py-3 rounded-full border border-white/20 hover:bg-white/20 transition-all duration-300">
              <MapPin className="w-5 h-5 text-orange-500" />
              <span className="font-semibold">BSCC Dome Balikpapan</span>
            </div>
          </div>

          <button 
            onClick={() => smoothScrollTo('about')}
            className="px-12 py-5 bg-gradient-to-r from-orange-500 to-red-600 text-white text-sm font-black tracking-wider uppercase transition-all duration-500 hover:from-orange-600 hover:to-red-700 hover:scale-105 hover:shadow-2xl animate-slide-up"
            style={{ animationDelay: '0.4s' }}
          >
            JELAJAHI FESTIVAL
          </button>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
          <ChevronDown className="w-6 h-6 animate-bounce text-white/60" />
        </div>
      </section>

      {/* About Section */}
      <section id="about" ref={aboutRef} className="relative min-h-screen px-6 md:px-10 py-20 bg-gradient-to-br from-red-900 via-orange-900 to-red-950">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-black uppercase tracking-tighter mb-8 text-white">
            TENTANG<br />
            <span className="text-orange-400">BAYAN CRAFTART FESTIVAL</span>
          </h2>

          <p className="text-base md:text-lg text-white/90 leading-relaxed mb-12 max-w-4xl">
            <span className="font-bold text-orange-400">BAYAN CRAFTART FESTIVAL</span> adalah perayaan tahunan yang mengangkat kekayaan kreativitas lokal Indonesia. Sejak 2022, festival ini telah menjadi platform terbesar di Balikpapan untuk UMKM, seniman, dan kreator lokal untuk memamerkan dan menjual karya mereka.
            <br /><br />
            Festival selama 7 hari ini menggabungkan pameran produk UMKM, seni rupa, kerajinan tangan, kuliner khas, fashion lokal, musik, dan pertunjukan budaya dalam satu tempat. Kami percaya bahwa dengan mendukung kreator lokal, kita tidak hanya membeli produk, tetapi juga berinvestasi dalam komunitas dan budaya kita.
            <br /><br />
            Dari booth UMKM yang menjual produk handmade unik hingga galeri seni yang menampilkan karya seniman berbakat, dari workshop kreatif hingga panggung musik yang menghibur, BAYAN CRAFTART FESTIVAL adalah destinasi wajib untuk pecinta seni, budaya, dan produk lokal berkualitas.
          </p>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 mb-12">
            <div className="text-center group hover:scale-105 transition-transform">
              <div className="text-5xl md:text-7xl font-black text-orange-400 mb-3 group-hover:text-orange-300 transition-colors">
                {stats.vendors}+
              </div>
              <div className="text-sm md:text-base text-white/70 font-semibold tracking-wider uppercase">Tenant UMKM</div>
            </div>
            <div className="text-center group hover:scale-105 transition-transform">
              <div className="text-5xl md:text-7xl font-black text-orange-400 mb-3 group-hover:text-orange-300 transition-colors">
                {stats.visitors.toLocaleString()}+
              </div>
              <div className="text-sm md:text-base text-white/70 font-semibold tracking-wider uppercase">Pengunjung</div>
            </div>
            <div className="text-center group hover:scale-105 transition-transform">
              <div className="text-5xl md:text-7xl font-black text-orange-400 mb-3 group-hover:text-orange-300 transition-colors">
                {stats.artists}+
              </div>
              <div className="text-sm md:text-base text-white/70 font-semibold tracking-wider uppercase">Seniman</div>
            </div>
            <div className="text-center group hover:scale-105 transition-transform">
              <div className="text-5xl md:text-7xl font-black text-orange-400 mb-3 group-hover:text-orange-300 transition-colors">
                {stats.days}
              </div>
              <div className="text-sm md:text-base text-white/70 font-semibold tracking-wider uppercase">Hari Festival</div>
            </div>
          </div>

          {/* Benefits */}
          <div className="grid md:grid-cols-3 gap-6">
            {benefits.map((benefit, index) => (
              <div key={index} className="bg-white/10 backdrop-blur-md p-6 rounded-xl border border-white/20 hover:bg-white/20 transition-all duration-300 group">
                <div className="text-orange-400 mb-4 group-hover:scale-110 transition-transform">{benefit.icon}</div>
                <h3 className="text-xl font-black text-white mb-2">{benefit.title}</h3>
                <p className="text-white/80 font-semibold text-sm">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Zones Section */}
      <section id="zones" ref={zonesRef} className="relative min-h-screen px-6 md:px-10 py-20 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-4 text-center text-gray-900">
            FESTIVAL <span className="text-orange-600">ZONES</span>
          </h2>
          <p className="text-center text-gray-700 mb-16 font-semibold text-lg">Jelajahi 3 zona utama festival</p>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {zones.map((zone, index) => (
              <div key={index} className={`bg-gradient-to-br ${zone.color} p-8 rounded-2xl text-white hover:scale-105 transition-all duration-300 hover:shadow-2xl group`}>
                <div className="mb-6 group-hover:scale-110 transition-transform">{zone.icon}</div>
                <h3 className="text-3xl font-black mb-4 uppercase">{zone.title}</h3>
                <p className="text-white/90 mb-6 leading-relaxed">{zone.description}</p>
                <div className="space-y-2">
                  {zone.highlights.map((highlight, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm font-semibold">
                      <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                      {highlight}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="bg-gradient-to-br from-orange-50 to-red-50 p-8 md:p-12 rounded-2xl border-2 border-orange-300 shadow-xl">
            <h3 className="text-2xl md:text-4xl font-black text-gray-900 mb-4 text-center">
              GRATIS MASUK UNTUK UMUM! 🎉
            </h3>
            <p className="text-gray-800 text-center font-semibold text-lg max-w-3xl mx-auto">
              Nikmati seluruh zona festival tanpa biaya masuk. Ajak keluarga dan teman untuk merasakan pengalaman berbelanja, menikmati seni, dan hiburan yang tak terlupakan.
            </p>
          </div>
        </div>
      </section>

      {/* Gallery Section with Animations */}
      <section id="gallery" ref={galleryRef} className="relative min-h-screen px-6 md:px-10 py-20 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-3 mb-4">
              <Sparkles className="w-8 h-8 text-orange-500" />
              <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-white">
                FESTIVAL <span className="text-orange-500">GALLERY</span>
              </h2>
              <Sparkles className="w-8 h-8 text-orange-500" />
            </div>
            <p className="text-white/80 text-lg font-semibold">Momen-momen terbaik dari festival kami</p>
          </div>

          {/* Masonry Grid Gallery */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {galleryImages.map((image, index) => (
              <div
                key={index}
                className="group relative overflow-hidden rounded-xl cursor-pointer transform transition-all duration-500 hover:scale-105 hover:z-10"
                style={{
                  animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`
                }}
              >
                <div className="aspect-square md:aspect-[4/3] relative">
                  <img
                    src={image}
                    alt={`Gallery ${index + 1}`}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                      <p className="text-white font-bold text-lg">Festival Moment {index + 1}</p>
                      <p className="text-white/80 text-sm">Bayan CraftArt Festival 2024</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Floating Images Animation */}
          <div className="mt-16 relative h-64 overflow-hidden rounded-2xl">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="flex gap-6 animate-scroll-infinite">
                {[...galleryImages, ...galleryImages].map((image, index) => (
                  <div
                    key={index}
                    className="flex-shrink-0 w-64 h-48 rounded-xl overflow-hidden shadow-2xl transform hover:scale-105 transition-transform duration-300"
                  >
                    <img
                      src={image}
                      alt={`Scroll ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Schedule Section with Video Background */}
      <section id="schedule" className="relative min-h-screen px-6 md:px-10 py-20">
        <div className="absolute inset-0 -z-10">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          >
            <source src="https://res.cloudinary.com/djs5pi7ev/video/upload/q_auto:low/v1769499086/bayancraft-jadwal_mxnsu1.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-black/50"></div>
        </div>

        <div className="max-w-6xl mx-auto relative z-10">
          <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-4 text-center text-white drop-shadow-lg">
            JADWAL <span className="text-orange-300">FESTIVAL</span>
          </h2>
          <p className="text-center text-white/90 mb-16 text-lg font-semibold drop-shadow">Program lengkap 7 hari festival</p>

          <div className="grid md:grid-cols-2 gap-6">
            {schedule.map((day, index) => (
              <div 
                key={index} 
                className="bg-white/10 backdrop-blur-md p-8 rounded-2xl border border-white/20 hover:bg-white/20 transition-all duration-300 group hover:scale-105"
                style={{
                  animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`
                }}
              >
                <div className="bg-white text-orange-600 px-6 py-2 rounded-full font-black text-lg inline-block mb-4 shadow-lg group-hover:scale-105 transition-transform">
                  {day.day}
                </div>
                <h3 className="text-2xl font-black text-white mb-4">{day.title}</h3>
                <ul className="space-y-2">
                  {day.activities.map((activity, i) => (
                    <li key={i} className="flex items-start gap-3 text-white/90 font-semibold">
                      <div className="w-1.5 h-1.5 bg-orange-400 rounded-full mt-2 flex-shrink-0"></div>
                      {activity}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center bg-white/10 backdrop-blur-md py-6 px-8 rounded-full border border-white/20">
            <p className="text-white font-semibold text-lg">
              Jam Operasional: 10.00 - 22.00 WITA setiap hari
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative min-h-[60vh] px-6 md:px-10 py-20 bg-gradient-to-br from-red-950 via-orange-950 to-red-900 flex items-center justify-center">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-white mb-6">
            JANGAN LEWATKAN<br />
            <span className="text-orange-400">FESTIVAL INI!</span>
          </h2>
          <p className="text-white/80 text-lg md:text-xl font-semibold mb-10 leading-relaxed max-w-2xl mx-auto">
            Bergabunglah dengan ribuan pengunjung lainnya dan dukung kreativitas lokal Indonesia!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-10 py-5 bg-gradient-to-r from-orange-500 to-red-600 text-white text-sm font-black tracking-wider uppercase transition-all duration-500 hover:from-orange-600 hover:to-red-700 hover:scale-105 hover:shadow-2xl">
              INFORMASI TENANT
            </button>
            <button className="px-10 py-5 bg-white text-red-900 text-sm font-black tracking-wider uppercase transition-all duration-500 hover:bg-gray-100 hover:scale-105 hover:shadow-2xl">
              CONTACT PANITIA
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative px-6 md:px-10 py-12 bg-gray-950 border-t border-white/10">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div className="md:col-span-1">
              <img
                src="https://res.cloudinary.com/djs5pi7ev/image/upload/v1769476664/bayan-thenext-white-nobg_qis407.png"
                alt="BAYAN SC"
                className="h-16 md:h-10 object-contain mb-4"
              />
              <p className="text-white/60 text-sm leading-relaxed">
                Menghadirkan event yang dikelola Bayan Group sejak 2022.
              </p>
            </div>
            <div>
              <h4 className="text-sm font-bold tracking-wider uppercase mb-4 text-white">Quick Links</h4>
              <div className="space-y-2 text-sm text-white/60">
                <a href="/" className="block hover:text-orange-500 transition-colors">Home</a>
                <a href="/bayanopen" className="block hover:text-orange-500 transition-colors">Bayan Open</a>
                <a href="/bayanrun" className="block hover:text-orange-500 transition-colors">Bayan Run</a>
                <a href="/bayancraft" className="block hover:text-orange-500 transition-colors">Bayan Craft</a>
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
                <Instagram className="w-5 h-5 hover:text-orange-500 transition-colors cursor-pointer" />
                <Linkedin className="w-5 h-5 hover:text-orange-500 transition-colors cursor-pointer" />
                <Mail className="w-5 h-5 hover:text-orange-500 transition-colors cursor-pointer" />
              </div>
            </div>
          </div>
          
          <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row font-semibold justify-between items-center gap-4 text-sm text-white/60">
            <div>© 2025 PT BAYAN RESOURCES TBK. All rights reserved.</div>
          </div>
        </div>
      </footer>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes scroll-infinite {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .animate-fade-in {
          animation: fadeInUp 1s ease-out;
        }

        .animate-slide-up {
          animation: fadeInUp 1s ease-out;
        }

        .animate-scroll-infinite {
          animation: scroll-infinite 30s linear infinite;
        }

        .animate-scroll-infinite:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
}