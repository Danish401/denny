"use client";

import { useRef } from "react";
import AnimationWrapper from "../animation-wrapper";
import { motion, useScroll, useTransform, useMotionValue } from "framer-motion";
import { useRouter } from "next/navigation";
import {
  FaGithub,
  FaExternalLinkAlt,
  FaCalendarAlt,
  FaArrowRight,
  FaArrowLeft,
} from "react-icons/fa";

// 3D Project Card Component
function ProjectCard({ item, index }) {
  const router = useRouter();
  const technologies = item?.technologies?.split(",") || [];
  
  const cardRef = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useTransform(y, [-0.5, 0.5], [15, -15]);
  const rotateY = useTransform(x, [-0.5, 0.5], [-15, 15]);

  const handleMouseMove = (e) => {
    const rect = cardRef.current?.getBoundingClientRect();
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
    <motion.li
      initial={{ opacity: 0, y: 50, rotateX: -20 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      transition={{ delay: index * 0.1, type: "spring", stiffness: 80 }}
      viewport={{ once: true }}
      className="flex-shrink-0 w-[280px] sm:w-[320px] md:w-[360px] snap-start"
    >
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        whileHover={{
          boxShadow: "0 30px 60px rgba(124, 58, 237, 0.25)",
        }}
        className="project-card h-full flex flex-col p-5 sm:p-6 relative overflow-hidden group cursor-pointer"
      >
        {/* Animated Gradient Overlay */}
        <motion.div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background:
              "linear-gradient(135deg, rgba(124, 58, 237, 0.08), rgba(244, 114, 182, 0.08))",
          }}
        />

        {/* Floating Glow Effect */}
        <motion.div
          className="absolute -top-20 -right-20 w-40 h-40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: "radial-gradient(circle, rgba(124, 58, 237, 0.3), transparent)",
            filter: "blur(40px)",
          }}
          animate={{
            scale: [1, 1.2, 1],
          }}
          transition={{ duration: 3, repeat: Infinity }}
        />

        {/* Project Number with 3D depth */}
        <motion.div 
          className="absolute top-4 right-4 text-5xl sm:text-6xl font-bold text-[var(--text-primary)] opacity-5 group-hover:opacity-10 transition-opacity"
          style={{ transform: "translateZ(-20px)" }}
        >
          {String(index + 1).padStart(2, "0")}
        </motion.div>

        {/* Content with 3D depth */}
        <div 
          className="relative z-10 flex-1"
          style={{ transform: "translateZ(30px)" }}
        >
          {/* Date */}
          <motion.div 
            className="flex items-center gap-2 mb-3 sm:mb-4"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 + 0.1 }}
            viewport={{ once: true }}
          >
            <FaCalendarAlt
              className="w-3.5 h-3.5"
              style={{ color: "var(--primary)" }}
            />
            <span className="text-xs sm:text-sm text-[var(--text-muted)]">
              {item?.createdAt?.split("T")[0] || "2024"}
            </span>
          </motion.div>

          {/* Title with glow on hover */}
          <motion.h3 
            className="text-xl sm:text-2xl font-bold text-[var(--text-primary)] mb-2 sm:mb-3 group-hover:gradient-text transition-all duration-300"
            whileHover={{
              textShadow: "0 0 20px rgba(124, 58, 237, 0.5)",
            }}
          >
            {item?.name || "Project Name"}
          </motion.h3>

          {/* Description */}
          <p className="text-[var(--text-secondary)] text-sm mb-4 sm:mb-6 line-clamp-2">
            {item?.description ||
              "A modern web application built with cutting-edge technologies."}
          </p>

          {/* Technologies with 3D effect */}
          <div className="flex flex-wrap gap-2 mb-4 sm:mb-6">
            {technologies.slice(0, 4).map((tech, techIndex) => (
              <motion.span
                key={techIndex}
                className="px-2.5 sm:px-3 py-1 text-xs font-medium rounded-full border"
                style={{
                  background: "var(--bg-tertiary)",
                  borderColor: "var(--glass-border)",
                  color: "var(--primary)",
                }}
                initial={{ opacity: 0, scale: 0.8, rotateY: -90 }}
                whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
                transition={{ delay: techIndex * 0.05, type: "spring" }}
                viewport={{ once: true }}
                whileHover={{ 
                  scale: 1.1,
                  boxShadow: "0 5px 15px rgba(124, 58, 237, 0.3)",
                }}
              >
                {tech.trim()}
              </motion.span>
            ))}
            {technologies.length > 4 && (
              <span
                className="px-2.5 sm:px-3 py-1 text-xs font-medium rounded-full border"
                style={{
                  background: "var(--bg-tertiary)",
                  borderColor: "var(--glass-border)",
                  color: "var(--secondary)",
                }}
              >
                +{technologies.length - 4}
              </span>
            )}
          </div>
        </div>

        {/* Action Buttons with 3D depth */}
        <div 
          className="relative z-10 flex gap-2 sm:gap-3 mt-auto pt-4 border-t border-[var(--glass-border)]"
          style={{ transform: "translateZ(40px)" }}
        >
          <motion.button
            onClick={() => item?.website && router.push(item.website)}
            className="flex-1 flex items-center justify-center gap-2 py-2.5 sm:py-3 rounded-xl text-white font-medium text-sm"
            style={{
              background: "linear-gradient(135deg, var(--primary), var(--secondary))",
            }}
            whileHover={{ 
              scale: 1.05,
              boxShadow: "0 10px 30px rgba(124, 58, 237, 0.4)",
            }}
            whileTap={{ scale: 0.95 }}
          >
            <FaExternalLinkAlt className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Live Demo</span>
            <span className="sm:hidden">Demo</span>
          </motion.button>
          <motion.button
            onClick={() => item?.github && router.push(item.github)}
            className="flex items-center justify-center gap-2 px-4 py-2.5 sm:py-3 rounded-xl font-medium text-sm"
            style={{
              background: "var(--bg-tertiary)",
              color: "var(--text-primary)",
            }}
            whileHover={{ 
              scale: 1.05,
              boxShadow: "0 10px 20px rgba(0, 0, 0, 0.2)",
            }}
            whileTap={{ scale: 0.95 }}
          >
            <FaGithub className="w-4 h-4 sm:w-5 sm:h-5" />
          </motion.button>
        </div>

        {/* Corner Glow */}
        <motion.div
          className="absolute -bottom-10 -right-10 w-32 h-32 rounded-full opacity-0 group-hover:opacity-50 transition-opacity duration-500"
          style={{
            background: "radial-gradient(circle, var(--primary), transparent)",
            filter: "blur(30px)",
          }}
        />
      </motion.div>
    </motion.li>
  );
}

// Scroll Progress Component
function ScrollProgress({ scrollXProgress }) {
  const scale = useTransform(scrollXProgress, [0, 1], [0, 1]);

  return (
    <div className="flex items-center gap-3 sm:gap-4">
      <div className="flex-1 h-1.5 bg-[var(--bg-tertiary)] rounded-full overflow-hidden">
        <motion.div
          className="h-full rounded-full origin-left"
          style={{
            background: "linear-gradient(90deg, var(--primary), var(--secondary))",
            scaleX: scale,
          }}
        />
      </div>
      <motion.svg
        width="50"
        height="50"
        viewBox="0 0 100 100"
        className="-rotate-90 hidden sm:block"
        animate={{
          filter: [
            "drop-shadow(0 0 5px rgba(124, 58, 237, 0.3))",
            "drop-shadow(0 0 15px rgba(124, 58, 237, 0.6))",
            "drop-shadow(0 0 5px rgba(124, 58, 237, 0.3))",
          ],
        }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <circle
          cx="50"
          cy="50"
          r="35"
          fill="none"
          strokeWidth="8"
          stroke="var(--bg-tertiary)"
        />
        <motion.circle
          cx="50"
          cy="50"
          r="35"
          fill="none"
          strokeWidth="8"
          strokeDasharray="220"
          stroke="url(#progressGradient)"
          style={{ pathLength: scrollXProgress }}
          strokeLinecap="round"
        />
        <defs>
          <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#7C3AED" />
            <stop offset="100%" stopColor="#F472B6" />
          </linearGradient>
        </defs>
      </motion.svg>
    </div>
  );
}

export default function ClientProjectView({ data }) {
  const containerRef = useRef(null);
  const { scrollXProgress } = useScroll({ container: containerRef });

  const scrollLeft = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({ left: -320, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({ left: 320, behavior: "smooth" });
    }
  };

  // Default projects if no data
  const defaultProjects = [
    {
      name: "E-Commerce Platform",
      technologies: "React,Next.js,Node.js,MongoDB",
      createdAt: "2024-01-15T00:00:00",
      description: "Full-stack e-commerce solution with payment integration",
      website: "#",
      github: "#",
    },
    {
      name: "Task Management App",
      technologies: "React,TypeScript,Firebase,Tailwind",
      createdAt: "2024-02-20T00:00:00",
      description: "Collaborative task management with real-time updates",
      website: "#",
      github: "#",
    },
    {
      name: "Portfolio Website",
      technologies: "Next.js,Framer Motion,Tailwind CSS",
      createdAt: "2024-03-10T00:00:00",
      description: "Modern portfolio with stunning 3D animations",
      website: "#",
      github: "#",
    },
  ];

  const projects = data && data.length > 0 ? data : defaultProjects;

  return (
    <div className="relative py-16 sm:py-20 overflow-hidden" id="project">
      {/* Background 3D Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(124, 58, 237, 0.1), transparent)",
            filter: "blur(60px)",
          }}
          animate={{
            scale: [1, 1.3, 1],
            x: [0, 50, 0],
            y: [0, -30, 0],
          }}
          transition={{ duration: 10, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(244, 114, 182, 0.1), transparent)",
            filter: "blur(60px)",
          }}
          animate={{
            scale: [1.2, 1, 1.2],
            x: [0, -40, 0],
            y: [0, 40, 0],
          }}
          transition={{ duration: 12, repeat: Infinity }}
        />
      </div>

      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-16 relative z-10">
        {/* Section Header with 3D effect */}
        <AnimationWrapper className="mb-10 sm:mb-12">
          <motion.div
            initial={{ opacity: 0, y: 30, rotateX: -20 }}
            whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 80 }}
            className="text-center"
            style={{ transformStyle: "preserve-3d" }}
          >
            <motion.span
              className="inline-block glass-card px-4 py-2 rounded-full text-sm text-[var(--text-secondary)] mb-4"
              initial={{ opacity: 0, scale: 0.8, rotateY: -90 }}
              whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
              viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 100 }}
              whileHover={{ scale: 1.05 }}
            >
              🚀 Featured Work
            </motion.span>
            <h2 className="section-title mb-4">
              <span className="text-[var(--text-primary)]">My </span>
              <motion.span 
                className="gradient-text"
                animate={{
                  textShadow: [
                    "0 0 20px rgba(124, 58, 237, 0.5)",
                    "0 0 40px rgba(244, 114, 182, 0.5)",
                    "0 0 20px rgba(124, 58, 237, 0.5)",
                  ],
                }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                Projects
              </motion.span>
            </h2>
            <p className="text-[var(--text-secondary)] max-w-2xl mx-auto text-sm sm:text-base">
              Explore my recent work and personal projects showcasing my skills
            </p>
          </motion.div>
        </AnimationWrapper>

        {/* Scroll Controls */}
        <div className="flex items-center justify-between gap-4 mb-6">
          <div className="flex-1">
            <ScrollProgress scrollXProgress={scrollXProgress} />
          </div>

          <div className="flex gap-2 sm:gap-3">
            <motion.button
              onClick={scrollLeft}
              className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl glass-card flex items-center justify-center text-[var(--text-primary)]"
              whileHover={{ 
                scale: 1.1,
                boxShadow: "0 10px 30px rgba(124, 58, 237, 0.3)",
              }}
              whileTap={{ scale: 0.9 }}
            >
              <FaArrowLeft className="w-4 h-4" />
            </motion.button>
            <motion.button
              onClick={scrollRight}
              className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl glass-card flex items-center justify-center text-[var(--text-primary)]"
              whileHover={{ 
                scale: 1.1,
                boxShadow: "0 10px 30px rgba(124, 58, 237, 0.3)",
              }}
              whileTap={{ scale: 0.9 }}
            >
              <FaArrowRight className="w-4 h-4" />
            </motion.button>
          </div>
        </div>

        {/* Projects Horizontal Scroll */}
        <AnimationWrapper>
          <ul
            ref={containerRef}
            className="project-wrapper"
          >
            {projects.map((item, index) => (
              <ProjectCard key={index} item={item} index={index} />
            ))}
          </ul>
        </AnimationWrapper>

        {/* View All Button with 3D effect */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-8 sm:mt-10"
        >
          <motion.button
            className="inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 rounded-xl border text-sm sm:text-base font-medium"
            style={{
              borderColor: "var(--primary)",
              color: "var(--primary)",
            }}
            whileHover={{
              scale: 1.05,
              background: "linear-gradient(135deg, var(--primary), var(--secondary))",
              color: "white",
              borderColor: "transparent",
              boxShadow: "0 15px 30px rgba(124, 58, 237, 0.4)",
              rotateX: 5,
            }}
            whileTap={{ scale: 0.95 }}
            style={{ transformStyle: "preserve-3d" }}
          >
            View All Projects
            <motion.span
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <FaArrowRight className="w-3.5 h-3.5" />
            </motion.span>
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
}
