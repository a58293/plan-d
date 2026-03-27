import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { Plus } from "lucide-react";
import HoverColorText, { SplitColorText } from "./HoverColorText";
import { homeCategories } from "../content";

export default function HomeGallery() {
  const categories = homeCategories;

  return (
    <section className="w-full min-h-[80vh] bg-white flex items-center justify-center p-4 md:p-12 relative">
      <div className="w-full max-w-6xl grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 auto-rows-[150px] md:auto-rows-[200px]">
        {categories.map((item, i) => {
          const Content = (
            <motion.div
              className="relative w-full h-full overflow-hidden group cursor-pointer rounded-2xl"
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, margin: "400px" }}
              transition={{ duration: 0.6, ease: "easeOut", delay: i * 0.05 }}
              whileHover={{ scale: 1.02, zIndex: 10 }}
            >
              <img
                src={item.src}
                alt={item.label}
                loading={i === 0 ? "eager" : "lazy"}
                fetchPriority={i === 0 ? "high" : "auto"}
                decoding="async"
                className={`w-full h-full transition-transform duration-700 group-hover:scale-110 ${item.objectFit === "contain" ? "object-contain p-4" : "object-cover"}`}
                referrerPolicy="no-referrer"
              />
              <>
                <div className="hidden lg:flex absolute inset-0 bg-transparent transition-colors duration-300 flex-col items-center justify-center gap-2">
                  {item.id !== "logo" && (
                    <h3 className="text-white text-xl md:text-2xl font-mono font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300 tracking-widest drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                      <SplitColorText text={item.label} defaultColor="#ffffff" />
                    </h3>
                  )}
                </div>

                <div className="lg:hidden absolute inset-x-0 bottom-0 p-3 pt-8 flex flex-col items-start justify-end">
                  {item.id !== "logo" && (
                    <h3 className="text-white text-sm font-mono font-bold tracking-widest drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                      <SplitColorText text={item.label} defaultColor="#ffffff" />
                    </h3>
                  )}
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
