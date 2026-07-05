import { config } from "./llm/config.js";
import { createResponse, streamResponse } from "./llm/openai.js";
import { buildInterviewMessages } from "./llm/messages.js";
import { runTool } from "./llm/tools.js";

const json = (response, status, body) => response.status(status).json(body);
const wantsStream = (request) => String(request.headers?.accept || "").includes("text/event-stream") || Boolean(request.body?.stream);

const answerQuestion = async ({ question, memories, language }) => {
  const messages = await buildInterviewMessages({ question, memories, language });

  return createResponse({ messages });
};

const streamQuestion = async ({ question, memories, response, language }) => {
  const messages = await buildInterviewMessages({ question, memories, language });
  const stream = await streamResponse({ messages });

  for await (const event of stream) {
    if (event.type === "response.output_text.delta" && event.delta) {
      sendEvent(response, "delta", { text: event.delta });
    }
  }
};

const serializeMemories = (matches) =>
  matches.map((match) => ({
    id: match.id,
    title: match.title,
    source: match.source,
    score: Number(match.score || match.bm25Score || 0).toFixed(3)
  }));

const startStream = (response) => {
  response.status(200);
  response.setHeader("Content-Type", "text/event-stream; charset=utf-8");
  response.setHeader("Cache-Control", "no-cache, no-transform");
  response.setHeader("Connection", "keep-alive");
  response.flushHeaders?.();
};

const sendEvent = (response, event, data = {}) => {
  response.write(`event: ${event}\n`);
  response.write(`data: ${JSON.stringify(data)}\n\n`);
};

export default async function handler(request, response) {
  if (request.method !== "POST") {
    response.setHeader("Allow", "POST");
    return json(response, 405, { error: "Method not allowed" });
  }

  const question = String(request.body?.question || "").trim();
  const language = String(request.body?.language || "en").trim();

  if (!question) {
    return json(response, 400, { error: "Question is required" });
  }

  if (!config.openaiApiKey) {
    return json(response, 500, { error: "OPENAI_API_KEY is not configured" });
  }

  try {
    const retrieval = await runTool("search_memories", { query: question });
    const memories = serializeMemories(retrieval.matches);

    if (wantsStream(request)) {
      startStream(response);
      sendEvent(response, "meta", {
        retrieval: retrieval.mode,
        model: config.openaiModel,
        tools: ["search_memories"],
        memories
      });

      try {
        await streamQuestion({ question, memories: retrieval.matches, response, language });
        sendEvent(response, "done");
      } catch (error) {
        console.error(error);
        sendEvent(response, "error", { error: "Interview assistant failed" });
      }

      return response.end();
    }

    const answer = await answerQuestion({ question, memories: retrieval.matches, language });

    return json(response, 200, {
      answer,
      retrieval: retrieval.mode,
      model: config.openaiModel,
      tools: ["search_memories"],
      memories
    });
  } catch (error) {
    console.error(error);
    return json(response, 500, { error: "Interview assistant failed" });
  }
}
