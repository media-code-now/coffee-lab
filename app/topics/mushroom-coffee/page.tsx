import type { Metadata } from "next";
import Link from "next/link";
import PostCard from "@/components/PostCard";
import styleGuide from "@/data/style.json";
import {
  getCollections,
  getPostsByCollection,
  getMushroomCoffeePosts
} from "@/lib/contentlayer";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Mushroom Coffee Library",
  description:
    "See every buyers guide, brew workflow, and ingredient breakdown for building your mushroom coffee routine.",
  pathname: "/topics/mushroom-coffee"
});

export default function MushroomCoffeeTopicPage() {
  const posts = getMushroomCoffeePosts();
  const collections = getCollections()
    .map((entry) => ({
      ...entry,
      posts: getPostsByCollection(entry.collection)
    }))
    .filter((entry) => entry.posts.length > 0);

  return (
    <section className="topic-page">
      <header className="page-header">
        <h1>Mushroom coffee knowledge base</h1>
        <p>
          Guides, reviews, and research-backed explainers curated for a single
          goal: optimize your mushroom coffee ritual without the hype.
        </p>
        <p className="topic-page__disclaimer">{styleGuide.disclaimers.general}</p>
      </header>

      <div className="post-grid">
        {posts.slice(0, 3).map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>

      {collections.map(({ collection, meta, posts: collectionPosts }) => (
        <section key={collection} className="collection-section">
          <div className="section-heading">
            <h2>{meta.label}</h2>
            <span>{meta.description}</span>
          </div>
          <div className="post-grid">
            {collectionPosts.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        </section>
      ))}

      <footer className="topic-page__footer">
        <p>{styleGuide.disclaimers.supplement}</p>
        <Link href="/blog" className="hero__cta">
          Browse the latest research briefs
        </Link>
      </footer>
    </section>
  );
}
