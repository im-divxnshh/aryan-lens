"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";

const links = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Showcase", href: "#showcase" },
  { name: "Services", href: "#services" },
  { name: "Testimonials", href: "#testimonials" },
  { name: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [activeLink, setActiveLink] = useState("#home");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const offsets = links.map(link => {
        const el = document.querySelector(link.href);
        return el ? { href: link.href, top: el.getBoundingClientRect().top } : null;
      }).filter(Boolean);

      const current = offsets.find(o => o!.top > -200) || offsets[offsets.length - 1];
      if (current) setActiveLink(current.href);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLinkClick = (href: string) => {
    setActiveLink(href);
    setIsMobileMenuOpen(false);
    const element = document.querySelector(href);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="fixed top-0 w-full z-50 bg-black/70 backdrop-blur-lg shadow-md text-white px-6 py-4 flex justify-between items-center"
    >
<motion.h1
  className="text-3xl font-extrabold flex flex-wrap gap-1"
  initial="hidden"
  animate="visible"
  variants={{
    hidden: {},
    visible: { transition: { staggerChildren: 0.06 } },
  }}
>
  {"Aryan's Lens".split("").map((char, idx) => (
    <motion.span
      key={idx}
      whileHover={{ scale: 1.3, rotate: 10, color: "#ec4899" }}
      whileTap={{ scale: 0.9, rotate: -10 }}
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 300 }}
      className="text-transparent bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text"
    >
      {char === " " ? "\u00A0" : char}
    </motion.span>
  ))}
</motion.h1>

      {/* Desktop Menu */}
      <ul className="hidden md:flex gap-6 text-lg">
        {links.map(link => (
          <li key={link.href}>
            <button
              onClick={() => handleLinkClick(link.href)}
              className={`relative transition-all duration-300 hover:text-pink-400 cursor-pointer ${
                activeLink === link.href ? "text-pink-500" : ""
              }`}
            >
              {link.name}
              {activeLink === link.href && (
                <motion.div
                  layoutId="underline"
                  className="absolute bottom-0 left-0 w-full h-[2px] bg-pink-500 rounded"
                />
              )}
            </button>
          </li>
        ))}
      </ul>

      {/* Mobile Menu */}
      <div className="md:hidden">
        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="cursor-pointer">
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        {isMobileMenuOpen && (
          <motion.div
            initial={{ x: 300 }}
            animate={{ x: 0 }}
            exit={{ x: 300 }}
            className="absolute top-16 right-0 w-3/4 h-screen bg-zinc-900 p-6 shadow-lg"
          >
            <ul className="flex flex-col gap-4 text-lg">
              {links.map(link => (
                <li key={link.href}>
                  <button
                    onClick={() => handleLinkClick(link.href)}
                    className={`cursor-pointer transition-colors ${
                      activeLink === link.href
                        ? "text-pink-500 font-semibold"
                        : "text-white hover:text-pink-400"
                    }`}
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </div>
    </motion.nav>
  );
}
