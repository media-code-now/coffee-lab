import { promises as fs } from "fs";
import path from "path";
import { getAllPosts } from "./contentlayer";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com";

export function generateRssXml() {
  const posts = getAllPosts();
  const feedItems = posts
    .map((post) => {
      const url = new URL(post.canonical ?? post.permalink, SITE_URL).toString();
      const pubDate = new Date(post.date).toUTCString();
      return `\n    <item>\n      <title><![CDATA[${post.title}]]></title>\n      <link>${url}</link>\n      <guid>${url}</guid>\n      <pubDate>${pubDate}</pubDate>\n      <description><![CDATA[${post.summary}]]></description>\n    </item>`;
    })
    .join("");

  return `<?xml version="1.0" encoding="UTF-8" ?>\n<rss version="2.0">\n  <channel>\n    <title>Mushroom Coffee Lab</title>\n    <link>${SITE_URL}</link>\n    <description>Latest mushroom coffee guides, reviews, and research.</description>${feedItems}\n  </channel>\n</rss>`;
}

export async function writeRssFile(outDir = "public") {
  const rssXml = generateRssXml();
  const fullPath = path.join(process.cwd(), outDir, "rss.xml");
  await fs.mkdir(path.dirname(fullPath), { recursive: true });
  await fs.writeFile(fullPath, rssXml, "utf8");
}
