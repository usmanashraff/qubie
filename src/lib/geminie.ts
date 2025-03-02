import { ChatVertexAI } from "@langchain/google-vertexai";
// Or, if using the web entrypoint:
// import { ChatVertexAI } from "@langchain/google-vertexai-web";

export const model = new ChatVertexAI({
  model: "gemini-1.0-pro",
  maxOutputTokens: 2048,
});