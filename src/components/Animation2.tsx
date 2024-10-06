import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const Animation2 = () => {
  const { scrollYProgress } = useScroll();

  // Transform the clip-path based on scroll progress
  const imageClipPath = useTransform(
    scrollYProgress,
    [0, 1],
    [
      "inset(100% 50% 0% 50%)", // Initial state: 100px x 100px box in the bottom center
      "inset(0% 0% 0% 0%)", // Final state: entire image visible
    ]
  );

  const whiteClipPath = useTransform(
    scrollYProgress,
    [0, 1],
    [
      "inset(0% 0% 0% 0%)", // Initial state: entire white background visible
      "inset(100% 100% 100% 100%)", // Final state: 100px x 100px box in the bottom center
    ]
  );

  // Transform the text position and opacity based on scroll progress
  const textY = useTransform(scrollYProgress, [0, 1], ["100%", "0%"]);
  const textOpacity = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <div className="h-[200vh] relative">
      <motion.div
        style={{
          clipPath: imageClipPath,
          backgroundImage: "url('/1.jpg')",
        }}
        className="fixed inset-0 bg-cover bg-center z-20"
      />
      <motion.div
        style={{
          clipPath: whiteClipPath,
          backgroundColor: "white",
        }}
        className="fixed inset-0"
      />
      <div className="fixed inset-0 flex items-center justify-center z-0">
        <h1 className="text-8xl font-bold text-black">Your Vision</h1>
      </div>
      <motion.div
        style={{
          y: textY,
          opacity: textOpacity,
        }}
        className="fixed inset-0 flex items-center justify-center z-30"
      >
        <h2 className="text-8xl font-bold text-white">Our Expertise</h2>
      </motion.div>
    </div>
  );
};

export default Animation2;