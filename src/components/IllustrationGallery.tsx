import { motion } from "motion/react";
import { useMemo, useRef, useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { illustrationCategories } from "../content";

function shuffleArray(items) {
  const arr = [...items];
  for (let i = arr.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function CategoryPreviewCard({ title, image, to, skew }) {
  const skewClass = skew === "right" ? "after:skew-x-[-18deg]" : "after:skew-x-[18deg]";

  return (
    <Link
      to={to}
      className={`relative min-h-[52vh] lg:min-h-[68vh] overflow-hidden rounded-[28px] group ${skewClass} after:absolute after:inset-y-[-8%] after:right-[-14px] after:w-px after:bg-white/75 last:after:hidden`}
    >
      <img
        src={image}
        alt={title}
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        loading="eager"
        decoding="async"
        referrerPolicy="no-referrer"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent" />
      <div className="absolute inset-0 flex items-center justify-center px-8">
        <div className="absolute w-[58%] h-[24%] rounded-full bg-black/18 blur-3xl opacity-80" />
        <span className="relative font-site text-[clamp(24px,3vw,48px)] tracking-[0.12em] text-[#F6F1E8] [text-shadow:0_2px_10px_rgba(0,0,0,0.35),0_1px_3px_rgba(0,0,0,0.62)]">
          {title}
        </span>
      </div>
    </Link>
  );
}

function IllustrationOverview() {
  const previews = useMemo(
    () =>
      illustrationCategories.map((group) => ({
        ...group,
        preview: group.images[Math.floor(Math.random() * group.images.length)] || "",
      })),
    []
  );

  return (
    <motion.main
      className="min-h-screen bg-white text-gray-900 flex flex-col"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.45 }}
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

      <div className="flex-1 px-5 md:px-10 lg:px-16 py-8 md:py-10 flex items-center">
        <div className="w-full max-w-7xl mx-auto space-y-6 md:space-y-8">
          <div className="space-y-3 md:space-y-4">
            <h1 className="font-site text-[clamp(32px,4.2vw,64px)] tracking-[0.05em] text-[#111827] leading-none">商业海报</h1>
            <p className="font-site text-[15px] md:text-[17px] text-[#6B7280] tracking-[0.06em]">动漫 / 影视 / 游戏</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-5 items-stretch">
            <CategoryPreviewCard title="动漫" image={previews[0].preview} to="/illustration/anime" skew="right" />
            <CategoryPreviewCard title="影视" image={previews[1].preview} to="/illustration/film" skew="left" />
            <CategoryPreviewCard title="游戏" image={previews[2].preview} to="/illustration/game" skew="right" />
          </div>
        </div>
      </div>
    </motion.main>
  );
}

function IllustrationCategoryGallery() {
  const { category = "" } = useParams();
  const group = illustrationCategories.find((item) => item.key === category);

  const images = useMemo(() => (group ? shuffleArray(group.images) : []), [group]);
  const [visibleCount, setVisibleCount] = useState(9);
  const loaderRef = useRef(null);

  useEffect(() => {
    setVisibleCount(9);
  }, [category]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && visibleCount < images.length) {
          setVisibleCount((prev) => Math.min(prev + 9, images.length));
        }
      },
      { threshold: 0.1, rootMargin: "300px" }
    );

    if (loaderRef.current) observer.observe(loaderRef.current);
    return () => observer.disconnect();
  }, [visibleCount, images.length]);

  if (!group) {
    return <IllustrationOverview />;
  }

  return (
    <motion.main
      className="min-h-screen bg-white text-gray-900"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.45 }}
    >
      <header className="sticky top-0 z-40 bg-white/92 backdrop-blur-md border-b border-gray-100">
        <div className="w-full px-5 py-5 md:px-10 md:py-6 lg:px-16 flex items-center justify-between gap-6">
          <Link to="/illustration" className="inline-flex items-center gap-2 text-gray-500 hover:text-black transition-colors group">
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            <span className="font-en text-[11px] uppercase tracking-[0.28em]">Back</span>
          </Link>
          <div className="font-site text-[15px] md:text-base tracking-[0.12em] text-[#111827]">{group.title}</div>
        </div>
      </header>

      <div className="px-5 md:px-10 lg:px-16 pt-8 md:pt-10 pb-16 md:pb-20">
        <div className="max-w-7xl mx-auto space-y-8 md:space-y-10">
          <div className="space-y-3 md:space-y-4">
            <h1 className="font-site text-[clamp(30px,4vw,58px)] tracking-[0.05em] text-[#111827] leading-none">{group.title}</h1>
            <p className="font-site text-[15px] md:text-[17px] text-[#6B7280] tracking-[0.06em]">随机序列展示</p>
          </div>

          <div className="columns-2 md:columns-3 gap-3 md:gap-4 [column-fill:_balance]">
            {images.slice(0, visibleCount).map((src, index) => (
              <motion.div
                key={`${group.key}-${index}-${src}`}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.45, ease: "easeOut", delay: index * 0.01 }}
                className="mb-3 md:mb-4 break-inside-avoid overflow-hidden rounded-[22px] bg-[#F6F5F1]"
              >
                <img
                  src={src}
                  alt={`${group.title} ${index + 1}`}
                  loading={index < 4 ? "eager" : "lazy"}
                  fetchPriority={index < 2 ? "high" : "auto"}
                  decoding="async"
                  className="w-full h-auto object-cover"
                  referrerPolicy="no-referrer"
                />
              </motion.div>
            ))}
          </div>

          <div ref={loaderRef} className="w-full h-20 flex justify-center items-center mt-8">
            {visibleCount < images.length && (
              <div className="w-6 h-6 border-2 border-gray-100 border-t-gray-400 rounded-full animate-spin" />
            )}
          </div>
        </div>
      </div>
    </motion.main>
  );
}

export default function IllustrationGallery() {
  const { category } = useParams();
  return category ? <IllustrationCategoryGallery /> : <IllustrationOverview />;
}
