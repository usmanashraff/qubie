import { db } from "@/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { getPineconClient } from "@/lib/pinecone";
import { VertexAIEmbeddings } from "@langchain/google-vertexai";
import { PineconeStore } from "@langchain/pinecone";

import dotenv from 'dotenv';


// Load environment variables
dotenv.config({ path: '.env' });

const f = createUploadthing();

export const ourFileRouter = {
  pdfUploader: f({
    pdf: {
      maxFileSize: "4MB",
      maxFileCount: 1,
    },
  })
    .middleware(async () => {
        const { getUser } = getKindeServerSession()
        const user = await getUser()
      
        if (!user || !user.id) throw new Error('Unauthorized')
      
        // const subscriptionPlan = await getUserSubscriptionPlan()
      
        return { userId: user.id }
    })
    .onUploadComplete(async ({ metadata, file }) => {

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

          console.log("hehehehehehehehehehehe", process.env.GOOGLE_APPLICATION_CREDENTIALS)


          try {
              const response = await fetch(file.ufsUrl)
              const blob = await response.blob()
              const loader = new PDFLoader(blob)
              const pageLevelDocs = await loader.load()
        

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
              
          } catch (error) {
            console.log("error in processing:", error)
            await db.file.update({
              data: {
                uploadStatus: 'FAILED',
              },
              where: {
                id: createdFile.id,
              },
            })
          }
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
