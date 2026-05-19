"use client";
import { useEffect, useRef, useState } from 'react';
import { ChevronDown, Trophy, Calendar, MapPin, Clock, ChevronRight, Menu, X } from 'lucide-react';
import Preloader from '@/components/layout/Preloader';
import Footer from '@/components/layout/Footer';
import RacePackCarousel from '@/components/Racepack';
import RoutesSection from '@/components/RoutesSection';
import GalleryRun from '@/components/GalleryRun';

// ─── STYLES ─────────────────────────────────────────────────────────────
const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:ital,wght@0,300;0,400;0,600;0,700;0,800;0,900;1,700;1,900&family=Barlow:wght@300;400;500;600&display=swap');

  * { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --orange: #E85B00;
    --orange-light: #FF7A22;
    --navy: #0A1628;
    --navy-mid: #0E2040;
    --white: #FFFFFF;
    --off-white: #F5F3EF;
    --gray: #9098A3;
    --font-display: 'Barlow Condensed', sans-serif;
    --font-body: 'Barlow', sans-serif;
  }

  html { scroll-behavior: smooth; -webkit-text-size-adjust: 100%; }

  body {
    background: #000;
    color: var(--white);
    font-family: var(--font-body);
    overflow-x: hidden;
    -webkit-overflow-scrolling: touch;
  }

  /* ── NAV ── */
  .nav {
    position: fixed; top: 0; left: 0; right: 0; z-index: 100;
    display: flex; align-items: center; justify-content: space-between;
    padding: 0 48px; height: 72px;
    transition: background 0.4s ease, backdrop-filter 0.4s ease;
  }
  .nav.scrolled { background: rgba(10,22,40,0.92); backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px); }
  .nav.white-bg { background: rgba(245,243,239,0.95); backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px); }
  .nav-logo img { height: 50px; object-fit: contain; }
  .nav-links { display: flex; gap: 40px; list-style: none; }
  .nav-links a {
    font-family: var(--font-display); font-weight: 600; font-size: 13px;
    letter-spacing: 0.15em; text-transform: uppercase; color: rgba(255,255,255,0.8);
    text-decoration: none; transition: color 0.2s;
  }
  .nav.white-bg .nav-links a { color: rgba(10,22,40,0.7); }
  .nav-links a:hover, .nav-links a.active { color: var(--orange); }
  .nav.white-bg .nav-links a:hover,
  .nav.white-bg .nav-links a.active { color: var(--orange); }
  .nav-cta {
    font-family: var(--font-display); font-weight: 700; font-size: 13px;
    letter-spacing: 0.1em; text-transform: uppercase;
    background: transparent; border: 1.5px solid rgba(255,255,255,0.6);
    color: #fff; padding: 8px 24px; border-radius: 100px; cursor: pointer;
    display: flex; align-items: center; gap: 8px; transition: all 0.2s;
    -webkit-tap-highlight-color: transparent;
  }
  .nav.white-bg .nav-cta { border-color: var(--navy); color: var(--navy); }
  .nav-cta:hover { background: #fff; color: #000; border-color: #fff; }
  .nav.white-bg .nav-cta:hover { background: var(--navy); color: #fff; }
  .nav-cta .dot { width: 6px; height: 6px; border-radius: 50%; background: var(--orange); display: inline-block; }
  .nav-hamburger {
    display: none; background: transparent; border: none; color: #fff; cursor: pointer;
    padding: 8px; -webkit-tap-highlight-color: transparent;
    align-items: center; justify-content: center;
  }
  .nav.white-bg .nav-hamburger { color: var(--navy); }
  .mobile-menu {
    display: none; position: fixed; inset: 0; z-index: 99;
    background: rgba(10,22,40,0.97); backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px);
    flex-direction: column; align-items: center; justify-content: center; gap: 32px;
    opacity: 0; pointer-events: none; transition: opacity 0.3s ease;
  }
  .mobile-menu.open { opacity: 1; pointer-events: all; }
  .mobile-menu a {
    font-family: var(--font-display); font-weight: 900; font-style: italic;
    font-size: 48px; color: #fff; text-decoration: none;
    letter-spacing: 0.05em; text-transform: uppercase; transition: color 0.2s;
    -webkit-tap-highlight-color: transparent;
  }
  .mobile-menu a:hover { color: var(--orange); }
  .mobile-menu-close {
    position: absolute; top: 24px; right: 24px;
    background: transparent; border: none; color: #fff; cursor: pointer;
    padding: 8px; -webkit-tap-highlight-color: transparent;
  }

  /* ── HERO ── */
  .hero {
    position: relative; width: 100%; height: 100vh; height: 100dvh;
    overflow: hidden; display: flex; align-items: flex-end;
  }
  .hero-video-wrap { position: absolute; inset: 0; }
  .hero-video-wrap video { width: 100%; height: 100%; object-fit: cover; }
  .hero-overlay {
    position: absolute; inset: 0;
    background: linear-gradient(
      to top,
      rgba(0,0,0,0.85) 0%,
      rgba(0,0,0,0.4) 50%,
      rgba(0,0,0,0.2) 100%
    );
  }
  .hero-content {
    position: relative; z-index: 10; width: 100%;
    padding: 0 48px 80px;
    display: grid; grid-template-columns: 1fr auto;
    align-items: flex-end; gap: 60px;
  }
  .hero-logo { width: 200px; object-fit: contain; margin-bottom: 32px; }
  .hero-tagline {
    font-family: var(--font-display); font-weight: 900; font-style: italic;
    font-size: clamp(56px, 7.5vw, 108px); line-height: 0.9; letter-spacing: -0.01em;
    color: #fff;
    transform: translateY(30px); opacity: 0;
    transition: transform 0.8s cubic-bezier(0.4,0,0.2,1), opacity 0.8s;
  }
  .hero-tagline.visible { transform: translateY(0); opacity: 1; }
  .hero-right {
    display: flex; flex-direction: column; gap: 16px;
    align-items: flex-start; padding-bottom: 8px;
    opacity: 0; transform: translateY(20px);
    transition: opacity 0.8s 0.3s, transform 0.8s 0.3s;
  }
  .hero-right.visible { opacity: 1; transform: translateY(0); }
  .hero-pill {
    display: flex; align-items: center; gap: 12px;
    background: rgba(255,255,255,0.12); backdrop-filter: blur(8px); -webkit-backdrop-filter: blur(8px);
    border: 1px solid rgba(255,255,255,0.2); border-radius: 100px;
    padding: 10px 20px;
  }
  .hero-pill svg { color: var(--orange); flex-shrink: 0; }
  .hero-pill span { font-family: var(--font-display); font-weight: 700; font-size: 14px; letter-spacing: 0.05em; color: #fff; }
  .hero-cta {
    font-family: var(--font-display); font-weight: 700; font-size: 13px;
    letter-spacing: 0.15em; text-transform: uppercase;
    background: var(--orange); color: #fff; border: none;
    padding: 16px 40px; cursor: pointer; transition: background 0.2s, transform 0.2s;
    -webkit-tap-highlight-color: transparent; margin-top: 8px;
  }
  .hero-cta:hover { background: #c54a00; transform: translateY(-2px); }
  .hero-scroll-cue {
    position: absolute; bottom: 32px; left: 50%; transform: translateX(-50%);
    z-index: 10; display: flex; flex-direction: column; align-items: center; gap: 6px;
    color: rgba(255,255,255,0.5); cursor: pointer;
    font-family: var(--font-display); font-size: 11px; letter-spacing: 0.2em;
    animation: scrollBounce 2s infinite;
  }
  @keyframes scrollBounce {
    0%, 100% { transform: translateX(-50%) translateY(0); }
    50% { transform: translateX(-50%) translateY(6px); }
  }

  /* ── MARQUEE STRIP ── */
  .marquee-strip {
    background: var(--orange); overflow: hidden; padding: 14px 0; white-space: nowrap;
  }
  .marquee-track {
    display: inline-flex; gap: 48px;
    animation: marqueeScroll 22s linear infinite;
  }
  @keyframes marqueeScroll { from { transform: translateX(0); } to { transform: translateX(-50%); } }
  .marquee-item {
    font-family: var(--font-display); font-weight: 700; font-size: 13px;
    letter-spacing: 0.2em; text-transform: uppercase; color: #fff;
    display: flex; align-items: center; gap: 16px; flex-shrink: 0;
  }
  .marquee-item::after { content: '◆'; font-size: 8px; opacity: 0.6; }

  /* ── CONTAINER ── */
  .container { max-width: 1280px; margin: 0 auto; padding: 0 48px; }

  /* ── SECTION LABELS ── */
  .section-label {
    font-family: var(--font-display); font-weight: 700; font-size: 11px;
    letter-spacing: 0.3em; text-transform: uppercase; color: var(--orange);
    margin-bottom: 16px; display: flex; align-items: center; gap: 12px; justify-content: center;
  }
  .section-label::before, .section-label::after { content: ''; flex: 1; max-width: 32px; height: 2px; background: var(--orange); }
  .section-label.left { justify-content: flex-start; }
  .section-label.left::before { display: none; }
  .section-label.muted { color: rgba(255,255,255,0.4); }
  .section-label.muted::before, .section-label.muted::after { background: rgba(255,255,255,0.2); }
  .section-label.dark { color: rgba(10,22,40,0.5); }
  .section-label.dark::before, .section-label.dark::after { background: rgba(10,22,40,0.2); }

  .section-title {
    font-family: var(--font-display); font-weight: 900; font-style: italic;
    font-size: clamp(48px, 6vw, 88px); line-height: 0.9; text-align: center;
    color: var(--navy); letter-spacing: -0.02em; margin-bottom: 72px;
  }
  .section-title span { color: var(--orange); }
  .section-title.white { color: #fff; }
  .section-title.left { text-align: left; }

  /* ── ABOUT ── */
  .about {
    background: var(--navy); padding: 120px 0; position: relative; overflow: hidden;
  }
  .about-label {
    font-family: var(--font-display); font-weight: 700; font-size: 11px;
    letter-spacing: 0.3em; text-transform: uppercase; color: var(--orange);
    margin-bottom: 20px; display: flex; align-items: center; gap: 12px;
  }
  .about-label::before { content: ''; width: 32px; height: 2px; background: var(--orange); }
  .about-title {
    font-family: var(--font-display); font-weight: 900; font-style: italic;
    font-size: clamp(48px, 5.5vw, 80px); line-height: 0.95; letter-spacing: -0.01em;
    color: #fff; margin-bottom: 32px;
  }
  .about-title span { color: var(--orange); }
  .about-body { font-size: 16px; line-height: 1.8; color: rgba(255,255,255,0.7); font-weight: 300; }
  .about-body strong { color: var(--orange-light); font-weight: 600; }
  .about-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 80px; align-items: start; }

  .stats-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 2px; margin-top: 48px; }
  .stat-cell {
    padding: 32px 28px; background: rgba(255,255,255,0.04);
    border: 1px solid rgba(255,255,255,0.06);
  }
  .stat-number {
    font-family: var(--font-display); font-weight: 900; font-style: italic;
    font-size: 64px; line-height: 1; color: var(--orange); display: block;
  }
  .stat-label {
    font-family: var(--font-display); font-weight: 600; font-size: 12px;
    letter-spacing: 0.2em; text-transform: uppercase; color: rgba(255,255,255,0.5);
    margin-top: 8px; display: block;
  }

  /* ── CATEGORIES ── */
  .categories { background: var(--off-white); padding: 120px 0; }
  .categories-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 2px; margin-bottom: 0; }
  .cat-card {
    background: #fff; padding: 48px 40px;
    border-top: 3px solid var(--orange); position: relative; overflow: hidden;
  }
  .cat-card::after {
    content: ''; position: absolute; bottom: 0; right: 0;
    width: 80px; height: 80px;
    background: rgba(232,91,0,0.05);
    border-radius: 50%; transform: translate(30px, 30px);
  }
  .cat-number {
    font-family: var(--font-display); font-weight: 900; font-style: italic;
    font-size: 80px; color: rgba(232,91,0,0.08); line-height: 1;
    position: absolute; top: 16px; right: 28px; pointer-events: none;
  }
  .cat-distance {
    font-family: var(--font-display); font-weight: 900; font-style: italic;
    font-size: 52px; color: var(--orange); line-height: 1; margin-bottom: 4px;
  }
  .cat-head {
    font-family: var(--font-display); font-weight: 900; font-size: 22px;
    color: var(--navy); text-transform: uppercase; margin-bottom: 6px; line-height: 1.1;
  }
  .cat-sub {
    font-family: var(--font-display); font-weight: 700; font-size: 14px;
    color: rgba(10,22,40,0.5); letter-spacing: 0.1em; text-transform: uppercase;
    margin-bottom: 20px;
  }
  .cat-desc { font-size: 14px; color: rgba(10,22,40,0.65); line-height: 1.6; margin-bottom: 24px; font-weight: 300; }
  .cat-items { display: flex; flex-direction: column; gap: 10px; }
  .cat-item {
    display: flex; align-items: flex-start; gap: 12px;
    font-size: 14px; color: rgba(10,22,40,0.75); font-weight: 400; line-height: 1.4;
  }
  .cat-item svg { color: var(--orange); flex-shrink: 0; margin-top: 1px; }

  /* ── SCHEDULE ── */
  .schedule-section { background: var(--navy-mid); padding: 120px 0; }
  .schedule-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 2px; }
  .schedule-card {
    background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.06);
    padding: 56px 48px;
  }
  .schedule-card-label {
    font-family: var(--font-display); font-weight: 700; font-size: 11px;
    letter-spacing: 0.25em; text-transform: uppercase; color: var(--orange);
    margin-bottom: 20px;
  }
  .schedule-card-title {
    font-family: var(--font-display); font-weight: 900; font-style: italic;
    font-size: 40px; color: #fff; margin-bottom: 28px; line-height: 1;
  }
  .schedule-items { display: flex; flex-direction: column; gap: 16px; }
  .schedule-item {
    display: flex; align-items: flex-start; gap: 14px;
    font-size: 15px; color: rgba(255,255,255,0.75); font-weight: 300; line-height: 1.4;
  }
  .schedule-item svg { color: var(--orange); flex-shrink: 0; margin-top: 2px; }

  /* ── CTA ── */
  .cta-section { background: var(--off-white); padding: 140px 48px; text-align: center; }
  .cta-title {
    font-family: var(--font-display); font-weight: 900; font-style: italic;
    font-size: clamp(52px, 7vw, 100px); line-height: 0.9;
    color: var(--navy); letter-spacing: -0.02em; margin-bottom: 24px;
  }
  .cta-title span { color: var(--orange); }
  .cta-body { font-size: 16px; color: var(--gray); max-width: 600px; margin: 0 auto 48px; line-height: 1.7; font-weight: 300; }
  .cta-buttons { display: flex; gap: 16px; justify-content: center; flex-wrap: wrap; }
  .btn-primary {
    font-family: var(--font-display); font-weight: 700; font-size: 13px;
    letter-spacing: 0.15em; text-transform: uppercase;
    background: var(--orange); color: #fff; border: none;
    padding: 18px 48px; cursor: pointer; transition: background 0.2s, transform 0.2s;
    -webkit-tap-highlight-color: transparent; text-decoration: none; display: inline-block;
  }
  .btn-primary:hover { background: #c54a00; transform: translateY(-2px); }
  .btn-secondary {
    font-family: var(--font-display); font-weight: 700; font-size: 13px;
    letter-spacing: 0.15em; text-transform: uppercase;
    background: transparent; color: var(--navy);
    border: 1.5px solid var(--navy); padding: 18px 48px; cursor: pointer;
    transition: all 0.2s; -webkit-tap-highlight-color: transparent; text-decoration: none; display: inline-block;
  }
  .btn-secondary:hover { background: var(--navy); color: #fff; transform: translateY(-2px); }

  /* ═══ RESPONSIVE ═══ */
  @media (max-width: 1024px) {
    .nav { padding: 0 24px; }
    .nav-links, .nav-cta { display: none; }
    .nav-hamburger { display: flex; }
    .mobile-menu { display: flex; }
    .container { padding: 0 24px; }

    .hero-content { grid-template-columns: 1fr; padding: 0 24px 56px; gap: 32px; }
    .hero-right { flex-direction: row; flex-wrap: wrap; }
    .hero-logo { width: 150px; }

    .about-grid { grid-template-columns: 1fr; gap: 40px; }
    .categories-grid { grid-template-columns: repeat(2, 1fr); }
    .schedule-grid { grid-template-columns: 1fr; }
  }

  @media (max-width: 640px) {
    .nav { height: 60px; padding: 0 16px; }
    .nav-logo img { height: 38px; }
    .hero-content { padding: 0 16px 48px; }
    .hero-tagline { font-size: clamp(44px, 12vw, 72px); }
    .hero-logo { width: 130px; }
    .about { padding: 72px 0; }
    .section-title { font-size: clamp(40px, 10vw, 64px); margin-bottom: 40px; }
    .stat-number { font-size: 48px; }
    .stat-cell { padding: 20px 16px; }
    .categories { padding: 72px 0; }
    .categories-grid { grid-template-columns: 1fr; }
    .cat-card { padding: 36px 28px; }
    .schedule-section { padding: 72px 0; }
    .schedule-card { padding: 40px 24px; }
    .cta-section { padding: 80px 24px; }
    .btn-primary, .btn-secondary { padding: 16px 32px; width: 100%; text-align: center; }
    .cta-buttons { flex-direction: column; align-items: stretch; }
    .container { padding: 0 16px; }
  }

  @media (prefers-reduced-motion: reduce) {
    .marquee-track { animation: none; }
    .hero-tagline, .hero-right { transition: opacity 0.3s; }
    .hero-scroll-cue { animation: none; }
  }
`;

// ─── DATA ────────────────────────────────────────────────────────────────
const categories = [
  {
    distance: "5K",
    title: "FUN RUN",
    description: "Kategori untuk pemula dan keluarga yang ingin menikmati lari santai",
    time: "Pukul 06.10 WITA",
    cutOff: "1 Jam",
  },
  {
    distance: "10K",
    title: "CHALLENGE RUN",
    description: "Untuk pelari dengan pengalaman menengah yang siap menghadapi tantangan",
    time: "Pukul 06.00 WITA",
    cutOff: "2 Jam",
  },
  {
    distance: "21K",
    title: "HALF MARATHON",
    description: "Ajang kompetisi serius untuk pelari berpengalaman dan atlet profesional",
    time: "Pukul 05.30 WITA",
    cutOff: "4 Jam",
  },
  {
    distance: "2.5K",
    title: "KIDS RUN",
    description: "Dirancang untuk peserta usia 6-12 tahun dengan rute yang aman dan menyenangkan",
    time: "Pukul 06.20 WITA",
    cutOff: "50 Menit",
  },
];

const eventSchedule = [
  {
    label: "Hari Pertama",
    title: "Racepack Collection",
    date: "Sabtu, 11 Oktober 2025",
    time: "08:00 – 19:00 WITA",
    location: "Gedung Kesenian Balikpapan",
  },
  {
    label: "Hari Kedua",
    title: "Race Day",
    date: "Minggu, 12 Oktober 2025",
    time: "05:30 WITA (Start)",
    location: "Lapangan Merdeka III Balikpapan",
  },
];

const marqueeItems = [
  "Bayan Run 2025", "Keep Moving", "Keep Strong",
  "12 Oktober 2025", "Balikpapan", "6000 Runners",
  "21K Half Marathon", "5K Fun Run", "Kids Run",
];

// ─── MAIN ────────────────────────────────────────────────────────────────
export default function BayanRun() {
  const [isLoading, setIsLoading] = useState(true);
  const [heroVisible, setHeroVisible] = useState(false);
  const [navScrolled, setNavScrolled] = useState(false);
  const [isWhiteSection, setIsWhiteSection] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [stats, setStats] = useState({ runners: 0, distance: 0, years: 0, countries: 0 });
  const [statsAnimated, setStatsAnimated] = useState(false);

  const aboutRef = useRef<HTMLElement>(null);
  const categoriesRef = useRef<HTMLElement>(null);
  const racepackRef = useRef<HTMLDivElement>(null);

  // Lock body when menu open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  // Nav scroll + white section detection
  useEffect(() => {
    const headerHeight = 80;

    const handleScroll = () => {
      setNavScrolled(window.scrollY > 40);

      let inWhite = false;
      if (categoriesRef.current) {
        const rect = categoriesRef.current.getBoundingClientRect();
        if (rect.top <= headerHeight && rect.bottom >= headerHeight) inWhite = true;
      }
      if (racepackRef.current) {
        const rect = racepackRef.current.getBoundingClientRect();
        if (rect.top <= headerHeight && rect.bottom >= headerHeight) inWhite = true;
      }
      setIsWhiteSection(inWhite);

      // Stats animation
      if (aboutRef.current && !statsAnimated) {
        const aboutTop = aboutRef.current.getBoundingClientRect().top;
        if (aboutTop < window.innerHeight * 0.75) {
          animateStats();
          setStatsAnimated(true);
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [statsAnimated]);

  const animateStats = () => {
    const targets = { runners: 8000, distance: 21, years: 4, countries: 3 };
    const duration = 1800;
    const start = performance.now();
    const run = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      const e = 1 - Math.pow(1 - p, 3);
      setStats({
        runners: Math.floor(targets.runners * e),
        distance: Math.floor(targets.distance * e),
        years: Math.floor(targets.years * e),
        countries: Math.floor(targets.countries * e),
      });
      if (p < 1) requestAnimationFrame(run);
      else setStats(targets);
    };
    requestAnimationFrame(run);
  };

  const scrollTo = (id: string) => {
    setMenuOpen(false);
    setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  const marqueeContent = [...marqueeItems, ...marqueeItems];

  const navClass = [
    'nav',
    navScrolled ? 'scrolled' : '',
    isWhiteSection ? 'white-bg' : '',
  ].filter(Boolean).join(' ');

  return (
    <div style={{ background: '#000', color: '#fff', overflowX: 'hidden' }}>
      <style>{styles}</style>

      {isLoading && (
        <Preloader
          logoSrc="https://res.cloudinary.com/djs5pi7ev/image/upload/v1775466723/LOGO_BR2026_vbixvo.png"
          logoAlt="Bayan Run 2025"
          onComplete={() => { setIsLoading(false); setHeroVisible(true); }}
        />
      )}

      {/* MOBILE MENU */}
      <div className={`mobile-menu${menuOpen ? ' open' : ''}`} aria-modal="true" role="dialog">
        <button className="mobile-menu-close" onClick={() => setMenuOpen(false)} aria-label="Tutup menu">
          <X size={28} />
        </button>
        <a href="/">Home</a>
        <a href="/bayanopen">Bayan Open</a>
        <a href="/bayanrun" onClick={() => setMenuOpen(false)}>Bayan Run</a>
        <a href="/bayancraft">Bayan Craft</a>
      </div>

      {/* NAV */}
      <nav className={navClass}>
        <div className="nav-logo">
          <img
            src="https://res.cloudinary.com/djs5pi7ev/image/upload/v1769476664/bayan-thenext-white-nobg_qis407.png"
            alt="Bayan"
          />
        </div>
        <ul className="nav-links">
          {[
            { label: 'Home', href: '/' },
            { label: 'Bayan Open', href: '/bayanopen' },
            { label: 'Bayan Run', href: '/bayanrun', active: true },
            { label: 'Bayan Craft', href: '/bayancraft' },
          ].map((l) => (
            <li key={l.label}>
              <a href={l.href} className={l.active ? 'active' : ''}>{l.label}</a>
            </li>
          ))}
        </ul>
        <button className="nav-cta" onClick={() => scrollTo('categories')}>
          <span className="dot" />
          Daftar
        </button>
        <button className="nav-hamburger" onClick={() => setMenuOpen(true)} aria-label="Buka menu">
          <Menu size={26} />
        </button>
      </nav>

      {/* ── HERO ── */}
      <section className="hero">
        <div className="hero-video-wrap">
          <video
            autoPlay muted loop playsInline preload="metadata"
            onEnded={(e) => { e.currentTarget.currentTime = 0; e.currentTarget.play(); }}
          >
            <source
              src="https://res.cloudinary.com/djs5pi7ev/video/upload/q_auto:low/v1769479898/bayanrun-video_ifpuhz.mp4"
              type="video/mp4"
            />
          </video>
          <div className="hero-overlay" />
        </div>

        <div className="hero-content">
          <div>
            <img
              className="hero-logo"
              src="https://res.cloudinary.com/djs5pi7ev/image/upload/v1775466723/LOGO_BR2026_vbixvo.png"
              alt="Bayan Run 2025"
            />
            <div className={`hero-tagline${heroVisible ? ' visible' : ''}`}>
              KEEP<br />
              <span style={{ color: 'var(--orange)' }}>MOVING</span><br />
              KEEP STRONG
            </div>
          </div>

          <div className={`hero-right${heroVisible ? ' visible' : ''}`}>
            <div className="hero-pill">
              <Calendar size={16} />
              <span>10 & 11 Oktober 2025</span>
            </div>
            <div className="hero-pill">
              <MapPin size={16} />
              <span>Lapangan Merdeka Balikpapan</span>
            </div>
            <div className="hero-pill">
              <Clock size={16} />
              <span>Start: 05.30 WITA</span>
            </div>
            <button className="hero-cta" onClick={() => scrollTo('categories')}>
              DAFTAR SEKARANG <ChevronRight size={14} style={{ display: 'inline', marginLeft: 6 }} />
            </button>
          </div>
        </div>

        <div className="hero-scroll-cue" onClick={() => scrollTo('about')}>
          <span style={{ fontSize: 10, letterSpacing: '0.25em' }}>SCROLL</span>
          <ChevronDown size={14} />
        </div>
      </section>

      {/* ── MARQUEE ── */}
      <div className="marquee-strip">
        <div className="marquee-track">
          {marqueeContent.map((item, i) => (
            <div key={i} className="marquee-item">{item}</div>
          ))}
        </div>
      </div>

      {/* ── ABOUT ── */}
      <section id="about" className="about" ref={aboutRef as React.RefObject<HTMLElement>}>
        <div className="container">
          <div className="about-grid">
            <div>
              <div className="about-label">Tentang Event</div>
              <h2 className="about-title">
                BAYAN<br />
                <span>RUN</span>
              </h2>
              <p className="about-body">
                <strong>BAYAN RUN</strong> adalah ajang lomba lari tahunan persembahan dari PT Bayan Resources Tbk yang kini telah menginjak tahun keempat penyelenggaraan sejak pertama kali diselenggarakan pada tahun 2022 di Balikpapan.
                <br /><br />
                BAYAN RUN 2025 akan diselenggarakan di <strong>Lapangan Merdeka 3 Balikpapan</strong> pada tanggal 12 Oktober 2025. Event ini merupakan wujud komitmen PT Bayan Resources Tbk terhadap kesehatan serta kesejahteraan masyarakat.
                <br /><br />
                Melalui BAYAN RUN 2025 peserta ditantang untuk menunjukkan kecepatan, daya tahan, dan semangat juang yang tinggi. Mari bersama membangun bangsa dengan menjadi bagian dari <strong>BAYAN RUN 2025</strong>.
              </p>
            </div>
            <div>
              <div className="stats-grid">
                {[
                  { n: `${stats.runners.toLocaleString()}+`, l: 'Target Pelari' },
                  { n: `${stats.distance}K`, l: 'Max Distance' },
                  { n: `${stats.years}`, l: 'Tahun' },
                  { n: `${stats.countries}`, l: 'Negara' },
                ].map((s) => (
                  <div key={s.l} className="stat-cell">
                    <span className="stat-number">{s.n}</span>
                    <span className="stat-label">{s.l}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CATEGORIES ── */}
      <section id="categories" className="categories" ref={categoriesRef as React.RefObject<HTMLElement>}>
        <div className="container">
          <div className="section-label dark">Kompetisi</div>
          <h2 className="section-title">
            PILIH <span>KATEGORI</span>
          </h2>
        </div>

        <div className="categories-grid" style={{ maxWidth: 1280, margin: '0 auto' }}>
          {categories.map((cat, i) => (
            <div key={i} className="cat-card">
              <span className="cat-number">0{i + 1}</span>
              <div className="cat-distance">{cat.distance}</div>
              <h3 className="cat-head">{cat.title}</h3>
              <p className="cat-desc">{cat.description}</p>
              <div className="cat-items">
                <div className="cat-item">
                  <Clock size={14} />
                  <span>{cat.time}</span>
                </div>
                <div className="cat-item">
                  <Trophy size={14} />
                  <span>COT: {cat.cutOff}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── ROUTES ── */}
      <RoutesSection />

      {/* ── GALLERY ── */}
      <GalleryRun />

      {/* ── SCHEDULE ── */}
      <section id="schedule" className="schedule-section">
        <div className="container">
          <div className="section-label muted">Jadwal</div>
          <h2 className="section-title white" style={{ marginBottom: 64 }}>
            EVENT <span>SCHEDULE</span>
          </h2>
        </div>

        <div className="schedule-grid" style={{ maxWidth: 1280, margin: '0 auto' }}>
          {eventSchedule.map((event, i) => (
            <div key={i} className="schedule-card">
              <div className="schedule-card-label">{event.label}</div>
              <h3 className="schedule-card-title">{event.title}</h3>
              <div className="schedule-items">
                <div className="schedule-item">
                  <Calendar size={18} />
                  <span>{event.date}</span>
                </div>
                <div className="schedule-item">
                  <Clock size={18} />
                  <span>{event.time}</span>
                </div>
                <div className="schedule-item">
                  <MapPin size={18} />
                  <span>{event.location}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── RACE PACK ── */}
      <div ref={racepackRef}>
        <RacePackCarousel />
      </div>

      {/* ── CTA ── */}
      <section className="cta-section">
        <h2 className="cta-title">
          SIAP BERLARI<br />
          <span>BERSAMA KAMI?</span>
        </h2>
        <p className="cta-body">
          Bergabunglah dengan ribuan pelari lainnya dan jadilah bagian dari komunitas lari terbesar di Balikpapan!
        </p>
        <div className="cta-buttons">
          <button className="btn-primary">DAFTAR SEKARANG</button>
          <button className="btn-secondary">LIHAT INFO LENGKAP</button>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <Footer />
    </div>
  );
}