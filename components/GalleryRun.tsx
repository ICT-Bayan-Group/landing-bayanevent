"use client";
import { gsap } from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";
import ImageSlider from "./ImageSlider";

const GallerySection = () => {
  const galleryText = `Perjalanan kami dimulai dari semangat untuk menyatukan komunitas melalui olahraga lari. Dari tahun ke tahun, Bayan Run terus berkembang menjadi ajang bergengsi yang mempertemukan ribuan pelari dari berbagai latar belakang.`;
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    gsap.registerPlugin(ScrollTrigger);

    // Animate the title
    gsap.from(".gallery-title span", {
      y: "100%",
      duration: 0.6,
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 50%",
        end: "bottom 20%",
        toggleActions: "play reverse play reverse",
      },
    });

    // Animate the description (word by word)
    gsap.from(".gallery-bio p span", {
      y: "100%",
      duration: 0.6,
      stagger: 0.02,
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 35%",
        toggleActions: "play reverse play reverse",
      },
    });
  }, []);

  return (
    <div ref={containerRef} className="min-h-screen px-6 md:px-10 py-20 bg-gradient-to-br from-blue-950 to-blue-900">
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <h2 className="text-3xl lg:text-5xl max-w-[950px] mt-10 text-white">
          <span className="inline-block text-xl lg:text-2xl font-bold -translate-y-5 mr-20 lg:mr-[400px] overflow-hidden gallery-title text-orange-500">
            <span className="block uppercase tracking-wider font-bold">Galeri Kami</span>
          </span>
          <span className="gallery-bio">
            {galleryText.split(" ").map((word, idx) => (
              <p key={idx} className="inline-block mr-2 overflow-hidden">
                <span className="block text-white/90 font-medium leading-relaxed">
                  {word}
                </span>
              </p>
            ))}
          </span>
        </h2>

        {/* Image Slider */}
        <ImageSlider />
      </div>
    </div>
  );
};

export default GallerySection;