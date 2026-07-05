import { readFile } from "node:fs/promises";

export default async function handler(_request, response) {
  const profile = JSON.parse(await readFile("content/profile.json", "utf8"));

  response.setHeader("Cache-Control", "s-maxage=300, stale-while-revalidate=86400");
  response.status(200).json(profile);
}
