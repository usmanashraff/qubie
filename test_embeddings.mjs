

import dotenv from 'dotenv';
import { VertexAIEmbeddings } from '@langchain/google-vertexai';

// Load environment variables
dotenv.config({ path: '.env.local' });

// Test function for generating embeddings
async function testTextEmbeddingGecko() {
  try {
    // Initialize Vertex AI Embeddings
    const embeddings = new VertexAIEmbeddings({
      model: 'textembedding-gecko@latest',
    });

    // Sample text to generate embeddings for
    const text = 'Hello, how are you?';

    // Generate embeddings
    const embedding = await embeddings.embedQuery(text);

    // Log the results
    console.log('Text:', text);
    console.log('Embedding:', embedding);
  } catch (error) {
    console.error('Error testing textembedding-gecko:', error);
  }
}

// Run the test
testTextEmbeddingGecko();