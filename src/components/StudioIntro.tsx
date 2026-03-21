import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { SplitColorText } from "./HoverColorText";

export default function StudioIntro() {
  return (
    <section className="w-full bg-white py-24 px-6 md:px-12 lg:px-24 relative">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="space-y-16"
        >
          {/* English Section */}
          <div className="space-y-16">
            <h2 
              className="font-mincho font-black uppercase text-4xl md:text-6xl tracking-[0.15em] text-gray-900 leading-tight"
            >
              <SplitColorText text="ART · CRAFT · CULTURE" defaultColor="#111827" />
            </h2>
            <div 
              className="font-mincho font-black text-2xl md:text-4xl leading-[1.5] md:leading-[1.2] text-gray-800 space-y-12 tracking-widest max-w-6xl"
            >
              <div className="space-y-2">
                <p className="block">
                  <SplitColorText 
                    text="In a world growing fast and complex," 
                    defaultColor="#1f2937" 
                  />
                </p>
                <p className="block">
                  <SplitColorText 
                    text="Plan D seeks to be a quiet, luminous presence." 
                    defaultColor="#1f2937" 
                  />
                </p>
              </div>

              <div className="space-y-2">
                <p className="block">
                  <SplitColorText 
                    text="A space where stories are shared," 
                    defaultColor="#1f2937" 
                  />
                </p>
                <p className="block">
                  <SplitColorText 
                    text="to inspire and empower." 
                    defaultColor="#1f2937" 
                  />
                </p>
              </div>

              <div className="space-y-2">
                <p className="block">
                  <SplitColorText 
                    text="Through Art, Craft, and Culture," 
                    defaultColor="#1f2937" 
                  />
                </p>
                <p className="block">
                  <SplitColorText 
                    text="we carry forward Love, Beauty, and Imagination." 
                    defaultColor="#1f2937" 
                  />
                </p>
              </div>
            </div>
          </div>

          {/* Chinese Section */}
          <div className="space-y-16 pt-32 border-t-2 border-gray-900">
            <h2 
              className="font-mincho font-black uppercase text-4xl md:text-6xl tracking-[0.15em] text-gray-900 leading-tight"
            >
              <SplitColorText text="PLAN D" defaultColor="#111827" />
            </h2>
            <div 
              className="font-mincho font-black text-2xl md:text-4xl leading-[1.5] md:leading-[1.2] text-gray-800 space-y-12 tracking-widest max-w-6xl"
            >
              <div className="space-y-2">
                <p className="block">
                  <SplitColorText 
                    text="Plan D 是一处持续实验的创作空间。" 
                    defaultColor="#1f2937" 
                  />
                </p>
              </div>

              <div className="space-y-2">
                <p className="block">
                  <SplitColorText 
                    text="关注艺术、工艺与文化的连接，" 
                    defaultColor="#1f2937" 
                  />
                </p>
                <p className="block">
                  <SplitColorText 
                    text="探寻创作者在当下的表达。" 
                    defaultColor="#1f2937" 
                  />
                </p>
              </div>

              <div className="space-y-2">
                <p className="block">
                  <SplitColorText 
                    text="在喧嚣的世界里，" 
                    defaultColor="#1f2937" 
                  />
                </p>
                <p className="block">
                  <SplitColorText 
                    text="我们选择缓慢、专注与长期。" 
                    defaultColor="#1f2937" 
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
