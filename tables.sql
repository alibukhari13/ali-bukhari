-- ============================================================
-- Portfolio tables — PART 2 (safe / additive)
-- File: tables.sql
--
-- Pehli table (hero, about, services, projects, contact,
-- footer, messages) pehle se DB mein hai — projects DELETE
-- nahi honge.
--
-- Yeh file sirf:
--  1) missing columns (agar nahi hain)
--  2) naya experience table
--  3) updated content (hero / about / services / contact / footer)
--  4) RLS + indexes (agar pehle se nahi)
--
-- Projects rows: NO truncate, NO delete, NO overwrite.
-- ============================================================

-- ---------- 1) MISSING COLUMNS (safe) ----------
alter table public.services
  add column if not exists updated_at timestamp default now();

alter table public.projects
  add column if not exists updated_at timestamp default now();

-- ---------- 2) NEW TABLE: experience (pehli SQL mein nahi thi) ----------
create table if not exists public.experience (
  id serial primary key,
  company text,
  role text,
  job_type text,
  points jsonb default '[]'::jsonb,
  order_index int default 0,
  created_at timestamp default now(),
  updated_at timestamp default now()
);

-- Seed experience only if empty (projects / pehli tables safe)
insert into public.experience (company, role, job_type, points, order_index)
select * from (values
  (
    'DevArion Solution',
    'Web Developer | Shopify Developer',
    'Full Time · On-Site',
    '["Designed UX for websites, web apps, and dashboards","Translated requirements into flows, wireframes, and Figma prototypes","Built reusable components and consistent design patterns"]'::jsonb,
    1
  ),
  (
    'Frenco.ae',
    'Shopify Developer',
    'Full Time · On-Site',
    '["Customized Shopify themes and storefronts for client needs","Integrated apps, payment gateways, and third-party services","Improved store speed and mobile responsiveness"]'::jsonb,
    2
  ),
  (
    'DMS',
    'Frontend / Web Application Developer',
    'Full Time · Hybrid',
    '["Built responsive interfaces with React.js and Next.js","Created reusable UI with Tailwind CSS and Bootstrap","Collaborated on API integrations and performance fixes"]'::jsonb,
    3
  ),
  (
    'One Stack',
    'MERN Stack & Shopify Developer',
    'Full Time · On-Site',
    '["Shipped responsive apps and Shopify stores","Integrated REST APIs with Node.js, Express, and MongoDB","Partnered with designers on mobile-first experiences"]'::jsonb,
    4
  )
) as v(company, role, job_type, points, order_index)
where not exists (select 1 from public.experience);

create index if not exists experience_order_idx on public.experience (order_index);

alter table public.experience enable row level security;

drop policy if exists "Public read experience" on public.experience;
drop policy if exists "Public insert experience" on public.experience;
drop policy if exists "Public update experience" on public.experience;
drop policy if exists "Public delete experience" on public.experience;

create policy "Public read experience" on public.experience for select using (true);
create policy "Public insert experience" on public.experience for insert with check (true);
create policy "Public update experience" on public.experience for update using (true);
create policy "Public delete experience" on public.experience for delete using (true);

-- ---------- 3) UPDATED CONTENT (pehli table se miss / outdated) ----------
-- Projects ko touch nahi kiya.

-- Hero: Shopify subtitle + fresh description
update public.hero
set
  title = 'SYED ALI EMAN',
  subtitle = 'Web Developer | Shopify Developer',
  description = 'Web Developer with 3+ years of experience building responsive web applications and Shopify stores. Skilled in React.js, Next.js, Node.js, Express.js, MongoDB, and Shopify theme customization. Focused on clean, reusable code, responsive interfaces, and reliable performance.',
  image_url = coalesce(nullif(image_url, ''), '/profile.jpeg'),
  updated_at = now()
where id = (select id from public.hero order by id limit 1);

-- About: real web stats (Models Deployed / Data Pipelines hatao)
update public.about
set
  description_texts = '[
    "Hi, I''m Syed Ali Eman — a Web Developer based in Lahore, Pakistan, with 3+ years of experience building responsive web applications and Shopify stores. I specialize in React.js, Next.js, Node.js, Express.js, MongoDB, and Shopify theme customization.",
    "I''ve contributed to in-house products, websites, and web apps across companies like DevArion Solution, Frenco.ae, DMS, and One Stack. I care about clean reusable code, strong API integrations, and interfaces that feel fast and reliable on every device."
  ]'::jsonb,
  stats = '[
    {"label":"Years Experience","value":"3+","icon":"Code2"},
    {"label":"Companies Worked","value":"4+","icon":"Briefcase"},
    {"label":"Core Stack","value":"MERN + Shopify","icon":"Layers"}
  ]'::jsonb,
  updated_at = now()
where id = (select id from public.about order by id limit 1);

-- Services: Shopify-focused list (projects untouched)
-- Sirf services table refresh — pehli generic list replace
truncate public.services restart identity;
insert into public.services (title, description, icon_name, order_index) values
  ('Web Development', 'Building responsive web applications and websites with React.js, Next.js, and modern CSS for clean, reliable performance.', 'Globe', 1),
  ('Front-End Development', 'Creating reusable UI components and responsive interfaces with React.js, Next.js, Tailwind CSS, and Bootstrap.', 'Layout', 2),
  ('Shopify Store Development', 'Building and maintaining Shopify stores with responsive storefronts, app integrations, and smooth shopping experiences.', 'ShoppingBag', 3),
  ('Shopify Theme Customization', 'Customizing Shopify themes to match client requirements, improve mobile responsiveness, and support payment gateways.', 'Layers', 4),
  ('API Integration', 'Integrating REST APIs and third-party services with Node.js, Express.js, and MongoDB for connected product experiences.', 'GitMerge', 5),
  ('Performance Optimization', 'Improving load speed, mobile responsiveness, and overall reliability so sites and stores stay fast and easy to use.', 'Gauge', 6);

-- Contact: ensure current values (row pehle se hai to update)
update public.contact
set
  email = 'syedalibukharishah16@gmail.com',
  linkedin_url = 'https://www.linkedin.com/in/syedalieman/',
  linkedin_name = 'Syed Ali Eman',
  updated_at = now()
where id = (select id from public.contact order by id limit 1);

-- Footer: Experience link + resume + 2026 copy
update public.footer
set
  logo_text = 'Syed Ali Eman',
  tagline = 'Building responsive web apps and Shopify stores that perform.',
  navigation_links = '[
    {"name":"Home","href":"#home"},
    {"name":"About","href":"#about"},
    {"name":"Experience","href":"#experience"},
    {"name":"Services","href":"#services"},
    {"name":"Projects","href":"#projects"},
    {"name":"Contact","href":"#contact"}
  ]'::jsonb,
  portfolio_links = '[
    {"name":"Selected Work","href":"#projects"},
    {"name":"Resume PDF","href":"/resume.pdf"}
  ]'::jsonb,
  social_links = '[
    {"name":"LinkedIn","href":"https://www.linkedin.com/in/syedalieman/"},
    {"name":"Email","href":"mailto:syedalibukharishah16@gmail.com"}
  ]'::jsonb,
  cloud_text = 'Vercel',
  copyright_text = '© 2026 Syed Ali Eman.',
  designed_by = 'Syed Ali Eman',
  updated_at = now()
where id = (select id from public.footer order by id limit 1);

-- ---------- 4) OPTIONAL: projects seed ONLY if table empty ----------
-- Agar pehle se projects add kiye hue hain → yeh block kuch nahi karega.
insert into public.projects (title, category, description, full_detail, image_url, tags, link, order_index)
select * from (values
  (
    'RUTE | Home and Product Services',
    'Web Application',
    'A platform connecting users with service professionals for home maintenance, booking, and payments.',
    'RUTE connects users with service professionals for home maintenance. It supports easy booking, real-time updates, secure payments, and admin controls. Contribution: full-stack development, UI/UX, API integration, and deployment with Next.js, TypeScript, Tailwind CSS, Supabase, and React.',
    'https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=1200',
    '["Next.js","Supabase","Payment Gateway Integration","Email Management","Architecture"]'::jsonb,
    'https://www.rute.co.za/',
    1
  ),
  (
    'Burako Solutions — IT Services',
    'Web Application',
    'A responsive IT services platform with dynamic CMS content and performance-focused delivery.',
    'Built a full-stack Next.js application for Burako Solutions — a responsive IT services platform with Contentful CMS and API-driven content. Contribution: frontend and backend development, CMS integration, and responsive UI with Next.js, Tailwind CSS, and Contentful.',
    'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?q=80&w=1200',
    '["Next.js","Tailwind CSS","Contentful","API Integration","Full-Stack Development"]'::jsonb,
    'https://burakosolutions.vercel.app/',
    2
  ),
  (
    'PlenumPro — Business Operations SaaS',
    'Web Application',
    'Frontend work on a scheduling and operations platform for service-based companies.',
    'Contributed as a Frontend Developer on PlenumPro, a platform for appointment scheduling and business operations. Features include calendar tools, analytics, customer management, Google Maps location views, and role-based access. Stack: React.js, Next.js, Auth0, and Google Maps in a scalable monorepo.',
    'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1200',
    '["React.js","Next.js","Auth0","Google Maps","Frontend"]'::jsonb,
    'http://plenum.pro/',
    3
  ),
  (
    'Brars — E-Commerce Platform',
    'E-Commerce Store',
    'A modern e-commerce experience with product listings, cart, and order management.',
    'Developed a modern e-commerce platform focused on a fast, responsive shopping experience. Contribution: full-stack modules with Next.js and Node.js, including product listings, cart, order management, and secure API integrations. Stack: Next.js, React, Node.js, Supabase, Tailwind CSS.',
    'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=1200',
    '["Next.js","React","Supabase","Full-Stack Development","Ecommerce"]'::jsonb,
    'https://www.brars.com/',
    4
  ),
  (
    'Jobs-Pulse — Upwork Proposal Assistant',
    'Web Software',
    'An AI-assisted platform that helps freelancers find jobs and generate tailored proposals.',
    'JobPulse helps Upwork freelancers with job discovery and proposal generation. It includes a dashboard for listings, an AI proposal engine, portfolio memory, custom proposal logic, and lifecycle tools. Built with Next.js, React, Tailwind CSS, Supabase, and OpenAI APIs.',
    'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200',
    '["Next.js","Tailwind CSS","Supabase","API Integration","Full-Stack Development"]'::jsonb,
    'https://jobs-pulse-two.vercel.app/',
    5
  ),
  (
    'Zuhd — Islamic Knowledge Platform',
    'Website',
    'A content-driven educational platform for Islamic learning, courses, and community resources.',
    'Zuhd delivers Islamic knowledge through lectures, blogs, courses, and community programs based on the Qur''an and Sunnah. It includes structured learning paths, multimedia content, and after-school programs. Built as a content-focused web platform with modern frontend tooling.',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1200',
    '["JavaScript","Tailwind CSS","YouTube Integration","Full-Stack Development"]'::jsonb,
    'https://zuhd.au/',
    6
  )
) as v(title, category, description, full_detail, image_url, tags, link, order_index)
where not exists (select 1 from public.projects);

-- Done.
-- Safe: projects pehle se hain to delete / overwrite nahi.
-- Naya: experience table + updated hero/about/services/contact/footer.
