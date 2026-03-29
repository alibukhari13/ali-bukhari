/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { X } from "lucide-react"; // Close icon ke liye

const Hero = () => {
  const [isZoomed, setIsZoomed] = useState(false);

  // Jab image bari ho to scroll lock ho jaye
  useEffect(() => {
    if (isZoomed) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "auto";
  }, [isZoomed]);

  return (
    <section
      id="home"
      className="relative min-h-screen w-full flex flex-col items-center justify-start overflow-hidden bg-[var(--background)]"
    >
      {/* Background Pattern */}
      <div className="hero-oval-pattern" />

      <div className="relative z-10 w-full flex flex-col items-center pt-[139px] text-center px-6">
        
        {/* PROFILE IMAGE CONTAINER */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="relative mb-10 cursor-pointer group"
          onClick={() => setIsZoomed(true)}
        >
          {/* Subtle Glow behind profile */}
          <div className="absolute inset-0 bg-[var(--accent)]/10 blur-[50px] rounded-full scale-125 group-hover:bg-[var(--accent)]/20 transition-all duration-500" />
          
          {/* The Circular Image Frame */}
          <motion.div 
            layoutId="profile-image"
            className="relative w-44 h-44 rounded-full border border-[var(--border-color)] p-1.5 bg-gradient-to-b from-white/10 to-transparent shadow-2xl"
          >
            <div className="w-full h-full rounded-full overflow-hidden bg-[var(--card-bg)] border border-[var(--border-color)]">
              <img
                src="/profile.jpeg"
                alt="Profile Syed Ali Eman"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
            </div>
            {/* Click Hint */}
            <div className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
              <span className="text-white text-[10px] font-bold uppercase tracking-widest">View Image</span>
            </div>
          </motion.div>
        </motion.div>

        {/* TEXT CONTENT */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="text-6xl md:text-[70px] font-black tracking-tighter text-[var(--foreground)] leading-none mb-4 uppercase"
        >
          SYED ALI EMAN
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="text-lg md:text-[20px] font-bold text-[var(--accent)] mb-10 uppercase tracking-[4px]"
        >
          Web Developer 🧙‍♂️
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="text-[var(--gray-light)] text-lg md:text-[19px] leading-[1.6] max-w-[850px] font-normal"
        >
          As a passionate Web Developer, I focus on building responsive and
          efficient web applications. I enjoy crafting clean code, improving
          user experience, and bringing creative ideas to life through modern
          technologies.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="mt-14"
        >
          <Link
            href="#contact"
            className="inline-block px-12 py-4 border border-[var(--border-color)] text-[var(--foreground)] rounded-full text-base font-semibold hover:border-[var(--accent)] hover:bg-[var(--accent)]/5 transition-all duration-300 shadow-lg"
          >
            Contact Me
          </Link>
        </motion.div>
      </div>

      {/* LIGHTBOX / FULL IMAGE POPUP */}
      <AnimatePresence>
        {isZoomed && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-12">
            {/* Dark Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsZoomed(false)}
              className="absolute inset-0 bg-black/90 backdrop-blur-2xl cursor-zoom-out"
            />

            {/* Enlarged Image Container */}
            <motion.div
              layoutId="profile-image"
              className="relative w-full max-w-[500px] aspect-square rounded-3xl overflow-hidden border border-white/10 shadow-3xl z-10"
            >
              <img 
                src="/profile.jpeg" 
                alt="Profile Large" 
                className="w-full h-full object-cover" 
              />
              
              {/* Close Button */}
              <button 
                onClick={() => setIsZoomed(false)}
                className="absolute top-6 right-6 w-10 h-10 rounded-full bg-black/50 border border-white/10 flex items-center justify-center text-white hover:bg-accent hover:text-black transition-all cursor-pointer"
              >
                <X size={20} />
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Hero;