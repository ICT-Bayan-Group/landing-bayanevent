"use client";
import { useEffect, useRef, useState } from 'react';
import { ChevronDown, Palette, ShoppingBag, Music, Calendar, MapPin, Instagram, Linkedin, Mail, Store, Users, Heart } from 'lucide-react';
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

  const zones = [
    {
      icon: <Store className="w-12 h-12" />,
      title: "UMKM ZONE",
      description: "Lebih dari 100 booth UMKM lokal menampilkan produk kerajinan tangan, kuliner khas, fashion, dan produk inovatif lainnya",
      color: "from-purple-400 to-purple-600",
      highlights: ["100+ Tenant UMKM", "Produk Lokal Berkualitas", "Harga Spesial", "Meet & Greet Pengusaha"]
    },
    {
      icon: <Palette className="w-12 h-12" />,
      title: "ART EXHIBITION",
      description: "Pameran seni rupa dari seniman lokal dan nasional, menampilkan lukisan, patung, instalasi, dan karya seni kontemporer",
      color: "from-pink-400 to-pink-600",
      highlights: ["50+ Karya Seni", "Workshop Seni", "Live Painting", "Art Competition"]
    },
    {
      icon: <Music className="w-12 h-12" />,
      title: "ENTERTAINMENT",
      description: "Panggung hiburan dengan penampilan musisi lokal, band, DJ, dan pertunjukan seni budaya yang menghibur sepanjang festival",
      color: "from-orange-400 to-red-600",
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
   

      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center px-6 md:px-10">
        <div className="absolute inset-0 -z-10">
          <img
            src="https://res.cloudinary.com/djs5pi7ev/image/upload/w_1920,q_auto,f_auto/v1767765488/Bayan-8827_woaplh.jpg"
            alt="Bayan Craft Festival"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70"></div>
        </div>

        <div className="max-w-7xl w-full text-center">
          <div className="mb-8">
            <img
              src="https://res.cloudinary.com/djs5pi7ev/image/upload/w_400,q_auto,f_auto/v1767777423/LOGO_EVENT_Bayan_2025_f8yznc.png"
              alt="Bayan CraftArt Festival 2025"
              className="h-40 md:h-60 mx-auto object-contain"
            />
          </div>
          
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black uppercase tracking-tighter mb-6" style={{ textShadow: '0 20px 60px rgba(0,0,0,0.8)' }}>
            BAYAN
            <br />
            <span className="text-orange-600">CRAFTART</span>
            <br />
            FESTIVAL
          </h1>

          <p className="text-sm md:text-lg text-white/90 font-semibold tracking-wider uppercase mb-8 max-w-3xl mx-auto">
            CELEBRATING LOCAL CREATIVITY & CULTURE
          </p>

          <div className="flex flex-wrap justify-center gap-6 mb-12">
            <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md px-6 py-3 rounded-full border border-white/20">
              <Calendar className="w-5 h-5 text-orange-500" />
              <span className="font-semibold">4 - 10 Agustus 2025</span>
            </div>
            <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md px-6 py-3 rounded-full border border-white/20">
              <MapPin className="w-5 h-5 text-orange-500" />
              <span className="font-semibold">BSCC Dome Balikpapan</span>
            </div>
          </div>

          <button 
            onClick={() => smoothScrollTo('about')}
            className="px-12 py-5 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-sm font-black tracking-wider uppercase transition-all duration-500 hover:from-purple-700 hover:to-pink-700 hover:scale-105 hover:shadow-2xl"
          >
            JELAJAHI FESTIVAL
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
            <span className="text-orange-600">BAYAN CRAFTART FESTIVAL</span>
          </h2>

          <p className="text-base md:text-lg text-white/90 leading-relaxed mb-12 max-w-4xl">
            <span className="font-bold text-orange-500">BAYAN CRAFTART FESTIVAL</span> adalah perayaan tahunan yang mengangkat kekayaan kreativitas lokal Indonesia. Sejak 2022, festival ini telah menjadi platform terbesar di Balikpapan untuk UMKM, seniman, dan kreator lokal untuk memamerkan dan menjual karya mereka.
            <br /><br />
            Festival selama 7 hari ini menggabungkan pameran produk UMKM, seni rupa, kerajinan tangan, kuliner khas, fashion lokal, musik, dan pertunjukan budaya dalam satu tempat. Kami percaya bahwa dengan mendukung kreator lokal, kita tidak hanya membeli produk, tetapi juga berinvestasi dalam komunitas dan budaya kita.
            <br /><br />
            Dari booth UMKM yang menjual produk handmade unik hingga galeri seni yang menampilkan karya seniman berbakat, dari workshop kreatif hingga panggung musik yang menghibur, BAYAN CRAFTART FESTIVAL adalah destinasi wajib untuk pecinta seni, budaya, dan produk lokal berkualitas.
          </p>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 mb-12">
            <div className="text-center group hover:scale-105 transition-transform">
              <div className="text-5xl md:text-7xl font-black text-orange-600 mb-3 group-hover:text-orange-500 transition-colors">
                {stats.vendors}+
              </div>
              <div className="text-sm md:text-base text-white/70 font-semibold tracking-wider uppercase">Tenant UMKM</div>
            </div>
            <div className="text-center group hover:scale-105 transition-transform">
              <div className="text-5xl md:text-7xl font-black text-orange-600 mb-3 group-hover:text-orange-500 transition-colors">
                {stats.visitors.toLocaleString()}+
              </div>
              <div className="text-sm md:text-base text-white/70 font-semibold tracking-wider uppercase">Pengunjung</div>
            </div>
            <div className="text-center group hover:scale-105 transition-transform">
              <div className="text-5xl md:text-7xl font-black text-orange-600 mb-3 group-hover:text-orange-500 transition-colors">
                {stats.artists}+
              </div>
              <div className="text-sm md:text-base text-white/70 font-semibold tracking-wider uppercase">Seniman</div>
            </div>
            <div className="text-center group hover:scale-105 transition-transform">
              <div className="text-5xl md:text-7xl font-black text-orange-600 mb-3 group-hover:text-orange-500 transition-colors">
                {stats.days}
              </div>
              <div className="text-sm md:text-base text-white/70 font-semibold tracking-wider uppercase">Hari Festival</div>
            </div>
          </div>

          {/* Benefits */}
          <div className="grid md:grid-cols-3 gap-6">
            {benefits.map((benefit, index) => (
              <div key={index} className="bg-white/10 backdrop-blur-md p-6 rounded-xl border border-white/20 hover:bg-white/20 transition-all duration-300">
                <div className="text-orange-500 mb-4">{benefit.icon}</div>
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
          <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-4 text-center text-blue-900">
            FESTIVAL <span className="text-orange-600">ZONES</span>
          </h2>
          <p className="text-center text-blue-900 mb-16 font-semibold text-lg">Jelajahi 3 zona utama festival</p>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {zones.map((zone, index) => (
              <div key={index} className={`bg-gradient-to-br ${zone.color} p-8 rounded-2xl text-white hover:scale-105 transition-all duration-300 hover:shadow-2xl`}>
                <div className="mb-6">{zone.icon}</div>
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

          <div className="bg-gradient-to-br from-blue-50 to-orange-50 p-8 md:p-12 rounded-2xl border-2 border-orange-200">
            <h3 className="text-2xl md:text-4xl font-black text-blue-900 mb-4 text-center">
              GRATIS MASUK UNTUK UMUM! 🎉
            </h3>
            <p className="text-blue-900 text-center font-semibold text-lg max-w-3xl mx-auto">
              Nikmati seluruh zona festival tanpa biaya masuk. Ajak keluarga dan teman untuk merasakan pengalaman berbelanja, menikmati seni, dan hiburan yang tak terlupakan.
            </p>
          </div>
        </div>
      </section>

      {/* Schedule Section */}
      <section id="schedule" className="relative min-h-screen px-6 md:px-10 py-20 bg-gradient-to-br from-purple-600 via-pink-600 to-orange-600">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-4 text-center text-white">
            JADWAL <span className="text-blue-900">FESTIVAL</span>
          </h2>
          <p className="text-center text-white/90 mb-16 text-lg font-semibold">Program lengkap 7 hari festival</p>

          <div className="grid md:grid-cols-2 gap-6">
            {schedule.map((day, index) => (
              <div key={index} className="bg-white/10 backdrop-blur-md p-8 rounded-2xl border border-white/20 hover:bg-white/20 transition-all duration-300">
                <div className="bg-white text-purple-900 px-6 py-2 rounded-full font-black text-lg inline-block mb-4">
                  {day.day}
                </div>
                <h3 className="text-2xl font-black text-white mb-4">{day.title}</h3>
                <ul className="space-y-2">
                  {day.activities.map((activity, i) => (
                    <li key={i} className="flex items-start gap-3 text-white/90 font-semibold">
                      <div className="w-1.5 h-1.5 bg-white rounded-full mt-2 flex-shrink-0"></div>
                      {activity}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="text-white/90 font-semibold text-lg">
              Jam Operasional: 10.00 - 22.00 WITA setiap hari
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative min-h-[60vh] px-6 md:px-10 py-20 bg-blue-950 flex items-center justify-center">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-white mb-6">
            JANGAN LEWATKAN<br />
            <span className="text-orange-600">FESTIVAL INI!</span>
          </h2>
          <p className="text-white/80 text-lg md:text-xl font-semibold mb-10 leading-relaxed max-w-2xl mx-auto">
            Bergabunglah dengan ribuan pengunjung lainnya dan dukung kreativitas lokal Indonesia!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-10 py-5 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-sm font-black tracking-wider uppercase transition-all duration-500 hover:from-purple-700 hover:to-pink-700 hover:scale-105 hover:shadow-2xl">
              INFORMASI TENANT
            </button>
            <button className="px-10 py-5 bg-white text-blue-900 text-sm font-black tracking-wider uppercase transition-all duration-500 hover:bg-gray-100 hover:scale-105 hover:shadow-2xl">
              JADILAH SPONSOR
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