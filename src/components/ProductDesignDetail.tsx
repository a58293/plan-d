import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { ArrowLeft, ChevronLeft, ChevronRight } from "lucide-react";
import { installationProjects } from "../content";
import { SplitColorText } from "./HoverColorText";

export default function ProductDesignDetail() {
  const { id } = useParams();
  const project = installationProjects.find((p) => String(p.id) === id);
  const [currentIndex, setCurrentIndex] = useState(0);

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

  const allImages = [project.src, ...(project.galleryImages || [])];

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % allImages.length);
  };

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + allImages.length) % allImages.length);
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
            <div className="flex justify-between border-b border-gray-100 pb-3">
              <span>Images</span>
              <span className="text-gray-900">{currentIndex + 1} / {allImages.length}</span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Right: Single Image Carousel */}
      <div className="w-full lg:w-[65%] xl:w-[70%] h-[60vh] lg:h-screen relative bg-[#f5f5f5] flex items-center justify-center overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.img
            key={currentIndex}
            src={allImages[currentIndex]}
            alt={`${project.title} - Image ${currentIndex + 1}`}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="w-full h-full object-contain p-4 md:p-12"
            referrerPolicy="no-referrer"
            loading="eager"
            fetchPriority="high"
          />
        </AnimatePresence>

        {/* Navigation Buttons */}
        {allImages.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full bg-white/80 hover:bg-white text-black shadow-sm backdrop-blur-sm transition-all z-10"
            >
              <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full bg-white/80 hover:bg-white text-black shadow-sm backdrop-blur-sm transition-all z-10"
            >
              <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
            </button>

            {/* Pagination Indicators */}
            <div className="absolute bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-10 bg-white/50 backdrop-blur-md px-4 py-2 rounded-full">
              {allImages.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    idx === currentIndex ? "bg-black w-6" : "bg-black/30 hover:bg-black/50"
                  }`}
                  aria-label={`Go to image ${idx + 1}`}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </main>
  );
}
