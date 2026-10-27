/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  LayoutDashboard,
  LogOut,
  Plus,
  Save,
  Trash2,
  Pencil,
  Mail,
  Loader2,
  Lock,
} from "lucide-react";
import { supabase } from "@/lib/supabase";

const TABS = [
  { id: "hero", label: "Hero" },
  { id: "about", label: "About" },
  { id: "services", label: "Services" },
  { id: "projects", label: "Projects" },
  { id: "contact", label: "Contact" },
  { id: "footer", label: "Footer" },
  { id: "messages", label: "Messages" },
] as const;

const inputClass =
  "w-full border border-[var(--border-color)] bg-[var(--input-bg)] px-3.5 py-3 text-sm text-[var(--foreground)] outline-none transition placeholder:text-[var(--gray-muted)] focus:border-[var(--accent)]";
const labelClass =
  "mb-1.5 block text-[10px] font-bold uppercase tracking-[0.16em] text-[var(--gray-muted)]";
const panelClass =
  "border border-[var(--border-color)] bg-[var(--card-bg)] p-5 md:p-6";
const btnPrimary =
  "inline-flex items-center justify-center gap-2 bg-[var(--accent)] px-5 py-2.5 text-xs font-bold uppercase tracking-[0.14em] text-black transition hover:brightness-110 disabled:opacity-50";
const btnGhost =
  "inline-flex items-center justify-center gap-2 border border-[var(--border-color)] px-4 py-2.5 text-xs font-semibold uppercase tracking-[0.14em] text-[var(--foreground)] transition hover:border-[var(--accent)]";

export default function AdminPanel() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [loggingIn, setLoggingIn] = useState(false);
  const [activeTab, setActiveTab] = useState<(typeof TABS)[number]["id"]>("hero");
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState("");

  const [hero, setHero] = useState<any>({});
  const [about, setAbout] = useState<any>({});
  const [services, setServices] = useState<any[]>([]);
  const [projects, setProjects] = useState<any[]>([]);
  const [contact, setContact] = useState<any>({});
  const [footer, setFooter] = useState<any>({});
  const [messages, setMessages] = useState<any[]>([]);

  const [showServiceModal, setShowServiceModal] = useState(false);
  const [editingService, setEditingService] = useState<any>(null);
  const [serviceForm, setServiceForm] = useState({
    title: "",
    description: "",
    icon_name: "Globe",
    order_index: 0,
  });

  const [showProjectModal, setShowProjectModal] = useState(false);
  const [editingProject, setEditingProject] = useState<any>(null);
  const [projectForm, setProjectForm] = useState({
    title: "",
    category: "",
    description: "",
    full_detail: "",
    image_url: "",
    tagsString: "",
    link: "",
    order_index: 0,
  });

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (sessionStorage.getItem("admin_auth") === "1") {
      setIsAuthenticated(true);
      fetchAllData();
    }
  }, []);

  const notify = (msg: string) => {
    setToast(msg);
    window.setTimeout(() => setToast(""), 2400);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");
    setLoggingIn(true);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        setLoginError(data.error || "Login failed");
        return;
      }
      sessionStorage.setItem("admin_auth", "1");
      setIsAuthenticated(true);
      fetchAllData();
    } catch {
      setLoginError("Could not reach login API.");
    } finally {
      setLoggingIn(false);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem("admin_auth");
    setIsAuthenticated(false);
    setEmail("");
    setPassword("");
  };

  const fetchAllData = async () => {
    setLoading(true);
    try {
      const [
        heroRes,
        aboutRes,
        servicesRes,
        projectsRes,
        contactRes,
        footerRes,
        msgRes,
      ] = await Promise.all([
        supabase.from("hero").select("*").single(),
        supabase.from("about").select("*").single(),
        supabase.from("services").select("*").order("order_index"),
        supabase.from("projects").select("*").order("order_index"),
        supabase.from("contact").select("*").single(),
        supabase.from("footer").select("*").single(),
        supabase.from("messages").select("*").order("created_at", { ascending: false }),
      ]);

      if (heroRes.data) setHero(heroRes.data);
      if (aboutRes.data) setAbout(aboutRes.data);
      if (servicesRes.data) setServices(servicesRes.data);
      if (projectsRes.data) setProjects(projectsRes.data);
      if (contactRes.data) setContact(contactRes.data);
      if (footerRes.data) setFooter(footerRes.data);
      if (msgRes.data) setMessages(msgRes.data);
    } catch (err) {
      console.error(err);
      notify("Failed to load data");
    } finally {
      setLoading(false);
    }
  };

  const getNextOrderIndex = (items: any[]) =>
    items.reduce((max, item) => Math.max(max, item.order_index || 0), 0) + 1;

  const updateHero = async () => {
    setSaving(true);
    const { error } = await supabase.from("hero").update(hero).eq("id", hero.id);
    notify(error ? error.message : "Hero saved");
    setSaving(false);
  };

  const updateAbout = async () => {
    setSaving(true);
    const { error } = await supabase.from("about").update(about).eq("id", about.id);
    notify(error ? error.message : "About saved");
    setSaving(false);
  };

  const updateContact = async () => {
    setSaving(true);
    const { error } = await supabase.from("contact").update(contact).eq("id", contact.id);
    notify(error ? error.message : "Contact saved");
    setSaving(false);
  };

  const updateFooter = async () => {
    setSaving(true);
    const { error } = await supabase.from("footer").update(footer).eq("id", footer.id);
    notify(error ? error.message : "Footer saved");
    setSaving(false);
  };

  const openAddService = () => {
    setEditingService(null);
    setServiceForm({
      title: "",
      description: "",
      icon_name: "Globe",
      order_index: getNextOrderIndex(services),
    });
    setShowServiceModal(true);
  };

  const openEditService = (service: any) => {
    setEditingService(service);
    setServiceForm({
      title: service.title,
      description: service.description,
      icon_name: service.icon_name,
      order_index: service.order_index,
    });
    setShowServiceModal(true);
  };

  const saveService = async () => {
    const { title, description, icon_name, order_index } = serviceForm;
    if (!title.trim()) return notify("Title is required");
    setSaving(true);

    if (editingService) {
      const { error } = await supabase
        .from("services")
        .update({ title, description, icon_name, order_index })
        .eq("id", editingService.id);
      if (!error) {
        setServices(
          services.map((s) =>
            s.id === editingService.id
              ? { ...s, title, description, icon_name, order_index }
              : s
          )
        );
      }
      notify(error ? error.message : "Service updated");
    } else {
      const { data, error } = await supabase
        .from("services")
        .insert([{ title, description, icon_name, order_index }])
        .select();
      if (!error && data?.[0]) setServices([...services, data[0]]);
      notify(error ? error.message : "Service added");
    }
    setSaving(false);
    setShowServiceModal(false);
  };

  const deleteService = async (id: number) => {
    if (!confirm("Delete this service?")) return;
    setSaving(true);
    const { error } = await supabase.from("services").delete().eq("id", id);
    if (!error) setServices(services.filter((s) => s.id !== id));
    notify(error ? error.message : "Service deleted");
    setSaving(false);
  };

  const openAddProject = () => {
    setEditingProject(null);
    setProjectForm({
      title: "",
      category: "",
      description: "",
      full_detail: "",
      image_url: "",
      tagsString: "",
      link: "",
      order_index: getNextOrderIndex(projects),
    });
    setShowProjectModal(true);
  };

  const openEditProject = (project: any) => {
    setEditingProject(project);
    setProjectForm({
      title: project.title,
      category: project.category,
      description: project.description || "",
      full_detail: project.full_detail || "",
      image_url: project.image_url || "",
      tagsString: (project.tags || []).join(", "),
      link: project.link || "",
      order_index: project.order_index,
    });
    setShowProjectModal(true);
  };

  const saveProject = async () => {
    const {
      title,
      category,
      description,
      full_detail,
      image_url,
      tagsString,
      link,
      order_index,
    } = projectForm;
    if (!title.trim() || !category.trim()) return notify("Title and category required");

    const tags = tagsString
      .split(",")
      .map((tag) => tag.trim())
      .filter(Boolean);

    setSaving(true);
    if (editingProject) {
      const { error } = await supabase
        .from("projects")
        .update({
          title,
          category,
          description,
          full_detail,
          image_url,
          tags,
          link,
          order_index,
        })
        .eq("id", editingProject.id);
      if (!error) {
        setProjects(
          projects.map((p) =>
            p.id === editingProject.id
              ? {
                  ...p,
                  title,
                  category,
                  description,
                  full_detail,
                  image_url,
                  tags,
                  link,
                  order_index,
                }
              : p
          )
        );
      }
      notify(error ? error.message : "Project updated");
    } else {
      const { data, error } = await supabase
        .from("projects")
        .insert([
          {
            title,
            category,
            description,
            full_detail,
            image_url,
            tags,
            link,
            order_index,
          },
        ])
        .select();
      if (!error && data?.[0]) setProjects([...projects, data[0]]);
      notify(error ? error.message : "Project added");
    }
    setSaving(false);
    setShowProjectModal(false);
  };

  const deleteProject = async (id: number) => {
    if (!confirm("Delete this project?")) return;
    setSaving(true);
    const { error } = await supabase.from("projects").delete().eq("id", id);
    if (!error) setProjects(projects.filter((p) => p.id !== id));
    notify(error ? error.message : "Project deleted");
    setSaving(false);
  };

  const deleteMessage = async (id: number) => {
    if (!confirm("Delete this message?")) return;
    setSaving(true);
    const { error } = await supabase.from("messages").delete().eq("id", id);
    if (!error) setMessages(messages.filter((m) => m.id !== id));
    notify(error ? error.message : "Message deleted");
    setSaving(false);
  };

  const safeJsonStringify = (obj: any) => {
    try {
      return JSON.stringify(obj, null, 2);
    } catch {
      return "[]";
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="relative flex min-h-screen items-center justify-center overflow-hidden px-4">
        <div className="pointer-events-none absolute inset-0 section-grid opacity-30" />
        <div className="pointer-events-none absolute -left-20 top-20 h-64 w-64 rounded-full bg-[var(--accent)]/15 blur-[100px]" />
        <div className="pointer-events-none absolute -right-16 bottom-16 h-72 w-72 rounded-full bg-[var(--accent)]/10 blur-[110px]" />

        <form
          onSubmit={handleLogin}
          className="relative z-10 w-full max-w-md border border-[var(--border-color)] bg-[var(--card-bg)] p-7 backdrop-blur-md md:p-8"
        >
          <div className="mb-6 flex h-11 w-11 items-center justify-center border border-[var(--accent)]/35 bg-[var(--accent-soft)] text-[var(--accent)]">
            <Lock size={18} />
          </div>
          <h1 className="font-display text-3xl uppercase tracking-tight text-[var(--foreground)]">
            Admin Access
          </h1>
          <p className="mt-2 text-sm text-[var(--gray-muted)]">
            Sign in with the email and password from your `.env.local`.
          </p>

          <div className="mt-7 space-y-4">
            <div>
              <label className={labelClass}>Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={inputClass}
                placeholder="admin@email.com"
                required
                autoComplete="username"
              />
            </div>
            <div>
              <label className={labelClass}>Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={inputClass}
                placeholder="••••••••"
                required
                autoComplete="current-password"
              />
            </div>
          </div>

          {loginError && (
            <p className="mt-4 text-sm text-red-400">{loginError}</p>
          )}

          <button type="submit" disabled={loggingIn} className={`${btnPrimary} mt-6 w-full`}>
            {loggingIn ? (
              <>
                <Loader2 size={14} className="animate-spin" /> Signing in…
              </>
            ) : (
              "Sign In"
            )}
          </button>

          <Link
            href="/"
            className="mt-4 flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-wider text-[var(--gray-muted)] transition hover:text-[var(--accent)]"
          >
            <ArrowLeft size={12} /> Back to site
          </Link>
        </form>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center gap-3 text-[var(--gray-light)]">
        <Loader2 className="animate-spin text-[var(--accent)]" size={20} />
        Loading dashboard…
      </div>
    );
  }

  return (
    <div className="relative min-h-screen">
      <div className="pointer-events-none absolute inset-0 section-grid opacity-20" />

      {toast && (
        <div className="fixed right-4 top-4 z-[80] border border-[var(--accent)]/35 bg-[var(--background)] px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-[var(--accent)] shadow-lg">
          {toast}
        </div>
      )}

      <header className="sticky top-0 z-40 border-b border-[var(--border-color)] bg-[var(--background)]/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 md:px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center border border-[var(--accent)]/30 bg-[var(--accent-soft)] text-[var(--accent)]">
              <LayoutDashboard size={16} />
            </div>
            <div>
              <p className="font-display text-lg uppercase leading-none text-[var(--foreground)]">
                Admin
              </p>
              <p className="mt-1 text-[10px] uppercase tracking-wider text-[var(--gray-muted)]">
                Portfolio CMS
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Link href="/" className={btnGhost}>
              <ArrowLeft size={13} /> Site
            </Link>
            <button type="button" onClick={handleLogout} className={btnGhost}>
              <LogOut size={13} /> Logout
            </button>
          </div>
        </div>
      </header>

      <div className="relative z-10 mx-auto max-w-6xl px-4 py-8 md:px-6 md:py-10">
        <div className="mb-8 flex flex-wrap gap-2 border-b border-[var(--border-color)] pb-4">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`px-3.5 py-2 text-[11px] font-bold uppercase tracking-[0.14em] transition ${
                activeTab === tab.id
                  ? "bg-[var(--accent)] text-black"
                  : "border border-[var(--border-color)] text-[var(--gray-light)] hover:border-[var(--accent)]/40 hover:text-[var(--foreground)]"
              }`}
            >
              {tab.label}
              {tab.id === "messages" && messages.length > 0 ? (
                <span className="ml-1.5 inline-flex h-4 min-w-4 items-center justify-center bg-black/20 px-1 text-[9px]">
                  {messages.length}
                </span>
              ) : null}
            </button>
          ))}
        </div>

        {activeTab === "hero" && (
          <div className={`${panelClass} space-y-4`}>
            <h2 className="font-display text-xl uppercase text-[var(--foreground)]">Hero</h2>
            <div>
              <label className={labelClass}>Title</label>
              <input
                className={inputClass}
                value={hero.title || ""}
                onChange={(e) => setHero({ ...hero, title: e.target.value })}
              />
            </div>
            <div>
              <label className={labelClass}>Subtitle</label>
              <input
                className={inputClass}
                value={hero.subtitle || ""}
                onChange={(e) => setHero({ ...hero, subtitle: e.target.value })}
              />
            </div>
            <div>
              <label className={labelClass}>Description</label>
              <textarea
                className={inputClass}
                rows={4}
                value={hero.description || ""}
                onChange={(e) => setHero({ ...hero, description: e.target.value })}
              />
            </div>
            <div>
              <label className={labelClass}>Image URL</label>
              <input
                className={inputClass}
                value={hero.image_url || ""}
                onChange={(e) => setHero({ ...hero, image_url: e.target.value })}
              />
            </div>
            <button type="button" onClick={updateHero} disabled={saving} className={btnPrimary}>
              <Save size={14} /> {saving ? "Saving…" : "Save Hero"}
            </button>
          </div>
        )}

        {activeTab === "about" && (
          <div className={`${panelClass} space-y-4`}>
            <h2 className="font-display text-xl uppercase text-[var(--foreground)]">About</h2>
            <div>
              <label className={labelClass}>Description paragraphs (JSON array)</label>
              <textarea
                className={`${inputClass} font-mono text-xs`}
                rows={7}
                value={safeJsonStringify(about.description_texts)}
                onChange={(e) => {
                  try {
                    setAbout({ ...about, description_texts: JSON.parse(e.target.value) });
                  } catch {
                    /* ignore while typing */
                  }
                }}
              />
            </div>
            <div>
              <label className={labelClass}>Stats (JSON array)</label>
              <textarea
                className={`${inputClass} font-mono text-xs`}
                rows={7}
                value={safeJsonStringify(about.stats)}
                onChange={(e) => {
                  try {
                    setAbout({ ...about, stats: JSON.parse(e.target.value) });
                  } catch {
                    /* ignore while typing */
                  }
                }}
              />
            </div>
            <button type="button" onClick={updateAbout} disabled={saving} className={btnPrimary}>
              <Save size={14} /> {saving ? "Saving…" : "Save About"}
            </button>
          </div>
        )}

        {activeTab === "services" && (
          <div className="space-y-5">
            <div className="flex items-center justify-between gap-3">
              <h2 className="font-display text-xl uppercase text-[var(--foreground)]">Services</h2>
              <button type="button" onClick={openAddService} className={btnPrimary}>
                <Plus size={14} /> Add
              </button>
            </div>
            <div className="grid gap-3">
              {services.map((service) => (
                <div key={service.id} className={`${panelClass} flex items-start justify-between gap-4`}>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-wider text-[var(--accent)]">
                      #{service.order_index} · {service.icon_name}
                    </p>
                    <h3 className="mt-1 font-display text-lg text-[var(--foreground)]">
                      {service.title}
                    </h3>
                    <p className="mt-1 text-sm text-[var(--gray-light)]">{service.description}</p>
                  </div>
                  <div className="flex shrink-0 gap-2">
                    <button type="button" onClick={() => openEditService(service)} className={btnGhost}>
                      <Pencil size={13} />
                    </button>
                    <button
                      type="button"
                      onClick={() => deleteService(service.id)}
                      className="inline-flex h-[38px] w-[38px] items-center justify-center border border-red-500/30 text-red-400 transition hover:bg-red-500/10"
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "projects" && (
          <div className="space-y-5">
            <div className="flex items-center justify-between gap-3">
              <h2 className="font-display text-xl uppercase text-[var(--foreground)]">Projects</h2>
              <button type="button" onClick={openAddProject} className={btnPrimary}>
                <Plus size={14} /> Add
              </button>
            </div>
            <div className="grid gap-3">
              {projects.map((project) => (
                <div key={project.id} className={`${panelClass} flex items-start justify-between gap-4`}>
                  <div className="min-w-0">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-[var(--accent)]">
                      #{project.order_index} · {project.category}
                    </p>
                    <h3 className="mt-1 font-display text-lg text-[var(--foreground)]">
                      {project.title}
                    </h3>
                    <p className="mt-1 truncate text-sm text-[var(--gray-muted)]">{project.link}</p>
                    {(project.tags || []).length > 0 && (
                      <p className="mt-2 text-xs text-[var(--gray-light)]">
                        {(project.tags || []).join(" · ")}
                      </p>
                    )}
                  </div>
                  <div className="flex shrink-0 gap-2">
                    <button type="button" onClick={() => openEditProject(project)} className={btnGhost}>
                      <Pencil size={13} />
                    </button>
                    <button
                      type="button"
                      onClick={() => deleteProject(project.id)}
                      className="inline-flex h-[38px] w-[38px] items-center justify-center border border-red-500/30 text-red-400 transition hover:bg-red-500/10"
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "contact" && (
          <div className={`${panelClass} space-y-4`}>
            <h2 className="font-display text-xl uppercase text-[var(--foreground)]">Contact</h2>
            <div>
              <label className={labelClass}>Email</label>
              <input
                className={inputClass}
                type="email"
                value={contact.email || ""}
                onChange={(e) => setContact({ ...contact, email: e.target.value })}
              />
            </div>
            <div>
              <label className={labelClass}>LinkedIn URL</label>
              <input
                className={inputClass}
                value={contact.linkedin_url || ""}
                onChange={(e) => setContact({ ...contact, linkedin_url: e.target.value })}
              />
            </div>
            <div>
              <label className={labelClass}>LinkedIn name</label>
              <input
                className={inputClass}
                value={contact.linkedin_name || ""}
                onChange={(e) => setContact({ ...contact, linkedin_name: e.target.value })}
              />
            </div>
            <button type="button" onClick={updateContact} disabled={saving} className={btnPrimary}>
              <Save size={14} /> {saving ? "Saving…" : "Save Contact"}
            </button>
          </div>
        )}

        {activeTab === "footer" && (
          <div className={`${panelClass} space-y-4`}>
            <h2 className="font-display text-xl uppercase text-[var(--foreground)]">Footer</h2>
            <div>
              <label className={labelClass}>Logo text</label>
              <input
                className={inputClass}
                value={footer.logo_text || ""}
                onChange={(e) => setFooter({ ...footer, logo_text: e.target.value })}
              />
            </div>
            <div>
              <label className={labelClass}>Tagline</label>
              <input
                className={inputClass}
                value={footer.tagline || ""}
                onChange={(e) => setFooter({ ...footer, tagline: e.target.value })}
              />
            </div>
            {[
              ["navigation_links", "Navigation links (JSON)"],
              ["portfolio_links", "Portfolio links (JSON)"],
              ["social_links", "Social links (JSON)"],
            ].map(([key, label]) => (
              <div key={key}>
                <label className={labelClass}>{label}</label>
                <textarea
                  className={`${inputClass} font-mono text-xs`}
                  rows={4}
                  value={safeJsonStringify(footer[key])}
                  onChange={(e) => {
                    try {
                      setFooter({ ...footer, [key]: JSON.parse(e.target.value) });
                    } catch {
                      /* ignore while typing */
                    }
                  }}
                />
              </div>
            ))}
            <div>
              <label className={labelClass}>Cloud text</label>
              <input
                className={inputClass}
                value={footer.cloud_text || ""}
                onChange={(e) => setFooter({ ...footer, cloud_text: e.target.value })}
              />
            </div>
            <div>
              <label className={labelClass}>Copyright</label>
              <input
                className={inputClass}
                value={footer.copyright_text || ""}
                onChange={(e) => setFooter({ ...footer, copyright_text: e.target.value })}
              />
            </div>
            <div>
              <label className={labelClass}>Designed by</label>
              <input
                className={inputClass}
                value={footer.designed_by || ""}
                onChange={(e) => setFooter({ ...footer, designed_by: e.target.value })}
              />
            </div>
            <button type="button" onClick={updateFooter} disabled={saving} className={btnPrimary}>
              <Save size={14} /> {saving ? "Saving…" : "Save Footer"}
            </button>
          </div>
        )}

        {activeTab === "messages" && (
          <div className="space-y-4">
            <h2 className="font-display text-xl uppercase text-[var(--foreground)]">Messages</h2>
            {messages.length === 0 && (
              <div className={`${panelClass} text-sm text-[var(--gray-muted)]`}>
                No messages yet.
              </div>
            )}
            {messages.map((msg) => (
              <div key={msg.id} className={`${panelClass} flex items-start justify-between gap-4`}>
                <div>
                  <div className="flex items-center gap-2 text-[var(--accent)]">
                    <Mail size={14} />
                    <p className="text-sm font-semibold text-[var(--foreground)]">
                      {msg.name} · {msg.email}
                    </p>
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-[var(--gray-light)]">
                    {msg.message}
                  </p>
                  <p className="mt-2 text-[10px] uppercase tracking-wider text-[var(--gray-muted)]">
                    {new Date(msg.created_at).toLocaleString()}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => deleteMessage(msg.id)}
                  className="inline-flex h-[38px] w-[38px] shrink-0 items-center justify-center border border-red-500/30 text-red-400 transition hover:bg-red-500/10"
                >
                  <Trash2 size={13} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {showServiceModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
          <div className="w-full max-w-lg border border-[var(--border-color)] bg-[var(--background)] p-6">
            <h3 className="font-display text-xl uppercase">
              {editingService ? "Edit Service" : "Add Service"}
            </h3>
            <div className="mt-5 space-y-3">
              <input
                className={inputClass}
                placeholder="Title"
                value={serviceForm.title}
                onChange={(e) => setServiceForm({ ...serviceForm, title: e.target.value })}
              />
              <textarea
                className={inputClass}
                rows={3}
                placeholder="Description"
                value={serviceForm.description}
                onChange={(e) => setServiceForm({ ...serviceForm, description: e.target.value })}
              />
              <input
                className={inputClass}
                placeholder="Icon name (Globe, Layout…)"
                value={serviceForm.icon_name}
                onChange={(e) => setServiceForm({ ...serviceForm, icon_name: e.target.value })}
              />
              <input
                className={inputClass}
                type="number"
                placeholder="Order"
                value={serviceForm.order_index}
                onChange={(e) =>
                  setServiceForm({
                    ...serviceForm,
                    order_index: parseInt(e.target.value) || 0,
                  })
                }
              />
            </div>
            <div className="mt-5 flex justify-end gap-2">
              <button type="button" onClick={() => setShowServiceModal(false)} className={btnGhost}>
                Cancel
              </button>
              <button type="button" onClick={saveService} disabled={saving} className={btnPrimary}>
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {showProjectModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/70 p-4 backdrop-blur-sm">
          <div className="my-4 w-full max-w-2xl border border-[var(--border-color)] bg-[var(--background)] p-6">
            <h3 className="font-display text-xl uppercase">
              {editingProject ? "Edit Project" : "Add Project"}
            </h3>
            <div className="mt-5 grid gap-3">
              <input
                className={inputClass}
                placeholder="Title"
                value={projectForm.title}
                onChange={(e) => setProjectForm({ ...projectForm, title: e.target.value })}
              />
              <input
                className={inputClass}
                placeholder="Category"
                value={projectForm.category}
                onChange={(e) => setProjectForm({ ...projectForm, category: e.target.value })}
              />
              <textarea
                className={inputClass}
                rows={2}
                placeholder="Short description"
                value={projectForm.description}
                onChange={(e) => setProjectForm({ ...projectForm, description: e.target.value })}
              />
              <textarea
                className={inputClass}
                rows={4}
                placeholder="Full detail"
                value={projectForm.full_detail}
                onChange={(e) => setProjectForm({ ...projectForm, full_detail: e.target.value })}
              />
              <input
                className={inputClass}
                placeholder="Image URL"
                value={projectForm.image_url}
                onChange={(e) => setProjectForm({ ...projectForm, image_url: e.target.value })}
              />
              <input
                className={inputClass}
                placeholder="Tags (comma separated)"
                value={projectForm.tagsString}
                onChange={(e) => setProjectForm({ ...projectForm, tagsString: e.target.value })}
              />
              <input
                className={inputClass}
                placeholder="Live link"
                value={projectForm.link}
                onChange={(e) => setProjectForm({ ...projectForm, link: e.target.value })}
              />
              <input
                className={inputClass}
                type="number"
                placeholder="Order"
                value={projectForm.order_index}
                onChange={(e) =>
                  setProjectForm({
                    ...projectForm,
                    order_index: parseInt(e.target.value) || 0,
                  })
                }
              />
            </div>
            <div className="mt-5 flex justify-end gap-2">
              <button type="button" onClick={() => setShowProjectModal(false)} className={btnGhost}>
                Cancel
              </button>
              <button type="button" onClick={saveProject} disabled={saving} className={btnPrimary}>
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
