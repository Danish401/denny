"use client";
import { useEffect, useState } from "react";
import { Link as LinkScroll } from "react-scroll";
import { motion, AnimatePresence } from "framer-motion";
import { HiMenuAlt3, HiX } from "react-icons/hi";
import { FiSun, FiMoon } from "react-icons/fi";
import { useTheme } from "@/context/ThemeContext";

const menuItems = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "project", label: "Projects" },
  { id: "contact", label: "Contact" },
];

function CreateMenus({ activeLink, getMenuItems, setActiveLink, onClick }) {
  return getMenuItems.map((item, index) => (
    <motion.div
      key={item.id}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
    >
      <LinkScroll
        activeClass="active"
        to={item.id}
        spy={true}
        smooth={true}
        duration={1000}
        onSetActive={() => setActiveLink(item.id)}
        onClick={onClick}
        className={`px-3 lg:px-4 py-2 cursor-pointer animation-hover inline-block relative font-medium transition-all duration-300 text-sm lg:text-base
          ${
            activeLink === item.id
              ? "gradient-text animation-active"
              : "text-[var(--text-secondary)] hover:text-[var(--primary)]"
          }
        `}
      >
        {item.label}
      </LinkScroll>
    </motion.div>
  ));
}

// Theme Toggle Component
function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <motion.button
      onClick={toggleTheme}
      className="relative w-14 h-8 rounded-full bg-[var(--bg-tertiary)] border border-[var(--glass-border)] flex items-center px-1 cursor-pointer"
      whileTap={{ scale: 0.95 }}
      aria-label="Toggle theme"
    >
      <motion.div
        className="w-6 h-6 rounded-full bg-[var(--gradient-primary)] flex items-center justify-center shadow-lg"
        animate={{ x: theme === "dark" ? 22 : 0 }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
        style={{
          background: "linear-gradient(135deg, #7C3AED 0%, #F472B6 100%)",
        }}
      >
        {theme === "dark" ? (
          <FiMoon className="w-3.5 h-3.5 text-white" />
        ) : (
          <FiSun className="w-3.5 h-3.5 text-white" />
        )}
      </motion.div>
    </motion.button>
  );
}

export default function Navbar() {
  const [activeLink, setActiveLink] = useState("home");
  const [scrollActive, setScrollActive] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrollActive(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Desktop Navigation */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={`fixed top-0 w-full z-50 transition-all duration-500 ${
          scrollActive
            ? "navbar-glass shadow-lg"
            : "bg-transparent"
        }`}
      >
        <nav className="max-w-screen-xl px-4 sm:px-6 lg:px-16 mx-auto flex items-center justify-between py-3 lg:py-4">
          {/* Logo */}
          <motion.div
            className="flex items-center gap-2 sm:gap-3 cursor-pointer"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <motion.div
              className="relative w-10 h-10 sm:w-12 sm:h-12 flex justify-center items-center rounded-xl overflow-hidden"
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.8 }}
            >
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(135deg, #7C3AED 0%, #F472B6 50%, #14B8A6 100%)",
                }}
              />
              <div className="absolute inset-[2px] bg-[var(--bg-primary)] rounded-[10px] flex items-center justify-center">
                <span className="text-xl sm:text-2xl font-bold gradient-text">D</span>
              </div>
            </motion.div>
            <div className="hidden sm:flex flex-col">
              <span className="text-[var(--text-primary)] font-bold text-base lg:text-lg tracking-wide">
                Danish
              </span>
              <span className="text-xs text-[var(--text-muted)]">
                Portfolio
              </span>
            </div>
          </motion.div>

          {/* Desktop Menu */}
          <ul className="hidden lg:flex items-center gap-1">
            <CreateMenus
              setActiveLink={setActiveLink}
              activeLink={activeLink}
              getMenuItems={menuItems}
            />
          </ul>

          {/* Right Side - Theme Toggle & CTA */}
          <div className="flex items-center gap-3 sm:gap-4">
            {/* Theme Toggle */}
            <ThemeToggle />

            {/* CTA Button - Desktop */}
            <div className="hidden lg:block">
              <LinkScroll to="contact" spy={true} smooth={true} duration={1000}>
                <motion.button
                  className="btn-gradient px-5 py-2.5 rounded-xl text-white font-semibold text-sm"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Let's Talk
                </motion.button>
              </LinkScroll>
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              className="lg:hidden p-2 rounded-lg glass text-[var(--text-primary)]"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              whileTap={{ scale: 0.9 }}
            >
              {mobileMenuOpen ? <HiX size={24} /> : <HiMenuAlt3 size={24} />}
            </motion.button>
          </div>
        </nav>
      </motion.header>

      {/* Mobile Navigation Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            />
            
            {/* Mobile Menu */}
            <motion.nav
              initial={{ opacity: 0, x: "100%" }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: "100%" }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="fixed top-0 right-0 h-full w-[280px] z-50 bg-[var(--bg-primary)] border-l border-[var(--glass-border)] lg:hidden"
            >
              <div className="p-6 flex flex-col h-full">
                {/* Close Button */}
                <div className="flex justify-end mb-8">
                  <motion.button
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-2 rounded-lg glass text-[var(--text-primary)]"
                    whileTap={{ scale: 0.9 }}
                  >
                    <HiX size={24} />
                  </motion.button>
                </div>

                {/* Menu Items */}
                <div className="flex flex-col gap-4">
                  {menuItems.map((item, index) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <LinkScroll
                        to={item.id}
                        spy={true}
                        smooth={true}
                        duration={1000}
                        onClick={() => setMobileMenuOpen(false)}
                        className={`block text-lg font-medium py-3 px-4 rounded-xl transition-all duration-300 ${
                          activeLink === item.id
                            ? "bg-[var(--bg-tertiary)] gradient-text"
                            : "text-[var(--text-secondary)] hover:bg-[var(--bg-secondary)]"
                        }`}
                      >
                        {item.label}
                      </LinkScroll>
                    </motion.div>
                  ))}
                </div>

                {/* CTA Button */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="mt-auto"
                >
                  <LinkScroll
                    to="contact"
                    spy={true}
                    smooth={true}
                    duration={1000}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <button className="btn-gradient w-full py-4 rounded-xl text-white font-semibold text-lg">
                      Let's Talk
                    </button>
                  </LinkScroll>
                </motion.div>
              </div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>

      {/* Bottom Mobile Nav */}
      <nav className="fixed lg:hidden bottom-0 left-0 right-0 z-40 mobile-nav px-2 py-2 safe-area-inset-bottom">
        <ul className="flex justify-around items-center max-w-md mx-auto">
          {menuItems.map((item) => (
            <LinkScroll
              key={item.id}
              to={item.id}
              spy={true}
              smooth={true}
              duration={1000}
              onSetActive={() => setActiveLink(item.id)}
              className="flex flex-col items-center cursor-pointer p-2 min-w-[60px]"
            >
              <span
                className={`text-xs font-medium transition-all duration-300 ${
                  activeLink === item.id
                    ? "gradient-text"
                    : "text-[var(--text-muted)]"
                }`}
              >
                {item.label}
              </span>
              {activeLink === item.id && (
                <motion.div
                  layoutId="activeIndicator"
                  className="w-1.5 h-1.5 rounded-full mt-1"
                  style={{
                    background: "linear-gradient(135deg, #7C3AED, #F472B6)",
                  }}
                />
              )}
            </LinkScroll>
          ))}
        </ul>
      </nav>
    </>
  );
}
