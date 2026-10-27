import { createClient } from "@supabase/supabase-js";
import { readFileSync } from "fs";
import { resolve } from "path";

const envPath = resolve(process.cwd(), ".env.local");
const envText = readFileSync(envPath, "utf8");
const env = Object.fromEntries(
  envText
    .split("\n")
    .filter((line) => line && !line.startsWith("#") && line.includes("="))
    .map((line) => {
      const i = line.indexOf("=");
      return [line.slice(0, i).trim(), line.slice(i + 1).trim()];
    })
);

const supabase = createClient(
  env.NEXT_PUBLIC_SUPABASE_URL,
  env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

const hero = {
  title: "SYED ALI EMAN",
  subtitle: "Web Developer | Shopify Developer",
  description:
    "Web Developer with 3+ years of experience building responsive web applications and Shopify stores. Skilled in React.js, Next.js, Node.js, Express.js, MongoDB, and Shopify theme customization. Focused on clean, reusable code, responsive interfaces, and reliable performance.",
  image_url: "/profile.jpeg",
};

const about = {
  description_texts: [
    "Hi, I'm Syed Ali Eman — a Web Developer based in Lahore, Pakistan, with 3+ years of experience building responsive web applications and Shopify stores. I specialize in React.js, Next.js, Node.js, Express.js, MongoDB, and Shopify theme customization.",
    "I've contributed to in-house products, websites, and web apps across companies like DevArion Solution, Frenco.ae, DMS, and One Stack. I care about clean reusable code, strong API integrations, and interfaces that feel fast and reliable on every device.",
  ],
  stats: [
    { label: "Years Experience", value: "3+", icon: "Code2" },
    { label: "Companies Worked", value: "4+", icon: "Briefcase" },
    { label: "Core Stack", value: "MERN + Shopify", icon: "Layers" },
  ],
};

const services = [
  {
    title: "Web Development",
    description:
      "Building responsive web applications and websites with React.js, Next.js, and modern CSS for clean, reliable performance.",
    icon_name: "Globe",
    order_index: 1,
  },
  {
    title: "Front-End Development",
    description:
      "Creating reusable UI components and responsive interfaces with React.js, Next.js, Tailwind CSS, and Bootstrap.",
    icon_name: "Layout",
    order_index: 2,
  },
  {
    title: "Shopify Store Development",
    description:
      "Building and maintaining Shopify stores with responsive storefronts, app integrations, and smooth shopping experiences.",
    icon_name: "ShoppingBag",
    order_index: 3,
  },
  {
    title: "Shopify Theme Customization",
    description:
      "Customizing Shopify themes to match client requirements, improve mobile responsiveness, and support payment gateways.",
    icon_name: "Layers",
    order_index: 4,
  },
  {
    title: "API Integration",
    description:
      "Integrating REST APIs and third-party services with Node.js, Express.js, and MongoDB for connected product experiences.",
    icon_name: "GitMerge",
    order_index: 5,
  },
  {
    title: "Performance Optimization",
    description:
      "Improving load speed, mobile responsiveness, and overall reliability so sites and stores stay fast and easy to use.",
    icon_name: "Gauge",
    order_index: 6,
  },
];

const projects = [
  {
    title: "RUTE | Home and Product Services",
    category: "Web Application",
    description:
      "A platform connecting users with service professionals for home maintenance, booking, and payments.",
    full_detail:
      "RUTE connects users with service professionals for home maintenance. It supports easy booking, real-time updates, secure payments, and admin controls. Contribution: full-stack development, UI/UX, API integration, and deployment with Next.js, TypeScript, Tailwind CSS, Supabase, and React.",
    image_url:
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=1200",
    tags: [
      "Next.js",
      "Supabase",
      "Payment Gateway Integration",
      "Email Management",
      "Architecture",
    ],
    link: "https://www.rute.co.za/",
    order_index: 1,
  },
  {
    title: "Burako Solutions — IT Services",
    category: "Web Application",
    description:
      "A responsive IT services platform with dynamic CMS content and performance-focused delivery.",
    full_detail:
      "Built a full-stack Next.js application for Burako Solutions — a responsive IT services platform with Contentful CMS and API-driven content. Contribution: frontend and backend development, CMS integration, and responsive UI with Next.js, Tailwind CSS, and Contentful.",
    image_url:
      "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?q=80&w=1200",
    tags: [
      "Next.js",
      "Tailwind CSS",
      "Contentful",
      "API Integration",
      "Full-Stack Development",
    ],
    link: "https://burakosolutions.vercel.app/",
    order_index: 2,
  },
  {
    title: "PlenumPro — Business Operations SaaS",
    category: "Web Application",
    description:
      "Frontend work on a scheduling and operations platform for service-based companies.",
    full_detail:
      "Contributed as a Frontend Developer on PlenumPro, a platform for appointment scheduling and business operations. Features include calendar tools, analytics, customer management, Google Maps location views, and role-based access. Stack: React.js, Next.js, Auth0, and Google Maps in a scalable monorepo.",
    image_url:
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1200",
    tags: ["React.js", "Next.js", "Auth0", "Google Maps", "Frontend"],
    link: "http://plenum.pro/",
    order_index: 3,
  },
  {
    title: "Brars — E-Commerce Platform",
    category: "E-Commerce Store",
    description:
      "A modern e-commerce experience with product listings, cart, and order management.",
    full_detail:
      "Developed a modern e-commerce platform focused on a fast, responsive shopping experience. Contribution: full-stack modules with Next.js and Node.js, including product listings, cart, order management, and secure API integrations. Stack: Next.js, React, Node.js, Supabase, Tailwind CSS.",
    image_url:
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=1200",
    tags: ["Next.js", "React", "Supabase", "Full-Stack Development", "Ecommerce"],
    link: "https://www.brars.com/",
    order_index: 4,
  },
  {
    title: "Jobs-Pulse — Upwork Proposal Assistant",
    category: "Web Software",
    description:
      "An AI-assisted platform that helps freelancers find jobs and generate tailored proposals.",
    full_detail:
      "JobPulse helps Upwork freelancers with job discovery and proposal generation. It includes a dashboard for listings, an AI proposal engine, portfolio memory, custom proposal logic, and lifecycle tools. Built with Next.js, React, Tailwind CSS, Supabase, and OpenAI APIs.",
    image_url:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200",
    tags: [
      "Next.js",
      "Tailwind CSS",
      "Supabase",
      "API Integration",
      "Full-Stack Development",
    ],
    link: "https://jobs-pulse-two.vercel.app/",
    order_index: 5,
  },
  {
    title: "Zuhd — Islamic Knowledge Platform",
    category: "Website",
    description:
      "A content-driven educational platform for Islamic learning, courses, and community resources.",
    full_detail:
      "Zuhd delivers Islamic knowledge through lectures, blogs, courses, and community programs based on the Qur’an and Sunnah. It includes structured learning paths, multimedia content, and after-school programs. Built as a content-focused web platform with modern frontend tooling.",
    image_url:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1200",
    tags: ["JavaScript", "Tailwind CSS", "YouTube Integration", "Full-Stack Development"],
    link: "https://zuhd.au/",
    order_index: 6,
  },
];

const contact = {
  email: "syedalibukharishah16@gmail.com",
  linkedin_url: "https://www.linkedin.com/in/syedalieman/",
  linkedin_name: "Syed Ali Eman",
};

const footer = {
  logo_text: "Syed Ali Eman",
  tagline: "Building responsive web apps and Shopify stores that perform.",
  navigation_links: [
    { name: "Home", href: "/" },
    { name: "About", href: "#about" },
    { name: "Services", href: "#services" },
    { name: "Contact", href: "#contact" },
  ],
  portfolio_links: [{ name: "Selected Work", href: "#projects" }],
  social_links: [
    { name: "LinkedIn", href: "https://www.linkedin.com/in/syedalieman/" },
    { name: "Email", href: "mailto:syedalibukharishah16@gmail.com" },
  ],
  cloud_text: "Vercel",
  copyright_text: "© 2026 Syed Ali Eman.",
  designed_by: "Syed Ali Eman",
};

async function updateSingle(table, payload) {
  const { data: existing, error: readError } = await supabase
    .from(table)
    .select("id")
    .limit(1)
    .maybeSingle();

  if (readError) throw new Error(`${table} read: ${readError.message}`);

  if (existing?.id) {
    const { error } = await supabase.from(table).update(payload).eq("id", existing.id);
    if (error) throw new Error(`${table} update: ${error.message}`);
    console.log(`updated ${table}`);
  } else {
    const { error } = await supabase.from(table).insert(payload);
    if (error) throw new Error(`${table} insert: ${error.message}`);
    console.log(`inserted ${table}`);
  }
}

async function replaceList(table, rows) {
  const { error: delError } = await supabase.from(table).delete().neq("id", 0);
  if (delError) throw new Error(`${table} delete: ${delError.message}`);
  const { error } = await supabase.from(table).insert(rows);
  if (error) throw new Error(`${table} insert: ${error.message}`);
  console.log(`replaced ${table} (${rows.length})`);
}

async function main() {
  await updateSingle("hero", hero);
  await updateSingle("about", about);
  await updateSingle("contact", contact);
  await updateSingle("footer", footer);
  await replaceList("services", services);
  await replaceList("projects", projects);
  console.log("done");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
