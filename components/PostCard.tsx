import Link from "next/link";
import type { ContentPost } from "@/lib/contentlayer";
import { getCollectionMeta } from "@/lib/contentlayer";

function formatDate(input: string) {
  return new Intl.DateTimeFormat("en", {
    year: "numeric",
    month: "short",
    day: "2-digit"
  }).format(new Date(input));
}

interface PostCardProps {
  post: ContentPost;
}

export default function PostCard({ post }: PostCardProps) {
  return (
    <article className="post-card">
      <div className="post-card__meta">
        <time dateTime={post.date}>{formatDate(post.date)}</time>
        {post.collection ? (
          <Link
            href={`/blog?collection=${encodeURIComponent(post.collection)}`}
            className="post-card__topic"
          >
            {getCollectionMeta(post.collection).label}
          </Link>
        ) : null}
      </div>
      <h3 className="post-card__title">
        <Link href={post.permalink}>{post.title}</Link>
      </h3>
      <p className="post-card__description">{post.summary}</p>
      {post.tags?.length ? (
        <ul className="post-card__topics">
          {post.tags.slice(0, 3).map((tag) => (
            <li key={tag}>
              <span>{tag}</span>
            </li>
          ))}
        </ul>
      ) : null}
    </article>
  );
}
