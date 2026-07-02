import { motion } from "motion/react";
import { useMemo, useRef, useState, useEffect } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { SplitColorText } from "./HoverColorText";
import { illustrationCategories } from "../content";

function shuffleArray<T>(items: T[]) {
  const arr = [...items];
  for (let i = arr.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function checkImageExists(src: string) {
  return new Promise<boolean>((resolve) => {
    const img = new Image();
    img.onload = () => resolve(true);
    img.onerror = () => resolve(false);
    img.src = src;
  });
}

function useResolvedIllustrationGroups() {
  const [resolvedGroups, setResolvedGroups] = useState(
    illustrationCategories.map((group) => ({ ...group, images: [] as string[] }))
  );

  useEffect(() => {
    let cancelled = false;

    const run = async () => {
      const next = await Promise.all(
        illustrationCategories.map(async (group) => {
          const checks = await Promise.all(
            group.images.map(async (src) => ((await checkImageExists(src)) ? src : null))
          );
          return {
            ...group,
            images: Array.from(new Set(checks.filter(Boolean) as string[])),
          };
        })
      );

      if (!cancelled) {
        setResolvedGroups(next);
      }
    };

    run();

    return () => {
      cancelled = true;
    };
  }, []);

  return resolvedGroups;
}

function PreviewMedia({ src, alt }: { src?: string; alt: string }) {
  const [broken, setBroken] = useState(false);

  if (!src || broken) {
    return (
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.18),rgba(0,0,0,0.08)),linear-gradient(180deg,#F2F1ED_0%,#DDDAD2_100%)]" />
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
      loading="eager"
      decoding="async"
      referrerPolicy="no-referrer"
      onError={() => setBroken(true)}
    />
  );
}

function PageBack() {
  return (
    <Link to="/" className="inline-flex items-center gap-2 text-gray-500 hover:text-black transition-colors group">
      <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
      <span className="font-en text-[11px] uppercase tracking-[0.28em]">
        <SplitColorText text="Back" defaultColor="#6B7280" fontClass="font-en" />
      </span>
    </Link>
  );
}

function OverviewCard({
  title,
  image,
  to,
}: {
  title: string;
  image?: string;
  to: string;
}) {
  return (
    <Link
      to={to}
      className="group relative min-h-[52vh] lg:min-h-[68vh] overflow-hidden rounded-[28px]"
    >
      <PreviewMedia src={image} alt={title} />
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/8 to-transparent" />
      <div className="absolute inset-0 flex items-center justify-center px-8">
        <div className="absolute w-[58%] h-[24%] rounded-full bg-black/18 blur-3xl opacity-80" />
        <span className="relative font-site text-[clamp(24px,3vw,48px)] tracking-[0.12em] text-[#F6F1E8] [text-shadow:0_2px_10px_rgba(0,0,0,0.35),0_1px_3px_rgba(0,0,0,0.62)]">
          <SplitColorText text={title} defaultColor="#F6F1E8" fontClass="font-site" />
        </span>
      </div>
    </Link>
  );
}

function DiagonalSeparators() {
  return (
    <div className="pointer-events-none absolute inset-0 hidden lg:block">
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
        <line x1="38" y1="-4" x2="24" y2="104" stroke="rgba(255,255,255,0.8)" strokeWidth="0.18" />
        <line x1="70" y1="-4" x2="56" y2="104" stroke="rgba(255,255,255,0.8)" strokeWidth="0.18" />
      </svg>
    </div>
  );
}

function IllustrationOverview() {
  const groups = useResolvedIllustrationGroups();

  const previews = useMemo(
    () =>
      groups.map((group) => ({
        ...group,
        preview:
          group.images.length > 0
            ? group.images[Math.floor(Math.random() * group.images.length)]
            : undefined,
      })),
    [groups]
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
          <PageBack />
          <div className="font-site text-[15px] md:text-base tracking-[0.12em] text-[#111827]">
            <SplitColorText text="绘屿造物" defaultColor="#111827" fontClass="font-site" />
          </div>
        </div>
      </header>

      <div className="flex-1 px-5 py-8 md:px-10 md:py-10 lg:px-16 flex items-center">
        <div className="w-full max-w-7xl mx-auto space-y-7 md:space-y-9">
          <div className="space-y-3 md:space-y-4">
            <h1 className="font-site text-[clamp(32px,4.2vw,64px)] tracking-[0.05em] text-[#111827] leading-none">
              <SplitColorText text="商业海报" defaultColor="#111827" fontClass="font-site" />
            </h1>
            <p className="font-site text-[15px] md:text-[17px] text-[#6B7280] tracking-[0.06em]">
              <SplitColorText text="动漫 / 影视 / 游戏" defaultColor="#6B7280" fontClass="font-site" />
            </p>
          </div>

          <div className="relative grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-5 items-stretch">
            <DiagonalSeparators />
            <OverviewCard title="动漫" image={previews.find((g) => g.key === "anime")?.preview} to="/illustration/anime" />
            <OverviewCard title="影视" image={previews.find((g) => g.key === "film")?.preview} to="/illustration/film" />
            <OverviewCard title="游戏" image={previews.find((g) => g.key === "game")?.preview} to="/illustration/game" />
          </div>
        </div>
      </div>
    </motion.main>
  );
}

function IllustrationCategoryGallery() {
  const { category = "" } = useParams();
  const groups = useResolvedIllustrationGroups();
  const group = groups.find((item) => item.key === category);
  const location = useLocation();

  const images = useMemo(() => (group ? shuffleArray(group.images) : []), [group, location.key]);
  const [visibleCount, setVisibleCount] = useState(9);
  const loaderRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setVisibleCount(9);
  }, [category]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting && visibleCount < images.length) {
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
            <span className="font-en text-[11px] uppercase tracking-[0.28em]">
              <SplitColorText text="Back" defaultColor="#6B7280" fontClass="font-en" />
            </span>
          </Link>
          <div className="font-site text-[15px] md:text-base tracking-[0.12em] text-[#111827]">
            <SplitColorText text={group.title} defaultColor="#111827" fontClass="font-site" />
          </div>
        </div>
      </header>

      <div className="px-5 md:px-10 lg:px-16 pt-8 md:pt-10 pb-16 md:pb-20">
        <div className="max-w-7xl mx-auto space-y-8 md:space-y-10">
          <div className="space-y-3 md:space-y-4">
            <h1 className="font-site text-[clamp(30px,4vw,58px)] tracking-[0.05em] text-[#111827] leading-none">
              <SplitColorText text={group.title} defaultColor="#111827" fontClass="font-site" />
            </h1>
            <p className="font-site text-[15px] md:text-[17px] text-[#6B7280] tracking-[0.06em]">
              <SplitColorText
                text={group.images.length > 0 ? "随机序列展示" : "将图片放入对应文件夹后，这里会自动读取并随机展示"}
                defaultColor="#6B7280"
                fontClass="font-site"
              />
            </p>
          </div>

          {images.length > 0 ? (
            <>
              <div className="columns-2 md:columns-3 gap-3 md:gap-4 [column-fill:_balance]">
                {images.slice(0, visibleCount).map((src, index) => (
                  <motion.div
                    key={`${group.key}-${src}-${index}`}
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.45, delay: index * 0.02 }}
                    className="mb-3 md:mb-4 break-inside-avoid overflow-hidden rounded-[20px] bg-[#F4F2EC]"
                  >
                    <img
                      src={src}
                      alt={`${group.title}-${index + 1}`}
                      className="w-full h-auto object-cover"
                      loading="lazy"
                      decoding="async"
                      referrerPolicy="no-referrer"
                    />
                  </motion.div>
                ))}
              </div>

              {visibleCount < images.length && <div ref={loaderRef} className="h-10" />}
            </>
          ) : (
            <div className="rounded-[24px] border border-dashed border-gray-200 bg-[#FBFAF7] px-6 py-14 md:px-10 md:py-20 text-center">
              <p className="font-site text-[16px] md:text-[18px] leading-[1.9] tracking-[0.04em] text-[#6B7280]">
                <SplitColorText
                  text={`请在 public/images/illustration/${group.key}/ 中放入 001.jpg / 001.webp 这类顺序编号图片。`}
                  defaultColor="#6B7280"
                  fontClass="font-site"
                />
              </p>
            </div>
          )}
        </div>
      </div>
    </motion.main>
  );
}

export default function IllustrationGallery() {
  const { category } = useParams();
  return category ? <IllustrationCategoryGallery /> : <IllustrationOverview />;
}
