import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { SplitColorText } from "./HoverColorText";
import { homeCategories } from "../content";

const categoryOverrides = {
  logo: {
    className: "col-span-2 row-span-2 md:col-span-2 md:row-span-2 md:col-start-1 md:row-start-1",
    cardLabel: "客户集",
  },
  bjd: {
    label: "球形关节人偶",
    className: "col-span-2 row-span-1 md:col-span-1 md:row-span-2 md:col-start-4 md:row-start-1",
    cardLabel: "球形关节人偶",
  },
  spatial: {
    label: "装置艺术设计",
    className: "col-span-1 row-span-1 md:col-span-1 md:row-span-1 md:col-start-3 md:row-start-1",
    cardLabel: "装置艺术设计",
  },
  installation: {
    label: "品牌设计",
    className: "col-span-1 row-span-1 md:col-span-1 md:row-span-1 md:col-start-3 md:row-start-2",
    cardLabel: "品牌设计",
  },
  graphic: {
    label: "VI设计",
    className: "col-span-2 row-span-1 md:col-span-2 md:row-span-1 md:col-start-1 md:row-start-3",
    cardLabel: "VI设计",
  },
  illustration: {
    label: "商业插画海报",
    className: "col-span-2 row-span-1 md:col-span-2 md:row-span-1 md:col-start-3 md:row-start-3",
    cardLabel: "商业插画海报",
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
    <section className="w-full min-h-[82vh] bg-white flex items-center justify-center px-4 py-6 md:px-12 md:py-10 relative">
      <div className="w-full max-w-6xl grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 auto-rows-[150px] md:auto-rows-[210px]">
        {categories.map((item, i) => {
          const isBjd = item.id === "bjd";
          const centerLabel = (item as { cardLabel?: string }).cardLabel || item.labelCn || item.label;
          const labelSizeClass =
            centerLabel.length >= 7
              ? "text-[14px] md:text-[18px]"
              : "text-[16px] md:text-[20px]";

          const Content = (
            <motion.div
              className={`relative w-full h-full overflow-hidden rounded-[22px] ${isBjd ? "cursor-default" : "group cursor-pointer"}`}
              initial={{ opacity: 0, scale: 0.97, y: 18 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, margin: "240px" }}
              transition={{ duration: 0.55, ease: "easeOut", delay: i * 0.04 }}
              whileHover={isBjd ? undefined : { scale: 1.015, zIndex: 10 }}
            >
              <img
                src={item.src}
                alt={centerLabel}
                loading={i === 0 ? "eager" : "lazy"}
                fetchPriority={i === 0 ? "high" : "auto"}
                decoding="async"
                className={`w-full h-full transition-transform duration-700 ${
                  !isBjd ? "group-hover:scale-105" : ""
                } ${item.objectFit === "contain" ? "object-contain p-4 md:p-5" : "object-cover"}`}
                referrerPolicy="no-referrer"
              />

              <div className="absolute inset-0 flex items-center justify-center px-4 pointer-events-none">
                <div className="absolute w-[64%] h-[34%] rounded-full bg-black/18 blur-3xl opacity-80" />
                <span
                  className={`relative font-site ${labelSizeClass} leading-none tracking-[0.06em] text-[#F7F3EA] text-center [text-shadow:0_2px_12px_rgba(0,0,0,0.35),0_1px_3px_rgba(0,0,0,0.65)]`}
                >
                  <SplitColorText
                    text={centerLabel}
                    defaultColor="#F7F3EA"
                    fontClass="font-site"
                  />
                </span>
              </div>

              {isBjd && (
                <>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/24 via-transparent to-transparent" />
                  <span className="absolute right-3 bottom-3 font-site text-[12px] md:text-sm tracking-[0.08em] text-white/95 drop-shadow-[0_1px_3px_rgba(0,0,0,0.55)] pointer-events-none">
                    <SplitColorText
                      text="敬请等待"
                      defaultColor="#ffffff"
                      fontClass="font-site"
                    />
                  </span>
                </>
              )}
            </motion.div>
          );

          if (isBjd) {
            return (
              <div key={item.id} className={item.className} aria-disabled="true">
                {Content}
              </div>
            );
          }

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
