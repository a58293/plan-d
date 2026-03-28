import { motion } from "motion/react";
import { SplitColorText } from "./HoverColorText";

const blocks = [
  {
    en: "In a world growing fast and complex, Plan D seeks to be a quiet, luminous presence.",
    zh: "Plan D 是一处持续实验的创作空间。"
  },
  {
    en: "A space where stories are shared, to inspire and empower.",
    zh: "关注艺术、工艺与文化的连接，探寻创作者在当下的表达。"
  },
  {
    en: "Through Art, Craft, and Culture, we carry forward Love, Beauty, and Imagination.",
    zh: "在喧嚣的世界里，我们选择缓慢、专注与长期。"
  }
];

export default function StudioIntro() {
  return (
    <section className="w-full bg-[#f5f4f0] px-5 sm:px-6 md:px-10 lg:px-16 py-10 md:py-12">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
          className="rounded-[28px] border border-black/10 bg-white/45 backdrop-blur-[2px] shadow-[0_8px_30px_rgba(0,0,0,0.04)]"
        >
          <div className="px-5 sm:px-7 md:px-10 lg:px-14 py-6 md:py-8 lg:py-10">
            <div className="flex flex-col gap-4 md:gap-5 border-b border-black/10 pb-5 md:pb-6">
              <div className="hidden md:block">
                <h2 className="font-en uppercase text-[#111827] leading-none tracking-[0.12em] text-[clamp(34px,5vw,86px)]">
                  <SplitColorText text="ART · CRAFT · CULTURE" defaultColor="#111827" fontClass="font-en" />
                </h2>
              </div>

              <div className="md:hidden">
                <div className="flex flex-col gap-2 text-[#111827]">
                  <h2 className="font-en uppercase leading-none tracking-[0.08em] text-[clamp(30px,11vw,48px)]">
                    <SplitColorText text="ART · CRAFT" defaultColor="#111827" fontClass="font-en" />
                  </h2>
                  <h2 className="font-en uppercase leading-none tracking-[0.08em] text-[clamp(30px,11vw,48px)]">
                    <SplitColorText text="CULTURE" defaultColor="#111827" fontClass="font-en" />
                  </h2>
                </div>
              </div>

              <div className="flex items-center justify-between gap-4">
                <p className="font-en uppercase text-[11px] md:text-xs tracking-[0.28em] text-black/55">
                  Studio Introduction
                </p>
                <div className="h-px flex-1 bg-black/10" />
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-[220px_minmax(0,1fr)] gap-7 md:gap-8 lg:gap-12 pt-7 md:pt-8">
              <div className="lg:pt-1">
                <div className="sticky top-8">
                  <h3 className="font-en uppercase text-[#111827] leading-none tracking-[0.1em] text-[clamp(30px,3.2vw,58px)]">
                    <SplitColorText text="PLAN D" defaultColor="#111827" fontClass="font-en" />
                  </h3>
                  <p className="font-zh mt-4 text-[14px] md:text-[15px] leading-[1.8] tracking-[0.03em] text-black/55 max-w-[18rem]">
                    一个关注艺术、工艺与文化连接的创作现场。
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 md:gap-5">
                {blocks.map((item, index) => (
                  <div
                    key={index}
                    className="rounded-[22px] border border-black/8 bg-white/70 px-4 sm:px-5 md:px-6 py-4 md:py-5"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 md:items-start">
                      <div>
                        <p className="font-en text-[#1f2937] text-[clamp(16px,1.45vw,27px)] leading-[1.35] tracking-[0.03em]">
                          <SplitColorText
                            text={item.en}
                            defaultColor="#1f2937"
                            fontClass="font-en"
                          />
                        </p>
                      </div>
                      <div>
                        <p className="font-zh text-[#1f2937] text-[clamp(18px,1.5vw,29px)] leading-[1.58] tracking-[0.02em]">
                          <SplitColorText
                            text={item.zh}
                            defaultColor="#1f2937"
                            fontClass="font-zh"
                          />
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
