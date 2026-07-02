import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { SplitColorText } from "./HoverColorText";
import { homeCategories } from "../content";

const categoryOverrides = {
  logo: {
    className: "col-span-2 row-span-2 md:col-span-2 md:row-span-2 md:col-start-1 md:row-start-1",
    cardLabel: "",
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
    label: "商业插画与海报",
    className: "col-span-2 row-span-1 md:col-span-2 md:row-span-1 md:col-start-3 md:row-start-3",
    cardLabel: "商业插画与海报",
  },
  mcn: {
    hidden: true,
  },
} as const;

const serviceBlocks = [
  {
    title: "品牌设计",
    lines: [
      "全维构建，定义品牌灵魂。",
      "从顶层策略、核心基因到市场洞察，提供全方位的品牌全案服务。",
      "以全局视角与高级美学，构筑完整的品牌情感生态与长远商业价值。",
    ],
  },
  {
    title: "VI",
    lines: [
      "精准落地，统一视觉符号。",
      "专注高品质的平面VI设计，将品牌理念提炼为兼具格调与严谨规范的平面视觉符号。",
      "确保品牌在所有媒介的触点上，都具备极致的辨识度与统一感。",
    ],
  },
  {
    title: "商业插画与海报",
    lines: [
      "电影级张力，驱动商业转化。",
      "苛求光影与构图美感，为产品发布、活动宣发提供高精度的定制海报。",
      "用磅礴的视觉冲击力，牢牢锁定市场焦点。",
    ],
  },
  {
    title: "艺术装置",
    lines: [
      "跨越维度，沉浸式空间叙事。",
      "打破平面限制，为商业空间与品牌大秀打造先锋艺术装置。",
      "将抽象的品牌理念转化为可触碰的震撼体验。",
    ],
  },
];

function ServiceText({ text, className = "", defaultColor = "#111827" }: { text: string; className?: string; defaultColor?: string }) {
  return <SplitColorText text={text} defaultColor={defaultColor} fontClass={className} />;
}

export default function HomeGallery() {
  const categories = homeCategories
    .map((item) => ({
      ...item,
      ...(categoryOverrides[item.id as keyof typeof categoryOverrides] ?? {}),
    }))
    .filter((item) => !(item as { hidden?: boolean }).hidden);

  return (
    <section className="w-full bg-white px-5 py-8 md:px-10 md:py-10 lg:px-16">
      <div className="mx-auto w-full max-w-6xl space-y-8 md:space-y-10">
        <div className="space-y-6 md:space-y-7 border-b border-gray-200 pb-8 md:pb-9">
          <div className="flex items-center gap-4">
            <span className="font-site text-[13px] md:text-[14px] tracking-[0.18em] text-[#8A8F98] whitespace-nowrap">
              <ServiceText text="核心服务" className="font-site" defaultColor="#8A8F98" />
            </span>
            <div className="h-px flex-1 bg-gray-200" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-6 md:gap-y-7">
            {serviceBlocks.map((block) => (
              <div key={block.title} className="space-y-3 md:space-y-4">
                <h2 className="font-site text-[clamp(23px,2.25vw,34px)] leading-none tracking-[0.06em] text-[#111827]">
                  <ServiceText text={block.title} className="font-site" />
                </h2>
                <div className="space-y-2 md:space-y-2.5">
                  {block.lines.map((line) => (
                    <p
                      key={line}
                      className="font-site text-[16px] md:text-[18px] lg:text-[19px] leading-[1.78] tracking-[0.012em] text-[#4B5563]"
                    >
                      <ServiceText text={line} className="font-site" defaultColor="#4B5563" />
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="w-full grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 auto-rows-[150px] md:auto-rows-[210px]">
          {categories.map((item, i) => {
            const isBjd = item.id === "bjd";
            const centerLabel = (item as { cardLabel?: string }).cardLabel || item.labelCn || item.label;
            const shouldShowLabel = item.id !== "logo" && Boolean(centerLabel);

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
                  alt={centerLabel || item.label}
                  loading={i === 0 ? "eager" : "lazy"}
                  fetchPriority={i === 0 ? "high" : "auto"}
                  decoding="async"
                  className={`w-full h-full transition-transform duration-700 ${
                    !isBjd ? "group-hover:scale-105" : ""
                  } ${item.objectFit === "contain" ? "object-contain p-4 md:p-5" : "object-cover"}`}
                  referrerPolicy="no-referrer"
                />

                {shouldShowLabel && (
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
                )}

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
      </div>
    </section>
  );
}
