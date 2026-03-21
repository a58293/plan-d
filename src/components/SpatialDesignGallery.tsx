import React from "react";
import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { ArrowLeft, Plus } from "lucide-react";
import { spatialProjects, ProjectItem } from "../content";

const ProjectCard: React.FC<{ project: ProjectItem; index: number }> = ({ project, index }) => {
  return (
    <motion.div
      className="relative w-full aspect-[4/3] overflow-hidden rounded-2xl shadow-sm cursor-pointer group"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
    >
      <img
        src={project.src}
        alt={project.title}
        loading={index < 4 ? "eager" : "lazy"}
        fetchPriority={index < 2 ? "high" : "auto"}
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        referrerPolicy="no-referrer"
      />
    </motion.div>
  );
}

export default function SpatialDesignGallery() {
  const projects = spatialProjects;

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
