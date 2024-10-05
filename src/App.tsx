import "./App.css";
import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useState } from "react";

function App() {
  const { scrollYProgress } = useScroll();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Transformations for images
  const y1 = useTransform(scrollYProgress, [0, 0.33], ["0%", isMobile ? "0%" : "0%"]);
  const y2 = useTransform(scrollYProgress, [0.33, 0.66], ["100%", isMobile ? "0%" : "0%"]);
  const y3 = useTransform(scrollYProgress, [0.66, 1], ["100%", isMobile ? "0%" : "0%"]);

  // Transformations for text
  const x1 = useTransform(scrollYProgress, [0, 0.33], ["0%", isMobile ? "0%" : "-200%"]);
  const x2 = useTransform(scrollYProgress, [0.33, 0.66, 1], [isMobile ? "0%" : "100%", isMobile ? "0%" : "0%", isMobile ? "0%" : "-200%"]);
  const x3 = useTransform(scrollYProgress, [0.66, 1], [isMobile ? "0%" : "100%", isMobile ? "0%" : "0%"]);

  const yText1 = useTransform(scrollYProgress, [0, 0.33], ["0%", isMobile ? "-50%" : "0%"]);
  const yText2 = useTransform(scrollYProgress, [0.33, 0.66], [isMobile ? "100%" : "0%", isMobile ? "0%" : "0%"]);
  const yText3 = useTransform(scrollYProgress, [0.66, 1], [isMobile ? "100%" : "0%", isMobile ? "0%" : "0%"]);

  // Opacity transformations to hide previous elements
  const opacity1 = useTransform(scrollYProgress, [0, 0.33], [1, 1]);
  const opacity2 = useTransform(scrollYProgress, [0.33, 0.66], [0, 1]);
  const opacity3 = useTransform(scrollYProgress, [0.66, 1], [0, 1]);

  const textopacity1 = useTransform(scrollYProgress, [0, 0.33], [1, 0]);
  const textopacity2 = useTransform(scrollYProgress, [0.33, 0.66, 1], [0, 1, 0]);
  const textopacity3 = useTransform(scrollYProgress, [0.66, 1], [0, 1]);

  const transition = { type: "spring", stiffness: 50, damping: 20, duration: 2 };

  return (
    <div className="h-[600vh]">
      <div className="fixed top-0 left-0 w-full h-full flex flex-col md:flex-row">
        <div className="w-full md:w-[38%] h-full relative overflow-hidden">
          <motion.img
            src="/1.jpg"
            className="absolute w-full h-full object-cover z-10"
            style={{ y: y1, opacity: opacity1 }}
            transition={transition}
          />
          <motion.img
            src="/IMG_5750.jpg"
            className="absolute w-full h-full object-cover z-10"
            style={{ y: y2, opacity: opacity2 }}
            transition={transition}
          />
          <motion.img
            src="/IMG_5761.jpg"
            className="absolute w-full h-full object-cover z-10"
            style={{ y: y3, opacity: opacity3 }}
            transition={transition}
          />
        </div>
        <div className="w-full md:w-[62%] h-full flex flex-col items-center justify-center relative p-4 md:p-24">
          <motion.div
            className="absolute mx-4 md:mx-24 z-0"
            style={{ x: x1, y: yText1, opacity: textopacity1 }}
            transition={transition}
          >
            <h1 className="text-3xl md:text-5xl font-bold underline mb-4">Perfection is in precision</h1>
            <p className="text-base md:text-lg">
              At Suprano Exhibits, we specialise in delivering thorough and futuristic exhibition services globally. Our creative teams work resolutely to craft enthralling designs, and our production team brings precision to our services that will make your experience worthwhile. Our unparalleled warehousing facilities and cutting-edge design prowess provide us with a distinctive advantage in curating exhibitions of exceptional caliber.
            </p>
          </motion.div>
          <motion.div
            className="absolute mx-4 md:mx-24 z-0"
            style={{ x: x2, y: yText2, opacity: textopacity2 }}
            transition={transition}
          >
            <h1 className="text-3xl md:text-5xl font-bold underline mb-4">Our Vision</h1>
            <p className="text-base md:text-lg">
              At Suprano Exhibits, our unwavering vision is to establish ourselves as the foremost global leader in the exhibition industry. We aspire to be the preferred partner for discerning clients seeking unrivaled innovation, flawless execution, and uncompromising quality. Through our relentless commitment to excellence, we aim to redefine industry benchmarks, leaving a lasting impact that resonates with audiences on a global scale.
            </p>
          </motion.div>
          <motion.div
            className="absolute mx-4 md:mx-24 z-0"
            style={{ x: x3, y: yText3, opacity: textopacity3 }}
            transition={transition}
          >
            <h1 className="text-3xl md:text-5xl font-bold underline mb-4">Services</h1>
            <p className="text-base md:text-lg">
              At Suprano Exhibits, we offer a comprehensive range of services tailored to meet your exhibition needs. Our expertise includes custom exhibition design and built, 3D exhibition stall design, exhibition stall fabrication, project implementation, international exhibition stall design, and portable modular exhibition stall solutions. With our commitment to excellence, we ensure seamless execution and create visually stunning and engaging experiences that captivate your target audience.
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default App;