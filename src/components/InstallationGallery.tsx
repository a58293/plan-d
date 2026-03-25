import { motion } from "motion/react";
import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { installationProjects, ProjectItem } from "../content";

const ParallaxCard: React.FC<{ project: ProjectItem, index: number }> = ({ project, index }) => {
  const ref = useRef<HTMLDivElement>(null);
  const hasGallery = project.galleryImages && project.galleryImages.length > 0;

  return (
    <Link to={`/installation/${project.id}`} className="col-span-1 aspect-[3/4] relative group">
      {/* Stack Effect Layers (Only if has gallery) */}
      {hasGallery && (
        <>
          <div className="absolute inset-0 bg-gray-100 translate-x-2 translate-y-2 -rotate-1 transition-transform duration-500 group-hover:translate-x-3 group-hover:translate-y-3 group-hover:-rotate-2" />
          <div className="absolute inset-0 bg-gray-50 translate-x-1 translate-y-1 rotate-1 transition-transform duration-500 group-hover:translate-x-2 group-hover:translate-y-2 group-hover:rotate-2" />
        </>
      )}
      
      <motion.div
        ref={ref}
        className="relative h-full flex items-center justify-center cursor-pointer overflow-hidden bg-white border border-gray-100 shadow-sm transition-all duration-500 group-hover:shadow-xl"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <motion.div 
          className="w-full h-full flex items-center justify-center p-4 md:p-10"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.4 }}
        >
          <img
            src={project.src}
            alt={project.title}
            loading={index < 8 ? "eager" : "lazy"}
            fetchPriority={index < 4 ? "high" : "auto"}
            decoding="async"
            className="max-w-full max-h-full object-contain mix-blend-multiply drop-shadow-sm group-hover:drop-shadow-lg transition-all duration-500"
            referrerPolicy="no-referrer"
          />
        </motion.div>
      </motion.div>
    </Link>
  );
}

export default function InstallationGallery() {
  const projects = installationProjects;

  return (
    <section className="relative w-full min-h-screen bg-white flex flex-col">
      {/* Minimal Header */}
      <header className="w-full px-6 py-8 md:px-16 flex justify-between items-center border-b border-gray-50">
        <Link to="/" className="inline-flex items-center gap-2 text-gray-400 hover:text-black transition-colors group">
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          <span className="font-mono text-[10px] uppercase tracking-[0.3em]">Back</span>
        </Link>
        <div className="font-tech font-black text-xl tracking-widest">PLAN D</div>
      </header>

      {/* Uniform Grid Layout with Stack Effect */}
      <div className="w-full px-4 py-12 md:px-12 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 md:gap-20">
          {projects.map((project, i) => (
            <ParallaxCard key={project.id} project={project} index={i} />
          ))}
        </div>
      </div>

      {/* Minimal Footer */}
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
