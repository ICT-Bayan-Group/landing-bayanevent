"use client";
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export default function VideoSection() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const textContainerRef = useRef<HTMLDivElement>(null);
  const topTextRef = useRef<HTMLDivElement>(null);
  const bottomTextRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Auto play video
    if (videoRef.current) {
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

  return (
    <>
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
        >
          <source
            src="https://res.cloudinary.com/djs5pi7ev/video/upload/v1769500972/202601271004_aepgij.mp4"
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>
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