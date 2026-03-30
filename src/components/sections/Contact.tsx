/* eslint-disable react-hooks/immutability */
/* eslint-disable @typescript-eslint/no-explicit-any */

// components/sections/Contact.tsx
"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Mail, Send } from "lucide-react";
import { supabase } from "@/lib/supabase";

const LinkedInIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
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
  const [contactData, setContactData] = useState<any>(null);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchContact();
  }, []);

  const fetchContact = async () => {
    const { data } = await supabase.from("contact").select("*").single();
    if (data) setContactData(data);
    setLoading(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    const { error } = await supabase.from("messages").insert([formData]);
    if (error) {
      setStatus("error");
      console.error(error);
    } else {
      setStatus("success");
      setFormData({ name: "", email: "", message: "" });
      setTimeout(() => setStatus(""), 3000);
    }
  };

  if (loading) return null;

  return (
    <section
      id="contact"
      className="relative w-full pt-16 md:pt-24 lg:pt-32 pb-20 md:pb-28 lg:pb-32 bg-[var(--background)] flex flex-col items-center px-4 md:px-6 overflow-hidden"
    >
      <div className="text-center mb-12 md:mb-16 lg:mb-20 flex flex-col items-center relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-4xl md:text-5xl lg:text-[64px] font-black tracking-tighter text-[var(--foreground)] leading-none uppercase"
        >
          Get In Touch
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-xs md:text-[13px] font-bold text-[var(--accent)] tracking-[2px] mt-2 md:mt-3"
        >
          Lets <span className="text-[var(--foreground)]">work together</span>
        </motion.p>
      </div>

      <div className="max-w-[1100px] w-full grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 relative z-10">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="flex flex-col justify-center"
        >
          <h3 className="text-2xl md:text-3xl font-bold text-[var(--foreground)] mb-4 md:mb-6 tracking-tight">
            Let&apos;s build something{" "}
            <span className="text-[var(--accent)]">extraordinary</span>.
          </h3>
          <p className="text-[var(--gray-light)] text-base md:text-lg mb-8 md:mb-12 leading-relaxed max-w-md font-medium">
            I&apos;m currently open to new opportunities and collaborations. Feel free to reach
            out via email or connect with me on LinkedIn.
          </p>

          <div className="space-y-5 md:space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.4 }}
              className="flex items-center gap-4 md:gap-6 group cursor-default"
            >
              <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-[var(--input-bg)] border border-[var(--border-color)] flex items-center justify-center text-[var(--accent)] group-hover:bg-[var(--accent)] group-hover:text-black transition-all duration-500 shadow-[0_0_15px_rgba(255,140,0,0.1)]">
                <Mail size={20} className="md:w-6 md:h-6" />
              </div>
              <div>
                <p className="text-[9px] md:text-[10px] font-bold text-[var(--gray-muted)] uppercase tracking-widest mb-1">
                  Email Me
                </p>
                <p className="text-[var(--foreground)] font-bold text-base md:text-lg break-all">
                  {contactData.email}
                </p>
              </div>
            </motion.div>

            <motion.a
              href={contactData.linkedin_url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.4 }}
              className="flex items-center gap-4 md:gap-6 group cursor-pointer"
            >
              <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-[var(--input-bg)] border border-[var(--border-color)] flex items-center justify-center text-[var(--accent)] group-hover:bg-[var(--accent)] group-hover:text-black transition-all duration-500 shadow-[0_0_15px_rgba(255,140,0,0.1)]">
                <LinkedInIcon />
              </div>
              <div>
                <p className="text-[9px] md:text-[10px] font-bold text-[var(--gray-muted)] uppercase tracking-widest mb-1">
                  LinkedIn
                </p>
                <p className="text-[var(--foreground)] font-bold text-base md:text-lg group-hover:text-[var(--accent)] transition-colors">
                  {contactData.linkedin_name}
                </p>
              </div>
            </motion.a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="p-6 md:p-8 lg:p-10 rounded-2xl bg-[var(--card-bg)] border border-[var(--card-border)] relative overflow-hidden"
        >
          <form onSubmit={handleSubmit} className="space-y-5 md:space-y-6 relative z-10">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 md:gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-[var(--gray-muted)] uppercase tracking-widest ml-1">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Your Name"
                  className="w-full bg-[var(--input-bg)] border border-[var(--border-color)] rounded-xl px-4 md:px-5 py-3 md:py-4 text-[var(--foreground)] outline-none focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)] transition-all text-sm shadow-none"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-[var(--gray-muted)] uppercase tracking-widest ml-1">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="Email Address"
                  className="w-full bg-[var(--input-bg)] border border-[var(--border-color)] rounded-xl px-4 md:px-5 py-3 md:py-4 text-[var(--foreground)] outline-none focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)] transition-all text-sm shadow-none"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-bold text-[var(--gray-muted)] uppercase tracking-widest ml-1">
                Message
              </label>
              <textarea
                rows={5}
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                placeholder="How can I help you?"
                className="w-full bg-[var(--input-bg)] border border-[var(--border-color)] rounded-xl px-4 md:px-5 py-3 md:py-4 text-[var(--foreground)] outline-none focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)] transition-all resize-none text-sm shadow-none"
              />
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={status === "sending"}
              className="w-full py-4 md:py-5 bg-[var(--accent)] text-black font-black uppercase tracking-[3px] text-xs rounded-xl flex items-center justify-center gap-2 md:gap-3 hover:brightness-110 transition-all shadow-lg shadow-[var(--accent)]/20 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {status === "sending" ? "Sending..." : "Send Message"} <Send size={16} className="md:w-[18px] md:h-[18px]" />
            </motion.button>
            {status === "success" && (
              <p className="text-green-500 text-xs text-center">Message sent successfully!</p>
            )}
            {status === "error" && (
              <p className="text-red-500 text-xs text-center">Failed to send. Please try again.</p>
            )}
          </form>
        </motion.div>
      </div>

      <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-[var(--accent)]/5 blur-[120px] rounded-full -z-10" />
    </section>
  );
};

export default Contact;