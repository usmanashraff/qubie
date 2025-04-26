import { AppRouter } from '@/trpc'
import { inferRouterOutputs } from '@trpc/server'

type RouterOutput = inferRouterOutputs<AppRouter>

type Messages = RouterOutput['getFileMessages']['messages']

export interface ExtendedMessage {
  id: string
  text: string | React.ReactNode
  isUserMessage: boolean
  createdAt: string
  sourceDocs?: Array<{
    metadata: {
      loc: {
        pageNumber: number
      }
    }
  }>
}