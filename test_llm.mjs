import { ChatVertexAI } from "@langchain/google-vertexai";
// Or, if using the web entrypoint:
// import { ChatVertexAI } from "@langchain/google-vertexai-web";
import dotenv from 'dotenv';


// Load environment variables
dotenv.config({ path: '.env' });
const model = new ChatVertexAI({
  temperature: 0.7,
  model: "gemini-1.0-pro",
});

const stream = await model.stream([
    ["system", "You are a funny assistant that answers in pirate language."],
    ["human", "What is your favorite food?"],
  ]);
  
  for await (const chunk of stream) {
    console.log(chunk.content);
  }
