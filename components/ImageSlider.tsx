"use client";
import { gsap } from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";

const ImageSlider = () => {
  const sliderRef = useRef<HTMLDivElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Sample gallery images - replace with actual Bayan Run event photos
  const galleryImages = [
    {
      src: "https://res.cloudinary.com/djs5pi7ev/image/upload/w_900,q_auto,f_auto/v1767765525/20251012064855_-_BOM_0690_f1v4kw.jpg",
      alt: "Bayan Run 2025 - Start Line",
      caption: "Semangat di Garis Start"
    },
    {
      src: "https://res.cloudinary.com/djs5pi7ev/image/upload/w_900,q_auto,f_auto/v1767765516/DJI_20251012054325_0006_D_p3yx0k.jpg",
      alt: "Bayan Run 2025 - Runners",
      caption: "Ribuan Pelari Berpartisipasi"
    },
    {
      src: "https://res.cloudinary.com/djs5pi7ev/image/upload/w_900,q_auto,f_auto/v1767765516/20251012060936_-_BOM_7023_uzwd7f.jpg",
      alt: "Bayan Run 2025 - Marathon",
      caption: "Half Marathon 21K"
    },
    {
      src: "https://res.cloudinary.com/djs5pi7ev/image/upload/w_900,q_auto,f_auto/v1767765513/20251012061749_-_BOM_0335_tssmcb.jpg",
      alt: "Bayan Run 2025 - Finish Line",
      caption: "Kebahagiaan di Garis Finish"
    },
    {
      src: "https://res.cloudinary.com/djs5pi7ev/image/upload/w_900,q_auto,f_auto/v1767765521/20251012070224_-_BOM_8032_1_y0hgur.jpg",
      alt: "Bayan Run 2025 - Pembagiian Medali",
      caption: "Finisher Medal untuk Para Pemenang"
    },
    {
      src: "https://res.cloudinary.com/djs5pi7ev/image/upload/w_900,q_auto,f_auto/v1767765534/20251012084610_-_BOM_1161_wwk1pf.jpg",
      alt: "Bayan Run 2025 - Community",
      caption: "Komunitas Lari Balikpapan"
    },
    {
      src: "https://res.cloudinary.com/djs5pi7ev/image/upload/w_900,q_auto,f_auto/v1767765537/20251012065145_-_BOM_0769_xlklog.jpg",
      alt: "Bayan Run 2025 - Awards",
      caption: "Penyerahan Penghargaan"
    },
    {
      src: "https://res.cloudinary.com/djs5pi7ev/image/upload/w_900,q_auto,f_auto/v1767765525/AR__4961_njqhws.jpg",
      alt: "Bayan Run 2025 - Team",
      caption: "Semangat Tim"
    }
  ];

  useEffect(() => {
    if (!sliderRef.current || !containerRef.current) return;
    
    gsap.registerPlugin(ScrollTrigger);

    const slider = sliderRef.current;
    const container = containerRef.current;

    // Calculate the scroll distance
    const scrollWidth = slider.scrollWidth - container.clientWidth;

    // Horizontal scroll animation
    const scrollTween = gsap.to(slider, {
      x: -scrollWidth,
      ease: "none",
      scrollTrigger: {
        trigger: container,
        start: "top top",
        end: () => `+=${scrollWidth}`,
        scrub: 1,
        pin: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      },
    });

    // Parallax effect on images
    gsap.utils.toArray<HTMLElement>(".gallery-image").forEach((img, index) => {
      gsap.from(img, {
        scale: 0.9,
        opacity: 0.5,
        scrollTrigger: {
          trigger: img,
          containerAnimation: scrollTween,
          start: "left right",
          end: "center center",
          scrub: true,
        },
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div ref={containerRef} className="mt-16 overflow-hidden">
      <div ref={sliderRef} className="flex gap-8 w-max">
        {galleryImages.map((image, index) => (
          <div
            key={index}
            className="gallery-image relative group cursor-pointer"
            style={{ width: "500px", height: "600px" }}
          >
            <div className="relative w-full h-full overflow-hidden rounded-2xl shadow-2xl">
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              {/* Caption */}
              <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                <p className="text-white text-xl font-bold">{image.caption}</p>
                <p className="text-white/70 text-sm mt-2">Bayan Run 2025</p>
              </div>
            </div>

            {/* Image number badge */}
            <div className="absolute top-4 left-4 bg-orange-600 text-white w-12 h-12 rounded-full flex items-center justify-center font-black text-lg shadow-lg">
              {String(index + 1).padStart(2, '0')}
            </div>
          </div>
        ))}
      </div>

      {/* Scroll indicator 
      <div className="mt-10 flex items-center justify-center gap-3 text-white/60">
        <div className="w-8 h-[2px] bg-orange-600" />
        <span className="text-sm font-semibold uppercase tracking-wider">Scroll untuk melihat lebih banyak</span>
        <div className="w-8 h-[2px] bg-orange-600" />
      </div>*/}
    </div>
  );
};

export default ImageSlider;