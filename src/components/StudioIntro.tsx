import { motion } from "motion/react";
import { logoImages } from "../content";

export default function StudioIntro() {
  const homepageLogos = logoImages;

  return (
    <section className="w-full bg-white px-5 md:px-10 lg:px-16 py-10 md:py-14">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.7 }}
          className="space-y-10 md:space-y-12"
        >
          <div className="max-w-5xl border-t border-gray-200 pt-8 md:pt-10">
            <div className="space-y-4 md:space-y-5">
              <h2 className="font-site text-[clamp(28px,4.3vw,58px)] leading-[1.18] tracking-[0.015em] text-[#111827]">
                以造物之心，重塑商业美学。
              </h2>

              <div className="max-w-[70rem] space-y-3 md:space-y-4 text-[#3B4352]">
                <p className="font-site text-[clamp(17px,1.7vw,28px)] leading-[1.82] tracking-[0.01em]">
                  绘屿造物（Lumen Auralis）是一家专注品牌构建与视觉传达的先锋设计机构。
                </p>
                <p className="font-site text-[clamp(17px,1.7vw,28px)] leading-[1.82] tracking-[0.01em]">
                  我们将顶尖艺术造诣注入商业逻辑，通过品牌全案、平面VI与商业海报的精准输出。
                </p>
                <p className="font-site text-[clamp(17px,1.7vw,28px)] leading-[1.82] tracking-[0.01em]">
                  打破平庸，为您的品牌建立不可替代的视觉壁垒与商业溢价。
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-5 md:space-y-6">
            <div className="flex items-center gap-4">
              <span className="font-site text-[14px] md:text-[15px] tracking-[0.16em] text-[#7B808A] whitespace-nowrap">
                合作品牌
              </span>
              <div className="h-px flex-1 bg-gray-200" />
            </div>

            <div className="grid grid-cols-3 gap-x-5 gap-y-8 md:gap-x-8 md:gap-y-10">
              {homepageLogos.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-center min-h-[78px] md:min-h-[98px] lg:min-h-[108px] px-1"
                >
                  <img
                    src={item.src}
                    alt={item.alt || `合作品牌 ${item.id}`}
                    loading="lazy"
                    decoding="async"
                    className="max-w-full max-h-[60px] md:max-h-[72px] lg:max-h-[78px] object-contain opacity-95"
                    referrerPolicy="no-referrer"
                  />
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
