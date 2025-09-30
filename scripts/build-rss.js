#!/usr/bin/env node
const { promises: fs } = require("fs");
const path = require("path");
const matter = require("gray-matter");

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com";

async function loadPosts() {
  const postsDir = path.join(process.cwd(), "content", "posts");
  const files = await collectMdx(filesFrom(postsDir));

  const posts = [];
  for (const filePath of files) {
    const raw = await fs.readFile(filePath, "utf8");
    const { data } = matter(raw);
    const fileSlug = path.basename(filePath).replace(/\.mdx$/, "");
    const status = (data.status ?? "draft").toLowerCase();
    if (status !== "published") {
      continue;
    }
    const slug = data.slug ?? fileSlug;
    posts.push({
      title: data.title ?? slug,
      summary: data.summary ?? "",
      date: data.date ?? new Date().toISOString(),
      permalink: data.canonical ?? `/blog/${slug}`,
      updated: data.updated
    });
  }

  return posts.sort((a, b) => (a.date < b.date ? 1 : -1));
}

async function collectMdx(iter) {
  const paths = [];
  for await (const filePath of iter) {
    paths.push(filePath);
  }
  return paths;
}

async function* filesFrom(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const resolved = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      yield* filesFrom(resolved);
    } else if (entry.isFile() && entry.name.endsWith(".mdx")) {
      yield resolved;
    }
  }
}

function generateRssXml(posts) {
  const feedItems = posts
    .map((post) => {
      const url = new URL(post.permalink, SITE_URL).toString();
      return `\n    <item>\n      <title><![CDATA[${post.title}]]></title>\n      <link>${url}</link>\n      <guid>${url}</guid>\n      <pubDate>${new Date(post.date).toUTCString()}</pubDate>\n      <description><![CDATA[${post.summary}]]></description>\n    </item>`;
    })
    .join("");

  return `<?xml version="1.0" encoding="UTF-8" ?>\n<rss version="2.0">\n  <channel>\n    <title>Mushroom Coffee Lab</title>\n    <link>${SITE_URL}</link>\n    <description>Latest mushroom coffee guides, reviews, and research.</description>${feedItems}\n  </channel>\n</rss>`;
}

async function main() {
  const posts = await loadPosts();
  const xml = generateRssXml(posts);
  const outDir = path.join(process.cwd(), "public");
  await fs.mkdir(outDir, { recursive: true });
  await fs.writeFile(path.join(outDir, "rss.xml"), xml, "utf8");
  console.log("RSS feed written to public/rss.xml");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
