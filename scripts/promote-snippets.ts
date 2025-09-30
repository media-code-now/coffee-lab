#!/usr/bin/env tsx
import { readFileSync } from "fs";
import matter from "gray-matter";
import path from "path";

function buildSocialCopy(title: string, topics: string[] = []) {
  const tags = topics
    .slice(0, 2)
    .map((topic) => `#${topic.replace(/[^a-z0-9]/gi, "")}`);
  return `${title} → Sip-able insights for your mushroom coffee ritual. ${tags.join(" ")}`.trim();
}

function main() {
  const filePath = process.argv[2];
  if (!filePath) {
    console.error("Usage: promote-snippets path/to/post.mdx");
    process.exit(1);
  }

  const absolute = path.isAbsolute(filePath)
    ? filePath
    : path.join(process.cwd(), filePath);
  const raw = readFileSync(absolute, "utf8");
  const { data } = matter(raw);

  const title = data.title ?? "Untitled";
  const summary = data.summary ?? "";
  const topics = data.topic ? [data.topic, ...(data.tags ?? [])] : data.tags ?? [];
  const slug = path.basename(filePath).replace(/\.mdx$/, "");

  const searchSnippet = summary.slice(0, 155);
  const socialCopy = buildSocialCopy(title, topics);

  console.log(JSON.stringify({ slug, title, searchSnippet, socialCopy }, null, 2));
}

main();
