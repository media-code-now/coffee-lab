import interlinks from "@/data/interlinks.json";

export type InterlinkRule = {
  keyword: string;
  url: string;
  title?: string;
};

type InterlinkClusters = Record<string, InterlinkRule[]>;

const clusters: InterlinkClusters =
  typeof interlinks === "object" && !Array.isArray(interlinks)
    ? (interlinks as InterlinkClusters)
    : {};

const rules: InterlinkRule[] = Object.values(clusters).flat();

export function applyInterlinks(html: string, limit = 3) {
  let remaining = limit;
  let output = html;

  for (const rule of rules) {
    if (remaining <= 0) {
      break;
    }

    const pattern = new RegExp(`(?!<[^>]*)(${escapeRegExp(rule.keyword)})`, "i");
    if (!pattern.test(output)) {
      continue;
    }

    output = output.replace(pattern, (match) => {
      remaining -= 1;
      const titleAttr = rule.title ? ` title="${rule.title}"` : "";
      return `<a href="${rule.url}"${titleAttr}>${match}</a>`;
    });
  }

  return output;
}

function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export function getInterlinkRules(cluster?: string) {
  if (cluster) {
    return clusters[cluster] ?? [];
  }
  return rules;
}

export function getInterlinkClusters() {
  return Object.keys(clusters);
}
