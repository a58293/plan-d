import { motion } from "motion/react";
import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { spatialProjects, ProjectItem } from "../content";

const ParallaxCard: React.FC<{ project: ProjectItem, index: number }> = ({ project, index }) => {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <div className="col-span-1 aspect-[3/2] relative group">
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
            loading={index < 8 ? "eager" : "lazy"}
            fetchPriority={index < 4 ? "high" : "auto"}
            decoding="async"
            className="w-full h-full object-cover transition-all duration-500"
            referrerPolicy="no-referrer"
          />
        </motion.div>
      </motion.div>
    </div>
  );
}

export default function SpatialDesignGallery() {
  const projects = spatialProjects;

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

      {/* Uniform Grid Layout */}
      <div className="w-full px-4 py-8 md:px-12 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
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
