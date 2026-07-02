import { motion } from "motion/react";
import { logoImages } from "../content";

export default function StudioIntro() {
  const homepageLogos = logoImages.slice(0, 18);

  return (
    <section className="w-full bg-white px-5 md:px-10 lg:px-16 py-10 md:py-14">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.7 }}
          className="space-y-8 md:space-y-10"
        >
          <div className="max-w-5xl space-y-5 md:space-y-6 border-t border-gray-200 pt-8 md:pt-10">
            <h2 className="font-zh text-[clamp(26px,4vw,50px)] leading-[1.22] tracking-[0.03em] text-gray-900">
              以造物之心，重塑商业美学。
            </h2>

            <div className="font-zh text-[clamp(17px,1.8vw,28px)] leading-[1.8] tracking-[0.02em] text-gray-700 space-y-3 md:space-y-4">
              <p>绘屿造物（Lumen Auralis）是一家专注品牌构建与视觉传达的先锋设计机构。</p>
              <p>我们将顶尖艺术造诣注入商业逻辑，通过品牌全案、平面VI与商业海报的精准输出，打破平庸，为您的品牌建立不可替代的视觉壁垒与商业溢价。</p>
            </div>
          </div>

          <div className="space-y-4 md:space-y-5">
            <div className="flex items-center gap-4">
              <span className="font-zh text-sm md:text-base tracking-[0.12em] text-gray-500 whitespace-nowrap">
                合作品牌
              </span>
              <div className="h-px flex-1 bg-gray-200" />
            </div>

            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-3 md:gap-4">
              {homepageLogos.map((item) => (
                <div
                  key={item.id}
                  className="h-20 md:h-24 rounded-2xl border border-gray-200 bg-[#faf9f6] flex items-center justify-center p-4 md:p-5 transition-transform duration-300 hover:-translate-y-0.5"
                >
                  <img
                    src={item.src}
                    alt={item.alt || `合作品牌 ${item.id}`}
                    loading="lazy"
                    decoding="async"
                    className="max-w-full max-h-full object-contain opacity-90"
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
