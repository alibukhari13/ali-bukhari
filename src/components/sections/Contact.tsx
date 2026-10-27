/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Mail, Send, MapPin, Phone, Clock } from "lucide-react";
import { supabase } from "@/lib/supabase";
import SectionHeader from "@/components/ui/SectionHeader";
import SectionBackdrop from "@/components/ui/SectionBackdrop";
import NeuralField from "@/components/charts/NeuralField";
import { easeOut } from "@/lib/motion";

const LinkedInIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

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

  const details = [
    {
      icon: Mail,
      label: "Email",
      value: contactData.email,
      href: `mailto:${contactData.email}`,
    },
    {
      icon: Phone,
      label: "Phone",
      value: "+92 329 6590026",
      href: "tel:+923296590026",
    },
    {
      icon: MapPin,
      label: "Location",
      value: "Lahore, Punjab, Pakistan",
      href: null,
    },
    {
      icon: LinkedInIcon,
      label: "LinkedIn",
      value: contactData.linkedin_name,
      href: contactData.linkedin_url,
    },
    {
      icon: Clock,
      label: "Availability",
      value: "Open to full-time & freelance",
      href: null,
    },
  ];

  return (
    <section id="contact" className="section-shell">
      <SectionBackdrop variant="waves" />
      <div className="pointer-events-none absolute inset-0 opacity-25">
        <NeuralField density="normal" />
      </div>

      <div className="relative z-10 mx-auto max-w-[1100px]">
        <SectionHeader
          title="Get In Touch"
          subtitle="Share the role, project, or interview brief — I usually reply within 24 hours."
        />

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[0.92fr_1.08fr] lg:gap-8">
          <motion.div
            initial={{ opacity: 0, x: -14 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: easeOut }}
            className="panel p-5 md:p-6"
          >
            <h3 className="font-display text-2xl text-[var(--foreground)] md:text-[28px]">
              Let&apos;s build something{" "}
              <span className="text-[var(--accent)]">worth shipping</span>.
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-[var(--gray-light)]">
              Based in Lahore. Available for technical interviews, contract work, and
              full-time product roles across web and Shopify.
            </p>

            <div className="mt-6 space-y-2.5">
              {details.map((item) => {
                const Icon = item.icon;
                const inner = (
                  <div className="flex items-start gap-3 border border-[var(--border-color)] bg-[var(--input-bg)] p-3 transition hover:border-[var(--accent)]/40">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center border border-[var(--border-color)] text-[var(--accent)]">
                      <Icon size={16} />
                    </div>
                    <div className="min-w-0">
                      <p className="text-[10px] font-bold uppercase tracking-widest text-[var(--gray-muted)]">
                        {item.label}
                      </p>
                      <p className="break-words text-sm font-medium text-[var(--foreground)]">
                        {item.value}
                      </p>
                    </div>
                  </div>
                );

                return item.href ? (
                  <a
                    key={item.label}
                    href={item.href}
                    target={item.href.startsWith("http") ? "_blank" : undefined}
                    rel="noopener noreferrer"
                  >
                    {inner}
                  </a>
                ) : (
                  <div key={item.label}>{inner}</div>
                );
              })}
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
                <label className="text-[10px] font-bold uppercase tracking-widest text-[var(--gray-muted)]">
                  Full name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Your name"
                  className="w-full border border-[var(--border-color)] bg-[var(--input-bg)] px-4 py-3 text-sm outline-none transition focus:border-[var(--accent)]"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-[var(--gray-muted)]">
                  Work email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="you@company.com"
                  className="w-full border border-[var(--border-color)] bg-[var(--input-bg)] px-4 py-3 text-sm outline-none transition focus:border-[var(--accent)]"
                />
              </div>
            </div>

            <div className="mt-4 space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-[var(--gray-muted)]">
                Subject
              </label>
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="Interview / Freelance / Collaboration"
                className="w-full border border-[var(--border-color)] bg-[var(--input-bg)] px-4 py-3 text-sm outline-none transition focus:border-[var(--accent)]"
              />
            </div>

            <div className="mt-4 space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-[var(--gray-muted)]">
                Message
              </label>
              <textarea
                rows={6}
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                placeholder="Role details, timeline, stack, or interview slot…"
                className="w-full resize-none border border-[var(--border-color)] bg-[var(--input-bg)] px-4 py-3 text-sm outline-none transition focus:border-[var(--accent)]"
              />
            </div>

            <motion.button
              whileHover={{ y: -1 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={status === "sending"}
              className="mt-6 flex w-full items-center justify-center gap-2 bg-[var(--accent)] py-4 text-xs font-black uppercase tracking-[0.2em] text-black transition hover:brightness-110 disabled:opacity-50"
            >
              {status === "sending" ? "Sending..." : "Send Message"} <Send size={15} />
            </motion.button>

            {status === "success" && (
              <p className="mt-3 text-center text-xs text-emerald-500">
                Message sent successfully. I&apos;ll get back soon.
              </p>
            )}
            {status === "error" && (
              <p className="mt-3 text-center text-xs text-red-500">
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
