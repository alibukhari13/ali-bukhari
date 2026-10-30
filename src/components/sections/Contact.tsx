/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Mail, Send, MapPin, Phone, Clock } from "lucide-react";
import { FaLinkedinIn } from "react-icons/fa6";
import { supabase } from "@/lib/supabase";
import { easeOut } from "@/lib/motion";
import Reveal from "@/components/ui/Reveal";
import MotionOrnament from "@/components/ui/MotionOrnament";

const FALLBACK_CONTACT = {
  email: "syedalibukharishah16@gmail.com",
  linkedin_url: "https://www.linkedin.com/in/syedalieman/",
  linkedin_name: "Syed Ali Eman",
};

const Contact = () => {
  const [contactData, setContactData] = useState<any>(FALLBACK_CONTACT);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState("");

  useEffect(() => {
    const fetchContact = async () => {
      const { data } = await supabase.from("contact").select("*").single();
      if (data) setContactData(data);
    };
    fetchContact();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    const payload = {
      name: formData.name,
      email: formData.email,
      message: formData.subject
        ? `[${formData.subject}] ${formData.message}`
        : formData.message,
    };
    const { error } = await supabase.from("messages").insert([payload]);
    if (error) setStatus("error");
    else {
      setStatus("success");
      setFormData({ name: "", email: "", subject: "", message: "" });
      setTimeout(() => setStatus(""), 3000);
    }
  };

  return (
    <section id="contact" className="section-shell isolate">
      <MotionOrnament variant="orbit" className="-left-20 top-12 h-64 w-64 sm:h-80 sm:w-80" />
      <div className="relative z-10 mx-auto max-w-[1240px]">
        <Reveal className="mb-10 grid gap-5 md:mb-14 md:grid-cols-[.9fr_1.1fr] md:items-end">
          <div><p className="mb-3 text-xs font-semibold uppercase tracking-[.18em] text-[var(--accent)]">Have something in mind?</p><h2 className="font-display text-4xl font-bold leading-[1] tracking-[-.055em] text-[var(--foreground)] sm:text-5xl">Let&apos;s make it<br/>work beautifully<span className="text-[var(--accent)]">.</span></h2></div>
          <p className="max-w-lg text-base leading-relaxed text-[var(--gray-light)]">Tell me a little about the project, team or role. I&apos;m always happy to talk through a good idea.</p>
        </Reveal>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[0.92fr_1.08fr] lg:gap-8">
          <motion.div
            initial={{ opacity: 0, x: -14 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: easeOut }}
            className="contact-invite relative isolate overflow-hidden rounded-[1.9rem] border border-[#2c4533] bg-[#18281d] p-6 text-white shadow-[0_28px_75px_rgba(17,36,25,.18)] md:p-8"
          >
            <div className="contact-invite-orbit pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full border border-white/[.08]" />
            <div className="pointer-events-none absolute -right-6 -top-6 h-56 w-56 rounded-full border border-white/[.07]" />
            <div className="relative z-10 flex min-h-full flex-col">
              <div className="inline-flex w-fit items-center gap-2 rounded-full border border-white/15 bg-white/[.06] px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[.14em] text-white/75"><span className="h-1.5 w-1.5 rounded-full bg-[#a8dba0]"/> Open to the right opportunity</div>
              <h3 className="mt-7 max-w-[460px] font-display text-[clamp(2rem,3.2vw,3.15rem)] font-semibold leading-[.98] tracking-[-.06em] text-white">Let&apos;s build something<br/><span className="text-[#b5d9a8]">worth shipping.</span></h3>
              <p className="mt-4 max-w-md text-sm leading-[1.75] text-white/65">Based in Lahore and open to thoughtful collaborations, product roles, and Shopify work. Have a challenge in mind? Let&apos;s talk it through.</p>

              <a href={`mailto:${contactData.email}`} className="group mt-7 flex items-center justify-between gap-3 rounded-2xl border border-white/10 bg-white/[.06] p-3.5 transition hover:border-[#b5d9a8]/50 hover:bg-white/[.09] sm:p-4">
                <span className="flex min-w-0 items-center gap-3"><span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#b5d9a8] text-[#18281d]"><Mail size={17}/></span><span className="min-w-0"><span className="block text-[9px] font-semibold uppercase tracking-[.14em] text-white/45">Start with an email</span><span className="mt-1 block break-all text-xs font-medium text-white sm:text-sm">{contactData.email}</span></span></span>
                <ArrowUpRight size={18} className="shrink-0 text-white/55 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[#b5d9a8]"/>
              </a>

              <div className="mt-auto grid grid-cols-2 gap-3 border-t border-white/10 pt-5 sm:mt-8">
                <div className="flex items-start gap-2.5"><MapPin size={15} className="mt-0.5 shrink-0 text-[#b5d9a8]"/><div><p className="text-[9px] font-semibold uppercase tracking-[.13em] text-white/40">Location</p><p className="mt-1 text-xs text-white/75">Lahore, Pakistan</p></div></div>
                <div className="flex items-start gap-2.5"><Clock size={15} className="mt-0.5 shrink-0 text-[#b5d9a8]"/><div><p className="text-[9px] font-semibold uppercase tracking-[.13em] text-white/40">Availability</p><p className="mt-1 text-xs text-white/75">Full-time & freelance</p></div></div>
                <a href="tel:+923296590026" className="flex items-center gap-2.5 text-xs text-white/65 transition hover:text-white"><Phone size={14} className="text-[#b5d9a8]"/>+92 329 6590026</a>
                <a href={contactData.linkedin_url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2.5 text-xs text-white/65 transition hover:text-white"><FaLinkedinIn size={14} aria-hidden="true"/>{contactData.linkedin_name}</a>
              </div>
            </div>
          </motion.div>

          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, x: 14 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: easeOut }}
            className="panel p-5 md:p-7"
          >
            <p className="mb-5 text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--accent)]">
              Send a message
            </p>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <label htmlFor="contact-name" className="text-[10px] font-bold uppercase tracking-widest text-[var(--gray-muted)]">
                  Full name
                </label>
                <input
                  type="text"
                  id="contact-name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Your name"
                  className="w-full rounded-xl border border-[var(--border-color)] bg-[var(--input-bg)] px-4 py-3.5 text-sm outline-none transition placeholder:text-[var(--gray-muted)] focus:border-[var(--accent)] focus:ring-4 focus:ring-[var(--accent)]/10"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="contact-email" className="text-[10px] font-bold uppercase tracking-widest text-[var(--gray-muted)]">
                  Work email
                </label>
                <input
                  type="email"
                  id="contact-email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="you@company.com"
                  className="w-full rounded-xl border border-[var(--border-color)] bg-[var(--input-bg)] px-4 py-3.5 text-sm outline-none transition placeholder:text-[var(--gray-muted)] focus:border-[var(--accent)] focus:ring-4 focus:ring-[var(--accent)]/10"
                />
              </div>
            </div>

            <div className="mt-4 space-y-2">
              <label htmlFor="contact-subject" className="text-[10px] font-bold uppercase tracking-widest text-[var(--gray-muted)]">
                Subject
              </label>
              <input
                type="text"
                id="contact-subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="Interview / Freelance / Collaboration"
                className="w-full rounded-xl border border-[var(--border-color)] bg-[var(--input-bg)] px-4 py-3.5 text-sm outline-none transition placeholder:text-[var(--gray-muted)] focus:border-[var(--accent)] focus:ring-4 focus:ring-[var(--accent)]/10"
              />
            </div>

            <div className="mt-4 space-y-2">
              <label htmlFor="contact-message" className="text-[10px] font-bold uppercase tracking-widest text-[var(--gray-muted)]">
                Message
              </label>
              <textarea
                rows={6}
                id="contact-message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                placeholder="Role details, timeline, stack, or interview slot…"
                className="w-full resize-none rounded-xl border border-[var(--border-color)] bg-[var(--input-bg)] px-4 py-3.5 text-sm outline-none transition placeholder:text-[var(--gray-muted)] focus:border-[var(--accent)] focus:ring-4 focus:ring-[var(--accent)]/10"
              />
            </div>

            <motion.button
              whileHover={{ y: -1 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={status === "sending"}
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-[var(--accent)] py-4 text-sm font-semibold text-[var(--accent-ink)] shadow-lg shadow-[var(--accent)]/15 transition hover:-translate-y-0.5 hover:brightness-105 disabled:opacity-50"
            >
              {status === "sending" ? "Sending..." : "Send Message"} <Send size={15} />
            </motion.button>

            {status === "success" && (
              <p role="status" aria-live="polite" className="mt-3 text-center text-xs text-emerald-500">
                Message sent successfully. I&apos;ll get back soon.
              </p>
            )}
            {status === "error" && (
              <p role="alert" className="mt-3 text-center text-xs text-red-500">
                Failed to send. Email me directly instead.
              </p>
            )}
          </motion.form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
