import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Experience from "@/components/sections/Experience";
import Services from "@/components/sections/Services";
import Projects from "@/components/sections/Projects";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <div className="relative z-10 flex w-full flex-col">
      <Hero />
      <About />
      <Experience />
      <Services />
      <Projects />
      <Contact />
    </div>
  );
}
