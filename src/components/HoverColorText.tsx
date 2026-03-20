import { motion } from "motion/react";
import React, { useState, useRef } from "react";

// Softer Traditional Chinese Colors (Morandi-esque / Muted)
const traditionalColors = [
  "#E0C8D1", // 藕荷 (Pale Lotus)
  "#BACAC6", // 天青 (Muted Celadon)
  "#DEC674", // 秋香 (Autumn Fragrance)
  "#B598A1", // 香色 (Incense)
  "#8A9DC2", // 远山蓝 (Distant Mountain Blue)
  "#C7B3E5", // 紫藤 (Wisteria)
  "#A4CAB6", // 竹绿 (Soft Bamboo)
  "#E8B3B3", // 桃夭 (Soft Peach)
];

const HoverColorText: React.FC<{ children: React.ReactNode, className?: string, defaultColor?: string }> = ({ children, className = "", defaultColor = "currentColor" }) => {
  const [color, setColor] = useState(defaultColor);
  const [duration, setDuration] = useState(0.6);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleHoverStart = () => {
    // Clear any pending revert to ensure the new hover takes precedence
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    
    // Pick a random color
    const randomColor = traditionalColors[Math.floor(Math.random() * traditionalColors.length)];
    
    // Fast, responsive entry
    setDuration(0.4); 
    setColor(randomColor);
  };

  const handleHoverEnd = () => {
    // Fixed delay of 1.5 seconds
    const delay = 1500;
    
    // Fixed revert duration of 2 seconds for a smooth fade
    const revertDuration = 2.0;

    timeoutRef.current = setTimeout(() => {
      setDuration(revertDuration);
      setColor(defaultColor);
    }, delay);
  };

  return (
    <motion.span
      onHoverStart={handleHoverStart}
      onHoverEnd={handleHoverEnd}
      animate={{ color }}
      transition={{ duration: duration, ease: "easeInOut" }}
      className={`cursor-pointer inline ${className}`}
    >
      {children}
    </motion.span>
  );
}

export default HoverColorText;

export const SplitColorText: React.FC<{ text: string, className?: string, defaultColor?: string }> = ({ text, className = "", defaultColor = "currentColor" }) => {
  return (
    <span className={className}>
      {text.split("").map((char, i) => (
        <HoverColorText key={i} defaultColor={defaultColor}>{char}</HoverColorText>
      ))}
    </span>
  );
}
