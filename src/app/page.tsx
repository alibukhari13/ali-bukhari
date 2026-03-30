// src/app/page.tsx
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Services from "@/components/sections/Services";
import Projects from "@/components/sections/Projects";
import Contact from "@/components/sections/Contact";
// import { Contact } from "lucide-react";
// import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <div className="w-full flex flex-col bg-[#0a0a0b]">
      <Hero />
      <About />
      <Services />
      <Projects />
      <Contact />
    </div>
  );
}