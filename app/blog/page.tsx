import Link from "next/link";
import type { Metadata } from "next";
import PostCard from "@/components/PostCard";
import { getAllPosts, getCollections } from "@/lib/contentlayer";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Mushroom Coffee Posts",
  description:
    "Browse every guide, review, and workflow we have on mushroom coffee brewing.",
  pathname: "/blog"
});

interface BlogIndexPageProps {
  searchParams: {
    collection?: string;
  };
}

export default function BlogIndexPage({ searchParams }: BlogIndexPageProps) {
  const posts = getAllPosts();
  const collections = getCollections();
  const activeCollection = searchParams?.collection;

  const filteredPosts = activeCollection
    ? posts.filter((post) => post.collection === activeCollection)
    : posts;

  return (
    <section className="blog-index">
      <header className="page-header">
        <h1>Mushroom coffee intelligence</h1>
        <p>
          Dig into buyers guides, how-to workflows, ingredient explainers, and
          research recaps—all focused on functional mushroom coffee.
        </p>
      </header>

      <div className="filters">
        <span>Filter by collection:</span>
        <div className="chips">
          <Link
            href="/blog"
            className={!activeCollection ? "chip active" : "chip"}
          >
            All
          </Link>
          {collections.map(({ collection, meta }) => (
            <Link
              key={collection}
              href={`/blog?collection=${encodeURIComponent(collection)}`}
              className={
                activeCollection === collection ? "chip active" : "chip"
              }
            >
              {meta.label}
            </Link>
          ))}
        </div>
      </div>

      <div className="post-grid">
        {filteredPosts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
        {!filteredPosts.length ? (
          <p>No posts yet for this collection—check back soon!</p>
        ) : null}
      </div>
    </section>
  );
}
