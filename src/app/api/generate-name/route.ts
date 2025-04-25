import { db } from '@/db'
import { model } from '@/lib/geminie'
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import { NextRequest } from 'next/server'
import { z } from 'zod'

// Basic rate limiting map - in production you'd want to use Redis
const rateLimitMap = new Map<string, { count: number, timestamp: number }>()
const RATE_LIMIT_WINDOW = 60 * 1000 // 1 minute
const MAX_REQUESTS = 10 // 10 requests per minute

const requestSchema = z.object({
  groupId: z.string().min(1)
})

export const POST = async (req: NextRequest) => {
  try {
    const { getUser } = getKindeServerSession()
    const user = await getUser()
    const { id: userId } = user

    if (!userId) return new Response('Unauthorized', { status: 401 })

    // Rate limiting check
    const now = Date.now()
    const userKey = `${userId}-name-gen`
    const userLimit = rateLimitMap.get(userKey)

    if (userLimit) {
      if (now - userLimit.timestamp < RATE_LIMIT_WINDOW) {
        if (userLimit.count >= MAX_REQUESTS) {
          return new Response('Too many requests', { status: 429 })
        }
        userLimit.count++
      } else {
        rateLimitMap.set(userKey, { count: 1, timestamp: now })
      }
    } else {
      rateLimitMap.set(userKey, { count: 1, timestamp: now })
    }

    // Validate request body
    const body = await req.json()
    const validatedBody = requestSchema.parse(body)
    const { groupId } = validatedBody

    // Verify file group ownership
    const fileGroup = await db.fileGroup.findFirst({
      where: {
        id: groupId,
        userId,
      },
    })

    if (!fileGroup) {
      return new Response('File group not found', { status: 404 })
    }

    // Get all files in the group
    const files = await db.file.findMany({
      where: {
        fileGroupId: groupId,
        userId,
      },
    })

    if (!files.length) {
      return new Response('No files found in group', { status: 404 })
    }

    // Create a prompt for Gemini
    const fileNames = files.map(f => f.name).join(', ')
    const prompt = `Generate a short but descriptive name (maximum 5-6 words) for a conversation/document group that contains the following files: ${fileNames}. The name should reflect the key theme or purpose of these documents. Return ONLY the name, nothing else.`

    try {
      const chatSession = model.startChat({
        history: [
          {
            role: "user",
            parts: [{ text: prompt }],
          },
        ],
      })

      const result = await chatSession.sendMessage(prompt)
      const generatedName = result.response.text().trim()

      if (!generatedName) {
        throw new Error('Failed to generate name')
      }

      // Update the fileGroup name
      await db.fileGroup.update({
        where: { id: groupId },
        data: { name: generatedName },
      })

      return new Response(JSON.stringify({ name: generatedName }), {
        headers: { 'Content-Type': 'application/json' },
      })
    } catch (error) {
      console.error('Error generating name:', error)
      return new Response('Failed to generate name', { status: 500 })
    }
  } catch (error) {
    console.error('Error in name generation endpoint:', error)
    if (error instanceof z.ZodError) {
      return new Response('Invalid request body', { status: 400 })
    }
    return new Response('Internal server error', { status: 500 })
  }
}