"use client";

import { useMemo, useEffect, useState, useRef } from "react";
import AnimationWrapper from "../animation-wrapper";
import { motion, useInView, useMotionValue, useTransform } from "framer-motion";
import Image from "next/image";
import aboutMeImage from "../../../assets/about-image.png";
import zohoCrmLogo from "../../../assets/zoho-crm.png";
import zohoBooksLogo from "../../../assets/zoho-books.png";
import zohoCreatorLogo from "../../../assets/zoho-creator.png";
import {
  FaUsers,
  FaProjectDiagram,
  FaBriefcase,
  FaCode,
  FaReact,
  FaNodeJs,
  FaHtml5,
  FaCss3Alt,
  FaJs,
  FaPython,
  FaGitAlt,
  FaDocker,
  FaAws,
  FaDatabase,
  FaFigma,
} from "react-icons/fa";
import {
  SiNextdotjs,
  SiTypescript,
  SiTailwindcss,
  SiMongodb,
  SiExpress,
  SiPostgresql,
  SiRedux,
  SiFirebase,
  SiVercel,
  SiGraphql,
  SiPrisma,
  SiFramer,
} from "react-icons/si";

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

// Animated Counter Component
function AnimatedCounter({ target, suffix = "+", duration = 2000 }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;

    const targetNum = parseInt(target) || 0;
    const increment = targetNum / (duration / 16);
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= targetNum) {
        setCount(targetNum);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [target, duration, isInView]);

  return (
    <motion.span 
      ref={ref} 
      className="gradient-text text-4xl sm:text-5xl md:text-6xl font-bold"
      animate={isInView ? {
        textShadow: [
          "0 0 20px rgba(124, 58, 237, 0.3)",
          "0 0 40px rgba(124, 58, 237, 0.5)",
          "0 0 20px rgba(124, 58, 237, 0.3)",
        ],
      } : {}}
      transition={{ duration: 2, repeat: Infinity }}
    >
      {count}
      {suffix}
    </motion.span>
  );
}

// Skill icons mapping
const skillIconsMap = {
  "react": { icon: FaReact, color: "#61DAFB" },
  "next.js": { icon: SiNextdotjs, color: "#000000" },
  "nextjs": { icon: SiNextdotjs, color: "#000000" },
  "node.js": { icon: FaNodeJs, color: "#339933" },
  "nodejs": { icon: FaNodeJs, color: "#339933" },
  "javascript": { icon: FaJs, color: "#F7DF1E" },
  "js": { icon: FaJs, color: "#F7DF1E" },
  "typescript": { icon: SiTypescript, color: "#3178C6" },
  "ts": { icon: SiTypescript, color: "#3178C6" },
  "html": { icon: FaHtml5, color: "#E34F26" },
  "html5": { icon: FaHtml5, color: "#E34F26" },
  "css": { icon: FaCss3Alt, color: "#1572B6" },
  "css3": { icon: FaCss3Alt, color: "#1572B6" },
  "tailwind": { icon: SiTailwindcss, color: "#06B6D4" },
  "tailwind css": { icon: SiTailwindcss, color: "#06B6D4" },
  "tailwindcss": { icon: SiTailwindcss, color: "#06B6D4" },
  "mongodb": { icon: SiMongodb, color: "#47A248" },
  "express": { icon: SiExpress, color: "#000000" },
  "express.js": { icon: SiExpress, color: "#000000" },
  "expressjs": { icon: SiExpress, color: "#000000" },
  "postgresql": { icon: SiPostgresql, color: "#4169E1" },
  "postgres": { icon: SiPostgresql, color: "#4169E1" },
  "python": { icon: FaPython, color: "#3776AB" },
  "git": { icon: FaGitAlt, color: "#F05032" },
  "docker": { icon: FaDocker, color: "#2496ED" },
  "aws": { icon: FaAws, color: "#FF9900" },
  "redux": { icon: SiRedux, color: "#764ABC" },
  "firebase": { icon: SiFirebase, color: "#FFCA28" },
  "vercel": { icon: SiVercel, color: "#000000" },
  "graphql": { icon: SiGraphql, color: "#E10098" },
  "prisma": { icon: SiPrisma, color: "#2D3748" },
  "framer motion": { icon: SiFramer, color: "#0055FF" },
  "framer": { icon: SiFramer, color: "#0055FF" },
  "figma": { icon: FaFigma, color: "#F24E1E" },
  "database": { icon: FaDatabase, color: "#7C3AED" },
  "sql": { icon: FaDatabase, color: "#336791" },
};

// Zoho products with actual logos
const zohoLogosMap = {
  "zoho crm": { logo: zohoCrmLogo, color: "#C8202B" },
  "zoho creator": { logo: zohoCreatorLogo, color: "#0078D4" },
  "zoho books": { logo: zohoBooksLogo, color: "#4CAF50" },
};

// Skill Item Component with 3D effect and icons/logos
function SkillItem({ skill, index }) {
  const skillLower = skill.trim().toLowerCase();
  const skillData = skillIconsMap[skillLower];
  const zohoData = zohoLogosMap[skillLower];
  const IconComponent = skillData?.icon || FaCode;
  const iconColor = skillData?.color || zohoData?.color || "#7C3AED";

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, rotateY: -90 }}
      whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
      transition={{ delay: index * 0.05, type: "spring", stiffness: 100 }}
      viewport={{ once: true }}
      whileHover={{ 
        scale: 1.1, 
        rotateY: 10,
        boxShadow: `0 10px 30px ${iconColor}40`,
      }}
      className="skill-badge text-sm sm:text-base cursor-pointer flex items-center gap-2"
      style={{ transformStyle: "preserve-3d" }}
    >
      <motion.div
        whileHover={{ scale: 1.2 }}
        transition={{ duration: 0.3 }}
        className="flex-shrink-0"
      >
        {zohoData ? (
          <Image 
            src={zohoData.logo} 
            alt={skill.trim()} 
            width={80} 
            height={24}
            className="object-contain h-5 sm:h-6 w-auto"
          />
        ) : (
          <IconComponent 
            className="w-4 h-4 sm:w-5 sm:h-5" 
            style={{ color: iconColor }}
          />
        )}
      </motion.div>
      {!zohoData && <span>{skill.trim()}</span>}
    </motion.div>
  );
}

export default function ClientAboutView({ data }) {
  const setVariants = useMemo(() => variants(), []);

  const aboutDataInfo = [
    {
      label: "Happy Clients",
      value: data?.noofclients || "5",
      icon: FaUsers,
      color: "#7C3AED",
    },
    {
      label: "Projects Done",
      value: data?.noOfProjects || "10",
      icon: FaProjectDiagram,
      color: "#F472B6",
    },
    {
      label: "Years Experience",
      value: data?.yearofexperience || "2",
      icon: FaBriefcase,
      color: "#14B8A6",
    },
  ];

  const skills = data?.skills
    ? data.skills.split(",")
    : [
        "React",
        "Next.js",
        "Node.js",
        "MongoDB",
        "TypeScript",
        "Tailwind CSS",
        "JavaScript",
        "Express.js",
        "HTML5",
        "CSS3",
        "Git",
        "Zoho Creator",
        "Zoho CRM",
        "Zoho Books",
        "PostgreSQL",
        "Redux",
      ];

  const techCategories = [
    { icon: FaReact, label: "Frontend", color: "#61DAFB" },
    { icon: FaNodeJs, label: "Backend", color: "#339933" },
    { icon: FaDatabase, label: "Database", color: "#47A248" },
  ];

  return (
    <div className="relative py-16 sm:py-20 overflow-hidden" id="about">
      {/* Background 3D Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: `${60 + i * 30}px`,
              height: `${60 + i * 30}px`,
              left: `${5 + i * 18}%`,
              top: `${10 + i * 12}%`,
              background: `radial-gradient(circle, ${
                i % 3 === 0
                  ? "rgba(124, 58, 237, 0.15)"
                  : i % 3 === 1
                  ? "rgba(244, 114, 182, 0.15)"
                  : "rgba(20, 184, 166, 0.15)"
              }, transparent)`,
            }}
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.3, 0.6, 0.3],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 8 + i * 2,
              repeat: Infinity,
              delay: i * 0.5,
            }}
          />
        ))}
      </div>

      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-16 relative z-10">
        {/* Stats Section with 3D cards */}
        <AnimationWrapper>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-16 sm:mb-20">
            {aboutDataInfo.map((infoItem, index) => (
              <Card3D key={index} className="w-full">
                <motion.div
                  initial={{ opacity: 0, y: 50, rotateX: -30 }}
                  whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                  transition={{ delay: index * 0.15, type: "spring", stiffness: 80 }}
                  viewport={{ once: true }}
                  whileHover={{
                    boxShadow: "0 25px 50px rgba(124, 58, 237, 0.2)",
                  }}
                  className="stats-card group"
                  style={{ transformStyle: "preserve-3d" }}
                >
                  <motion.div
                    className="w-14 h-14 sm:w-16 sm:h-16 mx-auto mb-4 rounded-2xl flex items-center justify-center"
                    style={{ 
                      background: `${infoItem.color}20`,
                      transform: "translateZ(30px)",
                    }}
                    whileHover={{ rotate: 360, scale: 1.2 }}
                    transition={{ duration: 0.6 }}
                  >
                    <infoItem.icon
                      className="w-7 h-7 sm:w-8 sm:h-8"
                      style={{ color: infoItem.color }}
                    />
                  </motion.div>
                  <div style={{ transform: "translateZ(20px)" }}>
                    <AnimatedCounter target={infoItem.value} />
                  </div>
                  <p 
                    className="text-[var(--text-secondary)] text-base sm:text-lg mt-2 font-medium"
                    style={{ transform: "translateZ(10px)" }}
                  >
                    {infoItem.label}
                  </p>
                </motion.div>
              </Card3D>
            ))}
          </div>
        </AnimationWrapper>

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
            >
              ✨ About Me
            </motion.span>
            <h2 className="section-title mb-4">
              <span className="text-[var(--text-primary)]">Why </span>
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
                Hire Me
              </motion.span>
              <span className="text-[var(--text-primary)]"> For Your</span>
              <br className="hidden sm:block" />
              <motion.span 
                className="gradient-text"
                animate={{
                  textShadow: [
                    "0 0 20px rgba(244, 114, 182, 0.5)",
                    "0 0 40px rgba(20, 184, 166, 0.5)",
                    "0 0 20px rgba(244, 114, 182, 0.5)",
                  ],
                }}
                transition={{ duration: 3, repeat: Infinity, delay: 1.5 }}
              >
                {" "}Next Project?
              </motion.span>
            </h2>
          </motion.div>
        </AnimationWrapper>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left - Image with 3D effect */}
          <AnimationWrapper>
            <motion.div
              initial={{ opacity: 0, x: -50, rotateY: 30 }}
              whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
              viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 60 }}
              className="relative max-w-md mx-auto lg:mx-0"
              style={{ transformStyle: "preserve-3d" }}
            >
              {/* Decorative Elements with 3D depth */}
              <motion.div
                className="absolute -top-3 -left-3 sm:-top-4 sm:-left-4 w-20 h-20 sm:w-24 sm:h-24 border-2 rounded-2xl opacity-30"
                style={{ 
                  borderColor: "var(--primary)",
                  transform: "translateZ(-20px)",
                }}
                animate={{ rotate: [0, 5, 0, -5, 0] }}
                transition={{ duration: 6, repeat: Infinity }}
              />
              <motion.div
                className="absolute -bottom-3 -right-3 sm:-bottom-4 sm:-right-4 w-28 h-28 sm:w-32 sm:h-32 border-2 rounded-2xl opacity-30"
                style={{ 
                  borderColor: "var(--secondary)",
                  transform: "translateZ(-30px)",
                }}
                animate={{ rotate: [0, -5, 0, 5, 0] }}
                transition={{ duration: 6, repeat: Infinity }}
              />

              {/* Image Container with 3D hover */}
              <Card3D className="relative z-10">
                <div className="rounded-2xl overflow-hidden group">
                  <motion.div
                    className="relative aspect-[4/5] w-full"
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Image
                      src={aboutMeImage}
                      alt="About Me"
                      fill
                      quality={90}
                      sizes="(max-width: 768px) 100vw, 50vw"
                      placeholder="blur"
                      className="object-cover rounded-2xl"
                    />
                    {/* Animated Overlay */}
                    <motion.div
                      className="absolute inset-0 rounded-2xl"
                      style={{
                        background:
                          "linear-gradient(135deg, rgba(124, 58, 237, 0.2), rgba(244, 114, 182, 0.2))",
                      }}
                      animate={{
                        opacity: [0, 0.3, 0],
                      }}
                      transition={{ duration: 3, repeat: Infinity }}
                    />
                  </motion.div>
                </div>
              </Card3D>

              {/* Floating Code Icon with 3D */}
              <motion.div
                className="absolute top-8 -right-2 sm:-right-4 glass-card p-3 rounded-xl"
                style={{ transform: "translateZ(40px)" }}
                animate={{ 
                  y: [0, -12, 0],
                  rotateZ: [0, 10, 0, -10, 0],
                }}
                transition={{ duration: 4, repeat: Infinity }}
              >
                <FaCode className="w-5 h-5 sm:w-6 sm:h-6" style={{ color: "var(--primary)" }} />
              </motion.div>
            </motion.div>
          </AnimationWrapper>

          {/* Right - Content with 3D effects */}
          <AnimationWrapper>
            <motion.div
              initial={{ opacity: 0, x: 50, rotateY: -20 }}
              whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
              viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 60 }}
              className="space-y-6 sm:space-y-8"
              style={{ transformStyle: "preserve-3d" }}
            >
              {/* About Text with 3D card */}
              <Card3D className="w-full">
                <motion.div 
                  className="glass-card p-5 sm:p-6 rounded-2xl"
                  whileHover={{
                    boxShadow: "0 20px 40px rgba(124, 58, 237, 0.15)",
                  }}
                >
                  <p className="text-[var(--text-secondary)] text-base sm:text-lg leading-relaxed">
                    {data?.aboutme ||
                      "I'm a passionate Full Stack Developer with expertise in building modern web applications. I love turning complex problems into simple, beautiful, and intuitive solutions. With a strong foundation in both frontend and backend technologies, I create seamless digital experiences that make a difference."}
                  </p>
                </motion.div>
              </Card3D>

              {/* Tech Categories with 3D hover */}
              <div className="flex flex-wrap gap-3 sm:gap-4">
                {techCategories.map((tech, index) => (
                  <motion.div
                    key={index}
                    className="glass-card px-4 sm:px-5 py-2.5 sm:py-3 rounded-xl flex items-center gap-2 sm:gap-3 cursor-pointer"
                    initial={{ opacity: 0, y: 20, rotateX: -20 }}
                    whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                    transition={{ delay: index * 0.1, type: "spring" }}
                    viewport={{ once: true }}
                    whileHover={{ 
                      scale: 1.08, 
                      rotateY: 10,
                      boxShadow: `0 15px 30px ${tech.color}30`,
                    }}
                    style={{ transformStyle: "preserve-3d" }}
                  >
                    <motion.div
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.5 }}
                    >
                      <tech.icon
                        className="w-4 h-4 sm:w-5 sm:h-5"
                        style={{ color: tech.color }}
                      />
                    </motion.div>
                    <span className="text-[var(--text-primary)] font-medium text-sm sm:text-base">
                      {tech.label}
                    </span>
                  </motion.div>
                ))}
              </div>

              {/* Skills with 3D badges */}
              <div>
                <h3 className="text-lg sm:text-xl font-semibold text-[var(--text-primary)] mb-3 sm:mb-4">
                  My Skills
                </h3>
                <div className="flex flex-wrap gap-2 sm:gap-3">
                  {skills.map((skill, index) => (
                    <SkillItem key={index} skill={skill} index={index} />
                  ))}
                </div>
              </div>

              {/* CTA with 3D effect */}
              <motion.button
                className="btn-gradient px-6 sm:px-8 py-3 sm:py-4 rounded-xl text-white font-semibold text-sm sm:text-base"
                whileHover={{ 
                  scale: 1.05,
                  rotateX: 5,
                  rotateY: 5,
                  boxShadow: "0 20px 40px rgba(124, 58, 237, 0.4)",
                }}
                whileTap={{ scale: 0.95 }}
                style={{ transformStyle: "preserve-3d" }}
              >
                <motion.span
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  Let's Work Together →
                </motion.span>
              </motion.button>
            </motion.div>
          </AnimationWrapper>
        </div>
      </div>
    </div>
  );
}
