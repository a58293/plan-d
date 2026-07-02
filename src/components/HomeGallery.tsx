import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { SplitColorText } from "./HoverColorText";
import { homeCategories } from "../content";

type HomeCategory = (typeof homeCategories)[number];

type WorkTile = {
  id: string;
  title: string;
  label: string;
  subtitle?: string;
  className: string;
  mobileClassName?: string;
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
          <SplitColorText text="绘屿造物" defaultColor="#111827" fontClass="font-site" />
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
      className={`group relative block overflow-hidden bg-[#E9E5DD] ${tile.mobileClassName ?? "aspect-[4/3]"} lg:absolute ${tile.className}`}
    >
      <motion.div
        className="relative h-full w-full"
        initial={{ opacity: 0, y: 16 }}
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
          className={`h-full w-full object-cover saturate-[0.82] contrast-[0.96] brightness-[0.96] transition-transform duration-700 group-hover:scale-[1.025] ${tile.imageClassName ?? ""}`}
        />

        <div className="absolute inset-0 bg-gradient-to-t from-[#0D1320]/52 via-[#0D1320]/8 to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-88" />
        <div className="absolute inset-0 ring-1 ring-inset ring-white/60" />

        <div className="absolute inset-x-0 bottom-0 p-4 text-[#F6F1E8] md:p-5 lg:p-6">
          <p className="font-en text-[9px] md:text-[10px] tracking-[0.24em] uppercase opacity-70">
            {tile.subtitle || tile.label}
          </p>
          <h3 className="mt-2 font-site text-[clamp(17px,1.6vw,28px)] leading-[1.1] tracking-[0.1em] [text-shadow:0_2px_12px_rgba(0,0,0,0.28)]">
            <SplitColorText text={tile.label} defaultColor="#F6F1E8" fontClass="font-site" />
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
      className: "left-[7%] top-[4%] h-[24%] w-[48%]",
      mobileClassName: "aspect-[16/9]",
    },
    {
      id: "bjd",
      title: "球形关节人偶",
      label: "球形关节人偶",
      subtitle: "BJD Project",
      category: getCategory("bjd"),
      className: "right-[3%] top-[0%] h-[42%] w-[35%]",
      mobileClassName: "aspect-[3/4]",
      imageClassName: "object-[50%_42%]",
    },
    {
      id: "graphic",
      title: "VI设计",
      label: "VI设计",
      subtitle: "Visual Identity",
      category: getCategory("graphic"),
      className: "left-[0%] top-[36%] h-[24%] w-[28%]",
      mobileClassName: "aspect-[4/3]",
    },
    {
      id: "illustration",
      title: "商业插画",
      label: "商业插画",
      subtitle: "Illustration",
      category: getCategory("illustration"),
      className: "left-[29%] top-[31%] h-[31%] w-[35%]",
      mobileClassName: "aspect-[4/3]",
      imageClassName: "object-center",
    },
    {
      id: "spatial",
      title: "装置艺术",
      label: "装置艺术",
      subtitle: "Spatial Installation",
      category: getCategory("spatial"),
      className: "left-[9%] top-[70%] h-[22%] w-[53%]",
      mobileClassName: "aspect-[16/9]",
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

        <div className="grid flex-1 grid-cols-1 gap-12 pt-12 lg:grid-cols-[41%_59%] lg:gap-12 lg:pt-10 xl:gap-16">
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
              <span className="block">
                <SplitColorText text="以造物之心，" defaultColor="#0F172A" fontClass="font-site" />
              </span>
              <span className="block">
                <SplitColorText text="重塑商业美学" defaultColor="#0F172A" fontClass="font-site" />
              </span>
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
                      <SplitColorText text={service.title} defaultColor="#111827" fontClass="font-site" />
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
              <SplitColorText text="探索更多服务" defaultColor="#111827" fontClass="font-site" />
              <span className="relative inline-flex h-px w-16 bg-[#111827] transition-all duration-300 group-hover:w-24">
                <span className="absolute right-0 top-1/2 h-2 w-2 -translate-y-1/2 rotate-45 border-r border-t border-[#111827]" />
              </span>
            </Link>
          </motion.div>

          <div className="flex items-center lg:justify-end lg:pt-3">
            <div className="relative flex w-full flex-col gap-5 md:gap-6 lg:h-[78vh] lg:min-h-[640px] lg:gap-0 lg:before:absolute lg:before:left-[2%] lg:before:top-[14%] lg:before:h-[70%] lg:before:w-px lg:before:bg-[#DDD8CE] lg:after:absolute lg:after:left-[16%] lg:after:top-[94%] lg:after:h-px lg:after:w-[54%] lg:after:bg-[#DDD8CE]">
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
