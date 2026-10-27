import { Globe, Layout, ShoppingBag, Layers, GitMerge, Gauge } from "lucide-react";

export const SERVICES = [
  {
    title: "Web Development",
    description:
      "Building responsive web applications and websites with React.js, Next.js, and modern CSS for clean, reliable performance.",
    icon: Globe,
  },
  {
    title: "Front-End Development",
    description:
      "Creating reusable UI components and responsive interfaces with React.js, Next.js, Tailwind CSS, and Bootstrap.",
    icon: Layout,
  },
  {
    title: "Shopify Store Development",
    description:
      "Building and maintaining Shopify stores with responsive storefronts, app integrations, and smooth shopping experiences.",
    icon: ShoppingBag,
  },
  {
    title: "Shopify Theme Customization",
    description:
      "Customizing Shopify themes to match client requirements, improve mobile responsiveness, and support payment gateways.",
    icon: Layers,
  },
  {
    title: "API Integration",
    description:
      "Integrating REST APIs and third-party services with Node.js, Express.js, and MongoDB for connected product experiences.",
    icon: GitMerge,
  },
  {
    title: "Performance Optimization",
    description:
      "Improving load speed, mobile responsiveness, and overall reliability so sites and stores stay fast and easy to use.",
    icon: Gauge,
  },
];

export const SERVICE_ICON_NAMES = [
  "Globe",
  "Layout",
  "ShoppingBag",
  "Layers",
  "GitMerge",
  "Gauge",
] as const;
