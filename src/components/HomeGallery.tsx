import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { useState, useRef } from "react";
import { Plus } from "lucide-react";
import HoverColorText, { SplitColorText } from "./HoverColorText";
import { homeCategories, prefetchSectionImages } from "../content";

export default function HomeGallery() {
  const categories = homeCategories;

  return (
    <section className="w-full min-h-[80vh] bg-white flex items-center justify-center p-4 md:p-12 relative">
      <div className="w-full max-w-6xl grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 auto-rows-[150px] md:auto-rows-[200px]">
        {categories.map((item, i) => {
          const handlePrefetch = () => {
            if (item.link) {
              prefetchSectionImages(item.link);
            }
          };

          const Content = (
            <motion.div
              className="relative w-full h-full overflow-hidden group cursor-pointer rounded-2xl"
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, margin: "100px" }}
              transition={{ duration: 0.6, ease: "easeOut", delay: i * 0.05 }}
              whileHover={{ scale: 1.02, zIndex: 10 }}
              onMouseEnter={handlePrefetch}
              onTouchStart={handlePrefetch}
            >
              <img
                src={item.src}
                alt={item.label}
                loading={i < 6 ? "eager" : "lazy"}
                fetchPriority={i < 4 ? "high" : "auto"}
                decoding="async"
                className={`w-full h-full transition-transform duration-700 group-hover:scale-110 ${item.objectFit === 'contain' ? 'object-contain p-4' : 'object-cover'}`}
                referrerPolicy="no-referrer"
              />
              <>
                {/* Desktop Hover Overlay */}
                <div className="hidden lg:flex absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex-col items-center justify-center gap-2">
                  <h3 className="text-white text-xl md:text-2xl font-mono font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300 tracking-widest">
                    <SplitColorText text={item.label} defaultColor="#ffffff" />
                  </h3>
                  <p className="text-white/90 text-sm md:text-base font-sans font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-75 tracking-wide">
                    <SplitColorText text={item.labelCn} defaultColor="rgba(255, 255, 255, 0.9)" />
                  </p>
                </div>
                
                {/* Mobile & Tablet Always-Visible Label */}
                <div className="lg:hidden absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-3 pt-8 flex flex-col items-start justify-end">
                  <h3 className="text-white text-sm font-mono font-bold tracking-widest drop-shadow-md">
                    <SplitColorText text={item.label} defaultColor="#ffffff" />
                  </h3>
                  <p className="text-white/90 text-xs font-sans font-medium tracking-wide drop-shadow-md">
                    <SplitColorText text={item.labelCn} defaultColor="rgba(255, 255, 255, 0.9)" />
                  </p>
                </div>
              </>
            </motion.div>
          );

          if (item.href) {
            return (
              <a 
                key={item.id} 
                href={item.href} 
                target="_blank" 
                rel="noopener noreferrer" 
                className={item.className}
              >
                {Content}
              </a>
            );
          }

          return item.link ? (
            <Link key={item.id} to={item.link} className={item.className}>
              {Content}
            </Link>
          ) : (
            <div key={item.id} className={item.className}>
              {Content}
            </div>
          );
        })}
      </div>
    </section>
  );
}
