#!/usr/bin/env node

const fs = require("fs");
const { writeFile, mkdir, readFile } = fs.promises;
const { createWriteStream } = fs;
const path = require("path");
const crypto = require("crypto");
const https = require("https");
const http = require("http");

const policy = require("../config/imagePolicy.json");
const ALLOWED_LICENSES = policy.allowedLicenses;

const OUT_DIR = "public/media/open";
const META_FILE = "data/images.json";

async function searchOpenverse(q, size = 12) {
  const params = new URLSearchParams({
    q,
    license: ALLOWED_LICENSES.join(","),
    size: String(size)
  });
  const url = `https://api.openverse.org/v1/images/?${params}`;
  const json = await fetchJson(url);
  return json.results || [];
}

async function downloadFile(url, outPath) {
  await mkdir(path.dirname(outPath), { recursive: true });
  const file = createWriteStream(outPath);
  await new Promise((resolve, reject) => {
    const lib = url.startsWith("https") ? https : http;
    lib.get(url, (res) => {
      if (res.statusCode && res.statusCode >= 400) {
        reject(new Error(`Download failed ${res.statusCode}`));
        res.resume();
        return;
      }
      res.pipe(file);
      res.on("error", reject);
      file.on("finish", resolve);
    }).on("error", reject);
  });
}

function fetchJson(url) {
  return new Promise((resolve, reject) => {
    const lib = url.startsWith("https") ? https : http;
    lib
      .get(url, (res) => {
        if (res.statusCode && res.statusCode >= 400) {
          reject(new Error(`Request failed ${res.statusCode}`));
          res.resume();
          return;
        }
        const chunks = [];
        res.on("data", (chunk) => chunks.push(chunk));
        res.on("end", () => {
          try {
            const json = JSON.parse(Buffer.concat(chunks).toString("utf8"));
            resolve(json);
          } catch (error) {
            reject(error);
          }
        });
      })
      .on("error", reject);
  });
}

async function fetchForSlug(slug, queries) {
  const picks = [];
  for (const q of queries) {
    const images = await searchOpenverse(q, 4);
    for (const img of images) {
      const ext = path.extname(new URL(img.url).pathname) || ".jpg";
      const name = `${slug}-${crypto.createHash("md5").update(img.id).digest("hex")}${ext}`;
      const filePath = path.join(OUT_DIR, slug, name);
      await downloadFile(img.url, filePath);
      picks.push({
        slug,
        filePath: `/${filePath.replace(/^public\//, "")}`,
        title: img.title,
        source: "openverse",
        creator: img.creator,
        license: `${img.license}-${img.license_version}`,
        attribution: {
          requirement: img.license.startsWith("cc-by") ? "required" : "optional",
          sourcePage: img.foreign_landing_url
        }
      });
    }
  }

  let existing = [];
  try {
    const raw = await readFile(META_FILE, "utf8");
    existing = JSON.parse(raw);
  } catch (error) {
    if (error.code !== "ENOENT") {
      throw error;
    }
  }

  const merged = [...existing, ...picks];
  await writeFile(META_FILE, JSON.stringify(merged, null, 2));
  console.log(`Saved ${picks.length} images for ${slug}`);
}

module.exports = { fetchForSlug };

if (require.main === module) {
  const [, , slug, ...qs] = process.argv;
  if (!slug) {
    console.error("Usage: node scripts/fetch-open-images.cjs <slug> [...queries]");
    process.exit(1);
  }
  fetchForSlug(slug, qs.length ? qs : [slug]).catch((err) => {
    console.error(err);
    process.exit(1);
  });
}
