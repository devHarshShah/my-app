import React, { useEffect, useState, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const Animation2 = () => {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });
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

  const springConfig = {
    type: "spring",
    stiffness: 20,
    damping: 20,
  };

  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.2, 1]);
  const translateY = useTransform(scrollYProgress, [0, 1], ["40%", "0%"]);

  const imageClipPath = useTransform(
    scrollYProgress,
    [0, 1],
    isMobile
      ? ["inset(100% 0% 0% 0%)", "inset(0% 0% 0% 0%)"]
      : ["inset(100% 65% 0% 65%)", "inset(0% 0% 0% 0%)"]
  );

  const whiteClipPath = useTransform(
    scrollYProgress,
    [0, 1],
    ["inset(0% 0% 0% 0%)", "inset(100% 100% 100% 100%)"]
  );

  const textY = useTransform(scrollYProgress, [0, 1], ["30%", "0%"]);
  const textOpacity = useTransform(scrollYProgress, [0, 1], [0, 1]);

  // Transformations for "Your Vision" text with bouncing effect
  const visionTextY = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    ["0%", "-10%", "-20%"]
  );

  // Custom spring configuration for a more bouncy feel

  return (
    <>
      {/* Outer container now has enough height */}
      <div ref={sectionRef} className="h-[200vh] relative">
        {/* The animated background */}
        <motion.div
          style={{
            scale,
            translateY,
            clipPath: imageClipPath,
          }}
          transition={{
            type: "spring",
            stiffness: 50,
            damping: 50,
          }}
          className="fixed inset-0 z-20 overflow-hidden" // Ensure overflow hidden
        >
          <motion.img
            src="IMG_5761.jpg"
            alt="Background"
            className="w-full h-full object-cover" // Use full width and height
            style={{
              scale,
              translateY,
            }}
            transition={{
              type: "spring",
              stiffness: 50,
              damping: 50,
            }}
          />
        </motion.div>

        {/* The white overlay */}
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
        {/* First text with bouncing effect */}
        <motion.div
          style={{
            y: visionTextY,
          }}
          transition={springConfig} // Using spring transition
          className="fixed inset-0 flex items-center justify-center z-0"
        >
          <h1 className="md:text-8xl font-bold text-black text-4xl">
            Your Vision
          </h1>
        </motion.div>
        {/* Second text */}
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

      {/* Final section after animation */}
      <div className="h-[100vh] bg-white z-50 relative">
        <h1 className="text-center pt-24">hehehe</h1>
      </div>
    </>
  );
};

export default Animation2;
