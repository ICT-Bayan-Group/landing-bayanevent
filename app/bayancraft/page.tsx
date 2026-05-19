"use client";
import { useEffect, useRef, useState } from 'react';
import {
  ChevronDown, Calendar, MapPin, Store, Palette, Music,
  ShoppingBag, Heart, Users, Sparkles, ChevronRight, Menu, X, Instagram, Linkedin, Mail
} from 'lucide-react';

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

  /* ── MARQUEE ── */
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

  /* ── BENEFITS ── */
  .benefits-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 2px; margin-top: 48px; }
  .benefit-card {
    padding: 40px 36px; background: rgba(255,255,255,0.04);
    border: 1px solid rgba(255,255,255,0.06);
    transition: background 0.3s;
  }
  .benefit-card:hover { background: rgba(255,255,255,0.08); }
  .benefit-icon { color: var(--orange); margin-bottom: 20px; }
  .benefit-title {
    font-family: var(--font-display); font-weight: 900; font-size: 22px;
    color: #fff; margin-bottom: 10px; text-transform: uppercase; line-height: 1.1;
  }
  .benefit-desc { font-size: 14px; color: rgba(255,255,255,0.6); font-weight: 300; line-height: 1.6; }

  /* ── ZONES ── */
  .zones { background: var(--off-white); padding: 120px 0; }
  .zones-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 2px; margin-bottom: 48px; }
  .zone-card {
    padding: 56px 40px; position: relative; overflow: hidden;
    background: var(--navy);
  }
  .zone-card.accent-1 { border-top: 3px solid var(--orange); }
  .zone-card.accent-2 { border-top: 3px solid #c54a00; }
  .zone-card.accent-3 { border-top: 3px solid #a03a00; }
  .zone-number {
    font-family: var(--font-display); font-weight: 900; font-style: italic;
    font-size: 80px; color: rgba(232,91,0,0.08); line-height: 1;
    position: absolute; top: 16px; right: 28px; pointer-events: none;
  }
  .zone-icon { color: var(--orange); margin-bottom: 24px; }
  .zone-title {
    font-family: var(--font-display); font-weight: 900; font-size: 28px;
    color: #fff; text-transform: uppercase; margin-bottom: 14px; line-height: 1;
  }
  .zone-desc { font-size: 14px; color: rgba(255,255,255,0.65); font-weight: 300; line-height: 1.7; margin-bottom: 28px; }
  .zone-highlights { display: flex; flex-direction: column; gap: 10px; }
  .zone-highlight {
    display: flex; align-items: center; gap: 10px;
    font-size: 13px; color: rgba(255,255,255,0.7); font-weight: 400;
    font-family: var(--font-display); letter-spacing: 0.05em;
  }
  .zone-dot { width: 5px; height: 5px; border-radius: 50%; background: var(--orange); flex-shrink: 0; }

  .free-entry-banner {
    background: var(--orange); padding: 48px 56px;
    display: grid; grid-template-columns: auto 1fr; gap: 40px; align-items: center;
  }
  .free-entry-label {
    font-family: var(--font-display); font-weight: 900; font-style: italic;
    font-size: 56px; color: #fff; white-space: nowrap; line-height: 1;
  }
  .free-entry-body { font-size: 16px; color: rgba(255,255,255,0.9); font-weight: 300; line-height: 1.7; }
  .free-entry-body strong { color: #fff; font-weight: 600; }

  /* ── GALLERY ── */
  .gallery { background: #0D0D0D; padding: 120px 0; position: relative; overflow: hidden; }
  .gallery::before {
    content: ''; position: absolute; inset: 0;
    background: radial-gradient(ellipse at 80% 50%, rgba(232,91,0,0.07) 0%, transparent 60%);
    pointer-events: none;
  }
  .gallery-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 3px; margin-bottom: 3px; }
  .gallery-item {
    position: relative; overflow: hidden; background: #111; cursor: default;
  }
  .gallery-item img {
    width: 100%; aspect-ratio: 4/3; object-fit: cover; display: block;
    transition: transform 0.7s cubic-bezier(0.4,0,0.2,1), filter 0.5s;
    filter: saturate(0.7) brightness(0.9);
  }
  .gallery-item:hover img { transform: scale(1.06); filter: saturate(1) brightness(1); }
  .gallery-item::before {
    content: ''; position: absolute; inset: 0; z-index: 1;
    background: linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 60%);
    opacity: 0; transition: opacity 0.3s;
  }
  .gallery-item:hover::before { opacity: 1; }
  .gallery-item-label {
    position: absolute; bottom: 0; left: 0; right: 0; z-index: 2; padding: 24px 28px;
    transform: translateY(8px); opacity: 0; transition: all 0.3s;
  }
  .gallery-item:hover .gallery-item-label { transform: translateY(0); opacity: 1; }
  .gallery-item-label p {
    font-family: var(--font-display); font-weight: 700; font-size: 16px;
    color: #fff; letter-spacing: 0.05em;
  }
  .gallery-item-label span { font-size: 13px; color: rgba(255,255,255,0.65); font-weight: 300; }

  /* ── SCROLL STRIP ── */
  .scroll-strip { overflow: hidden; height: 200px; position: relative; }
  .scroll-track {
    display: flex; gap: 3px; height: 100%;
    animation: scrollImages 30s linear infinite;
  }
  .scroll-track:hover { animation-play-state: paused; }
  @keyframes scrollImages { from { transform: translateX(0); } to { transform: translateX(-50%); } }
  .scroll-img {
    flex-shrink: 0; width: 300px; height: 200px; overflow: hidden;
  }
  .scroll-img img { width: 100%; height: 100%; object-fit: cover; display: block; }

  /* ── SCHEDULE ── */
  .schedule-section {
    position: relative; padding: 120px 0; overflow: hidden;
  }
  .schedule-video-wrap { position: absolute; inset: 0; }
  .schedule-video-wrap video { width: 100%; height: 100%; object-fit: cover; }
  .schedule-overlay { position: absolute; inset: 0; background: rgba(0,0,0,0.6); }
  .schedule-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 2px; }
  .schedule-card {
    background: rgba(255,255,255,0.08); backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px);
    border: 1px solid rgba(255,255,255,0.12); padding: 56px 48px;
    transition: background 0.3s;
  }
  .schedule-card:hover { background: rgba(255,255,255,0.14); }
  .schedule-card-label {
    font-family: var(--font-display); font-weight: 700; font-size: 11px;
    letter-spacing: 0.25em; text-transform: uppercase; color: var(--orange);
    margin-bottom: 20px;
  }
  .schedule-card-title {
    font-family: var(--font-display); font-weight: 900; font-style: italic;
    font-size: 36px; color: #fff; margin-bottom: 28px; line-height: 1;
  }
  .schedule-activities { display: flex; flex-direction: column; gap: 12px; }
  .schedule-activity {
    display: flex; align-items: flex-start; gap: 12px;
    font-size: 15px; color: rgba(255,255,255,0.75); font-weight: 300; line-height: 1.4;
  }
  .schedule-activity-dot { width: 5px; height: 5px; border-radius: 50%; background: var(--orange); flex-shrink: 0; margin-top: 7px; }
  .schedule-hours {
    margin-top: 56px; text-align: center;
    background: rgba(255,255,255,0.08); backdrop-filter: blur(12px);
    border: 1px solid rgba(255,255,255,0.12); padding: 24px 48px;
  }
  .schedule-hours p {
    font-family: var(--font-display); font-weight: 700; font-size: 18px;
    color: #fff; letter-spacing: 0.05em;
  }

  /* ── CTA ── */
  .cta-section { background: var(--navy-mid); padding: 140px 48px; text-align: center; }
  .cta-title {
    font-family: var(--font-display); font-weight: 900; font-style: italic;
    font-size: clamp(52px, 7vw, 100px); line-height: 0.9;
    color: #fff; letter-spacing: -0.02em; margin-bottom: 24px;
  }
  .cta-title span { color: var(--orange); }
  .cta-body { font-size: 16px; color: rgba(255,255,255,0.6); max-width: 600px; margin: 0 auto 48px; line-height: 1.7; font-weight: 300; }
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
    background: transparent; color: #fff;
    border: 1.5px solid rgba(255,255,255,0.5); padding: 18px 48px; cursor: pointer;
    transition: all 0.2s; -webkit-tap-highlight-color: transparent;
  }
  .btn-secondary:hover { background: #fff; color: var(--navy); transform: translateY(-2px); }

  /* ── FOOTER ── */
  .footer { background: #050D1A; padding: 72px 0 40px; }
  .footer-grid { display: grid; grid-template-columns: 2fr 1fr 1fr 1fr; gap: 60px; margin-bottom: 48px; }
  .footer-logo img { height: 40px; object-fit: contain; margin-bottom: 16px; }
  .footer-tagline { font-size: 14px; color: rgba(255,255,255,0.45); font-weight: 300; line-height: 1.6; }
  .footer-heading {
    font-family: var(--font-display); font-weight: 700; font-size: 11px;
    letter-spacing: 0.25em; text-transform: uppercase; color: rgba(255,255,255,0.35); margin-bottom: 20px;
  }
  .footer-links { list-style: none; display: flex; flex-direction: column; gap: 10px; }
  .footer-links a {
    font-size: 14px; color: rgba(255,255,255,0.55); text-decoration: none;
    transition: color 0.2s; font-weight: 300;
  }
  .footer-links a:hover { color: var(--orange); }
  .footer-social { display: flex; gap: 16px; margin-top: 20px; }
  .footer-social-icon {
    width: 44px; height: 44px; border-radius: 50%;
    border: 1px solid rgba(255,255,255,0.15); display: flex; align-items: center; justify-content: center;
    color: rgba(255,255,255,0.5); cursor: pointer; transition: all 0.2s; background: transparent;
    -webkit-tap-highlight-color: transparent;
  }
  .footer-social-icon:hover { border-color: var(--orange); color: var(--orange); }
  .footer-bottom {
    border-top: 1px solid rgba(255,255,255,0.07); padding-top: 28px;
    display: flex; justify-content: space-between; align-items: center;
    font-size: 12px; color: rgba(255,255,255,0.3); font-weight: 300;
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
    .benefits-grid { grid-template-columns: 1fr; }
    .zones-grid { grid-template-columns: 1fr; }
    .gallery-grid { grid-template-columns: repeat(2, 1fr); }
    .schedule-grid { grid-template-columns: 1fr; }
    .footer-grid { grid-template-columns: 1fr 1fr; }
    .free-entry-banner { grid-template-columns: 1fr; padding: 36px 28px; }
    .free-entry-label { font-size: 40px; }
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
    .zones { padding: 72px 0; }
    .zone-card { padding: 40px 28px; }
    .gallery { padding: 72px 0; }
    .gallery-grid { grid-template-columns: 1fr; }
    .schedule-section { padding: 72px 0; }
    .schedule-card { padding: 40px 24px; }
    .cta-section { padding: 80px 24px; }
    .btn-primary, .btn-secondary { padding: 16px 32px; width: 100%; text-align: center; }
    .cta-buttons { flex-direction: column; align-items: stretch; }
    .footer { padding: 48px 0 32px; }
    .footer-grid { grid-template-columns: 1fr; gap: 32px; }
    .footer-bottom { flex-direction: column; gap: 12px; text-align: center; }
    .container { padding: 0 16px; }
    .benefits-grid { grid-template-columns: 1fr; }
  }

  @media (prefers-reduced-motion: reduce) {
    .marquee-track { animation: none; }
    .hero-tagline, .hero-right { transition: opacity 0.3s; }
    .hero-scroll-cue { animation: none; }
    .scroll-track { animation: none; }
  }
`;

// ─── DATA ────────────────────────────────────────────────────────────────
const zones = [
  {
    icon: <Store size={40} />,
    title: "UMKM ZONE",
    accent: "accent-1",
    num: "01",
    description: "Lebih dari 100 booth UMKM lokal menampilkan produk kerajinan tangan, kuliner khas, fashion, dan produk inovatif lainnya",
    highlights: ["100+ Tenant UMKM", "Produk Lokal Berkualitas", "Harga Spesial", "Meet & Greet Pengusaha"],
  },
  {
    icon: <Palette size={40} />,
    title: "ART EXHIBITION",
    accent: "accent-2",
    num: "02",
    description: "Pameran seni rupa dari seniman lokal dan nasional, menampilkan lukisan, patung, instalasi, dan karya seni kontemporer",
    highlights: ["50+ Karya Seni", "Workshop Seni", "Live Painting", "Art Competition"],
  },
  {
    icon: <Music size={40} />,
    title: "ENTERTAINMENT",
    accent: "accent-3",
    num: "03",
    description: "Panggung hiburan dengan penampilan musisi lokal, band, DJ, dan pertunjukan seni budaya yang menghibur sepanjang festival",
    highlights: ["Live Music Daily", "Cultural Performance", "DJ Night", "Kids Corner"],
  },
];

const schedule = [
  {
    day: "Hari 1–2",
    title: "Grand Opening & UMKM Showcase",
    activities: ["Opening Ceremony", "UMKM Product Launching", "Fashion Show Local Brand", "Live Music Performance"],
  },
  {
    day: "Hari 3–4",
    title: "Art & Culture Days",
    activities: ["Art Exhibition Opening", "Traditional Dance Performance", "Craft Workshop", "Cultural Talk Show"],
  },
  {
    day: "Hari 5–6",
    title: "Family Fun Weekend",
    activities: ["Kids Activities", "Food Festival", "Music Festival", "Street Performance"],
  },
  {
    day: "Hari 7",
    title: "Closing Festival",
    activities: ["Award Ceremony", "Grand Sale", "Closing Concert", "Fireworks Display"],
  },
];

const benefits = [
  {
    icon: <ShoppingBag size={36} />,
    title: "Dukung UMKM Lokal",
    description: "Setiap pembelian Anda membantu pengembangan usaha lokal dan ekosistem kreator Indonesia",
  },
  {
    icon: <Heart size={36} />,
    title: "Pengalaman Unik",
    description: "Temukan produk dan karya seni yang tidak dijual di tempat lain — eksklusif hanya di festival ini",
  },
  {
    icon: <Users size={36} />,
    title: "Komunitas Kreatif",
    description: "Bertemu langsung dengan kreator, seniman, dan pengusaha berbakat dari seluruh Kalimantan",
  },
];

const galleryImages = [
  "https://res.cloudinary.com/djs5pi7ev/image/upload/w_800,q_auto,f_auto/v1767765488/Bayan-8827_woaplh.jpg",
  "https://res.cloudinary.com/djs5pi7ev/image/upload/w_800,q_auto,f_auto/v1767779754/Bayan-7833_qmyabn.jpg",
  "https://res.cloudinary.com/djs5pi7ev/image/upload/w_800,q_auto,f_auto/v1767779754/Bayan-7315_my1gbe.jpg",
  "https://res.cloudinary.com/djs5pi7ev/image/upload/w_800,q_auto,f_auto/v1767779755/Bayan-935_luj3sf.jpg",
  "https://res.cloudinary.com/djs5pi7ev/image/upload/w_800,q_auto,f_auto/v1767765487/Bayan-8327_ckwhqx.jpg",
  "https://res.cloudinary.com/djs5pi7ev/image/upload/w_800,q_auto,f_auto/v1767765488/Bayan-8313_ikglap.jpg",
];

const marqueeItems = [
  "Bayan CraftArt Festival", "4–10 Agustus 2025", "BSCC Dome Balikpapan",
  "Gratis Masuk", "100+ UMKM", "50+ Karya Seni", "7 Hari Festival",
];

// ─── MAIN ────────────────────────────────────────────────────────────────
export default function BayanCraft() {
  const [loading, setLoading] = useState(true);
  const [preloaderExit, setPreloaderExit] = useState(false);
  const [progress, setProgress] = useState(0);
  const [heroVisible, setHeroVisible] = useState(false);
  const [navScrolled, setNavScrolled] = useState(false);
  const [isWhiteSection, setIsWhiteSection] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [stats, setStats] = useState({ vendors: 0, visitors: 0, artists: 0, days: 0 });
  const [statsRan, setStatsRan] = useState(false);

  const aboutRef = useRef<HTMLElement>(null);
  const zonesRef = useRef<HTMLElement>(null);

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

  // Nav + white section + stats
  useEffect(() => {
    const headerHeight = 80;
    const handleScroll = () => {
      setNavScrolled(window.scrollY > 40);

      let inWhite = false;
      if (zonesRef.current) {
        const rect = zonesRef.current.getBoundingClientRect();
        if (rect.top <= headerHeight && rect.bottom >= headerHeight) inWhite = true;
      }
      setIsWhiteSection(inWhite);

      if (aboutRef.current && !statsRan) {
        const top = aboutRef.current.getBoundingClientRect().top;
        if (top < window.innerHeight * 0.75) {
          animateStats();
          setStatsRan(true); // will be set in animateStats callback, just flag here
        }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [statsRan]);

  const animateStats = () => {
    const targets = { vendors: 150, visitors: 50000, artists: 100, days: 7 };
    const duration = 1800;
    const start = performance.now();
    const run = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      const e = 1 - Math.pow(1 - p, 3);
      setStats({
        vendors: Math.floor(targets.vendors * e),
        visitors: Math.floor(targets.visitors * e),
        artists: Math.floor(targets.artists * e),
        days: Math.floor(targets.days * e),
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

  const navClass = ['nav', navScrolled ? 'scrolled' : '', isWhiteSection ? 'white-bg' : ''].filter(Boolean).join(' ');
  const marqueeContent = [...marqueeItems, ...marqueeItems];

  return (
    <div style={{ background: '#000', color: '#fff', overflowX: 'hidden' }}>
      <style>{styles}</style>

      {/* PRELOADER */}
      {loading && (
        <div className={`preloader${preloaderExit ? ' exit' : ''}`}>
          <img
            className="preloader-logo"
            src="https://res.cloudinary.com/djs5pi7ev/image/upload/w_400,q_auto,f_auto/v1767777423/LOGO_EVENT_Bayan_2025_f8yznc.png"
            alt="Bayan CraftArt Festival 2025"
          />
          <div className="preloader-progress-wrap">
            <div className="preloader-bar-wrap">
              <div className="preloader-bar" style={{ width: `${progress}%` }} />
            </div>
            <div className="preloader-pct">{Math.round(progress)}%</div>
          </div>
          <div className="preloader-text">Bayan CraftArt Festival 2025</div>
        </div>
      )}

      {/* MOBILE MENU */}
      <div className={`mobile-menu${menuOpen ? ' open' : ''}`} aria-modal="true" role="dialog">
        <button className="mobile-menu-close" onClick={() => setMenuOpen(false)} aria-label="Tutup menu">
          <X size={28} />
        </button>
        <a href="/">Home</a>
        <a href="/bayanopen">Bayan Open</a>
        <a href="/bayanrun">Bayan Run</a>
        <a href="/bayancraft" onClick={() => setMenuOpen(false)}>Bayan Craft</a>
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
            { label: 'Bayan Run', href: '/bayanrun' },
            { label: 'Bayan Craft', href: '/bayancraft', active: true },
          ].map((l) => (
            <li key={l.label}>
              <a href={l.href} className={l.active ? 'active' : ''}>{l.label}</a>
            </li>
          ))}
        </ul>
        <button className="nav-cta" onClick={() => scrollTo('zones')}>
          <span className="dot" />
          Info Tenant
        </button>
        <button
          className="nav-hamburger"
          onClick={() => setMenuOpen(true)}
          aria-label="Buka menu"
          style={{ display: 'flex' }}
        >
          <Menu size={26} />
        </button>
      </nav>

      {/* ── HERO ── */}
      <section className="hero">
        <div className="hero-video-wrap">
          <video autoPlay muted loop playsInline preload="metadata">
            <source
              src="https://res.cloudinary.com/djs5pi7ev/video/upload/q_auto:low/v1769499141/bayancraft-hero_vqzumk.mp4"
              type="video/mp4"
            />
          </video>
          <div className="hero-overlay" />
        </div>

        <div className="hero-content">
          <div>
            <img
              className="hero-logo"
              src="https://res.cloudinary.com/djs5pi7ev/image/upload/w_400,q_auto,f_auto/v1767777423/LOGO_EVENT_Bayan_2025_f8yznc.png"
              alt="Bayan CraftArt Festival 2025"
            />
            <div className={`hero-tagline${heroVisible ? ' visible' : ''}`}>
              CELEBRATING<br />
              <span style={{ color: 'var(--orange)' }}>LOCAL</span><br />
              CREATIVITY
            </div>
          </div>

          <div className={`hero-right${heroVisible ? ' visible' : ''}`}>
            <div className="hero-pill">
              <Calendar size={16} />
              <span>4 – 10 Agustus 2025</span>
            </div>
            <div className="hero-pill">
              <MapPin size={16} />
              <span>BSCC Dome Balikpapan</span>
            </div>
            <div className="hero-pill">
              <Sparkles size={16} />
              <span>Gratis Masuk untuk Umum</span>
            </div>
            <button className="hero-cta" onClick={() => scrollTo('about')}>
              JELAJAHI FESTIVAL <ChevronRight size={14} style={{ display: 'inline', marginLeft: 6 }} />
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
              <div className="about-label">Tentang Festival</div>
              <h2 className="about-title">
                BAYAN<br />
                <span>CRAFTART</span>
              </h2>
              <p className="about-body">
                <strong>BAYAN CRAFTART FESTIVAL</strong> adalah perayaan tahunan yang mengangkat kekayaan kreativitas lokal Indonesia. Sejak 2022, festival ini telah menjadi platform terbesar di Balikpapan untuk UMKM, seniman, dan kreator lokal untuk memamerkan dan menjual karya mereka.
                <br /><br />
                Festival selama 7 hari ini menggabungkan pameran produk UMKM, seni rupa, kerajinan tangan, kuliner khas, fashion lokal, musik, dan pertunjukan budaya dalam satu tempat. Kami percaya bahwa dengan mendukung kreator lokal, kita tidak hanya membeli produk, tetapi juga berinvestasi dalam komunitas dan budaya kita.
                <br /><br />
                Dari booth UMKM yang menjual produk handmade unik hingga galeri seni yang menampilkan karya seniman berbakat, <strong>BAYAN CRAFTART FESTIVAL</strong> adalah destinasi wajib untuk pecinta seni, budaya, dan produk lokal berkualitas.
              </p>
            </div>
            <div>
              <div className="stats-grid">
                {[
                  { n: `${stats.vendors}+`, l: 'Tenant UMKM' },
                  { n: `${stats.visitors.toLocaleString()}+`, l: 'Pengunjung' },
                  { n: `${stats.artists}+`, l: 'Seniman' },
                  { n: `${stats.days}`, l: 'Hari Festival' },
                ].map((s) => (
                  <div key={s.l} className="stat-cell">
                    <span className="stat-number">{s.n}</span>
                    <span className="stat-label">{s.l}</span>
                  </div>
                ))}
              </div>
              <div className="benefits-grid">
                {benefits.map((b, i) => (
                  <div key={i} className="benefit-card">
                    <div className="benefit-icon">{b.icon}</div>
                    <h3 className="benefit-title">{b.title}</h3>
                    <p className="benefit-desc">{b.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── ZONES ── */}
      <section id="zones" className="zones" ref={zonesRef as React.RefObject<HTMLElement>}>
        <div className="container">
          <div className="section-label dark">Zona Festival</div>
          <h2 className="section-title">
            FESTIVAL <span>ZONES</span>
          </h2>
        </div>

        <div className="zones-grid" style={{ maxWidth: 1280, margin: '0 auto 3px' }}>
          {zones.map((zone, i) => (
            <div key={i} className={`zone-card ${zone.accent}`}>
              <span className="zone-number">{zone.num}</span>
              <div className="zone-icon">{zone.icon}</div>
              <h3 className="zone-title">{zone.title}</h3>
              <p className="zone-desc">{zone.description}</p>
              <div className="zone-highlights">
                {zone.highlights.map((h, j) => (
                  <div key={j} className="zone-highlight">
                    <span className="zone-dot" />
                    {h}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="free-entry-banner" style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div className="free-entry-label">GRATIS<br />MASUK 🎉</div>
          <p className="free-entry-body">
            Nikmati seluruh zona festival tanpa biaya masuk. Ajak keluarga dan teman untuk merasakan pengalaman berbelanja, menikmati seni, dan hiburan yang <strong>tak terlupakan</strong> — bebas biaya untuk semua pengunjung umum.
          </p>
        </div>
      </section>

      {/* ── GALLERY ── */}
      <section id="gallery" className="gallery">
        <div className="container" style={{ marginBottom: 48 }}>
          <div className="section-label muted">Dokumentasi</div>
          <h2 className="section-title white">
            FESTIVAL <span>GALLERY</span>
          </h2>
        </div>

        <div className="gallery-grid" style={{ maxWidth: 1280, margin: '0 auto 3px' }}>
          {galleryImages.map((img, i) => (
            <div key={i} className="gallery-item">
              <img src={img} alt={`Gallery ${i + 1}`} loading="lazy" />
              <div className="gallery-item-label">
                <p>Festival Moment {i + 1}</p>
                <span>Bayan CraftArt Festival 2024</span>
              </div>
            </div>
          ))}
        </div>

        {/* Scroll strip */}
        <div className="scroll-strip">
          <div className="scroll-track">
            {[...galleryImages, ...galleryImages].map((img, i) => (
              <div key={i} className="scroll-img">
                <img src={img} alt={`Scroll ${i + 1}`} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SCHEDULE ── */}
      <section id="schedule" className="schedule-section">
        <div className="schedule-video-wrap">
          <video autoPlay muted loop playsInline preload="metadata">
            <source
              src="https://res.cloudinary.com/djs5pi7ev/video/upload/q_auto:low/v1769499086/bayancraft-jadwal_mxnsu1.mp4"
              type="video/mp4"
            />
          </video>
          <div className="schedule-overlay" />
        </div>

        <div className="container" style={{ position: 'relative', zIndex: 10 }}>
          <div className="section-label muted">Program</div>
          <h2 className="section-title white" style={{ marginBottom: 64 }}>
            JADWAL <span>FESTIVAL</span>
          </h2>
        </div>

        <div
          className="schedule-grid"
          style={{ maxWidth: 1280, margin: '0 auto', position: 'relative', zIndex: 10 }}
        >
          {schedule.map((day, i) => (
            <div key={i} className="schedule-card">
              <div className="schedule-card-label">{day.day}</div>
              <h3 className="schedule-card-title">{day.title}</h3>
              <div className="schedule-activities">
                {day.activities.map((act, j) => (
                  <div key={j} className="schedule-activity">
                    <span className="schedule-activity-dot" />
                    {act}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div
          className="schedule-hours"
          style={{ maxWidth: 1280, margin: '3px auto 0', position: 'relative', zIndex: 10 }}
        >
          <p>Jam Operasional: 10.00 – 22.00 WITA setiap hari</p>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="cta-section">
        <h2 className="cta-title">
          JANGAN LEWATKAN<br />
          <span>FESTIVAL INI!</span>
        </h2>
        <p className="cta-body">
          Bergabunglah dengan ribuan pengunjung lainnya dan dukung kreativitas lokal Indonesia!
        </p>
        <div className="cta-buttons">
          <button className="btn-primary">INFORMASI TENANT</button>
          <button className="btn-secondary">CONTACT PANITIA</button>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="footer">
        <div className="container">
          <div className="footer-grid">
            <div>
              <div className="footer-logo">
                <img
                  src="https://res.cloudinary.com/djs5pi7ev/image/upload/v1769476664/bayan-thenext-white-nobg_qis407.png"
                  alt="BAYAN SC"
                />
              </div>
              <p className="footer-tagline">
                Menghadirkan event yang dikelola Bayan Group sejak 2022.
              </p>
              <div className="footer-social">
                <button className="footer-social-icon"><Instagram size={18} /></button>
                <button className="footer-social-icon"><Linkedin size={18} /></button>
                <button className="footer-social-icon"><Mail size={18} /></button>
              </div>
            </div>
            <div>
              <div className="footer-heading">Quick Links</div>
              <ul className="footer-links">
                <li><a href="/">Home</a></li>
                <li><a href="/bayanopen">Bayan Open</a></li>
                <li><a href="/bayanrun">Bayan Run</a></li>
                <li><a href="/bayancraft">Bayan Craft</a></li>
              </ul>
            </div>
            <div>
              <div className="footer-heading">Contact</div>
              <ul className="footer-links">
                <li><a href="#">bayanopen@gmail.com</a></li>
                <li><a href="#">+62 8215 4815 113</a></li>
                <li><a href="#">Balikpapan, Kalimantan Timur</a></li>
              </ul>
            </div>
            <div>
              <div className="footer-heading">Festival</div>
              <ul className="footer-links">
                <li><a href="#about">Tentang Festival</a></li>
                <li><a href="#zones">Festival Zones</a></li>
                <li><a href="#gallery">Gallery</a></li>
                <li><a href="#schedule">Jadwal</a></li>
              </ul>
            </div>
          </div>

          <div className="footer-bottom">
            <div>© 2025 PT BAYAN RESOURCES TBK. All rights reserved.</div>
            <div>Bayan CraftArt Festival 2025</div>
          </div>
        </div>
      </footer>
    </div>
  );
}