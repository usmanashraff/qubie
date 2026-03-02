import dotenv from 'dotenv';
import OpenAI from 'openai';

// Load environment variables
dotenv.config({ path: '.env' });

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function testOpenAILLM() {
  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4.1-2025-04-14', // Same model used in production
      messages: [
        {
          role: 'system',
          content: 'You are a helpful assistant that translates English to French. Translate the user sentence.',
        },
        {
          role: 'user',
          content: 'My name is usman ashraf.',
        },
      ],
      temperature: 0.7,
      max_tokens: 100,
    });

    console.log('Translation:', response.choices[0].message.content);
  } catch (error) {
    console.error('Error testing OpenAI LLM:', error.message);
  }
}

testOpenAILLM();
