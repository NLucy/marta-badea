import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { extname, join, normalize } from "node:path";
import { loadLocalEnv } from "./load-env.js";

await loadLocalEnv();

const { default: askHandler } = await import("../api/ask.js");
const { default: profileHandler } = await import("../api/profile.js");

const hostname = process.env["HOST"] || "127.0.0.1";
const port = Number(process.env["PORT"] || 3000);
const publicRoot = join(process.cwd(), "public");

const mimeTypes = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".jpg": "image/jpeg",
  ".png": "image/png"
};

const readBody = async (request) => {
  const chunks = [];
  for await (const chunk of request) chunks.push(chunk);
  const raw = Buffer.concat(chunks).toString("utf8");
  return raw ? JSON.parse(raw) : {};
};

const createResponse = (serverResponse) => ({
  setHeader: (...args) => serverResponse.setHeader(...args),
  flushHeaders: (...args) => serverResponse.flushHeaders(...args),
  write: (...args) => serverResponse.write(...args),
  end: (...args) => serverResponse.end(...args),
  status(statusCode) {
    serverResponse.statusCode = statusCode;
    return this;
  },
  json(body) {
    serverResponse.setHeader("Content-Type", "application/json; charset=utf-8");
    serverResponse.end(JSON.stringify(body));
  }
});

const serveFile = async (requestPath, response) => {
  const safePath = normalize(requestPath).replace(/^(\.\.[/\\])+/, "");
  const filePath = join(publicRoot, safePath === "/" ? "index.html" : safePath);
  const fallbackPath = join(publicRoot, "index.html");

  try {
    const content = await readFile(filePath);
    response.setHeader("Content-Type", mimeTypes[extname(filePath)] || "application/octet-stream");
    response.end(content);
  } catch {
    const content = await readFile(fallbackPath);
    response.setHeader("Content-Type", "text/html; charset=utf-8");
    response.end(content);
  }
};

createServer(async (request, response) => {
  try {
    const url = new URL(request.url, `http://${request.headers.host}`);

    if (url.pathname === "/api/profile") {
      return profileHandler(request, createResponse(response));
    }

    if (url.pathname === "/api/ask") {
      request.body = await readBody(request);
      return askHandler(request, createResponse(response));
    }

    return serveFile(url.pathname, response);
  } catch (error) {
    console.error(error);
    response.statusCode = 500;
    response.end("Internal server error");
  }
}).listen(port, hostname, () => {
  console.log(`Marta Badea site running at http://${hostname}:${port}`);
});
