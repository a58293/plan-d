import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion, AnimatePresence, PanInfo } from "motion/react";
import { ArrowLeft, ChevronLeft, ChevronRight, X } from "lucide-react";
import { graphicProjects } from "../content";

export default function GraphicDesignDetail() {
  const { id } = useParams();
  const project = graphicProjects.find((p) => String(p.id) === id);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isImageLoading, setIsImageLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  // Reset loading state when image changes
  useEffect(() => {
    setIsImageLoading(true);
    setProgress(0);
  }, [currentIndex]);

  // Simulated progress bar logic
  useEffect(() => {
    if (!isImageLoading) {
      setProgress(100);
      return;
    }
    
    setProgress(15);
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 90) return prev;
        return prev + (90 - prev) * 0.1;
      });
    }, 200);
    
    return () => clearInterval(timer);
  }, [isImageLoading]);

  useEffect(() => {
    if (!project) return;
    const allImages = [project.src, ...(project.galleryImages || [])];
    
    const preloadIndices = [
      (currentIndex + 1) % allImages.length,
      (currentIndex + 2) % allImages.length,
      (currentIndex - 1 + allImages.length) % allImages.length
    ];

    preloadIndices.forEach(idx => {
      const img = new Image();
      img.src = allImages[idx];
    });
  }, [currentIndex, project]);

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center font-mono text-xs uppercase tracking-widest">
        Project not found
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

  const handleDragEnd = (_: any, info: PanInfo) => {
    if (info.offset.x < -50) nextImage();
    else if (info.offset.x > 50) prevImage();
  };

  return (
    <main className="w-full min-h-screen bg-white flex flex-col lg:flex-row overflow-hidden">
      {/* Back Button - Fixed position */}
      <Link 
        to="/graphic" 
        className="fixed top-8 left-8 z-40 flex items-center gap-2 text-gray-400 hover:text-black transition-colors group"
      >
        <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
        <span className="font-mono text-[10px] uppercase tracking-[0.3em]">Back</span>
      </Link>

      {/* Full Screen Image Viewer */}
      <div className="w-full h-screen relative bg-white flex items-center justify-center overflow-hidden">
        {/* Progress Bar */}
        <div className="absolute top-0 left-0 w-full h-[2px] z-20 bg-gray-100">
          <div
            className="h-full bg-black transition-all duration-300 ease-out"
            style={{
              width: `${progress}%`,
              opacity: progress === 100 ? 0 : 1,
              transitionDelay: progress === 100 ? '400ms' : '0ms'
            }}
          />
        </div>

        {/* Loading Spinner */}
        <AnimatePresence>
          {isImageLoading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none"
            >
              <div className="w-6 h-6 border border-gray-200 border-t-black rounded-full animate-spin" />
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence mode="wait">
          <motion.img
            key={currentIndex}
            src={allImages[currentIndex]}
            alt={`${project.title} - Image ${currentIndex + 1}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className={`max-w-full max-h-full object-contain p-4 md:p-12 ${allImages.length > 1 ? 'cursor-grab active:cursor-grabbing' : 'cursor-zoom-in'}`}
            referrerPolicy="no-referrer"
            loading="eager"
            fetchPriority="high"
            drag={allImages.length > 1 ? "x" : false}
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.2}
            onDragEnd={handleDragEnd}
            onClick={() => setIsFullscreen(true)}
            onLoad={() => setIsImageLoading(false)}
          />
        </AnimatePresence>

        {/* Navigation Controls */}
        {allImages.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-4 md:left-12 top-1/2 -translate-y-1/2 text-gray-300 hover:text-black z-30 p-4 transition-colors hidden md:block"
            >
              <ChevronLeft size={32} strokeWidth={1} />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-4 md:right-12 top-1/2 -translate-y-1/2 text-gray-300 hover:text-black z-30 p-4 transition-colors hidden md:block"
            >
              <ChevronRight size={32} strokeWidth={1} />
            </button>
            
            {/* Mobile Indicator */}
            <div className="absolute bottom-8 left-0 w-full text-center font-mono text-[9px] text-gray-300 tracking-[0.5em] uppercase">
              {currentIndex + 1} / {allImages.length}
            </div>
          </>
        )}
      </div>

      {/* Fullscreen Lightbox */}
      <AnimatePresence>
        {isFullscreen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-white flex items-center justify-center"
            onClick={() => setIsFullscreen(false)}
          >
            <button
              className="absolute top-8 right-8 text-gray-400 hover:text-black z-50 p-2 transition-colors"
              onClick={() => setIsFullscreen(false)}
            >
              <X size={24} strokeWidth={1} />
            </button>

            <AnimatePresence mode="wait">
              <motion.img
                key={currentIndex}
                src={allImages[currentIndex]}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.3 }}
                className="max-w-full max-h-full object-contain p-4"
                referrerPolicy="no-referrer"
                onClick={(e) => e.stopPropagation()}
              />
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
