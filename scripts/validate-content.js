import { readFile } from "node:fs/promises";
import { memories as bundledMemories } from "../lib/llm/memory-data.js";

const files = [
  "content/profile.json",
  "content/profile.en.json",
  "content/profile.de.json",
  "content/profile.fr.json",
  "content/profile.ro.json",
  "public/content/profile.en.json",
  "public/content/profile.de.json",
  "public/content/profile.fr.json",
  "public/content/profile.ro.json",
  "content/memories.json"
];
let sourceMemories = [];

for (const file of files) {
  const content = JSON.parse(await readFile(file, "utf8"));
  if (file === "content/memories.json") sourceMemories = content;
  console.log(`valid ${file}`);
}

const sourceIds = sourceMemories.map((memory) => memory.id).join(",");
const bundledIds = bundledMemories.map((memory) => memory.id).join(",");

if (sourceIds !== bundledIds) {
  throw new Error("lib/llm/memory-data.js is out of sync with content/memories.json");
}

console.log("valid lib/llm/memory-data.js");
