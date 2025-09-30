import { allPosts } from "contentlayer/generated";

export type ContentPost = (typeof allPosts)[number];

const COLLECTION_METADATA: Record<
  string,
  { label: string; description: string }
> = {
  "buyers-guides": {
    label: "Buyers Guides",
    description: "Best-of lists and comparisons to help you pick the right mushroom coffee setup."
  },
  "product-reviews": {
    label: "Product Reviews",
    description: "Hands-on reviews of mushroom coffee blends, pods, and accessories."
  },
  "how-to": {
    label: "How-To",
    description: "Actionable workflows for brewing, dosing, and storing mushroom coffee."
  },
  "ingredient-guides": {
    label: "Ingredient Guides",
    description: "Plain-language breakdowns of functional mushroom benefits and sourcing."
  },
  "studies-explained": {
    label: "Studies Explained",
    description: "Digestible summaries of the latest research behind functional mushrooms."
  }
};

function sortByDateDesc(posts: ContentPost[]) {
  return [...posts].sort((a, b) => (a.date < b.date ? 1 : -1));
}

const publishedPosts = sortByDateDesc(
  allPosts.filter((post) => (post.status ?? "draft").toLowerCase() === "published")
);

export function getAllPosts(): ContentPost[] {
  return publishedPosts;
}

export function getLatestPosts(limit = 6): ContentPost[] {
  return publishedPosts.slice(0, limit);
}

export function getPostBySlug(slug: string): ContentPost | undefined {
  return publishedPosts.find((post) => post.slug === slug);
}

export function getPostStaticParams() {
  return publishedPosts.map((post) => ({ slug: post.slug }));
}

export function getAdjacentPosts(slug: string) {
  const index = publishedPosts.findIndex((post) => post.slug === slug);
  if (index === -1) {
    return { previous: undefined, next: undefined };
  }

  return {
    previous: publishedPosts[index + 1],
    next: index > 0 ? publishedPosts[index - 1] : undefined
  };
}

export function getCollectionMeta(collection: string) {
  return COLLECTION_METADATA[collection] ?? {
    label: collection,
    description: ""
  };
}

export function getCollections() {
  const counts = new Map<string, number>();
  for (const post of publishedPosts) {
    const collection = post.collection ?? "general";
    counts.set(collection, (counts.get(collection) ?? 0) + 1);
  }

  return Array.from(counts.entries())
    .map(([collection, count]) => ({
      collection,
      count,
      meta: getCollectionMeta(collection)
    }))
    .sort((a, b) => a.meta.label.localeCompare(b.meta.label));
}

export function getPostsByCollection(collection: string) {
  return publishedPosts.filter((post) => post.collection === collection);
}

export function getMushroomCoffeePosts() {
  return publishedPosts.filter((post) => post.topic === "mushroom-coffee");
}
