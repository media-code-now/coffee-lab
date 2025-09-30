#!/usr/bin/env node

import fs from "node:fs/promises";

const id = process.argv[2];
if (!id) {
  console.error("Usage: node scripts/get-openverse-json.mjs <IMAGE_ID>");
  process.exit(1);
}

const endpoint = `https://api.openverse.org/v1/images/${id}`;
const res = await fetch(endpoint, { headers: { Accept: "application/json" } });
if (!res.ok) {
  console.error(`Openverse error ${res.status}`);
  process.exit(1);
}
const data = await res.json();
await fs.writeFile("openverse-image.json", JSON.stringify(data, null, 2), "utf8");

const {
  title,
  creator,
  license,
  license_version,
  license_url,
  foreign_landing_url
} = data;

const work = title && title.trim() ? title : "This work";
const by = creator && creator.trim() ? creator : "Unknown";
const licenseCode = `${license.toUpperCase()} ${license_version}`;
const credit = `${work} by ${by} - ${licenseCode} - ${foreign_landing_url} - ${license_url}`;

console.log("Saved to openverse-image.json");
console.log("Credit:", credit);
