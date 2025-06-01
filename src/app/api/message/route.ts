import { db } from '@/db'
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import { PineconeStore } from "@langchain/pinecone";
import { NextRequest } from 'next/server'
import { Message as AIMessage, StreamingTextResponse } from 'ai';
import { SendMessageValidator } from '@/lib/validators/sendMessageValidator'
import { getPineconClient } from '@/lib/pinecone';
import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";
import { TaskType } from "@google/generative-ai";
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const POST = async (req: NextRequest) => {
  const body = await req.json()
  const { getUser } = getKindeServerSession()
  const user = await getUser()
  const { id: userId } = user

  if (!userId) return new Response('Unauthorized', { status: 401 })

  const { groupId, message } = SendMessageValidator.parse(body)
  const fileGroup = await db.fileGroup.findFirst({
    where: { id: groupId, userId }
  })

  if (!fileGroup) return new Response('Not found', { status: 404 })

  await db.message.create({
    data: {
      text: message,
      isUserMessage: true,
      userId,
      fileGroupId: groupId,
    },
  })

  const files = await db.file.findMany({
    where: { fileGroupId: groupId },
  })

  const embeddings = new GoogleGenerativeAIEmbeddings({
    model: "text-embedding-004", // 768 dimensions
    taskType: TaskType.RETRIEVAL_DOCUMENT,
  });
  const pc = await getPineconClient()
  const pineconeIndex = pc.index('qubie')

  // Maintain separate results for each file
  const fileResults = await Promise.all(
    files.map(async (file) => {
      const vectorStore = await PineconeStore.fromExistingIndex(
        embeddings,
        { pineconeIndex, namespace: file.id }
      )
      return {
        fileName: file.name,
        contexts: await vectorStore.similaritySearch(message, 4)
      }
    })
  )

  const prevMessages = await db.message.findMany({
    where: { fileGroupId: groupId },
    orderBy: { createdAt: 'asc' },
    take: 6,
  })

  const formattedPrevMessages = prevMessages.map((msg) => ({
    role: msg.isUserMessage ? ('user' as const) : ('assistant' as const),
    content: msg.text,
  }))

  // Generate context with file references
  const contextBlocks = fileResults.map(({ fileName, contexts }) => {
    if (contexts.length === 0) return ''
    return `
      FILE: ${fileName}
      CONTENT:
      ${contexts.map((c, i) => `[Context ${i + 1}]: ${c.pageContent}`).join('\n')}
    `
  }).filter(Boolean).join('\n\n')

  console.log('Context Blocks 😂:', contextBlocks)
  const systemMessage = {
    role: 'system' as const,
    content: `You are an intelligent document analysis assistant for a web application where users can upload and query multiple documents. You have access to:
    1. Document context from files: ${files.map(f => f.name).join(', ')}
    2. Previous conversation history
    
    Response Guidelines:
    1. If the query is related to uploaded documents:
       - Provide answers strictly based on the given document contexts
       - Cite specific documents and sections used in your response
       - Maintain domain-specific terminology and meaning
       - Highlight any conflicting information between documents
    
    2. If the query lacks relevant document context:
       - Clearly state that no relevant information was found in the uploaded documents
       - Provide a general response if appropriate
       - Suggest uploading relevant documents if needed
    
    3. For conversation flow:
       - For greetings or thank you messages, respond naturally and briefly
       - Consider conversation history only when relevant to the current query
       - Keep responses concise and focused on the specific question
       
    4. Format:
       - Use clear markdown formatting
       - Include document citations [DocumentName] where applicable
       - Structure complex responses with appropriate headers`
  }

  const userMessage = {
    role: 'user' as const,
    content: `
USER QUESTION: ${message}

DOCUMENT CONTEXT:
${contextBlocks}

RESPONSE REQUIREMENTS:
1. Use markdown formatting with clear section headers
2. If documents conflict:
  - "Document A suggests... while Document B states..."
  - "These perspectives differ because..."
3. If unrelated domains:
  - "Regarding financial aspects..." 
  - "In the spiritual context..."
  - "These concepts appear unrelated but respectively..."
  -- "at the end of respponse also give citation of all the documents[exact page no.] you have used to answer the question"
    `
  }

  const response = await openai.chat.completions.create({
    model: 'gpt-4.1-2025-04-14',
    messages: [systemMessage, ...formattedPrevMessages, userMessage],
    stream: true,
  });

  // Collect the full response while streaming
  let fullResponse = '';
  const encoder = new TextEncoder();
  const stream = new ReadableStream({
    async start(controller) {
      try {
        for await (const chunk of response) {
          const text = chunk.choices[0]?.delta?.content || '';
          fullResponse += text;
          controller.enqueue(encoder.encode(text));
        }
        controller.close();
        
        // Save the complete message after streaming is done
        await db.message.create({
          data: {
            text: fullResponse,
            isUserMessage: false,
            fileGroupId: groupId,
            userId,
          },
        });
      } catch (error) {
        console.error('Error processing stream:', error);
        controller.error(error);
      }
    },
  });

  return new StreamingTextResponse(stream);
}