#!/usr/bin/env tsx
import { readFileSync } from "fs";
import matter from "gray-matter";
import path from "path";

function main() {
  const filePath = process.argv[2];
  if (!filePath) {
    console.error("Usage: post-edit-checklist path/to/post.mdx");
    process.exit(1);
  }

  const absolute = path.isAbsolute(filePath)
    ? filePath
    : path.join(process.cwd(), filePath);
  const raw = readFileSync(absolute, "utf8");
  const { data, content } = matter(raw);

  const checklist: Array<{ label: string; done: boolean }> = [
    {
      label: "Summary is 90-160 characters",
      done: typeof data.summary === "string" && data.summary.length >= 90 && data.summary.length <= 160
    },
    {
      label: "Topic locked to mushroom-coffee",
      done: data.topic === "mushroom-coffee"
    },
    {
      label: "Cluster is set to an approved value",
      done:
        typeof data.cluster === "string" &&
        [
          "buyers-guides",
          "product-reviews",
          "how-to",
          "ingredient-guides",
          "studies-explained"
        ].includes(data.cluster)
    },
    {
      label: "Includes at least three H2 sections",
      done: (content.match(/^##\s+/gm) ?? []).length >= 3
    },
    {
      label: "Includes one CTA callout",
      done: /<Callout/i.test(content)
    },
    {
      label: "Has at least two keywords",
      done: Array.isArray(data.keywords) && data.keywords.filter(Boolean).length >= 2
    },
    {
      label: "No TODO placeholders remain",
      done: !/TODO/i.test(content)
    },
    {
      label: "Frontmatter status is 'published'",
      done: typeof data.status === "string" && data.status.toLowerCase() === "published"
    }
  ];

  console.log(`Checklist for ${path.basename(filePath)}:`);
  for (const item of checklist) {
    console.log(`${item.done ? "[x]" : "[ ]"} ${item.label}`);
  }
}

main();
