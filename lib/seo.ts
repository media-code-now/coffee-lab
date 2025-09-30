import type { Metadata } from "next";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com";
const SITE_NAME = "Mushroom Coffee Lab";

export function buildCanonicalPath(pathname = "/") {
  return new URL(pathname, SITE_URL).toString();
}

export function buildMetadata({
  title,
  description,
  pathname,
  image,
  type = "article",
  keywords
}: {
  title?: string;
  description?: string;
  pathname?: string;
  image?: string;
  type?: "website" | "article" | "profile" | string;
  keywords?: string[];
} = {}): Metadata {
  const canonical = buildCanonicalPath(pathname);
  const resolvedTitle = title ? `${title} | ${SITE_NAME}` : SITE_NAME;
  const ogImage = image ? buildCanonicalPath(image) : undefined;

  return {
    title: resolvedTitle,
    description:
      description ??
      "Evidence-backed guides to brewing, buying, and optimizing your mushroom coffee ritual.",
    metadataBase: new URL(SITE_URL),
    alternates: {
      canonical
    },
    keywords,
    openGraph: {
      title: resolvedTitle,
      description:
        description ??
        "Evidence-backed guides to brewing, buying, and optimizing your mushroom coffee ritual.",
      url: canonical,
      siteName: SITE_NAME,
      images: ogImage ? [ogImage] : undefined,
      type
    },
    twitter: {
      card: "summary_large_image",
      title: resolvedTitle,
      description:
        description ??
        "Evidence-backed guides to brewing, buying, and optimizing your mushroom coffee ritual.",
      images: ogImage ? [ogImage] : undefined
    }
  };
}
