import { useParams, Link } from "react-router-dom";
import { motion } from "motion/react";
import { ArrowLeft } from "lucide-react";
import { installationProjects } from "../content";
import { SplitColorText } from "./HoverColorText";

export default function ProductDesignDetail() {
  const { id } = useParams();
  const project = installationProjects.find((p) => String(p.id) === id);

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white text-gray-900">
        <div className="text-center">
          <h1 className="text-2xl font-tech tracking-widest mb-4">PROJECT NOT FOUND</h1>
          <Link to="/installation" className="underline hover:text-gray-500 transition-colors">
            Return to Gallery
          </Link>
        </div>
      </div>
    );
  }

  // Generate dynamic widths and alignments for the right-side image stream
  const getImageStyle = (idx: number) => {
    const pattern = idx % 4;
    switch (pattern) {
      case 0: return "w-full aspect-[4/3]"; // Full width
      case 1: return "w-[85%] ml-auto aspect-[3/4]"; // Indented left, tall
      case 2: return "w-[90%] aspect-square"; // Indented right, square
      case 3: return "w-[75%] mx-auto aspect-[16/9]"; // Centered, wide
      default: return "w-full aspect-[4/3]";
    }
  };

  return (
    <main className="min-h-screen bg-[#FAFAFA] text-gray-900 flex flex-col lg:flex-row selection:bg-black selection:text-white">
      
      {/* Left: Sticky Info Panel */}
      <div className="w-full lg:w-[35%] xl:w-[30%] lg:h-screen lg:sticky lg:top-0 flex flex-col p-8 md:p-12 bg-white border-r border-gray-200/60 z-10 shadow-[4px_0_24px_rgba(0,0,0,0.02)]">
        <Link 
          to="/installation" 
          className="inline-flex items-center gap-3 font-tech text-xs tracking-[0.2em] uppercase text-gray-400 hover:text-black transition-colors mb-12 lg:mb-0 group shrink-0"
        >
          <div className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center group-hover:border-black transition-colors">
            <ArrowLeft className="w-3 h-3 transition-transform group-hover:-translate-x-0.5" />
          </div>
          Back to Index
        </Link>
        
        <div className="flex-1 flex flex-col justify-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-3xl md:text-4xl lg:text-5xl font-mincho font-bold tracking-tight leading-[1.2] mb-12 text-balance"
          >
            <SplitColorText text={project.title} defaultColor="#111827" />
          </motion.h1>
          
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            transition={{ delay: 0.2, duration: 0.8 }}
            className="flex flex-col gap-4 font-mono text-xs text-gray-400 uppercase tracking-[0.15em] mb-12"
          >
            <div className="flex justify-between border-b border-gray-100 pb-3">
              <span>Location</span>
              <span className="text-gray-900">{project.location || 'N/A'}</span>
            </div>
            <div className="flex justify-between border-b border-gray-100 pb-3">
              <span>Year</span>
              <span className="text-gray-900">{project.year || new Date().getFullYear()}</span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Right: Scrollable Image Stream */}
      <div className="w-full lg:w-[65%] xl:w-[70%] p-4 md:p-8 lg:p-12 flex flex-col gap-8 md:gap-16 lg:gap-24">
        
        {/* Main Hero Image */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }} 
          animate={{ opacity: 1, scale: 1 }} 
          transition={{ duration: 1, ease: "easeOut" }}
          className="w-full aspect-[4/3] md:aspect-[16/9] overflow-hidden rounded-sm shadow-sm"
        >
          <img 
            src={project.src} 
            alt={project.title} 
            className="w-full h-full object-cover" 
            referrerPolicy="no-referrer"
          />
        </motion.div>
        
        {/* Gallery Images with Rhythm */}
        {project.galleryImages?.map((imgSrc, idx) => (
          <motion.div 
            key={idx}
            initial={{ opacity: 0, y: 50 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className={`overflow-hidden rounded-sm shadow-sm ${getImageStyle(idx)}`}
          >
            <img 
              src={imgSrc} 
              alt={`${project.title} detail ${idx + 1}`} 
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-[2s] ease-out" 
              referrerPolicy="no-referrer"
            />
          </motion.div>
        ))}
        
        {/* End of Stream Indicator */}
        <div className="py-24 flex flex-col items-center justify-center gap-6 opacity-40">
           <div className="w-px h-16 bg-gray-400" />
           <span className="font-tech text-[10px] tracking-[0.4em] uppercase text-gray-500">End of Project</span>
        </div>
      </div>

    </main>
  );
}
