import OpenAI from "openai";
import { config } from "./config.js";

let client;

export const getOpenAIClient = () => {
  if (!config.openaiApiKey) {
    throw new Error("OPENAI_API_KEY is not configured");
  }

  if (!client) {
    client = new OpenAI({ apiKey: config.openaiApiKey });
  }

  return client;
};

export const createResponse = async ({ messages, ...options }) => {
  const response = await getOpenAIClient().responses.create({
    model: config.openaiModel,
    input: messages,
    max_output_tokens: 1400,
    ...options
  });

  return response.output_text?.trim() || "";
};

export const streamResponse = async ({ messages, ...options }) =>
  getOpenAIClient().responses.create({
    model: config.openaiModel,
    input: messages,
    max_output_tokens: 1400,
    stream: true,
    ...options
  });
