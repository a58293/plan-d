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

const navItems = ["首页", "工作", "服务", "关于", "润象", "联系"];

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
        <span className="hidden sm:inline-block font-en text-[12px] md:text-[13px] tracking-[0.06em] text-[#1F2933] whitespace-nowrap">
          LUMEN AURALIS
        </span>
      </div>
    </div>
  );
}

function WorkTileCard({ tile, index }: { tile: WorkTile; index: number }) {
  const isLogoTile = tile.category.id === "logo";

  return (
    <SmartLink category={tile.category} className={`group relative block overflow-hidden bg-[#EEECE7] ${tile.className}`}>
      <motion.div
        className="relative h-full w-full"
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "180px" }}
        transition={{ duration: 0.58, ease: "easeOut", delay: index * 0.04 }}
      >
        <img
          src={tile.category.src}
          alt={tile.title}
          loading={index < 2 ? "eager" : "lazy"}
          fetchPriority={index < 2 ? "high" : "auto"}
          decoding="async"
          referrerPolicy="no-referrer"
          className={`h-full w-full transition-transform duration-700 group-hover:scale-[1.035] ${
            isLogoTile ? "object-contain p-8 md:p-10 bg-[#F5F3EE]" : "object-cover"
          } ${tile.imageClassName ?? ""}`}
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/42 via-black/6 to-transparent opacity-75 transition-opacity duration-500 group-hover:opacity-90" />

        <div className="absolute inset-x-0 bottom-0 p-5 md:p-6 text-[#F7F2EA]">
          <p className="font-en text-[10px] md:text-[11px] tracking-[0.24em] uppercase opacity-80">
            {tile.subtitle || tile.label}
          </p>
          <h3 className="mt-2 font-site text-[clamp(18px,2.1vw,34px)] leading-none tracking-[0.08em] [text-shadow:0_2px_10px_rgba(0,0,0,0.35)]">
            <SplitColorText text={tile.label} defaultColor="#F7F2EA" fontClass="font-site" />
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
      id: "logos",
      title: "品牌标识",
      label: "品牌标识",
      subtitle: "Brand System",
      category: logo,
      className: "col-span-7 row-span-3",
    },
    {
      id: "bjd",
      title: "球形关节人偶",
      label: "球形关节人偶",
      subtitle: "BJD Project",
      category: getCategory("bjd"),
      className: "col-span-5 row-span-5",
    },
    {
      id: "graphic",
      title: "VI设计",
      label: "VI设计",
      subtitle: "Visual Identity",
      category: getCategory("graphic"),
      className: "col-span-3 row-span-4",
    },
    {
      id: "illustration",
      title: "商业插画与海报",
      label: "商业插画",
      subtitle: "Illustration",
      category: getCategory("illustration"),
      className: "col-span-4 row-span-4",
    },
    {
      id: "installation",
      title: "品牌设计",
      label: "品牌设计",
      subtitle: "Brand Design",
      category: getCategory("installation"),
      className: "col-span-5 row-span-3",
    },
    {
      id: "spatial",
      title: "装置艺术设计",
      label: "装置艺术",
      subtitle: "Spatial Installation",
      category: getCategory("spatial"),
      className: "col-span-7 row-span-4",
    },
    {
      id: "mcn",
      title: "模特经纪",
      label: "模特经纪",
      subtitle: "Model Agency",
      category: getCategory("mcn"),
      className: "col-span-5 row-span-4",
    },
  ];

  return (
    <section className="w-full min-h-screen bg-[#FAF9F6] text-[#111827] overflow-hidden">
      <div className="mx-auto flex min-h-screen w-full max-w-[1760px] flex-col px-5 py-7 md:px-10 lg:px-16 xl:px-20">
        <header className="flex items-center justify-between gap-6">
          <BrandMark logo={logo} />

          <nav className="hidden lg:flex items-center gap-12 xl:gap-16 font-site text-[15px] tracking-[0.16em] text-[#111827]">
            {navItems.map((item, index) => (
              <a key={item} href={index === 0 ? "#" : `#${item}`} className="relative pb-3 hover:text-black/70 transition-colors">
                <SplitColorText text={item} defaultColor="#111827" fontClass="font-site" />
                {index === 0 && <span className="absolute left-1/2 bottom-0 h-px w-7 -translate-x-1/2 bg-[#111827]" />}
              </a>
            ))}
          </nav>

          <div className="font-en text-[12px] md:text-[13px] tracking-[0.12em] text-[#111827] whitespace-nowrap">
            CN <span className="text-[#9A968F]">/ EN</span>
          </div>
        </header>

        <div className="grid flex-1 grid-cols-1 gap-10 pt-14 lg:grid-cols-[44%_56%] lg:gap-12 lg:pt-12 xl:gap-16">
          <motion.div
            className="flex flex-col justify-center lg:pb-8"
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.72, ease: "easeOut" }}
          >
            <p className="font-en text-[12px] md:text-[14px] tracking-[0.12em] text-[#3D4652] uppercase">
              LUMEN AURALIS STUDIO
            </p>

            <h1 className="mt-8 max-w-[760px] font-site text-[clamp(52px,7.4vw,118px)] leading-[1.08] tracking-[0.035em] text-[#111827]">
              <span className="block">
                <SplitColorText text="以造物之心，" defaultColor="#111827" fontClass="font-site" />
              </span>
              <span className="block">
                <SplitColorText text="重塑商业美学" defaultColor="#111827" fontClass="font-site" />
              </span>
            </h1>

            <div className="mt-9 max-w-[760px] space-y-3 font-site text-[17px] leading-[1.9] tracking-[0.045em] text-[#58606B] md:text-[20px]">
              <p>
                <SplitColorText text="绘屿造物（Lumen Auralis）是一家专注品牌构建与视觉传达的先锋设计机构，" defaultColor="#58606B" fontClass="font-site" />
              </p>
              <p>
                <SplitColorText text="我们将顶尖艺术造诣注入商业逻辑，通过品牌全案、平面VI与商业海报的精准输出，" defaultColor="#58606B" fontClass="font-site" />
              </p>
              <p>
                <SplitColorText text="为品牌打造兼具美学表达与市场价值的视觉体系。" defaultColor="#58606B" fontClass="font-site" />
              </p>
            </div>

            <div className="mt-10 h-px w-16 bg-[#111827]/45" />

            <p className="mt-8 max-w-[620px] font-en text-[13px] leading-[1.8] tracking-[0.05em] text-[#8B8E94]">
              We fuse art with strategy to build visual systems that elevate brands and drive meaningful connections in the market.
            </p>

            <div className="mt-12 grid grid-cols-2 gap-y-7 sm:grid-cols-3 lg:grid-cols-6 lg:gap-y-0">
              {services.map((service, index) => (
                <div
                  key={service.no}
                  className={`pr-4 ${index > 0 ? "lg:border-l lg:border-[#D8D3CA] lg:pl-7" : ""}`}
                >
                  <div className="font-en text-[11px] tracking-[0.06em] text-[#5F6670]">{service.no}</div>
                  <div className="mt-3 font-site text-[15px] tracking-[0.06em] text-[#111827]">
                    <SplitColorText text={service.title} defaultColor="#111827" fontClass="font-site" />
                  </div>
                  <div className="mt-1 font-en text-[11px] leading-snug tracking-[0.02em] text-[#7D838C]">{service.en}</div>
                </div>
              ))}
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

          <div className="flex items-center lg:justify-end">
            <div className="grid h-[620px] w-full grid-cols-12 grid-rows-12 gap-1 bg-white p-1 shadow-[0_18px_70px_rgba(24,31,42,0.08)] md:h-[700px] lg:h-[78vh] lg:min-h-[620px]">
              {tiles.map((tile, index) => (
                <WorkTileCard key={tile.id} tile={tile} index={index} />
              ))}

              <Link
                to="/graphic"
                className="group col-span-12 row-span-1 flex items-center justify-between bg-[#132238] px-7 md:px-10 text-[#F4F0EA]"
              >
                <span className="font-en text-[14px] md:text-[16px] tracking-[0.04em]">Selected Works</span>
                <span className="inline-flex items-center gap-8 font-site text-[14px] md:text-[16px] tracking-[0.14em]">
                  <SplitColorText text="查看精选作品" defaultColor="#F4F0EA" fontClass="font-site" />
                  <span className="relative inline-flex h-px w-14 bg-[#F4F0EA] transition-all duration-300 group-hover:w-20">
                    <span className="absolute right-0 top-1/2 h-2 w-2 -translate-y-1/2 rotate-45 border-r border-t border-[#F4F0EA]" />
                  </span>
                </span>
              </Link>
            </div>
          </div>
        </div>

        <footer className="mt-8 hidden border-t border-[#D8D3CA] pt-6 text-[12px] tracking-[0.18em] text-[#8B8E94] md:grid md:grid-cols-3">
          <div className="font-en uppercase">Commercial Aesthetics</div>
          <div className="text-center font-en uppercase">Strategy × Design × Impact</div>
          <div className="text-right font-en uppercase">© Lumen Auralis Studio</div>
        </footer>
      </div>
    </section>
  );
}
