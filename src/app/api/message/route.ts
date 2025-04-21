import { db } from '@/db'
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import { PineconeStore } from "@langchain/pinecone";
import { NextRequest } from 'next/server'
import { StreamingTextResponse } from 'ai';
import { SendMessageValidator } from '@/lib/validators/sendMessageValidator'
import { VertexAIEmbeddings } from '@langchain/google-vertexai'
import { getPineconClient } from '@/lib/pinecone';
import { model } from '@/lib/geminie'

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

  const embeddings = new VertexAIEmbeddings({
    model: "textembedding-gecko@latest",
  })

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
        contexts: await vectorStore.similaritySearch(message, 2)
      }
    })
  )
  console.log("😂😂😂😂", fileResults)

  const prevMessages = await db.message.findMany({
    where: { fileGroupId: groupId },
    orderBy: { createdAt: 'asc' },
    take: 6,
  })

  const formattedPrevMessages = prevMessages.map((msg) => ({
    role: msg.isUserMessage ? 'user' as const : 'assistant' as const,
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

  // Modified system and human prompts
    const systemPrompt = `
    You are a professional cross-domain document analyst. Analyze information from these files which may cover completely different subjects:
    ${files.map(f => f.name).join(', ')}.

    Important Guidelines:
    0. only consider the user question for the response if conversation history does not relate to the message. 
    1. Preserve the original context and domain-specific meaning of each document
    2. Never merge concepts from different domains unless explicitly requested
    3. Clearly indicate source documents using their filenames
    4. Acknowledge conflicting perspectives between documents
    5. if user ask something which is related to only one or two document - dont specify consider and specify other documents in response
    6. most important thing is to keep the response as short as possible. don't explain exra things that user has not asked.`

    ;

    const humanPrompt = `
    USER QUESTION: ${message}

    DOCUMENT CONTEXT:
    ${contextBlocks}

    CONVERSATION HISTORY:
    ${formattedPrevMessages.map(m => `- ${m.role.toUpperCase()}: ${m.content}`).join('\n')}

    RESPONSE REQUIREMENTS:
    1. Use markdown formatting with clear section headers
    2. If documents conflict:
      - "Document A suggests... while Document B states..."
      - "These perspectives differ because..."
    3. If unrelated domains:
      - "Regarding financial aspects..." 
      - "In the spiritual context..."
      - "These concepts appear unrelated but respectively..."`
    ;

    const messageStream = await model.stream([
      ["system", systemPrompt],
      ["human", humanPrompt],
    ]);

  const stream = new ReadableStream({
    async start(controller) {
      let fullResponse = ''
      
      try {
        for await (const chunk of await messageStream) {
          const content = chunk.content
          let textChunk = ''

          if (typeof content === 'string') {
            textChunk = content
          } else {
            for (const part of content) {
              if (typeof part === 'object' && 'type' in part && part.type === 'text') {
                textChunk += part.text
              }
            }
          }

          if (textChunk) {
            controller.enqueue(new TextEncoder().encode(textChunk))
            fullResponse += textChunk
          }
        }

        await db.message.create({
          data: {
            text: fullResponse,
            isUserMessage: false,
            fileGroupId: groupId,
            userId,
          },
        })
      } catch (error) {
        console.error('Stream error:', error)
        controller.error(error)
      } finally {
        controller.close()
      }
    },
  })
  return new StreamingTextResponse(stream)
}