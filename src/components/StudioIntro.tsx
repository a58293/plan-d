import { motion } from "motion/react";
import { SplitColorText } from "./HoverColorText";

export default function StudioIntro() {
  return (
    <section className="w-full bg-white px-4 sm:px-6 md:px-10 lg:px-16 py-4 md:py-6">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="min-h-[100svh] md:h-[100svh] overflow-hidden flex flex-col"
        >
          <div className="shrink-0 border-b border-gray-900/40 pb-3 md:pb-4">
            <h2 className="font-en uppercase text-gray-900 leading-none tracking-[0.14em] text-[clamp(26px,5vw,72px)] whitespace-nowrap">
              <SplitColorText text="ART · CRAFT · CULTURE" defaultColor="#111827" fontClass="font-en" />
            </h2>
          </div>

          <div className="grid flex-1 min-h-0 grid-cols-1 md:grid-cols-2 gap-5 md:gap-10 pt-4 md:pt-6">
            <div className="min-h-0 flex flex-col justify-center">
              <h3 className="font-en uppercase text-gray-900 leading-none tracking-[0.12em] text-[clamp(24px,3.2vw,56px)] mb-4 md:mb-5">
                <SplitColorText text="PLAN D" defaultColor="#111827" fontClass="font-en" />
              </h3>

              <div
                lang="en"
                className="font-en text-gray-800 text-[clamp(14px,1.4vw,26px)] leading-[1.35] tracking-[0.06em] space-y-3 md:space-y-4"
              >
                <p>
                  <SplitColorText
                    text="In a world growing fast and complex, Plan D seeks to be a quiet, luminous presence."
                    defaultColor="#1f2937"
                    fontClass="font-en"
                  />
                </p>
                <p>
                  <SplitColorText
                    text="A space where stories are shared, to inspire and empower."
                    defaultColor="#1f2937"
                    fontClass="font-en"
                  />
                </p>
                <p>
                  <SplitColorText
                    text="Through Art, Craft, and Culture, we carry forward Love, Beauty, and Imagination."
                    defaultColor="#1f2937"
                    fontClass="font-en"
                  />
                </p>
              </div>
            </div>

            <div className="min-h-0 flex flex-col justify-center border-t md:border-t-0 md:border-l border-gray-900/20 pt-5 md:pt-0 md:pl-10">
              <h3 className="font-en uppercase text-gray-900 leading-none tracking-[0.12em] text-[clamp(24px,3.2vw,56px)] mb-4 md:mb-5">
                <SplitColorText text="PLAN D" defaultColor="#111827" fontClass="font-en" />
              </h3>

              <div
                lang="zh-CN"
                className="font-zh text-gray-800 text-[clamp(16px,1.55vw,30px)] leading-[1.5] tracking-[0.04em] space-y-3 md:space-y-4"
              >
                <p>
                  <SplitColorText
                    text="Plan D 是一处持续实验的创作空间。"
                    defaultColor="#1f2937"
                    fontClass="font-zh"
                  />
                </p>
                <p>
                  <SplitColorText
                    text="关注艺术、工艺与文化的连接，探寻创作者在当下的表达。"
                    defaultColor="#1f2937"
                    fontClass="font-zh"
                  />
                </p>
                <p>
                  <SplitColorText
                    text="在喧嚣的世界里，我们选择缓慢、专注与长期。"
                    defaultColor="#1f2937"
                    fontClass="font-zh"
                  />
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
