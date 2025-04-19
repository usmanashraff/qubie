import { db } from '@/db'
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import { PineconeStore } from "@langchain/pinecone";
import { NextRequest } from 'next/server'
import { StreamingTextResponse } from 'ai';
import { SendMessageValidator } from '@/lib/validators/sendMessageValidator'
import { VertexAIEmbeddings } from '@langchain/google-vertexai'
import { getPineconClient } from '@/lib/pinecone';
import {model} from '@/lib/geminie'
export const POST = async (req: NextRequest) => {
  // endpoint for asking a question to a pdf file
  const body = await req.json()

  const { getUser } = getKindeServerSession()
  const user = await getUser()

  const { id: userId } = user

  if (!userId)
    return new Response('Unauthorized', { status: 401 })

  const { groupId, message } =
    SendMessageValidator.parse(body)

  const fileGroup = await db.fileGroup.findFirst({
    where: {
      id: groupId,
      userId,
    },
  })

  if (!fileGroup)
    return new Response('Not found', { status: 404 })

  await db.message.create({
    data: {
      text: message,
      isUserMessage: true,
      userId,
      fileGroupId: groupId,
    },
  })

  // Step 1: Get all files for the given fileGroupId
    const files = await db.file.findMany({
      where: {
        fileGroupId: groupId,
      },
    })

 // Step 2: Initialize embeddings and Pinecone client
  const embeddings = new VertexAIEmbeddings({
    model: "textembedding-gecko@latest",
  })

  const pc = await getPineconClient()
  const pineconeIndex = pc.index('qubie')

  // Step 3: Loop through files and search in their namespaces
  const allResults = await Promise.all(
    files.map(async (file) => {
      const vectorStore = await PineconeStore.fromExistingIndex(
        embeddings,
        {
          pineconeIndex,
          namespace: file.id, // Each file has its own namespace
        }
      )

      // Step 4: Perform similarity search in each namespace
      return vectorStore.similaritySearch(message, 4)
    })
)
// Step 5: Flatten results into a single array
  const flattenedResults = allResults.flat()

  const prevMessages = await db.message.findMany({
    where: {
      fileGroupId: groupId,
    },
    orderBy: {
      createdAt: 'asc',
    },
    take: 6,
  })

  const formattedPrevMessages = prevMessages.map((msg) => ({
    role: msg.isUserMessage
      ? ('user' as const)
      : ('assistant' as const),
    content: msg.text,
  }))

  // Generate response using Gemini
  const messageStream = await model.stream([
    [
      "system",
      "Use the following pieces of context (or previous conversation if needed) to answer the user's question in markdown format. If you don't know the answer, just say that you don't know, don't try to make up an answer. keep the answer brief and meaningful. note user can pass different context in the same prompt",
    ],
    [
      "human",
      `Use the following pieces of context (or previous conversation if needed) to answer the user's question in markdown format. \nIf you don't know the answer, just say that you don't know, don't try to make up an answer. keep the answer brief and meaningful. note user can pass different context in the same prompt
        
  \n----------------\n
  
  PREVIOUS CONVERSATION:
  ${formattedPrevMessages.map((message) => {
    if (message.role === 'user')
      return `User: ${message.content}\n`
    return `Assistant: ${message.content}\n`
  })}
  
  \n----------------\n
  
  CONTEXT:
  ${flattenedResults.map((r) => r.pageContent).join('\n\n')}
  
  USER INPUT: ${message}`,
    ],
  ]);

  // Create a proper async iterator
  // ... (previous imports remain the same)

const stream = new ReadableStream({
  async start(controller) {
    let fullResponse = '';
    
    try {
      for await (const chunk of await messageStream) {
        // Handle different content types safely
        const content = chunk.content;
        let textChunk = '';

        if (typeof content === 'string') {
          // Handle simple string content
          textChunk = content;
        } else {
          // Handle complex message content (array of content parts)
          for (const part of content) {
            if (typeof part === 'object' && 'type' in part && part.type === 'text') {
              textChunk += part.text;
            }
          }
        }

        if (textChunk) {
          controller.enqueue(new TextEncoder().encode(textChunk));
          fullResponse += textChunk;
        }
      }

      // Save to database
      await db.message.create({
        data: {
          text: fullResponse,
          isUserMessage: false,
          fileGroupId: groupId,
          userId,
        },
      });
    } catch (error) {
      console.error('Stream error:', error);
      controller.error(error);
    } finally {
      controller.close();
    }
  },
 });
  return new StreamingTextResponse(stream);
}
