import Link from "next/link";
import NewsletterForm from "@/components/NewsletterForm";
import PostCard from "@/components/PostCard";
import { Callout } from "@/components/Callouts";
import {
  getCollections,
  getLatestPosts
} from "@/lib/contentlayer";
import styleGuide from "@/data/style.json";

export default function HomePage() {
  const latestPosts = getLatestPosts(6);
  const collections = getCollections();

  return (
    <>
      <section className="hero">
        <div className="hero__copy">
          <h1>Mushroom coffee made simple</h1>
          <p>
            Buyers guides, brewing workflows, and ingredient deep dives so you
            can build a functional mushroom ritual with confidence.
          </p>
          <Link href="/topics/mushroom-coffee" className="hero__cta">
            Explore the full library
          </Link>
        </div>
      </section>

      <section className="latest-posts">
        <div className="section-heading">
          <h2>Latest posts</h2>
          <Link href="/blog">View all posts</Link>
        </div>
        <div className="post-grid">
          {latestPosts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      </section>

      <section className="topics">
        <div className="section-heading">
          <h2>Explore by collection</h2>
        </div>
        <div className="topic-grid">
          {collections.map(({ collection, count, meta }) => (
            <Link
              key={collection}
              href={`/blog?collection=${encodeURIComponent(collection)}`}
              className="topic-pill"
            >
              <span>{meta.label}</span>
              <span className="count">{count}</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="callout-block">
        <Callout
          heading={styleGuide.cta.primary}
          body="Build a balanced daily ritual with our mushroom coffee tasting matrix and brew tracker."
          actionLabel="Download the guide"
          actionHref="/resources/mushroom-coffee-guide.pdf"
        />
      </section>

      <section className="newsletter-block">
        <NewsletterForm />
      </section>
    </>
  );
}
