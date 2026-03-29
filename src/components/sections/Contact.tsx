// components/Contact.tsx
"use client";

import React from "react";
import { motion } from "framer-motion";
import { Mail, Send } from "lucide-react";

const LinkedInIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24" height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const Contact = () => {
  return (
    <section id="contact" className="relative w-full py-32 bg-[var(--background)] flex flex-col items-center px-6 overflow-hidden">
      <div className="text-center mb-20 flex flex-col items-center relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-[64px] font-black tracking-tighter text-[var(--foreground)] leading-none uppercase"
        >
          Get In Touch
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="text-[13px] font-bold text-[var(--accent)] tracking-[2px] mt-3"
        >
          Lets <span className="text-[var(--foreground)]">work together</span>
        </motion.p>
      </div>

      <div className="max-w-[1100px] w-full grid grid-cols-1 lg:grid-cols-2 gap-16 relative z-10">
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="flex flex-col justify-center"
        >
          <h3 className="text-3xl font-bold text-[var(--foreground)] mb-6 tracking-tight">
            Let&apos;s build something <span className="text-[var(--accent)]">extraordinary</span>.
          </h3>
          <p className="text-[var(--gray-light)] text-lg mb-12 leading-relaxed max-w-md font-medium">
            I&apos;m currently open to new opportunities and collaborations. Feel free to reach out via email or connect with me on LinkedIn.
          </p>

          <div className="space-y-6">
            <div className="flex items-center gap-6 group cursor-default">
              <div className="w-14 h-14 rounded-2xl bg-[var(--input-bg)] border border-[var(--border-color)] flex items-center justify-center text-[var(--accent)] group-hover:bg-[var(--accent)] group-hover:text-black transition-all duration-500 shadow-[0_0_15px_rgba(255,140,0,0.1)]">
                <Mail size={24} />
              </div>
              <div>
                <p className="text-[10px] font-bold text-[var(--gray-muted)] uppercase tracking-widest mb-1">Email Me</p>
                <p className="text-[var(--foreground)] font-bold text-lg">syedalibukharishah16@gmail.com</p>
              </div>
            </div>

            <a href="https://www.linkedin.com/in/syedalieman/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-6 group cursor-pointer">
              <div className="w-14 h-14 rounded-2xl bg-[var(--input-bg)] border border-[var(--border-color)] flex items-center justify-center text-[var(--accent)] group-hover:bg-[var(--accent)] group-hover:text-black transition-all duration-500 shadow-[0_0_15px_rgba(255,140,0,0.1)]">
                <LinkedInIcon />
              </div>
              <div>
                <p className="text-[10px] font-bold text-[var(--gray-muted)] uppercase tracking-widest mb-1">LinkedIn</p>
                <p className="text-[var(--foreground)] font-bold text-lg group-hover:text-[var(--accent)] transition-colors">Syed Ali Eman</p>
              </div>
            </a>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="p-8 md:p-10 rounded-2xl bg-[var(--card-bg)] border border-[var(--card-border)] relative overflow-hidden"
        >
          <form className="space-y-6 relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-[var(--gray-muted)] uppercase tracking-widest ml-1">Name</label>
                <input type="text" placeholder="Your Name" className="w-full bg-[var(--input-bg)] border border-[var(--border-color)] rounded-xl px-5 py-4 text-[var(--foreground)] outline-none focus:border-[var(--accent)] transition-all text-sm shadow-none" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-[var(--gray-muted)] uppercase tracking-widest ml-1">Email</label>
                <input type="email" placeholder="Email Address" className="w-full bg-[var(--input-bg)] border border-[var(--border-color)] rounded-xl px-5 py-4 text-[var(--foreground)] outline-none focus:border-[var(--accent)] transition-all text-sm shadow-none" />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-bold text-[var(--gray-muted)] uppercase tracking-widest ml-1">Message</label>
              <textarea rows={5} placeholder="How can I help you?" className="w-full bg-[var(--input-bg)] border border-[var(--border-color)] rounded-xl px-5 py-4 text-[var(--foreground)] outline-none focus:border-[var(--accent)] transition-all resize-none text-sm shadow-none"></textarea>
            </div>

            <button type="submit" className="w-full py-5 bg-[var(--accent)] text-black font-black uppercase tracking-[3px] text-xs rounded-xl flex items-center justify-center gap-3 hover:brightness-110 active:scale-[0.98] transition-all shadow-lg shadow-[var(--accent)]/20 cursor-pointer">
              Send Message <Send size={18} />
            </button>
          </form>
        </motion.div>
      </div>

      <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-[var(--accent)]/5 blur-[120px] rounded-full -z-10" />
    </section>
  );
};

export default Contact;