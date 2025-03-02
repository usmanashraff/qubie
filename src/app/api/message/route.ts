import { db } from '@/db'
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import { PineconeStore } from "@langchain/pinecone";
import { NextRequest } from 'next/server'

import { StreamingTextResponse } from 'ai';
import { SendMessageValidator } from '@/lib/validators/sendMessageValidator'
import { VertexAIEmbeddings } from '@langchain/google-vertexai'
import { model } from '@/lib/geminie';
import { getPineconClient } from '@/lib/pinecone';
import dotenv from 'dotenv';


// Load environment variables
dotenv.config({ path: '.env' });

export const POST = async (req: NextRequest) => {
  // endpoint for asking a question to a pdf file

  const body = await req.json()

  const { getUser } = getKindeServerSession()
  const user = await getUser()

  const { id: userId } = user

  if (!userId)
    return new Response('Unauthorized', { status: 401 })

  const { fileId, message } =
    SendMessageValidator.parse(body)

  const file = await db.file.findFirst({
    where: {
      id: fileId,
      userId,
    },
  })

  if (!file)
    return new Response('Not found', { status: 404 })

  await db.message.create({
    data: {
      text: message,
      isUserMessage: true,
      userId,
      fileId,
    },
  })

   // Initialize Google Vertex AI Embeddings
   const embeddings = new VertexAIEmbeddings({
   model: "textembedding-gecko@latest",
  })

  const pc = await getPineconClient()
  const pineconeIndex = pc.index('qubie')

  const vectorStore = await PineconeStore.fromExistingIndex(
    embeddings,
    {
      pineconeIndex,
      namespace: file.id,
    }
  )

  const results = await vectorStore.similaritySearch(
    message,
    4
  )

  const prevMessages = await db.message.findMany({
    where: {
      fileId,
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
  const response = await model.invoke([
    [
      "system",
      "Use the following pieces of context (or previous conversation if needed) to answer the user's question in markdown format. If you don't know the answer, just say that you don't know, don't try to make up an answer.",
    ],
    [
      "human",
      `Use the following pieces of context (or previous conversation if needed) to answer the user's question in markdown format. \nIf you don't know the answer, just say that you don't know, don't try to make up an answer.
        
  \n----------------\n
  
  PREVIOUS CONVERSATION:
  ${formattedPrevMessages.map((message) => {
    if (message.role === 'user')
      return `User: ${message.content}\n`
    return `Assistant: ${message.content}\n`
  })}
  
  \n----------------\n
  
  CONTEXT:
  ${results.map((r) => r.pageContent).join('\n\n')}
  
  USER INPUT: ${message}`,
    ],
  ])

  // Handle streaming response
  const stream = new ReadableStream({
    start(controller) {
      controller.enqueue(response.content)
      controller.close()
    }
  })

  // Store response in database
  await db.message.create({
    data: {
      text: response.content.toString(),
      isUserMessage: false,
      fileId,
      userId,
    },
  })

  return new StreamingTextResponse(stream)
}