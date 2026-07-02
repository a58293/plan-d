import { motion } from "motion/react";
import React, { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { installationProjects, ProjectItem } from "../content";
import { SplitColorText } from "./HoverColorText";

const ParallaxCard: React.FC<{ project: ProjectItem; index: number }> = ({ project, index }) => {
  const ref = useRef<HTMLDivElement>(null);
  const hasGallery = project.galleryImages && project.galleryImages.length > 0;
  const isWideProject = project.id === 9;

  return (
    <Link
      to={`/installation/${project.id}`}
      className={`relative group ${
        isWideProject
          ? "col-span-1 md:col-span-2 lg:col-span-3 aspect-[16/7]"
          : "col-span-1 aspect-[3/2]"
      }`}
    >
      {hasGallery && !isWideProject && (
        <>
          <div className="absolute inset-0 bg-gray-100 translate-x-2 translate-y-2 -rotate-1 transition-transform duration-500 group-hover:translate-x-3 group-hover:translate-y-3 group-hover:-rotate-2" />
          <div className="absolute inset-0 bg-gray-50 translate-x-1 translate-y-1 rotate-1 transition-transform duration-500 group-hover:translate-x-2 group-hover:translate-y-2 group-hover:rotate-2" />
        </>
      )}

      <motion.div
        ref={ref}
        className={`relative h-full flex items-center justify-center cursor-pointer overflow-hidden transition-all duration-500 ${
          isWideProject ? "rounded-[24px] bg-[#F6F4EF]" : "bg-white"
        }`}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <motion.div
          className="w-full h-full"
          whileHover={{ scale: isWideProject ? 1.015 : 1.05 }}
          transition={{ duration: 0.4 }}
        >
          <img
            src={project.src}
            alt={project.title}
            loading={index < 8 ? "eager" : "lazy"}
            fetchPriority={index < 4 ? "high" : "auto"}
            decoding="async"
            className={`w-full h-full transition-all duration-500 ${
              isWideProject
                ? "object-contain p-3 md:p-4 lg:p-5"
                : "object-cover"
            }`}
            referrerPolicy="no-referrer"
          />
        </motion.div>

        <div className="absolute left-4 bottom-4 md:left-5 md:bottom-5 pointer-events-none">
          <div className="bg-white/84 backdrop-blur-[2px] px-3 py-2 rounded-full shadow-[0_4px_16px_rgba(0,0,0,0.08)]">
            <span className="font-site text-[13px] md:text-[15px] tracking-[0.08em] text-[#111827]">
              <SplitColorText
                text={project.title}
                defaultColor="#111827"
                fontClass="font-site"
              />
            </span>
          </div>
        </div>
      </motion.div>
    </Link>
  );
};

export default function InstallationGallery() {
  const projects = installationProjects;
  const [visibleCount, setVisibleCount] = useState(9);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024 && visibleCount === 9) {
        setVisibleCount(12);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [visibleCount]);

  const handleLoadMore = () => {
    setVisibleCount((prev) => Math.min(prev + 9, projects.length));
  };

  const loaderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && visibleCount < projects.length) {
          handleLoadMore();
        }
      },
      { threshold: 0.1, rootMargin: "300px" }
    );

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => observer.disconnect();
  }, [visibleCount, projects.length]);

  return (
    <section className="relative w-full min-h-screen bg-white flex flex-col">
      <header className="w-full px-6 py-8 md:px-16 flex justify-between items-center border-b border-gray-50">
        <Link to="/" className="inline-flex items-center gap-2 text-gray-400 hover:text-black transition-colors group">
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          <span className="font-en text-[10px] uppercase tracking-[0.3em]">
            <SplitColorText text="Back" defaultColor="#9CA3AF" fontClass="font-en" />
          </span>
        </Link>
        <div className="font-site text-lg tracking-[0.12em] text-[#111827]">
          <SplitColorText text="绘屿造物" defaultColor="#111827" fontClass="font-site" />
        </div>
      </header>

      <div className="w-full px-4 py-8 md:px-12 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
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
          className="px-10 py-4 border border-black text-[10px] font-en uppercase tracking-[0.4em] hover:bg-black hover:text-white transition-all duration-500"
        >
          <SplitColorText text="Home" defaultColor="#111827" fontClass="font-en" />
        </Link>
      </footer>
    </section>
  );
}
