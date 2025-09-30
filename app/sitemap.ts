import type { MetadataRoute } from "next";
import { getAllPosts, getAllTopics } from "@/lib/contentlayer";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts();
  const topics = getAllTopics();

  const baseEntries: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      lastModified: new Date()
    },
    {
      url: `${SITE_URL}/blog`,
      lastModified: new Date()
    },
    {
      url: `${SITE_URL}/topics/mushroom-coffee`,
      lastModified: new Date()
    }
  ];

  const postEntries = posts.map((post) => ({
    url: new URL(post.canonical ?? post.permalink, SITE_URL).toString(),
    lastModified: new Date(post.updated ?? post.date)
  }));

  const topicEntries = topics.map((topic) => ({
    url: `${SITE_URL}/topics/${encodeURIComponent(topic)}`,
    lastModified: new Date()
  }));

  return [...baseEntries, ...postEntries, ...topicEntries];
}
