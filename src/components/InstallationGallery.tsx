import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Link } from "react-router-dom";
import { ArrowLeft, Plus } from "lucide-react";
import { installationProjects, ProjectItem } from "../content";

const ProjectCard: React.FC<{ project: ProjectItem; index: number }> = ({ project, index }) => {
  const [isActive, setIsActive] = useState(false);

  return (
    <motion.div
      className="relative w-full aspect-[4/3] overflow-hidden rounded-2xl shadow-sm cursor-pointer group"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      onMouseEnter={() => setIsActive(true)}
      onMouseLeave={() => setIsActive(false)}
    >
      <Link to={`/installation/${project.id}`} className="block w-full h-full">
        <img
          src={project.src}
          alt={project.title}
          className={`w-full h-full object-cover transition-transform duration-700 ${
            isActive ? "scale-105" : "group-hover:scale-102"
          }`}
          referrerPolicy="no-referrer"
        />
        
        <AnimatePresence>
          {isActive && (
            <motion.div
              initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
              animate={{ opacity: 1, backdropFilter: "blur(8px)" }}
              exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center p-8 text-center text-white"
            >
              <motion.h3 
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="font-mincho text-3xl md:text-4xl font-bold mb-6 tracking-widest uppercase text-balance"
              >
                {project.title}
              </motion.h3>
              <motion.div 
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="flex gap-4 text-xs font-mono tracking-wider text-gray-400 uppercase"
              >
                <span>{project.location}</span>
                <span>•</span>
                <span>{project.year}</span>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </Link>
    </motion.div>
  );
}

export default function InstallationGallery() {
  const projects = installationProjects;

  return (
    <motion.main 
      className="min-h-screen bg-white text-gray-900 overflow-x-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      {/* Navigation */}
      <nav className="fixed top-0 left-0 w-full p-6 md:p-12 z-50 mix-blend-difference text-white flex justify-between items-center">
        <Link to="/" className="group flex items-center gap-2 font-tech uppercase tracking-widest text-sm hover:text-gray-300 transition-colors">
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          Back
        </Link>
        <div className="font-tech font-black text-xl tracking-widest">PLAN D</div>
      </nav>

      {/* Gallery Grid */}
      <section className="px-6 md:px-12 pt-32 pb-24 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </section>
    </motion.main>
  );
}
