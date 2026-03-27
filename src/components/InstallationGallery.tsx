import { motion } from "motion/react";
import React, { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { installationProjects, ProjectItem } from "../content";

const STORAGE_KEY = "installation-gallery-visible-count";
const SCROLL_KEY = "installation-gallery-scroll-y";

const getBaseVisibleCount = () => {
  if (typeof window === "undefined") return 9;
  return window.innerWidth >= 1024 ? 12 : 9;
};

const getInitialVisibleCount = (max: number) => {
  if (typeof window === "undefined") return Math.min(9, max);
  const saved = Number(sessionStorage.getItem(STORAGE_KEY));
  const fallback = getBaseVisibleCount();
  if (Number.isFinite(saved) && saved > 0) {
    return Math.min(Math.max(saved, fallback), max);
  }
  return Math.min(fallback, max);
};

const ParallaxCard: React.FC<{ project: ProjectItem; index: number }> = ({ project, index }) => {
  const ref = useRef<HTMLDivElement>(null);
  const hasGallery = project.galleryImages && project.galleryImages.length > 0;

  return (
    <Link to={`/installation/${project.id}`} className="col-span-1 aspect-[3/2] relative group">
      {hasGallery && (
        <>
          <div className="absolute inset-0 bg-gray-100 translate-x-2 translate-y-2 -rotate-1 transition-transform duration-500 group-hover:translate-x-3 group-hover:translate-y-3 group-hover:-rotate-2" />
          <div className="absolute inset-0 bg-gray-50 translate-x-1 translate-y-1 rotate-1 transition-transform duration-500 group-hover:translate-x-2 group-hover:translate-y-2 group-hover:rotate-2" />
        </>
      )}

      <motion.div
        ref={ref}
        className="relative h-full flex items-center justify-center cursor-pointer overflow-hidden bg-white transition-all duration-500"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <motion.div
          className="w-full h-full"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.4 }}
        >
          <img
            src={project.src}
            alt={project.title}
            loading={index < 4 ? "eager" : "lazy"}
            fetchPriority={index === 0 ? "high" : "auto"}
            decoding="async"
            className="w-full h-full object-cover transition-all duration-500"
            referrerPolicy="no-referrer"
          />
        </motion.div>
      </motion.div>
    </Link>
  );
};

export default function InstallationGallery() {
  const projects = installationProjects;
  const [visibleCount, setVisibleCount] = useState(() => getInitialVisibleCount(projects.length));
  const loaderRef = useRef<HTMLDivElement>(null);
  const restoredScrollRef = useRef(false);

  useEffect(() => {
    const nextValue = Math.min(visibleCount, projects.length);
    sessionStorage.setItem(STORAGE_KEY, String(nextValue));
  }, [visibleCount, projects.length]);

  useEffect(() => {
    const handleResize = () => {
      const minVisible = getBaseVisibleCount();
      setVisibleCount((prev) => Math.min(Math.max(prev, minVisible), projects.length));
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [projects.length]);

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
    setVisibleCount((prev) => Math.min(prev + 9, projects.length));
  };

  useEffect(() => {
    const node = loaderRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting && visibleCount < projects.length) {
          handleLoadMore();
        }
      },
      { threshold: 0.1, rootMargin: "300px" }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [visibleCount, projects.length]);

  return (
    <section className="relative w-full min-h-screen bg-white flex flex-col">
      <header className="w-full px-6 py-8 md:px-16 flex justify-between items-center border-b border-gray-50">
        <Link to="/" className="inline-flex items-center gap-2 text-gray-400 hover:text-black transition-colors group">
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          <span className="font-mono text-[10px] uppercase tracking-[0.3em]">Back</span>
        </Link>
        <div className="font-tech font-black text-xl tracking-widest">PLAN D</div>
      </header>

      <div className="w-full px-4 py-8 md:px-12 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
          {projects.slice(0, visibleCount).map((project, i) => (
            <ParallaxCard key={project.id} project={project} index={i} />
          ))}
        </div>

        <div ref={loaderRef} className="w-full h-24 flex justify-center items-center mt-12">
          {visibleCount < projects.length && (
            <div className="w-6 h-6 border-2 border-gray-100 border-t-gray-400 rounded-full animate-spin" />
          )}
        </div>
      </div>

      <footer className="w-full px-6 py-24 md:px-16 flex flex-col items-center justify-center gap-10">
        <div className="w-px h-16 bg-gray-100" />
        <Link
          to="/"
          className="px-10 py-4 border border-black text-[10px] font-mono uppercase tracking-[0.4em] hover:bg-black hover:text-white transition-all duration-500"
        >
          Home
        </Link>
      </footer>
    </section>
  );
}
