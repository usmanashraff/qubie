import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize Google AI client
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY!);

// Model for chat interactions
export const chatModel = genAI.getGenerativeModel({ 
  model: "gemini-2.5-pro-preview-03-25",
  generationConfig: {
    temperature: 0,
    maxOutputTokens: 8192,
  },
});

// Model for conversation renaming
export const renamingModel = genAI.getGenerativeModel({ 
  model: "gemini-1.5-pro",
  generationConfig: {
    temperature: 0,
    maxOutputTokens: 8192,
  },
});
