import { searchMemories } from "./retrieval.js";

export const tools = {
  search_memories: {
    name: "search_memories",
    description: "Hybrid search over Marta Ileana Badea's telecom resume, technical expertise, work-style, and background memories.",
    parameters: {
      type: "object",
      properties: {
        query: {
          type: "string",
          description: "The hiring or interview question to search for."
        },
        limit: {
          type: "number",
          description: "Maximum number of memory chunks to return."
        }
      },
      required: ["query"],
      additionalProperties: false
    },
    execute: searchMemories
  }
};

export const runTool = async (name, args) => {
  const tool = tools[name];
  if (!tool) throw new Error(`Unknown tool: ${name}`);
  return tool.execute(args);
};

export const registeredTools = Object.values(tools).map(({ execute, ...tool }) => tool);
