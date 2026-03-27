import { useState, useEffect, useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { motion, AnimatePresence, PanInfo } from "motion/react";
import { ArrowLeft, ChevronLeft, ChevronRight, X } from "lucide-react";
import { installationProjects } from "../content";
import { SplitColorText } from "./HoverColorText";
import { getHarmoniousColor } from "../lib/colorUtils";

export default function ProductDesignDetail() {
  const { id } = useParams();
  const project = installationProjects.find((p) => String(p.id) === id);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isImageLoading, setIsImageLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [bgColor, setBgColor] = useState("#f5f5f5");
  const [direction, setDirection] = useState(0);

  const allImages = useMemo(() => {
    if (!project) return [];
    return [project.src, ...(project.galleryImages || [])];
  }, [project]);

  // Update background color based on current image
  useEffect(() => {
    if (allImages.length > 0) {
      getHarmoniousColor(allImages[currentIndex]).then(setBgColor);
    }
  }, [currentIndex, allImages]);

  // Reset loading state when image changes
  useEffect(() => {
    const img = new Image();
    img.src = allImages[currentIndex];
    if (img.complete) {
      setIsImageLoading(false);
      setProgress(100);
    } else {
      setIsImageLoading(true);
      setProgress(0);
    }
  }, [currentIndex, allImages]);

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

  // Preload next and previous images for smoother transitions
  useEffect(() => {
    if (!project || allImages.length <= 1) return;
    
    // We preload next, previous, and two-ahead to ensure smooth navigation
    const indicesToPreload = [
      (currentIndex + 1) % allImages.length,
      (currentIndex - 1 + allImages.length) % allImages.length,
      (currentIndex + 2) % allImages.length
    ];

    // Filter out current index and duplicates
    const uniqueIndices = Array.from(new Set(indicesToPreload)).filter(idx => idx !== currentIndex);

    uniqueIndices.forEach(idx => {
      const img = new Image();
      img.src = allImages[idx];
    });
  }, [currentIndex, project, allImages]);

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

  const nextImage = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % allImages.length);
  };

  const prevImage = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + allImages.length) % allImages.length);
  };

  const handleDragEnd = (_: any, { offset }: PanInfo) => {
    const swipeThreshold = 50;
    if (offset.x < -swipeThreshold) {
      nextImage();
    } else if (offset.x > swipeThreshold) {
      prevImage();
    }
  };

  // Fade variants
  const variants = {
    enter: (direction: number) => ({
      opacity: 0,
      x: direction > 0 ? 20 : -20,
    }),
    center: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    },
    exit: (direction: number) => ({
      opacity: 0,
      x: direction > 0 ? -20 : 20,
      transition: {
        duration: 0.5,
        ease: "easeIn"
      }
    })
  };

  return (
    <main className="min-h-screen text-gray-900 flex flex-col lg:flex-row selection:bg-black selection:text-white transition-colors duration-1000" style={{ backgroundColor: bgColor }}>
      
      {/* Left: Sticky Info Panel */}
      <div className="w-full lg:w-[35%] xl:w-[30%] lg:h-screen lg:sticky lg:top-0 flex flex-col p-8 md:p-12 bg-white/80 backdrop-blur-md border-r border-gray-200/60 z-10 shadow-[4px_0_24px_rgba(0,0,0,0.02)]">
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
      <div className="w-full lg:w-[65%] xl:w-[70%] h-[60vh] lg:h-screen relative flex items-center justify-center overflow-hidden">
        {/* Progress Bar */}
        <div className="absolute top-0 left-0 w-full h-[3px] z-20 bg-black/5">
          <div
            className="h-full bg-black/20 transition-all duration-300 ease-out"
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
              <div className="w-8 h-8 border-2 border-gray-300 border-t-black rounded-full animate-spin" />
            </motion.div>
          )}
        </AnimatePresence>

        <div className="relative w-full h-full flex items-center justify-center p-4 md:p-12">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              className="w-full h-full flex items-center justify-center cursor-grab active:cursor-grabbing"
              drag={allImages.length > 1 ? "x" : false}
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.2}
              onDragEnd={handleDragEnd}
            >
              <motion.img
                src={allImages[currentIndex]}
                alt={`${project.title} - Image ${currentIndex + 1}`}
                className={`max-w-full max-h-full object-contain shadow-2xl bg-white ${allImages.length > 1 ? '' : 'cursor-zoom-in'}`}
                referrerPolicy="no-referrer"
                loading="eager"
                fetchPriority="high"
                onClick={() => setIsFullscreen(true)}
                onLoad={() => setIsImageLoading(false)}
                onError={() => setIsImageLoading(false)}
              />
            </motion.div>
          </AnimatePresence>
        </div>

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
            <div className="absolute bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 z-10 bg-white/40 backdrop-blur-md px-6 py-3 rounded-full">
              <div className="flex gap-2.5">
                {allImages.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setDirection(idx > currentIndex ? 1 : -1);
                      setCurrentIndex(idx);
                    }}
                    className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                      idx === currentIndex ? "bg-black w-5" : "bg-black/20 hover:bg-black/40"
                    }`}
                    aria-label={`Go to image ${idx + 1}`}
                  />
                ))}
              </div>
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
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center backdrop-blur-sm"
            onClick={() => setIsFullscreen(false)}
          >
            <button
              className="absolute top-6 right-6 text-white/70 hover:text-white z-50 p-2 transition-colors"
              onClick={() => setIsFullscreen(false)}
            >
              <X size={32} />
            </button>

            {allImages.length > 1 && (
              <>
                <button
                  onClick={(e) => { e.stopPropagation(); prevImage(); }}
                  className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 text-white/50 hover:text-white z-50 p-4 transition-colors"
                >
                  <ChevronLeft size={48} />
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); nextImage(); }}
                  className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 text-white/50 hover:text-white z-50 p-4 transition-colors"
                >
                  <ChevronRight size={48} />
                </button>
              </>
            )}

            {/* Lightbox Progress Bar */}
            <div className="absolute top-0 left-0 w-full h-[3px] z-[60] bg-white/10">
              <div
                className="h-full bg-white transition-all duration-300 ease-out"
                style={{
                  width: `${progress}%`,
                  opacity: progress === 100 ? 0 : 1,
                  transitionDelay: progress === 100 ? '400ms' : '0ms'
                }}
              />
            </div>

            {/* Lightbox Loading Spinner */}
            <AnimatePresence>
              {isImageLoading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none"
                >
                  <div className="w-10 h-10 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                </motion.div>
              )}
            </AnimatePresence>

            <AnimatePresence mode="wait">
              <motion.img
                key={currentIndex}
                src={allImages[currentIndex]}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.2 }}
                className={`max-w-full max-h-[90vh] object-contain shadow-2xl ${allImages.length > 1 ? 'cursor-grab active:cursor-grabbing' : ''}`}
                referrerPolicy="no-referrer"
                onClick={(e) => e.stopPropagation()}
                drag={allImages.length > 1 ? "x" : false}
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.2}
                onDragEnd={handleDragEnd}
                onLoad={() => setIsImageLoading(false)}
                onError={() => setIsImageLoading(false)}
              />
            </AnimatePresence>
            
            <div className="absolute bottom-8 left-0 w-full text-center font-mono text-xs text-white/50 tracking-widest">
              {currentIndex + 1} / {allImages.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hidden preloading area for browser caching */}
      <div className="hidden" aria-hidden="true">
        {allImages.length > 1 && (
          <>
            <img src={allImages[(currentIndex + 1) % allImages.length]} referrerPolicy="no-referrer" />
            <img src={allImages[(currentIndex - 1 + allImages.length) % allImages.length]} referrerPolicy="no-referrer" />
          </>
        )}
      </div>
    </main>
  );
}
