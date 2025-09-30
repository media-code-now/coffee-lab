// contentlayer.config.ts
import { defineDocumentType, makeSource } from "contentlayer/source-files";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
var Post = defineDocumentType(() => ({
  name: "Post",
  filePathPattern: `posts/**/*.mdx`,
  contentType: "mdx",
  fields: {
    title: { type: "string", required: true },
    slug: { type: "string", required: true },
    date: { type: "date", required: true },
    updated: { type: "date", required: false },
    topic: {
      type: "enum",
      options: ["mushroom-coffee"],
      default: "mushroom-coffee",
      required: true
    },
    cluster: {
      type: "enum",
      options: [
        "buyers-guides",
        "product-reviews",
        "how-to",
        "ingredient-guides",
        "studies-explained"
      ],
      required: true
    },
    tags: { type: "list", of: { type: "string" }, required: false },
    summary: { type: "string", required: true },
    keywords: { type: "list", of: { type: "string" }, required: false },
    status: { type: "string", required: true, default: "draft" },
    canonical: { type: "string", required: false }
  },
  computedFields: {
    slug: {
      type: "string",
      resolve: (doc) => doc.slug ?? doc._raw.flattenedPath.replace(/^posts\//, "")
    },
    permalink: {
      type: "string",
      resolve: (doc) => `/blog/${doc.slug ?? doc._raw.flattenedPath.replace(/^posts\//, "")}`
    },
    collection: {
      type: "string",
      resolve: (doc) => {
        if (doc.cluster) {
          return doc.cluster;
        }
        const segments = doc._raw.flattenedPath.split("/");
        return segments.length > 1 ? segments[0] : "general";
      }
    },
    readingTimeMinutes: {
      type: "number",
      resolve: (doc) => Math.max(1, Math.ceil(doc.body.raw.split(/\s+/).filter(Boolean).length / 200))
    }
  }
}));
var DraftPost = defineDocumentType(() => ({
  name: "DraftPost",
  filePathPattern: `drafts/**/*.mdx`,
  contentType: "mdx",
  fields: {
    title: { type: "string", required: true },
    slug: { type: "string", required: false },
    topic: {
      type: "enum",
      options: ["mushroom-coffee"],
      default: "mushroom-coffee",
      required: false
    },
    cluster: {
      type: "enum",
      options: [
        "buyers-guides",
        "product-reviews",
        "how-to",
        "ingredient-guides",
        "studies-explained"
      ],
      required: false
    },
    tags: { type: "list", of: { type: "string" }, required: false },
    author: { type: "string", required: false },
    summary: { type: "string", required: false },
    status: { type: "string", required: false }
  },
  computedFields: {
    slug: {
      type: "string",
      resolve: (doc) => doc.slug ?? doc._raw.flattenedPath.replace(/^drafts\//, "")
    }
  }
}));
var contentlayer_config_default = makeSource({
  contentDirPath: "content",
  documentTypes: [Post, DraftPost],
  mdx: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [rehypeSlug, [rehypeAutolinkHeadings, { behavior: "wrap" }]]
  }
});
export {
  DraftPost,
  Post,
  contentlayer_config_default as default
};
//# sourceMappingURL=compiled-contentlayer-config-KH2W5OR7.mjs.map
