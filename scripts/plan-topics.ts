#!/usr/bin/env tsx
import { readFileSync } from "fs";
import path from "path";

interface CliOptions {
  keyword?: string;
}

function parseArgs(argv: string[]): CliOptions {
  const options: CliOptions = {};
  for (let index = 0; index < argv.length; index++) {
    const current = argv[index];
    if (current === "--keyword" || current === "-k") {
      options.keyword = argv[index + 1];
      index += 1;
    }
  }
  return options;
}

function main() {
  const options = parseArgs(process.argv.slice(2));
  const topicsFile = path.join(process.cwd(), "data", "topics.json");
  const raw = readFileSync(topicsFile, "utf8");
  const savedTopics = JSON.parse(raw) as { allowed: string[] };

  const baseKeyword = options.keyword ?? "mushroom coffee";
  const ideas = [
    {
      title: `${baseKeyword} buyers guide`,
      angle: "Comparison",
      prompt: "Map the decision factors consumers weigh when choosing between instant sachets, grounds, and ready-to-drink mushroom coffee."
    },
    {
      title: `${baseKeyword} brew workflow`,
      angle: "How-To",
      prompt: "Document an optimal morning brew ritual that balances flavor, adaptogens, and caffeine tolerance."
    },
    {
      title: `${baseKeyword} research digest`,
      angle: "Studies Explained",
      prompt: "Summarize a recent clinical study on functional mushrooms and explain the takeaways in plain English."
    }
  ];

  const output = {
    keyword: baseKeyword,
    allowedTopics: savedTopics.allowed,
    generatedAt: new Date().toISOString(),
    ideas
  };

  console.log(JSON.stringify(output, null, 2));
}

main();
