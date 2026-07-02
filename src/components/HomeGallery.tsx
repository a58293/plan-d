import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { homeCategories } from "../content";

type HomeCategory = (typeof homeCategories)[number];

type WorkTile = {
  id: string;
  title: string;
  label: string;
  subtitle: string;
  className: string;
  imageClassName?: string;
  category: HomeCategory;
};

const services = [
  { no: "01", title: "品牌构建", en: "Brand Strategy" },
  { no: "02", title: "视觉传达", en: "Visual Identity" },
  { no: "03", title: "VI设计", en: "Visual Identity" },
  { no: "04", title: "商业插画", en: "Illustration" },
  { no: "05", title: "海报设计", en: "Poster Design" },
  { no: "06", title: "品牌设计", en: "Brand Design" },
];

function getCategory(id: string) {
  const matched = homeCategories.find((item) => item.id === id);
  if (!matched) throw new Error(`Missing home category: ${id}`);
  return matched;
}

function SmartLink({
  category,
  className,
  children,
}: {
  category: HomeCategory;
  className?: string;
  children: React.ReactNode;
}) {
  if (category.href) {
    return (
      <a href={category.href} target="_blank" rel="noopener noreferrer" className={className}>
        {children}
      </a>
    );
  }

  if (category.link) {
    return (
      <Link to={category.link} className={className}>
        {children}
      </Link>
    );
  }

  return <div className={className}>{children}</div>;
}

function BrandMark({ logo }: { logo: HomeCategory }) {
  return (
    <div className="flex items-center gap-4 md:gap-5">
      <div className="h-12 w-12 md:h-14 md:w-14 flex items-center justify-center">
        <img
          src={logo.src}
          alt="绘屿造物 Logo"
          className="max-h-full max-w-full object-contain"
          loading="eager"
          fetchPriority="high"
          decoding="async"
          referrerPolicy="no-referrer"
        />
      </div>
      <div className="flex items-center gap-3 md:gap-4">
        <span className="font-site text-[20px] md:text-[24px] tracking-[0.22em] text-[#111827] whitespace-nowrap">
          绘屿造物
        </span>
        <span className="hidden sm:inline-block h-5 w-px bg-[#D8D3C9]" />
        <span className="hidden sm:inline-block font-en text-[12px] md:text-[13px] tracking-[0.08em] text-[#334155] whitespace-nowrap">
          LUMEN AURALIS
        </span>
      </div>
    </div>
  );
}

function WorkTileCard({ tile, index }: { tile: WorkTile; index: number }) {
  return (
    <SmartLink
      category={tile.category}
      className={`group relative block min-h-[210px] overflow-hidden bg-[#E9E5DD] ring-1 ring-[#E5DED2] transition-all duration-500 hover:ring-[#CFC5B7] ${tile.className}`}
    >
      <motion.div
        className="relative h-full w-full"
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "160px" }}
        transition={{ duration: 0.68, ease: "easeOut", delay: index * 0.045 }}
      >
        <img
          src={tile.category.src}
          alt={tile.title}
          loading={index < 2 ? "eager" : "lazy"}
          fetchPriority={index < 2 ? "high" : "auto"}
          decoding="async"
          referrerPolicy="no-referrer"
          className={`h-full w-full object-cover saturate-[0.72] contrast-[0.94] brightness-[0.98] transition-transform duration-700 group-hover:scale-[1.025] ${tile.imageClassName ?? ""}`}
        />

        <div className="absolute inset-0 bg-gradient-to-t from-[#111827]/42 via-[#111827]/6 to-transparent opacity-70 transition-opacity duration-500 group-hover:opacity-82" />

        <div className="absolute left-4 top-4 md:left-5 md:top-5">
          <span className="font-en text-[9px] uppercase tracking-[0.24em] text-white/70 md:text-[10px]">
            {tile.subtitle}
          </span>
        </div>

        <div className="absolute inset-x-0 bottom-0 p-4 md:p-5">
          <div className="mb-3 h-px w-10 bg-white/60" />
          <h3 className="font-site text-[18px] leading-none tracking-[0.12em] text-[#F8F3EA] md:text-[22px] lg:text-[26px] [text-shadow:0_2px_12px_rgba(0,0,0,0.26)]">
            {tile.label}
          </h3>
        </div>
      </motion.div>
    </SmartLink>
  );
}

export default function HomeGallery() {
  const logo = getCategory("logo");

  const tiles: WorkTile[] = [
    {
      id: "installation",
      title: "品牌设计",
      label: "品牌设计",
      subtitle: "Brand Design",
      category: getCategory("installation"),
      className: "md:col-span-2 lg:col-start-2 lg:col-end-8 lg:row-start-1 lg:row-end-4",
    },
    {
      id: "bjd",
      title: "球形关节人偶",
      label: "球形关节人偶",
      subtitle: "BJD Project",
      category: getCategory("bjd"),
      className: "md:col-span-1 lg:col-start-8 lg:col-end-13 lg:row-start-1 lg:row-end-6",
      imageClassName: "object-[50%_42%]",
    },
    {
      id: "graphic",
      title: "VI设计",
      label: "VI设计",
      subtitle: "Visual Identity",
      category: getCategory("graphic"),
      className: "md:col-span-1 lg:col-start-1 lg:col-end-5 lg:row-start-4 lg:row-end-7",
    },
    {
      id: "illustration",
      title: "商业插画",
      label: "商业插画",
      subtitle: "Illustration",
      category: getCategory("illustration"),
      className: "md:col-span-1 lg:col-start-5 lg:col-end-10 lg:row-start-4 lg:row-end-8",
      imageClassName: "object-center",
    },
    {
      id: "spatial",
      title: "装置艺术",
      label: "装置艺术",
      subtitle: "Spatial Installation",
      category: getCategory("spatial"),
      className: "md:col-span-2 lg:col-start-3 lg:col-end-12 lg:row-start-8 lg:row-end-11",
      imageClassName: "object-[50%_44%]",
    },
  ];

  return (
    <section className="w-full min-h-screen overflow-hidden bg-[#F8F7F3] text-[#111827]">
      <div className="mx-auto flex min-h-screen w-full max-w-[1760px] flex-col px-5 py-7 md:px-10 lg:px-16 xl:px-20">
        <header className="flex items-center justify-between gap-6">
          <BrandMark logo={logo} />

          <div className="font-en text-[12px] md:text-[13px] tracking-[0.12em] text-[#111827] whitespace-nowrap">
            CN <span className="text-[#9A968F]">/ EN</span>
          </div>
        </header>

        <div className="grid flex-1 grid-cols-1 gap-12 pt-12 lg:grid-cols-[41%_59%] lg:gap-14 lg:pt-10 xl:gap-16">
          <motion.div
            className="flex flex-col justify-center lg:pb-10"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.72, ease: "easeOut" }}
          >
            <p className="font-en text-[12px] uppercase tracking-[0.16em] text-[#4B5563] md:text-[14px]">
              LUMEN AURALIS STUDIO
            </p>

            <h1 className="mt-10 max-w-[760px] font-site text-[clamp(54px,7.1vw,116px)] leading-[1.06] tracking-[0.035em] text-[#0F172A]">
              <span className="block">以造物之心，</span>
              <span className="block">重塑商业美学</span>
            </h1>

            <div className="mt-16 max-w-[860px] border-t border-[#DDD8CE] pt-8">
              <div className="grid grid-cols-2 gap-y-7 sm:grid-cols-3 lg:grid-cols-6 lg:gap-y-0">
                {services.map((service, index) => (
                  <div
                    key={service.no}
                    className={`pr-4 ${index > 0 ? "lg:border-l lg:border-[#DDD8CE] lg:pl-6" : ""}`}
                  >
                    <div className="font-en text-[11px] tracking-[0.08em] text-[#64707D]">{service.no}</div>
                    <div className="mt-3 font-site text-[15px] tracking-[0.06em] text-[#111827]">
                      {service.title}
                    </div>
                    <div className="mt-1 font-en text-[11px] leading-snug tracking-[0.02em] text-[#7A838D]">
                      {service.en}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <Link
              to="/graphic"
              className="group mt-12 inline-flex w-fit items-center gap-8 font-site text-[17px] tracking-[0.12em] text-[#111827]"
            >
              <span>探索更多服务</span>
              <span className="relative inline-flex h-px w-16 bg-[#111827] transition-all duration-300 group-hover:w-24">
                <span className="absolute right-0 top-1/2 h-2 w-2 -translate-y-1/2 rotate-45 border-r border-t border-[#111827]" />
              </span>
            </Link>
          </motion.div>

          <div className="flex items-center lg:justify-end lg:pt-3">
            <div className="relative grid w-full grid-cols-1 gap-4 md:grid-cols-2 md:gap-5 lg:h-[76vh] lg:min-h-[640px] lg:grid-cols-12 lg:grid-rows-10 lg:gap-3 lg:before:absolute lg:before:left-[0.5%] lg:before:top-[12%] lg:before:h-[72%] lg:before:w-px lg:before:bg-[#DDD8CE] lg:after:absolute lg:after:left-[18%] lg:after:bottom-[0] lg:after:h-px lg:after:w-[64%] lg:after:bg-[#DDD8CE]">
              {tiles.map((tile, index) => (
                <WorkTileCard key={tile.id} tile={tile} index={index} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
