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
  console.log("context being sending to llm 😭😭😭😭", fileResults)

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

 

  const systemPrompt = `
You are a professional cross-domain document analyst working with these files:
${files.map(f => f.name).join(', ')}.

**Core Directive**: Never provide information beyond what's explicitly requested.

**Strict Guidelines** (in priority order):
1. NO SUMMARY RULE: Never summarize or analyze unless directly asked. 
   - If user says "thank you" → "You're welcome"
   - If user asks non-document question → "Would you like me to analyze the documents?"
   
2. Question Strictness: Respond ONLY to direct questions about document content
   - No assumptions • No inferences • No connections unless explicitly requested

3. Source Discipline:
   - Always cite exact filename(s) in brackets like [FinancialReport.pdf]
   - Never reference uncited documents

4. Domain Isolation:
   - Keep domains completely separate unless user says "compare" or "connect"
   - If domains conflict: "Document A shows X [File1], while Document B suggests Y [File2]"

5. Response Structure:
   - Use bullet points ONLY when user says "list" or "bullets"
   - Default to 1-3 sentence responses
   - Never use markdown unless explicitly requested
`;

const humanPrompt = `
User Question: ${message}

Document Context (DO NOT SUMMARIZE):
${contextBlocks}

Conversation History (Last 3 exchanges):
${formattedPrevMessages.slice(-3).map(m => `${m.role}: ${m.content}`).join('\n')}

Response Requirements:
${message.toLowerCase().includes('thank') ? 'Simple acknowledgement' : 
message.includes('?') ? 'Direct answer with exact quotes from relevant documents' : 
'Ask clarifying question'}
`;
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