import { config } from "./config.js";
import { memories } from "./memory-data.js";

const stopwords = new Set([
  "about",
  "and",
  "are",
  "did",
  "for",
  "from",
  "has",
  "his",
  "how",
  "marta",
  "search",
  "that",
  "the",
  "this",
  "was",
  "what",
  "when",
  "where",
  "who",
  "with"
]);

const tokenize = (text) =>
  String(text)
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .split(/\s+/)
    .filter((token) => token.length > 2 && !stopwords.has(token));

const documentText = (memory) => `${memory.title}\n${memory.title}\n${memory.text}`;

const buildCorpusStats = (memories) => {
  const docs = memories.map((memory) => tokenize(documentText(memory)));
  const documentFrequency = new Map();

  for (const tokens of docs) {
    for (const token of new Set(tokens)) {
      documentFrequency.set(token, (documentFrequency.get(token) || 0) + 1);
    }
  }

  const averageLength = docs.reduce((total, tokens) => total + tokens.length, 0) / Math.max(docs.length, 1);
  return { docs, documentFrequency, averageLength };
};

const bm25Search = (question, memories, limit) => {
  const queryTokens = tokenize(question);
  const { docs, documentFrequency, averageLength } = buildCorpusStats(memories);
  const k1 = 1.2;
  const b = 0.75;
  const totalDocs = memories.length;

  return memories
    .map((memory, index) => {
      const tokens = docs[index];
      const termFrequency = new Map();
      for (const token of tokens) termFrequency.set(token, (termFrequency.get(token) || 0) + 1);

      const score = queryTokens.reduce((total, token) => {
        const frequency = termFrequency.get(token) || 0;
        if (!frequency) return total;

        const docsWithTerm = documentFrequency.get(token) || 0;
        const idf = Math.log(1 + (totalDocs - docsWithTerm + 0.5) / (docsWithTerm + 0.5));
        const denominator = frequency + k1 * (1 - b + b * (tokens.length / averageLength));
        return total + idf * ((frequency * (k1 + 1)) / denominator);
      }, 0);

      return { ...memory, bm25Score: score, source: "bm25" };
    })
    .sort((a, b) => b.bm25Score - a.bm25Score)
    .slice(0, limit);
};

export const searchMemories = async ({ query, limit = config.retrievalLimit }) => {
  return {
    mode: "bm25_json",
    matches: bm25Search(query, memories, limit)
  };
};
