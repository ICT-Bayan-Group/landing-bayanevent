'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { Instagram, ChevronDown, Linkedin, Mail, ChevronLeft, ChevronRight, Menu, X } from 'lucide-react';
import Footer from '@/components/layout/Footer';
import gsap from 'gsap';



// ─── HERO SLIDER DATA ───────────────────────────────────────────────────
const heroSlides = [
  {
    image: 'https://res.cloudinary.com/djs5pi7ev/image/upload/w_1600,q_auto,f_auto/v1767765516/DJI_20251012054325_0006_D_p3yx0k.jpg',
    label: 'BAYAN RUN',
    tagline: 'We Turn Energy\ninto Legacy',
    desc: 'Ribuan pelari bersatu dalam satu gelanggang, satu semangat, satu tujuan.',
  },
  {
    image: 'https://res.cloudinary.com/djs5pi7ev/image/upload/w_1600,q_auto,f_auto/v1767765503/Bayan-8672_iuuxhb.jpg',
    label: 'BAYAN OPEN',
    tagline: 'We Turn Sport\ninto Greatness',
    desc: 'Turnamen berstandar nasional yang melahirkan atlet-atlet terbaik Kalimantan.',
  },
  {
    image: 'https://res.cloudinary.com/djs5pi7ev/image/upload/w_1600,q_auto,f_auto/v1767765488/Bayan-8827_woaplh.jpg',
    label: 'BAYAN CRAFT',
    tagline: 'We Turn Culture\ninto Movement',
    desc: 'Festival seni dan budaya yang merayakan kreativitas UMKM dan seniman lokal.',
  },
  {
    image: 'https://res.cloudinary.com/djs5pi7ev/image/upload/w_1600,q_auto,f_auto/v1769135304/ALK-4991_lwizwj.jpg',
    label: 'BAYAN SOCCER',
    tagline: 'We Turn Talent\ninto Champions',
    desc: 'Program pembinaan sepak bola yang mencetak karakter atlet profesional sejak dini.',
  },
];

const galleryImages = [
  'https://res.cloudinary.com/djs5pi7ev/image/upload/w_600,q_auto,f_auto/v1767765516/DJI_20251012054325_0006_D_p3yx0k.jpg',
  'https://res.cloudinary.com/djs5pi7ev/image/upload/w_600,q_auto,f_auto/v1767765513/20251012061749_-_BOM_0335_tssmcb.jpg',
  'https://res.cloudinary.com/djs5pi7ev/image/upload/w_600,q_auto,f_auto/v1767765514/20251012061107_-_BOM_7070_nah0u9.jpg',
  'https://res.cloudinary.com/djs5pi7ev/image/upload/w_600,q_auto,f_auto/v1767765503/Bayan-8672_iuuxhb.jpg',
  'https://res.cloudinary.com/djs5pi7ev/image/upload/w_600,q_auto,f_auto/v1767765487/Bayan-8327_ckwhqx.jpg',
  'https://res.cloudinary.com/djs5pi7ev/image/upload/w_600,q_auto,f_auto/v1767765497/DJI_20251012090310_0032_D_nm8eit.jpg',
  'https://res.cloudinary.com/djs5pi7ev/image/upload/w_600,q_auto,f_auto/v1767779754/Bayan-7833_qmyabn.jpg',
  'https://res.cloudinary.com/djs5pi7ev/image/upload/w_600,q_auto,f_auto/v1767779754/Bayan-7315_my1gbe.jpg',
];

const testimonialsCol1 = [
  { name: "Riska Ragil Novanda", username: "@riskarnovanda_", quote: "Bayan emang selalu keren.. terima kasih atas kepercayaannya. See u next time. Keep moving keep strong ❤️" },
  { name: "Dendy", username: "@dendy71_", quote: "❤️🔥🔥 Bayan di setiap Event" },
  { name: "Elisa Bety Sunday", username: "@elisabety_sunday", quote: "Event luar biasa blom bisa move on, malah ud kepikiran buat war tiketnya 2026 😂 pokoknya wajib war 🔥" },
];
const testimonialsCol2 = [
  { name: "rsya", username: "@skbyrsya", quote: "see uuu next eventt, adain lagi minn tahun depann meriah banget" },
  { name: "Putri Aditya", username: "@fitrihapsari87", quote: "Bayan slu jor2an gokilzzz abizz🔥" },
  { name: "Yuji Aden", username: "@yusuf.jihad", quote: "Kami keluarga besar mengucapkan banyak terima kasih yang tak terhingga pada PT Bayan Grup telah membuka peluang prestasi pada putra putri didik kami ❤️🔥" },
];
const testimonialsCol3 = [
  { name: "Eva Faulina", username: "@faulina.e", quote: "Luar biasa, ini sdh standar pertandingan internasional😍" },
  { name: "Tama Prakoso", username: "@tamatama_x10", quote: "wahh luar biasa bgt ajangny, meriah polll" },
  { name: "Winda Sari", username: "@winda_sari_borneo", quote: "keren nih bisa sekalian ngangkat pariwisata kaltim" },
];

const allTestimonials = [...testimonialsCol1, ...testimonialsCol2, ...testimonialsCol3];

const timeline = [
  { year: "2022", title: "The Beginning", description: "Bayan Run 2022 | Bayan Open 2022 | Bayan CraftArt Fest 2022" },
  { year: "2023", title: "Rapid Growth", description: "Bayan Run 2023 | Bayan Open 2023 | Bayan CraftArt Fest 2023" },
  { year: "2024", title: "Future Vision", description: "Bayan Run 2024 | Bayan Open 400 2024 | Bayan CraftArt Fest 2024" },
  { year: "2025", title: "The Next Level", description: "Bayan Run 2025 | Bayan Open Sirnas C 2025 | Bayan CraftArt Fest 2025" },
  { year: "2026", title: "The Next Level", description: "Bayan Run 2026 | Bayan Open Sirnas C 2026 | Bayan CraftArt Fest 2026" },
];



interface Testimonial {
  name: string;
  username: string;
  quote: string;
}

interface StatsState {
  events: number;
  participants: number;
  partners: number;
  years: number;
}

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
    position: relative;
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
  .nav-logo img { height: 50px; object-fit: contain; }
  .nav-links { display: flex; gap: 40px; list-style: none; }
  .nav-links a {
    font-family: var(--font-display); font-weight: 600; font-size: 13px;
    letter-spacing: 0.15em; text-transform: uppercase; color: rgba(255,255,255,0.8);
    text-decoration: none; transition: color 0.2s;
  }
  .nav-links a:hover { color: #fff; }
  .nav-cta {
    font-family: var(--font-display); font-weight: 700; font-size: 13px;
    letter-spacing: 0.1em; text-transform: uppercase;
    background: transparent; border: 1.5px solid rgba(255,255,255,0.6);
    color: #fff; padding: 8px 24px; border-radius: 100px; cursor: pointer;
    display: flex; align-items: center; gap: 8px; transition: all 0.2s;
    -webkit-tap-highlight-color: transparent;
  }
  .nav-cta:hover { background: #fff; color: #000; border-color: #fff; }
  .nav-cta .dot { width: 6px; height: 6px; border-radius: 50%; background: var(--orange); display: inline-block; }

  .nav-hamburger {
    display: none;
    background: transparent; border: none; color: #fff; cursor: pointer;
    padding: 8px; -webkit-tap-highlight-color: transparent;
    align-items: center; justify-content: center;
  }

  .mobile-menu {
    display: none;
    position: fixed; inset: 0; z-index: 99;
    background: rgba(10,22,40,0.97);
    backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px);
    flex-direction: column; align-items: center; justify-content: center;
    gap: 32px;
    opacity: 0; pointer-events: none;
    transition: opacity 0.3s ease;
  }
  .mobile-menu.open { opacity: 1; pointer-events: all; }
  .mobile-menu a {
    font-family: var(--font-display); font-weight: 900; font-style: italic;
    font-size: 48px; color: #fff; text-decoration: none;
    letter-spacing: 0.05em; text-transform: uppercase;
    transition: color 0.2s;
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
    position: relative; width: 100%;
    height: 100vh;
    height: 100dvh;
    overflow: hidden;
    /* FIXED: use flex-start + padding instead of flex-end to avoid overlap */
    display: flex;
    align-items: flex-start;
  }
  .hero-slides { position: absolute; inset: 0; }
  .hero-slide {
    position: absolute; inset: 0;
    opacity: 0; transition: opacity 1.2s cubic-bezier(0.4,0,0.2,1);
  }
  .hero-slide.active { opacity: 1; }
  .hero-slide img {
    width: 100%; height: 100%; object-fit: cover;
    transform: scale(1.05);
    transition: transform 8s cubic-bezier(0.4,0,0.2,1);
    user-select: none; -webkit-user-drag: none;
  }
  .hero-slide.active img { transform: scale(1); }
  .hero-overlay {
    position: absolute; inset: 0;
    background: linear-gradient(
      105deg,
      rgba(0,0,0,0.88) 0%,
      rgba(0,0,0,0.5) 50%,
      rgba(0,0,0,0.25) 100%
    );
  }

  /* DESKTOP hero content — sits at bottom via margin-auto trick */
  .hero-content {
    position: relative; z-index: 10; width: 100%;
    /* Push to bottom on desktop */
    margin-top: auto;
    padding: 0 48px 80px;
    display: grid; grid-template-columns: 1fr 420px;
    align-items: flex-end; gap: 80px;
    /* Align self to end so it stays at bottom */
    align-self: flex-end;
  }
  .hero-tagline {
    font-family: var(--font-display);
    font-weight: 900; font-style: italic;
    font-size: clamp(56px, 7.5vw, 108px);
    line-height: 0.9; letter-spacing: -0.01em;
    color: #fff; white-space: pre-line;
    transform: translateY(30px); opacity: 0;
    transition: transform 0.8s cubic-bezier(0.4,0,0.2,1), opacity 0.8s;
  }
  .hero-tagline.visible { transform: translateY(0); opacity: 1; }

  .hero-right {
    display: flex; flex-direction: column; justify-content: flex-end;
    padding-bottom: 4px;
    opacity: 0; transform: translateY(20px);
    transition: opacity 0.8s 0.3s, transform 0.8s 0.3s;
  }
  .hero-right.visible { opacity: 1; transform: translateY(0); }
  .hero-desc {
    font-size: 15px; line-height: 1.7; color: rgba(255,255,255,0.75);
    font-weight: 300; margin-bottom: 40px;
  }

  .hero-controls { display: flex; align-items: center; gap: 16px; }
  .slider-arrow {
    width: 44px; height: 44px; border-radius: 50%;
    border: 1.5px solid rgba(255,255,255,0.4);
    background: transparent; color: #fff; cursor: pointer;
    display: flex; align-items: center; justify-content: center;
    transition: all 0.2s; -webkit-tap-highlight-color: transparent;
    min-width: 44px; min-height: 44px;
    flex-shrink: 0;
  }
  .slider-arrow:hover { background: #fff; color: #000; border-color: #fff; }
  .slider-label-pill {
    flex: 1;
    background: rgba(255,255,255,0.12); backdrop-filter: blur(8px); -webkit-backdrop-filter: blur(8px);
    border: 1px solid rgba(255,255,255,0.2); border-radius: 100px;
    padding: 10px 24px;
    display: flex; align-items: center; gap: 12px;
  }
  .slider-label-pill .pill-dot { width: 8px; height: 8px; border-radius: 50%; background: var(--orange); flex-shrink: 0; }
  .slider-label-pill .pill-name {
    font-family: var(--font-display); font-weight: 700; font-size: 13px;
    letter-spacing: 0.15em; text-transform: uppercase; color: #fff;
  }
  .slider-dots { display: flex; gap: 6px; align-items: center; }
  .slider-dot {
    width: 6px; height: 6px; border-radius: 50%;
    background: rgba(255,255,255,0.3); border: none; cursor: pointer;
    transition: all 0.3s; -webkit-tap-highlight-color: transparent;
    padding: 8px; background-clip: content-box;
    -webkit-background-clip: content-box;
  }
  .slider-dot.active { background: var(--orange); width: 22px; border-radius: 3px; }

  /* ── MOBILE HERO LAYOUT ──
     On mobile: tagline at top (after nav), controls pinned to bottom
  */
  .hero-mobile-tagline-wrap {
    display: none; /* hidden on desktop */
    position: absolute;
    top: 0; left: 0; right: 0;
    z-index: 10;
    padding: 88px 20px 0; /* 88px = nav height + breathing room */
  }
  .hero-mobile-tagline {
    font-family: var(--font-display);
    font-weight: 900; font-style: italic;
    font-size: clamp(44px, 11vw, 72px);
    line-height: 0.9; letter-spacing: -0.01em;
    color: #fff; white-space: pre-line;
    transform: translateY(20px); opacity: 0;
    transition: transform 0.8s cubic-bezier(0.4,0,0.2,1), opacity 0.8s;
  }
  .hero-mobile-tagline.visible { transform: translateY(0); opacity: 1; }

  .hero-mobile-controls {
    display: none; /* shown only on tablet/mobile via media query */
    position: absolute;
    bottom: 0; left: 0; right: 0;
    z-index: 10;
    flex-direction: column; gap: 14px;
    padding: 0 20px 32px;
    /* gradient fade from transparent to black so text is readable */
    background: linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 100%);
  }
  .hero-mobile-desc {
    font-size: 13px; line-height: 1.6; color: rgba(255,255,255,0.8);
    font-weight: 300;
  }
  .hero-mobile-row {
    display: flex; align-items: center; gap: 10px;
  }
  .hero-mobile-pill {
    flex: 1; background: rgba(255,255,255,0.12);
    backdrop-filter: blur(8px); -webkit-backdrop-filter: blur(8px);
    border: 1px solid rgba(255,255,255,0.2); border-radius: 100px;
    padding: 10px 16px; display: flex; align-items: center; gap: 10px;
    min-width: 0;
  }
  .hero-mobile-pill .pill-dot { width: 7px; height: 7px; border-radius: 50%; background: var(--orange); flex-shrink: 0; }
  .hero-mobile-pill .pill-name {
    font-family: var(--font-display); font-weight: 700; font-size: 12px;
    letter-spacing: 0.12em; text-transform: uppercase; color: #fff;
    white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
  }
  .mobile-dots { display: flex; gap: 5px; align-items: center; }
  .mobile-dot {
    width: 6px; height: 6px; border-radius: 50%;
    background: rgba(255,255,255,0.35); border: none; cursor: pointer;
    transition: all 0.3s; -webkit-tap-highlight-color: transparent;
    min-width: 6px; min-height: 6px;
    flex-shrink: 0;
  }
  .mobile-dot.active { background: var(--orange); width: 18px; border-radius: 3px; }

  .hero-scroll-cue {
    position: absolute; bottom: 32px; left: 50%; transform: translateX(-50%);
    z-index: 10; display: flex; flex-direction: column; align-items: center; gap: 6px;
    color: rgba(255,255,255,0.5); cursor: pointer;
    font-family: var(--font-display); font-size: 11px; letter-spacing: 0.2em;
    animation: scrollBounce 2s infinite;
    -webkit-tap-highlight-color: transparent;
  }
  @keyframes scrollBounce {
    0%, 100% { transform: translateX(-50%) translateY(0); }
    50% { transform: translateX(-50%) translateY(6px); }
  }

  /* ── MARQUEE STRIP ── */
  .marquee-strip {
    background: var(--orange); overflow: hidden; padding: 14px 0;
    white-space: nowrap;
  }
  .marquee-track {
    display: inline-flex; gap: 48px;
    animation: marqueeScroll 20s linear infinite;
  }
  @keyframes marqueeScroll { from { transform: translateX(0); } to { transform: translateX(-50%); } }
  .marquee-item {
    font-family: var(--font-display); font-weight: 700; font-size: 13px;
    letter-spacing: 0.2em; text-transform: uppercase; color: #fff;
    display: flex; align-items: center; gap: 16px; flex-shrink: 0;
  }
  .marquee-item::after { content: '◆'; font-size: 8px; opacity: 0.6; }

  /* ── ABOUT ── */
  .about {
    background: var(--navy); padding: 120px 0;
    position: relative; overflow: hidden;
  }
  .about-bg-silhouette {
    position: absolute;
    right: 80px; top: 50%; transform: translateY(-50%);
    width: 400px; height: auto;
    pointer-events: none; user-select: none;
    opacity: 0.04;
    filter: brightness(0) invert(1);
    mix-blend-mode: screen;
  }
  .container { max-width: 1280px; margin: 0 auto; padding: 0 48px; }
  .about-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 80px; align-items: center; }
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

  /* ── EVENTS ── */
  .events { background: var(--off-white); padding: 120px 0; }
  .section-label {
    font-family: var(--font-display); font-weight: 700; font-size: 11px;
    letter-spacing: 0.3em; text-transform: uppercase; color: var(--orange);
    margin-bottom: 16px; display: flex; align-items: center; gap: 12px; justify-content: center;
  }
  .section-label::before, .section-label::after { content: ''; flex: 1; max-width: 32px; height: 2px; background: var(--orange); }
  .section-title {
    font-family: var(--font-display); font-weight: 900; font-style: italic;
    font-size: clamp(48px, 6vw, 88px); line-height: 0.9; text-align: center;
    color: var(--navy); letter-spacing: -0.02em; margin-bottom: 72px;
  }
  .section-title span { color: var(--orange); }

  .events-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 0; }
  .event-card {
    position: relative; overflow: hidden; cursor: pointer;
    background: #000;
    -webkit-tap-highlight-color: transparent;
  }
  .event-card::before {
    content: ''; position: absolute; inset: 0; z-index: 1;
    background: linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.2) 60%, transparent 100%);
    transition: opacity 0.5s;
  }
  .event-card img {
    width: 100%; aspect-ratio: 3/4; object-fit: cover; display: block;
    transition: transform 0.7s cubic-bezier(0.4,0,0.2,1), filter 0.5s;
    filter: saturate(0.7);
  }
  .event-card:hover img { transform: scale(1.08); filter: saturate(1); }
  .event-card:active img { transform: scale(1.04); filter: saturate(1); }
  .event-card-body {
    position: absolute; bottom: 0; left: 0; right: 0; z-index: 2;
    padding: 32px 28px;
    transform: translateY(48px); transition: transform 0.5s cubic-bezier(0.4,0,0.2,1);
  }
  .event-card:hover .event-card-body { transform: translateY(0); }
  .event-card.touch-expanded .event-card-body { transform: translateY(0); }
  .event-type {
    font-family: var(--font-display); font-weight: 600; font-size: 11px;
    letter-spacing: 0.3em; text-transform: uppercase; color: var(--orange);
    margin-bottom: 8px;
  }
  .event-name {
    font-family: var(--font-display); font-weight: 900; font-size: 40px;
    line-height: 0.95; text-transform: uppercase; color: #fff;
    margin-bottom: 16px;
  }
  .event-desc {
    font-size: 13px; color: rgba(255,255,255,0.7); line-height: 1.6;
    margin-bottom: 20px; font-weight: 300;
  }
  .event-link {
    font-family: var(--font-display); font-weight: 700; font-size: 12px;
    letter-spacing: 0.2em; text-transform: uppercase; color: var(--orange);
    text-decoration: none; display: flex; align-items: center; gap: 8px;
    transition: gap 0.2s; -webkit-tap-highlight-color: transparent;
  }
  .event-link:hover { gap: 14px; }
  .event-num {
    position: absolute; top: 24px; right: 24px; z-index: 3;
    font-family: var(--font-display); font-weight: 900; font-size: 11px;
    letter-spacing: 0.2em; color: rgba(255,255,255,0.3);
  }

  /* ── TIMELINE ── */
  .timeline-section {
    position: relative; padding: 120px 0; overflow: hidden;
  }
  .timeline-bg {
    position: absolute; inset: 0;
  }
  .timeline-bg video { width: 100%; height: 100%; object-fit: cover; }
  .timeline-bg::after {
    content: ''; position: absolute; inset: 0;
    background: rgba(0, 0, 0, 0.79);
  }
  .timeline-inner { position: relative; z-index: 10; }
  .timeline-line {
    position: absolute; left: 50%; top: 0; bottom: 0;
    width: 1px; background: rgba(255,255,255,0.15);
    transform: translateX(-50%);
  }
  .timeline-item {
    display: grid; grid-template-columns: 1fr 80px 1fr;
    align-items: center; margin-bottom: 80px; gap: 0;
  }
  .timeline-item:nth-child(odd) .timeline-text { 
    text-align: right; 
    padding-right: 48px; 
  }
  .timeline-item:nth-child(even) .timeline-text { 
    text-align: left; 
    padding-left: 48px; 
  }
  .timeline-item:nth-child(even) .timeline-center { grid-column: 2; grid-row: 1; }
  .timeline-item:nth-child(even) .timeline-empty { grid-column: 1; grid-row: 1; }
  .timeline-year {
    font-family: var(--font-display); font-weight: 900; font-style: italic;
    font-size: 14px; letter-spacing: 0.1em; color: var(--orange);
    background: rgba(232,91,0,0.15); border: 1px solid rgba(232,91,0,0.3);
    padding: 4px 12px; border-radius: 100px; display: inline-block; margin-bottom: 12px;
  }
  .timeline-title {
    font-family: var(--font-display); font-weight: 900; font-size: 32px;
    color: #fff; margin-bottom: 8px; line-height: 1;
  }
  .timeline-desc { font-size: 14px; color: rgba(255,255,255,0.6); font-weight: 300; line-height: 1.6; }
  .timeline-dot {
    width: 16px; height: 16px; border-radius: 50%; background: var(--orange);
    border: 3px solid rgba(10,22,40,0.9); margin: 0 auto;
    box-shadow: 0 0 0 4px rgba(232,91,0,0.2);
  }

  /* ── TESTIMONIALS ── */
  .testimonials { background: var(--off-white); padding: 120px 0; }
  .testi-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; height: 580px; overflow: hidden; }
  .testi-col { display: flex; flex-direction: column; gap: 20px; }
  .testi-card {
    background: #fff; border-radius: 12px; padding: 24px;
    border: 1px solid rgba(0,0,0,0.06); flex-shrink: 0;
  }
  .testi-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 12px; }
  .testi-name { font-family: var(--font-display); font-weight: 700; font-size: 15px; color: var(--navy); }
  .testi-handle { font-size: 12px; color: var(--gray); margin-top: 2px; }
  .testi-text { font-size: 14px; color: #333; line-height: 1.65; font-weight: 300; }
  .testi-icon { color: #E1306C; flex-shrink: 0; }

  .testi-mobile-carousel { display: none; }
  .testi-carousel-track {
    display: flex; gap: 16px; overflow-x: auto; -webkit-overflow-scrolling: touch;
    scroll-snap-type: x mandatory; scrollbar-width: none; padding-bottom: 8px;
  }
  .testi-carousel-track::-webkit-scrollbar { display: none; }
  .testi-carousel-item {
    flex: 0 0 85%; scroll-snap-align: center;
    background: #fff; border-radius: 12px; padding: 20px;
    border: 1px solid rgba(0,0,0,0.06);
  }

  /* ── SCHEDULE ── */
  .schedule { background: var(--orange); padding: 120px 0; }
  .schedule .section-title { color: #fff; }
  .schedule .section-label { color: rgba(255,255,255,0.7); }
  .schedule .section-label::before,
  .schedule .section-label::after { background: rgba(255,255,255,0.4); }
  .schedule-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 2px; }
  .schedule-card {
    background: rgba(0,0,0,0.15); padding: 48px 40px;
    transition: background 0.3s;
    display: flex; flex-direction: column; align-items: center; text-align: center;
    -webkit-tap-highlight-color: transparent;
  }
  .schedule-card:hover { background: rgba(0,0,0,0.25); }
  .schedule-card img { height: 100px; object-fit: contain; margin-bottom: 28px; }
  .schedule-name {
    font-family: var(--font-display); font-weight: 900; font-size: 26px;
    color: #fff; margin-bottom: 12px; text-transform: uppercase;
  }
  .schedule-venue { font-size: 14px; color: rgba(255,255,255,0.75); font-weight: 400; }
  .schedule-date {
    font-family: var(--font-display); font-weight: 700; font-size: 15px;
    color: #fff; margin-top: 8px; letter-spacing: 0.05em;
  }

  /* ── GALLERY ── */
  .gallery { background: var(--navy); padding-top: 100px; padding-bottom: 100px; overflow: hidden; }
  .gallery-track { display: flex; gap: 20px; width: max-content; will-change: transform; }
  .gallery-item {
    flex-shrink: 0; width: 340px; height: 460px;
    border-radius: 8px; overflow: hidden; position: relative;
  }
  .gallery-item img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.6s; }
  .gallery-item:hover img { transform: scale(1.06); }

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
    padding: 18px 48px; cursor: pointer;
    transition: background 0.2s, transform 0.2s;
    -webkit-tap-highlight-color: transparent;
  }
  .btn-primary:hover { background: #c54a00; transform: translateY(-2px); }
  .btn-primary:active { transform: translateY(0); }
  .btn-secondary {
    font-family: var(--font-display); font-weight: 700; font-size: 13px;
    letter-spacing: 0.15em; text-transform: uppercase;
    background: transparent; color: var(--navy);
    border: 1.5px solid var(--navy); padding: 18px 48px; cursor: pointer;
    transition: all 0.2s; -webkit-tap-highlight-color: transparent;
  }
  .btn-secondary:hover { background: var(--navy); color: #fff; transform: translateY(-2px); }
  .btn-secondary:active { transform: translateY(0); }

  /* ── FOOTER ── */
  .footer { background: var(--navy-mid); padding: 72px 0 40px; }
  .footer-grid { display: grid; grid-template-columns: 2fr 1fr 1fr 1fr; gap: 60px; margin-bottom: 48px; }
  .footer-logo img { height: 40px; object-fit: contain; margin-bottom: 16px; }
  .footer-tagline { font-size: 14px; color: rgba(255,255,255,0.5); font-weight: 300; line-height: 1.6; }
  .footer-heading {
    font-family: var(--font-display); font-weight: 700; font-size: 11px;
    letter-spacing: 0.25em; text-transform: uppercase; color: rgba(255,255,255,0.4);
    margin-bottom: 20px;
  }
  .footer-links { list-style: none; display: flex; flex-direction: column; gap: 10px; }
  .footer-links a, .footer-links button {
    font-size: 14px; color: rgba(255,255,255,0.6); text-decoration: none;
    background: none; border: none; cursor: pointer; padding: 0; text-align: left;
    transition: color 0.2s; font-family: var(--font-body); font-weight: 300;
    -webkit-tap-highlight-color: transparent;
  }
  .footer-links a:hover, .footer-links button:hover { color: #fff; }
  .footer-social { display: flex; gap: 16px; margin-top: 20px; }
  .footer-social-icon {
    width: 36px; height: 36px; border-radius: 50%;
    border: 1px solid rgba(255,255,255,0.2); display: flex; align-items: center; justify-content: center;
    color: rgba(255,255,255,0.6); cursor: pointer; transition: all 0.2s; background: transparent;
    -webkit-tap-highlight-color: transparent; min-width: 44px; min-height: 44px;
  }
  .footer-social-icon:hover { border-color: var(--orange); color: var(--orange); }
  .footer-bottom {
    border-top: 1px solid rgba(255,255,255,0.08); padding-top: 28px;
    display: flex; justify-content: space-between; align-items: center;
    font-size: 12px; color: rgba(255,255,255,0.35); font-weight: 300;
  }

  /* ── PRELOADER ── */
  .preloader {
    position: fixed; inset: 0; z-index: 9999;
    background: var(--navy);
    display: flex; flex-direction: column;
    align-items: center; justify-content: center; gap: 40px;
    transition: opacity 0.6s ease, transform 0.8s cubic-bezier(0.76,0,0.24,1);
    padding: 24px;
  }
  .preloader.exit { opacity: 0; transform: translateY(-40px); pointer-events: none; }
  .preloader-logo {
    width: 220px; max-width: 80vw; object-fit: contain;
    animation: preloaderFadeIn 0.6s ease forwards;
  }
  @keyframes preloaderFadeIn {
    from { opacity: 0; transform: translateY(16px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  .preloader-progress-wrap { display: flex; flex-direction: column; align-items: center; gap: 12px; width: 280px; max-width: 80vw; }
  .preloader-bar-wrap {
    width: 100%; height: 2px;
    background: rgba(255,255,255,0.10);
    border-radius: 100px; overflow: hidden;
  }
  .preloader-bar {
    height: 100%; background: var(--orange);
    border-radius: 100px;
    transition: width 0.25s ease-out;
    width: 0%;
  }
  .preloader-pct {
    font-family: var(--font-display); font-size: 11px;
    letter-spacing: 0.35em; color: rgba(255,255,255,0.35);
    text-align: center;
  }
  .preloader-text {
    font-family: var(--font-display); font-weight: 700; font-size: 10px;
    letter-spacing: 0.5em; color: rgba(255,255,255,0.2);
    text-transform: uppercase;
  }

  /* ═══════════════════════════════════════════════
     TABLET — max-width: 1024px
  ═══════════════════════════════════════════════ */
  @media (max-width: 1024px) {
    /* Nav */
    .nav { padding: 0 24px; }
    .nav-links { display: none; }
    .nav-cta { display: none; }
    .nav-hamburger { display: flex; }
    .mobile-menu { display: flex; }

    /* Container */
    .container { padding: 0 24px; }

    /* Hero — split layout: tagline top, controls bottom */
    .hero { align-items: stretch; }
    .hero-content { display: none; } /* hide desktop content */
    .hero-mobile-tagline-wrap { display: block; }
    .hero-mobile-controls { display: flex; }
    .hero-scroll-cue { display: none; }

    /* About */
    .about-grid { grid-template-columns: 1fr; }
    .about-bg-silhouette { display: none; }

    /* Events */
    .events-grid { grid-template-columns: repeat(2, 1fr); }
    .event-card-body { transform: translateY(0); }

    /* Schedule */
    .schedule-grid { grid-template-columns: 1fr; gap: 2px; }

    /* Testimonials */
    .testi-grid { display: none; }
    .testi-mobile-carousel { display: block; }

    /* Footer */
    .footer-grid { grid-template-columns: 1fr 1fr; }

    /* Gallery */
    .gallery-item { width: 260px; height: 350px; }
  }

  /* ═══════════════════════════════════════════════
     MOBILE — max-width: 640px
  ═══════════════════════════════════════════════ */
  @media (max-width: 640px) {
    /* Nav */
    .nav { height: 60px; padding: 0 16px; }
    .nav-logo img { height: 38px; }

    /* Hero mobile tagline */
    .hero-mobile-tagline-wrap {
      padding: 76px 16px 0; /* 60px nav + 16px gap */
    }
    .hero-mobile-tagline {
      font-size: clamp(40px, 11vw, 60px);
    }

    /* Hero mobile controls */
    .hero-mobile-controls {
      padding: 0 16px 24px;
      gap: 12px;
    }
    .hero-mobile-desc { font-size: 13px; }

    /* About */
    .about { padding: 72px 0; }
    .about-title { font-size: clamp(40px, 10vw, 60px); }
    .about-body { font-size: 15px; }
    .stat-number { font-size: 48px; }
    .stat-cell { padding: 20px 16px; }
    .stats-grid { margin-top: 32px; }

    /* Events */
    .events { padding: 72px 0; }
    .events-grid { grid-template-columns: 1fr; }
    .event-card img { aspect-ratio: 4/3; }
    .event-name { font-size: 32px; }
    .event-card-body { padding: 24px 20px; transform: translateY(0) !important; }
    .section-title { margin-bottom: 40px; }

    /* Timeline */
    .timeline-section { padding: 72px 0; }
    .timeline-item {
      grid-template-columns: 1fr !important;
      margin-bottom: 40px;
    }
    .timeline-item .timeline-text {
      text-align: left !important;
      padding: 0 !important;
      grid-column: 1 !important; grid-row: auto !important;
    }
    .timeline-item .timeline-center { display: none; }
    .timeline-item .timeline-empty { display: none; }
    .timeline-line { display: none; }
    .timeline-title { font-size: 26px; }

    /* Schedule */
    .schedule { padding: 72px 0; }
    .schedule-card { padding: 36px 24px; }
    .schedule-card img { height: 80px; }
    .schedule-name { font-size: 22px; }

    /* Gallery */
    .gallery { padding-top: 64px; padding-bottom: 64px; }
    .gallery-item { width: 200px; height: 280px; }

    /* Testimonials */
    .testimonials { padding: 72px 0; }
    .testi-carousel-item { flex: 0 0 88%; }

    /* CTA */
    .cta-section { padding: 80px 24px; }
    .cta-title { font-size: clamp(40px, 10vw, 64px); }
    .cta-body { font-size: 15px; }
    .btn-primary, .btn-secondary { padding: 16px 32px; width: 100%; text-align: center; }
    .cta-buttons { flex-direction: column; align-items: stretch; }

    /* Footer */
    .footer { padding: 48px 0 32px; }
    .footer-grid { grid-template-columns: 1fr; gap: 32px; }
    .footer-bottom { flex-direction: column; gap: 12px; text-align: center; }

    /* Marquee */
    .marquee-strip { padding: 12px 0; }
    .marquee-item { font-size: 11px; }

    /* Container */
    .container { padding: 0 16px; }
  }

  /* ═══════════════════════════════════════════════
     VERY SMALL — 375px (iPhone SE)
  ═══════════════════════════════════════════════ */
  @media (max-width: 375px) {
    .hero-mobile-tagline { font-size: 36px; }
    .about-title { font-size: 36px; }
    .section-title { font-size: 40px; }
    .stat-number { font-size: 40px; }
    .event-name { font-size: 28px; }
  }

  /* ═══════════════════════════════════════════════
     Reduced motion
  ═══════════════════════════════════════════════ */
  @media (prefers-reduced-motion: reduce) {
    .hero-slide img { transition: none; }
    .hero-tagline, .hero-mobile-tagline { transition: opacity 0.3s; }
    .hero-slide { transition: opacity 0.4s; }
    .marquee-track { animation: none; }
    .gallery-track { animation: none; }
    .hero-scroll-cue { animation: none; }
  }
`;

// ─── TESTIMONIAL CARD ────────────────────────────────────────────────────
function TestiCard({ t }: { t: Testimonial }) {
  return (
    <div className="testi-card">
      <div className="testi-header">
        <div>
          <div className="testi-name">{t.name}</div>
          <div className="testi-handle">{t.username}</div>
        </div>
        <Instagram size={18} className="testi-icon" />
      </div>
      <p className="testi-text">{t.quote}</p>
    </div>
  );
}

// ─── MAIN COMPONENT ──────────────────────────────────────────────────────
export default function BayanEvent() {
  const [loading, setLoading] = useState<boolean>(true);
  const [preloaderExit, setPreloaderExit] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const [slide, setSlide] = useState<number>(0);
  const [tagVisible, setTagVisible] = useState<boolean>(false);
  const [navScrolled, setNavScrolled] = useState<boolean>(false);
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [stats, setStats] = useState<StatsState>({ events: 0, participants: 0, partners: 0, years: 0 });
  const [statsRan, setStatsRan] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const topTextRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLDivElement | null>(null);
  const col1Ref = useRef<HTMLDivElement | null>(null);
  const col2Ref = useRef<HTMLDivElement | null>(null);
  const col3Ref = useRef<HTMLDivElement | null>(null);
  const aboutRef = useRef<HTMLDivElement | null>(null);
  const slideTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const galleryRaf = useRef<number>(0);
  const testiRaf = useRef<number>(0);

  // Detect mobile
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 1024);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  // Lock body scroll when menu open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  // Taruh setelah useEffect lainnya, di dalam BayanEvent()
  useEffect(() => {
    if (loading) return;

    const topText = topTextRef.current;
    if (topText) {
      gsap.fromTo(
        topText,
        { x: '-50%' },
        {
          x: '0%',
          duration: 20,
          ease: 'none',
          repeat: -1,
        }
      );
    }

    return () => {
      gsap.killTweensOf(topTextRef.current);
    };
  }, [loading]); // re-run setelah preloader selesai

  // Preloader
  useEffect(() => {
    const iv = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) { clearInterval(iv); return 100; }
        return Math.min(p + Math.random() * 12, 100);
      });
    }, 120);
    const t = setTimeout(() => {
      setProgress(100);
      setTimeout(() => {
        setPreloaderExit(true);
        setTimeout(() => setLoading(false), 700);
      }, 300);
    }, 2400);
    return () => { clearInterval(iv); clearTimeout(t); };
  }, []);

  // Auto slide
  useEffect(() => {
    if (loading) return;
    setTagVisible(false);
    setTimeout(() => setTagVisible(true), 100);
    slideTimer.current = setTimeout(() => {
      setSlide((s) => (s + 1) % heroSlides.length);
    }, 6000);
    return () => {
      if (slideTimer.current) clearTimeout(slideTimer.current);
    };
  }, [slide, loading]);

  const goSlide = (n: number) => {
    if (slideTimer.current) clearTimeout(slideTimer.current);
    setSlide((prev) => (prev + n + heroSlides.length) % heroSlides.length);
  };

  // Nav scroll
  useEffect(() => {
    const onScroll = () => setNavScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Stats counter
  useEffect(() => {
    if (statsRan) return;
    const obs = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setStatsRan(true);
          const targets: StatsState = { events: 10, participants: 20000, partners: 10, years: 3 };
          const duration = 1800;
          const start = performance.now();
          const run = (now: number) => {
            const p = Math.min((now - start) / duration, 1);
            const e = 1 - Math.pow(1 - p, 3);
            setStats({
              events: Math.floor(targets.events * e),
              participants: Math.floor(targets.participants * e),
              partners: Math.floor(targets.partners * e),
              years: Math.floor(targets.years * e),
            });
            if (p < 1) requestAnimationFrame(run);
            else setStats(targets);
          };
          requestAnimationFrame(run);
        }
      },
      { threshold: 0.3 }
    );
    if (aboutRef.current) obs.observe(aboutRef.current);
    return () => obs.disconnect();
  }, [statsRan]);

  // Gallery auto-scroll — desktop only
  useEffect(() => {
    if (loading || isMobile) return;
    const track = galleryRef.current;
    if (!track) return;
    let pos = 0;
    let last = performance.now();
    const run = (now: number) => {
      pos -= 0.035 * (now - last);
      last = now;
      const half = track.scrollWidth / 2;
      if (Math.abs(pos) >= half) pos = 0;
      track.style.transform = `translateX(${pos}px)`;
      galleryRaf.current = requestAnimationFrame(run);
    };
    galleryRaf.current = requestAnimationFrame(run);
    return () => cancelAnimationFrame(galleryRaf.current);
  }, [loading, isMobile]);

  // Testimonials auto-scroll — desktop only
  useEffect(() => {
    if (isMobile) return;
    const c1 = col1Ref.current;
    const c2 = col2Ref.current;
    const c3 = col3Ref.current;
    if (!c1 || !c2 || !c3) return;
    let p1 = 0;
    let p2 = c2.scrollHeight / 2;
    let p3 = 0;
    const speed = 0.4;
    const run = () => {
      p1 += speed;
      if (p1 >= c1.scrollHeight / 2) p1 = 0;
      p2 -= speed;
      if (p2 <= 0) p2 = c2.scrollHeight / 2;
      p3 += speed;
      if (p3 >= c3.scrollHeight / 2) p3 = 0;
      c1.style.transform = `translateY(-${p1}px)`;
      c2.style.transform = `translateY(-${p2}px)`;
      c3.style.transform = `translateY(-${p3}px)`;
      testiRaf.current = requestAnimationFrame(run);
    };
    testiRaf.current = requestAnimationFrame(run);
    return () => cancelAnimationFrame(testiRaf.current);
  }, [isMobile]);

  // Hero touch swipe
  const heroTouchStart = useRef<number>(0);
  const onHeroTouchStart = (e: React.TouchEvent) => {
    heroTouchStart.current = e.touches[0].clientX;
  };
  const onHeroTouchEnd = (e: React.TouchEvent) => {
    const diff = heroTouchStart.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) goSlide(diff > 0 ? 1 : -1);
  };

  const scrollTo = (id: string) => {
    setMenuOpen(false);
    setTimeout(() => {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  return (
    <>
      <style>{styles}</style>

      {/* PRELOADER */}
      {loading && (
        <div className={`preloader${preloaderExit ? ' exit' : ''}`}>
          <img
            className="preloader-logo"
            src="https://res.cloudinary.com/djs5pi7ev/image/upload/v1769476664/bayan-thenext-white-nobg_qis407.png"
            alt="Bayan"
          />
          <div className="preloader-progress-wrap">
            <div className="preloader-bar-wrap">
              <div className="preloader-bar" style={{ width: `${progress}%` }} />
            </div>
            <div className="preloader-pct">{Math.round(progress)}%</div>
          </div>
          <div className="preloader-text">The Next Level</div>
        </div>
      )}

      {/* MOBILE MENU */}
      <div className={`mobile-menu${menuOpen ? ' open' : ''}`} aria-modal="true" role="dialog">
        <button className="mobile-menu-close" onClick={() => setMenuOpen(false)} aria-label="Tutup menu">
          <X size={28} />
        </button>
        <a href="/bayanopen" onClick={() => setMenuOpen(false)}>Bayan Open</a>
        <a href="/bayanrun" onClick={() => setMenuOpen(false)}>Bayan Run</a>
        <a href="/bayancraft" onClick={() => setMenuOpen(false)}>Bayan Craft</a>
        <a href="#" onClick={(e) => { e.preventDefault(); scrollTo('about'); }}>Contact</a>
      </div>

      {/* NAV */}
      <nav className={`nav ${navScrolled ? 'scrolled' : ''}`}>
        <div className="nav-logo">
          <img
            src="https://res.cloudinary.com/djs5pi7ev/image/upload/v1769476664/bayan-thenext-white-nobg_qis407.png"
            alt="Bayan"
          />
        </div>
        <ul className="nav-links">
          {[
            { label: 'Bayan Open', href: '/bayanopen' },
            { label: 'Bayan Run', href: '/bayanrun' },
            { label: 'Bayan Craft', href: '/bayancraft' },
          ].map((l) => (
            <li key={l.label}>
              <a href={l.href}>{l.label}</a>
            </li>
          ))}
        </ul>
        <button className="nav-cta">
          <span className="dot" />
          Contact
        </button>
        <button
          className="nav-hamburger"
          onClick={() => setMenuOpen(true)}
          aria-label="Buka menu"
        >
          <Menu size={26} />
        </button>
      </nav>

      {/* ── HERO ── */}
      <section
        className="hero"
        onTouchStart={onHeroTouchStart}
        onTouchEnd={onHeroTouchEnd}
      >
        {/* Background slides */}
        <div className="hero-slides">
          {heroSlides.map((s, i) => (
            <div key={i} className={`hero-slide ${i === slide ? 'active' : ''}`}>
              <img src={s.image} alt={s.label} />
            </div>
          ))}
          <div className="hero-overlay" />
        </div>

        {/* ── DESKTOP: tagline + controls at bottom ── */}
        <div className="hero-content">
          <div className="hero-left">
            <div className={`hero-tagline ${tagVisible ? 'visible' : ''}`}>
              {heroSlides[slide].tagline}
            </div>
          </div>
          <div className={`hero-right ${tagVisible ? 'visible' : ''}`}>
            <p className="hero-desc">{heroSlides[slide].desc}</p>
            <div className="hero-controls">
              <button className="slider-arrow" onClick={() => goSlide(-1)} aria-label="Slide sebelumnya">
                <ChevronLeft size={18} />
              </button>
              <div className="slider-label-pill">
                <span className="pill-dot" />
                <span className="pill-name">{heroSlides[slide].label}</span>
              </div>
              <button className="slider-arrow" onClick={() => goSlide(1)} aria-label="Slide berikutnya">
                <ChevronRight size={18} />
              </button>
            </div>
            <div className="slider-dots" style={{ marginTop: 16 }}>
              {heroSlides.map((_, i) => (
                <button
                  key={i}
                  className={`slider-dot ${i === slide ? 'active' : ''}`}
                  aria-label={`Slide ${i + 1}`}
                  onClick={() => {
                    if (slideTimer.current) clearTimeout(slideTimer.current);
                    setSlide(i);
                  }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Desktop scroll cue */}
        <div className="hero-scroll-cue" onClick={() => scrollTo('about')}>
          <span style={{ fontSize: 10, letterSpacing: '0.25em' }}>SCROLL</span>
          <ChevronDown size={14} />
        </div>

        {/* ── MOBILE: tagline at top (absolute, below nav) ── */}
        <div className="hero-mobile-tagline-wrap">
          <div className={`hero-mobile-tagline ${tagVisible ? 'visible' : ''}`}>
            {heroSlides[slide].tagline}
          </div>
        </div>

        {/* ── MOBILE: controls pinned to bottom ── */}
        <div className="hero-mobile-controls">
          <p className="hero-mobile-desc">{heroSlides[slide].desc}</p>
          <div className="hero-mobile-row">
            <button
              className="slider-arrow"
              style={{ width: 40, height: 40, minWidth: 40, minHeight: 40 }}
              onClick={() => goSlide(-1)}
              aria-label="Slide sebelumnya"
            >
              <ChevronLeft size={16} />
            </button>
            <div className="hero-mobile-pill">
              <span className="pill-dot" />
              <span className="pill-name">{heroSlides[slide].label}</span>
            </div>
            <button
              className="slider-arrow"
              style={{ width: 40, height: 40, minWidth: 40, minHeight: 40 }}
              onClick={() => goSlide(1)}
              aria-label="Slide berikutnya"
            >
              <ChevronRight size={16} />
            </button>
          </div>
          <div className="mobile-dots">
            {heroSlides.map((_, i) => (
              <button
                key={i}
                className={`mobile-dot ${i === slide ? 'active' : ''}`}
                aria-label={`Slide ${i + 1}`}
                onClick={() => {
                  if (slideTimer.current) clearTimeout(slideTimer.current);
                  setSlide(i);
                }}
              />
            ))}
          </div>
        </div>
      </section>

      {/* MARQUEE */}
 <div className="relative bg-white py-6 md:py-8 overflow-hidden">
          <div
            ref={topTextRef}
            className="flex whitespace-nowrap"
            style={{ width: '200%' }}
          >
            {/* Duplicate text for seamless loop - 4 repetitions to ensure no gaps */}
            {[...Array(4)].map((_, index) => (
              <div key={index} className="flex items-center flex-shrink-0">
                <span className="text-3xl md:text-5xl lg:text-7xl font-black text-blue-900 tracking-tight uppercase mx-8">
                  THE NEXT LEVEL
                </span>
                <span className="text-3xl md:text-5xl lg:text-7xl font-black text-blue-900 mx-4">•</span>
                <span className="text-3xl md:text-5xl lg:text-7xl font-black text-orange-600 tracking-tight uppercase mx-8">
                  KEEP MOVING KEEP STRONG
                </span>
                <span className="text-3xl md:text-5xl lg:text-7xl font-black text-orange-600 mx-4">•</span>
              </div>
            ))}
          </div>
        </div>

      {/* ABOUT */}
      <section id="about" className="about" ref={aboutRef}>
        <img
          className="about-bg-silhouette"
          src="https://res.cloudinary.com/djs5pi7ev/image/upload/v1779086232/BYAN.JK-1a0ebfda_auhfe5.png"
          alt=""
          aria-hidden="true"
        />
        <div className="container">
          <div className="about-grid">
            <div>
              <div className="about-label">Tentang Kami</div>
              <h2 className="about-title">
                BAYAN
                <br />
                <span>EVENT</span>
              </h2>
              <p className="about-body">
                <strong>BAYAN EVENT</strong> adalah perjalanan pengalaman yang menyatukan energi,
                kreativitas, dan kolaborasi dihadirkan melalui event berkelas yang menginspirasi.
                Sejak 2022, kami telah menghadirkan lebih dari <strong>10+ event</strong> yang
                mempertemukan ribuan peserta dari berbagai latar belakang.
                <br />
                <br />
                Dari <strong>BAYAN OPEN</strong> yang menampilkan kompetisi olahraga bergengsi,{' '}
                <strong>BAYAN RUN</strong> yang menguji ketahanan para pelari,{' '}
                <strong>BAYAN SOCCER CLINIC</strong> yang membina talenta muda, hingga{' '}
                <strong>BAYAN CRAFT FESTIVAL</strong> yang mendukung UMKM dan seniman lokal setiap
                event dirancang untuk menciptakan momen tak terlupakan.
              </p>
            </div>
            <div>
              <div className="stats-grid">
                {[
                  { n: `${stats.events}+`, l: 'Total Events' },
                  { n: `${stats.participants.toLocaleString()}+`, l: 'Peserta' },
                  { n: `${stats.partners}+`, l: 'Partners' },
                  { n: `${stats.years}+`, l: 'Tahun' },
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

      {/* EVENTS */}
      <section id="events" className="events">
        <div className="container">
          <div className="section-label">Apa yang kami hadirkan</div>
          <h2 className="section-title">
            OUR <span>EVENTS</span>
          </h2>
        </div>
        <div className="events-grid">
          {[
            {
              type: 'Badminton',
              name: 'BAYAN\nOPEN',
              desc: 'Turnamen olahraga berstandar nasional yang melahirkan atlet terbaik.',
              img: 'https://res.cloudinary.com/djs5pi7ev/image/upload/w_800,q_auto,f_auto/v1767765503/Bayan-1739_e0mi1r.jpg',
              href: '/bayanopen',
            },
            {
              type: 'Running',
              name: 'BAYAN\nRUN',
              desc: 'Event lari tahunan yang menguji ketahanan dan dedikasi ribuan pelari.',
              img: 'https://res.cloudinary.com/djs5pi7ev/image/upload/w_800,q_auto,f_auto/v1767765516/20251012060936_-_BOM_7023_uzwd7f.jpg',
              href: '/bayanrun',
            },
            {
              type: 'Kesenian',
              name: 'BAYAN\nCRAFT',
              desc: 'Festival seni & budaya yang merayakan karya kreatif UMKM lokal.',
              img: 'https://res.cloudinary.com/djs5pi7ev/image/upload/w_800,q_auto,f_auto/v1767765488/Bayan-8827_woaplh.jpg',
              href: '/bayancraft',
            },
            {
              type: 'Sepak Bola',
              name: 'BAYAN\nSOCCER',
              desc: 'Program pembinaan talenta muda untuk membangun karakter atlet profesional.',
              img: 'https://res.cloudinary.com/djs5pi7ev/image/upload/w_800,q_auto,f_auto/v1769135304/ALK-4991_lwizwj.jpg',
              href: 'https://bayansoccer.com/',
            },
          ].map((ev, i) => (
            <div className="event-card" key={ev.type}>
              <span className="event-num">0{i + 1}</span>
              <img src={ev.img} alt={ev.name} loading="lazy" />
              <div className="event-card-body">
                <div className="event-type">{ev.type}</div>
                <h3 className="event-name" style={{ whiteSpace: 'pre-line' }}>
                  {ev.name}
                </h3>
                <p className="event-desc">{ev.desc}</p>
                <a href={ev.href} className="event-link">
                  Selengkapnya <ChevronRight size={14} />
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* TIMELINE */}
      <section id="timeline" className="timeline-section">
        <div className="timeline-bg">
          <video autoPlay loop muted playsInline preload="none">
            <source
              src="https://res.cloudinary.com/djs5pi7ev/video/upload/q_auto:low/v1767777527/teaser-flow_xbhw7p.mp4"
              type="video/mp4"
            />
          </video>
        </div>
        <div className="timeline-inner container">
          <div
            className="section-label"
            style={{ justifyContent: 'center', color: 'rgba(255,255,255,0.5)' }}
          >
            Perjalanan kami
          </div>
          <h2 className="section-title" style={{ color: '#fff', marginBottom: 80 }}>
            OUR <span>JOURNEY</span>
          </h2>
          <div style={{ position: 'relative' }}>
          {/* TIMELINE */}
          {timeline.map((item, i) => (
            <div className="timeline-item" key={item.year}>
              {i % 2 === 0 ? (
                // Ganjil (0, 2): teks di KIRI, dot di tengah, kosong di kanan
                <>
                  <div className="timeline-text">
                    <span className="timeline-year">{item.year}</span>
                    <h3 className="timeline-title">{item.title}</h3>
                    <p className="timeline-desc">{item.description}</p>
                  </div>
                  <div className="timeline-center">
                    <div className="timeline-dot" />
                  </div>
                  <div /> {/* kosong kanan */}
                </>
              ) : (
                // Genap (1, 3): kosong di kiri, dot di tengah, teks di KANAN
                <>
                  <div /> {/* kosong kiri */}
                  <div className="timeline-center">
                    <div className="timeline-dot" />
                  </div>
                  <div className="timeline-text" style={{ textAlign: 'left', paddingLeft: 48 }}>
                    <span className="timeline-year">{item.year}</span>
                    <h3 className="timeline-title">{item.title}</h3>
                    <p className="timeline-desc">{item.description}</p>
                  </div>
                </>
              )}
            </div>
          ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section id="testimonials" className="testimonials">
        <div className="container">
          <div className="section-label">Kata Mereka</div>
          <h2 className="section-title">
            WHAT THEY <span>SAY</span>
          </h2>

          {/* Desktop: 3-col auto-scroll */}
          <div className="testi-grid">
            <div style={{ overflow: 'hidden' }}>
              <div ref={col1Ref} className="testi-col">
                {[...testimonialsCol1, ...testimonialsCol1].map((t, i) => (
                  <TestiCard key={i} t={t} />
                ))}
              </div>
            </div>
            <div style={{ overflow: 'hidden' }}>
              <div ref={col2Ref} className="testi-col">
                {[...testimonialsCol2, ...testimonialsCol2].map((t, i) => (
                  <TestiCard key={i} t={t} />
                ))}
              </div>
            </div>
            <div style={{ overflow: 'hidden' }}>
              <div ref={col3Ref} className="testi-col">
                {[...testimonialsCol3, ...testimonialsCol3].map((t, i) => (
                  <TestiCard key={i} t={t} />
                ))}
              </div>
            </div>
          </div>

          {/* Mobile: horizontal snap carousel */}
          <div className="testi-mobile-carousel">
            <div className="testi-carousel-track">
              {allTestimonials.map((t, i) => (
                <div key={i} className="testi-carousel-item">
                  <div className="testi-header">
                    <div>
                      <div className="testi-name">{t.name}</div>
                      <div className="testi-handle">{t.username}</div>
                    </div>
                    <Instagram size={18} className="testi-icon" />
                  </div>
                  <p className="testi-text">{t.quote}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SCHEDULE */}
      <section className="schedule">
        <div className="container">
          <div className="section-label">Jadwal</div>
          <h2 className="section-title" style={{ color: '#fff' }}>
            JADWAL <span style={{ color: 'rgb(255, 255, 255)' }}>2026</span>
          </h2>
        </div>
        <div className="schedule-grid">
          {[
            {
              img: 'https://res.cloudinary.com/djs5pi7ev/image/upload/w_400,q_auto,f_auto/v1767777423/LOGO_EVENT_Bayan_2025_f8yznc.png',
              name: 'Bayan CraftArt Festival',
              venue: 'BSCC Dome Balikpapan',
              date: '24 – 29 Agustus 2026',
            },
            {
              img: 'https://res.cloudinary.com/djs5pi7ev/image/upload/v1775466723/LOGO_BR2026_vbixvo.png',
              name: 'Bayan Run',
              venue: 'Lapangan Merdeka Balikpapan',
              date: '11 Oktober 2026',
            },
            {
              img: 'https://res.cloudinary.com/djs5pi7ev/image/upload/v1776413938/LOGO_BO2026_White_bpz9gb.png',
              name: 'Bayan Open',
              venue: 'BSCC Dome Balikpapan',
              date: '24 – 29 Agustus 2026',
            },
          ].map((s) => (
            <div key={s.name} className="schedule-card">
              <img src={s.img} alt={s.name} loading="lazy" />
              <div className="schedule-name">{s.name}</div>
              <div className="schedule-venue">{s.venue}</div>
              <div className="schedule-date">{s.date}</div>
            </div>
          ))}
        </div>
      </section>

      {/* GALLERY */}
      <section id="gallery" className="gallery">
        <div className="container" style={{ marginBottom: 48 }}>
          <div className="section-label" style={{ color: 'rgba(255,255,255,0.4)' }}>
            Momen Terbaik
          </div>
          <h2 className="section-title" style={{ color: '#fff' }}>
            EVENT <span>GALLERY</span>
          </h2>
        </div>

        {/* Desktop: auto-scroll */}
        {!isMobile && (
          <div style={{ overflow: 'hidden', position: 'relative' }}>
            <div ref={galleryRef} className="gallery-track">
              {[...galleryImages, ...galleryImages].map((img, i) => (
                <div key={i} className="gallery-item">
                  <img src={img} alt="" loading="lazy" />
                </div>
              ))}
            </div>
            <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 120, background: 'linear-gradient(to right, var(--navy), transparent)', pointerEvents: 'none', zIndex: 10 }} />
            <div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: 120, background: 'linear-gradient(to left, var(--navy), transparent)', pointerEvents: 'none', zIndex: 10 }} />
          </div>
        )}

        {/* Mobile: native horizontal scroll */}
        {isMobile && (
          <div
            style={{
              overflowX: 'auto',
              WebkitOverflowScrolling: 'touch',
              scrollSnapType: 'x mandatory',
              display: 'flex',
              gap: 12,
              padding: '0 16px 16px',
              scrollbarWidth: 'none',
            }}
          >
            {galleryImages.map((img, i) => (
              <div
                key={i}
                style={{
                  flexShrink: 0,
                  width: 220,
                  height: 300,
                  borderRadius: 8,
                  overflow: 'hidden',
                  scrollSnapAlign: 'start',
                }}
              >
                <img src={img} alt="" loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
            ))}
          </div>
        )}
      </section>

      {/* CTA */}
      <section className="cta-section">
        <h2 className="cta-title">
          READY TO JOIN
          <br />
          <span>THE MOVEMENT?</span>
        </h2>
        <p className="cta-body">
          Bergabunglah dengan ribuan peserta dalam event-event spektakuler kami. Jadilah bagian dari
          komunitas yang terus berkembang dan berprestasi.
        </p>
        <div className="cta-buttons">
          <button className="btn-primary" onClick={() => scrollTo('events')}>
            EXPLORE EVENTS
          </button>
          <button className="btn-secondary">CONTACT US</button>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </>
  );
}