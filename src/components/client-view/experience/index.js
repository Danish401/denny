"use client";

import { useRef } from "react";
import AnimationWrapper from "../animation-wrapper";
import { motion, useMotionValue, useTransform } from "framer-motion";
import {
  FaBriefcase,
  FaGraduationCap,
  FaMapMarkerAlt,
  FaCalendarAlt,
} from "react-icons/fa";

// 3D Card Component
function Card3D({ children, className }) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useTransform(y, [-0.5, 0.5], [8, -8]);
  const rotateY = useTransform(x, [-0.5, 0.5], [-8, 8]);

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

// Timeline Item Component with 3D effect
function TimelineItem({ item, index, type }) {
  const isExperience = type === "experience";

  return (
    <motion.div
      initial={{ opacity: 0, x: -30, rotateY: 20 }}
      whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
      transition={{ delay: index * 0.15, duration: 0.5, type: "spring" }}
      viewport={{ once: true }}
      className="relative pl-6 sm:pl-8 pb-10 sm:pb-12 last:pb-0"
      style={{ transformStyle: "preserve-3d" }}
    >
      {/* Timeline Line with gradient */}
      <motion.div
        className="absolute left-0 top-0 bottom-0 w-[2px]"
        style={{
          background:
            "linear-gradient(180deg, var(--primary), var(--secondary), transparent)",
        }}
        initial={{ scaleY: 0 }}
        whileInView={{ scaleY: 1 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.15, duration: 0.5 }}
      />

      {/* Timeline Dot with glow */}
      <motion.div
        className="absolute left-[-6px] sm:left-[-7px] top-0 w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full"
        style={{
          background: "linear-gradient(135deg, var(--primary), var(--secondary))",
        }}
        initial={{ scale: 0, rotate: -180 }}
        whileInView={{ scale: 1, rotate: 0 }}
        viewport={{ once: true }}
        animate={{
          boxShadow: [
            "0 0 10px rgba(124, 58, 237, 0.4)",
            "0 0 25px rgba(124, 58, 237, 0.8)",
            "0 0 10px rgba(124, 58, 237, 0.4)",
          ],
        }}
        transition={{ delay: index * 0.15 + 0.2, duration: 2, repeat: Infinity }}
      >
        {/* Pulse Animation */}
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{ background: "var(--primary)" }}
          animate={{
            scale: [1, 2, 1],
            opacity: [0.5, 0, 0.5],
          }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </motion.div>

      {/* Card with 3D effect */}
      <Card3D className="ml-2 sm:ml-4">
        <motion.div
          className="timeline-card p-4 sm:p-6"
          whileHover={{ 
            scale: 1.02, 
            x: 8,
            boxShadow: "0 20px 40px rgba(124, 58, 237, 0.2)",
          }}
          transition={{ duration: 0.3 }}
        >
          {/* Date Badge with glow */}
          <motion.div 
            className="flex items-center gap-2 mb-3"
            style={{ transform: "translateZ(20px)" }}
          >
            <motion.div
              animate={{
                rotate: [0, 10, 0, -10, 0],
              }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              <FaCalendarAlt
                className="w-3.5 h-3.5 sm:w-4 sm:h-4"
                style={{ color: "var(--primary)" }}
              />
            </motion.div>
            <span className="text-xs sm:text-sm font-medium" style={{ color: "var(--primary)" }}>
              {isExperience ? item.duration : item.year}
            </span>
          </motion.div>

          {/* Title with gradient hover */}
          <motion.h3 
            className="text-lg sm:text-xl font-bold text-[var(--text-primary)] mb-2"
            style={{ transform: "translateZ(30px)" }}
            whileHover={{
              textShadow: "0 0 20px rgba(124, 58, 237, 0.5)",
            }}
          >
            {isExperience ? item.position : item.degree}
          </motion.h3>

          {/* Location with icon animation */}
          <motion.div 
            className="flex items-center gap-2 mb-3"
            style={{ transform: "translateZ(15px)" }}
          >
            <motion.div
              animate={{ y: [0, -3, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <FaMapMarkerAlt
                className="w-3.5 h-3.5 sm:w-4 sm:h-4"
                style={{ color: "var(--secondary)" }}
              />
            </motion.div>
            <span className="text-[var(--text-secondary)] text-sm sm:text-base">
              {isExperience
                ? `${item.company}, ${item.location}`
                : item.college}
            </span>
          </motion.div>

          {/* Description */}
          {isExperience && item.jobprofile && (
            <p 
              className="text-[var(--text-muted)] text-sm leading-relaxed"
              style={{ transform: "translateZ(10px)" }}
            >
              {item.jobprofile}
            </p>
          )}
        </motion.div>
      </Card3D>
    </motion.div>
  );
}

// Section Header Component with 3D effect
function SectionHeader({ icon: Icon, title, color }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, rotateX: -20 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true }}
      transition={{ type: "spring", stiffness: 80 }}
      className="flex items-center gap-3 sm:gap-4 mb-8 sm:mb-10"
      style={{ transformStyle: "preserve-3d" }}
    >
      <motion.div
        className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center"
        style={{ 
          background: `${color}20`,
          transform: "translateZ(20px)",
        }}
        whileHover={{ rotate: 360, scale: 1.1 }}
        transition={{ duration: 0.6 }}
        animate={{
          boxShadow: [
            `0 0 10px ${color}40`,
            `0 0 25px ${color}60`,
            `0 0 10px ${color}40`,
          ],
        }}
      >
        <Icon className="w-6 h-6 sm:w-7 sm:h-7" style={{ color }} />
      </motion.div>
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold">
        <span className="text-[var(--text-primary)]">My </span>
        <motion.span 
          className="gradient-text"
          animate={{
            textShadow: [
              "0 0 10px rgba(124, 58, 237, 0.3)",
              "0 0 20px rgba(124, 58, 237, 0.5)",
              "0 0 10px rgba(124, 58, 237, 0.3)",
            ],
          }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          {title}
        </motion.span>
      </h2>
    </motion.div>
  );
}

export default function ClientExperienceAndEducationView({
  educationData,
  experienceData,
}) {
  // Default data
  const defaultExperience = [
    {
      duration: "2023 - Present",
      position: "Full Stack Developer",
      company: "Tech Company",
      location: "Remote",
      jobprofile:
        "Building modern web applications using React, Next.js, and Node.js. Leading frontend development and mentoring junior developers.",
    },
    {
      duration: "2022 - 2023",
      position: "Frontend Developer",
      company: "Startup Inc",
      location: "New York",
      jobprofile:
        "Developed responsive user interfaces and improved application performance by 40%.",
    },
  ];

  const defaultEducation = [
    {
      year: "2019 - 2023",
      degree: "B.Tech in Computer Science",
      college: "University of Technology",
    },
    {
      year: "2017 - 2019",
      degree: "Higher Secondary Education",
      college: "City High School",
    },
  ];

  const experience =
    experienceData && experienceData.length > 0
      ? experienceData
      : defaultExperience;
  const education =
    educationData && educationData.length > 0
      ? educationData
      : defaultEducation;

  return (
    <div className="relative py-16 sm:py-20 overflow-hidden" id="experience">
      {/* Background 3D Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-1/3 left-10 w-40 h-40 rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(124, 58, 237, 0.1), transparent)",
            filter: "blur(50px)",
          }}
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-1/3 right-10 w-60 h-60 rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(244, 114, 182, 0.1), transparent)",
            filter: "blur(50px)",
          }}
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 10, repeat: Infinity }}
        />
      </div>

      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-16 relative z-10">
        {/* Section Title with 3D effect */}
        <AnimationWrapper className="mb-12 sm:mb-16">
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
              📚 My Journey
            </motion.span>
            <h2 className="section-title mb-4">
              <span className="text-[var(--text-primary)]">Experience & </span>
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
                Education
              </motion.span>
            </h2>
            <p className="text-[var(--text-secondary)] max-w-2xl mx-auto text-sm sm:text-base">
              A timeline of my professional journey and academic background
            </p>
          </motion.div>
        </AnimationWrapper>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
          {/* Experience Column */}
          <AnimationWrapper>
            <div>
              <SectionHeader
                icon={FaBriefcase}
                title="Experience"
                color="#7C3AED"
              />
              <div className="relative">
                {experience.map((item, index) => (
                  <TimelineItem
                    key={index}
                    item={item}
                    index={index}
                    type="experience"
                  />
                ))}
              </div>
            </div>
          </AnimationWrapper>

          {/* Education Column */}
          <AnimationWrapper>
            <div>
              <SectionHeader
                icon={FaGraduationCap}
                title="Education"
                color="#F472B6"
              />
              <div className="relative">
                {education.map((item, index) => (
                  <TimelineItem
                    key={index}
                    item={item}
                    index={index}
                    type="education"
                  />
                ))}
              </div>
            </div>
          </AnimationWrapper>
        </div>

        {/* Bottom CTA with 3D effect */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12 sm:mt-16"
        >
          <motion.a
            href="#contact"
            className="inline-block btn-gradient px-6 sm:px-8 py-3 sm:py-4 rounded-xl text-white font-semibold text-sm sm:text-base"
            whileHover={{ 
              scale: 1.05,
              rotateX: 5,
              boxShadow: "0 20px 40px rgba(124, 58, 237, 0.4)",
            }}
            whileTap={{ scale: 0.95 }}
            style={{ transformStyle: "preserve-3d" }}
          >
            <motion.span
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              Work With Me →
            </motion.span>
          </motion.a>
        </motion.div>
      </div>
    </div>
  );
}
