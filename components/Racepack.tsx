"use client";
import { useRef, useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";

const racePackItems = [
  {
    src: "https://bayanrun.com/assets/images/bib.png",
    alt: "Race Bib"
  },
  {
    src: "https://bayanrun.com/assets/images/convertible-jacket-bag.png",
    alt: "Convertible Jacket Bag"
  },
  {
    src: "https://bayanrun.com/assets/images/finisher-medal.png",
    alt: "Finisher Medal"
  },
  {
    src: "https://bayanrun.com/assets/images/foldable-bottle.png",
    alt: "Foldable Bottle"
  },
  {
    src: "https://bayanrun.com/assets/images/running-belt.png",
    alt: "Running Belt"
  },
  {
    src: "https://bayanrun.com/assets/images/running-cap.png",
    alt: "Running Cap"
  },
  {
    src: "https://bayanrun.com/assets/images/running-jersey.png",
    alt: "Running Jersey"
  },
  {
    src: "https://bayanrun.com/assets/images/bib-pin.png",
    alt: "Bib Pin"
  }
];

const RacePackCarousel: React.FC = () => {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const track = trackRef.current;
      if (!track) return;

      const totalWidth = track.scrollWidth / 2;

      gsap.to(track, {
        x: -totalWidth,
        duration: 40,
        ease: "linear",
        repeat: -1,
        modifiers: {
          x: gsap.utils.unitize((x) => parseFloat(x) % totalWidth),
        },
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    // 🔴 MASALAH 1: TIDAK ADA overflow-hidden pada section
    // 🔴 MASALAH 2: w-full tidak cukup, butuh max-w-full dan overflow-x-hidden
    <section 
      id="racepack" 
      className="relative overflow-hidden w-full max-w-full py-12 md:py-16 lg:py-20 bg-white"
    >
      {/* Container untuk membatasi width header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-10">
        <div className="text-center pb-8 md:pb-12">
          <h2 className="text-3xl md:text-5xl lg:text-6xl text-blue-900 font-black tracking-wider uppercase">
            RACEPACK <span className="text-orange-600">ITEMS</span>
          </h2>
          <p className="text-blue-900/70 text-base md:text-lg mt-4 font-semibold">
            Dapatkan race pack premium untuk pengalaman lari yang tak terlupakan
          </p>
        </div>
      </div>

      {/* 🔴 MASALAH 3: Track infinite scroll HARUS dibungkus container dengan overflow-hidden */}
      <div className="relative w-full overflow-hidden">
        <div ref={trackRef} className="flex w-max gap-8 md:gap-12 lg:gap-16">
          {[...racePackItems, ...racePackItems].map((item, index) => (
            <div
              key={index}
              className="flex-shrink-0 hover:scale-110 transition-transform duration-300"
            >
              <div className="relative w-[200px] h-[200px] md:w-[250px] md:h-[250px] lg:w-[300px] lg:h-[300px]">
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  className="object-contain drop-shadow-xl"
                  sizes="(max-width: 768px) 200px, (max-width: 1024px) 250px, 300px"
                />
              </div>
            </div>
          ))}
        </div>

        {/* Decorative gradient overlay at edges - PERBAIKAN: Pastikan tidak keluar dari section */}
        <div className="absolute left-0 top-0 bottom-0 w-24 sm:w-32 bg-gradient-to-r from-white to-transparent pointer-events-none z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-24 sm:w-32 bg-gradient-to-l from-white to-transparent pointer-events-none z-10" />
      </div>
    </section>
  );
};

export default RacePackCarousel;