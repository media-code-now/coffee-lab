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
    author: { type: "string", required: true },
    topic: { type: "string", required: true },
    tags: { type: "list", of: { type: "string" }, required: false },
    summary: { type: "string", required: true },
    keywords: { type: "list", of: { type: "string" }, required: false },
    cover: { type: "string", required: false },
    heroAlt: { type: "string", required: false },
    canonical: { type: "string", required: false },
    faq: {
      type: "list",
      of: {
        type: "object",
        fields: {
          q: { type: "string", required: true },
          a: { type: "string", required: true }
        }
      },
      required: false
    },
    schemaType: { type: "string", required: false, default: "Article" },
    readingTime: { type: "number", required: true },
    status: { type: "string", required: true, default: "draft" }
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
    readingTimeMinutes: {
      type: "number",
      resolve: (doc) => doc.readingTime ?? Math.max(1, Math.ceil(doc.body.raw.split(/\s+/).filter(Boolean).length / 200))
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
    topic: { type: "string", required: false },
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
//# sourceMappingURL=compiled-contentlayer-config-QDQZLEOA.mjs.map
