import { useEffect, useRef } from 'react';

interface HeaderProps {
  isWhiteSection: boolean;
  currentPage?: 'home' | 'bayanrun' | 'bayanopen' | 'bayancraft';
}

export default function Header({ isWhiteSection, currentPage = 'home' }: HeaderProps) {
  const headerRef = useRef<HTMLDivElement>(null);

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

  const smoothScrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const headerHeight = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerHeight;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
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
    <header 
      ref={headerRef}
      className="fixed top-0 left-0 right-0 z-50 opacity-0 translate-y-[-20px] transition-all duration-1000"
    >
      <div className="px-6 py-4 md:px-10 md:py-6 flex justify-between items-center">
        <a href="/">
          <img
            src={isWhiteSection 
              ? "https://res.cloudinary.com/djs5pi7ev/image/upload/w_300,q_auto,f_auto/v1767765491/LOGO_TEMA_belakang_jkkrtc.png" 
              : "https://res.cloudinary.com/djs5pi7ev/image/upload/w_300,q_auto,f_auto/v1767765525/Bayan_The_Next_Level_e77j8d.png"
            }
            alt="BAYAN SC"
            className="h-8 md:h-20 object-contain transition-all duration-500 ease-in-out"
            loading="eager"
          />
        </a>
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
      </div>
    </header>
  );
}