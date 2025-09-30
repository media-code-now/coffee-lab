"use client";

import Link from "next/link";

export interface TocHeading {
  id: string;
  title: string;
  level: number;
}

interface TableOfContentsProps {
  headings: TocHeading[];
  title?: string;
}

export default function TableOfContents({
  headings,
  title = "On this page"
}: TableOfContentsProps) {
  if (!headings?.length) {
    return null;
  }

  return (
    <nav className="toc">
      <p className="toc__title">{title}</p>
      <ul>
        {headings.map((heading) => (
          <li key={heading.id} className={`level-${heading.level}`}>
            <Link href={`#${heading.id}`}>{heading.title}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
