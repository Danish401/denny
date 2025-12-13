"use client";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import AnimationWrapper from "../animation-wrapper";
import { useMemo, useRef, useState, useEffect } from "react";
import {
  FaLinkedinIn,
  FaInstagram,
  FaGithub,
  FaArrowRight,
  FaEnvelope,
  FaPhone,
} from "react-icons/fa";
import Image from "next/image";
import aiImage from "../../../assets/ai-image.png";

function variants() {
  return {
    offscreen: {
      y: 150,
      opacity: 0,
    },
    onscreen: ({ duration = 2 } = {}) => ({
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        duration,
      },
    }),
  };
}

const socialIcons = [
  {
    id: "github",
    icon: FaGithub,
    link: "https://github.com/Danish401",
  },
  {
    id: "linkedin",
    icon: FaLinkedinIn,
    link: "https://www.linkedin.com/in/danish-ali-7886a024a",
  },
  {
    id: "instagram",
    icon: FaInstagram,
    link: "https://www.instagram.com/danish.ali0209/",
  },
];

// Typewriter Effect Component
function TypewriterText({
  texts,
  speed = 100,
  deleteSpeed = 50,
  pauseTime = 2000,
}) {
  const [displayText, setDisplayText] = useState("");
  const [textIndex, setTextIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentText = texts[textIndex];

    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          if (displayText.length < currentText.length) {
            setDisplayText(currentText.slice(0, displayText.length + 1));
          } else {
            setTimeout(() => setIsDeleting(true), pauseTime);
          }
        } else {
          if (displayText.length > 0) {
            setDisplayText(displayText.slice(0, -1));
          } else {
            setIsDeleting(false);
            setTextIndex((prev) => (prev + 1) % texts.length);
          }
        }
      },
      isDeleting ? deleteSpeed : speed
    );

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, textIndex, texts, speed, deleteSpeed, pauseTime]);

  return (
    <span className="gradient-text">
      {displayText}
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.5, repeat: Infinity }}
        className="ml-1 inline-block w-[3px] h-[1em] align-middle"
        style={{ background: "var(--primary)" }}
      />
    </span>
  );
}

// Floating Shapes Component with 3D effect
function FloatingShapes() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Blob shapes */}
      <motion.div 
        className="blob blob-1"
        animate={{
          rotateX: [0, 20, 0],
          rotateY: [0, 20, 0],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div 
        className="blob blob-2"
        animate={{
          rotateX: [0, -20, 0],
          rotateY: [0, -20, 0],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      <div className="blob blob-3 hidden md:block" />

      {/* 3D Floating elements */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            left: `${10 + i * 12}%`,
            top: `${15 + (i % 4) * 20}%`,
            width: `${8 + i * 2}px`,
            height: `${8 + i * 2}px`,
            background: `linear-gradient(135deg, ${
              i % 3 === 0 ? "#7C3AED" : i % 3 === 1 ? "#F472B6" : "#14B8A6"
            }, ${i % 3 === 0 ? "#F472B6" : i % 3 === 1 ? "#14B8A6" : "#7C3AED"})`,
            boxShadow: `0 0 ${10 + i * 5}px ${
              i % 3 === 0
                ? "rgba(124, 58, 237, 0.5)"
                : i % 3 === 1
                ? "rgba(244, 114, 182, 0.5)"
                : "rgba(20, 184, 166, 0.5)"
            }`,
          }}
          animate={{
            y: [0, -30 - i * 5, 0],
            x: [0, (i % 2 === 0 ? 15 : -15), 0],
            scale: [1, 1.2, 1],
            rotateZ: [0, 360],
            opacity: [0.4, 0.8, 0.4],
          }}
          transition={{
            duration: 4 + i * 0.5,
            repeat: Infinity,
            delay: i * 0.3,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

// 3D Card Component
function Card3D({ children, className }) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useTransform(y, [-0.5, 0.5], [10, -10]);
  const rotateY = useTransform(x, [-0.5, 0.5], [-10, 10]);

  const handleMouseMove = (e) => {
    const rect = ref.current?.getBoundingClientRect();
    if (rect) {
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      x.set((e.clientX - centerX) / rect.width);
      y.set((e.clientY - centerY) / rect.height);
    }
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default function ClientHomeView({ data }) {
  const setVariants = useMemo(() => variants(), []);
  const containerRef = useRef(null);
  const imageRef = useRef(null);

  // Mouse tracking for 3D effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 20, stiffness: 150 };
  const rotateX = useSpring(
    useTransform(mouseY, [-0.5, 0.5], [15, -15]),
    springConfig
  );
  const rotateY = useSpring(
    useTransform(mouseX, [-0.5, 0.5], [-15, 15]),
    springConfig
  );

  const handleMouseMove = (e) => {
    const rect = imageRef.current?.getBoundingClientRect();
    if (rect) {
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      mouseX.set((e.clientX - centerX) / rect.width);
      mouseY.set((e.clientY - centerY) / rect.height);
    }
  };

  const roles = [
    "Full Stack Developer",
    "React Specialist",
    "UI/UX Enthusiast",
    "Problem Solver",
  ];

  return (
    <div className="min-h-screen relative overflow-hidden" id="home">
      <FloatingShapes />

      <div className="max-w-screen-xl px-4 sm:px-6 lg:px-16 mx-auto pt-24 sm:pt-28 lg:pt-32 pb-16 lg:pb-20">
        <AnimationWrapper>
          <motion.div
            className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center"
            variants={setVariants}
          >
            {/* Left Content */}
            <div className="flex flex-col items-center lg:items-start text-center lg:text-left order-2 lg:order-1 z-10">
              {/* Greeting Badge */}
              <motion.div
                initial={{ opacity: 0, y: 20, rotateX: -90 }}
                animate={{ opacity: 1, y: 0, rotateX: 0 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 100 }}
                className="glass-card px-4 py-2 rounded-full mb-4 sm:mb-6"
                style={{ transformStyle: "preserve-3d" }}
              >
                <span className="text-[var(--text-secondary)] text-sm">
                  👋 Welcome to my portfolio
                </span>
              </motion.div>

              {/* Main Heading */}
              <motion.h1
                initial={{ opacity: 0, y: 30, rotateX: -45 }}
                animate={{ opacity: 1, y: 0, rotateX: 0 }}
                transition={{ delay: 0.3, type: "spring", stiffness: 80 }}
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-3 sm:mb-4"
                style={{ transformStyle: "preserve-3d" }}
              >
                <span className="text-[var(--text-primary)]">Hi, I'm </span>
                <motion.span 
                  className="gradient-text inline-block"
                  animate={{ 
                    textShadow: [
                      "0 0 20px rgba(124, 58, 237, 0.5)",
                      "0 0 40px rgba(244, 114, 182, 0.5)",
                      "0 0 20px rgba(124, 58, 237, 0.5)",
                    ]
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  {data && data.length
                    ? data[0]?.heading?.split(" ").slice(0, 2).join(" ")
                    : "Danish Ali"}
                </motion.span>
              </motion.h1>

              {/* Typewriter Role */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-xl sm:text-2xl md:text-3xl font-medium mb-4 sm:mb-6 h-10 sm:h-12"
              >
                <TypewriterText texts={roles} />
              </motion.div>

              {/* Summary */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="text-[var(--text-secondary)] text-base sm:text-lg mb-6 sm:mb-8 max-w-lg leading-relaxed"
              >
                {data && data.length
                  ? data[0]?.summary
                  : "Crafting digital experiences with code and creativity. Passionate about building beautiful, functional web applications."}
              </motion.p>

              {/* Contact Info Badges */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.55 }}
                className="flex flex-col sm:flex-row gap-3 mb-6 sm:mb-8"
              >
                <Card3D className="glass-card px-4 py-2.5 rounded-xl flex items-center gap-2 cursor-pointer hover:scale-105 transition-transform">
                  <FaEnvelope className="w-4 h-4" style={{ color: "var(--primary)" }} />
                  <span className="text-[var(--text-secondary)] text-sm">alid13381@gmail.com</span>
                </Card3D>
                <Card3D className="glass-card px-4 py-2.5 rounded-xl flex items-center gap-2 cursor-pointer hover:scale-105 transition-transform">
                  <FaPhone className="w-4 h-4" style={{ color: "var(--secondary)" }} />
                  <span className="text-[var(--text-secondary)] text-sm">+91 7009236647</span>
                </Card3D>
              </motion.div>

              {/* CTA Button */}
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: 0.6, type: "spring", stiffness: 100 }}
                className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-8 sm:mb-10 w-full sm:w-auto"
              >
                <motion.button
                  className="btn-gradient px-6 sm:px-8 py-3 sm:py-4 rounded-xl text-white font-semibold flex items-center justify-center gap-2 text-sm sm:text-base"
                  whileHover={{ 
                    scale: 1.05,
                    boxShadow: "0 20px 40px rgba(124, 58, 237, 0.4)",
                    rotateX: 5,
                    rotateY: 5,
                  }}
                  whileTap={{ scale: 0.95 }}
                  style={{ transformStyle: "preserve-3d" }}
                >
                  View Projects
                  <motion.span
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <FaArrowRight className="w-4 h-4" />
                  </motion.span>
                </motion.button>
              </motion.div>

              {/* Social Icons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="flex gap-3 sm:gap-4"
              >
                {socialIcons.map((item, index) => (
                  <motion.a
                    key={item.id}
                    href={item.link || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, scale: 0, rotateY: -180 }}
                    animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                    transition={{ 
                      delay: 0.8 + index * 0.1,
                      type: "spring",
                      stiffness: 100,
                    }}
                  >
                    <motion.div
                      className="social-icon"
                      whileHover={{ 
                        scale: 1.2, 
                        rotateY: 180,
                        boxShadow: "0 10px 30px rgba(124, 58, 237, 0.4)",
                      }}
                      whileTap={{ scale: 0.9 }}
                      style={{ transformStyle: "preserve-3d" }}
                    >
                      <item.icon className="w-5 h-5 sm:w-6 sm:h-6 text-[var(--primary)]" />
                    </motion.div>
                  </motion.a>
                ))}
              </motion.div>
            </div>

            {/* Right Content - Hero Image with 3D Effect */}
            <motion.div
              ref={containerRef}
              className="flex justify-center lg:justify-end w-full order-1 lg:order-2 mb-8 lg:mb-0"
              initial={{ opacity: 0, scale: 0.8, rotateY: 90 }}
              animate={{ opacity: 1, scale: 1, rotateY: 0 }}
              transition={{ delay: 0.4, duration: 0.8, type: "spring" }}
            >
              <motion.div
                ref={imageRef}
                onMouseMove={handleMouseMove}
                onMouseLeave={() => {
                  mouseX.set(0);
                  mouseY.set(0);
                }}
                style={{ 
                  rotateX, 
                  rotateY,
                  transformStyle: "preserve-3d",
                }}
                className="relative cursor-pointer"
              >
                {/* Animated Background Glow */}
                <motion.div
                  className="absolute -inset-4 sm:-inset-6 rounded-3xl opacity-60 blur-2xl sm:blur-3xl"
                  style={{
                    background:
                      "linear-gradient(135deg, #7C3AED, #F472B6, #14B8A6)",
                  }}
                  animate={{
                    scale: [1, 1.1, 1],
                    opacity: [0.4, 0.7, 0.4],
                    rotate: [0, 5, 0, -5, 0],
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />

                {/* Image Frame with 3D depth */}
                <div 
                  className="hero-image-frame relative z-10"
                  style={{ 
                    transformStyle: "preserve-3d",
                    transform: "translateZ(50px)",
                  }}
                >
                  <div className="relative w-[220px] h-[280px] sm:w-[260px] sm:h-[320px] md:w-[300px] md:h-[380px] lg:w-[340px] lg:h-[420px] rounded-2xl overflow-hidden bg-[var(--bg-secondary)]">
                    <Image
                      src={aiImage}
                      alt="Danish Ali - Full Stack Developer"
                      fill
                      style={{ objectFit: "cover" }}
                      className="rounded-2xl"
                      priority
                    />

                    {/* Overlay Gradient */}
                    <motion.div
                      className="absolute inset-0"
                      style={{
                        background:
                          "linear-gradient(to top, rgba(124, 58, 237, 0.4), transparent 60%)",
                      }}
                      animate={{
                        opacity: [0.5, 0.8, 0.5],
                      }}
                      transition={{ duration: 3, repeat: Infinity }}
                    />
                  </div>
                </div>

                {/* Floating Elements with 3D depth */}
                <motion.div
                  className="absolute -top-3 -right-3 sm:-top-4 sm:-right-4 w-14 h-14 sm:w-16 sm:h-16 glass-card rounded-2xl flex items-center justify-center"
                  style={{ transform: "translateZ(80px)" }}
                  animate={{ 
                    y: [0, -12, 0],
                    rotateZ: [0, 10, 0, -10, 0],
                  }}
                  transition={{ duration: 4, repeat: Infinity }}
                >
                  <span className="text-2xl sm:text-3xl">💻</span>
                </motion.div>

                <motion.div
                  className="absolute -bottom-2 -left-3 sm:-bottom-3 sm:-left-4 glass-card rounded-xl flex items-center gap-2 px-3 py-2"
                  style={{ transform: "translateZ(60px)" }}
                  animate={{ 
                    y: [0, 10, 0],
                    rotateZ: [0, -5, 0, 5, 0],
                  }}
                  transition={{ duration: 3.5, repeat: Infinity, delay: 0.5 }}
                >
                  <span className="text-xl sm:text-2xl">⚛️</span>
                  <span className="text-[var(--text-primary)] text-xs sm:text-sm font-semibold">
                    React
                  </span>
                </motion.div>

                <motion.div
                  className="absolute top-1/2 -right-4 sm:-right-6 w-10 h-10 sm:w-12 sm:h-12 glass-card rounded-full flex items-center justify-center hidden sm:flex"
                  style={{ transform: "translateZ(70px)" }}
                  animate={{ 
                    x: [0, 10, 0], 
                    rotate: [0, 360],
                    scale: [1, 1.1, 1],
                  }}
                  transition={{ duration: 6, repeat: Infinity }}
                >
                  <span className="text-lg sm:text-xl">🚀</span>
                </motion.div>

                {/* New floating element - Framer Motion */}
                <motion.div
                  className="absolute top-1/4 -left-4 sm:-left-6 glass-card rounded-xl px-2 py-1.5 hidden sm:flex items-center gap-1"
                  style={{ transform: "translateZ(90px)" }}
                  animate={{ 
                    y: [0, -8, 0],
                    x: [0, 5, 0],
                  }}
                  transition={{ duration: 4, repeat: Infinity, delay: 1 }}
                >
                  <span className="text-sm">🎬</span>
                  <span className="text-[var(--text-primary)] text-xs font-semibold">
                    Framer
                  </span>
                </motion.div>
              </motion.div>
            </motion.div>
          </motion.div>
        </AnimationWrapper>

        {/* Scroll Indicator with 3D effect */}
        <motion.div
          className="flex justify-center mt-8 sm:mt-12 lg:mt-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          <motion.div
            className="flex flex-col items-center cursor-pointer"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            whileHover={{ scale: 1.1 }}
          >
            <span className="text-[var(--text-muted)] text-xs sm:text-sm mb-2">
              Scroll Down
            </span>
            <motion.div 
              className="w-5 h-8 sm:w-6 sm:h-10 border-2 border-[var(--primary)] rounded-full flex justify-center p-1.5 sm:p-2 opacity-60"
              animate={{
                boxShadow: [
                  "0 0 10px rgba(124, 58, 237, 0.3)",
                  "0 0 20px rgba(124, 58, 237, 0.6)",
                  "0 0 10px rgba(124, 58, 237, 0.3)",
                ],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <motion.div
                className="w-1 h-2 sm:h-3 rounded-full"
                style={{ background: "var(--primary)" }}
                animate={{ y: [0, 6, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
