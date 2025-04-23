// Or, if using the web entrypoint:
// import { ChatVertexAI } from "@langchain/google-vertexai-web";
import dotenv from 'dotenv';


// Load environment variables
dotenv.config({ path: '.env' });
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";

const llm = new ChatGoogleGenerativeAI({
  model: "gemini-1.5-pro",
  temperature: 0,
  maxRetries: 2,
  // other params...
});

const aiMsg = await llm.invoke([
  [
    "system",
    "You are a helpful assistant that translates English to French. Translate the user sentence.",
  ],
  ["human", "My name is usman ashraf."],
]);
aiMsg;
  
  console.log(aiMsg.content);
