import { motion } from "motion/react";
import React, { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { logoImages, ImageItem } from "../content";

const STORAGE_KEY = "logo-gallery-visible-count";
const SCROLL_KEY = "logo-gallery-scroll-y";

const getBaseVisibleCount = () => {
  if (typeof window === "undefined") return 12;
  return window.innerWidth >= 1024 ? 20 : 12;
};

const getInitialVisibleCount = (max: number) => {
  if (typeof window === "undefined") return Math.min(12, max);
  const saved = Number(sessionStorage.getItem(STORAGE_KEY));
  const fallback = getBaseVisibleCount();
  if (Number.isFinite(saved) && saved > 0) {
    return Math.min(Math.max(saved, fallback), max);
  }
  return Math.min(fallback, max);
};

const LogoCard: React.FC<{ image: ImageItem; index: number }> = ({ image, index }) => {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <motion.div
      ref={ref}
      className="relative w-full aspect-square flex items-center justify-center group cursor-pointer overflow-hidden"
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true, margin: "200px" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      whileHover={{ scale: 1.05, zIndex: 20 }}
    >
      <img
        src={image.src}
        alt={image.alt}
        loading={index < 10 ? "eager" : "lazy"}
        fetchPriority={index < 10 ? "high" : "auto"}
        decoding="async"
        className="w-full h-full object-contain transition-all duration-500"
        referrerPolicy="no-referrer"
      />

      <div className="absolute bottom-4 right-4 font-mono text-[10px] text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity">
        ID_{String(image.id).padStart(2, "0")}
      </div>
    </motion.div>
  );
};

export default function LogoGallery() {
  const images = logoImages;
  const [visibleCount, setVisibleCount] = useState(() => getInitialVisibleCount(images.length));
  const loaderRef = useRef<HTMLDivElement>(null);
  const restoredScrollRef = useRef(false);

  useEffect(() => {
    const nextValue = Math.min(visibleCount, images.length);
    sessionStorage.setItem(STORAGE_KEY, String(nextValue));
  }, [visibleCount, images.length]);

  useEffect(() => {
    const handleResize = () => {
      const minVisible = getBaseVisibleCount();
      setVisibleCount((prev) => Math.min(Math.max(prev, minVisible), images.length));
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [images.length]);

  useEffect(() => {
    const saveScroll = () => {
      sessionStorage.setItem(SCROLL_KEY, String(window.scrollY));
    };

    window.addEventListener("scroll", saveScroll, { passive: true });
    return () => {
      saveScroll();
      window.removeEventListener("scroll", saveScroll);
    };
  }, []);

  useEffect(() => {
    if (restoredScrollRef.current) return;
    const savedScroll = Number(sessionStorage.getItem(SCROLL_KEY));
    if (Number.isFinite(savedScroll) && savedScroll > 0) {
      requestAnimationFrame(() => {
        window.scrollTo({ top: savedScroll, behavior: "auto" });
      });
    }
    restoredScrollRef.current = true;
  }, []);

  const handleLoadMore = () => {
    setVisibleCount((prev) => Math.min(prev + 12, images.length));
  };

  useEffect(() => {
    const node = loaderRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting && visibleCount < images.length) {
          handleLoadMore();
        }
      },
      { threshold: 0.1, rootMargin: "200px" }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [visibleCount, images.length]);

  return (
    <section className="relative w-full min-h-screen bg-white overflow-hidden flex flex-col">
      <div className="w-full px-4 pt-8 md:px-12 md:pt-12 flex justify-between items-center">
        <Link to="/" className="inline-flex items-center gap-2 text-gray-400 hover:text-black transition-colors group">
          <ArrowLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
          <span className="font-mono text-[10px] uppercase tracking-widest">Back to Index</span>
        </Link>
      </div>

      <div className="flex-1 w-full px-4 py-8 md:px-12 md:py-16">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-8">
          {images.slice(0, visibleCount).map((image, i) => (
            <LogoCard key={image.id} image={image} index={i} />
          ))}
        </div>

        <div ref={loaderRef} className="w-full h-20 flex justify-center items-center mt-8">
          {visibleCount < images.length && (
            <div className="w-6 h-6 border-2 border-gray-100 border-t-gray-400 rounded-full animate-spin" />
          )}
        </div>
      </div>

      <footer className="w-full px-4 py-8 md:px-12 border-t border-gray-50 flex justify-between items-center text-[10px] font-mono text-gray-400 uppercase tracking-widest">
        <span>© {new Date().getFullYear()} Plan.D Studio</span>
        <span>Total {images.length} Marks</span>
      </footer>
    </section>
  );
}
