# Mushroom Coffee Lab

A Next.js App Router starter built for a single vertical: mushroom coffee. It combines Contentlayer-powered MDX, editorial workflows, and distribution prompts so you can publish buyers guides, brew workflows, and ingredient explainers with confidence.

## Getting Started

```bash
pnpm install
pnpm dev
```

Key scripts:

- `pnpm dev`: start the Next.js development server
- `pnpm build`: generate Contentlayer types, build the app, and emit RSS via `scripts/build-rss.js`
- `pnpm typecheck`: ensure TypeScript safety

Set `NEXT_PUBLIC_SITE_URL` and `REVALIDATE_SECRET` in `.env.local` as needed.

## Content Model

- Posts live under `content/posts/<collection>/<slug>.mdx` (collections: `buyers-guides`, `product-reviews`, `how-to`, `ingredient-guides`, `studies-explained`).
- Drafts are staged in `content/drafts/` via the `scripts/generate-post.ts` helper.
- `data/topics.json` locks the allowed topic list to `mushroom-coffee`; `data/interlinks.json` groups internal links by collection; `data/style.json` captures brand voice, CTAs, and disclaimers.

Each published MDX file begins with frontmatter shaped like:

```yaml
---
title: "Post Title"
slug: "post-title"
date: "2025-09-29"
topic: "mushroom-coffee"
cluster: "ingredient-guides"
tags: []
summary: "1-2 sentence overview between 90-160 characters."
keywords: []
status: "draft"
---
```

## App Structure

- `app/`: App Router routes, including the blog, topic pages, RSS, sitemap, and on-demand revalidation endpoint.
- `components/`: UI primitives such as `PostCard`, `Prose`, `TableOfContents`, and newsletter opt-in.
- `lib/`: Helpers for MDX rendering, content querying, SEO metadata, interlinking, and RSS generation.
- `scripts/`: CLI utilities for ideating topics, drafting posts, editorial QA, promotional snippets, and RSS generation.
- `prompts/`: Reusable LLM prompts for topic ideation, product copy, meta snippets, internal linking, fact-checking, compliance, and distribution.

## Workflows

1. Run `pnpm tsx scripts/plan-topics.ts --keyword "mushroom coffee"` to ideate content angles that fit the vertical.
2. Use `pnpm tsx scripts/generate-post.ts --title "{Title}" --topic "mushroom-coffee" --author "Noam Sadi"` to scaffold a draft, then move the approved MDX into the appropriate `content/posts/<collection>/` directory.
3. Edit the MDX in `content/drafts/`, then move into `content/posts/` when approved.
4. Run `pnpm tsx scripts/post-edit-checklist.ts content/posts/your-post.mdx` before publishing.
5. Ship updates and optionally call `POST /api/revalidate` with `REVALIDATE_SECRET` to refresh ISR caches.

## Deployment Notes

- RSS is served at `/rss.xml` using a dynamic App Router route.
- `app/sitemap.ts` produces a search-engine friendly XML sitemap on build.
- `SeoHead` supports injecting JSON-LD structured data per post.

This starter focuses on a single topic cluster, making it easy to ship authoritative mushroom coffee content while keeping brand voice, compliance, and promotion airtight.
