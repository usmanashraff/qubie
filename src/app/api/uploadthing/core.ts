import { db } from "@/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { getPineconClient } from "@/lib/pinecone";
import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";
import { TaskType } from "@google/generative-ai";

import { PineconeStore } from "@langchain/pinecone";
import { getUserSubscriptionPlan } from "@/lib/stripe";
import { PLANS } from "@/config/stripe";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { DocxLoader } from "@langchain/community/document_loaders/fs/docx";
import { Document } from "@langchain/core/documents";
import WordExtractor from "word-extractor";
import { parseOfficeAsync } from 'officeparser';

const f = createUploadthing();

const middleware = async () => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  
  if (!user || !user.id) throw new Error("Unauthorized");

  const subscriptionPlan = await getUserSubscriptionPlan();

  return {
    subscriptionPlan,
    userId: user.id,
  };
};

const onUploadComplete = async ({
  metadata,
  file,
}: {
  metadata: Awaited<ReturnType<typeof middleware>>;
  file: {
    key: string;
    name: string;
    ufsUrl: string;
  };
}) => {
  const isFileExist = await db.file.findFirst({
    where: { key: file.key },
  });

  if (isFileExist) return;

  const createdFile = await db.file.create({
    data: {
      key: file.key,
      name: file.name,
      userId: metadata.userId,
      url: file.ufsUrl,
      uploadStatus: "PROCESSING",
    },
  });

  try {
    const response = await fetch(file.ufsUrl);
    const blob = await response.blob();
    const fileExtension = file.name.split('.').pop()?.toLowerCase();
    let pageLevelDocs;
    let pagesAmt;

    if (fileExtension === 'pdf') {
      const loader = new PDFLoader(blob);
      pageLevelDocs = await loader.load();
      pagesAmt = pageLevelDocs.length;
    } 
    else if (['docx', 'doc'].includes(fileExtension!)) {
      let rawText: string;

      if (fileExtension === 'docx') {
        const loader = new DocxLoader(blob);
        const docs = await loader.load();
        rawText = docs.map(doc => doc.pageContent).join('\n');
      } else {
        const arrayBuffer = await blob.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        const extractor = new WordExtractor();
        const extracted = await extractor.extract(buffer);
        rawText = extracted.getBody() || '';
      }

      const textSplitter = new RecursiveCharacterTextSplitter({
        chunkSize: 1000,
        chunkOverlap: 200,
      });
      
      pageLevelDocs = await textSplitter.splitDocuments([
        new Document({ pageContent: rawText }),
      ]);
      pagesAmt = pageLevelDocs.length;
    }
    else if (['pptx', 'ppt'].includes(fileExtension!)) {
      // Process PowerPoint files
      const arrayBuffer = await blob.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      
      // Parse PowerPoint content
      // Correct configuration format
      const rawText = await parseOfficeAsync(buffer);

      const textSplitter = new RecursiveCharacterTextSplitter({
        chunkSize: 1000,
        chunkOverlap: 200,
      });

      pageLevelDocs = await textSplitter.splitDocuments([
        new Document({ 
          pageContent: rawText,
          metadata: { source: file.name }
        }),
      ]);
      pagesAmt = pageLevelDocs.length;
    }
    else if( (['xlsx', 'xls'].includes(fileExtension!)) ){
       // Process Excel files
        const arrayBuffer = await blob.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        
        const rawText = await parseOfficeAsync(buffer);
        const textSplitter = new RecursiveCharacterTextSplitter({
          chunkSize: 1000,
          chunkOverlap: 200,
        });

        pageLevelDocs = await textSplitter.splitDocuments([
          new Document({ 
            pageContent: rawText,
            metadata: { source: file.name }
          }),
        ]);
        pagesAmt = pageLevelDocs.length;
    }
    else if (fileExtension === 'txt') {
      // Process TXT files
      const rawText = await blob.text();
      
      const textSplitter = new RecursiveCharacterTextSplitter({
        chunkSize: 1000,
        chunkOverlap: 200,
      });

      pageLevelDocs = await textSplitter.splitDocuments([
        new Document({ 
          pageContent: rawText,
          metadata: { 
            source: file.name,
            fileType: 'text'
          }
        }),
      ]);
      pagesAmt = pageLevelDocs.length;
    }
    else if (fileExtension === 'csv') {
      const rawText = await blob.text();
      // Preserve CSV structure with \n separators
      const textSplitter = new RecursiveCharacterTextSplitter({
        chunkSize: 1000,
        chunkOverlap: 200,
        separators: ['\n'] // Split by rows
      });
    
      pageLevelDocs = await textSplitter.splitDocuments([
        new Document({ 
          pageContent: rawText,
          metadata: { 
            source: file.name,
            fileType: 'csv'
          }
        }),
      ]);
      pagesAmt = pageLevelDocs.length;
    }
    else {
      throw new Error('Unsupported file type. Supported formats: PDF, Word, PowerPoint, Excel, TXT, CSV');
    }

    const { isSubscribed } = metadata.subscriptionPlan;
    const maxPages = isSubscribed
      ? PLANS.find((p) => p.name === "Pro")!.pagesPerPdf
      : PLANS.find((p) => p.name === "Free")!.pagesPerPdf;

    if (pagesAmt > maxPages) {
      await db.file.update({
        where: { id: createdFile.id },
        data: { uploadStatus: "FAILED" },
      });
      return;
    }

    const pinecone = await getPineconClient();
    const pineconeIndex = pinecone.Index("qubie");
    const embeddings = new GoogleGenerativeAIEmbeddings({
    model: "text-embedding-004", // 768 dimensions
    taskType: TaskType.RETRIEVAL_DOCUMENT,
    title: file.name,
    });

        await PineconeStore.fromDocuments(pageLevelDocs, embeddings, {
      pineconeIndex,
      namespace: createdFile.id,
    });

    await db.file.update({
      where: { id: createdFile.id },
      data: { uploadStatus: "SUCCESS" },
    });

    console.log("✅ embeddings completed for:", file.name);
  } catch (err) {
    console.error("❌ Error processing document:", err);
    await db.file.update({
      where: { id: createdFile.id },
      data: { uploadStatus: "FAILED" },
    });
  }
};

export const ourFileRouter = {
  freePlanUploader: f({ 
    // PDF & Word
    pdf: { maxFileSize: "4MB", maxFileCount: 3 },
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document": { maxFileSize: "4MB", maxFileCount: 3 },
    "application/msword": { maxFileSize: "4MB", maxFileCount: 3 },
    
    // PowerPoint
    "application/vnd.openxmlformats-officedocument.presentationml.presentation": { maxFileSize: "4MB", maxFileCount: 3 },
    "application/vnd.ms-powerpoint": { maxFileSize: "4MB", maxFileCount: 3 },

    // Excel
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": { maxFileSize: "4MB", maxFileCount: 3 },
    "application/vnd.ms-excel": { maxFileSize: "4MB", maxFileCount: 3 },

    // CSV
    "text/csv": { maxFileSize: "4MB", maxFileCount: 3 },

    // TXT
    "text/plain": { maxFileSize: "4MB", maxFileCount: 3 },
  })
    .middleware(middleware)
    .onUploadComplete(onUploadComplete),

  proPlanUploader: f({ 
    // PDF & Word
    pdf: { maxFileSize: "32MB", maxFileCount: 5 },
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document": { maxFileSize: "4MB", maxFileCount: 5 },
    "application/msword": { maxFileSize: "32MB", maxFileCount: 5 },

    // PowerPoint
    "application/vnd.ms-powerpoint": { maxFileSize: "32MB", maxFileCount: 5 },
    "application/vnd.openxmlformats-officedocument.presentationml.presentation": { maxFileSize: "32MB", maxFileCount: 5 },

    // Excel
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": { maxFileSize: "4MB", maxFileCount: 5 },
    "application/vnd.ms-excel": { maxFileSize: "32MB", maxFileCount: 5 },

    // CSV
    "text/csv": { maxFileSize: "4MB", maxFileCount: 5 },

    // TXT
    "text/plain": { maxFileSize: "4MB", maxFileCount: 5 },
  })
    .middleware(middleware)
    .onUploadComplete(onUploadComplete),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;

