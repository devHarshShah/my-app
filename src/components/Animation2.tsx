import React, { useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const Animation2 = () => {
  const { scrollYProgress } = useScroll();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.2, 1]);
  const translateY = useTransform(scrollYProgress, [0, 1], ["40%", "0%"]);

  // Transform the clip-path based on scroll progress
  const imageClipPath = useTransform(
    scrollYProgress,
    [0, 1],
    isMobile
      ? ["inset(100% 0% 0% 0%)", "inset(0% 0% 0% 0%)"]
      : ["inset(100% 50% 0% 50%)", "inset(0% 0% 0% 0%)"]
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
  const textY = useTransform(scrollYProgress, [0, 1], ["30%", "0%"]);
  const textOpacity = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <div className="h-[200vh] relative">
      <motion.div
        style={{
          scale,
          translateY,
          clipPath: imageClipPath,
          backgroundImage:
            "url('https://cdn.prod.website-files.com/633ef3c0bd3be81b55ba5334/63529189ef305a5e65dd0575_Dvele-prefab-homes-sticky-home.jpg')",
        }}
        transition={{
          type: "spring",
          stiffness: 30,
          damping: 40,
        }}
        className="fixed inset-0 bg-cover bg-center z-20"
      />
      <motion.div
        style={{
          scale: scale,
          translateY: translateY,
          clipPath: whiteClipPath,
          backgroundColor: "white",
        }}
        transition={{
          type: "spring",
          stiffness: 30,
          damping: 40,
        }}
        className="fixed inset-0"
      />
      <div className="fixed inset-0 flex items-center justify-center z-0">
        <h1 className="md:text-8xl font-bold text-black text-4xl">
          Your Vision
        </h1>
      </div>
      <motion.div
        style={{
          y: textY,
          opacity: textOpacity,
        }}
        transition={{
          type: "spring",
          stiffness: 30,
          damping: 40,
        }}
        className="fixed inset-0 flex items-center justify-center z-30"
      >
        <h2 className="md:text-8xl font-bold text-white text-4xl">
          Our Expertise
        </h2>
      </motion.div>
    </div>
  );
};

export default Animation2;