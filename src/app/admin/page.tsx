/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/immutability */
"use client";

import React, { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

export default function AdminPanel() {
  // Auth
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [activeTab, setActiveTab] = useState("hero");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Data
  const [hero, setHero] = useState<any>({});
  const [about, setAbout] = useState<any>({});
  const [services, setServices] = useState<any[]>([]);
  const [projects, setProjects] = useState<any[]>([]);
  const [contact, setContact] = useState<any>({});
  const [footer, setFooter] = useState<any>({});
  const [messages, setMessages] = useState<any[]>([]);

  // Modals
  const [showServiceModal, setShowServiceModal] = useState(false);
  const [editingService, setEditingService] = useState<any>(null);
  const [serviceForm, setServiceForm] = useState({ title: "", description: "", icon_name: "Globe", order_index: 0 });

  const [showProjectModal, setShowProjectModal] = useState(false);
  const [editingProject, setEditingProject] = useState<any>(null);
  const [projectForm, setProjectForm] = useState({
    title: "",
    category: "",
    description: "",
    full_detail: "",
    image_url: "",
    tagsString: "", // will hold comma-separated tags like "React, Next.js"
    link: "",
    order_index: 0,
  });

  const ADMIN_PASSWORD = "Ali123@@";

  // Login
  const handleLogin = () => {
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      fetchAllData();
    } else {
      alert("Wrong password!");
    }
  };

  // Fetch all data
  const fetchAllData = async () => {
    setLoading(true);
    try {
      const { data: heroData } = await supabase.from("hero").select("*").single();
      if (heroData) setHero(heroData);
      const { data: aboutData } = await supabase.from("about").select("*").single();
      if (aboutData) setAbout(aboutData);
      const { data: servicesData } = await supabase.from("services").select("*").order("order_index");
      if (servicesData) setServices(servicesData);
      const { data: projectsData } = await supabase.from("projects").select("*").order("order_index");
      if (projectsData) setProjects(projectsData);
      const { data: contactData } = await supabase.from("contact").select("*").single();
      if (contactData) setContact(contactData);
      const { data: footerData } = await supabase.from("footer").select("*").single();
      if (footerData) setFooter(footerData);
      const { data: msgData } = await supabase.from("messages").select("*").order("created_at", { ascending: false });
      if (msgData) setMessages(msgData);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Helper: get next order index
  const getNextOrderIndex = (items: any[]) => {
    const max = items.reduce((max, item) => Math.max(max, item.order_index || 0), 0);
    return max + 1;
  };

  // ========== HERO ==========
  const updateHero = async () => {
    setSaving(true);
    const { error } = await supabase.from("hero").update(hero).eq("id", hero.id);
    if (error) alert("Error: " + error.message);
    else alert("Hero updated!");
    setSaving(false);
  };

  // ========== ABOUT ==========
  const updateAbout = async () => {
    setSaving(true);
    const { error } = await supabase.from("about").update(about).eq("id", about.id);
    if (error) alert("Error: " + error.message);
    else alert("About updated!");
    setSaving(false);
  };

  // ========== CONTACT ==========
  const updateContact = async () => {
    setSaving(true);
    const { error } = await supabase.from("contact").update(contact).eq("id", contact.id);
    if (error) alert("Error: " + error.message);
    else alert("Contact updated!");
    setSaving(false);
  };

  // ========== FOOTER ==========
  const updateFooter = async () => {
    setSaving(true);
    const { error } = await supabase.from("footer").update(footer).eq("id", footer.id);
    if (error) alert("Error: " + error.message);
    else alert("Footer updated!");
    setSaving(false);
  };

  // ========== SERVICES CRUD ==========
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
    if (!title.trim()) return alert("Title is required");
    setSaving(true);

    if (editingService) {
      const { error } = await supabase
        .from("services")
        .update({ title, description, icon_name, order_index })
        .eq("id", editingService.id);
      if (error) alert("Error: " + error.message);
      else {
        setServices(services.map(s => s.id === editingService.id ? { ...s, title, description, icon_name, order_index } : s));
        alert("Service updated!");
      }
    } else {
      const { data, error } = await supabase
        .from("services")
        .insert([{ title, description, icon_name, order_index }])
        .select();
      if (error) alert("Error: " + error.message);
      else {
        setServices([...services, data[0]]);
        alert("Service added!");
      }
    }
    setSaving(false);
    setShowServiceModal(false);
  };

  const deleteService = async (id: number) => {
    if (!confirm("Delete this service?")) return;
    setSaving(true);
    const { error } = await supabase.from("services").delete().eq("id", id);
    if (error) alert("Error: " + error.message);
    else setServices(services.filter(s => s.id !== id));
    setSaving(false);
  };

  // ========== PROJECTS CRUD ==========
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
    // Convert tags array to comma-separated string
    const tagsStr = (project.tags || []).join(", ");
    setProjectForm({
      title: project.title,
      category: project.category,
      description: project.description || "",
      full_detail: project.full_detail || "",
      image_url: project.image_url || "",
      tagsString: tagsStr,
      link: project.link || "",
      order_index: project.order_index,
    });
    setShowProjectModal(true);
  };

  const saveProject = async () => {
    const { title, category, description, full_detail, image_url, tagsString, link, order_index } = projectForm;
    if (!title.trim() || !category.trim()) return alert("Title and Category are required");

    // Convert comma-separated string to array
    const tags = tagsString
      .split(",")
      .map(tag => tag.trim())
      .filter(tag => tag !== "");

    setSaving(true);

    if (editingProject) {
      const { error } = await supabase
        .from("projects")
        .update({ title, category, description, full_detail, image_url, tags, link, order_index })
        .eq("id", editingProject.id);
      if (error) alert("Error: " + error.message);
      else {
        setProjects(projects.map(p => p.id === editingProject.id ? { ...p, title, category, description, full_detail, image_url, tags, link, order_index } : p));
        alert("Project updated!");
      }
    } else {
      const { data, error } = await supabase
        .from("projects")
        .insert([{ title, category, description, full_detail, image_url, tags, link, order_index }])
        .select();
      if (error) alert("Error: " + error.message);
      else {
        setProjects([...projects, data[0]]);
        alert("Project added!");
      }
    }
    setSaving(false);
    setShowProjectModal(false);
  };

  const deleteProject = async (id: number) => {
    if (!confirm("Delete this project?")) return;
    setSaving(true);
    const { error } = await supabase.from("projects").delete().eq("id", id);
    if (error) alert("Error: " + error.message);
    else setProjects(projects.filter(p => p.id !== id));
    setSaving(false);
  };

  // ========== MESSAGES ==========
  const deleteMessage = async (id: number) => {
    if (!confirm("Delete this message?")) return;
    setSaving(true);
    const { error } = await supabase.from("messages").delete().eq("id", id);
    if (error) alert("Error: " + error.message);
    else setMessages(messages.filter(m => m.id !== id));
    setSaving(false);
  };

  // Helper to safely stringify JSON
  const safeJsonStringify = (obj: any) => {
    try {
      return JSON.stringify(obj, null, 2);
    } catch {
      return "[]";
    }
  };

  // Login screen
  if (!isAuthenticated) {
    return (
      <div className="h-screen bg-[var(--background)] flex flex-col items-center justify-center gap-4">
        <h1 className="text-white text-2xl font-black">ADMIN ACCESS</h1>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="bg-white/5 border border-white/10 p-3 rounded-lg text-white w-64"
          placeholder="Enter Admin Password"
        />
        <button onClick={handleLogin} className="bg-[var(--accent)] px-6 py-2 rounded-lg font-bold">
          Login
        </button>
      </div>
    );
  }

  if (loading) {
    return <div className="text-white text-center p-10">Loading data...</div>;
  }

  return (
    <div className="min-h-screen bg-[var(--background)] text-white p-6 md:p-10">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-black mb-8">Admin Dashboard</h1>

        {/* Tabs */}
        <div className="flex flex-wrap gap-3 mb-8 border-b border-white/10 pb-4">
          {["hero", "about", "services", "projects", "contact", "footer", "messages"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-lg transition-all ${
                activeTab === tab ? "bg-[var(--accent)] text-black" : "bg-white/5 hover:bg-white/10"
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* Hero Tab */}
        {activeTab === "hero" && (
          <div className="bg-white/5 p-6 rounded-xl border border-white/10 space-y-4">
            <h2 className="text-xl font-bold mb-4">Edit Hero Section</h2>
            <input
              type="text"
              value={hero.title || ""}
              onChange={(e) => setHero({ ...hero, title: e.target.value })}
              placeholder="Title"
              className="w-full bg-black/50 p-3 rounded-lg"
            />
            <input
              type="text"
              value={hero.subtitle || ""}
              onChange={(e) => setHero({ ...hero, subtitle: e.target.value })}
              placeholder="Subtitle"
              className="w-full bg-black/50 p-3 rounded-lg"
            />
            <textarea
              value={hero.description || ""}
              onChange={(e) => setHero({ ...hero, description: e.target.value })}
              placeholder="Description"
              rows={4}
              className="w-full bg-black/50 p-3 rounded-lg"
            />
            <input
              type="text"
              value={hero.image_url || ""}
              onChange={(e) => setHero({ ...hero, image_url: e.target.value })}
              placeholder="Image URL"
              className="w-full bg-black/50 p-3 rounded-lg"
            />
            <button
              onClick={updateHero}
              disabled={saving}
              className="bg-[var(--accent)] text-black px-6 py-2 rounded-lg font-bold disabled:opacity-50"
            >
              {saving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        )}

        {/* About Tab */}
        {activeTab === "about" && (
          <div className="bg-white/5 p-6 rounded-xl border border-white/10 space-y-4">
            <h2 className="text-xl font-bold mb-4">Edit About Section</h2>
            <div>
              <label className="block text-sm mb-2">Description Paragraphs (JSON array)</label>
              <textarea
                value={safeJsonStringify(about.description_texts)}
                onChange={(e) => {
                  try {
                    const parsed = JSON.parse(e.target.value);
                    setAbout({ ...about, description_texts: parsed });
                  } catch (err) {}
                }}
                rows={6}
                className="w-full bg-black/50 p-3 rounded-lg font-mono text-sm"
              />
            </div>
            <div>
              <label className="block text-sm mb-2">Stats (JSON array)</label>
              <textarea
                value={safeJsonStringify(about.stats)}
                onChange={(e) => {
                  try {
                    const parsed = JSON.parse(e.target.value);
                    setAbout({ ...about, stats: parsed });
                  } catch (err) {}
                }}
                rows={6}
                className="w-full bg-black/50 p-3 rounded-lg font-mono text-sm"
              />
            </div>
            <button
              onClick={updateAbout}
              disabled={saving}
              className="bg-[var(--accent)] text-black px-6 py-2 rounded-lg font-bold disabled:opacity-50"
            >
              {saving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        )}

        {/* Services Tab */}
        {activeTab === "services" && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold">Services</h2>
              <button onClick={openAddService} className="bg-[var(--accent)] text-black px-4 py-2 rounded-lg">
                + Add New
              </button>
            </div>
            <div className="grid gap-4">
              {services.map((service) => (
                <div key={service.id} className="bg-white/5 p-4 rounded-xl border border-white/10 flex justify-between items-start">
                  <div>
                    <h3 className="font-bold">{service.title}</h3>
                    <p className="text-sm text-gray-400">{service.description}</p>
                    <p className="text-xs text-gray-500 mt-1">Icon: {service.icon_name}</p>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => openEditService(service)} className="text-accent hover:underline">
                      Edit
                    </button>
                    <button onClick={() => deleteService(service.id)} className="text-red-500 hover:underline">
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Service Modal */}
            {showServiceModal && (
              <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                <div className="bg-[#111112] p-6 rounded-xl max-w-lg w-full border border-white/10">
                  <h3 className="text-xl font-bold mb-4">{editingService ? "Edit Service" : "Add Service"}</h3>
                  <input
                    type="text"
                    placeholder="Title"
                    value={serviceForm.title}
                    onChange={(e) => setServiceForm({ ...serviceForm, title: e.target.value })}
                    className="w-full bg-black/50 p-3 rounded-lg mb-3"
                  />
                  <textarea
                    placeholder="Description"
                    value={serviceForm.description}
                    onChange={(e) => setServiceForm({ ...serviceForm, description: e.target.value })}
                    className="w-full bg-black/50 p-3 rounded-lg mb-3"
                    rows={3}
                  />
                  <input
                    type="text"
                    placeholder="Icon Name (e.g., Globe, Layout)"
                    value={serviceForm.icon_name}
                    onChange={(e) => setServiceForm({ ...serviceForm, icon_name: e.target.value })}
                    className="w-full bg-black/50 p-3 rounded-lg mb-3"
                  />
                  <input
                    type="number"
                    placeholder="Order Index"
                    value={serviceForm.order_index}
                    onChange={(e) => setServiceForm({ ...serviceForm, order_index: parseInt(e.target.value) || 0 })}
                    className="w-full bg-black/50 p-3 rounded-lg mb-3"
                  />
                  <div className="flex gap-3 justify-end">
                    <button onClick={() => setShowServiceModal(false)} className="px-4 py-2 rounded-lg border">
                      Cancel
                    </button>
                    <button onClick={saveService} disabled={saving} className="bg-[var(--accent)] text-black px-4 py-2 rounded-lg">
                      {saving ? "Saving..." : "Save"}
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Projects Tab */}
        {activeTab === "projects" && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold">Projects</h2>
              <button onClick={openAddProject} className="bg-[var(--accent)] text-black px-4 py-2 rounded-lg">
                + Add New
              </button>
            </div>
            <div className="grid gap-4">
              {projects.map((project) => (
                <div key={project.id} className="bg-white/5 p-4 rounded-xl border border-white/10 flex justify-between items-start">
                  <div>
                    <h3 className="font-bold">{project.title}</h3>
                    <p className="text-sm text-gray-400">{project.category}</p>
                    <p className="text-xs text-gray-500 mt-1 truncate max-w-md">{project.link}</p>
                    {project.tags && project.tags.length > 0 && (
                      <p className="text-xs text-gray-400 mt-1">Tags: {project.tags.join(", ")}</p>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => openEditProject(project)} className="text-accent hover:underline">
                      Edit
                    </button>
                    <button onClick={() => deleteProject(project.id)} className="text-red-500 hover:underline">
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Project Modal */}
            {showProjectModal && (
              <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
                <div className="bg-[#111112] p-6 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-white/10">
                  <h3 className="text-xl font-bold mb-4">{editingProject ? "Edit Project" : "Add Project"}</h3>
                  <input
                    type="text"
                    placeholder="Title"
                    value={projectForm.title}
                    onChange={(e) => setProjectForm({ ...projectForm, title: e.target.value })}
                    className="w-full bg-black/50 p-3 rounded-lg mb-3"
                  />
                  <input
                    type="text"
                    placeholder="Category"
                    value={projectForm.category}
                    onChange={(e) => setProjectForm({ ...projectForm, category: e.target.value })}
                    className="w-full bg-black/50 p-3 rounded-lg mb-3"
                  />
                  <textarea
                    placeholder="Short Description"
                    value={projectForm.description}
                    onChange={(e) => setProjectForm({ ...projectForm, description: e.target.value })}
                    className="w-full bg-black/50 p-3 rounded-lg mb-3"
                    rows={2}
                  />
                  <textarea
                    placeholder="Full Detail"
                    value={projectForm.full_detail}
                    onChange={(e) => setProjectForm({ ...projectForm, full_detail: e.target.value })}
                    className="w-full bg-black/50 p-3 rounded-lg mb-3"
                    rows={4}
                  />
                  <input
                    type="text"
                    placeholder="Image URL"
                    value={projectForm.image_url}
                    onChange={(e) => setProjectForm({ ...projectForm, image_url: e.target.value })}
                    className="w-full bg-black/50 p-3 rounded-lg mb-3"
                  />
                  <div>
                    <label className="text-xs text-gray-400 mb-1 block">Tags (comma‑separated, e.g., React, Next.js, Tailwind)</label>
                    <input
                      type="text"
                      placeholder="React, Next.js, Tailwind"
                      value={projectForm.tagsString}
                      onChange={(e) => setProjectForm({ ...projectForm, tagsString: e.target.value })}
                      className="w-full bg-black/50 p-3 rounded-lg mb-3"
                    />
                  </div>
                  <input
                    type="text"
                    placeholder="Project Link (URL)"
                    value={projectForm.link}
                    onChange={(e) => setProjectForm({ ...projectForm, link: e.target.value })}
                    className="w-full bg-black/50 p-3 rounded-lg mb-3"
                  />
                  <input
                    type="number"
                    placeholder="Order Index"
                    value={projectForm.order_index}
                    onChange={(e) => setProjectForm({ ...projectForm, order_index: parseInt(e.target.value) || 0 })}
                    className="w-full bg-black/50 p-3 rounded-lg mb-3"
                  />
                  <div className="flex gap-3 justify-end">
                    <button onClick={() => setShowProjectModal(false)} className="px-4 py-2 rounded-lg border">
                      Cancel
                    </button>
                    <button onClick={saveProject} disabled={saving} className="bg-[var(--accent)] text-black px-4 py-2 rounded-lg">
                      {saving ? "Saving..." : "Save"}
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Contact Tab */}
        {activeTab === "contact" && (
          <div className="bg-white/5 p-6 rounded-xl border border-white/10 space-y-4">
            <h2 className="text-xl font-bold mb-4">Edit Contact Info</h2>
            <input
              type="email"
              value={contact.email || ""}
              onChange={(e) => setContact({ ...contact, email: e.target.value })}
              placeholder="Email"
              className="w-full bg-black/50 p-3 rounded-lg"
            />
            <input
              type="text"
              value={contact.linkedin_url || ""}
              onChange={(e) => setContact({ ...contact, linkedin_url: e.target.value })}
              placeholder="LinkedIn URL"
              className="w-full bg-black/50 p-3 rounded-lg"
            />
            <input
              type="text"
              value={contact.linkedin_name || ""}
              onChange={(e) => setContact({ ...contact, linkedin_name: e.target.value })}
              placeholder="LinkedIn Name"
              className="w-full bg-black/50 p-3 rounded-lg"
            />
            <button
              onClick={updateContact}
              disabled={saving}
              className="bg-[var(--accent)] text-black px-6 py-2 rounded-lg font-bold disabled:opacity-50"
            >
              {saving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        )}

        {/* Footer Tab */}
        {activeTab === "footer" && (
          <div className="bg-white/5 p-6 rounded-xl border border-white/10 space-y-4">
            <h2 className="text-xl font-bold mb-4">Edit Footer</h2>
            <input
              type="text"
              value={footer.logo_text || ""}
              onChange={(e) => setFooter({ ...footer, logo_text: e.target.value })}
              placeholder="Logo Text"
              className="w-full bg-black/50 p-3 rounded-lg"
            />
            <input
              type="text"
              value={footer.tagline || ""}
              onChange={(e) => setFooter({ ...footer, tagline: e.target.value })}
              placeholder="Tagline"
              className="w-full bg-black/50 p-3 rounded-lg"
            />
            <div>
              <label>Navigation Links (JSON)</label>
              <textarea
                value={safeJsonStringify(footer.navigation_links)}
                onChange={(e) => {
                  try {
                    const parsed = JSON.parse(e.target.value);
                    setFooter({ ...footer, navigation_links: parsed });
                  } catch (err) {}
                }}
                rows={4}
                className="w-full bg-black/50 p-3 rounded-lg font-mono text-sm"
              />
            </div>
            <div>
              <label>Portfolio Links (JSON)</label>
              <textarea
                value={safeJsonStringify(footer.portfolio_links)}
                onChange={(e) => {
                  try {
                    const parsed = JSON.parse(e.target.value);
                    setFooter({ ...footer, portfolio_links: parsed });
                  } catch (err) {}
                }}
                rows={4}
                className="w-full bg-black/50 p-3 rounded-lg font-mono text-sm"
              />
            </div>
            <div>
              <label>Social Links (JSON)</label>
              <textarea
                value={safeJsonStringify(footer.social_links)}
                onChange={(e) => {
                  try {
                    const parsed = JSON.parse(e.target.value);
                    setFooter({ ...footer, social_links: parsed });
                  } catch (err) {}
                }}
                rows={4}
                className="w-full bg-black/50 p-3 rounded-lg font-mono text-sm"
              />
            </div>
            <input
              type="text"
              value={footer.cloud_text || ""}
              onChange={(e) => setFooter({ ...footer, cloud_text: e.target.value })}
              placeholder="Cloud Text"
              className="w-full bg-black/50 p-3 rounded-lg"
            />
            <input
              type="text"
              value={footer.copyright_text || ""}
              onChange={(e) => setFooter({ ...footer, copyright_text: e.target.value })}
              placeholder="Copyright Text"
              className="w-full bg-black/50 p-3 rounded-lg"
            />
            <input
              type="text"
              value={footer.designed_by || ""}
              onChange={(e) => setFooter({ ...footer, designed_by: e.target.value })}
              placeholder="Designed By"
              className="w-full bg-black/50 p-3 rounded-lg"
            />
            <button
              onClick={updateFooter}
              disabled={saving}
              className="bg-[var(--accent)] text-black px-6 py-2 rounded-lg font-bold disabled:opacity-50"
            >
              {saving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        )}

        {/* Messages Tab */}
        {activeTab === "messages" && (
          <div className="space-y-4">
            <h2 className="text-xl font-bold mb-4">User Messages</h2>
            {messages.length === 0 && <p>No messages yet.</p>}
            {messages.map((msg) => (
              <div key={msg.id} className="bg-white/5 p-4 rounded-xl border border-white/10">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-bold">
                      {msg.name} ({msg.email})
                    </p>
                    <p className="text-gray-400 mt-2">{msg.message}</p>
                    <p className="text-xs text-gray-500 mt-2">{new Date(msg.created_at).toLocaleString()}</p>
                  </div>
                  <button onClick={() => deleteMessage(msg.id)} className="text-red-500 hover:text-red-400">
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}