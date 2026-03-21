import { motion } from "motion/react";
import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Plus } from "lucide-react";
import { graphicImages, ImageItem } from "../content";

const ParallaxCard: React.FC<{ image: ImageItem, index: number }> = ({ image, index }) => {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <motion.div
      ref={ref}
      className="relative w-full aspect-square flex items-center justify-center group cursor-pointer"
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.6, delay: (index % 10) * 0.05, ease: "easeOut" }}
      whileHover={{ scale: 1.05, zIndex: 20 }}
    >
      <img
        src={image.src}
        alt={image.alt}
        loading={index < 8 ? "eager" : "lazy"}
        fetchPriority={index < 4 ? "high" : "auto"}
        className="max-w-[75%] max-h-[75%] object-contain mix-blend-multiply drop-shadow-md group-hover:drop-shadow-2xl transition-all duration-500"
        referrerPolicy="no-referrer"
      />
    </motion.div>
  );
}

export default function GraphicDesignGallery() {
  const images = graphicImages;

  return (
    <section className="relative w-full min-h-screen bg-white overflow-hidden flex flex-col">
      {/* Header with Back Button */}
      <div className="w-full px-4 pt-8 md:px-12 md:pt-12">
        <Link to="/" className="inline-flex items-center gap-2 text-gray-500 hover:text-black transition-colors group">
          <ArrowLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
          <span className="font-mono text-xs uppercase tracking-widest">Back</span>
        </Link>
      </div>

      {/* Grid Layout for Consistent Sizes */}
      <div className="flex-1 w-full px-4 py-8 md:px-8 md:py-12">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 md:gap-10">
          {images.map((image, i) => (
            <ParallaxCard key={image.id} image={image} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
