export const config = {
  openaiApiKey: process.env.OPENAI_API_KEY,
  openaiModel: process.env.OPENAI_MODEL || "gpt-5",
  retrievalLimit: Number(process.env.RETRIEVAL_LIMIT || 6)
};
