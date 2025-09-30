#!/usr/bin/env tsx
import { mkdirSync, existsSync, writeFileSync } from "fs";
import path from "path";

const ALLOWED_TOPIC = "mushroom-coffee";
const BANNED_TERMS = [
  "crypto",
  "bitcoin",
  "ethereum",
  "med spa",
  "laser",
  "locksmith",
  "remodel",
  "roof",
  "HVAC"
] as const;

const allowedClusters = [
  "buyers-guides",
  "product-reviews",
  "how-to",
  "ingredient-guides",
  "studies-explained"
] as const;

type Cluster = (typeof allowedClusters)[number];

interface CliOptions {
  title?: string;
  cluster?: Cluster;
}

function parseArgs(argv: string[]): CliOptions {
  const options: CliOptions = {};
  for (let index = 0; index < argv.length; index++) {
    const key = argv[index];
    if (key === "--title" || key === "-t") {
      options.title = argv[index + 1];
      index += 1;
      continue;
    }
    if (key === "--cluster" || key === "-c") {
      options.cluster = argv[index + 1] as Cluster;
      index += 1;
      continue;
    }
  }
  return options;
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

function enforceTopicSafety(text: string) {
  const lower = text.toLowerCase();
  if (!lower.includes(ALLOWED_TOPIC)) {
    throw new Error("Draft is off-topic - must include 'mushroom-coffee'.");
  }
  if (BANNED_TERMS.some((term) => lower.includes(term))) {
    throw new Error("Draft includes banned terms - revise prompt.");
  }
}

function buildDraftContent({
  title,
  slug,
  cluster
}: {
  title: string;
  slug: string;
  cluster: Cluster;
}) {
  const today = new Date().toISOString().split("T")[0];
  return `---\ntitle: "${title}"\nslug: "${slug}"\ndate: "${today}"\ntopic: "mushroom-coffee"\ncluster: "${cluster}"\ntags: []\nsummary: "TODO: add summary"\nkeywords: []\nstatus: "draft"\n---\n\n## TL;DR\n\n- Key point one\n- Key point two\n- Key point three\n\n## Intro\n\nStart with the pain your reader feels when tackling mushroom coffee.\n\n## Workflow\n\n1. Step one\n2. Step two\n3. Step three\n\n## Proof\n\nShare an example outcome, data point, or quote.\n\n## CTA\n\nWrap with a next step and the asset that supports it.\n`;
}

function main() {
  const options = parseArgs(process.argv.slice(2));
  if (!options.title) {
    console.error(
      "Usage: generate-post --title 'Post title' [--cluster buyers-guides|product-reviews|how-to|ingredient-guides|studies-explained]"
    );
    process.exit(1);
  }

  const cluster: Cluster = options.cluster && allowedClusters.includes(options.cluster)
    ? options.cluster
    : "ingredient-guides";

  const draftDir = path.join(process.cwd(), "content", "drafts");
  mkdirSync(draftDir, { recursive: true });

  const slug = `${new Date().toISOString().split("T")[0]}-${slugify(options.title)}`;
  const filePath = path.join(draftDir, `${slug}.mdx`);

  if (existsSync(filePath)) {
    console.error(`Draft already exists at ${filePath}`);
    process.exit(1);
  }

  const body = buildDraftContent({
    title: options.title,
    slug,
    cluster
  });
  enforceTopicSafety(`${options.title} ${body}`);
  writeFileSync(filePath, body, "utf8");
  console.log(`Draft written to ${path.relative(process.cwd(), filePath)}`);
}

main();
