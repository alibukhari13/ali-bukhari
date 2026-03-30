/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/immutability */
// components/sections/Hero.tsx
"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { X } from "lucide-react";
import { supabase } from "@/lib/supabase";

const Hero = () => {
  const [heroData, setHeroData] = useState<any>(null);
  const [isZoomed, setIsZoomed] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchHero();
  }, []);

  const fetchHero = async () => {
    const { data } = await supabase.from("hero").select("*").single();
    if (data) setHeroData(data);
    setLoading(false);
  };

  useEffect(() => {
    if (isZoomed) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isZoomed]);

  if (loading) return null;

  return (
    <section
      id="home"
      className="relative min-h-screen w-full flex flex-col items-center justify-start overflow-hidden bg-[var(--background)]"
    >
      <div className="hero-oval-pattern" />

      <div className="relative z-10 w-full flex flex-col items-center pt-[160px] md:pt-[100px] text-center px-4 md:px-6">
        {/* Profile Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative mb-8 md:mb-10 cursor-pointer group"
          onClick={() => setIsZoomed(true)}
        >
          <div className="absolute inset-0 bg-[var(--accent)]/10 blur-[50px] rounded-full scale-125 group-hover:bg-[var(--accent)]/20 transition-all duration-500" />
          <motion.div
            layoutId="profile-image"
            className="relative w-32 h-32 sm:w-40 sm:h-40 md:w-44 md:h-44 rounded-full border border-[var(--border-color)] p-1.5 bg-gradient-to-b from-white/10 to-transparent shadow-2xl"
          >
            <div className="w-full h-full rounded-full overflow-hidden bg-[var(--card-bg)] border border-[var(--border-color)]">
              <img
                src={heroData.image_url}
                alt="Profile"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
            </div>
            <div className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
              <span className="text-white text-[8px] sm:text-[10px] font-bold uppercase tracking-widest">
                View Image
              </span>
            </div>
          </motion.div>
        </motion.div>

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6, ease: "easeOut" }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-[70px] font-black tracking-tighter text-[var(--foreground)] leading-[1.1] mb-3 uppercase px-4"
        >
          {heroData.title}
        </motion.h1>

        {/* Subtitle */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6, ease: "easeOut" }}
          className="text-base sm:text-lg md:text-[20px] font-bold text-[var(--accent)] mb-6 md:mb-10 uppercase tracking-[3px] md:tracking-[4px]"
        >
          {heroData.subtitle}
        </motion.div>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6, ease: "easeOut" }}
          className="text-[var(--gray-light)] text-sm sm:text-base md:text-lg lg:text-[19px] leading-relaxed md:leading-[1.6] max-w-[90%] sm:max-w-[85%] md:max-w-[800px] lg:max-w-[850px] font-normal px-4"
        >
          {heroData.description}
        </motion.p>

        {/* Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6, ease: "easeOut" }}
          className="mt-10 md:mt-14"
        >
          <Link
            href="#contact"
            className="inline-block px-8 md:px-12 py-3 md:py-4 border border-[var(--border-color)] text-[var(--foreground)] rounded-full text-sm md:text-base font-semibold hover:border-[var(--accent)] hover:bg-[var(--accent)]/5 transition-all duration-300 shadow-lg"
          >
            Contact Me
          </Link>
        </motion.div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {isZoomed && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-12">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsZoomed(false)}
              className="absolute inset-0 bg-black/90 backdrop-blur-2xl cursor-zoom-out"
            />
            <motion.div
              layoutId="profile-image"
              className="relative w-full max-w-[280px] sm:max-w-[400px] md:max-w-[500px] aspect-square rounded-3xl overflow-hidden border border-white/10 shadow-3xl z-10"
            >
              <img
                src={heroData.image_url}
                alt="Profile Large"
                className="w-full h-full object-cover"
              />
              <button
                onClick={() => setIsZoomed(false)}
                className="absolute top-3 right-3 sm:top-6 sm:right-6 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-black/50 border border-white/10 flex items-center justify-center text-white hover:bg-accent hover:text-black transition-all cursor-pointer"
              >
                <X size={18} className="sm:w-5 sm:h-5" />
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Hero;