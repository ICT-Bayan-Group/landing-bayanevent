import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

interface HeaderProps {
  isWhiteSection: boolean;
  currentPage?: 'home' | 'bayanrun' | 'bayanopen' | 'bayancraft';
}

export default function Header({ isWhiteSection, currentPage = 'home' }: HeaderProps) {
  const headerRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const menuItemsRef = useRef<(HTMLAnchorElement | HTMLButtonElement | null)[]>([]);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    // Initial animation
    const timer = setTimeout(() => {
      if (headerRef.current) {
        headerRef.current.style.opacity = '1';
        headerRef.current.style.transform = 'translateY(0)';
      }
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      // Animate menu opening
      gsap.fromTo(
        mobileMenuRef.current,
        { x: '100%' },
        { 
          x: '0%', 
          duration: 0.5, 
          ease: 'power3.out'
        }
      );

      // Stagger animation for menu items
      gsap.fromTo(
        menuItemsRef.current,
        { 
          x: 50, 
          opacity: 0 
        },
        { 
          x: 0, 
          opacity: 1, 
          duration: 0.4,
          stagger: 0.1,
          ease: 'power2.out',
          delay: 0.2
        }
      );
    } else if (mobileMenuRef.current) {
      // Animate menu closing
      gsap.to(mobileMenuRef.current, {
        x: '100%',
        duration: 0.4,
        ease: 'power3.in'
      });
    }
  }, [isMobileMenuOpen]);

  // Close menu on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isMobileMenuOpen]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  const smoothScrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const headerHeight = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerHeight;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  const handleNavClick = (action?: () => void) => {
    if (action) {
      action();
    } else {
      setIsMobileMenuOpen(false);
    }
  };

  const navItems = [
    { label: 'ABOUT', href: '/', action: currentPage === 'home' ? () => smoothScrollTo('about') : undefined },
    { label: 'BAYAN RUN', href: '/bayanrun' },
    { label: 'BAYAN OPEN', href: '/bayanopen' },
    { label: 'BAYAN CRAFT', href: '/bayancraft' },
    { label: 'CONTACT', href: '/', action: currentPage === 'home' ? () => smoothScrollTo('footer') : undefined }
  ];

  return (
    <>
      <header 
        ref={headerRef}
        className="fixed top-0 left-0 right-0 z-50 opacity-0 translate-y-[-20px] transition-all duration-1000"
      >
        <div className="px-6 py-4 md:px-10 md:py-6 flex justify-between items-center">
          <a href="/" className="block h-8 w-32 md:h-12 md:w-56 relative z-50">
            <img
              src={isWhiteSection 
                ? "https://res.cloudinary.com/djs5pi7ev/image/upload/v1769476663/bayan-thenextlevel-black-nobg_jcttwa.png" 
                : "https://res.cloudinary.com/djs5pi7ev/image/upload/v1769476664/bayan-thenext-white-nobg_qis407.png"
              }
              alt="BAYAN SC"
              className="h-full w-full object-contain transition-all duration-500 ease-in-out"
              loading="eager"
            />
          </a>

          {/* Desktop Navigation */}
          <nav className={`hidden md:flex gap-8 text-sm font-semibold tracking-wider transition-colors duration-500 ${isWhiteSection ? 'text-blue-900' : 'text-white'}`}>
            {navItems.map((item) => (
              item.action ? (
                <button
                  key={item.label}
                  onClick={item.action}
                  className={`transition-colors ${isWhiteSection ? 'hover:text-orange-600' : 'hover:text-orange-500'}`}
                >
                  {item.label}
                </button>
              ) : (
                <a
                  key={item.label}
                  href={item.href}
                  className={`transition-colors ${isWhiteSection ? 'hover:text-orange-600' : 'hover:text-orange-500'}`}
                >
                  {item.label}
                </a>
              )
            ))}
          </nav>

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden relative z-50 w-8 h-8 flex flex-col justify-center items-center gap-1.5"
            aria-label="Toggle menu"
          >
            <span 
              className={`block w-6 h-0.5 transition-all duration-300 ${
                isMobileMenuOpen ? 'rotate-45 translate-y-2 bg-white' : isWhiteSection ? 'bg-blue-900' : 'bg-white'
              }`}
            />
            <span 
              className={`block w-6 h-0.5 transition-all duration-300 ${
                isMobileMenuOpen ? 'opacity-0' : 'opacity-100'
              } ${isWhiteSection ? 'bg-blue-900' : 'bg-white'}`}
            />
            <span 
              className={`block w-6 h-0.5 transition-all duration-300 ${
                isMobileMenuOpen ? '-rotate-45 -translate-y-2 bg-white' : isWhiteSection ? 'bg-blue-900' : 'bg-white'
              }`}
            />
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Mobile Menu */}
      <div
        ref={mobileMenuRef}
        className="fixed top-0 right-0 bottom-0 w-[80%] max-w-sm bg-gradient-to-br from-blue-900 to-blue-950 z-40 md:hidden translate-x-full"
      >
        <nav className="flex flex-col pt-24 px-8 gap-1">
          {navItems.map((item, index) => (
            item.action ? (
              <button
                key={item.label}
                ref={(el) => (menuItemsRef.current[index] = el)}
                onClick={() => handleNavClick(item.action)}
                className="text-left text-white text-xl font-semibold py-4 border-b border-white/10 hover:text-orange-500 transition-colors"
              >
                {item.label}
              </button>
            ) : (
              <a
                key={item.label}
                ref={(el) => (menuItemsRef.current[index] = el)}
                href={item.href}
                onClick={() => handleNavClick()}
                className="text-white text-xl font-semibold py-4 border-b border-white/10 hover:text-orange-500 transition-colors"
              >
                {item.label}
              </a>
            )
          ))}
        </nav>

        {/* Decorative element */}
        <div className="absolute bottom-8 left-8 right-8">
          <a href="/" className="block h-8 w-32 md:h-12 md:w-56 relative z-50">
            <img
              src={isWhiteSection 
                ? "https://res.cloudinary.com/djs5pi7ev/image/upload/v1769476663/bayan-thenextlevel-black-nobg_jcttwa.png" 
                : "https://res.cloudinary.com/djs5pi7ev/image/upload/v1769476664/bayan-thenext-white-nobg_qis407.png"
              }
              alt="BAYAN SC"
              className="h-full w-full object-contain transition-all duration-500 ease-in-out"
              loading="eager"
            />
          </a>
        </div>
      </div>
    </>
  );
}