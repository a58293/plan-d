import { motion } from "motion/react";
import { SplitColorText } from "./HoverColorText";

export default function StudioIntro() {
  return (
    <section className="w-full bg-white px-5 md:px-10 lg:px-16 py-8 md:py-10">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="min-h-[100svh] flex flex-col justify-center"
        >
          <div className="space-y-8 md:space-y-10">
            <div className="space-y-8 md:space-y-10">
              <h2 className="font-mincho font-normal uppercase text-gray-900 leading-none">
                <div className="hidden sm:block text-[clamp(24px,4vw,64px)] tracking-[0.12em] whitespace-nowrap">
                  <SplitColorText
                    text="ART · CRAFT · CULTURE"
                    defaultColor="#111827"
                    fontClass="font-mincho"
                  />
                </div>

                <div className="sm:hidden flex flex-col gap-2 text-[clamp(26px,9vw,42px)] tracking-[0.08em]">
                  <div className="flex justify-start">
                    <SplitColorText
                      text="ART · CRAFT"
                      defaultColor="#111827"
                      fontClass="font-mincho"
                    />
                  </div>
                  <div className="flex justify-start">
                    <SplitColorText
                      text="CULTURE"
                      defaultColor="#111827"
                      fontClass="font-mincho"
                    />
                  </div>
                </div>
              </h2>

              <div className="font-mincho font-normal text-[clamp(16px,2vw,30px)] leading-[1.3] text-gray-800 space-y-6 md:space-y-7 tracking-[0.04em] max-w-5xl">
                <div className="space-y-1">
                  <p>
                    <SplitColorText
                      text="In a world growing fast and complex,"
                      defaultColor="#1f2937"
                      fontClass="font-mincho"
                    />
                  </p>
                  <p>
                    <SplitColorText
                      text="Plan D seeks to be a quiet, luminous presence."
                      defaultColor="#1f2937"
                      fontClass="font-mincho"
                    />
                  </p>
                </div>

                <div className="space-y-1">
                  <p>
                    <SplitColorText
                      text="A space where stories are shared,"
                      defaultColor="#1f2937"
                      fontClass="font-mincho"
                    />
                  </p>
                  <p>
                    <SplitColorText
                      text="to inspire and empower."
                      defaultColor="#1f2937"
                      fontClass="font-mincho"
                    />
                  </p>
                </div>

                <div className="space-y-1">
                  <p>
                    <SplitColorText
                      text="Through Art, Craft, and Culture,"
                      defaultColor="#1f2937"
                      fontClass="font-mincho"
                    />
                  </p>
                  <p>
                    <SplitColorText
                      text="we carry forward Love, Beauty, and Imagination."
                      defaultColor="#1f2937"
                      fontClass="font-mincho"
                    />
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-8 md:space-y-10 pt-8 md:pt-10 border-t border-gray-300">
              <h2 className="font-mincho font-normal uppercase text-gray-900 leading-none text-[clamp(24px,4vw,64px)] tracking-[0.12em]">
                <SplitColorText
                  text="PLAN D"
                  defaultColor="#111827"
                  fontClass="font-mincho"
                />
              </h2>

              <div className="font-mincho font-normal text-[clamp(16px,2vw,30px)] leading-[1.45] text-gray-800 space-y-6 md:space-y-7 tracking-[0.03em] max-w-5xl">
                <div className="space-y-1">
                  <p>
                    <SplitColorText
                      text="Plan D 是一处持续实验的创作空间。"
                      defaultColor="#1f2937"
                      fontClass="font-mincho"
                    />
                  </p>
                </div>

                <div className="space-y-1">
                  <p>
                    <SplitColorText
                      text="关注艺术、工艺与文化的连接，"
                      defaultColor="#1f2937"
                      fontClass="font-mincho"
                    />
                  </p>
                  <p>
                    <SplitColorText
                      text="探寻创作者在当下的表达。"
                      defaultColor="#1f2937"
                      fontClass="font-mincho"
                    />
                  </p>
                </div>

                <div className="space-y-1">
                  <p>
                    <SplitColorText
                      text="在喧嚣的世界里，"
                      defaultColor="#1f2937"
                      fontClass="font-mincho"
                    />
                  </p>
                  <p>
                    <SplitColorText
                      text="我们选择缓慢、专注与长期。"
                      defaultColor="#1f2937"
                      fontClass="font-mincho"
                    />
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
