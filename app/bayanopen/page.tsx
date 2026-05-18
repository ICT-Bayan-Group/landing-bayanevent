'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import {
  ChevronDown, Trophy, Calendar, MapPin, Instagram, Linkedin, Mail, ChevronRight, Menu, X
} from 'lucide-react';
import Image from 'next/image';
import Link from "next/link";
import Footer from '@/components/layout/Footer';
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
    background: rgba(255,255,255,0.10); border-radius: 100px; overflow: hidden;
  }
  .preloader-bar {
    height: 100%; background: var(--orange); border-radius: 100px;
    transition: width 0.25s ease-out; width: 0%;
  }
  .preloader-pct {
    font-family: var(--font-display); font-size: 11px;
    letter-spacing: 0.35em; color: rgba(255,255,255,0.35); text-align: center;
  }
  .preloader-text {
    font-family: var(--font-display); font-weight: 700; font-size: 10px;
    letter-spacing: 0.5em; color: rgba(255,255,255,0.2); text-transform: uppercase;
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
  .nav-links a:hover, .nav-links a.active { color: var(--orange); }
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
    display: none; background: transparent; border: none; color: #fff; cursor: pointer;
    padding: 8px; -webkit-tap-highlight-color: transparent;
    align-items: center; justify-content: center;
  }
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

  /* ── LEGENDS ── */
  .legends { background: #0D0D0D; padding: 120px 0; position: relative; overflow: hidden; }
  .legends::before {
    content: ''; position: absolute; inset: 0;
    background: radial-gradient(ellipse at 80% 50%, rgba(232,91,0,0.08) 0%, transparent 60%);
    pointer-events: none;
  }
  .legends-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 2px; }
  .legend-card {
    position: relative; overflow: hidden; background: #111;
    cursor: default;
  }
  .legend-card img {
    width: 100%; aspect-ratio: 3/4; object-fit: cover; display: block;
    transition: transform 0.7s cubic-bezier(0.4,0,0.2,1), filter 0.5s;
    filter: saturate(0.6) brightness(0.9);
  }
  .legend-card:hover img { transform: scale(1.05); filter: saturate(1) brightness(1); }
  .legend-card::before {
    content: ''; position: absolute; inset: 0; z-index: 1;
    background: linear-gradient(to top, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.3) 55%, transparent 100%);
  }
  .legend-card-body {
    position: absolute; bottom: 0; left: 0; right: 0; z-index: 2; padding: 40px 36px;
  }
  .legend-title-tag {
    font-family: var(--font-display); font-weight: 700; font-size: 11px;
    letter-spacing: 0.25em; text-transform: uppercase; color: var(--orange);
    margin-bottom: 10px;
  }
  .legend-name {
    font-family: var(--font-display); font-weight: 900; font-style: italic;
    font-size: clamp(36px, 3.5vw, 52px); line-height: 0.95; color: #fff;
    margin-bottom: 12px;
  }
  .legend-subtitle { font-size: 14px; color: rgba(255,255,255,0.6); font-weight: 300; margin-bottom: 20px; }
  .legend-achievements { display: flex; flex-direction: column; gap: 8px; }
  .legend-achievement {
    display: flex; align-items: flex-start; gap: 10px;
    font-size: 13px; color: rgba(255,255,255,0.7); font-weight: 300; line-height: 1.4;
  }
  .legend-achievement svg { color: var(--orange); flex-shrink: 0; margin-top: 1px; }
  .legends-note {
    margin-top: 2px; background: var(--orange); padding: 32px 48px;
    display: grid; grid-template-columns: auto 1fr; gap: 24px; align-items: center;
  }
  .legends-note-label {
    font-family: var(--font-display); font-weight: 900; font-style: italic;
    font-size: 40px; color: #fff; white-space: nowrap; line-height: 1;
  }
  .legends-note-body { font-size: 15px; color: rgba(255,255,255,0.85); font-weight: 300; line-height: 1.7; }
  .legends-note-body strong { color: #fff; font-weight: 600; }

  /* ── CATEGORIES ── */
  .categories { background: var(--off-white); padding: 120px 0; }
  .categories-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 2px; margin-bottom: 80px; }
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
  .cat-head {
    font-family: var(--font-display); font-weight: 900; font-size: 22px;
    color: var(--navy); text-transform: uppercase; margin-bottom: 6px; line-height: 1.1;
  }
  .cat-sub {
    font-family: var(--font-display); font-weight: 700; font-size: 14px;
    color: var(--orange); letter-spacing: 0.1em; text-transform: uppercase;
    margin-bottom: 28px;
  }
  .cat-items { display: flex; flex-direction: column; gap: 10px; }
  .cat-item {
    display: flex; align-items: flex-start; gap: 12px;
    font-size: 14px; color: rgba(10,22,40,0.75); font-weight: 400; line-height: 1.4;
  }
  .cat-dot { width: 6px; height: 6px; border-radius: 50%; background: var(--orange); flex-shrink: 0; margin-top: 5px; }

  /* ── VENUES ── */
  .venues-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 3px; margin-bottom: 80px; }
  .venue-card { background: var(--navy); padding: 56px 48px; }
  .venue-icon { color: var(--orange); margin-bottom: 24px; }
  .venue-name {
    font-family: var(--font-display); font-weight: 900; font-style: italic;
    font-size: 40px; color: #fff; margin-bottom: 12px;
  }
  .venue-desc { font-size: 14px; color: rgba(255,255,255,0.6); font-weight: 300; margin-bottom: 28px; line-height: 1.6; }
  .venue-facilities { display: flex; flex-direction: column; gap: 10px; }
  .venue-facility {
    display: flex; align-items: flex-start; gap: 12px;
    font-size: 14px; color: rgba(255,255,255,0.65); font-weight: 300;
  }
  .venue-facility-dot { width: 4px; height: 4px; border-radius: 50%; background: var(--orange); flex-shrink: 0; margin-top: 7px; }

  /* ── PRIZES ── */
  .prizes { background: var(--navy); padding: 120px 0; }
  .prizes-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 2px; }
  .prize-card {
    padding: 56px 40px; text-align: center; position: relative; overflow: hidden;
    background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.06);
    transition: background 0.3s;
  }
  .prize-card:hover { background: rgba(255,255,255,0.07); }
  .prize-card.gold { border-top: 3px solid #F5C842; }
  .prize-card.silver { border-top: 3px solid #B8C0CC; }
  .prize-card.bronze { border-top: 3px solid var(--orange); }
  .prize-icon {
    font-family: var(--font-display); font-weight: 900; font-style: italic;
    font-size: 88px; line-height: 1; margin-bottom: 16px;
    display: block;
  }
  .prize-card.gold .prize-icon { color: #F5C842; }
  .prize-card.silver .prize-icon { color: #B8C0CC; }
  .prize-card.bronze .prize-icon { color: var(--orange); }
  .prize-place {
    font-family: var(--font-display); font-weight: 900; font-size: 20px;
    letter-spacing: 0.15em; text-transform: uppercase; color: #fff;
    margin-bottom: 12px;
  }
  .prize-desc { font-size: 15px; color: rgba(255,255,255,0.65); font-weight: 300; line-height: 1.5; }

  /* ── TIMELINE ── */
  .timeline-section {
    position: relative; padding: 120px 0; overflow: hidden;
    background: var(--navy-mid);
  }
  .timeline-line {
    position: absolute; left: 50%; top: 0; bottom: 0;
    width: 1px; background: rgba(255,255,255,0.1); transform: translateX(-50%);
  }
  .tl-items { position: relative; }
  .tl-item {
    display: grid; grid-template-columns: 1fr 80px 1fr;
    align-items: center; margin-bottom: 72px;
  }
  .tl-item:last-child { margin-bottom: 0; }
  .tl-text-left { text-align: right; padding-right: 48px; }
  .tl-text-right { text-align: left; padding-left: 48px; }
  .tl-date {
    font-family: var(--font-display); font-weight: 700; font-size: 12px;
    letter-spacing: 0.1em; color: var(--orange); background: rgba(232,91,0,0.12);
    border: 1px solid rgba(232,91,0,0.3); padding: 4px 14px; border-radius: 100px;
    display: inline-block; margin-bottom: 10px;
  }
  .tl-event {
    font-family: var(--font-display); font-weight: 900; font-size: 28px;
    color: #fff; margin-bottom: 6px; line-height: 1;
  }
  .tl-desc { font-size: 14px; color: rgba(255,255,255,0.55); font-weight: 300; line-height: 1.6; }
  .tl-dot {
    width: 16px; height: 16px; border-radius: 50%; background: var(--orange);
    border: 3px solid var(--navy-mid); margin: 0 auto;
    box-shadow: 0 0 0 4px rgba(232,91,0,0.2);
  }

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
    -webkit-tap-highlight-color: transparent;
  }
  .btn-primary:hover { background: #c54a00; transform: translateY(-2px); }
  .btn-secondary {
    font-family: var(--font-display); font-weight: 700; font-size: 13px;
    letter-spacing: 0.15em; text-transform: uppercase;
    background: transparent; color: var(--navy);
    border: 1.5px solid var(--navy); padding: 18px 48px; cursor: pointer;
    transition: all 0.2s; -webkit-tap-highlight-color: transparent;
  }
  .btn-secondary:hover { background: var(--navy); color: #fff; transform: translateY(-2px); }

  /* ── FOOTER ── */
  .footer { background: var(--navy-mid); padding: 72px 0 40px; }
  .footer-grid { display: grid; grid-template-columns: 2fr 1fr 1fr 1fr; gap: 60px; margin-bottom: 48px; }
  .footer-logo img { height: 40px; object-fit: contain; margin-bottom: 16px; }
  .footer-tagline { font-size: 14px; color: rgba(255,255,255,0.5); font-weight: 300; line-height: 1.6; }
  .footer-heading {
    font-family: var(--font-display); font-weight: 700; font-size: 11px;
    letter-spacing: 0.25em; text-transform: uppercase; color: rgba(255,255,255,0.4); margin-bottom: 20px;
  }
  .footer-links { list-style: none; display: flex; flex-direction: column; gap: 10px; }
  .footer-links a {
    font-size: 14px; color: rgba(255,255,255,0.6); text-decoration: none;
    transition: color 0.2s; font-weight: 300;
  }
  .footer-links a:hover { color: #fff; }
  .footer-social { display: flex; gap: 16px; margin-top: 20px; }
  .footer-social-icon {
    width: 44px; height: 44px; border-radius: 50%;
    border: 1px solid rgba(255,255,255,0.2); display: flex; align-items: center; justify-content: center;
    color: rgba(255,255,255,0.6); cursor: pointer; transition: all 0.2s; background: transparent;
    -webkit-tap-highlight-color: transparent;
  }
  .footer-social-icon:hover { border-color: var(--orange); color: var(--orange); }
  .footer-bottom {
    border-top: 1px solid rgba(255,255,255,0.08); padding-top: 28px;
    display: flex; justify-content: space-between; align-items: center;
    font-size: 12px; color: rgba(255,255,255,0.35); font-weight: 300;
  }

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
    .legends-grid { grid-template-columns: 1fr; }
    .categories-grid { grid-template-columns: 1fr; }
    .venues-grid { grid-template-columns: 1fr; }
    .prizes-grid { grid-template-columns: 1fr; }
    .footer-grid { grid-template-columns: 1fr 1fr; }

    .tl-item { grid-template-columns: 1fr !important; }
    .tl-text-left, .tl-text-right { text-align: left; padding: 0 !important; }
    .tl-dot { display: none; }
    .timeline-line { display: none; }
    .tl-item { margin-bottom: 40px; }

    .legends-note { grid-template-columns: 1fr; padding: 28px 24px; }
    .legends-note-label { font-size: 32px; }
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
    .legends { padding: 72px 0; }
    .legend-card-body { padding: 28px 24px; }
    .legend-name { font-size: 32px; }
    .categories { padding: 72px 0; }
    .cat-card { padding: 36px 28px; }
    .venue-card { padding: 40px 28px; }
    .prizes { padding: 72px 0; }
    .prize-card { padding: 40px 24px; }
    .cta-section { padding: 80px 24px; }
    .btn-primary, .btn-secondary { padding: 16px 32px; width: 100%; text-align: center; }
    .cta-buttons { flex-direction: column; align-items: stretch; }
    .footer { padding: 48px 0 32px; }
    .footer-grid { grid-template-columns: 1fr; gap: 32px; }
    .footer-bottom { flex-direction: column; gap: 12px; text-align: center; }
    .container { padding: 0 16px; }
    .timeline-section { padding: 72px 0; }
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
    title: "KATEGORI OPEN",
    subtitle: "",
    items: ["Ganda Dewasa Putra/Putri", "Ganda Veteran Putra", "Beregu Putra Se-Kota Balikpapan"],
  },
  {
    title: "SIRKUIT NASIONAL C",
    subtitle: "TUNGGAL",
    items: ["Usia Dini Putra/Putri", "Anak-anak Putra/Putri", "Pemula Putra/Putri", "Remaja Putra/Putri", "Taruna Putra/Putri"],
  },
  {
    title: "SIRKUIT NASIONAL C",
    subtitle: "GANDA",
    items: ["Pemula Putra/Putri", "Remaja Putra/Putri", "Remaja Campuran", "Taruna Putra/Putri", "Taruna Campuran"],
  },
];

const timelineData = [
  { date: "1–15 Juli 2025", event: "Pendaftaran Dibuka", desc: "Pendaftaran online melalui website resmi" },
  { date: "20 Juli 2025", event: "Technical Meeting", desc: "Briefing teknis untuk semua peserta" },
  { date: "4–9 Agustus 2025", event: "Pelaksanaan Turnamen", desc: "Pertandingan berlangsung di BSCC Dome" },
  { date: "9 Agustus 2025", event: "Final & Awarding", desc: "Pertandingan final dan pemberian penghargaan" },
];

const prizes = [
  { rank: "I", place: "JUARA 1", desc: "Medali + Uang Pembinaan + Piagam Penghargaan", tier: "gold" },
  { rank: "II", place: "JUARA 2", desc: "Medali + Uang Pembinaan + Piagam Penghargaan", tier: "silver" },
  { rank: "III", place: "JUARA 3", desc: "Medali + Uang Pembinaan + Piagam Penghargaan", tier: "bronze" },
];

const legends = [
  {
    name: "Hendra Setiawan",
    title: "Legenda Ganda Putra Indonesia",
    image: "https://res.cloudinary.com/djs5pi7ev/image/upload/v1779094334/hendra-setiawan_jhk46u.png",
    achievements: ["Juara Olimpiade 2016 (Rio)", "Juara Dunia 2013, 2015, 2019", "Juara All England 8×", "Pemain dengan prestasi terlengkap di Indonesia"],
  },
  {
    name: "Marcus Fernaldi Gideon",
    title: "The Young Legend",
    image: "https://res.cloudinary.com/djs5pi7ev/image/upload/v1779094335/marcus-gideon_ypewn2.png",
    achievements: ["Juara Dunia 2017, 2019, 2021", "Juara All England 2018", "Peringkat 1 Dunia BWF", "Pasangan terkuat bersama Kevin Sanjaya"],
  },
];

const venues = [
  {
    name: "BSCC Dome",
    desc: "Venue utama dengan lapangan standar internasional",
    facilities: ["Lapangan standar internasional", "Kapasitas 3000+ penonton", "Medical team standby", "Area VIP dan tribun nyaman"],
  },
  {
    name: "Hevindo Arena",
    desc: "Venue pendukung untuk kategori preliminaries",
    facilities: ["Lapangan berkualitas tinggi", "Area istirahat pemain", "Shuttle berkualitas tinggi", "Wasit berlisensi resmi"],
  },
    {
    name: "GOR Bulutangkis BJBJ",
    desc: "Venue pendukung untuk kategori preliminaries",
    facilities: ["Lapangan berkualitas tinggi", "Area istirahat pemain", "Shuttle berkualitas tinggi", "Wasit berlisensi resmi"],
  },
];

const marqueeItems = ["Bayan Open 2025", "Sirnas C", "BSCC Dome", "Balikpapan", "4-9 Agustus 2025", "100 Juta+", "Hendra Setiawan", "Marcus Gideon"];

// ─── MAIN ────────────────────────────────────────────────────────────────
export default function BayanOpen() {
  const [loading, setLoading] = useState(true);
  const [preloaderExit, setPreloaderExit] = useState(false);
  const [progress, setProgress] = useState(0);
  const [navScrolled, setNavScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [heroVisible, setHeroVisible] = useState(false);
  const [stats, setStats] = useState({ matches: 0, teams: 0, prize: 0, spectators: 0 });
  const [statsRan, setStatsRan] = useState(false);
  const aboutRef = useRef<HTMLElement>(null);

  // Lock body when menu open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  // Preloader
  useEffect(() => {
    const iv = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) { clearInterval(iv); return 100; }
        return Math.min(p + Math.random() * 14, 100);
      });
    }, 100);
    const t = setTimeout(() => {
      setProgress(100);
      setTimeout(() => {
        setPreloaderExit(true);
        setTimeout(() => { setLoading(false); setHeroVisible(true); }, 700);
      }, 300);
    }, 2200);
    return () => { clearInterval(iv); clearTimeout(t); };
  }, []);

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
        if (!entries[0].isIntersecting) return;
        setStatsRan(true);
        const targets = { matches: 150, teams: 80, prize: 600, spectators: 5000 };
        const duration = 1800;
        const start = performance.now();
        const run = (now: number) => {
          const p = Math.min((now - start) / duration, 1);
          const e = 1 - Math.pow(1 - p, 3);
          setStats({
            matches: Math.floor(targets.matches * e),
            teams: Math.floor(targets.teams * e),
            prize: Math.floor(targets.prize * e),
            spectators: Math.floor(targets.spectators * e),
          });
          if (p < 1) requestAnimationFrame(run);
          else setStats(targets);
        };
        requestAnimationFrame(run);
      },
      { threshold: 0.3 }
    );
    if (aboutRef.current) obs.observe(aboutRef.current);
    return () => obs.disconnect();
  }, [statsRan]);

  const scrollTo = (id: string) => {
    setMenuOpen(false);
    setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  const marqueeContent = [...marqueeItems, ...marqueeItems];

  return (
    <>
      <style>{styles}</style>

      {/* PRELOADER */}
      {loading && (
        <div className={`preloader${preloaderExit ? ' exit' : ''}`}>
          <img
            className="preloader-logo"
            src="https://res.cloudinary.com/djs5pi7ev/image/upload/v1776413938/LOGO_BO2026_White_bpz9gb.png"
            alt="Bayan Open 2025"
          />
          <div className="preloader-progress-wrap">
            <div className="preloader-bar-wrap">
              <div className="preloader-bar" style={{ width: `${progress}%` }} />
            </div>
            <div className="preloader-pct">{Math.round(progress)}%</div>
          </div>
          <div className="preloader-text">Bayan Open 2025</div>
        </div>
      )}

      {/* MOBILE MENU */}
      <div className={`mobile-menu${menuOpen ? ' open' : ''}`} aria-modal="true" role="dialog">
        <button className="mobile-menu-close" onClick={() => setMenuOpen(false)} aria-label="Tutup menu">
          <X size={28} />
        </button>
        <a href="/">Home</a>
        <a href="/bayanopen" onClick={() => setMenuOpen(false)}>Bayan Open</a>
        <a href="/bayanrun" onClick={() => setMenuOpen(false)}>Bayan Run</a>
        <a href="/bayancraft" onClick={() => setMenuOpen(false)}>Bayan Craft</a>
      </div>

      {/* NAV */}
      <nav className={`nav${navScrolled ? ' scrolled' : ''}`}>
        <div className="nav-logo">
          <img
            src="https://res.cloudinary.com/djs5pi7ev/image/upload/v1769476664/bayan-thenext-white-nobg_qis407.png"
            alt="Bayan"
          />
        </div>
        <ul className="nav-links">
          {[
            { label: 'Home', href: '/' },
            { label: 'Bayan Open', href: '/bayanopen', active: true },
            { label: 'Bayan Run', href: '/bayanrun' },
            { label: 'Bayan Craft', href: '/bayancraft' },
          ].map((l) => (
            <li key={l.label}>
              <a href={l.href} className={l.active ? 'active' : ''}>{l.label}</a>
            </li>
          ))}
        </ul>
        <button className="nav-cta" onClick={() => scrollTo('cta')}>
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
          <video autoPlay muted loop playsInline preload="metadata"
            poster="https://res.cloudinary.com/djs5pi7ev/image/upload/w_1920,q_auto:low,f_auto/v1769502814/bayanopen-hero_iqhyip.jpg">
            <source
              src="https://res.cloudinary.com/djs5pi7ev/video/upload/q_auto:low,w_1920/v1769502814/bayanopen-hero_iqhyip.mp4"
              type="video/mp4"
            />
          </video>
          <div className="hero-overlay" />
        </div>

        <div className="hero-content">
          <div>
            <img
              className="hero-logo"
              src="https://res.cloudinary.com/djs5pi7ev/image/upload/v1776413938/LOGO_BO2026_White_bpz9gb.png"
              alt="Bayan Open 2026"
            />
            <div className={`hero-tagline${heroVisible ? ' visible' : ''}`}>
              TURNAMEN<br />
              <span style={{ color: 'var(--orange)' }}>BERGENGSI</span><br />
              NASIONAL
            </div>
          </div>

          <div className={`hero-right${heroVisible ? ' visible' : ''}`}>
            <div className="hero-pill">
              <Calendar size={16} />
              <span>24 – 29 Agustus 2026</span>
            </div>
            <div className="hero-pill">
              <MapPin size={16} />
              <span>BSCC Dome Balikpapan</span>
              <MapPin size={16} />
              <span>Hevindo Arena Balikpapan</span>
            </div>

            <div className="hero-pill">
              <MapPin size={16} />
              <span>GOR Bulutangkis BJBJ Balikpapan</span>
            </div>
            <button className="hero-cta" onClick={() => window.open('https://bayanopen.com', '_blank')}>
              DAFTAR SEKARANG <ChevronRight size={14} style={{ display: 'inline', marginLeft: 6 }} />
            </button>
          </div>
        </div>

        <div className="hero-scroll-cue" onClick={() => scrollTo('about')}>
          <span style={{ fontSize: 10, letterSpacing: '0.25em' }}>SCROLL</span>
          <ChevronDown size={14} />
        </div>
      </section>


      {/* ── ABOUT ── */}
      <section id="about" className="about" ref={aboutRef}>
        <div className="container">
          <div className="about-grid">
            <div>
              <div className="about-label">Tentang Turnamen</div>
              <h2 className="about-title">
                BAYAN<br />
                <span>OPEN</span>
              </h2>
              <p className="about-body">
                <strong>BAYAN OPEN</strong> adalah turnamen bulu tangkis bergengsi yang diselenggarakan setiap tahun oleh PT Bayan Resources Tbk. Dimulai sejak 2022, turnamen ini telah menjadi ajang kompetisi yang dinanti-nantikan oleh para atlet muda berbakat di seluruh Indonesia.
                <br /><br />
                Dengan status <strong>SIRNAS C</strong> yang diakui oleh PBSI, BAYAN OPEN 2025 menjadi platform penting bagi para pemain muda untuk mengasah kemampuan, meraih prestasi, dan mendapatkan poin peringkat nasional.
                <br /><br />
                Klub-klub besar seperti <strong>PB Djarum, PB Jaya Raya, dan PB Exist</strong> turut berlaga, menjadikan turnamen ini ajang pembuktian sekaligus batu loncatan menuju level nasional dan internasional.
              </p>
            </div>
            <div>
              <div className="stats-grid">
                {[
                  { n: `${stats.matches}+`, l: 'Pertandingan' },
                  { n: `${stats.teams}+`, l: 'Tim' },
                  { n: `${stats.prize}Jt+`, l: 'Total Hadiah' },
                  { n: `${stats.spectators.toLocaleString()}+`, l: 'Penonton' },
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

      {/* ── LEGENDS ── */}
      <section className="legends">
        <div className="container" style={{ marginBottom: 48 }}>
          <div className="section-label muted">Coaching Clinic & Exhibition Match</div>
          <h2 className="section-title white">
            OUR <span>LEGENDS</span>
          </h2>
        </div>

        <div className="legends-grid">
          {legends.map((leg, i) => (
            <div key={i} className="legend-card">
              <img src={leg.image} alt={leg.name} loading="lazy" />
              <div className="legend-card-body">
                <div className="legend-title-tag">Bayan Open 2025</div>
                <h3 className="legend-name">{leg.name}</h3>
                <p className="legend-subtitle">{leg.title}</p>
                <div className="legend-achievements">
                  {leg.achievements.map((ach, j) => (
                    <div key={j} className="legend-achievement">
                      <span>{ach}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="legends-note">
          <div className="legends-note-label">COACHING<br />CLINIC</div>
          <p className="legends-note-body">
            Kedua legenda ini akan memberikan <strong>motivasi langsung</strong> kepada para peserta, menggelar <strong>coaching clinic eksklusif</strong>, dan menampilkan <strong>laga ekshibisi</strong> yang menghibur sekaligus menginspirasi generasi muda atlet bulutangkis Indonesia.
          </p>
        </div>
      </section>

      {/* ── CATEGORIES ── */}
      <section id="categories" className="categories">
        <div className="container">
          <div className="section-label">Kompetisi</div>
          <h2 className="section-title">
            KATEGORI <span>PERTANDINGAN</span>
          </h2>
        </div>

        <div className="categories-grid" style={{ maxWidth: 1280, margin: '0 auto 80px' }}>
          {categories.map((cat, i) => (
            <div key={i} className="cat-card">
              <span className="cat-number">0{i + 1}</span>
              <h3 className="cat-head">{cat.title}</h3>
              {cat.subtitle && <div className="cat-sub">{cat.subtitle}</div>}
              {!cat.subtitle && <div style={{ marginBottom: 28 }} />}
              <div className="cat-items">
                {cat.items.map((item, j) => (
                  <div key={j} className="cat-item">
                    <span className="cat-dot" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="container">
          <div className="section-label left">Venue</div>
          <h2 className="section-title left" style={{ marginBottom: 40 }}>
            VENUE <span>PERTANDINGAN</span>
          </h2>
        </div>

        <div className="venues-grid" style={{ maxWidth: 1280, margin: '0 auto' }}>
          {venues.map((v, i) => (
            <div key={i} className="venue-card">
              <div className="venue-icon"><MapPin size={36} /></div>
              <h3 className="venue-name">{v.name}</h3>
              <p className="venue-desc">{v.desc}</p>
              <div className="venue-facilities">
                {v.facilities.map((f, j) => (
                  <div key={j} className="venue-facility">
                    <span className="venue-facility-dot" />
                    <span>{f}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── PRIZES ── */}
      <section className="prizes">
        <div className="container">
          <div className="section-label muted">Penghargaan</div>
          <h2 className="section-title white">
            TOTAL HADIAH <span>600 JUTA RUPIAH</span>
          </h2>
        </div>
        <div className="prizes-grid" style={{ maxWidth: 1280, margin: '0 auto' }}>
          {prizes.map((p) => (
            <div key={p.rank} className={`prize-card ${p.tier}`}>
              <span className="prize-icon">{p.rank}</span>
              <div className="prize-place">{p.place}</div>
              <div className="prize-desc">{p.desc}</div>
            </div>
          ))}
        </div>
        <p style={{ textAlign: 'center', marginTop: 24, fontFamily: 'var(--font-display)', fontSize: 12, letterSpacing: '0.15em', color: 'rgba(255,255,255,0.35)' }}>
          * SETIAP KATEGORI PERTANDINGAN
        </p>
      </section>

      {/* ── TIMELINE ── */}
      <section id="timeline" className="timeline-section">
        <div className="container">
          <div className="section-label muted">Jadwal</div>
          <h2 className="section-title white" style={{ marginBottom: 80 }}>
            TIMELINE <span>EVENT</span>
          </h2>
          <div className="tl-items" style={{ position: 'relative' }}>
            <div className="timeline-line" />
            {timelineData.map((item, i) => (
              <div key={i} className="tl-item">
                {i % 2 === 0 ? (
                  <>
                    <div className="tl-text-left">
                      <span className="tl-date">{item.date}</span>
                      <h3 className="tl-event">{item.event}</h3>
                      <p className="tl-desc">{item.desc}</p>
                    </div>
                    <div><div className="tl-dot" /></div>
                    <div />
                  </>
                ) : (
                  <>
                    <div />
                    <div><div className="tl-dot" /></div>
                    <div className="tl-text-right">
                      <span className="tl-date">{item.date}</span>
                      <h3 className="tl-event">{item.event}</h3>
                      <p className="tl-desc">{item.desc}</p>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section id="cta" className="cta-section">
        <h2 className="cta-title">
          SIAP MENJADI<br />
          <span>JUARA?</span>
        </h2>
        <p className="cta-body">
          Daftarkan tim Anda sekarang dan raih kesempatan emas untuk bersaing dengan atlet terbaik se-Indonesia!
        </p>
        <div className="cta-buttons">
         <Link href="https://bayanopen.com/" className="btn-primary">
          DAFTAR SEKARANG
        </Link>
        <Link href="https://bayanopen.com/dokumen" className="btn-secondary">
          DOWNLOAD PANDUAN
        </Link>
        </div>
      </section>

      {/* ── FOOTER ── */}
     <Footer />
    </>
  );
}