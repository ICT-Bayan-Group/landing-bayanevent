import { useEffect, useRef, useState } from 'react';

interface PreloaderProps {
  logoSrc: string;
  logoAlt: string;
  onComplete: () => void;
}

export default function Preloader({ logoSrc, logoAlt, onComplete }: PreloaderProps) {
  const [loadingProgress, setLoadingProgress] = useState(0);
  const preloaderRef = useRef<HTMLDivElement>(null);
  const preloaderLogoRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const runPreloader = async () => {
      // Simulate loading progress
      const progressInterval = setInterval(() => {
        setLoadingProgress(prev => {
          if (prev >= 100) {
            clearInterval(progressInterval);
            return 100;
          }
          return prev + Math.random() * 10;
        });
      }, 100);

      // Wait for minimum loading time
      await new Promise(resolve => setTimeout(resolve, 2500));
      
      clearInterval(progressInterval);
      setLoadingProgress(100);

      // Wait a bit at 100%
      await new Promise(resolve => setTimeout(resolve, 300));

      // Logo scale and fade animation
      if (preloaderLogoRef.current) {
        preloaderLogoRef.current.style.transform = 'scale(0.8)';
        preloaderLogoRef.current.style.opacity = '0';
      }

      await new Promise(resolve => setTimeout(resolve, 400));

      // Preloader slide up
      if (preloaderRef.current) {
        preloaderRef.current.style.transform = 'translateY(-100%)';
      }

      await new Promise(resolve => setTimeout(resolve, 600));
      onComplete();
    };

    runPreloader();
  }, [onComplete]);

  return (
    <div 
      ref={preloaderRef}
      className="fixed inset-0 z-[9999] bg-white flex flex-col items-center justify-center transition-transform duration-700 ease-in-out"
    >
      <div className="relative">
        <img
          ref={preloaderLogoRef}
          src={logoSrc}
          alt={logoAlt}
          className="w-48 md:w-64 h-auto object-contain transition-all duration-500 ease-out"
          style={{ filter: 'drop-shadow(0 10px 30px rgba(0,0,0,0.3))' }}
        />
        
        {/* Pulsing effect behind logo */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
        </div>
      </div>

      {/* Loading bar */}
      <div className="mt-12 w-64 md:w-80">
        <div className="h-1 bg-white/20 rounded-full overflow-hidden backdrop-blur-sm">
          <div 
            className="h-full bg-gradient-to-r from-blue-500 to-blue-600 transition-all duration-300 ease-out shadow-lg shadow-blue-500/50"
            style={{ width: `${loadingProgress}%` }}
          ></div>
        </div>
        <div className="text-center mt-4 text-black/80 text-sm font-semibold tracking-wider">
          {Math.round(loadingProgress)}%
        </div>
      </div>

      {/* Loading text */}
      <div className="mt-8 text-black/60 text-xs md:text-sm font-semibold tracking-[0.3em] uppercase animate-pulse">
        THE NEXT LEVEL
      </div>
    </div>
  );
}