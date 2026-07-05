import { interviewPrompt } from "./prompts/interview.js";

export class Message {
  constructor(role, content) {
    this.role = role;
    this.content = content;
  }

  toDict() {
    return {
      role: this.role,
      content: this.content
    };
  }
}

export class SystemMessage extends Message {
  constructor(content) {
    super("system", content);
  }
}

export class UserMessage extends Message {
  constructor(content) {
    super("user", content);
  }
}

export const loadSystemPrompt = async () => interviewPrompt;

export const formatMemoryContext = (memories) =>
  memories
    .map((memory, index) => [
      `Memory ${index + 1}: ${memory.title}`,
      `ID: ${memory.id}`,
      memory.text
    ].join("\n"))
    .join("\n\n");

const languageNames = {
  en: "English",
  de: "German",
  fr: "French",
  ro: "Romanian"
};

export const buildUserPrompt = ({ question, memories, language = "en" }) => [
  "Use the context below to answer the user's question in first person.",
  `Answer in ${languageNames[language] || languageNames.en}.`,
  "",
  "Context:",
  formatMemoryContext(memories),
  "",
  "Question:",
  question
].join("\n");

export const buildInterviewMessages = async ({ question, memories, language }) => [
  new SystemMessage(await loadSystemPrompt()).toDict(),
  new UserMessage(buildUserPrompt({ question, memories, language })).toDict()
];
