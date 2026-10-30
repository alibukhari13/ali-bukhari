import {
  SiExpress,
  SiMongodb,
  SiNextdotjs,
  SiNodedotjs,
  SiReact,
  SiShopify,
  SiSupabase,
  SiTailwindcss,
  type IconType,
} from "@icons-pack/react-simple-icons";

const marks: Record<string, IconType> = {
  "react.js": SiReact,
  react: SiReact,
  "next.js": SiNextdotjs,
  nextjs: SiNextdotjs,
  shopify: SiShopify,
  supabase: SiSupabase,
  "tailwind css": SiTailwindcss,
  "node.js / express": SiNodedotjs,
  "node.js": SiNodedotjs,
  express: SiExpress,
  mongodb: SiMongodb,
};

const brandColors: Record<string, string> = {
  "react.js": "#61DAFB",
  react: "#61DAFB",
  shopify: "#7AB55C",
  supabase: "#3FCF8E",
  "tailwind css": "#06B6D4",
  "node.js / express": "#5FA04E",
  "node.js": "#5FA04E",
  mongodb: "#47A248",
};

export default function BrandMark({ name, size = 16 }: { name: string; size?: number }) {
  const key = name.toLowerCase();
  const Mark = marks[key];
  if (!Mark) return null;
  return <Mark aria-hidden="true" color={brandColors[key] ?? "currentColor"} size={size} focusable="false" />;
}
