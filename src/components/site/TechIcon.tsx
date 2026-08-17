import React from "react";

const techToIcon: Record<string, string> = {
  react: "react",
  "react.js": "react",
  "next.js": "nextdotjs",
  next: "nextdotjs",
  "vue.js": "vuedotjs",
  vue: "vuedotjs",
  "node.js": "nodedotjs",
  node: "nodedotjs",
  "express.js": "express",
  express: "express",
  mongodb: "mongodb",
  supabase: "supabase",
  firebase: "firebase",
  typescript: "typescript",
  ts: "typescript",
  javascript: "javascript",
  js: "javascript",
  "tailwind css": "tailwindcss",
  tailwind: "tailwindcss",
  bootstrap: "bootstrap",
  vite: "vite",
  python: "python",
  "ai/ml": "openai",
  ai: "openai",
  n8n: "n8n",
  webhook: "webhooks",
  youtube: "youtube",
  "youtube api": "youtube",
  "api integration": "apiconnect",
  elementor: "elementor",
  playwright: "playwright",
  selenium: "selenium",
  "drizzle orm": "drizzle",
  drizzle: "drizzle",
  c: "c",
  "c++": "cplusplus",
  php: "php",
  html: "html5",
  css: "css3",
  "html/css": "html5",
  sql: "postgresql",
  git: "git",
  github: "github",
  "vs code": "vscodium",
  cursor: "cursor",
  postman: "postman",
  jira: "jira",
  trello: "trello",
  figma: "figma",
  lovable: "heart",
};

export function TechIcon({ name, className = "size-3.5" }: { name: string; className?: string }) {
  const slug = techToIcon[name.toLowerCase()];
  if (!slug) {
    return <span className="inline-block size-1.5 rounded-full bg-brand" />;
  }

  return (
    <img
      src={`https://cdn.simpleicons.org/${slug}`}
      alt={name}
      loading="lazy"
      className={`${className} inline-block object-contain`}
      onError={(e) => {
        // Fallback if image load fails
        (e.target as HTMLElement).style.display = "none";
      }}
    />
  );
}
