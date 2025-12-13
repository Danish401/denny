"use client";

import { useEffect, useState, useRef } from "react";
import AnimationWrapper from "../animation-wrapper";
import { motion, AnimatePresence, useMotionValue, useTransform } from "framer-motion";
import { addData } from "@/services";
import {
  FaPaperPlane,
  FaEnvelope,
  FaMapMarkerAlt,
  FaPhone,
  FaLinkedinIn,
  FaGithub,
  FaInstagram,
  FaCheckCircle,
  FaHeart,
} from "react-icons/fa";

const controls = [
  {
    name: "name",
    placeholder: "John Doe",
    type: "text",
    label: "Your Name",
    icon: "👤",
  },
  {
    name: "email",
    placeholder: "john@example.com",
    type: "email",
    label: "Email Address",
    icon: "✉️",
  },
  {
    name: "message",
    placeholder: "Tell me about your project...",
    type: "textarea",
    label: "Your Message",
    icon: "💬",
  },
];

const contactInfo = [
  {
    icon: FaEnvelope,
    label: "Email",
    value: "alid13381@gmail.com",
    link: "mailto:alid13381@gmail.com",
    color: "#7C3AED",
  },
  {
    icon: FaPhone,
    label: "Phone",
    value: "+91 7009236647",
    link: "tel:+917009236647",
    color: "#F472B6",
  },
  {
    icon: FaMapMarkerAlt,
    label: "Location",
    value: "India",
    color: "#14B8A6",
  },
];

const socialLinks = [
  { icon: FaLinkedinIn, href: "https://www.linkedin.com/in/danish-ali-7886a024a", color: "#0A66C2" },
  { icon: FaGithub, href: "https://github.com/Danish401", color: "var(--text-primary)" },
  { icon: FaInstagram, href: "https://www.instagram.com/danish.ali0209/", color: "#E4405F" },
];

const initialFormData = {
  name: "",
  email: "",
  message: "",
};

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

// Input Field Component with Floating Label and 3D effect
function InputField({ control, value, onChange, focused, onFocus, onBlur }) {
  const isTextarea = control.type === "textarea";
  const hasValue = value && value.length > 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, rotateX: -15 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true }}
      transition={{ type: "spring", stiffness: 100 }}
      className="relative"
      style={{ transformStyle: "preserve-3d" }}
    >
      {/* Floating Label */}
      <motion.label
        className={`absolute left-4 transition-all duration-300 pointer-events-none text-[var(--text-muted)] ${
          focused || hasValue
            ? "top-2 text-xs"
            : isTextarea
            ? "top-4 text-sm sm:text-base"
            : "top-1/2 -translate-y-1/2 text-sm sm:text-base"
        }`}
        style={focused || hasValue ? { color: "var(--primary)" } : {}}
      >
        <span className="mr-2">{control.icon}</span>
        {control.label}
      </motion.label>

      {isTextarea ? (
        <motion.textarea
          id={control.name}
          name={control.name}
          value={value}
          onChange={onChange}
          onFocus={onFocus}
          onBlur={onBlur}
          className="w-full input-field px-4 pt-7 sm:pt-8 pb-3 sm:pb-4 min-h-[130px] sm:min-h-[150px] resize-none rounded-xl text-sm sm:text-base"
          whileFocus={{ scale: 1.01 }}
        />
      ) : (
        <motion.input
          id={control.name}
          name={control.name}
          type={control.type}
          value={value}
          onChange={onChange}
          onFocus={onFocus}
          onBlur={onBlur}
          className="w-full input-field px-4 pt-6 pb-2 h-14 sm:h-16 rounded-xl text-sm sm:text-base"
          whileFocus={{ scale: 1.01 }}
        />
      )}

      {/* Focus Ring with glow */}
      {focused && (
        <motion.div
          layoutId={`focus-ring-${control.name}`}
          className="absolute inset-0 rounded-xl pointer-events-none"
          style={{ 
            border: "2px solid var(--primary)",
            boxShadow: "0 0 20px rgba(124, 58, 237, 0.3)",
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        />
      )}
    </motion.div>
  );
}

export default function ClientContactView() {
  const [formData, setFormData] = useState(initialFormData);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [focusedField, setFocusedField] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSendMessage() {
    setIsSubmitting(true);
    const res = await addData("contact", formData);

    if (res && res.success) {
      setFormData(initialFormData);
      setShowSuccessMessage(true);
    }
    setIsSubmitting(false);
  }

  useEffect(() => {
    if (showSuccessMessage) {
      const timer = setTimeout(() => {
        setShowSuccessMessage(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showSuccessMessage]);

  const isValidForm = () => {
    return (
      formData.name !== "" && formData.email !== "" && formData.message !== ""
    );
  };

  return (
    <div className="relative py-16 sm:py-20 overflow-hidden" id="contact">
      {/* Background 3D Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full opacity-20"
            style={{
              width: `${100 + i * 50}px`,
              height: `${100 + i * 50}px`,
              left: `${10 + i * 20}%`,
              top: `${20 + i * 15}%`,
              background: `linear-gradient(135deg, ${
                i % 2 === 0 ? "var(--primary)" : "var(--secondary)"
              }, transparent)`,
              filter: "blur(40px)",
            }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.1, 0.2, 0.1],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 10 + i * 2,
              repeat: Infinity,
              delay: i * 0.5,
            }}
          />
        ))}
      </div>

      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-16 relative z-10">
        {/* Section Header */}
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
              📬 Get In Touch
            </motion.span>
            <h2 className="section-title mb-4">
              <span className="text-[var(--text-primary)]">Let's </span>
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
                Connect
              </motion.span>
            </h2>
            <p className="text-[var(--text-secondary)] max-w-2xl mx-auto text-sm sm:text-base">
              Have a project in mind? Let's work together to create something
              amazing.
            </p>
          </motion.div>
        </AnimationWrapper>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Left Side - Contact Info */}
          <AnimationWrapper className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, x: -50, rotateY: 20 }}
              whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
              viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 80 }}
              className="space-y-4 sm:space-y-6"
              style={{ transformStyle: "preserve-3d" }}
            >
              {/* Contact Cards with 3D effect */}
              {contactInfo.map((info, index) => (
                <Card3D key={index} className="w-full">
                  <motion.div
                    initial={{ opacity: 0, y: 20, rotateX: -15 }}
                    whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                    transition={{ delay: index * 0.1, type: "spring" }}
                    viewport={{ once: true }}
                    whileHover={{ 
                      scale: 1.02, 
                      x: 8,
                      boxShadow: "0 20px 40px rgba(124, 58, 237, 0.2)",
                    }}
                    className="glass-card p-4 sm:p-5 rounded-2xl flex items-center gap-3 sm:gap-4 cursor-pointer"
                  >
                    <motion.div
                      className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center"
                      style={{ background: `${info.color}20` }}
                      whileHover={{ rotate: 360, scale: 1.1 }}
                      transition={{ duration: 0.5 }}
                    >
                      <info.icon
                        className="w-4 h-4 sm:w-5 sm:h-5"
                        style={{ color: info.color }}
                      />
                    </motion.div>
                    <div>
                      <p className="text-xs sm:text-sm text-[var(--text-muted)]">
                        {info.label}
                      </p>
                      {info.link ? (
                        <a
                          href={info.link}
                          className="text-[var(--text-primary)] font-medium text-sm sm:text-base hover:text-[var(--primary)] transition-colors"
                        >
                          {info.value}
                        </a>
                      ) : (
                        <p className="text-[var(--text-primary)] font-medium text-sm sm:text-base">
                          {info.value}
                        </p>
                      )}
                    </div>
                  </motion.div>
                </Card3D>
              ))}

              {/* Social Links with 3D effect */}
              <Card3D className="w-full">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, type: "spring" }}
                  viewport={{ once: true }}
                  className="glass-card p-5 sm:p-6 rounded-2xl"
                >
                  <p className="text-[var(--text-muted)] mb-3 sm:mb-4 text-sm sm:text-base">
                    Connect with me
                  </p>
                  <div className="flex gap-3 sm:gap-4">
                    {socialLinks.map((social, index) => (
                      <motion.a
                        key={index}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center"
                        style={{ background: "var(--bg-tertiary)" }}
                        whileHover={{ 
                          scale: 1.15, 
                          y: -5,
                          rotateY: 180,
                          boxShadow: `0 10px 30px ${social.color}40`,
                        }}
                        whileTap={{ scale: 0.9 }}
                        initial={{ opacity: 0, rotateY: -90 }}
                        animate={{ opacity: 1, rotateY: 0 }}
                        transition={{ delay: index * 0.1, type: "spring" }}
                      >
                        <social.icon
                          className="w-4 h-4 sm:w-5 sm:h-5"
                          style={{ color: social.color }}
                        />
                      </motion.a>
                    ))}
                  </div>
                </motion.div>
              </Card3D>

              {/* Quote with 3D effect */}
              <Card3D className="w-full hidden sm:block">
                <motion.div
                  initial={{ opacity: 0, y: 20, rotateX: -10 }}
                  whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                  transition={{ delay: 0.4, type: "spring" }}
                  viewport={{ once: true }}
                  className="glass-card p-5 sm:p-6 rounded-2xl"
                >
                  <motion.p 
                    className="text-base sm:text-lg text-[var(--text-secondary)] italic"
                    animate={{
                      opacity: [0.8, 1, 0.8],
                    }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    "Great things are built one line of code at a time."
                  </motion.p>
                  <p className="mt-2" style={{ color: "var(--primary)" }}>
                    — Danish Ali
                  </p>
                </motion.div>
              </Card3D>
            </motion.div>
          </AnimationWrapper>

          {/* Right Side - Contact Form with 3D effect */}
          <AnimationWrapper className="lg:col-span-3">
            <Card3D className="w-full">
              <motion.div
                initial={{ opacity: 0, x: 50, rotateY: -20 }}
                whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
                viewport={{ once: true }}
                transition={{ type: "spring", stiffness: 80 }}
                className="glass-card p-5 sm:p-8 rounded-3xl"
                style={{ transformStyle: "preserve-3d" }}
              >
                <div className="space-y-4 sm:space-y-6">
                  {controls.map((control, index) => (
                    <motion.div
                      key={control.name}
                      initial={{ opacity: 0, x: 30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      viewport={{ once: true }}
                    >
                      <InputField
                        control={control}
                        value={formData[control.name]}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            [control.name]: e.target.value,
                          })
                        }
                        focused={focusedField === control.name}
                        onFocus={() => setFocusedField(control.name)}
                        onBlur={() => setFocusedField(null)}
                      />
                    </motion.div>
                  ))}

                  {/* Success Message */}
                  <AnimatePresence>
                    {showSuccessMessage && (
                      <motion.div
                        initial={{ opacity: 0, y: -10, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.9 }}
                        className="flex items-center gap-3 p-4 rounded-xl"
                        style={{
                          background: "rgba(34, 197, 94, 0.1)",
                          border: "1px solid rgba(34, 197, 94, 0.3)",
                        }}
                      >
                        <FaCheckCircle className="text-green-500 w-5 h-5" />
                        <span className="text-green-500 text-sm sm:text-base">
                          Message sent successfully! I'll get back to you soon.
                        </span>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Submit Button with 3D effect */}
                  <motion.button
                    disabled={!isValidForm() || isSubmitting}
                    onClick={handleSendMessage}
                    className="w-full btn-gradient py-3.5 sm:py-4 rounded-xl text-white font-semibold text-base sm:text-lg flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
                    whileHover={isValidForm() ? { 
                      scale: 1.02,
                      boxShadow: "0 20px 40px rgba(124, 58, 237, 0.4)",
                      rotateX: 5,
                    } : {}}
                    whileTap={isValidForm() ? { scale: 0.98 } : {}}
                    style={{ transformStyle: "preserve-3d" }}
                  >
                    {isSubmitting ? (
                      <>
                        <motion.div
                          className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                          animate={{ rotate: 360 }}
                          transition={{
                            duration: 1,
                            repeat: Infinity,
                            ease: "linear",
                          }}
                        />
                        Sending...
                      </>
                    ) : (
                      <>
                        <motion.span
                          animate={{ 
                            x: [0, 5, 0],
                            rotate: [0, 15, 0],
                          }}
                          transition={{ duration: 2, repeat: Infinity }}
                        >
                          <FaPaperPlane className="w-4 h-4 sm:w-5 sm:h-5" />
                        </motion.span>
                        Send Message
                      </>
                    )}
                  </motion.button>

                  {/* Form hint */}
                  <p className="text-center text-[var(--text-muted)] text-xs sm:text-sm">
                    I typically respond within 24 hours
                  </p>
                </div>
              </motion.div>
            </Card3D>
          </AnimationWrapper>
        </div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-16 sm:mt-20 pt-8 sm:pt-10"
          style={{ borderTop: "1px solid var(--glass-border)" }}
        >
          <motion.p 
            className="text-[var(--text-muted)] text-sm sm:text-base flex items-center justify-center gap-2 flex-wrap"
            animate={{ opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            © 2024 Danish Ali. Built with
            <motion.span
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              <FaHeart className="text-red-500 w-4 h-4" />
            </motion.span>
            using Next.js & Framer Motion
          </motion.p>
        </motion.div>
      </div>

      {/* Add padding at bottom for mobile nav */}
      <div className="h-16 lg:hidden" />
    </div>
  );
}
