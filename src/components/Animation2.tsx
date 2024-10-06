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

  // Smoother scaling animation with a relaxed feel
  const scale = useTransform(scrollYProgress, [0, 0.25, 0.5, 0.75, 1], [1, 1.5, 2, 1.5, 1]);
  const translateY = useTransform(scrollYProgress, [0, 1], ["55%", "0%"]);

  const imageClipPath = useTransform(
    scrollYProgress,
    [0, 1],
    isMobile
      ? ["inset(100% 0% 0% 0%)", "inset(0% 0% 0% 0%)"]
      : ["inset(100% 85% 0% 85%)", "inset(0% 0% 0% 0%)"]
  );

  const whiteClipPath = useTransform(
    scrollYProgress,
    [0, 1],
    [
      "inset(0% 0% 0% 0%)",
      "inset(100% 100% 100% 100%)",
    ]
  );

  const textY = useTransform(scrollYProgress, [0, 1], ["30%", "0%"]);
  const textOpacity = useTransform(scrollYProgress, [0, 1], [0, 1]);

  // Custom easing-based transition for a more relaxed feel
  const smoothTransition = {
    duration: 1.2, // Longer duration for smoother animation
    ease: "easeInOut", // Smooth easing for a relaxed feel
    delay: 0.3, // Delay added to the transition for smoothness
  };

  const relaxedDelayTransition = {
    duration: 1.2,
    ease: "easeInOut",
    delay: 0.5, // Larger delay for background transitions
  };

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
            backgroundImage:
              "url('https://cdn.prod.website-files.com/633ef3c0bd3be81b55ba5334/63529189ef305a5e65dd0575_Dvele-prefab-homes-sticky-home.jpg')",
          }}
          transition={relaxedDelayTransition} // Adding delay for smoothness
          className="fixed inset-0 bg-cover bg-center z-20"
        />
        {/* The white overlay */}
        <motion.div
          style={{
            scale: scale,
            translateY: translateY,
            clipPath: whiteClipPath,
            backgroundColor: "white",
          }}
          transition={relaxedDelayTransition} // Adding delay for smoothness
          className="fixed inset-0"
        />
        {/* First text */}
        <div className="fixed inset-0 flex items-center justify-center z-0">
          <h1 className="md:text-8xl font-bold text-black text-4xl">
            Your Vision
          </h1>
        </div>
        {/* Second text */}
        <motion.div
          style={{
            y: textY,
            opacity: textOpacity,
          }}
          transition={smoothTransition} // Smooth transition for the text
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
