import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Breadcrumbs from "@/components/Breadcrumbs";
import Prose from "@/components/Prose";
import SeoHead from "@/components/SeoHead";
import TableOfContents from "@/components/TableOfContents";
import { MDXContent } from "@/lib/mdx";
import {
  getAdjacentPosts,
  getPostBySlug,
  getPostStaticParams
} from "@/lib/contentlayer";
import { buildCanonicalPath, buildMetadata } from "@/lib/seo";

interface PostPageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  return getPostStaticParams();
}

export function generateMetadata({ params }: PostPageProps): Metadata {
  const post = getPostBySlug(params.slug);
  if (!post) {
    return {};
  }

  return buildMetadata({
    title: post.title,
    description: post.summary,
    pathname: post.permalink,
    keywords: post.keywords
  });
}

export default function PostPage({ params }: PostPageProps) {
  const post = getPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  const { previous, next } = getAdjacentPosts(post.slug);
  const headings = extractHeadings(post.body.raw);
  const canonicalPath = post.canonical ?? post.permalink;
  const canonicalUrl = buildCanonicalPath(canonicalPath);

  const authorName = "Noam Sadi";

  const articleJsonLd: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.summary,
    datePublished: post.date,
    dateModified: post.updated ?? post.date,
    author: {
      "@type": "Person",
      name: authorName
    },
    url: canonicalUrl,
    mainEntityOfPage: canonicalUrl
  };

  if (post.keywords?.length) {
    articleJsonLd.keywords = post.keywords.join(", ");
  }

  return (
    <article className="post">
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Blog", href: "/blog" },
          { label: post.title }
        ]}
      />
      <SeoHead jsonLd={articleJsonLd} />
      <header className="post__header">
        <p className="post__meta">
          <time dateTime={post.date}>{new Date(post.date).toDateString()}</time>
          <span>•</span>
          <span>{post.readingTimeMinutes} min read</span>
          {post.topic ? (
            <>
              <span>•</span>
              <Link href={`/topics/${encodeURIComponent(post.topic)}`}>
                {post.topic}
              </Link>
            </>
          ) : null}
        </p>
        <h1>{post.title}</h1>
        <p className="post__description">{post.summary}</p>
      </header>

      <div className="post__layout">
        <Prose>
          <MDXContent code={post.body.code} />
        </Prose>
        <aside className="post__sidebar">
          <TableOfContents headings={headings} />
        </aside>
      </div>

      <footer className="post__footer">
        <div className="post__nav">
          {previous ? (
            <Link href={previous.permalink} className="post__nav-link">
              ← {previous.title}
            </Link>
          ) : (
            <span />
          )}
          {next ? (
            <Link href={next.permalink} className="post__nav-link">
              {next.title} →
            </Link>
          ) : (
            <span />
          )}
        </div>
      </footer>
    </article>
  );
}

function extractHeadings(markdown: string) {
  return markdown
    .split("\n")
    .map((line) => {
      const match = /^(#{2,4})\s+(.*)/.exec(line);
      if (!match) return null;
      const level = match[1].length;
      const title = match[2].trim();
      const id = title
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-");
      return { id, title, level };
    })
    .filter(Boolean) as Array<{ id: string; title: string; level: number }>;
}
