import { motion } from "motion/react";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { illustrationImages } from "../content";

const groups = [
  { title: "动漫", images: illustrationImages.slice(0, 13) },
  { title: "影视", images: illustrationImages.slice(13, 26) },
  { title: "游戏", images: illustrationImages.slice(26, 39) },
];

function DiagonalDivider() {
  return (
    <div className="hidden lg:flex items-stretch justify-center px-2">
      <div className="w-px h-full min-h-[560px] bg-gray-300/90 origin-center rotate-[18deg]" />
    </div>
  );
}

function PosterBlock({ title, images }: { title: string; images: string[] }) {
  return (
    <section className="min-w-0">
      <div className="mb-6 md:mb-7 flex items-center gap-4">
        <h2 className="font-site text-[clamp(24px,2.2vw,40px)] tracking-[0.08em] text-[#111827] whitespace-nowrap">
          {title}
        </h2>
        <div className="h-px flex-1 bg-gray-200" />
      </div>

      <div className="grid grid-cols-2 gap-3 md:gap-4">
        {images.map((src, index) => (
          <motion.div
            key={`${title}-${index}`}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.45, ease: "easeOut", delay: index * 0.02 }}
            className={`overflow-hidden rounded-[20px] bg-[#F6F5F1] ${index % 5 === 0 ? "col-span-2" : "col-span-1"}`}
          >
            <img
              src={src}
              alt={`${title} ${index + 1}`}
              loading={index < 4 ? "eager" : "lazy"}
              fetchPriority={index < 2 ? "high" : "auto"}
              decoding="async"
              className={`w-full ${index % 5 === 0 ? "aspect-[16/9]" : "aspect-[3/4]"} object-cover`}
              referrerPolicy="no-referrer"
            />
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export default function IllustrationGallery() {
  return (
    <motion.main
      className="min-h-screen bg-white text-gray-900"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <header className="sticky top-0 z-40 bg-white/92 backdrop-blur-md border-b border-gray-100">
        <div className="w-full px-5 py-5 md:px-10 md:py-6 lg:px-16 flex items-center justify-between gap-6">
          <Link to="/" className="inline-flex items-center gap-2 text-gray-500 hover:text-black transition-colors group">
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            <span className="font-en text-[11px] uppercase tracking-[0.28em]">Back</span>
          </Link>
          <div className="font-site text-[15px] md:text-base tracking-[0.12em] text-[#111827]">绘屿造物</div>
        </div>
      </header>

      <div className="px-5 md:px-10 lg:px-16 pt-8 md:pt-10 pb-16 md:pb-20">
        <div className="max-w-7xl mx-auto space-y-8 md:space-y-10">
          <div className="space-y-3 md:space-y-4">
            <h1 className="font-site text-[clamp(30px,4.2vw,58px)] tracking-[0.05em] text-[#111827] leading-none">商业海报</h1>
            <p className="font-site text-[16px] md:text-[18px] text-[#6B7280] tracking-[0.04em]">动漫 / 影视 / 游戏</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr_auto_1fr] gap-y-10 lg:gap-y-0 lg:gap-x-4 items-start">
            <PosterBlock title={groups[0].title} images={groups[0].images} />
            <DiagonalDivider />
            <PosterBlock title={groups[1].title} images={groups[1].images} />
            <DiagonalDivider />
            <PosterBlock title={groups[2].title} images={groups[2].images} />
          </div>
        </div>
      </div>
    </motion.main>
  );
}
