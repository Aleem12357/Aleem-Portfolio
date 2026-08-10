const fs = require("fs");
const projectsData = require("./src/assets/projects.json");

const tsFile = "src/data/portfolio.ts";
let content = fs.readFileSync(tsFile, "utf8");

const slugImageMap = {
  "vista-artisan-dreams": ["/projects/unitedestimates1.webp", "/projects/unitedestimates2.webp"],
  "ezi-website": ["/projects/ezi-1.webp", "/projects/ezi-2.webp"],
  "password-manager": ["/projects/passop-1.webp", "/projects/passop-2.webp"],
  "bmw-website": ["/projects/bmw1.webp", "/projects/bmw2.webp"],
  "twitter-clone": ["/projects/twitterclone1.webp", "/projects/twitterclone2.webp"],
  "todo-list": ["/projects/todolist1.webp", "/projects/todolist2.webp"],
};

const generatedProjects = projectsData.map((p) => {
  let imgs = slugImageMap[p.slug] || [
    "/projects/" + p.slug + "-1.webp",
    "/projects/" + p.slug + "-2.webp",
  ];

  return `  {
    slug: "${p.slug}",
    category: "${p.stats.find((s) => s.label === "Type")?.value || "Web App"}",
    images: [${imgs.map((i) => '"' + i + '"').join(", ")}],
    title: "${p.title}",
    tagline: "${p.tagline.replace(/"/g, '\\"')}",
    description: "${p.whyIBuiltThis.substring(0, 150).replace(/"/g, '\\"').replace(/\n/g, " ")}...",
    stack: [${p.techStack.map((s) => '"' + s + '"').join(", ")}],
    highlights: [${p.keyDecisions.map((kd) => '"' + kd.title.replace(/"/g, '\\"') + '"').join(", ")}],
    year: "2024",
  }`;
});

const newBlock = `export const projects: Project[] = [\n${generatedProjects.join(",\n")}\n];`;

const startIdx = content.indexOf("export const projects: Project[] = [");
const endIdx = content.indexOf("];", startIdx) + 2;

content = content.substring(0, startIdx) + newBlock + content.substring(endIdx);
fs.writeFileSync(tsFile, content);
console.log("portfolio.ts updated successfully.");
