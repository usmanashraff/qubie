import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import {
  privateProcedure,
  publicProcedure,
  router,
} from './trpc'
import { TRPCError } from '@trpc/server'
import { db } from '@/db'
import { z } from 'zod'
import { INFINITE_QUERY_LIMIT } from '@/config/infinite-query'
import { absoluteUrl } from '@/lib/utils'
import {
  getUserSubscriptionPlan,
  stripe,
} from '@/lib/stripe'
import { PLANS } from '@/config/stripe'

export const appRouter = router({
  authCallback: publicProcedure.query(async () => {
    const { getUser } = getKindeServerSession()
    const user = await getUser()

    if (!user.id || !user.email)
      throw new TRPCError({ code: 'UNAUTHORIZED' })

    // check if the user is in the database
    const dbUser = await db.user.findFirst({
      where: {
        id: user.id,
      },
    })

    if (!dbUser) {
      // create user in db
      await db.user.create({
        data: {
          id: user.id,
          email: user.email,
        },
      })
    }

    return { success: true }
  }),

  getUserFiles: privateProcedure.query(async ({ctx}) => {
    const { userId } = ctx

    return await db.fileGroup.findMany({
      where: {
        userId,
      },
    })
  }),

  createStripeSession: privateProcedure.mutation(
    async ({ ctx }) => {
      const { userId } = ctx

      const billingUrl = absoluteUrl('/dashboard/billing')

      if (!userId)
        throw new TRPCError({ code: 'UNAUTHORIZED' })

      const dbUser = await db.user.findFirst({
        where: {
          id: userId,
        },
      })

      if (!dbUser)
        throw new TRPCError({ code: 'UNAUTHORIZED' })

      const subscriptionPlan =
        await getUserSubscriptionPlan()

      if (
        subscriptionPlan.isSubscribed &&
        dbUser.stripeCustomerId
      ) {
        const stripeSession =
          await stripe.billingPortal.sessions.create({
            customer: dbUser.stripeCustomerId,
            return_url: billingUrl,
          })

        return { url: stripeSession.url }
      }

      const stripeSession =
        await stripe.checkout.sessions.create({
          success_url: billingUrl,
          cancel_url: billingUrl,
          payment_method_types: ['card'],
          mode: 'subscription',
          billing_address_collection: 'auto',
          line_items: [
            {
              price: PLANS.find(
                (plan) => plan.name === 'Pro'
              )?.price.priceIds.test,
              quantity: 1,
            },
          ],
          metadata: {
            userId: userId,
          },
        })

      return { url: stripeSession.url }
    }
  ),

  getFileMessages: privateProcedure
    .input(
      z.object({
        limit: z.number().min(1).max(100).nullish(),
        cursor: z.string().nullish(),
        groupId: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      const { userId } = ctx
      const { groupId, cursor } = input
      const limit = input.limit ?? INFINITE_QUERY_LIMIT

      const fileGroup = await db.fileGroup.findFirst({
        where: {
          id: groupId,
          userId,
        },
      })

      if (!fileGroup) throw new TRPCError({ code: 'NOT_FOUND' })

      const messages = await db.message.findMany({
        take: limit + 1,
        where: {
          fileGroupId: groupId,
        },
        orderBy: {
          createdAt: 'desc',
        },
        cursor: cursor ? { id: cursor } : undefined,
        select: {
          id: true,
          isUserMessage: true,
          createdAt: true,
          text: true,
        },
      })

      let nextCursor: typeof cursor | undefined = undefined
      if (messages.length > limit) {
        const nextItem = messages.pop()
        nextCursor = nextItem?.id
      }

      return {
        messages,
        nextCursor,
      }
    }),

  getFileUploadStatus: privateProcedure
    .input(z.object({ groupId: z.string() }))
    .query(async ({ input, ctx }) => {
      const fileGroup = await db.fileGroup.findFirst({
        where: {
          id: input.groupId,
          userId: ctx.userId,
        },
      })

      if (!fileGroup) return { status: 'PENDING' as const }

      return { status: fileGroup.uploadStatus }
    }),

    getFile: privateProcedure
    .input(z.object({ key: z.string(), fileGroupId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const { userId } = ctx;
  
      // Step 1: Find the file
      const file = await db.file.findFirst({
        where: {
          key: input.key,
          userId,
        },
      });
  
      if (!file) {
        throw new TRPCError({ code: 'NOT_FOUND' });
      }
  
      // Step 2: Check if the file group exists
      let fileGroup = await db.fileGroup.findUnique({
        where: {
          id: input.fileGroupId,
        },
      });
  
      // Step 3: If not, create it
      if (!fileGroup) {
        fileGroup = await db.fileGroup.create({
          data: {
            id: input.fileGroupId,
            userId,
            uploadStatus: "PENDING",
            name: new Date().toISOString(), // Uses ISO date string as name
          },
        });
      }
  
      // Step 4: Link the file to the group (only if not already linked)
      if (file.fileGroupId !== input.fileGroupId) {
        await db.file.update({
          where: { id: file.id },
          data: {
            fileGroupId: input.fileGroupId,
          },
        });
      }
  
      return {
        file,
      };
    }),
  

  deleteFile: privateProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const { userId } = ctx


      const fileGroup = await db.fileGroup.findFirst({
        where: {
          id: input.id,
          userId,
        },
      })

      if (!fileGroup) throw new TRPCError({ code: 'NOT_FOUND' })

       
        // delete all files with that filegroup
        await db.file.deleteMany({
          where: {
            fileGroupId: input.id, 
          },
        })
         //delete all messages with that filegroup
         await db.message.deleteMany({
          where: {
            fileGroupId: input.id, 
          },
        })
      //then delete filegroup itself 
      await db.fileGroup.delete({
        where: {
          id: input.id,
        },
      })

      return fileGroup;
    }),

    // trpc/index.ts
    getFileGroup: privateProcedure
    .input(z.object({ fileGroupId: z.string() }))
    .query(async ({ ctx, input }) => {
      const { userId } = ctx;
      const fileGroup = await db.fileGroup.findFirst({
        where: {
          id: input.fileGroupId,
          userId,
        },
      });
      return { exists: !!fileGroup };
    }),


    // In your TRPC router
updateFile: privateProcedure
.input(z.object({ id: z.string(), name: z.string() }))
.mutation(async ({ ctx, input }) => {
  const { userId } = ctx;
  const updatedFileGroup = await db.fileGroup.update({
    where: { id: input.id, userId },
    data: { name: input.name },
  })
  return updatedFileGroup
}),


})

export type AppRouter = typeof appRouter