"use client";
import { motion } from "framer-motion";
import AnimationWrapper from "../animation-wrapper";
import { useMemo, useRef } from "react";
import {
  FaFacebookF,
  FaLinkedinIn,
  FaInstagram,
  FaTwitter,
  FaGithub,
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

// const socialIcons = [
//   {
//     id: "facebook",
//     icon: <FaFacebookF color="#6C2DC7" className="w-[40px] h-[40px]" />,
//   },
//   {
//     id: "twitter",
//     icon: <FaTwitter color="#6C2DC7" className="w-[40px] h-[40px]" />,
//   },
//   {
//     id: "linkedin",
//     icon: <FaLinkedinIn color="#6C2DC7" className="w-[40px] h-[40px]" />,
//   },
//   {
//     id: "instagram",
//     icon: <FaInstagram color="#6C2DC7" className="w-[40px] h-[40px]" />,
//   },
// ];
const socialIcons = [
  {
    id: "github",
    icon: <FaGithub color="#6C2DC7" className="w-[40px] h-[40px]" />,
    link: "https://github.com/Danish401",
  },
  {
    id: "linkedin",
    icon: <FaLinkedinIn color="#6C2DC7" className="w-[40px] h-[40px]" />,
    link: "https://www.linkedin.com/in/danish-ali-7886a024a",
  },
  {
    id: "instagram",
    icon: <FaInstagram color="#6C2DC7" className="w-[40px] h-[40px]" />,
    link: "https://www.instagram.com/danish.ali0209/",
  },
  {
    id: "twitter",
    icon: <FaTwitter color="#6C2DC7" className="w-[40px] h-[40px]" />,
  },
];
export default function ClientHomeView({ data }) {
  console.log(data, "ClientHomeView");
  const setVariants = useMemo(() => variants(), []);
  const containerRef = useRef(null);
  return (
    <div className="max-w-screen-xl px-8 mx-auto mt-24 xl:px-16" id="home">
      <AnimationWrapper>
        <motion.div
          className={
            "grid grid-flow-row sm:grid-flow-col grid-rows-2 md:grid-rows-1 sm:grid-cols-2 gap-8 py-6 sm:py-16"
          }
          variants={setVariants}
        >
          <div className="flex flex-col items-start justify-center row-start-2 sm:row-start-1">
            <h1 className="mb-4 text-3xl font-medium leading-normal lg:text-4xl xl:text-6xl">
              {data && data.length
                ? data[0]?.heading.split(" ").map((item, index) => (
                    <span
                      key={index} // Ensure each item has a unique key
                      className={`${
                        index === 2 || index === 3
                          ? "text-[#2C94C0]"
                          : "text-[#6C2DC7]"
                      }`}
                    >
                      {item}{" "}
                    </span>
                  ))
                : null}
            </h1>
            <motion.div
              initial={{ opacity: 0, y: 20 }} // Initial animation state
              animate={{ opacity: 1, y: 0 }} // Final animation state
              transition={{ duration: 0.8, ease: "easeOut" }} // Animation timing
              whileHover={{ scale: 1.05 }} // Scale on hover
            >
              <p className="text-[#0b0e10] mt-4 mb-8 font-bold font-serif transition-all duration-300 ease-in-out hover:text-[#6C2DC7] hover:font-extrabold hover:font-[Playfair]">
                {data && data.length ? data[0]?.summary : null}
              </p>
            </motion.div>
            <motion.div className="flex gap-3 cursor-pointer">
              {socialIcons.map((item) => (
                <motion.a
                  key={item.id}
                  href={item.link || "#"} // Use '#' if no link provided
                  target="_blank" // Open in a new tab
                  rel="noopener noreferrer" // Security for links
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ rotate: 360, scale: 1 }}
                    transition={{
                      type: "spring",
                      damping: 20,
                      stiffness: 80,
                      duration: 4,
                    }}
                    whileHover={{ scale: 1.2, rotate: 360 }}
                    whileTap={{
                      scale: 0.8,
                      rotate: -360,
                      borderRadius: "100%",
                    }}
                  >
                    {item.icon}
                  </motion.div>
                </motion.a>
              ))}
            </motion.div>
          </div>
       <motion.div ref={containerRef} className="flex justify-end w-full">
            <motion.div
              drag
              dragConstraints={containerRef}
              className="w-[400px] h-[400px] relative bg-[#6C2DC7]"
            >
              <div className="w-[400px] h-[400px] top-[40px] left-[-30px] rounded-lg border-[6px] border-[#000000] absolute"></div>
              <Image
                src={aiImage}
                alt="Profile Picture"
                layout="responsive"
                quality={100}
                height={140}
                width={160}
                className="absolute top-[-15px]"
              />
            </motion.div>
          </motion.div>

        </motion.div>
      </AnimationWrapper>
    </div>
  );
}
