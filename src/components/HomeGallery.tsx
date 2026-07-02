import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { SplitColorText } from "./HoverColorText";
import { homeCategories } from "../content";

const categoryOverrides = {
  logo: {
    className: "col-span-2 row-span-2 md:col-span-2 md:row-span-2 md:col-start-1 md:row-start-1",
  },
  bjd: {
    label: "球形关节人偶",
    className: "col-span-2 row-span-1 md:col-span-1 md:row-span-2 md:col-start-4 md:row-start-1",
  },
  spatial: {
    label: "装置艺术设计",
    className: "col-span-1 row-span-1 md:col-span-1 md:row-span-1 md:col-start-3 md:row-start-1",
  },
  installation: {
    label: "品牌设计",
    className: "col-span-1 row-span-1 md:col-span-1 md:row-span-1 md:col-start-3 md:row-start-2",
  },
  graphic: {
    label: "VI设计",
    className: "col-span-2 row-span-1 md:col-span-2 md:row-span-1 md:col-start-1 md:row-start-3",
  },
  illustration: {
    label: "商业插画海报",
    className: "col-span-2 row-span-1 md:col-span-2 md:row-span-1 md:col-start-3 md:row-start-3",
  },
  mcn: {
    hidden: true,
  },
} as const;

export default function HomeGallery() {
  const categories = homeCategories
    .map((item) => ({
      ...item,
      ...(categoryOverrides[item.id as keyof typeof categoryOverrides] ?? {}),
    }))
    .filter((item) => !(item as { hidden?: boolean }).hidden);

  return (
    <section className="w-full min-h-[80vh] bg-white flex items-center justify-center px-4 py-6 md:px-12 md:py-10 relative">
      <div className="w-full max-w-6xl grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 auto-rows-[150px] md:auto-rows-[200px]">
        {categories.map((item, i) => {
          const displayText = item.label;
          const isChinese = /[\u4e00-\u9fff]/.test(displayText);
          const labelFontClass = isChinese ? "font-zh" : "font-en";
          const desktopTextClass = isChinese
            ? "text-white text-base md:text-lg font-semibold tracking-[0.04em]"
            : "text-white text-xl md:text-2xl font-bold tracking-[0.16em]";
          const mobileTextClass = isChinese
            ? "text-white text-xs md:text-sm font-semibold tracking-[0.03em]"
            : "text-white text-sm font-bold tracking-[0.14em]";

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
                alt={displayText}
                loading={i === 0 ? "eager" : "lazy"}
                fetchPriority={i === 0 ? "high" : "auto"}
                decoding="async"
                className={`w-full h-full transition-transform duration-700 group-hover:scale-110 ${
                  item.objectFit === "contain" ? "object-contain p-4" : "object-cover"
                }`}
                referrerPolicy="no-referrer"
              />

              <>
                <div className="hidden lg:flex absolute inset-0 bg-transparent transition-colors duration-300 flex-col items-center justify-center gap-2">
                  {item.id !== "logo" && (
                    <h3 className={`${labelFontClass} ${desktopTextClass} opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-center drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]`}>
                      <SplitColorText
                        text={displayText}
                        defaultColor="#ffffff"
                        fontClass={labelFontClass}
                      />
                    </h3>
                  )}
                </div>

                <div className="lg:hidden absolute inset-x-0 bottom-0 p-3 pt-8 flex flex-col items-start justify-end">
                  {item.id !== "logo" && (
                    <h3 className={`${labelFontClass} ${mobileTextClass} drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]`}>
                      <SplitColorText
                        text={displayText}
                        defaultColor="#ffffff"
                        fontClass={labelFontClass}
                      />
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
