

import dotenv from 'dotenv';
import { OpenAIEmbeddings } from '@langchain/openai';

// Load environment variables
dotenv.config({ path: '.env' });

// Test function for generating embeddings
async function testOpenAIEmbedding() {
  try {
    // Initialize OpenAI Embeddings with text-embedding-3-small
    const embeddings = new OpenAIEmbeddings({
      model: 'text-embedding-3-small', // 1,536 dimensions
      apiKey: process.env.OPENAI_API_KEY,
    });

    // Sample text to generate embeddings for
    const text = 'Hello, how are you?';

    // Generate embeddings
    const embedding = await embeddings.embedQuery(text);

    // Log the results
    console.log('Text:', text);
    console.log('Embedding:', embedding);
  } catch (error) {
    console.error('Error testing OpenAI text-embedding-3-small:', error.message);
  }
}

// Run the test
testOpenAIEmbedding();