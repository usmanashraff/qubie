import { db } from "@/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { getPineconClient } from "@/lib/pinecone";
import { VertexAIEmbeddings } from "@langchain/google-vertexai";
import { PineconeStore } from "@langchain/pinecone";
import { getUserSubscriptionPlan } from '@/lib/stripe'
import { PLANS } from '@/config/stripe'

const f = createUploadthing()

const middleware = async () => {
  const { getUser } = getKindeServerSession()
  const user = await getUser()

  if (!user || !user.id) throw new Error('Unauthorized')

  const subscriptionPlan = await getUserSubscriptionPlan()

  return { subscriptionPlan, userId: user.id }
}

  const onUploadComplete = async ({
      metadata,
      file,
    }: {
      metadata: Awaited<ReturnType<typeof middleware>>
      file: {
        key: string
        name: string
        ufsUrl: string
      }
    }) => {
      const isFileExist = await db.file.findFirst({
        where: {
          key: file.key,
        },
      })

      if (isFileExist) return
        
          const createdFile = await db.file.create({
            data: {
              key: file.key,
              name: file.name,
              userId: metadata.userId,
              url: file.ufsUrl,
              uploadStatus: 'PROCESSING',
            },
          })



          try {
              const response = await fetch(file.ufsUrl)
              const blob = await response.blob()
              const loader = new PDFLoader(blob)
              const pageLevelDocs = await loader.load()
              //strip check
              const pagesAmt = pageLevelDocs.length

              const { subscriptionPlan } = metadata
              const { isSubscribed } = subscriptionPlan

              const isProExceeded =
                pagesAmt >
                PLANS.find((plan) => plan.name === 'Pro')!.pagesPerPdf
              const isFreeExceeded =
                pagesAmt >
                PLANS.find((plan) => plan.name === 'Free')!
                  .pagesPerPdf

              if (
                (isSubscribed && isProExceeded) ||
                (!isSubscribed && isFreeExceeded)
              ) {
                await db.file.update({
                  data: {
                    uploadStatus: 'FAILED',
                  },
                  where: {
                    id: createdFile.id,
                  },
                })
              }


              // vectorize and index entire document
              const pinecone = await getPineconClient()
              const pineconeIndex = pinecone.Index('qubie')

              // Initialize Google Vertex AI Embeddings
                const embeddings = new VertexAIEmbeddings({
                  model: "textembedding-gecko@latest",
                });

              await PineconeStore.fromDocuments(
                pageLevelDocs,
                embeddings,
                {
                  pineconeIndex,
                  namespace: createdFile.id,
                }
              )

              await db.file.update({
                data: {
                  uploadStatus: 'SUCCESS',
                },
                where: {
                  id: createdFile.id,
                },
              })

              console.log('pdf embeddings and processing completed')
              
            } catch (err) {
              console.log("err", err);
              await db.file.update({
                data: {
                  uploadStatus: 'FAILED',
                },
                where: {
                  id: createdFile.id,
                },
              })
            }
          }          


export const ourFileRouter = {
  freePlanUploader: f({ pdf: { maxFileSize: '4MB' } })
    .middleware(middleware)
    .onUploadComplete(onUploadComplete),
  proPlanUploader: f({ pdf: { maxFileSize: '32MB' } })
    .middleware(middleware)
    .onUploadComplete(onUploadComplete),
} satisfies FileRouter

export type OurFileRouter = typeof ourFileRouter