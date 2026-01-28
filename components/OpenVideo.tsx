"use client";
import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

export default function VideoSection() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const textContainerRef = useRef<HTMLDivElement>(null);
  const topTextRef = useRef<HTMLDivElement>(null);
  const bottomTextRef = useRef<HTMLDivElement>(null);
  const [isMuted, setIsMuted] = useState(true);

  useEffect(() => {
    // Auto play video dengan volume siap
    if (videoRef.current) {
      // Set volume maksimal dari awal
      videoRef.current.volume = 1.0;
      
      // Play video
      videoRef.current.play().catch(err => {
        console.log("Autoplay prevented:", err);
      });
    }

    // GSAP Animation for text - Seamless infinite loop
    const topText = topTextRef.current;
    const bottomText = bottomTextRef.current;

    if (topText && bottomText) {
      // Top text: kiri ke kanan (from -50% to 0%)
      gsap.fromTo(topText, 
        { x: '-50%' },
        {
          x: '0%',
          duration: 20,
          ease: 'none',
          repeat: -1,
        }
      );

      // Bottom text: kanan ke kiri (from 0% to -50%)
      gsap.fromTo(bottomText,
        { x: '0%' },
        {
          x: '-50%',
          duration: 20,
          ease: 'none',
          repeat: -1,
        }
      );
    }

    return () => {
      gsap.killTweensOf([topTextRef.current, bottomTextRef.current]);
    };
  }, []);

  const toggleMute = () => {
    if (videoRef.current) {
      const newMutedState = !isMuted;
      
      // Langsung set muted state
      videoRef.current.muted = newMutedState;
      
      // Pastikan volume maksimal saat unmute
      if (!newMutedState) {
        videoRef.current.volume = 1.0;
        
        // Force play untuk memastikan audio aktif
        videoRef.current.play().catch(err => {
          console.log("Play error:", err);
        });
      }
      
      setIsMuted(newMutedState);
    }
  };

  return (
    <>
      <style jsx>{`
        @keyframes soundWave1 {
          0%, 100% { height: 0.5rem; }
          50% { height: 1.5rem; }
        }
        @keyframes soundWave2 {
          0%, 100% { height: 1rem; }
          50% { height: 2rem; }
        }
        @keyframes soundWave3 {
          0%, 100% { height: 1.5rem; }
          50% { height: 2.5rem; }
        }
        @keyframes soundWave4 {
          0%, 100% { height: 1rem; }
          50% { height: 1.75rem; }
        }
        
        .sound-bar-1 {
          animation: soundWave1 0.6s ease-in-out infinite;
        }
        .sound-bar-2 {
          animation: soundWave2 0.7s ease-in-out infinite;
          animation-delay: 0.1s;
        }
        .sound-bar-3 {
          animation: soundWave3 0.8s ease-in-out infinite;
          animation-delay: 0.2s;
        }
        .sound-bar-4 {
          animation: soundWave4 0.65s ease-in-out infinite;
          animation-delay: 0.3s;
        }
      `}</style>

      {/* Video Section */}
      <section className="relative w-full h-screen overflow-hidden">
        {/* Background Video */}
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover"
          loop
          muted
          playsInline
          autoPlay
          preload="auto"
        >
          <source
            src="https://res.cloudinary.com/djs5pi7ev/video/upload/v1769500972/202601271004_aepgij.mp4"
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>

        {/* Audio Toggle Button - Icon garis-garis vertikal animasi */}
        <button
          onClick={toggleMute}
          className="absolute bottom-8 right-8  text-amber-600 p-4 rounded-lg shadow-2xl transition-all duration-200 z-10 hover:scale-110 active:scale-95"
          aria-label={isMuted ? "Unmute video" : "Mute video"}
        >
          <div className="flex items-end justify-center gap-1 h-8 w-8">
            {isMuted ? (
              // Muted - garis pendek semua (mati)
              <>
                <div className="w-1 h-2 bg-gray-400 rounded-full"></div>
                <div className="w-1 h-2 bg-gray-400 rounded-full"></div>
                <div className="w-1 h-2 bg-gray-400 rounded-full"></div>
                <div className="w-1 h-2 bg-gray-400 rounded-full"></div>
              </>
            ) : (
              // Unmuted - garis dengan animasi naik turun
              <>
                <div className="w-1 bg-amber-600 rounded-full sound-bar-1"></div>
                <div className="w-1 bg-amber-600 rounded-full sound-bar-2"></div>
                <div className="w-1 bg-amber-600 rounded-full sound-bar-3"></div>
                <div className="w-1 bg-amber-600 rounded-full sound-bar-4"></div>
              </>
            )}
          </div>
        </button>
      </section>

      {/* Animated Text Section - Separate from Video */}
      <section ref={textContainerRef} className="relative w-full overflow-hidden">
        {/* Top Text - White Background, Blue Text - KIRI KE KANAN */}
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
                <span className="text-3xl md:text-5xl lg:text-7xl font-black text-red-600 tracking-tight uppercase mx-8">
                  KEEP MOVING KEEP STRONG
                </span>
                <span className="text-3xl md:text-5xl lg:text-7xl font-black text-red-900 mx-4">•</span>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Text - Blue Background, White Text - KANAN KE KIRI */}
        <div className="relative bg-blue-900 py-6 md:py-8 overflow-hidden">
          <div
            ref={bottomTextRef}
            className="flex whitespace-nowrap"
            style={{ width: '200%' }}
          >
            {/* Duplicate text for seamless loop - 4 repetitions to ensure no gaps */}
            {[...Array(4)].map((_, index) => (
              <div key={index} className="flex items-center flex-shrink-0">
                <span className="text-3xl md:text-5xl lg:text-7xl font-black text-red-600 tracking-tight uppercase mx-8">
                  THE NEXT LEVEL
                </span>
                <span className="text-3xl md:text-5xl lg:text-7xl font-black text-white mx-4">•</span>
                <span className="text-3xl md:text-5xl lg:text-7xl font-black text-white tracking-tight uppercase mx-8">
                  KEEP MOVING KEEP STRONG
                </span>
                <span className="text-3xl md:text-5xl lg:text-7xl font-black text-white mx-4">•</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}