import React, { useState, useRef } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useMotionValue,
  useVelocity,
  useAnimationFrame
} from "motion/react";
import { wrap } from "motion/react";
import { ArrowLeft, Plus, Shuffle, ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { illustrationImages } from "../content";

// --- Parallax Marquee Component ---

interface ParallaxProps {
  children: React.ReactNode;
  baseVelocity: number;
}

const ParallaxText: React.FC<ParallaxProps> = ({ children, baseVelocity = 100 }) => {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400
  });
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
    clamp: false
  });

  /**
   * This is a magic wrapping for the length of the text - you
   * have to replace for wrapping that works for you or dynamically
   * calculate
   */
  const x = useTransform(baseX, (v) => `${wrap(-20, -45, v)}%`);

  const directionFactor = useRef<number>(1);
  useAnimationFrame((t, delta) => {
    let moveBy = directionFactor.current * baseVelocity * (delta / 1000);

    /**
     * This is what changes the direction of the scroll once we
     * switch scrolling directions.
     */
    if (velocityFactor.get() < 0) {
      directionFactor.current = -1;
    } else if (velocityFactor.get() > 0) {
      directionFactor.current = 1;
    }

    moveBy += directionFactor.current * moveBy * velocityFactor.get();

    baseX.set(baseX.get() + moveBy);
  });

  /**
   * The number of times to repeat the child text should be dynamic based on the size of the text and viewport.
   * For simplicity, we repeat it 4 times here.
   */
  return (
    <div className="parallax overflow-hidden m-0 whitespace-nowrap flex flex-nowrap">
      <motion.div className="scroller font-black uppercase text-6xl md:text-9xl flex whitespace-nowrap flex-nowrap" style={{ x }}>
        <span className="block mr-8 md:mr-24">{children} </span>
        <span className="block mr-8 md:mr-24">{children} </span>
        <span className="block mr-8 md:mr-24">{children} </span>
        <span className="block mr-8 md:mr-24">{children} </span>
      </motion.div>
    </div>
  );
}

// --- Helper: Shuffle Array ---
const shuffleArray = <T,>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

// --- Image Marquee Component ---

const ImageMarquee: React.FC<{ images: string[] }> = ({ images }) => {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 40,
    stiffness: 200
  });
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 4], {
    clamp: false
  });

  // Dynamically calculate numSets based on image count to avoid rendering too many DOM nodes
  // We need at least 2 sets to loop. If there are few images, we need more sets to fill the screen.
  const numSets = Math.max(2, Math.ceil(12 / Math.max(1, images.length)));
  const wrapPercent = -100 / numSets;
  
  const x = useTransform(baseX, (v) => `${wrap(wrapPercent, 0, v)}%`);

  const directionFactor = useRef<number>(-1);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const startBaseX = useRef(0);

  useAnimationFrame((t, delta) => {
    if (isDragging.current) return;

    // Constant pixel speed: roughly 12 seconds per image for a slow, elegant pan
    const baseSpeedPercentPerSecond = Math.abs(wrapPercent) / (Math.max(1, images.length) * 12);
    let currentSpeed = baseSpeedPercentPerSecond;

    if (velocityFactor.get() < 0) {
      directionFactor.current = 1;
    } else if (velocityFactor.get() > 0) {
      directionFactor.current = -1;
    }

    let moveBy = directionFactor.current * currentSpeed * (delta / 1000);
    moveBy += directionFactor.current * Math.abs(moveBy) * velocityFactor.get();

    baseX.set(baseX.get() + moveBy);
  });

  const handlePointerDown = (e: React.PointerEvent) => {
    isDragging.current = true;
    startX.current = e.clientX;
    startBaseX.current = baseX.get();
    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch (err) {
      // Ignore capture errors
    }
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging.current) return;
    const deltaX = e.clientX - startX.current;
    
    // Dynamic sensitivity: 1 pixel of drag should equal roughly 1 pixel of scroll.
    // Assuming average image + gap width is ~400px.
    // wrapPercent corresponds to (images.length * 400) pixels.
    const sensitivity = Math.abs(wrapPercent) / (Math.max(1, images.length) * 400);
    
    baseX.set(startBaseX.current + deltaX * sensitivity);
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    isDragging.current = false;
    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch (err) {
      // Ignore release errors
    }
  };

  return (
    <>
      <div 
        className="overflow-hidden py-8 flex flex-nowrap w-full h-screen items-center cursor-grab active:cursor-grabbing touch-none select-none"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        onPointerLeave={handlePointerUp}
        onDragStart={(e) => e.preventDefault()}
      >
        <motion.div className="flex flex-nowrap w-max flex-shrink-0" style={{ x }}>
          {Array.from({ length: numSets }).map((_, setIdx) => (
            <div key={setIdx} className="flex flex-nowrap flex-shrink-0 gap-4 md:gap-8 pr-4 md:pr-8 pointer-events-none">
              {images.map((src, i) => (
                <div key={i} className="flex-shrink-0 h-[300px] md:h-[500px] rounded-lg shadow-lg overflow-hidden bg-gray-50/50 flex items-center justify-center">
                  <img 
                    src={src} 
                    alt="Illustration" 
                    loading={setIdx === 0 && i < 5 ? "eager" : "lazy"}
                    fetchPriority={setIdx === 0 && i < 3 ? "high" : "auto"}
                    className="w-auto h-full object-cover pointer-events-none" 
                    referrerPolicy="no-referrer"
                    draggable={false}
                  />
                </div>
              ))}
            </div>
          ))}
        </motion.div>
      </div>

      {/* Floating Shuffle Button Removed */}
    </>
  );
}

export default function IllustrationGallery() {
  const [images] = useState(() => shuffleArray(illustrationImages));

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

      {/* Hero Section */}
      <section className="h-screen flex flex-col justify-center items-center relative overflow-hidden">
        <div className="z-10 w-full">
            <ImageMarquee key={images.length} images={images} />
        </div>
      </section>

    </motion.main>
  );
}
